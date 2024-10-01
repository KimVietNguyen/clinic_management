const express = require('express');
const router = express.Router();
const Prescription = require('../models/prescription');

// Liệt kê tất cả đơn thuốc
router.get('/', async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        res.render('prescriptions/index', { prescriptions });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Thêm đơn thuốc mới
router.post('/', async (req, res) => {
    const newPrescription = new Prescription(req.body);
    try {
        await newPrescription.save();
        res.redirect('/prescriptions');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Hiển thị trang sửa đơn thuốc
router.get('/:id/edit', async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id);
        res.render('prescriptions/edit', { prescription });
    } catch (err) {
        res.status(404).send(err.message);
    }
});

// Cập nhật đơn thuốc
router.put('/:id', async (req, res) => {
    try {
        await Prescription.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/prescriptions');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Xóa đơn thuốc
router.delete('/:id', async (req, res) => {
    try {
        await Prescription.findByIdAndDelete(req.params.id);
        res.redirect('/prescriptions');
    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;
