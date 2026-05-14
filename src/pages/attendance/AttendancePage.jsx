import React, { useState } from "react";
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
  UserCheck,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { studentsData, classOptions } from "../../constants/dummyData";

const datePickerStyle = `
  input[type="date"] {
    color-scheme: light;
  }
  
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
  
  input[type="date"]::-webkit-outer-spin-button,
  input[type="date"]::-webkit-inner-spin-button {
    display: none;
  }
`;

// // ── Sample Data ──────────────────────────────────────────
// const studentsData = [
//   { id: 1, name: "Ahmed Khan", rollNo: "2024-001", class: "10-A", avatar: "A" },
//   { id: 2, name: "Sara Ali", rollNo: "2024-002", class: "10-A", avatar: "S" },
//   { id: 3, name: "Usman Tariq", rollNo: "2024-003", class: "10-A", avatar: "U" },
//   { id: 4, name: "Fatima Noor", rollNo: "2024-004", class: "10-A", avatar: "F" },
//   { id: 5, name: "Bilal Hassan", rollNo: "2024-005", class: "10-A", avatar: "B" },
//   { id: 6, name: "Ayesha Malik", rollNo: "2024-006", class: "10-A", avatar: "A" },
//   { id: 7, name: "Zain Ahmed", rollNo: "2024-007", class: "10-A", avatar: "Z" },
//   { id: 8, name: "Hira Baig", rollNo: "2024-008", class: "10-A", avatar: "H" },
//   { id: 9, name: "Omar Farooq", rollNo: "2024-009", class: "10-A", avatar: "O" },
//   { id: 10, name: "Nadia Hussain", rollNo: "2024-010", class: "10-A", avatar: "N" },
// ];

const classes = ["10-A", "10-B", "9-A", "9-B", "11-A", "11-B", "12-A", "12-B"];

const statusStyle = {
  Present: "bg-green-500/10 text-green-400 border border-green-500/20",
  Absent: "bg-red-500/10 text-red-400 border border-red-500/20",
  Late: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Leave: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState(
    Object.fromEntries(studentsData.map((s) => [s.id, "Present"])),
  );
  const [saved, setSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = studentsData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.includes(search),
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const setStatus = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  const markAll = (status) => {
    setAttendance(Object.fromEntries(studentsData.map((s) => [s.id, status])));
    setSaved(false);
  };

  const handleSave = () => setSaved(true);

  const counts = {
    Present: Object.values(attendance).filter((v) => v === "Present").length,
    Absent: Object.values(attendance).filter((v) => v === "Absent").length,
    Late: Object.values(attendance).filter((v) => v === "Late").length,
    Leave: Object.values(attendance).filter((v) => v === "Leave").length,
  };

  const attendanceRate = Math.round(
    (counts.Present / studentsData.length) * 100,
  );

  return (
    <div className="space-y-5">
      <style>{datePickerStyle}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance</h1>
          <p className="text-white/30 text-sm mt-0.5">
            Mark and manage daily attendance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => markAll("Present")}
            className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-sm font-medium px-3 py-2 rounded-xl transition-all"
          >
            <CheckCircle size={14} />
            Mark All Present
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
          >
            {saved ? "✓ Saved" : "Save Attendance"}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Present",
            value: counts.Present,
            color: "text-green-400",
            icon: CheckCircle,
          },
          {
            label: "Absent",
            value: counts.Absent,
            color: "text-red-400",
            icon: XCircle,
          },
          {
            label: "Late",
            value: counts.Late,
            color: "text-yellow-400",
            icon: Clock,
          },
          {
            label: "Attendance Rate",
            value: `${attendanceRate}%`,
            color: "text-white/70",
            icon: TrendingUp,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
              <stat.icon size={16} className={stat.color} />
            </div>
            <div>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-white/30 text-xs">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>

        {/* Class Selector */}
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {classes.map((c) => (
            <option key={c} value={c} className="bg-[#0a0a0f]">
              Class {c}
            </option>
          ))}
        </select>

        {/* Date Picker */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-white/[0.03] border border-white/[0.06] text-white text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        />

        {/* Export */}
        <button className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white/80 text-sm px-4 py-2.5 rounded-xl transition-all">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Attendance Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
          <p className="text-white/50 text-sm font-medium">
            Class {selectedClass} —{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center gap-2">
            {["Present", "Absent", "Late", "Leave"].map((s) => (
              <button
                key={s}
                onClick={() => markAll(s)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all hover:opacity-80 ${statusStyle[s]}`}
              >
                All {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Student", "Roll No", "Status", "Mark Attendance"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {/* Student */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 text-sm font-semibold">
                        {s.avatar}
                      </div>
                      <p className="text-white/80 text-sm font-medium">
                        {s.name}
                      </p>
                    </div>
                  </td>

                  {/* Roll No */}
                  <td className="px-5 py-4">
                    <span className="text-white/40 text-sm font-mono">
                      {s.rollNo}
                    </span>
                  </td>

                  {/* Current Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[attendance[s.id]]}`}
                    >
                      {attendance[s.id]}
                    </span>
                  </td>

                  {/* Mark Buttons */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {["Present", "Absent", "Late", "Leave"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setStatus(s.id, status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                            ${
                              attendance[s.id] === status
                                ? statusStyle[status]
                                : "bg-white/[0.03] border-white/[0.06] text-white/25 hover:text-white/50 hover:bg-white/[0.06]"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}
            –{Math.min(currentPage * perPage, filtered.length)} of{" "}
            {filtered.length} students
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={13} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 rounded-lg border text-xs font-medium transition-all
                  ${
                    currentPage === i + 1
                      ? "bg-white/[0.10] border-white/[0.15] text-white"
                      : "bg-white/[0.04] border-white/[0.06] text-white/40 hover:bg-white/[0.08]"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
