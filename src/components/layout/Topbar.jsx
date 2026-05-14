import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, LogOut, User, Menu, Clock } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Topbar = ({ setMobileOpen }) => {
  const { user, role, handleLogout } = useAuth();
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-[#0a0a0a]/60 backdrop-blur-xl border-b border-white/10 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
      {/* Left — Mobile Hamburger + Search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white rounded-xl p-2.5 transition-all"
        >
          <Menu size={18} />
        </button>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl px-4 py-2 w-full max-w-xs">
          <Search className="text-gray-600 shrink-0" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white placeholder-gray-600 outline-none w-full"
          />
        </div>
      </div>

      {/* Live Clock */}
      <div className="hidden md:flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2">
        <div className="text-center">
          <p className="text-white/70 text-xs font-mono font-medium leading-none">
            {formattedTime}
          </p>
          <p className="text-white/25 text-[10px] mt-0.5 leading-none">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button className="relative bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 text-gray-400 hover:text-white rounded-xl p-2.5 transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl px-3 py-2">
          <div className="bg-white/10 border border-white/20 rounded-lg p-1.5">
            <User className="text-white text-sm" size={16} />
          </div>
          <div className="hidden md:block">
            <p className="text-white text-sm font-medium leading-none">
              {user?.name || "User"}
            </p>
            <p className="text-gray-500 text-xs mt-0.5 capitalize">{role}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 text-gray-400 hover:text-red-400 rounded-xl p-2.5 transition-all"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
