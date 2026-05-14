import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Eye,
  Pencil,
  Trash2,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  TrendingDown,
  RefreshCw,
  Wallet,
  Tag,
} from "lucide-react";
import { expensesData } from "../../constants/dummyData";

const statusStyle = {
  Paid: "bg-green-500/10 text-green-400 border border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const categoryColors = {
  HR: "text-blue-400",
  Utilities: "text-yellow-400",
  Transport: "text-orange-400",
  Inventory: "text-purple-400",
  Maintenance: "text-cyan-400",
  Sports: "text-green-400",
  Canteen: "text-pink-400",
};

const categoryStyle = {
  HR: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Utilities: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Transport: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  Inventory: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Maintenance: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  Sports: "bg-green-500/10 text-green-400 border border-green-500/20",
  Canteen: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
};

const categories = [
  "All",
  "HR",
  "Utilities",
  "Transport",
  "Inventory",
  "Maintenance",
  "Sports",
  "Canteen",
];

const ExpensesPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = expensesData.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.paidTo.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "All" || e.category === categoryFilter;
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const totalPaid = expensesData
    .filter((e) => e.status === "Paid")
    .reduce((acc, e) => acc + parseInt(e.amount.replace(/[^0-9]/g, "")), 0);

  const totalPending = expensesData
    .filter((e) => e.status === "Pending")
    .reduce((acc, e) => acc + parseInt(e.amount.replace(/[^0-9]/g, "")), 0);

  const totalExpenses = expensesData.reduce(
    (acc, e) => acc + parseInt(e.amount.replace(/[^0-9]/g, "")),
    0,
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Expenses</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {expensesData.length} expense records this month
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Total Expenses",
            value: `₨ ${totalExpenses.toLocaleString()}`,
            color: "text-white/70",
            icon: TrendingDown,
            bg: "bg-white/[0.03]",
            border: "border-white/[0.06]",
          },
          {
            label: "Total Paid",
            value: `₨ ${totalPaid.toLocaleString()}`,
            color: "text-green-400",
            icon: CheckCircle,
            bg: "bg-green-500/[0.04]",
            border: "border-green-500/[0.10]",
          },
          {
            label: "Total Pending",
            value: `₨ ${totalPending.toLocaleString()}`,
            color: "text-yellow-400",
            icon: Clock,
            bg: "bg-yellow-500/[0.04]",
            border: "border-yellow-500/[0.10]",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`${stat.bg} border ${stat.border} rounded-2xl p-5 flex items-center gap-4`}
          >
            <div
              className={`w-12 h-12 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center shrink-0`}
            >
              <stat.icon size={22} className={stat.color} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-white/30 text-sm mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-white/60 text-sm font-semibold mb-4">
          Expenses by Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.slice(1).map((cat) => {
            const catTotal = expensesData
              .filter((e) => e.category === cat)
              .reduce(
                (acc, e) => acc + parseInt(e.amount.replace(/[^0-9]/g, "")),
                0,
              );
            if (catTotal === 0) return null;
            return (
              <div
                key={cat}
                className="bg-white/[0.02] border border-white/[0.04] rounded-xl px-3 py-2.5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Tag
                    size={11}
                    className={categoryColors[cat] || "text-white/40"}
                  />
                  <span
                    className={`text-xs font-medium ${categoryColors[cat] || "text-white/40"}`}
                  >
                    {cat}
                  </span>
                </div>
                <p className="text-white/60 text-sm font-semibold">
                  ₨ {catTotal.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search by title or paid to..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="bg-[#0a0a0f]">
              {c === "All" ? "All Categories" : c}
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
          {["All", "Paid", "Pending"].map((s) => (
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
                  "Expense",
                  "Category",
                  "Paid To",
                  "Payment Method",
                  "Date",
                  "Recurring",
                  "Amount",
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
                paginated.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Expense */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                          <CreditCard size={13} className="text-white/40" />
                        </div>
                        <p className="text-white/80 text-sm font-medium">
                          {expense.title}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${categoryStyle[expense.category] || "bg-white/10 text-white/40 border border-white/20"}`}
                      >
                        {expense.category}
                      </span>
                    </td>

                    {/* Paid To */}
                    <td className="px-5 py-4">
                      <span className="text-white/50 text-sm">
                        {expense.paidTo}
                      </span>
                    </td>

                    {/* Payment Method */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Wallet size={12} className="text-white/25" />
                        <span className="text-white/40 text-sm">
                          {expense.paymentMethod}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <span className="text-white/30 text-sm">
                        {expense.date}
                      </span>
                    </td>

                    {/* Recurring */}
                    <td className="px-5 py-4">
                      {expense.recurring ? (
                        <div className="flex items-center gap-1.5 text-blue-400">
                          <RefreshCw size={12} />
                          <span className="text-xs">Yes</span>
                        </div>
                      ) : (
                        <span className="text-white/20 text-xs">No</span>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4">
                      <span className="text-white/70 text-sm font-semibold">
                        {expense.amount}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[expense.status]}`}
                      >
                        {expense.status}
                      </span>
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
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center">
                    <CreditCard
                      size={32}
                      className="text-white/10 mx-auto mb-3"
                    />
                    <p className="text-white/25 text-sm">No expenses found</p>
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
            {filtered.length} expenses
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

export default ExpensesPage;
