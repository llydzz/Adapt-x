import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Volume2,
  Bell,
  Radio,
  Info,
  Shield,
  CheckCircle,
  Camera,
  Eye,
  EyeOff,
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile')
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Profile states
  const [firstName, setFirstName] = useState('Mewpo')
  const [lastName, setLastName] = useState('Operator')
  const [email, setEmail] = useState('operator@gmail.com')
  const [role, setRole] = useState('Operations Specialist')
  const [jurisdiction, setJurisdiction] = useState('Quezon City - NCR Central Corridor')

  // Notification / audio states
  const [liveViolationAlerts, setLiveViolationAlerts] = useState(true)
  const [emergencySirenAlerts, setEmergencySirenAlerts] = useState(true)
  const [congestionAlerts, setCongestionAlerts] = useState(true)
  const [dailyDigest, setDailyDigest] = useState(false)
  const [systemHealthAlerts, setSystemHealthAlerts] = useState(true)
  const [volume, setVolume] = useState(75)

  // Password states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const tabs = [
    { id: 'Profile', name: 'Profile', icon: User },
    { id: 'Audio', name: 'Audio & Alerts', icon: Volume2 },
    { id: 'Notifications', name: 'Notifications', icon: Bell },
    { id: 'Integrations', name: 'Peripherals', icon: Radio },
    { id: 'About', name: 'About System', icon: Info },
    { id: 'Security', name: 'Security', icon: Shield },
  ]

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="px-8 lg:px-12 py-8 flex flex-col gap-6 max-w-[1240px]">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-[27px] font-bold text-white tracking-tight leading-snug">
          Settings
        </h1>
        <p className="text-zinc-400 text-xs sm:text-[13px] mt-1 font-normal">
          System configuration, sensor telemetry calibration, and operator preferences.
        </p>
      </div>

      {/* Main Settings Section: Left Sub-Nav + Right Crisp White Content Card */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sub-Navigation Menu (Fixed snug width) */}
        <div className="flex lg:flex-col gap-1.5 w-full lg:w-[160px] shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-150 text-left whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#16a34a] text-white shadow-md shadow-emerald-900/30'
                    : 'text-zinc-400 hover:text-white hover:bg-[#202026]'
                }`}
              >
                <tab.icon size={15} strokeWidth={isActive ? 2.3 : 1.9} />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Right White Content Card */}
        <div className="flex-1 w-full bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm max-w-[760px] min-h-[440px] flex flex-col justify-between">
          <form onSubmit={handleSave} className="flex flex-col gap-6 h-full justify-between">
            <AnimatePresence mode="wait">
              {/* ==========================================================
                  TAB 1: PROFILE
                 ========================================================== */}
              {activeTab === 'Profile' && (
                <motion.div
                  key="Profile"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-6"
                >
                  <div className="border-b border-zinc-100 pb-3">
                    <h2 className="text-[17px] font-bold text-zinc-900">Profile Details</h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      Manage operator identification and regional authority credentials.
                    </p>
                  </div>

                  {/* Avatar Upload Area */}
                  <div className="flex items-center gap-4 py-1">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-[#16a34a] text-white font-bold text-2xl flex items-center justify-center shadow-sm">
                        M
                      </div>
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-xs hover:bg-black cursor-pointer"
                        title="Upload Avatar"
                      >
                        <Camera size={11} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-bold text-zinc-900">{firstName} {lastName}</h3>
                      <p className="text-xs text-zinc-500">{role}</p>
                      <button
                        type="button"
                        className="mt-1 px-4 py-1.5 bg-black hover:bg-zinc-800 text-white text-[11px] font-semibold rounded-full shadow-xs cursor-pointer w-fit"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full h-10 px-4 bg-[#f8fafc] text-zinc-900 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full h-10 px-4 bg-[#f8fafc] text-zinc-900 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Operator Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 px-4 bg-[#f8fafc] text-zinc-900 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Role Title
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full h-10 px-4 bg-[#f8fafc] text-zinc-900 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Jurisdiction */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                      Enforcement Jurisdiction
                    </label>
                    <input
                      type="text"
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      className="w-full h-10 px-4 bg-[#f8fafc] text-zinc-900 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* ==========================================================
                  TAB 2: AUDIO & ALERTS
                 ========================================================== */}
              {activeTab === 'Audio' && (
                <motion.div
                  key="Audio"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-6"
                >
                  <div className="border-b border-zinc-100 pb-3">
                    <h2 className="text-[16px] font-bold text-zinc-900">Audio & Emergency Sirens</h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Configure control room acoustic alarms and sirens detection threshold.
                    </p>
                  </div>

                  {/* Volume Slider */}
                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-800">Master Alert Volume</span>
                      <span className="text-xs font-bold text-[#16a34a]">{volume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#16a34a]"
                    />
                    <p className="text-[11px] text-zinc-400">
                      Controls loud alarm buzzer when high priority emergency events occur.
                    </p>
                  </div>

                  {/* Emergency Sirens Toggle */}
                  <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Acoustic Siren Auto-Dispatch</h4>
                      <p className="text-[11px] text-zinc-500">
                        Automatically trigger emergency green corridors when ambulance sirens are detected.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmergencySirenAlerts(!emergencySirenAlerts)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ml-4 ${
                        emergencySirenAlerts ? 'bg-[#16a34a]' : 'bg-zinc-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                          emergencySirenAlerts ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ==========================================================
                  TAB 3: NOTIFICATIONS (Matches Figma Screen 3)
                 ========================================================== */}
              {activeTab === 'Notifications' && (
                <motion.div
                  key="Notifications"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-5"
                >
                  <div className="border-b border-zinc-100 pb-3">
                    <h2 className="text-[16px] font-bold text-zinc-900">Notifications</h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Configure real-time operator alerts and daily shift reports.
                    </p>
                  </div>

                  {/* 5 Toggles */}
                  <div className="flex flex-col gap-3">
                    {/* Toggle 1 */}
                    <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">Emergency Audio Detection</h4>
                        <p className="text-[11px] text-zinc-500">Alert immediately when siren microphones register &gt; 85dB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmergencySirenAlerts(!emergencySirenAlerts)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ml-4 ${
                          emergencySirenAlerts ? 'bg-[#16a34a]' : 'bg-zinc-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                            emergencySirenAlerts ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 2 */}
                    <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">High Congestion Alerts</h4>
                        <p className="text-[11px] text-zinc-500">Notify when traffic volume exceeds 50 vehicles per minute</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCongestionAlerts(!congestionAlerts)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ml-4 ${
                          congestionAlerts ? 'bg-[#16a34a]' : 'bg-zinc-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                            congestionAlerts ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 3 */}
                    <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">Violation Pending Review</h4>
                        <p className="text-[11px] text-zinc-500">Popup notification when AI queues new unverified violation</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLiveViolationAlerts(!liveViolationAlerts)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ml-4 ${
                          liveViolationAlerts ? 'bg-[#16a34a]' : 'bg-zinc-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                            liveViolationAlerts ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 4 */}
                    <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">Daily Digest Email</h4>
                        <p className="text-[11px] text-zinc-500">Automatically compile and dispatch PDF summary at 00:00</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDailyDigest(!dailyDigest)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ml-4 ${
                          dailyDigest ? 'bg-[#16a34a]' : 'bg-zinc-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                            dailyDigest ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle 5 */}
                    <div className="flex items-center justify-between py-2 border-b border-zinc-100">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900">System Health Status</h4>
                        <p className="text-[11px] text-zinc-500">Broadcast offline warnings if an intersection controller drops</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSystemHealthAlerts(!systemHealthAlerts)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ml-4 ${
                          systemHealthAlerts ? 'bg-[#16a34a]' : 'bg-zinc-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                            systemHealthAlerts ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==========================================================
                  TAB 4: PERIPHERALS & SENSORS
                 ========================================================== */}
              {activeTab === 'Integrations' && (
                <motion.div
                  key="Integrations"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-4"
                >
                  <div className="border-b border-zinc-100 pb-3">
                    <h2 className="text-[16px] font-bold text-zinc-900">Connected Hardware & Sensors</h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Status of optical camera feeds, ultrasonic sensors, and microcontrollers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-zinc-900">ESP8266 Link</p>
                        <p className="text-[11px] text-zinc-500">Telemetry Gateway</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a]">
                        ONLINE
                      </span>
                    </div>

                    <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-zinc-900">HUSKYLENS 2</p>
                        <p className="text-[11px] text-zinc-500">Optical Vision AI</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a]">
                        ACTIVE
                      </span>
                    </div>

                    <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-zinc-900">Ultrasonic Grid</p>
                        <p className="text-[11px] text-zinc-500">4 Crosswalk Nodes</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a]">
                        4/4 NODES
                      </span>
                    </div>

                    <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-zinc-900">LTO Registry API</p>
                        <p className="text-[11px] text-zinc-500">Encrypted Gateway</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a]">
                        CONNECTED
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==========================================================
                  TAB 5: ABOUT SYSTEM
                 ========================================================== */}
              {activeTab === 'About' && (
                <motion.div
                  key="About"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-4"
                >
                  <div className="border-b border-zinc-100 pb-3">
                    <h2 className="text-[16px] font-bold text-zinc-900">About ADAPT-X</h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Adaptive Traffic Signal & Automated Violation Enforcement System.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-600 leading-relaxed">
                    <p className="font-semibold text-zinc-900 mb-1">ADAPT-X Enterprise v2.4.1 (Build 2026.09)</p>
                    <p>
                      Developed for Quezon City Smart Mobility Initiative. Integrated with dynamic phase holding,
                      HUSKYLENS 2 optical vehicle classification, and automated LTO registry adjudication.
                    </p>
                    <div className="mt-3 pt-3 border-t border-zinc-200/80 flex flex-wrap gap-4 text-[11px] text-zinc-500">
                      <span>Telemetry Sync: 500ms</span>
                      <span>AI Model: YOLOv8-Traffic</span>
                      <span>License: QC-SMART-ENT-2026</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==========================================================
                  TAB 6: SECURITY (Matches Figma Screen 6)
                 ========================================================== */}
              {activeTab === 'Security' && (
                <motion.div
                  key="Security"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-5"
                >
                  <div className="border-b border-zinc-100 pb-3">
                    <h2 className="text-[16px] font-bold text-zinc-900">Security & Credentials</h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Update master operator credentials and system access keys.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                      Current Master Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-10 px-4 pr-10 bg-[#f8fafc] text-zinc-900 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        New Operator Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-10 px-4 bg-[#f8fafc] text-zinc-900 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Confirm New Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-10 px-4 bg-[#f8fafc] text-zinc-900 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              {saved ? (
                <div className="flex items-center gap-1.5 text-xs text-[#16a34a] font-bold">
                  <CheckCircle size={15} />
                  <span>Preferences saved successfully!</span>
                </div>
              ) : (
                <span className="text-[11px] text-zinc-400">All modifications logged to QC audit trail</span>
              )}

              <button
                type="submit"
                className="py-2 px-6 bg-zinc-900 hover:bg-black text-white font-semibold text-xs rounded-full shadow-xs transition-all cursor-pointer"
              >
                {activeTab === 'Security' ? 'Update Password' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

