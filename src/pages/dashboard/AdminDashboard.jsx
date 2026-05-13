import React from "react";

import {
  Users, GraduationCap, BookOpen, DollarSign,
  TrendingUp, TrendingDown, UserCheck, AlertCircle,
  ArrowUpRight, ArrowDownRight, Calendar, Bell,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart,
  Pie, Cell,
} from "recharts";


// ── Sample Data ──────────────────────────────────────────
const monthlyData = [
  { month: "Jan", income: 42000, expense: 28000 },
  { month: "Feb", income: 38000, expense: 22000 },
  { month: "Mar", income: 55000, expense: 31000 },
  { month: "Apr", income: 47000, expense: 26000 },
  { month: "May", income: 63000, expense: 35000 },
  { month: "Jun", income: 58000, expense: 29000 },
  { month: "Jul", income: 71000, expense: 38000 },
  { month: "Aug", income: 66000, expense: 33000 },
  { month: "Sep", income: 74000, expense: 41000 },
  { month: "Oct", income: 69000, expense: 36000 },
  { month: "Nov", income: 82000, expense: 44000 },
  { month: "Dec", income: 91000, expense: 48000 },
];

const attendanceData = [
  { day: "Mon", present: 92, absent: 8 },
  { day: "Tue", present: 88, absent: 12 },
  { day: "Wed", present: 95, absent: 5 },
  { day: "Thu", present: 85, absent: 15 },
  { day: "Fri", present: 78, absent: 22 },
];

const feeData = [
  { name: "Collected", value: 68, color: "#22c55e" },
  { name: "Pending", value: 22, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
];

const recentStudents = [
  { name: "Ahmed Khan", class: "10-A", fee: "Paid", date: "May 10" },
  { name: "Sara Ali", class: "9-B", fee: "Pending", date: "May 09" },
  { name: "Usman Tariq", class: "11-C", fee: "Paid", date: "May 09" },
  { name: "Fatima Noor", class: "8-A", fee: "Overdue", date: "May 08" },
  { name: "Bilal Hassan", class: "12-B", fee: "Paid", date: "May 08" },
];

const notices = [
  { title: "Annual Sports Day", date: "May 15", type: "Event" },
  { title: "Fee Submission Deadline", date: "May 20", type: "Finance" },
  { title: "Parent-Teacher Meeting", date: "May 25", type: "Meeting" },
  { title: "Summer Break Starts", date: "Jun 01", type: "Holiday" },
];

// ── Reusable Components ───────────────────────────────────
const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }) => (
  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all duration-200">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
        <Icon size={18} className="text-white/60" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
        ${trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
        {trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trendValue}
      </div>
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm font-medium text-white/60">{title}</p>
    {subtitle && <p className="text-xs text-white/25 mt-0.5">{subtitle}</p>}
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-4">
    <h3 className="text-base font-semibold text-white">{title}</h3>
    {subtitle && <p className="text-xs text-white/30 mt-0.5">{subtitle}</p>}
  </div>
);

const feeStatusStyle = {
  Paid: "bg-green-500/10 text-green-400 border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Overdue: "bg-red-500/10 text-red-400 border-red-500/20",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1f] border border-white/10 rounded-xl p-3 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {typeof p.value === "number" && p.value > 999
              ? `${(p.value / 1000).toFixed(0)}k`
              : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── Main Dashboard ────────────────────────────────────────
const AdminDashboard = () => {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/30 text-sm mt-0.5">Welcome back, Admin 👋</p>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2">
          <Calendar size={14} className="text-white/30" />
          <span className="text-white/40 text-sm">May 2025</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="1,248" subtitle="12 new this month" icon={GraduationCap} trend="up" trendValue="+4.2%" />
        <StatCard title="Total Staff" value="86" subtitle="3 on leave today" icon={Users} trend="up" trendValue="+1.2%" />
        <StatCard title="Fee Collected" value="₨ 9.1M" subtitle="This month" icon={DollarSign} trend="up" trendValue="+12%" />
        <StatCard title="Attendance Today" value="94.2%" subtitle="1,174 present" icon={UserCheck} trend="down" trendValue="-1.8%" />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Classes" value="42" subtitle="6 sections each" icon={BookOpen} trend="up" trendValue="+2" />
        <StatCard title="Unpaid Fees" value="₨ 2.3M" subtitle="68 students" icon={AlertCircle} trend="down" trendValue="-5%" />
        <StatCard title="Monthly Income" value="₨ 91k" subtitle="Dec 2025" icon={TrendingUp} trend="up" trendValue="+11%" />
        <StatCard title="Monthly Expense" value="₨ 48k" subtitle="Dec 2025" icon={TrendingDown} trend="up" trendValue="+3%" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Income vs Expense Chart */}
        <div className="xl:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
          <SectionTitle title="Income vs Expense" subtitle="Full year overview" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
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

        {/* Fee Collection Pie */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
          <SectionTitle title="Fee Collection" subtitle="Current month" />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={feeData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {feeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} wrapperStyle={{ outline: 'none', backgroundColor: 'rgba(0, 0, 0, 0.8)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {feeData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-white/40">{item.name}</span>
                </div>
                <span className="text-white/60 font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Bar Chart */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
        <SectionTitle title="Weekly Attendance" subtitle="Present vs Absent this week" />
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={attendanceData} barSize={28} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="present" name="Present" fill="#22c55e" opacity={0.8} radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" name="Absent" fill="#ef4444" opacity={0.8} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Recent Students */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
          <SectionTitle title="Recent Admissions" subtitle="Latest enrolled students" />
          <div className="space-y-3">
            {recentStudents.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/50 text-xs font-semibold">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">{s.name}</p>
                    <p className="text-white/25 text-xs">Class {s.class}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${feeStatusStyle[s.fee]}`}>
                    {s.fee}
                  </span>
                  <span className="text-white/20 text-xs">{s.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Noticeboard */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
          <SectionTitle title="Noticeboard" subtitle="Upcoming events & notices" />
          <div className="space-y-3">
            {notices.map((n, i) => (
              <div key={i} className="flex items-center gap-4 py-2.5 border-b border-white/[0.04] last:border-0">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <Bell size={14} className="text-white/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm font-medium truncate">{n.title}</p>
                  <p className="text-white/25 text-xs mt-0.5">{n.type}</p>
                </div>
                <span className="text-white/25 text-xs shrink-0">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;