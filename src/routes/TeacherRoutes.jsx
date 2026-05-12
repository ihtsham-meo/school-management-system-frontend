import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

const TeacherDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-white">Teacher Dashboard</h1>
  </div>
);

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;