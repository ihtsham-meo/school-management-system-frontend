import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import StudentsPage from "../pages/students/StudentsPage";
import StaffPage from "../pages/staff/StaffPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="staff" element={<StaffPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;