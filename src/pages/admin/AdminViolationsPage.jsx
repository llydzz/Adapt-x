import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Search,
  Filter,
  ShieldAlert,
  AlertCircle,
  FileText,
  User,
  MapPin,
  Clock,
  Car
} from 'lucide-react';
import { adminViolationQueue, adminDisputes } from '../../data/adminDemoData';

export default function AdminViolationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'review';
  
  const handleTabChange = (tab) => {
    setSearchParams(prev => {
      prev.set('tab', tab);
      prev.delete('eventId');
      prev.delete('disputeId');
      return prev;
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Violations</h1>
          <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2">
            Review flagged events, manage disputes, and issue notices.
            <span className="text-zinc-300">·</span>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">Demo data</span>
          </p>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex bg-zinc-900 p-1 rounded-full border border-zinc-800">
          <button
            onClick={() => handleTabChange('review')}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
              currentTab === 'review'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Review Queue
          </button>
          <button
            onClick={() => handleTabChange('disputes')}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
              currentTab === 'disputes'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Disputes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentTab === 'review' ? <ReviewQueueView /> : <DisputesView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReviewQueueView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedEventId = searchParams.get('eventId') || searchParams.get('event');
  const [removedIds, setRemovedIds] = useState([]);
  const events = (adminViolationQueue?.filter(e => e.disposition === 'Review') || []).filter(e => !removedIds.includes(e.id));
  const selectedEvent = selectedEventId ? (events.find(e => e.id === selectedEventId) || events[0] || null) : (events[0] || null);

  // 3-step verification state — resets are handled in handleSelectEvent
  const [step1Valid, setStep1Valid] = useState(null);
  const [step2Valid, setStep2Valid] = useState(null);
  const [lastSelectedId, setLastSelectedId] = useState(null);
  
  // Reset verification steps when selected event changes
  if (selectedEvent?.id !== lastSelectedId) {
    setLastSelectedId(selectedEvent?.id ?? null);
    setStep1Valid(null);
    setStep2Valid(null);
  }

  const handleSelectEvent = (id) => {
    setSearchParams(prev => {
      prev.set('eventId', id);
      prev.delete('event');
      return prev;
    });
  };

  const handleProcessEvent = (_disposition) => {
    // Local state mutation for demo
    if (selectedEvent) {
      setRemovedIds(prev => [...prev, selectedEvent.id]);
      setStep1Valid(null);
      setStep2Valid(null);
      setSearchParams(prev => {
        prev.delete('eventId');
        prev.delete('event');
        return prev;
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Card (56%) */}
      <div className="w-full lg:w-[56%] bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-12rem)] min-h-[600px]">
        <div className="px-5 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            Unverified Events
          </h2>
          <div className="flex gap-2">
            <button className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-100">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                <th className="px-5 py-3 border-b border-zinc-200">Type</th>
                <th className="px-5 py-3 border-b border-zinc-200">Location</th>
                <th className="px-5 py-3 border-b border-zinc-200">Time</th>
                <th className="px-5 py-3 border-b border-zinc-200">Confidence</th>
                <th className="px-5 py-3 border-b border-zinc-200 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {events.map((event) => (
                <tr 
                  key={event.id}
                  onClick={() => handleSelectEvent(event.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedEvent?.id === event.id 
                      ? 'bg-emerald-50/70 hover:bg-emerald-50' 
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-zinc-900">{event.type}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{event.plate}</div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {event.location}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-600 w-8">{event.confidence}%</span>
                      <div className="w-12 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${event.confidence}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button 
                      className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                        selectedEvent?.id === event.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-zinc-500">
                    No events in review queue.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Card (44%) */}
      <div className="w-full lg:w-[44%] flex flex-col gap-4">
        {selectedEvent ? (
          <>
            {/* Step 1 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step1Valid === true ? 'bg-emerald-500 text-white' : step1Valid === false ? 'bg-red-500 text-white' : 'bg-zinc-900 text-white'}`}>
                  1
                </div>
                <h3 className="font-semibold text-zinc-900">Plate Validity</h3>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center justify-center border border-zinc-800 mb-4">
                <div className="text-4xl font-mono font-bold tracking-widest text-white border-4 border-zinc-700 px-6 py-2 rounded">
                  {selectedEvent.plate}
                </div>
                <p className="text-zinc-400 text-sm mt-3 flex items-center gap-2">
                  <Car className="w-4 h-4" /> AI Confidence: {selectedEvent.confidence}%
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep1Valid(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    step1Valid === true 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 inline-block mr-1.5 mb-0.5" />
                  Confirm Valid
                </button>
                <button 
                  onClick={() => setStep1Valid(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    step1Valid === false 
                      ? 'bg-red-50 border-red-200 text-red-700' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <XCircle className="w-4 h-4 inline-block mr-1.5 mb-0.5" />
                  Send False Positive
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`bg-white p-5 rounded-xl border border-zinc-200 shadow-sm transition-opacity ${step1Valid !== true ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step2Valid === true ? 'bg-emerald-500 text-white' : step2Valid === false ? 'bg-red-500 text-white' : 'bg-zinc-900 text-white'}`}>
                  2
                </div>
                <h3 className="font-semibold text-zinc-900">Registered Owner (LTO)</h3>
              </div>
              <div className="bg-zinc-50 rounded-lg p-4 mb-4 border border-zinc-200 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5"><User className="w-4 h-4" /> Name</span>
                  <span className="font-medium text-zinc-900">Juan Dela Cruz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Address</span>
                  <span className="font-medium text-zinc-900">Makati City, Metro Manila</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5"><Car className="w-4 h-4" /> Vehicle</span>
                  <span className="font-medium text-zinc-900">Toyota Vios 2021 (White)</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-200">
                  <span className="text-zinc-500">License Status</span>
                  <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">Active</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep2Valid(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    step2Valid === true 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  Confirm Match
                </button>
                <button 
                  onClick={() => setStep2Valid(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    step2Valid === false 
                      ? 'bg-amber-50 border-amber-200 text-amber-700' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  Flag Mismatch
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`bg-white p-5 rounded-xl border border-zinc-200 shadow-sm transition-opacity ${step1Valid !== true || step2Valid !== true ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <h3 className="font-semibold text-zinc-900">Violation Notice</h3>
              </div>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Type</label>
                  <input type="text" readOnly value={selectedEvent.type} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">Location</label>
                    <input type="text" readOnly value={selectedEvent.location} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">Timestamp</label>
                    <input type="text" readOnly value={new Date(selectedEvent.timestamp).toLocaleString()} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none" />
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleProcessEvent('Verify')}
                disabled={step1Valid !== true || step2Valid !== true}
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Submit Violation
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm h-full flex flex-col items-center justify-center p-8 text-center text-zinc-500">
            <ShieldAlert className="w-12 h-12 text-zinc-300 mb-3" />
            <p className="font-medium text-zinc-900 mb-1">No Event Selected</p>
            <p className="text-sm max-w-[250px]">Select an event from the queue to review and process.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DisputesView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDisputeId = searchParams.get('disputeId');
  const [disputes, setDisputes] = useState(adminDisputes || []);
  const selectedDispute = selectedDisputeId 
    ? (disputes.find(d => d.id === selectedDisputeId) || disputes[0] || null)
    : (disputes[0] || null);

  const handleSelectDispute = (id) => {
    setSearchParams(prev => {
      prev.set('disputeId', id);
      return prev;
    });
  };

  const handleUpdateStatus = (newStatus, resolution) => {
    if (!selectedDispute) return;
    
    const updated = disputes.map(d => 
      d.id === selectedDispute.id 
        ? { ...d, status: newStatus, resolution } 
        : d
    );
    setDisputes(updated);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">Open</span>;
      case 'Under Review':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Under Review</span>;
      case 'Resolved':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Resolved</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-800">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Card (56%) */}
      <div className="w-full lg:w-[56%] bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-12rem)] min-h-[600px]">
        <div className="px-5 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Filed Disputes
          </h2>
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search disputes..." 
              className="pl-9 pr-4 py-1.5 text-sm bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                <th className="px-5 py-3 border-b border-zinc-200">Plate / Type</th>
                <th className="px-5 py-3 border-b border-zinc-200">Filed By</th>
                <th className="px-5 py-3 border-b border-zinc-200">Date</th>
                <th className="px-5 py-3 border-b border-zinc-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {disputes.map((dispute) => (
                <tr 
                  key={dispute.id}
                  onClick={() => handleSelectDispute(dispute.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedDispute?.id === dispute.id 
                      ? 'bg-amber-50/50 hover:bg-amber-50' 
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="font-mono font-medium text-zinc-900">{dispute.plate}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{dispute.type}</div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600">
                    <div className="font-medium text-zinc-800">{dispute.filedBy}</div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-600">
                    {new Date(dispute.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    {getStatusBadge(dispute.status)}
                  </td>
                </tr>
              ))}
              {disputes.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-zinc-500">
                    No disputes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Card (44%) */}
      <div className="w-full lg:w-[44%]">
        {selectedDispute ? (
          <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm h-full flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                  Dispute Details
                </h3>
                <p className="text-sm text-zinc-500 mt-1">Ref: {selectedDispute.id}</p>
              </div>
              {getStatusBadge(selectedDispute.status)}
            </div>

            <div className="space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                <div>
                  <p className="text-xs font-medium text-zinc-500 mb-1">Plate Number</p>
                  <p className="font-mono font-semibold text-zinc-900">{selectedDispute.plate}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 mb-1">Violation Type</p>
                  <p className="font-medium text-zinc-900">{selectedDispute.type}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 mb-1">Filed By</p>
                  <p className="font-medium text-zinc-900">{selectedDispute.filedBy}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 mb-1">Date Filed</p>
                  <p className="font-medium text-zinc-900">{new Date(selectedDispute.date).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-900 mb-2">Reason for Dispute</p>
                <div className="p-4 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-700 leading-relaxed shadow-sm">
                  "{selectedDispute.reason}"
                </div>
              </div>

              {selectedDispute.status === 'Resolved' && selectedDispute.resolution && (
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-2">Resolution</p>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800 leading-relaxed">
                    {selectedDispute.resolution}
                  </div>
                </div>
              )}
            </div>

            {selectedDispute.status !== 'Resolved' && (
              <div className="mt-6 pt-6 border-t border-zinc-200">
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleUpdateStatus('Resolved', 'Violation Upheld. Evidence clearly shows violation.')}
                    className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Uphold Violation
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus('Resolved', 'Dispute Dismissed. Insufficient evidence of violation.')}
                    className="flex-1 py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Dismiss Dispute
                  </button>
                </div>
                <p className="text-xs text-center text-zinc-500 mt-3 font-medium flex justify-center items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  DEMO: No actual notices sent
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm h-full flex flex-col items-center justify-center p-8 text-center text-zinc-500">
            <AlertCircle className="w-12 h-12 text-zinc-300 mb-3" />
            <p className="font-medium text-zinc-900 mb-1">No Dispute Selected</p>
            <p className="text-sm max-w-[250px]">Select a dispute from the list to view details and take action.</p>
          </div>
        )}
      </div>
    </div>
  );
}
