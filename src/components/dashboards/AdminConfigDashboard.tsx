import React, { useState } from 'react';
import { useSaaSContext } from '../../context/SaaSContext';
import { useAppContext } from '../../context/AppContext';
import { Settings, Save, AlertCircle, Type, Globe, MonitorSmartphone, Activity, Package, Users, ShieldCheck, Layers, Target, ExternalLink, ShieldAlert, FileSearch, Network, Server, BellRing, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Tabs
import SettingsTab from './admin/SettingsTab';
import IdentityTab from './admin/IdentityTab';
import DevOpsTab from './admin/DevOpsTab';
import GovernanceTab from './admin/GovernanceTab';
import TopologyTab from './admin/TopologyTab';
import BroadcastTab from './admin/BroadcastTab';

type Tab = 'settings' | 'identity' | 'governance' | 'topology' | 'devops' | 'broadcast';

export default function AdminConfigDashboard() {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>('identity');

  if (!user || (user.level !== 'ADMIN' && user.level !== 'MODERATOR')) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
        <AlertCircle size={48} className="mb-4 text-rose-500" />
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-2">Acceso Restringido</h2>
        <p className="max-w-md text-slate-600 dark:text-slate-400">Esta consola es de uso exclusivo para el Nivel Estratégico (DevOps, Administradores y Auditores Maestros).</p>
      </div>
    );
  }
  
  const ADMIN_TABS: { id: Tab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'identity', label: 'Control de Acceso', icon: <UserCheck size={18} />, desc: 'RBAC, Usuarios, Kill Switch' },
    { id: 'governance', label: 'Gobernanza de Datos', icon: <FileSearch size={18} />, desc: 'Auditoría, Desbloqueos, Override' },
    { id: 'topology', label: 'Topología Espacial', icon: <Network size={18} />, desc: 'ASIC, CPT, CIE-10' },
    { id: 'devops', label: 'DevOps & Servidor', icon: <Server size={18} />, desc: 'Mantenimiento, Backups' },
    { id: 'broadcast', label: 'Broadcasting', icon: <BellRing size={18} />, desc: 'Banners, Circulares, Tickets' },
    { id: 'settings', label: 'Configuración UI', icon: <Settings size={18} />, desc: 'Textos, Módulos, Apariencia' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 font-sans">
      {/* Header */}
      <div className="bg-slate-900 dark:bg-black border-b border-slate-800 p-5 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 rounded-lg text-indigo-400 border border-indigo-500/30">
              <Terminal size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Consola Maestra <span className="text-xs font-mono font-normal bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded border border-indigo-500/50">v2.0</span>
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Nivel Estratégico - Modo Auditoría Activo
              </p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg border border-indigo-500/20">
            <ExternalLink size={16} /> Volver al Ecosistema
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Mobile Tabs */}
        <div className="md:hidden overflow-x-auto flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
          {ADMIN_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-bold transition-colors border-b-2 ${activeTab === tab.id ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Desktop Sidebar Tabs */}
        <div className="w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 overflow-y-auto hidden md:block flex-shrink-0">
          <div className="p-4 space-y-1">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-3 mt-2">Módulos Administrativos</div>
            {ADMIN_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className={`mt-0.5 ${activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                  {tab.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold">{tab.label}</div>
                  <div className={`text-[10px] mt-0.5 ${activeTab === tab.id ? 'text-indigo-500/70 dark:text-indigo-400/70' : 'text-slate-400'}`}>{tab.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'settings' && <SettingsTab />}
            {activeTab === 'identity' && <IdentityTab />}
            {activeTab === 'devops' && <DevOpsTab />}
            {activeTab === 'governance' && <GovernanceTab />}
            {activeTab === 'topology' && <TopologyTab />}
            {activeTab === 'broadcast' && <BroadcastTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline terminal icon for header
function Terminal(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}
