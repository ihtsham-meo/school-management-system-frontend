import React, { useState } from "react";
import {
  Search,
  Plus,
  Send,
  Eye,
  Trash2,
  Mail,
  MessageSquare,
  Bell,
  Phone,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  Users,
} from "lucide-react";
import { messagesData } from "../../constants/dummyData";

const statusStyle = {
  Sent: "bg-green-500/10 text-green-400 border border-green-500/20",
  Failed: "bg-red-500/10 text-red-400 border border-red-500/20",
  Draft: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Scheduled: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

const statusIcon = {
  Sent: CheckCircle,
  Failed: XCircle,
  Draft: Clock,
  Scheduled: Calendar,
};

const typeStyle = {
  SMS: "bg-green-500/10 text-green-400 border border-green-500/20",
  WhatsApp: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Email: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Push: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

const typeIcon = {
  SMS: Phone,
  WhatsApp: MessageSquare,
  Email: Mail,
  Push: Bell,
};

const tabs = [
  { id: "all", label: "All Messages" },
  { id: "SMS", label: "SMS" },
  { id: "WhatsApp", label: "WhatsApp" },
  { id: "Email", label: "Email" },
  { id: "Push", label: "Push" },
];

const MessagesPage = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = messagesData.filter((m) => {
    const matchSearch =
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.recipient.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" || m.type === activeTab;
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    return matchSearch && matchTab && matchStatus;
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
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {messagesData.length} messages total
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Send size={14} />
          Send Message
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "SMS Sent",
            value: messagesData.filter(
              (m) => m.type === "SMS" && m.status === "Sent",
            ).length,
            color: "text-green-400",
            icon: Phone,
          },
          {
            label: "WhatsApp",
            value: messagesData.filter(
              (m) => m.type === "WhatsApp" && m.status === "Sent",
            ).length,
            color: "text-emerald-400",
            icon: MessageSquare,
          },
          {
            label: "Emails",
            value: messagesData.filter(
              (m) => m.type === "Email" && m.status === "Sent",
            ).length,
            color: "text-blue-400",
            icon: Mail,
          },
          {
            label: "Push Sent",
            value: messagesData.filter(
              (m) => m.type === "Push" && m.status === "Sent",
            ).length,
            color: "text-purple-400",
            icon: Bell,
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

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "bg-white/[0.08] text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search by subject or recipient..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "Sent", "Failed", "Draft", "Scheduled"].map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">
              {s === "All" ? "All Statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {[
                  "Subject",
                  "Recipient",
                  "Type",
                  "Message",
                  "Recipients Count",
                  "Date",
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
                paginated.map((msg) => {
                  const StatusIcon = statusIcon[msg.status];
                  const TypeIcon = typeIcon[msg.type];
                  return (
                    <tr
                      key={msg.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Subject */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                            <TypeIcon size={13} className="text-white/40" />
                          </div>
                          <p className="text-white/80 text-sm font-medium">
                            {msg.subject}
                          </p>
                        </div>
                      </td>

                      {/* Recipient */}
                      <td className="px-5 py-4">
                        <span className="text-white/50 text-sm">
                          {msg.recipient}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[msg.type]}`}
                        >
                          {msg.type}
                        </span>
                      </td>

                      {/* Message */}
                      <td className="px-5 py-4">
                        <p className="text-white/30 text-xs truncate max-w-[200px]">
                          {msg.message}
                        </p>
                      </td>

                      {/* Count */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Users size={12} className="text-white/25" />
                          <span className="text-white/50 text-sm">
                            {msg.count.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-white/30 text-sm">
                          {msg.date}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <div
                          className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full w-fit ${statusStyle[msg.status]}`}
                        >
                          <StatusIcon size={11} />
                          {msg.status}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                            <Eye size={13} />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                            <Send size={13} />
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
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <Mail size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/25 text-sm">No messages found</p>
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
            {filtered.length} messages
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

export default MessagesPage;
