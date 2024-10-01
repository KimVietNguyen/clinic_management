{ comment: "1. Liệt kê danh sách các loại bệnh được các bệnh nhân mắc phải trong một tháng cho trước, sắp xếp theo số bệnh nhân giảm dần" }
use clinic_db
db.visits.aggregate([
    {
        $match: {
            admission_date: {
                $gte: ISODate("2024-08-01"),  // Ngày đầu tháng cần truy vấn
                $lt: ISODate("2024-09-01")    // Ngày cuối tháng cần truy vấn
            }
        }
    },
    {
        $group: {
            _id: { patient_id: "$patient_id", disease: "$disease" },
            first_visit: { $min: "$admission_date" },
            last_visit: { $max: "$discharge_date" }
        }
    },
    {
        $group: {
            _id: "$_id.disease",
            unique_patients: { $addToSet: "$_id.patient_id" }
        }
    },
    {
        $project: {
            disease: "$_id",
            patient_count: { $size: "$unique_patients" }
        }
    },
    {
        $sort: { patient_count: -1 }  // Sắp xếp theo số lượng bệnh nhân giảm dần
    }
]);

{ comment: "2. Tính lương của các bác sỹ và y tá trong một tháng" }

{ comment: "Tính lương của bác sĩ " }

db.visits.aggregate([
    {
        $match: {
            admission_date: {
                $gte: ISODate("2024-08-01"),  // Ngày đầu tháng cần tính lương
                $lt: ISODate("2024-09-01")    // Ngày cuối tháng cần tính lương
            }
        }
    },
    {
        $group: {
            _id: "$doctor_id",  // Mã số bác sỹ
            total_visits: { $sum: 1 },  // Tổng số lượt khám của bác sĩ trong tháng
            completed_treatments: { $sum: { $cond: [ { $eq: ["$treatment_status", "completed"] }, 1, 0 ] } }  // Tổng số bệnh nhân đã chữa khỏi
        }
    },
    {
        $addFields: {
            base_salary: { $cond: [{ $gt: ["$total_visits", 0] }, 7000000, 0] },  // Lương cơ bản, chỉ nhận nếu có lượt khám
            bonus: { $multiply: ["$completed_treatments", 1000000] },  // 1 triệu cho mỗi bệnh nhân được chữa khỏi
            total_salary: { 
                $add: [
                    { $cond: [{ $gt: ["$total_visits", 0] }, 7000000, 0] },  // Lương cơ bản
                    { $multiply: ["$completed_treatments", 1000000] }  // Tiền thưởng
                ]
            }  // Tổng lương
        }
    },
    {
        $project: {
            doctor_id: "$_id",  // Trả về ID bác sỹ
            total_salary: 1,     // Trả về tổng lương
            total_visits: 1,     // Trả về tổng số lượt khám
            completed_treatments: 1  // Trả về số bệnh nhân đã chữa khỏi
        }
    }
]);

{ comment: "Tính lương y tá" }
db.visits.aggregate([
    {
        $match: {
            admission_date: {
                $gte: ISODate("2024-08-01"),  // Ngày đầu tháng cần tính lương
                $lt: ISODate("2024-09-01")    // Ngày cuối tháng cần tính lương
            }
        }
    },
    {
        $group: {
            _id: "$nurse_id",  // Mã số y tá
            total_visits: { $sum: 1 },  // Tổng số lượt khám của bác sĩ trong tháng
            completed_treatments: { $sum: { $cond: [ { $eq: ["$treatment_status", "completed"] }, 1, 0 ] } }  // Tổng số bệnh nhân đã chữa khỏi
        }
    },
    {
        $addFields: {
            base_salary: { $cond: [{ $gt: ["$total_visits", 0] }, 5000000, 0] },  // Lương cơ bản, chỉ nhận nếu có lượt khám
            bonus: { $multiply: ["$completed_treatments", 200000] },  // 1 triệu cho mỗi bệnh nhân được chữa khỏi
            total_salary: { 
                $add: [
                    { $cond: [{ $gt: ["$total_visits", 0] }, 5000000, 0] },  // Lương cơ bản
                    { $multiply: ["$completed_treatments", 200000] }  // Tiền thưởng
                ]
            }  // Tổng lương
        }
    },
    {
        $project: {
            nurse_id: "$_id",  // Trả về ID y tá
            total_salary: 1,     // Trả về tổng lương
            total_visits: 1,     // Trả về tổng số lượt khám
            completed_treatments: 1  // Trả về số bệnh nhân đã chữa khỏi
        }
    }
]);

{ comment: "3. Hiển thị thông tin của một bệnh nhân nào đó cùng với tất cả các thông tin khám chữa bệnh của họ từ trước đến nay. Thông tin về tình trạng bệnh của họ tại thời điểm hiện tại (mắc những bệnh gì, khám lần thứ mấy cho mỗi bệnh,…)." }

const patient = db.patients.findOne({}, { patient_id: 1 }); // chọn một bệnh nhân bất kỳ 
const patientId = patient ? patient.patient_id : null; // Kiểm tra xem bệnh nhân có tồn tại không

db.patients.aggregate([
    {
        $match: { patient_id: patientId }  // Tìm bệnh nhân theo mã số
    },
    {
        $lookup: {
            from: "visits",  // Tên collection chứa thông tin khám
            localField: "patient_id",  // Trường khóa trong patients
            foreignField: "patient_id",  // Trường khóa trong visits
            as: "visits_info"  // Tên trường chứa kết quả từ lookup
        }
    },
    {
        $lookup: {
            from: "prescriptions",  // Tên collection chứa thông tin đơn thuốc
            localField: "visits_info.visit_id",  // Trường khóa trong visits
            foreignField: "visit_id",  // Trường khóa trong prescriptions
            as: "prescriptions_info"  // Tên trường chứa kết quả từ lookup
        }
    },
    {
        $project: {
            _id: 0,
            patient_id: "$patient_id",  // ID bệnh nhân
            name: "$name",  // Tên bệnh nhân
            visits_info: 1,  // Thông tin các lượt khám
            prescriptions_info: 1  // Thông tin đơn thuốc
        }
    }
]);


{ comment: "4. Tính Doanh thu của Phòng khám dựa trên số tiền khám/chữa bệnh của các bệnh nhân và số tiền bán thuốc trên các đơn thuốc." }
db.visits.aggregate([
    {
        $group: {
            _id: null,  // Không nhóm theo bất kỳ trường nào, tính tổng cho toàn bộ
            total_revenue: { $sum: "$total_cost" }  // Tính tổng tiền khám chữa bệnh
        }
    },
    {
        $lookup: {
            from: "prescriptions",  // Kết nối với collection prescriptions
            pipeline: [
                {
                    $group: {
                        _id: null,
                        total_prescription_revenue: { $sum: "$price*$quantity" }  // Tính tổng giá trị đơn thuốc
                    }
                }
            ],
            as: "prescription_info"  // Tên trường chứa kết quả từ lookup
        }
    },
    {
        $unwind: {
            path: "$prescription_info",
            preserveNullAndEmptyArrays: true  // Đảm bảo vẫn có kết quả ngay cả khi không có đơn thuốc
        }
    },
    {
        $project: {
            _id: 0,
            total_revenue: { $add: ["$total_revenue", "$prescription_info.total_prescription_revenue"] }  // Cộng doanh thu từ lượt khám và đơn thuốc
        }
    }
]);

