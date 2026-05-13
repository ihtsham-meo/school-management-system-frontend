import React, { useState } from "react";
import {
  Search, Download, Eye, Trash2, BarChart2,
  FileText, ChevronLeft, ChevronRight,
  CheckCircle, Clock, RefreshCw, Filter,
  TrendingUp, DollarSign, Users, UserCheck,
} from "lucide-react";
import { reportsData, monthlyFinanceData, weeklyAttendanceData } from "../../constants/dummyData";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const statusStyle = {
  Ready: "bg-green-500/10 text-green-400 border border-green-500/20",
  Processing: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const formatStyle = {
  PDF: "bg-red-500/10 text-red-400 border border-red-500/20",
  Excel: "bg-green-500/10 text-green-400 border border-green-500/20",
};

const categoryColors = {
  Finance: "text-green-400",
  Attendance: "text-blue-400",
  HR: "text-purple-400",
  Academic: "text-yellow-400",
  Transport: "text-orange-400",
  Inventory: "text-cyan-400",
  Admissions: "text-pink-400",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1f] border border-white/10 rounded-xl p-3 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ReportsPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const categories = ["All", "Finance", "Attendance", "HR", "Academic", "Transport", "Inventory", "Admissions"];

  const filtered = reportsData.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "All" || r.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-white/30 text-sm mt-0.5">Analytics and generated reports</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <RefreshCw size={14} />
          Generate Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Reports", value: reportsData.length, color: "text-white/70", icon: FileText },
          { label: "Ready", value: reportsData.filter(r => r.status === "Ready").length, color: "text-green-400", icon: CheckCircle },
          { label: "Processing", value: reportsData.filter(r => r.status === "Processing").length, color: "text-yellow-400", icon: Clock },
          { label: "Categories", value: categories.length - 1, color: "text-blue-400", icon: Filter },
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Finance Chart */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white/80 text-sm font-semibold">Income vs Expense</h3>
              <p className="text-white/25 text-xs mt-0.5">Monthly overview</p>
            </div>
            <DollarSign size={16} className="text-white/20" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyFinanceData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Income" stroke="#22c55e" strokeWidth={2} fill="url(#incomeGrad)" />
              <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={2} fill="url(#expenseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Chart */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white/80 text-sm font-semibold">Weekly Attendance</h3>
              <p className="text-white/25 text-xs mt-0.5">Present vs Absent</p>
            </div>
            <UserCheck size={16} className="text-white/20" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyAttendanceData} barSize={24} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="present" name="Present" fill="#22c55e" opacity={0.8} radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="#ef4444" opacity={0.8} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="bg-[#0a0a0f]">{c === "All" ? "All Categories" : c}</option>
          ))}
        </select>
      </div>

      {/* Reports Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Report", "Category", "Generated", "Size", "Format", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? paginated.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">

                  {/* Report */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <FileText size={13} className="text-white/40" />
                      </div>
                      <p className="text-white/80 text-sm font-medium">{r.title}</p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className={`text-sm font-medium ${categoryColors[r.category] || "text-white/40"}`}>
                      {r.category}
                    </span>
                  </td>

                  {/* Generated */}
                  <td className="px-5 py-4">
                    <span className="text-white/30 text-sm">{r.generated}</span>
                  </td>

                  {/* Size */}
                  <td className="px-5 py-4">
                    <span className="text-white/40 text-sm">{r.size}</span>
                  </td>

                  {/* Format */}
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${formatStyle[r.format]}`}>
                      {r.format}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[r.status]}`}>
                      {r.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                        <Eye size={13} />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                        <Download size={13} />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <BarChart2 size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No reports found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} reports
          </p>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft size={13} /></button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded-lg border text-xs font-medium transition-all ${currentPage === i + 1 ? "bg-white/[0.10] border-white/[0.15] text-white" : "bg-white/[0.04] border-white/[0.06] text-white/40 hover:bg-white/[0.08]"}`}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronRight size={13} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;