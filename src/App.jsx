/**
 * ADAPT-X Application Root
 *
 * AUTHENTICATION NOTE (DEMO / PROTOTYPE ONLY):
 * This file contains a **client-side credential check** that is NOT
 * production-grade authentication. It exists solely so the UI prototype
 * can demonstrate the admin flow without a backend.
 *
 * - Admin login:  admin@adapt-x.local  /  Admin123!
 * - Citizen login: any other input goes through the existing citizen flow.
 *
 * The admin session is stored in sessionStorage so it persists across
 * page refreshes but clears when the browser tab is closed.
 */

import { useState, useCallback } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Citizen pages
import LoginPage from './pages/LoginPage'
import DashboardLayout from './components/DashboardLayout'
import TrafficLightsPage from './pages/TrafficLightsPage'
import ViolationsPage from './pages/ViolationsPage'
import ViolatorsPage from './pages/ViolatorsPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPageReference'
import OperatorOverviewPage from './pages/OperatorOverviewPage'

// Admin pages
import AdminLayout from './components/AdminLayout'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminTrafficLightsPage from './pages/admin/AdminTrafficLightsPage'
import AdminViolationsPage from './pages/admin/AdminViolationsPage'
import AdminViolatorsPage from './pages/admin/AdminViolatorsPage'
import AdminReportsPage from './pages/admin/AdminReportsPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'

import { ADMIN_CREDENTIALS } from './data/adminDemoData'

function App() {
  const navigate = useNavigate()

  // Citizen auth (localStorage — survives tab close if "keep signed in")
  const [isCitizenAuth, setIsCitizenAuth] = useState(() => {
    return localStorage.getItem('adapt_auth') === 'true'
  })

  // Admin auth (sessionStorage — survives refresh, clears on tab close)
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem('adapt_admin_auth') === 'true'
  })

  const handleCitizenLogin = useCallback(() => {
    sessionStorage.removeItem('adapt_admin_auth')
    setIsAdminAuth(false)
    localStorage.setItem('adapt_auth', 'true')
    setIsCitizenAuth(true)
    navigate('/dashboard', { replace: true })
  }, [navigate])

  const handleCitizenLogout = useCallback(() => {
    localStorage.setItem('adapt_auth', 'false')
    sessionStorage.removeItem('adapt_admin_auth')
    setIsCitizenAuth(false)
    setIsAdminAuth(false)
    navigate('/', { replace: true })
  }, [navigate])

  const handleAdminLogin = useCallback(() => {
    localStorage.setItem('adapt_auth', 'false')
    setIsCitizenAuth(false)
    sessionStorage.setItem('adapt_admin_auth', 'true')
    setIsAdminAuth(true)
    navigate('/admin/dashboard', { replace: true })
  }, [navigate])

  const handleAdminLogout = useCallback(() => {
    sessionStorage.removeItem('adapt_admin_auth')
    setIsAdminAuth(false)
    localStorage.setItem('adapt_auth', 'false')
    setIsCitizenAuth(false)
    navigate('/', { replace: true })
  }, [navigate])

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* ── Admin routes ──────────────────────────────────── */}
        {isAdminAuth ? (
          <>
            <Route element={<AdminLayout onLogout={handleAdminLogout} />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/traffic-lights" element={<AdminTrafficLightsPage />} />
              <Route path="/admin/violations" element={<AdminViolationsPage />} />
              <Route path="/admin/violators" element={<AdminViolatorsPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          </>
        ) : (
          /* Redirect unauthenticated /admin/* to login */
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
        )}

        {/* ── Citizen routes ────────────────────────────────── */}
        {isCitizenAuth ? (
          <Route element={<DashboardLayout onLogout={handleCitizenLogout} />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<OperatorOverviewPage />} />
            <Route path="/traffic-lights" element={<TrafficLightsPage />} />
            <Route path="/violations" element={<ViolationsPage />} />
            <Route path="/violators" element={<ViolatorsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        ) : !isAdminAuth ? (
          /* Show login when neither citizen nor admin is authenticated */
          <Route
            path="*"
            element={
              <LoginPage
                onLogin={handleCitizenLogin}
                onAdminLogin={handleAdminLogin}
                adminCredentials={ADMIN_CREDENTIALS}
              />
            }
          />
        ) : null}

        {/* Fallback — already authenticated users hitting unknown routes */}
        <Route path="*" element={<Navigate to={isAdminAuth ? '/admin/dashboard' : '/dashboard'} replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
