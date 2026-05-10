import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Globe2,
  HardDrive,
  History,
  Info,
  Layers,
  Map,
  MapPin,
  Plus,
  Route,
  Search,
  Shield,
  Upload,
  X,
  Zap,
} from 'lucide-react';

const COUNTRIES = {
  Nigeria: {
    short: 'NG',
    agency: 'Federal Republic',
    subAgency: 'Infrastructure Dept',
    flag: ['#008751', '#FFFFFF', '#008751'],
    emblem: '♛',
    regions: ['Rivers', 'Lagos', 'FCT', 'Delta', 'Edo', 'Kano'],
  },
  Kenya: {
    short: 'KE',
    agency: 'Republic of Kenya',
    subAgency: 'Infrastructure Authority',
    flag: ['#000000', '#BB0000', '#006600'],
    emblem: '⚖',
    regions: ['Nairobi', 'Mombasa', 'Kiambu', 'Nakuru'],
  },
  Ethiopia: {
    short: 'ET',
    agency: 'Federal Democratic Republic',
    subAgency: 'Urban Infrastructure',
    flag: ['#078930', '#FCDD09', '#DA121A'],
    emblem: '✦',
    regions: ['Addis Ababa', 'Oromia', 'Amhara'],
  },
  Egypt: {
    short: 'EG',
    agency: 'Arab Republic of Egypt',
    subAgency: 'Digital Infrastructure',
    flag: ['#CE1126', '#FFFFFF', '#000000'],
    emblem: '◆',
    regions: ['Greater Cairo', 'Alexandria', 'Giza'],
  },
  Ghana: {
    short: 'GH',
    agency: 'Republic of Ghana',
    subAgency: 'Works & Housing',
    flag: ['#CE1126', '#FCD116', '#006B3F'],
    emblem: '★',
    regions: ['Greater Accra', 'Ashanti', 'Western'],
  },
};

const WORK_CLASSIFICATIONS = [
  'Drainage Construction',
  'Road Rehabilitation',
  'Utility Duct Installation',
  'Foundation / Piling',
  'Fiber Deployment',
  'Water / Sewer Works',
  'Power Works',
];

const INTAKE_AGENCIES = [
  'Rivers Permit Office',
  'Lagos Infrastructure Coordination Office',
  'Abuja ROW Coordination Desk',
  'National Fiber Corridor Desk',
];

const OFFICERS = [
  { name: 'R. Okafor', id: 'RIV-INT-042' },
  { name: 'A. Bello', id: 'LAG-INT-118' },
  { name: 'M. Danladi', id: 'ABJ-INT-073' },
  { name: 'T. Adeyemi', id: 'NFC-INT-025' },
];

const REQUEST_CHANNELS = [
  'Assisted Intake',
  'Online Portal',
  'Email Submission',
  'Field Office Walk-in',
  'API / System Intake',
];

const MARKET_REGIONS = [
  'Nigeria / Rivers',
  'Nigeria / Lagos',
  'Nigeria / FCT',
  'Nigeria / Ogun',
  'Nigeria / Kano',
];

const WORK_AREA_TYPES = ['Linear Corridor', 'Point Excavation', 'Area / Polygon Work'];

const CORRIDOR_SUGGESTIONS = [
  'Garrison Junction to Elekahia Road, Port Harcourt',
  'Ikeja CBD to Maryland Exchange',
  'Abuja Central Corridor Segment A',
  'Lekki Phase 1 Fiber Corridor',
  'Kano Metro Ring Segment 2',
];

const STEP_COMPLETENESS = {
  1: 15,
  2: 25,
  3: 40,
  4: 55,
  5: 70,
  6: 82,
  7: 90,
  8: 96,
  9: 96,
  10: 100,
};

const STEPS = [
  'Intake Authority',
  'Requester Details',
  'CBYD Eligibility',
  'Work Classification',
  'Location Capture',
  'Method & Dimensions',
  'Schedule',
  'Documents',
  'Review',
  'Submitted to DICRI',
];

const INTAKES = [
  {
    id: 'INT-042',
    packetId: 'CBYD-INT-2026-00481',
    requester: 'Delta Civil Works Ltd.',
    requesterType: 'Contractor',
    workCategory: 'Drainage Construction',
    classifications: ['Drainage Construction', 'Road Rehabilitation'],
    location: 'Garrison Junction to Elekahia Road, Port Harcourt',
    state: 'Rivers',
    country: 'Nigeria',
    channel: 'Assisted Intake',
    completeness: 87,
    status: 'Draft Intake Request',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Side of road unknown; wider screening buffer may be applied.',
    likelyOwners: [
      { name: 'State Fiber Agency', type: 'Fiber', response: 'Pending', sla: '21h', risk: 'Medium' },
      { name: 'Water Corporation', type: 'Water', response: 'Acknowledged', sla: 'Closed', risk: 'Low' },
      { name: 'Power Distribution Company', type: 'Power', response: 'Pending', sla: '18h', risk: 'Medium' },
      { name: 'Municipal Drainage Department', type: 'Drainage', response: 'Required', sla: '12h', risk: 'High' },
    ],
    permitRef: 'PHT-DR-2218',
    contact: 'Emeka Nwosu',
    email: 'emeka.nwosu@deltacivil.demo',
    phone: '+234 802 123 4567',
    expectedStart: '2026-05-14',
    expectedCompletion: '2026-05-21',
    agency: 'Rivers State Permit Office',
    officer: 'R. Okafor',
    officerId: 'RIV-INT-042',
    method: 'Open trenching',
    depthRange: '0.6 m - 1.2 m',
    lengthRange: '0.5 km - 1 km',
    surfaceType: 'Asphalt roadway / shoulder',
    equipmentClass: 'Light excavator + manual finish',
    trafficImpact: 'Single-lane managed works',
    startWindow: 'Within 7 days',
    restoration: 'Temporary reinstatement then permanent patch',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'No', ownersNotified: 'Partial' },
    attachments: 2,
  },
  {
    id: 'INT-041',
    packetId: 'CBYD-INT-2026-00479',
    requester: 'Niger Drainage Services',
    requesterType: 'Contractor',
    workCategory: 'Water / Sewer Works',
    classifications: ['Water / Sewer Works', 'Drainage Construction'],
    location: 'Okpanam Road drainage outfall, Asaba',
    state: 'Delta',
    country: 'Nigeria',
    channel: 'Public Portal',
    completeness: 54,
    status: 'Needs Clarification',
    workAreaType: 'Point Excavation',
    groundDisturbance: 'Yes',
    warning: 'Permit reference and route sketch are incomplete.',
    likelyOwners: [
      { name: 'Water Corporation', type: 'Water', response: 'Pending', sla: '20h', risk: 'Medium' },
      { name: 'Gas Pipeline Operator', type: 'Gas', response: 'Notified', sla: 'Closed', risk: 'High' },
      { name: 'Road Authority', type: 'Road', response: 'Pending', sla: '14h', risk: 'Medium' },
    ],
    permitRef: 'DTA-CV-1190',
    contact: 'Ifeoma Udo',
    email: 'ifeoma.udo@nigerdrainage.demo',
    phone: '+234 803 220 1188',
    expectedStart: '2026-05-20',
    expectedCompletion: '2026-05-28',
    agency: 'Delta Permit Desk',
    officer: 'M. Aghogho',
    officerId: 'DTA-INT-041',
    method: 'Vacuum excavation',
    depthRange: '1.2 m - 2 m',
    lengthRange: 'Under 100 m',
    surfaceType: 'Road shoulder',
    equipmentClass: 'Vacuum truck + hand tools',
    trafficImpact: 'Shoulder closure',
    startWindow: '8-14 days',
    restoration: 'Same-day reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Point Excavation', depthKnown: 'Yes', ownersNotified: 'No' },
    attachments: 1,
  },
  {
    id: 'INT-040',
    packetId: 'CBYD-INT-2026-00472',
    requester: 'City Roads Unit',
    requesterType: 'Government Unit',
    workCategory: 'Road Rehabilitation',
    classifications: ['Road Rehabilitation', 'Power Works'],
    location: 'Ring Road resurfacing zone, Benin City',
    state: 'Edo',
    country: 'Nigeria',
    channel: 'Assisted Intake',
    completeness: 93,
    status: 'Ready for Review',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Power owner response pending but packet is reviewable.',
    likelyOwners: [
      { name: 'Power Distribution Company', type: 'Power', response: 'Pending', sla: '10h', risk: 'Medium' },
      { name: 'State Fiber Agency', type: 'Fiber', response: 'Acknowledged', sla: 'Closed', risk: 'Low' },
      { name: 'Road Authority', type: 'Road', response: 'Internal', sla: 'Closed', risk: 'Low' },
    ],
    permitRef: 'BEN-RD-0841',
    contact: 'Osaze Igbinosa',
    email: 'osaze.igbinosa@cityroads.demo',
    phone: '+234 805 404 8811',
    expectedStart: '2026-05-18',
    expectedCompletion: '2026-06-02',
    agency: 'Edo Works Permit Office',
    officer: 'A. Ehigie',
    officerId: 'EDO-INT-040',
    method: 'Road cutting / milling',
    depthRange: '0.3 m - 0.6 m',
    lengthRange: '1 km - 3 km',
    surfaceType: 'Paved arterial road',
    equipmentClass: 'Road saw + milling machine',
    trafficImpact: 'Partial carriageway closure',
    startWindow: 'Within 7 days',
    restoration: 'Permanent asphalt reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'Yes', ownersNotified: 'Partial' },
    attachments: 4,
  },
  {
    id: 'INT-039',
    packetId: 'CBYD-INT-2026-00463',
    requester: 'East Africa Fibre Build Ltd.',
    requesterType: 'Utility Contractor',
    workCategory: 'Fiber Deployment',
    classifications: ['Fiber Deployment', 'Utility Duct Installation'],
    location: 'Waiyaki Way to Westlands exchange, Nairobi',
    state: 'Nairobi',
    country: 'Kenya',
    channel: 'Public Portal',
    completeness: 78,
    status: 'Ready for Review',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Owner notification package ready for DICRI review.',
    likelyOwners: [
      { name: 'Road Authority', type: 'Road', response: 'Acknowledged', sla: 'Closed', risk: 'Low' },
      { name: 'Power Distribution Company', type: 'Power', response: 'Pending', sla: '16h', risk: 'Medium' },
      { name: 'Water Corporation', type: 'Water', response: 'Pending', sla: '22h', risk: 'Medium' },
    ],
    permitRef: 'NRB-FB-4430',
    contact: 'Achieng Otieno',
    email: 'achieng.otieno@eafibre.demo',
    phone: '+254 711 555 203',
    expectedStart: '2026-05-26',
    expectedCompletion: '2026-06-10',
    agency: 'Nairobi Infrastructure Authority',
    officer: 'P. Mwangi',
    officerId: 'KEN-INT-039',
    method: 'Micro-trenching',
    depthRange: '0.3 m - 0.6 m',
    lengthRange: '1 km - 3 km',
    surfaceType: 'Urban road reserve',
    equipmentClass: 'Micro-trencher',
    trafficImpact: 'Off-peak shoulder works',
    startWindow: '15-30 days',
    restoration: 'Permanent reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'Yes', ownersNotified: 'Partial' },
    attachments: 3,
  },
  {
    id: 'INT-038',
    packetId: 'CBYD-INT-2026-00451',
    requester: 'Addis Utility Works',
    requesterType: 'Utility Provider',
    workCategory: 'Power Works',
    classifications: ['Power Works', 'Foundation / Piling'],
    location: 'Bole Road feeder upgrade, Addis Ababa',
    state: 'Addis Ababa',
    country: 'Ethiopia',
    channel: 'Assisted Intake',
    completeness: 68,
    status: 'Needs Clarification',
    workAreaType: 'Area / Polygon Work',
    groundDisturbance: 'Yes',
    warning: 'Work boundary needs a cleaner polygon and method statement.',
    likelyOwners: [
      { name: 'Power Distribution Company', type: 'Power', response: 'Internal', sla: 'Closed', risk: 'Low' },
      { name: 'Municipal Drainage Department', type: 'Drainage', response: 'Pending', sla: '24h', risk: 'Medium' },
      { name: 'State Fiber Agency', type: 'Fiber', response: 'Pending', sla: '20h', risk: 'Medium' },
    ],
    permitRef: 'ADD-PW-9007',
    contact: 'Mekdes Alemu',
    email: 'mekdes.alemu@addisutility.demo',
    phone: '+251 911 205 441',
    expectedStart: '2026-06-04',
    expectedCompletion: '2026-06-25',
    agency: 'Addis Ababa Infrastructure Desk',
    officer: 'T. Bekele',
    officerId: 'ETH-INT-038',
    method: 'Piling / foundation excavation',
    depthRange: 'Over 2 m',
    lengthRange: 'Area / compound works',
    surfaceType: 'Mixed paved and unpaved',
    equipmentClass: 'Piling rig + excavator',
    trafficImpact: 'Localized diversion',
    startWindow: '15-30 days',
    restoration: 'Engineered reinstatement',
    eligibility: { ground: 'Yes', row: 'Near ROW', corridor: 'Area / Polygon Work', depthKnown: 'Partial', ownersNotified: 'No' },
    attachments: 2,
  },
  {
    id: 'INT-037',
    packetId: 'CBYD-INT-2026-00437',
    requester: 'Accra Water Renewal Program',
    requesterType: 'Government Unit',
    workCategory: 'Water / Sewer Works',
    classifications: ['Water / Sewer Works', 'Road Rehabilitation'],
    location: 'Ring Road East utility renewal, Accra',
    state: 'Greater Accra',
    country: 'Ghana',
    channel: 'Assisted Intake',
    completeness: 91,
    status: 'Ready for Review',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Gas operator response window approaching deadline.',
    likelyOwners: [
      { name: 'Water Corporation', type: 'Water', response: 'Internal', sla: 'Closed', risk: 'Low' },
      { name: 'Gas Pipeline Operator', type: 'Gas', response: 'Pending', sla: '8h', risk: 'High' },
      { name: 'Road Authority', type: 'Road', response: 'Acknowledged', sla: 'Closed', risk: 'Low' },
      { name: 'State Fiber Agency', type: 'Fiber', response: 'Pending', sla: '18h', risk: 'Medium' },
    ],
    permitRef: 'ACC-WT-6612',
    contact: 'Ama Mensah',
    email: 'ama.mensah@accrawater.demo',
    phone: '+233 24 404 6612',
    expectedStart: '2026-05-30',
    expectedCompletion: '2026-06-15',
    agency: 'Greater Accra Works Desk',
    officer: 'K. Boateng',
    officerId: 'GHA-INT-037',
    method: 'Open trenching',
    depthRange: '1.2 m - 2 m',
    lengthRange: '0.5 km - 1 km',
    surfaceType: 'Paved urban road',
    equipmentClass: 'Excavator + compactor',
    trafficImpact: 'Managed lane closure',
    startWindow: '8-14 days',
    restoration: 'Permanent road reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'Yes', ownersNotified: 'Partial' },
    attachments: 5,
  },
  {
    id: 'INT-036',
    packetId: 'CBYD-INT-2026-00420',
    requester: 'Cairo Civil Renewal Office',
    requesterType: 'Government Unit',
    workCategory: 'Road Rehabilitation',
    classifications: ['Road Rehabilitation', 'Utility Duct Installation'],
    location: 'Nasr City service corridor, Greater Cairo',
    state: 'Greater Cairo',
    country: 'Egypt',
    channel: 'Assisted Intake',
    completeness: 76,
    status: 'Draft Intake Request',
    workAreaType: 'Linear Corridor',
    groundDisturbance: 'Yes',
    warning: 'Likely asset-owner list requires confirmation.',
    likelyOwners: [
      { name: 'Road Authority', type: 'Road', response: 'Internal', sla: 'Closed', risk: 'Low' },
      { name: 'Power Distribution Company', type: 'Power', response: 'Pending', sla: '24h', risk: 'Medium' },
      { name: 'Water Corporation', type: 'Water', response: 'Pending', sla: '24h', risk: 'Medium' },
    ],
    permitRef: 'CAI-RD-5094',
    contact: 'Nour Hassan',
    email: 'nour.hassan@cairorenewal.demo',
    phone: '+20 10 5550 9941',
    expectedStart: '2026-06-08',
    expectedCompletion: '2026-06-30',
    agency: 'Greater Cairo Corridor Desk',
    officer: 'M. Fathy',
    officerId: 'EGY-INT-036',
    method: 'Road cutting / milling',
    depthRange: '0.6 m - 1.2 m',
    lengthRange: '1 km - 3 km',
    surfaceType: 'Paved arterial road',
    equipmentClass: 'Road saw + milling machine',
    trafficImpact: 'Partial carriageway closure',
    startWindow: '15-30 days',
    restoration: 'Permanent asphalt reinstatement',
    eligibility: { ground: 'Yes', row: 'Yes', corridor: 'Linear Corridor', depthKnown: 'Partial', ownersNotified: 'No' },
    attachments: 2,
  },
];

const NOTIFICATIONS = [
  { id: 'N-1', intakeId: 'INT-037', title: 'Owner response window approaching deadline', body: 'Gas Pipeline Operator response is due within 8 hours.', severity: 'High' },
  { id: 'N-2', intakeId: 'INT-041', title: 'Intake clarification required', body: 'Permit reference and route sketch remain incomplete.', severity: 'Medium' },
  { id: 'N-3', intakeId: 'INT-040', title: 'CBYD screening ready for DICRI review', body: 'Packet has sufficient completeness for handoff review.', severity: 'Low' },
];

const NEW_INTAKE_TEMPLATE = { ...INTAKES[0], id: 'INT-NEW', packetId: 'CBYD-INT-DRAFT', requester: 'New Requester', completeness: 34, status: 'Draft Intake Request', permitRef: 'TBD', contact: 'Unassigned', email: 'pending@example.demo', phone: 'Pending', attachments: 0 };

export default function GovernmentIntakeDemo() {
  const [countryName, setCountryName] = useState('Nigeria');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mode, setMode] = useState('dashboard');
  const [step, setStep] = useState(1);
  const [selectedPacket, setSelectedPacket] = useState(INTAKES[0]);
  const [filters, setFilters] = useState({ search: '', state: 'All', category: 'All', status: 'All' });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [permitSearch, setPermitSearch] = useState('');

  const country = COUNTRIES[countryName];
  const countryRecords = INTAKES.filter((record) => record.country === countryName);
  const availableRegions = country.regions;
  const availableCategories = [...new Set(countryRecords.map((record) => record.workCategory))];
  const availableStatuses = [...new Set(countryRecords.map((record) => record.status))];

  const filteredRecords = useMemo(() => filterRecords(countryRecords, filters), [countryRecords, filters]);
  const workflowPacket = useMemo(() => withWorkflowCompleteness(selectedPacket, mode, step), [selectedPacket, mode, step]);

  const selectCountry = (name) => {
    const firstRecord = INTAKES.find((record) => record.country === name) || INTAKES[0];
    setCountryName(name);
    setSelectedPacket(firstRecord);
    setFilters({ search: '', state: 'All', category: 'All', status: 'All' });
    setMode('dashboard');
    setActiveTab('dashboard');
    setStep(1);
  };

  const selectRecord = (record, targetStep = 1) => {
    setSelectedPacket(record);
    setMode('intake');
    setActiveTab('intakes');
    setStep(targetStep);
  };

  const openDashboard = () => {
    setMode('dashboard');
    setActiveTab('dashboard');
    setStep(1);
  };

  const openNewIntake = () => {
    setSelectedPacket({ ...NEW_INTAKE_TEMPLATE, country: countryName, state: availableRegions[0], agency: INTAKE_AGENCIES[0], channel: REQUEST_CHANNELS[0], completeness: STEP_COMPLETENESS[1] });
    setMode('intake');
    setActiveTab('intakes');
    setStep(1);
  };

  const submitToDicri = () => {
    setSelectedPacket((packet) => ({ ...packet, status: 'Submitted to DICRI', completeness: 100 }));
    setStep(10);
  };

  const updatePacket = (patch) => setSelectedPacket((packet) => ({ ...packet, ...patch }));

  const toggleClassification = (classification) => {
    const exists = selectedPacket.classifications.includes(classification);
    const next = exists
      ? selectedPacket.classifications.filter((item) => item !== classification)
      : [...selectedPacket.classifications, classification];
    updatePacket({ classifications: next, workCategory: next[0] || selectedPacket.workCategory });
  };

  const updateEligibility = (key, value) => {
    const eligibility = { ...selectedPacket.eligibility, [key]: value };
    const warning = eligibility.ground === 'No'
      ? 'Likely not CBYD unless work scope changes.'
      : eligibility.depthKnown === 'No'
        ? 'Excavation depth unknown; clarification recommended.'
        : selectedPacket.warning;
    updatePacket({
      eligibility,
      groundDisturbance: eligibility.ground,
      workAreaType: eligibility.corridor,
      warning,
      completeness: STEP_COMPLETENESS[3],
    });
  };

  const nextStep = () => {
    if (step >= 9) submitToDicri();
    else setStep((current) => Math.min(current + 1, 9));
  };

  const backStep = () => setStep((current) => Math.max(current - 1, 1));

  const renderMain = () => {
    if (mode === 'intake') {
      return (
        <IntakeWorkflow
          country={country}
          packet={workflowPacket}
          step={step}
          nextStep={nextStep}
          backStep={backStep}
          openDashboard={openDashboard}
          updatePacket={updatePacket}
          updateEligibility={updateEligibility}
          toggleClassification={toggleClassification}
          submitToDicri={submitToDicri}
          setModal={setModal}
        />
      );
    }
    if (activeTab === 'intakes') {
      return <IntakesPage countryName={countryName} records={filteredRecords} filters={filters} setFilters={setFilters} regions={availableRegions} categories={availableCategories} statuses={availableStatuses} onOpen={selectRecord} onNew={openNewIntake} />;
    }
    if (activeTab === 'applications') {
      return <ApplicationsPage records={countryRecords} onOpen={selectRecord} />;
    }
    if (activeTab === 'permits') {
      return <PermitsPage records={countryRecords} search={permitSearch} setSearch={setPermitSearch} onOpen={selectRecord} />;
    }
    if (activeTab === 'reports') {
      return <ReportsPage records={countryRecords} countryName={countryName} />;
    }
    return <Dashboard records={countryRecords} filteredRecords={filteredRecords} countryName={countryName} onOpenQueue={() => setActiveTab('intakes')} onOpen={selectRecord} onNew={openNewIntake} />;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-[#001B3D] antialiased">
      <TopNav
        country={country}
        countryName={countryName}
        selectCountry={selectCountry}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setMode('dashboard');
          setActiveTab(tab);
        }}
        openDashboard={openDashboard}
        notificationOpen={notificationOpen}
        setNotificationOpen={setNotificationOpen}
        onNotification={(notification) => {
          const record = INTAKES.find((item) => item.id === notification.intakeId);
          if (record) {
            setCountryName(record.country);
            setSelectedPacket(record);
            setMode('intake');
            setActiveTab('intakes');
            setStep(5);
          }
          setModal({ type: 'notification', notification });
          setNotificationOpen(false);
        }}
      />
      <div className="grid grid-cols-[260px_1fr_340px] min-h-[calc(100vh-76px)]">
        <SideRail step={mode === 'intake' ? step : 1} onStepClick={(n) => { setMode('intake'); setActiveTab('intakes'); setStep(n); }} />
        <main className="min-w-0 p-6 pb-24">{renderMain()}</main>
        <SnapshotPanel packet={workflowPacket} mode={mode} step={step} />
      </div>
      {modal && <DetailModal modal={modal} close={() => setModal(null)} />}
    </div>
  );
}

function TopNav({ country, countryName, selectCountry, activeTab, setActiveTab, openDashboard, notificationOpen, setNotificationOpen, onNotification }) {
  const tabs = [['dashboard', 'Dashboard'], ['intakes', 'Intakes'], ['applications', 'Applications'], ['permits', 'Permits'], ['reports', 'Reports']];
  return (
    <header className="h-[76px] bg-[#062247] text-white border-b border-[#D4A100]/40 shadow-lg sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-5">
        <div className="flex items-center gap-5 min-w-[430px]">
          <GovernmentMark country={country} />
          <div className="h-10 w-px bg-white/15" />
          <button onClick={openDashboard} className="flex items-center gap-4 text-left">
            <DicriLogo />
            <div className="leading-none">
              <div className="text-3xl font-black tracking-tight">DICRI</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-blue-100/80 mt-1">Digital Infrastructure Corridor<br />Rights & Intake</div>
            </div>
          </button>
        </div>
        <nav className="flex h-full items-center gap-6">
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`relative h-full px-3 text-sm font-black transition-colors ${activeTab === id ? 'text-white' : 'text-blue-100/70 hover:text-white'}`}>
              {label}
              {activeTab === id && <span className="absolute left-0 right-0 bottom-0 h-1 bg-[#D4A100] rounded-t-full shadow-[0_-6px_18px_rgba(212,161,0,0.45)]" />}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4 min-w-[380px] justify-end relative">
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-widest">
            <Globe2 size={14} />
            <select value={countryName} onChange={(event) => selectCountry(event.target.value)} className="bg-transparent text-white outline-none">
              {Object.keys(COUNTRIES).map((name) => <option key={name} className="text-slate-900">{name}</option>)}
            </select>
          </label>
          <button onClick={() => setNotificationOpen(!notificationOpen)} className="relative p-2 text-blue-100 hover:text-white">
            <Bell size={21} />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#D4A100] text-[11px] font-black text-white flex items-center justify-center">3</span>
          </button>
          {notificationOpen && (
            <div className="absolute right-12 top-14 w-96 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-2xl z-50">
              <h3 className="px-3 py-2 text-sm font-black">Notifications</h3>
              {NOTIFICATIONS.map((notification) => (
                <button key={notification.id} onClick={() => onNotification(notification)} className="w-full rounded-xl p-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black">{notification.title}</p>
                    <StatusBadge status={notification.severity} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{notification.body}</p>
                  <p className="text-[10px] font-black text-blue-700 mt-2 uppercase tracking-widest">{notification.intakeId}</p>
                </button>
              ))}
            </div>
          )}
          <div className="h-10 w-10 rounded-full bg-white text-[#062247] flex items-center justify-center font-black shadow-lg">RO</div>
        </div>
      </div>
    </header>
  );
}

function GovernmentMark({ country }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-inner"><span className="text-xl">{country.emblem}</span></div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-12 overflow-hidden rounded-sm border border-white/30 shadow-sm flex">{country.flag.map((color, idx) => <div key={idx} className="flex-1" style={{ backgroundColor: color }} />)}</div>
        <div className="leading-none hidden xl:block">
          <div className="text-[10px] font-black uppercase tracking-tight text-white">{country.agency}</div>
          <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-blue-100/65 mt-1">{country.subAgency}</div>
        </div>
      </div>
    </div>
  );
}

function DicriLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-10 w-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5L15 20V45C15 70 50 92 50 92C50 92 88 70 88 45V20L50 5Z" fill="#0F172A" stroke="#3B82F6" strokeWidth="3" />
      <path d="M35 35C48 35 48 65 58 65" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 45C45 45 45 55 58 55" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 55C45 55 45 45 58 45" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="75" r="14" fill="#3B82F6" />
      <path d="M74 75L78 79L86 71" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SideRail({ step, onStepClick }) {
  return (
    <aside className="bg-white border-r border-slate-200 p-4 pt-6">
      <h3 className="text-sm font-black text-[#001B3D] mb-7">CBYD Excavation Intake</h3>
      <div className="space-y-1">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const complete = n < step || step === 10;
          const active = n === step;
          return (
            <button key={label} onClick={() => onStepClick(Math.min(n, 9))} className="w-full flex items-center gap-4 py-2 text-left group">
              <div className="flex flex-col items-center">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 text-sm font-black transition-all ${complete ? 'bg-[#0B7F3A] border-[#0B7F3A] text-white' : active ? 'bg-white border-[#D4A100] text-[#062247] shadow-md' : 'bg-[#062247] border-[#062247] text-white'}`}>{n === 10 ? <Check size={18} /> : complete && n < 10 ? <Check size={18} /> : n}</div>
                {n < STEPS.length && <div className="h-7 w-px bg-slate-300" />}
              </div>
              <div className="text-sm font-black text-[#001B3D] leading-tight">{label}</div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function SnapshotPanel({ packet, mode, step }) {
  const status = step === 10 ? 'Submitted to DICRI' : packet.status;
  const ownerRisk = packet.likelyOwners.some((owner) => owner.risk === 'High') ? 'High' : packet.likelyOwners.some((owner) => owner.risk === 'Medium') ? 'Medium' : 'Low';
  return (
    <aside className="bg-white border-l border-slate-200 p-6">
      <h3 className="flex items-center gap-2 text-lg font-black mb-6"><FileText size={19} /> Intake Snapshot</h3>
      <div className="space-y-5">
        <SnapshotItem label="Selected Intake" value={packet.id} />
        <SnapshotItem label="Market / Region" value={`${packet.country} / ${packet.state}`} />
        <SnapshotItem label="Status" value={status} badge tone={status === 'Submitted to DICRI' || status === 'Ready for Review' ? 'green' : status === 'Needs Clarification' ? 'red' : 'amber'} />
        <SnapshotItem label="Ground Disturbance" value={packet.groundDisturbance} badge tone={packet.groundDisturbance === 'Yes' ? 'green' : 'amber'} />
        <SnapshotItem label="Work Area Type" value={packet.workAreaType} />
        <SnapshotItem label="Permit Ref" value={packet.permitRef} />
        <div className="border-t border-slate-200 pt-5">
          <div className="flex justify-between text-xs font-black uppercase text-slate-500 mb-2"><span>Intake Completeness</span><span className="text-[#001B3D]">{packet.completeness}%</span></div>
          <Progress value={packet.completeness} wide />
        </div>
        <SnapshotItem label="Warning" value={packet.warning} badge tone="amber" />
        <SnapshotItem label="Likely Owner Risk" value={ownerRisk} badge tone={ownerRisk === 'High' ? 'red' : ownerRisk === 'Medium' ? 'amber' : 'green'} />
      </div>
    </aside>
  );
}

function Dashboard({ records, filteredRecords, countryName, onOpenQueue, onOpen, onNew }) {
  const ready = records.filter((record) => record.status === 'Ready for Review').length;
  const clarify = records.filter((record) => record.status === 'Needs Clarification').length;
  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Authorized Intake Dashboard</h1>
          <p className="text-slate-600 mt-2 text-lg">{countryName} excavation requests awaiting pre-screening</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onOpenQueue} className="rounded-xl border border-[#001B3D] bg-white px-7 py-3 font-black hover:bg-slate-50">Open Queue</button>
          <button onClick={onNew} className="rounded-xl bg-[#D4A100] px-7 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">+ New Assisted Intake</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Market Intakes" value={records.length} sub={countryName} tone="blue" />
        <KpiCard label="Needs Clarification" value={clarify} sub="Action" tone="amber" />
        <KpiCard label="Ready for DICRI" value={ready} sub="Ready" tone="green" />
        <KpiCard label="Visible After Filters" value={filteredRecords.length} sub="Queue" tone="blue" />
      </div>
      <QueueTable rows={records.slice(0, 4)} onOpen={onOpen} />
      <Card title="Corridor Intake Mix" icon={Route}>
        <div className="grid grid-cols-3 gap-4">
          <MixCard icon={Route} label="Linear Corridors" value={`${Math.round((records.filter((r) => r.workAreaType === 'Linear Corridor').length / Math.max(records.length, 1)) * 100)}%`} />
          <MixCard icon={MapPin} label="Point Excavation" value={`${records.filter((r) => r.workAreaType === 'Point Excavation').length}`} />
          <MixCard icon={Layers} label="Area / Polygon Work" value={`${records.filter((r) => r.workAreaType === 'Area / Polygon Work').length}`} />
        </div>
      </Card>
    </section>
  );
}

function IntakesPage({ countryName, records, filters, setFilters, regions, categories, statuses, onOpen, onNew }) {
  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Intake Queue</h1>
          <p className="text-slate-600 mt-2 text-lg">Filtered queue for {countryName}. Open any record to populate the workflow.</p>
        </div>
        <button onClick={onNew} className="rounded-xl bg-[#D4A100] px-7 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">+ New Assisted Intake</button>
      </div>
      <QueueFilters filters={filters} setFilters={setFilters} regions={regions} categories={categories} statuses={statuses} />
      <QueueTable rows={records} onOpen={onOpen} large />
    </section>
  );
}

function QueueFilters({ filters, setFilters, regions, categories, statuses }) {
  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={filters.search} onChange={(event) => update('search', event.target.value)} className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Search ID, requester, location, permit, contact..." />
      </div>
      <Select value={filters.state} onChange={(value) => update('state', value)} options={['All', ...regions]} />
      <Select value={filters.category} onChange={(value) => update('category', value)} options={['All', ...categories]} />
      <Select value={filters.status} onChange={(value) => update('status', value)} options={['All', ...statuses]} />
    </div>
  );
}

function QueueTable({ rows, onOpen, large }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
          <tr>
            <th className="px-5 py-4">Intake ID</th>
            <th className="px-5 py-4">Requester</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Location</th>
            <th className="px-5 py-4">Permit</th>
            <th className="px-5 py-4">Completeness</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              <td className="px-5 py-5 font-bold">{row.id}</td>
              <td className="px-5 py-5"><div>{row.requester}</div><div className="text-xs text-slate-500">{row.contact}</div></td>
              <td className="px-5 py-5">{row.workCategory}</td>
              <td className="px-5 py-5">{row.state}, {row.country}<div className="text-xs text-slate-500">{row.location}</div></td>
              <td className="px-5 py-5 font-mono text-sm">{row.permitRef}</td>
              <td className="px-5 py-5"><Progress value={row.completeness} /></td>
              <td className="px-5 py-5"><StatusBadge status={row.status} /></td>
              <td className="px-5 py-5 text-right"><button onClick={() => onOpen(row, large ? 1 : 9)} className="rounded-lg border border-[#001B3D] px-4 py-2 font-black hover:bg-[#001B3D] hover:text-white">Open</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="p-8 text-center text-slate-500">No intake records match the current filters.</div>}
      {!large && rows[0] && <div className="p-5 flex justify-end"><button onClick={() => onOpen(rows[0], 9)} className="rounded-xl bg-[#D4A100] px-7 py-3 text-sm font-black text-white">Open Top Packet</button></div>}
    </div>
  );
}

function ApplicationsPage({ records, onOpen }) {
  return (
    <section className="space-y-6">
      <div><h1 className="text-4xl font-black tracking-tight">Applications</h1><p className="text-slate-600 mt-2 text-lg">Permit-linked applications converted into controlled DICRI intake packages.</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200"><h2 className="text-xl font-black">Application Workbench</h2></div>
        <div className="divide-y divide-slate-200">
          {records.map((record) => (
            <div key={record.id} className="p-5 grid grid-cols-7 gap-4 items-center hover:bg-slate-50">
              <div className="font-black">{record.packetId}</div>
              <div className="font-mono text-sm">{record.permitRef}</div>
              <div className="col-span-2"><div className="font-bold">{record.requester}</div><div className="text-sm text-slate-500">{record.location}</div></div>
              <div>{record.workCategory}</div>
              <StatusBadge status={record.status} />
              <div className="text-right"><button onClick={() => onOpen(record, 1)} className="rounded-lg border border-[#001B3D] px-4 py-2 font-black hover:bg-[#001B3D] hover:text-white">Open</button></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PermitsPage({ records, search, setSearch, onOpen }) {
  const results = records.filter((record) => [record.permitRef, record.requester, record.location, record.state, record.contact].join(' ').toLowerCase().includes(search.toLowerCase()));
  return (
    <section className="space-y-6">
      <div><h1 className="text-4xl font-black tracking-tight">Permits</h1><p className="text-slate-600 mt-2 text-lg">Search permits and populate the selected intake context.</p></div>
      <div className="grid grid-cols-3 gap-5">
        <Card title="Permit Search" icon={Search}>
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Permit, requester, corridor, state..." />
          <div className="mt-4 space-y-2">
            {results.slice(0, 4).map((record) => (
              <button key={record.id} onClick={() => onOpen(record, 1)} className="w-full rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50">
                <div className="font-black">{record.permitRef}</div>
                <div className="text-sm text-slate-600">{record.requester} / {record.state}</div>
              </button>
            ))}
          </div>
        </Card>
        <div className="col-span-2"><QueueTable rows={results} onOpen={(record) => onOpen(record, 1)} large /></div>
      </div>
    </section>
  );
}

function ReportsPage({ records, countryName }) {
  const ready = Math.round((records.filter((r) => r.status === 'Ready for Review').length / Math.max(records.length, 1)) * 100);
  const clarify = Math.round((records.filter((r) => r.status === 'Needs Clarification').length / Math.max(records.length, 1)) * 100);
  return (
    <section className="space-y-6">
      <div><h1 className="text-4xl font-black tracking-tight">Reports</h1><p className="text-slate-600 mt-2 text-lg">Operational reporting for {countryName} intake outcomes.</p></div>
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Market Intakes" value={records.length} sub={countryName} tone="blue" />
        <KpiCard label="Ready Rate" value={`${ready}%`} sub="Review" tone="green" />
        <KpiCard label="Clarification Rate" value={`${clarify}%`} sub="Action" tone="amber" />
        <KpiCard label="Owner High Risk" value={records.filter((r) => r.likelyOwners.some((o) => o.risk === 'High')).length} sub="Watch" tone="red" />
      </div>
      <Card title="Eligibility Outcome Mix" icon={Database}>
        <ReportBar label="Ready for DICRI Screening" value={ready || 1} tone="green" />
        <ReportBar label="Returned for Clarification" value={clarify || 1} tone="amber" />
        <ReportBar label="Draft / Incomplete" value={Math.max(100 - ready - clarify, 1)} tone="red" />
      </Card>
    </section>
  );
}

function IntakeWorkflow({ country, packet, step, nextStep, backStep, openDashboard, updatePacket, updateEligibility, toggleClassification, submitToDicri, setModal }) {
  const title = step === 10 ? 'Submitted to DICRI' : step === 9 ? 'Intake Completeness Review' : STEPS[step - 1];
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-4xl font-black tracking-tight">{title}</h1>
        <p className="text-slate-600 mt-2 text-lg">Selected record: <span className="font-black">{packet.id}</span> / {packet.requester}</p>
      </div>
      {step === 1 && <StepOne packet={packet} updatePacket={updatePacket} />}
      {step === 2 && <StepTwo packet={packet} />}
      {step === 3 && <StepThree packet={packet} updateEligibility={updateEligibility} />}
      {step === 4 && <StepFour packet={packet} toggleClassification={toggleClassification} />}
      {step === 5 && <StepFive country={country} packet={packet} updatePacket={updatePacket} setModal={setModal} />}
      {step === 6 && <StepSix packet={packet} updatePacket={updatePacket} />}
      {step === 7 && <StepSeven packet={packet} updatePacket={updatePacket} />}
      {step === 8 && <StepEight packet={packet} />}
      {step === 9 && <ReviewStep packet={packet} updatePacket={updatePacket} submitToDicri={submitToDicri} />}
      {step === 10 && <SubmittedStep packet={packet} openDashboard={openDashboard} />}
      {step < 10 && (
        <div className="fixed bottom-0 left-[260px] right-[340px] bg-white/95 backdrop-blur border-t border-slate-200 p-5 flex items-center justify-between z-40">
          <button onClick={step === 1 ? openDashboard : backStep} className="rounded-xl border border-[#001B3D] px-10 py-3 font-black hover:bg-slate-50">{step === 1 ? 'Cancel' : '← Back'}</button>
          <div className="flex gap-3">
            <button className="rounded-xl border border-[#001B3D] px-8 py-3 font-black flex items-center gap-2"><HardDrive size={16} /> Save Draft</button>
            {step === 9 && <button onClick={() => updatePacket({ status: 'Needs Clarification', completeness: Math.min(packet.completeness, 72) })} className="rounded-xl border border-red-500 px-8 py-3 font-black text-red-600">Return for Clarification</button>}
            <button onClick={nextStep} className="rounded-xl bg-[#D4A100] px-10 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">{step === 9 ? 'Submit to DICRI' : 'Continue'} →</button>
          </div>
        </div>
      )}
    </section>
  );
}

function StepOne({ packet, updatePacket }) {
  const marketRegion = `${packet.country} / ${packet.state}`;
  const updateOfficer = (name) => {
    const officer = OFFICERS.find((item) => item.name === name) || OFFICERS[0];
    updatePacket({ officer: officer.name, officerId: officer.id });
  };
  const updateMarket = (value) => {
    const [country, state] = value.split(' / ');
    updatePacket({ country, state });
  };
  return (
    <div className="space-y-4">
      <FormSection number="1" title="Intake Authority Details">
        <ControlledSelect label="Intake Agency / Office" value={packet.agency} options={withCurrentOption(INTAKE_AGENCIES, packet.agency)} onChange={(agency) => updatePacket({ agency })} />
        <ControlledSelect label="Intake Officer Name" value={packet.officer} options={withCurrentOption(OFFICERS.map((officer) => officer.name), packet.officer)} onChange={updateOfficer} />
        <Field label="Intake Officer ID" value={packet.officerId} />
        <ControlledSelect label="Request Channel" value={packet.channel} options={withCurrentOption(REQUEST_CHANNELS, packet.channel)} onChange={(channel) => updatePacket({ channel })} />
        <ControlledSelect label="Market / Region" value={marketRegion} options={withCurrentOption(MARKET_REGIONS, marketRegion)} onChange={updateMarket} />
        <Field label="Date Received" value="2026-05-12 10:42" />
      </FormSection>
      <FormSection number="2" title="Requester Details">
        <Field label="Requester Type" value={packet.requesterType} />
        <Field label="Company / Unit" value={packet.requester} />
        <Field label="Contact Person" value={packet.contact} />
        <Field label="Phone Number" value={packet.phone} />
        <Field label="Email Address" value={packet.email} />
        <Field label="Existing Permit Ref" value={packet.permitRef} />
      </FormSection>
    </div>
  );
}

function StepTwo({ packet }) {
  return (
    <FormSection number="2" title="Requester Details">
      <Field label="Requester Type" value={packet.requesterType} />
      <Field label="Company / Agency" value={packet.requester} />
      <Field label="Contact Person" value={packet.contact} />
      <Field label="Phone Number" value={packet.phone} />
      <Field label="Email Address" value={packet.email} />
      <Field label="Permit / Project Reference" value={packet.permitRef} />
      <div className="col-span-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-relaxed text-slate-700">
        <strong>Controlled identity capture:</strong> this record now drives all workflow screens, the side snapshot, owner context, and review scoring.
      </div>
    </FormSection>
  );
}

function StepThree({ packet, updateEligibility }) {
  const questions = [
    ['ground', 'Does this request involve ground disturbance?', ['Yes', 'No', 'Unsure']],
    ['row', 'Is the work inside or near public right of way?', ['Yes', 'No', 'Near ROW', 'Unsure']],
    ['corridor', 'Is this a linear corridor or point excavation?', ['Linear Corridor', 'Point Excavation', 'Area / Polygon Work']],
    ['depthKnown', 'Is excavation depth known?', ['Yes', 'No', 'Partial']],
    ['ownersNotified', 'Are utility owners already notified?', ['Yes', 'No', 'Partial']],
  ];
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="CBYD Eligibility Controls" icon={Shield}>
        <div className="space-y-4">
          {questions.map(([key, label, options]) => (
            <SegmentedQuestion key={key} label={label} value={packet.eligibility[key]} options={options} onChange={(value) => updateEligibility(key, value)} />
          ))}
        </div>
      </Card>
      <Card title="Eligibility Guidance" icon={Info}>
        {['Excavation, trenching, boring, road cutting, grading, piling, drainage, and utility works are screened.', 'Low depth does not remove CBYD obligation.', 'Unknown depth or owner notifications reduce completeness.', 'DICRI applies redacted corridor screening before owner notification.'].map((item) => <CheckLine key={item} label={item} />)}
      </Card>
    </div>
  );
}

function StepFour({ packet, toggleClassification }) {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Card title="Work Classification" icon={Layers} className="col-span-2">
        <div className="grid grid-cols-2 gap-4">
          {WORK_CLASSIFICATIONS.map((classification) => (
            <Selectable key={classification} title={classification} sub={classificationHint(classification)} selected={packet.classifications.includes(classification)} onClick={() => toggleClassification(classification)} />
          ))}
        </div>
      </Card>
      <Card title="Selected Scope" icon={ClipboardCheck}>
        {packet.classifications.map((item) => <CheckLine key={item} label={item} />)}
        <Metric label="Primary Work Category" value={packet.workCategory} />
      </Card>
    </div>
  );
}

function StepFive({ country, packet, updatePacket, setModal }) {
  return (
    <div className="grid grid-cols-5 gap-5">
      <Card title="Location Capture" icon={MapPin} className="col-span-3">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <ControlledSelect label="Work Area Type" value={packet.workAreaType} options={WORK_AREA_TYPES} onChange={(workAreaType) => updatePacket({ workAreaType, eligibility: { ...packet.eligibility, corridor: workAreaType } })} />
          <Field label="Country / Market" value={packet.country} />
          <Field label="State / Region" value={packet.state} />
          <EditableField label="Permit Reference" value={packet.permitRef} onChange={(permitRef) => updatePacket({ permitRef })} />
          <div className="col-span-2">
            <ControlledSelect label="Declared Corridor" value={packet.location} options={withCurrentOption(CORRIDOR_SUGGESTIONS, packet.location)} onChange={(location) => updatePacket({ location })} />
          </div>
        </div>
        <CorridorMap packet={packet} onOpen={() => setModal({ type: 'map', packet })} />
      </Card>
      <Card title="Likely Asset Owners" icon={Building2} className="col-span-2">
        <OwnerPanel owners={packet.likelyOwners} />
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 flex gap-3"><AlertTriangle size={18} />Illustrative screening map only; sensitive geometry is redacted.</div>
      </Card>
    </div>
  );
}

function StepSix({ packet, updatePacket }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <FormSection number="6" title="Methods & Dimensions" compact>
        <ControlledSelect label="Excavation Method" value={packet.method} options={['Open trenching', 'Micro-trenching', 'Directional boring', 'Vacuum excavation', 'Road cutting / milling', 'Piling / foundation excavation']} onChange={(value) => updatePacket({ method: value })} />
        <ControlledSelect label="Estimated Depth Range" value={packet.depthRange} options={['Under 0.3 m', '0.3 m - 0.6 m', '0.6 m - 1.2 m', '1.2 m - 2 m', 'Over 2 m']} onChange={(value) => updatePacket({ depthRange: value })} />
        <ControlledSelect label="Route Length Range" value={packet.lengthRange} options={['Under 100 m', '100 m - 500 m', '0.5 km - 1 km', '1 km - 3 km', 'Area / compound works']} onChange={(value) => updatePacket({ lengthRange: value })} />
        <ControlledSelect label="Surface Type" value={packet.surfaceType} options={['Asphalt roadway / shoulder', 'Paved arterial road', 'Urban road reserve', 'Road shoulder', 'Mixed paved and unpaved']} onChange={(value) => updatePacket({ surfaceType: value })} />
        <ControlledSelect label="Equipment Class" value={packet.equipmentClass} options={['Hand tools only', 'Light excavator + manual finish', 'Vacuum truck + hand tools', 'Micro-trencher', 'Road saw + milling machine', 'Piling rig + excavator']} onChange={(value) => updatePacket({ equipmentClass: value })} />
        <ControlledSelect label="Traffic Impact" value={packet.trafficImpact} options={['No traffic impact', 'Shoulder closure', 'Single-lane managed works', 'Partial carriageway closure', 'Localized diversion']} onChange={(value) => updatePacket({ trafficImpact: value })} />
        <ControlledSelect label="Planned Start Window" value={packet.startWindow} options={['Within 48 hours', 'Within 7 days', '8-14 days', '15-30 days']} onChange={(value) => updatePacket({ startWindow: value })} />
        <ControlledSelect label="Restoration Requirement" value={packet.restoration} options={['Same-day reinstatement', 'Temporary reinstatement then permanent patch', 'Permanent road reinstatement', 'Engineered reinstatement']} onChange={(value) => updatePacket({ restoration: value })} />
      </FormSection>
      <Card title="Method Risk Controls" icon={Shield}>
        <CheckLine label="Method and depth drive screening buffer." />
        <CheckLine label="Road impacts increase owner notification priority." />
        <CheckLine label="Restoration requirement supports regulator review." />
        <CheckLine label="Sensitive utility detail remains hidden from demo view." />
      </Card>
    </div>
  );
}

function StepSeven({ packet, updatePacket }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Project Schedule" icon={Calendar}>
        <EditableField label="Expected Start Date" value={packet.expectedStart} onChange={(value) => updatePacket({ expectedStart: value })} />
        <EditableField label="Expected Completion Date" value={packet.expectedCompletion} onChange={(value) => updatePacket({ expectedCompletion: value })} />
        <Field label="Start Window" value={packet.startWindow} />
        <Field label="Traffic Impact" value={packet.trafficImpact} />
      </Card>
      <Card title="SLA Implications" icon={Zap}>
        <Metric label="Owner Response SLA" value={packet.likelyOwners.some((owner) => owner.risk === 'High') ? 'Urgent' : '24h'} tone={packet.likelyOwners.some((owner) => owner.risk === 'High') ? 'red' : 'amber'} />
        <Metric label="Recommended Screening Priority" value={packet.status === 'Ready for Review' ? 'High' : 'Medium'} tone="amber" />
        <Metric label="Expected Completion" value={packet.expectedCompletion} />
      </Card>
    </div>
  );
}

function StepEight({ packet }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Documentation" icon={Upload}>
        <UploadRow label="Permit Application" file={`${packet.permitRef}.pdf`} done={packet.attachments >= 1} />
        <UploadRow label="Route Sketch / Map" file={packet.attachments >= 2 ? 'route-sketch.png' : 'Pending'} done={packet.attachments >= 2} warning={packet.attachments < 2} />
        <UploadRow label="Traffic Management Plan" file={packet.trafficImpact === 'No traffic impact' ? 'Optional' : 'traffic-plan.pdf'} done={packet.trafficImpact !== 'No traffic impact'} />
        <UploadRow label="Method Statement" file={packet.completeness > 80 ? 'method-statement.pdf' : 'Pending'} done={packet.completeness > 80} warning={packet.completeness <= 80} />
      </Card>
      <Card title="Packet Completeness" icon={ClipboardCheck}>
        <Metric label="Current Completeness" value={`${packet.completeness}%`} />
        <CheckLine label="Requester identity captured" />
        <CheckLine label="Ground disturbance decision captured" />
        <CheckLine label="Likely asset owners identified" />
        <CheckLine label="Schedule provided" />
      </Card>
    </div>
  );
}

function ReviewStep({ packet, updatePacket, submitToDicri }) {
  const ready = packet.completeness >= 80 && packet.eligibility.ground === 'Yes';
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Request Summary" icon={FileText}>
        <SummaryRow label="Requester" value={packet.requester} />
        <SummaryRow label="Permit Ref" value={packet.permitRef} />
        <SummaryRow label="Work Category" value={packet.classifications.join(', ')} />
        <SummaryRow label="Location" value={packet.location} />
        <SummaryRow label="Method" value={packet.method} />
        <SummaryRow label="Depth" value={packet.depthRange} />
        <SummaryRow label="Start Date" value={packet.expectedStart} />
      </Card>
      <div className="space-y-5">
        <Card title="Intake Completeness" icon={ClipboardCheck}>
          <div className="text-6xl font-black mb-4">{packet.completeness}%</div>
          <Progress value={packet.completeness} wide />
          <div className={`mt-5 rounded-xl border p-4 text-sm ${ready ? 'border-green-200 bg-green-50 text-green-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}><strong>{ready ? 'Ready for DICRI' : 'Clarification Recommended'}</strong><br />{packet.warning}</div>
        </Card>
        <Card title="Submission Decision" icon={Shield}>
          <button onClick={submitToDicri} className="w-full rounded-xl bg-[#0B7F3A] px-5 py-3 font-black text-white mb-3">Submit to DICRI</button>
          <button onClick={() => updatePacket({ status: 'Needs Clarification', completeness: Math.min(packet.completeness, 72) })} className="w-full rounded-xl border border-amber-500 px-5 py-3 font-black text-amber-700 mb-3">Return for Clarification</button>
          <button onClick={() => updatePacket({ status: 'Not CBYD', completeness: packet.completeness })} className="w-full rounded-xl border border-red-500 px-5 py-3 font-black text-red-700">Mark Not CBYD</button>
        </Card>
      </div>
      <Card title="Intake Checklist" icon={CheckCircle2} className="col-span-2">
        {['Ground disturbance decision captured', 'Requester contact captured', 'Work location provided', 'Likely asset owners identified', 'Schedule provided', 'Controlled handoff decision available'].map((label) => <ChecklistRow key={label} label={label} />)}
      </Card>
    </div>
  );
}

function SubmittedStep({ packet, openDashboard }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-[#0B7F3A] text-white flex items-center justify-center"><Check size={48} /></div>
          <div><div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-black uppercase text-green-800 mb-2">Success</div><h2 className="text-3xl font-black text-[#0B7F3A]">Intake Packet Submitted</h2><p className="text-slate-600 mt-1">The selected request has been handed off to DICRI Operations.</p></div>
        </div>
        <div className="text-right"><div className="text-xs font-black uppercase text-slate-500">Packet Reference</div><div className="text-4xl font-black text-[#0B7F3A]">{packet.packetId}</div></div>
      </div>
      <Card title="Submitted Package Status" icon={ClipboardCheck}>
        <div className="grid grid-cols-3 gap-4">
          <Metric label="Status" value="Submitted to DICRI" tone="green" />
          <Metric label="Intake Completeness" value="100%" tone="green" />
          <Metric label="Packet Reference" value={packet.packetId} />
        </div>
      </Card>
      <HandoffTimeline />
      <div className="flex justify-end gap-3 pt-2">
        <button className="rounded-xl border border-[#001B3D] px-8 py-3 font-black"><Download size={16} className="inline mr-2" />Download / Print Summary</button>
        <button onClick={openDashboard} className="rounded-xl bg-[#D4A100] px-8 py-3 font-black text-white">Return to Dashboard</button>
      </div>
    </div>
  );
}

function CorridorMap({ packet, onOpen }) {
  return (
    <button onClick={onOpen} className="h-[360px] w-full rounded-2xl border border-slate-200 bg-[#071A33] overflow-hidden relative text-left">
      <svg viewBox="0 0 900 420" className="absolute inset-0 h-full w-full">
        <rect width="900" height="420" fill="#071A33" />
        {[70, 140, 210, 280, 350].map((y) => <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="rgba(255,255,255,0.06)" />)}
        {[120, 260, 420, 580, 740].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="420" stroke="rgba(255,255,255,0.06)" />)}
        <path d="M55 210 H850" stroke="rgba(148,163,184,0.18)" strokeWidth="42" />
        <path d="M170 30 V390" stroke="rgba(148,163,184,0.16)" strokeWidth="38" />
        <path d="M55 320 C170 220 270 245 380 190 S630 110 845 185" fill="none" stroke="rgba(34,197,94,0.22)" strokeWidth="44" strokeLinecap="round" />
        <path d="M55 320 C170 220 270 245 380 190 S630 110 845 185" fill="none" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" />
        <path d="M170 45 V380" stroke="#3B82F6" strokeWidth="9" strokeLinecap="round" strokeDasharray="14 12" />
        <path d="M70 110 H820" stroke="#A855F7" strokeWidth="7" strokeLinecap="round" strokeDasharray="10 12" />
        <path d="M250 65 V365" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" strokeDasharray="10 12" />
        <path d="M640 60 V365" stroke="#06B6D4" strokeWidth="7" strokeLinecap="round" strokeDasharray="10 12" />
        <circle cx="510" cy="210" r="92" fill="#EF4444" fillOpacity="0.10" stroke="#EF4444" strokeWidth="3" strokeDasharray="9 8" />
        <circle cx="510" cy="210" r="8" fill="#EF4444" stroke="white" strokeWidth="3" />
        <text x="70" y="190" fill="rgba(255,255,255,0.58)" fontSize="13" fontWeight="900" letterSpacing="2">PRIMARY ROAD CORRIDOR</text>
        <text x="185" y="80" fill="rgba(255,255,255,0.48)" fontSize="12" fontWeight="900" letterSpacing="2" transform="rotate(90 185 80)">CROSS STREET</text>
        <text x="545" y="122" fill="#FCA5A5" fontSize="12" fontWeight="900" letterSpacing="2">CONFLICT SCREENING ZONE</text>
        <text x="538" y="240" fill="#FCA5A5" fontSize="12" fontWeight="900" letterSpacing="2">{packet.permitRef}</text>
        {[
          ['Water', 170, 308, '#3B82F6'],
          ['Sewer', 286, 232, '#A855F7'],
          ['Gas', 510, 210, '#F59E0B'],
          ['Power', 640, 158, '#06B6D4'],
          ['Fiber', 742, 178, '#22C55E'],
        ].map(([label, x, y, color]) => (
          <g key={label}>
            <circle cx={x} cy={y} r="10" fill={color} stroke="#071A33" strokeWidth="4" />
            <text x={x + 14} y={y + 4} fill="white" fontSize="10" fontWeight="900" letterSpacing="1.5">{label}</text>
          </g>
        ))}
        <circle cx="55" cy="320" r="8" fill="#22C55E" stroke="#071A33" strokeWidth="3" />
        <circle cx="845" cy="185" r="8" fill="#22C55E" stroke="#071A33" strokeWidth="3" />
        <text x="38" y="394" fill="#CBD5E1" fontSize="11" fontWeight="900" letterSpacing="2">ILLUSTRATIVE SCREENING MAP — SENSITIVE GEOMETRY REDACTED</text>
      </svg>
      <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-[#0B1F3A]/90 p-5 text-white shadow-xl max-w-xs">
        <div className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2"><Map size={17} className="text-blue-400" /> Corridor Screening</div>
        <p className="text-[11px] uppercase tracking-widest text-blue-100/70 leading-relaxed">{packet.id} / {packet.workAreaType} / {packet.state}</p>
      </div>
    </button>
  );
}

function OwnerPanel({ owners }) {
  return (
    <div className="space-y-3">
      {owners.map((owner) => (
        <div key={`${owner.name}-${owner.type}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div><div className="font-black">{owner.name}</div><div className="text-sm text-slate-600">{owner.type}</div></div>
            <StatusBadge status={owner.risk} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div><span className="font-black text-slate-500">Response</span><div>{owner.response}</div></div>
            <div><span className="font-black text-slate-500">SLA</span><div>{owner.sla}</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HandoffTimeline() {
  const items = ['Request Received', 'Intake Reviewed', 'Packet Created', 'Submitted to DICRI', 'Corridor Creation', 'Asset Screening', 'Response Issued'];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        {items.map((item, idx) => {
          const done = idx < 4;
          return (
            <div key={item} className="flex-1 flex items-center">
              <div className="flex flex-col items-center text-center w-full">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center font-black ${done ? 'bg-[#0B7F3A] text-white' : 'bg-slate-200 text-slate-400'}`}>{done ? <Check size={18} /> : idx + 1}</div>
                <div className="mt-2 text-xs font-black leading-tight">{item}</div>
                <div className="text-xs text-slate-500">{done ? 'Demo now' : 'Pending'}</div>
              </div>
              {idx < items.length - 1 && <div className={`h-1 flex-1 ${done ? 'bg-[#0B7F3A]' : 'bg-slate-300'}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailModal({ modal, close }) {
  const packet = modal.packet || INTAKES.find((record) => record.id === modal.notification?.intakeId);
  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 bg-[#062247] text-white flex items-start justify-between">
          <div><p className="text-xs font-black uppercase tracking-widest text-blue-100/70">{modal.type === 'notification' ? 'Notification Detail' : 'Screening Map'}</p><h2 className="text-2xl font-black mt-1">{modal.notification?.title || packet?.id}</h2></div>
          <button onClick={close} className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"><X size={18} /></button>
        </div>
        <div className="p-5 space-y-4">
          {modal.notification && <p className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-900">{modal.notification.body}</p>}
          {packet && (
            <div className="grid grid-cols-2 gap-4">
              <SummaryRow label="Intake" value={packet.id} />
              <SummaryRow label="Requester" value={packet.requester} />
              <SummaryRow label="Permit" value={packet.permitRef} />
              <SummaryRow label="Market" value={`${packet.country} / ${packet.state}`} />
              <SummaryRow label="Status" value={packet.status} />
              <SummaryRow label="Warning" value={packet.warning} />
            </div>
          )}
          {modal.type === 'map' && packet && <CorridorMap packet={packet} onOpen={() => {}} />}
        </div>
      </div>
    </div>
  );
}

function FormSection({ number, title, children, compact }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${compact ? '' : 'space-y-5'}`}><h2 className="text-xl font-black mb-4 flex items-center gap-3"><span className="h-8 w-8 rounded-lg bg-[#062247] text-white flex items-center justify-center text-sm">{number}</span>{title}</h2><div className="grid grid-cols-3 gap-4">{children}</div></div>;
}

function Card({ title, icon: Icon, children, className = '' }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}><h2 className="text-xl font-black mb-5 flex items-center gap-2"><Icon size={20} /> {title}</h2>{children}</div>;
}

function Field({ label, value, className = '' }) {
  return <div className={className}><label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</label><input value={value || ''} readOnly className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium outline-none" /></div>;
}

function EditableField({ label, value, onChange }) {
  return <div className="mb-4"><label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</label><input value={value} onChange={(event) => onChange(event.target.value)} className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-100" /></div>;
}

function ControlledSelect({ label, value, options, onChange }) {
  return <div><label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</label><select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-100">{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}

function Select({ value, onChange, options }) {
  return <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100">{options.map((option) => <option key={option}>{option}</option>)}</select>;
}

function SegmentedQuestion({ label, value, options, onChange }) {
  return (
    <div>
      <div className="font-black mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => <button key={option} onClick={() => onChange(option)} className={`rounded-xl border px-4 py-2 text-sm font-black ${value === option ? 'border-[#0B7F3A] bg-green-50 text-green-800' : 'border-slate-200 bg-white text-slate-600'}`}>{option}</button>)}
      </div>
    </div>
  );
}

function Selectable({ title, sub, selected, onClick }) {
  return <button onClick={onClick} className={`rounded-xl border p-5 text-left ${selected ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}`}><div className="flex items-center justify-between"><h3 className="font-black">{title}</h3>{selected && <CheckCircle2 className="text-green-700" size={20} />}</div><p className="text-sm text-slate-600 mt-2">{sub}</p></button>;
}

function ReportBar({ label, value, tone }) {
  const color = tone === 'green' ? 'bg-green-600' : tone === 'red' ? 'bg-red-500' : 'bg-[#D4A100]';
  return <div className="py-4 border-b border-slate-200 last:border-0"><div className="flex items-center justify-between mb-2"><span className="font-bold">{label}</span><span className="font-black">{value}%</span></div><div className="h-2 rounded-full bg-slate-200 overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${value}%` }} /></div></div>;
}

function KpiCard({ label, value, sub, tone }) {
  const toneClass = tone === 'green' ? 'text-green-700 bg-green-50 border-green-200' : tone === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-200' : tone === 'red' ? 'text-red-700 bg-red-50 border-red-200' : 'text-blue-700 bg-blue-50 border-blue-200';
  return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"><p className="text-base mb-3">{label}</p><div className="text-4xl font-black mb-2">{value}</div><span className={`inline-block rounded-lg border px-3 py-1 text-xs font-black ${toneClass}`}>{sub}</span></div>;
}

function MixCard({ icon: Icon, label, value }) {
  return <div className="rounded-xl bg-slate-50 border border-slate-200 p-5"><Icon size={22} className="text-blue-600 mb-4" /><div className="text-3xl font-black">{value}</div><div className="text-sm text-slate-600 mt-1">{label}</div></div>;
}

function Progress({ value, wide }) {
  return <div className={wide ? 'w-full' : 'w-32'}><div className="mb-1 text-xs font-black">{value}%</div><div className="h-2 rounded-full bg-slate-200 overflow-hidden"><div className="h-full bg-[#D4A100]" style={{ width: `${value}%` }} /></div></div>;
}

function StatusBadge({ status }) {
  const cls = status === 'Ready for Review' || status === 'Low' ? 'bg-green-100 text-green-700' : status === 'Needs Clarification' || status === 'Draft Intake Request' || status === 'Medium' ? 'bg-amber-100 text-amber-700' : status === 'High' || status === 'Not CBYD' ? 'bg-red-100 text-red-700' : status === 'Submitted to DICRI' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700';
  return <span className={`rounded-lg px-3 py-1 text-xs font-black ${cls}`}>{status}</span>;
}

function SnapshotItem({ label, value, badge, tone }) {
  const cls = tone === 'green' ? 'bg-green-100 text-green-700' : tone === 'red' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700';
  return <div className="border-b border-slate-200 pb-4"><div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</div>{badge ? <span className={`rounded-lg px-3 py-1 text-xs font-black ${cls}`}>{value}</span> : <div className="text-base font-black leading-snug">{value}</div>}</div>;
}

function CheckLine({ label }) {
  return <div className="flex items-center gap-3 border-b border-slate-200 py-3 last:border-0"><span className="h-5 w-5 rounded bg-green-100 text-green-700 flex items-center justify-center"><Check size={15} /></span><span>{label}</span></div>;
}

function Metric({ label, value, tone }) {
  const color = tone === 'red' ? 'text-red-700 bg-red-50 border-red-200' : tone === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-blue-700 bg-blue-50 border-blue-200';
  return <div className="flex items-center justify-between border-b border-slate-200 py-4"><span className="font-bold text-slate-600">{label}</span><span className={`rounded-lg border px-3 py-1 font-black ${color}`}>{value}</span></div>;
}

function UploadRow({ label, file, done, warning }) {
  return <div className="flex items-center justify-between border-b border-slate-200 py-4"><div><div className="font-black">{label}</div><div className="text-sm text-slate-600">{file}</div></div><span className={`rounded-lg px-3 py-1 text-xs font-black ${done ? 'bg-green-100 text-green-700' : warning ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{done ? 'Attached' : warning ? 'Pending' : 'Optional'}</span></div>;
}

function SummaryRow({ label, value }) {
  return <div className="grid grid-cols-2 gap-4 border-b border-slate-200 py-3"><div className="font-black">{label}</div><div>{value}</div></div>;
}

function ChecklistRow({ label }) {
  return <div className="flex items-center justify-between border-b border-slate-200 py-3"><div className="flex items-center gap-3"><CheckCircle2 className="text-green-700" size={20} /><span>{label}</span></div><span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-black text-green-700">Completed</span></div>;
}

function filterRecords(records, filters) {
  const search = filters.search.toLowerCase();
  return records.filter((record) => {
    const searchOk = !search || [record.id, record.requester, record.location, record.permitRef, record.contact].join(' ').toLowerCase().includes(search);
    const stateOk = filters.state === 'All' || record.state === filters.state;
    const categoryOk = filters.category === 'All' || record.workCategory === filters.category;
    const statusOk = filters.status === 'All' || record.status === filters.status;
    return searchOk && stateOk && categoryOk && statusOk;
  });
}

function withCurrentOption(options, current) {
  return current && !options.includes(current) ? [current, ...options] : options;
}

function withWorkflowCompleteness(packet, mode, step) {
  if (mode !== 'intake') return packet;
  const completeness = packet.status === 'Submitted to DICRI' || step === 10 ? 100 : STEP_COMPLETENESS[step] || packet.completeness;
  const status = step === 10 ? 'Submitted to DICRI' : packet.status;
  return { ...packet, completeness, status };
}

function scoreCompleteness(packet, eligibility) {
  let score = STEP_COMPLETENESS[3];
  if (eligibility.ground === 'No') score -= 15;
  if (eligibility.depthKnown === 'No') score -= 8;
  if (eligibility.ownersNotified === 'No') score -= 8;
  if (eligibility.row === 'Unsure') score -= 5;
  if (eligibility.ground === 'Yes' && eligibility.depthKnown === 'Yes') score += 4;
  return Math.max(20, Math.min(STEP_COMPLETENESS[8], score));
}

function classificationHint(classification) {
  const hints = {
    'Drainage Construction': 'Culvert, drainage, trenching, ditch works',
    'Road Rehabilitation': 'Road cut, milling, resurfacing, pavement works',
    'Utility Duct Installation': 'Conduit or protected utility corridor works',
    'Foundation / Piling': 'Ground penetrating support or piling works',
    'Fiber Deployment': 'Telecom route, duct, access chamber activity',
    'Water / Sewer Works': 'Waterline, sewer, outfall, chamber activity',
    'Power Works': 'Feeder, service, underground power activity',
  };
  return hints[classification];
}
