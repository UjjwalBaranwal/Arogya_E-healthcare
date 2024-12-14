const Appointment = require('../models/appointmentModel'); 
const Doctor = require('../models/doctorModel'); 
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync'); 



exports.bookAppointment = catchAsync(async (req, res, next) => {
  const { doctorId, date, patientId, isPriority, moneyPaid } = req.body;
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
    if (!appointment.patient) {
      appointment.patient = [];
    }
  }

  // Step 4: Check the total number of patients (limit 50)
  if (appointment.totalPatient >= 50) {
    return next(new AppError('Book for some another day today doctor is full sorry for inconveince'))
  }

  // Step 5: Check if the patient is already in the appointment list
  const isPatientAlreadyBooked = appointment.patient.some(p => p.patientId.toString() === patientId.toString());

  if (isPatientAlreadyBooked) {
    return next(new AppError('You already booked appointment with the doctor for this day'))
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


exports.bookAppointment = catchAsync(async (req, res, next) => {
  const { doctorId, date, patientId, isPriority, moneyPaid } = req.body;

  // Step 1: Find the doctor
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return next(new AppError('Doctor is not found'));
  }

  // Step 2: Find the appointment for the given doctor and date
  let appointment = await Appointment.findOne({ 
    doctorId,
    'appointmentList.date': {
      $gte: new Date(date).setHours(0, 0, 0, 0), // Strip time and compare by date
      $lt: new Date(date).setHours(23, 59, 59, 999) // End of the day
    }
  });

  if (!appointment) {
    // Step 3: If no appointment exists for this date, create a new one
    appointment = new Appointment({
      doctorId,
      appointmentList: [{
        date,
        totalPatient: 0, // Initialize with 0 patients
        patients: [] // Initialize patients as an empty array
      }]
    });
  } else {
    // If appointment exists, find the specific appointment for the given date
    appointment = appointment.appointmentList.patients.find(app => {
      return app.date.setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0);
    });

    // Ensure that the patients list is initialized
    if (!appointment.patients) {
      appointment.patients = []; // Initialize the patient list if it's undefined
    }
  }

  // Step 4: Check if the total number of patients exceeds the limit (50)
  if (appointment.totalPatient >= 50) {
    return next(new AppError('Book for another day, today doctor is full. Sorry for the inconvenience.'));
  }

  // Step 5: Check if the patient is already booked for the given date
  const isPatientAlreadyBooked = appointment.appointmentList.patients.some(p => p.patientId.toString() === patientId.toString());

  if (isPatientAlreadyBooked) {
    return next(new AppError('You already booked an appointment with the doctor for this day.'));
  }

  // Step 6: Add patient to the appointment
  appointment.patients.push({
    patientId,
    isPriority: isPriority || false, // Default to false if not provided
    moneyPaid: moneyPaid || false // Default to false if not provided
  });

  // Step 7: Increment the total number of patients
  appointment.totalPatient += 1;

  // Step 8: Save the updated appointment
  await appointment.save();

  // Step 9: Respond with the success message and relevant appointment details
  res.status(201).json({
    status: 'success',
    message: 'Appointment booked successfully',
    data: {
      appointmentDate: appointment.date,
      totalPatient: appointment.totalPatient,
      patients: appointment.patients
    }
  });
});








exports.getAll=catchAsync(async(req,res,next)=>{
    const data=await Appointment.find();
    if(!data)return next(new AppError("No Appointment till now"));
    res.status(201).json({
        status:'success',
        data
    })
})



// This is used for finding the appointments by using the doctorId

exports.getAppointmentsByDoctorId = catchAsync(async (req, res, next) => {
  const { doctorId } = req.params;

  // Validate if doctorId is provided
  if (!doctorId) {
    return next(new AppError('Doctor ID is required', 400));
  }

  // Find appointments for the given doctorId
  const appointments = await Appointment.find({ doctorId });

  // If no appointments found, send an error response
  if (!appointments || appointments.length === 0) {
    return next(new AppError('No appointments found for this doctor', 404));
  }

  // Respond with the appointments
  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: {
      appointments
    }
  });
});