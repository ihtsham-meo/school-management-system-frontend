import React, { useState } from "react";
import {
  Search, Plus, Download, Eye, Pencil, Trash2,
  Archive, ChevronLeft, ChevronRight,
  CheckCircle, AlertTriangle, XCircle, Package,
} from "lucide-react";
import { inventoryData } from "../../constants/dummyData";

const statusStyle = {
  "In Stock": "bg-green-500/10 text-green-400 border border-green-500/20",
  "Low Stock": "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  "Out of Stock": "bg-red-500/10 text-red-400 border border-red-500/20",
};

const statusIcon = {
  "In Stock": CheckCircle,
  "Low Stock": AlertTriangle,
  "Out of Stock": XCircle,
};

const categories = ["All", "Stationery", "Electronics", "Furniture", "Sports", "Medical"];

const InventoryPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = inventoryData.filter((i) => {
    const matchSearch =
      i.item.toLowerCase().includes(search.toLowerCase()) ||
      i.supplier.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "All" || i.category === categoryFilter;
    const matchStatus = statusFilter === "All" || i.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="text-white/30 text-sm mt-0.5">{inventoryData.length} items in inventory</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Items", value: inventoryData.length, color: "text-white/70", icon: Package },
          { label: "In Stock", value: inventoryData.filter(i => i.status === "In Stock").length, color: "text-green-400", icon: CheckCircle },
          { label: "Low Stock", value: inventoryData.filter(i => i.status === "Low Stock").length, color: "text-yellow-400", icon: AlertTriangle },
          { label: "Out of Stock", value: inventoryData.filter(i => i.status === "Out of Stock").length, color: "text-red-400", icon: XCircle },
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
            placeholder="Search by item or supplier..."
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
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "In Stock", "Low Stock", "Out of Stock"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">{s === "All" ? "All Statuses" : s}</option>
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
                {["Item", "Category", "Quantity", "Min Stock", "Unit Price", "Supplier", "Last Updated", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {paginated.length > 0 ? paginated.map((item) => {
                const Icon = statusIcon[item.status];
                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">

                    {/* Item */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                          <Archive size={13} className="text-white/40" />
                        </div>
                        <p className="text-white/80 text-sm font-medium">{item.item}</p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="text-white/50 text-sm">{item.category}</span>
                    </td>

                    {/* Quantity */}
                    <td className="px-5 py-4">
                      <span className={`text-sm font-semibold ${item.quantity === 0 ? "text-red-400" : item.quantity <= item.minStock ? "text-yellow-400" : "text-white/70"}`}>
                        {item.quantity}
                      </span>
                    </td>

                    {/* Min Stock */}
                    <td className="px-5 py-4">
                      <span className="text-white/30 text-sm">{item.minStock}</span>
                    </td>

                    {/* Unit Price */}
                    <td className="px-5 py-4">
                      <span className="text-white/60 text-sm font-medium">{item.price}</span>
                    </td>

                    {/* Supplier */}
                    <td className="px-5 py-4">
                      <span className="text-white/40 text-sm">{item.supplier}</span>
                    </td>

                    {/* Last Updated */}
                    <td className="px-5 py-4">
                      <span className="text-white/30 text-sm">{item.lastUpdated}</span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full w-fit ${statusStyle[item.status]}`}>
                        <Icon size={11} />
                        {item.status}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all"><Eye size={13} /></button>
                        <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all"><Pencil size={13} /></button>
                        <button className="w-7 h-7 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center">
                    <Archive size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No items found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs">
            Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length} items
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

export default InventoryPage;