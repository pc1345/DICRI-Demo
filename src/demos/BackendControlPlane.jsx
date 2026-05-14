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
  ['sla', 'SLA & Workforce Analytics', Clock],
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

export default function BackendControlPlane() {
  const [mode, setMode] = useState('internal');
  const [activeTab, setActiveTab] = useState('command');
  const [allSegments, setAllSegments] = useState(segments);
  const [selectedPacket, setSelectedPacket] = useState(packets[0]);
  const [selectedSegment, setSelectedSegment] = useState(segments[0]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(workerAnalytics[0]);
  const [projectFilter, setProjectFilter] = useState('All');
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [vendorFilter, setVendorFilter] = useState('All');
  const [failureFilter, setFailureFilter] = useState('All');
  const [drawer, setDrawer] = useState(null);
  const isInternal = mode === 'internal';
  const tabs = isInternal ? INTERNAL_TABS : OWNER_TABS;

  const visibleSegments = useMemo(() => allSegments.filter((segment) => (
    (projectFilter === 'All' || segment.project === projectFilter) &&
    (ownerFilter === 'All' || segment.owner === ownerFilter) &&
    (vendorFilter === 'All' || segment.vendor === vendorFilter)
  )), [allSegments, projectFilter, ownerFilter, vendorFilter]);

  const visibleEvents = useMemo(() => trustEvents.filter((event) => (
    (failureFilter === 'All' || event.failureType === failureFilter) &&
    (vendorFilter === 'All' || event.vendor === vendorFilter) &&
    (projectFilter === 'All' || event.project === projectFilter)
  )), [failureFilter, vendorFilter, projectFilter]);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setActiveTab('command');
    setDrawer(null);
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
              <button key={id} onClick={() => setActiveTab(id)} className={`w-full rounded-xl px-3 py-3 flex items-center justify-between text-left ${activeTab === id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-tight"><Icon size={16} />{label}</span>
                {activeTab === id && <ChevronRight size={14} />}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 p-5 space-y-5">
          {activeTab === 'command' && <CommandCenter isInternal={isInternal} segments={visibleSegments} />}
          {activeTab === 'packets' && <PacketIntake isInternal={isInternal} selectedPacket={selectedPacket} setSelectedPacket={setSelectedPacket} openDrawer={setDrawer} />}
          {activeTab === 'segmentation' && <SegmentationWorkspace openSegment={(segment) => { setSelectedSegment(segment); setDrawer('segment'); }} />}
          {activeTab === 'registry' && <SegmentRegistry segments={visibleSegments} selectedSegment={selectedSegment} setSelectedSegment={setSelectedSegment} openDrawer={() => setDrawer('segment')} projectFilter={projectFilter} setProjectFilter={setProjectFilter} ownerFilter={ownerFilter} setOwnerFilter={setOwnerFilter} vendorFilter={vendorFilter} setVendorFilter={setVendorFilter} />}
          {activeTab === 'evidence' && <EvidenceStatus segments={visibleSegments} openSegment={(segment) => { setSelectedSegment(segment); setDrawer('segment'); }} />}
          {activeTab === 'trust' && <TrustGateMonitor events={visibleEvents} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} openDrawer={setDrawer} failureFilter={failureFilter} setFailureFilter={setFailureFilter} />}
          {activeTab === 'exceptions' && <ExceptionReview isInternal={isInternal} segments={allSegments.filter((segment) => segment.exceptions || segment.depthDeviation > 0.05)} openDrawer={setDrawer} setSelectedSegment={setSelectedSegment} />}
          {activeTab === 'performance' && <PerformanceAnalytics />}
          {activeTab === 'sla' && <SlaWorkforceAnalytics isInternal={isInternal} segments={allSegments} openWorker={(worker) => { setSelectedWorker(worker); setDrawer('worker'); }} />}
          {activeTab === 'review' && <ReviewQueue isInternal={isInternal} segments={allSegments} openSegment={(segment) => { setSelectedSegment(segment); setDrawer('segment'); }} />}
          {activeTab === 'builder' && isInternal && <AuditPacketBuilder segment={selectedSegment} />}
          {activeTab === 'certificates' && isInternal && <CertificateRegistry isInternal={isInternal} segments={allSegments} openSegment={(segment) => { setSelectedSegment(segment); setDrawer('segment'); }} openCertificateLater={() => setDrawer('certificate-later')} />}
          {activeTab === 'risk' && !isInternal && <RiskTrends segments={visibleSegments} />}
        </main>
      </div>

      {drawer && (
        <Drawer title={drawerTitle(drawer)} onClose={() => setDrawer(null)}>
          {drawer === 'packet' && <PacketDrawer packet={selectedPacket} isInternal={isInternal} />}
          {drawer === 'segment' && <SegmentEvidenceRecord segment={selectedSegment} isInternal={isInternal} />}
          {drawer === 'trust' && <TrustGateDrawer event={selectedEvent || visibleEvents[0]} />}
          {drawer === 'worker' && <WorkerDetailDrawer worker={selectedWorker} isInternal={isInternal} />}
          {drawer === 'segmentation-wizard' && <PacketSegmentationWizard packet={selectedPacket} onPublish={(newSegments) => { setAllSegments((current) => [...newSegments, ...current]); setSelectedSegment(newSegments[0]); setActiveTab('registry'); }} />}
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

function CommandCenter({ isInternal, segments }) {
  const eligible = segments.filter((segment) => segment.status === 'Certificate Eligible').length;
  const underReview = segments.filter((segment) => segment.status === 'Evidence Review' || segment.status === 'Exception Review').length;
  const failed = trustEvents.filter((event) => event.severity !== 'Warning').length;
  const issued = certificates.filter((cert) => cert.status === 'Issued').length;
  const distribution = ['Certified', 'Certificate Eligible', 'Evidence Review', 'Exception Review', 'Blocked'].map((label) => [label, segments.filter((segment) => segment.status === label).length]);
  return (
    <section className="space-y-5">
      <PanelHeader title={isInternal ? 'Command Center' : 'Operations Dashboard'} text={isInternal ? 'Internal oversight across certification readiness, exceptions, and issuance governance.' : 'Owner-visible operational control without DICRI certificate issuance authority.'} />
      {!isInternal && <InfoBanner text="Owner-operated users can manage evidence and submit to DICRI Review. Approve Certificate and Issue Certificate controls are intentionally unavailable." />}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <Kpi icon={Boxes} label="Active Projects" value={projects.length} />
        <Kpi icon={Layers} label="Active Segments" value={segments.length} />
        <Kpi icon={Award} label="Certificate Eligible Segments" value={eligible} tone="green" />
        <Kpi icon={Clock} label="Segments Under Review" value={underReview} tone="amber" />
        <Kpi icon={ShieldAlert} label="Failed Trust Gates Today" value={failed} tone="red" />
        <Kpi icon={AlertTriangle} label="Open Exceptions" value={segments.reduce((sum, segment) => sum + segment.exceptions, 0)} tone="amber" />
        <Kpi icon={BadgeCheck} label="Certificates Issued" value={isInternal ? issued : 'DICRI view'} tone="blue" />
        <Kpi icon={Gauge} label="Average Review Cycle Time" value="2.8 days" />
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
        <Card title="Trust-Gate Failure Trend" icon={Activity}>
          <SimpleBars values={[3, 6, 4, 8, 5, 9, 6]} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} />
        </Card>
        <Card title="Segment Status Distribution" icon={SlidersHorizontal}>
          {distribution.map(([label, value]) => <MiniBar key={label} label={label} value={value} max={segments.length} tone={statusTone(label)} />)}
        </Card>
      </div>
    </section>
  );
}

function PacketIntake({ isInternal, selectedPacket, setSelectedPacket, openDrawer }) {
  return (
    <section className="space-y-5">
      <PanelHeader title={isInternal ? 'Packet Intake' : 'Project Packets'} text="Incoming route, GIS, permit, test, photo, and field evidence packets." />
      <Table headers={['Packet ID', 'Project', 'Asset Owner', 'Vendor', 'Packet Type', 'Received Time', 'Parse Status', 'Missing Items', 'Action']}>
        {packets.map((packet) => (
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
      <PacketDrawer packet={selectedPacket} isInternal={isInternal} embedded />
    </section>
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

function PacketSegmentationWizard({ packet, onPublish }) {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [strategy, setStrategy] = useState('1 km default segmentation');
  const [published, setPublished] = useState(false);
  const [route, setRoute] = useState({
    code: 'OBD-IL-2026',
    owner: 'BRI Fiber Services',
    vendor: 'Janvier Infrastructure',
    region: 'Illinois / DuPage County',
  });
  const [rules, setRules] = useState({
    prefix: 'SEG-OBD',
    convention: 'SEG-[PROJECT CODE]-[SEQUENCE]',
    sequence: '001, 002, 003',
    vendor: 'Janvier Infrastructure',
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
          <Info label="Uploaded Packet" value="BRI Route Package - Oakbrook Terrace to Downers Grove" wide />
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
          {processed && <DetectedResults />}
        </WizardFrame>
      )}

      {step === 3 && (
        <WizardFrame title="Review Detected Route" text="Detected data remains separate from admin-confirmed route metadata.">
          <RoutePreview />
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
            <Select label="Naming Convention" value={rules.convention} onChange={(value) => setRules((current) => ({ ...current, convention: value }))} options={['SEG-[PROJECT CODE]-[SEQUENCE]', '[OWNER]-[REGION]-[ROUTE]-[SEQUENCE]', '[VENDOR]-[PROJECT]-[SEQUENCE]', 'Custom'].map((item) => [item, item])} />
            <TextInput label="Sequence Format" value={rules.sequence} onChange={(value) => setRules((current) => ({ ...current, sequence: value }))} />
            <Select label="Default Vendor" value={rules.vendor} onChange={(value) => setRules((current) => ({ ...current, vendor: value }))} options={vendors.map((item) => [item, item])} />
            <Select label="Crew Assignment Method" value={rules.crew} onChange={(value) => setRules((current) => ({ ...current, crew: value }))} options={['Auto-assign by region and skill', 'Use packet vendor crew', 'Manual assignment by admin', 'Risk-based Tiger oversight'].map((item) => [item, item])} />
            <TextInput label="Evidence Requirements" value={rules.evidence} onChange={(value) => setRules((current) => ({ ...current, evidence: value }))} wide />
            <Select label="Default SLA Policy" value={rules.sla} onChange={(value) => setRules((current) => ({ ...current, sla: value }))} options={['Urban locate response SLA', 'High-risk crossing SLA', 'Standard capture SLA', 'Owner-defined SLA'].map((item) => [item, item])} />
            <Select label="Certificate Type Target" value={rules.certificateType} onChange={(value) => setRules((current) => ({ ...current, certificateType: value }))} options={['Birth Certificate', 'Health Certificate'].map((item) => [item, item])} />
          </div>
        </WizardFrame>
      )}

      {step === 7 && (
        <WizardFrame title="Publish Segments" text="Publish creates governed records for registry, assignment, capture, SLA, and certificate readiness pipelines.">
          {!published ? (
            <button onClick={publish} className="rounded-xl bg-green-600 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-green-500">Publish Segments</button>
          ) : (
            <InfoBanner text={`${generated.length} segment records created and sent to Segment Registry, Assignment Queue, Evidence Capture Workflow, SLA Tracker, and Certificate Readiness Pipeline.`} />
          )}
          <GeneratedSegmentTable rows={generated} />
          <Info label="Certificate Review Queue" value="Not shown as certificate-ready until evidence capture occurs." tone="amber" />
        </WizardFrame>
      )}

      <div className="flex justify-between">
        <SmallButton onClick={() => setStep(Math.max(1, step - 1))}>Back</SmallButton>
        <SmallButton onClick={() => setStep(Math.min(7, step + 1))}>Continue</SmallButton>
      </div>
    </div>
  );
}

function WizardFrame({ title, text, children }) {
  return <Card title={title} icon={GitBranch}><p className="mb-4 text-sm text-slate-400">{text}</p><div className="space-y-4">{children}</div></Card>;
}

function DetectedResults() {
  const rows = [
    ['Detected route', 'Oakbrook Terrace to Downers Grove', 'High Confidence'],
    ['Estimated route length', '10.2 km', 'High Confidence'],
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

function RoutePreview() {
  return (
    <div className="h-80 rounded-2xl border border-white/10 bg-[#071A33] relative overflow-hidden">
      <svg viewBox="0 0 900 360" className="h-full w-full">
        <rect width="900" height="360" fill="#071A33" />
        <path d="M70 230 C190 150 260 190 360 130 S560 78 815 132" fill="none" stroke="#38BDF8" strokeWidth="18" strokeLinecap="round" />
        <path d="M230 80 V300" stroke="#D4A100" strokeWidth="5" strokeDasharray="10 12" />
        <path d="M460 70 V310" stroke="#A855F7" strokeWidth="5" strokeDasharray="10 12" />
        <path d="M640 84 V278" stroke="#EF4444" strokeWidth="5" strokeDasharray="8 10" />
        <circle cx="70" cy="230" r="10" fill="#22C55E" />
        <circle cx="815" cy="132" r="10" fill="#22C55E" />
      </svg>
      <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-blue-400">System Detected Route</p><p className="mt-1 text-sm font-black text-white">Oakbrook Terrace to Downers Grove</p></div>
    </div>
  );
}

function generateWizardSegments(strategy, route, rules) {
  const meta = segmentationStrategies[strategy] || segmentationStrategies['1 km default segmentation'];
  return Array.from({ length: meta.count }, (_, index) => {
    const seq = String(index + 1).padStart(3, '0');
    const boundary = strategy === 'Risk-based segmentation'
      ? ['Standard route', 'Road crossing', 'Splice boundary', 'HDD crossing', 'High-risk utility corridor'][index % 5]
      : 'Standard route';
    return {
      id: `${rules.prefix}-${seq}`,
      projectId: 'PRJ-OBD',
      project: 'BRI Route Package - Oakbrook Terrace to Downers Grove',
      owner: route.owner,
      region: route.region,
      vendor: rules.vendor,
      route: 'Oakbrook Terrace to Downers Grove',
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

function GeneratedSegmentTable({ rows }) {
  return (
    <Table headers={['Segment ID', 'Start point', 'End point', 'Length', 'Boundary type', 'Risk flags', 'Required evidence', 'Suggested vendor/crew', 'Certificate readiness rule']}>
      {rows.map((segment) => <tr key={segment.id}><Cell mono>{segment.id}</Cell><Cell>{segment.start}</Cell><Cell>{segment.end}</Cell><Cell>{segment.length}</Cell><Cell>{segment.boundary}</Cell><Cell>{segment.risk}</Cell><Cell>{segment.requiredEvidence}</Cell><Cell>{segment.vendor} / {segment.crew}</Cell><Cell>{segment.certificateRule}</Cell></tr>)}
    </Table>
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

function SegmentRegistry({ segments, selectedSegment, setSelectedSegment, openDrawer, projectFilter, setProjectFilter, ownerFilter, setOwnerFilter, vendorFilter, setVendorFilter }) {
  return (
    <section className="space-y-5">
      <PanelHeader title="Segment Registry" text="Search and inspect segment evidence records across projects, regions, vendors, and certificate status." />
      <FilterPanel>
        <Select label="Asset Owner" value={ownerFilter} onChange={setOwnerFilter} options={['All', ...owners].map((x) => [x, x])} />
        <Select label="Project" value={projectFilter} onChange={setProjectFilter} options={['All', ...projects.map((p) => p.name)].map((x) => [x, x])} />
        <Select label="Vendor" value={vendorFilter} onChange={setVendorFilter} options={['All', ...vendors].map((x) => [x, x])} />
      </FilterPanel>
      <Table headers={['Segment ID', 'Owner', 'Project', 'Vendor', 'Region', 'Status', 'Certificate Status', 'Evidence Readiness', 'Action']}>
        {segments.map((segment) => (
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

function TrustGateMonitor({ events, selectedEvent, setSelectedEvent, openDrawer, failureFilter, setFailureFilter }) {
  return (
    <section className="space-y-5">
      <PanelHeader title="Trust Gate Monitor" text="Live-style trust-gate failures and governed capture decisions." />
      <FilterPanel><Select label="Failure Type" value={failureFilter} onChange={setFailureFilter} options={['All', ...failureTypes].map((x) => [x, x])} /></FilterPanel>
      <Table headers={['Timestamp', 'Segment', 'Worker', 'Device', 'Vendor', 'Failure Type', 'Severity', 'Action Required']}>
        {events.map((event) => <tr key={event.id} className={`${selectedEvent?.id === event.id ? 'bg-blue-600/10' : 'hover:bg-white/[0.035]'}`}><Cell>{event.timestamp}</Cell><Cell mono>{event.segment}</Cell><Cell>{event.worker}</Cell><Cell>{event.device}</Cell><Cell>{event.vendor}</Cell><Cell>{event.failureType}</Cell><Cell><Badge value={event.severity} /></Cell><Cell right><SmallButton onClick={() => { setSelectedEvent(event); openDrawer('trust'); }}>{event.action}</SmallButton></Cell></tr>)}
      </Table>
    </section>
  );
}

function TrustGateDrawer({ event }) {
  if (!event) return <InfoBanner text="No trust-gate event selected." />;
  return (
    <div className="space-y-4">
      <Info label="What failed" value={event.failureType} tone={statusTone(event.severity)} />
      <Info label="Why it matters" value="This trust gate determines whether captured evidence can enter the certified evidence pipeline." wide />
      <Info label="Capture Decision" value={event.severity === 'Hard Stop' || event.severity === 'Blocked' ? 'Capture blocked or quarantined' : 'Allowed with review requirement'} tone={event.severity === 'Warning' ? 'amber' : 'red'} />
      <Info label="Required Next Action" value={event.action} />
    </div>
  );
}

function ExceptionReview({ isInternal, segments, setSelectedSegment, openDrawer }) {
  return (
    <section className="space-y-5">
      <PanelHeader title="Exception Review" text="Narrow gray-area issues, tolerance deviations, and evidence exceptions." />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {segments.slice(0, 8).map((segment) => <ExceptionCard key={segment.id} isInternal={isInternal} segment={segment} onOpen={() => { setSelectedSegment(segment); openDrawer('segment'); }} />)}
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

function PerformanceAnalytics() {
  const rows = vendors.map((vendor, i) => ({ vendor, completed: 24 - i * 3, acceptance: 92 - i * 6, remeasure: 4 + i, tolerance: 3 + i * 2, handshake: 2 + i, sla: `${96 - i * 5}%`, exceptions: i + 1, quality: 88 - i * 4 }));
  return (
    <section className="space-y-5">
      <PanelHeader title="Vendor & Worker Performance" text="Operational coaching signals for evidence quality, SLA performance, and workflow support." />
      <Card title="Performance Trend" icon={Activity}><SimpleBars values={[88, 91, 86, 93, 89, 94, 92]} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} /></Card>
      <Table headers={['Vendor', 'Segments Completed', 'First-Pass Acceptance', 'Remeasure Rate', 'Out-of-Tolerance', 'Failed Handshake', 'SLA Performance', 'Open Exceptions', 'Evidence Quality']}>
        {rows.map((row) => <tr key={row.vendor}><Cell>{row.vendor}</Cell><Cell>{row.completed}</Cell><Cell>{row.acceptance}%</Cell><Cell>{row.remeasure}%</Cell><Cell>{row.tolerance}%</Cell><Cell>{row.handshake}%</Cell><Cell>{row.sla}</Cell><Cell>{row.exceptions}</Cell><Cell>{row.quality}/100</Cell></tr>)}
      </Table>
    </section>
  );
}

function SlaWorkforceAnalytics({ isInternal, segments: currentSegments, openWorker }) {
  const [policy, setPolicy] = useState({
    name: 'Urban locate response SLA',
    workType: 'Depth readings',
    region: 'Lagos',
    vendor: 'All teams',
    riskTier: 'Medium',
    trigger: 'Assignment issued',
    target: '4 hours',
    grace: '30 minutes',
    escalation: 'Supervisor at grace breach; DICRI review desk after 2x target',
    hours: 'Business hours',
    severity: 'Warning',
  });
  const update = (key, value) => setPolicy((current) => ({ ...current, [key]: value }));
  const compliance = Math.round(workerAnalytics.reduce((sum, worker) => sum + worker.slaCompliance, 0) / workerAnalytics.length);
  return (
    <section className="space-y-5">
      <PanelHeader
        title={isInternal ? 'SLA & Vendor Performance' : 'SLA & Workforce Analytics'}
        text={isInternal ? 'DICRI-facing view of vendor, project, region, and crew SLA patterns across permitted client scopes.' : 'Owner-configurable SLA tracking for field execution. DICRI does not impose SLA standards; the operator defines policy targets.'}
      />
      {isInternal ? (
        <InfoBanner text="DICRI can compare vendor and project SLA patterns across permitted scopes. Client-private performance data remains isolated from other clients." />
      ) : (
        <InfoBanner text="Client-defined SLA policies can vary by work type, region, vendor/team, project type, and segment risk level." />
      )}

      <Card title="SLA Policy Builder" icon={SlidersHorizontal}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <TextInput label="SLA Name" value={policy.name} onChange={(value) => update('name', value)} />
          <Select label="Work Type" value={policy.workType} onChange={(value) => update('workType', value)} options={['Depth readings', 'GNSS point set', 'Photo packet', 'Drone/LiDAR file', 'Trust-gate remediation'].map((item) => [item, item])} />
          <Select label="Region" value={policy.region} onChange={(value) => update('region', value)} options={['All Regions', 'Lagos', 'Rivers', 'FCT', 'Kano', 'Oyo'].map((item) => [item, item])} />
          <Select label="Vendor / Team" value={policy.vendor} onChange={(value) => update('vendor', value)} options={['All teams', ...vendors].map((item) => [item, item])} />
          <Select label="Segment Risk Tier" value={policy.riskTier} onChange={(value) => update('riskTier', value)} options={['All', 'Low', 'Medium', 'High', 'Critical'].map((item) => [item, item])} />
          <Select label="Trigger Event" value={policy.trigger} onChange={(value) => update('trigger', value)} options={slaTypes.map((item) => [item, item])} />
          <TextInput label="Target Duration" value={policy.target} onChange={(value) => update('target', value)} />
          <TextInput label="Grace Period" value={policy.grace} onChange={(value) => update('grace', value)} />
          <TextInput label="Escalation Rule" value={policy.escalation} onChange={(value) => update('escalation', value)} wide />
          <Select label="Business vs Calendar" value={policy.hours} onChange={(value) => update('hours', value)} options={['Business hours', 'Calendar hours'].map((item) => [item, item])} />
          <Select label="Severity Level" value={policy.severity} onChange={(value) => update('severity', value)} options={['Standard', 'Warning', 'High', 'Critical'].map((item) => [item, item])} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <Kpi icon={CheckCircle2} label="Overall SLA Compliance" value={`${compliance}%`} tone="green" />
        <Kpi icon={Layers} label="Segments Completed Within SLA" value={currentSegments.filter((segment) => ['Certified', 'Certificate Eligible'].includes(segment.status)).length} tone="green" />
        <Kpi icon={AlertTriangle} label="Open SLA Breaches" value="4" tone="amber" />
        <Kpi icon={Clock} label="Average Arrival Time" value="34 min" />
        <Kpi icon={Activity} label="Average Capture Duration" value="61 min" />
        <Kpi icon={Upload} label="Average Evidence Upload Time" value="18 min" />
        <Kpi icon={Gauge} label="Remeasure SLA Compliance" value="88%" tone="blue" />
        <Kpi icon={ShieldAlert} label="Exception Closure SLA Compliance" value="81%" tone="amber" />
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_0.95fr] gap-5">
        <Card title={isInternal ? 'Vendor SLA Comparison' : 'Worker Performance'} icon={Users}>
          <Table headers={['Worker', 'Role', 'Vendor/team', 'Assigned', 'Completed', 'SLA Compliance', 'First-Pass Acceptance', 'Remeasure', 'Out-of-Tolerance', 'Failed Gate', 'Avg Arrival', 'Avg Capture', 'Coaching Signal']}>
            {workerAnalytics.map((worker) => (
              <tr key={worker.id} className="hover:bg-white/[0.035]">
                <Cell>{worker.name}</Cell><Cell>{worker.role}</Cell><Cell>{worker.vendor}</Cell><Cell>{worker.assignedSegments}</Cell><Cell>{worker.completedSegments}</Cell><Cell>{worker.slaCompliance}%</Cell><Cell>{worker.firstPassAcceptance}%</Cell><Cell>{worker.remeasureRate}%</Cell><Cell>{worker.outOfToleranceRate}%</Cell><Cell>{worker.failedTrustGateRate}%</Cell><Cell>{worker.averageArrival}</Cell><Cell>{worker.averageCapture}</Cell>
                <Cell right><SmallButton onClick={() => openWorker(worker)}>{worker.signal}</SmallButton></Cell>
              </tr>
            ))}
          </Table>
        </Card>
        <Card title="Segment-Level SLA Delay Diagnosis" icon={GitBranch}>
          {delayTypes.map((delay, index) => <MiniBar key={delay} label={delay} value={12 - (index % 6)} max={14} tone={index % 3 === 0 ? 'amber' : 'blue'} />)}
        </Card>
      </div>
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
  };
  return map[signal] || 'Monitor trend and provide operational support if repeated.';
}

function ReviewQueue({ isInternal, segments: sourceSegments, openSegment }) {
  const rows = sourceSegments.filter((segment) => ['Certificate Eligible', 'Evidence Review', 'Exception Review', 'Blocked'].includes(segment.status)).slice(0, 12);
  return (
    <section className="space-y-5">
      <PanelHeader title={isInternal ? 'Certificate Review Queue' : 'DICRI Review Requests'} text={isInternal ? 'Certificate eligible, Tiger review, blocked, and supplemental evidence queue.' : 'Owner-visible review request lifecycle. DICRI remains the certificate issuer.'} />
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

function CertificateRegistry({ isInternal, segments: sourceSegments, openSegment, openCertificateLater }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <PanelHeader title="Certificate Registry" text="Certificate records, renewal dates, evidence anchors, and certificate-later workflow." />
        <SmallButton onClick={openCertificateLater}>Find Certifiable Segment</SmallButton>
      </div>
      <Table headers={['Certificate ID', 'Segment ID', 'Owner', 'Project', 'Issue Date', 'Type', 'Status', 'Evidence Hash', 'Renewal / Reverification', 'Actions']}>
        {certificates.map((cert) => <tr key={cert.id}><Cell mono>{cert.id}</Cell><Cell mono>{cert.segmentId}</Cell><Cell>{cert.owner}</Cell><Cell>{cert.project}</Cell><Cell>{cert.issueDate}</Cell><Cell>{cert.type}</Cell><Cell><Badge value={cert.status} /></Cell><Cell>{cert.hash}</Cell><Cell>{cert.renewal}</Cell><Cell right><SmallButton onClick={() => openSegment(sourceSegments.find((s) => s.id === cert.segmentId) || sourceSegments[0] || segments[0])}>{isInternal ? 'Open Record' : 'View Own Record'}</SmallButton></Cell></tr>)}
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

function Card({ title, icon: Icon, children, embedded }) {
  return <section className={`rounded-2xl border border-white/10 bg-slate-900/75 shadow-2xl ${embedded ? '' : 'overflow-hidden'}`}><div className="border-b border-white/10 p-4 flex items-center gap-2"><Icon size={18} className="text-blue-400" /><h3 className="font-black text-white">{title}</h3></div><div className="p-4">{children}</div></section>;
}

function Kpi({ icon: Icon, label, value, tone = 'blue' }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-4"><div className={`h-10 w-10 rounded-xl ${toneClass(tone, 'soft')} flex items-center justify-center`}><Icon size={20} /></div><p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p><p className="mt-1 text-3xl font-black text-white">{value}</p></div>;
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
