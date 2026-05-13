import React, { useState } from "react";
import {
  Search, Plus, Download, Eye, Pencil, Trash2,
  Truck, ChevronLeft, ChevronRight, Users,
  Clock, MapPin, CheckCircle, XCircle,
} from "lucide-react";
import { transportData } from "../../constants/dummyData";

const statusStyle = {
  Active: "bg-green-500/10 text-green-400 border border-green-500/20",
  Inactive: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const TransportPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = transportData.filter((t) => {
    const matchSearch =
      t.route.toLowerCase().includes(search.toLowerCase()) ||
      t.driver.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalStudents = transportData.reduce((acc, t) => acc + t.students, 0);
  const totalCapacity = transportData.reduce((acc, t) => acc + t.capacity, 0);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Transport</h1>
          <p className="text-white/30 text-sm mt-0.5">{transportData.length} routes configured</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Route
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Routes", value: transportData.length, color: "text-white/70", icon: Truck },
          { label: "Active Routes", value: transportData.filter(t => t.status === "Active").length, color: "text-green-400", icon: CheckCircle },
          { label: "Total Students", value: totalStudents, color: "text-blue-400", icon: Users },
          { label: "Total Capacity", value: totalCapacity, color: "text-yellow-400", icon: Truck },
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
            placeholder="Search by route or driver..."
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
        <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
          <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "grid" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}>Grid</button>
          <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "list" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}>List</button>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white/80 text-sm px-4 py-2.5 rounded-xl transition-all">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginated.map((t) => (
            <div key={t.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Truck size={18} className="text-white/40" />
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[t.status]}`}>
                  {t.status}
                </span>
              </div>
              <h3 className="text-white/80 font-semibold text-sm mb-1">{t.route}</h3>
              <p className="text-white/30 text-xs mb-4">{t.driver} · {t.vehicle}</p>
              <p className="text-white/25 text-xs mb-4 font-mono">{t.plate}</p>

              {/* Capacity Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/30 text-xs">Occupancy</span>
                  <span className="text-white/50 text-xs">{t.students}/{t.capacity}</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full">
                  <div
                    className="h-1.5 rounded-full bg-white/30"
                    style={{ width: `${(t.students / t.capacity) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/30 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={11} />
                  <span>{t.departure}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={11} />
                  <span>{t.return}</span>
                </div>
              </div>

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

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Route", "Driver", "Vehicle", "Students", "Timings", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {paginated.map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                          <Truck size={14} className="text-white/40" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm font-medium">{t.route}</p>
                          <p className="text-white/25 text-xs font-mono">{t.plate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-white/50 text-sm">{t.driver}</span></td>
                    <td className="px-5 py-4"><span className="text-white/40 text-sm">{t.vehicle}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/[0.06] rounded-full">
                          <div className="h-1.5 rounded-full bg-white/30" style={{ width: `${(t.students / t.capacity) * 100}%` }} />
                        </div>
                        <span className="text-white/40 text-xs">{t.students}/{t.capacity}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-white/30 text-xs">
                        <Clock size={11} />
                        <span>{t.departure} — {t.return}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[t.status]}`}>{t.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all"><Eye size={13} /></button>
                        <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all"><Pencil size={13} /></button>
                        <button className="w-7 h-7 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
            <p className="text-white/25 text-xs">Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} routes</p>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft size={13} /></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded-lg border text-xs font-medium transition-all ${currentPage === i + 1 ? "bg-white/[0.10] border-white/[0.15] text-white" : "bg-white/[0.04] border-white/[0.06] text-white/40 hover:bg-white/[0.08]"}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronRight size={13} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportPage;