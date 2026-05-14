import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Printer,
  Eye,
  Shield,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  RefreshCw,
  Users,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { idCardsData } from "../../constants/dummyData";

const statusStyle = {
  Printed: "bg-green-500/10 text-green-400 border border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Reprinted: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

const typeStyle = {
  Student: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Staff: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
};

const IDCardsPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const perPage = 6;

  const filtered = idCardsData.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || c.type === typeFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selected.length === paginated.length) setSelected([]);
    else setSelected(paginated.map((c) => c.id));
  };

  // ID Card Preview Component
  const IDCardPreview = ({ card }) => (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/[0.10] rounded-2xl p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/[0.03] -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/[0.02] translate-y-6 -translate-x-6" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <GraduationCap size={14} className="text-white/40" />
          <span className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">
            School ID
          </span>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeStyle[card.type]}`}
        >
          {card.type}
        </span>
      </div>

      {/* Avatar & Info */}
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 text-lg font-bold shrink-0">
          {card.avatar}
        </div>
        <div>
          <p className="text-white/80 text-sm font-semibold leading-none mb-1">
            {card.name}
          </p>
          <p className="text-white/35 text-[11px]">{card.class}</p>
          <p className="text-white/25 text-[10px] font-mono mt-0.5">
            {card.rollNo}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between relative z-10">
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyle[card.status]}`}
        >
          {card.status}
        </span>
        <span className="text-white/20 text-[10px]">Issued: {card.issued}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">ID Cards</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {idCardsData.length} ID cards total
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <button className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-white/70 text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
              <Printer size={14} />
              Print Selected ({selected.length})
            </button>
          )}
          <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
            <Plus size={15} />
            Generate ID Card
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: idCardsData.length,
            color: "text-white/70",
            icon: Shield,
          },
          {
            label: "Printed",
            value: idCardsData.filter((c) => c.status === "Printed").length,
            color: "text-green-400",
            icon: CheckCircle,
          },
          {
            label: "Pending",
            value: idCardsData.filter((c) => c.status === "Pending").length,
            color: "text-yellow-400",
            icon: Clock,
          },
          {
            label: "Reprinted",
            value: idCardsData.filter((c) => c.status === "Reprinted").length,
            color: "text-blue-400",
            icon: RefreshCw,
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
            placeholder="Search by name or ID..."
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
          {["All", "Student", "Staff"].map((t) => (
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
          {["All", "Printed", "Pending", "Reprinted"].map((s) => (
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
        <button className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white/80 text-sm px-4 py-2.5 rounded-xl transition-all">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Cards View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginated.map((card) => (
            <IDCardPreview key={card.id} card={card} />
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
                  <th className="px-5 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={
                        selected.length === paginated.length &&
                        paginated.length > 0
                      }
                      onChange={toggleAll}
                      className="accent-white/50 cursor-pointer"
                    />
                  </th>
                  {[
                    "Person",
                    "ID / Roll No",
                    "Class / Dept",
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
                {paginated.map((card) => (
                  <tr
                    key={card.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(card.id)}
                        onChange={() => toggleSelect(card.id)}
                        className="accent-white/50 cursor-pointer"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 text-sm font-semibold shrink-0">
                          {card.avatar}
                        </div>
                        <p className="text-white/80 text-sm font-medium">
                          {card.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/40 text-sm font-mono">
                        {card.rollNo}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/50 text-sm">
                        {card.class}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[card.type]}`}
                      >
                        {card.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[card.status]}`}
                      >
                        {card.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/30 text-sm">
                        {card.issued}
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
            <p className="text-white/25 text-xs">
              Showing{" "}
              {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–
              {Math.min(currentPage * perPage, filtered.length)} of{" "}
              {filtered.length} cards
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

export default IDCardsPage;
