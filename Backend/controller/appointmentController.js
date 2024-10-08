const Appointment = require('../models/appointmentModel'); 
const Doctor = require('../models/doctorModel'); 
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync'); 

exports.bookAppointment = catchAsync(async (req, res, next) => {
  const { doctorId, date, patientId, isPriority, moneyPaid } = req.body;

  // Step 1: Check if the doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return next(new AppError('Doctor is not found'));
  }

  // Step 2: Find the appointment for the given doctor and date
  let appointment = await Appointment.findOne({ doctorId, 'appointmentList.date': date });

  if (!appointment) {
    // Step 3: If no appointment exists for this date, create a new one
    appointment = new Appointment({
      doctorId,
      appointmentList: [{
        date,
        totalPatient: 0, // Initialize with 0 patients
        patient: []
      }]
    });
  } else {
    
    appointment = appointment.appointmentList.find(app => app.date.toISOString() === new Date(date).toISOString());
  }

  // Step 4: Check the total number of patients (limit 50)
  if (appointment.totalPatient >= 50) {
    return next(new AppError('Book for some another day today doctor is full sorry for inconveince'))
  }

  // Step 5: Check if the patient is already in the appointment list
  const isPatientAlreadyBooked = appointment.patient.some(p => p.patientId.toString() === patientId.toString());

  if (isPatientAlreadyBooked) {
    return =next(new AppError('You already booked appointment with the doctor for this day'))
  }

  // Step 6: Add patient to the appointment
  appointment.patient.push({
    patientId,
    isPriority: isPriority || false, // Default to false if not provided
    moneyPaid: moneyPaid || false // Default to false if not provided
  });

  // Step 7: Increment the total number of patients
  appointment.totalPatient += 1;

  // Step 8: Save the updated appointment
  await appointment.save();

  // Step 9: Respond with the success message
  res.status(201).json({
    status: 'success',
    message: 'Appointment booked successfully',
    data: {
      appointment
    }
  });
});
