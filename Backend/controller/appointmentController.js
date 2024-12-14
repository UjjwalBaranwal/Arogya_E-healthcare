const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");



exports.bookAppointment = catchAsync(async (req, res, next) => {
  const { doctorId, date, patientId, isPriority, moneyPaid } = req.body;

  // Step 1: Check if the doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return next(new AppError("Doctor is not found"));
  }

  // Step 2: Find the appointment for the given doctor
  let appointment = await Appointment.findOne({ doctorId });

  // Step 3: If no appointment exists for this doctor, create a new one
  if (!appointment) {
    appointment = new Appointment({
      doctorId,
      appointmentList: [
        {
          date,
          totalPatient: 0,
          patient: [],
        },
      ],
    });
  }

  // Step 4: Check if the appointment list already has an entry for the given date
  let dateAppointment = appointment.appointmentList.find(
    (app) => app.date.toISOString() === new Date(date).toISOString()
  );

  // Step 5: If no appointment exists for the date, create a new one
  if (!dateAppointment) {
    appointment.appointmentList.push({
      date,
      totalPatient: 0,
      patient: [],
    });
    dateAppointment =
      appointment.appointmentList[appointment.appointmentList.length - 1];
  }

  // Step 6: Check the total number of patients (limit 50)
  if (dateAppointment.totalPatient >= 50) {
    return next(
      new AppError(
        "Book for another day, today doctor is full. Sorry for the inconvenience."
      )
    );
  }

  // Step 7: Check if the patient is already in the appointment list
  const isPatientAlreadyBooked = dateAppointment.patients.some(
    (p) => p.patientId.toString() === patientId.toString()
  );

  if (isPatientAlreadyBooked) {
    return next(
      new AppError(
        "You already booked an appointment with the doctor for this day."
      )
    );
  }

  // Step 8: Add the patient to the appointment
  dateAppointment.patients.push({
    patientId,
    isPriority: isPriority || false, // Default to false if not provided
    moneyPaid: moneyPaid || false, // Default to false if not provided
  });

  // Step 9: Increment the total number of patients
  dateAppointment.totalPatient += 1;

  // Step 10: Save the updated appointment
  await appointment.save();

  // Step 11: Respond with a success message
  res.status(201).json({
    status: "success",
    message: "Appointment booked successfully",
    data: {
      appointment,
    },
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const data = await Appointment.find();
  if (!data) return next(new AppError("No Appointment till now"));
  res.status(201).json({
    status: "success",
    data,
  });
});


