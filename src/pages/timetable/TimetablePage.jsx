import React, { useState } from "react";
import {
  Calendar, Clock, BookOpen, User,
  ChevronLeft, ChevronRight, Plus, Download,
} from "lucide-react";
import { timetableData, classOptions } from "../../constants/dummyData";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = [1, 2, 3, 4, 5];

const subjectColors = [
  "bg-blue-500/10 border-blue-500/20 text-blue-400",
  "bg-purple-500/10 border-purple-500/20 text-purple-400",
  "bg-green-500/10 border-green-500/20 text-green-400",
  "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  "bg-pink-500/10 border-pink-500/20 text-pink-400",
  "bg-orange-500/10 border-orange-500/20 text-orange-400",
  "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
];

const getSubjectColor = (subject) => {
  const index = subject.charCodeAt(0) % subjectColors.length;
  return subjectColors[index];
};

const TimetablePage = () => {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  const filtered = timetableData.filter((t) => t.class === selectedClass);

  const getCell = (day, period) =>
    filtered.find((t) => t.day === day && t.period === period);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Timetable</h1>
          <p className="text-white/30 text-sm mt-0.5">Weekly class schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/50 hover:text-white/80 text-sm px-4 py-2.5 rounded-xl transition-all">
            <Download size={14} />
            Export
          </button>
          <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
            <Plus size={15} />
            Add Period
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Class Selector */}
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {classOptions.map((c) => (
            <option key={c} value={c} className="bg-[#0a0a0f]">Class {c}</option>
          ))}
        </select>

        {/* View Toggle */}
        <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "grid" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === "list" ? "bg-white/[0.08] text-white" : "text-white/30 hover:text-white/60"}`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5 w-24">
                    Period
                  </th>
                  {days.map((day) => (
                    <th key={day} className="text-left text-[11px] font-semibold text-white/25 uppercase tracking-wider px-5 py-3.5">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {periods.map((period) => (
                  <tr key={period} className="hover:bg-white/[0.01] transition-colors">

                    {/* Period Number */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                        <span className="text-white/60 text-sm font-bold">{period}</span>
                      </div>
                    </td>

                    {/* Day Cells */}
                    {days.map((day) => {
                      const cell = getCell(day, period);
                      return (
                        <td key={day} className="px-3 py-3">
                          {cell ? (
                            <div className={`border rounded-xl p-3 ${getSubjectColor(cell.subject)}`}>
                              <p className="text-sm font-semibold leading-none mb-1.5">
                                {cell.subject}
                              </p>
                              <div className="flex items-center gap-1 mb-1">
                                <User size={10} className="opacity-60" />
                                <p className="text-[11px] opacity-60 truncate">{cell.teacher.split(" ").slice(-1)[0]}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={10} className="opacity-60" />
                                <p className="text-[10px] opacity-60">{cell.time}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="border border-dashed border-white/[0.06] rounded-xl p-3 flex items-center justify-center h-[76px]">
                              <p className="text-white/15 text-xs">Free</p>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {days.map((day) => {
            const dayPeriods = filtered.filter((t) => t.day === day);
            if (dayPeriods.length === 0) return null;
            return (
              <div key={day} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
                  <Calendar size={14} className="text-white/30" />
                  <h3 className="text-white/70 text-sm font-semibold">{day}</h3>
                  <span className="text-white/20 text-xs ml-1">{dayPeriods.length} periods</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {dayPeriods
                    .sort((a, b) => a.period - b.period)
                    .map((item) => (
                      <div key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                          <span className="text-white/50 text-xs font-bold">{item.period}</span>
                        </div>
                        <div className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${getSubjectColor(item.subject)}`}>
                          {item.subject}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/60 text-sm">{item.teacher}</p>
                          <p className="text-white/25 text-xs mt-0.5">Room {item.room}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Clock size={12} className="text-white/25" />
                          <span className="text-white/30 text-xs">{item.time}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimetablePage;