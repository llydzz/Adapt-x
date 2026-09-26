import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { demoViolationEvents } from '../data/demoData'

export default function ViolationsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const eventIdFromUrl = Number(searchParams.get('event'))
  const eventFromUrl = demoViolationEvents.find((event) => event.id === eventIdFromUrl)
  const activeTab = searchParams.get('tab') || (eventFromUrl?.disposition === 'Dispute' ? 'disputes' : 'queue')
  const [plateConfirmed, setPlateConfirmed] = useState(false)
  const [ownerConfirmed, setOwnerConfirmed] = useState(false)
  const [falsePositive, setFalsePositive] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const visibleEvents = demoViolationEvents.filter((event) => activeTab === 'queue'
    ? event.disposition === 'Review'
    : event.disposition === 'Dispute')
  const selectedEvent = visibleEvents.find((event) => event.id === eventIdFromUrl) || visibleEvents[0]
  const selectedEventId = selectedEvent.id

  const selectEvent = (eventId) => {
    const event = demoViolationEvents.find((item) => item.id === eventId)
    setSearchParams({ tab: event?.disposition === 'Dispute' ? 'disputes' : 'queue', event: String(eventId) })
    setPlateConfirmed(false)
    setOwnerConfirmed(false)
    setFalsePositive(false)
    setSubmitted(false)
  }

  const changeTab = (tab) => {
    const nextEvents = demoViolationEvents.filter((event) => tab === 'queue'
      ? event.disposition === 'Review'
      : event.disposition === 'Dispute')
    if (nextEvents[0]) {
      setSearchParams({ tab, event: String(nextEvents[0].id) })
      setPlateConfirmed(false)
      setOwnerConfirmed(false)
      setFalsePositive(false)
      setSubmitted(false)
    }
  }

  const handleSubmitViolation = () => {
    setSubmitted(true)
  }

  return (
    <div className="px-8 lg:px-12 py-8 flex flex-col gap-6 max-w-[1240px]">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-[27px] font-bold text-white tracking-tight leading-snug">
          Violations
        </h1>
        <p className="text-zinc-400 text-xs sm:text-[13px] mt-1 font-normal">
          Review flagged events, confirm ownership, and manage disputes.
        </p>
      </div>

      {/* Segmented Control Pill: Review Queue | Disputes */}
      <div className="inline-flex p-1 bg-zinc-900 border border-zinc-700/60 rounded-full w-fit">
        <button
          type="button"
          onClick={() => changeTab('queue')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'queue'
              ? 'bg-black text-white shadow-xs'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Review Queue
        </button>
        <button
          type="button"
          onClick={() => changeTab('disputes')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'disputes'
              ? 'bg-black text-white shadow-xs'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Disputes
        </button>
      </div>

      {/* 2-Column Layout matching media_1790444741462.png */}
      <div className="flex flex-col lg:flex-row gap-6 items-start max-w-[1040px]">
        {/* ==========================================================
            LEFT CARD: Unverified Events
           ========================================================== */}
        <div className="w-full lg:w-[56%] bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <h2 className="text-[15px] font-bold text-zinc-900 tracking-tight">
              {activeTab === 'queue' ? 'Unverified Events' : 'Filed Disputes'}
            </h2>
            <span className="text-xs text-zinc-400 font-medium">{visibleEvents.length} {activeTab === 'queue' ? 'pending' : 'filed'}</span>
          </div>

          {/* Events Table */}
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider border-b border-zinc-100">
                  <th className="pb-2 font-semibold">TYPE</th>
                  <th className="pb-2 font-semibold">LOCATION</th>
                  <th className="pb-2 font-semibold">TIME</th>
                  <th className="pb-2 font-semibold">CONFIDENCE</th>
                  <th className="pb-2 text-right font-semibold"> </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100/80">
                {visibleEvents.map((evt) => {
                  const isSelected = selectedEventId === evt.id
                  return (
                    <tr
                      key={evt.id}
                      onClick={() => selectEvent(evt.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-emerald-50/70' : 'hover:bg-zinc-50'
                      }`}
                    >
                      <td className="py-3 font-semibold text-zinc-900 whitespace-nowrap pr-2">
                        {evt.type}
                      </td>
                      <td className="py-3 text-zinc-600 whitespace-nowrap pr-2">
                        {evt.location}
                      </td>
                      <td className="py-3 text-zinc-500 whitespace-nowrap pr-2 font-mono">
                        {evt.time}
                      </td>
                      <td className="py-3 pr-2">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#16a34a] rounded-full"
                              style={{ width: `${evt.confidence}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-zinc-700">
                            {evt.confidence}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={(event) => { event.stopPropagation(); selectEvent(evt.id) }}
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#16a34a] text-white shadow-xs'
                              : 'bg-zinc-800 hover:bg-black text-white'
                          }`}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==========================================================
            RIGHT CARD: 3-Step Verification Panel
           ========================================================== */}
        <div className="w-full lg:w-[44%] bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col gap-5">
          {/* ----------------------------------------------------
              STEP 1: Plate Validity
             ---------------------------------------------------- */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-[14px] font-bold text-zinc-900 tracking-tight">
                Plate Validity
              </h3>
            </div>

            {/* Dark License Plate Display Box */}
            <div className="bg-[#27272a] rounded-xl py-3 px-4 text-center my-2 shadow-inner">
              <div className="inline-block bg-white text-zinc-900 px-6 py-1.5 rounded-lg border-2 border-zinc-800 font-mono font-extrabold text-[17px] tracking-widest shadow-xs">
                {selectedEvent.plate}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setPlateConfirmed(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  plateConfirmed
                    ? 'bg-[#16a34a] text-white'
                    : 'bg-zinc-900 hover:bg-black text-white'
                }`}
              >
                {plateConfirmed ? '✓ Validated' : 'Confirm Valid'}
              </button>
              <button
                type="button"
                onClick={() => { setPlateConfirmed(false); setFalsePositive(true) }}
                className="px-4 py-1.5 rounded-full text-xs font-medium border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                {falsePositive ? 'Flagged as False Positive' : 'Send False Positive'}
              </button>
            </div>
          </div>

          {/* ----------------------------------------------------
              STEP 2: Registered Owner (LTO)
             ---------------------------------------------------- */}
          <div className="pt-3 border-t border-zinc-100">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-[14px] font-bold text-zinc-900 tracking-tight">
                Registered Owner (LTO)
              </h3>
            </div>

            {/* Owner Info Details */}
            <div className="space-y-1.5 text-xs text-zinc-700 mb-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">Owner:</span>
                <span className="font-semibold text-zinc-900">{selectedEvent.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Address:</span>
                <span className="text-zinc-700 text-right max-w-[200px] truncate">{selectedEvent.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Vehicle:</span>
                <span className="text-zinc-700">{selectedEvent.vehicle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">License status:</span>
                <span className="font-bold text-[#16a34a]">{selectedEvent.licenseStatus}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOwnerConfirmed(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  ownerConfirmed
                    ? 'bg-[#16a34a] text-white'
                    : 'bg-zinc-900 hover:bg-black text-white'
                }`}
              >
                {ownerConfirmed ? '✓ Match Confirmed' : 'Confirm Match'}
              </button>
              <button
                type="button"
                onClick={() => setOwnerConfirmed(false)}
                className="px-4 py-1.5 rounded-full text-xs font-medium border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Flag Mismatch
              </button>
            </div>
          </div>

          {/* ----------------------------------------------------
              STEP 3: Violation Notice
             ---------------------------------------------------- */}
          <div className="pt-3 border-t border-zinc-100">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-[14px] font-bold text-zinc-900 tracking-tight">
                Violation Notice
              </h3>
            </div>

            {/* Form Fields */}
            <div className="space-y-2 mb-3.5">
              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1">
                  Violation type
                </label>
                <div className="w-full bg-[#f1f5f9] text-zinc-900 text-xs font-semibold px-3 py-2 rounded-lg border border-zinc-200/60">
                  {selectedEvent.type}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1">
                  Location
                </label>
                <div className="w-full bg-[#f1f5f9] text-zinc-900 text-xs font-medium px-3 py-2 rounded-lg border border-zinc-200/60">
                  {selectedEvent.location}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1">
                  Timestamp
                </label>
                <div className="w-full bg-[#f1f5f9] text-zinc-900 text-xs font-medium px-3 py-2 rounded-lg border border-zinc-200/60 font-mono">
                  {selectedEvent.noticeTime}
                </div>
              </div>
            </div>

            {/* Large Black Pill Submit Button */}
            <button
              type="button"
              disabled={!plateConfirmed || !ownerConfirmed || submitted}
              onClick={handleSubmitViolation}
              className="w-full bg-zinc-900 hover:bg-black disabled:bg-zinc-400 disabled:cursor-not-allowed text-white text-xs font-bold py-2.5 rounded-md transition-all cursor-pointer shadow-xs"
            >
              {submitted ? 'Violation Submitted' : plateConfirmed && ownerConfirmed ? 'Submit Violation' : 'Confirm plate and owner first'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
