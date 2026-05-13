import React, { useState } from "react";
import {
  Search, Plus, Download, Eye, Pencil, Trash2,
  ClipboardList, ChevronLeft, ChevronRight,
  CheckCircle, Clock, XCircle,
} from "lucide-react";
import { assignmentsData, classOptions } from "../../constants/dummyData";

const statusStyle = {
  Active: "bg-green-500/10 text-green-400 border border-green-500/20",
  Expired: "bg-red-500/10 text-red-400 border border-red-500/20",
  Draft: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const AssignmentsPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = assignmentsData.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || a.class === classFilter;
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchClass && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Assignments</h1>
          <p className="text-white/30 text-sm mt-0.5">{assignmentsData.length} total assignments</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          New Assignment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Active", value: assignmentsData.filter(a => a.status === "Active").length, color: "text-green-400", icon: CheckCircle },
          { label: "Expired", value: assignmentsData.filter(a => a.status === "Expired").length, color: "text-red-400", icon: XCircle },
          { label: "Total Submissions", value: assignmentsData.reduce((acc, a) => acc + a.submissions, 0), color: "text-white/70", icon: ClipboardList },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 flex items-center gap-3">
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
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={classFilter}
          onChange={(e) => { setClassFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          <option value="All" className="bg-[#0a0a0f]">All Classes</option>
          {classOptions.map((c) => <option key={c} value={c} className="bg-[#0a0a0f]">Class {c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "Active", "Expired", "Draft"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">{s === "All" ? "All Statuses" : s}</option>
          ))}
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
                {["Assignment", "Subject", "Class", "Teacher", "Due Date", "Submissions", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? paginated.map((a) => (
                <tr key={a.id} className="hover:bg-white/[0.02] transition-colors group">

                  {/* Assignment */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <ClipboardList size={14} className="text-white/40" />
                      </div>
                      <p className="text-white/80 text-sm font-medium">{a.title}</p>
                    </div>
                  </td>

                  {/* Subject */}
                  <td className="px-5 py-4">
                    <span className="text-white/50 text-sm">{a.subject}</span>
                  </td>

                  {/* Class */}
                  <td className="px-5 py-4">
                    <span className="text-white/40 text-sm">{a.class}</span>
                  </td>

                  {/* Teacher */}
                  <td className="px-5 py-4">
                    <span className="text-white/40 text-sm">{a.teacher}</span>
                  </td>

                  {/* Due Date */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-white/25" />
                      <span className="text-white/40 text-sm">{a.dueDate}</span>
                    </div>
                  </td>

                  {/* Submissions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full w-16">
                        <div
                          className="h-1.5 rounded-full bg-white/30"
                          style={{ width: `${(a.submissions / a.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-white/40 text-xs">{a.submissions}/{a.total}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[a.status]}`}>
                      {a.status}
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
                    <ClipboardList size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No assignments found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} assignments
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

export default AssignmentsPage;