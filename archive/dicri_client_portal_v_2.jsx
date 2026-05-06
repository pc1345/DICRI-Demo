import React, { useState } from 'react';
import {
  Layout, Award, Box, Shield, Activity, FileText,
  Search, Bell, ChevronRight, TrendingUp, AlertTriangle,
  CheckCircle2, Map, History, Filter, Download,
  Database, X, Lock, Layers, MapPin, Clock,
  Gauge, AlertCircle, ChevronDown, Map as MapIcon,
  QrCode, Check, Calendar, HardDrive, Mail,
  Send, MessageSquare, Users, Route, ClipboardCheck,
  Smartphone, Radio, Fingerprint, Eye, Link2, Zap,
  RefreshCcw, CircleDot, ArrowRight, Building2, FileWarning,
  Workflow, Hash, Server, UserCheck, TimerReset, Archive,
  ExternalLink, CornerDownRight
} from 'lucide-react';

// --- OFFICIAL DICRI LOGO ---
const DICRILogo = ({ className = 'h-8' }) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    <div className="relative h-10 w-10">
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5L15 20V45C15 70 50 92 50 92C50 92 88 70 88 45V20L50 5Z" fill="#0F172A" stroke="#3B82F6" strokeWidth="2.5" />
        <path d="M35 35C48 35 48 65 58 65" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M35 42C48 42 48 58 58 58" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M35 50C48 50 48 50 58 50" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="80" cy="75" r="14" fill="#3B82F6" stroke="#0F172A" strokeWidth="2" />
        <path d="M74 75L78 79L86 71" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="hidden lg:flex flex-col leading-none">
      <span className="text-lg font-black tracking-tight text-white uppercase leading-none">DICRI</span>
      <span className="text-[7px] font-bold text-blue-400 uppercase tracking-widest mt-1">Client Portal</span>
    </div>
  </div>
);

const segments = [
  {
    id: 'SEG-PH-ELK-001', owner: 'Rivers State Fiber', assetId: 'FBR-PH-001', score: 96.2, grade: 'A-', status: 'Active',
    certNo: 'DICRI-BC-2026-00184', asce: 'B', corridor: 'Elekahia Road Corridor', location: 'Port Harcourt', openDigs: 2,
    confidence: 92, capturedBy: 'John Doe', level: 'Cheetah', type: 'Birth Certificate', length: '0.82 km',
    lifecycle: 'Certified', certStatus: 'Active Birth Cert', risk: 'Moderate', nextAction: 'Monitor CBYD notices', evidence: 98,
    startNode: 'PH-ELK-A01', endNode: 'PH-ELK-A09', capturePoints: 18, missingEvidence: 0, renewal: 'May 12, 2027'
  },
  {
    id: 'SEG-PH-TRA-002', owner: 'Rivers State Fiber', assetId: 'FBR-PH-002', score: 89.4, grade: 'B', status: 'In Review',
    certNo: 'DICRI-HC-2026-00088', asce: 'C', corridor: 'Trans-Amadi Industrial', location: 'Port Harcourt', openDigs: 0,
    confidence: 81, capturedBy: 'Amina Bello', level: 'Entry', type: 'Health Certificate', length: '1.14 km',
    lifecycle: 'Tiger Review', certStatus: 'Pending Health Cert', risk: 'Medium', nextAction: 'Tiger review required', evidence: 84,
    startNode: 'PH-TRA-B04', endNode: 'PH-TRA-B17', capturePoints: 22, missingEvidence: 2, renewal: 'Pending'
  },
  {
    id: 'SEG-LG-VI-099', owner: 'Lagos Urban Infra', assetId: 'WTR-LG-099', score: 94.8, grade: 'A', status: 'Active',
    certNo: 'DICRI-BC-2026-00210', asce: 'A', corridor: 'Victoria Island Network', location: 'Lagos', openDigs: 1,
    confidence: 95, capturedBy: 'M. Okafor', level: 'Tiger', type: 'Birth Certificate', length: '0.64 km',
    lifecycle: 'Certified', certStatus: 'Active Birth Cert', risk: 'Low', nextAction: 'No action required', evidence: 97,
    startNode: 'LG-VI-C11', endNode: 'LG-VI-C18', capturePoints: 15, missingEvidence: 0, renewal: 'Jun 02, 2027'
  },
  {
    id: 'SEG-PH-ABA-044', owner: 'Rivers State Fiber', assetId: 'FOC-PH-044', score: 72.1, grade: 'C', status: 'Quarantine',
    certNo: 'DICRI-QC-2026-00012', asce: 'D', corridor: 'Aba Road Corridor', location: 'Port Harcourt', openDigs: 4,
    confidence: 65, capturedBy: 'John Doe', level: 'Cheetah', type: 'Health Certificate', length: '1.42 km',
    lifecycle: 'Quarantine', certStatus: 'Certification Hold', risk: 'High', nextAction: 'Resolve conflicting evidence', evidence: 61,
    startNode: 'PH-ABA-D02', endNode: 'PH-ABA-D23', capturePoints: 26, missingEvidence: 5, renewal: 'Blocked'
  },
  {
    id: 'SEG-PH-RUM-017', owner: 'Rivers State Fiber', assetId: 'FBR-PH-017', score: 0, grade: 'N/A', status: 'Pre-Cert',
    certNo: 'Not Issued', asce: 'TBD', corridor: 'Rumuola Spur', location: 'Port Harcourt', openDigs: 0,
    confidence: 0, capturedBy: 'Unassigned', level: 'Pending', type: 'Pre-Certification', length: '0.95 km',
    lifecycle: 'Capture Scheduled', certStatus: 'No Certificate Yet', risk: 'Unknown', nextAction: 'Field capture scheduled', evidence: 18,
    startNode: 'PH-RUM-E01', endNode: 'PH-RUM-E10', capturePoints: 0, missingEvidence: 8, renewal: 'N/A'
  }
];

const messages = [
  { id: 'MSG-001', from: 'Rivers Permit Office', role: 'Municipal Partner', subject: 'CBYD-PH-00481 Conflict Detected', status: 'Unread', time: '10:42 AM', type: 'Alert', related: 'SEG-PH-ELK-001', sla: '2h 18m remaining', body: 'Potential conflict identified on Trans-Amadi corridor segment #002. Please review and acknowledge.' },
  { id: 'MSG-002', from: 'MetroFiber PH', role: 'Certified Field Partner', subject: 'Locate crew confirmation', status: 'Read', time: '9:18 AM', type: 'Partner', related: 'SEG-PH-TRA-002', sla: 'Closed', body: 'Field team dispatched for physical marking at Elekahia intersection.' },
  { id: 'MSG-003', from: 'DICRI System', role: 'System Notice', subject: 'Health Certificate Expiring', status: 'Read', time: 'Yesterday', type: 'System', related: 'SEG-PH-TRA-002', sla: '14 days', body: 'Segment SEG-PH-TRA-002 requires a health re-certification within 14 days.' }
];

const auditEvents = [
  { time: '2026-05-12 10:42:18', object: 'SEG-PH-ELK-001', actor: 'John Doe', role: 'Cheetah', event: 'Evidence Packet Submitted', layer: 'Evidence', hash: 'sha256:9f1c...a84b', status: 'Verified' },
  { time: '2026-05-12 10:44:07', object: 'FBR-PH-001', actor: 'DICRI Policy Engine', role: 'System', event: 'Depth Precision Rule Passed', layer: 'Policy', hash: 'sha256:4d7a...11c2', status: 'Verified' },
  { time: '2026-05-12 10:48:52', object: 'DEVICE-LDR-8842', actor: 'Device Registry', role: 'System', event: 'Device Registry Validated', layer: 'Device', hash: 'sha256:7b92...3cd0', status: 'Verified' },
  { time: '2026-05-12 11:03:11', object: 'DICRI-BC-2026-00184', actor: 'M. Okafor', role: 'Tiger', event: 'Certificate Approved', layer: 'Adjudication', hash: 'sha256:aab0...661f', status: 'Verified' },
  { time: '2026-05-12 11:06:44', object: 'CBYD-2026-00128', actor: 'Rivers Permit Office', role: 'Partner', event: 'Dig Notice Routed', layer: 'Communication', hash: 'sha256:0e18...dd91', status: 'Verified' },
  { time: '2026-05-12 11:11:29', object: 'SEG-PH-ABA-044', actor: 'DICRI Policy Engine', role: 'System', event: 'Quarantine Triggered', layer: 'Risk', hash: 'sha256:33af...e101', status: 'Verified' }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSegment, setActiveSegment] = useState(null);
  const [segmentWorkflow, setSegmentWorkflow] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [acknowledgedNotices, setAcknowledgedNotices] = useState(new Set());

  const PortfolioOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIBox label="Certified Assets" value="1,284" trend="+6.8%" icon={Box} color="text-blue-400" />
        <KPIBox label="Active Certificates" value="642" trend="+14.3%" icon={Award} color="text-green-400" />
        <KPIBox label="Avg Integrity Score" value="94.2" trend="+2.8" icon={Shield} color="text-purple-400" />
        <KPIBox label="Portfolio Grade" value="A-" trend="STABLE" icon={Activity} color="text-blue-500" />
      </div>

      <ActionStrip onJump={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <IntegrityTrendChart />
          <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <h3 className="text-lg font-black uppercase tracking-tight">Recent Activity Ledger</h3>
              <button onClick={() => setActiveTab('certs')} className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:underline">Full Register</button>
            </div>
            <SegmentTable data={segments.slice(0, 4)} onSelect={setActiveSegment} />
          </div>
        </div>
        <div className="space-y-8">
          <ResilienceMixCard />
          <AlertCard />
        </div>
      </div>
    </div>
  );

  const CertificateLedgerView = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Certificate Register</h2>
            <p className="text-slate-500 text-sm mt-1">Immutable ledger of all governed infrastructure records.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
              <Filter size={18} /> Asset Filter
            </button>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3">
              <Download size={18} /> Export CSV
            </button>
          </div>
        </div>
        <SegmentTable data={segments.filter(s => s.certNo !== 'Not Issued')} onSelect={setActiveSegment} />
      </div>
    </div>
  );

  const ManagedAssetsView = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPIBox label="Managed Segments" value="1,642" trend="LIVE" icon={Database} color="text-blue-400" />
        <KPIBox label="Certified" value="1,284" trend="78%" icon={Award} color="text-green-400" />
        <KPIBox label="Pending Review" value="218" trend="+31" icon={ClipboardCheck} color="text-amber-400" />
        <KPIBox label="At Risk" value="42" trend="WATCH" icon={AlertTriangle} color="text-red-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Managed Assets</h2>
              <p className="text-slate-500 text-sm mt-1">All customer infrastructure under DICRI governance — certified, pending, or pre-certification.</p>
            </div>
            <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 flex items-center gap-3">
              <Layers size={18} /> Lifecycle Filter
            </button>
          </div>
          <AssetLifecycleTable data={segments} onOpenSegment={setSegmentWorkflow} onOpenCert={setActiveSegment} />
        </div>

        <div className="space-y-8">
          <LifecycleFunnel />
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-[3rem] p-8 space-y-6 shadow-2xl shadow-blue-900/10">
            <div className="flex items-center gap-4 text-blue-400">
              <Workflow size={24} />
              <span className="text-[12px] font-black uppercase tracking-[0.3em]">Segment Before Certificate</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Assets appear here before certification. The customer can track capture readiness, evidence completeness, Tiger review status, and blockers before a Birth or Health Certificate is issued.
            </p>
            <button onClick={() => setSegmentWorkflow(segments[4])} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-600/20">Open Pre-Cert Segment</button>
          </div>
        </div>
      </div>
    </div>
  );

  const CBYDExposureView = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Corridor Conflict Map</h3>
                <p className="text-slate-500 text-xs">Port Harcourt Trans-Amadi & Elekahia Grid Review</p>
              </div>
              <div className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">4 Potential Conflicts</div>
            </div>
            <CorridorMap />
            <div className="grid grid-cols-4 gap-4">
              <MapKPI label="Assets in Buffer" val="18" icon={Layers} color="text-blue-400" />
              <MapKPI label="DICRI Verified" val="12" icon={CheckCircle2} color="text-green-400" />
              <MapKPI label="Potential Risks" val="4" icon={AlertCircle} color="text-red-400" />
              <MapKPI label="Portfolio A-" icon={Shield} color="text-purple-400" val="94.2" />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <NoticeLedgerCard onAcknowledge={(id) => setAcknowledgedNotices(prev => new Set([...prev, id]))} ackList={acknowledgedNotices} />
          <AlertCard />
        </div>
      </div>
    </div>
  );

  const HealthTrendsView = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPIBox label="Portfolio Integrity" value="94.2" trend="+2.8" icon={Gauge} color="text-blue-400" />
        <KPIBox label="Trending Down" value="7" trend="WATCH" icon={TrendingUp} color="text-red-400" />
        <KPIBox label="Health Due" value="18" trend="30D" icon={Calendar} color="text-amber-400" />
        <KPIBox label="Avg Response SLA" value="4h" trend="-18%" icon={Clock} color="text-green-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3"><HealthGraph title="Integrity by Corridor" subtitle="Trust score movement across governed corridors" type="line" /></div>
        <div className="lg:col-span-2"><HealthGraph title="Certificate Mix Production" subtitle="Birth, Health, and Renewal activity outcomes" type="bar" /></div>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">Degradation Watchlist</h3>
            <p className="text-slate-500 text-xs mt-1">Segments with declining confidence, renewal pressure, or unresolved lifecycle risk.</p>
          </div>
          <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 flex items-center gap-3"><RefreshCcw size={16} /> Refresh</button>
        </div>
        <DegradationTable />
      </div>
    </div>
  );

  const CommunicationsView = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[720px]">
        <div className="lg:col-span-3 bg-slate-900/40 border border-white/5 rounded-[3rem] p-6 shadow-3xl">
          <div className="p-4 border-b border-white/5 mb-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Comms Ledger</h2>
            <p className="text-slate-500 text-xs mt-1">Governed correspondence tied to assets, partners, notices, and reviews.</p>
          </div>
          <div className="space-y-3">
            {messages.map((m) => (
              <button key={m.id} onClick={() => setSelectedMessage(m)} className={`w-full text-left p-5 rounded-[2rem] border transition-all ${selectedMessage?.id === m.id ? 'bg-blue-600/10 border-blue-500/30 shadow-xl' : 'bg-slate-950/40 border-white/5 hover:border-white/10'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${m.status === 'Unread' ? 'text-blue-400' : 'text-slate-500'}`}>{m.type}</span>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{m.time}</span>
                </div>
                <p className="text-sm font-black text-white leading-tight">{m.subject}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest">{m.related}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 shadow-3xl flex flex-col">
          <div className="border-b border-white/5 pb-8 mb-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">{selectedMessage.from}</p>
                <h2 className="text-3xl font-black text-white tracking-tight mt-2">{selectedMessage.subject}</h2>
                <p className="text-slate-500 text-xs mt-2">{selectedMessage.role} • Related to {selectedMessage.related}</p>
              </div>
              <StatusPill label={selectedMessage.status} tone={selectedMessage.status === 'Unread' ? 'blue' : 'slate'} />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <MessageBubble actor={selectedMessage.from} role={selectedMessage.role} body={selectedMessage.body} inbound />
            <MessageBubble actor="DICRI System" role="System Event" body="This communication has been linked to the governed segment record and included in the communications audit ledger." />
          </div>

          <div className="pt-8 border-t border-white/5 mt-8 space-y-4">
            <textarea className="w-full h-32 bg-slate-950 border border-white/5 rounded-[2rem] p-6 text-sm text-slate-300 resize-none outline-none focus:border-blue-500/30 shadow-inner" placeholder="Write a governed response..." />
            <div className="flex gap-4">
              <button className="flex-1 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 active:scale-95"><Send size={18} /> Send & Log Communication</button>
              <button className="px-8 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] flex items-center gap-3"><Archive size={18} /> Attach File</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <GovernanceContextCard message={selectedMessage} />
          <PartnerDirectoryCard />
        </div>
      </div>
    </div>
  );

  const AuditView = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPIBox label="Audit Events" value="48,292" trend="LIVE" icon={History} color="text-blue-400" />
        <KPIBox label="Verified Hashes" value="100%" trend="OK" icon={Hash} color="text-green-400" />
        <KPIBox label="Open Exceptions" value="3" trend="LOW" icon={FileWarning} color="text-amber-400" />
        <KPIBox label="Chain Status" value="Intact" trend="STABLE" icon={Shield} color="text-purple-400" />
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-3xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Master Audit Ledger</h2>
            <p className="text-slate-500 text-sm">Immutable provenance for every atomic platform event.</p>
          </div>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3">
            <Shield size={18} /> Verify Integrity
          </button>
        </div>
        <AuditTimeline events={auditEvents} />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans antialiased overflow-hidden">
      <aside className="w-64 bg-[#0B1120] border-r border-white/5 flex flex-col p-6 shrink-0 z-20">
        <DICRILogo className="mb-12" />
        <div className="space-y-1 flex-1">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 px-4">Navigation</p>
          <SidebarNavItem id="overview" icon={Layout} label="Portfolio Overview" active={activeTab === 'overview'} onClick={setActiveTab} />
          <SidebarNavItem id="certs" icon={Award} label="Certificate Register" active={activeTab === 'certs'} onClick={setActiveTab} />
          <SidebarNavItem id="assets" icon={Database} label="Managed Assets" active={activeTab === 'assets'} onClick={setActiveTab} />
          <SidebarNavItem id="cbyd" icon={Map} label="CBYD Exposure" active={activeTab === 'cbyd'} onClick={setActiveTab} />
          <SidebarNavItem id="comms" icon={Mail} label="Communications" active={activeTab === 'comms'} onClick={setActiveTab} />
          <SidebarNavItem id="trends" icon={Activity} label="Health Trends" active={activeTab === 'trends'} onClick={setActiveTab} />
          <SidebarNavItem id="audit" icon={History} label="Audit Trail" active={activeTab === 'audit'} onClick={setActiveTab} />

          <div className="pt-10 mb-4 px-4 opacity-40 grayscale">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
              <Lock size={10} /> DICRI Ops (Locked)
            </p>
          </div>
          <SidebarNavItem id="internal" icon={Layers} label="Master Warehouse" disabled onClick={() => {}} />
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="p-4 bg-slate-950 rounded-3xl border border-white/5 flex items-center space-x-3 shadow-2xl">
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center font-black text-sm border border-white/10 shadow-lg">CF</div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black truncate text-white">City Fiber Network</span>
              <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mt-1">Asset Owner Portal</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#0B1120]/90 backdrop-blur-xl z-10 shrink-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Asset Intelligence</h2>
            <span className="text-slate-800">/</span>
            <h2 className="text-xs font-black text-white uppercase tracking-widest">{activeTab === 'certs' ? 'Certificate Register' : activeTab === 'cbyd' ? 'CBYD Exposure' : activeTab === 'comms' ? 'Communications Ledger' : activeTab === 'trends' ? 'Health Trends' : activeTab === 'audit' ? 'Audit Trail' : activeTab === 'assets' ? 'Managed Assets' : 'Overview'}</h2>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="text" placeholder="Global Ledger Search..." className="bg-slate-950 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-500/20 transition-all w-96 text-slate-200 shadow-inner" />
            </div>
            <button className="relative p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all group">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-red-600 rounded-full border-2 border-[#0B1120]" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-[#020617] scroll-smooth relative">
          {activeTab === 'overview' && <PortfolioOverview />}
          {activeTab === 'certs' && <CertificateLedgerView />}
          {activeTab === 'assets' && <ManagedAssetsView />}
          {activeTab === 'cbyd' && <CBYDExposureView />}
          {activeTab === 'comms' && <CommunicationsView />}
          {activeTab === 'trends' && <HealthTrendsView />}
          {activeTab === 'audit' && <AuditView />}
        </div>
      </main>

      {activeSegment && <CertificateDetailModal segment={activeSegment} onClose={() => setActiveSegment(null)} onAudit={() => { setActiveSegment(null); setActiveTab('audit'); }} onSegment={() => { setSegmentWorkflow(activeSegment); setActiveSegment(null); }} />}
      {segmentWorkflow && <SegmentWorkflowModal segment={segmentWorkflow} onClose={() => setSegmentWorkflow(null)} onCert={() => { setActiveSegment(segmentWorkflow); setSegmentWorkflow(null); }} />}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const KPIBox = ({ label, value, trend, icon: Icon, color }) => (
  <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] hover:border-blue-500/40 transition-all group shadow-inner">
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 bg-white/5 group-hover:bg-white/10 rounded-2xl ${color} transition-all shadow-lg`}><Icon size={24} /></div>
      <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${trend.startsWith('+') || trend === 'OK' || trend === 'LIVE' ? 'bg-green-500/10 text-green-500' : trend === 'WATCH' ? 'bg-red-500/10 text-red-500' : 'bg-slate-800 text-slate-400 shadow-inner'}`}>{trend}</span>
    </div>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">{label}</p>
    <p className="text-4xl font-black text-white mt-2 leading-none tracking-tight">{value}</p>
  </div>
);

const ActionStrip = ({ onJump }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <ActionCard tone="amber" icon={AlertTriangle} title="2 CBYD notices need acknowledgement" sub="Conflict detected on PH corridor buffer zone" action="Review notices" onClick={() => onJump('cbyd')} />
    <ActionCard tone="red" icon={FileWarning} title="1 segment is in quarantine" sub="Aba Road requires conflict adjudication" action="Open assets" onClick={() => onJump('assets')} />
    <ActionCard tone="blue" icon={Calendar} title="18 health renewals due" sub="Renewal window inside next 30 days" action="View trends" onClick={() => onJump('trends')} />
  </div>
);

const ActionCard = ({ icon: Icon, title, sub, action, onClick, tone }) => {
  const toneMap = {
    amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
    red: 'border-red-500/20 bg-red-500/5 text-red-400',
    blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400'
  };
  return (
    <button onClick={onClick} className={`p-6 rounded-[2rem] border ${toneMap[tone]} flex items-center justify-between text-left hover:bg-white/[0.06] transition-all group`}>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-2xl"><Icon size={22} /></div>
        <div>
          <p className="text-sm font-black text-white uppercase tracking-tight">{title}</p>
          <p className="text-[10px] font-bold text-slate-500 mt-1">{sub}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-70 group-hover:opacity-100">
        {action} <ArrowRight size={14} />
      </div>
    </button>
  );
};

const SidebarNavItem = ({ id, icon: Icon, label, active, disabled, onClick }) => (
  <button
    onClick={() => !disabled && onClick(id)}
    className={`w-full flex items-center justify-between px-5 py-4 rounded-[1.25rem] transition-all group ${
      active ? 'bg-blue-600 text-white shadow-[0_15px_30px_rgba(37,99,235,0.25)] scale-105 z-10' :
      disabled ? 'opacity-30 cursor-not-allowed' : 'text-slate-500 hover:text-white hover:bg-white/5'
    }`}
  >
    <div className="flex items-center space-x-4">
      <Icon size={20} />
      <span className="text-sm font-black tracking-tight uppercase leading-none">{label}</span>
    </div>
    {active && <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
    {disabled && <Lock size={12} />}
  </button>
);

const SegmentTable = ({ data, onSelect }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] border-b border-white/5">
          <th className="px-12 py-6">Identifier</th>
          <th className="px-12 py-6 text-center">ASCE Level</th>
          <th className="px-12 py-6 text-center">Trust Score</th>
          <th className="px-12 py-6">Status</th>
          <th className="px-12 py-6 text-right">Certificate</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data.map((seg) => (
          <tr key={seg.id} onClick={() => onSelect(seg)} className="group hover:bg-white/[0.04] transition-all cursor-pointer">
            <td className="px-12 py-8">
              <div className="flex flex-col">
                <span className="text-lg font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-none">{seg.id}</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest">{seg.assetId}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black border uppercase ${seg.type === 'Birth Certificate' ? 'border-green-500/20 text-green-500 bg-green-500/5' : 'border-blue-500/20 text-blue-500 bg-blue-500/5'}`}>{seg.type.split(' ')[0]}</span>
                </div>
              </div>
            </td>
            <td className="px-12 py-8 text-center"><ASCEBadge level={seg.asce} /></td>
            <td className="px-12 py-8 text-center">
              <div className="flex flex-col items-center">
                <span className="font-black text-white text-lg">{seg.score ? `${seg.score}%` : 'Pending'}</span>
                <span className="text-[10px] font-black text-blue-500 tracking-[0.2em] uppercase">{seg.grade}</span>
              </div>
            </td>
            <td className="px-12 py-8"><StatusBadge status={seg.status} /></td>
            <td className="px-12 py-8 text-right"><ChevronRight size={24} className="ml-auto text-slate-800 group-hover:text-white group-hover:translate-x-2 transition-all" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AssetLifecycleTable = ({ data, onOpenSegment, onOpenCert }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="text-[10px] font-black text-slate-600 uppercase tracking-[0.35em] border-b border-white/5">
          <th className="px-6 py-6">Segment</th>
          <th className="px-6 py-6">Lifecycle</th>
          <th className="px-6 py-6">Evidence</th>
          <th className="px-6 py-6">Risk</th>
          <th className="px-6 py-6">Next Action</th>
          <th className="px-6 py-6 text-right">Open</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data.map((seg) => (
          <tr key={seg.id} className="group hover:bg-white/[0.03] transition-all">
            <td className="px-6 py-7">
              <p className="text-sm font-black text-white uppercase leading-none">{seg.id}</p>
              <p className="text-[10px] font-mono text-slate-500 mt-2 tracking-widest">{seg.corridor}</p>
            </td>
            <td className="px-6 py-7"><LifecycleBadge state={seg.lifecycle} /></td>
            <td className="px-6 py-7"><EvidenceBar value={seg.evidence} /></td>
            <td className="px-6 py-7"><RiskBadge risk={seg.risk} /></td>
            <td className="px-6 py-7 text-xs font-bold text-slate-300">{seg.nextAction}</td>
            <td className="px-6 py-7 text-right">
              <div className="flex justify-end gap-2">
                <button onClick={() => onOpenSegment(seg)} className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all"><Eye size={16} /></button>
                {seg.certNo !== 'Not Issued' && <button onClick={() => onOpenCert(seg)} className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-green-600 transition-all"><Award size={16} /></button>}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LifecycleFunnel = () => (
  <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 space-y-7 shadow-2xl">
    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600">Lifecycle Distribution</h3>
    {[
      ['Pre-Certification', 126, 'bg-slate-500'],
      ['Capture Scheduled', 84, 'bg-blue-500'],
      ['Tiger Review', 218, 'bg-amber-500'],
      ['Certified', 1284, 'bg-green-500'],
      ['Quarantine', 42, 'bg-red-500']
    ].map(([label, val, color]) => (
      <div key={label} className="space-y-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span className="text-slate-500">{label}</span><span className="text-white">{val}</span></div>
        <div className="h-2 bg-slate-950 rounded-full overflow-hidden"><div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min((val / 1284) * 100, 100)}%` }} /></div>
      </div>
    ))}
  </div>
);

const CertificateDetailModal = ({ segment, onClose, onAudit, onSegment }) => (
  <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-8 animate-in zoom-in-95 duration-500">
    <div className="max-w-7xl w-full bg-[#0B1120] border border-white/10 rounded-[4rem] shadow-3xl overflow-hidden flex flex-col h-[94vh]">
      <div className="px-12 py-10 border-b border-white/5 flex items-start justify-between bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="flex items-center space-x-6">
          <div className="p-5 bg-blue-600/20 rounded-[2rem] border border-blue-500/20 shadow-2xl shadow-blue-600/20"><QrCode size={42} className="text-blue-500" /></div>
          <div className="space-y-2">
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{segment.id}</h2>
            <div className="flex items-center gap-3"><StatusBadge status={segment.status} /><span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] px-3 py-1 bg-white/5 rounded-full border border-white/5">Geometric {segment.type} v1.2</span></div>
          </div>
        </div>
        <button onClick={onClose} className="p-5 bg-white/5 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-white group"><X size={36} className="group-hover:rotate-90 transition-transform duration-300" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-[#020617]/50">
        <div className="grid grid-cols-4 gap-6">
          <DetailMetric label="Resilience Grade" val={segment.grade} trend="STABLE" icon={TrendingUp} color="text-green-500" />
          <DetailMetric label="Integrity Score" val={`${segment.score}%`} trend="+1.2" icon={Shield} color="text-blue-500" />
          <DetailMetric label="ASCE Quality" val={`Level ${segment.asce}`} trend="CERTIFIED" icon={Award} color="text-purple-400" />
          <DetailMetric label="Utility Confidence" val={`${segment.confidence}%`} trend="HIGH" icon={Gauge} color="text-amber-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-slate-950 p-10 rounded-[3.5rem] border border-white/5 space-y-8 shadow-inner">
              <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] px-2">Certification Detail</h4>
              <div className="space-y-5 px-2">
                <SummaryRow label="Certificate No" val={segment.certNo} mono />
                <SummaryRow label="Asset Owner" val={segment.owner} />
                <SummaryRow label="Asset ID" val={segment.assetId} mono />
                <SummaryRow label="Corridor" val={segment.corridor} />
                <SummaryRow label="Location" val={segment.location} />
                <SummaryRow label="Segment Length" val={segment.length} />
              </div>
            </div>
            <SegmentGeometryPanel segment={segment} />
          </div>

          <div className="lg:col-span-3 space-y-10">
            <div className="grid grid-cols-2 gap-8">
              <TeamTrustCard segment={segment} />
              <EvidenceOutcomesCard />
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] px-4">Certification Artifacts</h4>
              <div className="grid grid-cols-2 gap-4">
                <ArtifactBox icon={FileText} label="Birth Certificate PDF" size="2.4 MB" date="MAY 12, 2026" />
                <ArtifactBox icon={Database} label="Evidence Manifest" size="812 KB" date="MAY 12, 2026" />
                <ArtifactBox icon={HardDrive} label="Notarized Point Cloud" size="142 MB" date="MAY 12, 2026" />
                <ArtifactBox icon={History} label="Chain-of-Custody Log" size="1.1 MB" date="MAY 12, 2026" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8 bg-[#0B1120] border-t border-white/5 grid grid-cols-4 gap-4 z-10">
        <button className="col-span-2 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-3xl shadow-blue-600/40 transition-all flex items-center justify-center gap-5 active:scale-95"><Download size={26} /> Generate Audit Package</button>
        <button onClick={onSegment} className="py-6 border border-white/10 hover:border-white/20 text-white rounded-[2rem] font-black uppercase tracking-[0.25em] text-[10px] transition-all flex items-center justify-center gap-4 hover:bg-white/5"><Route size={22} /> Segment History</button>
        <button onClick={onAudit} className="py-6 border border-white/10 hover:border-white/20 text-white rounded-[2rem] font-black uppercase tracking-[0.25em] text-[10px] transition-all flex items-center justify-center gap-4 hover:bg-white/5"><History size={22} /> Full Audit Trail</button>
      </div>
    </div>
  </div>
);

const SegmentWorkflowModal = ({ segment, onClose, onCert }) => (
  <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[210] flex items-center justify-center p-8 animate-in zoom-in-95 duration-500">
    <div className="max-w-6xl w-full bg-[#0B1120] border border-white/10 rounded-[4rem] shadow-3xl overflow-hidden flex flex-col max-h-[92vh]">
      <div className="px-12 py-10 border-b border-white/5 flex items-start justify-between bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-purple-600/20 rounded-[2rem] border border-purple-500/20"><Route size={42} className="text-purple-400" /></div>
          <div>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">{segment.id}</h2>
            <p className="text-slate-500 text-sm mt-3">Segment-level governance record before, during, and after certification.</p>
          </div>
        </div>
        <button onClick={onClose} className="p-5 bg-white/5 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-white"><X size={36} /></button>
      </div>

      <div className="overflow-y-auto p-12 space-y-10 bg-[#020617]/50">
        <div className="grid grid-cols-4 gap-5">
          <SegmentStateCard label="Lifecycle State" val={segment.lifecycle} icon={Workflow} tone="blue" />
          <SegmentStateCard label="Evidence Complete" val={`${segment.evidence}%`} icon={ClipboardCheck} tone="green" />
          <SegmentStateCard label="Missing Items" val={segment.missingEvidence} icon={FileWarning} tone={segment.missingEvidence > 0 ? 'amber' : 'green'} />
          <SegmentStateCard label="Risk Level" val={segment.risk} icon={AlertTriangle} tone={segment.risk === 'High' ? 'red' : segment.risk === 'Medium' ? 'amber' : 'blue'} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-slate-950 p-10 rounded-[3.5rem] border border-white/5 shadow-inner">
            <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-10">Certification Workflow</h4>
            <WorkflowStepper segment={segment} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <SegmentGeometryPanel segment={segment} compact />
            <div className="bg-slate-950 p-8 rounded-[3rem] border border-white/5 space-y-5">
              <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Segment Facts</h4>
              <SummaryRow label="Start Node" val={segment.startNode} mono />
              <SummaryRow label="End Node" val={segment.endNode} mono />
              <SummaryRow label="Length" val={segment.length} />
              <SummaryRow label="Capture Points" val={String(segment.capturePoints)} />
              <SummaryRow label="Next Action" val={segment.nextAction} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8 bg-[#0B1120] border-t border-white/5 flex gap-4">
        {segment.certNo !== 'Not Issued' && <button onClick={onCert} className="flex-1 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-4"><Award size={22} /> Open Certificate</button>}
        <button className="flex-1 py-6 border border-white/10 hover:border-white/20 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-white/5"><MessageSquare size={22} /> Open Related Communications</button>
      </div>
    </div>
  </div>
);

const SegmentGeometryPanel = ({ segment, compact }) => (
  <div className={`bg-slate-950 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl ${compact ? 'p-7' : 'p-8'}`}>
    <div className="flex items-center justify-between mb-7">
      <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Segment Geometry</h4>
      <span className="text-[9px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">GIS Anchored</span>
    </div>
    <div className={`${compact ? 'h-52' : 'h-72'} rounded-[2.5rem] bg-[#020617] border border-white/5 relative overflow-hidden mb-7`}>
      <svg viewBox="0 0 600 260" className="absolute inset-0 w-full h-full">
        <rect width="600" height="260" fill="#020617" />
        {[70, 130, 190].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.035)" />)}
        {[100, 220, 340, 460].map(x => <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="rgba(255,255,255,0.035)" />)}
        <path d="M60 170 C160 70, 260 90, 350 135 S500 190, 545 80" fill="none" stroke="rgba(59,130,246,0.18)" strokeWidth="28" strokeLinecap="round" />
        <path d="M60 170 C160 70, 260 90, 350 135 S500 190, 545 80" fill="none" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" />
        {[60, 145, 230, 315, 405, 490, 545].map((x, i) => <circle key={i} cx={x} cy={i === 0 ? 170 : i === 1 ? 105 : i === 2 ? 95 : i === 3 ? 125 : i === 4 ? 165 : i === 5 ? 150 : 80} r="7" fill="#22C55E" stroke="#020617" strokeWidth="4" />)}
        {segment.risk === 'High' && <circle cx="405" cy="165" r="58" fill="#EF4444" fillOpacity="0.07" stroke="#EF4444" strokeWidth="2" strokeDasharray="8 8" />}
      </svg>
      <div className="absolute left-6 bottom-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400"><MapPin size={16} className="text-blue-500" /> {segment.startNode} → {segment.endNode}</div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      <MiniStat label="Length" val={segment.length} />
      <MiniStat label="Capture Pts" val={segment.capturePoints} />
      <MiniStat label="Missing" val={segment.missingEvidence} />
    </div>
  </div>
);

const TeamTrustCard = ({ segment }) => (
  <div className="bg-slate-950 p-10 rounded-[3.5rem] border border-white/5 space-y-8 shadow-inner">
    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Approved Team</h4>
    <div className="space-y-6">
      <div className="flex items-center gap-5"><div className="h-12 w-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center font-black text-sm text-white shadow-xl shadow-blue-600/20">{segment.capturedBy[0]}</div><div><p className="text-sm font-black text-white">{segment.capturedBy}</p><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{segment.level} Certified</p></div></div>
      <div className="space-y-4 border-t border-white/10 pt-6">
        <TrustRow icon={Smartphone} label="Device Class" val="Class A-Native" tone="blue" />
        <TrustRow icon={Fingerprint} label="MFA Session" val="Verified-Secure" tone="green" />
        <TrustRow icon={Radio} label="Capture Mode" val="Device-bound" tone="purple" />
      </div>
    </div>
  </div>
);

const EvidenceOutcomesCard = () => (
  <div className="bg-slate-950 p-10 rounded-[3.5rem] border border-white/5 space-y-8 shadow-inner">
    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Evidence Outcomes</h4>
    <div className="space-y-4">
      <CheckItem label="Depth Precision Check" />
      <CheckItem label="Native LiDAR Point Cloud" />
      <CheckItem label="OTDR Attachment Logged" />
      <CheckItem label="Hardware Attestation" />
      <CheckItem label="Geofence Validation" />
    </div>
  </div>
);

const WorkflowStepper = ({ segment }) => {
  const steps = ['Asset Intake', 'Capture Scheduled', 'Evidence Submitted', 'Policy Evaluation', 'Tiger Review', 'Certificate Issued'];
  const activeIndex = segment.lifecycle === 'Certified' ? 5 : segment.lifecycle === 'Tiger Review' ? 4 : segment.lifecycle === 'Quarantine' ? 3 : segment.lifecycle === 'Capture Scheduled' ? 1 : 0;
  return (
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-5">
          <div className={`h-11 w-11 rounded-2xl flex items-center justify-center border font-black text-xs ${i < activeIndex ? 'bg-green-500/10 text-green-500 border-green-500/30' : i === activeIndex ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-600/20' : 'bg-white/5 text-slate-600 border-white/10'}`}>{i < activeIndex ? <Check size={18} /> : i + 1}</div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className={`text-sm font-black uppercase tracking-tight ${i <= activeIndex ? 'text-white' : 'text-slate-600'}`}>{step}</p>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">{i < activeIndex ? 'Complete' : i === activeIndex ? 'Current' : 'Pending'}</span>
            </div>
            {i !== steps.length - 1 && <div className="h-6 border-l border-white/10 ml-5 mt-3" />}
          </div>
        </div>
      ))}
    </div>
  );
};

const HealthGraph = ({ title, subtitle, type }) => (
  <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-2xl h-full">
    <div className="flex justify-between items-start">
      <div className="space-y-1"><h3 className="text-xl font-black uppercase tracking-tight text-white">{title}</h3><p className="text-slate-500 text-xs font-medium italic">{subtitle}</p></div>
      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-white/10 shadow-inner"><button className="px-4 py-2 text-[9px] font-black uppercase bg-blue-600 text-white rounded-lg shadow-lg">12M</button><button className="px-4 py-2 text-[9px] font-black text-slate-600 hover:text-white">30D</button></div>
    </div>
    <div className="h-[300px] w-full flex relative px-6 pb-12">
      <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-[9px] font-black text-slate-600 uppercase tracking-widest text-right w-10"><span>{type === 'line' ? '100%' : '100'}</span><span>{type === 'line' ? '90%' : '50'}</span><span>{type === 'line' ? '80%' : '0'}</span></div>
      <div className="flex-1 ml-10 border-l border-b border-white/5 relative flex items-end justify-between px-6">
        {[65, 72, 70, 78, 82, 85, 84, 88, 92, 91, 94].map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
            {type === 'bar' ? <div className="w-[70%] flex flex-col justify-end relative h-full"><div className="w-full bg-green-500/40 rounded-t-sm" style={{ height: `${v * 0.5}%` }} /><div className="w-full bg-blue-500/40" style={{ height: `${v * 0.3}%` }} /><div className="w-full bg-purple-500/40 rounded-b-sm" style={{ height: `${v * 0.2}%` }} /></div> : <div className="absolute w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" style={{ bottom: `${(v - 65) * 5.5 + 40}px` }} />}
            <span className="absolute -bottom-10 text-[8px] font-black text-slate-600 uppercase tracking-widest rotate-45 origin-left">MON {i + 1}</span>
          </div>
        ))}
        {type === 'line' && <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none px-6"><path d="M 15,227.5 L 55,203 L 95,210 L 135,175 L 175,161 L 215,150.5 L 255,154 L 295,136.5 L 335,122.5 L 375,126 L 415,115.5" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scale(1.2, 1) translate(-20px, 15px)' }} /></svg>}
      </div>
    </div>
    {type === 'bar' && <div className="flex justify-center gap-6 pt-4 border-t border-white/5"><LegendItem label="Birth" color="bg-green-500/40" /><LegendItem label="Health" color="bg-blue-500/40" /><LegendItem label="Renew" color="bg-purple-500/40" /></div>}
  </div>
);

const DegradationTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead><tr className="text-[10px] font-black text-slate-600 uppercase tracking-[0.35em] border-b border-white/5"><th className="px-6 py-5">Segment</th><th className="px-6 py-5">30D Change</th><th className="px-6 py-5">Current</th><th className="px-6 py-5">Driver</th><th className="px-6 py-5 text-right">Action</th></tr></thead>
      <tbody className="divide-y divide-white/5">
        {[
          ['SEG-PH-ABA-044', '-8.2%', '72.1%', 'CBYD exposure + conflicting evidence', 'Review'],
          ['SEG-PH-TRA-002', '-2.1%', '89.4%', 'Pending health review', 'Monitor'],
          ['SEG-PH-ELK-001', '+1.2%', '96.2%', 'Stable evidence profile', 'None']
        ].map((r) => <tr key={r[0]} className="hover:bg-white/[0.03]"><td className="px-6 py-6 text-sm font-black text-white">{r[0]}</td><td className={`px-6 py-6 text-sm font-black ${r[1].startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>{r[1]}</td><td className="px-6 py-6 text-sm font-black text-blue-400">{r[2]}</td><td className="px-6 py-6 text-xs text-slate-400 font-bold">{r[3]}</td><td className="px-6 py-6 text-right"><button className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">{r[4]}</button></td></tr>)}
      </tbody>
    </table>
  </div>
);

const ResilienceMixCard = () => (
  <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 flex flex-col items-center text-center shadow-inner">
    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600 mb-10">Resilience Grade Mix</h3>
    <div className="relative h-56 w-56 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90"><circle cx="50" cy="50" r="44" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="12" /><circle cx="50" cy="50" r="44" fill="transparent" stroke="#22C55E" strokeWidth="12" strokeDasharray="276.4" strokeDashoffset="110" strokeLinecap="round" /><circle cx="50" cy="50" r="44" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray="276.4" strokeDashoffset="220" strokeLinecap="round" /><circle cx="50" cy="50" r="44" fill="transparent" stroke="#EF4444" strokeWidth="12" strokeDasharray="276.4" strokeDashoffset="260" strokeLinecap="round" /></svg>
      <div className="flex flex-col leading-none"><span className="text-6xl font-black text-white tracking-tighter">161</span><span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mt-3">Portfolio</span></div>
    </div>
    <div className="w-full space-y-4 mt-12 px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest"><div className="flex justify-between items-center"><div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22C55E]"></div>Grade A</div><span className="text-white text-base">61</span></div><div className="flex justify-between items-center"><div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-blue-500"></div>Grade B</div><span className="text-white text-base">45</span></div><div className="flex justify-between items-center"><div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>Critical</div><span className="text-white text-base">10</span></div></div>
  </div>
);

const IntegrityTrendChart = () => (
  <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 shadow-2xl">
    <div className="flex items-center justify-between mb-12"><div><h3 className="text-2xl font-black text-white uppercase tracking-tight">Systemic Integrity Trend</h3><p className="text-slate-500 text-xs mt-2 italic font-medium">Confidence stability across trailing 30 operational days</p></div><div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-2xl border border-white/10 shadow-inner"><button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white rounded-xl shadow-lg">30D</button><button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">90D</button></div></div>
    <div className="relative h-64 w-full px-4"><svg viewBox="0 0 600 200" className="w-full h-full overflow-visible"><path d="M 20,180 L 110,120 L 210,150 L 310,80 L 410,60 L 510,40 L 580,20" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="580" cy="20" r="6" fill="#3B82F6" stroke="#020617" strokeWidth="3" /></svg><div className="flex justify-between mt-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]"><span>APR 05</span><span>APR 12</span><span>APR 19</span><span>APR 26</span><span>MAY 05</span></div></div>
  </div>
);

const CorridorMap = () => (
  <div className="h-[550px] bg-[#020617] rounded-[3rem] border border-white/5 relative overflow-hidden shadow-inner">
    <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full">
      <rect width="800" height="500" fill="#0B1120" />
      {[100, 200, 300, 400].map(y => <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />)}
      {[150, 350, 550, 750].map(x => <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />)}
      <path d="M100,0 L100,500" stroke="#1E293B" strokeWidth="40" strokeOpacity="0.8" />
      <path d="M0,250 L800,250" stroke="#1E293B" strokeWidth="40" strokeOpacity="0.8" />
      <path d="M100,50 L100,450" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M40,250 L760,250" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.6" />
      <circle cx="450" cy="250" r="100" fill="#EF4444" fillOpacity="0.05" stroke="#EF4444" strokeWidth="2" strokeDasharray="8,8" />
      <circle cx="450" cy="250" r="12" fill="#EF4444" className="animate-ping opacity-20" /><circle cx="450" cy="250" r="6" fill="#EF4444" stroke="white" strokeWidth="2" />
    </svg>
    <div className="absolute top-10 left-10 space-y-3"><div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-3xl max-w-xs"><div className="flex items-center gap-3 mb-4"><MapIcon size={24} className="text-blue-500" /><span className="text-[10px] font-black uppercase text-white tracking-widest leading-none">Corridor Active</span></div><p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Currently monitoring conflicts on <span className="text-blue-400">Rivers State Fiber Ph.1</span> against municipal dig permits.</p></div></div>
    <div className="absolute bottom-10 right-10 flex flex-col gap-2"><button className="h-12 w-12 bg-slate-900/90 rounded-2xl border border-white/10 text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-2xl">+</button><button className="h-12 w-12 bg-slate-900/90 rounded-2xl border border-white/10 text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-2xl">-</button></div>
  </div>
);

const AuditTimeline = ({ events }) => (
  <div className="space-y-4">
    {events.map((ev, i) => (
      <div key={`${ev.time}-${i}`} className="grid grid-cols-12 gap-4 items-center p-6 bg-slate-950/60 border border-white/5 rounded-[2rem] hover:border-blue-500/20 transition-all">
        <div className="col-span-2"><p className="text-[10px] font-mono text-slate-500 tracking-tight">{ev.time}</p></div>
        <div className="col-span-2"><p className="text-xs font-black text-white uppercase">{ev.object}</p><p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">{ev.layer}</p></div>
        <div className="col-span-2"><p className="text-xs font-bold text-slate-300">{ev.actor}</p><p className="text-[9px] text-slate-600 uppercase font-black tracking-widest mt-1">{ev.role}</p></div>
        <div className="col-span-2"><p className="text-xs text-blue-400 font-black uppercase tracking-tight">{ev.event}</p></div>
        <div className="col-span-3"><p className="text-[10px] text-slate-600 font-mono italic">{ev.hash}</p></div>
        <div className="col-span-1 text-right"><StatusPill label={ev.status} tone="green" /></div>
      </div>
    ))}
  </div>
);

const GovernanceContextCard = ({ message }) => (
  <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 space-y-6 shadow-2xl">
    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600">Governance Context</h3>
    <SummaryRow label="Related Segment" val={message.related} mono />
    <SummaryRow label="Risk SLA" val={message.sla} />
    <SummaryRow label="Participants" val="3 parties" />
    <SummaryRow label="Audit Status" val="Logged" />
    <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-[2rem]"><p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Linked Record</p><p className="text-xs text-slate-300 leading-relaxed">This thread is retained as part of the segment's communications provenance and can be included in audit packages.</p></div>
  </div>
);

const PartnerDirectoryCard = () => (
  <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 space-y-5 shadow-2xl">
    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600">Partner Directory</h3>
    {[
      ['Rivers Permit Office', 'Municipal Partner'],
      ['MetroFiber PH', 'Certified Field Partner'],
      ['DICRI Tiger Desk', 'Adjudication']
    ].map(([name, role]) => <div key={name} className="flex items-center gap-4 p-4 bg-slate-950/60 border border-white/5 rounded-2xl"><div className="h-9 w-9 bg-white/5 rounded-xl flex items-center justify-center"><Users size={16} className="text-blue-400" /></div><div><p className="text-xs font-black text-white">{name}</p><p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mt-1">{role}</p></div></div>)}
  </div>
);

const MessageBubble = ({ actor, role, body, inbound }) => (
  <div className={`flex ${inbound ? 'justify-start' : 'justify-end'}`}>
    <div className={`max-w-[82%] p-6 rounded-[2rem] border ${inbound ? 'bg-slate-950 border-white/5' : 'bg-blue-600/10 border-blue-500/20'}`}>
      <div className="flex items-center gap-3 mb-3"><p className="text-[10px] font-black uppercase tracking-widest text-white">{actor}</p><span className="text-[9px] font-black uppercase tracking-widest text-slate-600">{role}</span></div>
      <p className="text-sm text-slate-300 leading-relaxed">{body}</p>
    </div>
  </div>
);

const NoticeLedgerCard = ({ onAcknowledge, ackList }) => (
  <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-inner shadow-red-900/5">
    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600">Active Risk Ledger</h4>
    <div className="space-y-4">
      {['CBYD-2026-00128', 'CBYD-2026-00134', 'CBYD-2026-00142'].map((id) => (
        <div key={id} className={`p-6 border rounded-[2rem] space-y-5 transition-all ${ackList.has(id) ? 'bg-slate-900/40 border-green-500/20' : 'bg-slate-950 border-white/5 shadow-xl'}`}>
          <div className="flex justify-between items-center"><span className={`text-xs font-mono font-black ${ackList.has(id) ? 'text-slate-500' : 'text-white'}`}>{id}</span>{ackList.has(id) ? <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black uppercase rounded-full border border-green-500/20"><CheckCircle2 size={10} /> Acknowledged</div> : <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase rounded-full border border-amber-500/20 animate-pulse">Pending Review</span>}</div>
          {!ackList.has(id) && <button onClick={() => onAcknowledge(id)} className="w-full py-4 bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-400 hover:text-white text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Mark as Acknowledged</button>}
        </div>
      ))}
    </div>
  </div>
);

const AlertCard = () => (
  <div className="bg-amber-600/10 border border-amber-500/20 rounded-[3rem] p-10 space-y-8 shadow-2xl shadow-amber-900/10">
    <div className="flex items-center space-x-4 text-amber-500"><AlertTriangle size={24} /><span className="text-[12px] font-black uppercase tracking-[0.3em]">Priority Risk Alerts</span></div>
    <div className="space-y-6"><div className="space-y-1 group cursor-pointer border-l-4 border-amber-500 pl-4"><p className="text-sm font-black text-white group-hover:text-amber-400 transition-colors uppercase leading-none">2 Active Dig Notices</p><p className="text-[10px] text-amber-500/60 font-medium leading-relaxed tracking-wide mt-1">Conflict detected on PH corridor buffer zone.</p></div><div className="space-y-1 group cursor-pointer border-l-4 border-blue-500 pl-4"><p className="text-sm font-black text-white group-hover:text-blue-400 transition-colors uppercase leading-none">Integrity Score Dip</p><p className="text-[10px] text-slate-500 font-medium leading-relaxed tracking-wide mt-1">Average down -2.1% on ABA Road segments.</p></div></div>
    <button className="w-full py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-amber-600/20">Review All Threats</button>
  </div>
);

const MapKPI = ({ label, val, icon: Icon, color }) => (<div className="bg-slate-900/60 p-7 rounded-[2.5rem] border border-white/5 shadow-inner space-y-4"><div className={`p-3.5 w-fit rounded-xl bg-white/5 ${color}`}><Icon size={22} /></div><div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{label}</p><p className="text-3xl font-black text-white leading-none mt-1">{val}</p></div></div>);
const DetailMetric = ({ label, val, trend, icon: Icon, color }) => (<div className="bg-slate-950 p-10 rounded-[3.5rem] border border-white/5 space-y-3 relative overflow-hidden group shadow-inner"><div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-700 ${color}`}><Icon size={84} /></div><p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">{label}</p><p className={`text-5xl font-black ${color} tracking-tighter`}>{val}</p><div className="flex items-center gap-2"><div className={`h-1.5 w-1.5 rounded-full ${color} animate-pulse`} /><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{trend}</p></div></div>);
const SummaryRow = ({ label, val, mono }) => (<div className="flex justify-between items-center py-2 border-b border-white/[0.03] gap-6"><span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{label}</span><span className={`text-xs text-white font-black text-right ${mono ? 'font-mono tracking-tighter' : ''}`}>{val}</span></div>);
const CheckItem = ({ label }) => (<div className="flex items-center gap-4 py-2 group"><div className="p-1 bg-green-500/20 rounded-lg group-hover:scale-110 transition-transform"><Check size={14} className="text-green-500" strokeWidth={4} /></div><span className="text-[11px] font-bold text-slate-300 uppercase tracking-tight">{label}</span><span className="ml-auto text-[8px] font-black text-green-500/60 uppercase tracking-widest bg-green-500/5 px-2 py-0.5 rounded border border-green-500/10">Verified</span></div>);
const ArtifactBox = ({ icon: Icon, label, size, date }) => (<div className="p-7 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer shadow-inner"><div className="flex items-center gap-6"><div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-600/20"><Icon size={24} className="text-blue-500" /></div><div><p className="text-xs font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{label}</p><p className="text-[9px] font-bold text-slate-600 uppercase mt-1 tracking-widest">{date} • {size}</p></div></div><Download size={20} className="text-slate-700 group-hover:text-blue-500 transition-all" /></div>);
const MiniStat = ({ label, val }) => (<div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl"><p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</p><p className="text-lg font-black text-white mt-1">{val}</p></div>);
const TrustRow = ({ icon: Icon, label, val, tone }) => (<div className="flex justify-between items-center text-[10px]"><span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2"><Icon size={14} /> {label}</span><span className={`${tone === 'green' ? 'text-green-500' : tone === 'purple' ? 'text-purple-400' : 'text-blue-400'} font-black tracking-widest uppercase`}>{val}</span></div>);
const LegendItem = ({ label, color }) => (<div className="flex items-center gap-2"><div className={`h-2 w-2 rounded-full ${color}`} /><span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{label}</span></div>);
const ASCEBadge = ({ level }) => (<span className={`inline-block px-4 py-2 rounded-xl font-black text-base border shadow-xl ${level === 'A' ? 'text-green-400 border-green-500/30 bg-green-500/5' : level === 'B' ? 'text-blue-400 border-blue-500/30 bg-blue-500/5' : level === 'TBD' ? 'text-slate-500 border-slate-500/20 bg-slate-500/5' : 'text-amber-400 border-amber-500/30 bg-amber-500/5'}`}>{level}</span>);
const StatusBadge = ({ status }) => (<div className={`flex items-center gap-3 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border w-fit shadow-inner ${status === 'Active' ? 'text-green-500 border-green-500/30 bg-green-500/5' : status === 'In Review' || status === 'Pre-Cert' ? 'text-amber-500 border-amber-500/30 bg-amber-500/5' : 'text-red-500 border-red-500/30 bg-red-500/5'}`}><div className={`h-2 w-2 rounded-full ${status === 'Active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : status === 'In Review' || status === 'Pre-Cert' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`} />{status}</div>);
const StatusPill = ({ label, tone }) => (<span className={`inline-flex items-center px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${tone === 'green' ? 'bg-green-500/10 text-green-500 border-green-500/20' : tone === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-800 text-slate-400 border-white/10'}`}>{label}</span>);
const RiskBadge = ({ risk }) => (<span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${risk === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' : risk === 'Medium' || risk === 'Moderate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : risk === 'Unknown' ? 'bg-slate-500/10 text-slate-500 border-slate-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>{risk}</span>);
const LifecycleBadge = ({ state }) => (<span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${state === 'Certified' ? 'bg-green-500/10 text-green-400 border-green-500/20' : state === 'Quarantine' ? 'bg-red-500/10 text-red-400 border-red-500/20' : state === 'Tiger Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{state}</span>);
const EvidenceBar = ({ value }) => (<div className="w-32"><div className="flex justify-between mb-2"><span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Evidence</span><span className="text-[9px] font-black text-white">{value}%</span></div><div className="h-2 bg-slate-950 rounded-full overflow-hidden"><div className={`h-full rounded-full ${value > 85 ? 'bg-green-500' : value > 65 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${value}%` }} /></div></div>);
const SegmentStateCard = ({ label, val, icon: Icon, tone }) => { const tones = { blue: 'text-blue-400', green: 'text-green-400', amber: 'text-amber-400', red: 'text-red-400' }; return <div className="bg-slate-950 p-7 rounded-[2.5rem] border border-white/5 shadow-inner"><div className={`p-3 bg-white/5 rounded-2xl w-fit ${tones[tone]} mb-5`}><Icon size={24} /></div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{label}</p><p className={`text-2xl font-black mt-2 ${tones[tone]}`}>{val}</p></div>; };

export default App;
