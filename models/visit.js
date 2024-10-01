const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    visit_id: {
        type: String, // Thay đổi thành String
        required: true,
        unique: true
    },
    patient_id: {
        type: String, // Thay đổi thành String
        required: true
    },
    doctor_id: {
        type: String, // Thay đổi thành String
        required: true
    },
    nurse_id: {
        type: String, // Thay đổi thành String
        required: true
    },
    admission_date: {
        type: Date,
        required: true
    },
    discharge_date: {
        type: Date,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    visit_code: {
        type: String, // Thay đổi thành String
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;
