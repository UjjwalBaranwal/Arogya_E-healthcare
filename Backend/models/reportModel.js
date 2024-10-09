const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema({
    issues: [{
        description: { type: String, required: true },
        severity: { type: String, enum: ['mild', 'moderate', 'severe'], required: true },
        dateReported: { type: Date, default: Date.now },
    }],
    suggestions: [{
        advice: { type: String, required: true },
        recommendedBy: { type: String, required: true },
        followUpDate: { type: Date }
    }],
    medicalPrescription: [{
        medicineDetails: {
            name: { type: String, required: true },
            dosage: { type: String, required: true },
            frequency: { type: String, required: true },
            duration: { type: String, required: true }
        },
        form: { type: String, required: true },
        instructions: { type: String },
        prescribedBy: { type: String, required: true },
        datePrescribed: { type: Date, default: Date.now }
    }],
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:[true,'enter the patient id']
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:[true,'enter the doctor id']
    },
});


module.exports = mongoose.model('MedicalReport', medicalReportSchema);
