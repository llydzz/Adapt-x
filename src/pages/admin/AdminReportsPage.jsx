import React, { useState } from 'react';
import { adminReports } from '../../data/adminDemoData';
import { 
  FileText, FileSpreadsheet, Download, ChevronDown, 
  Printer, Calendar, Loader2, BarChart3, AlertTriangle, ShieldCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const escapeHtml = (unsafe) => {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export default function AdminReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [reportFormat, setReportFormat] = useState('pdf');

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  const handleDownload = (format, reportName) => {
    if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${escapeHtml(reportName)} - PDF View</title>
              <style>
                body { font-family: sans-serif; padding: 40px; color: #18181b; }
                h1 { color: #18181b; border-bottom: 2px solid #e4e4e7; padding-bottom: 10px; }
                .meta { color: #71717a; margin-bottom: 30px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e4e4e7; }
                th { background-color: #f4f4f5; font-weight: 600; }
              </style>
            </head>
            <body>
              <h1>${escapeHtml(reportName)}</h1>
              <div class="meta">
                <p>Generated: ${new Date().toLocaleString()}</p>
                <p>System: ADAPT-X Administrator Module</p>
              </div>
              <p>This is a simulated PDF document view for demonstration purposes.</p>
              <table>
                <thead>
                  <tr>
                    <th>Item ID</th>
                    <th>Category</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>001</td><td>Traffic Volume</td><td>High</td><td>Active</td></tr>
                  <tr><td>002</td><td>Violations</td><td>142</td><td>Pending</td></tr>
                  <tr><td>003</td><td>Incidents</td><td>3</td><td>Resolved</td></tr>
                </tbody>
              </table>
              <script>
                window.onload = () => window.print();
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } else {
      const csvContent = "data:text/csv;charset=utf-8,ID,Category,Value,Status\\n001,Traffic Volume,High,Active\\n002,Violations,142,Pending\\n003,Incidents,3,Resolved";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${reportName.replace(/\\s+/g, '_').toLowerCase()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const chartData = [
    { name: 'Mon', violations: 120 },
    { name: 'Tue', violations: 145 },
    { name: 'Wed', violations: 132 },
    { name: 'Thu', violations: 168 },
    { name: 'Fri', violations: 190 },
    { name: 'Sat', violations: 215 },
    { name: 'Sun', violations: 185 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Reports</h1>
        <p className="text-sm text-zinc-500 mt-1">Generate and download traffic and violation reports. · Demo data</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Build a Report Card */}
        <div className="w-full lg:w-[60%] bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
          <h2 className="font-semibold text-zinc-900 mb-6">Build a Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Report Type</label>
              <div className="relative">
                <select className="w-full appearance-none bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium">
                  <option>Violations Summary</option>
                  <option>Traffic Volume Logs</option>
                  <option>Emergency Events</option>
                  <option>System Uptime</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Location Scope</label>
              <div className="relative">
                <select className="w-full appearance-none bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium">
                  <option>All Intersections</option>
                  <option>Ayala-Makati Ave</option>
                  <option>EDSA-Shaw</option>
                  <option>Quezon Ave-Araneta</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">From Date</label>
              <div className="relative">
                <input type="date" className="w-full appearance-none bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium" defaultValue="2023-10-01" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">To Date</label>
              <div className="relative">
                <input type="date" className="w-full appearance-none bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium" defaultValue="2023-10-31" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-100">
            <div className="flex items-center gap-2 p-1 bg-zinc-100 rounded-full w-full sm:w-auto">
              <button 
                onClick={() => setReportFormat('pdf')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${reportFormat === 'pdf' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
              >
                <FileText className="w-4 h-4" /> PDF Document
              </button>
              <button 
                onClick={() => setReportFormat('csv')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${reportFormat === 'csv' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
              >
                <FileSpreadsheet className="w-4 h-4" /> CSV Data
              </button>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={generating}
              className="w-full sm:w-auto bg-zinc-900 text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {generating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
              ) : (
                <><Printer className="w-4 h-4" /> Generate Report</>
              )}
            </button>
          </div>
        </div>

        {/* This Period Card */}
        <div className="w-full lg:w-[40%] bg-zinc-900 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <BarChart3 className="w-32 h-32" />
          </div>
          <h2 className="font-semibold mb-6 text-zinc-100">This Period Overview</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 relative z-10">
            <div>
              <p className="text-zinc-400 text-sm mb-1">Total Violations</p>
              <p className="text-2xl font-semibold text-emerald-400">1,155</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">Avg Daily Vol.</p>
              <p className="text-2xl font-semibold">45.2k</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Emergencies</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Uptime</p>
              <p className="text-2xl font-semibold text-emerald-400">99.9%</p>
            </div>
            <div className="col-span-2 pt-4 border-t border-zinc-800">
              <p className="text-zinc-400 text-sm mb-1">Disputes Processed</p>
              <div className="flex items-end gap-3">
                <p className="text-2xl font-semibold">84</p>
                <p className="text-sm text-emerald-400 mb-1">+12% resolution rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Violations Chart */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-zinc-900">Violations by Day</h2>
          <select className="bg-zinc-50 border border-zinc-200 text-zinc-600 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
              <Tooltip 
                cursor={{ fill: '#f4f4f5' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="violations" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Generated Reports Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-zinc-100">
          <h2 className="font-semibold text-zinc-900">Generated Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-zinc-50/50 text-zinc-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">REPORT</th>
                <th className="px-6 py-4 font-medium">RANGE</th>
                <th className="px-6 py-4 font-medium">FORMAT</th>
                <th className="px-6 py-4 font-medium">GENERATED</th>
                <th className="px-6 py-4 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {adminReports && adminReports.map((report) => (
                <tr key={report.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${report.format === 'PDF' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {report.format === 'PDF' ? <FileText className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
                    </div>
                    {report.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-zinc-400" /> {report.range || report.dateRange}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700">
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{report.date || report.generatedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDownload(report.format.toLowerCase(), report.name)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 rounded-full hover:bg-zinc-50 hover:text-zinc-900 transition-colors text-xs font-medium shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
