import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Award,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Gauge,
  History,
  Layers,
  Lock,
  Map,
  MapPin,
  Printer,
  QrCode,
  Route,
  Search,
  Shield,
  Users,
  X,
} from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Segment Overview', icon: Route },
  { id: 'assets', label: 'Managed Assets', icon: Database },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'cbyd', label: 'CBYD Exposure', icon: Map },
  { id: 'alerts', label: 'Alerts / Notices', icon: Bell },
  { id: 'audit', label: 'Audit Trail', icon: History },
];

const SEGMENTS = [
  {
    id: 'SEG-PH-ELK-001',
    pointA: 'Elekahia North Boundary',
    pointZ: 'Garrison Service Limit',
    corridor: 'Port Harcourt Resilience Corridor',
    portfolio: 'Rivers State Fiber',
    owner: 'Rivers State Fiber',
    work: 'Certified corridor monitoring and CBYD conflict screening',
    lifecycle: 'Certified / Monitoring',
    crew: 'DICRI Cheetah PH-02 with MetroFiber locate partner',
    expectedCompletion: '2026-05-24',
    lastActivity: 'Evidence packet accepted 2026-05-12 10:42',
    evidence: 98,
    readiness: 96,
    integrity: 96.2,
    confidence: 94,
    asce: 'QL-B',
    quality: 'High',
    resilience: 'A-',
    risk: 'Moderate',
    exceptions: 1,
    exceptionText: 'One municipal notice under owner response review',
    openNotices: 1,
    nextAction: 'Acknowledge CBYD notice and confirm response window.',
    certNo: 'DICRI-BC-2026-00184',
    certificateType: 'Birth Certificate',
    status: 'Active',
    certificateStatus: 'Certified',
    certificateIssueDate: '10 May 2026',
    certificateReviewDate: '10 May 2027',
    registryRef: 'REG-PH-001-9C4E',
    assetClass: 'Underground Fiber Conduit + Access Handholes',
    segmentLength: '1.2 km',
    criticalityTier: 'Tier 2 - Metro Backbone',
    resilienceScore: 82,
    resilienceGrade: 'A-',
    stageTone: 'green',
    custody: 'Preserved',
    ownerResponse: 'Awaiting acknowledgement',
    exposureScore: 42,
    date: '2026-05-12',
    context: 'Urban service corridor. Exact route geometry and field evidence remain redacted.',
    trend: [88, 90, 91, 93, 94, 96],
  },
  {
    id: 'SEG-PH-TRA-002',
    pointA: 'Trans-Amadi West Boundary',
    pointZ: 'Industrial East Boundary',
    corridor: 'Port Harcourt Industrial Corridor',
    portfolio: 'Rivers State Fiber',
    owner: 'Rivers State Fiber',
    work: 'Health recertification and evidence completeness review',
    lifecycle: 'Tiger Review',
    crew: 'DICRI Tiger Desk with Janvier Field Services',
    expectedCompletion: '2026-05-21',
    lastActivity: 'Supplemental field note requested 2026-05-13 14:10',
    evidence: 84,
    readiness: 88,
    integrity: 89.4,
    confidence: 82,
    asce: 'QL-C',
    quality: 'Controlled',
    resilience: 'B+',
    risk: 'Medium',
    exceptions: 2,
    exceptionText: 'Two evidence items pending reviewer acceptance',
    openNotices: 2,
    nextAction: 'Upload missing field note and resume Tiger review.',
    certNo: 'DICRI-HC-2026-00088',
    certificateType: 'Health Certificate',
    status: 'In Review',
    certificateStatus: 'Under Review',
    certificateIssueDate: 'Pending',
    certificateReviewDate: 'Pending',
    registryRef: 'REG-PH-002-2A91',
    assetClass: 'Underground Fiber Duct + Industrial Access Vaults',
    segmentLength: '1.8 km',
    criticalityTier: 'Tier 2 - Industrial Backbone',
    resilienceScore: 74,
    resilienceGrade: 'B+',
    stageTone: 'amber',
    custody: 'Preserved',
    ownerResponse: 'Action required',
    exposureScore: 58,
    date: '2026-05-11',
    context: 'Industrial corridor under health review. Utility details masked.',
    trend: [78, 81, 84, 83, 87, 89],
  },
  {
    id: 'LAG-IKE-SEG-014',
    pointA: 'Ikeja North Access Boundary',
    pointZ: 'Ikeja South Access Boundary',
    corridor: 'Lagos Metro Resilience Corridor',
    portfolio: 'Lagos Urban Infra',
    owner: 'Equinox Telecom',
    work: 'Annual certified segment monitoring',
    lifecycle: 'Certified / No Active Work',
    crew: 'DICRI Independent Review Desk with Equinox field evidence team',
    expectedCompletion: '2026-06-02',
    lastActivity: 'Renewal marker logged 2026-04-28 09:30',
    evidence: 97,
    readiness: 95,
    integrity: 94.8,
    confidence: 95,
    asce: 'QL-A',
    quality: 'High',
    resilience: 'A',
    risk: 'Low',
    exceptions: 0,
    exceptionText: 'No open exceptions',
    openNotices: 0,
    nextAction: 'Continue routine monitoring.',
    certNo: 'DICRI-BIRTH-2026-014',
    certificateType: 'Birth Certificate',
    status: 'Active',
    certificateStatus: 'Certified',
    certificateIssueDate: '10 May 2026',
    certificateReviewDate: '10 May 2027',
    registryRef: 'REG-LAG-014-7F2A',
    assetClass: 'Underground Fiber Conduit + Handhole Access',
    segmentLength: '1.0 km',
    criticalityTier: 'Tier 1 - Metro Resilience Corridor',
    resilienceScore: 78,
    resilienceGrade: 'B',
    stageTone: 'green',
    custody: 'Preserved',
    ownerResponse: 'No action required',
    exposureScore: 18,
    date: '2026-04-28',
    context: 'Certified coastal corridor. Operational details withheld.',
    trend: [90, 91, 92, 93, 94, 95],
  },
  {
    id: 'SEG-PH-ABA-044',
    pointA: 'Aba Road North Boundary',
    pointZ: 'Aba Road South Boundary',
    corridor: 'Aba Road Exception Corridor',
    portfolio: 'Rivers State Fiber',
    owner: 'Rivers State Fiber',
    work: 'Exception remediation and conflicting evidence resolution',
    lifecycle: 'Quarantine',
    crew: 'DICRI Risk Desk with supervised partner crew',
    expectedCompletion: '2026-05-29',
    lastActivity: 'Risk exception opened 2026-05-12 11:11',
    evidence: 61,
    readiness: 72,
    integrity: 72.1,
    confidence: 65,
    asce: 'QL-D',
    quality: 'Watchlist',
    resilience: 'C',
    risk: 'High',
    exceptions: 4,
    exceptionText: 'Quarantine active pending adjudication',
    openNotices: 4,
    nextAction: 'Resolve conflicting evidence before certificate activity resumes.',
    certNo: 'DICRI-QC-2026-00012',
    certificateType: 'Health Certificate',
    status: 'Quarantine',
    certificateStatus: 'Conditionally Certified',
    certificateIssueDate: '12 May 2026',
    certificateReviewDate: 'Under exception review',
    registryRef: 'REG-PH-044-QC12',
    assetClass: 'Underground Fiber Conduit + Roadside Handholes',
    segmentLength: '0.7 km',
    criticalityTier: 'Tier 2 - Exception Corridor',
    resilienceScore: 61,
    resilienceGrade: 'C',
    stageTone: 'red',
    custody: 'Preserved',
    ownerResponse: 'Remediation plan required',
    exposureScore: 83,
    date: '2026-05-12',
    context: 'Risk-held segment. Sensitive field details intentionally hidden.',
    trend: [82, 80, 76, 74, 73, 72],
  },
  {
    id: 'SEG-PH-RUM-017',
    pointA: 'Rumuola Service Boundary A',
    pointZ: 'Rumuola Service Boundary Z',
    corridor: 'Rumuola Expansion Corridor',
    portfolio: 'Rivers State Fiber',
    owner: 'Rivers State Fiber',
    work: 'Pre-certification field capture scheduled',
    lifecycle: 'Capture Scheduled',
    crew: 'Janvier Field Services supervised by DICRI Entry Team',
    expectedCompletion: '2026-05-27',
    lastActivity: 'Capture window reserved 2026-05-14 08:20',
    evidence: 18,
    readiness: 41,
    integrity: 0,
    confidence: 38,
    asce: 'TBD',
    quality: 'Pending',
    resilience: 'Pending',
    risk: 'Unknown',
    exceptions: 0,
    exceptionText: 'Awaiting first verified evidence packet',
    openNotices: 0,
    nextAction: 'Complete authorized field capture before certificate review.',
    certNo: 'Not Issued',
    certificateType: 'Pre-Certification',
    status: 'Pre-Cert',
    stageTone: 'blue',
    custody: 'Pending',
    ownerResponse: 'Capture scheduled',
    exposureScore: 28,
    date: '2026-05-14',
    context: 'Scheduled capture area. No sensitive asset details available.',
    trend: [0, 0, 12, 18, 24, 41],
  },
];

const NOTICES = [
  { id: 'NTC-00481', segmentId: 'SEG-PH-ELK-001', title: 'Dig notice intersects monitored buffer', severity: 'Medium', status: 'Open', due: '2026-05-16', source: 'Rivers Permit Office', ownerResponse: 'Awaiting acknowledgement' },
  { id: 'NTC-00494', segmentId: 'SEG-PH-TRA-002', title: 'Supplemental field note required', severity: 'Medium', status: 'Open', due: '2026-05-18', source: 'DICRI Tiger Desk', ownerResponse: 'Action required' },
  { id: 'NTC-00501', segmentId: 'SEG-PH-TRA-002', title: 'Certificate renewal window approaching', severity: 'Low', status: 'Open', due: '2026-05-25', source: 'DICRI System', ownerResponse: 'Monitoring' },
  { id: 'NTC-00512', segmentId: 'SEG-PH-ABA-044', title: 'Quarantine exception requires remediation plan', severity: 'High', status: 'Open', due: '2026-05-17', source: 'DICRI Risk Desk', ownerResponse: 'Plan required' },
  { id: 'NTC-00513', segmentId: 'SEG-PH-ABA-044', title: 'Conflicting evidence packet under adjudication', severity: 'High', status: 'Open', due: '2026-05-19', source: 'DICRI Risk Desk', ownerResponse: 'Pending' },
];

const AUDIT_EVENTS = [
  { time: '2026-05-12 10:42', object: 'SEG-PH-ELK-001', event: 'Evidence packet accepted', actor: 'Cheetah Team PH-02', status: 'Verified' },
  { time: '2026-05-12 10:48', object: 'SEG-PH-ELK-001', event: 'Equipment registry validation completed', actor: 'DICRI Policy Engine', status: 'Verified' },
  { time: '2026-05-12 11:03', object: 'DICRI-BC-2026-00184', event: 'Certificate published to client portal', actor: 'Tiger Review Desk', status: 'Recorded' },
  { time: '2026-05-12 11:11', object: 'SEG-PH-ABA-044', event: 'Risk exception opened', actor: 'DICRI Risk Desk', status: 'Exception' },
  { time: '2026-05-13 14:10', object: 'SEG-PH-TRA-002', event: 'Supplemental note requested', actor: 'Tiger Review Desk', status: 'Pending' },
];

const INITIAL_FILTERS = {
  portfolio: 'All',
  segmentId: 'SEG-PH-ELK-001',
  certificateType: 'All',
  status: 'All',
  dateRange: '90 days',
};

export default function ClientPortalDemo() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedSegmentId, setSelectedSegmentId] = useState(INITIAL_FILTERS.segmentId);
  const [modal, setModal] = useState(null);
  const [reviewedNotices, setReviewedNotices] = useState(new Set());

  const selectedSegment = SEGMENTS.find((segment) => segment.id === selectedSegmentId) || SEGMENTS[0];

  const filteredSegments = useMemo(() => {
    return SEGMENTS.filter((segment) => {
      const portfolioOk = filters.portfolio === 'All' || segment.portfolio === filters.portfolio;
      const segmentOk = filters.segmentId === 'All' || segment.id === filters.segmentId;
      const certOk = filters.certificateType === 'All' || segment.certificateType === filters.certificateType;
      const statusOk = filters.status === 'All' || segment.status === filters.status;
      return portfolioOk && segmentOk && certOk && statusOk;
    });
  }, [filters]);

  const scopedSegments = filteredSegments.length ? filteredSegments : [selectedSegment];
  const selectedNotices = NOTICES.filter((notice) => notice.segmentId === selectedSegment.id);
  const certifiedSegments = scopedSegments.filter((segment) => segment.certNo !== 'Not Issued');
  const avgIntegrity = certifiedSegments.length
    ? certifiedSegments.reduce((sum, segment) => sum + segment.integrity, 0) / certifiedSegments.length
    : selectedSegment.integrity;

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    if (key === 'segmentId' && value !== 'All') {
      setSelectedSegmentId(value);
    }
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSelectedSegmentId(INITIAL_FILTERS.segmentId);
  };

  const selectSegment = (segment) => {
    setSelectedSegmentId(segment.id);
    setFilters((current) => ({ ...current, segmentId: segment.id }));
  };

  const openNotice = (notice) => {
    setSelectedSegmentId(notice.segmentId);
    setReviewedNotices((current) => new Set([...current, notice.id]));
    setModal({ type: 'notice', notice });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans antialiased">
      <PortalHeader segment={selectedSegment} openModal={setModal} />

      <div className="grid grid-cols-1 xl:grid-cols-[248px_1fr] min-h-[calc(100vh-76px)]">
        <aside className="bg-[#0B1120] border-r border-white/10 p-4 xl:p-5 space-y-4">
          <AccountScopeCard />
          <nav className="space-y-1.5">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all ${
                  activeTab === id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/40'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5 text-[12px] font-black uppercase tracking-tight">
                  <Icon size={16} />
                  {label}
                </span>
                {activeTab === id && <ChevronRight size={15} />}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 p-4 md:p-6 xl:p-7 space-y-5 overflow-x-hidden">
          <FilterBar
            filters={filters}
            selectedSegment={selectedSegment}
            updateFilter={updateFilter}
            reset={resetFilters}
          />

          {activeTab === 'overview' && (
            <SegmentOverview
              segments={scopedSegments}
              selectedSegment={selectedSegment}
              selectedNotices={selectedNotices}
              avgIntegrity={avgIntegrity}
              reviewedNotices={reviewedNotices}
              onSelectSegment={selectSegment}
              onOpenModal={setModal}
              onOpenNotice={openNotice}
            />
          )}

          {activeTab === 'assets' && (
            <SectionFrame
              title="Managed Assets"
              subtitle="Portfolio-visible segment summaries. Sensitive infrastructure details remain redacted."
              action={<GhostButton icon={Download} onClick={() => setModal({ type: 'export', segment: selectedSegment })}>Export Summary</GhostButton>}
            >
              <SegmentTable
                data={scopedSegments}
                selectedId={selectedSegment.id}
                onSelect={selectSegment}
                onView={(segment) => setModal({ type: 'segment', segment })}
                onCertificate={(segment) => setModal({ type: 'certificate', segment })}
              />
            </SectionFrame>
          )}

          {activeTab === 'certificates' && (
            <SectionFrame title="Certificates" subtitle="Certificate register available within the client account scope.">
              <CertificateTable
                data={scopedSegments.filter((segment) => segment.certNo !== 'Not Issued')}
                onOpen={(segment) => setModal({ type: 'certificate', segment })}
              />
            </SectionFrame>
          )}

          {activeTab === 'cbyd' && (
            <CBYDExposure
              selectedSegment={selectedSegment}
              notices={NOTICES}
              reviewedNotices={reviewedNotices}
              onOpenNotice={openNotice}
              onOpenModal={setModal}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsPanel
              notices={NOTICES}
              reviewedNotices={reviewedNotices}
              onOpenNotice={openNotice}
              onSelectSegment={(id) => {
                const segment = SEGMENTS.find((item) => item.id === id);
                if (segment) selectSegment(segment);
              }}
            />
          )}

          {activeTab === 'audit' && <AuditTrail events={AUDIT_EVENTS} selectedSegment={selectedSegment} />}
        </main>
      </div>

      {modal && <DetailModal modal={modal} close={() => setModal(null)} onBackToRegistry={() => { setActiveTab('certificates'); setModal(null); }} />}
    </div>
  );
}

function PortalHeader({ segment, openModal }) {
  return (
    <header className="min-h-[76px] bg-[#08111f] border-b border-white/10 px-4 md:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sticky top-0 z-40">
      <div className="flex items-center gap-4 min-w-0">
        <DICRILogo />
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-400">DICRI Client Portal</p>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white truncate">Segment Intelligence Console</h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <HeaderChip label="Active Segment" value={segment.id} />
        <HeaderChip label="ASCE Confidence" value={`${segment.asce} / ${segment.confidence}%`} />
        <button onClick={() => openModal({ type: 'access' })} className="rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-950/30 flex items-center gap-2">
          <Lock size={14} />
          Access Scope
        </button>
      </div>
    </header>
  );
}

function DICRILogo() {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <svg viewBox="0 0 100 100" className="h-11 w-11 drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5L15 20V45C15 70 50 92 50 92C50 92 88 70 88 45V20L50 5Z" fill="#0F172A" stroke="#3B82F6" strokeWidth="3" />
        <path d="M35 35C48 35 48 65 58 65" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
        <path d="M35 45C45 45 45 55 58 55" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        <path d="M35 55C45 55 45 45 58 45" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="75" r="14" fill="#3B82F6" />
        <path d="M74 75L78 79L86 71" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="hidden sm:block leading-none">
        <div className="text-lg font-black tracking-tight text-white">DICRI</div>
        <div className="text-[8px] font-bold uppercase tracking-[0.24em] text-blue-400 mt-1">Client Portal</div>
      </div>
    </div>
  );
}

function AccountScopeCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300">
          <Building2 size={21} />
        </div>
        <div>
          <p className="text-sm font-black text-white">City Fiber Network</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mt-1">Asset Owner</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2">
        <CompactInfo label="Role" value="Portfolio Viewer" />
        <CompactInfo label="Scope" value="Managed summaries" />
        <CompactInfo label="Sensitive Details" value="Redacted" tone="amber" />
      </div>
    </div>
  );
}

function FilterBar({ filters, selectedSegment, updateFilter, reset }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 shadow-2xl">
      <div className="flex flex-col 2xl:flex-row 2xl:items-end justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 flex-1">
          <SelectField label="Portfolio" value={filters.portfolio} onChange={(value) => updateFilter('portfolio', value)} options={['All', 'Rivers State Fiber', 'Lagos Urban Infra']} />
          <SelectField label="Segment" value={filters.segmentId} onChange={(value) => updateFilter('segmentId', value)} options={['All', ...SEGMENTS.map((segment) => segment.id)]} />
          <SelectField label="Certificate" value={filters.certificateType} onChange={(value) => updateFilter('certificateType', value)} options={['All', 'Birth Certificate', 'Health Certificate', 'Pre-Certification']} />
          <SelectField label="Status" value={filters.status} onChange={(value) => updateFilter('status', value)} options={['All', 'Active', 'In Review', 'Quarantine', 'Pre-Cert']} />
          <SelectField label="Date Range" value={filters.dateRange} onChange={(value) => updateFilter('dateRange', value)} options={['30 days', '90 days', '12 months']} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:block rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Selected</p>
            <p className="text-xs font-black text-white mt-1">{selectedSegment.corridor}</p>
          </div>
          <button onClick={reset} className="rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-300">Reset</button>
        </div>
      </div>
    </div>
  );
}

function SegmentOverview({ segments, selectedSegment, selectedNotices, avgIntegrity, reviewedNotices, onSelectSegment, onOpenModal, onOpenNotice }) {
  const certifiedCount = segments.filter((segment) => segment.certNo !== 'Not Issued').length;
  const watchlistCount = segments.filter((segment) => ['High', 'Medium', 'Moderate'].includes(segment.risk)).length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard icon={Layers} label="Visible Segments" value={segments.length} trend={`${watchlistCount} watch`} tone="blue" />
        <MetricCard icon={Award} label="Active Certificates" value={certifiedCount} trend="Governed" tone="green" />
        <MetricCard icon={Gauge} label="Avg Integrity" value={avgIntegrity ? `${avgIntegrity.toFixed(1)}%` : 'Pending'} trend={`${selectedSegment.asce} ASCE`} tone="teal" />
        <MetricCard icon={Shield} label="Resilience Grade" value={selectedSegment.resilience} trend={selectedSegment.custody} tone="gold" />
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.7fr)_420px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-5">
            <CoverageDonut segments={segments} />
            <IntegrityTrend segment={selectedSegment} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-5">
            <MapContextPanel segment={selectedSegment} onOpenModal={onOpenModal} />
            <SectionFrame
              title="Certificates"
              subtitle="Current records for displayed segment scope."
              action={<GhostButton icon={Download} onClick={() => onOpenModal({ type: 'export', segment: selectedSegment })}>Export Summary</GhostButton>}
              compact
            >
              <CertificateTable
                data={segments.filter((segment) => segment.certNo !== 'Not Issued')}
                onOpen={(segment) => onOpenModal({ type: 'certificate', segment })}
                compact
              />
            </SectionFrame>
          </div>

          <SectionFrame title="Managed Segments" subtitle="Rows update the active segment panel." compact>
            <SegmentTable
              data={segments}
              selectedId={selectedSegment.id}
              onSelect={onSelectSegment}
              onView={(segment) => onOpenModal({ type: 'segment', segment })}
              onCertificate={(segment) => onOpenModal({ type: 'certificate', segment })}
            />
          </SectionFrame>
        </div>

        <div className="space-y-5 min-w-0">
          <SelectedSegmentCard segment={selectedSegment} notices={selectedNotices} onOpenModal={onOpenModal} onOpenNotice={onOpenNotice} />
          <SignalStack segment={selectedSegment} />
          <RecommendedActions notices={selectedNotices} reviewedNotices={reviewedNotices} segment={selectedSegment} onOpenNotice={onOpenNotice} onOpenModal={onOpenModal} />
        </div>
      </div>
    </div>
  );
}

function SelectedSegmentCard({ segment, notices, onOpenModal, onOpenNotice }) {
  return (
    <section className="rounded-2xl border border-blue-500/25 bg-[#0B1120] p-5 shadow-2xl shadow-blue-950/20">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-400">Active Segment</p>
          <h2 className="text-2xl font-black text-white mt-1 truncate">{segment.id}</h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{segment.context}</p>
        </div>
        <StatusBadge status={segment.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <CompactInfo label="Point A" value={segment.pointA} />
        <CompactInfo label="Point Z" value={segment.pointZ} />
        <CompactInfo label="Portfolio" value={segment.portfolio} />
        <CompactInfo label="Corridor" value={segment.corridor} />
        <CompactInfo label="Work" value={segment.work} wide />
        <CompactInfo label="Lifecycle" value={segment.lifecycle} />
        <CompactInfo label="Crew" value={segment.crew} wide />
        <CompactInfo label="Expected Completion" value={segment.expectedCompletion} />
        <CompactInfo label="Last Field Activity" value={segment.lastActivity} wide />
        <CompactInfo label="Exceptions" value={`${segment.exceptions} open - ${segment.exceptionText}`} tone={riskTone(segment.risk)} wide />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ProgressBlock label="Evidence" value={segment.evidence} tone="blue" />
        <ProgressBlock label="Readiness" value={segment.readiness} tone="green" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <PrimaryButton icon={Award} onClick={() => onOpenModal({ type: 'certificate', segment })}>View Certificate</PrimaryButton>
        <GhostButton icon={Eye} onClick={() => onOpenModal({ type: 'segment', segment })}>View Segment</GhostButton>
        {notices[0] && <GhostButton icon={Bell} onClick={() => onOpenNotice(notices[0])}>Review Notice</GhostButton>}
      </div>
    </section>
  );
}

function SignalStack({ segment }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Certification Signals</h3>
        <StatusPill value="Custody Preserved" tone={segment.custody === 'Preserved' ? 'green' : 'amber'} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SignalBox label="ASCE Quality" value={segment.asce} tone={segment.asce === 'QL-D' ? 'red' : segment.asce === 'QL-C' ? 'amber' : 'green'} />
        <SignalBox label="Confidence" value={`${segment.confidence}%`} tone={segment.confidence < 75 ? 'red' : segment.confidence < 88 ? 'amber' : 'green'} />
        <SignalBox label="Quality Level" value={segment.quality} tone={riskTone(segment.risk)} />
        <SignalBox label="Risk" value={segment.risk} tone={riskTone(segment.risk)} />
      </div>
    </section>
  );
}

function SectionFrame({ title, subtitle, action, compact, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/75 shadow-2xl overflow-hidden">
      <div className={`${compact ? 'p-4' : 'p-5'} border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3`}>
        <div>
          <h2 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-white tracking-tight`}>{title}</h2>
          <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function SegmentTable({ data, selectedId, onSelect, onView, onCertificate }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[880px]">
        <thead className="bg-slate-950/70 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">
          <tr>
            <th className="px-4 py-3">Segment</th>
            <th className="px-4 py-3">Lifecycle</th>
            <th className="px-4 py-3">ASCE / Confidence</th>
            <th className="px-4 py-3">Evidence</th>
            <th className="px-4 py-3">Readiness</th>
            <th className="px-4 py-3">Risk</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.map((segment) => (
            <tr key={segment.id} onClick={() => onSelect(segment)} className={`cursor-pointer transition-colors ${selectedId === segment.id ? 'bg-blue-600/12' : 'hover:bg-white/[0.035]'}`}>
              <td className="px-4 py-4">
                <p className="font-black text-white">{segment.id}</p>
                <p className="text-[10px] text-slate-500 mt-1">{segment.portfolio}</p>
              </td>
              <td className="px-4 py-4"><LifecycleBadge value={segment.lifecycle} /></td>
              <td className="px-4 py-4 text-sm text-slate-300">{segment.asce} / {segment.confidence}%</td>
              <td className="px-4 py-4"><MiniProgress value={segment.evidence} /></td>
              <td className="px-4 py-4"><MiniProgress value={segment.readiness} tone="green" /></td>
              <td className="px-4 py-4"><RiskBadge value={segment.risk} /></td>
              <td className="px-4 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <IconButton title="View Segment" icon={Eye} onClick={(event) => { event.stopPropagation(); onView(segment); }} />
                  <IconButton title="View Certificate" icon={Award} onClick={(event) => { event.stopPropagation(); onCertificate(segment); }} disabled={segment.certNo === 'Not Issued'} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && <div className="p-7 text-center text-sm text-slate-500">No records match the current filter set.</div>}
    </div>
  );
}

function CertificateTable({ data, onOpen, compact }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-left ${compact ? 'min-w-[600px]' : 'min-w-[780px]'}`}>
        <thead className="bg-slate-950/70 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">
          <tr>
            <th className="px-4 py-3">Certificate</th>
            <th className="px-4 py-3">Segment</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Readiness</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Open</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.map((segment) => (
            <tr key={segment.certNo} className="hover:bg-white/[0.035]">
              <td className="px-4 py-4 font-black text-white">{segment.certNo}</td>
              <td className="px-4 py-4 text-sm text-slate-300">{segment.id}</td>
              <td className="px-4 py-4 text-sm text-slate-300">{segment.certificateType}</td>
              <td className="px-4 py-4 text-sm text-slate-300">{segment.readiness}%</td>
              <td className="px-4 py-4"><StatusBadge status={segment.status} /></td>
              <td className="px-4 py-4 text-right"><GhostButton icon={FileText} onClick={() => onOpen(segment)}>View</GhostButton></td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && <div className="p-6 text-center text-sm text-slate-500">No certificates in this scope yet.</div>}
    </div>
  );
}

function CBYDExposure({ selectedSegment, notices, reviewedNotices, onOpenNotice, onOpenModal }) {
  const selectedNotices = notices.filter((notice) => notice.segmentId === selectedSegment.id);
  const highRisk = notices.filter((notice) => notice.severity === 'High').length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard icon={AlertTriangle} label="Open Notices" value={notices.length} trend={`${highRisk} high`} tone="gold" />
        <MetricCard icon={Route} label="Selected Exposure" value={`${selectedSegment.exposureScore}%`} trend={selectedSegment.risk} tone="teal" />
        <MetricCard icon={Gauge} label="ASCE Confidence" value={`${selectedSegment.confidence}%`} trend={selectedSegment.asce} tone="blue" />
        <MetricCard icon={CheckCircle2} label="Owner Response" value={selectedSegment.ownerResponse} trend="Live" tone="green" />
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.45fr)_520px] gap-5">
        <SectionFrame
          title="CBYD Exposure Map"
          subtitle="Illustrative excavation risk context. Sensitive geometry redacted."
          action={<GhostButton icon={Eye} onClick={() => onOpenModal({ type: 'cbyd-map', segment: selectedSegment })}>Map Detail</GhostButton>}
        >
          <div className="p-4">
            <RiskMap segment={selectedSegment} onOpenModal={onOpenModal} large />
          </div>
        </SectionFrame>

        <div className="space-y-5">
          <SectionFrame title="Exposure Signals" subtitle="Quality, confidence, readiness, custody." compact>
            <div className="p-4 grid grid-cols-2 gap-3">
              <SignalBox label="Quality Level" value={selectedSegment.asce} tone={selectedSegment.asce === 'QL-D' ? 'red' : 'green'} />
              <SignalBox label="Confidence" value={`${selectedSegment.confidence}%`} tone={selectedSegment.confidence < 75 ? 'red' : selectedSegment.confidence < 88 ? 'amber' : 'green'} />
              <SignalBox label="Readiness" value={`${selectedSegment.readiness}%`} tone={selectedSegment.readiness < 75 ? 'red' : selectedSegment.readiness < 90 ? 'amber' : 'green'} />
              <SignalBox label="Chain of Custody" value={selectedSegment.custody} tone={selectedSegment.custody === 'Preserved' ? 'green' : 'amber'} />
            </div>
          </SectionFrame>

          <RecommendedActions
            notices={selectedNotices}
            reviewedNotices={reviewedNotices}
            segment={selectedSegment}
            onOpenNotice={onOpenNotice}
            onOpenModal={onOpenModal}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.75fr] gap-5">
        <NoticesTable notices={notices} reviewedNotices={reviewedNotices} onOpenNotice={onOpenNotice} />
        <AssetHealthTrend segment={selectedSegment} />
      </div>
    </div>
  );
}

function NoticesTable({ notices, reviewedNotices, onOpenNotice }) {
  return (
    <SectionFrame title="Open Notices" subtitle="Client-facing notice register with owner response status." compact>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[760px]">
          <thead className="bg-slate-950/70 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">
            <tr>
              <th className="px-4 py-3">Notice</th>
              <th className="px-4 py-3">Segment</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Owner Response</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3 text-right">Review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-white/[0.035]">
                <td className="px-4 py-4">
                  <p className="font-black text-white">{notice.id}</p>
                  <p className="text-xs text-slate-500 mt-1">{notice.title}</p>
                </td>
                <td className="px-4 py-4 text-sm text-slate-300">{notice.segmentId}</td>
                <td className="px-4 py-4"><RiskBadge value={notice.severity} /></td>
                <td className="px-4 py-4 text-sm text-slate-300">{reviewedNotices.has(notice.id) ? 'Reviewed locally' : notice.ownerResponse}</td>
                <td className="px-4 py-4 text-sm text-slate-300">{notice.due}</td>
                <td className="px-4 py-4 text-right"><GhostButton icon={Bell} onClick={() => onOpenNotice(notice)}>Review Notice</GhostButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionFrame>
  );
}

function AlertsPanel({ notices, reviewedNotices, onOpenNotice, onSelectSegment }) {
  return (
    <SectionFrame title="Alerts / Notices" subtitle="Governed messages requiring awareness or action.">
      <div className="p-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
        {notices.map((notice) => (
          <button key={notice.id} onClick={() => { onSelectSegment?.(notice.segmentId); onOpenNotice(notice); }} className="w-full text-left rounded-2xl border border-white/10 bg-slate-950/50 hover:bg-white/[0.04] p-4 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">{notice.id} / {notice.segmentId}</p>
                <h3 className="font-black text-white mt-2">{notice.title}</h3>
                <p className="text-xs text-slate-500 mt-2">{notice.source} - Due {notice.due}</p>
              </div>
              <RiskBadge value={notice.severity} />
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span>{reviewedNotices.has(notice.id) ? 'Reviewed locally' : notice.ownerResponse}</span>
              <span className="text-blue-400">Review Notice</span>
            </div>
          </button>
        ))}
      </div>
    </SectionFrame>
  );
}

function AuditTrail({ events, selectedSegment }) {
  return (
    <SectionFrame title="Audit Trail" subtitle={`Context for ${selectedSegment.id}; hashes and evidence links are masked.`}>
      <div className="p-4 space-y-3">
        {events.map((event) => (
          <div key={`${event.time}-${event.event}`} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{event.time} / {event.object}</p>
              <p className="text-sm font-black text-white mt-2">{event.event}</p>
              <p className="text-xs text-slate-500 mt-1">{event.actor}</p>
            </div>
            <StatusPill value={event.status} tone={event.status === 'Exception' ? 'red' : event.status === 'Pending' ? 'amber' : 'green'} />
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

function CoverageDonut({ segments }) {
  const certified = segments.filter((segment) => segment.status === 'Active').length;
  const review = segments.filter((segment) => segment.status === 'In Review' || segment.status === 'Pre-Cert').length;
  const watch = segments.filter((segment) => segment.status === 'Quarantine').length;
  const total = Math.max(segments.length, 1);
  const certifiedPct = Math.round((certified / total) * 100);
  const reviewPct = Math.round((review / total) * 100);
  const watchPct = Math.max(0, 100 - certifiedPct - reviewPct);
  const dash = `${certifiedPct} ${reviewPct} ${watchPct}`;

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-white">Certificate Coverage</h3>
          <p className="text-xs text-slate-500 mt-1">Fully Certified / In Review / Watchlist</p>
        </div>
        <Award size={20} className="text-blue-400" />
      </div>
      <div className="mt-4 grid grid-cols-[160px_1fr] gap-5 items-center">
        <div className="relative h-40 w-40">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="45" fill="none" stroke="#111827" strokeWidth="18" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#22C55E" strokeWidth="18" pathLength="100" strokeDasharray={`${dash.split(' ')[0]} 100`} strokeDashoffset="0" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#D4A100" strokeWidth="18" pathLength="100" strokeDasharray={`${reviewPct} 100`} strokeDashoffset={`-${certifiedPct}`} />
            <circle cx="60" cy="60" r="45" fill="none" stroke="#EF4444" strokeWidth="18" pathLength="100" strokeDasharray={`${watchPct} 100`} strokeDashoffset={`-${certifiedPct + reviewPct}`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white">{certifiedPct}%</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Certified</span>
          </div>
        </div>
        <div className="space-y-3">
          <LegendRow color="bg-green-500" label="Fully Certified" value={`${certified} segments`} />
          <LegendRow color="bg-amber-500" label="In Review" value={`${review} segments`} />
          <LegendRow color="bg-red-500" label="Watchlist" value={`${watch} segments`} />
          <div className="pt-3 border-t border-white/10">
            <p className="text-xs text-slate-400 leading-relaxed">Coverage reflects visible client scope only. Field artifacts and exact locations are withheld.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrityTrend({ segment }) {
  const points = segment.trend.map((value, index) => {
    const x = 36 + index * 58;
    const y = 150 - ((value || 35) / 100) * 105;
    return { x, y, value };
  });
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');
  const current = points[points.length - 1];

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-white">Integrity Trend</h3>
          <p className="text-xs text-slate-500 mt-1">Synthetic score movement by reporting period</p>
        </div>
        <StatusPill value={`${segment.integrity || segment.readiness}% current`} tone={segment.integrity < 75 ? 'red' : segment.integrity < 90 ? 'amber' : 'green'} />
      </div>
      <svg viewBox="0 0 360 180" className="mt-4 h-44 w-full">
        <rect width="360" height="180" rx="18" fill="#020617" />
        {[40, 75, 110, 145].map((y) => <line key={y} x1="26" x2="340" y1={y} y2={y} stroke="rgba(148,163,184,0.12)" />)}
        {[36, 94, 152, 210, 268, 326].map((x, index) => (
          <g key={x}>
            <line x1={x} x2={x} y1="28" y2="150" stroke="rgba(148,163,184,0.07)" />
            <text x={x - 9} y="168" fill="#64748B" fontSize="9" fontWeight="800">M{index + 1}</text>
          </g>
        ))}
        <path d={path} fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`${path} L326,150 L36,150 Z`} fill="rgba(56,189,248,0.10)" />
        {points.map((point) => <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="4.5" fill="#0EA5E9" stroke="#E0F2FE" strokeWidth="2" />)}
        <circle cx={current.x} cy={current.y} r="11" fill="rgba(34,197,94,0.18)" stroke="#22C55E" strokeWidth="2" />
        <text x={current.x - 28} y={current.y - 18} fill="#BBF7D0" fontSize="10" fontWeight="900">{current.value}%</text>
      </svg>
    </section>
  );
}

function MapContextPanel({ segment, onOpenModal }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/75 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-white">Segment Context Map</h3>
          <p className="text-xs text-slate-500 mt-1">Illustrative context only - sensitive geometry redacted</p>
        </div>
        <button onClick={() => onOpenModal({ type: 'map', segment })} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white">Open</button>
      </div>
      <div className="p-4">
        <RiskMap segment={segment} onOpenModal={onOpenModal} />
      </div>
    </section>
  );
}

function RiskMap({ segment, onOpenModal, large }) {
  const high = segment.risk === 'High';
  const medium = segment.risk === 'Medium' || segment.risk === 'Moderate';
  return (
    <button onClick={() => onOpenModal({ type: 'map', segment })} className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#020617] text-left ${large ? 'h-[520px]' : 'h-[310px]'}`}>
      <svg viewBox="0 0 820 500" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="corridorBlue" x1="0" x2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="820" height="500" fill="#020617" />
        {[75, 150, 225, 300, 375, 450].map((y) => <path key={y} d={`M0 ${y} H820`} stroke="rgba(148,163,184,0.07)" strokeWidth="1" />)}
        {[90, 190, 290, 390, 490, 590, 690, 790].map((x) => <path key={x} d={`M${x} 0 V500`} stroke="rgba(148,163,184,0.065)" strokeWidth="1" />)}

        <path d="M40 108 H780" stroke="rgba(148,163,184,0.11)" strokeWidth="28" />
        <path d="M40 252 H780" stroke="rgba(148,163,184,0.13)" strokeWidth="34" />
        <path d="M94 40 V460" stroke="rgba(148,163,184,0.10)" strokeWidth="26" />
        <path d="M610 40 V460" stroke="rgba(148,163,184,0.08)" strokeWidth="22" />
        <path d="M0 385 C140 330 260 356 388 405 S630 455 820 390" fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="24" />

        <text x="38" y="92" fill="rgba(148,163,184,0.5)" fontSize="11" fontWeight="900" letterSpacing="2">ELEKAHIA SERVICE ROAD</text>
        <text x="450" y="238" fill="rgba(148,163,184,0.48)" fontSize="11" fontWeight="900" letterSpacing="2">TRANS-AMADI INDUSTRIAL</text>
        <text x="112" y="62" fill="rgba(148,163,184,0.38)" fontSize="10" fontWeight="900" letterSpacing="2" transform="rotate(90 112 62)">GARRISON LINK</text>
        <text x="626" y="62" fill="rgba(148,163,184,0.30)" fontSize="10" fontWeight="900" letterSpacing="2" transform="rotate(90 626 62)">WOJI CONNECTOR</text>

        <path d="M65 338 C150 205 265 160 370 218 S548 350 744 145" fill="none" stroke="rgba(37,99,235,0.20)" strokeWidth="44" strokeLinecap="round" />
        <path d="M65 338 C150 205 265 160 370 218 S548 350 744 145" fill="none" stroke="url(#corridorBlue)" strokeWidth="10" strokeLinecap="round" filter="url(#softGlow)" />
        <path d="M120 250 C210 250 302 250 406 250 S604 250 736 250" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 12" opacity="0.8" />

        {(high || medium) && (
          <g>
            <ellipse cx="500" cy="274" rx={high ? 115 : 86} ry={high ? 86 : 62} fill={high ? '#EF4444' : '#F59E0B'} fillOpacity="0.12" stroke={high ? '#EF4444' : '#F59E0B'} strokeWidth="3" strokeDasharray="10 8" />
            <circle cx="500" cy="274" r="13" fill={high ? '#EF4444' : '#F59E0B'} stroke="#FFF7ED" strokeWidth="3" />
            <text x="523" y="271" fill={high ? '#FCA5A5' : '#FCD34D'} fontSize="11" fontWeight="900" letterSpacing="2">DIG NOTICE BUFFER</text>
            <text x="523" y="287" fill="rgba(226,232,240,0.65)" fontSize="9" fontWeight="800">{segment.exposureScore}% EXPOSURE SCORE</text>
          </g>
        )}

        {[
          [252, 178, '#22C55E'],
          [334, 242, '#06B6D4'],
          [430, 304, '#A78BFA'],
          [650, 198, '#22C55E'],
        ].map(([x, y, color], index) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="7" fill={color} stroke="#020617" strokeWidth="4" />
            <text x={x + 12} y={y + 4} fill="rgba(203,213,225,0.62)" fontSize="8" fontWeight="900">UTILITY {index + 1}</text>
          </g>
        ))}

        <circle cx="65" cy="338" r="15" fill="#22C55E" stroke="#020617" strokeWidth="5" />
        <circle cx="744" cy="145" r="15" fill="#60A5FA" stroke="#020617" strokeWidth="5" />
        <text x="78" y="365" fill="#BBF7D0" fontSize="11" fontWeight="900" letterSpacing="1.5">POINT A</text>
        <text x="675" y="125" fill="#BAE6FD" fontSize="11" fontWeight="900" letterSpacing="1.5">POINT Z</text>

        <rect x="24" y="24" width="398" height="42" rx="14" fill="rgba(2,6,23,0.84)" stroke="rgba(255,255,255,0.10)" />
        <text x="42" y="50" fill="#94A3B8" fontSize="11" fontWeight="900" letterSpacing="2">ILLUSTRATIVE CONTEXT ONLY - SENSITIVE GEOMETRY REDACTED</text>
      </svg>
      <div className="absolute left-4 bottom-4 right-4 flex flex-wrap items-center justify-between gap-2">
        <div className="rounded-xl border border-white/10 bg-slate-950/85 px-4 py-3 backdrop-blur">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{segment.id}</p>
          <p className="text-xs font-bold text-white mt-1">{segment.pointA} to {segment.pointZ}</p>
        </div>
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-amber-200 backdrop-blur">
          <p className="text-[10px] font-black uppercase tracking-widest">Redacted operational view</p>
        </div>
      </div>
    </button>
  );
}

function RecommendedActions({ notices, reviewedNotices, segment, onOpenNotice, onOpenModal }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Recommended Actions</h3>
      <div className="mt-4 space-y-2.5">
        <ActionRow icon={CheckCircle2} label={segment.nextAction} action="View Segment" onClick={() => onOpenModal({ type: 'segment', segment })} />
        {notices.length === 0 && <ActionRow icon={Shield} label="No open CBYD notices for selected segment." action="Monitor" onClick={() => onOpenModal({ type: 'segment', segment })} />}
        {notices.map((notice) => (
          <ActionRow
            key={notice.id}
            icon={Bell}
            label={`${notice.id}: ${notice.title}`}
            action={reviewedNotices.has(notice.id) ? 'Reviewed' : 'Review'}
            onClick={() => onOpenNotice(notice)}
          />
        ))}
      </div>
    </section>
  );
}

function AssetHealthTrend({ segment }) {
  return (
    <SectionFrame title="Asset Health Trend" subtitle="Small-format trend signal for selected segment." compact>
      <div className="p-4">
        <svg viewBox="0 0 520 190" className="h-52 w-full">
          <rect width="520" height="190" rx="18" fill="#020617" />
          {[45, 85, 125, 165].map((y) => <line key={y} x1="26" x2="494" y1={y} y2={y} stroke="rgba(148,163,184,0.12)" />)}
          {segment.trend.map((value, index) => {
            const x = 42 + index * 86;
            const h = Math.max(20, value * 1.25);
            return (
              <g key={`${value}-${index}`}>
                <rect x={x} y={170 - h} width="34" height={h} rx="8" fill={value < 75 ? '#EF4444' : value < 90 ? '#D4A100' : '#22C55E'} opacity="0.82" />
                <text x={x + 3} y="184" fill="#64748B" fontSize="9" fontWeight="900">P{index + 1}</text>
              </g>
            );
          })}
          <text x="30" y="26" fill="#CBD5E1" fontSize="12" fontWeight="900">{segment.id} health / readiness composite</text>
        </svg>
      </div>
    </SectionFrame>
  );
}

function MetricCard({ icon: Icon, label, value, trend, tone }) {
  const tones = {
    blue: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
    green: 'text-green-300 bg-green-500/10 border-green-500/20',
    teal: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    gold: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className={`h-11 w-11 rounded-xl border flex items-center justify-center ${tones[tone] || tones.blue}`}>
          <Icon size={21} />
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-400">{trend}</span>
      </div>
      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500 mt-4">{label}</p>
      <p className="text-2xl font-black text-white mt-1 leading-tight">{value}</p>
    </div>
  );
}

function DetailModal({ modal, close, onBackToRegistry }) {
  const segment = modal.segment;
  const isCertificate = modal.type === 'certificate';
  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
      <div className={`w-full ${isCertificate ? 'max-w-6xl max-h-[92vh] overflow-y-auto' : 'max-w-3xl'} rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl overflow-hidden`}>
        <div className="p-5 border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-400">
              {modal.type === 'certificate' ? 'DICRI Certified Segment Record' : modal.type === 'notice' ? 'Notice Review' : modal.type === 'access' ? 'Access Scope' : modal.type === 'export' ? 'Export Summary' : modal.type === 'map' || modal.type === 'cbyd-map' ? 'Map Detail' : 'Segment Detail'}
            </p>
            <h2 className="text-2xl font-black text-white mt-2">
              {modal.type === 'notice' ? modal.notice.id : modal.type === 'access' ? 'Client Portal Redaction Policy' : modal.type === 'export' ? 'Client Export Package' : modal.type === 'certificate' ? segment?.certNo : segment?.id}
            </h2>
          </div>
          <button onClick={close} className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300">
            <X size={18} />
          </button>
        </div>
        <div className={`${isCertificate ? 'p-4 md:p-6' : 'p-5 space-y-3'}`}>
          {modal.type === 'access' && (
            <>
              <CompactInfo label="Account Role" value="Asset Owner / Portfolio Viewer" wide />
              <CompactInfo label="Allowed View" value="Segment summaries, certificate status, risk status, notices, and audit summaries." wide />
              <CompactInfo label="Hidden Details" value="Fiber counts, splice locations, precise route geometry, device serials, and confidential field artifacts." tone="amber" wide />
            </>
          )}
          {modal.type === 'export' && (
            <>
              <CompactInfo label="Export Contents" value="Filtered segment summary, certificate status, notice status, readiness signals." wide />
              <CompactInfo label="Redaction" value="Sensitive infrastructure coordinates and evidence artifacts excluded." tone="amber" wide />
            </>
          )}
          {modal.type === 'notice' && (
            <>
              <CompactInfo label="Notice" value={modal.notice.title} wide />
              <CompactInfo label="Segment" value={modal.notice.segmentId} />
              <CompactInfo label="Severity" value={modal.notice.severity} tone={riskTone(modal.notice.severity)} />
              <CompactInfo label="Owner Response" value={modal.notice.ownerResponse} />
              <CompactInfo label="Due Date" value={modal.notice.due} />
              <p className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">This synthetic notice summarizes required action without exposing sensitive infrastructure or field-location details.</p>
            </>
          )}
          {modal.type === 'certificate' && segment && (
            <CertificatePreview segment={segment} onBackToRegistry={onBackToRegistry} />
          )}
          {(modal.type === 'segment' || modal.type === 'map' || modal.type === 'cbyd-map') && segment && (
            <>
              <CompactInfo label="Segment ID" value={segment.id} />
              <CompactInfo label="Point A" value={segment.pointA} />
              <CompactInfo label="Point Z" value={segment.pointZ} />
              <CompactInfo label="Portfolio" value={segment.corridor} wide />
              <CompactInfo label="Nature of Work" value={segment.work} wide />
              <CompactInfo label="Lifecycle" value={segment.lifecycle} />
              <CompactInfo label="Risk / Exceptions" value={`${segment.risk} / ${segment.exceptionText}`} tone={riskTone(segment.risk)} wide />
            </>
          )}
        </div>
        {!isCertificate && (
          <div className="p-5 border-t border-white/10 flex justify-end">
            <PrimaryButton icon={Check} onClick={close}>Done</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

function CertificatePreview({ segment, onBackToRegistry }) {
  const record = buildCertificateRecord(segment);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-[#07111f] shadow-2xl">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] text-7xl md:text-9xl font-black tracking-[0.18em] text-white whitespace-nowrap">DEMO SPECIMEN</div>
      </div>
      <div className="absolute right-6 top-6 hidden md:flex h-28 w-28 items-center justify-center rounded-full border border-amber-400/25 bg-amber-400/5 text-center text-[10px] font-black uppercase tracking-[0.18em] text-amber-200">
        DICRI<br />Verified<br />Record
      </div>

      <div className="relative border-b border-white/10 bg-gradient-to-br from-slate-950 via-[#0B1120] to-blue-950/30 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pr-0 md:pr-32">
          <div>
            <div className="flex items-center gap-3">
              <DICRILogo />
              <div>
                <p className="text-3xl font-black tracking-tight text-white">DICRI</p>
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-300">The Trust Layer for Underground Infrastructure</p>
              </div>
            </div>
            <div className="mt-7">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-300">Evidence-backed infrastructure certification record</p>
              <h3 className="mt-2 text-3xl md:text-4xl font-black text-white tracking-tight">DICRI Certified Segment Record</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:w-[360px]">
            <CertificateInfo label="Certificate ID" value={record.certificateId} wide />
            <CertificateInfo label="Registry Reference ID" value={record.registryRef} />
            <CertificateInfo label="Certificate Type" value={record.type} />
            <CertificateInfo label="Status" value={record.status} tone={record.status === 'Certified' ? 'green' : record.status === 'Under Review' ? 'amber' : 'red'} />
            <CertificateInfo label="Issue Date" value={record.issueDate} />
            <CertificateInfo label="Review / Validity Date" value={record.reviewDate} />
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5 p-5 md:p-7">
        <div className="space-y-5">
          <CertificateSection title="Asset Identity">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <CertificateInfo label="Asset Owner" value={record.assetOwner} />
              <CertificateInfo label="Project / Corridor Name" value={record.project} />
              <CertificateInfo label="Region / State / Locality" value={record.locality} />
              <CertificateInfo label="Segment ID" value={record.segmentId} />
              <CertificateInfo label="Asset Class" value={record.assetClass} />
              <CertificateInfo label="Segment Length" value={record.segmentLength} />
              <CertificateInfo label="Criticality Tier" value={record.criticalityTier} wide />
            </div>
          </CertificateSection>

          <CertificateSection title="Resilience Score Breakdown">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {record.breakdown.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-slate-950/55 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black text-white">{item.label}</p>
                    <p className="text-xs font-black text-amber-300">{item.score}/{item.max}</p>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-400">{item.examples}</p>
                  <ScoreBar value={(item.score / item.max) * 100} tone={item.score / item.max > 0.8 ? 'green' : 'amber'} />
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-200">Total Infrastructure Resilience Score</span>
              <span className="text-xl font-black text-white">{record.resilienceScore}/100</span>
            </div>
          </CertificateSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ListPanel title="Key Strengths" items={record.strengths} tone="green" />
            <ListPanel title="Key Resilience Gaps" items={record.gaps} tone="amber" />
            <ListPanel title="Recommended Mitigations" items={record.mitigations} tone="blue" />
          </div>

          <CertificateSection title="Evidence / Governance Basis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {record.governance.map((item) => <CertificateInfo key={item.label} label={item.label} value={item.value} tone={item.tone} />)}
            </div>
          </CertificateSection>
        </div>

        <aside className="space-y-5">
          <CertificateSection title="Certification Scores">
            <ScoreSummary label="Certification Confidence Score" value={record.confidenceScore} helper="How trustworthy is the record?" tone="blue" />
            <ScoreSummary label="Infrastructure Resilience Score" value={record.resilienceScore} helper="How resilient is the asset against known operational threats?" tone="gold" />
            <div className="rounded-xl border border-white/10 bg-slate-950/55 p-4">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">Resilience Grade</p>
              <p className="mt-2 text-4xl font-black text-amber-200">{record.resilienceGrade}</p>
              <ResilienceGauge value={record.resilienceScore} />
            </div>
          </CertificateSection>

          <CertificateSection title="Registry Verification">
            <div className="rounded-2xl border border-blue-500/25 bg-blue-500/10 p-4">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-xl border border-white/15 bg-slate-950 text-blue-200">
                <QrCode size={86} />
              </div>
              <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.18em] text-blue-200">Verify this certificate in the DICRI Registry</p>
            </div>
            <CertificateInfo label="Certificate Hash" value={record.hash} wide />
            <CertificateInfo label="Registry Anchor Reference" value={record.anchor} wide />
            <CertificateInfo label="Registry Status" value="Active / Tamper-evident record verified" tone="green" wide />
          </CertificateSection>

          <CertificateSection title="Authorization">
            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-5 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/35 text-amber-200">
                <Shield size={42} />
              </div>
              <p className="mt-4 text-sm font-black text-white">Authorized DICRI Signatory</p>
              <p className="mt-1 text-xs text-slate-400">Independent Review / Adjudication Authority</p>
              <div className="mt-4 border-t border-amber-300/20 pt-4 text-[10px] font-black uppercase tracking-[0.2em] text-amber-200">Digitally Sealed</div>
            </div>
          </CertificateSection>
        </aside>
      </div>

      <div className="relative border-t border-white/10 bg-slate-950/70 p-5 md:p-6">
        <p className="text-xs leading-relaxed text-slate-400">
          This certificate reflects DICRI's evidence-based assessment of the referenced infrastructure segment at the time of review. Certification documents verified condition, traceability, and resilience posture based on captured evidence. It does not guarantee the elimination of future operational risk.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 justify-end">
          <GhostButton icon={ChevronRight} onClick={onBackToRegistry}>Back to Registry</GhostButton>
          <GhostButton icon={Download} onClick={() => {}}>Download PDF</GhostButton>
          <GhostButton icon={Printer} onClick={() => {}}>Print Certificate</GhostButton>
        </div>
      </div>
    </div>
  );
}

function buildCertificateRecord(segment) {
  const isLagos = segment.id === 'LAG-IKE-SEG-014';
  const resilienceScore = segment.resilienceScore || Math.round(segment.readiness * 0.78);
  return {
    certificateId: isLagos ? 'DICRI-BIRTH-2026-014' : segment.certNo,
    registryRef: segment.registryRef || `REG-${segment.id.slice(-3)}-7F2A`,
    type: segment.certificateType,
    status: segment.certificateStatus || (segment.status === 'Active' ? 'Certified' : segment.status === 'In Review' ? 'Under Review' : 'Conditionally Certified'),
    issueDate: segment.certificateIssueDate || segment.date,
    reviewDate: segment.certificateReviewDate || '10 May 2027',
    assetOwner: isLagos ? 'Equinox Telecom' : segment.owner,
    project: isLagos ? 'Lagos Metro Resilience Corridor' : segment.corridor,
    locality: isLagos ? 'Lagos State / Ikeja' : `${segment.portfolio} / Redacted locality`,
    segmentId: isLagos ? 'LAG-IKE-SEG-014' : segment.id,
    assetClass: segment.assetClass || 'Underground Fiber Conduit + Handhole Access',
    segmentLength: segment.segmentLength || '1.0 km',
    criticalityTier: segment.criticalityTier || 'Tier 2 - Managed Corridor',
    confidenceScore: Math.max(82, Math.round(segment.integrity || segment.confidence)),
    resilienceScore,
    resilienceGrade: segment.resilienceGrade || segment.resilience,
    hash: 'sha256:7f2a9c4e18b6d91a5e0f42c8a63bd12e45a8f9076c4a71d8830d1f9b6ce2041a',
    anchor: 'DICRI-REG-LAGOS-2026-05-10-00014',
    breakdown: [
      { label: 'Physical Protection', score: 24, max: 30, examples: 'Burial depth, hardened conduit, handhole locking, protective backfill.' },
      { label: 'Detection & Monitoring', score: 12, max: 20, examples: 'Lid/tilt intrusion sensors, flood sensors, closure alarms, NOC alert integration.' },
      { label: 'Environmental Resilience', score: 10, max: 15, examples: 'Flood exposure, drainage risk, water ingress protection, heat and soil exposure.' },
      { label: 'Operational Protection', score: 14, max: 15, examples: 'CBYD integration, dig-ticket governance, stakeholder notification, locate response SLA.' },
      { label: 'Route & Network Resilience', score: 8, max: 10, examples: 'Route diversity, alternate path, critical crossing protection.' },
      { label: 'Documentation Quality', score: 10, max: 10, examples: 'GIS accuracy, as-built completeness, evidence integrity, WORM/hash verification.' },
    ],
    strengths: [
      'Verified depth profile captured across segment',
      'CBYD governance enabled',
      'WORM/hash verification complete',
      'GIS alignment within accepted tolerance',
    ],
    gaps: [
      'No lid intrusion sensor on HH-204',
      'Flood exposure near drainage crossing',
      'Standard vault lock still in use at one access point',
    ],
    mitigations: [
      'Install lid/tilt sensor at HH-204',
      'Add flood sensor to downstream vault',
      'Upgrade high-risk handhole to secondary security lid',
      'Schedule post-rain inspection trigger during rainy season',
    ],
    governance: [
      { label: 'Trusted Worker(s)', value: 'Chinedu Okafor - Trusted Capture Operator; Amina Bello - Independent Verification Operator', tone: 'green' },
      { label: 'Trusted Device(s)', value: 'GNSS Receiver GNSS-2241; GPR Scanner GPR-1187', tone: 'green' },
      { label: 'Calibration Status', value: 'Both devices calibration valid at capture', tone: 'green' },
      { label: 'Time / Location Validation', value: '10 May 2026, 09:42 WAT / Ikeja chainage markers verified', tone: 'green' },
      { label: 'Capture Method', value: 'GNSS corridor capture + independent GPR depth verification', tone: 'blue' },
      { label: 'GIS Accuracy', value: 'Alignment within 0.42m accepted tolerance', tone: 'green' },
      { label: 'Adjudication Status', value: 'Independent DICRI review complete', tone: 'green' },
      { label: 'WORM / Hash Verification', value: 'Evidence packet hash locked and registry anchored', tone: 'green' },
    ],
  };
}

function CertificateSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/55 p-4 md:p-5">
      <h4 className="text-[10px] font-black uppercase tracking-[0.24em] text-blue-300">{title}</h4>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function CertificateInfo({ label, value, tone, wide }) {
  const tones = {
    amber: 'text-amber-300',
    red: 'text-red-300',
    green: 'text-green-300',
    blue: 'text-blue-300',
  };
  return (
    <div className={`rounded-xl border border-white/10 bg-slate-950/55 p-3 ${wide ? 'md:col-span-2' : ''}`}>
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className={`mt-1.5 text-xs font-bold leading-relaxed ${tones[tone] || 'text-slate-200'}`}>{value}</p>
    </div>
  );
}

function ScoreSummary({ label, value, helper, tone }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/55 p-4 mb-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">{label}</p>
          <p className="mt-1 text-xs text-slate-400">{helper}</p>
        </div>
        <p className={`text-3xl font-black ${tone === 'gold' ? 'text-amber-200' : 'text-blue-200'}`}>{value}<span className="text-sm text-slate-500">/100</span></p>
      </div>
      <ScoreBar value={value} tone={tone === 'gold' ? 'amber' : 'blue'} />
    </div>
  );
}

function ScoreBar({ value, tone }) {
  const colors = {
    green: 'bg-green-400',
    amber: 'bg-amber-400',
    blue: 'bg-blue-400',
  };
  return (
    <div className="mt-3 h-2 rounded-full bg-slate-800 overflow-hidden">
      <div className={`h-full rounded-full ${colors[tone] || colors.blue}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function ResilienceGauge({ value }) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 h-3 rounded-full overflow-hidden bg-slate-800">
        <div className="bg-red-400/70" />
        <div className="bg-amber-400/80" />
        <div className="bg-green-400/80" />
      </div>
      <div className="relative h-5">
        <div className="absolute top-1 h-4 w-0.5 bg-white" style={{ left: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
        <span>Risk</span>
        <span>Watch</span>
        <span>Resilient</span>
      </div>
    </div>
  );
}

function ListPanel({ title, items, tone }) {
  const dot = tone === 'green' ? 'bg-green-400' : tone === 'amber' ? 'bg-amber-400' : 'bg-blue-400';
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/55 p-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.22em] text-white">{title}</h4>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-2.5 text-xs leading-relaxed text-slate-300">
            <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${dot}`} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CompactInfo({ label, value, tone, wide }) {
  const tones = {
    amber: 'text-amber-300',
    red: 'text-red-300',
    green: 'text-green-300',
  };
  return (
    <div className={`rounded-xl border border-white/10 bg-slate-950/55 p-3 ${wide ? 'col-span-2' : ''}`}>
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className={`text-xs font-bold mt-1.5 leading-relaxed ${tones[tone] || 'text-slate-200'}`}>{value}</p>
    </div>
  );
}

function ProgressBlock({ label, value, tone }) {
  const color = tone === 'green' ? 'bg-green-500' : 'bg-blue-500';
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/55 p-3">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-500">{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="mt-2.5 h-2 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MiniProgress({ value, tone }) {
  return (
    <div className="w-28">
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-full ${tone === 'green' ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${value}%` }} />
      </div>
      <p className="text-[10px] text-slate-500 mt-1">{value}%</p>
    </div>
  );
}

function SignalBox({ label, value, tone }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/55 p-3">
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className={`text-lg font-black mt-1 ${toneText(tone)}`}>{value}</p>
    </div>
  );
}

function HeaderChip({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
      <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">{label}</p>
      <p className="text-xs font-black text-white mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const tone = status === 'Active' ? 'green' : status === 'Quarantine' ? 'red' : status === 'In Review' ? 'amber' : 'blue';
  return <StatusPill value={status} tone={tone} />;
}

function StatusPill({ value, tone }) {
  const tones = {
    green: 'bg-green-500/10 text-green-300 border-green-500/25',
    red: 'bg-red-500/10 text-red-300 border-red-500/25',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/25',
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${tones[tone] || tones.blue}`}>{value}</span>;
}

function RiskBadge({ value }) {
  return <StatusPill value={value} tone={riskTone(value)} />;
}

function LifecycleBadge({ value }) {
  return <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-blue-300">{value}</span>;
}

function PrimaryButton({ icon: Icon, onClick, children }) {
  return (
    <button onClick={onClick} className="rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-950/30 flex items-center gap-2">
      <Icon size={14} />
      {children}
    </button>
  );
}

function GhostButton({ icon: Icon, onClick, children }) {
  return (
    <button onClick={onClick} className="rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-200 flex items-center gap-2">
      <Icon size={14} />
      {children}
    </button>
  );
}

function IconButton({ icon: Icon, title, onClick, disabled }) {
  return (
    <button title={title} disabled={disabled} onClick={onClick} className={`h-9 w-9 rounded-xl border border-white/10 flex items-center justify-center ${disabled ? 'text-slate-700 cursor-not-allowed bg-white/[0.02]' : 'text-slate-300 bg-white/[0.04] hover:bg-blue-600 hover:text-white'}`}>
      <Icon size={15} />
    </button>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-xs font-bold text-slate-200 outline-none focus:border-blue-500">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ActionRow({ icon: Icon, label, action, onClick }) {
  return (
    <button onClick={onClick} className="w-full rounded-xl border border-white/10 bg-slate-950/55 hover:bg-white/[0.04] p-3 text-left flex items-center justify-between gap-3">
      <span className="flex items-center gap-2.5 text-xs font-bold text-slate-200"><Icon size={15} className="text-blue-400 shrink-0" />{label}</span>
      <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 shrink-0">{action}</span>
    </button>
  );
}

function LegendRow({ color, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-xs font-bold text-slate-300">{label}</span>
      </div>
      <span className="text-xs font-black text-white">{value}</span>
    </div>
  );
}

function riskTone(value) {
  if (value === 'High') return 'red';
  if (value === 'Medium' || value === 'Moderate' || value === 'Unknown') return 'amber';
  return 'green';
}

function toneText(tone) {
  if (tone === 'red') return 'text-red-300';
  if (tone === 'amber') return 'text-amber-300';
  if (tone === 'green') return 'text-green-300';
  return 'text-blue-300';
}
