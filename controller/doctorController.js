// controller/doctorController.js
const Doctor = require('../models/doctor');

// Function to add a new doctor
exports.addDoctor = async (req, res) => {
    const { doctor_id, name, dob, address, level, experience_years, training_level, specialty } = req.body;
    
    try {
        // Create a new doctor instance
        const newDoctor = new Doctor({
            doctor_id,
            name,
            dob,
            address,
            level,
            experience_years,
            training_level,
            specialty
        });

        // Save the doctor to the database
        await newDoctor.save();
        
        // Redirect back to the doctors list
        res.redirect('/'); // Redirect to the route that displays the list of doctors
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// doctorController.js
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find(); // Fetch all doctors
        res.render('index', { doctors }); // Render the view with doctors data
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to edit a doctor
// Update doctor information
// exports.updateDoctor = async (req, res) => {
//     const { id } = req.params; // Get doctor ID from the URL
//     const updatedData = req.body; // Get updated data from the request body

//     try {
//         // Find the doctor by ID and update their information
//         await Doctor.updateOne({ _id: id }, updatedData);
//         res.status(200).send('Doctor updated successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// };

// Trong doctorController.js
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(updatedDoctor);
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(500).json({ message: 'Error updating doctor', error: error.message });
    }
};

// Function to delete a doctor
exports.deleteDoctor = async (req, res) => {
    const doctorId = req.params.id;

    try {
        await Doctor.findByIdAndDelete(doctorId);
        res.redirect('/'); // Redirect to the home page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Function to search for doctors by name
exports.searchDoctor = async (req, res) => {
    const { name } = req.body; // Use req.body for POST method

    try {
        // Find doctors whose name matches the search term (case-insensitive)
        const doctors = await Doctor.find({ name: { $regex: name, $options: 'i' } });

        // Render the view with the search results
        res.render('partials/doctor/doctors', { doctors }); // Make sure 'doctors.ejs' exists

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};