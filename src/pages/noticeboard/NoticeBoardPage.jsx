import React, { useState } from "react";
import {
  Bell, Plus, Search, Trash2, Eye,
  Pencil, Calendar, Users, Tag,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { noticesData } from "../../constants/dummyData";

const typeColors = {
  Event: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Finance: "bg-green-500/10 text-green-400 border border-green-500/20",
  Meeting: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Holiday: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Exam: "bg-red-500/10 text-red-400 border border-red-500/20",
  General: "bg-white/10 text-white/50 border border-white/20",
};

const audienceColors = {
  All: "bg-white/[0.06] text-white/50 border border-white/[0.10]",
  Parents: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  Students: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  Staff: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
};

const NoticeBoardPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [audienceFilter, setAudienceFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const types = ["All", "Event", "Finance", "Meeting", "Holiday", "Exam", "General"];
  const audiences = ["All", "Parents", "Students", "Staff"];

  const filtered = noticesData.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || n.type === typeFilter;
    const matchAudience = audienceFilter === "All" || n.audience === audienceFilter;
    return matchSearch && matchType && matchAudience;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Noticeboard</h1>
          <p className="text-white/30 text-sm mt-0.5">{noticesData.length} active notices</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Notice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Notices", value: noticesData.length, color: "text-white/70" },
          { label: "Events", value: noticesData.filter(n => n.type === "Event").length, color: "text-blue-400" },
          { label: "Exams", value: noticesData.filter(n => n.type === "Exam").length, color: "text-red-400" },
          { label: "Meetings", value: noticesData.filter(n => n.type === "Meeting").length, color: "text-purple-400" },
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
            placeholder="Search notices..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {types.map((t) => (
            <option key={t} value={t} className="bg-[#0a0a0f]">{t === "All" ? "All Types" : t}</option>
          ))}
        </select>
        <select
          value={audienceFilter}
          onChange={(e) => { setAudienceFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {audiences.map((a) => (
            <option key={a} value={a} className="bg-[#0a0a0f]">{a === "All" ? "All Audiences" : a}</option>
          ))}
        </select>

        {/* View Toggle */}
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
          {paginated.length > 0 ? paginated.map((n) => (
            <div key={n.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <Bell size={16} className="text-white/30" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeColors[n.type] || typeColors.General}`}>
                    {n.type}
                  </span>
                </div>
              </div>
              <h3 className="text-white/80 font-semibold text-sm mb-3 leading-snug">
                {n.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-white/25" />
                    <span className="text-white/30 text-xs">{n.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={11} className="text-white/25" />
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${audienceColors[n.audience] || audienceColors.All}`}>
                      {n.audience}
                    </span>
                  </div>
                </div>
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
          )) : (
            <div className="col-span-3 py-12 text-center">
              <Bell size={32} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/25 text-sm">No notices found</p>
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
                  {["Notice", "Type", "Audience", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {paginated.length > 0 ? paginated.map((n) => (
                  <tr key={n.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                          <Bell size={13} className="text-white/30" />
                        </div>
                        <p className="text-white/80 text-sm font-medium">{n.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeColors[n.type] || typeColors.General}`}>
                        {n.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${audienceColors[n.audience] || audienceColors.All}`}>
                        {n.audience}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-white/25" />
                        <span className="text-white/40 text-sm">{n.date}</span>
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
                )) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center">
                      <Bell size={32} className="text-white/10 mx-auto mb-3" />
                      <p className="text-white/25 text-sm">No notices found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
            <p className="text-white/25 text-xs">
              Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} notices
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

export default NoticeBoardPage;