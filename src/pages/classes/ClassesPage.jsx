import React, { useState } from "react";
import {
  Search, Plus, Download, Eye, Pencil, Trash2,
  Grid, ChevronLeft, ChevronRight, Users, BookOpen,
} from "lucide-react";
import { classesData } from "../../constants/dummyData";

// ── Sample Data ──────────────────────────────────────────
// const classesData = [
//   { id: 1, name: "Class 1", sections: ["A", "B"], subjects: 6, students: 64, teacher: "Mrs. Rabia Tariq", room: "101", status: "Active" },
//   { id: 2, name: "Class 2", sections: ["A", "B"], subjects: 6, students: 58, teacher: "Mr. Imran Qureshi", room: "102", status: "Active" },
//   { id: 3, name: "Class 3", sections: ["A", "B", "C"], subjects: 7, students: 72, teacher: "Ms. Sana Baig", room: "103", status: "Active" },
//   { id: 4, name: "Class 4", sections: ["A", "B"], subjects: 7, students: 61, teacher: "Mr. Tariq Jameel", room: "104", status: "Active" },
//   { id: 5, name: "Class 5", sections: ["A", "B", "C"], subjects: 8, students: 79, teacher: "Mrs. Nadia Shah", room: "105", status: "Active" },
//   { id: 6, name: "Class 6", sections: ["A", "B"], subjects: 9, students: 55, teacher: "Mr. Asif Raza", room: "201", status: "Active" },
//   { id: 7, name: "Class 7", sections: ["A", "B"], subjects: 9, students: 60, teacher: "Ms. Huma Nawaz", room: "202", status: "Active" },
//   { id: 8, name: "Class 8", sections: ["A", "B", "C"], subjects: 10, students: 83, teacher: "Mrs. Rabia Tariq", room: "203", status: "Active" },
//   { id: 9, name: "Class 9", sections: ["A", "B", "C"], subjects: 11, students: 91, teacher: "Mr. Imran Qureshi", room: "301", status: "Active" },
//   { id: 10, name: "Class 10", sections: ["A", "B", "C"], subjects: 11, students: 88, teacher: "Ms. Sana Baig", room: "302", status: "Active" },
//   { id: 11, name: "Class 11", sections: ["A", "B"], subjects: 12, students: 74, teacher: "Mr. Tariq Jameel", room: "303", status: "Active" },
//   { id: 12, name: "Class 12", sections: ["A", "B"], subjects: 12, students: 70, teacher: "Mrs. Nadia Shah", room: "304", status: "Inactive" },
// ];

const statusStyle = {
  Active: "bg-green-500/10 text-green-400 border border-green-500/20",
  Inactive: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const ClassesPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = classesData.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalStudents = classesData.reduce((acc, c) => acc + c.students, 0);
  const totalSections = classesData.reduce((acc, c) => acc + c.sections.length, 0);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Classes</h1>
          <p className="text-white/30 text-sm mt-0.5">{classesData.length} classes configured</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Class
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Classes", value: classesData.length, color: "text-white/70" },
          { label: "Total Sections", value: totalSections, color: "text-blue-400" },
          { label: "Total Students", value: totalStudents, color: "text-green-400" },
          { label: "Active Classes", value: classesData.filter(c => c.status === "Active").length, color: "text-yellow-400" },
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
            placeholder="Search by class name or teacher..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "Active", "Inactive"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">{s === "All" ? "All Statuses" : s}</option>
          ))}
        </select>

        {/* View Toggle */}
        <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "table" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "grid" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}
          >
            Grid
          </button>
        </div>

        <button className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white/80 text-sm px-4 py-2.5 rounded-xl transition-all">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginated.map((c) => (
            <div key={c.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <BookOpen size={18} className="text-white/40" />
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base mb-1">{c.name}</h3>
              <p className="text-white/30 text-xs mb-4">Room {c.room} · {c.teacher}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Sections", value: c.sections.length },
                  { label: "Subjects", value: c.subjects },
                  { label: "Students", value: c.students },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-2 text-center">
                    <p className="text-white/70 text-sm font-semibold">{stat.value}</p>
                    <p className="text-white/25 text-[10px] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                {c.sections.map((sec) => (
                  <span key={sec} className="text-[11px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-md px-2 py-0.5">
                    {c.name.split(" ")[1]}-{sec}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all flex items-center justify-center gap-1">
                  <Eye size={12} /> View
                </button>
                <button className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all flex items-center justify-center gap-1">
                  <Pencil size={12} /> Edit
                </button>
                <button className="flex-1 py-1.5 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] text-red-400/60 hover:text-red-400 text-xs transition-all flex items-center justify-center gap-1">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Class", "Sections", "Subjects", "Students", "Class Teacher", "Room", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {paginated.length > 0 ? paginated.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                          <BookOpen size={14} className="text-white/40" />
                        </div>
                        <span className="text-white/80 text-sm font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        {c.sections.map((sec) => (
                          <span key={sec} className="text-[11px] text-white/40 bg-white/[0.04] border border-white/[0.06] rounded-md px-1.5 py-0.5">
                            {sec}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/50 text-sm">{c.subjects}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Users size={13} className="text-white/25" />
                        <span className="text-white/60 text-sm">{c.students}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/40 text-sm">{c.teacher}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/30 text-sm font-mono">{c.room}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
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
                      <Grid size={32} className="text-white/10 mx-auto mb-3" />
                      <p className="text-white/25 text-sm">No classes found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
            <p className="text-white/25 text-xs">
              Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} classes
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
      )}
    </div>
  );
};

export default ClassesPage;