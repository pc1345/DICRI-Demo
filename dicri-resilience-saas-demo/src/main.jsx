import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  FileCheck2,
  Filter,
  Fingerprint,
  Gauge,
  GitBranch,
  Layers,
  LockKeyhole,
  RadioTower,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
  Wrench
} from "lucide-react";
import "./styles.css";

const tabs = [
  "Executive Dashboard",
  "Trust Gate Workflow",
  "Dig Notice / Locate Governance",
  "Health Certificate Workflow",
  "OEM / Equipment Registry",
  "Certified Partner View",
  "Adjudication Queue",
  "Certificate / Audit Packet Preview"
];

const workers = [
  { id: "W-101", name: "Maya Chen", credential: "Certified Utility Locator L3", status: "Certified", vendor: "Site Twins", methods: ["GPR", "EM Locate", "Depth Verification"] },
  { id: "W-102", name: "Owen Brooks", credential: "Fiber Resilience Tester", status: "Certified", vendor: "Northline Locate", methods: ["OTDR", "Fiber Continuity"] },
  { id: "W-103", name: "Priya Raman", credential: "Corridor Risk Reviewer", status: "Certified", vendor: "CivicScan", methods: ["GPR", "Evidence Review"] },
  { id: "W-104", name: "Caleb Ortiz", credential: "Locate Technician L1", status: "Credential Mismatch", vendor: "Site Twins", methods: ["Visual Survey"] },
  { id: "W-105", name: "Avery Knox", credential: "Senior Field Certifier", status: "Certified", vendor: "MetroGrid", methods: ["GPR", "EM Locate", "OTDR"] },
  { id: "W-106", name: "Nina Patel", credential: "Certified Utility Locator L2", status: "Certified", vendor: "CivicScan", methods: ["EM Locate", "Markout QA"] }
];

const devices = [
  { id: "D-7001", oem: "Aster Field Systems", type: "GPR", model: "GX-4", serial: "GPR-GX4-1192", calibration: "Valid", expires: "2026-11-18", evidenceUse: "Depth + path readings", team: "Site Twins East", lastEvent: "HC-4107 reading 2" },
  { id: "D-7002", oem: "Northbridge Instruments", type: "OTDR", model: "FiberTrace 900", serial: "OTDR-FT9-4410", calibration: "Expired", expires: "2026-03-22", evidenceUse: "Fiber continuity", team: "Northline Locate", lastEvent: "Blocked at gate" },
  { id: "D-7003", oem: "Aster Field Systems", type: "EM Locator", model: "LinePulse 6", serial: "EM-LP6-2139", calibration: "Valid", expires: "2026-09-04", evidenceUse: "Locate confirmation", team: "CivicScan West", lastEvent: "DN-8828 method pass" },
  { id: "D-7004", oem: "Civitas Sensorworks", type: "GPR", model: "GroundSight M2", serial: "GPR-GSM2-8051", calibration: "Valid", expires: "2027-01-09", evidenceUse: "Birth Certificate baseline", team: "MetroGrid", lastEvent: "HC-4110 baseline" },
  { id: "D-7005", oem: "Northbridge Instruments", type: "OTDR", model: "FiberTrace 700", serial: "OTDR-FT7-1033", calibration: "Valid", expires: "2026-08-12", evidenceUse: "Fiber evidence packet", team: "MetroGrid Fiber", lastEvent: "AP-9021 issued" },
  { id: "D-7006", oem: "Aster Field Systems", type: "EM Locator", model: "LinePulse 5", serial: "EM-LP5-6692", calibration: "Warning", expires: "2026-05-20", evidenceUse: "Low-risk locate only", team: "Site Twins Central", lastEvent: "DN-8830 warning" },
  { id: "D-7007", oem: "Civitas Sensorworks", type: "Thermal Imager", model: "HeatMap Pro", serial: "TH-HMP-2288", calibration: "Valid", expires: "2026-12-14", evidenceUse: "Corroborating artifact", team: "CivicScan", lastEvent: "Tiger packet" },
  { id: "D-7008", oem: "TerraMetric", type: "GNSS Rover", model: "PinPoint R8", serial: "GNSS-R8-7720", calibration: "Valid", expires: "2026-10-30", evidenceUse: "Geospatial closure", team: "Owner QA", lastEvent: "Audit lock" }
];

const partners = [
  { name: "Site Twins", status: "Certified Evidence Partner", locators: 18, devices: 31, jobs: 14, certificates: 47, packets: 61, exposure: "$2.4M owner expansion" },
  { name: "Northline Locate", status: "Conditional", locators: 9, devices: 12, jobs: 7, certificates: 18, packets: 24, exposure: "$840K fiber programs" },
  { name: "CivicScan", status: "Certified Evidence Partner", locators: 13, devices: 19, jobs: 11, certificates: 33, packets: 45, exposure: "$1.7M corridor renewals" }
];

const tickets = [
  { id: "DN-8821", owner: "Great Lakes Water Authority", corridor: "Jefferson Ave trunk segment", risk: "Low", vendor: "Site Twins", locator: "Maya Chen", device: "GPR-GX4-1192", status: "Certificate Ready", confidence: 98, next: "Issue Health Certificate", method: "Low-risk same tester / same registered GPR / two readings", credential: "Certified Utility Locator L3", calibration: "Valid", requirements: "Two separate readings, photo artifact, geo stamp", readings: "1.42m and 1.44m depth, 2cm variance", exception: "None" },
  { id: "DN-8822", owner: "Atlantic Fiber Grid", corridor: "Harbor splice vault 14", risk: "Moderate", vendor: "Northline Locate", locator: "Owen Brooks", device: "OTDR-FT9-4410", status: "Blocked", confidence: 0, next: "Replace OTDR or recalibrate", method: "Fiber continuity with calibration-valid OTDR", credential: "Fiber Resilience Tester", calibration: "Expired", requirements: "OTDR trace, timestamp, device registry match", readings: "Trace rejected before evidence use", exception: "Expired calibration" },
  { id: "DN-8823", owner: "Metro Energy Cooperative", corridor: "Substation feeder crossing", risk: "High", vendor: "MetroGrid", locator: "Avery Knox", device: "GPR-GSM2-8051", status: "Tiger Review", confidence: 74, next: "Independent corroboration", method: "High-risk independent corroboration required", credential: "Senior Field Certifier", calibration: "Valid", requirements: "Independent artifact, Tiger review, locked audit packet", readings: "Depth variance exceeds high-risk threshold", exception: "High-risk corridor" },
  { id: "DN-8824", owner: "County Transit Authority", corridor: "Blue Line duct bank", risk: "High", vendor: "Site Twins", locator: "Caleb Ortiz", device: "EM-LP6-2139", status: "Blocked", confidence: 12, next: "Assign qualified locator", method: "Certified Utility Locator L2 minimum", credential: "Locate Technician L1", calibration: "Valid", requirements: "Credential match, device check, tolerance pass", readings: "No governed evidence accepted", exception: "Worker credential mismatch" },
  { id: "DN-8825", owner: "Midwest Gas Transmission", corridor: "River road easement", risk: "Moderate", vendor: "CivicScan", locator: "Nina Patel", device: "EM-LP6-2139", status: "In Progress", confidence: 83, next: "Submit corroborating artifact", method: "Moderate-risk locate with corroborating artifact", credential: "Certified Utility Locator L2", calibration: "Valid", requirements: "Reading pair plus image artifact", readings: "Path aligned, artifact pending", exception: "Artifact pending" },
  { id: "DN-8826", owner: "Great Lakes Water Authority", corridor: "Pump station approach", risk: "Low", vendor: "Site Twins", locator: "Maya Chen", device: "GPR-GX4-1192", status: "Issued", confidence: 99, next: "Share owner dashboard", method: "Low-risk two-reading Health Certificate", credential: "Certified Utility Locator L3", calibration: "Valid", requirements: "Two readings, tolerance match, Cub review", readings: "Within 1.5cm", exception: "None" },
  { id: "DN-8827", owner: "Atlantic Fiber Grid", corridor: "Industrial park lateral", risk: "Moderate", vendor: "Northline Locate", locator: "Owen Brooks", device: "OTDR-FT7-1033", status: "Cub Review", confidence: 91, next: "Completeness check", method: "Fiber packet with valid OTDR trace", credential: "Fiber Resilience Tester", calibration: "Valid", requirements: "Trace file, serial match, geo stamp", readings: "Continuity pass", exception: "None" },
  { id: "DN-8828", owner: "County Transit Authority", corridor: "Station plaza utilities", risk: "Low", vendor: "CivicScan", locator: "Priya Raman", device: "EM-LP6-2139", status: "Evidence Captured", confidence: 88, next: "Run tolerance comparison", method: "EM locate plus reviewer attestation", credential: "Corridor Risk Reviewer", calibration: "Valid", requirements: "Reading pair and attestation", readings: "Tolerance pending", exception: "None" },
  { id: "DN-8829", owner: "Metro Energy Cooperative", corridor: "Downtown feeder vault", risk: "High", vendor: "Northline Locate", locator: "Owen Brooks", device: "OTDR-FT7-1033", status: "Tiger Review", confidence: 68, next: "Repeat vendor exception review", method: "High-risk independent corroboration required", credential: "Fiber Resilience Tester", calibration: "Valid", requirements: "Independent reviewer and artifact", readings: "Evidence conflicts with prior vendor packet", exception: "Repeat vendor exception" },
  { id: "DN-8830", owner: "Midwest Gas Transmission", corridor: "North valve cluster", risk: "Low", vendor: "Site Twins", locator: "Nina Patel", device: "EM-LP5-6692", status: "Warning", confidence: 79, next: "Use higher-trust device or submit now", method: "Low-risk locate with valid or warning-accepted device", credential: "Certified Utility Locator L2", calibration: "Warning", requirements: "Device expiry warning acknowledgement", readings: "Path match, expiry approaching", exception: "Calibration nearing expiry" }
];

const certificates = [
  { id: "HC-4107", owner: "Great Lakes Water Authority", segment: "Jefferson Ave trunk segment", type: "Low-risk Health Certificate", worker: "Maya Chen", device: "GPR-GX4-1192", calibration: "Valid", summary: "Two independent GPR readings within 2cm tolerance", tolerance: "Passed", exceptions: "None", review: "Cub complete", status: "Certificate Ready" },
  { id: "HC-4108", owner: "Atlantic Fiber Grid", segment: "Harbor splice vault 14", type: "Fiber resilience packet", worker: "Owen Brooks", device: "OTDR-FT9-4410", calibration: "Expired", summary: "Evidence rejected at device trust gate", tolerance: "Not evaluated", exceptions: "Expired OTDR calibration", review: "Blocked", status: "Blocked" },
  { id: "HC-4109", owner: "Metro Energy Cooperative", segment: "Substation feeder crossing", type: "High-risk Health Certificate", worker: "Avery Knox", device: "GPR-GSM2-8051", calibration: "Valid", summary: "Same-device repeat reading insufficient for high-risk corridor", tolerance: "Needs corroboration", exceptions: "Tiger review required", review: "Tiger open", status: "Escalated" },
  { id: "BC-1201", owner: "County Transit Authority", segment: "Blue Line duct bank", type: "Birth Certificate", worker: "Priya Raman", device: "GPR-GSM2-8051", calibration: "Valid", summary: "Baseline record requires stronger source-of-truth evidence", tolerance: "Pending", exceptions: "None", review: "Owner QA", status: "In Progress" },
  { id: "AP-9021", owner: "Atlantic Fiber Grid", segment: "Industrial park lateral", type: "Audit Packet", worker: "Owen Brooks", device: "OTDR-FT7-1033", calibration: "Valid", summary: "Trace file, serial match, and geo stamp accepted", tolerance: "Passed", exceptions: "None", review: "Cub complete", status: "Issued" }
];

const gateJobs = [
  {
    name: "Low-risk GPR Health Certificate",
    ticket: "DN-8821",
    gates: ["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Pass"],
    note: "Worker, device, calibration, approved method, and evidence all check out."
  },
  {
    name: "Fiber locate blocked by expired OTDR",
    ticket: "DN-8822",
    gates: ["Pass", "Pass", "Blocked", "Pass", "Warning", "Blocked", "Blocked", "Warning", "Blocked"],
    note: "Blocked because OTDR calibration expired before evidence capture."
  },
  {
    name: "High-risk corridor escalation",
    ticket: "DN-8823",
    gates: ["Pass", "Pass", "Pass", "Pass", "Pass", "Pass", "Warning", "Pass", "Warning"],
    note: "Same-device repeat reading is not enough; independent corroboration is required."
  },
  {
    name: "Credential mismatch assignment",
    ticket: "DN-8824",
    gates: ["Blocked", "Pass", "Pass", "Blocked", "Warning", "Blocked", "Blocked", "Warning", "Blocked"],
    note: "Assignment blocked because the worker credential does not satisfy the method."
  }
];

const gateNames = ["Trusted Worker", "Trusted Device", "Calibration Valid", "Authorized Assignment", "Approved Method", "Evidence Captured", "Tolerance Passed", "Audit Log Locked", "Certificate Ready"];
const activity = ["Dig notice received", "Certified locator assigned", "Device eligibility checked", "Evidence captured", "Tolerance verified", "Certificate generated"];

function App() {
  const [tab, setTab] = useState(tabs[0]);
  const [scenario, setScenario] = useState("Base");
  const [filters, setFilters] = useState({ risk: "All", vendor: "All", status: "All", device: "All" });
  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0].id);
  const [selectedCertId, setSelectedCertId] = useState(certificates[0].id);

  const filteredTickets = useMemo(() => tickets.filter((ticket) =>
    (filters.risk === "All" || ticket.risk === filters.risk) &&
    (filters.vendor === "All" || ticket.vendor === filters.vendor) &&
    (filters.status === "All" || ticket.status === filters.status)
  ), [filters]);

  const filteredDevices = useMemo(() => devices.filter((device) => filters.device === "All" || device.calibration === filters.device), [filters.device]);
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) || tickets[0];
  const selectedCert = certificates.find((cert) => cert.id === selectedCertId) || certificates[0];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={24} /></div>
          <div>
            <strong>DICRI</strong>
            <span>Trust Layer for Infrastructure Resilience</span>
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
          <span>Positioning</span>
          <p>The industry has digitized workflows. It has not fully governed trust.</p>
        </div>
      </aside>

      <section className="content">
        <header className="hero-band">
          <div>
            <p className="eyebrow">Infrastructure Resilience Governance</p>
            <h1>Trusted Worker. Trusted Device. Governed Evidence.</h1>
            <p>DICRI turns field execution from an assumption into evidence.</p>
          </div>
          <div className="scenario-control">
            <label htmlFor="scenario">Scenario</label>
            <select id="scenario" value={scenario} onChange={(event) => setScenario(event.target.value)}>
              <option>Base</option>
              <option>Clean low-risk pass</option>
              <option>Expired calibration block</option>
              <option>High-risk Tiger review</option>
              <option>Partner-led certificate</option>
            </select>
          </div>
        </header>

        {tab === "Executive Dashboard" && <ExecutiveDashboard scenario={scenario} />}
        {tab === "Trust Gate Workflow" && <TrustGateWorkflow />}
        {tab === "Dig Notice / Locate Governance" && <Governance filteredTickets={filteredTickets} filters={filters} setFilters={setFilters} selectedTicket={selectedTicket} setSelectedTicketId={setSelectedTicketId} />}
        {tab === "Health Certificate Workflow" && <HealthWorkflow setSelectedCertId={setSelectedCertId} />}
        {tab === "OEM / Equipment Registry" && <EquipmentRegistry devices={filteredDevices} filters={filters} setFilters={setFilters} />}
        {tab === "Certified Partner View" && <PartnerView />}
        {tab === "Adjudication Queue" && <Adjudication />}
        {tab === "Certificate / Audit Packet Preview" && <CertificatePreview selectedCert={selectedCert} setSelectedCertId={setSelectedCertId} />}
      </section>
    </main>
  );
}

function ExecutiveDashboard({ scenario }) {
  const adjustment = scenario.includes("Expired") ? 2 : scenario.includes("High") ? 4 : scenario.includes("Partner") ? 6 : 0;
  const cards = [
    ["Active Resilience Workflows", 38 + adjustment, Activity],
    ["Trust-Gated Jobs", 27 + adjustment, LockKeyhole],
    ["Evidence Packets Submitted", 124 + adjustment * 3, ClipboardCheck],
    ["Jobs Requiring Exception Review", 6 + (scenario.includes("High") ? 3 : 0), AlertTriangle],
    ["Registered Devices", devices.length, Wrench],
    ["Calibration-Valid Devices", devices.filter((device) => device.calibration === "Valid").length, Gauge],
    ["Certified Workers", workers.filter((worker) => worker.status === "Certified").length, UserCheck],
    ["Certificates Issued", 52 + (scenario.includes("Partner") ? 5 : 0), FileCheck2]
  ];

  return (
    <section className="page-grid">
      <div className="statement">
        <p>DICRI converts opaque field activity into governed, auditable infrastructure records.</p>
        <span>DICRI does not replace existing ticketing systems. It makes the field activity behind them verifiable.</span>
      </div>
      <div className="metric-grid">
        {cards.map(([label, value, Icon]) => (
          <article className="metric-card" key={label}>
            <Icon size={22} />
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <article className="panel wide">
        <div className="panel-heading"><h2>Governed Activity Feed</h2><BadgeCheck size={20} /></div>
        <div className="timeline">
          {activity.map((item, index) => <div className="timeline-item" key={item}><span>{index + 1}</span><p>{item}</p></div>)}
        </div>
      </article>
      <article className="panel">
        <h2>Primary Wedge</h2>
        <p>Owners already pay for field verification, locate work, repair work, and closeout evidence. DICRI validates whether the right worker used the right equipment, followed the right method, and produced trustworthy evidence.</p>
      </article>
    </section>
  );
}

function TrustGateWorkflow() {
  const [jobIndex, setJobIndex] = useState(0);
  const job = gateJobs[jobIndex];
  return (
    <section className="page-grid">
      <div className="toolbar">
        <SlidersHorizontal size={18} />
        {gateJobs.map((item, index) => <button key={item.ticket} className={index === jobIndex ? "selected" : ""} onClick={() => setJobIndex(index)}>{item.ticket}</button>)}
      </div>
      <article className="panel wide">
        <div className="panel-heading">
          <div><h2>{job.name}</h2><p>{job.ticket} | Trust Layer for Field Execution</p></div>
          <StatusBadge status={job.gates.includes("Blocked") ? "Blocked" : job.gates.includes("Warning") ? "Warning" : "Pass"} />
        </div>
        <div className="gate-grid">
          {gateNames.map((gate, index) => <Gate key={gate} name={gate} status={job.gates[index]} />)}
        </div>
        <p className="note">{job.note}</p>
      </article>
      <article className="panel">
        <h2>Trust Gate Logic</h2>
        <p>Software-enforced gates prove that critical field work was performed by trusted workers using registered and calibration-valid equipment under governed workflows with auditable evidence.</p>
      </article>
    </section>
  );
}

function Governance({ filteredTickets, filters, setFilters, selectedTicket, setSelectedTicketId }) {
  return (
    <section className="split-layout">
      <div>
        <FilterBar filters={filters} setFilters={setFilters} showDevice={false} />
        <article className="panel wide">
          <div className="panel-heading"><h2>Dig Notice / Locate Governance</h2><span className="small-copy">This is not just ticket routing. It is resilience governance.</span></div>
          <div className="data-table">
            <div className="table-row header"><span>Ticket</span><span>Owner</span><span>Risk</span><span>Vendor</span><span>Status</span><span>Confidence</span></div>
            {filteredTickets.map((ticket) => (
              <button className={`table-row ${selectedTicket.id === ticket.id ? "row-selected" : ""}`} key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)}>
                <span>{ticket.id}</span><span>{ticket.owner}</span><span>{ticket.risk}</span><span>{ticket.vendor}</span><span>{ticket.status}</span><span>{ticket.confidence}%</span>
              </button>
            ))}
          </div>
        </article>
      </div>
      <TicketDetail ticket={selectedTicket} />
    </section>
  );
}

function HealthWorkflow({ setSelectedCertId }) {
  const pathways = [
    ["Low-risk", "Same qualified tester / same registered device / two separate readings / tolerance match"],
    ["Moderate-risk", "Same tester allowed, but requires corroborating artifact"],
    ["High-risk", "Independent corroboration required"],
    ["Birth Certificate", "Stronger baseline requirements"]
  ];
  return (
    <section className="page-grid">
      <article className="panel wide">
        <h2>Risk-Tiered Evidence Pathways</h2>
        <div className="pathway-grid">
          {pathways.map(([title, copy]) => <div className="pathway" key={title}><strong>{title}</strong><p>{copy}</p></div>)}
        </div>
      </article>
      <article className="panel">
        <h2>Low-Risk Pass</h2>
        <p>Locator takes two separate readings using the same registered GPR device. Both readings are within tolerance and the packet is marked <strong>Certificate Ready</strong>.</p>
        <button className="primary-action" onClick={() => setSelectedCertId("HC-4107")}>Preview HC-4107</button>
      </article>
      <article className="panel">
        <h2>High-Risk Escalation</h2>
        <p>Same-device repeat reading is not enough. DICRI escalates to Tiger review for independent corroboration and standard governance.</p>
        <button className="primary-action secondary" onClick={() => setSelectedCertId("HC-4109")}>Preview HC-4109</button>
      </article>
      <article className="panel wide">
        <p className="note">AI assists segmentation, evidence completeness review, anomaly detection, and routing. Certification authority remains governed by DICRI's approved human and policy framework.</p>
      </article>
    </section>
  );
}

function EquipmentRegistry({ devices, filters, setFilters }) {
  const maturity = ["Manual device registration", "File-based evidence ingestion", "Cloud-to-cloud ingestion", "Device/app handshake", "Policy-governed evidence automation"];
  return (
    <section className="page-grid">
      <FilterBar filters={filters} setFilters={setFilters} deviceOnly />
      <article className="panel wide">
        <div className="panel-heading"><h2>OEM / Equipment Registry</h2><RadioTower size={20} /></div>
        <div className="registry-grid">
          {devices.map((device) => (
            <div className="device-card" key={device.id}>
              <div><strong>{device.oem}</strong><StatusBadge status={device.calibration} /></div>
              <p>{device.type} | {device.model}</p>
              <span>Serial: {device.serial}</span>
              <span>Calibration expiration: {device.expires}</span>
              <span>Approved evidence use: {device.evidenceUse}</span>
              <span>Assigned team: {device.team}</span>
              <span>Last evidence event: {device.lastEvent}</span>
            </div>
          ))}
        </div>
      </article>
      <article className="panel">
        <h2>OEM-Aligned Equipment Use</h2>
        <p>DICRI does not certify intrinsic equipment performance. DICRI governs whether registered, calibration-valid equipment was used by qualified people under approved evidence workflows.</p>
      </article>
      <article className="panel">
        <h2>Integration Maturity</h2>
        <div className="maturity-list">{maturity.map((item, index) => <div key={item}><span>{index + 1}</span>{item}</div>)}</div>
      </article>
    </section>
  );
}

function PartnerView() {
  return (
    <section className="page-grid">
      <article className="panel wide">
        <h2>Certified Evidence Partners</h2>
        <div className="partner-grid">
          {partners.map((partner) => (
            <div className="partner-card" key={partner.name}>
              <div><strong>{partner.name}</strong><StatusBadge status={partner.status.includes("Certified") ? "Pass" : "Warning"} /></div>
              <p>{partner.status}</p>
              <div className="mini-metrics">
                <span>{partner.locators} certified locators</span><span>{partner.devices} registered devices</span><span>{partner.jobs} active jobs</span><span>{partner.certificates} certificates</span><span>{partner.packets} audit packets</span><span>{partner.exposure}</span>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className="panel wide">
        <h2>Site Twins Partner-Led Job</h2>
        <div className="flow-line">
          {["Partner performs job", "DICRI audit log generated", "Certificate shared with owner", "Owner invited to SaaS trust dashboard"].map((step) => <div key={step}>{step}</div>)}
        </div>
      </article>
      <article className="statement">
        <p>Certification-grade evidence. Lifecycle trust. Infrastructure resilience.</p>
      </article>
    </section>
  );
}

function Adjudication() {
  const cub = ["Low-risk evidence completeness review", "Missing artifact routing", "Standard tolerance checks"];
  const tiger = ["Device trust issue", "Conflicting evidence", "High-risk corridor", "Out-of-tolerance depth", "Repeat vendor exception"];
  return (
    <section className="page-grid two">
      <Queue title="Cub Queue" icon={<ClipboardCheck size={22} />} items={cub} />
      <Queue title="Tiger Queue" icon={<AlertTriangle size={22} />} items={tiger} />
      <article className="panel wide">
        <p className="note">Tigers define and govern the standard. Cubs apply approved rules. Automation assists routing, completeness checks, and anomaly detection.</p>
      </article>
    </section>
  );
}

function CertificatePreview({ selectedCert, setSelectedCertId }) {
  const timeline = ["Assignment created", "Worker authenticated", "Device registered", "Calibration checked", "Evidence captured", "Reading 1 submitted", "Reading 2 submitted", "Tolerance comparison completed", "Cub review completed", "Certificate issued"];
  return (
    <section className="split-layout">
      <article className="panel">
        <h2>Certificate Records</h2>
        <div className="cert-list">
          {certificates.map((cert) => <button className={selectedCert.id === cert.id ? "selected" : ""} key={cert.id} onClick={() => setSelectedCertId(cert.id)}>{cert.id}<span>{cert.status}</span></button>)}
        </div>
      </article>
      <article className="certificate">
        <div className="cert-header">
          <div><p className="eyebrow">DICRI Certified Infrastructure Record</p><h2>{selectedCert.id}</h2></div>
          <StatusBadge status={selectedCert.status} />
        </div>
        <div className="cert-grid">
          <Field label="Asset owner" value={selectedCert.owner} />
          <Field label="Segment / corridor" value={selectedCert.segment} />
          <Field label="Workflow type" value={selectedCert.type} />
          <Field label="Worker credential" value={selectedCert.worker} />
          <Field label="Device used" value={selectedCert.device} />
          <Field label="Calibration status" value={selectedCert.calibration} />
          <Field label="Evidence summary" value={selectedCert.summary} />
          <Field label="Tolerance result" value={selectedCert.tolerance} />
          <Field label="Exceptions" value={selectedCert.exceptions} />
          <Field label="Review status" value={selectedCert.review} />
          <Field label="Certificate status" value={selectedCert.status} />
        </div>
        <div className="timeline compact">
          {timeline.map((item, index) => <div className="timeline-item" key={item}><span>{index + 1}</span><p>{item}</p></div>)}
        </div>
      </article>
    </section>
  );
}

function Queue({ title, icon, items }) {
  return <article className="panel"><div className="panel-heading"><h2>{title}</h2>{icon}</div>{items.map((item) => <div className="queue-item" key={item}><GitBranch size={16} />{item}</div>)}</article>;
}

function TicketDetail({ ticket }) {
  return (
    <article className="panel detail-panel">
      <div className="panel-heading"><h2>{ticket.id}</h2><StatusBadge status={ticket.status} /></div>
      <Field label="Required method" value={ticket.method} />
      <Field label="Locator credential" value={ticket.credential} />
      <Field label="Device serial number" value={ticket.device} />
      <Field label="Calibration status" value={ticket.calibration} />
      <Field label="Evidence requirements" value={ticket.requirements} />
      <Field label="Readings summary" value={ticket.readings} />
      <Field label="Exception status" value={ticket.exception} />
      <div className="audit-mini">
        {["Assignment", "Worker auth", "Device check", "Evidence", "Review"].map((step) => <span key={step}>{step}</span>)}
      </div>
      <strong className="next-action">Next action: {ticket.next}</strong>
    </article>
  );
}

function FilterBar({ filters, setFilters, showDevice = true, deviceOnly = false }) {
  const update = (key, value) => setFilters({ ...filters, [key]: value });
  if (deviceOnly) {
    return <div className="toolbar"><Filter size={18} /><Select label="Device status" value={filters.device} options={["All", "Valid", "Warning", "Expired"]} onChange={(value) => update("device", value)} /></div>;
  }
  return (
    <div className="toolbar">
      <Filter size={18} />
      <Select label="Risk level" value={filters.risk} options={["All", "Low", "Moderate", "High"]} onChange={(value) => update("risk", value)} />
      <Select label="Vendor" value={filters.vendor} options={["All", "Site Twins", "Northline Locate", "CivicScan", "MetroGrid"]} onChange={(value) => update("vendor", value)} />
      <Select label="Status" value={filters.status} options={["All", ...Array.from(new Set(tickets.map((ticket) => ticket.status)))]} onChange={(value) => update("status", value)} />
      {showDevice && <Select label="Device status" value={filters.device} options={["All", "Valid", "Warning", "Expired"]} onChange={(value) => update("device", value)} />}
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return <label className="select-label">{label}<select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function Gate({ name, status }) {
  const Icon = status === "Pass" ? BadgeCheck : status === "Warning" ? AlertTriangle : LockKeyhole;
  return <div className={`gate ${status.toLowerCase()}`}><Icon size={20} /><strong>{name}</strong><StatusBadge status={status} /></div>;
}

function StatusBadge({ status }) {
  const normalized = status === "Certificate Ready" || status === "Issued" || status === "Valid" || status === "Pass" ? "pass" : status === "Blocked" || status === "Expired" ? "blocked" : "warning";
  return <span className={`status ${normalized}`}>{status}</span>;
}

function Field({ label, value }) {
  return <div className="field"><span>{label}</span><strong>{value}</strong></div>;
}

createRoot(document.getElementById("root")).render(<App />);
