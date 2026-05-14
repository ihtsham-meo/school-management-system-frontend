import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  Pencil,
  Trash2,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  BookOpen,
  Users,
} from "lucide-react";
import { examsData, classOptions } from "../../constants/dummyData";

const statusStyle = {
  Upcoming: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Ongoing: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Completed: "bg-green-500/10 text-green-400 border border-green-500/20",
};

const statusIcon = {
  Upcoming: Clock,
  Ongoing: AlertCircle,
  Completed: CheckCircle,
};

const typeStyle = {
  "Mid-Term": "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Final: "bg-red-500/10 text-red-400 border border-red-500/20",
  Annual: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  "Unit Test": "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  Practical: "bg-green-500/10 text-green-400 border border-green-500/20",
};

const ExamsPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = examsData.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || e.class === classFilter;
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchClass && matchStatus;
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
          <h1 className="text-2xl font-bold text-white">Exams</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {examsData.length} exams scheduled
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Schedule Exam
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Upcoming",
            value: examsData.filter((e) => e.status === "Upcoming").length,
            color: "text-blue-400",
            icon: Clock,
          },
          {
            label: "Ongoing",
            value: examsData.filter((e) => e.status === "Ongoing").length,
            color: "text-yellow-400",
            icon: AlertCircle,
          },
          {
            label: "Completed",
            value: examsData.filter((e) => e.status === "Completed").length,
            color: "text-green-400",
            icon: CheckCircle,
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
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "Upcoming", "Ongoing", "Completed"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">
              {s === "All" ? "All Statuses" : s}
            </option>
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
                {[
                  "Exam",
                  "Class",
                  "Subject",
                  "Date",
                  "Total Marks",
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
                paginated.map((exam) => {
                  const Icon = statusIcon[exam.status];
                  return (
                    <tr
                      key={exam.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                            <Award size={13} className="text-white/40" />
                          </div>
                          <p className="text-white/80 text-sm font-medium">
                            {exam.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/50 text-sm">
                          {exam.class}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/40 text-sm">
                          {exam.subject}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-white/25" />
                          <span className="text-white/40 text-sm">
                            {exam.startDate}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/60 text-sm font-medium">
                          {exam.totalMarks}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[exam.type] || "bg-white/10 text-white/40 border border-white/20"}`}
                        >
                          {exam.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div
                          className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full w-fit ${statusStyle[exam.status]}`}
                        >
                          <Icon size={11} />
                          {exam.status}
                        </div>
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
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <Award size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No exams found</p>
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
            {filtered.length} exams
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

export default ExamsPage;
