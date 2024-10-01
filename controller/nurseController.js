const Nurse = require('../models/nurse');

// Function to add a new nurse
exports.addNurse = async (req, res) => {
    const { nurse_id, name, dob, address, training_level, experience_years, phone_number } = req.body;

    // Kiểm tra xem tất cả các trường cần thiết đã được cung cấp chưa
    if (!nurse_id || !name || !dob || !address || !training_level || !experience_years || !phone_number) {
        return res.status(400).send('All fields are required.'); // Trả về lỗi nếu thiếu thông tin
    }

    try {
        // Create a new nurse instance
        const newNurse = new Nurse({
            nurse_id,
            name,
            dob,
            address,
            training_level,
            experience_years,
            phone_number
        });

        // Save the nurse to the database
        await newNurse.save();

        // Redirect back to the nurses list
        res.redirect('/'); // Redirect to the route that displays the list of nurses
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Function to get all nurses
exports.getAllNurses = async (req, res) => {
    try {
        const nurses = await Nurse.find(); // Fetch all nurses
        res.render('index', { nurses }); // Render the view with nurses data
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to update nurse information
exports.updateNurse = async (req, res) => {
    const { id } = req.params; // Get nurse ID from the URL
    const updatedData = req.body; // Get updated data from the request body

    try {
        const updatedNurse = await Nurse.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedNurse) {
            return res.status(404).json({ message: 'Nurse not found' });
        }
        res.status(200).json(updatedNurse);
    } catch (error) {
        console.error('Error updating nurse:', error);
        res.status(500).json({ message: 'Error updating nurse', error: error.message });
    }
};

// Function to delete a nurse
exports.deleteNurse = async (req, res) => {
    const nurseId = req.params.id;

    try {
        await Nurse.findByIdAndDelete(nurseId);
        res.redirect('/'); // Redirect to the nurses list page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Function to search for nurses by name
exports.searchNurse = async (req, res) => {
    const { name } = req.body; // Use req.body for POST method

    try {
        // Find nurses whose name matches the search term (case-insensitive)
        const nurses = await Nurse.find({ name: { $regex: name, $options: 'i' } });

        // Render the view with the search results
        res.render('partials/nurse/nurses', { nurses }); // Make sure 'nurses.ejs' exists
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
