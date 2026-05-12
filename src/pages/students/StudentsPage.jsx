import React, { useState } from "react";
import {
  Search, Plus, Filter, Download, Eye, Pencil, Trash2,
  GraduationCap, Phone, Mail, MapPin, ChevronLeft, ChevronRight,
} from "lucide-react";

// ── Sample Data ──────────────────────────────────────────
const studentsData = [
  { id: 1, name: "Ahmed Khan", rollNo: "2024-001", class: "10-A", gender: "Male", phone: "0300-1234567", email: "ahmed@school.com", address: "Rawalpindi", fee: "Paid", avatar: "A" },
  { id: 2, name: "Sara Ali", rollNo: "2024-002", class: "9-B", gender: "Female", phone: "0301-2345678", email: "sara@school.com", address: "Islamabad", fee: "Pending", avatar: "S" },
  { id: 3, name: "Usman Tariq", rollNo: "2024-003", class: "11-C", gender: "Male", phone: "0302-3456789", email: "usman@school.com", address: "Rawalpindi", fee: "Paid", avatar: "U" },
  { id: 4, name: "Fatima Noor", rollNo: "2024-004", class: "8-A", gender: "Female", phone: "0303-4567890", email: "fatima@school.com", address: "Lahore", fee: "Overdue", avatar: "F" },
  { id: 5, name: "Bilal Hassan", rollNo: "2024-005", class: "12-B", gender: "Male", phone: "0304-5678901", email: "bilal@school.com", address: "Karachi", fee: "Paid", avatar: "B" },
  { id: 6, name: "Ayesha Malik", rollNo: "2024-006", class: "10-A", gender: "Female", phone: "0305-6789012", email: "ayesha@school.com", address: "Rawalpindi", fee: "Paid", avatar: "A" },
  { id: 7, name: "Zain Ahmed", rollNo: "2024-007", class: "9-B", gender: "Male", phone: "0306-7890123", email: "zain@school.com", address: "Islamabad", fee: "Pending", avatar: "Z" },
  { id: 8, name: "Hira Baig", rollNo: "2024-008", class: "11-C", gender: "Female", phone: "0307-8901234", email: "hira@school.com", address: "Multan", fee: "Paid", avatar: "H" },
];

const feeStatusStyle = {
  Paid: "bg-green-500/10 text-green-400 border border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Overdue: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const genderStyle = {
  Male: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Female: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
};

const StudentsPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [feeFilter, setFeeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const classes = ["All", "8-A", "9-B", "10-A", "11-C", "12-B"];
  const feeStatuses = ["All", "Paid", "Pending", "Overdue"];

  const filtered = studentsData.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.includes(search);
    const matchClass = classFilter === "All" || s.class === classFilter;
    const matchFee = feeFilter === "All" || s.fee === feeFilter;
    return matchSearch && matchClass && matchFee;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Students</h1>
          <p className="text-white/30 text-sm mt-0.5">{studentsData.length} total students enrolled</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Search */}
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>

        {/* Class Filter */}
        <select
          value={classFilter}
          onChange={(e) => { setClassFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {classes.map((c) => <option key={c} value={c} className="bg-[#0a0a0f]">{c === "All" ? "All Classes" : `Class ${c}`}</option>)}
        </select>

        {/* Fee Filter */}
        <select
          value={feeFilter}
          onChange={(e) => { setFeeFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {feeStatuses.map((f) => <option key={f} value={f} className="bg-[#0a0a0f]">{f === "All" ? "All Fee Status" : f}</option>)}
        </select>

        {/* Export */}
        <button className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white/80 text-sm px-4 py-2.5 rounded-xl transition-all">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Student", "Roll No", "Class", "Gender", "Contact", "Fee Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? paginated.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors group">

                  {/* Student */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 text-sm font-semibold shrink-0">
                        {s.avatar}
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-medium">{s.name}</p>
                        <p className="text-white/25 text-xs">{s.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Roll No */}
                  <td className="px-5 py-4">
                    <span className="text-white/40 text-sm font-mono">{s.rollNo}</span>
                  </td>

                  {/* Class */}
                  <td className="px-5 py-4">
                    <span className="text-white/60 text-sm">{s.class}</span>
                  </td>

                  {/* Gender */}
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${genderStyle[s.gender]}`}>
                      {s.gender}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <p className="text-white/40 text-xs">{s.phone}</p>
                  </td>

                  {/* Fee Status */}
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${feeStatusStyle[s.fee]}`}>
                      {s.fee}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                        <Eye size={13} />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                        <Pencil size={13} />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <GraduationCap size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No students found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} students
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
                  ${currentPage === i + 1
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

export default StudentsPage;