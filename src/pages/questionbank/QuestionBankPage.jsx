import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckSquare,
  AlignLeft,
  FileText,
} from "lucide-react";
import { questionBankData, classOptions } from "../../constants/dummyData";

const typeStyle = {
  MCQ: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Short: "bg-green-500/10 text-green-400 border border-green-500/20",
  Long: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

const typeIcon = {
  MCQ: CheckSquare,
  Short: AlignLeft,
  Long: FileText,
};

const difficultyStyle = {
  Easy: "bg-green-500/10 text-green-400 border border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Hard: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const QuestionBankPage = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const subjects = ["All", ...new Set(questionBankData.map((q) => q.subject))];

  const filtered = questionBankData.filter((q) => {
    const matchSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || q.class === classFilter;
    const matchType = typeFilter === "All" || q.type === typeFilter;
    const matchDifficulty =
      difficultyFilter === "All" || q.difficulty === difficultyFilter;
    const matchSubject = subjectFilter === "All" || q.subject === subjectFilter;
    return (
      matchSearch && matchClass && matchType && matchDifficulty && matchSubject
    );
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
          <h1 className="text-2xl font-bold text-white">Question Bank</h1>
          <p className="text-white/30 text-sm mt-0.5">
            {questionBankData.length} questions total
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Question
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Questions",
            value: questionBankData.length,
            color: "text-white/70",
            icon: HelpCircle,
          },
          {
            label: "MCQ",
            value: questionBankData.filter((q) => q.type === "MCQ").length,
            color: "text-blue-400",
            icon: CheckSquare,
          },
          {
            label: "Short Answer",
            value: questionBankData.filter((q) => q.type === "Short").length,
            color: "text-green-400",
            icon: AlignLeft,
          },
          {
            label: "Long Answer",
            value: questionBankData.filter((q) => q.type === "Long").length,
            color: "text-purple-400",
            icon: FileText,
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
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 min-w-[200px]">
          <Search size={14} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search questions or topics..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => {
            setSubjectFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {subjects.map((s) => (
            <option key={s} value={s} className="bg-[#0a0a0f]">
              {s === "All" ? "All Subjects" : s}
            </option>
          ))}
        </select>
        <select
          value={classFilter}
          onChange={(e) => {
            setClassFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          <option value="All" className="bg-[#0a0a0f]">
            All Classes
          </option>
          {classOptions.map((c) => (
            <option key={c} value={c} className="bg-[#0a0a0f]">
              Class {c}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "MCQ", "Short", "Long"].map((t) => (
            <option key={t} value={t} className="bg-[#0a0a0f]">
              {t === "All" ? "All Types" : t}
            </option>
          ))}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => {
            setDifficultyFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer"
        >
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <option key={d} value={d} className="bg-[#0a0a0f]">
              {d === "All" ? "All Difficulties" : d}
            </option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {paginated.length > 0 ? (
          paginated.map((q, index) => {
            const TypeIcon = typeIcon[q.type] || HelpCircle;
            return (
              <div
                key={q.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Question Number */}
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white/40 text-xs font-bold">
                      {(currentPage - 1) * perPage + index + 1}
                    </span>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium mb-2">
                      {q.question}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${typeStyle[q.type]}`}
                      >
                        {q.type}
                      </span>
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${difficultyStyle[q.difficulty]}`}
                      >
                        {q.difficulty}
                      </span>
                      <span className="text-white/25 text-xs">{q.subject}</span>
                      <span className="text-white/20 text-xs">·</span>
                      <span className="text-white/25 text-xs">
                        Class {q.class}
                      </span>
                      <span className="text-white/20 text-xs">·</span>
                      <span className="text-white/25 text-xs">{q.topic}</span>
                      <span className="text-white/20 text-xs">·</span>
                      <span className="text-white/30 text-xs font-medium">
                        {q.marks} {q.marks === 1 ? "mark" : "marks"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/20 text-xs">Answer:</span>
                      <span className="text-white/40 text-xs italic">
                        {q.answer}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
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
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl">
            <HelpCircle size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/25 text-sm">No questions found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-white/25 text-xs">
          Showing {Math.min((currentPage - 1) * perPage + 1, filtered.length)}–
          {Math.min(currentPage * perPage, filtered.length)} of{" "}
          {filtered.length} questions
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
  );
};

export default QuestionBankPage;
