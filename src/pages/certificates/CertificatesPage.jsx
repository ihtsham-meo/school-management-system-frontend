import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  Printer,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Star,
  BookOpen,
} from "lucide-react";
import { certificatesData } from "../../constants/dummyData";

const statusStyle = {
  Issued: "bg-green-500/10 text-green-400 border border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const typeStyle = {
  Academic: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Sports: "bg-green-500/10 text-green-400 border border-green-500/20",
  Participation: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Religious: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  "Co-curricular": "bg-pink-500/10 text-pink-400 border border-pink-500/20",
};

const CertificatesPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const types = [
    "All",
    "Academic",
    "Sports",
    "Participation",
    "Religious",
    "Co-curricular",
  ];

  const filtered = certificatesData.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.student.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || c.type === typeFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  // Certificate Preview Card
  const CertificateCard = ({ cert }) => (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-all group">
      {/* Certificate Preview */}
      <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] border-b border-white/[0.06] p-6 flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-2 left-2 w-8 h-8 border border-white/[0.08] rounded-full" />
          <div className="absolute top-2 right-2 w-8 h-8 border border-white/[0.08] rounded-full" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border border-white/[0.08] rounded-full" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border border-white/[0.08] rounded-full" />
        </div>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center mb-3">
            <Award size={22} className="text-white/50" />
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">
            Certificate of
          </p>
          <h3 className="text-white/80 font-bold text-sm leading-snug">
            {cert.title}
          </h3>
          <p className="text-white/30 text-xs mt-2">Awarded to</p>
          <p className="text-white/60 text-sm font-semibold mt-0.5">
            {cert.student}
          </p>
          <p className="text-white/25 text-xs mt-1">{cert.class}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[cert.type] || "bg-white/10 text-white/40 border border-white/20"}`}
          >
            {cert.type}
          </span>
          <span
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[cert.status]}`}
          >
            {cert.status}
          </span>
        </div>
        <p className="text-white/20 text-xs mb-3">
          {cert.status === "Issued"
            ? `Issued: ${cert.issued}`
            : "Not yet issued"}
        </p>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all flex items-center justify-center gap-1">
            <Eye size={12} /> View
          </button>
          <button className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all flex items-center justify-center gap-1">
            <Printer size={12} /> Print
          </button>
          <button className="flex-1 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/40 hover:text-white/70 text-xs transition-all flex items-center justify-center gap-1">
            <Download size={12} /> PDF
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Certificates</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {certificatesData.length} certificates total
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Create Certificate
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: certificatesData.length,
            color: "text-white/70",
            icon: Award,
          },
          {
            label: "Issued",
            value: certificatesData.filter((c) => c.status === "Issued").length,
            color: "text-green-400",
            icon: CheckCircle,
          },
          {
            label: "Pending",
            value: certificatesData.filter((c) => c.status === "Pending")
              .length,
            color: "text-yellow-400",
            icon: Clock,
          },
          {
            label: "Academic",
            value: certificatesData.filter((c) => c.type === "Academic").length,
            color: "text-blue-400",
            icon: Star,
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
            placeholder="Search by title or student..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
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
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "Issued", "Pending"].map((s) => (
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
            Cards
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
            paginated.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <Award size={32} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/25 text-sm">No certificates found</p>
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
                    "Certificate",
                    "Student",
                    "Class",
                    "Type",
                    "Status",
                    "Issued",
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
                  paginated.map((cert) => (
                    <tr
                      key={cert.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                            <Award size={13} className="text-white/40" />
                          </div>
                          <p className="text-white/80 text-sm font-medium">
                            {cert.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/50 text-xs font-semibold shrink-0">
                            {cert.avatar}
                          </div>
                          <span className="text-white/60 text-sm">
                            {cert.student}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/40 text-sm">
                          {cert.class}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[cert.type] || "bg-white/10 text-white/40 border border-white/20"}`}
                        >
                          {cert.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[cert.status]}`}
                        >
                          {cert.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-white/30 text-sm">
                          {cert.issued}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                            <Eye size={13} />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                            <Printer size={13} />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                            <Download size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <Award size={32} className="text-white/10 mx-auto mb-3" />
                      <p className="text-white/25 text-sm">
                        No certificates found
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
              {filtered.length} certificates
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

export default CertificatesPage;
