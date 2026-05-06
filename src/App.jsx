import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  LayoutDashboard,
  MonitorPlay,
  ShieldCheck,
  Users,
} from 'lucide-react';
import SecureIntakeTrustGatesDemo from './demos/SecureIntakeTrustGatesDemo.jsx';
import GovernmentIntakeDemo from './demos/GovernmentIntakeDemo.jsx';
import ClientPortalDemo from './demos/ClientPortalDemo.jsx';

const DEMOS = [
  {
    id: 'secure-intake',
    name: 'Secure Intake & Trust Gates',
    shortName: 'Trust Gates',
    purpose: 'Identity, role, equipment, segment, calibration, and trusted capture envelope workflow.',
    source: 'src/demos/SecureIntakeTrustGatesDemo.jsx',
    status: 'Current active app',
    icon: ShieldCheck,
    accent: 'blue',
    Component: SecureIntakeTrustGatesDemo,
  },
  {
    id: 'government-intake',
    name: 'Government Assisted Intake / CBYD Intake',
    shortName: 'Government Intake',
    purpose: 'Government intake dashboard, queue, permit-linked applications, reports, and CBYD submission workflow.',
    source: 'src/demos/GovernmentIntakeDemo.jsx',
    status: 'Promoted from archive',
    icon: Building2,
    accent: 'amber',
    Component: GovernmentIntakeDemo,
  },
  {
    id: 'client-portal',
    name: 'Client / Asset Owner Portal',
    shortName: 'Client Portal',
    purpose: 'Asset owner portfolio, certificate register, managed assets, CBYD exposure, comms, trends, and audit views.',
    source: 'src/demos/ClientPortalDemo.jsx',
    status: 'Promoted from archive',
    icon: Users,
    accent: 'green',
    Component: ClientPortalDemo,
  },
];

const accentClasses = {
  blue: {
    border: 'border-blue-500/25',
    bg: 'bg-blue-500/10',
    text: 'text-blue-300',
    button: 'bg-blue-600 hover:bg-blue-500 shadow-blue-950/40',
  },
  amber: {
    border: 'border-amber-500/25',
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    button: 'bg-amber-600 hover:bg-amber-500 shadow-amber-950/40',
  },
  green: {
    border: 'border-green-500/25',
    bg: 'bg-green-500/10',
    text: 'text-green-300',
    button: 'bg-green-600 hover:bg-green-500 shadow-green-950/40',
  },
};

export default function App() {
  const [activeDemoId, setActiveDemoId] = useState(null);

  const activeDemo = useMemo(
    () => DEMOS.find((demo) => demo.id === activeDemoId),
    [activeDemoId],
  );

  if (activeDemo) {
    const ActiveDemo = activeDemo.Component;
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <DemoConsoleBar
          activeDemo={activeDemo}
          onSelectDemo={setActiveDemoId}
          onBack={() => setActiveDemoId(null)}
        />
        <div className="demo-console-stage">
          <ActiveDemo />
        </div>
      </div>
    );
  }

  return <Launcher onSelectDemo={setActiveDemoId} />;
}

function Launcher({ onSelectDemo }) {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-hidden">
      <div className="min-h-screen px-6 py-8 md:px-10 lg:px-14 flex flex-col">
        <header className="flex items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-300 shadow-2xl shadow-blue-950/40">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">DICRI Demo Console</h1>
              <p className="text-xs md:text-sm text-slate-400 mt-1">One launcher for the major local DICRI prototypes.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
            <MonitorPlay size={15} />
            Local Vite React
          </div>
        </header>

        <section className="flex-1 flex items-center py-10">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 xl:gap-12">
            <div className="max-w-xl self-center">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-blue-400">Demo Launcher</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-4 leading-tight">
                Select a DICRI workflow.
              </h2>
              <p className="text-slate-400 mt-5 leading-relaxed">
                Each demo remains a local React view with its own state and visual treatment. Use the console bar to switch without changing ports.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <Metric label="Demos" value="3" />
                <Metric label="Backend" value="None" />
                <Metric label="State" value="Local" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {DEMOS.map((demo) => (
                <DemoCard key={demo.id} demo={demo} onSelect={() => onSelectDemo(demo.id)} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function DemoCard({ demo, onSelect }) {
  const Icon = demo.icon;
  const accent = accentClasses[demo.accent];

  return (
    <button
      onClick={onSelect}
      className={`group text-left rounded-[2rem] border ${accent.border} bg-slate-900/70 hover:bg-slate-900 p-6 md:p-7 shadow-2xl transition-all hover:-translate-y-0.5`}
    >
      <div className="flex items-start gap-5">
        <div className={`h-14 w-14 rounded-2xl ${accent.bg} ${accent.text} border ${accent.border} flex items-center justify-center shrink-0`}>
          <Icon size={27} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">{demo.status}</p>
              <h3 className="text-xl md:text-2xl font-black text-white mt-2">{demo.name}</h3>
            </div>
            <div className={`hidden md:flex h-11 w-11 rounded-2xl ${accent.button} text-white items-center justify-center shadow-xl transition-transform group-hover:translate-x-1`}>
              <ChevronRight size={20} />
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mt-4">{demo.purpose}</p>
          <p className="text-[10px] font-mono text-slate-600 mt-4">{demo.source}</p>
        </div>
      </div>
    </button>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">{label}</p>
      <p className="text-lg font-black text-white mt-1">{value}</p>
    </div>
  );
}

function DemoConsoleBar({ activeDemo, onSelectDemo, onBack }) {
  return (
    <div className="sticky top-0 z-[1000] border-b border-white/10 bg-[#020617]/95 backdrop-blur-xl text-white">
      <div className="h-16 px-3 md:px-5 flex items-center justify-between gap-3 overflow-x-auto">
        <button
          onClick={onBack}
          className="h-10 px-3 md:px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shrink-0"
        >
          <ArrowLeft size={14} />
          Console
        </button>

        <div className="flex items-center gap-2 min-w-max">
          {DEMOS.map((demo) => {
            const isActive = demo.id === activeDemo.id;
            const Icon = demo.icon;
            return (
              <button
                key={demo.id}
                onClick={() => onSelectDemo(demo.id)}
                className={`h-10 px-3 md:px-4 rounded-xl border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={14} />
                {demo.shortName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
