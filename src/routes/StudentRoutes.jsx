import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const StudentDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
  </div>
);

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;