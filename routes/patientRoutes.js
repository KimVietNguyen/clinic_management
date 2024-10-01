const express = require('express');
const router = express.Router();
const PatientController = require('../controller/patientController.js');

// Route to display the list of patients
router.get('/', PatientController.getAllPatients); // Assuming you have this function to get patients

// Route to display the add patient form
router.get('/add', (req, res) => {
    res.render('partials/patient/addPatient'); // Render the addPatient.ejs form
});

// Route to handle the form submission for adding a new patient
router.post('/add', PatientController.addPatient); // Use the addPatient method from your controller

// Route to update a patient
router.post('/update/:id', PatientController.updatePatient); // Update a patient by ID

// Route to delete a patient
router.post('/delete/:id', PatientController.deletePatient); // Delete a patient

// Route to search patients by name
router.post('/search', PatientController.searchPatient); // Search for patients by name

module.exports = router;
