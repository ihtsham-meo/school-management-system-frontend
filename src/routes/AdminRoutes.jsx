import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import StudentsPage from "../pages/students/StudentsPage";
import StaffPage from "../pages/staff/StaffPage";
import ClassesPage from "../pages/classes/ClassesPage";
import AttendancePage from "../pages/attendance/AttendancePage";
import AssignmentsPage from "../pages/assignments/AssignmentsPage";
import FeesPage from "../pages/fees/FeesPage";
import TimetablePage from "../pages/timetable/TimetablePage";
import NoticeBoardPage from "../pages/noticeboard/NoticeBoardPage";
import SettingsPage from "../pages/settings/SettingsPage";
import AdmissionsPage from "../pages/admissions/AdmissionsPage";
import ParentsPage from "../pages/parents/ParentsPage";
import TransportPage from "../pages/transport/TransportPage"; 
import InventoryPage from "../pages/inventory/InventoryPage";
import ReportsPage from "../pages/reports/ReportsPage";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="noticeboard" element={<NoticeBoardPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="parents" element={<ParentsPage />} />
        <Route path="transport" element={<TransportPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;