// controller/patientController.js
const Patient = require('../models/patient'); // Đảm bảo bạn đã định nghĩa model Patient

// Function to add a new patient
exports.addPatient = async (req, res) => {
    const { patient_id, name, dob, address, phone } = req.body;
    
    try {
        // Create a new patient instance
        const newPatient = new Patient({
            patient_id,
            name,
            dob,
            address,
            phone,
        });

        // Save the patient to the database
        await newPatient.save();
        
        // Redirect back to the patients list
        res.redirect('/'); // Redirect to the route that displays the list of patients
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Function to get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find(); // Fetch all patients
        res.render('index', { patients }); // Render the view with patients data
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to update patient information
exports.updatePatient = async (req, res) => {
    const { id } = req.params; // Get patient ID from the URL
    const updatedData = req.body; // Get updated data from the request body

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};

// Function to delete a patient
exports.deletePatient = async (req, res) => {
    const patientId = req.params.id;

    try {
        await Patient.findByIdAndDelete(patientId);
        res.redirect('/'); // Redirect to the patients list
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Function to search for patients by name
exports.searchPatient = async (req, res) => {
    const { name } = req.body; // Use req.body for POST method

    try {
        // Find patients whose name matches the search term (case-insensitive)
        const patients = await Patient.find({ name: { $regex: name, $options: 'i' } });

        // Render the view with the search results
        res.render('partials/patient/patients', { patients }); // Make sure 'patients.ejs' exists

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
