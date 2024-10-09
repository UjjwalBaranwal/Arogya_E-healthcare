const mongoose = require('mongoose');

// Patient schema embedded in the appointment list
const patientSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',  // Reference to the Patient model
        required: true
    },
    isPriority: {
        type: Boolean,
        default: false
    },
    moneyPaid: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Appointment schema
const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',  // Reference to the Doctor model
        required: true
    },
    appointmentList: [{
        date: {
            type: Date,
            required: true
        },
        totalPatient: {
            type: Number,
            required: true,
            max: [50, "Only 50 patients can be seen by the doctor in a single day, please book another day"]
        },
        patients: [patientSchema]  // Array of patients with embedded patient schema
    }]
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
