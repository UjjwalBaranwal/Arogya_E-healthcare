const MedicalReport = require("../models/reportModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const AppError = require("../utils/appError"); // Import AppError
const catchAsync = require("../utils/catchAsync"); // Import catchAsync

// Create a new medical report
exports.createMedicalReport = catchAsync(async (req, res, next) => {
  // console.log("this is request body", req.body);

  const { issues, suggestions, medicalPrescription, patientId, doctorId } =
    req.body;

  // Validate patient and doctor existence
  const patient = await Patient.findById(patientId);
  const doctor = await Doctor.findById(doctorId);

  if (!patient || !doctor) {
    return next(new AppError("Patient or Doctor not found", 404)); // Use AppError for better error handling
  }
  const patientName = patient.name;
  const doctorName = doctor.name;

  // Create a new medical report instance
  const newReport = new MedicalReport({
    issues,
    suggestions,
    medicalPrescription,
    patientId,
    doctorId,
    patientName,
    doctorName,
  });

  // Save the medical report to the database
  await newReport.save();
  res.status(201).json({
    message: "Medical report created successfully",
    report: newReport,
  });
});

// Get medical report by patient ID
exports.getMedicalReportByPatient = catchAsync(async (req, res, next) => {
  const { patientId } = req.params;

  const report = await MedicalReport.findOne({ patientId });

  if (!report) {
    return next(new AppError("Medical report not found", 404)); // Use AppError
  }

  res.status(200).json(report);
});

// Get medical report by doctor ID
exports.getMedicalReportByDoctor = catchAsync(async (req, res, next) => {
  const { doctorId } = req.params;

  const reports = await MedicalReport.find({ doctorId });

  if (reports.length === 0) {
    return next(new AppError("No reports found for this doctor", 404)); // Use AppError
  }

  res.status(200).json(reports);
});

// Update an existing medical report
exports.updateMedicalReport = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { issues, suggestions, medicalPrescription } = req.body;

  const report = await MedicalReport.findById(id);

  if (!report) {
    return next(new AppError("Medical report not found", 404)); // Use AppError
  }

  report.issues = issues || report.issues;
  report.suggestions = suggestions || report.suggestions;
  report.medicalPrescription =
    medicalPrescription || report.medicalPrescription;

  await report.save();
  res.status(200).json({
    message: "Medical report updated successfully",
    report,
  });
});

// Delete a medical report
exports.deleteMedicalReport = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const report = await MedicalReport.findByIdAndDelete(id);

  if (!report) {
    return next(new AppError("Medical report not found", 404)); // Use AppError
  }

  res.status(200).json({
    message: "Medical report deleted successfully",
  });
});
