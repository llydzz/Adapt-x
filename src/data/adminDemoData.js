/** DEMO DATA ONLY — not connected to any backend. All records are fabricated for UI prototyping. */

export const ADMIN_CREDENTIALS = {
  email: 'admin@adapt-x.local',
  password: 'Admin123!',
};

export const adminUser = {
  name: 'Administrator',
  shortName: 'Admin',
  email: 'admin@adapt-x.local',
  role: 'System Administrator',
  employeeId: 'ADM-001',
  initials: 'A',
};

export const adminSummary = {
  totalViolations: 64,
  violators: 59,
  activeSignals: 11,
  totalSignals: 12,
  aiStatus: 'ACTIVE',
  repeatOffenders: 5,
  suspendedLicenses: 3,
  disputes: 4,
  systemUptime: '98.4%',
  priorityEvents: 7,
};

export const adminNotifications = [
  { id: '1', title: 'System Update', detail: 'New AI model deployed.', time: '10 min ago', path: '/admin/settings', read: false },
  { id: '2', title: 'High Traffic Alert', detail: 'Congestion at EDSA-Quezon Ave.', time: '35 min ago', path: '/admin/intersections', read: false },
  { id: '3', title: 'Dispute Filed', detail: 'Juan Dela Cruz filed a dispute.', time: '1 hr ago', path: '/admin/disputes', read: false },
  { id: '4', title: 'Camera Offline', detail: 'Commonwealth Ave Cam-3 is down.', time: '2 hrs ago', path: '/admin/intersections', read: true },
  { id: '5', title: 'Daily Report Ready', detail: 'Yesterday\'s violation report is ready.', time: '4 hrs ago', path: '/admin/reports', read: true },
];

export const adminIntersections = [
  { id: 'INT-01', name: 'EDSA - Quezon Ave', status: 'Online', signalCount: 16, lastPing: '2 mins ago', vehicles: 4500, pedestrians: 1200 },
  { id: 'INT-02', name: 'Commonwealth - Tandang Sora', status: 'Online', signalCount: 12, lastPing: '1 min ago', vehicles: 3200, pedestrians: 800 },
  { id: 'INT-03', name: 'Quezon Ave - Araneta Ave', status: 'Warning', signalCount: 8, lastPing: '5 mins ago', vehicles: 2100, pedestrians: 500 },
  { id: 'INT-04', name: 'East Ave - BIR Road', status: 'Online', signalCount: 6, lastPing: '3 mins ago', vehicles: 1500, pedestrians: 300 },
  { id: 'INT-05', name: 'Katipunan - CP Garcia', status: 'Offline', signalCount: 10, lastPing: '2 hrs ago', vehicles: 0, pedestrians: 0 },
  { id: 'INT-06', name: 'EDSA - Kamuning', status: 'Online', signalCount: 14, lastPing: '2 mins ago', vehicles: 3800, pedestrians: 950 },
  { id: 'INT-07', name: 'Tomas Morato - Timog', status: 'Online', signalCount: 4, lastPing: '1 min ago', vehicles: 1100, pedestrians: 1500 },
  { id: 'INT-08', name: 'Visayas Ave - Congressional', status: 'Online', signalCount: 8, lastPing: '4 mins ago', vehicles: 1900, pedestrians: 400 },
];

export const adminViolationQueue = [
  { id: 'V-1001', type: 'Beating the Red Light', location: 'EDSA - Quezon Ave', time: '08:15 AM', confidence: '98%', plate: 'ABC 1234', owner: 'Juan Dela Cruz', address: '123 Sampaguita St, QC', vehicle: 'Toyota Vios 2020', licenseStatus: 'Active', disposition: 'Review', captureUrl: '/demo/capture1.jpg', timestamp: '2023-10-27T08:15:00Z' },
  { id: 'V-1002', type: 'Over-speeding', location: 'Commonwealth - Tandang Sora', time: '09:30 AM', confidence: '95%', plate: 'XYZ 9876', owner: 'Maria Santos', address: '456 Rosal St, QC', vehicle: 'Honda Civic 2019', licenseStatus: 'Active', disposition: 'Review', captureUrl: '/demo/capture2.jpg', timestamp: '2023-10-27T09:30:00Z' },
  { id: 'V-1003', type: 'Illegal Parking', location: 'Tomas Morato - Timog', time: '11:45 AM', confidence: '99%', plate: 'LMN 4567', owner: 'Pedro Reyes', address: '789 Ilang-Ilang St, QC', vehicle: 'Mitsubishi Montero 2021', licenseStatus: 'Suspended', disposition: 'Review', captureUrl: '/demo/capture3.jpg', timestamp: '2023-10-27T11:45:00Z' },
  { id: 'V-1004', type: 'Swerving', location: 'EDSA - Kamuning', time: '01:20 PM', confidence: '92%', plate: 'DEF 3456', owner: 'Ana Cruz', address: '321 Mabini St, Manila', vehicle: 'Ford Everest 2022', licenseStatus: 'Active', disposition: 'Dispute', captureUrl: '/demo/capture4.jpg', timestamp: '2023-10-27T13:20:00Z' },
  { id: 'V-1005', type: 'Beating the Red Light', location: 'Quezon Ave - Araneta Ave', time: '03:10 PM', confidence: '96%', plate: 'GHI 7890', owner: 'Jose Garcia', address: '654 Bonifacio St, Makati', vehicle: 'Nissan Navara 2018', licenseStatus: 'Active', disposition: 'Review', captureUrl: '/demo/capture5.jpg', timestamp: '2023-10-27T15:10:00Z' },
];

export const adminDisputes = [
  { id: 'D-2001', plate: 'DEF 3456', type: 'Swerving', filedBy: 'Ana Cruz', filedDate: '2023-10-26', reason: 'Avoiding a pothole on the road.', status: 'Open', resolution: '' },
  { id: 'D-2002', plate: 'JKL 1122', type: 'Over-speeding', filedBy: 'Miguel Ocampo', filedDate: '2023-10-25', reason: 'Medical emergency, rushing to hospital.', status: 'Under Review', resolution: '' },
  { id: 'D-2003', plate: 'OPQ 3344', type: 'Illegal Parking', filedBy: 'Elena Bautista', filedDate: '2023-10-20', reason: 'Vehicle broke down.', status: 'Resolved', resolution: 'Ticket waived, proof of towing provided.' },
];

export const adminViolators = [
  { id: 'VL-3001', name: 'Pedro Reyes', shortName: 'Pedro R.', plate: 'LMN 4567', vehicle: 'Montero', fullVehicle: 'Mitsubishi Montero 2021', address: '789 Ilang-Ilang St, QC', violations: 4, license: 'Suspended', history: ['Illegal Parking', 'Over-speeding', 'Swerving', 'Beating the Red Light'] },
  { id: 'VL-3002', name: 'Juan Dela Cruz', shortName: 'Juan D.', plate: 'ABC 1234', vehicle: 'Vios', fullVehicle: 'Toyota Vios 2020', address: '123 Sampaguita St, QC', violations: 2, license: 'Active', history: ['Beating the Red Light', 'Illegal U-Turn'] },
  { id: 'VL-3003', name: 'Maria Santos', shortName: 'Maria S.', plate: 'XYZ 9876', vehicle: 'Civic', fullVehicle: 'Honda Civic 2019', address: '456 Rosal St, QC', violations: 1, license: 'Active', history: ['Over-speeding'] },
  { id: 'VL-3004', name: 'Ana Cruz', shortName: 'Ana C.', plate: 'DEF 3456', vehicle: 'Everest', fullVehicle: 'Ford Everest 2022', address: '321 Mabini St, Manila', violations: 1, license: 'Active', history: ['Swerving'] },
  { id: 'VL-3005', name: 'Jose Garcia', shortName: 'Jose G.', plate: 'GHI 7890', vehicle: 'Navara', fullVehicle: 'Nissan Navara 2018', address: '654 Bonifacio St, Makati', violations: 1, license: 'Active', history: ['Beating the Red Light'] },
];

export const adminReports = [
  { id: 'R-4001', name: 'Weekly Violation Summary', range: 'Oct 16 - Oct 22, 2023', format: 'PDF', date: '2023-10-23', generatedBy: 'System' },
  { id: 'R-4002', name: 'Monthly Intersection Analytics', range: 'September 2023', format: 'CSV', date: '2023-10-01', generatedBy: 'Admin' },
  { id: 'R-4003', name: 'Repeat Offenders List', range: 'Q3 2023', format: 'PDF', date: '2023-10-05', generatedBy: 'Admin' },
  { id: 'R-4004', name: 'System Uptime Report', range: 'Sep 1 - Sep 30, 2023', format: 'PDF', date: '2023-10-02', generatedBy: 'System' },
];

export const adminTrafficVolume = [
  { time: '12 AM', volume: 150 },
  { time: '2 AM', volume: 80 },
  { time: '4 AM', volume: 120 },
  { time: '6 AM', volume: 850 },
  { time: '8 AM', volume: 2100 },
  { time: '10 AM', volume: 1600 },
  { time: '12 PM', volume: 1800 },
  { time: '2 PM', volume: 1550 },
  { time: '4 PM', volume: 1900 },
  { time: '6 PM', volume: 2400 },
  { time: '8 PM', volume: 1400 },
  { time: '10 PM', volume: 600 },
];

export const adminSystemHealth = [
  { name: 'Core AI Engine', state: 'Online', icon: 'cpu', lastCheck: '2023-10-27T15:30:00Z' },
  { name: 'Database Server', state: 'Online', icon: 'database', lastCheck: '2023-10-27T15:30:00Z' },
  { name: 'Camera Network', state: 'Degraded', icon: 'video', lastCheck: '2023-10-27T15:28:00Z' },
  { name: 'Notification Service', state: 'Online', icon: 'bell', lastCheck: '2023-10-27T15:30:00Z' },
  { name: 'LTO API Gateway', state: 'Online', icon: 'server', lastCheck: '2023-10-27T15:29:00Z' },
  { name: 'Backup Storage', state: 'Online', icon: 'hard-drive', lastCheck: '2023-10-27T15:00:00Z' },
];

export const adminAuditLog = [
  { id: 'AL-5001', action: 'User Login', user: 'Admin', timestamp: '2023-10-27T08:00:00Z', detail: 'Successful login from 192.168.1.100' },
  { id: 'AL-5002', action: 'Settings Changed', user: 'Admin', timestamp: '2023-10-27T09:15:00Z', detail: 'Updated intersection warning threshold' },
  { id: 'AL-5003', action: 'Dispute Resolved', user: 'Admin', timestamp: '2023-10-27T11:30:00Z', detail: 'Resolved dispute D-2003' },
  { id: 'AL-5004', action: 'Report Generated', user: 'System', timestamp: '2023-10-27T12:00:00Z', detail: 'Generated Weekly Violation Summary' },
  { id: 'AL-5005', action: 'Camera Offline', user: 'System', timestamp: '2023-10-27T13:45:00Z', detail: 'Katipunan Cam-2 connection lost' },
  { id: 'AL-5006', action: 'Manual Override', user: 'Admin', timestamp: '2023-10-27T14:20:00Z', detail: 'Overrode signal timing for EDSA - Quezon Ave' },
];

export const adminSettings = {
  security: {
    twoFactorAuth: true,
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
  },
  account: {
    emailNotifications: true,
    smsAlerts: false,
  },
  notifications: {
    systemAlerts: true,
    cameraOffline: true,
    highTraffic: false,
  },
  intersections: {
    autoOptimize: true,
    warningThreshold: 80,
  },
  privacy: {
    maskPlatesInUI: false,
    retainDataDays: 365,
  },
  appearance: {
    theme: 'system',
    denseMode: false,
  },
};
