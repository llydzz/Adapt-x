import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  TriangleAlert, Users, Radio, CheckCircle2, 
  Camera, Activity, Siren, Cpu, Wifi,
  Database, Video, Bell, Server, HardDrive,
  ArrowRight, ShieldAlert, MapPin, Clock
} from 'lucide-react';

import { 
  adminSummary, 
  adminTrafficVolume, 
  adminSystemHealth, 
  adminIntersections, 
  adminViolationQueue 
} from '../../data/adminDemoData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const MetricCard = ({ title, value, note, icon: Icon, accent, to }) => (
  <Link to={to} className="block h-full">
    <motion.div 
      variants={itemVariants}
      className="adapt-card adapt-card-hover h-full bg-white p-4 sm:p-5 flex flex-col relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="text-zinc-500 font-medium text-xs tracking-wider uppercase">{title}</div>
        <div className={`p-1.5 rounded-md ${accent} bg-zinc-50/50 group-hover:bg-zinc-100 transition-colors`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">{value}</div>
      <div className="text-xs text-zinc-500 mt-auto">{note}</div>
    </motion.div>
  </Link>
);

const getIcon = (name) => {
  switch(name) {
    case 'radio': return Radio;
    case 'camera': return Camera;
    case 'activity': return Activity;
    case 'siren': return Siren;
    case 'cpu': return Cpu;
    case 'wifi': return Wifi;
    case 'database': return Database;
    case 'video': return Video;
    case 'bell': return Bell;
    case 'server': return Server;
    case 'hard-drive': return HardDrive;
    default: return Activity;
  }
};

const AdminDashboardPage = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-6 lg:px-8 py-6 flex flex-col gap-5 max-w-[1180px] space-y-1"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
        <div className="text-sm text-zinc-400 flex items-center gap-2">
          <span>System-wide overview</span>
          <span className="text-zinc-600">•</span>
          <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Demo data</span>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5">
        <MetricCard
          title="Total Violations"
          value={adminSummary?.totalViolations || '0'}
          note="▲ 8 since yesterday"
          icon={TriangleAlert}
          accent="text-zinc-900"
          to="/admin/violations"
        />
        <MetricCard
          title="Violators"
          value={adminSummary?.violators || '0'}
          note={`${adminSummary?.repeatOffenders || 0} repeat offenders`}
          icon={Users}
          accent="text-zinc-900"
          to="/admin/violators"
        />
        <MetricCard
          title="Active Signals"
          value={adminSummary ? `${adminSummary.activeSignals}/${adminSummary.totalSignals}` : '0/0'}
          note={((adminSummary?.totalSignals || 12) - (adminSummary?.activeSignals || 11)) > 0 ? `${(adminSummary?.totalSignals || 12) - (adminSummary?.activeSignals || 11)} approach offline` : 'All approaches online'}
          icon={Radio}
          accent={((adminSummary?.totalSignals || 12) - (adminSummary?.activeSignals || 11)) > 0 ? "text-red-600" : "text-emerald-600"}
          to="/admin/traffic-lights"
        />
        <MetricCard
          title="AI/System Status"
          value="ACTIVE"
          note="All modules nominal"
          icon={CheckCircle2}
          accent="text-emerald-600"
          to="/admin/settings"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.45fr_0.85fr] gap-3.5">
        {/* Traffic Volume Chart */}
        <motion.div variants={itemVariants} className="adapt-card bg-white p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-zinc-900">Traffic Volume</h2>
            <div className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-1 rounded">Last 24 hours</div>
          </div>
          
          <div className="h-[160px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adminTrafficVolume || []} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#71717a' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#71717a' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#71717a', fontSize: '12px', marginBottom: '4px' }}
                  itemStyle={{ color: '#18181b', fontSize: '14px', fontWeight: 600 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#16a34a', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div variants={itemVariants} className="adapt-card bg-white p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-zinc-900">System Health</h2>
            <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {adminSystemHealth?.filter(s => s.state === 'Online').length || 0} online
            </div>
          </div>

          <div className="space-y-3">
            {(adminSystemHealth || []).map((sys, idx) => {
              const Icon = getIcon(sys.icon);
              return (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-zinc-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-900">{sys.name}</div>
                      <div className="text-xs text-zinc-500">{sys.detail || 'Operational'}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-md ${
                    sys.state === 'Online' ? 'text-emerald-700 bg-emerald-50' :
                    sys.state === 'Offline' ? 'text-red-700 bg-red-50' :
                    'text-yellow-700 bg-yellow-50'
                  }`}>
                    {sys.state}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
        {/* Monitored Intersections */}
        <motion.div variants={itemVariants} className="adapt-card bg-white p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-zinc-900">Monitored Intersections</h2>
            <Link to="/admin/traffic-lights" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {(adminIntersections || []).slice(0, 4).map((intersection, idx) => (
              <Link 
                key={intersection.id || idx}
                to={`/admin/traffic-lights?intersection=${intersection.id}`}
                className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    intersection.status === 'Online' ? 'bg-emerald-500' :
                    intersection.status === 'Offline' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-zinc-900 group-hover:text-zinc-700">{intersection.name}</div>
                    <div className="text-xs text-zinc-500 flex items-center gap-2">
                      <MapPin size={10} /> {intersection.signalCount} signals • {intersection.lastPing}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm font-semibold text-zinc-900">{(intersection.vehicles || 0).toLocaleString()} veh</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${
                    intersection.status === 'Online' ? 'text-emerald-600' :
                    intersection.status === 'Offline' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {intersection.status}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Violations / Review Queue */}
        <motion.div variants={itemVariants} className="adapt-card bg-white p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-zinc-900">Recent Violations</h2>
              <span className="bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider">Demo Data</span>
            </div>
            <Link to="/admin/violations" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors">
              Review all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="pb-2 text-xs font-medium text-zinc-500 w-[30%]">Type</th>
                  <th className="pb-2 text-xs font-medium text-zinc-500 w-[30%]">Location / Time</th>
                  <th className="pb-2 text-xs font-medium text-zinc-500 w-[25%]">Confidence</th>
                  <th className="pb-2 text-xs font-medium text-zinc-500 w-[15%] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {(adminViolationQueue || []).slice(0, 3).map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${
                          item.type === 'Red Light' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          <ShieldAlert size={14} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{item.type}</div>
                          <div className="text-xs text-zinc-500">{item.vehicle || 'Unknown Vehicle'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-sm text-zinc-700 truncate max-w-[150px]" title={item.location}>{item.location}</div>
                      <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {item.time}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.confidence > 90 ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-zinc-700">{item.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-3 pl-2 text-right">
                      <Link 
                        to={`/admin/violations?event=${item.id}`}
                        className="inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!adminViolationQueue || adminViolationQueue.length === 0) && (
              <div className="py-6 text-center text-sm text-zinc-500">
                No violations in queue
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
