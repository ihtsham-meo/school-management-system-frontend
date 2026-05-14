import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  Pencil,
  Trash2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  FileEdit,
  HelpCircle,
  Timer,
  Hash,
} from "lucide-react";
import { testsData, classOptions } from "../../constants/dummyData";

const statusStyle = {
  Active: "bg-green-500/10 text-green-400 border border-green-500/20",
  Completed: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Draft: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const typeStyle = {
  Test: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Quiz: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
};

const TestsPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = testsData.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || t.class === classFilter;
    const matchType = typeFilter === "All" || t.type === typeFilter;
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchClass && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Tests & Quizzes</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {testsData.length} tests and quizzes
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Create Test
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: testsData.length,
            color: "text-white/70",
            icon: BookOpen,
          },
          {
            label: "Active",
            value: testsData.filter((t) => t.status === "Active").length,
            color: "text-green-400",
            icon: CheckCircle,
          },
          {
            label: "Tests",
            value: testsData.filter((t) => t.type === "Test").length,
            color: "text-purple-400",
            icon: FileEdit,
          },
          {
            label: "Quizzes",
            value: testsData.filter((t) => t.type === "Quiz").length,
            color: "text-orange-400",
            icon: HelpCircle,
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
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search by title or subject..."
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
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "Test", "Quiz"].map((t) => (
            <option key={t} value={t} className="bg-[#0a0a0f]">
              {t === "All" ? "All Types" : t}
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
          {["All", "Active", "Completed", "Draft"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">
              {s === "All" ? "All Statuses" : s}
            </option>
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
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginated.map((t) => (
            <div
              key={t.id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <BookOpen size={18} className="text-white/40" />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[t.type]}`}
                  >
                    {t.type}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[t.status]}`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
              <h3 className="text-white/80 font-semibold text-sm mb-1">
                {t.title}
              </h3>
              <p className="text-white/30 text-xs mb-4">
                {t.subject} · {t.class}
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Questions", value: t.questions, icon: Hash },
                  { label: "Marks", value: t.totalMarks, icon: BookOpen },
                  {
                    label: "Duration",
                    value: t.duration.split(" ")[0] + "m",
                    icon: Timer,
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.03] border border-white/[0.04] rounded-lg px-2 py-2 text-center"
                  >
                    <p className="text-white/70 text-sm font-semibold">
                      {stat.value}
                    </p>
                    <p className="text-white/25 text-[10px] mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-white/25 text-xs mb-3">{t.teacher}</p>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  {[
                    "Title",
                    "Subject",
                    "Class",
                    "Teacher",
                    "Questions",
                    "Marks",
                    "Duration",
                    "Type",
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
                  paginated.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                            <BookOpen size={13} className="text-white/40" />
                          </div>
                          <p className="text-white/80 text-sm font-medium">
                            {t.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/50 text-sm">
                          {t.subject}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/40 text-sm">{t.class}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/40 text-sm">
                          {t.teacher.split(" ").slice(-1)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Hash size={12} className="text-white/25" />
                          <span className="text-white/50 text-sm">
                            {t.questions}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/60 text-sm font-medium">
                          {t.totalMarks}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Timer size={12} className="text-white/25" />
                          <span className="text-white/40 text-sm">
                            {t.duration}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[t.type]}`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[t.status]}`}
                        >
                          {t.status}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-5 py-12 text-center">
                      <BookOpen
                        size={32}
                        className="text-white/10 mx-auto mb-3"
                      />
                      <p className="text-white/25 text-sm">No tests found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
            <p className="text-white/25 text-xs">
              Showing{" "}
              {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–
              {Math.min(currentPage * perPage, filtered.length)} of{" "}
              {filtered.length} tests
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
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
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

export default TestsPage;
