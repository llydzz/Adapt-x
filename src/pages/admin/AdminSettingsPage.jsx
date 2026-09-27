import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  User, 
  Bell, 
  MapPin, 
  Database, 
  Palette, 
  Check
} from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 ${
      checked ? 'bg-emerald-600' : 'bg-zinc-200'
    }`}
  >
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-4' : 'translate-x-0'
      }`}
    />
  </button>
);

const SettingRow = ({ title, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex flex-col">
      <span className="text-[13px] font-medium text-zinc-900">{title}</span>
      {description && <span className="text-[11px] text-zinc-500 mt-0.5">{description}</span>}
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const TextField = ({ label, type = "text", value, onChange, placeholder, disabled }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-medium text-zinc-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`h-9 rounded-md border border-zinc-200 px-3 text-[11px] text-zinc-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 w-full ${
        disabled ? 'bg-zinc-50 cursor-not-allowed' : 'bg-white'
      }`}
    />
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="border-b border-zinc-200 pb-4 mb-6">
    <h2 className="text-[18px] font-semibold text-zinc-900">{title}</h2>
    {subtitle && <p className="text-[13px] text-zinc-500 mt-1">{subtitle}</p>}
  </div>
);

// All data is local state - no backend.

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('security');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Security State
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [twoFactor, setTwoFactor] = useState({ sms: true, email: false, authenticator: true });
  
  // Account State
  const [account, setAccount] = useState({
    fullName: 'Jane Doe',
    employeeId: 'EMP-40921',
    email: 'jane.doe@adaptx.com',
    role: 'System Administrator'
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    outage: true,
    newViolation: true,
    disputeFiled: true,
    signalOffline: true,
    dailySummary: false,
    weeklyReport: false
  });

  // Intersections State
  const [intersections, setIntersections] = useState({
    'Main & 1st': true,
    'Main & 2nd': true,
    'Oak & 4th': false,
    'Pine & 5th': true,
    'Elm & 8th': false
  });

  // Appearance State
  const [appearance, setAppearance] = useState({
    theme: 'System',
    density: 'Comfortable'
  });

  const tabs = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'account', label: 'Account', icon: User },
    { id: 'notification', label: 'Notification', icon: Bell },
    { id: 'intersections', label: 'Assigned Intersection', icon: MapPin },
    { id: 'privacy', label: 'Data & Privacy', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="flex h-full w-full flex-col p-4 md:p-6 lg:p-8 bg-zinc-950 dark:bg-zinc-950" data-adapt-theme={appearance.theme.toLowerCase()}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
          <p className="text-[13px] text-zinc-400 mt-1">Manage system configurations and admin preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 rounded-md border border-zinc-700 bg-transparent text-[13px] font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="h-9 px-4 rounded-md bg-emerald-600 text-[13px] font-medium text-white hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <AnimatePresence>
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-500"
              >
                <Check className="h-4 w-4" />
                Saved
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
        {/* Left Nav */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:w-[170px] shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-all whitespace-nowrap lg:whitespace-normal border ${
                  isActive
                    ? 'border-emerald-700 bg-emerald-700 text-white'
                    : 'border-zinc-700 bg-transparent text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'opacity-70'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Content */}
        <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-5 md:p-6 lg:p-8 shadow-sm h-fit">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <SectionHeader title="Security Settings" subtitle="Manage your password and authentication methods." />
                  
                  <div className="space-y-4 max-w-md">
                    <h3 className="text-[14px] font-medium text-zinc-900 mb-2">Change Password</h3>
                    <TextField 
                      label="Current Password" 
                      type="password" 
                      value={passwords.current} 
                      onChange={e => setPasswords({...passwords, current: e.target.value})} 
                    />
                    <TextField 
                      label="New Password" 
                      type="password" 
                      value={passwords.new} 
                      onChange={e => setPasswords({...passwords, new: e.target.value})} 
                    />
                    <TextField 
                      label="Confirm New Password" 
                      type="password" 
                      value={passwords.confirm} 
                      onChange={e => setPasswords({...passwords, confirm: e.target.value})} 
                    />
                  </div>

                  <div className="pt-4 border-t border-zinc-100">
                    <h3 className="text-[14px] font-medium text-zinc-900 mb-4">Two-Factor Authentication</h3>
                    <div className="divide-y divide-zinc-100">
                      <SettingRow 
                        title="SMS Authentication" 
                        description="Receive a code via SMS to verify your identity."
                        checked={twoFactor.sms}
                        onChange={() => setTwoFactor({...twoFactor, sms: !twoFactor.sms})}
                      />
                      <SettingRow 
                        title="Email Authentication" 
                        description="Receive a verification code via email."
                        checked={twoFactor.email}
                        onChange={() => setTwoFactor({...twoFactor, email: !twoFactor.email})}
                      />
                      <SettingRow 
                        title="Authenticator App" 
                        description="Use an app like Google Authenticator to generate codes."
                        checked={twoFactor.authenticator}
                        onChange={() => setTwoFactor({...twoFactor, authenticator: !twoFactor.authenticator})}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100">
                    <h3 className="text-[14px] font-medium text-zinc-900 mb-4">Activity Center</h3>
                    <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                      <p className="text-[13px] text-zinc-600 mb-2">Recent admin actions logged from this account.</p>
                      <ul className="space-y-2 text-[12px] text-zinc-500">
                         <li>• Logged in from 192.168.1.1 (Today, 08:42 AM)</li>
                         <li>• Exported violation report (Yesterday, 04:15 PM)</li>
                         <li>• Updated user permissions for ID-9942 (Yesterday, 02:30 PM)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-8">
                  <SectionHeader title="Account Information" subtitle="Update your admin profile details." />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <TextField 
                      label="Full Name" 
                      value={account.fullName} 
                      onChange={e => setAccount({...account, fullName: e.target.value})} 
                    />
                    <TextField 
                      label="Employee ID" 
                      value={account.employeeId} 
                      onChange={e => setAccount({...account, employeeId: e.target.value})} 
                    />
                    <TextField 
                      label="Email Address" 
                      type="email" 
                      value={account.email} 
                      onChange={e => setAccount({...account, email: e.target.value})} 
                    />
                    <TextField
                      label="Role"
                      value={account.role}
                      disabled={true}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notification' && (
                <div className="space-y-6">
                  <SectionHeader title="Notification Preferences" subtitle="Manage which alerts you receive as an administrator." />
                  
                  <div className="divide-y divide-zinc-100 max-w-3xl">
                    <SettingRow 
                      title="System outage alerts" 
                      description="Critical notifications when system components go offline."
                      checked={notifications.outage}
                      onChange={() => setNotifications({...notifications, outage: !notifications.outage})}
                    />
                    <SettingRow 
                      title="New violation flagged" 
                      description="Get notified immediately when a high-priority violation occurs."
                      checked={notifications.newViolation}
                      onChange={() => setNotifications({...notifications, newViolation: !notifications.newViolation})}
                    />
                    <SettingRow 
                      title="Dispute filed" 
                      description="Alerts when a driver formally disputes a citation."
                      checked={notifications.disputeFiled}
                      onChange={() => setNotifications({...notifications, disputeFiled: !notifications.disputeFiled})}
                    />
                    <SettingRow 
                      title="Signal offline warning" 
                      description="Warning when an intersection signal loses connectivity."
                      checked={notifications.signalOffline}
                      onChange={() => setNotifications({...notifications, signalOffline: !notifications.signalOffline})}
                    />
                    <SettingRow 
                      title="Daily admin summary" 
                      description="Receive a daily digest of all admin activities and metrics."
                      checked={notifications.dailySummary}
                      onChange={() => setNotifications({...notifications, dailySummary: !notifications.dailySummary})}
                    />
                    <SettingRow 
                      title="Weekly analytics report" 
                      description="Receive detailed analytical reports every week."
                      checked={notifications.weeklyReport}
                      onChange={() => setNotifications({...notifications, weeklyReport: !notifications.weeklyReport})}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'intersections' && (
                <div className="space-y-6">
                  <SectionHeader title="Assigned Intersections" subtitle="Select the monitored intersections you oversee." />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(intersections).map(([name, isSelected]) => (
                      <button
                        key={name}
                        onClick={() => setIntersections({ ...intersections, [name]: !isSelected })}
                        className={`flex items-start gap-3 p-4 rounded-lg border text-left transition-all ${
                          isSelected 
                            ? 'border-emerald-600 bg-emerald-50/50' 
                            : 'border-zinc-200 bg-white hover:border-zinc-300'
                        }`}
                      >
                        <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                          isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-zinc-300 bg-white'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-zinc-900">{name}</p>
                          <p className="text-[11px] text-zinc-500 mt-1">Intersection ID: {Math.random().toString(36).substr(2, 5).toUpperCase()}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-8">
                  <SectionHeader title="Data & Privacy" subtitle="Manage data retention policies and audit logs." />
                  
                  <div className="space-y-6 max-w-3xl">
                    <div className="rounded-lg border border-zinc-200 p-5">
                      <h3 className="text-[14px] font-medium text-zinc-900 mb-2">Data Retention Policy</h3>
                      <p className="text-[13px] text-zinc-600 leading-relaxed mb-4">
                        As per system administration guidelines, violation footage is retained for 90 days. 
                        Disputed cases are retained indefinitely until resolved. System logs are kept for 1 year.
                      </p>
                      <button className="text-[13px] font-medium text-emerald-600 hover:text-emerald-700">
                        View Full Policy Details &rarr;
                      </button>
                    </div>

                    <div className="rounded-lg border border-zinc-200 p-5">
                      <h3 className="text-[14px] font-medium text-zinc-900 mb-2">Data Export</h3>
                      <p className="text-[13px] text-zinc-600 leading-relaxed mb-4">
                        Download a complete archive of your admin account data, including activity logs, 
                        assigned assets, and historical actions.
                      </p>
                      <button className="h-9 px-4 rounded-md border border-zinc-200 bg-white text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
                        Request Data Export
                      </button>
                    </div>

                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex gap-3">
                      <Shield className="h-5 w-5 text-amber-600 shrink-0" />
                      <div>
                        <h4 className="text-[13px] font-medium text-amber-900">Audit Log Notice</h4>
                        <p className="text-[12px] text-amber-700 mt-1">
                          All settings changes made on this page are recorded in the immutable system audit log 
                          for compliance purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-8">
                  <SectionHeader title="Appearance" subtitle="Customize the look and feel of your interface." />
                  
                  <div className="space-y-6 max-w-md">
                    <div>
                      <h3 className="text-[13px] font-medium text-zinc-900 mb-3">Theme Preference</h3>
                      <div className="flex gap-3">
                        {['Light', 'Dark', 'System'].map(mode => (
                          <button
                            key={mode}
                            onClick={() => setAppearance({...appearance, theme: mode})}
                            className={`flex-1 py-2 px-3 rounded-md border text-[13px] font-medium transition-colors ${
                              appearance.theme === mode 
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                                : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[13px] font-medium text-zinc-900 mb-3">Display Density</h3>
                      <div className="flex gap-3">
                        {['Comfortable', 'Compact'].map(density => (
                          <button
                            key={density}
                            onClick={() => setAppearance({...appearance, density: density})}
                            className={`flex-1 py-2 px-3 rounded-md border text-[13px] font-medium transition-colors ${
                              appearance.density === density 
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                                : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                            }`}
                          >
                            {density}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
