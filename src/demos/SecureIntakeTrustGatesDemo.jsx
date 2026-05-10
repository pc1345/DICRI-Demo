import React, { useState } from 'react';
import {
  ShieldAlert, CheckCircle2, XCircle, RotateCw, MapPin,
  HardDrive, UserCheck, Lock, ChevronRight, AlertCircle,
  Fingerprint, RefreshCcw, Camera, LayoutGrid,
  Navigation, Check, X, Tablet, Activity, Shield,
  Ruler, ChevronLeft, Terminal, KeyRound, Smartphone,
  ScanLine, Radio, Usb, BadgeCheck, Plane, Clock,
  Building2, UserRound, FileCheck2, Gauge, Info
} from 'lucide-react';


// --- OFFICIAL DICRI LOGO COMPONENT ---
const DICRILogo = ({ className = "min-h-[160px]", showText = true }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <div className="relative h-20 w-20 mb-3">
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5L12 20V45C12 70 50 92 50 92C50 92 88 70 88 45V20L50 5Z" fill="#0F172A" stroke="#3B82F6" strokeWidth="2.5"/>
        <path d="M38 35C48 35 48 65 58 65" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M38 42C48 42 48 58 58 58" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M38 50C48 50 48 50 58 50" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M38 58C48 58 48 42 58 42" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M38 65C48 65 48 35 58 35" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="80" cy="75" r="14" fill="#3B82F6" stroke="#0F172A" strokeWidth="2"/>
        <path d="M74 75L78 79L86 71" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M74 88L72 94L80 90L88 94L86 88" fill="#3B82F6" />
      </svg>
    </div>
    {showText && (
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-[0.1em] text-white leading-none">DICRI</h1>
        <p className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.4em] mt-3">Zero-Trust Infrastructure Assurance</p>
      </div>
    )}
  </div>
);


// --- DEMO DATA: PERSONAS, EQUIPMENT TYPES, DEVICE REGISTRY, SEGMENTS ---
const PERSONAS = {
  'julius.entry@dicri.demo': {
    id: 'USR-JOK-2026-019',
    name: 'Julius Okogie',
    email: 'julius.entry@dicri.demo',
    role: 'Entry',
    title: 'Entry-Level Tester',
    organization: 'Janvier Field Services',
    orgStatus: 'Approved Contractor',
    certificationId: 'DICRI-ENT-2026-0147',
    certificationStatus: 'Valid',
    certificationExpires: '2026-12-31',
    mfaStatus: 'Passed',
    droneLicenseValid: false,
    droneLicenseNumber: null,
    color: 'bg-slate-600',
    initials: 'JO'
  },
  'amina.cheetah@dicri.demo': {
    id: 'USR-ABL-2026-022',
    name: 'Amina Bello',
    email: 'amina.cheetah@dicri.demo',
    role: 'Cheetah',
    title: 'Cheetah Field Lead',
    organization: 'Janvier Field Services',
    orgStatus: 'Approved Contractor',
    certificationId: 'DICRI-CHT-2026-0228',
    certificationStatus: 'Valid',
    certificationExpires: '2026-12-31',
    mfaStatus: 'Passed',
    droneLicenseValid: false,
    droneLicenseNumber: null,
    color: 'bg-blue-600',
    initials: 'AB'
  },
  'tunde.drone@dicri.demo': {
    id: 'USR-TAD-2026-041',
    name: 'Tunde Adeyemi',
    email: 'tunde.drone@dicri.demo',
    role: 'Cheetah',
    title: 'Cheetah Aerial Capture Specialist',
    organization: 'Janvier Field Services',
    orgStatus: 'Approved Contractor',
    certificationId: 'DICRI-CHT-2026-0412',
    certificationStatus: 'Valid',
    certificationExpires: '2026-12-31',
    mfaStatus: 'Passed',
    droneLicenseValid: true,
    droneLicenseNumber: 'NCAA-RPAS-2026-0417',
    color: 'bg-cyan-600',
    initials: 'TA'
  },
  'tiger.reviewer@dicri.demo': {
    id: 'USR-TOG-2026-007',
    name: 'Tola Ogunleye',
    email: 'tiger.reviewer@dicri.demo',
    role: 'Tiger',
    title: 'Tiger Certification Reviewer',
    organization: 'DICRI Certification Authority',
    orgStatus: 'Internal Authority',
    certificationId: 'DICRI-TGR-2026-0007',
    certificationStatus: 'Valid',
    certificationExpires: '2026-12-31',
    mfaStatus: 'Passed',
    droneLicenseValid: false,
    droneLicenseNumber: null,
    color: 'bg-purple-600',
    initials: 'TO'
  }
};

const ROLE_RANK = { Entry: 1, Cheetah: 2, Tiger: 3 };

const EQUIPMENT_TYPES = {
  'Tablet / Photo Capture': {
    icon: Tablet,
    class: 'C',
    type: 'Optical',
    minRole: 'Entry',
    requiresDroneLicense: false,
    description: 'Photo capture, timestamps, closeout images, field notes'
  },
  'Digital Measuring Rod': {
    icon: Ruler,
    class: 'C',
    type: 'Physical',
    minRole: 'Entry',
    requiresDroneLicense: false,
    description: 'Depth and physical measurement validation'
  },
  'Survey Pole': {
    icon: Ruler,
    class: 'C',
    type: 'Physical',
    minRole: 'Entry',
    requiresDroneLicense: false,
    description: 'Segment measurement and simple field verification'
  },
  'OTDR': {
    icon: Activity,
    class: 'A',
    type: 'Electronic',
    minRole: 'Cheetah',
    requiresDroneLicense: false,
    description: 'Optical trace, light loss, continuity evidence'
  },
  'Handheld LiDAR': {
    icon: HardDrive,
    class: 'A',
    type: 'Advanced',
    minRole: 'Cheetah',
    requiresDroneLicense: false,
    description: 'Spatial capture and 3D field evidence'
  },
  'GPR': {
    icon: Gauge,
    class: 'A',
    type: 'Advanced',
    minRole: 'Cheetah',
    requiresDroneLicense: false,
    description: 'Subsurface detection and non-invasive verification'
  },
  'Drone LiDAR': {
    icon: Plane,
    class: 'Aerial-A',
    type: 'Aerial Advanced',
    minRole: 'Cheetah',
    requiresDroneLicense: true,
    description: 'Aerial LiDAR capture requiring active drone authorization'
  }
};

const DEVICE_SCENARIOS = {
  valid: {
    label: 'Validated Device',
    severity: 'green',
    deviceName: 'Handheld LiDAR',
    certificateNo: 'CYX-2312',
    certNoAlt: 'EQ-LDR-2026-0081',
    serialNo: 'LDR-12345',
    registryStatus: 'Active',
    calibrationStatus: 'Current',
    lastCalibration: '2026-03-01',
    calibrationDue: '2027-03-01',
    custody: 'Organization-authorized / session-bound',
    message: 'Equipment validated. Device certificate confirmed and bound to session.'
  },
  expired: {
    label: 'Expired Equipment Certificate',
    severity: 'red',
    deviceName: 'Handheld LiDAR',
    certificateNo: 'CXY-2223',
    certNoAlt: 'EQ-LDR-2026-0081',
    serialNo: 'LDR-12345',
    registryStatus: 'Active',
    calibrationStatus: 'Expired',
    lastCalibration: '2026-03-01',
    calibrationDue: '2026-05-01',
    custody: 'Organization-authorized / session not permitted',
    message: 'Equipment certificate expired. Unable to continue with this equipment.'
  },
  unregistered: {
    label: 'Unregistered Device',
    severity: 'red',
    deviceName: 'Unknown Device',
    certificateNo: 'UNREGISTERED',
    certNoAlt: 'NO-REGISTRY-MATCH',
    serialNo: 'UNKNOWN',
    registryStatus: 'Not Found',
    calibrationStatus: 'Unknown',
    lastCalibration: 'Unknown',
    calibrationDue: 'Unknown',
    custody: 'Not authorized',
    message: 'No registry match found. Device cannot be used for certification-grade capture.'
  }
};

const SEGMENTS = [
  {
    id: 'SEG-A1-NST-00073',
    project: 'Downtown Utility Corridor',
    workOrder: 'WO-78452',
    assignment: 'Assigned',
    distanceKm: 0.3,
    geofence: 'Matched',
    window: 'Open',
    evidencePlan: 'Depth + Photo + Spatial Capture',
    status: 'Open'
  },
  {
    id: 'SEG-A1-NST-00074',
    project: 'Downtown Utility Corridor',
    workOrder: 'WO-78453',
    assignment: 'Assigned',
    distanceKm: 1.1,
    geofence: 'Matched',
    window: 'Open',
    evidencePlan: 'Photo + Measuring Rod',
    status: 'Open'
  },
  {
    id: 'SEG-A1-NST-00081',
    project: 'Northern Feeder Route',
    workOrder: 'WO-79118',
    assignment: 'Assigned',
    distanceKm: 18.7,
    geofence: 'Too Far',
    window: 'Open',
    evidencePlan: 'OTDR + Spatial Capture',
    status: 'Locked',
    reason: 'Outside approved geofence'
  },
  {
    id: 'SEG-A1-NST-00092',
    project: 'Downtown Utility Corridor',
    workOrder: 'WO-79990',
    assignment: 'Not Assigned',
    distanceKm: 0.6,
    geofence: 'Nearby',
    window: 'Open',
    evidencePlan: 'Photo + GPR',
    status: 'Locked',
    reason: 'Not assigned to authenticated user'
  },
  {
    id: 'SEG-A1-NST-00095',
    project: 'Bridge Road Extension',
    workOrder: 'WO-80022',
    assignment: 'Assigned',
    distanceKm: 2.1,
    geofence: 'Matched',
    window: 'Closed',
    evidencePlan: 'Photo + OTDR',
    status: 'Locked',
    reason: 'Capture window closed'
  }
];

const CONNECT_METHODS = [
  { label: 'QR scan', icon: ScanLine },
  { label: 'BLE pairing', icon: Radio },
  { label: 'USB tether', icon: Usb },
  { label: 'NFC tap', icon: Smartphone },
  { label: 'Serial lookup', icon: FileCheck2 },
  { label: 'OEM cloud sync', icon: RefreshCcw },
  { label: 'Supervisor fallback', icon: UserCheck }
];

const demoEmails = Object.keys(PERSONAS);

const canUseEquipment = (persona, equipmentName) => {
  const equipment = EQUIPMENT_TYPES[equipmentName];
  const roleOk = ROLE_RANK[persona.role] >= ROLE_RANK[equipment.minRole];
  const droneOk = !equipment.requiresDroneLicense || persona.droneLicenseValid;

  if (!roleOk) return { allowed: false, reason: `Requires ${equipment.minRole} certification` };
  if (!droneOk) return { allowed: false, reason: 'Drone license required' };
  return { allowed: true, reason: 'Available' };
};

const statusClasses = {
  green: 'bg-green-500/10 border-green-500/25 text-green-400',
  red: 'bg-red-500/10 border-red-500/25 text-red-400',
  amber: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
  blue: 'bg-blue-500/10 border-blue-500/25 text-blue-400',
  slate: 'bg-slate-800/50 border-white/5 text-slate-300'
};

const App = () => {
  const [view, setView] = useState('auth');
  const [loginEmail, setLoginEmail] = useState('julius.entry@dicri.demo');
  const [password, setPassword] = useState('');
  const [mfa, setMfa] = useState('');
  const [persona, setPersona] = useState(null);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState(null);
  const [deviceScenario, setDeviceScenario] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [fieldCalComplete, setFieldCalComplete] = useState(false);
  const [captures, setCaptures] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const resetSimulation = () => {
    setView('auth');
    setLoginEmail('julius.entry@dicri.demo');
    setPassword('');
    setMfa('');
    setPersona(null);
    setSelectedEquipmentType(null);
    setDeviceScenario(null);
    setSelectedSegment(null);
    setFieldCalComplete(false);
    setCaptures([]);
    setIsCapturing(false);
    setIsSyncing(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const resolvedPersona = PERSONAS[loginEmail] || PERSONAS['julius.entry@dicri.demo'];
    setPersona(resolvedPersona);
    setView('identity');
  };

  const handleSelectEquipment = (equipmentName) => {
    if (!persona) return;
    const permission = canUseEquipment(persona, equipmentName);
    if (!permission.allowed) return;
    setSelectedEquipmentType(equipmentName);
    setDeviceScenario(null);
    setView('connect_equipment');
  };

  const simulateDeviceConnection = (scenarioKey) => {
    setIsSyncing(true);
    setDeviceScenario(null);
    setTimeout(() => {
      const scenario = { ...DEVICE_SCENARIOS[scenarioKey], deviceName: selectedEquipmentType };
      setDeviceScenario(scenario);
      setIsSyncing(false);
      setView('equipment_result');
    }, 900);
  };

  const selectSegment = (segment) => {
    if (segment.status === 'Locked') return;
    setSelectedSegment(segment);
    setView('field_calibration');
  };

  const completeFieldCalibration = () => {
    setFieldCalComplete(true);
    setView('envelope');
  };

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setCaptures(prev => [{
        id: prev.length + 1,
        time: new Date().toLocaleTimeString(),
        type: selectedEquipmentType,
        segment: selectedSegment?.id,
        deviceCert: deviceScenario?.certificateNo
      }, ...prev]);
      setIsCapturing(false);
    }, 600);
  };

  const deviceIsValid = deviceScenario?.severity === 'green';

  const Shell = ({ children }) => (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans antialiased overflow-hidden flex flex-col">
      <div className="bg-[#0B1120] border-b border-white/5 p-3 z-50 shrink-0 shadow-xl overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-max">
          <div className="flex items-center space-x-2 text-blue-400">
            <Terminal size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Intake & Trust Gates Demo</span>
            {persona && (
              <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded text-white ml-2 uppercase">
                {persona.role} Session
              </span>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-slate-500">
            <span className={view === 'auth' ? 'text-blue-400' : ''}>Login</span>
            <ChevronRight size={12} />
            <span className={view === 'identity' ? 'text-blue-400' : ''}>Identity</span>
            <ChevronRight size={12} />
            <span className={['equipment_select', 'connect_equipment', 'equipment_result'].includes(view) ? 'text-blue-400' : ''}>Equipment</span>
            <ChevronRight size={12} />
            <span className={view === 'segment_select' ? 'text-blue-400' : ''}>Segment</span>
            <ChevronRight size={12} />
            <span className={view === 'field_calibration' ? 'text-blue-400' : ''}>Calibration</span>
            <ChevronRight size={12} />
            <span className={view === 'envelope' ? 'text-blue-400' : ''}>Envelope</span>
            <ChevronRight size={12} />
            <span className={view === 'capture' ? 'text-blue-400' : ''}>Capture</span>
          </div>

          <button onClick={resetSimulation} className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors" title="Reset demo">
            <RefreshCcw size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative bg-slate-950 p-6">
        {children}
      </div>
    </div>
  );

  return (
    <Shell>
      {/* 1. SECURE ACCESS */}
      {view === 'auth' && (
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="bg-slate-900/60 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl text-center space-y-8">
            <DICRILogo />
            <div className="text-left space-y-3 border-t border-white/10 pt-6">
              <h2 className="text-2xl font-black text-white">DICRI Secure Access</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Demo authentication simulates identity, MFA, organization, certification, and role validation before any capture session can begin.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">User ID / Email</label>
                <input
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="julius.entry@dicri.demo"
                  className="mt-2 w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type anything for demo"
                  type="password"
                  className="mt-2 w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Demo MFA Code</label>
                <input
                  value={mfa}
                  onChange={(e) => setMfa(e.target.value)}
                  placeholder="Any code"
                  className="mt-2 w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
              <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3">
                <Fingerprint size={18} /> Authenticate
              </button>
            </form>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl space-y-6">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Demo Personas</p>
              <h3 className="text-2xl font-black text-white mt-2">Pick a credential profile</h3>
              <p className="text-sm text-slate-400 mt-2">The user does not self-select authority. The platform returns authority after authentication.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {demoEmails.map(email => {
                const p = PERSONAS[email];
                return (
                  <button
                    key={email}
                    onClick={() => setLoginEmail(email)}
                    className={`p-4 rounded-3xl border text-left transition-all ${loginEmail === email ? 'bg-blue-600/20 border-blue-500/50' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl ${p.color} flex items-center justify-center text-white font-black`}>
                        {p.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-black text-white">{p.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.title}</p>
                      </div>
                      {p.droneLicenseValid && <Plane size={18} className="text-cyan-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. IDENTITY RECOGNIZED */}
      {view === 'identity' && persona && (
        <div className="max-w-4xl w-full bg-slate-900/70 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`h-20 w-20 rounded-[2rem] ${persona.color} flex items-center justify-center text-white font-black text-2xl shadow-2xl`}>
                {persona.initials}
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Identity Recognized</p>
                <h2 className="text-3xl font-black text-white mt-2">We see you, {persona.name}.</h2>
                <p className="text-sm text-slate-400 mt-1">{persona.title} · {persona.organization}</p>
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={16} /> Access Validated
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['MFA / Passkey', persona.mfaStatus, Fingerprint],
              ['Certification Tier', persona.role, Shield],
              ['Certification ID', persona.certificationId, BadgeCheck],
              ['Certification Status', persona.certificationStatus, CheckCircle2],
              ['Organization Status', persona.orgStatus, Building2],
              ['Drone License', persona.droneLicenseValid ? `Valid · ${persona.droneLicenseNumber}` : 'Not Active', Plane]
            ].map(([label, value, Icon]) => (
              <div key={label} className="p-5 bg-slate-950/50 border border-white/5 rounded-3xl flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-blue-400">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
                  <p className={`text-sm font-bold mt-1 ${label === 'Drone License' && !persona.droneLicenseValid ? 'text-amber-400' : 'text-white'}`}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <button onClick={() => setView('auth')} className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
              <ChevronLeft size={14} /> Back
            </button>
            <button onClick={() => setView('equipment_select')} className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3">
              Continue to Equipment Gate <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 3. EQUIPMENT TYPE SELECTION */}
      {view === 'equipment_select' && persona && (
        <div className="max-w-6xl w-full bg-slate-900/70 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Equipment Eligibility</p>
              <h2 className="text-3xl font-black text-white mt-2">What equipment will you use today?</h2>
              <p className="text-sm text-slate-400 mt-2 max-w-3xl">
                Availability is based on the authenticated user’s certification tier, specialized licenses, organization authorization, and the project evidence plan.
              </p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-950/60 border border-white/10">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">User Tier</p>
              <p className="text-sm font-black text-blue-400 mt-1">{persona.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Object.keys(EQUIPMENT_TYPES).map(eqName => {
              const eq = EQUIPMENT_TYPES[eqName];
              const Icon = eq.icon;
              const permission = canUseEquipment(persona, eqName);
              return (
                <button
                  key={eqName}
                  onClick={() => handleSelectEquipment(eqName)}
                  disabled={!permission.allowed}
                  className={`relative p-6 rounded-3xl border text-left transition-all overflow-hidden ${
                    permission.allowed
                      ? 'bg-slate-950/60 border-white/5 hover:border-blue-500/50 hover:bg-blue-600/10'
                      : 'bg-slate-950/30 border-white/5 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {!permission.allowed && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                      <Lock size={10} /> Locked
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-3xl ${permission.allowed ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Icon size={28} />
                    </div>
                    <div className="pr-8">
                      <p className="text-base font-black text-white">{eqName}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Class {eq.class} · {eq.type}</p>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed">{eq.description}</p>
                      <div className={`mt-4 inline-flex px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                        permission.allowed ? statusClasses.green : statusClasses.red
                      }`}>
                        {permission.reason}
                      </div>
                      {eq.requiresDroneLicense && (
                        <div className="mt-3 flex items-center gap-2 text-[10px] text-cyan-400 font-bold">
                          <Plane size={13} />
                          Drone Authorization Required
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button onClick={() => setView('identity')} className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
            <ChevronLeft size={14} /> Back to Identity
          </button>
        </div>
      )}

      {/* 4. CONNECT OR SCAN EQUIPMENT */}
      {view === 'connect_equipment' && selectedEquipmentType && (
        <div className="max-w-4xl w-full bg-slate-900/70 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          <div className="text-center space-y-4">
            <div className="inline-flex p-6 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 text-blue-400">
              {React.createElement(EQUIPMENT_TYPES[selectedEquipmentType].icon, { size: 42 })}
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Equipment Connection</p>
              <h2 className="text-3xl font-black text-white mt-2">Connect or scan equipment</h2>
              <p className="text-sm text-slate-400 mt-2">
                Selected equipment type: <span className="text-white font-bold">{selectedEquipmentType}</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-white/5 rounded-[2rem] p-6">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Production connection methods</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CONNECT_METHODS.map(({ label, icon: Icon }) => (
                <div key={label} className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex items-center gap-3">
                  <Icon size={16} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-slate-300">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
              Demo note: this screen simulates the equipment handshake. In production, DICRI could validate via QR scan, BLE pairing, USB tether, NFC tap, serial-number lookup, OEM cloud sync, or supervised manual fallback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button onClick={() => simulateDeviceConnection('valid')} disabled={isSyncing} className="p-5 bg-green-600/10 hover:bg-green-600/20 border border-green-500/25 rounded-3xl text-left transition-all">
              <CheckCircle2 size={24} className="text-green-400 mb-4" />
              <p className="font-black text-white">Simulate Valid Device</p>
              <p className="text-xs text-slate-400 mt-2">Active certificate and current OEM calibration.</p>
            </button>
            <button onClick={() => simulateDeviceConnection('expired')} disabled={isSyncing} className="p-5 bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/25 rounded-3xl text-left transition-all">
              <AlertCircle size={24} className="text-amber-400 mb-4" />
              <p className="font-black text-white">Simulate Expired Device</p>
              <p className="text-xs text-slate-400 mt-2">Registry match exists, but calibration is overdue.</p>
            </button>
            <button onClick={() => simulateDeviceConnection('unregistered')} disabled={isSyncing} className="p-5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/25 rounded-3xl text-left transition-all">
              <XCircle size={24} className="text-red-400 mb-4" />
              <p className="font-black text-white">Simulate Unregistered Device</p>
              <p className="text-xs text-slate-400 mt-2">No trusted registry record found.</p>
            </button>
          </div>

          {isSyncing && (
            <div className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px]">
              <RotateCw size={16} className="animate-spin" /> Syncing equipment registry
            </div>
          )}

          <button onClick={() => setView('equipment_select')} className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
            <ChevronLeft size={14} /> Back to Equipment Types
          </button>
        </div>
      )}

      {/* 5. EQUIPMENT VALIDATION RESULT */}
      {view === 'equipment_result' && deviceScenario && (
        <div className="max-w-4xl w-full bg-slate-900/70 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-3xl animate-in slide-in-from-bottom-8 duration-500">
          <div className={`p-10 text-center ${deviceIsValid ? 'bg-green-950/40' : 'bg-red-950/40'}`}>
            <div className={`inline-flex p-6 rounded-full mb-6 border-2 ${deviceIsValid ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
              {deviceIsValid ? <CheckCircle2 size={42} /> : <ShieldAlert size={42} />}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${deviceIsValid ? 'text-green-400' : 'text-red-400'}`}>
              Equipment Registry Result
            </p>
            <h2 className="text-3xl font-black text-white mt-2">{deviceIsValid ? 'Equipment Validated' : 'Capture Blocked'}</h2>
            <p className="text-sm text-slate-300 mt-3 max-w-xl mx-auto">{deviceScenario.message}</p>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Equipment Type', deviceScenario.deviceName, HardDrive],
              ['Certificate No.', deviceScenario.certificateNo, FileCheck2],
              ['Registry Record', deviceScenario.certNoAlt, BadgeCheck],
              ['Serial No.', deviceScenario.serialNo, KeyRound],
              ['Registry Status', deviceScenario.registryStatus, Shield],
              ['Calibration Status', deviceScenario.calibrationStatus, Gauge],
              ['Last Calibration', deviceScenario.lastCalibration, Clock],
              ['Calibration Due', deviceScenario.calibrationDue, Clock],
              ['Custody Model', deviceScenario.custody, UserCheck],
              ['Session Binding', deviceIsValid ? `${persona.name} · ${persona.role}` : 'Not permitted', UserRound]
            ].map(([label, value, Icon]) => (
              <div key={label} className={`p-5 rounded-3xl border ${label.includes('Calibration Status') && !deviceIsValid ? statusClasses.red : 'bg-slate-950/50 border-white/5'} flex items-center gap-4`}>
                <div className="p-3 bg-white/5 rounded-2xl text-blue-400">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
                  <p className="text-sm font-bold text-white mt-1">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-8 pb-8 flex flex-col md:flex-row gap-3">
            <button onClick={() => setView('connect_equipment')} className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
              <ChevronLeft size={14} /> Try Another Device
            </button>
            {deviceIsValid ? (
              <button onClick={() => setView('segment_select')} className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3">
                Continue to Segment Gate <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={() => setView('connect_equipment')} className="flex-1 py-5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 rounded-2xl font-black uppercase tracking-[0.25em] text-xs transition-all flex items-center justify-center gap-3">
                Select Replacement Device
              </button>
            )}
          </div>
        </div>
      )}

      {/* 6. SEGMENT ASSIGNMENT / GEOFENCE GATE */}
      {view === 'segment_select' && persona && (
        <div className="max-w-6xl w-full bg-slate-900/70 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          <div>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Segment Authorization</p>
            <h2 className="text-3xl font-black text-white mt-2">Assigned segments near you</h2>
            <p className="text-sm text-slate-400 mt-2">
              The platform separates assignment authority from geography. A user may be assigned but too far away, or nearby but not authorized.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {SEGMENTS.map(seg => {
              const isLocked = seg.status === 'Locked';
              return (
                <button
                  key={seg.id}
                  onClick={() => selectSegment(seg)}
                  disabled={isLocked}
                  className={`p-6 rounded-3xl border text-left transition-all ${
                    isLocked
                      ? 'bg-slate-950/30 border-white/5 opacity-70 cursor-not-allowed'
                      : 'bg-slate-950/60 border-white/5 hover:border-green-500/50 hover:bg-green-600/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{seg.project}</p>
                        <p className="text-lg font-black text-white mt-1">{seg.id}</p>
                        <p className="text-xs text-slate-400 mt-1">{seg.workOrder} · {seg.evidencePlan}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <MiniStatus label="Assignment" value={seg.assignment} good={seg.assignment === 'Assigned'} />
                        <MiniStatus label="Distance" value={`${seg.distanceKm} km`} good={seg.distanceKm <= 2.5} />
                        <MiniStatus label="Geofence" value={seg.geofence} good={seg.geofence === 'Matched'} />
                        <MiniStatus label="Window" value={seg.window} good={seg.window === 'Open'} />
                      </div>
                    </div>
                    <div className={`px-3 py-2 rounded-2xl border text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                      isLocked ? statusClasses.red : statusClasses.green
                    }`}>
                      {isLocked ? <Lock size={12} /> : <CheckCircle2 size={12} />}
                      {isLocked ? 'Locked' : 'Open'}
                    </div>
                  </div>
                  {isLocked && (
                    <div className="mt-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-3">
                      <AlertCircle size={16} /> {seg.reason}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button onClick={() => setView('equipment_result')} className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
            <ChevronLeft size={14} /> Back to Equipment Result
          </button>
        </div>
      )}

      {/* 7. FIELD CALIBRATION */}
      {view === 'field_calibration' && selectedSegment && (
        <div className="max-w-4xl w-full bg-slate-900/70 border border-white/10 rounded-[3rem] p-10 shadow-2xl backdrop-blur-3xl space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          <div className="text-center">
            <div className="inline-flex p-6 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-5">
              <Gauge size={42} />
            </div>
            <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em]">Pre-Capture Field Calibration</p>
            <h2 className="text-3xl font-black text-white mt-2">Field readiness required</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
              Registry calibration confirms the equipment certificate is valid. Field calibration confirms the device is ready for this specific segment and capture session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GateRow icon={CheckCircle2} label="Equipment registry calibration" value="Current" status="green" />
            <GateRow icon={CheckCircle2} label="Device/user session sync" value="Complete" status="green" />
            <GateRow icon={MapPin} label="Segment baseline" value="Pending" status="amber" />
            <GateRow icon={Gauge} label="Level / sensor check" value="Pending" status="amber" />
            <GateRow icon={Info} label="Environmental check" value="Pending" status="amber" />
            <GateRow icon={UserCheck} label="Operator confirmation" value="Pending" status="amber" />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <button onClick={() => setView('segment_select')} className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
              <ChevronLeft size={14} /> Back to Segments
            </button>
            <button onClick={completeFieldCalibration} className="flex-1 py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-amber-600/30 transition-all flex items-center justify-center gap-3">
              Complete Field Calibration <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 8. TRUSTED CAPTURE ENVELOPE */}
      {view === 'envelope' && persona && selectedSegment && deviceScenario && (
        <div className="max-w-5xl w-full bg-slate-900/70 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-3xl animate-in slide-in-from-bottom-8 duration-500">
          <div className="p-10 text-center bg-green-950/40">
            <div className="inline-flex p-6 rounded-full mb-6 border-2 border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.25)]">
              <Shield size={42} />
            </div>
            <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.3em]">Trusted Capture Envelope Created</p>
            <h2 className="text-3xl font-black text-white mt-2">Evidence may now be captured</h2>
            <p className="text-sm text-slate-300 mt-3 max-w-2xl mx-auto">
              All evidence captured in this session will be bound to verified identity, certified role, registered equipment, assigned segment, location, time, and calibration context.
            </p>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <GateRow icon={UserCheck} label="Authenticated User" value={persona.name} status="green" />
            <GateRow icon={Shield} label="Certified Role" value={`${persona.role} · ${persona.certificationId}`} status="green" />
            <GateRow icon={Building2} label="Organization" value={persona.organization} status="green" />
            <GateRow icon={HardDrive} label="Registered Equipment" value={`${selectedEquipmentType} · ${deviceScenario.certificateNo}`} status="green" />
            <GateRow icon={Gauge} label="Registry Calibration" value={deviceScenario.calibrationStatus} status="green" />
            <GateRow icon={CheckCircle2} label="Field Calibration" value={fieldCalComplete ? 'Complete' : 'Pending'} status={fieldCalComplete ? 'green' : 'amber'} />
            <GateRow icon={MapPin} label="Segment" value={selectedSegment.id} status="green" />
            <GateRow icon={Navigation} label="Geofence" value={selectedSegment.geofence} status="green" />
            <GateRow icon={Clock} label="Capture Window" value={selectedSegment.window} status="green" />
          </div>

          <div className="px-8 pb-8 flex flex-col md:flex-row gap-3">
            <button onClick={() => setView('field_calibration')} className="px-6 py-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
              <ChevronLeft size={14} /> Back to Calibration
            </button>
            <button onClick={() => setView('capture')} className="flex-1 py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-green-600/30 transition-all flex items-center justify-center gap-3">
              Enter Capture Workflow <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 9. ACTIVE CAPTURE */}
      {view === 'capture' && (
        <div className="flex flex-col h-full w-full max-w-6xl p-4 gap-4 animate-in slide-in-from-right-12 duration-700 overflow-hidden bg-slate-950">
          <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shrink-0 shadow-lg">
            <div className="flex items-center space-x-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Governed Session</span>
                <span className="text-xs font-mono font-bold text-blue-400">{selectedSegment?.id} :: {selectedEquipmentType}</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hidden md:flex items-center space-x-2 text-slate-300">
                <Navigation size={14} className="text-green-500" />
                <span className="text-[10px] font-bold tracking-tight">Geo-Bound · {deviceScenario?.certificateNo}</span>
              </div>
            </div>
            <button onClick={resetSimulation} className="p-2 hover:bg-white/5 rounded-xl transition-colors"><X size={18} className="text-slate-500" /></button>
          </div>

          <div className="flex-1 flex gap-4 overflow-hidden">
            <div className="flex-1 bg-slate-900 rounded-3xl relative overflow-hidden border border-white/5 shadow-2xl flex flex-col items-center justify-center">
              <Camera size={72} className={`text-slate-700 transition-all duration-300 ${isCapturing ? 'scale-90 text-blue-500' : ''}`} />
              <p className="mt-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] text-center max-w-xs leading-relaxed">
                Active trusted envelope for {persona?.name}
              </p>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <button onClick={handleCapture} disabled={isCapturing} className="h-20 w-20 bg-white p-1 rounded-full shadow-2xl active:scale-95 transition-all">
                  <div className="h-full w-full border-4 border-slate-900 rounded-full flex items-center justify-center">
                    {isCapturing ? <RotateCw className="animate-spin text-slate-900" size={24} /> : <div className="h-10 w-10 bg-slate-900/10 rounded-full" />}
                  </div>
                </button>
              </div>
            </div>

            <div className="w-80 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-xl">
              <div className="p-6 border-b border-white/5 bg-slate-900/40">
                <span className="text-sm font-black uppercase tracking-tight text-white font-mono">Evidence Log</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {captures.length === 0 && (
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 text-xs text-slate-500 leading-relaxed">
                    No evidence captured yet. Click the capture button to create a trust-bound evidence event.
                  </div>
                )}
                {captures.map((cap) => (
                  <div key={cap.id} className="p-4 bg-slate-950 border border-white/5 rounded-2xl space-y-3 animate-in slide-in-from-top-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-blue-400">{cap.type} #{cap.id}</span>
                      <CheckCircle2 size={12} className="text-green-500" />
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 flex flex-col gap-1">
                      <div className="flex justify-between"><span>TIMESTAMP</span> <span className="text-white font-bold">{cap.time}</span></div>
                      <div className="flex justify-between"><span>SEGMENT</span> <span className="text-slate-300">{cap.segment}</span></div>
                      <div className="flex justify-between"><span>DEVICE CERT</span> <span className="text-slate-300">{cap.deviceCert}</span></div>
                      <div className="flex justify-between"><span>LINK</span> <span className="text-slate-300">0x...{Math.random().toString(16).slice(2, 6).toUpperCase()}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
};

const MiniStatus = ({ label, value, good }) => (
  <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/5">
    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
    <p className={`text-xs font-black mt-1 ${good ? 'text-green-400' : 'text-amber-400'}`}>{value}</p>
  </div>
);

const GateRow = ({ icon: Icon, label, value, status = 'slate' }) => (
  <div className={`p-5 rounded-3xl border ${statusClasses[status]} flex items-center gap-4`}>
    <div className="p-3 bg-white/5 rounded-2xl">
      <Icon size={18} />
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-black uppercase tracking-widest opacity-70">{label}</p>
      <p className="text-sm font-bold text-white mt-1 truncate">{value}</p>
    </div>
  </div>
);

export default App;
