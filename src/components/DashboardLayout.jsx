import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  TrafficCone,
  AlertTriangle,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
} from 'lucide-react'
import {
  demoIntersections,
  demoNotifications,
  demoViolationEvents,
  demoViolators,
} from '../data/demoData'

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Traffic Lights', path: '/traffic-lights', icon: TrafficCone },
  { name: 'Violations', path: '/violations', icon: AlertTriangle },
  { name: 'Violators', path: '/violators', icon: Users },
  { name: 'Reports', path: '/reports', icon: FileText },
]

export default function DashboardLayout({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsRead, setNotificationsRead] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const searchTargets = [
    ...navItems.map((item) => ({ label: item.name, detail: 'Page', path: item.path })),
    ...demoIntersections.map(({ id, name }) => ({ label: name, detail: 'Intersection', path: `/traffic-lights?intersection=${id}` })),
    ...demoViolators.map(({ id, plate, name }) => ({ label: plate, detail: name, path: `/violators?person=${id}` })),
    ...demoViolationEvents.map(({ id, type, plate, disposition }) => ({ label: plate, detail: type, path: `/violations?tab=${disposition === 'Dispute' ? 'disputes' : 'queue'}&event=${id}` })),
  ]
  const filteredTargets = searchQuery.trim()
      ? searchTargets.filter((target) => `${target.label} ${target.detail}`.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
      : []

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout()
    } else {
      navigate('/login')
    }
  }

  return (
      <div className="flex min-h-screen w-screen bg-[#0c0c0e] text-white font-sans overflow-x-hidden">
        {/* ==========================================================
          DESKTOP SIDEBAR (Fixed Sidebar)
         ========================================================== */}
        <aside
            style={{ width: '200px', minWidth: '200px' }}
            className="hidden lg:flex flex-col bg-[#1c1c1f] border-r border-[#2a2a2e] fixed top-0 bottom-0 left-0 z-40 select-none shrink-0"
        >
          {/* Brand Header */}
          <div className="flex items-center px-5 h-[76px] cursor-pointer" onClick={() => navigate('/dashboard')}>
            <span className="text-[18px] font-extrabold text-white tracking-tight mr-1">ADAPT -</span>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
              <path d="M 6 26 C 14 22, 18 10, 26 6" stroke="#52525b" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 6 26 C 14 22, 18 10, 26 6" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="2 3" />
              <path d="M 6 6 C 14 10, 18 22, 26 26" stroke="#16a34a" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 6 6 C 14 10, 18 22, 26 26" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" />
            </svg>
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex-1 pt-3 px-3 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all duration-150 ${
                            isActive
                                ? 'bg-[#16a34a] text-white font-semibold shadow-sm'
                                : 'text-zinc-400 hover:text-white hover:bg-[#28282c] font-medium'
                        }`
                    }
                >
                  {({ isActive }) => (
                      <>
                        <item.icon size={16} strokeWidth={isActive ? 2.3 : 1.9} />
                        <span className="tracking-tight whitespace-nowrap">{item.name}</span>
                      </>
                  )}
                </NavLink>
            ))}
          </nav>

          {/* Bottom Section: Settings & Logout */}
          <div className="p-3 border-t border-[#2a2a2e]/80 space-y-1">
            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all duration-150 ${
                        isActive
                            ? 'bg-[#16a34a] text-white font-semibold'
                            : 'text-zinc-400 hover:text-white hover:bg-[#28282c] font-medium'
                    }`
                }
            >
              <Settings size={16} />
              <span className="whitespace-nowrap">Settings</span>
            </NavLink>

            <button
                type="button"
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-zinc-400 hover:text-red-400 hover:bg-[#28282c] font-medium transition-all text-left cursor-pointer"
            >
              <LogOut size={16} />
              <span className="whitespace-nowrap">Logout</span>
            </button>
          </div>
        </aside>

        {/* ==========================================================
          MAIN CONTAINER: Fixed Header + Page Content
         ========================================================== */}
        <div className="flex-1 flex flex-col min-h-screen lg:pl-[200px] bg-[#0c0c0e]">

          {/* ==========================================================
            FIXED TOP HEADER
           ========================================================== */}
          <header className="fixed top-0 right-0 left-0 lg:left-[200px] h-16 sm:h-[72px] px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-50 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-[#1f1f23]">

            {/* Left Brand Logo: ADAPT - plus Road X Graphic */}
            <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => navigate('/dashboard')}
            >
            <span className="text-[18px] sm:text-[20px] font-extrabold text-white tracking-tight">
              ADAPT -
            </span>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M 6 32 C 16 28, 24 12, 34 8" stroke="#3f3f46" strokeWidth="5" strokeLinecap="round" />
                <path d="M 6 32 C 16 28, 24 12, 34 8" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="3 4" />
                <path d="M 6 8 C 16 12, 24 28, 34 32" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
                <path d="M 6 8 C 16 12, 24 28, 34 32" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 4" />
              </svg>
            </div>

            {/* Right Action Icons: Search Magnifying Glass, Notification Bell, Hamburger Menu */}
            <div className="flex items-center gap-5 sm:gap-6">

              {/* Search Toggle / Input */}
              <div className="relative flex items-center" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    onClick={() => setSearchOpen((prev) => !prev)}
                    className="flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer p-1"
                    aria-label="Search"
                >
                  <Search size={20} strokeWidth={2} />
                </button>

                <AnimatePresence>
                  {searchOpen && (
                      <motion.div
                          initial={{ opacity: 0, x: 10, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 10, scale: 0.95 }}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
                      >
                        <input
                            type="text"
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' && filteredTargets[0]) {
                                navigate(filteredTargets[0].path)
                                setSearchQuery('')
                                setSearchOpen(false)
                              }
                              if (event.key === 'Escape') setSearchOpen(false)
                            }}
                            placeholder="Search..."
                            className="w-56 sm:w-64 px-3.5 py-1.5 bg-zinc-900 text-white placeholder:text-zinc-500 text-xs rounded-lg border border-zinc-700 focus:outline-none focus:border-emerald-500 shadow-xl"
                        />
                      </motion.div>
                  )}
                </AnimatePresence>

                {/* Search dropdown results */}
                <AnimatePresence>
                  {searchOpen && searchQuery.trim() && (
                      <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 text-white shadow-2xl w-60"
                      >
                        {filteredTargets.length ? filteredTargets.map((target) => (
                            <button
                                key={`${target.label}-${target.path}`}
                                type="button"
                                onClick={() => {
                                  navigate(target.path)
                                  setSearchQuery('')
                                  setSearchOpen(false)
                                }}
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-zinc-800 transition-colors"
                            >
                              <span className="text-xs font-medium">{target.label}</span>
                              <span className="text-[10px] text-zinc-500">{target.detail}</span>
                            </button>
                        )) : <p className="px-3 py-2 text-xs text-zinc-500">No matches found</p>}
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notification Bell Icon */}
              <div className="relative flex items-center">
                <button
                    type="button"
                    onClick={() => setNotificationsOpen((open) => !open)}
                    className="relative flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer p-1"
                    aria-label="Notifications"
                >
                  <Bell size={20} strokeWidth={2} />
                  {!notificationsRead && (
                      <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-emerald-500" />
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                      <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          className="absolute right-0 top-full z-50 mt-3 w-72 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 text-white shadow-2xl"
                      >
                        <div className="mb-2 flex items-center justify-between border-b border-zinc-800 pb-2">
                          <span className="text-xs font-semibold">Notifications</span>
                          <button
                              type="button"
                              onClick={() => setNotificationsRead(true)}
                              className="text-[10px] font-medium text-emerald-400 hover:text-emerald-300"
                          >
                            Mark all read
                          </button>
                        </div>
                        {demoNotifications.map((notification) => (
                            <button
                                key={notification.title}
                                type="button"
                                onClick={() => { navigate(notification.path); setNotificationsOpen(false) }}
                                className="block w-full rounded-xl p-2 text-left hover:bg-zinc-800 transition-colors"
                            >
                              <span className="block text-xs font-semibold">{notification.title}</span>
                              <span className="mt-0.5 block text-[10px] text-zinc-400">{notification.detail}</span>
                            </button>
                        ))}
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hamburger Menu Icon */}
              <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Menu"
              >
                <Menu size={22} strokeWidth={2.2} />
              </button>
            </div>
          </header>

          {/* Page Content Outlet */}
          <main className="flex-1 pt-16 sm:pt-[72px] pb-20 bg-[#0c0c0e]" onClick={() => searchOpen && setSearchOpen(false)}>
            <AnimatePresence mode="wait">
              <motion.div
                  key={`${location.pathname}${location.search}`}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.18 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
              >
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                    className="absolute top-0 right-0 bottom-0 w-72 bg-[#161619] border-l border-zinc-800 p-6 flex flex-col justify-between"
                    onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-extrabold text-base tracking-tight text-white">Menu</span>
                      <button
                          type="button"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-zinc-400 hover:text-white text-sm font-bold"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-3">Navigation</p>
                    <nav className="space-y-1.5">
                      {navItems.map((item) => (
                          <NavLink
                              key={item.path}
                              to={item.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={({ isActive }) =>
                                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                                      isActive ? 'bg-[#16a34a] text-white font-semibold' : 'text-zinc-300 hover:bg-zinc-800'
                                  }`
                              }
                          >
                            <item.icon size={18} />
                            <span>{item.name}</span>
                          </NavLink>
                      ))}
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-1">
                    <NavLink
                        to="/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:bg-zinc-800 text-sm transition-colors"
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </NavLink>
                    <button
                        type="button"
                        onClick={handleLogoutClick}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-400 hover:bg-zinc-800 text-left text-sm transition-colors cursor-pointer"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  )
}