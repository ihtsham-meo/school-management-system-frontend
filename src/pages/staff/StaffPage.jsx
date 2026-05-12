import React, { useState } from "react";
import {
  Search, Plus, Download, Eye, Pencil, Trash2,
  Briefcase, ChevronLeft, ChevronRight, Phone, Mail,
} from "lucide-react";

// ── Sample Data ──────────────────────────────────────────
const staffData = [
  { id: 1, name: "Dr. Khalid Mehmood", role: "Principal", department: "Administration", phone: "0300-1111111", email: "khalid@school.com", salary: "₨ 120,000", status: "Active", joining: "Jan 2018", avatar: "K" },
  { id: 2, name: "Mrs. Rabia Tariq", role: "Teacher", department: "Mathematics", phone: "0301-2222222", email: "rabia@school.com", salary: "₨ 65,000", status: "Active", joining: "Mar 2019", avatar: "R" },
  { id: 3, name: "Mr. Imran Qureshi", role: "Teacher", department: "Physics", phone: "0302-3333333", email: "imran@school.com", salary: "₨ 60,000", status: "On Leave", joining: "Jun 2020", avatar: "I" },
  { id: 4, name: "Ms. Sana Baig", role: "Coordinator", department: "ComputerScience", phone: "0303-4444444", email: "sana@school.com", salary: "₨ 75,000", status: "Active", joining: "Aug 2017", avatar: "S" },
  { id: 5, name: "Mr. Tariq Jameel", role: "Teacher", department: "English", phone: "0304-5555555", email: "tariq@school.com", salary: "₨ 58,000", status: "Active", joining: "Sep 2021", avatar: "T" },
  { id: 6, name: "Mrs. Nadia Shah", role: "Teacher", department: "Urdu", phone: "0305-6666666", email: "nadia@school.com", salary: "₨ 55,000", status: "Inactive", joining: "Feb 2022", avatar: "N" },
  { id: 7, name: "Mr. Asif Raza", role: "Admin Officer", department: "Administration", phone: "0306-7777777", email: "asif@school.com", salary: "₨ 50,000", status: "Active", joining: "Apr 2020", avatar: "A" },
  { id: 8, name: "Ms. Huma Nawaz", role: "Teacher", department: "Chemistry", phone: "0307-8888888", email: "huma@school.com", salary: "₨ 62,000", status: "Active", joining: "Jul 2019", avatar: "H" },
];

const statusStyle = {
  Active: "bg-green-500/10 text-green-400 border border-green-500/20",
  "On Leave": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Inactive: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const departments = ["All", "Administration", "Mathematics", "Physics", "Computer Science", "English", "Urdu", "Chemistry"];
const statuses = ["All", "Active", "On Leave", "Inactive"];

const StaffPage = () => {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = staffData.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || s.department === deptFilter;
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Staff</h1>
          <p className="text-white/30 text-sm mt-0.5">{staffData.length} total staff members</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Staff
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Staff", value: staffData.length, color: "text-white/70" },
          { label: "Active", value: staffData.filter(s => s.status === "Active").length, color: "text-green-400" },
          { label: "On Leave", value: staffData.filter(s => s.status === "On Leave").length, color: "text-yellow-400" },
          { label: "Inactive", value: staffData.filter(s => s.status === "Inactive").length, color: "text-red-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-white/30 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {departments.map((d) => <option key={d} value={d} className="bg-[#0a0a0f]">{d === "All" ? "All Departments" : d}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {statuses.map((s) => <option key={s} value={s} className="bg-[#0a0a0f]">{s === "All" ? "All Statuses" : s}</option>)}
        </select>
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
                {["Staff Member", "Role", "Department", "Contact", "Salary", "Joining", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? paginated.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors group">

                  {/* Staff Member */}
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

                  {/* Role */}
                  <td className="px-5 py-4">
                    <span className="text-white/50 text-sm">{s.role}</span>
                  </td>

                  {/* Department */}
                  <td className="px-5 py-4">
                    <span className="text-white/40 text-sm">{s.department}</span>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <p className="text-white/40 text-xs">{s.phone}</p>
                  </td>

                  {/* Salary */}
                  <td className="px-5 py-4">
                    <span className="text-white/60 text-sm font-medium">{s.salary}</span>
                  </td>

                  {/* Joining */}
                  <td className="px-5 py-4">
                    <span className="text-white/30 text-xs">{s.joining}</span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[s.status]}`}>
                      {s.status}
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
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <Briefcase size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No staff members found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} staff
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

export default StaffPage;