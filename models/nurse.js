const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
    nurse_id: {
        type: String,
        required: true,
        unique: true // Đảm bảo rằng ID y tá là duy nhất
    },
    name: {
        type: String,
        required: true // Tên y tá là bắt buộc
    },
    dob: {
        type: Date, // Ngày sinh được định dạng là Date
        required: true // Ngày sinh là bắt buộc
    },
    address: {
        type: String,
        required: true // Địa chỉ là bắt buộc
    },
    training_level: {
        type: String,
        required: true // Cấp độ đào tạo là bắt buộc
    },
    experience_years: {
        type: Number,
        required: true // Số năm kinh nghiệm là bắt buộc
    },
    phone_number: {
        type: String,
        required: true // Số điện thoại là bắt buộc
    }
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

const Nurse = mongoose.model('Nurse', nurseSchema);
module.exports = Nurse;
