import React, { useState } from "react";
import {
  Search, Plus, Download, Eye, Pencil, Trash2,
  DollarSign, ChevronLeft, ChevronRight,
  CheckCircle, Clock, AlertCircle, TrendingUp,
} from "lucide-react";
import { feesData, classOptions, feeStatusOptions } from "../../constants/dummyData";

const statusStyle = {
  Paid: "bg-green-500/10 text-green-400 border border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Overdue: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const statusIcon = {
  Paid: CheckCircle,
  Pending: Clock,
  Overdue: AlertCircle,
};

const FeesPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = feesData.filter((f) => {
    const matchSearch =
      f.student.toLowerCase().includes(search.toLowerCase()) ||
      f.rollNo.includes(search);
    const matchClass = classFilter === "All" || f.class === classFilter;
    const matchStatus = statusFilter === "All" || f.status === statusFilter;
    return matchSearch && matchClass && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalCollected = feesData
    .filter((f) => f.status === "Paid")
    .reduce((acc, f) => acc + parseInt(f.amount.replace(/[^0-9]/g, "")), 0);

  const totalPending = feesData
    .filter((f) => f.status === "Pending")
    .reduce((acc, f) => acc + parseInt(f.amount.replace(/[^0-9]/g, "")), 0);

  const totalOverdue = feesData
    .filter((f) => f.status === "Overdue")
    .reduce((acc, f) => acc + parseInt(f.amount.replace(/[^0-9]/g, "")), 0);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Fee Management</h1>
          <p className="text-white/30 text-sm mt-0.5">{feesData.length} fee records this month</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Generate Fee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Collected", value: `₨ ${totalCollected.toLocaleString()}`, color: "text-green-400", icon: CheckCircle, bg: "bg-green-500/[0.06]", border: "border-green-500/[0.10]" },
          { label: "Total Pending", value: `₨ ${totalPending.toLocaleString()}`, color: "text-yellow-400", icon: Clock, bg: "bg-yellow-500/[0.06]", border: "border-yellow-500/[0.10]" },
          { label: "Total Overdue", value: `₨ ${totalOverdue.toLocaleString()}`, color: "text-red-400", icon: AlertCircle, bg: "bg-red-500/[0.06]", border: "border-red-500/[0.10]" },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} border ${stat.border} rounded-2xl p-5 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center shrink-0`}>
              <stat.icon size={22} className={stat.color} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-white/30 text-sm mt-0.5">{stat.label}</p>
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
            placeholder="Search by student name or roll no..."
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
          {classOptions.map((c) => (
            <option key={c} value={c} className="bg-[#0a0a0f]">Class {c}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          <option value="All" className="bg-[#0a0a0f]">All Statuses</option>
          {feeStatusOptions.map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">{s}</option>
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
                {["Student", "Roll No", "Class", "Amount", "Month", "Due Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? paginated.map((f) => {
                const Icon = statusIcon[f.status];
                return (
                  <tr key={f.id} className="hover:bg-white/[0.02] transition-colors group">

                    {/* Student */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 text-sm font-semibold shrink-0">
                          {f.student.charAt(0)}
                        </div>
                        <p className="text-white/80 text-sm font-medium">{f.student}</p>
                      </div>
                    </td>

                    {/* Roll No */}
                    <td className="px-5 py-4">
                      <span className="text-white/40 text-sm font-mono">{f.rollNo}</span>
                    </td>

                    {/* Class */}
                    <td className="px-5 py-4">
                      <span className="text-white/50 text-sm">{f.class}</span>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4">
                      <span className="text-white/70 text-sm font-semibold">{f.amount}</span>
                    </td>

                    {/* Month */}
                    <td className="px-5 py-4">
                      <span className="text-white/40 text-sm">{f.month}</span>
                    </td>

                    {/* Due Date */}
                    <td className="px-5 py-4">
                      <span className="text-white/40 text-sm">{f.due}</span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full w-fit ${statusStyle[f.status]}`}>
                        <Icon size={11} />
                        {f.status}
                      </div>
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
                );
              }) : (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <DollarSign size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No fee records found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} records
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

export default FeesPage;