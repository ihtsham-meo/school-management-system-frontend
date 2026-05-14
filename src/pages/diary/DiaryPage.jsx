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
  Calendar,
  Clock,
  AlertCircle,
  Tag,
} from "lucide-react";
import { diaryData, classOptions } from "../../constants/dummyData";

const typeStyle = {
  Homework: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Assignment: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Revision: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Project: "bg-green-500/10 text-green-400 border border-green-500/20",
  Notes: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
};

const priorityStyle = {
  High: "bg-red-500/10 text-red-400 border border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Low: "bg-green-500/10 text-green-400 border border-green-500/20",
};

const DiaryPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const types = [
    "All",
    "Homework",
    "Assignment",
    "Revision",
    "Project",
    "Notes",
  ];
  const priorities = ["All", "High", "Medium", "Low"];

  const filtered = diaryData.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.subject.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || d.class === classFilter;
    const matchType = typeFilter === "All" || d.type === typeFilter;
    const matchPriority =
      priorityFilter === "All" || d.priority === priorityFilter;
    return matchSearch && matchClass && matchType && matchPriority;
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
          <h1 className="text-2xl font-bold text-white">Diary</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {diaryData.length} diary entries
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Entry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Entries",
            value: diaryData.length,
            color: "text-white/70",
          },
          {
            label: "Homework",
            value: diaryData.filter((d) => d.type === "Homework").length,
            color: "text-blue-400",
          },
          {
            label: "Assignments",
            value: diaryData.filter((d) => d.type === "Assignment").length,
            color: "text-purple-400",
          },
          {
            label: "High Priority",
            value: diaryData.filter((d) => d.priority === "High").length,
            color: "text-red-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
          >
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
          {types.map((t) => (
            <option key={t} value={t} className="bg-[#0a0a0f]">
              {t === "All" ? "All Types" : t}
            </option>
          ))}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => {
            setPriorityFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {priorities.map((p) => (
            <option key={p} value={p} className="bg-[#0a0a0f]">
              {p === "All" ? "All Priorities" : p}
            </option>
          ))}
        </select>
        <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "grid" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "list" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginated.length > 0 ? (
            paginated.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[entry.type]}`}
                    >
                      {entry.type}
                    </span>
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${priorityStyle[entry.priority]}`}
                    >
                      {entry.priority}
                    </span>
                  </div>
                </div>
                <h3 className="text-white/80 font-semibold text-sm mb-1">
                  {entry.title}
                </h3>
                <p className="text-white/30 text-xs mb-3 leading-relaxed">
                  {entry.description}
                </p>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <Tag size={11} />
                    <span>
                      {entry.subject} · {entry.class}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <Calendar size={11} />
                    <span>Added: {entry.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock size={11} className="text-red-400/60" />
                    <span className="text-red-400/60">
                      Due: {entry.dueDate}
                    </span>
                  </div>
                </div>
                <p className="text-white/20 text-xs mb-3">{entry.teacher}</p>
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
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <BookOpen size={32} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/25 text-sm">No diary entries found</p>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[
                    "Entry",
                    "Subject",
                    "Class",
                    "Teacher",
                    "Due Date",
                    "Type",
                    "Priority",
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
                  paginated.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                            <BookOpen size={13} className="text-white/40" />
                          </div>
                          <div>
                            <p className="text-white/80 text-sm font-medium">
                              {entry.title}
                            </p>
                            <p className="text-white/25 text-xs truncate max-w-[200px]">
                              {entry.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/50 text-sm">
                          {entry.subject}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/40 text-sm">
                          {entry.class}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/40 text-sm">
                          {entry.teacher.split(" ").slice(-1)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-red-400/50" />
                          <span className="text-red-400/60 text-sm">
                            {entry.dueDate}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[entry.type]}`}
                        >
                          {entry.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${priorityStyle[entry.priority]}`}
                        >
                          {entry.priority}
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
                    <td colSpan={8} className="px-5 py-12 text-center">
                      <BookOpen
                        size={32}
                        className="text-white/10 mx-auto mb-3"
                      />
                      <p className="text-white/25 text-sm">
                        No diary entries found
                      </p>
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
              {filtered.length} entries
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

export default DiaryPage;
