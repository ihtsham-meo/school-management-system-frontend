import React, { useState } from "react";
import {
  Search, Eye, CheckCircle, XCircle,
  Clock, FileText, ChevronLeft, ChevronRight,
  AlertCircle, Download, CheckSquare,
} from "lucide-react";
import { admissionRequestsData } from "../../constants/dummyData";

const statusStyle = {
  "Under Review": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  "Documents Pending": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  "Approved": "bg-green-500/10 text-green-400 border border-green-500/20",
  "Rejected": "bg-red-500/10 text-red-400 border border-red-500/20",
};

const statusIcon = {
  "Under Review": Clock,
  "Documents Pending": AlertCircle,
  "Approved": CheckCircle,
  "Rejected": XCircle,
};

const AdmissionRequestsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = admissionRequestsData.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.father.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Admission Requests</h1>
          <p className="text-white/30 text-sm mt-0.5">{admissionRequestsData.length} pending requests</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white/80 text-sm px-4 py-2.5 rounded-xl transition-all">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: admissionRequestsData.length, color: "text-white/70", icon: FileText },
          { label: "Under Review", value: admissionRequestsData.filter(r => r.status === "Under Review").length, color: "text-blue-400", icon: Clock },
          { label: "Docs Pending", value: admissionRequestsData.filter(r => r.status === "Documents Pending").length, color: "text-yellow-400", icon: AlertCircle },
          { label: "Approved", value: admissionRequestsData.filter(r => r.status === "Approved").length, color: "text-green-400", icon: CheckCircle },
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
            placeholder="Search by name or father..."
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
          {["All", "Under Review", "Documents Pending", "Approved", "Rejected"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">{s === "All" ? "All Statuses" : s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Applicant", "Father", "Contact", "Applying For", "Request Date", "Documents", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? paginated.map((r) => {
                const Icon = statusIcon[r.status];
                return (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 text-sm font-semibold shrink-0">
                          {r.avatar}
                        </div>
                        <div>
                          <p className="text-white/80 text-sm font-medium">{r.name}</p>
                          <p className="text-white/25 text-xs">{r.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-white/50 text-sm">{r.father}</span></td>
                    <td className="px-5 py-4"><span className="text-white/40 text-xs">{r.phone}</span></td>
                    <td className="px-5 py-4"><span className="text-white/50 text-sm">{r.applyingFor}</span></td>
                    <td className="px-5 py-4"><span className="text-white/30 text-sm">{r.requestDate}</span></td>
                    <td className="px-5 py-4">
                      {r.documents ? (
                        <div className="flex items-center gap-1.5 text-green-400">
                          <CheckSquare size={13} />
                          <span className="text-xs">Submitted</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-400/60">
                          <AlertCircle size={13} />
                          <span className="text-xs">Missing</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full w-fit ${statusStyle[r.status]}`}>
                        <Icon size={11} />
                        {r.status}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all"><Eye size={13} /></button>
                        <button className="w-7 h-7 rounded-lg bg-green-500/[0.06] hover:bg-green-500/[0.12] border border-green-500/[0.15] flex items-center justify-center text-green-400/60 hover:text-green-400 transition-all"><CheckCircle size={13} /></button>
                        <button className="w-7 h-7 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all"><XCircle size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <FileText size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No requests found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} requests
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

export default AdmissionRequestsPage;