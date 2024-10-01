// doctorRoutes.js
const express = require('express');
const router = express.Router();
const DoctorController = require('../controller/doctorController.js');

// Route to display the list of doctors
router.get('/', DoctorController.getAllDoctors); // Assuming you have this function to get doctors

// Route to display the add doctor form
router.get('/add', (req, res) => {
    res.render('partials/doctor/addDoctor'); // Render the addDoctor.ejs form
});

// Route to handle the form submission
router.post('/add', DoctorController.addDoctor); // Use the addDoctor method from your controller

// Route to edit a doctor
router.post('/doctors/update/:id', DoctorController.updateDoctor);

// Route to delete a doctor
router.post('/delete/:id', DoctorController.deleteDoctor); // Delete a doctor

// Route to search doctors by name
router.post('/search', DoctorController.searchDoctor);

module.exports = router;
