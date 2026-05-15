import React, { useState } from "react";
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  Award,
  AlertCircle,
} from "lucide-react";
import { promotionsData, classOptions } from "../../constants/dummyData";

const statusStyle = {
  Promoted: "bg-green-500/10 text-green-400 border border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Detained: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const statusIcon = {
  Promoted: CheckCircle,
  Pending: Clock,
  Detained: XCircle,
};

const gradeColor = {
  "A+": "text-green-400",
  A: "text-green-400",
  "B+": "text-blue-400",
  B: "text-blue-400",
  C: "text-yellow-400",
  D: "text-red-400",
};

const PromotionsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = promotionsData.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.rollNo.includes(search);
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchClass = classFilter === "All" || p.currentClass === classFilter;
    return matchSearch && matchStatus && matchClass;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const avgPercentage = Math.round(
    promotionsData.reduce((acc, p) => acc + p.percentage, 0) /
      promotionsData.length,
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Student Promotions</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {promotionsData.length} students in promotion cycle
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
            <CheckCircle size={14} />
            Promote All Eligible
          </button>
          <button className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white/80 text-sm px-4 py-2.5 rounded-xl transition-all">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Students",
            value: promotionsData.length,
            color: "text-white/70",
            icon: Users,
          },
          {
            label: "Promoted",
            value: promotionsData.filter((p) => p.status === "Promoted").length,
            color: "text-green-400",
            icon: CheckCircle,
          },
          {
            label: "Pending",
            value: promotionsData.filter((p) => p.status === "Pending").length,
            color: "text-yellow-400",
            icon: Clock,
          },
          {
            label: "Detained",
            value: promotionsData.filter((p) => p.status === "Detained").length,
            color: "text-red-400",
            icon: XCircle,
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

      {/* Average Performance */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white/60 text-sm font-semibold">
            Class Performance Overview
          </h3>
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-green-400" />
            <span className="text-green-400 text-sm font-bold">
              {avgPercentage}% Average
            </span>
          </div>
        </div>
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-green-500/60 to-green-400/80 transition-all duration-500"
            style={{ width: `${avgPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-white/20 text-xs">0%</span>
          <span className="text-white/20 text-xs">100%</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search by name or roll no..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={classFilter}
          onChange={(e) => {
            setClassFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          <option value="All" className="bg-[#0a0a0f]">
            All Classes
          </option>
          {classOptions.map((c) => (
            <option key={c} value={c} className="bg-[#0a0a0f]">
              Class {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "Promoted", "Pending", "Detained"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">
              {s === "All" ? "All Statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {[
                  "Student",
                  "Roll No",
                  "Current Class",
                  "Promote To",
                  "Grade",
                  "Percentage",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? (
                paginated.map((p) => {
                  const Icon = statusIcon[p.status];
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Student */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 text-sm font-semibold shrink-0">
                            {p.avatar}
                          </div>
                          <p className="text-white/80 text-sm font-medium">
                            {p.name}
                          </p>
                        </div>
                      </td>

                      {/* Roll No */}
                      <td className="px-5 py-4">
                        <span className="text-white/40 text-sm font-mono">
                          {p.rollNo}
                        </span>
                      </td>

                      {/* Current Class */}
                      <td className="px-5 py-4">
                        <span className="text-white/50 text-sm">
                          {p.currentClass}
                        </span>
                      </td>

                      {/* Promote To */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-white/30 text-sm">
                            {p.currentClass}
                          </span>
                          <TrendingUp size={12} className="text-green-400/60" />
                          <span className="text-white/60 text-sm font-medium">
                            {p.promoteToClass}
                          </span>
                        </div>
                      </td>

                      {/* Grade */}
                      <td className="px-5 py-4">
                        <span
                          className={`text-sm font-bold ${gradeColor[p.grade] || "text-white/50"}`}
                        >
                          {p.grade}
                        </span>
                      </td>

                      {/* Percentage */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-white/[0.06] rounded-full">
                            <div
                              className={`h-1.5 rounded-full ${p.percentage >= 80 ? "bg-green-400/60" : p.percentage >= 60 ? "bg-yellow-400/60" : "bg-red-400/60"}`}
                              style={{ width: `${p.percentage}%` }}
                            />
                          </div>
                          <span className="text-white/50 text-sm">
                            {p.percentage}%
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <div
                          className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full w-fit ${statusStyle[p.status]}`}
                        >
                          <Icon size={11} />
                          {p.status}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-lg bg-green-500/[0.06] hover:bg-green-500/[0.12] border border-green-500/[0.15] flex items-center justify-center text-green-400/60 hover:text-green-400 transition-all">
                            <CheckCircle size={13} />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all">
                            <XCircle size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <Users size={32} className="text-white/10 mx-auto mb-3" />
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
                className={`w-7 h-7 rounded-lg border text-xs font-medium transition-all ${currentPage === i + 1 ? "bg-white/[0.10] border-white/[0.15] text-white" : "bg-white/[0.04] border-white/[0.06] text-white/40 hover:bg-white/[0.08]"}`}
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

export default PromotionsPage;
