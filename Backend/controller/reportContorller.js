const Report = require("../models/reportModel");
const express=require("express");
const AppError = require("../utils/appError");
const catchAsync=require("../utils/catchAsync");
const { env } = require("process");

exports.createReport= catchAsync(async(req,res,next)=>{
    const { issues, suggestions, medicalPrescription, patientId, doctorId } = req.body
    const newReport= await Report.create({
        issues,
        suggestions,
        medicalPrescription,
        patientId,
        doctorId,
    })
    res.status(201).json({
        status: "success",
        data: {
            report: newReport,
        },
    });
})

exports.getAllReports = catchAsync(async (req, res, next) => {
    const reportData = await Report.find({ patientId: req.params.id }); // Use find with query

    if (!reportData || reportData.length === 0) { // Check if no reports found
        return next(new AppError("No medical reports exist for this patient", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            reports: reportData,
        },
    });
});


exports.getReportById = catchAsync(async (req, res, next) => {
    const report = await Report.findById(req.params.id);
    if (!report) {
        return next(new AppError("No report found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            report,
        },
    });
});


exports.updateReport = catchAsync(async (req, res, next) => {
    const { issues, suggestions, medicalPrescription } = req.body;
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, {
        issues,
        suggestions,
        medicalPrescription,
    }, { new: true });

    if (!updatedReport) {
        return next(new AppError("No report found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            report: updatedReport,
        },
    });
});


exports.deleteReport = catchAsync(async (req, res, next) => {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
        return next(new AppError("No report found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});


exports.getReportsByDoctor = catchAsync(async (req, res, next) => {
    const reports = await Report.find({ doctorId: req.params.id });
    if (!reports || reports.length === 0) {
        return next(new AppError("No reports found for this doctor", 404));
    }
    
    res.status(200).json({
        status: "success",
        data: {
            reports,
        },
    });
});