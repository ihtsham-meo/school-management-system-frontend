import React, { useState } from "react";
import {
  Search, Plus, Phone, Calendar,
  GraduationCap, ArrowRight,
} from "lucide-react";
import { inquiryPipelineData } from "../../constants/dummyData";

const stages = ["New Inquiry", "Contacted", "Visited", "Enrolled"];

const stageStyle = {
  "New Inquiry": { bg: "bg-blue-500/[0.06]", border: "border-blue-500/[0.12]", header: "bg-blue-500/10", dot: "bg-blue-400", text: "text-blue-400" },
  "Contacted": { bg: "bg-yellow-500/[0.06]", border: "border-yellow-500/[0.12]", header: "bg-yellow-500/10", dot: "bg-yellow-400", text: "text-yellow-400" },
  "Visited": { bg: "bg-purple-500/[0.06]", border: "border-purple-500/[0.12]", header: "bg-purple-500/10", dot: "bg-purple-400", text: "text-purple-400" },
  "Enrolled": { bg: "bg-green-500/[0.06]", border: "border-green-500/[0.12]", header: "bg-green-500/10", dot: "bg-green-400", text: "text-green-400" },
};

const priorityStyle = {
  High: "bg-red-500/10 text-red-400 border border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Low: "bg-green-500/10 text-green-400 border border-green-500/20",
};

const sourceStyle = {
  "Walk-in": "bg-blue-500/10 text-blue-400",
  "Website": "bg-purple-500/10 text-purple-400",
  "Referral": "bg-green-500/10 text-green-400",
  "Social Media": "bg-pink-500/10 text-pink-400",
};

const InquiryPipelinePage = () => {
  const [search, setSearch] = useState("");
  const [cards, setCards] = useState(inquiryPipelineData);
  const [dragId, setDragId] = useState(null);

  const filtered = cards.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.applyingFor.toLowerCase().includes(search.toLowerCase())
  );

  const getStageCards = (stage) =>
    filtered.filter((c) => c.stage === stage);

  const handleDragStart = (id) => setDragId(id);

  const handleDrop = (stage) => {
    setCards((prev) =>
      prev.map((c) => c.id === dragId ? { ...c, stage } : c)
    );
    setDragId(null);
  };

  const moveCard = (id, direction) => {
    const currentStageIndex = stages.indexOf(cards.find(c => c.id === id)?.stage);
    const newStageIndex = currentStageIndex + direction;
    if (newStageIndex < 0 || newStageIndex >= stages.length) return;
    setCards((prev) =>
      prev.map((c) => c.id === id ? { ...c, stage: stages[newStageIndex] } : c)
    );
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiry Pipeline</h1>
          <p className="text-white/30 text-sm mt-0.5">Track admission inquiries through stages</p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Plus size={15} />
          Add Inquiry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stages.map((stage) => {
          const style = stageStyle[stage];
          const count = cards.filter(c => c.stage === stage).length;
          return (
            <div key={stage} className={`${style.bg} border ${style.border} rounded-xl px-4 py-3`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                <p className={`text-xs font-medium ${style.text}`}>{stage}</p>
              </div>
              <p className="text-2xl font-bold text-white">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 max-w-sm">
        <Search size={14} className="text-white/25 shrink-0" />
        <input
          type="text"
          placeholder="Search inquiries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full"
        />
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const style = stageStyle[stage];
          const stageCards = getStageCards(stage);
          return (
            <div
              key={stage}
              className={`${style.bg} border ${style.border} rounded-2xl overflow-hidden min-h-[400px]`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(stage)}
            >
              {/* Column Header */}
              <div className={`${style.header} border-b ${style.border} px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                  <span className={`text-sm font-semibold ${style.text}`}>{stage}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.header} ${style.text}`}>
                  {stageCards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-3">
                {stageCards.map((card) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => handleDragStart(card.id)}
                    className="bg-[#0a0a0f]/80 border border-white/[0.08] rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-white/[0.15] transition-all"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.10] flex items-center justify-center text-white/50 text-xs font-bold shrink-0">
                          {card.avatar}
                        </div>
                        <p className="text-white/80 text-xs font-semibold">{card.name}</p>
                      </div>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${priorityStyle[card.priority]}`}>
                        {card.priority}
                      </span>
                    </div>

                    {/* Card Info */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-1.5 text-white/30 text-xs">
                        <GraduationCap size={10} />
                        <span>{card.applyingFor}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/30 text-xs">
                        <Phone size={10} />
                        <span>{card.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/30 text-xs">
                        <Calendar size={10} />
                        <span>{card.date}</span>
                      </div>
                    </div>

                    {/* Source & Move */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${sourceStyle[card.source] || "bg-white/10 text-white/40"}`}>
                        {card.source}
                      </span>
                      <div className="flex items-center gap-1">
                        {stages.indexOf(card.stage) > 0 && (
                          <button
                            onClick={() => moveCard(card.id, -1)}
                            className="w-5 h-5 rounded bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/30 hover:text-white/60 transition-all rotate-180"
                          >
                            <ArrowRight size={10} />
                          </button>
                        )}
                        {stages.indexOf(card.stage) < stages.length - 1 && (
                          <button
                            onClick={() => moveCard(card.id, 1)}
                            className="w-5 h-5 rounded bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/30 hover:text-white/60 transition-all"
                          >
                            <ArrowRight size={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {stageCards.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-white/15 text-xs">Drop cards here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InquiryPipelinePage;