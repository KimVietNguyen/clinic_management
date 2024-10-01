use clinic_db


function generateRandomDoctors(numDoctors) {
    const firstNames = ["John", "Jane", "Michael", "Emily", "Chris", "Sarah", "David", "Sophia", "Daniel", "Emma"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
    const specialties = ["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Oncology", "General Surgery", "Dermatology", "Psychiatry", "Radiology", "Anesthesiology"];
    const levels = ["Junior", "Senior", "Expert"];
    const trainingLevels = ["Bachelor", "Master", "PhD"];
    const addresses = ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang", "Vung Tau", "Hue", "Thanh Hoa", "Nam Dinh"];
    
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    let doctors = [];

    for (let i = 1; i <= numDoctors; i++) {
        let firstName = randomItem(firstNames);
        let lastName = randomItem(lastNames);
        let doctor = {
            doctor_id: "BS" + (1000 + i),  // Mã số bác sĩ bắt đầu từ BS1001
            name: firstName + " " + lastName,
            dob: randomDate(new Date(1960, 0, 1), new Date(1990, 11, 31)),  // Ngày sinh ngẫu nhiên từ 1960 đến 1990
            address: randomItem(addresses),
            level: randomItem(levels),  // Bậc nghề
            experience_years: Math.floor(Math.random() * 30) + 1,  // Thâm niên từ 1 đến 30 năm
            training_level: randomItem(trainingLevels),  // Trình độ đào tạo
            specialty: randomItem(specialties)  // Chuyên môn
        };

        doctors.push(doctor);
    }

    return doctors;
}

db.doctors.insertMany(generateRandomDoctors(50));


function generateRandomNurses(numNurses) {
    const firstNames = ["Alice", "Sophia", "Liam", "Olivia", "Noah", "Mia", "James", "Emma", "Ethan", "Isabella"];
    const lastNames = ["Nguyen", "Le", "Tran", "Pham", "Hoang", "Vo", "Dang", "Do", "Vu", "Phan"];
    const trainingLevels = ["Intermediate", "Bachelor", "Master"];
    const addresses = ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang", "Hue", "Vung Tau", "Thanh Hoa", "Quang Ninh"];
    
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function randomPhoneNumber() {
        let prefix = ["091", "092", "093", "094", "095", "096", "097", "098", "099"];
        return randomItem(prefix) + Math.floor(1000000 + Math.random() * 9000000);  // Số điện thoại 10 chữ số ngẫu nhiên
    }

    let nurses = [];

    for (let i = 1; i <= numNurses; i++) {
        let firstName = randomItem(firstNames);
        let lastName = randomItem(lastNames);
        let nurse = {
            nurse_id: "YT" + (1000 + i),  // Mã y tá bắt đầu từ YT1001
            name: firstName + " " + lastName,
            dob: randomDate(new Date(1975, 0, 1), new Date(2000, 11, 31)),  // Ngày sinh ngẫu nhiên từ 1975 đến 2000
            address: randomItem(addresses),
            training_level: randomItem(trainingLevels),  // Trình độ đào tạo
            experience_years: Math.floor(Math.random() * 20) + 1,  // Thâm niên từ 1 đến 20 năm
            phone_number: randomPhoneNumber()  // Số điện thoại ngẫu nhiên
        };

        nurses.push(nurse);
    }

    return nurses;
}

db.nurses.insertMany(generateRandomNurses(60));

function generateRandomPatients(numPatients) {
    const firstNames = ["Liam", "Noah", "Oliver", "Elijah", "Emma", "Sophia", "Ava", "Isabella", "Mia", "Amelia"];
    const lastNames = ["Nguyen", "Tran", "Le", "Pham", "Hoang", "Do", "Vu", "Vo", "Bui", "Dang"];
    const addresses = ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang", "Hue", "Thanh Hoa", "Quang Ninh", "Vung Tau"];
    
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function randomPhoneNumber() {
        let prefix = ["098", "097", "096", "091", "090", "093"];
        return randomItem(prefix) + Math.floor(1000000 + Math.random() * 9000000);  // Số điện thoại 10 chữ số ngẫu nhiên
    }

    let patients = [];

    for (let i = 1; i <= numPatients; i++) {
        let firstName = randomItem(firstNames);
        let lastName = randomItem(lastNames);
        let patient = {
            patient_id: "BN" + (1000 + i),  // Mã số bệnh nhân bắt đầu từ BN1001
            name: firstName + " " + lastName,
            dob: randomDate(new Date(1960, 0, 1), new Date(2015, 11, 31)),  // Ngày sinh từ 1960 đến 2015
            address: randomItem(addresses),
            phone_number: randomPhoneNumber()  // Số điện thoại ngẫu nhiên
        };

        patients.push(patient);
    }

    return patients;
}

db.patients.insertMany(generateRandomPatients(300));

function generateRandomVisits(numVisits) {
    const diseases = ["Cảm cúm", "Đau bụng", "Viêm phổi", "Gãy xương", "Cao huyết áp", "Tiểu đường", "Đau đầu", "Sốt xuất huyết", "Viêm họng", "Bệnh tim"];
    
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    let visits = [];

    // Lấy danh sách bệnh nhân, bác sĩ và y tá đã được tạo
    const patients = db.patients.find().toArray();
    const doctors = db.doctors.find().toArray();
    const nurses = db.nurses.find().toArray();

    for (let i = 1; i <= numVisits; i++) {
        let visit = {
            visit_id: "KV" + (1000 + i),  // Mã số lần khám bắt đầu từ KV1001
            patient_id: randomItem(patients).patient_id,  // Lấy ngẫu nhiên mã bệnh nhân
            doctor_id: randomItem(doctors).doctor_id,  // Lấy ngẫu nhiên mã bác sĩ
            nurse_id: randomItem(nurses).nurse_id,  // Lấy ngẫu nhiên mã y tá
            admission_date: randomDate(new Date(2024, 0, 1), new Date(2024, 9, 1)),  // Ngày vào viện ngẫu nhiên
            discharge_date: randomDate(new Date(2024, 0, 1), new Date(2024, 9, 1)),  // Ngày ra viện ngẫu nhiên
            disease: randomItem(diseases),  // Tên bệnh ngẫu nhiên
            visit_code: "BC" + Math.floor(1000 + Math.random() * 9000),  // Mã số khám ngẫu nhiên
            total_cost: Math.floor(Math.random() * 1000000) + 200000,  // Tổng số tiền khám/chữa bệnh ngẫu nhiên (từ 200.000 đến 1.200.000)
        };

        visits.push(visit);
    }

    return visits;
}

db.visits.insertMany(generateRandomVisits(200));

function generateRandomPrescriptions(numPrescriptions) {
    const medications = [
        { name: "Paracetamol", price: 15000 },
        { name: "Ibuprofen", price: 20000 },
        { name: "Amoxicillin", price: 25000 },
        { name: "Loperamide", price: 18000 },
        { name: "Cetirizine", price: 22000 },
        { name: "Metformin", price: 30000 },
        { name: "Aspirin", price: 17000 },
        { name: "Omeprazole", price: 28000 },
        { name: "Ciprofloxacin", price: 26000 },
        { name: "Dexamethasone", price: 35000 },
    ];

    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    let prescriptions = [];

    // Lấy danh sách lượt khám đã được tạo
    const visits = db.visits.find().toArray();

    for (let i = 1; i <= numPrescriptions; i++) {
        let medication = randomItem(medications);
        let prescription = {
            prescription_id: "DT" + (1000 + i),  // Mã đơn thuốc bắt đầu từ DT1001
            visit_id: randomItem(visits).visit_id,  // Lấy ngẫu nhiên mã lượt khám
            medication_name: medication.name,  // Tên thuốc ngẫu nhiên
            quantity: Math.floor(Math.random() * 3) + 1,  // Số lượng thuốc (từ 1 đến 3)
            price: medication.price  // Giá thuốc
        };

        prescriptions.push(prescription);
    }

    return prescriptions;
}

db.prescriptions.insertMany(generateRandomPrescriptions(100));