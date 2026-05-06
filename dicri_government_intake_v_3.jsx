import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Database,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Globe2,
  HardDrive,
  History,
  Info,
  Layers,
  Lock,
  Mail,
  Map,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Route,
  Search,
  Send,
  Shield,
  Upload,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react';

const COUNTRIES = {
  Nigeria: {
    name: 'Nigeria',
    short: 'NG',
    agency: 'Federal Republic',
    subAgency: 'Infrastructure Dept',
    flag: ['#008751', '#FFFFFF', '#008751'],
    emblem: '♛',
    region: 'Port Harcourt, Rivers',
    corridor: 'Garrison Junction → Elekahia Road',
  },
  Kenya: {
    name: 'Kenya',
    short: 'KE',
    agency: 'Republic of Kenya',
    subAgency: 'Infrastructure Authority',
    flag: ['#000000', '#BB0000', '#006600'],
    emblem: '⚖',
    region: 'Nairobi County',
    corridor: 'Waiyaki Way → Westlands',
  },
  Ghana: {
    name: 'Ghana',
    short: 'GH',
    agency: 'Republic of Ghana',
    subAgency: 'Works & Housing',
    flag: ['#CE1126', '#FCD116', '#006B3F'],
    emblem: '★',
    region: 'Accra Metro',
    corridor: 'Ring Road → Osu Corridor',
  },
  Egypt: {
    name: 'Egypt',
    short: 'EG',
    agency: 'Arab Republic of Egypt',
    subAgency: 'Digital Infrastructure',
    flag: ['#CE1126', '#FFFFFF', '#000000'],
    emblem: '◆',
    region: 'Greater Cairo',
    corridor: 'Nasr City → New Cairo',
  },
};

const DEFAULT_PACKET = {
  id: 'CBYD-INT-2026-00481',
  intakeId: 'INT-042',
  requester: 'Delta Civil Works Ltd.',
  requesterType: 'Contractor',
  contact: 'Emeka Nwosu',
  phone: '+234 802 123 4567',
  email: 'emeka.nwosu@deltacivil.com',
  agency: 'State Permit Office',
  officer: 'R. Okafor',
  officerId: 'INT-042',
  channel: 'Walk-in',
  workCategory: 'Drainage Construction',
  workAreaType: 'Linear Route',
  method: 'Open trenching',
  depth: '1.0 m · Low',
  schedule: '14 May 2026 → 21 May 2026',
  location: 'Garrison Junction to Elekahia Road Intersection, Port Harcourt',
  completeness: 87,
  warning: 'Side of road unknown for corridor definition.',
  status: 'Draft Intake Request',
  attachments: 2,
};

const QUEUE = [
  { id: 'INT-042', requester: 'Delta Civil Works Ltd.', category: 'Drainage Construction', location: 'Port Harcourt, Rivers', channel: 'Assisted Intake', completeness: 72, status: 'Draft Intake Request' },
  { id: 'INT-041', requester: 'Niger Drainage Services', category: 'Culvert Installation', location: 'Asaba, Delta', channel: 'Public Portal', completeness: 48, status: 'Needs Clarification' },
  { id: 'INT-040', requester: 'City Roads Unit', category: 'Road Rehab', location: 'Benin City, Edo', channel: 'Assisted Intake', completeness: 86, status: 'Ready for Review' },
  { id: 'INT-039', requester: 'SafeTrench Ltd.', category: 'Utility Duct', location: 'Kaduna, Kaduna', channel: 'Public Portal', completeness: 65, status: 'Needs Clarification' },
  { id: 'INT-038', requester: 'Northern Gas Networks', category: 'Pipeline Installation', location: 'Kano, Kano', channel: 'Assisted Intake', completeness: 90, status: 'Not CBYD' },
];

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

function App() {
  const [countryName, setCountryName] = useState('Nigeria');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mode, setMode] = useState('dashboard');
  const [step, setStep] = useState(1);
  const [decision, setDecision] = useState('submit');
  const [selectedPacket, setSelectedPacket] = useState(DEFAULT_PACKET);

  const country = COUNTRIES[countryName];

  const openDashboard = () => {
    setMode('dashboard');
    setActiveTab('dashboard');
    setStep(1);
  };

  const openNewIntake = () => {
    setMode('intake');
    setActiveTab('intakes');
    setStep(1);
    setSelectedPacket({ ...DEFAULT_PACKET, status: 'Draft Intake Request' });
  };

  const openReview = () => {
    setMode('intake');
    setActiveTab('intakes');
    setStep(9);
  };

  const submitToDicri = () => {
    setSelectedPacket((p) => ({ ...p, status: 'submitted_to_dicri' }));
    setStep(10);
  };

  const nextStep = () => {
    if (step >= 9) {
      submitToDicri();
    } else {
      setStep((s) => Math.min(s + 1, 9));
    }
  };

  const backStep = () => setStep((s) => Math.max(s - 1, 1));

  const renderMain = () => {
    if (mode === 'intake') {
      return (
        <IntakeWorkflow
          country={country}
          packet={selectedPacket}
          step={step}
          decision={decision}
          setDecision={setDecision}
          nextStep={nextStep}
          backStep={backStep}
          submitToDicri={submitToDicri}
          openDashboard={openDashboard}
          openReview={openReview}
        />
      );
    }

    if (activeTab === 'intakes') {
      return <IntakesPage openNewIntake={openNewIntake} openReview={openReview} />;
    }
    if (activeTab === 'applications') {
      return <ApplicationsPage openReview={openReview} />;
    }
    if (activeTab === 'permits') {
      return <PermitsPage openReview={openReview} />;
    }
    if (activeTab === 'reports') {
      return <ReportsPage />;
    }
    return <Dashboard country={country} openNewIntake={openNewIntake} openReview={openReview} setActiveTab={setActiveTab} />;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-[#001B3D] antialiased">
      <TopNav
        country={country}
        countryName={countryName}
        setCountryName={setCountryName}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setMode('dashboard');
          setActiveTab(tab);
        }}
        openDashboard={openDashboard}
      />
      <div className="grid grid-cols-[260px_1fr_340px] min-h-[calc(100vh-76px)]">
        <SideRail step={mode === 'intake' ? step : 1} onStepClick={(n) => { setMode('intake'); setActiveTab('intakes'); setStep(n); }} />
        <main className="min-w-0 p-8 pb-24">{renderMain()}</main>
        <SnapshotPanel packet={selectedPacket} mode={mode} step={step} />
      </div>
    </div>
  );
}

function TopNav({ country, countryName, setCountryName, activeTab, setActiveTab, openDashboard }) {
  const tabs = [
    ['dashboard', 'Dashboard'],
    ['intakes', 'Intakes'],
    ['applications', 'Applications'],
    ['permits', 'Permits'],
    ['reports', 'Reports'],
  ];

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
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative h-full px-3 text-sm font-black transition-colors ${activeTab === id ? 'text-white' : 'text-blue-100/70 hover:text-white'}`}
            >
              {label}
              {activeTab === id && <span className="absolute left-0 right-0 bottom-0 h-1 bg-[#D4A100] rounded-t-full shadow-[0_-6px_18px_rgba(212,161,0,0.45)]" />}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 min-w-[360px] justify-end">
          <div className="relative group">
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-widest hover:bg-white/10">
              <Globe2 size={14} /> {country.short} <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-11 hidden group-hover:block w-44 rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl">
              {Object.keys(COUNTRIES).map((name) => (
                <button key={name} onClick={() => setCountryName(name)} className="w-full rounded-xl px-3 py-2 text-left text-xs font-black hover:bg-slate-100">
                  {name}
                </button>
              ))}
            </div>
          </div>
          <button className="relative p-2 text-blue-100 hover:text-white">
            <Bell size={21} />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#D4A100] text-[11px] font-black text-white flex items-center justify-center">3</span>
          </button>
          <div className="h-10 w-10 rounded-full bg-white text-[#062247] flex items-center justify-center font-black shadow-lg">RO</div>
        </div>
      </div>
    </header>
  );
}

function GovernmentMark({ country }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-inner">
        <span className="text-xl">{country.emblem}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-12 overflow-hidden rounded-sm border border-white/30 shadow-sm flex">
          {country.flag.map((color, idx) => <div key={idx} className="flex-1" style={{ backgroundColor: color }} />)}
        </div>
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
                <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 text-sm font-black transition-all ${complete ? 'bg-[#0B7F3A] border-[#0B7F3A] text-white' : active ? 'bg-white border-[#D4A100] text-[#062247] shadow-md' : 'bg-[#062247] border-[#062247] text-white'}`}>
                  {n === 10 ? <Check size={18} /> : complete && n < 10 ? <Check size={18} /> : n}
                </div>
                {n < STEPS.length && <div className="h-7 w-px bg-slate-300" />}
              </div>
              <div className={`text-sm font-black ${active ? 'text-[#001B3D]' : 'text-[#001B3D]'} leading-tight`}>{label}</div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function SnapshotPanel({ packet, mode, step }) {
  const status = step === 10 ? 'submitted_to_dicri' : packet.status;
  return (
    <aside className="bg-white border-l border-slate-200 p-7">
      <h3 className="flex items-center gap-2 text-lg font-black mb-8"><FileText size={19} /> Intake Snapshot</h3>
      <div className="space-y-6">
        <SnapshotItem label="Submission Type" value="Assisted Intake" />
        <SnapshotItem label="Status" value={status} badge tone={status === 'submitted_to_dicri' ? 'green' : 'amber'} />
        <SnapshotItem label="Ground Disturbance" value="Confirmed" badge tone="green" />
        <SnapshotItem label="Work Area Type" value={packet.workAreaType} />
        <div className="border-t border-slate-200 pt-6">
          <div className="flex justify-between text-xs font-black uppercase text-slate-500 mb-2"><span>Intake Completeness</span><span className="text-[#001B3D]">{packet.completeness}%</span></div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-[#D4A100]" style={{ width: `${packet.completeness}%` }} /></div>
        </div>
        <SnapshotItem label="Warning" value="Side of road unknown" badge tone="amber" />
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <h4 className="font-black mb-3">Presenter Talk Track</h4>
          <p className="text-sm leading-relaxed text-slate-700">{mode === 'dashboard' ? 'Start here to show how government or permit staff control the first gate. DICRI does not receive every random public request.' : step === 10 ? 'This confirms the PPP handoff: intake is complete, and DICRI operations now creates the corridor and runs screening.' : 'This controlled intake standardizes messy field requests before DICRI corridor screening begins.'}</p>
        </div>
      </div>
    </aside>
  );
}

function Dashboard({ openNewIntake, openReview, setActiveTab }) {
  return (
    <section className="space-y-7">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Authorized Intake Dashboard</h1>
          <p className="text-slate-600 mt-2 text-lg">Incoming excavation requests awaiting pre-screening</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setActiveTab('intakes')} className="rounded-xl border border-[#001B3D] bg-white px-7 py-3 font-black hover:bg-slate-50">Open Queue</button>
          <button onClick={openNewIntake} className="rounded-xl bg-[#D4A100] px-7 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">+ New Assisted Intake</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="New Requests Today" value="18" sub="+12%" tone="blue" />
        <KpiCard label="Needs Clarification" value="6" sub="Action" tone="amber" />
        <KpiCard label="Ready for DICRI" value="9" sub="Ready" tone="green" />
        <KpiCard label="Redirected Not CBYD" value="3" sub="Filtered" tone="red" />
      </div>

      <QueueTable rows={QUEUE} openReview={openReview} />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black">Corridor Intake Mix</h2>
          <button className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2"><Filter size={14} /> Last 30 days</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <MixCard icon={Route} label="Linear Route Requests" value="61%" />
          <MixCard icon={MapPin} label="Point / Spot Excavation" value="24%" />
          <MixCard icon={Layers} label="Area / Polygon Work" value="15%" />
        </div>
      </div>
    </section>
  );
}

function IntakesPage({ openNewIntake, openReview }) {
  return (
    <section className="space-y-7">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Intake Queue</h1>
          <p className="text-slate-600 mt-2 text-lg">Review, filter, and route assisted and public requests.</p>
        </div>
        <button onClick={openNewIntake} className="rounded-xl bg-[#D4A100] px-7 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">+ New Assisted Intake</button>
      </div>
      <QueueTable rows={QUEUE} openReview={openReview} large />
    </section>
  );
}

function ApplicationsPage({ openReview }) {
  const apps = [
    { id: 'APP-2026-1182', permit: 'PHT-DR-2218', applicant: 'Delta Civil Works Ltd.', corridor: 'Garrison → Elekahia', type: 'Drainage Construction', state: 'Awaiting DICRI Screening', priority: 'High', linked: 'INT-042' },
    { id: 'APP-2026-1179', permit: 'BEN-RD-0841', applicant: 'City Roads Unit', corridor: 'Ring Road Rehab', type: 'Road Rehabilitation', state: 'Ready for Review', priority: 'Medium', linked: 'INT-040' },
    { id: 'APP-2026-1175', permit: 'KAD-UD-4490', applicant: 'SafeTrench Ltd.', corridor: 'Kaduna Utility Duct', type: 'Utility Duct', state: 'Needs Clarification', priority: 'Medium', linked: 'INT-039' },
  ];
  return (
    <section className="space-y-7">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Applications</h1>
        <p className="text-slate-600 mt-2 text-lg">Permit-linked applications converted into controlled DICRI intake packages.</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Open Applications" value="31" sub="Active" tone="blue" />
        <KpiCard label="Linked to Intake" value="24" sub="77%" tone="green" />
        <KpiCard label="Needs Clarification" value="5" sub="Action" tone="amber" />
        <KpiCard label="Not CBYD" value="2" sub="Filtered" tone="red" />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-black">Application Workbench</h2>
          <div className="flex gap-3"><select className="rounded-lg border border-slate-300 px-4 py-3"><option>All priorities</option><option>High</option><option>Medium</option></select><select className="rounded-lg border border-slate-300 px-4 py-3"><option>All states</option><option>Awaiting DICRI Screening</option><option>Needs Clarification</option></select></div>
        </div>
        <div className="divide-y divide-slate-200">
          {apps.map((app) => (
            <div key={app.id} className="p-5 grid grid-cols-7 gap-4 items-center hover:bg-slate-50">
              <div className="col-span-1 font-black">{app.id}</div>
              <div className="col-span-1 text-sm"><div className="font-black">{app.permit}</div><div className="text-slate-500">Permit Ref</div></div>
              <div className="col-span-2"><div className="font-bold">{app.applicant}</div><div className="text-sm text-slate-500">{app.corridor}</div></div>
              <div className="col-span-1 text-sm">{app.type}</div>
              <div className="col-span-1"><StatusBadge status={app.state} /></div>
              <div className="col-span-1 text-right"><button onClick={openReview} className="rounded-lg border border-[#001B3D] px-4 py-2 font-black hover:bg-[#001B3D] hover:text-white">Open</button></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PermitsPage({ openReview }) {
  const permits = [
    { id: 'PHT-DR-2218', authority: 'Rivers State Permit Office', applicant: 'Delta Civil Works Ltd.', location: 'Port Harcourt, Rivers', status: 'Screening Required', age: '2 days' },
    { id: 'BEN-RD-0841', authority: 'City Roads Unit', applicant: 'City Roads Unit', location: 'Benin City, Edo', status: 'Ready for Review', age: '1 day' },
    { id: 'ASA-CV-1190', authority: 'Delta Permit Desk', applicant: 'Niger Drainage Services', location: 'Asaba, Delta', status: 'Needs Clarification', age: '4 days' },
  ];
  return (
    <section className="space-y-7">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Permits</h1>
        <p className="text-slate-600 mt-2 text-lg">Government permit references, route requests, and excavation authorizations.</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Card title="Permit Search" icon={Search} className="col-span-1">
          <Field label="Permit Reference" value="PHT-DR-2218" />
          <Field label="Issuing Authority" value="Rivers State Permit Office" type="select" options={['Rivers State Permit Office','Delta Permit Desk','City Roads Unit']} />
          <Field label="Permit Status" value="Screening Required" type="select" options={['Screening Required','Ready for Review','Needs Clarification']} />
          <button className="mt-4 w-full rounded-xl bg-[#062247] px-5 py-3 font-black text-white">Run Permit Lookup</button>
        </Card>
        <div className="col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between"><h2 className="text-xl font-black">Permit Register</h2><button className="rounded-lg border border-slate-300 px-4 py-2 font-black"><Download size={15} className="inline mr-2" />Export</button></div>
          <div className="divide-y divide-slate-200">
            {permits.map((p) => (
              <div key={p.id} className="p-5 grid grid-cols-6 gap-4 items-center hover:bg-slate-50">
                <div className="font-black">{p.id}</div>
                <div className="col-span-2"><div className="font-bold">{p.authority}</div><div className="text-sm text-slate-500">{p.applicant}</div></div>
                <div className="text-sm">{p.location}</div>
                <div><StatusBadge status={p.status} /></div>
                <div className="text-right"><button onClick={openReview} className="rounded-lg border border-[#001B3D] px-4 py-2 font-black hover:bg-[#001B3D] hover:text-white">Open</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportsPage() {
  return (
    <section className="space-y-7">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Reports</h1>
        <p className="text-slate-600 mt-2 text-lg">Operational reporting for intake volume, eligibility, screening outcomes, and corridor risk.</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Monthly Intakes" value="186" sub="+18%" tone="blue" />
        <KpiCard label="Eligible CBYD" value="139" sub="75%" tone="green" />
        <KpiCard label="Clarification Rate" value="19%" sub="Action" tone="amber" />
        <KpiCard label="Filtered Requests" value="22" sub="Not CBYD" tone="red" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Card title="Eligibility Outcome Mix" icon={Database}>
          <ReportBar label="Eligible for DICRI Screening" value={75} tone="green" />
          <ReportBar label="Returned for Clarification" value={19} tone="amber" />
          <ReportBar label="Marked Not CBYD" value={6} tone="red" />
        </Card>
        <Card title="Corridor Risk Drivers" icon={AlertTriangle}>
          <ReportBar label="Side of road missing" value={42} tone="amber" />
          <ReportBar label="Incomplete work method" value={28} tone="amber" />
          <ReportBar label="Permit reference mismatch" value={17} tone="red" />
          <ReportBar label="Clean handoff" value={61} tone="green" />
        </Card>
      </div>
      <Card title="Government / DICRI Handoff Log" icon={History}>
        {['INT-042 submitted to DICRI operations', 'INT-040 ready for review', 'INT-041 returned for clarification', 'INT-038 marked not CBYD'].map((item, idx) => <NumberedLine key={item} num={idx + 1} label={item} />)}
      </Card>
    </section>
  );
}

function QueueTable({ rows, openReview, large }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex items-center gap-4">
        <div className="relative flex-1 max-w-xl">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-100" placeholder="Search by Intake ID, requester, or location..." />
        </div>
        <select className="rounded-lg border border-slate-300 px-4 py-3"><option>All States</option></select>
        <select className="rounded-lg border border-slate-300 px-4 py-3"><option>All Categories</option></select>
        <select className="rounded-lg border border-slate-300 px-4 py-3"><option>All Status</option></select>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-xs uppercase tracking-widest text-slate-500">
          <tr>
            <th className="px-5 py-4">Intake ID</th>
            <th className="px-5 py-4">Requester</th>
            <th className="px-5 py-4">Work Category</th>
            <th className="px-5 py-4">Location</th>
            <th className="px-5 py-4">Channel</th>
            <th className="px-5 py-4">Completeness</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              <td className="px-5 py-5 font-bold">{row.id}</td>
              <td className="px-5 py-5">{row.requester}</td>
              <td className="px-5 py-5">{row.category}</td>
              <td className="px-5 py-5">{row.location}</td>
              <td className="px-5 py-5">{row.channel}</td>
              <td className="px-5 py-5"><Progress value={row.completeness} /></td>
              <td className="px-5 py-5"><StatusBadge status={row.status} /></td>
              <td className="px-5 py-5 text-right"><button onClick={openReview} className="rounded-lg border border-[#001B3D] px-4 py-2 font-black hover:bg-[#001B3D] hover:text-white">Open</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {!large && <div className="p-5 flex justify-end"><button onClick={openReview} className="rounded-xl bg-[#D4A100] px-7 py-3 text-sm font-black text-white">Open Sample Packet</button></div>}
    </div>
  );
}

function IntakeWorkflow({ country, packet, step, decision, setDecision, nextStep, backStep, submitToDicri, openDashboard, openReview }) {
  const title = step === 10 ? 'Submitted to DICRI' : step === 9 ? 'Intake Completeness Review' : step === 1 ? 'New Assisted Intake' : STEPS[step - 1];
  const subtitle = step === 10 ? 'CBYD Intake Packet created and handed off for corridor screening' : step === 9 ? 'Validate the CBYD Intake Packet before submission to DICRI.' : 'Start a new authorized intake request for DICRI corridor screening.';

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-black tracking-tight">{title}</h1>
        <p className="text-slate-600 mt-2 text-lg">{subtitle}</p>
      </div>

      {step === 1 && <StepOne packet={packet} />}
      {step === 2 && <StepTwo packet={packet} />}
      {step === 3 && <StepThree />}
      {step === 4 && <StepFour />}
      {step === 5 && <StepFive country={country} packet={packet} />}
      {step === 6 && <StepSix />}
      {step === 7 && <StepSeven />}
      {step === 8 && <StepEight />}
      {step === 9 && <ReviewStep packet={packet} decision={decision} setDecision={setDecision} submitToDicri={submitToDicri} />}
      {step === 10 && <SubmittedStep packet={packet} openDashboard={openDashboard} openReview={openReview} />}

      {step < 10 && (
        <div className="fixed bottom-0 left-[260px] right-[340px] bg-white/95 backdrop-blur border-t border-slate-200 p-5 flex items-center justify-between z-40">
          <button onClick={step === 1 ? openDashboard : backStep} className="rounded-xl border border-[#001B3D] px-10 py-3 font-black hover:bg-slate-50">{step === 1 ? 'Cancel' : '← Back'}</button>
          <div className="flex gap-3">
            <button className="rounded-xl border border-[#001B3D] px-8 py-3 font-black flex items-center gap-2"><HardDrive size={16} /> Save Draft</button>
            {step === 9 && <button className="rounded-xl border border-red-500 px-8 py-3 font-black text-red-600">Return for Clarification</button>}
            <button onClick={nextStep} className="rounded-xl bg-[#D4A100] px-10 py-3 font-black text-white shadow-lg hover:bg-[#b98d00]">
              {step === 9 ? 'Submit to DICRI' : step === 8 ? 'Continue to Review' : `Continue${step === 3 ? ' to Location Capture' : ''}`} →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function StepOne({ packet }) {
  return (
    <div className="space-y-4">
      <FormSection number="1" title="Intake Authority Details">
        <Field label="Intake Agency / Office" value={packet.agency} type="select" />
        <Field label="Intake Officer Name" value={packet.officer} />
        <Field label="Intake Officer ID" value={packet.officerId} />
        <Field label="Request Received Through" value={packet.channel} type="select" hint="Useful for auditability and chain of custody." />
        <Field label="Date & Time Received" value="12 May 2026, 10:42 AM" />
      </FormSection>
      <FormSection number="2" title="Requester Details">
        <Field label="Requester Type" value={packet.requesterType} type="select" />
        <Field label="Company Name" value={packet.requester} />
        <Field label="Contact Person" value={packet.contact} />
        <Field label="Phone Number" value={packet.phone} />
        <Field label="Email Address" value={packet.email} />
        <Field label="Existing Permit Ref" value="PHT-DR-2218" />
      </FormSection>
      <FormSection number="3" title="CBYD Eligibility Check">
        <div className="col-span-3 rounded-xl border border-green-200 bg-green-50 p-5">
          <QuestionRow label="Does this request involve ground disturbance?" checked />
          <QuestionRow label="Is the work inside or near public right of way?" checked />
        </div>
      </FormSection>
    </div>
  );
}

function StepTwo({ packet }) {
  return (
    <FormSection number="2" title="Requester Details">
      <Field label="Requester Type" value={packet.requesterType} type="select" />
      <Field label="Company Name" value={packet.requester} />
      <Field label="Contact Person" value={packet.contact} />
      <Field label="Phone Number" value={packet.phone} />
      <Field label="Email Address" value={packet.email} />
      <Field label="Permit / Project Reference" value="PHT-DR-2218" />
      <div className="col-span-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-relaxed text-slate-700">
        <strong>Controlled identity capture:</strong> the requester becomes accountable for the work description, schedule, and declared excavation method before DICRI screening begins.
      </div>
    </FormSection>
  );
}

function StepThree() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Eligibility Decision" icon={Shield}>
        <div className="rounded-xl border border-green-200 bg-green-50 p-5 space-y-4">
          <QuestionRow label="Yes" sub="Includes excavation, trenching, boring, road cutting, grading, piling, and similar activities." checked />
          <QuestionRow label="No" sub="Does not involve ground disturbance activities." />
          <QuestionRow label="Unsure" sub="Not certain if the work involves ground disturbance." />
        </div>
      </Card>
      <Card title="Eligibility Guidance" icon={Info}>
        {['Excavation or earthworks', 'Trenching or ditching', 'Boring or directional drilling', 'Road cutting or pavement removal', 'Drainage works or culvert installation', 'Piling or foundation work', 'Grading or site leveling', 'Underground utility installation'].map((item) => <CheckLine key={item} label={item} />)}
      </Card>
      <Card title="Request Triage" icon={ClipboardCheck} className="col-span-2">
        <div className="grid grid-cols-4 gap-4">
          <Field label="Request Type" value="Contractor" type="select" />
          <Field label="Work Category" value="Drainage Construction" type="select" />
          <Field label="Emergency Work" value="No" type="select" />
          <Field label="Initial Risk" value="Medium" type="select" />
        </div>
      </Card>
    </div>
  );
}

function StepFour() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Card title="Work Classification" icon={Layers} className="col-span-2">
        <div className="grid grid-cols-2 gap-4">
          <Selectable title="Drainage Construction" sub="Culvert, drainage, trenching, ditch works" selected />
          <Selectable title="Road Rehabilitation" sub="Road cut, pavement removal, resurfacing" />
          <Selectable title="Utility Duct" sub="Conduit, fiber, power or water installation" />
          <Selectable title="Foundation / Piling" sub="Ground penetrating works" />
        </div>
      </Card>
      <Card title="Risk Rules" icon={AlertTriangle}>
        <CheckLine label="Ground disturbance confirmed" />
        <CheckLine label="ROW proximity likely" />
        <CheckLine label="Linear corridor declared" />
        <CheckLine label="Asset-owner review may be required" />
      </Card>
    </div>
  );
}

function StepFive({ country, packet }) {
  return (
    <div className="grid grid-cols-5 gap-5">
      <Card title="Location Capture" icon={MapPin} className="col-span-3">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <Field label="Work Area Type" value="Linear Route" type="select" />
          <Field label="Country / Market" value={country.name} type="select" />
          <Field label="Point A" value="Garrison Junction" />
          <Field label="Point B" value="Elekahia Road Intersection" />
          <Field label="Declared Corridor" value={country.corridor} className="col-span-2" />
        </div>
        <CorridorMap />
      </Card>
      <Card title="Digital Corridor Context" icon={Route} className="col-span-2">
        <Metric label="Screening Radius" value="25 m" />
        <Metric label="Corridor Confidence" value="72%" tone="amber" />
        <Metric label="Missing Detail" value="Side of road" tone="red" />
        <Metric label="Likely Asset Owners" value="3" />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 flex gap-3"><AlertTriangle size={18} />Side of road is unknown. DICRI may apply a wider buffer during corridor creation.</div>
      </Card>
    </div>
  );
}

function StepSix() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <FormSection number="6" title="Method & Dimensions" compact>
        <Field label="Excavation Method" value="Open trenching" type="select" />
        <Field label="Expected Depth" value="1.0 m" />
        <Field label="Depth Risk" value="Low" type="select" />
        <Field label="Route Length" value="0.8 km" />
        <Field label="Road Crossing" value="Yes" type="select" />
        <Field label="Machinery" value="Excavator / manual finish" />
      </FormSection>
      <Card title="Method Risk Controls" icon={Shield}>
        <CheckLine label="Open trenching requires corridor screening" />
        <CheckLine label="Road crossing increases notification priority" />
        <CheckLine label="Low depth does not remove CBYD obligation" />
        <CheckLine label="Asset owner review triggered if overlap is found" />
      </Card>
    </div>
  );
}

function StepSeven() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Project Schedule" icon={Calendar}>
        <Field label="Planned Start Date" value="14 May 2026" />
        <Field label="Planned End Date" value="21 May 2026" />
        <Field label="Daily Work Window" value="08:00 → 17:00" />
        <Field label="Emergency Work" value="No" type="select" />
      </Card>
      <Card title="SLA Implications" icon={Zap}>
        <Metric label="Days Until Work" value="2" tone="amber" />
        <Metric label="Recommended Screening Priority" value="High" tone="amber" />
        <Metric label="Owner Response SLA" value="24h" />
      </Card>
    </div>
  );
}

function StepEight() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Documentation" icon={Upload}>
        <UploadRow label="Permit Application" file="PHT-DR-2218.pdf" done />
        <UploadRow label="Route Sketch" file="corridor-sketch.png" done />
        <UploadRow label="Traffic Management Plan" file="Optional" />
        <UploadRow label="Method Statement" file="Pending" warning />
      </Card>
      <Card title="Packet Completeness" icon={ClipboardCheck}>
        <Metric label="Current Completeness" value="87%" />
        <CheckLine label="Requester identity captured" />
        <CheckLine label="Ground disturbance confirmed" />
        <CheckLine label="Point A / Point B provided" />
        <CheckLine label="Schedule provided" />
      </Card>
    </div>
  );
}

function ReviewStep({ packet, decision, setDecision }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Card title="Request Summary" icon={FileText}>
        <SummaryRow label="Requester" value={packet.requester} />
        <SummaryRow label="Work Category" value={packet.workCategory} />
        <SummaryRow label="Location" value={packet.location} />
        <SummaryRow label="Work Area Type" value={packet.workAreaType} />
        <SummaryRow label="Method" value={packet.method} />
        <SummaryRow label="Depth" value={packet.depth} />
        <SummaryRow label="Start Date" value="14 May 2026" />
      </Card>
      <div className="space-y-5">
        <Card title="Intake Completeness" icon={ClipboardCheck}>
          <div className="text-6xl font-black mb-4">{packet.completeness}%</div>
          <Progress value={packet.completeness} wide />
          <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800 text-sm"><strong>Ready for DICRI</strong><br />DICRI may apply wider corridor buffer and request asset owner review.</div>
        </Card>
        <Card title="Submission Decision" icon={Shield}>
          <DecisionOption label="Submit to DICRI" value="submit" decision={decision} setDecision={setDecision} />
          <DecisionOption label="Return for Clarification" value="clarify" decision={decision} setDecision={setDecision} />
          <DecisionOption label="Mark Not CBYD" value="not" decision={decision} setDecision={setDecision} />
        </Card>
      </div>
      <Card title="Intake Checklist" icon={CheckCircle2} className="col-span-2">
        {['Ground disturbance confirmed', 'Requester contact captured', 'Point A / Point B provided', 'Schedule provided', 'Minimum attachments available', 'Ready for controlled handoff'].map((label) => <ChecklistRow key={label} label={label} />)}
      </Card>
    </div>
  );
}

function SubmittedStep({ packet, openDashboard, openReview }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-[#0B7F3A] text-white flex items-center justify-center"><Check size={48} /></div>
          <div>
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-black uppercase text-green-800 mb-2">Success</div>
            <h2 className="text-3xl font-black text-[#0B7F3A]">Intake Packet Successfully Submitted</h2>
            <p className="text-slate-600 mt-1">The request has passed intake validation and has been handed off to DICRI Operations.</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-black uppercase text-slate-500">Packet Reference Number</div>
          <div className="text-4xl font-black text-[#0B7F3A]">{packet.id}</div>
        </div>
      </div>
      <HandoffTimeline />
      <div className="grid grid-cols-2 gap-5">
        <Card title="Packet Summary" icon={FileText}>
          <SummaryRow label="Requester" value={packet.requester} />
          <SummaryRow label="Intake Authority" value={packet.agency} />
          <SummaryRow label="Work Category" value={packet.workCategory} />
          <SummaryRow label="Location" value="Rivers, Port Harcourt" />
          <SummaryRow label="Work Method" value="Linear Route – Planned Work" />
          <SummaryRow label="Completeness Score" value={`${packet.completeness}%`} />
          <SummaryRow label="Attachments Count" value={String(packet.attachments)} />
        </Card>
        <Card title="Next Steps" icon={Layers}>
          {['DICRI operations manager reviews packet.', 'Digital corridor is created.', 'Impact zone and asset screening are run.', 'Asset owners are notified if conflicts are found.', 'Requester receives response package.'].map((item, idx) => <NumberedLine key={item} num={idx + 1} label={item} />)}
        </Card>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={openReview} className="rounded-xl border border-[#001B3D] px-8 py-3 font-black">View Packet</button>
        <button className="rounded-xl border border-[#001B3D] px-8 py-3 font-black"><Download size={16} className="inline mr-2" />Download / Print Summary</button>
        <button onClick={openDashboard} className="rounded-xl bg-[#D4A100] px-8 py-3 font-black text-white">Return to Dashboard</button>
      </div>
    </div>
  );
}

function CorridorMap() {
  return (
    <div className="h-[360px] rounded-2xl border border-slate-200 bg-[#071A33] overflow-hidden relative">
      <svg viewBox="0 0 900 420" className="absolute inset-0 h-full w-full">
        <rect width="900" height="420" fill="#071A33" />
        {[80, 160, 240, 320].map((y) => <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="rgba(255,255,255,0.055)" />)}
        {[120, 260, 420, 580, 740].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="420" stroke="rgba(255,255,255,0.055)" />)}
        <path d="M55 210 H850" stroke="rgba(148,163,184,0.18)" strokeWidth="42" />
        <path d="M170 30 V390" stroke="rgba(148,163,184,0.16)" strokeWidth="38" />
        <path d="M55 210 H850" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" />
        <path d="M170 45 V380" stroke="#3B82F6" strokeWidth="11" strokeLinecap="round" />
        <circle cx="510" cy="210" r="92" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="2" strokeDasharray="9 8" />
        <circle cx="510" cy="210" r="8" fill="#EF4444" stroke="white" strokeWidth="3" />
        <circle cx="685" cy="290" r="16" fill="#EF4444" fillOpacity="0.28" />
        <text x="70" y="190" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="900" letterSpacing="2">TRANS-AMADI INDUSTRIAL ROAD</text>
        <text x="185" y="80" fill="rgba(255,255,255,0.48)" fontSize="12" fontWeight="900" letterSpacing="2" transform="rotate(90 185 80)">ELEKAHIA ROAD</text>
        <text x="545" y="122" fill="#FCA5A5" fontSize="12" fontWeight="900" letterSpacing="2">25M CONFLICT BUFFER</text>
        <text x="538" y="240" fill="#FCA5A5" fontSize="12" fontWeight="900" letterSpacing="2">CBYD-2026-00128</text>
        <circle cx="55" cy="210" r="7" fill="#22C55E" stroke="#071A33" strokeWidth="3" />
        <circle cx="850" cy="210" r="7" fill="#22C55E" stroke="#071A33" strokeWidth="3" />
      </svg>
      <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-[#0B1F3A]/90 p-5 text-white shadow-xl max-w-xs">
        <div className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2"><Map size={17} className="text-blue-400" /> Corridor Active</div>
        <p className="text-[11px] uppercase tracking-widest text-blue-100/70 leading-relaxed">Screening declared route against verified assets, crossing utilities, and permit-linked work zone.</p>
      </div>
      <div className="absolute bottom-5 left-6 rounded-xl bg-[#0B1F3A]/90 border border-white/10 p-3 flex gap-5 text-[10px] font-black uppercase tracking-widest text-white/70">
        <span className="flex items-center gap-2"><i className="h-2 w-5 rounded bg-green-500" /> Verified Asset</span>
        <span className="flex items-center gap-2"><i className="h-2 w-5 rounded bg-blue-500" /> Crossing Utility</span>
        <span className="flex items-center gap-2"><i className="h-2 w-5 rounded bg-red-500" /> Dig Notice</span>
      </div>
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
                <div className="text-xs text-slate-500">{done ? '12 May 2026' : 'Pending'}</div>
              </div>
              {idx < items.length - 1 && <div className={`h-1 flex-1 ${done ? 'bg-[#0B7F3A]' : 'bg-slate-300'}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlaceholderPage({ title, subtitle, icon: Icon }) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-4xl font-black tracking-tight">{title}</h1>
        <p className="text-slate-600 mt-2 text-lg">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-10 min-h-[420px] flex items-center justify-center text-center">
        <div>
          <div className="h-20 w-20 rounded-3xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6"><Icon size={38} /></div>
          <h2 className="text-2xl font-black mb-2">Demo Module Ready</h2>
          <p className="text-slate-600 max-w-lg">This tab is wired and safe to click. Additional workflow detail can be layered here without breaking the intake demo flow.</p>
        </div>
      </div>
    </section>
  );
}

function FormSection({ number, title, children, compact }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${compact ? '' : 'space-y-5'}`}>
      <h2 className="text-xl font-black mb-4 flex items-center gap-3"><span className="h-8 w-8 rounded-lg bg-[#062247] text-white flex items-center justify-center text-sm">{number}</span>{title}</h2>
      <div className="grid grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function Card({ title, icon: Icon, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <h2 className="text-xl font-black mb-5 flex items-center gap-2"><Icon size={20} /> {title}</h2>
      {children}
    </div>
  );
}

function Field({ label, value, type, hint, className = '', options }) {
  const defaultOptions = options || [value, 'State Permit Office', 'Assisted Web', 'Phone', 'Walk-in', 'Contractor', 'Utility Provider', 'Asset Owner', 'Open trenching', 'Directional boring', 'Road cutting', 'No', 'Yes', 'Medium', 'High', 'Low'];
  return (
    <div className={className}>
      <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</label>
      {type === 'select' ? (
        <select defaultValue={value} className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-100">
          {[...new Set(defaultOptions)].map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input value={value} readOnly className="min-h-[46px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-100" />
      )}
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function ReportBar({ label, value, tone }) {
  const color = tone === 'green' ? 'bg-green-600' : tone === 'red' ? 'bg-red-500' : 'bg-[#D4A100]';
  return (
    <div className="py-4 border-b border-slate-200 last:border-0">
      <div className="flex items-center justify-between mb-2"><span className="font-bold">{label}</span><span className="font-black">{value}%</span></div>
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function KpiCard({ label, value, sub, tone }) {
  const toneClass = tone === 'green' ? 'text-green-700 bg-green-50 border-green-200' : tone === 'amber' ? 'text-amber-700 bg-amber-50 border-amber-200' : tone === 'red' ? 'text-red-700 bg-red-50 border-red-200' : 'text-blue-700 bg-blue-50 border-blue-200';
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-base mb-3">{label}</p>
      <div className="text-4xl font-black mb-2">{value}</div>
      <span className={`inline-block rounded-lg border px-3 py-1 text-xs font-black ${toneClass}`}>{sub}</span>
    </div>
  );
}

function MixCard({ icon: Icon, label, value }) {
  return <div className="rounded-xl bg-slate-50 border border-slate-200 p-5"><Icon size={22} className="text-blue-600 mb-4" /><div className="text-3xl font-black">{value}</div><div className="text-sm text-slate-600 mt-1">{label}</div></div>;
}

function Progress({ value, wide }) {
  return <div className={wide ? 'w-full' : 'w-32'}><div className="mb-1 text-xs font-black">{value}%</div><div className="h-2 rounded-full bg-slate-200 overflow-hidden"><div className="h-full bg-[#D4A100]" style={{ width: `${value}%` }} /></div></div>;
}

function StatusBadge({ status }) {
  const cls = status === 'Ready for Review' ? 'bg-green-100 text-green-700' : status === 'Needs Clarification' || status === 'Draft Intake Request' ? 'bg-amber-100 text-amber-700' : status === 'Not CBYD' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700';
  return <span className={`rounded-lg px-3 py-1 text-xs font-black ${cls}`}>{status}</span>;
}

function SnapshotItem({ label, value, badge, tone }) {
  const cls = tone === 'green' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700';
  return <div className="border-b border-slate-200 pb-4"><div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</div>{badge ? <span className={`rounded-lg px-3 py-1 text-xs font-black ${cls}`}>{value}</span> : <div className="text-lg font-black">{value}</div>}</div>;
}

function QuestionRow({ label, sub, checked }) {
  return <div className="flex items-start gap-3 py-2"><span className={`mt-1 h-4 w-4 rounded-full border flex items-center justify-center ${checked ? 'border-[#0B7F3A]' : 'border-slate-400'}`}>{checked && <span className="h-2 w-2 rounded-full bg-[#0B7F3A]" />}</span><div><div className="font-black">{label}</div>{sub && <div className="text-sm text-slate-600 mt-1">{sub}</div>}</div></div>;
}

function CheckLine({ label }) {
  return <div className="flex items-center gap-3 border-b border-slate-200 py-3 last:border-0"><span className="h-5 w-5 rounded bg-green-100 text-green-700 flex items-center justify-center"><Check size={15} /></span><span>{label}</span></div>;
}

function Selectable({ title, sub, selected }) {
  return <div className={`rounded-xl border p-5 ${selected ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}`}><div className="flex items-center justify-between"><h3 className="font-black">{title}</h3>{selected && <CheckCircle2 className="text-green-700" size={20} />}</div><p className="text-sm text-slate-600 mt-2">{sub}</p></div>;
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

function DecisionOption({ label, value, decision, setDecision }) {
  return <button onClick={() => setDecision(value)} className="w-full flex items-center justify-between py-3 text-left"><span className="font-black">{label}</span><span className={`h-9 w-9 rounded-full border-2 flex items-center justify-center ${decision === value ? 'border-[#D4A100]' : 'border-slate-300'}`}>{decision === value && <span className="h-5 w-5 rounded-full bg-[#D4A100]" />}</span></button>;
}

function ChecklistRow({ label }) {
  return <div className="flex items-center justify-between border-b border-slate-200 py-3"><div className="flex items-center gap-3"><CheckCircle2 className="text-green-700" size={20} /><span>{label}</span></div><span className="rounded-lg bg-green-100 px-3 py-1 text-xs font-black text-green-700">Completed</span></div>;
}

function NumberedLine({ num, label }) {
  return <div className="flex items-center gap-4 border-b border-slate-200 py-3"><span className="font-black text-lg">{num}</span><span>{label}</span></div>;
}

export default App;
