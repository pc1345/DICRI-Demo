import React, { useState } from 'react';
import { 
  Layout, ClipboardList, MapPin, HardDrive, FileText, 
  Search, Bell, ChevronRight, CheckCircle2, Map, 
  History, Info, Filter, Download, User, Settings, 
  Database, X, Shield, Calendar, AlertTriangle, 
  ArrowRight, ArrowLeft, Upload, Check, Briefcase, 
  Building2, Phone, Mail, MoreHorizontal, Plus
} from 'lucide-react';


// --- BRANDING: DICRI + NIGERIA NATIONAL IDENTITY ---
const BrandedHeader = ({ currentStep }) => (
  <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
    <div className="flex items-center space-x-6">
      {/* Nigeria National Flag/Emblem Placeholder */}
      <div className="flex items-center gap-3 pr-6 border-r border-slate-200">
        <div className="w-10 h-7 flex shadow-sm rounded-sm overflow-hidden">
          <div className="bg-[#008751] flex-1" />
          <div className="bg-white flex-1 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#008751]/20" />
          </div>
          <div className="bg-[#008751] flex-1" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">Federal Republic</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Infrastructure Dept</span>
        </div>
      </div>
      
      {/* DICRI LOGO */}
      <div className="flex items-center space-x-3">
        <svg viewBox="0 0 100 100" className="h-9 w-9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 5L15 20V45C15 70 50 92 50 92C50 92 88 70 88 45V20L50 5Z" fill="#0F172A" stroke="#3B82F6" strokeWidth="3"/>
          <path d="M35 35C48 35 48 65 58 65" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round"/>
          <path d="M35 45C45 45 45 55 58 55" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
          <path d="M35 55C45 55 45 45 58 45" stroke="#2563EB" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="80" cy="75" r="14" fill="#3B82F6" />
          <path d="M74 75L78 79L86 71" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tight text-slate-900">DICRI</span>
          <span className="text-[7px] font-bold text-blue-600 uppercase tracking-[0.2em]">Assisted Intake</span>
        </div>
      </div>
    </div>


    <nav className="hidden md:flex items-center space-x-8">
      <button className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 py-7 px-1">Dashboard</button>
      <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Intakes</button>
      <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Applications</button>
      <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Permits</button>
      <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Reports</button>
    </nav>


    <div className="flex items-center space-x-4">
      <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-all">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-white" />
      </button>
      <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-black text-slate-900 leading-none">R. Okafor</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Intake Officer</p>
        </div>
        <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-sm text-slate-600 border border-slate-200 shadow-sm">RO</div>
      </div>
    </div>
  </header>
);


const App = () => {
  const [view, setView] = useState('dashboard'); // 'dashboard', 'new_intake'
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    agency: 'State Permit Office',
    officer: 'R. Okafor',
    officerId: 'INT-042',
    channel: 'Walk-in',
    requesterType: 'Contractor',
    company: 'Delta Civil Works Ltd.',
    contact: 'Emeka Nwosu',
    groundDisturbance: true,
    workCategory: 'Drainage Construction',
    location: 'Garrison Junction to Elekahia Road Intersection, Port Harcourt'
  });


  const nextStep = () => setStep(s => Math.min(s + 1, 9));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));


  // --- SUB-VIEWS ---


  const Dashboard = () => (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Authorized Intake Dashboard</h1>
          <p className="text-slate-500 mt-1">Incoming excavation requests awaiting pre-screening and DICRI submission.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">Open Queue</button>
          <button onClick={() => setView('new_intake')} className="px-6 py-3 bg-[#EAB308] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-yellow-600/20 flex items-center gap-2 hover:bg-yellow-600 transition-all">
            <Plus size={18} /> New Assisted Intake
          </button>
        </div>
      </div>


      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard label="New Requests Today" val="18" trend="+12%" color="blue" />
        <DashboardCard label="Needs Clarification" val="6" status="Action" color="amber" />
        <DashboardCard label="Ready for DICRI" val="9" status="Ready" color="green" />
        <DashboardCard label="Redirected / Not CBYD" val="3" status="Filtered" color="slate" />
      </div>


      {/* Request Queue */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-black text-slate-800">Request Queue</h2>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search by ID, Requester..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs w-64 focus:ring-2 focus:ring-blue-500/10 outline-none" />
             </div>
             <select className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 outline-none"><option>All Statuses</option></select>
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-8 py-5">Intake ID</th>
              <th className="px-8 py-5">Requester</th>
              <th className="px-8 py-5">Work Category</th>
              <th className="px-8 py-5">Location</th>
              <th className="px-8 py-5">Completeness</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {[
              { id: 'INT-042', req: 'Delta Civil Works Ltd.', cat: 'Drainage Construction', loc: 'Port Harcourt, Rivers', comp: 72, status: 'Draft' },
              { id: 'INT-041', req: 'Niger Drainage Services', cat: 'Culvert Installation', loc: 'Asaba, Delta', comp: 48, status: 'Needs Clarification' },
              { id: 'INT-040', req: 'City Roads Unit', cat: 'Road Rehab', loc: 'Benin City, Edo', comp: 86, status: 'Ready for Review' },
              { id: 'INT-039', req: 'SafeTrench Ltd.', cat: 'Utility Duct', loc: 'Kaduna, Kaduna', comp: 65, status: 'Needs Clarification' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-6 font-black text-slate-800">{row.id}</td>
                <td className="px-8 py-6 font-bold text-slate-600">{row.req}</td>
                <td className="px-8 py-6 text-slate-500">{row.cat}</td>
                <td className="px-8 py-6 text-slate-500">{row.loc}</td>
                <td className="px-8 py-6">
                  <div className="w-32">
                    <div className="flex justify-between text-[10px] font-bold mb-1"><span>{row.comp}%</span></div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${row.comp > 80 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${row.comp}%` }} />
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    row.status === 'Ready for Review' ? 'bg-green-100 text-green-700' : 
                    row.status === 'Needs Clarification' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>{row.status}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-black uppercase hover:bg-slate-100 transition-all">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


  const NewIntakeForm = () => (
    <div className="flex h-[calc(100vh-80px)] animate-in slide-in-from-right-8 duration-500">
      {/* Step Sidebar */}
      <aside className="w-72 bg-slate-50 border-r border-slate-200 p-8 flex flex-col shrink-0">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">CBYD Excavation Intake</h3>
        <div className="space-y-4 flex-1">
          <StepItem num={1} label="Intake Authority" active={step === 1} done={step > 1} />
          <StepItem num={2} label="Requester Details" active={step === 2} done={step > 2} />
          <StepItem num={3} label="CBYD Eligibility" active={step === 3} done={step > 3} />
          <StepItem num={4} label="Work Classification" active={step === 4} done={step > 4} />
          <StepItem num={5} label="Location Capture" active={step === 5} done={step > 5} />
          <StepItem num={6} label="Method & Dimensions" active={step === 6} done={step > 6} />
          <StepItem num={7} label="Project Schedule" active={step === 7} done={step > 7} />
          <StepItem num={8} label="Documentation" active={step === 8} done={step > 8} />
          <StepItem num={9} label="Final Review" active={step === 9} done={step === 9} />
        </div>
        <div className="mt-auto p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
          <CheckCircle2 className="text-green-500" size={20} />
          <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Submitted to DICRI</span>
        </div>
      </aside>


      {/* Form Content */}
      <main className="flex-1 bg-white overflow-y-auto relative p-12">
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
          
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <HeaderSection num="1" title="Intake Authority Details" sub="Validation of the agency and officer collecting the intake request." />
              <div className="grid grid-cols-2 gap-8">
                <InputField label="Intake Agency / Office" val={formData.agency} />
                <InputField label="Intake Officer Name" val={formData.officer} />
                <InputField label="Request Received Through" val={formData.channel} type="select" options={['Walk-in', 'Phone', 'Assisted Web']} />
                <InputField label="Intake Officer ID" val={formData.officerId} />
                <InputField label="Date & Time Received" val="12 May 2026, 10:42 AM" />
              </div>
            </div>
          )}


          {step === 2 && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <HeaderSection num="2" title="Requester Details" sub="Identity of the party responsible for the excavation or ground disturbance." />
              <div className="grid grid-cols-2 gap-8">
                <InputField label="Requester Type" val={formData.requesterType} type="select" options={['Contractor', 'Asset Owner', 'Utility Provider']} />
                <InputField label="Company Name" val={formData.company} />
                <InputField label="Contact Person" val={formData.contact} />
                <InputField label="Phone Number" val="+234 802 123 4567" />
                <InputField label="Email Address" val="emeka.nwosu@deltacivil.com" className="col-span-2" />
              </div>
            </div>
          )}


          {step === 3 && (
            <div className="space-y-10 animate-in fade-in duration-300">
              <HeaderSection num="3" title="CBYD Eligibility Check" sub="Automated screening to ensure the request involves ground disturbance." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="p-10 bg-slate-50 border border-slate-200 rounded-[2rem] space-y-8">
                    <p className="text-sm font-bold text-slate-700">Does this request involve excavation or other ground disturbance?</p>
                    <div className="space-y-4">
                       <RadioItem label="Yes" sub="Includes trenching, boring, grading, etc." checked={true} />
                       <RadioItem label="No" sub="Does not involve ground disturbance activities." checked={false} />
                    </div>
                 </div>
                 <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-10 space-y-6">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                       <Info size={14} /> Eligibility Guidance
                    </h4>
                    <div className="space-y-3">
                       <GuidanceCheck label="Excavation or earthworks" />
                       <GuidanceCheck label="Trenching or ditching" />
                       <GuidanceCheck label="Boring or directional drilling" />
                       <GuidanceCheck label="Underground utility installation" />
                    </div>
                 </div>
              </div>
            </div>
          )}


          {step === 9 && (
            <div className="space-y-10 animate-in fade-in duration-300">
               <div className="text-center space-y-6">
                  <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/20">
                    <CheckCircle2 size={48} strokeWidth={3} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Intake Successfully Submitted</h2>
                    <p className="text-slate-500 text-lg">Packet reference: <span className="font-black text-blue-600">CBYD-INT-2026-00481</span></p>
                  </div>
               </div>
               
               <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-10 space-y-10 shadow-inner">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                     <SummaryRow label="Requester" val="Delta Civil Works Ltd." />
                     <SummaryRow label="Intake Authority" val="State Permit Office" />
                     <SummaryRow label="Work Category" val="Drainage Construction" />
                     <SummaryRow label="Location" val="Port Harcourt, Rivers" />
                     <SummaryRow label="Work Method" val="Linear Route - Planned Work" />
                     <SummaryRow label="Completeness Score" val="87%" boldVal />
                  </div>
               </div>


               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl space-y-4">
                     <h4 className="text-xs font-black uppercase tracking-widest text-blue-800">Next Systematic Steps</h4>
                     <ol className="space-y-3 text-xs font-bold text-blue-600/70">
                        <li>1. DICRI operations manager reviews packet.</li>
                        <li>2. Digital corridor context is generated.</li>
                        <li>3. Asset owners are notified of conflicts.</li>
                     </ol>
                  </div>
                  <div className="p-8 bg-slate-900 rounded-3xl text-white space-y-4 shadow-xl">
                     <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Presenter Talk Track</h4>
                     <p className="text-xs font-medium leading-relaxed opacity-80 italic italic underline decoration-blue-500/30">
                        "This screen confirms the controlled PPP handoff. The intake is complete, and DICRI operations now creates the corridor and runs the automated screening."
                     </p>
                  </div>
               </div>


               <div className="flex gap-4 pt-10">
                  <button onClick={() => setView('dashboard')} className="flex-1 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Return to Dashboard</button>
                  <button className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all">
                     <Download size={18} /> Download Print Summary
                  </button>
               </div>
            </div>
          )}


        </div>


        {/* Footer Navigation Bar */}
        {view === 'new_intake' && step < 9 && (
          <div className="fixed bottom-0 left-72 right-0 h-24 bg-white/80 backdrop-blur-md border-t border-slate-200 flex items-center justify-between px-12 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <button onClick={prevStep} disabled={step === 1} className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-700 transition-all disabled:opacity-30">
              <ArrowLeft size={16} /> Previous
            </button>
            <div className="flex items-center gap-4">
              <button onClick={() => setView('dashboard')} className="px-8 py-3 text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-600">Save Draft</button>
              <button onClick={nextStep} className="px-10 py-4 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 flex items-center gap-3 hover:bg-blue-700 transition-all active:scale-95">
                {step === 8 ? 'Submit to DICRI' : 'Continue'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>


      {/* Sidebar Snapshot (Right Panel) */}
      {view === 'new_intake' && step < 9 && (
        <aside className="w-80 bg-slate-50 border-l border-slate-200 p-8 overflow-y-auto shrink-0">
          <div className="space-y-10">
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileText size={14} /> Intake Snapshot
              </h4>
              <div className="space-y-6">
                <SnapshotItem label="Submission Type" val="Assisted Intake" />
                <SnapshotItem label="Status" val="Draft Intake Request" status="amber" />
                <SnapshotItem label="Ground Disturbance" val="Confirmed" status="green" />
                <SnapshotItem label="Work Area Type" val="Linear Route" />
              </div>
            </div>


            <div className="pt-10 border-t border-slate-200 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">Intake Completeness</span>
                  <span className="text-xs font-black text-slate-900">87%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '87%' }} />
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-700 font-bold leading-relaxed">Warning: Side of road unknown for corridor definition.</p>
              </div>
            </div>


            <div className="pt-10 border-t border-slate-200">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Presenter Talk Track</h4>
               <div className="p-5 bg-slate-900 rounded-2xl shadow-xl">
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic underline decoration-blue-500/20">
                     "This screen captures the intake authority and requester information. The dropdowns expose the controlled data model and standardize messy requests before handoff."
                  </p>
               </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <BrandedHeader currentStep={step} />
      {view === 'dashboard' ? <Dashboard /> : <NewIntakeForm />}
    </div>
  );
};

// --- HELPER COMPONENTS ---


const DashboardCard = ({ label, val, trend, status, color }) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    amber: 'bg-amber-50 border-amber-100 text-amber-600',
    green: 'bg-green-50 border-green-100 text-green-600',
    slate: 'bg-slate-50 border-slate-100 text-slate-600'
  };
  return (
    <div className={`p-8 rounded-[2rem] border shadow-sm space-y-4 ${colors[color]}`}>
       <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</p>
       <div className="flex items-end justify-between">
          <p className="text-4xl font-black tracking-tighter leading-none">{val}</p>
          {trend ? (
            <span className="text-xs font-black bg-white/50 px-2 py-1 rounded-lg">{trend}</span>
          ) : (
            <span className="text-[9px] font-black uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full border border-current opacity-60">{status}</span>
          )}
       </div>
    </div>
  );
};


const StepItem = ({ num, label, active, done }) => (
  <div className={`flex items-center gap-4 transition-all ${active ? 'scale-105' : ''}`}>
    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${
      done ? 'bg-blue-600 border-blue-600 text-white' : 
      active ? 'bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-600/20' : 
      'bg-transparent border-slate-200 text-slate-400'
    }`}>
      {done ? <Check size={14} strokeWidth={4} /> : num}
    </div>
    <span className={`text-xs font-black uppercase tracking-widest ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
  </div>
);


const HeaderSection = ({ num, title, sub }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs">{num}</div>
      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{title}</h2>
    </div>
    <p className="text-slate-500 font-medium pl-11">{sub}</p>
  </div>
);


const InputField = ({ label, val, type = 'text', options, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    {type === 'text' ? (
      <input readOnly value={val} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-bold text-slate-700 outline-none" />
    ) : (
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-sm font-bold text-slate-700 flex justify-between items-center group cursor-pointer hover:border-blue-500/30 transition-all">
        <span>{val}</span>
        <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-500 transition-all" />
      </div>
    )}
  </div>
);


const RadioItem = ({ label, sub, checked }) => (
  <div className={`p-6 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
    checked ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-white border-slate-200 hover:border-slate-300'
  }`}>
    <div className="space-y-1">
      <p className="text-sm font-black uppercase tracking-tight">{label}</p>
      <p className={`text-[10px] font-medium ${checked ? 'text-blue-100' : 'text-slate-400'}`}>{sub}</p>
    </div>
    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${checked ? 'border-white' : 'border-slate-200'}`}>
      {checked && <div className="h-2.5 w-2.5 rounded-full bg-white animate-in zoom-in" />}
    </div>
  </div>
);


const GuidanceCheck = ({ label }) => (
  <div className="flex items-center gap-3">
    <div className="h-5 w-5 bg-green-500/10 text-green-500 rounded flex items-center justify-center"><Check size={14} strokeWidth={4} /></div>
    <span className="text-xs font-bold text-slate-600">{label}</span>
  </div>
);


const SnapshotItem = ({ label, val, status }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <div className="flex items-center justify-between">
      <p className="text-xs font-bold text-slate-900">{val}</p>
      {status && (
        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
          status === 'green' ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-amber-100 text-amber-600 border border-amber-200'
        }`}>{val}</span>
      )}
    </div>
  </div>
);


const SummaryRow = ({ label, val, boldVal }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className={`text-sm ${boldVal ? 'text-blue-600 font-black' : 'text-slate-800 font-bold'}`}>{val}</p>
  </div>
);


export default App;