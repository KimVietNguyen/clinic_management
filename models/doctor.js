const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    id_number: String,
    name: String,
    doctor_id: String,
    dob: Date,
    address: String,
    level: String,
    experience_years: Number,
    training_level: String,
    specialty: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);
