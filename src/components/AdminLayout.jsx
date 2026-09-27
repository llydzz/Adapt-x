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
  adminIntersections,
  adminNotifications,
  adminViolationQueue,
  adminViolators,
} from '../data/adminDemoData'

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Traffic Lights', path: '/admin/traffic-lights', icon: TrafficCone },
  { name: 'Violations', path: '/admin/violations', icon: AlertTriangle },
  { name: 'Violators', path: '/admin/violators', icon: Users },
  { name: 'Reports', path: '/admin/reports', icon: FileText },
]

export default function AdminLayout({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsRead, setNotificationsRead] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  const searchTargets = [
    ...navItems.map((item) => ({ label: item.name, detail: 'Page', path: item.path })),
    ...(adminIntersections || []).map(({ id, name }) => ({ label: name, detail: 'Intersection', path: `/admin/traffic-lights?intersection=${id}` })),
    ...(adminViolators || []).map(({ id, plate, name }) => ({ label: plate, detail: name, path: `/admin/violators?person=${id}` })),
    ...(adminViolationQueue || []).map(({ id, type, plate }) => ({ label: plate, detail: type, path: `/admin/violations?event=${id}` })),
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
    <div className="flex h-screen w-screen overflow-hidden bg-[#0c0c0e] text-white font-sans">
      <aside
        style={{ width: '200px', minWidth: '200px' }}
        className="hidden lg:flex flex-col bg-[#1c1c1f] border-r border-[#2a2a2e] relative z-20 select-none shrink-0"
      >
        <div className="flex flex-col px-5 h-[76px] justify-center cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
          <div className="flex items-center">
            <span className="text-[20px] font-black text-white tracking-tight mr-1">ADAPT -</span>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
              <path d="M 6 26 C 14 22, 18 10, 26 6" stroke="#52525b" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 6 26 C 14 22, 18 10, 26 6" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="2 3" />
              <path d="M 6 6 C 14 10, 18 22, 26 26" stroke="#16a34a" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 6 6 C 14 10, 18 22, 26 26" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 3" />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-emerald-500 tracking-widest leading-none mt-1">ADMIN</span>
        </div>

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

        <div className="p-3 border-t border-[#2a2a2e]/80 space-y-1">
          <NavLink
            to="/admin/settings"
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

      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0c0c0e]">
        <header className="h-16 sm:h-[76px] px-3 sm:px-5 lg:px-12 flex items-center justify-between gap-2 sm:gap-6 shrink-0 z-10 border-b border-[#18181b]/50">
          <div className="lg:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <span className="max-[360px]:hidden font-bold text-base tracking-tight text-white flex flex-col justify-center">
              ADAPT-X
              <span className="text-[9px] font-bold text-emerald-500 tracking-widest leading-none mt-0.5">ADMIN</span>
            </span>
          </div>

          <div className="relative w-full min-w-0 max-w-[340px] flex-1 sm:w-[340px] sm:flex-none" onClick={(event) => event.stopPropagation()}>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && filteredTargets[0]) {
                  navigate(filteredTargets[0].path)
                  setSearchQuery('')
                  setSearchOpen(false)
                }
                if (event.key === 'Escape') setSearchOpen(false)
              }}
              placeholder="Search admin data..."
              style={{ paddingLeft: '38px' }}
              className="w-full pr-4 py-2 bg-white text-zinc-900 placeholder:text-zinc-400 text-[13px] rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            />
            <AnimatePresence>
              {searchOpen && searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-900 shadow-xl"
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
                      className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left hover:bg-zinc-100"
                    >
                      <span className="text-[11px] font-medium">{target.label}</span>
                      <span className="text-[9px] text-zinc-400">{target.detail}</span>
                    </button>
                  )) : <p className="px-2.5 py-2 text-[11px] text-zinc-500">No matches found</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen((open) => !open)}
                className="relative w-9 h-9 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell size={17} />
                {!notificationsRead && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-white bg-emerald-600" />}
              </button>
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    className="absolute right-0 top-full z-50 mt-2 w-[280px] rounded-lg border border-zinc-200 bg-white p-3 text-zinc-900 shadow-xl"
                  >
                    <div className="mb-2 flex items-center justify-between border-b border-zinc-100 pb-2">
                      <span className="text-[12px] font-semibold">Notifications</span>
                      <button type="button" onClick={() => setNotificationsRead(true)} className="text-[9px] font-medium text-emerald-700 hover:text-emerald-900">Mark all read</button>
                    </div>
                    {(adminNotifications || []).map((notification) => (
                      <button key={notification.title} type="button" onClick={() => { navigate(notification.path); setNotificationsOpen(false) }} className="block w-full rounded-md p-2 text-left hover:bg-zinc-50">
                        <span className="block text-[11px] font-semibold">{notification.title}</span>
                        <span className="mt-0.5 block text-[9px] text-zinc-500">{notification.detail}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#16a34a] text-white font-bold text-sm flex items-center justify-center shadow-sm">
                A
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-[13px] font-bold text-white">Administrator</p>
                <p className="text-[11px] text-zinc-400">Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0 bg-[#0c0c0e]" onClick={() => searchOpen && setSearchOpen(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={`${location.pathname}${location.search}`} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141416]/95 backdrop-blur-md border-t border-[#222226]">
        <nav className="mx-auto flex max-w-lg items-center justify-around px-1.5 py-1.5">
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1 transition-all ${
                  isActive ? 'text-emerald-400 font-semibold' : 'text-zinc-400'
                }`
              }
            >
              <item.icon size={18} />
              <span className="w-full truncate text-center text-[9px] sm:text-[10px]">{item.name}</span>
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1 text-zinc-400"
          >
            <Menu size={18} />
            <span className="text-[9px] sm:text-[10px]">More</span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="absolute bottom-16 left-3 right-3 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-[#2a2a32] bg-[#1e1e24] p-4 space-y-2"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs uppercase font-bold text-zinc-400 tracking-wider mb-2">Navigation</p>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${
                      isActive ? 'bg-[#16a34a] text-white font-semibold' : 'text-zinc-300 hover:bg-[#262630]'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span className="text-sm">{item.name}</span>
                </NavLink>
              ))}
              <div className="pt-2 border-t border-[#2a2a32]">
                <NavLink
                  to="/admin/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:bg-[#262630]"
                >
                  <Settings size={18} />
                  <span className="text-sm">Settings</span>
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-400 hover:bg-[#262630] text-left"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
