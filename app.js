    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const Doctor = require('./models/doctor'); // Import model Doctor
    const Nurse = require('./models/nurse'); // Import model Nurse
    const Patient = require('./models/patient'); // Import model Patient
    const Visit = require('./models/visit'); // Import model Visit
    const Prescription = require('./models/prescription'); // Import model Prescription

    const app = express();

    // Kết nối tới MongoDB
    mongoose.connect('mongodb://localhost:27017/clinic_db', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));

    // Cấu hình middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.set('view engine', 'ejs');

    // Import các route
    const doctorRoutes = require('./routes/doctorRoutes'); // Import the doctorRoutes
    const nurseRoutes = require('./routes/nurseRoutes');
    const patientRoutes = require('./routes/patientRoutes');
    const visitRoutes = require('./routes/visitRoutes');
    const prescriptionRoutes = require('./routes/prescriptionRoutes');

    // Register the doctor routes
    app.use('/doctors', doctorRoutes);
    app.use('/nurses', nurseRoutes);
    app.use('/patients', patientRoutes);
    app.use('/visits', visitRoutes);
    app.use('/prescriptions', prescriptionRoutes);

    // Trang chính
    app.get('/', async (req, res) => {
        try {
            const doctors = await Doctor.find();
            const nurses = await Nurse.find();
            const patients = await Patient.find();
            const visits = await Visit.find();
            const prescriptions = await Prescription.find();

            // Render index.ejs and pass all the data to it
            res.render('index', {
                doctors,
                nurses,
                patients,
                visits,
                prescriptions
            });
        } catch (err) {
            console.error(err); // Log the error to the console
            res.status(500).send('Internal Server Error'); // Send an error response to the client
        }
    });

    // Bắt đầu server
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
