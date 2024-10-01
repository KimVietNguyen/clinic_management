// nurseRoutes.js
const express = require('express');
const router = express.Router();
const NurseController = require('../controller/nurseController.js');

// Route to display the list of nurses
router.get('/', NurseController.getAllNurses); // Assuming you have this function to get nurses

// Route to display the add nurse form
router.get('/add', (req, res) => {
    res.render('partials/nurse/addNurse'); // Render the addNurse.ejs form
});

// Route to handle the form submission for adding a new nurse
router.post('/add', NurseController.addNurse); // Use the addNurse method from your controller

// Route to edit a nurse
router.post('/nurses/update/:id', NurseController.updateNurse);

// Route to delete a nurse
router.post('/delete/:id', NurseController.deleteNurse); // Delete a nurse

// Route to search nurses by name
router.post('/search', NurseController.searchNurse);

module.exports = router;
