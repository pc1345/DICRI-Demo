import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Award,
  BadgeCheck,
  Bell,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Database,
  Eye,
  FileArchive,
  FileCheck2,
  FileText,
  Filter,
  Gauge,
  GitBranch,
  HardDrive,
  History,
  Layers,
  Lock,
  Map,
  PackageCheck,
  Search,
  Shield,
  ShieldAlert,
  SlidersHorizontal,
  Upload,
  Users,
  X,
} from 'lucide-react';

const VIEW_MODES = {
  internal: 'DICRI Internal Backend',
  owner: 'Mature Market / Owner-Operated Backend',
};
const OWNER_CONTEXT = 'Equinox Telecom';

const INTERNAL_TABS = [
  ['command', 'Command Center', Activity],
  ['packets', 'Packet Intake', Upload],
  ['segmentation', 'Segmentation Workspace', GitBranch],
  ['registry', 'Segment Registry', Database],
  ['trust', 'Trust Gate Monitor', ShieldAlert],
  ['exceptions', 'Exception Review', AlertTriangle],
  ['performance', 'Vendor & Worker Performance', Users],
  ['sla', 'SLA & Vendor Performance', Clock],
  ['review', 'Certificate Review Queue', Award],
  ['builder', 'Audit Packet Builder', FileArchive],
  ['certificates', 'Certificate Registry', BadgeCheck],
];

const OWNER_TABS = [
  ['command', 'Operations Dashboard', Activity],
  ['packets', 'Project Packets', Upload],
  ['registry', 'Segments', Database],
  ['evidence', 'Evidence Status', FileCheck2],
  ['trust', 'Trust Gate Issues', ShieldAlert],
  ['exceptions', 'Exception Review', AlertTriangle],
  ['performance', 'Vendor / Worker Analytics', Users],
  ['sla', 'Workforce & SLA Analytics', Clock],
  ['review', 'DICRI Review Requests', Award],
  ['risk', 'Asset Risk Trends', Gauge],
];

const owners = ['MTN Nigeria', 'BRI Fiber Services', 'Equinox Telecom'];
const vendors = ['Delta Civil Works Ltd.', 'Janvier Infrastructure', 'Northline Fiber', 'MetroBuild Utilities'];
const packetTypes = ['KMZ/KML route file', 'GIS shapefile', 'As-built PDF', 'Permit record', 'Photo packet', 'GNSS point set', 'Depth readings', 'Drone/LiDAR file', 'Splice record', 'Test result'];
const packetStatuses = ['Received', 'Parsed', 'Missing Required Data', 'Ready for Segmentation', 'Segmentation in Progress', 'Assigned', 'Evidence Capture Active', 'Review Required', 'Certificate Eligible'];
const failureTypes = ['worker not certified', 'device not registered', 'calibration expired', 'geofence mismatch', 'timestamp anomaly', 'offline trust window exceeded', 'missing required photo', 'GNSS precision below threshold', 'out-of-tolerance depth reading', 'evidence hash mismatch'];
const evidenceStatuses = ['Raw Captured', 'Pending Validation', 'Exception Evidence', 'Rejected', 'Policy-Admissible', 'Certified Record'];
const slaTypes = ['Time to accept assignment', 'Time to arrive on site', 'Time to start capture after arrival', 'Time to complete segment capture', 'Time to upload evidence after capture', 'Time to resolve failed trust gate', 'Time to complete remeasure', 'Time to close exception', 'Time to submit to DICRI review'];
const delayTypes = ['Field arrival delay', 'Capture execution delay', 'Evidence upload delay', 'Trust-gate failure delay', 'Remeasure delay', 'Supervisor review delay', 'Client access delay', 'Connectivity delay', 'Assignment overload'];
const slaWorkTypes = ['Depth readings', 'GNSS point set', 'Photo evidence capture', 'Drone LiDAR scan', 'Locate response', 'Remeasure', 'Exception review', 'Evidence upload', 'DICRI review submission'];
const slaRegions = ['Lagos', 'FCT', 'Port Harcourt', 'Ibadan', 'Oakbrook Terrace', 'Downers Grove'];
const slaVendorTeams = ['All teams', 'Delta Civil Works Ltd.', 'Janvier Infrastructure', 'Northline Fiber', 'MetroBuild Utilities', 'Internal Owner Crew A', 'Internal Owner Crew B'];
const slaRiskTiers = ['All', 'Low', 'Medium', 'High', 'Critical'];
const devices = Array.from({ length: 10 }, (_, i) => {
  const types = ['GNSS rover', 'Depth meter', 'Tablet', 'Drone LiDAR', 'Locator'];
  return {
    id: `DEV-${String(i + 1).padStart(3, '0')}`,
    type: types[i % types.length],
    serial: `DICRI-${types[i % types.length].slice(0, 3).toUpperCase()}-${1180 + i}`,
    calibration: i % 7 === 0 ? 'Expired' : 'Valid',
    registered: i % 9 !== 0,
  };
});

const workers = [
  ['WKR-001', 'Amina Bello', 'Cheetah', 'Janvier Infrastructure'],
  ['WKR-002', 'Daniel Okafor', 'Cheetah', 'Northline Fiber'],
  ['WKR-003', 'Tola Ogunleye', 'Tiger', 'DICRI Authority'],
  ['WKR-004', 'Maya Chen', 'Cheetah', 'Delta Civil Works Ltd.'],
  ['WKR-005', 'R. Okafor', 'Intake Clerk', 'DICRI Authority'],
  ['WKR-006', 'Chinedu Okafor', 'Admin', 'Equinox Telecom'],
  ['WKR-007', 'Nneka Usman', 'Tiger', 'DICRI Authority'],
  ['WKR-008', 'Folake Mensah', 'Cheetah', 'MetroBuild Utilities'],
].map(([id, name, role, vendor]) => ({ id, name, role, vendor }));

const projects = [
  ['PRJ-001', 'Lagos Metro Fiber Renewal', 'MTN Nigeria', 'Lagos', 'Janvier Infrastructure'],
  ['PRJ-002', 'Port Harcourt Resilience Corridor', 'Equinox Telecom', 'Rivers', 'Delta Civil Works Ltd.'],
  ['PRJ-003', 'Abuja Backbone Health Review', 'BRI Fiber Services', 'FCT', 'Northline Fiber'],
  ['PRJ-004', 'Kano Ring Route Baseline', 'MTN Nigeria', 'Kano', 'MetroBuild Utilities'],
  ['PRJ-005', 'Lekki Coastal Crossing', 'Equinox Telecom', 'Lagos', 'Janvier Infrastructure'],
  ['PRJ-006', 'Ibadan Utility Crossing Program', 'BRI Fiber Services', 'Oyo', 'Delta Civil Works Ltd.'],
].map(([id, name, owner, region, vendor], index) => ({ id, name, owner, region, vendor, segmentation: ['1 km default segment', 'Road crossing boundary', 'Splice boundary', 'Client-defined segment', 'Risk-based segment'][index % 5] }));

const packets = Array.from({ length: 14 }, (_, i) => {
  const project = projects[i % projects.length];
  return {
    id: `PKT-2026-${String(210 + i).padStart(4, '0')}`,
    project: project.name,
    projectId: project.id,
    owner: project.owner,
    vendor: project.vendor,
    type: packetTypes[i % packetTypes.length],
    received: `2026-05-${String(10 + (i % 4)).padStart(2, '0')} ${String(8 + (i % 9)).padStart(2, '0')}:2${i % 6}`,
    status: packetStatuses[i % packetStatuses.length],
    missing: i % 5 === 0 ? 'Route sketch, GNSS precision report' : i % 4 === 0 ? 'Calibration artifact' : 'None',
    files: packetTypes.slice(i % 5, (i % 5) + 4),
  };
});

const segments = Array.from({ length: 30 }, (_, i) => {
  const project = projects[i % projects.length];
  const vendor = vendors[i % vendors.length];
  const workerA = workers[i % workers.length];
  const workerB = workers[(i + 3) % workers.length];
  const deviceA = devices[i % devices.length];
  const status = ['Capture Active', 'Evidence Review', 'Certificate Eligible', 'Exception Review', 'Certified', 'Blocked'][i % 6];
  const evidenceStatus = status === 'Certified' ? 'Certified Record' : status === 'Certificate Eligible' ? 'Policy-Admissible' : status === 'Exception Review' ? 'Exception Evidence' : status === 'Blocked' ? 'Rejected' : evidenceStatuses[i % evidenceStatuses.length];
  return {
    id: `${project.region.slice(0, 3).toUpperCase()}-${project.id.slice(-3)}-SEG-${String(i + 1).padStart(3, '0')}`,
    projectId: project.id,
    project: project.name,
    owner: project.owner,
    region: project.region,
    vendor,
    route: `${project.region} corridor chainage ${i}+000 to ${i}+980`,
    start: `6.${5200 + i}, 3.${3100 + i}`,
    end: `6.${5295 + i}, 3.${3180 + i}`,
    length: `${(0.72 + (i % 5) * 0.18).toFixed(2)} km`,
    workers: [workerA.name, workerB.name],
    devices: [deviceA.serial, devices[(i + 2) % devices.length].serial],
    captureWindow: `May ${12 + (i % 8)} 08:00-18:00`,
    status,
    certificateStatus: status === 'Certified' ? 'Issued' : status === 'Certificate Eligible' ? 'Ready for Tiger Review' : status === 'Exception Review' ? 'Review Required' : 'Not Ready',
    readiness: status === 'Certified' ? 100 : status === 'Certificate Eligible' ? 92 : status === 'Evidence Review' ? 76 : status === 'Exception Review' ? 62 : 44,
    evidenceStatus,
    integrity: evidenceStatus === 'Policy-Admissible' || evidenceStatus === 'Certified Record' ? 'Hash verified / WORM preserved' : evidenceStatus === 'Rejected' ? 'Hash mismatch or hard stop' : 'Pending validation',
    exceptions: i % 6 === 3 ? 2 : i % 9 === 0 ? 1 : 0,
    risk: i % 8 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : 'Low',
    depthDeviation: Number((0.034 + (i % 7) * 0.007).toFixed(3)),
  };
});

const trustEvents = Array.from({ length: 18 }, (_, i) => {
  const segment = segments[(i * 2) % segments.length];
  return {
    id: `TGE-${String(i + 1).padStart(3, '0')}`,
    timestamp: `2026-05-13 ${String(8 + (i % 10)).padStart(2, '0')}:${String(12 + i).padStart(2, '0')}`,
    segment: segment.id,
    worker: workers[i % workers.length].name,
    device: devices[i % devices.length].serial,
    vendor: segment.vendor,
    project: segment.project,
    failureType: failureTypes[i % failureTypes.length],
    severity: ['Warning', 'Blocked', 'Hard Stop', 'Review Required'][i % 4],
    action: ['Remeasure', 'Replace device', 'Request supervisor approval', 'Submit to Tiger review'][i % 4],
    resolutionStatus: 'Unresolved',
    auditTrail: [],
  };
});

const certificates = segments.filter((segment) => ['Certified', 'Certificate Eligible', 'Evidence Review'].includes(segment.status)).slice(0, 12).map((segment, i) => ({
  id: `DICRI-${i % 2 ? 'HC' : 'BC'}-2026-${String(410 + i).padStart(4, '0')}`,
  segmentId: segment.id,
  owner: segment.owner,
  project: segment.project,
  issueDate: i % 3 === 0 ? 'Pending' : `2026-05-${String(9 + i).padStart(2, '0')}`,
  type: i % 2 ? 'Health Certificate' : 'Birth Certificate',
  status: segment.status === 'Certified' ? 'Issued' : 'Review Pending',
  hash: `0x${(991120 + i * 771).toString(16).toUpperCase()}...MASKED`,
  renewal: `2027-05-${String(9 + i).padStart(2, '0')}`,
}));

const workerAnalytics = workers.map((worker, i) => {
  const assigned = segments.filter((segment) => segment.workers.includes(worker.name));
  return {
    ...worker,
    assignedSegments: assigned.length,
    completedSegments: Math.max(1, assigned.filter((segment) => ['Certified', 'Certificate Eligible', 'Evidence Review'].includes(segment.status)).length),
    slaCompliance: 96 - (i % 5) * 7,
    firstPassAcceptance: 93 - (i % 4) * 8,
    remeasureRate: 3 + (i % 5) * 2,
    outOfToleranceRate: 2 + (i % 4) * 3,
    failedTrustGateRate: 1 + (i % 6) * 2,
    averageArrival: `${22 + i * 4} min`,
    averageCapture: `${48 + i * 7} min`,
    signal: ['Strong performer', 'Evidence coaching recommended', 'Arrival delays', 'High remeasure rate', 'Device readiness issue', 'Assignment load issue', 'Connectivity-related delays', 'Strong performer'][i],
    assignedDevices: devices.slice(i % 4, (i % 4) + 3).map((device) => device.serial),
    recentSegments: assigned.slice(0, 4).map((segment) => segment.id),
    timeline: ['Assigned', 'Accepted', 'Dispatched', 'Arrived on site', 'Capture started', 'Capture completed', 'Evidence uploaded', 'Trust gates passed/failed', 'Exception opened', 'Remeasure requested', 'Remeasure completed', 'Submitted for review', 'Closed'].map((step, index) => ({
      step,
      time: `2026-05-13 ${String(8 + Math.floor(index / 2)).padStart(2, '0')}:${String((index * 7 + i) % 60).padStart(2, '0')}`,
      delay: delayTypes[(index + i) % delayTypes.length],
      status: index % 5 === 0 && i % 3 === 0 ? 'Warning' : 'Recorded',
    })),
  };
});

const statusTone = (value) => {
  if (['Issued', 'Certified', 'Certificate Eligible', 'Policy-Admissible', 'Passed', 'Ready', 'Parsed', 'Ready for Segmentation', 'Certificate Eligible', 'Active'].includes(value)) return 'green';
  if (['Blocked', 'Hard Stop', 'Rejected', 'Not Certifiable', 'Missing Required Data'].includes(value)) return 'red';
  if (['Warning', 'Review Required', 'Pending Review', 'In Review', 'Exception Evidence', 'Missing Evidence', 'Supplemental Evidence Required'].includes(value)) return 'amber';
  return 'blue';
};

const filterSegmentsByDashboardContext = (rows, context) => {
  if (!context) return rows;
  if (context.kind === 'active-segments') return rows.filter((segment) => ['Assigned', 'Capture Active', 'Evidence Review', 'Exception Review', 'Certificate Eligible'].includes(segment.status));
  if (context.kind === 'under-review') return rows.filter((segment) => ['Evidence Review', 'Exception Review'].includes(segment.status));
  return rows;
};

export default function BackendControlPlane() {
  const [mode, setMode] = useState('internal');
  const [activeTab, setActiveTab] = useState('command');
  const [allSegments, setAllSegments] = useState(segments);
  const [selectedPacket, setSelectedPacket] = useState(packets[0]);
  const [selectedSegment, setSelectedSegment] = useState(segments[0]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(workerAnalytics[0]);
  const [trustEventRows, setTrustEventRows] = useState(trustEvents);
  const [projectFilter, setProjectFilter] = useState('All');
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [vendorFilter, setVendorFilter] = useState('All');
  const [failureFilter, setFailureFilter] = useState('All');
  const [dashboardContext, setDashboardContext] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const isInternal = mode === 'internal';
  const tabs = isInternal ? INTERNAL_TABS : OWNER_TABS;
  const ownerScopedSegments = useMemo(() => allSegments.filter((segment) => isInternal || segment.owner === OWNER_CONTEXT), [allSegments, isInternal]);
  const ownerScopedPackets = useMemo(() => packets.filter((packet) => isInternal || packet.owner === OWNER_CONTEXT), [isInternal]);
  const ownerScopedProjects = useMemo(() => projects.filter((project) => isInternal || project.owner === OWNER_CONTEXT), [isInternal]);
  const ownerScopedEvents = useMemo(() => trustEventRows.filter((event) => {
    if (isInternal) return true;
    const segment = allSegments.find((item) => item.id === event.segment);
    return segment?.owner === OWNER_CONTEXT;
  }), [allSegments, isInternal, trustEventRows]);

  const visibleSegments = useMemo(() => ownerScopedSegments.filter((segment) => (
    (projectFilter === 'All' || segment.project === projectFilter) &&
    (isInternal ? (ownerFilter === 'All' || segment.owner === ownerFilter) : segment.owner === OWNER_CONTEXT) &&
    (vendorFilter === 'All' || segment.vendor === vendorFilter)
  )), [isInternal, ownerFilter, ownerScopedSegments, projectFilter, vendorFilter]);

  const visibleEvents = useMemo(() => ownerScopedEvents.filter((event) => (
    (failureFilter === 'All' || event.failureType === failureFilter) &&
    (vendorFilter === 'All' || event.vendor === vendorFilter) &&
    (projectFilter === 'All' || event.project === projectFilter)
  )), [failureFilter, ownerScopedEvents, projectFilter, vendorFilter]);

  const resolveTrustEvent = (eventId, resolution) => {
    setTrustEventRows((current) => current.map((event) => event.id === eventId ? { ...event, ...resolution } : event));
    setSelectedEvent((current) => current?.id === eventId ? { ...current, ...resolution } : current);
  };

  const reassignTrustEvent = (event, worker) => {
    const timestamp = '2026-05-14 10:32';
    const audit = [
      ...(event.auditTrail || []),
      { label: 'Original failed capture timestamp', value: event.timestamp },
      { label: 'Failure reason', value: event.failureType },
      { label: 'Original worker', value: event.worker },
      { label: 'Admin resolution action', value: 'Reassign Certified Worker' },
      { label: 'New assigned worker', value: worker.name },
      { label: 'Reassignment timestamp', value: timestamp },
      { label: 'Required remeasure status', value: 'Remeasure required before certificate eligibility' },
    ];
    resolveTrustEvent(event.id, {
      resolutionStatus: 'Reassigned — Remeasure Required',
      action: 'Remeasure required',
      reassignedWorker: worker.name,
      auditTrail: audit,
    });
    setAllSegments((current) => current.map((segment) => segment.id === event.segment ? { ...segment, workers: [worker.name, ...segment.workers.filter((name) => name !== event.worker)], status: 'Exception Review', certificateStatus: 'Review Required' } : segment));
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setActiveTab('command');
    setProjectFilter('All');
    setOwnerFilter('All');
    setVendorFilter('All');
    setFailureFilter('All');
    setDashboardContext(null);
    setDrawer(null);
  };

  const navigateFromKpi = (context) => {
    setDashboardContext(context);
    setActiveTab(context.tab);
    if (context.tab === 'trust') setFailureFilter('All');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <header className="border-b border-white/10 bg-[#07111f] px-5 py-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-400">DICRI Operational Control Plane</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Backend governance for trusted infrastructure evidence</h1>
            <p className="mt-2 max-w-4xl text-sm text-slate-400">
              Packet intake, segmentation, evidence review, trust-gate failures, vendor performance, certificate readiness, and certificate issuance governance.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-1 flex">
            {Object.entries(VIEW_MODES).map(([key, label]) => (
              <button key={key} onClick={() => switchMode(key)} className={`rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest ${mode === key ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] min-h-[calc(100vh-129px)]">
        <aside className="border-r border-white/10 bg-[#0B1120] p-4 space-y-3">
          <AuthorityCard isInternal={isInternal} />
          <nav className="space-y-1">
            {tabs.map(([id, label, Icon]) => (
              <button key={id} onClick={() => { setActiveTab(id); setDashboardContext(null); }} className={`w-full rounded-xl px-3 py-3 flex items-center justify-between text-left ${activeTab === id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tight"><Icon size={16} />{label}</span>
                {activeTab === id && <ChevronRight size={14} />}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 p-5 space-y-5">
          {!isInternal && <OwnerContextBanner owner={OWNER_CONTEXT} />}
          {activeTab === 'command' && <CommandCenter isInternal={isInternal} segments={visibleSegments} projects={ownerScopedProjects} owner={OWNER_CONTEXT} onKpiClick={navigateFromKpi} />}
          {activeTab === 'packets' && <PacketIntake isInternal={isInternal} owner={OWNER_CONTEXT} packetRows={ownerScopedPackets} selectedPacket={selectedPacket} setSelectedPacket={setSelectedPacket} openDrawer={setDrawer} context={dashboardContext} />}
          {activeTab === 'segmentation' && <SegmentationWorkspace openSegment={(segment) => { setSelectedSegment(segment); setDrawer('segment'); }} />}
          {activeTab === 'registry' && <SegmentRegistry isInternal={isInternal} segments={visibleSegments} selectedSegment={selectedSegment} setSelectedSegment={setSelectedSegment} openDrawer={() => setDrawer('segment')} projectFilter={projectFilter} setProjectFilter={setProjectFilter} ownerFilter={ownerFilter} setOwnerFilter={setOwnerFilter} vendorFilter={vendorFilter} setVendorFilter={setVendorFilter} context={dashboardContext} />}
          {activeTab === 'evidence' && <EvidenceStatus segments={visibleSegments} openSegment={(segment) => { setSelectedSegment(segment); setDrawer('segment'); }} />}
          {activeTab === 'trust' && <TrustGateMonitor events={visibleEvents} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} openDrawer={setDrawer} failureFilter={failureFilter} setFailureFilter={setFailureFilter} context={dashboardContext} />}
          {activeTab === 'exceptions' && <ExceptionReview isInternal={isInternal} segments={ownerScopedSegments.filter((segment) => segment.exceptions || segment.depthDeviation > 0.05)} openDrawer={setDrawer} setSelectedSegment={setSelectedSegment} context={dashboardContext} />}
          {activeTab === 'performance' && <PerformanceAnalytics isInternal={isInternal} segments={ownerScopedSegments} owner={OWNER_CONTEXT} />}
          {activeTab === 'sla' && <SlaWorkforceAnalytics isInternal={isInternal} segments={ownerScopedSegments} owner={OWNER_CONTEXT} context={dashboardContext} openWorker={(worker) => { setSelectedWorker(worker); setDrawer('worker'); }} />}
          {activeTab === 'review' && <ReviewQueue isInternal={isInternal} segments={ownerScopedSegments} context={dashboardContext} openSegment={(segment) => { setSelectedSegment(segment); setDrawer('segment'); }} />}
          {activeTab === 'builder' && isInternal && <AuditPacketBuilder segment={selectedSegment} />}
          {activeTab === 'certificates' && isInternal && <CertificateRegistry isInternal={isInternal} segments={allSegments} context={dashboardContext} openSegment={(segment) => { setSelectedSegment(segment); setDrawer('segment'); }} openCertificateLater={() => setDrawer('certificate-later')} />}
          {activeTab === 'risk' && !isInternal && <RiskTrends segments={visibleSegments} />}
        </main>
      </div>

      {drawer && (
        <Drawer title={drawerTitle(drawer)} onClose={() => setDrawer(null)}>
          {drawer === 'packet' && <PacketDrawer packet={selectedPacket} isInternal={isInternal} />}
          {drawer === 'segment' && <SegmentEvidenceRecord segment={selectedSegment} isInternal={isInternal} />}
          {drawer === 'trust' && <TrustGateDrawer event={selectedEvent || visibleEvents[0]} onResolve={resolveTrustEvent} onReassign={reassignTrustEvent} />}
          {drawer === 'worker' && <WorkerDetailDrawer worker={selectedWorker} isInternal={isInternal} />}
          {drawer === 'segmentation-wizard' && <PacketSegmentationWizard packet={selectedPacket} onPublish={(newSegments) => { setAllSegments((current) => [...newSegments, ...current]); setSelectedSegment(newSegments[0]); }} onViewRegistry={() => { setActiveTab('registry'); setDrawer(null); }} onViewDashboard={() => { setActiveTab('command'); setDrawer(null); }} />}
          {drawer === 'certificate-later' && <CertificateLaterWorkflow setSelectedSegment={setSelectedSegment} />}
        </Drawer>
      )}
    </div>
  );
}

function AuthorityCard({ isInternal }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-400">{isInternal ? 'Certification Authority' : 'Owner-Operated Governance'}</p>
      <p className="mt-2 text-sm font-black text-white">{isInternal ? 'DICRI Internal Backend' : 'Mature Market Backend'}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        {isInternal ? 'Full certificate review, audit packet, and issuance controls are visible.' : 'Operators manage packets, projects, evidence, and review requests. DICRI remains the certificate issuer.'}
      </p>
    </div>
  );
}

function OwnerContextBanner({ owner }) {
  return (
    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-cyan-200">
      <Building2 size={13} />
      Owner context: {owner}
    </div>
  );
}

function CommandCenter({ isInternal, segments, projects: scopedProjects, owner, onKpiClick }) {
  const eligible = segments.filter((segment) => segment.status === 'Certificate Eligible').length;
  const underReview = segments.filter((segment) => segment.status === 'Evidence Review' || segment.status === 'Exception Review').length;
  const segmentIds = new Set(segments.map((segment) => segment.id));
  const failed = trustEvents.filter((event) => event.severity !== 'Warning' && (isInternal || segmentIds.has(event.segment))).length;
  const issued = certificates.filter((cert) => cert.status === 'Issued' && (isInternal || segmentIds.has(cert.segmentId))).length;
  const distribution = ['Certified', 'Certificate Eligible', 'Evidence Review', 'Exception Review', 'Blocked'].map((label) => [label, segments.filter((segment) => segment.status === label).length]);
  const kpis = [
    { icon: Boxes, label: 'Active Projects', value: scopedProjects.length, context: { tab: 'packets', label: 'Filter: Active projects', kind: 'active-projects' } },
    { icon: Layers, label: 'Active Segments', value: segments.length, context: { tab: 'registry', label: 'Filter: Active or in-progress segments', kind: 'active-segments' } },
    { icon: Award, label: 'Certificate Eligible Segments', value: eligible, tone: 'green', context: { tab: 'review', label: 'Filter: Certificate Eligible', kind: 'certificate-eligible' } },
    { icon: Clock, label: 'Segments Under Review', value: underReview, tone: 'amber', context: { tab: 'registry', label: 'Filter: Under Review', kind: 'under-review' } },
    { icon: ShieldAlert, label: 'Failed Trust Gates Today', value: failed, tone: 'red', context: { tab: 'trust', label: 'Filter: Failed trust gates - Today', kind: 'failed-trust-today' } },
    { icon: AlertTriangle, label: 'Open Exceptions', value: segments.reduce((sum, segment) => sum + segment.exceptions, 0), tone: 'amber', context: { tab: 'exceptions', label: 'Filter: Open Exceptions', kind: 'open-exceptions' } },
    { icon: BadgeCheck, label: 'Certificates Issued', value: isInternal ? issued : 'DICRI view', tone: 'blue', context: { tab: isInternal ? 'certificates' : 'review', label: 'Filter: Certificate status - Issued', kind: 'certificates-issued' } },
    { icon: Gauge, label: 'Average Review Cycle Time', value: '2.8 days', context: { tab: isInternal ? 'review' : 'sla', label: 'Filter: Review cycle time / aging analysis', kind: 'review-aging' } },
  ];
  return (
    <section className="space-y-5">
      <PanelHeader title={isInternal ? 'Command Center' : 'Operations Dashboard'} text={isInternal ? 'Internal oversight across certification readiness, exceptions, and issuance governance.' : 'Owner-visible operational control without DICRI certificate issuance authority.'} />
      {!isInternal && <FilterChip context={{ label: `Viewing ${owner} operational records` }} />}
      {!isInternal && <InfoBanner text="Owner-operated users can manage evidence and submit to DICRI Review. Approve Certificate and Issue Certificate controls are intentionally unavailable." />}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => <Kpi key={kpi.label} {...kpi} onClick={() => onKpiClick(kpi.context)} />)}
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-[1.2fr_0.8fr] gap-5">
        <Card title="Recent Governed Activity" icon={History}>
          {[
            ['2026-05-13 09:42', 'Evidence packet marked policy-admissible', 'ADMISSIBLE'],
            ['2026-05-13 09:18', 'Offline trust window exceeded on field device', 'EXCEPTION'],
            ['2026-05-13 08:51', 'Certificate review packet generated', 'RECORDED'],
            ['2026-05-13 08:45', 'App instance authorization verified', 'VERIFIED'],
          ].map(([time, event, status]) => <ActivityRow key={`${time}-${event}`} time={time} event={event} status={status} />)}
        </Card>
        <Card title="Certificate Pipeline Summary" icon={Award}>
          <MiniBar label="Certificate eligible" value={eligible} max={segments.length} tone="green" />
          <MiniBar label="Under review" value={underReview} max={segments.length} tone="amber" />
          <MiniBar label="Issued records" value={issued} max={segments.length} tone="blue" />
          <MiniBar label="Trust-gate blocked" value={segments.filter((s) => s.status === 'Blocked').length} max={segments.length} tone="red" />
        </Card>
        <Card title="Trust-Gate Failure Trend — Week of May 12" icon={Activity}>
          <p className="mb-4 text-sm font-bold text-slate-400">Daily failed gate events by category</p>
          <TrustGateFailureChart />
        </Card>
        <Card title="Segment Status Distribution" icon={SlidersHorizontal}>
          {distribution.map(([label, value]) => <MiniBar key={label} label={label} value={value} max={segments.length} tone={statusTone(label)} />)}
        </Card>
      </div>
    </section>
  );
}

function TrustGateFailureChart() {
  const categories = [
    ['Worker authorization', 'bg-cyan-400'],
    ['Device trust', 'bg-blue-500'],
    ['Calibration', 'bg-amber-400'],
    ['Assignment mismatch', 'bg-purple-500'],
    ['Evidence completeness', 'bg-green-500'],
    ['Geo/time validation', 'bg-red-500'],
    ['Capture method', 'bg-orange-500'],
  ];
  const rows = [
    { day: 'Mon', values: [0, 0, 0, 0, 2, 0, 0] },
    { day: 'Tue', values: [2, 0, 0, 2, 0, 0, 0] },
    { day: 'Wed', values: [0, 0, 3, 0, 0, 0, 0] },
    { day: 'Thu', values: [0, 2, 0, 0, 1, 1, 0] },
    { day: 'Fri', values: [0, 0, 0, 0, 3, 0, 1] },
    { day: 'Sat', values: [0, 2, 4, 0, 0, 0, 3] },
    { day: 'Sun', values: [0, 0, 0, 2, 2, 0, 0] },
  ];
  const max = Math.max(...rows.map((row) => row.values.reduce((sum, value) => sum + value, 0)), 1);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map(([label, color]) => (
          <div key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-3 h-64 items-end">
        {rows.map((row) => {
          const total = row.values.reduce((sum, value) => sum + value, 0);
          const summary = row.values
            .map((value, index) => value ? `${value} ${categories[index][0].toLowerCase()}` : null)
            .filter(Boolean)
            .join(', ');
          return (
            <div key={row.day} className="flex h-full flex-col justify-end gap-2" title={`${row.day}: ${total} failed gate events - ${summary}`}>
              <div className="flex h-52 items-end rounded-xl border border-white/5 bg-slate-950/55 p-2">
                <div className="flex w-full flex-col-reverse overflow-hidden rounded-lg bg-slate-900/80" style={{ height: `${Math.max(12, Math.round((total / max) * 196))}px` }}>
                  {row.values.map((value, index) => value ? <div key={`${row.day}-${categories[index][0]}`} className={categories[index][1]} style={{ height: `${Math.max(8, Math.round((value / total) * Math.max(12, Math.round((total / max) * 196))))}px` }} /> : null)}
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{row.day}</p>
                <p className="mt-1 text-xs font-black text-white">{total}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
        <span className="font-black">Primary failure driver this week:</span> calibration and device trust failures. Review device readiness before dispatch.
      </div>
    </div>
  );
}

function PacketIntake({ isInternal, owner, packetRows, selectedPacket, setSelectedPacket, openDrawer, context }) {
  const demoPacketForm = {
    name: isInternal ? 'BRI Route Package - Oakbrook Terrace to Downers Grove' : 'Equinox Telecom Package',
    owner: isInternal ? 'BRI Fiber Services' : owner,
    project: 'Oakbrook Terrace to Downers Grove Certification',
    vendor: 'Janvier Infrastructure',
    region: 'Illinois / DuPage County',
    routeType: 'Underground fiber route',
    expectedLength: '10.2',
    sourceType: 'KMZ/KML + plat package',
    certificateTarget: 'Birth Certificate',
    priority: 'Medium',
    notes: 'Route package includes KMZ geometry, plat sheets, permit record, as-built PDF, splice schedule, road crossing notes, photo packet, and contractor work package.',
  };
  const [packetMode, setPacketMode] = useState('demo');
  const [packetForm, setPacketForm] = useState(demoPacketForm);
  const [uploadedFiles, setUploadedFiles] = useState(['KMZ route file', '10 plat sheets', 'Permit PDF', 'As-built PDF', 'Splice schedule']);
  const [readinessState, setReadinessState] = useState('Ready with warnings');
  const rows = context?.kind === 'active-projects'
    ? packetRows.filter((packet) => ['Parsed', 'Ready for Segmentation', 'Segmentation in Progress', 'Assigned', 'Evidence Capture Active', 'Review Required', 'Certificate Eligible'].includes(packet.status))
    : packetRows;
  const updatePacketForm = (key, value) => setPacketForm((current) => ({ ...current, [key]: value }));
  const packetFromForm = () => ({
    id: selectedPacket?.id || 'PKT-DRAFT-001',
    project: packetForm.project || packetForm.name,
    name: packetForm.name || packetForm.project,
    projectId: 'PRJ-OBD',
    owner: isInternal ? packetForm.owner : owner,
    vendor: packetForm.vendor,
    region: packetForm.region,
    routeType: packetForm.routeType,
    expectedLength: packetForm.expectedLength,
    certificateTarget: packetForm.certificateTarget,
    priority: packetForm.priority,
    type: packetForm.sourceType,
    received: '2026-05-18 09:14',
    status: readinessState === 'Draft' ? 'Received' : 'Ready for Segmentation',
    missing: uploadedFiles.includes('KMZ route file') ? 'Restoration sheet' : 'KMZ route file',
    files: uploadedFiles.length ? uploadedFiles : ['KMZ route file', 'Permit PDF'],
    notes: packetForm.notes,
  });
  const createNewPacket = () => {
    setPacketMode('new');
    setPacketForm({ name: '', owner: isInternal ? owners[0] : owner, project: '', vendor: vendors[0], region: 'Lagos', routeType: 'Underground fiber route', expectedLength: '', sourceType: 'KMZ/KML route file', certificateTarget: 'Birth Certificate', priority: 'Medium', notes: '' });
    setUploadedFiles([]);
    setReadinessState('Draft');
  };
  const useDemoPacket = () => {
    setPacketMode('demo');
    setPacketForm(demoPacketForm);
    setUploadedFiles(['KMZ route file', '10 plat sheets', 'Permit PDF', 'As-built PDF', 'Splice schedule']);
    setReadinessState('Ready with warnings');
  };
  const importExisting = () => {
    const source = selectedPacket?.owner === owner || isInternal ? selectedPacket : rows[0];
    setPacketMode('imported');
    setPacketForm({ name: source.project, owner: isInternal ? source.owner : owner, project: source.project, vendor: source.vendor, region: projects.find((project) => project.name === source.project)?.region || source.region || 'Lagos', routeType: 'Existing project route', expectedLength: source.expectedLength || '1.8', sourceType: source.type, certificateTarget: 'Health Certificate', priority: source.status === 'Review Required' ? 'High' : 'Medium', notes: `Imported from ${source.id}.` });
    setUploadedFiles(source.files);
    setReadinessState(source.missing === 'None' ? 'Ready' : 'Ready with warnings');
  };
  const runValidation = () => setReadinessState(uploadedFiles.includes('KMZ route file') ? 'Ready with warnings' : 'Manual review required');
  const submitAnalysis = () => {
    setSelectedPacket(packetFromForm());
    openDrawer('segmentation-wizard');
  };
  return (
    <section className="space-y-5">
      <PanelHeader title={isInternal ? 'Packet Intake' : 'Project Packets'} text="Incoming route, GIS, permit, test, photo, and field evidence packets." />
      <FilterChip context={context} />
      <div className="flex flex-wrap gap-3">
        <SmallButton onClick={createNewPacket}>Create New Packet</SmallButton>
        <SmallButton onClick={useDemoPacket}>Use Demo Packet</SmallButton>
        <SmallButton onClick={importExisting}>Import from Existing Project</SmallButton>
      </div>

      <Card title={packetMode === 'new' ? 'New Packet' : 'Packet Detail'} icon={PackageCheck}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <TextInput label="Packet Name" value={packetForm.name} onChange={(value) => updatePacketForm('name', value)} wide />
          <Select label="Asset Owner" value={isInternal ? packetForm.owner : owner} onChange={(value) => updatePacketForm('owner', value)} options={(isInternal ? owners : [owner]).map((item) => [item, item])} />
          <TextInput label="Project / Program" value={packetForm.project} onChange={(value) => updatePacketForm('project', value)} />
          <Select label="Vendor / Contractor" value={packetForm.vendor} onChange={(value) => updatePacketForm('vendor', value)} options={vendors.map((item) => [item, item])} />
          <Select label="Region / Market" value={packetForm.region} onChange={(value) => updatePacketForm('region', value)} options={['Lagos', 'Rivers', 'FCT', 'Kano', 'Oyo', 'Illinois / DuPage County'].map((item) => [item, item])} />
          <Select label="Route Type" value={packetForm.routeType} onChange={(value) => updatePacketForm('routeType', value)} options={['Underground fiber route', 'Metro backbone', 'Utility crossing', 'Long-haul corridor', 'Existing project route'].map((item) => [item, item])} />
          <TextInput label="Expected Route Length (km)" value={packetForm.expectedLength} onChange={(value) => updatePacketForm('expectedLength', value)} />
          <Select label="Source Package Type" value={packetForm.sourceType} onChange={(value) => updatePacketForm('sourceType', value)} options={['KMZ/KML route file', 'KMZ/KML + plat package', 'GIS shapefile', 'Plat/as-built package', 'Permit record package'].map((item) => [item, item])} />
          <Select label="Certificate Target" value={packetForm.certificateTarget} onChange={(value) => updatePacketForm('certificateTarget', value)} options={['Birth Certificate', 'Health Certificate', 'Resilience Review'].map((item) => [item, item])} />
          <Select label="Priority / Risk Tier" value={packetForm.priority} onChange={(value) => updatePacketForm('priority', value)} options={['Low', 'Medium', 'High', 'Critical'].map((item) => [item, item])} />
        </div>
        <label className="mt-4 block">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Notes</span>
          <textarea value={packetForm.notes} onChange={(event) => updatePacketForm('notes', event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm font-bold text-white outline-none focus:border-blue-500" />
        </label>
        <div className="mt-4 rounded-2xl border border-dashed border-blue-500/25 bg-blue-500/5 p-5">
          <p className="text-sm font-black text-white">Upload Packet Files</p>
          <p className="mt-1 text-xs text-slate-400">Drag and drop area for KMZ/KML, GIS, plats, as-built PDFs, permit records, photos, GNSS, LiDAR, test results, and contractor work packages.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <SmallButton onClick={() => setUploadedFiles((current) => [...new Set([...current, 'Road crossing notes', 'Photo packet', 'Contractor work package'])])}>Upload Files</SmallButton>
            <SmallButton onClick={useDemoPacket}>Use Demo Packet</SmallButton>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Detected / Uploaded Files</p>
            <ul className="mt-3 space-y-2">
              {(uploadedFiles.length ? uploadedFiles : ['No files uploaded yet']).map((file) => <li key={file} className="text-sm font-bold text-slate-300">- {file}</li>)}
            </ul>
          </div>
          <PacketReadiness uploadedFiles={uploadedFiles} readinessState={readinessState} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <SmallButton onClick={() => setReadinessState('Draft saved')}>Save Draft</SmallButton>
          <SmallButton onClick={runValidation}>Run Packet Validation</SmallButton>
          <SmallButton onClick={submitAnalysis}>Submit for Packet Analysis</SmallButton>
        </div>
      </Card>

      <Table headers={['Packet ID', 'Project', 'Asset Owner', 'Vendor', 'Packet Type', 'Received Time', 'Parse Status', 'Missing Items', 'Action']}>
        {rows.map((packet) => (
          <tr key={packet.id} className="hover:bg-white/[0.035]">
            <Cell mono>{packet.id}</Cell><Cell>{packet.project}</Cell><Cell>{packet.owner}</Cell><Cell>{packet.vendor}</Cell><Cell>{packet.type}</Cell><Cell>{packet.received}</Cell>
            <Cell><Badge value={packet.status} /></Cell><Cell>{packet.missing}</Cell>
            <Cell right>
              <div className="flex justify-end gap-2">
                <SmallButton onClick={() => { setSelectedPacket(packet); openDrawer('packet'); }}>{isInternal ? 'Open Packet' : 'Manage Packet'}</SmallButton>
                <SmallButton onClick={() => { setSelectedPacket(packet); openDrawer('segmentation-wizard'); }}>Segment</SmallButton>
              </div>
            </Cell>
          </tr>
        ))}
      </Table>
    </section>
  );
}

function PacketReadiness({ uploadedFiles, readinessState }) {
  const hasRoute = uploadedFiles.includes('KMZ route file');
  const hasPermit = uploadedFiles.includes('Permit PDF');
  const hasSketch = uploadedFiles.some((file) => file.toLowerCase().includes('sketch'));
  const hasGnss = uploadedFiles.some((file) => file.toLowerCase().includes('gnss'));
  const metadata = uploadedFiles.length >= 5 ? 86 : uploadedFiles.length >= 2 ? 54 : 22;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Packet Readiness</p>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Info label="Metadata completeness" value={`${metadata}%`} tone={metadata > 80 ? 'green' : 'amber'} />
        <Info label="Route file" value={hasRoute ? 'Found' : 'Missing'} tone={hasRoute ? 'green' : 'red'} />
        <Info label="Permit record" value={hasPermit ? 'Found' : 'Missing'} tone={hasPermit ? 'green' : 'amber'} />
        <Info label="Sketch" value={hasSketch ? 'Found' : 'Missing'} tone={hasSketch ? 'green' : 'amber'} />
        <Info label="GNSS precision report" value={hasGnss ? 'Found' : 'Missing'} tone={hasGnss ? 'green' : 'amber'} />
        <Info label="Parse readiness" value={readinessState} tone={readinessState.includes('Manual') ? 'red' : readinessState.includes('warnings') ? 'amber' : 'green'} />
      </div>
    </div>
  );
}

function PacketDrawer({ packet, isInternal, embedded }) {
  return (
    <Card title="Packet Detail" icon={PackageCheck} embedded={embedded}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Info label="Packet ID" value={packet.id} />
        <Info label="Project" value={packet.project} />
        <Info label="Owner / Vendor" value={`${packet.owner} / ${packet.vendor}`} />
        <Info label="Included Evidence Files" value={packet.files.join(', ')} wide />
        <Info label="Missing Fields" value={packet.missing} tone={packet.missing === 'None' ? 'green' : 'amber'} />
        <Info label="Parse Status" value={packet.status} tone={statusTone(packet.status)} />
      </div>
      <ActionRow actions={isInternal ? ['Parse Packet', 'Send to Segmentation', 'Request Missing Data'] : ['Upload Supplemental File', 'Prepare for DICRI Review', 'Request Help']} />
      <InfoBanner text="For route, GIS, plat, KMZ/KML, or as-built packages, open the Packet Segmentation Wizard to convert uploaded source files into governed segment records." />
    </Card>
  );
}

const segmentationStrategies = {
  '1 km default segmentation': { count: 11, note: 'Standard certification granularity', lengths: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.2] },
  '2 km segmentation': { count: 6, note: 'Lower admin overhead', lengths: [2, 2, 2, 2, 2, 0.2] },
  '5 km segmentation': { count: 3, note: 'Executive-level reporting', lengths: [5, 5, 0.2] },
  'Risk-based segmentation': { count: 14, note: 'Isolates road crossings, splice points, HDD areas, bridges, rail crossings, and known damage zones', lengths: [0.45, 0.8, 0.3, 0.9, 0.65, 0.4, 1.1, 0.35, 0.75, 0.6, 0.5, 0.9, 1.05, 1.45] },
  'Custom segmentation': { count: 5, note: 'Admin-controlled boundaries', lengths: [1.8, 2.1, 1.7, 2.6, 2] },
};

function PacketSegmentationWizard({ packet, onPublish, onViewRegistry, onViewDashboard }) {
  const packetName = packet?.name || packet?.project || 'Route Package';
  const packetRoute = packet?.project?.replace(' Certification', '') || 'Oakbrook Terrace to Downers Grove';
  const packetRegion = packet?.region || 'Illinois / DuPage County';
  const packetOwner = packet?.owner || 'Equinox Telecom';
  const packetVendor = packet?.vendor || 'Janvier Infrastructure';
  const packetLength = Number(packet?.expectedLength) || 10.2;
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [strategy, setStrategy] = useState('1 km default segmentation');
  const [published, setPublished] = useState(false);
  const [route, setRoute] = useState({
    code: 'OBD-IL-2026',
    owner: packetOwner,
    vendor: packetVendor,
    region: packetRegion,
    packageName: packetName,
    routeName: packetRoute,
  });
  const [rules, setRules] = useState({
    prefix: 'SEG-OBD',
    convention: 'SEG-[PROJECT CODE]-[SEQUENCE]',
    sequence: '001, 002, 003',
    vendor: packetVendor,
    crew: 'Auto-assign by region and skill',
    evidence: 'Location, depth, photo, worker/device trust, hash log',
    sla: 'Urban locate response SLA',
    certificateType: 'Birth Certificate',
  });
  const generated = useMemo(() => generateWizardSegments(strategy, route, rules), [strategy, route, rules]);
  const lowConfidence = false;

  const runAnalysis = () => {
    setProcessing(true);
    setProcessed(false);
    setTimeout(() => {
      setProcessing(false);
      setProcessed(true);
    }, 650);
  };

  const publish = () => {
    onPublish(generated);
    setPublished(true);
    setStep(7);
  };
  const updateConvention = (value) => {
    setRules((current) => ({
      ...current,
      convention: value,
      prefix: value === '[OWNER]-[REGION]-[ROUTE]-[SEQUENCE]'
        ? `${slugToken(route.owner)}-${slugToken(route.region)}-${slugToken(route.code)}`
        : value === '[VENDOR]-[PROJECT]-[SEQUENCE]'
          ? `${slugToken(current.vendor)}-${slugToken(route.code)}`
          : current.prefix,
    }));
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {['Packet Received', 'Parse Packet', 'Review Detected Route', 'Select Segmentation Strategy', 'Preview Generated Segments', 'Confirm Naming & Assignment Rules', 'Publish Segments'].map((label, index) => {
            const n = index + 1;
            return <button key={label} onClick={() => setStep(n)} className={`rounded-xl px-3 py-2 text-[9px] font-black uppercase tracking-widest ${step === n ? 'bg-blue-600 text-white' : n < step ? 'bg-green-500/10 text-green-300 border border-green-500/20' : 'bg-white/[0.04] text-slate-500 border border-white/10'}`}>{n}. {label}</button>;
          })}
        </div>
      </div>

      {step === 1 && (
        <WizardFrame title="Packet Received" text="Synthetic uploaded project packet prepared for route interpretation and segmentation.">
          <Info label="Uploaded Packet" value={packetName} wide />
          <Info label="System Detected" value="KMZ route package with plat sheets and contractor work package" tone="green" />
          <Info label="Admin Confirmed" value="Pending route review" tone="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {['KMZ route file', '10 plat sheets', 'Permit PDF', 'As-built PDF', 'Splice schedule', 'Road crossing notes', 'Photo packet', 'Contractor work package'].map((file) => <Info key={file} label="File Included" value={file} tone="blue" />)}
          </div>
        </WizardFrame>
      )}

      {step === 2 && (
        <WizardFrame title="Parse Packet" text="Run packet analysis to interpret source files and estimate segmentation candidates.">
          <button onClick={runAnalysis} className="rounded-xl bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-500">{processing ? 'Analyzing...' : 'Run Packet Analysis'}</button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Reading route geometry', 'Detecting endpoints', 'Calculating route length', 'Matching plat sheets to route path', 'Extracting route labels and stationing', 'Detecting splice points', 'Detecting road crossings', 'Checking missing required files', 'Estimating segmentation candidates'].map((item, index) => (
              <Info key={item} label={processing || processed ? 'System Detected' : 'Pending'} value={item} tone={processed || (processing && index < 5) ? 'green' : 'amber'} />
            ))}
          </div>
          {processed && <DetectedResults routeName={packetRoute} routeLength={packetLength} />}
        </WizardFrame>
      )}

      {step === 3 && (
        <WizardFrame title="Review Detected Route" text="Detected data remains separate from admin-confirmed route metadata.">
          <RoutePreview routeName={route.routeName} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <TextInput label="Route Code" value={route.code} onChange={(value) => setRoute((current) => ({ ...current, code: value }))} />
            <TextInput label="Asset Owner" value={route.owner} onChange={(value) => setRoute((current) => ({ ...current, owner: value }))} />
            <TextInput label="Vendor" value={route.vendor} onChange={(value) => setRoute((current) => ({ ...current, vendor: value }))} />
            <TextInput label="Region" value={route.region} onChange={(value) => setRoute((current) => ({ ...current, region: value }))} />
            <Info label="Start" value="Oakbrook Terrace, IL" />
            <Info label="End" value="Downers Grove, IL" />
            <Info label="Work Type" value="Underground fiber route certification" />
            <Info label="Risk Tier" value="Medium" tone="amber" />
            <Info label="Source Files Used" value="KMZ, plat sheets, permit PDF, as-built PDF, splice schedule, road crossing notes" wide />
          </div>
        </WizardFrame>
      )}

      {step === 4 && (
        <WizardFrame title="Select Segmentation Strategy" text="Strategy selection changes generated segment count and boundary logic.">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            {Object.entries(segmentationStrategies).map(([name, meta]) => <button key={name} onClick={() => setStrategy(name)} className={`rounded-2xl border p-4 text-left ${strategy === name ? 'border-blue-500 bg-blue-500/15' : 'border-white/10 bg-slate-950/55 hover:bg-white/[0.04]'}`}><p className="text-sm font-black text-white">{name}</p><p className="mt-2 text-3xl font-black text-blue-300">{meta.count}</p><p className="mt-1 text-xs text-slate-400">segments</p><p className="mt-3 text-xs text-slate-500 leading-relaxed">{meta.note}</p></button>)}
          </div>
          {lowConfidence && <InfoBanner text="Manual review required before segmentation." />}
        </WizardFrame>
      )}

      {step === 5 && (
        <WizardFrame title="Preview Generated Segments" text={`${strategy} creates ${generated.length} governed segment records for preview.`}>
          <GeneratedSegmentTable rows={generated} />
        </WizardFrame>
      )}

      {step === 6 && (
        <WizardFrame title="Confirm Naming & Assignment Rules" text="Admin-confirmed naming and assignment rules control registry output and field assignment handoff.">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <TextInput label="Segment Prefix" value={rules.prefix} onChange={(value) => setRules((current) => ({ ...current, prefix: value }))} />
            <Select label="Naming Convention" value={rules.convention} onChange={updateConvention} options={['SEG-[PROJECT CODE]-[SEQUENCE]', '[OWNER]-[REGION]-[ROUTE]-[SEQUENCE]', '[VENDOR]-[PROJECT]-[SEQUENCE]', 'Custom'].map((item) => [item, item])} />
            <TextInput label="Sequence Format" value={rules.sequence} onChange={(value) => setRules((current) => ({ ...current, sequence: value }))} />
            <Select label="Default Vendor" value={rules.vendor} onChange={(value) => setRules((current) => ({ ...current, vendor: value }))} options={vendors.map((item) => [item, item])} />
            <Select label="Crew Assignment Method" value={rules.crew} onChange={(value) => setRules((current) => ({ ...current, crew: value }))} options={['Auto-assign by region and skill', 'Use packet vendor crew', 'Manual assignment by admin', 'Risk-based Tiger oversight'].map((item) => [item, item])} />
            <TextInput label="Evidence Requirements" value={rules.evidence} onChange={(value) => setRules((current) => ({ ...current, evidence: value }))} wide />
            <Select label="Default SLA Policy" value={rules.sla} onChange={(value) => setRules((current) => ({ ...current, sla: value }))} options={['Urban locate response SLA', 'High-risk crossing SLA', 'Standard capture SLA', 'Owner-defined SLA'].map((item) => [item, item])} />
            <Select label="Certificate Type Target" value={rules.certificateType} onChange={(value) => setRules((current) => ({ ...current, certificateType: value }))} options={['Birth Certificate', 'Health Certificate'].map((item) => [item, item])} />
          </div>
          <Info label="Generated ID Preview" value={generated.slice(0, 3).map((segment) => segment.id).join(', ')} tone="green" wide />
          <GeneratedSegmentTable rows={generated.slice(0, 5)} />
        </WizardFrame>
      )}

      {step === 7 && (
        <WizardFrame title="Publish Segments" text="Publish creates governed records for registry, assignment, capture, SLA, and certificate readiness pipelines.">
          {!published ? (
            <button onClick={publish} className="rounded-xl bg-green-600 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-green-500">Publish Segments</button>
          ) : (
            <div className="space-y-4">
              <InfoBanner text={`${generated.length} segment records created and sent to Segment Registry, Assignment Queue, Evidence Capture Workflow, SLA Tracker, and Certificate Readiness Pipeline.`} />
              <div className="flex flex-wrap gap-3">
                <SmallButton onClick={onViewRegistry}>View Segment Registry</SmallButton>
                <SmallButton onClick={onViewDashboard}>Return to Operations Dashboard</SmallButton>
              </div>
            </div>
          )}
          <GeneratedSegmentTable rows={generated} />
          <Info label="Certificate Review Queue" value="Not shown as certificate-ready until evidence capture occurs." tone="amber" />
        </WizardFrame>
      )}

      <div className="flex justify-between">
        <SmallButton onClick={() => setStep(Math.max(1, step - 1))}>Back</SmallButton>
        <SmallButton onClick={published && step === 7 ? onViewRegistry : () => setStep(Math.min(7, step + 1))}>{published && step === 7 ? 'View Segment Registry' : 'Continue'}</SmallButton>
      </div>
    </div>
  );
}

function WizardFrame({ title, text, children }) {
  return <Card title={title} icon={GitBranch}><p className="mb-4 text-sm text-slate-400">{text}</p><div className="space-y-4">{children}</div></Card>;
}

function DetectedResults({ routeName, routeLength }) {
  const rows = [
    ['Detected route', routeName, 'High Confidence'],
    ['Estimated route length', `${routeLength.toFixed(1)} km`, 'High Confidence'],
    ['Plat sheets detected', '10', 'High Confidence'],
    ['KMZ route geometry', 'Found', 'High Confidence'],
    ['Permit record', 'Found', 'High Confidence'],
    ['As-built PDF', 'Found', 'High Confidence'],
    ['Road crossings', '4', 'Medium Confidence'],
    ['Splice boundaries', '2', 'Medium Confidence'],
    ['Missing items', 'Restoration sheet', 'Manual Review Required'],
    ['Packet confidence', '91%', 'High Confidence'],
  ];
  return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">{rows.map(([label, value, confidence]) => <Info key={label} label={`${label} / ${confidence}`} value={value} tone={confidence === 'Manual Review Required' ? 'amber' : confidence === 'High Confidence' ? 'green' : 'blue'} />)}</div>;
}

function RoutePreview({ routeName }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071A33] relative overflow-hidden">
      <svg viewBox="0 0 900 360" className="h-80 w-full">
        <rect width="900" height="360" fill="#071A33" />
        <path d="M70 230 C190 150 260 190 360 130 S560 78 815 132" fill="none" stroke="#38BDF8" strokeWidth="18" strokeLinecap="round" />
        <path d="M230 80 V300" stroke="#D4A100" strokeWidth="5" strokeDasharray="10 12" />
        <path d="M460 70 V310" stroke="#A855F7" strokeWidth="5" strokeDasharray="10 12" />
        <path d="M640 84 V278" stroke="#EF4444" strokeWidth="5" strokeDasharray="8 10" />
        <circle cx="70" cy="230" r="10" fill="#22C55E" />
        <circle cx="815" cy="132" r="10" fill="#22C55E" />
      </svg>
      <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-blue-400">System Detected Route</p><p className="mt-1 text-sm font-black text-white">{routeName}</p></div>
      <div className="border-t border-white/10 bg-slate-950/70 p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 text-[10px] font-bold text-slate-300">
          <LegendLine color="bg-sky-400" label="Blue route line = detected route alignment" />
          <LegendDot color="bg-green-500" label="Green dots = route endpoints" />
          <LegendDash color="border-amber-400" label="Yellow dotted = proposed boundary" />
          <LegendDash color="border-purple-400" label="Purple dotted = validation checkpoint" />
          <LegendDash color="border-red-500" label="Red dotted = high-risk crossing" />
        </div>
      </div>
    </div>
  );
}

function LegendLine({ color, label }) {
  return <div className="flex items-center gap-2"><span className={`h-1.5 w-8 rounded-full ${color}`} />{label}</div>;
}

function LegendDot({ color, label }) {
  return <div className="flex items-center gap-2"><span className={`h-3 w-3 rounded-full ${color}`} />{label}</div>;
}

function LegendDash({ color, label }) {
  return <div className="flex items-center gap-2"><span className={`w-8 border-t-2 border-dashed ${color}`} />{label}</div>;
}

function generateWizardSegments(strategy, route, rules) {
  const meta = segmentationStrategies[strategy] || segmentationStrategies['1 km default segmentation'];
  return Array.from({ length: meta.count }, (_, index) => {
    const seq = sequenceToken(rules.sequence, index);
    const boundary = strategy === 'Risk-based segmentation'
      ? ['Standard route', 'Road crossing', 'Splice boundary', 'HDD crossing', 'High-risk utility corridor'][index % 5]
      : 'Standard route';
    return {
      id: segmentIdForRule(rules, route, seq),
      projectId: 'PRJ-OBD',
      project: route.packageName || route.routeName,
      owner: route.owner,
      region: route.region,
      vendor: rules.vendor,
      route: route.routeName,
      start: `OBT station ${index}+000`,
      end: `DGV station ${index}+${String(Math.round((meta.lengths[index] || 1) * 1000)).padStart(3, '0')}`,
      length: `${(meta.lengths[index] || 1).toFixed(2)} km`,
      workers: ['Pending assignment'],
      devices: ['Pending assignment'],
      captureWindow: 'Pending assignment',
      status: 'Assigned',
      certificateStatus: 'Not Ready',
      readiness: 12,
      evidenceStatus: 'Raw Captured',
      integrity: 'Awaiting evidence capture',
      exceptions: 0,
      risk: boundary === 'Standard route' ? 'Low' : 'Medium',
      depthDeviation: 0,
      boundary,
      requiredEvidence: rules.evidence,
      crew: rules.crew,
      certificateRule: `${rules.certificateType}: evidence capture, trust gates, WORM/hash, DICRI review required`,
    };
  });
}

function slugToken(value) {
  const clean = String(value || 'SEG')
    .replace(/&/g, ' ')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!clean.length) return 'SEG';
  if (clean.length === 1) return clean[0].slice(0, 8).toUpperCase();
  return clean.map((part) => part[0]).join('').slice(0, 6).toUpperCase();
}

function sequenceToken(format, index) {
  const samples = String(format || '001, 002, 003').match(/\d+/g);
  const width = samples?.[0]?.length || 3;
  return String(index + 1).padStart(width, '0');
}

function segmentIdForRule(rules, route, seq) {
  if (rules.convention === '[OWNER]-[REGION]-[ROUTE]-[SEQUENCE]') {
    return `${slugToken(route.owner)}-${slugToken(route.region)}-${slugToken(route.code)}-${seq}`;
  }
  if (rules.convention === '[VENDOR]-[PROJECT]-[SEQUENCE]') {
    return `${slugToken(rules.vendor)}-${slugToken(route.packageName || route.routeName)}-${seq}`;
  }
  return `${rules.prefix || 'SEG'}-${seq}`;
}

function GeneratedSegmentTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/75 shadow-2xl">
      <table className="w-full min-w-[1260px] table-fixed text-left">
        <thead className="bg-slate-950/70 text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
          <tr>
            {['Segment ID', 'Start', 'End', 'Length', 'Boundary', 'Risk', 'Required Evidence', 'Vendor / Crew', 'Readiness Rules'].map((header, index) => <th key={header} className={`px-3 py-3 ${index === 8 ? 'w-[260px]' : index === 6 || index === 7 ? 'w-[190px]' : 'w-[115px]'}`}>{header}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((segment) => (
            <tr key={segment.id} className="hover:bg-white/[0.035]">
              <td className="px-3 py-4 text-xs font-mono font-bold text-blue-200 break-words">{segment.id}</td>
              <td className="px-3 py-4 text-xs text-slate-300">{segment.start}</td>
              <td className="px-3 py-4 text-xs text-slate-300">{segment.end}</td>
              <td className="px-3 py-4 text-xs text-slate-300">{segment.length}</td>
              <td className="px-3 py-4 text-xs text-slate-300">{segment.boundary}</td>
              <td className="px-3 py-4 text-xs text-slate-300"><Badge value={segment.risk} /></td>
              <td className="px-3 py-4 text-xs leading-relaxed text-slate-300">{segment.requiredEvidence}</td>
              <td className="px-3 py-4 text-xs leading-relaxed text-slate-300">{segment.vendor}<br /><span className="text-slate-500">{segment.crew}</span></td>
              <td className="px-3 py-4 text-xs leading-relaxed text-slate-300">{segment.certificateRule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SegmentationWorkspace({ openSegment }) {
  const [projectId, setProjectId] = useState(projects[0].id);
  const project = projects.find((item) => item.id === projectId) || projects[0];
  const projectSegments = segments.filter((segment) => segment.projectId === project.id);
  return (
    <section className="space-y-5">
      <PanelHeader title="Segmentation Workspace" text="Generate and review certificate segments from route packets, crossings, splice boundaries, and risk rules." />
      <div className="grid grid-cols-1 2xl:grid-cols-[0.9fr_1.1fr] gap-5">
        <Card title="Route Segmentation Map" icon={Map}>
          <Select label="Project" value={projectId} onChange={setProjectId} options={projects.map((item) => [item.id, item.name])} />
          <div className="mt-4 h-80 rounded-2xl border border-white/10 bg-[#071A33] relative overflow-hidden">
            <svg viewBox="0 0 800 360" className="h-full w-full">
              <rect width="800" height="360" fill="#071A33" />
              <path d="M40 250 C180 150 280 210 390 130 S610 70 760 145" stroke="#38BDF8" strokeWidth="18" fill="none" strokeLinecap="round" />
              <path d="M160 60 V320" stroke="#D4A100" strokeWidth="5" strokeDasharray="10 12" />
              <path d="M420 40 V330" stroke="#EF4444" strokeWidth="5" strokeDasharray="8 10" />
              <path d="M590 80 V310" stroke="#22C55E" strokeWidth="5" strokeDasharray="12 14" />
              {projectSegments.slice(0, 5).map((segment, i) => <circle key={segment.id} cx={110 + i * 130} cy={230 - i * 28} r="10" fill="#D4A100" />)}
            </svg>
            <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Segmentation Rule</p>
              <p className="mt-1 text-sm font-black text-white">{project.segmentation}</p>
            </div>
          </div>
        </Card>
        <SegmentMiniTable segments={projectSegments} onOpen={openSegment} />
      </div>
    </section>
  );
}

function SegmentMiniTable({ segments: rows, onOpen }) {
  return (
    <Card title="Generated Segments" icon={Layers}>
      <Table headers={['Segment ID', 'Start Coordinate', 'End Coordinate', 'Length', 'Vendor', 'Assigned Crew', 'Required Evidence', 'Capture Status', 'Readiness']}>
        {rows.map((segment) => (
          <tr key={segment.id} className="hover:bg-white/[0.035]">
            <Cell mono>{segment.id}</Cell><Cell>{segment.start}</Cell><Cell>{segment.end}</Cell><Cell>{segment.length}</Cell><Cell>{segment.vendor}</Cell><Cell>{segment.workers.join(', ')}</Cell><Cell>Location, depth, photos, device trust</Cell><Cell><Badge value={segment.status} /></Cell><Cell right><SmallButton onClick={() => onOpen(segment)}>{segment.readiness}%</SmallButton></Cell>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function SegmentRegistry({ isInternal, segments, selectedSegment, setSelectedSegment, openDrawer, projectFilter, setProjectFilter, ownerFilter, setOwnerFilter, vendorFilter, setVendorFilter, context }) {
  const rows = filterSegmentsByDashboardContext(segments, context);
  const projectOptions = ['All', ...new Set(segments.map((segment) => segment.project))];
  const ownerOptions = isInternal ? ['All', ...owners] : [OWNER_CONTEXT];
  const vendorOptions = ['All', ...new Set(segments.map((segment) => segment.vendor))];
  return (
    <section className="space-y-5">
      <PanelHeader title="Segment Registry" text="Search and inspect segment evidence records across projects, regions, vendors, and certificate status." />
      <FilterChip context={context} />
      <FilterPanel>
        <Select label="Asset Owner" value={isInternal ? ownerFilter : OWNER_CONTEXT} onChange={setOwnerFilter} options={ownerOptions.map((x) => [x, x])} />
        <Select label="Project" value={projectFilter} onChange={setProjectFilter} options={projectOptions.map((x) => [x, x])} />
        <Select label="Vendor" value={vendorFilter} onChange={setVendorFilter} options={vendorOptions.map((x) => [x, x])} />
      </FilterPanel>
      <Table headers={['Segment ID', 'Owner', 'Project', 'Vendor', 'Region', 'Status', 'Certificate Status', 'Evidence Readiness', 'Action']}>
        {rows.map((segment) => (
          <tr key={segment.id} className={`hover:bg-white/[0.035] ${selectedSegment.id === segment.id ? 'bg-blue-600/10' : ''}`}>
            <Cell mono>{segment.id}</Cell><Cell>{segment.owner}</Cell><Cell>{segment.project}</Cell><Cell>{segment.vendor}</Cell><Cell>{segment.region}</Cell><Cell><Badge value={segment.status} /></Cell><Cell>{segment.certificateStatus}</Cell><Cell>{segment.readiness}%</Cell>
            <Cell right><SmallButton onClick={() => { setSelectedSegment(segment); openDrawer(); }}>Evidence Record</SmallButton></Cell>
          </tr>
        ))}
      </Table>
    </section>
  );
}

function SegmentEvidenceRecord({ segment, isInternal }) {
  const requirements = [
    ['Authorized segment assignment', 'Passed', 'Assignment ledger', 'Crew and segment package matched.'],
    ['Certified worker present', 'Passed', 'Worker credential', segment.workers.join(', ')],
    ['Registered device used', 'Passed', 'Equipment registry', segment.devices.join(', ')],
    ['Calibration valid', segment.integrity.includes('Hash mismatch') ? 'Blocked' : 'Passed', 'Calibration artifact', segment.integrity],
    ['Route captured within tolerance', segment.depthDeviation > 0.075 ? 'Blocked' : segment.depthDeviation > 0.05 ? 'Warning' : 'Passed', 'GNSS point set', `${segment.depthDeviation}m deviation`],
    ['Depth readings complete', segment.depthDeviation > 0.05 ? 'Pending Review' : 'Passed', 'Depth readings', 'Tolerance model applied.'],
    ['Required photos complete', segment.exceptions ? 'Warning' : 'Passed', 'Photo packet', segment.exceptions ? 'Missing context photo flagged.' : 'All required photos received.'],
    ['Evidence hash verified', segment.evidenceStatus === 'Rejected' ? 'Blocked' : 'Passed', 'WORM/hash log', segment.integrity],
    ['Exceptions resolved', segment.exceptions ? 'Pending Review' : 'Passed', 'Exception evidence', segment.exceptions ? `${segment.exceptions} open` : 'No open exceptions'],
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Info label="Segment ID" value={segment.id} />
        <Info label="Project" value={segment.project} />
        <Info label="Owner / Vendor" value={`${segment.owner} / ${segment.vendor}`} />
        <Info label="Route" value={segment.route} wide />
        <Info label="Length" value={segment.length} />
        <Info label="Capture Window" value={segment.captureWindow} />
        <Info label="Evidence Integrity Status" value={segment.integrity} tone={segment.evidenceStatus === 'Rejected' ? 'red' : 'green'} wide />
        <Info label="Certificate / Review Readiness" value={`${segment.readiness}%`} tone={segment.readiness > 85 ? 'green' : 'amber'} />
      </div>
      <Card title="Evidence Categories" icon={FileCheck2}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {['Location Evidence', 'Depth / Placement Evidence', 'Photo / Visual Evidence', 'Worker / Device Trust Evidence', 'Exception Evidence', 'Certificate Logic'].map((label, i) => <Info key={label} label={label} value={i === 4 ? segment.evidenceStatus : 'Available / redacted'} tone={i === 4 ? statusTone(segment.evidenceStatus) : 'blue'} />)}
        </div>
      </Card>
      <Card title="Certificate Logic" icon={Shield}>
        <Table headers={['Requirement', 'Status', 'Evidence Source', 'Notes']}>
          {requirements.map(([req, status, source, notes]) => <tr key={req}><Cell>{req}</Cell><Cell><Badge value={status} /></Cell><Cell>{source}</Cell><Cell>{notes}</Cell></tr>)}
        </Table>
      </Card>
      <ActionRow actions={isInternal ? ['Open Evidence Record', 'Assign Tiger Review', 'Build Audit Packet', 'Approve Certificate', 'Reject / Not Certifiable', 'Request Supplemental Evidence'] : ['Submit to DICRI Review', 'Request Certification Review', 'Export Operational Evidence']} />
    </div>
  );
}

function TrustGateMonitor({ events, selectedEvent, setSelectedEvent, openDrawer, failureFilter, setFailureFilter, context }) {
  const rows = context?.kind === 'failed-trust-today' ? events.filter((event) => event.severity !== 'Warning') : events;
  return (
    <section className="space-y-5">
      <PanelHeader title="Trust Gate Monitor" text="Live-style trust-gate failures and governed capture decisions." />
      <FilterChip context={context} />
      <FilterPanel><Select label="Failure Type" value={failureFilter} onChange={setFailureFilter} options={['All', ...failureTypes].map((x) => [x, x])} /></FilterPanel>
      <Table headers={['Timestamp', 'Segment', 'Worker', 'Device', 'Vendor', 'Failure Type', 'Severity', 'Resolution', 'Action Required']}>
        {rows.map((event) => <tr key={event.id} className={`${selectedEvent?.id === event.id ? 'bg-blue-600/10' : 'hover:bg-white/[0.035]'}`}><Cell>{event.timestamp}</Cell><Cell mono>{event.segment}</Cell><Cell>{event.worker}</Cell><Cell>{event.device}</Cell><Cell>{event.vendor}</Cell><Cell>{event.failureType}</Cell><Cell><Badge value={event.severity} /></Cell><Cell><Badge value={event.resolutionStatus || 'Unresolved'} /></Cell><Cell right><SmallButton onClick={() => { setSelectedEvent(event); openDrawer('trust'); }}>Resolve</SmallButton></Cell></tr>)}
      </Table>
    </section>
  );
}

function TrustGateDrawer({ event, onResolve, onReassign }) {
  const [showReassign, setShowReassign] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  if (!event) return <InfoBanner text="No trust-gate event selected." />;
  const worker = workers.find((item) => item.name === event.worker) || workers[0];
  const device = devices.find((item) => item.serial === event.device) || devices[0];
  const actions = resolutionActions(event.failureType);
  const captureDecision = event.severity === 'Hard Stop' || event.severity === 'Blocked' ? 'Capture blocked or quarantined' : 'Allowed as exception evidence pending review';
  const auditImpact = event.severity === 'Hard Stop' || event.failureType === 'evidence hash mismatch' ? 'Evidence retained in audit history but excluded from certificate eligibility.' : 'Evidence retained with review flag until operational resolution is completed.';
  const applyAction = (action) => {
    if (action === 'Reassign Certified Worker') {
      setShowReassign(true);
      return;
    }
    onResolve(event.id, {
      resolutionStatus: `${action} — Resolution Pending`,
      action,
      auditTrail: [...(event.auditTrail || []), { label: 'Admin resolution action', value: action }, { label: 'Resolution timestamp', value: '2026-05-14 10:32' }],
    });
  };
  const reassign = (newWorker) => {
    onReassign(event, newWorker);
    setShowReassign(false);
    setConfirmation(`Segment ${event.segment} reassigned from ${event.worker} to ${newWorker.name}. Remeasure required. Original failed capture retained in audit history.`);
  };
  return (
    <div className="space-y-4">
      {confirmation && <InfoBanner text={confirmation} />}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        <Info label="What Failed" value={event.failureType} tone={statusTone(event.severity)} />
        <Info label="Segment ID" value={event.segment} />
        <Info label="Worker" value={event.worker} />
        <Info label="Worker Certification Status" value={worker.role === 'Cheetah' || worker.role === 'Tiger' ? 'Certified' : 'Not certified for capture'} tone={worker.role === 'Cheetah' || worker.role === 'Tiger' ? 'green' : 'red'} />
        <Info label="Device" value={event.device} />
        <Info label="Device Status" value={device.registered && device.calibration === 'Valid' ? 'Registered / calibration valid' : device.registered ? 'Registered / calibration issue' : 'Not registered'} tone={device.registered && device.calibration === 'Valid' ? 'green' : 'red'} />
        <Info label="Vendor" value={event.vendor} />
        <Info label="Capture Decision" value={captureDecision} tone={event.severity === 'Warning' ? 'amber' : 'red'} />
        <Info label="Required Next Action" value={event.action} />
        <Info label="Audit Impact" value={auditImpact} wide />
      </div>

      <Card title="Resolution Actions" icon={CheckCircle2}>
        <div className="flex flex-wrap gap-2">
          {actions.map((action, index) => <button key={action} onClick={() => applyAction(action)} className={`rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest ${index === 0 ? 'bg-blue-600 text-white hover:bg-blue-500' : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'}`}>{action}</button>)}
        </div>
      </Card>

      {showReassign && <ReassignCertifiedWorkerPanel event={event} onReassign={reassign} />}

      <Card title="Audit Trail" icon={History}>
        <div className="space-y-2">
          <Info label="Original failed capture timestamp" value={event.timestamp} />
          <Info label="Failure reason" value={event.failureType} tone="red" />
          <Info label="Original worker" value={event.worker} />
          {(event.auditTrail || []).map((entry, index) => <Info key={`${entry.label}-${index}`} label={entry.label} value={entry.value} />)}
          {!event.auditTrail?.length && <Info label="Resolution status" value="No resolution action recorded yet" tone="amber" />}
        </div>
      </Card>
    </div>
  );
}

function resolutionActions(failureType) {
  const map = {
    'worker not certified': ['Reassign Certified Worker', 'Request Remeasure', 'Mark as Training Issue', 'Escalate to Supervisor'],
    'device not registered': ['Replace Device', 'Assign Approved Device', 'Request Remeasure'],
    'calibration expired': ['Remove Device from Service', 'Assign Calibrated Device', 'Request Remeasure'],
    'geofence mismatch': ['Verify Assignment', 'Correct Segment Assignment', 'Reassign Worker'],
    'timestamp anomaly': ['Require Supervisor Review', 'Request Remeasure'],
    'offline trust window exceeded': ['Sync Device', 'Request Remeasure', 'Escalate if Repeated'],
    'missing required photo': ['Request Supplemental Capture', 'Add Field Note'],
    'GNSS precision below threshold': ['Request Remeasure', 'Assign Higher-Precision Device'],
    'evidence hash mismatch': ['Lock Evidence Packet', 'Escalate to Tiger Review', 'Flag Security Review'],
    'out-of-tolerance depth reading': ['Request Independent Remeasure', 'Send to Tiger Review'],
  };
  return map[failureType] || ['Request Remeasure', 'Escalate to Supervisor'];
}

function ReassignCertifiedWorkerPanel({ event, onReassign }) {
  const eligible = workerAnalytics.filter((worker) => ['Cheetah', 'Tiger'].includes(worker.role) && worker.name !== event.worker);
  return (
    <Card title="Eligible Certified Workers" icon={Users}>
      <Table headers={['Worker name', 'Role', 'Certification type', 'Vendor/team', 'Availability', 'Region', 'Assigned device compatibility', 'Current assignment load', 'Action']}>
        {eligible.map((worker, index) => (
          <tr key={worker.id} className="hover:bg-white/[0.035]">
            <Cell>{worker.name}</Cell>
            <Cell>{worker.role}</Cell>
            <Cell>{worker.role === 'Tiger' ? 'Tiger certification authority' : 'Cheetah field capture'}</Cell>
            <Cell>{worker.vendor}</Cell>
            <Cell>{index % 3 === 0 ? 'Available now' : 'Available today'}</Cell>
            <Cell>{['Lagos', 'Rivers', 'FCT', 'Kano'][index % 4]}</Cell>
            <Cell>{worker.assignedDevices.slice(0, 2).join(', ')}</Cell>
            <Cell>{worker.assignedSegments} active</Cell>
            <Cell right><SmallButton onClick={() => onReassign(worker)}>Reassign & Require Remeasure</SmallButton></Cell>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function ExceptionReview({ isInternal, segments, setSelectedSegment, openDrawer, context }) {
  const rows = context?.kind === 'open-exceptions' ? segments.filter((segment) => segment.exceptions > 0) : segments;
  return (
    <section className="space-y-5">
      <PanelHeader title="Exception Review" text="Narrow gray-area issues, tolerance deviations, and evidence exceptions." />
      <FilterChip context={context} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {rows.slice(0, 8).map((segment) => <ExceptionCard key={segment.id} isInternal={isInternal} segment={segment} onOpen={() => { setSelectedSegment(segment); openDrawer('segment'); }} />)}
      </div>
    </section>
  );
}

function ExceptionCard({ segment, isInternal, onOpen }) {
  const pct = Math.min(100, Math.round((segment.depthDeviation / 0.1) * 100));
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5">
      <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-widest text-blue-400">{segment.id}</p><h3 className="mt-2 text-lg font-black text-white">Out-of-tolerance / evidence exception</h3><p className="mt-1 text-xs text-slate-400">Measurement: {segment.depthDeviation}m / threshold 0.050m / review band 0.051m-0.075m</p></div><Badge value={segment.depthDeviation > 0.075 ? 'Hard Stop' : 'Review Required'} /></div>
      <div className="mt-5 h-3 rounded-full bg-slate-950 overflow-hidden flex"><div className="bg-green-500" style={{ width: '50%' }} /><div className="bg-amber-500" style={{ width: '25%' }} /><div className="bg-red-500 flex-1" /></div>
      <div className="mt-2 flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-500"><span>Auto-pass</span><span>Client review band</span><span>Reject</span></div>
      <div className="mt-2 h-4 relative"><div className="absolute top-0 h-4 w-1 rounded bg-white" style={{ left: `${pct}%` }} /></div>
      <Info label="Evidence Link / Photo Preview" value="photo-artifact://masked-field-condition" />
      <ActionRow actions={isInternal ? ['Assign Tiger Review', 'Require Remeasure', 'Accept with Adjudication Note', 'Reject / Not Certifiable'] : ['Request Remeasure', 'Add Field Note', 'Submit to DICRI Review']} onPrimary={onOpen} />
    </div>
  );
}

function PerformanceAnalytics({ isInternal, segments: scopedSegments, owner }) {
  const [metric, setMetric] = useState('Evidence Quality');
  const visibleVendorSet = new Set(scopedSegments.map((segment) => segment.vendor));
  const trend = [
    {
      vendor: 'Delta Civil Works Ltd.',
      color: 'bg-cyan-400',
      swatch: 'bg-cyan-400',
      completed: 24,
      acceptance: 93,
      remeasure: 4,
      tolerance: 3,
      handshake: 2,
      sla: 96,
      exceptions: 1,
      quality: [89, 91, 90, 93, 92, 94, 93],
    },
    {
      vendor: 'Janvier Infrastructure',
      color: 'bg-blue-500',
      swatch: 'bg-blue-500',
      completed: 21,
      acceptance: 88,
      remeasure: 5,
      tolerance: 5,
      handshake: 3,
      sla: 91,
      exceptions: 2,
      quality: [85, 87, 86, 88, 87, 90, 89],
    },
    {
      vendor: 'Northline Fiber',
      color: 'bg-amber-400',
      swatch: 'bg-amber-400',
      completed: 18,
      acceptance: 82,
      remeasure: 7,
      tolerance: 7,
      handshake: 4,
      sla: 86,
      exceptions: 3,
      quality: [79, 80, 78, 81, 77, 79, 76],
    },
    {
      vendor: 'MetroBuild Utilities',
      color: 'bg-rose-500',
      swatch: 'bg-rose-500',
      completed: 15,
      acceptance: 75,
      remeasure: 9,
      tolerance: 10,
      handshake: 5,
      sla: 81,
      exceptions: 4,
      quality: [72, 74, 71, 73, 70, 69, 68],
    },
  ].filter((vendor) => isInternal || visibleVendorSet.has(vendor.vendor));
  const metricValues = (vendor) => {
    if (metric === 'First-Pass Acceptance') return vendor.quality.map((value, index) => clamp(value + (vendor.acceptance - average(vendor.quality)) + (index % 2 ? 1 : -1), 0, 100));
    if (metric === 'SLA Performance') return vendor.quality.map((value, index) => clamp(value + (vendor.sla - average(vendor.quality)) - (index % 3 === 0 ? 1 : 0), 0, 100));
    if (metric === 'Remeasure Rate') return vendor.quality.map((_, index) => clamp(vendor.remeasure + (index % 3) - 1, 0, 20));
    return vendor.quality;
  };
  const rows = trend.map((vendor) => ({ ...vendor, qualityScore: Math.round(average(vendor.quality)) }));
  return (
    <section className="space-y-5">
      <PanelHeader title="Vendor & Worker Performance" text="Operational coaching signals for evidence quality, SLA performance, and workflow support." />
      {!isInternal && <FilterChip context={{ label: `Viewing ${owner} vendors only` }} />}
      <Card title="Vendor Performance Trend — Week of May 12" icon={Activity}>
        <div className="mb-5 flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-400">Daily evidence quality score by vendor</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {trend.map((vendor) => (
                <div key={vendor.vendor} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                  <span className={`h-2.5 w-2.5 rounded-full ${vendor.swatch}`} />
                  {vendor.vendor}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full xl:w-72">
            <Select label="Metric" value={metric} onChange={setMetric} options={['Evidence Quality', 'First-Pass Acceptance', 'SLA Performance', 'Remeasure Rate'].map((item) => [item, item])} />
          </div>
        </div>
        <GroupedVendorBars vendors={trend.map((vendor) => ({ ...vendor, values: metricValues(vendor) }))} metric={metric} />
      </Card>
      <Table headers={['Vendor', 'Segments Completed', 'First-Pass Acceptance', 'Remeasure Rate', 'Out-of-Tolerance', 'Failed Handshake', 'SLA Performance', 'Open Exceptions', 'Evidence Quality']}>
        {rows.map((row) => <tr key={row.vendor}><Cell>{row.vendor}</Cell><Cell>{row.completed}</Cell><Cell>{row.acceptance}%</Cell><Cell>{row.remeasure}%</Cell><Cell>{row.tolerance}%</Cell><Cell>{row.handshake}%</Cell><Cell>{row.sla}%</Cell><Cell>{row.exceptions}</Cell><Cell>{row.qualityScore}/100</Cell></tr>)}
      </Table>
    </section>
  );
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function GroupedVendorBars({ vendors: vendorRows, metric }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = metric === 'Remeasure Rate' ? 20 : 100;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
      <div className="grid grid-cols-7 gap-3 h-72 items-end">
        {days.map((day, dayIndex) => (
          <div key={day} className="flex h-full flex-col justify-end gap-2">
            <div className="flex h-60 items-end justify-center gap-1.5 rounded-xl border border-white/5 bg-slate-900/35 px-2 pb-2">
              {vendorRows.map((vendor) => {
                const value = vendor.values[dayIndex];
                const height = Math.max(8, Math.round((value / max) * 218));
                return (
                  <div key={`${vendor.vendor}-${day}`} className="group relative flex flex-1 justify-center">
                    <div className={`w-full max-w-[14px] rounded-t-md ${vendor.color} shadow-lg shadow-black/20`} style={{ height: `${height}px` }} />
                    <div className="pointer-events-none absolute bottom-full mb-2 hidden min-w-28 rounded-lg border border-white/10 bg-slate-950 px-2 py-1 text-center text-[10px] font-bold text-white shadow-2xl group-hover:block">
                      {vendor.vendor.split(' ')[0]}: {value}{metric === 'Remeasure Rate' ? '%' : '/100'}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">{day}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs text-slate-500">
        <span>{metric === 'Remeasure Rate' ? 'Lower values indicate fewer remeasure events.' : 'Higher values indicate stronger controlled evidence performance.'}</span>
        <span>Delta leads; Janvier remains stable; Northline trends weaker; MetroBuild needs operational support.</span>
      </div>
    </div>
  );
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const specificSlaSlices = {
  'Depth readings|Lagos|Delta Civil Works Ltd.|Medium': {
    overall: 72,
    completedWithinSla: 18,
    breaches: 9,
    arrival: 51,
    capture: 84,
    upload: 24,
    remeasure: 68,
    exceptionClosure: 69,
    primary: 'Field arrival delay',
    secondary: 'High remeasure rate',
    suggested: 'Review dispatch timing and coach workers with repeat depth-reading exceptions.',
    delays: { 'Field arrival delay': 22, 'Remeasure delay': 17, 'Capture execution delay': 12, 'Evidence upload delay': 7, 'Assignment overload': 6 },
  },
  'GNSS point set|FCT|Janvier Infrastructure|High': {
    overall: 91,
    completedWithinSla: 31,
    breaches: 2,
    arrival: 22,
    capture: 37,
    upload: 41,
    remeasure: 89,
    exceptionClosure: 88,
    primary: 'Evidence upload delay',
    secondary: 'Connectivity-related sync delays',
    suggested: 'Review upload workflow and offline sync conditions.',
    delays: { 'Evidence upload delay': 12, 'Connectivity delay': 10, 'Trust-gate failure delay': 4, 'Field arrival delay': 3 },
  },
  'Photo evidence capture|Port Harcourt|Northline Fiber|Medium': {
    overall: 78,
    completedWithinSla: 21,
    breaches: 6,
    arrival: 35,
    capture: 62,
    upload: 33,
    remeasure: 81,
    exceptionClosure: 74,
    primary: 'Missing required photos',
    secondary: 'Incomplete closeout packets',
    suggested: 'Coach crews on the required photo checklist before segment closure.',
    delays: { 'Trust-gate failure delay': 14, 'Evidence upload delay': 11, 'Capture execution delay': 10, 'Supervisor review delay': 5 },
  },
  'Remeasure|Ibadan|MetroBuild Utilities|High': {
    overall: 64,
    completedWithinSla: 12,
    breaches: 11,
    arrival: 48,
    capture: 95,
    upload: 37,
    remeasure: 52,
    exceptionClosure: 58,
    primary: 'Remeasure backlog',
    secondary: 'Supervisor approval delay',
    suggested: 'Add remeasure dispatch capacity and review the supervisor approval queue.',
    delays: { 'Remeasure delay': 24, 'Supervisor review delay': 18, 'Assignment overload': 13, 'Field arrival delay': 10 },
  },
};

function buildSlaSlice(filters, currentSegments) {
  const key = `${filters.workType}|${filters.region}|${filters.vendor}|${filters.riskTier}`;
  const seeded = `${filters.workType}${filters.region}${filters.vendor}${filters.riskTier}${filters.trigger}${filters.hours}${filters.severity}`
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const riskPenalty = { All: 2, Low: -4, Medium: 3, High: 9, Critical: 15 }[filters.riskTier] || 0;
  const severityPenalty = { Standard: -3, Warning: 0, High: 5, Critical: 9 }[filters.severity] || 0;
  const hoursPenalty = filters.hours === 'Calendar hours' ? 3 : 0;
  const base = {
    overall: clamp(93 - (seeded % 17) - riskPenalty - severityPenalty - hoursPenalty, 54, 97),
    completedWithinSla: 14 + (seeded % 21),
    breaches: clamp(2 + (seeded % 8) + Math.round(riskPenalty / 4), 0, 15),
    arrival: 22 + (seeded % 34) + Math.max(0, Math.round(riskPenalty / 3)),
    capture: 38 + (seeded % 49) + Math.max(0, Math.round(riskPenalty / 2)),
    upload: 14 + (seeded % 31) + (filters.workType === 'Evidence upload' ? 15 : 0),
    remeasure: clamp(91 - (seeded % 18) - Math.max(0, riskPenalty), 48, 96),
    exceptionClosure: clamp(88 - (seeded % 16) - Math.round(severityPenalty * 1.5), 50, 95),
  };
  const defaultPrimary = filters.workType === 'Evidence upload'
    ? 'Evidence upload delay'
    : filters.workType === 'Remeasure'
      ? 'Remeasure delay'
      : filters.trigger.includes('arrive')
        ? 'Field arrival delay'
        : delayTypes[seeded % delayTypes.length];
  const generated = {
    ...base,
    primary: defaultPrimary,
    secondary: filters.riskTier === 'Critical' ? 'Assignment overload' : ['Device readiness issue', 'Connectivity-related delays', 'Supervisor review bottleneck', 'Capture execution delay'][seeded % 4],
    suggested: 'Use the selected slice to isolate whether the delay is driven by dispatch, device readiness, connectivity, assignment load, or supervisor review.',
    delays: {
      [defaultPrimary]: 15 + (seeded % 10),
      'Capture execution delay': 7 + (seeded % 8),
      'Evidence upload delay': 5 + ((seeded + 3) % 9),
      'Trust-gate failure delay': 4 + ((seeded + 5) % 8),
      'Remeasure delay': 3 + ((seeded + 7) % 10),
      'Supervisor review delay': 2 + ((seeded + 11) % 8),
      'Client access delay': 2 + ((seeded + 13) % 6),
      'Connectivity delay': 3 + ((seeded + 17) % 8),
      'Assignment overload': 3 + ((seeded + 19) % 7),
    },
  };
  const override = specificSlaSlices[key];
  const slice = override ? { ...generated, ...override, delays: { ...generated.delays, ...override.delays } } : generated;
  return {
    ...slice,
    totalSegmentsInScope: Math.max(slice.completedWithinSla + slice.breaches, currentSegments.length || 1),
    maxDelay: Math.max(...delayTypes.map((delay) => slice.delays[delay] || 0), 1),
  };
}

function teamWorkerPool(vendor) {
  if (vendor === 'Internal Owner Crew A') return ['Chinedu Okafor', 'Maya Chen', 'Amina Bello'];
  if (vendor === 'Internal Owner Crew B') return ['R. Okafor', 'Folake Mensah', 'Daniel Okafor'];
  return null;
}

function buildSlaWorkers(filters, slice, allowedVendorTeams = slaVendorTeams) {
  const allowedSet = new Set(allowedVendorTeams);
  const pool = teamWorkerPool(filters.vendor);
  const selected = workerAnalytics.filter((worker) => {
    if (filters.vendor === 'All teams') return allowedSet.has(worker.vendor) || allowedSet.has('All teams') && allowedVendorTeams.length === slaVendorTeams.length;
    if (pool) return pool.includes(worker.name);
    return worker.vendor === filters.vendor;
  });
  const source = selected.length ? selected : workerAnalytics.slice(0, 4);
  const signalByPrimary = {
    'Field arrival delay': 'Arrival delays',
    'Evidence upload delay': 'Connectivity-related delays',
    'Missing required photos': 'Evidence coaching recommended',
    'Remeasure backlog': 'High remeasure rate',
    'Remeasure delay': 'High remeasure rate',
    'Trust-gate failure delay': 'Device readiness issue',
    'Assignment overload': 'Assignment load issue',
    'Supervisor review delay': 'Supervisor review bottleneck',
  };
  return source.map((worker, index) => {
    const swing = (index % 3) * 5;
    const displayVendor = filters.vendor.startsWith('Internal Owner Crew') ? filters.vendor : worker.vendor;
    return {
      ...worker,
      vendor: displayVendor,
      region: filters.region,
      assignedSegments: Math.max(2, Math.round(slice.totalSegmentsInScope / source.length) + index),
      completedSegments: Math.max(1, Math.round(slice.completedWithinSla / source.length) - (index % 2)),
      slaCompliance: clamp(slice.overall + 6 - swing, 45, 99),
      firstPassAcceptance: clamp(slice.overall + 12 - (index * 4), 50, 99),
      remeasureRate: clamp(100 - slice.remeasure + index * 2, 1, 38),
      outOfToleranceRate: clamp(4 + index * 2 + (filters.riskTier === 'Critical' ? 8 : 0), 1, 32),
      failedTrustGateRate: clamp(4 + (slice.breaches % 7) + index, 1, 28),
      averageArrival: `${slice.arrival + index * 4} min`,
      averageCapture: `${slice.capture + index * 6} min`,
      signal: index === 0 && slice.overall >= 88 ? 'Strong performer' : signalByPrimary[slice.primary] || worker.signal,
      recentSegments: segments.filter((segment) => filters.vendor === 'All teams' || segment.vendor === worker.vendor || displayVendor.startsWith('Internal Owner Crew')).slice(index, index + 4).map((segment) => segment.id),
      timeline: worker.timeline.map((event, eventIndex) => ({
        ...event,
        delay: delayTypes[(eventIndex + index + slice.breaches) % delayTypes.length],
        status: eventIndex % 4 === 0 && slice.breaches > 5 ? 'Warning' : 'Recorded',
      })),
    };
  });
}

function buildVendorComparison(filters, slice, rows, vendorOptions = slaVendorTeams) {
  if (filters.vendor !== 'All teams') {
    return rows.map((worker, index) => ({
      label: worker.name,
      compliance: worker.slaCompliance,
      breaches: Math.max(0, Math.round(slice.breaches / Math.max(rows.length, 1)) + (index % 2)),
      primary: worker.signal,
      arrival: worker.averageArrival,
      capture: worker.averageCapture,
    }));
  }
  return vendorOptions.filter((team) => team !== 'All teams').map((team, index) => ({
    label: team,
    compliance: clamp(slice.overall + 7 - index * 4, 48, 98),
    breaches: clamp(slice.breaches + index - 2, 0, 18),
    primary: [slice.primary, 'Evidence upload delay', 'Remeasure delay', 'Assignment overload', 'Connectivity delay', 'Capture execution delay'][index % 6],
    arrival: `${slice.arrival + index * 3} min`,
    capture: `${slice.capture + index * 5} min`,
  }));
}

function SlaWorkforceAnalytics({ isInternal, segments: currentSegments, owner, context, openWorker }) {
  const [filters, setFilters] = useState({
    name: 'Urban locate response SLA',
    workType: 'Depth readings',
    region: 'Lagos',
    vendor: 'All teams',
    riskTier: 'Medium',
    trigger: 'Time to arrive on site',
    target: '4 hours',
    grace: '30 minutes',
    escalation: 'Supervisor at grace breach; DICRI review desk after 2x target',
    hours: 'Business hours',
    severity: 'Warning',
  });
  const [focus, setFocus] = useState(null);
  const vendorOptions = useMemo(() => {
    if (isInternal) return slaVendorTeams;
    const scoped = [...new Set(currentSegments.map((segment) => segment.vendor))];
    return ['All teams', ...scoped, 'Internal Owner Crew A', 'Internal Owner Crew B'];
  }, [currentSegments, isInternal]);
  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const slice = useMemo(() => buildSlaSlice(filters, currentSegments), [filters, currentSegments]);
  const workerRows = useMemo(() => buildSlaWorkers(filters, slice, vendorOptions), [filters, slice, vendorOptions]);
  const comparisonRows = useMemo(() => buildVendorComparison(filters, slice, workerRows, vendorOptions), [filters, slice, vendorOptions, workerRows]);
  const delayRows = delayTypes
    .map((delay) => ({ label: delay, value: slice.delays[delay] || 0 }))
    .sort((a, b) => b.value - a.value);
  const sliceSummary = `Showing SLA performance for ${filters.workType} in ${filters.region} for ${filters.vendor} across ${filters.riskTier === 'All' ? 'all risk tiers' : `${filters.riskTier} Risk segments`}.`;
  const focusText = focus ? `Focused diagnostic view: ${focus}` : null;

  return (
    <section className="space-y-5">
      <PanelHeader
        title={isInternal ? 'SLA & Vendor Performance' : 'Workforce & SLA Analytics'}
        text={isInternal ? 'DICRI-facing view of vendor, project, region, and crew SLA patterns across permitted client scopes.' : 'Owner-configurable SLA tracking for field execution. DICRI does not impose SLA standards; the operator defines policy targets.'}
      />
      <FilterChip context={context} />
      {!isInternal && <FilterChip context={{ label: `Viewing ${owner} workforce and SLA records` }} />}
      {isInternal ? (
        <InfoBanner text="DICRI can compare vendor and project SLA patterns across permitted scopes. Client-private performance data remains isolated from other clients." />
      ) : (
        <InfoBanner text="Client-defined SLA policies can vary by work type, region, vendor/team, project type, and segment risk level." />
      )}

      <Card title="SLA Policy Builder" icon={SlidersHorizontal}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <TextInput label="SLA Name" value={filters.name} onChange={(value) => update('name', value)} />
          <Select label="Work Type" value={filters.workType} onChange={(value) => update('workType', value)} options={slaWorkTypes.map((item) => [item, item])} />
          <Select label="Region" value={filters.region} onChange={(value) => update('region', value)} options={slaRegions.map((item) => [item, item])} />
          <Select label="Vendor / Team" value={vendorOptions.includes(filters.vendor) ? filters.vendor : 'All teams'} onChange={(value) => update('vendor', value)} options={vendorOptions.map((item) => [item, item])} />
          <Select label="Segment Risk Tier" value={filters.riskTier} onChange={(value) => update('riskTier', value)} options={slaRiskTiers.map((item) => [item, item])} />
          <Select label="Trigger Event" value={filters.trigger} onChange={(value) => update('trigger', value)} options={slaTypes.map((item) => [item, item])} />
          <TextInput label="Target Duration" value={filters.target} onChange={(value) => update('target', value)} />
          <TextInput label="Grace Period" value={filters.grace} onChange={(value) => update('grace', value)} />
          <TextInput label="Escalation Rule" value={filters.escalation} onChange={(value) => update('escalation', value)} wide />
          <Select label="Business vs Calendar Hours" value={filters.hours} onChange={(value) => update('hours', value)} options={['Business hours', 'Calendar hours'].map((item) => [item, item])} />
          <Select label="Severity Level" value={filters.severity} onChange={(value) => update('severity', value)} options={['Standard', 'Warning', 'High', 'Critical'].map((item) => [item, item])} />
        </div>
      </Card>

      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Performance Slice</p>
        <p className="mt-2 text-lg font-black text-white">{sliceSummary}</p>
        {focusText && <p className="mt-2 text-sm font-bold text-amber-200">{focusText}</p>}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.8fr] gap-5">
        <Card title="Primary Efficiency Loss" icon={AlertTriangle}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Info label="Primary Loss" value={slice.primary} tone="amber" />
            <Info label="Secondary Issue" value={slice.secondary} tone="blue" />
            <Info label="Open SLA Breaches" value={slice.breaches} tone={slice.breaches > 8 ? 'red' : 'amber'} />
            <Info label="Suggested Action" value={slice.suggested} wide />
          </div>
        </Card>
        <Card title="Diagnostic Context" icon={Filter}>
          <Info label="Trigger Event" value={filters.trigger} />
          <Info label="Hours Basis" value={filters.hours} />
          <Info label="Severity Level" value={filters.severity} tone={filters.severity === 'Critical' ? 'red' : filters.severity === 'High' ? 'amber' : 'blue'} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <Kpi icon={CheckCircle2} label="Overall SLA Compliance" value={`${slice.overall}%`} tone={slice.overall >= 85 ? 'green' : slice.overall >= 70 ? 'amber' : 'red'} onClick={() => setFocus('Overall SLA compliance')} />
        <Kpi icon={Layers} label="Segments Completed Within SLA" value={slice.completedWithinSla} tone="green" onClick={() => setFocus('Segments completed within SLA')} />
        <Kpi icon={AlertTriangle} label="Open SLA Breaches" value={slice.breaches} tone={slice.breaches > 8 ? 'red' : 'amber'} onClick={() => setFocus('Open SLA breaches')} />
        <Kpi icon={Clock} label="Average Arrival Time" value={`${slice.arrival} min`} onClick={() => setFocus('Average arrival time')} />
        <Kpi icon={Activity} label="Average Capture Duration" value={`${slice.capture} min`} onClick={() => setFocus('Average capture duration')} />
        <Kpi icon={Upload} label="Average Evidence Upload Time" value={`${slice.upload} min`} onClick={() => setFocus('Average evidence upload time')} />
        <Kpi icon={Gauge} label="Remeasure SLA Compliance" value={`${slice.remeasure}%`} tone={slice.remeasure >= 80 ? 'blue' : 'amber'} onClick={() => setFocus('Remeasure SLA compliance')} />
        <Kpi icon={ShieldAlert} label="Exception Closure SLA Compliance" value={`${slice.exceptionClosure}%`} tone={slice.exceptionClosure >= 80 ? 'blue' : 'amber'} onClick={() => setFocus('Exception closure SLA compliance')} />
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_0.9fr] gap-5">
        <Card title="Worker Performance" icon={Users}>
          <Table headers={['Worker', 'Role', 'Vendor / Team', 'Region', 'Assigned Segments', 'Completed Segments', 'SLA Compliance', 'First-Pass Acceptance', 'Remeasure Rate', 'Failed Trust-Gate Rate', 'Average Arrival Time', 'Average Capture Duration', 'Coaching Signal']}>
            {workerRows.map((worker) => (
              <tr key={`${worker.id}-${worker.vendor}`} className="hover:bg-white/[0.035]">
                <Cell>{worker.name}</Cell><Cell>{worker.role}</Cell><Cell>{worker.vendor}</Cell><Cell>{worker.region}</Cell><Cell>{worker.assignedSegments}</Cell><Cell>{worker.completedSegments}</Cell><Cell>{worker.slaCompliance}%</Cell><Cell>{worker.firstPassAcceptance}%</Cell><Cell>{worker.remeasureRate}%</Cell><Cell>{worker.failedTrustGateRate}%</Cell><Cell>{worker.averageArrival}</Cell><Cell>{worker.averageCapture}</Cell>
                <Cell right><SmallButton onClick={() => openWorker(worker)}>{worker.signal}</SmallButton></Cell>
              </tr>
            ))}
          </Table>
        </Card>
        <Card title={filters.vendor === 'All teams' ? 'Vendor / Team Comparison' : 'Crew Comparison'} icon={Building2}>
          <Table headers={[filters.vendor === 'All teams' ? 'Vendor / Team' : 'Worker / Crew', 'SLA Compliance', 'Open Breaches', 'Primary Delay', 'Avg Arrival', 'Avg Capture']}>
            {comparisonRows.map((row) => (
              <tr key={row.label} className="hover:bg-white/[0.035]">
                <Cell>{row.label}</Cell><Cell>{row.compliance}%</Cell><Cell>{row.breaches}</Cell><Cell>{row.primary}</Cell><Cell>{row.arrival}</Cell><Cell>{row.capture}</Cell>
              </tr>
            ))}
          </Table>
        </Card>
      </div>

      <Card title="Segment-Level SLA Delay Diagnosis" icon={GitBranch}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          {delayRows.map((delay, index) => (
            <div key={delay.label} className={index === 0 ? 'rounded-2xl border border-amber-500/25 bg-amber-500/5 px-3' : ''}>
              <MiniBar label={`${delay.label}${index === 0 ? ' — primary' : ''}`} value={delay.value} max={slice.maxDelay} tone={index === 0 ? 'amber' : delay.label.includes('Remeasure') || delay.label.includes('Trust') ? 'red' : 'blue'} />
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function WorkerDetailDrawer({ worker, isInternal }) {
  const trend = [82, 85, 88, 84, 91, worker.firstPassAcceptance];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Info label="Worker Profile" value={`${worker.name} / ${worker.role}`} />
        <Info label="Certification Status" value={worker.role === 'Tiger' || worker.role === 'Cheetah' ? 'Valid' : 'Operational role'} tone="green" />
        <Info label="Vendor / Team" value={worker.vendor} />
        <Info label="Assigned Devices" value={worker.assignedDevices.join(', ')} wide />
        <Info label="Recent Segments" value={worker.recentSegments.length ? worker.recentSegments.join(', ') : 'No recent segment assignments'} wide />
        <Info label="Coaching Signal" value={worker.signal} tone={worker.signal === 'Strong performer' ? 'green' : 'amber'} />
      </div>
      <Card title="SLA Timeline" icon={Clock}>
        <div className="space-y-3">
          {worker.timeline.map((item) => (
            <div key={`${item.step}-${item.time}`} className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div><p className="text-sm font-black text-white">{item.step}</p><p className="mt-1 text-xs text-slate-500">{item.time} / Delay classification: {item.delay}</p></div>
              <Badge value={item.status} />
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="Evidence Quality Trend" icon={Activity}><SimpleBars values={trend} labels={['W1', 'W2', 'W3', 'W4', 'W5', 'Now']} /></Card>
        <Card title="Failed Trust Gates / Remeasure History" icon={ShieldAlert}>
          <MiniBar label="Failed trust-gate rate" value={worker.failedTrustGateRate} max={20} tone="amber" />
          <MiniBar label="Remeasure rate" value={worker.remeasureRate} max={20} tone="blue" />
          <MiniBar label="Out-of-tolerance rate" value={worker.outOfToleranceRate} max={20} tone="red" />
          <Info label="Coaching Recommendations" value={coachingRecommendation(worker.signal)} tone={worker.signal === 'Strong performer' ? 'green' : 'amber'} wide />
        </Card>
      </div>
      {isInternal && <InfoBanner text="DICRI-facing analytics compare vendors, projects, regions, and crews only across permitted scopes. Client-private workforce data is not exposed to other clients." />}
    </div>
  );
}

function coachingRecommendation(signal) {
  const map = {
    'Strong performer': 'Use as benchmark profile for similar field assignments.',
    'Evidence coaching recommended': 'Review photo framing, required artifacts, and upload checklist before next route.',
    'Arrival delays': 'Check dispatch timing, route access, and assignment handoff pattern.',
    'High remeasure rate': 'Review measurement method, device readiness, and site-condition notes.',
    'Device readiness issue': 'Confirm authorized device availability before assignment release.',
    'Assignment load issue': 'Balance assignment queue and reduce same-day overlap.',
    'Connectivity-related delays': 'Pre-load offline work package and verify sync window before dispatch.',
    'Supervisor review bottleneck': 'Review supervisor queue ownership and escalation timing for delayed approvals.',
  };
  return map[signal] || 'Monitor trend and provide operational support if repeated.';
}

function ReviewQueue({ isInternal, segments: sourceSegments, context, openSegment }) {
  const baseRows = context?.kind === 'certificate-eligible'
    ? sourceSegments.filter((segment) => segment.status === 'Certificate Eligible')
    : sourceSegments.filter((segment) => ['Certificate Eligible', 'Evidence Review', 'Exception Review', 'Blocked'].includes(segment.status));
  const rows = baseRows.slice(0, 12);
  return (
    <section className="space-y-5">
      <PanelHeader title={isInternal ? 'Certificate Review Queue' : 'DICRI Review Requests'} text={isInternal ? 'Certificate eligible, Tiger review, blocked, and supplemental evidence queue.' : 'Owner-visible review request lifecycle. DICRI remains the certificate issuer.'} />
      <FilterChip context={context} />
      <Table headers={isInternal ? ['Segment ID', 'Owner', 'Project', 'Evidence Readiness', 'Exception Status', 'Tiger Review Status', 'Certificate Status', 'Action'] : ['Segment ID', 'Owner', 'Project', 'Request Status', 'DICRI Review Status', 'Certificate Outcome', 'Action']}>
        {rows.map((segment) => <tr key={segment.id}><Cell mono>{segment.id}</Cell><Cell>{segment.owner}</Cell><Cell>{segment.project}</Cell><Cell>{segment.readiness}%</Cell><Cell>{segment.exceptions ? 'Open exceptions' : 'Clear'}</Cell><Cell>{segment.status === 'Exception Review' ? 'Tiger pending' : 'Not assigned'}</Cell><Cell>{isInternal ? segment.certificateStatus : ownerReviewStatus(segment)}</Cell><Cell right><SmallButton onClick={() => openSegment(segment)}>{isInternal ? 'Open Evidence Record' : 'View Review Status'}</SmallButton></Cell></tr>)}
      </Table>
      <ActionRow actions={isInternal ? ['Assign Tiger', 'Build Audit Packet', 'Approve Certificate', 'Reject / Not Certifiable', 'Request Supplemental Evidence'] : ['Submit to DICRI Review', 'Respond to Evidence Request', 'View Returned Certified Record']} />
    </section>
  );
}

function ownerReviewStatus(segment) {
  if (segment.status === 'Certificate Eligible') return 'Approved for certificate issuance';
  if (segment.status === 'Certified') return 'Certificate issued by DICRI';
  if (segment.status === 'Exception Review') return 'Supplemental evidence requested';
  return 'Under DICRI Review';
}

function AuditPacketBuilder({ segment }) {
  return (
    <section className="space-y-5">
      <PanelHeader title="Audit Packet Builder" text="Assemble certificate support packet from evidence inventory, trust proof, measurements, photos, exceptions, and provenance." />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {['Segment summary', 'Evidence inventory', 'Trust-gate proof', 'Measurement records', 'Photo records', 'Exceptions and adjudication', 'Hash/provenance log', 'Final certification decision'].map((section, i) => <Info key={section} label={section} value={i === 5 && segment.exceptions ? 'Requires Review' : 'Complete'} tone={i === 5 && segment.exceptions ? 'amber' : 'green'} />)}
      </div>
      <ActionRow actions={['Build Audit Packet', segment.exceptions ? 'Requires Review' : 'Audit Packet Complete']} />
    </section>
  );
}

function CertificateRegistry({ isInternal, segments: sourceSegments, context, openSegment, openCertificateLater }) {
  const rows = context?.kind === 'certificates-issued' ? certificates.filter((cert) => cert.status === 'Issued') : certificates;
  return (
    <section className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <PanelHeader title="Certificate Registry" text="Certificate records, renewal dates, evidence anchors, and certificate-later workflow." />
        <SmallButton onClick={openCertificateLater}>Find Certifiable Segment</SmallButton>
      </div>
      <FilterChip context={context} />
      <Table headers={['Certificate ID', 'Segment ID', 'Owner', 'Project', 'Issue Date', 'Type', 'Status', 'Evidence Hash', 'Renewal / Reverification', 'Actions']}>
        {rows.map((cert) => <tr key={cert.id}><Cell mono>{cert.id}</Cell><Cell mono>{cert.segmentId}</Cell><Cell>{cert.owner}</Cell><Cell>{cert.project}</Cell><Cell>{cert.issueDate}</Cell><Cell>{cert.type}</Cell><Cell><Badge value={cert.status} /></Cell><Cell>{cert.hash}</Cell><Cell>{cert.renewal}</Cell><Cell right><SmallButton onClick={() => openSegment(sourceSegments.find((s) => s.id === cert.segmentId) || sourceSegments[0] || segments[0])}>{isInternal ? 'Open Record' : 'View Own Record'}</SmallButton></Cell></tr>)}
      </Table>
    </section>
  );
}

function EvidenceStatus({ segments, openSegment }) {
  return (
    <section className="space-y-5">
      <PanelHeader title="Evidence Status" text="Owner-operated evidence is separated by admissibility state before DICRI review or certificate issuance." />
      <Table headers={['Segment ID', 'Project', 'Vendor', 'Evidence Status', 'Integrity', 'Readiness', 'Certificate / Review Status', 'Action']}>
        {segments.map((segment) => (
          <tr key={segment.id} className="hover:bg-white/[0.035]">
            <Cell mono>{segment.id}</Cell>
            <Cell>{segment.project}</Cell>
            <Cell>{segment.vendor}</Cell>
            <Cell><Badge value={segment.evidenceStatus} /></Cell>
            <Cell>{segment.integrity}</Cell>
            <Cell>{segment.readiness}%</Cell>
            <Cell>{segment.certificateStatus}</Cell>
            <Cell right><SmallButton onClick={() => openSegment(segment)}>{segment.evidenceStatus === 'Policy-Admissible' ? 'Submit to DICRI Review' : 'Open Evidence'}</SmallButton></Cell>
          </tr>
        ))}
      </Table>
    </section>
  );
}

function RiskTrends({ segments }) {
  return (
    <section className="space-y-5">
      <PanelHeader title="Asset Risk Trends" text="Lifecycle intelligence for owner-operated infrastructure portfolios." />
      <Card title="Risk Movement" icon={Gauge}><SimpleBars values={[22, 28, 41, 55, 68]} labels={['Apr 01', 'Apr 10', 'Apr 20', 'May 01', 'May 10']} /></Card>
      <Table headers={['Segment ID', 'Region', 'Current Risk', 'Previous Risk', 'Trend', 'Last Event', 'Exceptions', 'Recommended Action']}>
        {segments.slice(0, 10).map((segment, i) => <tr key={segment.id}><Cell mono>{segment.id}</Cell><Cell>{segment.region}</Cell><Cell><Badge value={segment.risk} /></Cell><Cell>{i % 2 ? 'Medium' : 'Low'}</Cell><Cell>{segment.risk === 'High' ? 'Rising' : 'Stable'}</Cell><Cell>{segment.status}</Cell><Cell>{segment.exceptions}</Cell><Cell>{segment.risk === 'High' ? 'Submit to DICRI Review' : 'Monitor'}</Cell></tr>)}
      </Table>
    </section>
  );
}

function CertificateLaterWorkflow({ setSelectedSegment }) {
  const [query, setQuery] = useState('');
  const result = segments.find((segment) => [segment.owner, segment.project, segment.id, segment.vendor, segment.region].join(' ').toLowerCase().includes(query.toLowerCase())) || segments[0];
  const status = result.evidenceStatus === 'Policy-Admissible' ? 'Certificate Eligible' : result.evidenceStatus === 'Exception Evidence' ? 'Review Required' : result.evidenceStatus === 'Raw Captured' ? 'Supplemental Evidence Required' : 'Not Certifiable';
  return (
    <div className="space-y-4">
      <InfoBanner text="Certificate Later: locate historical evidence for a segment captured before certification was requested." />
      <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search owner, project, segment ID, location, vendor, date range..." className="w-full rounded-xl border border-white/10 bg-slate-950 px-10 py-3 text-sm text-white outline-none focus:border-blue-500" /></div>
      <Info label="Historical Segment Evidence Record" value={result.id} />
      <Info label="Certificate Later Result" value={status} tone={statusTone(status)} />
      <ActionRow actions={status === 'Certificate Eligible' ? ['Generate Certificate Review Packet'] : status === 'Review Required' ? ['Send to Tiger Review'] : status === 'Supplemental Evidence Required' ? ['Request Supplemental Evidence'] : ['Recommend Reverification / Health Certificate Workflow']} onPrimary={() => setSelectedSegment(result)} />
    </div>
  );
}

function drawerTitle(type) {
  return type === 'packet' ? 'Packet Detail' : type === 'segmentation-wizard' ? 'Packet Segmentation Wizard' : type === 'trust' ? 'Trust Gate Detail' : type === 'worker' ? 'Worker SLA Detail' : type === 'certificate-later' ? 'Find Certifiable Segment' : 'Segment Evidence Record';
}

function PanelHeader({ title, text }) {
  return <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Control Plane</p><h2 className="mt-2 text-3xl font-black text-white">{title}</h2><p className="mt-2 text-sm text-slate-400 max-w-4xl">{text}</p></div>;
}

function FilterChip({ context }) {
  if (!context) return null;
  return <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-200"><Filter size={13} />{context.label}</div>;
}

function Card({ title, icon: Icon, children, embedded }) {
  return <section className={`rounded-2xl border border-white/10 bg-slate-900/75 shadow-2xl ${embedded ? '' : 'overflow-hidden'}`}><div className="border-b border-white/10 p-4 flex items-center gap-2"><Icon size={18} className="text-blue-400" /><h3 className="font-black text-white">{title}</h3></div><div className="p-4">{children}</div></section>;
}

function Kpi({ icon: Icon, label, value, tone = 'blue', onClick }) {
  return <button onClick={onClick} className="group text-left rounded-2xl border border-white/10 bg-slate-900/75 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-950/30 cursor-pointer"><div className={`h-10 w-10 rounded-xl ${toneClass(tone, 'soft')} flex items-center justify-center`}><Icon size={20} /></div><p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p><p className="mt-1 text-3xl font-black text-white">{value}</p><p className="mt-3 text-[10px] font-black uppercase tracking-widest text-blue-300 opacity-80 group-hover:opacity-100">View details →</p></button>;
}

function Badge({ value }) {
  const tone = statusTone(value);
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${toneClass(tone)}`}>{value}</span>;
}

function toneClass(tone, mode = 'pill') {
  const map = {
    green: mode === 'soft' ? 'bg-green-500/10 text-green-300 border border-green-500/25' : 'bg-green-500/10 text-green-300 border-green-500/25',
    red: mode === 'soft' ? 'bg-red-500/10 text-red-300 border border-red-500/25' : 'bg-red-500/10 text-red-300 border-red-500/25',
    amber: mode === 'soft' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/25' : 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    blue: mode === 'soft' ? 'bg-blue-500/10 text-blue-300 border border-blue-500/25' : 'bg-blue-500/10 text-blue-300 border-blue-500/25',
  };
  return map[tone] || map.blue;
}

function Table({ headers, children }) {
  return <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/75 shadow-2xl"><table className="w-full min-w-[980px] text-left"><thead className="bg-slate-950/70 text-[9px] font-black uppercase tracking-[0.22em] text-slate-500"><tr>{headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr></thead><tbody className="divide-y divide-white/10">{children}</tbody></table></div>;
}

function Cell({ children, mono, right }) {
  return <td className={`px-4 py-4 text-sm text-slate-300 ${mono ? 'font-mono font-bold text-blue-200' : ''} ${right ? 'text-right' : ''}`}>{children}</td>;
}

function Select({ label, value, onChange, options }) {
  return <label className="block"><span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm font-bold text-white outline-none focus:border-blue-500">{options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>;
}

function TextInput({ label, value, onChange, wide }) {
  return <label className={`block ${wide ? 'md:col-span-2' : ''}`}><span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm font-bold text-white outline-none focus:border-blue-500" /></label>;
}

function FilterPanel({ children }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4 grid grid-cols-1 md:grid-cols-3 gap-3">{children}</div>;
}

function Info({ label, value, tone = 'blue', wide }) {
  return <div className={`rounded-2xl border border-white/10 bg-slate-950/55 p-4 ${wide ? 'md:col-span-2 xl:col-span-3' : ''}`}><p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</p><p className={`mt-1 text-sm font-black ${toneClass(tone).split(' ')[1] || 'text-white'}`}>{value}</p></div>;
}

function ActionRow({ actions, onPrimary }) {
  return <div className="mt-4 flex flex-wrap gap-2">{actions.map((action, i) => <button key={action} onClick={i === 0 ? onPrimary : undefined} className={`rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'bg-blue-600 text-white hover:bg-blue-500' : 'border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'}`}>{action}</button>)}</div>;
}

function SmallButton({ children, onClick }) {
  return <button onClick={onClick} className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-blue-200 hover:bg-blue-500/20">{children}</button>;
}

function InfoBanner({ text }) {
  return <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-100">{text}</div>;
}

function ActivityRow({ time, event, status }) {
  return <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-0"><div><p className="text-[10px] font-mono text-slate-500">{time}</p><p className="mt-1 text-sm font-black text-white">{event}</p></div><Badge value={status} /></div>;
}

function MiniBar({ label, value, max, tone = 'blue' }) {
  const pct = Math.min(100, Math.round((value / Math.max(max, 1)) * 100));
  return <div className="py-2"><div className="flex justify-between text-xs font-bold text-slate-300"><span>{label}</span><span>{value}</span></div><div className="mt-2 h-2 rounded-full bg-slate-950 overflow-hidden"><div className={`h-full ${tone === 'green' ? 'bg-green-500' : tone === 'amber' ? 'bg-amber-500' : tone === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} /></div></div>;
}

function SimpleBars({ values, labels }) {
  const max = Math.max(...values, 1);
  return <div className="h-64 flex items-end gap-3">{values.map((value, i) => <div key={`${value}-${i}`} className="flex-1 flex flex-col items-center gap-2"><div className="w-full rounded-t-xl bg-blue-500/80" style={{ height: `${Math.round((value / max) * 210)}px` }} /><span className="text-[10px] font-bold text-slate-500">{labels[i]}</span></div>)}</div>;
}

function Drawer({ title, children, onClose }) {
  return <div className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm flex justify-end"><div className="h-full w-full max-w-5xl overflow-y-auto border-l border-white/10 bg-[#07111f] p-5 shadow-2xl"><div className="sticky top-0 z-10 mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/90 p-4"><h2 className="text-xl font-black text-white">{title}</h2><button onClick={onClose} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white"><X size={18} /></button></div>{children}</div></div>;
}
