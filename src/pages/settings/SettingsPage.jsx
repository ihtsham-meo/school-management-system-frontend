import React, { useState } from "react";
import {
  School, User, Lock, Bell, Palette,
  Globe, Shield, Save, Camera, Mail,
  Phone, MapPin, Eye, EyeOff,
} from "lucide-react";

const tabs = [
  { id: "school", label: "School Info", icon: School },
  { id: "profile", label: "My Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("school");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [schoolForm, setSchoolForm] = useState({
    name: "Dar-e-Arqam Schools",
    email: "info@darearqam.edu.pk",
    phone: "051-1234567",
    address: "Rawalpindi, Punjab, Pakistan",
    website: "www.darearqam.edu.pk",
    established: "1995",
    principal: "Dr. Khalid Mehmood",
    tagline: "Excellence in Education",
  });

  const [profileForm, setProfileForm] = useState({
    name: "Admin User",
    email: "admin@darearqam.edu.pk",
    phone: "0300-1234567",
    role: "Administrator",
    department: "Administration",
  });

  const [notifications, setNotifications] = useState({
    emailFee: true,
    emailAttendance: false,
    emailResults: true,
    smsAttendance: true,
    smsFee: true,
    pushAll: false,
  });

  const [appearance, setAppearance] = useState({
    theme: "dark",
    language: "English",
    timezone: "Asia/Karachi",
    dateFormat: "DD/MM/YYYY",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const InputField = ({ label, value, onChange, type = "text", icon: Icon, placeholder }) => (
    <div>
      <label className="block text-[13px] font-medium text-white/50 mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-xl ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 text-white/80 text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors`}
        />
      </div>
    </div>
  );

  const Toggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-white/[0.04] last:border-0">
      <div>
        <p className="text-white/70 text-sm font-medium">{label}</p>
        {description && <p className="text-white/25 text-xs mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5.5 rounded-full transition-all duration-200 relative ${checked ? "bg-white/30" : "bg-white/[0.08]"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${checked ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/30 text-sm mt-0.5">Manage your school and account settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">

        {/* Sidebar Tabs */}
        <div className="lg:w-52 shrink-0">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-2 space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${activeTab === tab.id
                    ? "bg-white/[0.08] text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                  }`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">

          {/* School Info */}
          {activeTab === "school" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-white">School Information</h2>
                <p className="text-white/30 text-xs mt-0.5">Update your school's basic details</p>
              </div>

              {/* Logo Upload */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <School size={28} className="text-white/30" />
                </div>
                <div>
                  <button className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-white/60 hover:text-white text-xs font-medium px-3 py-2 rounded-lg transition-all">
                    <Camera size={13} />
                    Upload Logo
                  </button>
                  <p className="text-white/20 text-xs mt-1.5">PNG, JPG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="School Name" value={schoolForm.name} onChange={(v) => setSchoolForm({ ...schoolForm, name: v })} icon={School} />
                <InputField label="Email Address" value={schoolForm.email} onChange={(v) => setSchoolForm({ ...schoolForm, email: v })} icon={Mail} />
                <InputField label="Phone Number" value={schoolForm.phone} onChange={(v) => setSchoolForm({ ...schoolForm, phone: v })} icon={Phone} />
                <InputField label="Website" value={schoolForm.website} onChange={(v) => setSchoolForm({ ...schoolForm, website: v })} icon={Globe} />
                <InputField label="Principal Name" value={schoolForm.principal} onChange={(v) => setSchoolForm({ ...schoolForm, principal: v })} icon={User} />
                <InputField label="Established Year" value={schoolForm.established} onChange={(v) => setSchoolForm({ ...schoolForm, established: v })} />
                <div className="sm:col-span-2">
                  <InputField label="Address" value={schoolForm.address} onChange={(v) => setSchoolForm({ ...schoolForm, address: v })} icon={MapPin} />
                </div>
                <div className="sm:col-span-2">
                  <InputField label="Tagline" value={schoolForm.tagline} onChange={(v) => setSchoolForm({ ...schoolForm, tagline: v })} placeholder="Your school tagline..." />
                </div>
              </div>
            </div>
          )}

          {/* My Profile */}
          {activeTab === "profile" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-white">My Profile</h2>
                <p className="text-white/30 text-xs mt-0.5">Update your personal information</p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <span className="text-white/50 text-2xl font-bold">A</span>
                </div>
                <div>
                  <button className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-white/60 hover:text-white text-xs font-medium px-3 py-2 rounded-lg transition-all">
                    <Camera size={13} />
                    Change Avatar
                  </button>
                  <p className="text-white/20 text-xs mt-1.5">PNG, JPG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Full Name" value={profileForm.name} onChange={(v) => setProfileForm({ ...profileForm, name: v })} icon={User} />
                <InputField label="Email Address" value={profileForm.email} onChange={(v) => setProfileForm({ ...profileForm, email: v })} icon={Mail} />
                <InputField label="Phone Number" value={profileForm.phone} onChange={(v) => setProfileForm({ ...profileForm, phone: v })} icon={Phone} />
                <InputField label="Role" value={profileForm.role} onChange={(v) => setProfileForm({ ...profileForm, role: v })} icon={Shield} />
                <InputField label="Department" value={profileForm.department} onChange={(v) => setProfileForm({ ...profileForm, department: v })} />
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-white">Security</h2>
                <p className="text-white/30 text-xs mt-0.5">Manage your password and security settings</p>
              </div>
              <div className="space-y-4 max-w-md">
                <InputField label="Current Password" value="" onChange={() => {}} type="password" icon={Lock} placeholder="Enter current password" />
                <div>
                  <label className="block text-[13px] font-medium text-white/50 mb-2">New Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-11 py-2.5 text-white/80 text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <InputField label="Confirm New Password" value="" onChange={() => {}} type="password" icon={Lock} placeholder="Confirm new password" />
              </div>

              {/* Security Info */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 max-w-md">
                <p className="text-white/50 text-xs font-medium mb-2">Password Requirements</p>
                {["At least 8 characters", "One uppercase letter", "One number", "One special character"].map((req, i) => (
                  <p key={i} className="text-white/25 text-xs flex items-center gap-2 mt-1">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                    {req}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-white">Notification Preferences</h2>
                <p className="text-white/30 text-xs mt-0.5">Choose what notifications you receive</p>
              </div>

              <div className="space-y-1">
                <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-2">Email Notifications</p>
                <Toggle label="Fee Reminders" description="Get notified about pending fee payments" checked={notifications.emailFee} onChange={(v) => setNotifications({ ...notifications, emailFee: v })} />
                <Toggle label="Attendance Alerts" description="Daily attendance summary via email" checked={notifications.emailAttendance} onChange={(v) => setNotifications({ ...notifications, emailAttendance: v })} />
                <Toggle label="Exam Results" description="Notify when results are published" checked={notifications.emailResults} onChange={(v) => setNotifications({ ...notifications, emailResults: v })} />
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-2">SMS Notifications</p>
                <Toggle label="Attendance SMS" description="Send SMS for student absence" checked={notifications.smsAttendance} onChange={(v) => setNotifications({ ...notifications, smsAttendance: v })} />
                <Toggle label="Fee Due SMS" description="Send SMS for overdue fees" checked={notifications.smsFee} onChange={(v) => setNotifications({ ...notifications, smsFee: v })} />
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-2">Push Notifications</p>
                <Toggle label="Enable Push Notifications" description="Receive browser push notifications" checked={notifications.pushAll} onChange={(v) => setNotifications({ ...notifications, pushAll: v })} />
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-white">Appearance</h2>
                <p className="text-white/30 text-xs mt-0.5">Customize how the system looks</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                {[
                  { label: "Language", key: "language", options: ["English", "Urdu", "Arabic"] },
                  { label: "Timezone", key: "timezone", options: ["Asia/Karachi", "Asia/Dubai", "UTC"] },
                  { label: "Date Format", key: "dateFormat", options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[13px] font-medium text-white/50 mb-2">{field.label}</label>
                    <select
                      value={appearance[field.key]}
                      onChange={(e) => setAppearance({ ...appearance, [field.key]: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white/80 text-sm outline-none focus:border-white/20 transition-colors cursor-pointer"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0a0a0f]">{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Theme */}
              <div>
                <p className="text-[13px] font-medium text-white/50 mb-3">Theme</p>
                <div className="flex items-center gap-3">
                  {["dark", "light"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setAppearance({ ...appearance, theme: t })}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all capitalize
                        ${appearance.theme === t
                          ? "bg-white/[0.10] border-white/[0.20] text-white"
                          : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:bg-white/[0.06]"
                        }`}
                    >
                      {t === "dark" ? "🌙" : "☀️"} {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-6 pt-5 border-t border-white/[0.06]">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-white/[0.10] hover:bg-white/[0.15] border border-white/[0.15] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
            >
              <Save size={14} />
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;