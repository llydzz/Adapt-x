import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function DashboardPage() {
  const [selectedCase, setSelectedCase] = useState('CASE DP1234')

  const steps = [
    { name: 'Draft', status: 'active' },
    { name: 'Submitted', status: 'pending' },
    { name: 'Under Review', status: 'pending' },
    { name: 'Adjudicated', status: 'pending' },
  ]

  return (
    <div className="px-8 lg:px-12 py-8 flex flex-col gap-6 max-w-[1240px]">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-[27px] font-bold text-white tracking-tight leading-snug">
          Welcome, Juan Dela Cruz
        </h1>
        <p className="text-zinc-400 text-xs sm:text-[13px] mt-1 font-normal">
          Let's keep our roads safe and moving.
        </p>
      </div>

      {/* 2x2 Grid of Crisp White Cards - Exact Replica of Reference Photo 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1020px]">
        {/* ========================================================
            CARD 1: Vehicle & Status (Top-Left)
           ======================================================== */}
        <motion.div
          whileHover={{ y: -2 }}
          className="adapt-card p-6 bg-white rounded-2xl border border-zinc-100/90 shadow-sm flex flex-col"
        >
          <h2 className="text-[15px] font-bold text-zinc-900 tracking-tight mb-4">
            Vehicle & Status
          </h2>

          <div className="flex items-center gap-6 sm:gap-7">
            {/* Cute Front-Facing Blue Car Illustration */}
            <div className="w-24 sm:w-28 shrink-0">
              <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xs">
                {/* Wheels */}
                <rect x="20" y="74" width="20" height="38" rx="6" fill="#1e293b" />
                <rect x="120" y="74" width="20" height="38" rx="6" fill="#1e293b" />
                {/* Car Roof & Cabin */}
                <path
                  d="M 40 50 C 46 25, 54 14, 80 14 C 106 14, 114 25, 120 50 Z"
                  fill="#4a90e2"
                />
                {/* Windshield Tint */}
                <path
                  d="M 46 48 C 50 30, 58 22, 80 22 C 102 22, 110 30, 114 48 Z"
                  fill="#1e3a5f"
                />
                {/* Car Body Shell */}
                <rect x="22" y="46" width="116" height="52" rx="16" fill="#4a90e2" />
                {/* Side Mirrors */}
                <rect x="14" y="50" width="10" height="7" rx="3" fill="#2563eb" />
                <rect x="136" y="50" width="10" height="7" rx="3" fill="#2563eb" />
                {/* Lower Bumper */}
                <rect x="42" y="80" width="76" height="12" rx="6" fill="#2563eb" />
                <rect x="54" y="83" width="52" height="6" rx="3" fill="#1d4ed8" />
                {/* Headlights (Glowing Yellow) */}
                <circle cx="38" cy="66" r="9" fill="#facc15" stroke="#fef08a" strokeWidth="2" />
                <circle cx="122" cy="66" r="9" fill="#facc15" stroke="#fef08a" strokeWidth="2" />
              </svg>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-1.5 text-xs sm:text-[13px] text-zinc-700">
              <p>
                <span className="text-zinc-500 font-normal">Plate Number: </span>
                <strong className="text-zinc-900 font-semibold font-mono">ABC 1234</strong>
              </p>
              <p>
                <span className="text-zinc-500 font-normal">Driver's License: </span>
                <strong className="text-zinc-900 font-semibold font-mono">DEF 9043</strong>
              </p>
              <p>
                <span className="text-zinc-500 font-normal">Status: </span>
                <span className="font-bold text-[#16a34a]">Valid</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            CARD 2: Active Violations (Top-Right)
           ======================================================== */}
        <motion.div
          whileHover={{ y: -2 }}
          className="adapt-card p-6 bg-white rounded-2xl border border-zinc-100/90 shadow-sm flex flex-col"
        >
          <h2 className="text-[15px] font-bold text-zinc-900 tracking-tight mb-4">
            Active Violations
          </h2>

          <div className="flex items-center gap-6 sm:gap-7">
            {/* Elegant Golden Circular Ring with '10' in Center */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="#d97706"
                  strokeWidth="2.5"
                  fill="transparent"
                />
              </svg>
              {/* Center count number 10 */}
              <span className="absolute text-2xl font-bold text-zinc-900 font-sans">
                10
              </span>
            </div>

            {/* Notification Text */}
            <div className="space-y-1">
              <h3 className="text-xs sm:text-[13px] font-bold text-[#d97706] leading-snug">
                You have new violation!
              </h3>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Check Violations & Evidences for details.
              </p>
              <Link
                to="/violations"
                className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#16a34a] hover:text-[#15803d] pt-1 transition-colors"
              >
                <span>View Violations</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            CARD 3: Violation Summary (Bottom-Left)
           ======================================================== */}
        <motion.div
          whileHover={{ y: -2 }}
          className="adapt-card p-6 bg-white rounded-2xl border border-zinc-100/90 shadow-sm flex flex-col"
        >
          <h2 className="text-[15px] font-bold text-zinc-900 tracking-tight mb-3">
            Violation Summary
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="pb-2.5 font-semibold">CASE ID</th>
                  <th className="pb-2.5 font-semibold">DATE</th>
                  <th className="pb-2.5 font-semibold">AMOUNT</th>
                  <th className="pb-2.5 text-right font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100/70">
                {/* Row 1: PD - 003, PAID */}
                <tr className="hover:bg-zinc-50/60 transition-colors">
                  <td className="py-2.5 font-mono font-medium text-zinc-800">PD - 003</td>
                  <td className="py-2.5 text-zinc-600">25/09/2026</td>
                  <td className="py-2.5 font-bold text-zinc-900">₱ 3,000.00</td>
                  <td className="py-2.5 text-right">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10.5px] font-bold bg-[#dcfce7] text-[#16a34a]">
                      PAID
                    </span>
                  </td>
                </tr>

                {/* Row 2: PD - 345, UNPAID */}
                <tr className="hover:bg-zinc-50/60 transition-colors">
                  <td className="py-2.5 font-mono font-medium text-zinc-800">PD - 345</td>
                  <td className="py-2.5 text-zinc-600">26/09/2026</td>
                  <td className="py-2.5 font-bold text-zinc-900">₱ 5,000.00</td>
                  <td className="py-2.5 text-right">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10.5px] font-bold bg-[#fee2e2] text-[#ef4444]">
                      UNPAID
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ========================================================
            CARD 4: Quick Dispute Tracker (Bottom-Right)
           ======================================================== */}
        <motion.div
          whileHover={{ y: -2 }}
          className="adapt-card p-6 bg-white rounded-2xl border border-zinc-100/90 shadow-sm flex flex-col justify-between min-h-[190px]"
        >
          <div>
            <h2 className="text-[15px] font-bold text-zinc-900 tracking-tight mb-3">
              Quick Dispute Tracker
            </h2>

            {/* Dropdown Select */}
            <div className="relative max-w-[190px] mb-3">
              <select
                value={selectedCase}
                onChange={(e) => setSelectedCase(e.target.value)}
                className="w-full appearance-none px-3 py-1.5 bg-white border border-zinc-200 rounded-md text-xs font-medium text-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-xs cursor-pointer pr-8"
              >
                <option value="CASE DP1234">CASE DP1234</option>
                <option value="CASE DP1088">CASE DP1088</option>
                <option value="CASE DP0942">CASE DP0942</option>
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>

            {/* Subheading: CURRENT STATUS */}
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
              CURRENT STATUS
            </p>

            {/* 4-Step Stepper Progress Bar */}
            <div className="relative px-2 pt-1 pb-3">
              {/* Connecting background line passing directly through center of dots */}
              <div className="absolute top-[11px] left-6 right-6 h-[1.5px] bg-zinc-200 z-0" />

              {/* 4 Step Dots */}
              <div className="relative z-10 flex justify-between">
                {steps.map((step, idx) => {
                  const isActive = step.status === 'active'
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                          isActive
                            ? 'bg-[#16a34a] shadow-xs ring-2 ring-emerald-100'
                            : 'bg-zinc-300'
                        }`}
                      />
                      <span
                        className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${
                          isActive ? 'text-zinc-700 font-semibold' : 'text-zinc-400'
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

