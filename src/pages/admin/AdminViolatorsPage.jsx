import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { adminViolators, adminSummary } from '../../data/adminDemoData';
import { 
  Users, UserX, AlertTriangle, ShieldAlert,
  Search, Filter, ChevronDown, CheckCircle, MapPin, Clock, Eye, AlertCircle
} from 'lucide-react';

export default function AdminViolatorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [noticeSent, setNoticeSent] = useState(false);
  const [showLtoModal, setShowLtoModal] = useState(false);

  const selectedPersonId = searchParams.get('person') || (adminViolators && adminViolators.length > 0 ? adminViolators[0].id : null);
  const selectedPerson = adminViolators && adminViolators.length > 0 ? (adminViolators.find(v => v.id === selectedPersonId) || adminViolators[0]) : null;

  const handleSelectPerson = (id) => {
    setSearchParams({ person: id });
  };

  const handleSendNotice = () => {
    setNoticeSent(true);
    setTimeout(() => setNoticeSent(false), 2000);
  };

  const filteredViolators = adminViolators ? adminViolators.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.plate.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Violators</h1>
        <p className="text-sm text-zinc-500 mt-1">Registered offenders, vehicles, and violation history. · Demo data</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard title="Total Violators" value={adminSummary?.violators || 0} icon={Users} color="emerald" />
        <StatCard title="Repeat Offenders" value={adminSummary?.repeatOffenders || 0} icon={UserX} color="amber" />
        <StatCard title="Suspended Licenses" value={adminSummary?.suspendedLicenses || 0} icon={ShieldAlert} color="rose" />
        <StatCard title="Disputes Filed" value={adminSummary?.disputes || 0} icon={AlertTriangle} color="violet" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Roster */}
        <div className="w-full lg:w-[56%] bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between gap-4">
            <h2 className="font-semibold text-zinc-900">Roster</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search name or plate..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-48 transition-all"
                />
              </div>
              <button className="p-2 border border-zinc-200 text-zinc-600 rounded-full hover:bg-zinc-50 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-zinc-50/50 text-zinc-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 font-medium">NAME</th>
                  <th className="px-5 py-4 font-medium">PLATE</th>
                  <th className="px-5 py-4 font-medium">VEHICLE</th>
                  <th className="px-5 py-4 font-medium">VIOLATIONS</th>
                  <th className="px-5 py-4 font-medium">LICENSE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredViolators.map((v) => (
                  <tr 
                    key={v.id} 
                    onClick={() => handleSelectPerson(v.id)}
                    className={`cursor-pointer transition-colors ${selectedPersonId === v.id ? 'bg-emerald-50/70' : 'hover:bg-zinc-50/50'}`}
                  >
                    <td className="px-5 py-4 font-medium text-zinc-900">{v.name}</td>
                    <td className="px-5 py-4 font-mono text-zinc-600">{v.plate}</td>
                    <td className="px-5 py-4 text-zinc-600">{v.vehicle}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium">
                        {v.violations}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        v.licenseStatus === 'Valid' ? 'bg-emerald-50 text-emerald-700' :
                        v.licenseStatus === 'Suspended' ? 'bg-rose-50 text-rose-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {v.licenseStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Profile */}
        <div className="w-full lg:w-[44%]">
          {selectedPerson && (
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 sticky top-6">
              <h2 className="font-semibold text-zinc-900 mb-6">Violator Profile</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <span className="text-zinc-500 text-sm">Name</span>
                  <span className="font-medium text-zinc-900">{selectedPerson.name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <span className="text-zinc-500 text-sm">Address</span>
                  <span className="font-medium text-zinc-900">{selectedPerson.address}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <span className="text-zinc-500 text-sm">Vehicle</span>
                  <span className="font-medium text-zinc-900">{selectedPerson.vehicle} ({selectedPerson.plate})</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <span className="text-zinc-500 text-sm">License Status</span>
                  <span className={`font-medium ${
                    selectedPerson.licenseStatus === 'Valid' ? 'text-emerald-600' :
                    selectedPerson.licenseStatus === 'Suspended' ? 'text-rose-600' :
                    'text-amber-600'
                  }`}>{selectedPerson.licenseStatus}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <span className="text-zinc-500 text-sm">Total Violations</span>
                  <span className="font-medium text-rose-600">{selectedPerson.violations}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-medium text-zinc-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  Violation History
                </h3>
                <div className="space-y-4">
                  {selectedPerson.history.map((hist, idx) => (
                    <div key={idx} className="flex gap-4 items-start relative before:absolute before:left-[11px] before:top-6 before:bottom-[-16px] before:w-[2px] before:bg-zinc-100 last:before:hidden">
                      <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0 border-2 border-white relative z-10">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                      </div>
                      <div className="flex-1 pb-1">
                        <p className="text-sm font-medium text-zinc-900">{hist.type}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {hist.date}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {hist.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleSendNotice}
                  className="flex-1 bg-zinc-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                >
                  {noticeSent ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Notice Dispatched (Demo)
                    </>
                  ) : (
                    'Send Notice'
                  )}
                </button>
                <button 
                  onClick={() => setShowLtoModal(true)}
                  className="flex-1 bg-white text-zinc-900 border border-zinc-200 rounded-full py-2.5 text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View LTO Record
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showLtoModal && selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900">LTO Database Record</h3>
                  <p className="text-sm text-zinc-500 mt-1">Connecting to external system... (Demo)</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-zinc-50/50">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-zinc-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{selectedPerson.name}</p>
                    <p className="text-xs text-zinc-500">License: {selectedPerson.licenseNumber || 'N12-34-567890'}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Status</span>
                    <span className="font-medium text-emerald-600">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Demerit Points</span>
                    <span className="font-medium text-rose-600">{selectedPerson.violations * 5} pts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Last Renewal</span>
                    <span className="font-medium text-zinc-900">Oct 12, 2021</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowLtoModal(false)}
                className="w-full mt-6 bg-zinc-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colorStyles = {
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    violet: 'bg-violet-50 text-violet-600',
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colorStyles[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-zinc-500 font-medium">{title}</p>
        <p className="text-2xl font-semibold text-zinc-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
