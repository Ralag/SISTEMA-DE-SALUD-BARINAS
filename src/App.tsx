import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Activity, LayoutDashboard, Layers, Cloud, CloudOff, RefreshCw, HelpCircle, Users, Menu, X, BarChart3, LayoutGrid, Settings, Info, Search, Home, ClipboardList, Shield, MessageSquare, Package, MonitorSmartphone, Kanban, FileText, HeartPulse, ShieldCheck } from 'lucide-react';
import { Edit3, PieChart, Table, ShieldAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Epi10Form from './components/Epi10Form';
import Dsp04Form from './components/Dsp04Form';
import WelcomeHub from './components/WelcomeHub';
import EpidemiologyHub from './components/EpidemiologyHub';
import LogisticsHub from './components/LogisticsHub';
import HRHub from './components/HRHub';
import SACSHub from './components/SACSHub';
import ImmunizationHub from './components/ImmunizationHub';
import NetworksHub from './components/NetworksHub';
import ProgramsHub from './components/ProgramsHub';
import StatisticsHub from './components/StatisticsHub';
import { HelpModal } from './components/Modals';
import ToastContainer from './components/ToastContainer';
import SettingsModule from './components/SettingsModule';
import { useAppContext } from './context/AppContext';
import AdminConfigDashboard from './components/dashboards/AdminConfigDashboard';
import { useSaaSContext } from './context/SaaSContext';
import { AccessLevel } from './types';
import LoginScreen from './components/LoginScreen';

function TopNav({ toggleSidebar, isSidebarOpen, showSidebarToggle }: { toggleSidebar: () => void, isSidebarOpen: boolean, showSidebarToggle: boolean }) {
  const { syncStatus, user, setUser, setIsSettingsOpen, isAppsOpen, setIsAppsOpen } = useAppContext();
  const { config } = useSaaSContext();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const appsMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (appsMenuRef.current && !appsMenuRef.current.contains(event.target as Node)) {
        setIsAppsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  

  const allApps: { name: string, path: string, icon: React.ReactNode, roles: AccessLevel[], departments?: string[] }[] = [
    { name: 'Configuración SaaS', path: '/admin-saas', icon: <MonitorSmartphone size={22} className="text-indigo-600" />, roles: ['ADMIN', 'MODERATOR'], departments: ['SISTEMAS', 'INFORMATICA'] },
    { name: config.modules.home?.name || 'Workspace (Inicio)', path: '/', icon: <LayoutDashboard size={22} className="text-slate-600" />, roles: ['L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'] },
    { name: config.modules.epidemiology?.name || 'Epidemiología', path: '/epidemiology', icon: <Activity size={22} className="text-emerald-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL'], departments: ['EPIDEMIOLOGIA'] },
    { name: config.modules.stats?.name || 'Estadística (CEIS)', path: '/stats', icon: <BarChart3 size={22} className="text-cyan-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL'], departments: ['ESTADISTICA', 'DIRECTOR_ASIC', 'ESTADISTICA_ASIC'] },
    { name: 'EPI-10 (Morbilidad)', path: '/module/epi10', icon: <ClipboardList size={22} className="text-emerald-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL', 'L3_OPERATIONAL'], departments: ['EPIDEMIOLOGIA', 'ESTADISTICA', 'ESTADISTICA_ASIC', 'DIRECTOR_ASIC'] },
    { name: 'DSP-04 (Gestión)', path: '/module/dsp04', icon: <FileText size={22} className="text-blue-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL', 'L3_OPERATIONAL'], departments: ['ESTADISTICA', 'ESTADISTICA_ASIC', 'DIRECTOR_ASIC'] },
    { name: 'Inmunización (PAI)', path: '/immunization', icon: <HeartPulse size={22} className="text-indigo-600" />, roles: ['L1_TACTICAL', 'L2_LOCAL'], departments: ['INMUNIZACION'] },
    { name: 'Programas de Salud', path: '/programs', icon: <HeartPulse size={22} className="text-purple-600" />, roles: ['L1_TACTICAL', 'L2_LOCAL'], departments: ['TUBERCULOSIS', 'ITS_VIH', 'CAREMT', 'SALUD_FAMILIAR', 'SALUD_COMUNITARIA', 'MALARIOLOGIA', 'PROGRAMAS_SALUD'] },
    { name: 'SEFAR (Logística)', path: '/logistics', icon: <Package size={22} className="text-blue-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL'], departments: ['SEFAR'] },
    { name: 'Recursos Humanos', path: '/hr', icon: <Users size={22} className="text-amber-600" />, roles: ['L1_CENTRAL'], departments: ['RRHH'] },
    { name: 'Contraloría (SACS)', path: '/sacs', icon: <ShieldCheck size={22} className="text-rose-600" />, roles: ['L1_CENTRAL'], departments: ['SACS'] },
    { name: 'Redes de Atención', path: '/networks', icon: <Layers size={22} className="text-blue-600" />, roles: ['L1_CENTRAL'], departments: ['RED_ATENCION'] },
    { name: 'Configuración', path: '/settings', icon: <Settings size={22} className="text-slate-600 dark:text-slate-300" />, roles: ['L1_CENTRAL', 'L0_STRATEGIC', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'] },
  
    { name: 'Carga de Datos (SIS)', path: '/stats/data-entry', icon: <Edit3 size={22} className="text-indigo-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL', 'L3_OPERATIONAL'], departments: ['ESTADISTICA', 'ESTADISTICA_ASIC', 'DIRECTOR_ASIC'] },
    { name: 'Visualizador DHIS2', path: '/stats/visualizer', icon: <PieChart size={22} className="text-emerald-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL'], departments: ['ESTADISTICA', 'EPIDEMIOLOGIA', 'ESTADISTICA_ASIC', 'DIRECTOR_ASIC'] },
    { name: 'Reportes Estándar', path: '/stats/reports', icon: <Table size={22} className="text-blue-600" />, roles: ['L1_CENTRAL', 'L2_LOCAL'], departments: ['ESTADISTICA', 'EPIDEMIOLOGIA', 'ESTADISTICA_ASIC', 'DIRECTOR_ASIC'] },
    { name: 'Auditoría', path: '/stats/audit', icon: <ShieldAlert size={22} className="text-rose-600" />, roles: ['L1_CENTRAL'], departments: ['ESTADISTICA'] },
  ];
  const allowedApps = allApps.filter(app => {
    if (user.level === 'ADMIN' || user.level === 'L0_STRATEGIC' || user.department === 'DES') return true;
    if (!app.roles.includes(user.level)) return false;
    if (app.departments && !app.departments.includes(user.department)) return false;
    return true;
  });

  return (
    <header className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 h-14 flex items-center justify-between px-4 shadow-sm border-b border-slate-200 dark:border-slate-800 flex-shrink-0 z-40 relative">
      <div className="flex items-center gap-3">
        {showSidebarToggle && (
          <button onClick={toggleSidebar} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-slate-500">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center justify-center font-bold shadow-sm">
            {config.primaryLogoUrl ? <img src={config.primaryLogoUrl} alt="Logo" className="w-5 h-5 object-contain" /> : <Activity size={16} />}
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight font-display hidden sm:block">{config.appName}</h1>
            <h1 className="text-sm font-bold tracking-tight font-display sm:hidden">{config.appName}</h1>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Sync Status */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 mr-2">
          {syncStatus === 'syncing' ? (
            <RefreshCw size={12} className="text-amber-400 animate-spin" />
          ) : syncStatus === 'error' ? (
            <CloudOff size={12} className="text-rose-400" />
          ) : (
            <Cloud size={12} className="text-emerald-400" />
          )}
          <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">
            {syncStatus === 'syncing' ? 'Sincronizando' : syncStatus === 'error' ? 'Desconectado' : 'En Línea'}
          </span>
        </div>
        
                {/* Integrated User & Apps Menu */}
        <div className="relative" ref={userMenuRef}>
          <div 
            className={`flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-colors border ${isUserMenuOpen ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold uppercase leading-tight text-slate-800 dark:text-slate-100">{user.name}</p>
              <p className="text-[9px] text-slate-500 uppercase leading-tight">{user.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-700 border border-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                <Users size={14} />
              </div>
              <LayoutGrid size={16} className="text-slate-400" />
            </div>
          </div>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-[340px] bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-700 border border-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase text-slate-800 dark:text-slate-100">{user.name}</p>
                    <p className="text-xs text-slate-500 uppercase">{user.department}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 px-1">Módulos Disponibles</p>
                <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto custom-scrollbar">
                  {allowedApps.map((app, idx) => (
                    <Link 
                      key={idx} 
                      to={app.path}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-center cursor-pointer group"
                    >
                      <div className="w-10 h-10 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        {app.icon}
                      </div>
                      <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400">{app.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="p-2 bg-slate-50 dark:bg-slate-800/50">
                <button
                  onClick={() => {
                    setUser(null);
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors flex items-center gap-2"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const PageWrapper = ({ children, keyProp }: { children: React.ReactNode, keyProp: string }) => (
  <motion.div
    key={keyProp}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="flex-1 flex flex-col overflow-hidden h-full"
  >
    {children}
  </motion.div>
);

function HomeRouter() {
  const { user } = useAppContext();
  
  if (!user) return null;

  // Auto-redirect user to their specific hub based on department
  if (user.level === 'MODERATOR') {
    return <Navigate to="/admin-saas" replace />;
  }
  if (user.department === 'ESTADISTICA' || user.department === 'DIRECTOR_ASIC' || user.department === 'ESTADISTICA_ASIC') {
    return <Navigate to="/stats" replace />;
  }
  if (user.department === 'EPIDEMIOLOGIA') {
    return <Navigate to="/epidemiology" replace />;
  }
  if (user.department === 'INMUNIZACION') {
    return <Navigate to="/immunization" replace />;
  }
  if (user.department === 'SEFAR') {
    return <Navigate to="/logistics" replace />;
  }
  if (user.department === 'RRHH') {
    return <Navigate to="/hr" replace />;
  }
  if (user.department === 'SACS') {
    return <Navigate to="/sacs" replace />;
  }
  if (user.department === 'RED_ATENCION') {
    return <Navigate to="/networks" replace />;
  }
  if (['TUBERCULOSIS', 'ITS_VIH', 'CAREMT', 'SALUD_FAMILIAR', 'SALUD_COMUNITARIA', 'MALARIOLOGIA', 'PROGRAMAS_SALUD'].includes(user.department)) {
    return <Navigate to="/programs" replace />;
  }

  // Fallback to WelcomeHub for Admins or undefined roles
  return <WelcomeHub />;
}

function MainLayout() {
  const { user, setIsAppsOpen } = useAppContext();
  const { config } = useSaaSContext();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  const showSidebar = false; // Sidebar removed from global layout

  // Auto-close sidebar on mobile when navigating away from stats
  useEffect(() => {
    if (!showSidebar) {
      setIsSidebarOpen(false);
    }
  }, [showSidebar]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsAppsOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        navigate('/settings');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAppsOpen, navigate]);

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 bg-grid-pattern h-screen w-full flex flex-col font-sans text-slate-900 dark:text-slate-100 overflow-hidden select-none text-sm">
      <ToastContainer />
      <TopNav 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
        showSidebarToggle={showSidebar}
      />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative">
        <main className="flex-1 flex flex-col overflow-hidden bg-transparent relative">
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<PageWrapper keyProp="home"><div className="h-full overflow-y-auto w-full"><HomeRouter /></div></PageWrapper>} />
              <Route path="/epidemiology" element={<PageWrapper keyProp="epidemiology"><div className="h-full overflow-y-auto w-full flex flex-col"><EpidemiologyHub /></div></PageWrapper>} />
              <Route path="/stats/*" element={<PageWrapper keyProp="stats"><div className="h-full overflow-y-auto w-full flex flex-col"><StatisticsHub /></div></PageWrapper>} />
              <Route path="/logistics" element={<PageWrapper keyProp="logistics"><div className="h-full overflow-y-auto w-full"><LogisticsHub /></div></PageWrapper>} />
              <Route path="/hr" element={<PageWrapper keyProp="hr"><div className="h-full overflow-y-auto w-full"><HRHub /></div></PageWrapper>} />
              <Route path="/sacs" element={<PageWrapper keyProp="sacs"><div className="h-full overflow-y-auto w-full"><SACSHub /></div></PageWrapper>} />
              <Route path="/networks" element={<PageWrapper keyProp="networks"><div className="h-full overflow-y-auto w-full"><NetworksHub /></div></PageWrapper>} />
              <Route path="/immunization" element={<PageWrapper keyProp="immunization"><div className="h-full overflow-y-auto w-full"><ImmunizationHub /></div></PageWrapper>} />
              <Route path="/programs" element={<PageWrapper keyProp="programs"><div className="h-full overflow-y-auto w-full"><ProgramsHub /></div></PageWrapper>} />
              <Route path="/module/epi10" element={<PageWrapper keyProp="epi10"><div className="h-full overflow-y-auto w-full p-2 sm:p-4"><Epi10Form /></div></PageWrapper>} />
              <Route path="/module/dsp04" element={<PageWrapper keyProp="dsp04"><div className="h-full overflow-y-auto w-full p-2 sm:p-4"><Dsp04Form /></div></PageWrapper>} />
              <Route path="/admin-saas" element={<PageWrapper keyProp="admin-saas"><div className="h-full overflow-y-auto w-full"><AdminConfigDashboard /></div></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper keyProp="settings"><div className="h-full overflow-y-auto w-full p-4 md:p-6"><SettingsModule /></div></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer / Mobile nav completely removed in favor of top Apps Menu */}

      <footer className="hidden md:flex bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-8 px-4 md:px-6 items-center justify-between text-[9px] font-bold text-slate-400 dark:text-slate-400 tracking-widest uppercase flex-shrink-0">
        <div>{config.appName?.toUpperCase() || 'SALUD BARINAS'} © {new Date().getFullYear()}</div>
        <div className="flex gap-4 md:gap-6">
          <button 
            onClick={() => setShowHelpModal(true)}
            className="text-emerald-600 hover:text-emerald-700 font-bold cursor-pointer flex items-center gap-1 transition-colors"
          >
            <HelpCircle size={10} />
            AYUDA Y SOPORTE
          </button>
        </div>
      </footer>

      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

