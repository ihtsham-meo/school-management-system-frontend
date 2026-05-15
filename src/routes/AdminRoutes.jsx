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
import IDCardsPage from "../pages/idcards/IDCardsPage";
import CertificatesPage from "../pages/certificates/CertificatesPage";
import WebsitePage from "../pages/website/WebsitePage";
import ExamsPage from "../pages/exams/ExamsPage";
import TestsPage from "../pages/tests/TestsPage";
import DiaryPage from "../pages/diary/DiaryPage";
import MessagesPage from "../pages/messages/MessagesPage";
import StudyMaterialsPage from "../pages/studymaterials/StudyMaterialsPage";
import OnlineClassesPage from "../pages/onlineclasses/OnlineClassesPage";
import ExpensesPage from "../pages/expenses/ExpensesPage";
import QuestionBankPage from "../pages/questionbank/QuestionBankPage";
import HelpPage from "../pages/help/HelpPage";
import AdmissionRequestsPage from "../pages/admissions/AdmissionRequestsPage"
import InquiryPipelinePage from "../pages/admissions/InquiryPipelinePage"
import PromotionsPage from "../pages/students/PromotionsPage"

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
        <Route path="id-cards" element={<IDCardsPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
        <Route path="website" element={<WebsitePage />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="diary" element={<DiaryPage />} />
        <Route path="messages/sms" element={<MessagesPage />} />
        <Route path="messages/email" element={<MessagesPage />} />
        <Route path="messages/whatsapp" element={<MessagesPage />} />
        <Route path="messages/push" element={<MessagesPage />} />
        <Route path="study-materials" element={<StudyMaterialsPage />} />
        <Route path="online-classes" element={<OnlineClassesPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="question-bank" element={<QuestionBankPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="admissions/requests" element={<AdmissionRequestsPage />} />
        <Route path="admissions/inquiries" element={<InquiryPipelinePage />} />
        <Route path="students/promotions" element={<PromotionsPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
