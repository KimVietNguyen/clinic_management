// const mongoose = require('mongoose');

// const prescriptionSchema = new mongoose.Schema({
//     visit_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Visit',
//         required: true
//     },
//     medications: [{
//         medication_name: {
//             type: String,
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         }
//     }],
//     total_price: {
//         type: Number,
//         required: true
//     }
// }, { timestamps: true });

// const Prescription = mongoose.model('Prescription', prescriptionSchema);
// module.exports = Prescription;


const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    prescription_id: {
        type: String, // Thêm trường prescription_id
        required: true,
        unique: true
    },
    visit_id: {
        type: String, // Thay đổi thành String
        ref: 'Visit',
        required: true
    },
    medication_name: {
        type: String,
        required: true
    },
    quantity: { // Thêm trường quantity
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;
