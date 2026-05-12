import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Auth Pages (we'll create these soon)
import LoginPage from "../pages/auth/LoginPage";

// Route Guards
import AdminRoutes from "./AdminRoutes";
import TeacherRoutes from "./TeacherRoutes";
import StudentRoutes from "./StudentRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
// 👇 Temporary mock hook — remove after backend is ready
const useMockLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      loginSuccess({
        user: { name: "Admin User" },
        role: "admin",
        token: "mock-token-123",
      }),
    );
  }, [dispatch]);
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  useMockLogin();
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={`/${role}/dashboard`} replace />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherRoutes />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentRoutes />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-3xl font-bold text-red-500">
                403 — Unauthorized
              </h1>
            </div>
          }
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
