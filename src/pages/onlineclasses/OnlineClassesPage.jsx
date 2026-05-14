import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Trash2,
  Video,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Radio,
  Calendar,
  Users,
  Timer,
  ExternalLink,
} from "lucide-react";
import { onlineClassesData, classOptions } from "../../constants/dummyData";

const statusStyle = {
  Scheduled: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Live: "bg-red-500/10 text-red-400 border border-red-500/20",
  Completed: "bg-green-500/10 text-green-400 border border-green-500/20",
};

const statusIcon = {
  Scheduled: Clock,
  Live: Radio,
  Completed: CheckCircle,
};

const platformStyle = {
  Zoom: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Google Meet": "bg-green-500/10 text-green-400 border border-green-500/20",
  "Microsoft Teams":
    "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

const OnlineClassesPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = onlineClassesData.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || c.class === classFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
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
          <h1 className="text-2xl font-bold text-white">Online Classes</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {onlineClassesData.length} classes total
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Schedule Class
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Scheduled",
            value: onlineClassesData.filter((c) => c.status === "Scheduled")
              .length,
            color: "text-blue-400",
            icon: Clock,
          },
          {
            label: "Live Now",
            value: onlineClassesData.filter((c) => c.status === "Live").length,
            color: "text-red-400",
            icon: Radio,
          },
          {
            label: "Completed",
            value: onlineClassesData.filter((c) => c.status === "Completed")
              .length,
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
          {["All", "Scheduled", "Live", "Completed"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">
              {s === "All" ? "All Statuses" : s}
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
            paginated.map((cls) => {
              const StatusIcon = statusIcon[cls.status];
              return (
                <div
                  key={cls.id}
                  className={`bg-white/[0.03] border rounded-2xl p-5 hover:bg-white/[0.05] transition-all group ${cls.status === "Live" ? "border-red-500/20" : "border-white/[0.06]"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${cls.status === "Live" ? "bg-red-500/10 border border-red-500/20" : "bg-white/[0.06] border border-white/[0.08]"}`}
                    >
                      <Video
                        size={18}
                        className={
                          cls.status === "Live"
                            ? "text-red-400"
                            : "text-white/40"
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[cls.status]}`}
                      >
                        {cls.status === "Live" && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-1 animate-pulse" />
                        )}
                        {cls.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white/80 font-semibold text-sm mb-1">
                    {cls.title}
                  </h3>
                  <p className="text-white/30 text-xs mb-4">
                    {cls.subject} · {cls.class}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-white/30 text-xs">
                      <Calendar size={11} />
                      <span>
                        {cls.date} at {cls.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/30 text-xs">
                      <Timer size={11} />
                      <span>{cls.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/30 text-xs">
                      <Users size={11} />
                      <span>{cls.students} students</span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${platformStyle[cls.platform] || "bg-white/10 text-white/40 border border-white/20"}`}
                  >
                    {cls.platform}
                  </span>
                  <div className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all flex items-center justify-center gap-1">
                      <Eye size={12} /> View
                    </button>
                    <button className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all flex items-center justify-center gap-1">
                      <ExternalLink size={12} /> Join
                    </button>
                    <button className="flex-1 py-1.5 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] text-red-400/60 hover:text-red-400 text-xs transition-all flex items-center justify-center gap-1">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 py-12 text-center">
              <Video size={32} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/25 text-sm">No online classes found</p>
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
                    "Class",
                    "Subject",
                    "Teacher",
                    "Date & Time",
                    "Duration",
                    "Students",
                    "Platform",
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
                  paginated.map((cls) => {
                    const StatusIcon = statusIcon[cls.status];
                    return (
                      <tr
                        key={cls.id}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cls.status === "Live" ? "bg-red-500/10 border border-red-500/20" : "bg-white/[0.06] border border-white/[0.08]"}`}
                            >
                              <Video
                                size={13}
                                className={
                                  cls.status === "Live"
                                    ? "text-red-400"
                                    : "text-white/40"
                                }
                              />
                            </div>
                            <p className="text-white/80 text-sm font-medium">
                              {cls.title}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-white/50 text-sm">
                            {cls.subject}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-white/40 text-sm">
                            {cls.teacher.split(" ").slice(-1)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="space-y-0.5">
                            <p className="text-white/50 text-xs">{cls.date}</p>
                            <p className="text-white/30 text-xs">{cls.time}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <Timer size={12} className="text-white/25" />
                            <span className="text-white/40 text-sm">
                              {cls.duration}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <Users size={12} className="text-white/25" />
                            <span className="text-white/50 text-sm">
                              {cls.students}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${platformStyle[cls.platform] || "bg-white/10 text-white/40 border border-white/20"}`}
                          >
                            {cls.platform}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div
                            className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full w-fit ${statusStyle[cls.status]}`}
                          >
                            <StatusIcon size={11} />
                            {cls.status}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                              <Eye size={13} />
                            </button>
                            <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                              <ExternalLink size={13} />
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
                    <td colSpan={9} className="px-5 py-12 text-center">
                      <Video size={32} className="text-white/10 mx-auto mb-3" />
                      <p className="text-white/25 text-sm">
                        No online classes found
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
              {filtered.length} classes
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

export default OnlineClassesPage;
