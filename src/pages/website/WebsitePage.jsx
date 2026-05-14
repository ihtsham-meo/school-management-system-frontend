import React, { useState } from "react";
import {
  Globe,
  Eye,
  Pencil,
  Trash2,
  Plus,
  FileText,
  Image,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Layout,
  Camera,
  MessageSquare,
} from "lucide-react";
import { websiteData } from "../../constants/dummyData";

const statusStyle = {
  Published: "bg-green-500/10 text-green-400 border border-green-500/20",
  Draft: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Approved: "bg-green-500/10 text-green-400 border border-green-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const tabs = [
  { id: "pages", label: "Pages", icon: Layout },
  { id: "gallery", label: "Gallery", icon: Camera },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
];

const WebsitePage = () => {
  const [activeTab, setActiveTab] = useState("pages");

  const totalViews = websiteData.pages.reduce((acc, p) => acc + p.views, 0);
  const totalImages = websiteData.gallery.reduce((acc, g) => acc + g.images, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Website Management</h1>
          <p className="text-white/30 text-sm mt-0.5">
            Manage your school website content
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.10] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all">
          <Globe size={14} />
          Visit Website
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Pages",
            value: websiteData.pages.length,
            color: "text-white/70",
            icon: FileText,
          },
          {
            label: "Published",
            value: websiteData.pages.filter((p) => p.status === "Published")
              .length,
            color: "text-green-400",
            icon: CheckCircle,
          },
          {
            label: "Total Views",
            value: totalViews.toLocaleString(),
            color: "text-blue-400",
            icon: TrendingUp,
          },
          {
            label: "Gallery Images",
            value: totalImages,
            color: "text-purple-400",
            icon: Image,
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
      <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                activeTab === tab.id
                  ? "bg-white/[0.08] text-white"
                  : "text-white/30 hover:text-white/60"
              }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pages Tab */}
      {activeTab === "pages" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-white/70 text-sm font-medium px-4 py-2 rounded-xl transition-all">
              <Plus size={14} />
              Add Page
            </button>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[
                    "Page Title",
                    "URL Slug",
                    "Views",
                    "Last Updated",
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
                {websiteData.pages.map((page) => (
                  <tr
                    key={page.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                          <Layout size={13} className="text-white/40" />
                        </div>
                        <p className="text-white/80 text-sm font-medium">
                          {page.title}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/40 text-sm font-mono">
                        {page.slug}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp size={12} className="text-white/25" />
                        <span className="text-white/50 text-sm">
                          {page.views.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/30 text-sm">
                        {page.lastUpdated}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[page.status]}`}
                      >
                        {page.status}
                      </span>
                    </td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-white/70 text-sm font-medium px-4 py-2 rounded-xl transition-all">
              <Plus size={14} />
              Add Album
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {websiteData.gallery.map((album) => (
              <div
                key={album.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-3">
                  <Camera size={18} className="text-white/40" />
                </div>
                <h3 className="text-white/80 text-sm font-semibold mb-1">
                  {album.title}
                </h3>
                <p className="text-white/30 text-xs mb-3">
                  {album.images} images · {album.date}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[album.status]}`}
                  >
                    {album.status}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Tab */}
      {activeTab === "testimonials" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-white/70 text-sm font-medium px-4 py-2 rounded-xl transition-all">
              <Plus size={14} />
              Add Testimonial
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {websiteData.testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < t.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-white/10"
                        }
                      />
                    ))}
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[t.status]}`}
                  >
                    {t.status}
                  </span>
                </div>
                <p className="text-white/50 text-sm italic mb-4">
                  "{t.message}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">
                      {t.name}
                    </p>
                    <p className="text-white/30 text-xs">{t.role}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all">
                      <CheckCircle size={13} />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-red-500/[0.06] hover:bg-red-500/[0.12] border border-red-500/[0.15] flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitePage;
