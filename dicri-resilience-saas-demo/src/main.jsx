import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  Database,
  FileSearch,
  Filter,
  Gauge,
  GitBranch,
  HardDrive,
  History,
  LockKeyhole,
  RadioTower,
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  UserCheck,
  Wrench
} from "lucide-react";
import "./styles.css";

const tabs = [
  "Executive Dashboard",
  "Trust Gate Workflow",
  "Locate Governance Audit Log",
  "OEM / Equipment Registry",
  "Exception Review Queue",
  "Segment Risk Trends",
  "Field Quality Insights",
  "DICRI Review"
];

const regions = ["All Regions", "Northeast", "Mid-Atlantic", "Great Lakes", "Southeast", "Central"];

const workers = [
  { id: "W-101", name: "Maya Chen", team: "Site Twins East", region: "Great Lakes", credential: "Certified Utility Locator L3", status: "Trusted", equipment: "GPR", sla: 97, arrival: 96, capture: "Fast", rejected: 1.8, remeasure: 2.4, completeness: 99, exceptionRate: 3.1, common: "Photo angle incomplete", coaching: "Coaching opportunity: maintain artifact framing consistency.", cause: "Training signal", pattern: "Minor artifact completeness issues in urban corridors." },
  { id: "W-102", name: "Owen Brooks", team: "Northline Fiber", region: "Mid-Atlantic", credential: "Fiber Resilience Tester", status: "Trusted", equipment: "OTDR", sla: 91, arrival: 94, capture: "Moderate", rejected: 4.9, remeasure: 5.2, completeness: 96, exceptionRate: 6.3, common: "Trace metadata mismatch", coaching: "Equipment-related pattern: confirm OTDR profile before capture.", cause: "Equipment issue", pattern: "Rejections concentrate on OTDR packet metadata." },
  { id: "W-103", name: "Priya Raman", team: "CivicScan West", region: "Northeast", credential: "Corridor Risk Reviewer", status: "Trusted", equipment: "EM Locator", sla: 95, arrival: 93, capture: "Fast", rejected: 2.2, remeasure: 3.1, completeness: 98, exceptionRate: 3.8, common: "Site access delay", coaching: "Operational support needed: coordinate access windows earlier.", cause: "Assignment issue", pattern: "SLA misses tied to site access rather than capture execution." },
  { id: "W-104", name: "Daniel Okafor", team: "Site Twins East", region: "Great Lakes", credential: "Certified Utility Locator L2", status: "Trusted", equipment: "GPR", sla: 96, arrival: 98, capture: "Fast", rejected: 1.2, remeasure: 2.1, completeness: 99, exceptionRate: 2.7, common: "None material", coaching: "Strong peer support profile.", cause: "No issue", pattern: "Consistent capture quality across low-risk segments." },
  { id: "W-105", name: "Avery Knox", team: "MetroGrid QA", region: "Central", credential: "Senior Field Certifier", status: "Trusted", equipment: "GPR", sla: 88, arrival: 90, capture: "Slow", rejected: 5.7, remeasure: 7.4, completeness: 95, exceptionRate: 8.1, common: "Out-of-range depth", coaching: "Site-condition pattern: high-risk corridors require additional planning.", cause: "Site-condition issue", pattern: "Deviations recur around congested feeder crossings." },
  { id: "W-106", name: "Nina Patel", team: "CivicScan West", region: "Southeast", credential: "Certified Utility Locator L2", status: "Trusted", equipment: "EM Locator", sla: 94, arrival: 95, capture: "Moderate", rejected: 2.8, remeasure: 3.9, completeness: 97, exceptionRate: 4.2, common: "Approaching device expiry", coaching: "Operational support needed: rotate equipment before expiry window.", cause: "Equipment issue", pattern: "Exceptions align to calibration warning period." }
];

const devices = [
  { id: "D-7001", oem: "Aster Field Systems", type: "GPR", model: "GX-4", serial: "GPR-GX4-1192", region: "Great Lakes", calibration: "Valid", equipmentStatus: "Active", registry: "Registered", expires: "2026-11-18", evidenceUse: "Depth + path readings", team: "Site Twins East", worker: "Maya Chen", lastEvent: "DN-8821 evidence packet", lastPacket: "EP-5101", lastBlocked: "None", history: "2026-02-11 valid; 2026-05-10 checked at capture", audit: ["Registered by Equinox", "Calibration verified", "Evidence packet accepted"] },
  { id: "D-7002", oem: "Northbridge Instruments", type: "OTDR", model: "FiberTrace 900", serial: "OTDR-FT9-4410", region: "Mid-Atlantic", calibration: "Expired", equipmentStatus: "Blocked", registry: "Blocked", expires: "2026-03-22", evidenceUse: "Fiber continuity", team: "Northline Fiber", worker: "Owen Brooks", lastEvent: "DN-8822 blocked at calibration gate", lastPacket: "None", lastBlocked: "Expired calibration on May 10, 2026, 09:02", history: "2025-12-20 valid; 2026-03-22 expired", audit: ["Registry match", "Calibration expired", "Evidence use blocked"] },
  { id: "D-7003", oem: "Aster Field Systems", type: "EM Locator", model: "LinePulse 6", serial: "EM-LP6-2139", region: "Northeast", calibration: "Valid", equipmentStatus: "Active", registry: "Registered", expires: "2026-09-04", evidenceUse: "Locate confirmation", team: "CivicScan West", worker: "Priya Raman", lastEvent: "DN-8828 tolerance check", lastPacket: "EP-5108", lastBlocked: "None", history: "2026-01-04 valid; 2026-05-10 checked", audit: ["Registered", "Assigned team verified", "Packet submitted to DICRI Review"] },
  { id: "D-7004", oem: "Civitas Sensorworks", type: "GPR", model: "GroundSight M2", serial: "GPR-GSM2-8051", region: "Central", calibration: "Valid", equipmentStatus: "Active", registry: "Registered", expires: "2027-01-09", evidenceUse: "Baseline evidence", team: "MetroGrid QA", worker: "Avery Knox", lastEvent: "DN-8823 high-risk review", lastPacket: "EP-5103", lastBlocked: "None", history: "2026-04-01 valid; high-risk method checked", audit: ["Registered", "High-risk workflow applied", "Submitted to DICRI Review"] },
  { id: "D-7005", oem: "Northbridge Instruments", type: "OTDR", model: "FiberTrace 700", serial: "OTDR-FT7-1033", region: "Mid-Atlantic", calibration: "Valid", equipmentStatus: "Active", registry: "Registered", expires: "2026-08-12", evidenceUse: "Fiber evidence packet", team: "Northline Fiber", worker: "Owen Brooks", lastEvent: "DN-8827 review band", lastPacket: "EP-5107", lastBlocked: "None", history: "2026-02-12 valid; 2026-05-10 checked", audit: ["Registered", "Deviation flagged", "Client review pending"] },
  { id: "D-7006", oem: "Aster Field Systems", type: "EM Locator", model: "LinePulse 5", serial: "EM-LP5-6692", region: "Southeast", calibration: "Expiring Soon", equipmentStatus: "Attention", registry: "Registered", expires: "2026-05-20", evidenceUse: "Low-risk locate only", team: "Site Twins Central", worker: "Nina Patel", lastEvent: "DN-8830 warning", lastPacket: "EP-5110", lastBlocked: "None", history: "2026-01-20 valid; expiry warning opened", audit: ["Registered", "Expiry warning", "Low-risk use allowed"] },
  { id: "D-7007", oem: "Civitas Sensorworks", type: "Thermal Imager", model: "HeatMap Pro", serial: "TH-HMP-2288", region: "Central", calibration: "Valid", equipmentStatus: "Active", registry: "Registered", expires: "2026-12-14", evidenceUse: "Corroborating artifact", team: "MetroGrid QA", worker: "Avery Knox", lastEvent: "DN-8823 corroboration request", lastPacket: "EP-5103B", lastBlocked: "None", history: "2026-03-14 valid; corroboration accepted", audit: ["Registered", "Artifact captured", "DICRI evidence request satisfied"] },
  { id: "D-7008", oem: "TerraMetric", type: "GNSS Rover", model: "PinPoint R8", serial: "GNSS-R8-7720", region: "Northeast", calibration: "Valid", equipmentStatus: "Active", registry: "Registered", expires: "2026-10-30", evidenceUse: "Geospatial closure", team: "Equinox QA", worker: "Priya Raman", lastEvent: "Audit log locked", lastPacket: "EP-5108G", lastBlocked: "None", history: "2026-04-30 valid; geo closure accepted", audit: ["Registered", "Geo stamp accepted", "Audit record locked"] }
];

const segments = [
  { id: "DN-8821", noticeId: "CBYD-2026-08821", owner: "Equinox Telecom", region: "Great Lakes", corridor: "Jefferson Ave fiber trunk", risk: "Low", previousRisk: "Low", trend: "Stable", status: "Eligible for DICRI Review", assignedTo: "Site Twins East", workers: ["Maya Chen", "Daniel Okafor"], devices: ["GPR-GX4-1192", "GNSS-R8-7720"], evidenceSources: ["GPR depth reading", "GNSS geospatial closure"], exceptions: "None", lastActivity: "Tolerance verified", timestamp: "May 10, 2026, 09:19", reviewStatus: "Submitted to DICRI Review", deviation: 0.042, clientThreshold: 0.055, currentGovernance: "Submitted to DICRI Review", action: "Monitor", lastReviewDate: "May 10, 2026", lastDicri: "DICRI Review Pending", riskHistory: [["Apr 01", 23], ["Apr 10", 24], ["Apr 20", 22], ["May 01", 25], ["May 10", 24]], gates: gateSet("passed", "0.042m deviation within threshold", "GPR Sweep + GNSS Closure", ["Lead: Maya Chen — Passed", "Support: Daniel Okafor — Passed"]) },
  { id: "DN-8822", noticeId: "CBYD-2026-08822", owner: "Equinox Telecom", region: "Mid-Atlantic", corridor: "Harbor splice vault 14", risk: "Moderate", previousRisk: "Low", trend: "Rising", status: "Blocked from Review", assignedTo: "Northline Fiber", workers: ["Owen Brooks"], devices: ["OTDR-FT9-4410"], evidenceSources: ["OTDR trace rejected before capture"], exceptions: "Expired calibration", lastActivity: "Device blocked", timestamp: "May 10, 2026, 09:02", reviewStatus: "Exception Raised", deviation: 0, clientThreshold: 0.055, currentGovernance: "Remeasure Requested", action: "Remeasure", lastReviewDate: "May 10, 2026", lastDicri: "Not submitted", riskHistory: [["Apr 01", 24], ["Apr 10", 31], ["Apr 20", 42], ["May 01", 51], ["May 10", 58]], gates: gateSet("blocked", "OTDR calibration expired before capture", "OTDR Trace", ["Lead: Owen Brooks — Passed"]) },
  { id: "DN-8823", noticeId: "CBYD-2026-08823", owner: "Equinox Telecom", region: "Central", corridor: "Substation feeder crossing", risk: "High", previousRisk: "Moderate", trend: "Rising", status: "Submitted to DICRI Review", assignedTo: "MetroGrid QA", workers: ["Avery Knox"], devices: ["GPR-GSM2-8051", "TH-HMP-2288"], evidenceSources: ["GPR depth sweep", "Thermal corroborating artifact"], exceptions: "High-risk corroboration", lastActivity: "Independent artifact requested", timestamp: "May 10, 2026, 09:31", reviewStatus: "DICRI Review Pending", deviation: 0.073, clientThreshold: 0.055, currentGovernance: "Submitted to DICRI Review", action: "Submit to DICRI Review", lastReviewDate: "May 10, 2026", lastDicri: "DICRI Review Pending", riskHistory: [["Apr 01", 22], ["Apr 10", 28], ["Apr 20", 41], ["May 01", 55], ["May 10", 68]], gates: gateSet("warning", "High-risk corridor requires independent corroboration", "GPR Sweep + Thermal Artifact", ["Lead: Avery Knox — Passed"]) },
  { id: "DN-8824", noticeId: "CBYD-2026-08824", owner: "Equinox Telecom", region: "Northeast", corridor: "Blue Line duct bank", risk: "High", previousRisk: "High", trend: "Stable", status: "Blocked from Review", assignedTo: "Site Twins East", workers: ["Caleb Ortiz"], devices: ["EM-LP6-2139"], evidenceSources: ["EM locate attempt blocked"], exceptions: "Worker credential mismatch", lastActivity: "Assignment blocked", timestamp: "May 10, 2026, 08:58", reviewStatus: "Exception Raised", deviation: 0, clientThreshold: 0.055, currentGovernance: "Remeasure Requested", action: "Remeasure", lastReviewDate: "May 9, 2026", lastDicri: "Not submitted", riskHistory: [["Apr 01", 76], ["Apr 10", 78], ["Apr 20", 77], ["May 01", 79], ["May 10", 80]], gates: gateSet("credential", "Worker credential does not satisfy high-risk workflow", "EM Locate", ["Lead: Caleb Ortiz — Blocked"]) },
  { id: "DN-8825", noticeId: "CBYD-2026-08825", owner: "Equinox Telecom", region: "Southeast", corridor: "River road easement", risk: "Moderate", previousRisk: "Moderate", trend: "Stable", status: "Evidence Captured", assignedTo: "CivicScan West", workers: ["Nina Patel"], devices: ["EM-LP6-2139"], evidenceSources: ["EM locate reading"], exceptions: "Artifact pending", lastActivity: "Evidence captured", timestamp: "May 10, 2026, 09:14", reviewStatus: "Evidence Captured", deviation: 0.049, clientThreshold: 0.055, currentGovernance: "Evidence Captured", action: "Monitor", lastReviewDate: "May 8, 2026", lastDicri: "Not submitted", riskHistory: [["Apr 01", 55], ["Apr 10", 56], ["Apr 20", 55], ["May 01", 57], ["May 10", 56]], gates: gateSet("artifact", "Corroborating artifact still pending", "EM Locate", ["Lead: Nina Patel — Passed"]) },
  { id: "DN-8826", noticeId: "CBYD-2026-08826", owner: "Equinox Telecom", region: "Great Lakes", corridor: "Pump station approach", risk: "Low", previousRisk: "Moderate", trend: "Improving", status: "Closed", assignedTo: "Site Twins East", workers: ["Maya Chen", "Daniel Okafor"], devices: ["GPR-GX4-1192", "GNSS-R8-7720"], evidenceSources: ["GPR depth reading", "GNSS closure artifact"], exceptions: "None", lastActivity: "Record closed", timestamp: "May 10, 2026, 10:04", reviewStatus: "Closed", deviation: 0.015, clientThreshold: 0.055, currentGovernance: "Closed", action: "Monitor", lastReviewDate: "May 10, 2026", lastDicri: "Certified by DICRI", riskHistory: [["Apr 01", 58], ["Apr 10", 51], ["Apr 20", 43], ["May 01", 34], ["May 10", 24]], gates: gateSet("closed", "All owner-side checks complete", "GPR Sweep + GNSS Closure", ["Lead: Maya Chen — Passed", "Support: Daniel Okafor — Passed"]) },
  { id: "DN-8827", noticeId: "CBYD-2026-08827", owner: "Equinox Telecom", region: "Mid-Atlantic", corridor: "Industrial park lateral", risk: "Moderate", previousRisk: "Low", trend: "Rising", status: "Exception Raised", assignedTo: "Northline Fiber", workers: ["Owen Brooks"], devices: ["OTDR-FT7-1033"], evidenceSources: ["OTDR trace", "Soil condition photo artifact"], exceptions: "Slightly out of tolerance", lastActivity: "Deviation entered review band", timestamp: "May 10, 2026, 09:22", reviewStatus: "Exception Raised", deviation: 0.061, clientThreshold: 0.065, currentGovernance: "Exception Review Queue", action: "Review variance", lastReviewDate: "May 10, 2026", lastDicri: "Not submitted", riskHistory: [["Apr 01", 22], ["Apr 10", 28], ["Apr 20", 41], ["May 01", 55], ["May 10", 68]], gates: gateSet("review", "0.061m deviation in client review band", "OTDR Trace + soil condition artifact", ["Lead: Owen Brooks — Passed"]) },
  { id: "DN-8828", noticeId: "CBYD-2026-08828", owner: "Equinox Telecom", region: "Northeast", corridor: "Station plaza utilities", risk: "Low", previousRisk: "Low", trend: "Stable", status: "Complete", assignedTo: "CivicScan West", workers: ["Priya Raman"], devices: ["EM-LP6-2139", "GNSS-R8-7720"], evidenceSources: ["EM locate reading", "GNSS closure artifact"], exceptions: "None", lastActivity: "Audit log locked", timestamp: "May 10, 2026, 09:40", reviewStatus: "Complete", deviation: 0.031, clientThreshold: 0.055, currentGovernance: "Complete", action: "Monitor", lastReviewDate: "May 10, 2026", lastDicri: "Certified by DICRI", riskHistory: [["Apr 01", 25], ["Apr 10", 24], ["Apr 20", 26], ["May 01", 25], ["May 10", 24]], gates: gateSet("passed", "0.031m deviation within threshold", "EM Locate + GNSS Closure", ["Lead: Priya Raman — Passed"]) },
  { id: "DN-8829", noticeId: "CBYD-2026-08829", owner: "Equinox Telecom", region: "Central", corridor: "Downtown feeder vault", risk: "High", previousRisk: "Moderate", trend: "Rising", status: "Remeasure Requested", assignedTo: "Northline Fiber", workers: ["Owen Brooks"], devices: ["OTDR-FT7-1033"], evidenceSources: ["OTDR trace", "Prior vendor conflict record"], exceptions: "Repeat vendor exception", lastActivity: "Auto-reject threshold exceeded", timestamp: "May 10, 2026, 09:35", reviewStatus: "Remeasure Requested", deviation: 0.091, clientThreshold: 0.055, currentGovernance: "Remeasure Requested", action: "Remeasure", lastReviewDate: "May 10, 2026", lastDicri: "Returned for Exception", riskHistory: [["Apr 01", 42], ["Apr 10", 50], ["Apr 20", 61], ["May 01", 74], ["May 10", 86]], gates: gateSet("reject", "0.091m deviation exceeds system max review band", "OTDR Trace + prior conflict record", ["Lead: Owen Brooks — Passed"]) },
  { id: "DN-8830", noticeId: "CBYD-2026-08830", owner: "Equinox Telecom", region: "Southeast", corridor: "North valve cluster", risk: "Low", previousRisk: "Low", trend: "Stable", status: "Evidence Captured", assignedTo: "Site Twins Central", workers: ["Nina Patel"], devices: ["EM-LP5-6692"], evidenceSources: ["EM locate reading"], exceptions: "Calibration expiring soon", lastActivity: "Device warning acknowledged", timestamp: "May 10, 2026, 09:08", reviewStatus: "Evidence Captured", deviation: 0.044, clientThreshold: 0.055, currentGovernance: "Evidence Captured", action: "Monitor", lastReviewDate: "May 7, 2026", lastDicri: "Not submitted", riskHistory: [["Apr 01", 23], ["Apr 10", 25], ["Apr 20", 24], ["May 01", 26], ["May 10", 25]], gates: gateSet("deviceWarning", "Device is calibration-valid but expires soon", "EM Locate", ["Lead: Nina Patel — Passed"]) }
];

const reviewPackets = [
  { id: "EP-5101", segment: "DN-8821", region: "Great Lakes", section: "Ready for DICRI Review", status: "Ready for Review", action: "Send to DICRI Review", note: "Owner-side gates passed; independent review available." },
  { id: "EP-5103", segment: "DN-8823", region: "Central", section: "In Review", status: "DICRI Review Pending", action: "View Review Status", note: "High-risk corroboration under independent review." },
  { id: "EP-5107", segment: "DN-8827", region: "Mid-Atlantic", section: "Returned / Exception", status: "Additional Evidence Required", action: "Respond to Evidence Request", note: "DICRI requested photo artifact near chainage 0+420." },
  { id: "EP-5109", segment: "DN-8829", region: "Central", section: "Returned / Exception", status: "Returned for Exception", action: "Request Remeasure", note: "Deviation exceeded owner and system thresholds." },
  { id: "EP-5108", segment: "DN-8828", region: "Northeast", section: "Certified Records Returned", status: "Certified by DICRI", action: "View Returned Certified Record", note: "Independent certified record returned to Equinox Telecom." }
];

function gateSet(type, detail, method, workerLines) {
  const base = [
    { gate: "Worker", status: "Passed", timestamp: "May 10, 2026, 08:51", detail: `Assigned Workers: ${workerLines.length} of ${workerLines.length} trusted`, lines: workerLines },
    { gate: "Device", status: "Passed", timestamp: "May 10, 2026, 09:01", detail: "Registered equipment matched to workflow." },
    { gate: "Calibration", status: "Passed", timestamp: "May 10, 2026, 09:02", detail: "Calibration status valid at capture." },
    { gate: "Assignment", status: "Passed", timestamp: "May 10, 2026, 09:04", detail: "Assignment authorized by Equinox Telecom." },
    { gate: "Capture Method", status: "Approved", timestamp: "May 10, 2026, 09:13", detail: `Method: ${method}; valid for this workflow.` },
    { gate: "Evidence", status: "Passed", timestamp: "May 10, 2026, 09:14", detail: "Evidence packet captured with device and worker provenance." },
    { gate: "Tolerance", status: "Passed", timestamp: "May 10, 2026, 09:19", detail },
    { gate: "Audit Log", status: "Locked", timestamp: "May 10, 2026, 09:26", detail: "Owner-side audit log locked for review." }
  ];
  if (type === "blocked") {
    base[2] = { ...base[2], status: "Blocked", detail };
    base[5] = { ...base[5], status: "Blocked", detail: "Evidence use blocked before acceptance." };
    base[6] = { ...base[6], status: "Blocked", detail: "Tolerance not evaluated." };
    base[7] = { ...base[7], status: "Warning", detail: "Audit log records blocked workflow." };
  }
  if (type === "credential") {
    base[0] = { ...base[0], status: "Blocked", detail, lines: workerLines };
    base[3] = { ...base[3], status: "Blocked", detail: "Assignment requires a higher credential." };
    base[5] = { ...base[5], status: "Blocked", detail: "Evidence capture not accepted." };
  }
  if (type === "warning" || type === "review") base[6] = { ...base[6], status: type === "review" ? "Review Band" : "Warning", detail };
  if (type === "reject") base[6] = { ...base[6], status: "Out of Range", detail };
  if (type === "artifact") base[5] = { ...base[5], status: "Warning", detail };
  if (type === "deviceWarning") base[2] = { ...base[2], status: "Warning", detail };
  return base;
}

const activity = [
  ["Dig notice received", "May 10, 2026, 08:42"],
  ["Certified locators assigned", "May 10, 2026, 08:51"],
  ["Device eligibility checked", "May 10, 2026, 09:02"],
  ["Evidence captured", "May 10, 2026, 09:14"],
  ["Tolerance verified", "May 10, 2026, 09:19"],
  ["Submitted to DICRI Review", "May 10, 2026, 09:26"]
];

function App() {
  const [tab, setTab] = useState(tabs[0]);
  const [region, setRegion] = useState("All Regions");
  const [filters, setFilters] = useState({ risk: "All", vendor: "All", status: "All", device: "All", type: "All", team: "All", worker: "All", evidenceUse: "All", date: "Last 30 days" });
  const [selectedSegmentId, setSelectedSegmentId] = useState("DN-8821");
  const [selectedDeviceId, setSelectedDeviceId] = useState("D-7001");
  const [selectedWorkerId, setSelectedWorkerId] = useState("W-101");

  const selectedSegment = segments.find((item) => item.id === selectedSegmentId) || segments[0];
  const selectedDevice = devices.find((item) => item.id === selectedDeviceId) || devices[0];
  const selectedWorker = workers.find((item) => item.id === selectedWorkerId) || workers[0];

  const routeTo = (nextTab, nextFilters = {}) => {
    setTab(nextTab);
    setFilters((current) => ({ ...current, ...nextFilters }));
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><RadioTower size={24} /></div>
          <div>
            <strong>Equinox Telecom</strong>
            <span>Owner Backend</span>
          </div>
        </div>
        <nav className="nav-tabs" aria-label="Demo pages">
          {tabs.map((item) => (
            <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
              {item}
            </button>
          ))}
        </nav>
        <div className="side-card">
          <span>Independent Authority</span>
          <p>DICRI reviews submitted evidence and returns independent certification records.</p>
        </div>
      </aside>

      <section className="content">
        <header className="hero-band">
          <div>
            <p className="eyebrow">Equinox Telecom Infrastructure Operations</p>
            <h1>Client backend for governed field evidence and resilience visibility.</h1>
            <p>Equinox Telecom manages owner-side workflows; DICRI remains the independent review and certification authority.</p>
          </div>
          <RegionSelect value={region} onChange={setRegion} />
        </header>

        {tab === "Executive Dashboard" && <ExecutiveDashboard routeTo={routeTo} />}
        {tab === "Trust Gate Workflow" && <TrustGateWorkflow region={region} setRegion={setRegion} selectedSegment={selectedSegment} setSelectedSegmentId={setSelectedSegmentId} />}
        {tab === "Locate Governance Audit Log" && <AuditLog region={region} filters={filters} setFilters={setFilters} selectedSegment={selectedSegment} setSelectedSegmentId={setSelectedSegmentId} />}
        {tab === "OEM / Equipment Registry" && <EquipmentRegistry region={region} setRegion={setRegion} filters={filters} setFilters={setFilters} selectedDevice={selectedDevice} setSelectedDeviceId={setSelectedDeviceId} />}
        {tab === "Exception Review Queue" && <ExceptionQueue />}
        {tab === "Segment Risk Trends" && <RiskTrends region={region} selectedSegment={selectedSegment} setSelectedSegmentId={setSelectedSegmentId} />}
        {tab === "Field Quality Insights" && <FieldQuality filters={filters} setFilters={setFilters} selectedWorker={selectedWorker} setSelectedWorkerId={setSelectedWorkerId} />}
        {tab === "DICRI Review" && <DicriReview />}
      </section>
    </main>
  );
}

function ExecutiveDashboard({ routeTo }) {
  const cards = [
    ["Active Resilience Workflows", 38, Activity, () => routeTo("Trust Gate Workflow")],
    ["Trust-Gated Jobs", 27, LockKeyhole, () => routeTo("Trust Gate Workflow")],
    ["Evidence Packets Submitted", 124, ClipboardCheck, () => routeTo("DICRI Review")],
    ["Jobs Requiring Exception Review", 6, AlertTriangle, () => routeTo("Exception Review Queue")],
    ["Registered Devices", devices.length, Wrench, () => routeTo("OEM / Equipment Registry", { device: "All" })],
    ["Calibration-Valid Devices", devices.filter((device) => device.calibration === "Valid").length, Gauge, () => routeTo("OEM / Equipment Registry", { device: "Valid" })],
    ["Certified Workers", workers.length, UserCheck, () => routeTo("Field Quality Insights")],
    ["DICRI Reviews Requested", reviewPackets.filter((packet) => packet.section !== "Ready for DICRI Review").length, FileSearch, () => routeTo("DICRI Review")]
  ];

  return (
    <section className="page-grid">
      <div className="statement">
        <p>Equinox Telecom converts opaque field activity into governed, auditable infrastructure records.</p>
        <span>DICRI does not replace Equinox workflows; it independently reviews and certifies submitted evidence.</span>
      </div>
      <div className="metric-grid">
        {cards.map(([label, value, Icon, onClick]) => (
          <button className={`metric-card ${label.includes("Exception") ? "attention" : ""}`} key={label} onClick={onClick}>
            <Icon size={22} />
            <strong>{value}</strong>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <article className="panel wide">
        <div className="panel-heading"><h2>Governed Activity Feed</h2><BadgeCheck size={20} /></div>
        <div className="timeline">
          {activity.map(([item, time], index) => <div className="timeline-item" key={item}><span>{index + 1}</span><p>{item}</p><small>{time}</small></div>)}
        </div>
      </article>
    </section>
  );
}

function TrustGateWorkflow({ region, setRegion, selectedSegment, setSelectedSegmentId }) {
  const regionSegments = filterByRegion(segments, region);
  return (
    <section className="split-layout">
      <div>
        <div className="toolbar"><SlidersHorizontal size={18} /><RegionSelect value={region} onChange={setRegion} /></div>
        <article className="panel wide">
          <div className="panel-heading"><h2>Region → Segment → Trust Gate Details</h2><span className="small-copy">DN-8821, DN-8822, and related IDs are Segment IDs.</span></div>
          <div className="data-table">
            <div className="table-row segment header"><span>Segment ID</span><span>Corridor / Project</span><span>Status</span><span>Assigned Workers</span><span>Devices</span><span>Exceptions</span><span>Last Activity</span></div>
            {regionSegments.map((segment) => (
              <button className={`table-row segment ${selectedSegment.id === segment.id ? "row-selected" : ""}`} key={segment.id} onClick={() => setSelectedSegmentId(segment.id)}>
                <span>{segment.id}</span><span>{segment.corridor}</span><span>{segment.status}</span><span>{segment.workers.length}</span><span>{segment.devices.length}</span><span>{segment.exceptions}</span><span>{segment.lastActivity}</span>
              </button>
            ))}
          </div>
        </article>
      </div>
      <article className="panel detail-panel">
        <div className="panel-heading">
          <div><h2>{selectedSegment.id} Trust Gates</h2><p>{selectedSegment.region} | {selectedSegment.corridor}</p></div>
          <StatusBadge status={selectedSegment.status} />
        </div>
        <MeasurementCoverage segment={selectedSegment} />
        <div className="gate-stack">
          {selectedSegment.gates.map((gate) => <Gate key={gate.gate} gate={gate} />)}
        </div>
      </article>
    </section>
  );
}

function AuditLog({ region, filters, setFilters, selectedSegment, setSelectedSegmentId }) {
  const rows = filterSegments(region, filters);
  return (
    <section className="split-layout">
      <div>
        <FilterBar filters={filters} setFilters={setFilters} mode="audit" />
        <article className="panel wide">
          <div className="panel-heading"><h2>Locate Governance Audit Log</h2><span className="small-copy">Record-pull and audit trail view for Equinox Telecom.</span></div>
          <div className="data-table">
            <div className="table-row audit header"><span>Notice ID</span><span>Owner</span><span>Region</span><span>Risk</span><span>Assigned To</span><span>Review Status</span><span>Last Event</span><span>Timestamp</span></div>
            {rows.map((segment) => (
              <button className={`table-row audit ${selectedSegment.id === segment.id ? "row-selected" : ""}`} key={segment.id} onClick={() => setSelectedSegmentId(segment.id)}>
                <span>{segment.noticeId}</span><span>{segment.owner}</span><span>{segment.region}</span><span>{segment.risk}</span><span>{segment.assignedTo}</span><span>{segment.reviewStatus}</span><span>{segment.lastActivity}</span><span>{segment.timestamp}</span>
              </button>
            ))}
          </div>
        </article>
      </div>
      <article className="panel detail-panel">
        <div className="panel-heading"><h2>Audit Detail Panel</h2><StatusBadge status={selectedSegment.reviewStatus} /></div>
        <Field label="Notice received timestamp" value="May 10, 2026, 08:42" />
        <Field label="Risk screened timestamp" value="May 10, 2026, 08:47" />
        <Field label="Reviewed by" value="Equinox Governance Ops" />
        <Field label="Assigned to" value={selectedSegment.assignedTo} />
        <Field label="Locator / team" value={selectedSegment.workers.join(", ")} />
        <Field label="Device used" value={selectedSegment.devices.join(", ")} />
        <Field label="Calibration status at capture" value={deviceStatusFor(selectedSegment)} />
        <Field label="Evidence captured timestamp" value="May 10, 2026, 09:14" />
        <Field label="Exception status" value={selectedSegment.exceptions} />
        <Field label="Current governance status" value={selectedSegment.currentGovernance} />
      </article>
    </section>
  );
}

function EquipmentRegistry({ region, setRegion, filters, setFilters, selectedDevice, setSelectedDeviceId }) {
  const rows = devices.filter((device) =>
    (region === "All Regions" || device.region === region) &&
    (filters.type === "All" || device.type === filters.type) &&
    (filters.status === "All" || device.equipmentStatus === filters.status) &&
    (filters.device === "All" || device.calibration === filters.device) &&
    (filters.team === "All" || device.team === filters.team) &&
    (filters.worker === "All" || device.worker === filters.worker) &&
    (filters.evidenceUse === "All" || device.evidenceUse === filters.evidenceUse)
  );
  return (
    <section className="split-layout equipment-layout">
      <div>
        <div className="toolbar"><RegionSelect value={region} onChange={setRegion} /><FilterBar filters={filters} setFilters={setFilters} mode="equipment" /></div>
        <div className="summary-grid">
          <Summary label="Registered Devices" value={devices.length} />
          <Summary label="Calibration Valid" value={devices.filter((d) => d.calibration === "Valid").length} />
          <Summary label="Expiring Soon" value={devices.filter((d) => d.calibration === "Expiring Soon").length} />
          <Summary label="Expired / Blocked" value={devices.filter((d) => d.calibration === "Expired" || d.registry === "Blocked").length} />
        </div>
        <article className="panel wide">
          <div className="panel-heading"><h2>Enterprise Equipment Registry</h2><span className="small-copy">Designed for national carrier scale.</span></div>
          <div className="data-table">
            <div className="table-row equipment header"><span>Device ID</span><span>Equipment Type</span><span>OEM / Model</span><span>Region</span><span>Assigned Team</span><span>Calibration</span><span>Expiration</span><span>Evidence Use</span><span>Last Event</span><span>Registry</span></div>
            {rows.map((device) => (
              <button className={`table-row equipment ${selectedDevice.id === device.id ? "row-selected" : ""}`} key={device.id} onClick={() => setSelectedDeviceId(device.id)}>
                <span>{device.id}</span><span>{device.type}</span><span>{device.oem} / {device.model}</span><span>{device.region}</span><span>{device.team}</span><span>{device.calibration}</span><span>{device.expires}</span><span>{device.evidenceUse}</span><span>{device.lastEvent}</span><span>{device.registry}</span>
              </button>
            ))}
          </div>
        </article>
      </div>
      <DeviceDetail device={selectedDevice} />
    </section>
  );
}

function ExceptionQueue() {
  const exceptionItems = segments.filter((segment) => segment.deviation > 0.05);
  const [selectedId, setSelectedId] = useState(exceptionItems[0]?.id || segments[0].id);
  const [previewSegment, setPreviewSegment] = useState(null);
  const selected = exceptionItems.find((segment) => segment.id === selectedId) || exceptionItems[0];
  return (
    <section className="split-layout">
      <div>
      <article className="statement">
        <p>Only narrow gray-area tolerance exceptions land here.</p>
        <span>0.000m-0.050m auto-pass | 0.051m-0.075m review band | &gt;0.075m auto-reject and remeasure required.</span>
      </article>
      <article className="panel wide">
        <div className="panel-heading"><h2>Client Review Cutoff</h2><StatusBadge status="Review Band" /></div>
        <div className="threshold-row"><strong>Client review cutoff: 0.055m-0.065m by segment</strong><strong>System max review band: 0.075m</strong></div>
      </article>
      <article className="panel wide">
        <div className="data-table">
          <div className="table-row exceptions header"><span>Segment ID</span><span>Region</span><span>Deviation</span><span>Client Threshold</span><span>System Review Band</span><span>Issue Type</span><span>Supporting Note</span><span>Evidence Link</span><span>Recommended Action</span></div>
          {exceptionItems.map((segment) => (
            <div className={`table-row exceptions clickable-row ${selected.id === segment.id ? "row-selected" : ""}`} key={segment.id} onClick={() => setSelectedId(segment.id)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter") setSelectedId(segment.id); }}>
              <span>{segment.id}</span><span>{segment.region}</span><span>{segment.deviation.toFixed(3)}m</span><span>{segment.clientThreshold.toFixed(3)}m</span><span>0.051m-0.075m</span><span>{segment.exceptions}</span><span>{supportingNote(segment)}</span><span><button type="button" onClick={(event) => { event.stopPropagation(); setPreviewSegment(segment); }}>Photo artifact</button></span><span>{recommendedToleranceAction(segment)}</span>
            </div>
          ))}
        </div>
      </article>
      </div>
      <article className="panel detail-panel">
        <div className="panel-heading"><h2>{selected.id} Tolerance Detail</h2><StatusBadge status={toleranceStatus(selected)} /></div>
        <ToleranceGauge segment={selected} />
        <Field label="Segment ID" value={selected.id} />
        <Field label="Measured deviation" value={`${selected.deviation.toFixed(3)}m`} />
        <Field label="Client threshold" value={`${selected.clientThreshold.toFixed(3)}m`} />
        <Field label="System max review band" value="0.075m" />
        <Field label="Review eligibility" value={toleranceEligibility(selected)} />
        <Field label="Supporting note" value={supportingNote(selected)} />
        <Field label="Recommended action" value={recommendedToleranceAction(selected)} />
        <Field label="Evidence artifact" value="Soil condition photo | Chainage 0+420" />
        <button className="primary-action" onClick={() => setPreviewSegment(selected)}>Open Photo Artifact</button>
      </article>
      {previewSegment && <EvidencePreview segment={previewSegment} onClose={() => setPreviewSegment(null)} />}
    </section>
  );
}

function RiskTrends({ region, selectedSegment, setSelectedSegmentId }) {
  const rows = filterByRegion(segments, region);
  return (
    <section className="split-layout">
      <article className="panel wide">
        <div className="panel-heading"><h2>Segment Risk Trends</h2><TrendingUp size={20} /></div>
        <div className="data-table">
          <div className="table-row risk header"><span>Segment ID</span><span>Region</span><span>Current Risk</span><span>Previous Risk</span><span>Trend</span><span>Last Event</span><span>Exceptions</span><span>Last Review Date</span><span>Action</span></div>
          {rows.map((segment) => (
            <button className={`table-row risk ${selectedSegment.id === segment.id ? "row-selected" : ""}`} key={segment.id} onClick={() => setSelectedSegmentId(segment.id)}>
              <span>{segment.id}</span><span>{segment.region}</span><span>{segment.risk}</span><span>{segment.previousRisk}</span><span>{segment.trend}</span><span>{segment.lastActivity}</span><span>{segment.exceptions}</span><span>{segment.lastReviewDate}</span><span>{segment.action}</span>
            </button>
          ))}
        </div>
      </article>
      <article className="panel detail-panel">
        <div className="panel-heading"><h2>{selectedSegment.id} Lifecycle Intelligence</h2><StatusBadge status={selectedSegment.trend} /></div>
        <RiskTrendChart segment={selectedSegment} />
        <Field label="Selected Segment ID" value={selectedSegment.id} />
        <Field label="Current risk" value={selectedSegment.risk} />
        <Field label="Previous risk" value={selectedSegment.previousRisk} />
        <Field label="Trend" value={selectedSegment.trend} />
        <Field label="Last event" value={selectedSegment.lastActivity} />
        <Field label="Locate history" value="6 governed locate events in the last 90 days" />
        <Field label="Evidence events" value={`${selectedSegment.lastActivity}; packet ${selectedSegment.reviewStatus}`} />
        <Field label="Deviation trend" value={`${selectedSegment.deviation.toFixed(3)}m current measured deviation`} />
        <Field label="Exceptions" value={selectedSegment.exceptions} />
        <Field label="Last review date" value={selectedSegment.lastReviewDate} />
        <Field label="Last DICRI review status" value={selectedSegment.lastDicri} />
        <Field label="Recommended action" value={selectedSegment.action === "Review variance" ? "Submit to DICRI Review if variance is accepted" : selectedSegment.action} />
        <p className="interpretation">{riskInterpretation(selectedSegment)}</p>
      </article>
    </section>
  );
}

function FieldQuality({ filters, setFilters, selectedWorker, setSelectedWorkerId }) {
  const rows = workers.filter((worker) =>
    (filters.team === "All" || worker.team === filters.team) &&
    (filters.worker === "All" || worker.name === filters.worker) &&
    (filters.type === "All" || worker.equipment === filters.type) &&
    (filters.risk === "All" || worker.region === filters.risk)
  );
  const metrics = [
    ["SLA completion rate", "94%"],
    ["On-time site arrival", "94%"],
    ["Capture completion time", "31 min avg"],
    ["Rejected measurement rate", "3.1%"],
    ["Remeasure rate", "4.0%"],
    ["Evidence packet completeness", "97%"],
    ["Exception rate", "4.7%"]
  ];
  return (
    <section className="split-layout">
      <div>
        <FilterBar filters={filters} setFilters={setFilters} mode="quality" />
        <div className="summary-grid quality">{metrics.map(([label, value]) => <Summary key={label} label={label} value={value} />)}</div>
        <article className="panel wide">
          <div className="panel-heading"><h2>Field Quality Insights</h2><span className="small-copy">Coaching and operational improvement, not punishment.</span></div>
          <div className="data-table">
            <div className="table-row quality-row header"><span>Worker</span><span>Team</span><span>Region</span><span>SLA</span><span>Arrival</span><span>Capture Quality</span><span>Rejected</span><span>Remeasure</span><span>Common Exception</span><span>Coaching Signal</span></div>
            {rows.map((worker) => (
              <button className={`table-row quality-row ${selectedWorker.id === worker.id ? "row-selected" : ""}`} key={worker.id} onClick={() => setSelectedWorkerId(worker.id)}>
                <span>{worker.name}</span><span>{worker.team}</span><span>{worker.region}</span><span>{worker.sla}%</span><span>{worker.arrival}%</span><span>{worker.completeness}% complete</span><span>{worker.rejected}%</span><span>{worker.remeasure}%</span><span>{worker.common}</span><span>{worker.cause}</span>
              </button>
            ))}
          </div>
        </article>
      </div>
      <article className="panel detail-panel">
        <div className="panel-heading"><h2>{selectedWorker.name}</h2><StatusBadge status="Coaching opportunity" /></div>
        <Field label="SLA misses caused by" value={selectedWorker.arrival < selectedWorker.sla ? "Late arrival pattern" : "Capture execution or site constraints"} />
        <Field label="Rejections tied to device type" value={`${selectedWorker.equipment}: ${selectedWorker.rejected}% rejected measurements`} />
        <Field label="Recurring by region or site condition" value={selectedWorker.pattern} />
        <Field label="Likely root signal" value={selectedWorker.cause} />
        <Field label="Recommended support" value={selectedWorker.coaching} />
      </article>
    </section>
  );
}

function DicriReview() {
  const sections = ["Ready for DICRI Review", "In Review", "Returned / Exception", "Certified Records Returned"];
  return (
    <section className="page-grid">
      <article className="statement">
        <p>DICRI is the independent review and certification authority.</p>
        <span>Equinox Telecom can submit evidence, respond to requests, and view returned certified records. It cannot issue certificates.</span>
      </article>
      {sections.map((section) => (
        <article className="panel" key={section}>
          <div className="panel-heading"><h2>{section}</h2><ShieldCheck size={20} /></div>
          <div className="review-list">
            {reviewPackets.filter((packet) => packet.section === section).map((packet) => (
              <div className="review-card" key={packet.id}>
                <div><strong>{packet.segment}</strong><StatusBadge status={packet.status} /></div>
                <p>{packet.note}</p>
                <span>{packet.id} | {packet.region}</span>
                <button>{packet.action}</button>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function DeviceDetail({ device }) {
  return (
    <article className="panel detail-panel">
      <div className="panel-heading"><h2>{device.id}</h2><StatusBadge status={device.calibration} /></div>
      <Field label="Serial number" value={device.serial} />
      <Field label="OEM / model" value={`${device.oem} / ${device.model}`} />
      <Field label="Approved evidence use" value={device.evidenceUse} />
      <Field label="Calibration history" value={device.history} />
      <Field label="Assigned team / worker" value={`${device.team} / ${device.worker}`} />
      <Field label="Last evidence packet" value={device.lastPacket} />
      <Field label="Last blocked event" value={device.lastBlocked} />
      <div className="audit-mini">{device.audit.map((item) => <span key={item}>{item}</span>)}</div>
    </article>
  );
}

function ToleranceGauge({ segment }) {
  const max = 0.1;
  const marker = Math.min(100, (segment.deviation / max) * 100);
  const client = Math.min(100, (segment.clientThreshold / max) * 100);
  const system = 75;
  return (
    <div className="tolerance-gauge">
      <div className="gauge-track" aria-label="Tolerance gauge">
        <div className="zone pass-zone" />
        <div className="zone review-zone" />
        <div className="zone reject-zone" />
        <span className="threshold-marker client" style={{ left: `${client}%` }}><b>Client review zone</b></span>
        <span className="threshold-marker system" style={{ left: `${system}%` }}><b>System review limit</b></span>
        <span className="deviation-marker" style={{ left: `${marker}%` }}><b>{segment.deviation.toFixed(3)}m</b></span>
      </div>
      <div className="gauge-labels">
        <span>Auto-pass<br />0.000m-0.050m</span>
        <span>Client review zone<br />0.051m-{segment.clientThreshold.toFixed(3)}m</span>
        <span>System review limit<br />0.075m</span>
        <span>Reject / remeasure required<br />&gt;0.075m</span>
      </div>
    </div>
  );
}

function EvidencePreview({ segment, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Evidence artifact preview">
      <article className="evidence-modal">
        <div className="panel-heading">
          <div><h2>Field Evidence Preview</h2><p>{segment.id} | Chainage 0+420</p></div>
          <button className="icon-action" onClick={onClose}>Close</button>
        </div>
        <div className="field-photo-placeholder">
          <div className="photo-horizon" />
          <div className="photo-ground" />
          <div className="photo-marker" />
          <span>SOIL CONDITION PHOTO</span>
        </div>
        <Field label="Segment ID" value={segment.id} />
        <Field label="Timestamp" value="May 10, 2026, 09:22" />
        <Field label="Chainage/location note" value="Chainage 0+420" />
        <Field label="Evidence type" value="Soil condition photo" />
        <Field label="Note" value="Changed soil condition observed near measurement point" />
      </article>
    </div>
  );
}

function RiskTrendChart({ segment }) {
  const data = segment.riskHistory || [["Apr 01", riskScore(segment.previousRisk)], ["May 10", riskScore(segment.risk)]];
  const width = 320;
  const height = 150;
  const points = data.map(([, value], index) => {
    const x = 24 + (index * (width - 48)) / Math.max(1, data.length - 1);
    const y = height - 24 - (value / 100) * (height - 46);
    return { x, y, value, label: data[index][0] };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  return (
    <div className="risk-chart">
      <div className="chart-title"><strong>Risk score over time</strong><span>{points[0].value} → {points[points.length - 1].value}</span></div>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Risk trend chart for ${segment.id}`}>
        <line x1="24" y1="34" x2={width - 12} y2="34" className="grid-line high" />
        <line x1="24" y1="78" x2={width - 12} y2="78" className="grid-line mid" />
        <line x1="24" y1="122" x2={width - 12} y2="122" className="grid-line low" />
        <polyline points={line} fill="none" className={`risk-line ${statusTone(segment.trend)}`} />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="4" className="risk-dot" />
            <text x={point.x} y={height - 6} textAnchor="middle">{point.label}</text>
            <text x={point.x} y={point.y - 9} textAnchor="middle">{point.value}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function MeasurementCoverage({ segment }) {
  const coverage = validateMeasurementCoverage(segment);
  return (
    <div className={`coverage-note ${coverage.tone}`}>
      <strong>{coverage.label}</strong>
      <span>{coverage.detail}</span>
    </div>
  );
}

function Gate({ gate }) {
  return (
    <div className={`gate-row ${statusTone(gate.status)}`}>
      <div><strong>Gate: {gate.gate}</strong><StatusBadge status={gate.status} /></div>
      <p><b>Timestamp:</b> {gate.timestamp}</p>
      <p><b>Detail:</b> {gate.detail}</p>
      {gate.lines && <div className="gate-lines">{gate.lines.map((line) => <span key={line}>{line}</span>)}</div>}
    </div>
  );
}

function FilterBar({ filters, setFilters, mode }) {
  const update = (key, value) => setFilters({ ...filters, [key]: value });
  if (mode === "equipment") {
    return (
      <>
        <Select label="Equipment Type" value={filters.type} options={["All", ...unique(devices.map((d) => d.type))]} onChange={(value) => update("type", value)} />
        <Select label="Equipment Status" value={filters.status} options={["All", ...unique(devices.map((d) => d.equipmentStatus))]} onChange={(value) => update("status", value)} />
        <Select label="Calibration Status" value={filters.device} options={["All", "Valid", "Expiring Soon", "Expired"]} onChange={(value) => update("device", value)} />
        <Select label="Assigned Team" value={filters.team} options={["All", ...unique(devices.map((d) => d.team))]} onChange={(value) => update("team", value)} />
        <Select label="Assigned Worker" value={filters.worker} options={["All", ...unique(devices.map((d) => d.worker))]} onChange={(value) => update("worker", value)} />
        <Select label="Evidence Use" value={filters.evidenceUse} options={["All", ...unique(devices.map((d) => d.evidenceUse))]} onChange={(value) => update("evidenceUse", value)} />
      </>
    );
  }
  if (mode === "quality") {
    return (
      <div className="toolbar">
        <Filter size={18} />
        <Select label="Region" value={filters.risk} options={["All", ...unique(workers.map((w) => w.region))]} onChange={(value) => update("risk", value)} />
        <Select label="Team" value={filters.team} options={["All", ...unique(workers.map((w) => w.team))]} onChange={(value) => update("team", value)} />
        <Select label="Worker" value={filters.worker} options={["All", ...unique(workers.map((w) => w.name))]} onChange={(value) => update("worker", value)} />
        <Select label="Date range" value={filters.date} options={["Last 7 days", "Last 30 days", "Last quarter"]} onChange={(value) => update("date", value)} />
        <Select label="Equipment type" value={filters.type} options={["All", ...unique(workers.map((w) => w.equipment))]} onChange={(value) => update("type", value)} />
      </div>
    );
  }
  return (
    <div className="toolbar">
      <Filter size={18} />
      <Select label="Risk" value={filters.risk} options={["All", "Low", "Moderate", "High"]} onChange={(value) => update("risk", value)} />
      <Select label="Assigned To" value={filters.vendor} options={["All", ...unique(segments.map((s) => s.assignedTo))]} onChange={(value) => update("vendor", value)} />
      <Select label="Review Status" value={filters.status} options={["All", "Complete", "Evidence Captured", "Exception Raised", "Remeasure Requested", "Submitted to DICRI Review", "Closed", "DICRI Review Pending"]} onChange={(value) => update("status", value)} />
    </div>
  );
}

function RegionSelect({ value, onChange }) {
  return <Select label="Region" value={value} options={regions} onChange={onChange} />;
}

function Select({ label, value, options, onChange }) {
  return <label className="select-label">{label}<select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function Summary({ label, value }) {
  return <article className="summary-card"><span>{label}</span><strong>{value}</strong></article>;
}

function StatusBadge({ status }) {
  return <span className={`status ${statusTone(status)}`}>{status}</span>;
}

function Field({ label, value }) {
  return <div className="field"><span>{label}</span><strong>{value}</strong></div>;
}

function filterByRegion(items, region) {
  return region === "All Regions" ? items : items.filter((item) => item.region === region);
}

function filterSegments(region, filters) {
  return filterByRegion(segments, region).filter((segment) =>
    (filters.risk === "All" || segment.risk === filters.risk) &&
    (filters.vendor === "All" || segment.assignedTo === filters.vendor) &&
    (filters.status === "All" || segment.reviewStatus === filters.status)
  );
}

function unique(items) {
  return Array.from(new Set(items));
}

function deviceStatusFor(segment) {
  const matches = devices.filter((device) => segment.devices.includes(device.serial));
  return matches.map((device) => `${device.serial}: ${device.calibration}`).join("; ") || "No device matched";
}

function riskScore(risk) {
  return risk === "High" ? 82 : risk === "Moderate" ? 58 : 24;
}

function toleranceStatus(segment) {
  if (segment.deviation <= 0.05) return "Auto-pass";
  if (segment.deviation <= 0.075) return "Client review zone";
  return "Reject / remeasure required";
}

function toleranceEligibility(segment) {
  if (segment.deviation <= 0.05) return "Auto-pass; no client exception review required";
  if (segment.deviation <= 0.075) return "Review-eligible within system review band";
  return "Auto-reject; remeasure required outside system review band";
}

function recommendedToleranceAction(segment) {
  if (segment.deviation <= 0.05) return "Auto-pass";
  if (segment.deviation <= segment.clientThreshold) return "Accept Variance / Send to DICRI Review";
  if (segment.deviation <= 0.075) return "Request Remeasure / Send to DICRI Review";
  return "Reject / remeasure required";
}

function supportingNote(segment) {
  if (segment.id === "DN-8827") return "Possible cause: changed soil condition near chainage 0+420";
  if (segment.deviation > 0.075) return "System rejected because deviation exceeds maximum review band";
  return "High-risk corroboration requires independent review context";
}

function riskInterpretation(segment) {
  if (segment.trend === "Rising") return `Risk rising due to ${segment.exceptions.toLowerCase()} and recent tolerance deviation.`;
  if (segment.trend === "Improving") return "Risk improving after clean closure events and lower recent deviation.";
  return "Risk stable with no material change in recent governed evidence.";
}

function validateMeasurementCoverage(segment) {
  const needsIndependentMeasurement = segment.risk === "High" || /corroboration|independent/i.test(segment.exceptions);
  const independentSources = Math.max(segment.devices.length, segment.evidenceSources?.length || 0);
  if (needsIndependentMeasurement && segment.workers.length >= 2 && independentSources < 2) {
    return {
      tone: "blocked",
      label: "Measurement coverage requires clarification",
      detail: `${segment.workers.length} assigned workers but only ${independentSources} independent evidence source shown. Add a second device/evidence artifact or mark one worker as non-capturing support.`
    };
  }
  if (needsIndependentMeasurement) {
    return {
      tone: "pass",
      label: "Independent measurement coverage validated",
      detail: `${segment.workers.length} assigned worker${segment.workers.length === 1 ? "" : "s"} / ${segment.devices.length} device${segment.devices.length === 1 ? "" : "s"} / ${segment.evidenceSources?.length || segment.devices.length} independent evidence source${(segment.evidenceSources?.length || segment.devices.length) === 1 ? "" : "s"} shown for corroboration.`
    };
  }
  if (segment.workers.length >= 2 && segment.devices.length < 2) {
    return {
      tone: "warning",
      label: "Support role clarified",
      detail: `${segment.workers.length} workers assigned with ${segment.devices.length} capturing device; secondary worker is non-capturing support.`
    };
  }
  return {
    tone: "pass",
    label: "Measurement coverage validated",
    detail: `${segment.workers.length} assigned worker${segment.workers.length === 1 ? "" : "s"} / ${segment.devices.length} device${segment.devices.length === 1 ? "" : "s"} recorded.`
  };
}

function statusTone(status) {
  if (["Passed", "Approved", "Locked", "Valid", "Complete", "Closed", "Stable", "Improving", "Trusted", "Certified by DICRI", "Auto-pass"].includes(status)) return "pass";
  if (["Blocked", "Expired", "Out of Range", "Blocked from Review", "Remeasure Requested", "Returned for Exception", "Reject / remeasure required"].includes(status)) return "blocked";
  return "warning";
}

createRoot(document.getElementById("root")).render(<App />);
