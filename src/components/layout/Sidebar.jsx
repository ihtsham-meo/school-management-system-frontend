import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  Clipboard,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Briefcase,
  Grid,
  ChevronDown,
  ChevronUp,
  Mail,
  Truck,
  Archive,
  Award,
  BarChart2,
  Globe,
  CreditCard,
  Bell,
  HelpCircle,
  FileText,
  Shield,
  X,
  Menu,
  GraduationCap,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const menuGroups = [
  {
    group: "Main",
    items: [
      {
        title: "Dashboard",
        icon: <Home size={18} />,
        path: "dashboard",
        roles: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    group: "People",
    items: [
      {
        title: "Admissions",
        icon: <FileText size={18} />,
        roles: ["admin"],
        children: [
          { title: "All Admissions", path: "admissions" },
          { title: "Admission Requests", path: "admissions/requests" },
          { title: "Inquiry Pipeline", path: "admissions/inquiries" },
        ],
      },
      {
        title: "Students",
        icon: <Users size={18} />,
        roles: ["admin", "teacher"],
        children: [
          { title: "All Students", path: "students" },
          { title: "Promotions", path: "students/promotions" },
          { title: "Transfer", path: "students/transfer" },
          { title: "Gate Pass", path: "students/gate-pass" },
        ],
      },
      {
        title: "Parents",
        icon: <Users size={18} />,
        roles: ["admin"],
        children: [
          { title: "All Parents", path: "parents" },
          { title: "Family Wallet", path: "parents/wallet" },
        ],
      },
      {
        title: "Staff",
        icon: <Briefcase size={18} />,
        roles: ["admin"],
        children: [
          { title: "All Staff", path: "staff" },
          { title: "Departments", path: "staff/departments" },
          { title: "Leave Management", path: "staff/leave" },
          { title: "Task Management", path: "staff/tasks" },
          { title: "Salary & Loans", path: "staff/salary" },
        ],
      },
    ],
  },
  {
    group: "Academic",
    items: [
      {
        title: "Classes",
        icon: <Grid size={18} />,
        roles: ["admin", "teacher"],
        children: [
          { title: "All Classes", path: "classes" },
          { title: "Sections", path: "classes/sections" },
          { title: "Subjects", path: "classes/subjects" },
        ],
      },
      {
        title: "Timetable",
        icon: <Calendar size={18} />,
        path: "timetable",
        roles: ["admin", "teacher", "student"],
      },
      {
        title: "Attendance",
        icon: <UserCheck size={18} />,
        roles: ["admin", "teacher"],
        children: [
          { title: "Mark Attendance", path: "attendance" },
          { title: "Barcode Attendance", path: "attendance/barcode" },
          { title: "Attendance Reports", path: "attendance/reports" },
        ],
      },
      {
        title: "Assignments",
        icon: <Clipboard size={18} />,
        path: "assignments",
        roles: ["admin", "teacher", "student"],
      },
      {
        title: "Online Classes",
        icon: <BookOpen size={18} />,
        path: "online-classes",
        roles: ["admin", "teacher", "student"],
      },
      {
        title: "Study Materials",
        icon: <Archive size={18} />,
        path: "study-materials",
        roles: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    group: "Assessment",
    items: [
      {
        title: "Tests & Quizzes",
        icon: <BookOpen size={18} />,
        roles: ["admin", "teacher"],
        children: [
          { title: "Tests", path: "tests" },
          { title: "Quizzes", path: "quizzes" },
          { title: "Question Bank", path: "question-bank" },
        ],
      },
      {
        title: "Exams",
        icon: <Award size={18} />,
        roles: ["admin", "teacher"],
        children: [
          { title: "Exam Schedule", path: "exams" },
          { title: "Grades", path: "exams/grades" },
          { title: "Report Cards", path: "exams/report-cards" },
        ],
      },
    ],
  },
  {
    group: "Finance",
    items: [
      {
        title: "Fees",
        icon: <DollarSign size={18} />,
        roles: ["admin"],
        children: [
          { title: "Fee Management", path: "fees" },
          { title: "Fee Vouchers", path: "fees/vouchers" },
          { title: "Discounts", path: "fees/discounts" },
          { title: "Online Payments", path: "fees/online-payments" },
          { title: "Fee Reports", path: "fees/reports" },
        ],
      },
      {
        title: "Expenses",
        icon: <CreditCard size={18} />,
        path: "expenses",
        roles: ["admin"],
      },
    ],
  },
  {
    group: "Communication",
    items: [
      {
        title: "Noticeboard",
        icon: <Bell size={18} />,
        path: "noticeboard",
        roles: ["admin", "teacher", "student"],
      },
      {
        title: "Messages",
        icon: <Mail size={18} />,
        roles: ["admin"],
        children: [
          { title: "Send SMS", path: "messages/sms" },
          { title: "Send Email", path: "messages/email" },
          { title: "WhatsApp", path: "messages/whatsapp" },
          { title: "Push Notifications", path: "messages/push" },
        ],
      },
      {
        title: "Diary",
        icon: <BookOpen size={18} />,
        path: "diary",
        roles: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    group: "Management",
    items: [
      {
        title: "Transport",
        icon: <Truck size={18} />,
        path: "transport",
        roles: ["admin"],
      },
      {
        title: "Inventory",
        icon: <Archive size={18} />,
        path: "inventory",
        roles: ["admin"],
      },
      {
        title: "ID Cards",
        icon: <Shield size={18} />,
        path: "id-cards",
        roles: ["admin"],
      },
      {
        title: "Certificates",
        icon: <Award size={18} />,
        path: "certificates",
        roles: ["admin"],
      },
      {
        title: "Website",
        icon: <Globe size={18} />,
        path: "website",
        roles: ["admin"],
      },
      {
        title: "Reports",
        icon: <BarChart2 size={18} />,
        path: "reports",
        roles: ["admin"],
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        title: "Settings",
        icon: <Settings size={18} />,
        path: "settings",
        roles: ["admin"],
      },
      {
        title: "Help & Support",
        icon: <HelpCircle size={18} />,
        path: "help",
        roles: ["admin", "teacher", "student"],
      },
    ],
  },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuth();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (path) =>
    location.pathname === `/${role}/${path}` ||
    location.pathname.startsWith(`/${role}/${path}/`);

  const isGroupActive = (children) => children?.some((c) => isActive(c.path));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur p-2 rounded-xl border border-white/20">
              <GraduationCap className="text-white" size={20} />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">
                School
              </p>
              <p className="text-gray-400 text-xs mt-0.5">Management System</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="bg-white/10 backdrop-blur p-2 rounded-xl border border-white/20 mx-auto">
            <GraduationCap className="text-white" size={20} />
          </div>
        )}
        {/* Mobile Close */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-gray-400 hover:text-red-400 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-3 space-y-1 px-2">
        {menuGroups.map((group) => {
          const filteredItems = group.items.filter((item) =>
            item.roles.includes(role),
          );
          if (filteredItems.length === 0) return null;

          return (
            <div key={group.group} className="mb-2">
              {/* Group Label */}
              {!collapsed && (
                <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 mb-1">
                  {group.group}
                </p>
              )}

              {filteredItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const active = hasChildren
                  ? isGroupActive(item.children)
                  : isActive(item.path);
                const isOpen = openMenus[item.title];

                return (
                  <div key={item.title}>
                    {/* Menu Item */}
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          toggleMenu(item.title);
                        } else {
                          navigate(`/${role}/${item.path}`);
                          setMobileOpen(false);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                        ${
                          active
                            ? "bg-white/10 backdrop-blur border border-white/20 text-white"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                        }
                        ${collapsed ? "justify-center" : "justify-between"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-base ${active ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}
                        >
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        )}
                      </div>
                      {!collapsed && hasChildren && (
                        <span className="text-xs text-gray-600">
                          {isOpen ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </span>
                      )}
                    </button>

                    {/* Submenu */}
                    {hasChildren && isOpen && !collapsed && (
                      <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                        {item.children.map((child) => (
                          <button
                            key={child.path}
                            onClick={() => {
                              navigate(`/${role}/${child.path}`);
                              setMobileOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200
                              ${
                                isActive(child.path)
                                  ? "text-white bg-white/10"
                                  : "text-gray-600 hover:text-gray-300 hover:bg-white/5"
                              }`}
                          >
                            {child.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Collapse Toggle — Desktop only */}
      <div className="hidden lg:flex justify-center py-4 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white rounded-full p-2 transition-all duration-200"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300 bg-[#0a0a0a]/80 backdrop-blur-xl border-r border-white/10
          ${collapsed ? "w-[72px]" : "w-[260px]"}
        `}
      >
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10 z-50 lg:hidden transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
