const express = require('express');
const router = express.Router();
const Visit = require('../models/visit');

// Liệt kê tất cả lượt khám
router.get('/', async (req, res) => {
    try {
        const visits = await Visit.find();
        res.render('visits/index', { visits });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Thêm lượt khám mới
router.post('/', async (req, res) => {
    const newVisit = new Visit(req.body);
    try {
        await newVisit.save();
        res.redirect('/visits');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Hiển thị trang sửa lượt khám
router.get('/:id/edit', async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        res.render('visits/edit', { visit });
    } catch (err) {
        res.status(404).send(err.message);
    }
});

// Cập nhật lượt khám
router.put('/:id', async (req, res) => {
    try {
        await Visit.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/visits');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Xóa lượt khám
router.delete('/:id', async (req, res) => {
    try {
        await Visit.findByIdAndDelete(req.params.id);
        res.redirect('/visits');
    } catch (err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;
