import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Video,
  CheckCircle,
} from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I add a new student?",
    answer:
      "Go to Students page and click the 'Add Student' button on the top right. Fill in the required details and click Save.",
    category: "Students",
  },
  {
    id: 2,
    question: "How do I mark attendance?",
    answer:
      "Navigate to Attendance page, select the class and date, then mark each student as Present, Absent, Late or Leave.",
    category: "Attendance",
  },
  {
    id: 3,
    question: "How do I generate fee vouchers?",
    answer:
      "Go to Fees page and click 'Generate Fee'. Select the class, month and fee structure then click Generate.",
    category: "Fees",
  },
  {
    id: 4,
    question: "How do I schedule an online class?",
    answer:
      "Go to Online Classes page, click 'Schedule Class', fill in the details including platform link, date and time.",
    category: "Online Classes",
  },
  {
    id: 5,
    question: "How do I upload study materials?",
    answer:
      "Navigate to Study Materials, click 'Upload Material', select the file and fill in subject, class and other details.",
    category: "Study Materials",
  },
  {
    id: 6,
    question: "How do I send a message to parents?",
    answer:
      "Go to Messages page, click 'Send Message', choose the recipient group, message type (SMS/WhatsApp/Email) and type your message.",
    category: "Messages",
  },
  {
    id: 7,
    question: "How do I create a timetable?",
    answer:
      "Go to Timetable page, click 'Add Period', select the class, subject, teacher, day, period and time slot.",
    category: "Timetable",
  },
  {
    id: 8,
    question: "How do I generate ID cards?",
    answer:
      "Go to ID Cards page, click 'Generate ID Card', select the student or staff member and click Generate.",
    category: "ID Cards",
  },
];

const guides = [
  {
    id: 1,
    title: "Getting Started Guide",
    description: "Complete walkthrough for new administrators",
    icon: BookOpen,
    time: "10 min read",
  },
  {
    id: 2,
    title: "Student Management",
    description: "How to manage students, admissions and parents",
    icon: FileText,
    time: "8 min read",
  },
  {
    id: 3,
    title: "Fee Management Guide",
    description: "Setting up fees, generating vouchers and reports",
    icon: FileText,
    time: "12 min read",
  },
  {
    id: 4,
    title: "Video Tutorials",
    description: "Step by step video guides for all features",
    icon: Video,
    time: "Watch now",
  },
];

const HelpPage = () => {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...new Set(faqs.map((f) => f.category))];

  const filtered = faqs.filter((f) => {
    const matchSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "All" || f.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Help & Support</h1>
        <p className="text-white/30 text-sm mt-0.5">
          Find answers and get support
        </p>
      </div>

      {/* Search Hero */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center">
        <HelpCircle size={40} className="text-white/20 mx-auto mb-4" />
        <h2 className="text-white/70 text-xl font-bold mb-2">
          How can we help you?
        </h2>
        <p className="text-white/30 text-sm mb-6">
          Search our knowledge base for quick answers
        </p>
        <div className="flex items-center gap-3 max-w-lg mx-auto bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
          <Search size={16} className="text-white/25 shrink-0" />
          <input
            type="text"
            placeholder="Search for help..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white placeholder:text-white/25 outline-none w-full"
          />
        </div>
      </div>

      {/* Quick Guides */}
      <div>
        <h3 className="text-white/60 text-sm font-semibold mb-3 uppercase tracking-wider">
          Quick Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-3">
                <guide.icon size={18} className="text-white/40" />
              </div>
              <h4 className="text-white/80 text-sm font-semibold mb-1">
                {guide.title}
              </h4>
              <p className="text-white/30 text-xs mb-3">{guide.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/25 text-xs">{guide.time}</span>
                <ExternalLink
                  size={13}
                  className="text-white/20 group-hover:text-white/50 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider">
            Frequently Asked Questions
          </h3>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm rounded-xl px-4 py-2 outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#0a0a0f]">
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          {filtered.length > 0 ? (
            filtered.map((faq) => (
              <div
                key={faq.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle size={15} className="text-white/20 shrink-0" />
                    <span className="text-white/70 text-sm font-medium">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-white/20 text-xs hidden sm:block">
                      {faq.category}
                    </span>
                    {openFaq === faq.id ? (
                      <ChevronUp size={15} className="text-white/30" />
                    ) : (
                      <ChevronDown size={15} className="text-white/30" />
                    )}
                  </div>
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 pb-4 border-t border-white/[0.04]">
                    <p className="text-white/40 text-sm leading-relaxed pt-3 pl-6">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl">
              <HelpCircle size={32} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/25 text-sm">
                No results found for your search
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div>
        <h3 className="text-white/60 text-sm font-semibold mb-3 uppercase tracking-wider">
          Contact Support
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: MessageSquare,
              title: "Live Chat",
              description: "Chat with our support team",
              action: "Start Chat",
              color: "text-blue-400",
              bg: "bg-blue-500/[0.06]",
              border: "border-blue-500/[0.10]",
            },
            {
              icon: Mail,
              title: "Email Support",
              description: "support@darearqam.edu.pk",
              action: "Send Email",
              color: "text-green-400",
              bg: "bg-green-500/[0.06]",
              border: "border-green-500/[0.10]",
            },
            {
              icon: Phone,
              title: "Phone Support",
              description: "051-1234567 (9AM - 5PM)",
              action: "Call Now",
              color: "text-purple-400",
              bg: "bg-purple-500/[0.06]",
              border: "border-purple-500/[0.10]",
            },
          ].map((contact, i) => (
            <div
              key={i}
              className={`${contact.bg} border ${contact.border} rounded-2xl p-5`}
            >
              <div
                className={`w-10 h-10 rounded-xl ${contact.bg} border ${contact.border} flex items-center justify-center mb-3`}
              >
                <contact.icon size={18} className={contact.color} />
              </div>
              <h4 className="text-white/70 text-sm font-semibold mb-1">
                {contact.title}
              </h4>
              <p className="text-white/30 text-xs mb-4">
                {contact.description}
              </p>
              <button
                className={`text-xs font-medium ${contact.color} hover:opacity-80 transition-opacity flex items-center gap-1`}
              >
                {contact.action} <ExternalLink size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
