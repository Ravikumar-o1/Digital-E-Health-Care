const mongoose = require('mongoose');

const PatientData = mongoose.Schema({
    patient_uid: {
        type: String
    },
    doctor_uid: {
        type: String
    },
    image: {
        type: String
    },
    summary: {
        type: String
    },
    disease: {
        type: String
    }
});

module.exports = mongoose.model('patientdatas', PatientData);