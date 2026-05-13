// ─────────────────────────────────────────────
// SCHOOL MANAGEMENT SYSTEM — CENTRAL DUMMY DATA
// ─────────────────────────────────────────────

// ── STUDENTS ─────────────────────────────────
const firstNames = ["Ahmed", "Sara", "Usman", "Fatima", "Bilal", "Ayesha", "Zain", "Hira", "Omar", "Nadia",
  "Hassan", "Sana", "Tariq", "Rabia", "Imran", "Zara", "Ali", "Amna", "Hamza", "Maryam",
  "Faisal", "Kiran", "Shahid", "Lubna", "Kamran", "Saira", "Adnan", "Noor", "Waseem", "Huma"];

const lastNames = ["Khan", "Ali", "Tariq", "Noor", "Hassan", "Malik", "Ahmed", "Baig", "Farooq", "Hussain",
  "Qureshi", "Shah", "Raza", "Butt", "Mirza", "Siddiqui", "Chaudhry", "Awan", "Javed", "Riaz"];

const classes = ["8-A", "8-B", "9-A", "9-B", "10-A", "10-B", "11-A", "11-B", "12-A", "12-B"];
const feeStatuses = ["Paid", "Pending", "Paid", "Pending", "Overdue"]; // weighted — more Paid
const genders = ["Male", "Female"];
const cities = ["Rawalpindi", "Islamabad", "Lahore", "Karachi", "Multan", "Peshawar", "Quetta", "Faisalabad"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export const studentsData = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const name = `${firstName} ${lastName}`;
  return {
    id: i + 1,
    name,
    rollNo: `2024-${String(i + 1).padStart(3, "0")}`,
    class: classes[i % classes.length],
    gender: genders[i % 2],
    phone: `03${String(Math.floor(Math.random() * 9)).padStart(2, "0")}-${Math.floor(1000000 + Math.random() * 9000000)}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@school.com`,
    address: cities[i % cities.length],
    fee: feeStatuses[i % feeStatuses.length],
    avatar: firstName.charAt(0),
    joining: `${months[i % months.length]} 2024`,
    parent: `Mr. ${lastName}`,
  };
});

// ── STAFF ─────────────────────────────────────
export const staffData = [
  { id: 1, name: "Dr. Khalid Mehmood", role: "Principal", department: "Administration", phone: "0300-1111111", email: "khalid@school.com", salary: "₨ 120,000", status: "Active", joining: "Jan 2018", avatar: "K" },
  { id: 2, name: "Mrs. Rabia Tariq", role: "Teacher", department: "Mathematics", phone: "0301-2222222", email: "rabia@school.com", salary: "₨ 65,000", status: "Active", joining: "Mar 2019", avatar: "R" },
  { id: 3, name: "Mr. Imran Qureshi", role: "Teacher", department: "Physics", phone: "0302-3333333", email: "imran@school.com", salary: "₨ 60,000", status: "On Leave", joining: "Jun 2020", avatar: "I" },
  { id: 4, name: "Ms. Sana Baig", role: "Coordinator", department: "Science", phone: "0303-4444444", email: "sana@school.com", salary: "₨ 75,000", status: "Active", joining: "Aug 2017", avatar: "S" },
  { id: 5, name: "Mr. Tariq Jameel", role: "Teacher", department: "English", phone: "0304-5555555", email: "tariq@school.com", salary: "₨ 58,000", status: "Active", joining: "Sep 2021", avatar: "T" },
  { id: 6, name: "Mrs. Nadia Shah", role: "Teacher", department: "Urdu", phone: "0305-6666666", email: "nadia@school.com", salary: "₨ 55,000", status: "Inactive", joining: "Feb 2022", avatar: "N" },
  { id: 7, name: "Mr. Asif Raza", role: "Admin Officer", department: "Administration", phone: "0306-7777777", email: "asif@school.com", salary: "₨ 50,000", status: "Active", joining: "Apr 2020", avatar: "A" },
  { id: 8, name: "Ms. Huma Nawaz", role: "Teacher", department: "Chemistry", phone: "0307-8888888", email: "huma@school.com", salary: "₨ 62,000", status: "Active", joining: "Jul 2019", avatar: "H" },
];

// ── CLASSES ───────────────────────────────────
export const classesData = [
  { id: 1, name: "Class 1", sections: ["A", "B"], subjects: 6, students: 64, teacher: "Mrs. Rabia Tariq", room: "101", status: "Active" },
  { id: 2, name: "Class 2", sections: ["A", "B"], subjects: 6, students: 58, teacher: "Mr. Imran Qureshi", room: "102", status: "Active" },
  { id: 3, name: "Class 3", sections: ["A", "B", "C"], subjects: 7, students: 72, teacher: "Ms. Sana Baig", room: "103", status: "Active" },
  { id: 4, name: "Class 4", sections: ["A", "B"], subjects: 7, students: 61, teacher: "Mr. Tariq Jameel", room: "104", status: "Active" },
  { id: 5, name: "Class 5", sections: ["A", "B", "C"], subjects: 8, students: 79, teacher: "Mrs. Nadia Shah", room: "105", status: "Active" },
  { id: 6, name: "Class 6", sections: ["A", "B"], subjects: 9, students: 55, teacher: "Mr. Asif Raza", room: "201", status: "Active" },
  { id: 7, name: "Class 7", sections: ["A", "B"], subjects: 9, students: 60, teacher: "Ms. Huma Nawaz", room: "202", status: "Active" },
  { id: 8, name: "Class 8", sections: ["A", "B", "C"], subjects: 10, students: 83, teacher: "Mrs. Rabia Tariq", room: "203", status: "Active" },
  { id: 9, name: "Class 9", sections: ["A", "B", "C"], subjects: 11, students: 91, teacher: "Mr. Imran Qureshi", room: "301", status: "Active" },
  { id: 10, name: "Class 10", sections: ["A", "B", "C"], subjects: 11, students: 88, teacher: "Ms. Sana Baig", room: "302", status: "Active" },
  { id: 11, name: "Class 11", sections: ["A", "B"], subjects: 12, students: 74, teacher: "Mr. Tariq Jameel", room: "303", status: "Active" },
  { id: 12, name: "Class 12", sections: ["A", "B"], subjects: 12, students: 70, teacher: "Mrs. Nadia Shah", room: "304", status: "Inactive" },
];

// ── ATTENDANCE ────────────────────────────────
export const attendanceData = [
  { month: "Jan", present: 92, absent: 8 },
  { month: "Feb", present: 88, absent: 12 },
  { month: "Mar", present: 95, absent: 5 },
  { month: "Apr", present: 85, absent: 15 },
  { month: "May", present: 78, absent: 22 },
  { month: "Jun", present: 91, absent: 9 },
  { month: "Jul", present: 87, absent: 13 },
  { month: "Aug", present: 93, absent: 7 },
];

// ── FEES ──────────────────────────────────────
export const feesData = [
  { id: 1, student: "Ahmed Khan", rollNo: "2024-001", class: "10-A", amount: "₨ 8,500", due: "May 10", status: "Paid", month: "May 2025" },
  { id: 2, student: "Sara Ali", rollNo: "2024-002", class: "9-B", amount: "₨ 7,500", due: "May 10", status: "Pending", month: "May 2025" },
  { id: 3, student: "Usman Tariq", rollNo: "2024-003", class: "11-C", amount: "₨ 9,000", due: "May 10", status: "Paid", month: "May 2025" },
  { id: 4, student: "Fatima Noor", rollNo: "2024-004", class: "8-A", amount: "₨ 7,000", due: "Apr 10", status: "Overdue", month: "Apr 2025" },
  { id: 5, student: "Bilal Hassan", rollNo: "2024-005", class: "12-B", amount: "₨ 9,500", due: "May 10", status: "Paid", month: "May 2025" },
  { id: 6, student: "Ayesha Malik", rollNo: "2024-006", class: "10-A", amount: "₨ 8,500", due: "May 10", status: "Paid", month: "May 2025" },
  { id: 7, student: "Zain Ahmed", rollNo: "2024-007", class: "9-B", amount: "₨ 7,500", due: "May 10", status: "Pending", month: "May 2025" },
  { id: 8, student: "Hira Baig", rollNo: "2024-008", class: "11-C", amount: "₨ 9,000", due: "May 10", status: "Paid", month: "May 2025" },
];

// ── ASSIGNMENTS ───────────────────────────────
export const assignmentsData = [
  { id: 1, title: "Algebra Chapter 5", subject: "Mathematics", class: "10-A", teacher: "Mrs. Rabia Tariq", dueDate: "May 15, 2025", status: "Active", submissions: 18, total: 32 },
  { id: 2, title: "Newton's Laws Essay", subject: "Physics", class: "11-C", teacher: "Mr. Imran Qureshi", dueDate: "May 18, 2025", status: "Active", submissions: 22, total: 28 },
  { id: 3, title: "Shakespeare Analysis", subject: "English", class: "12-B", teacher: "Mr. Tariq Jameel", dueDate: "May 12, 2025", status: "Expired", submissions: 30, total: 30 },
  { id: 4, title: "Periodic Table Quiz", subject: "Chemistry", class: "9-B", teacher: "Ms. Huma Nawaz", dueDate: "May 20, 2025", status: "Active", submissions: 10, total: 25 },
  { id: 5, title: "Urdu Poetry", subject: "Urdu", class: "8-A", teacher: "Mrs. Nadia Shah", dueDate: "May 22, 2025", status: "Active", submissions: 5, total: 20 },
];

// ── TIMETABLE ─────────────────────────────────
export const timetableData = [
  { id: 1, day: "Monday", period: 1, subject: "Mathematics", teacher: "Mrs. Rabia Tariq", class: "10-A", room: "101", time: "08:00 - 08:45" },
  { id: 2, day: "Monday", period: 2, subject: "Physics", teacher: "Mr. Imran Qureshi", class: "10-A", room: "Lab 1", time: "08:45 - 09:30" },
  { id: 3, day: "Monday", period: 3, subject: "English", teacher: "Mr. Tariq Jameel", class: "10-A", room: "102", time: "09:30 - 10:15" },
  { id: 4, day: "Monday", period: 4, subject: "Chemistry", teacher: "Ms. Huma Nawaz", class: "10-A", room: "Lab 2", time: "10:30 - 11:15" },
  { id: 5, day: "Monday", period: 5, subject: "Urdu", teacher: "Mrs. Nadia Shah", class: "10-A", room: "103", time: "11:15 - 12:00" },
  { id: 6, day: "Tuesday", period: 1, subject: "Chemistry", teacher: "Ms. Huma Nawaz", class: "10-A", room: "Lab 2", time: "08:00 - 08:45" },
  { id: 7, day: "Tuesday", period: 2, subject: "Mathematics", teacher: "Mrs. Rabia Tariq", class: "10-A", room: "101", time: "08:45 - 09:30" },
  { id: 8, day: "Tuesday", period: 3, subject: "Urdu", teacher: "Mrs. Nadia Shah", class: "10-A", room: "103", time: "09:30 - 10:15" },
  { id: 9, day: "Wednesday", period: 1, subject: "English", teacher: "Mr. Tariq Jameel", class: "10-A", room: "102", time: "08:00 - 08:45" },
  { id: 10, day: "Wednesday", period: 2, subject: "Physics", teacher: "Mr. Imran Qureshi", class: "10-A", room: "Lab 1", time: "08:45 - 09:30" },
  { id: 11, day: "Thursday", period: 1, subject: "Mathematics", teacher: "Mrs. Rabia Tariq", class: "10-A", room: "101", time: "08:00 - 08:45" },
  { id: 12, day: "Thursday", period: 2, subject: "Chemistry", teacher: "Ms. Huma Nawaz", class: "10-A", room: "Lab 2", time: "08:45 - 09:30" },
  { id: 13, day: "Friday", period: 1, subject: "Urdu", teacher: "Mrs. Nadia Shah", class: "10-A", room: "103", time: "08:00 - 08:45" },
  { id: 14, day: "Friday", period: 2, subject: "English", teacher: "Mr. Tariq Jameel", class: "10-A", room: "102", time: "08:45 - 09:30" },
];

// ── NOTICES ───────────────────────────────────
export const noticesData = [
  { id: 1, title: "Annual Sports Day", date: "May 15", type: "Event", audience: "All" },
  { id: 2, title: "Fee Submission Deadline", date: "May 20", type: "Finance", audience: "Parents" },
  { id: 3, title: "Parent-Teacher Meeting", date: "May 25", type: "Meeting", audience: "Parents" },
  { id: 4, title: "Summer Break Starts", date: "Jun 01", type: "Holiday", audience: "All" },
  { id: 5, title: "Board Exam Schedule", date: "Jun 10", type: "Exam", audience: "Students" },
];

// ── DASHBOARD CHARTS ──────────────────────────
export const monthlyFinanceData = [
  { month: "Jan", income: 42000, expense: 28000 },
  { month: "Feb", income: 38000, expense: 22000 },
  { month: "Mar", income: 55000, expense: 31000 },
  { month: "Apr", income: 47000, expense: 26000 },
  { month: "May", income: 63000, expense: 35000 },
  { month: "Jun", income: 58000, expense: 29000 },
  { month: "Jul", income: 71000, expense: 38000 },
  { month: "Aug", income: 66000, expense: 33000 },
  { month: "Sep", income: 74000, expense: 41000 },
  { month: "Oct", income: 69000, expense: 36000 },
  { month: "Nov", income: 82000, expense: 44000 },
  { month: "Dec", income: 91000, expense: 48000 },
];

export const weeklyAttendanceData = [
  { day: "Mon", present: 92, absent: 8 },
  { day: "Tue", present: 88, absent: 12 },
  { day: "Wed", present: 95, absent: 5 },
  { day: "Thu", present: 85, absent: 15 },
  { day: "Fri", present: 78, absent: 22 },
];

export const feeCollectionData = [
  { name: "Collected", value: 68, color: "#22c55e" },
  { name: "Pending", value: 22, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
];

// ── DEPARTMENTS ───────────────────────────────
export const departmentsData = [
  "Administration", "Mathematics", "Physics",
  "Science", "English", "Urdu", "Chemistry", "Biology", "Computer Science",
];

// ── SHARED CONSTANTS ──────────────────────────
export const classOptions = [
  "1-A", "1-B", "2-A", "2-B", "3-A", "3-B",
  "4-A", "4-B", "5-A", "5-B", "6-A", "6-B",
  "7-A", "7-B", "8-A", "8-B", "9-A", "9-B",
  "10-A", "10-B", "11-A", "11-B", "12-A", "12-B",
];

// ── ADMISSIONS ────────────────────────────────
export const admissionsData = [
  { id: 1, name: "Hamza Iqbal", father: "Mr. Iqbal", phone: "0300-1112233", email: "hamza@gmail.com", applyingFor: "Class 6", status: "Approved", date: "May 01", avatar: "H" },
  { id: 2, name: "Zoya Mirza", father: "Mr. Mirza", phone: "0301-2223344", email: "zoya@gmail.com", applyingFor: "Class 9", status: "Pending", date: "May 02", avatar: "Z" },
  { id: 3, name: "Umer Farhan", father: "Mr. Farhan", phone: "0302-3334455", email: "umer@gmail.com", applyingFor: "Class 1", status: "Approved", date: "May 03", avatar: "U" },
  { id: 4, name: "Mahnoor Ali", father: "Mr. Ali", phone: "0303-4445566", email: "mahnoor@gmail.com", applyingFor: "Class 7", status: "Rejected", date: "May 04", avatar: "M" },
  { id: 5, name: "Daniyal Khan", father: "Mr. Khan", phone: "0304-5556677", email: "daniyal@gmail.com", applyingFor: "Class 10", status: "Pending", date: "May 05", avatar: "D" },
  { id: 6, name: "Areeba Shah", father: "Mr. Shah", phone: "0305-6667788", email: "areeba@gmail.com", applyingFor: "Class 3", status: "Approved", date: "May 06", avatar: "A" },
  { id: 7, name: "Saad Butt", father: "Mr. Butt", phone: "0306-7778899", email: "saad@gmail.com", applyingFor: "Class 8", status: "Pending", date: "May 07", avatar: "S" },
  { id: 8, name: "Hina Raza", father: "Mr. Raza", phone: "0307-8889900", email: "hina@gmail.com", applyingFor: "Class 5", status: "Interview", date: "May 08", avatar: "H" },
  { id: 9, name: "Talha Nawaz", father: "Mr. Nawaz", phone: "0308-9990011", email: "talha@gmail.com", applyingFor: "Class 11", status: "Interview", date: "May 09", avatar: "T" },
  { id: 10, name: "Saba Javed", father: "Mr. Javed", phone: "0309-0001122", email: "saba@gmail.com", applyingFor: "Class 2", status: "Approved", date: "May 10", avatar: "S" },
];

// ── PARENTS ───────────────────────────────────
export const parentsData = [
  { id: 1, name: "Mr. Arif Khan", phone: "0300-1234567", email: "arif@gmail.com", children: ["Ahmed Khan", "Ayesha Khan"], totalFee: "₨ 17,000", paidFee: "₨ 17,000", status: "Active", avatar: "A", address: "Rawalpindi" },
  { id: 2, name: "Mr. Tariq Ali", phone: "0301-2345678", email: "tariq@gmail.com", children: ["Sara Ali"], totalFee: "₨ 7,500", paidFee: "₨ 0", status: "Active", avatar: "T", address: "Islamabad" },
  { id: 3, name: "Mr. Usman Tariq", phone: "0302-3456789", email: "usman@gmail.com", children: ["Usman Tariq Jr"], totalFee: "₨ 9,000", paidFee: "₨ 9,000", status: "Active", avatar: "U", address: "Rawalpindi" },
  { id: 4, name: "Mr. Bilal Noor", phone: "0303-4567890", email: "bilal@gmail.com", children: ["Fatima Noor"], totalFee: "₨ 7,000", paidFee: "₨ 0", status: "Inactive", avatar: "B", address: "Lahore" },
  { id: 5, name: "Mr. Hassan Bilal", phone: "0304-5678901", email: "hassan@gmail.com", children: ["Bilal Hassan", "Zara Hassan"], totalFee: "₨ 18,500", paidFee: "₨ 18,500", status: "Active", avatar: "H", address: "Karachi" },
  { id: 6, name: "Mr. Imran Malik", phone: "0305-6789012", email: "imran@gmail.com", children: ["Ayesha Malik"], totalFee: "₨ 8,500", paidFee: "₨ 8,500", status: "Active", avatar: "I", address: "Rawalpindi" },
  { id: 7, name: "Mr. Zain Ahmed", phone: "0306-7890123", email: "zain@gmail.com", children: ["Zain Ahmed Jr"], totalFee: "₨ 7,500", paidFee: "₨ 0", status: "Active", avatar: "Z", address: "Islamabad" },
  { id: 8, name: "Mr. Kamran Baig", phone: "0307-8901234", email: "kamran@gmail.com", children: ["Hira Baig"], totalFee: "₨ 9,000", paidFee: "₨ 9,000", status: "Active", avatar: "K", address: "Multan" },
];

// ── TRANSPORT ─────────────────────────────────
export const transportData = [
  { id: 1, route: "Route A - Rawalpindi", driver: "Mr. Aslam Khan", vehicle: "Toyota Coaster", plate: "RWP-1234", students: 28, capacity: 35, status: "Active", departure: "07:00 AM", return: "02:30 PM" },
  { id: 2, route: "Route B - Islamabad", driver: "Mr. Sajid Ali", vehicle: "Hino Bus", plate: "ISB-5678", students: 42, capacity: 45, status: "Active", departure: "07:15 AM", return: "02:45 PM" },
  { id: 3, route: "Route C - Saddar", driver: "Mr. Naveed Iqbal", vehicle: "Toyota Coaster", plate: "RWP-9012", students: 30, capacity: 35, status: "Active", departure: "07:30 AM", return: "03:00 PM" },
  { id: 4, route: "Route D - Bahria Town", driver: "Mr. Rashid Mehmood", vehicle: "Hino Bus", plate: "RWP-3456", students: 38, capacity: 45, status: "Active", departure: "07:00 AM", return: "02:30 PM" },
  { id: 5, route: "Route E - DHA", driver: "Mr. Khalid Hussain", vehicle: "Toyota Coaster", plate: "ISB-7890", students: 22, capacity: 35, status: "Inactive", departure: "07:45 AM", return: "03:15 PM" },
  { id: 6, route: "Route F - Chaklala", driver: "Mr. Amjad Raza", vehicle: "Hino Bus", plate: "RWP-2345", students: 40, capacity: 45, status: "Active", departure: "07:20 AM", return: "02:50 PM" },
];

// ── REPORTS ───────────────────────────────────
export const reportsData = [
  { id: 1, title: "Monthly Fee Collection Report", category: "Finance", generated: "May 10, 2025", size: "2.4 MB", format: "PDF", status: "Ready" },
  { id: 2, title: "Student Attendance Summary", category: "Attendance", generated: "May 09, 2025", size: "1.8 MB", format: "Excel", status: "Ready" },
  { id: 3, title: "Staff Payroll Report", category: "HR", generated: "May 08, 2025", size: "3.1 MB", format: "PDF", status: "Ready" },
  { id: 4, title: "Class Performance Analysis", category: "Academic", generated: "May 07, 2025", size: "4.2 MB", format: "PDF", status: "Ready" },
  { id: 5, title: "Transport Route Report", category: "Transport", generated: "May 06, 2025", size: "1.2 MB", format: "Excel", status: "Ready" },
  { id: 6, title: "Inventory Stock Report", category: "Inventory", generated: "May 05, 2025", size: "2.8 MB", format: "Excel", status: "Processing" },
  { id: 7, title: "Admission Statistics", category: "Admissions", generated: "May 04, 2025", size: "1.5 MB", format: "PDF", status: "Ready" },
  { id: 8, title: "Annual Academic Report", category: "Academic", generated: "May 03, 2025", size: "8.6 MB", format: "PDF", status: "Ready" },
];

// ── INVENTORY ─────────────────────────────────
export const inventoryData = [
  { id: 1, item: "White Board Marker", category: "Stationery", quantity: 150, minStock: 50, unit: "Pieces", price: "₨ 25", supplier: "Ali Traders", status: "In Stock", lastUpdated: "May 10" },
  { id: 2, item: "A4 Paper Ream", category: "Stationery", quantity: 40, minStock: 20, unit: "Reams", price: "₨ 850", supplier: "Paper World", status: "In Stock", lastUpdated: "May 09" },
  { id: 3, item: "Projector Bulb", category: "Electronics", quantity: 5, minStock: 3, unit: "Pieces", price: "₨ 3,500", supplier: "Tech Zone", status: "Low Stock", lastUpdated: "May 08" },
  { id: 4, item: "Classroom Chair", category: "Furniture", quantity: 0, minStock: 10, unit: "Pieces", price: "₨ 2,200", supplier: "Furniture Hub", status: "Out of Stock", lastUpdated: "May 07" },
  { id: 5, item: "Whiteboard", category: "Furniture", quantity: 8, minStock: 5, unit: "Pieces", price: "₨ 4,500", supplier: "Office Plus", status: "In Stock", lastUpdated: "May 06" },
  { id: 6, item: "Printer Ink Cartridge", category: "Electronics", quantity: 12, minStock: 10, unit: "Pieces", price: "₨ 1,800", supplier: "Tech Zone", status: "In Stock", lastUpdated: "May 05" },
  { id: 7, item: "Notebook (200 pages)", category: "Stationery", quantity: 200, minStock: 100, unit: "Pieces", price: "₨ 120", supplier: "Ali Traders", status: "In Stock", lastUpdated: "May 04" },
  { id: 8, item: "Football", category: "Sports", quantity: 3, minStock: 5, unit: "Pieces", price: "₨ 1,500", supplier: "Sports World", status: "Low Stock", lastUpdated: "May 03" },
  { id: 9, item: "First Aid Kit", category: "Medical", quantity: 4, minStock: 3, unit: "Kits", price: "₨ 2,000", supplier: "MedSupply", status: "In Stock", lastUpdated: "May 02" },
  { id: 10, item: "Desk Lamp", category: "Electronics", quantity: 0, minStock: 5, unit: "Pieces", price: "₨ 950", supplier: "Tech Zone", status: "Out of Stock", lastUpdated: "May 01" },
];

export const feeStatusOptions = ["Paid", "Pending", "Overdue"];
export const staffStatusOptions = ["Active", "On Leave", "Inactive"];
export const genderOptions = ["Male", "Female"];

