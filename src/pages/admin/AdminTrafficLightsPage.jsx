import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, Activity, Wifi, WifiOff, AlertTriangle, 
  CarFront, PersonStanding, 
  Clock, Zap, Settings2, RefreshCw
} from 'lucide-react';
import { adminSummary, adminIntersections } from '../../data/adminDemoData';

const getStatusColor = (status) => {
  switch (status) {
    case 'Online': return 'text-[#16a34a] bg-emerald-50 border-emerald-200';
    case 'Offline': return 'text-[#dc2626] bg-red-50 border-red-200';
    case 'Warning': return 'text-[#ca8a04] bg-amber-50 border-amber-200';
    default: return 'text-zinc-500 bg-zinc-50 border-zinc-200';
  }
};

const getStatusIndicator = (status) => {
  switch (status) {
    case 'Online': return 'bg-[#16a34a]';
    case 'Offline': return 'bg-[#dc2626]';
    case 'Warning': return 'bg-[#ca8a04]';
    default: return 'bg-zinc-400';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Online': return <Wifi className="w-3.5 h-3.5 mr-1" />;
    case 'Offline': return <WifiOff className="w-3.5 h-3.5 mr-1" />;
    case 'Warning': return <AlertTriangle className="w-3.5 h-3.5 mr-1" />;
    default: return <Activity className="w-3.5 h-3.5 mr-1" />;
  }
};

export default function AdminTrafficLightsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('intersection') || searchParams.get('id');
  
  const selectedIntersection = selectedId ? (adminIntersections.find(i => i.id === selectedId) || null) : null;
  const [toastMessage, setToastMessage] = useState(null);

  const handleSelect = (id) => {
    setSearchParams({ intersection: id });
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAction = (actionName) => {
    showToast(`Demo: ${actionName} would require backend integration.`);
  };

  const onlineCount = adminIntersections.filter(i => i.status === 'Online').length;
  const offlineCount = adminIntersections.filter(i => i.status === 'Offline').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 bg-zinc-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm flex items-center font-medium"
          >
            <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-[27px] font-bold text-zinc-900">Traffic Lights</h1>
        <p className="text-sm text-zinc-500 mt-1 flex items-center">
          Manage and monitor all traffic signal infrastructure.
          <span className="mx-2 font-black text-zinc-300">·</span>
          <span className="text-emerald-600 font-medium">Demo data</span>
        </p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-100 p-4 shadow-sm flex flex-col justify-center">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Total Signals</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-zinc-900">{adminSummary.totalSignals}</span>
            <span className="text-xs text-zinc-400 mb-1">deployed</span>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-100 p-4 shadow-sm flex flex-col justify-center">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Online</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-[#16a34a]">{onlineCount}</span>
            <span className="text-xs text-zinc-400 mb-1">active</span>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-100 p-4 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <AlertTriangle className="w-12 h-12 text-[#dc2626]" />
          </div>
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Offline</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-[#dc2626]">{offlineCount}</span>
            <span className="text-xs text-[#dc2626]/70 mb-1 font-medium">require attention</span>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-zinc-100 p-4 shadow-sm flex flex-col justify-center">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Avg Response</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-zinc-900">&lt; 2ms</span>
            <span className="text-xs text-zinc-400 mb-1">latency</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Intersection Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900">Intersections</h2>
            <span className="text-xs font-medium bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full">
              {adminIntersections.length} total
            </span>
          </div>
          
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 gap-3.5">
            {adminIntersections.map((intersection) => {
              const isSelected = selectedId === intersection.id;
              
              return (
                <motion.div
                  key={intersection.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(intersection.id)}
                  className={`relative bg-white rounded-xl border p-4 cursor-pointer shadow-sm transition-all overflow-hidden
                    ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-zinc-200 hover:border-emerald-300'}
                  `}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusIndicator(intersection.status)}`} />
                  
                  <div className="pl-2">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs font-mono text-zinc-500 mb-1">{intersection.id}</div>
                      <div className={`flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(intersection.status)}`}>
                        {getStatusIcon(intersection.status)}
                        {intersection.status}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-zinc-900 text-sm mb-4 leading-tight truncate" title={intersection.name}>
                      {intersection.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-50">
                      <div className="flex items-center gap-3">
                         <div className="flex items-center text-xs text-zinc-500" title="Total Signals">
                           <MapPin className="w-3.5 h-3.5 mr-1" />
                           {intersection.signalCount}
                         </div>
                         <div className="flex items-center text-xs text-zinc-500" title="Vehicles detected today">
                           <CarFront className="w-3.5 h-3.5 mr-1" />
                           {(intersection.vehicles / 1000).toFixed(1)}k
                         </div>
                      </div>
                      <div className="flex items-center text-[10px] text-zinc-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {intersection.lastPing}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h2 className="text-lg font-bold text-zinc-900 mb-4 opacity-0 lg:opacity-100">Details</h2>
            
            <AnimatePresence mode="wait">
              {selectedIntersection ? (
                <motion.div
                  key={selectedIntersection.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col"
                >
                  <div className={`h-2 w-full ${getStatusIndicator(selectedIntersection.status)}`} />
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                        {selectedIntersection.id}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        DEMO: Simulated telemetry
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-zinc-900 mt-2 mb-4 leading-tight">
                      {selectedIntersection.name}
                    </h3>
                    
                    <div className={`inline-flex items-center text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-6 ${getStatusColor(selectedIntersection.status)}`}>
                      {getStatusIcon(selectedIntersection.status)}
                      {selectedIntersection.status}
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                        <div className="flex items-center text-sm font-medium text-zinc-700">
                          <MapPin className="w-4 h-4 mr-2 text-zinc-400" />
                          Signals
                        </div>
                        <span className="font-bold text-zinc-900">{selectedIntersection.signalCount}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                        <div className="flex items-center text-sm font-medium text-zinc-700">
                          <CarFront className="w-4 h-4 mr-2 text-zinc-400" />
                          Vehicles
                        </div>
                        <span className="font-bold text-zinc-900">{selectedIntersection.vehicles.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                        <div className="flex items-center text-sm font-medium text-zinc-700">
                          <PersonStanding className="w-4 h-4 mr-2 text-zinc-400" />
                          Pedestrians
                        </div>
                        <span className="font-bold text-zinc-900">{selectedIntersection.pedestrians.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Controls</h4>
                      <button 
                        onClick={() => handleAction('Override Phase')}
                        className="w-full flex items-center justify-center p-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-medium transition-colors"
                      >
                        <Settings2 className="w-4 h-4 mr-2" />
                        Override Phase
                      </button>
                      <button 
                        onClick={() => handleAction('Reset Signal')}
                        className="w-full flex items-center justify-center p-2.5 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-xl text-sm font-medium transition-colors"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset Signal
                      </button>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span>Last telemetry ping:</span>
                      <span className="font-medium flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {selectedIntersection.lastPing}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 h-[400px] flex flex-col items-center justify-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-4 text-zinc-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1">No Intersection Selected</h3>
                  <p className="text-xs text-zinc-500 max-w-[200px]">
                    Select an intersection from the grid to view detailed telemetry and manage signals.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
      </div>
    </div>
  );
}
