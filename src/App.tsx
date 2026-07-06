import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, Layers, Cloud, CloudOff, RefreshCw, HelpCircle, Users, Menu, X, BarChart3, LayoutGrid, Settings, Info, Search, Home, ClipboardList, Shield, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Epi10Form from './components/Epi10Form';
import Dsp04Form from './components/Dsp04Form';
import WelcomeHub from './components/WelcomeHub';
import StatisticsHub from './components/StatisticsHub';
import DataEntryHub from './components/DataEntryHub';
import { HelpModal } from './components/Modals';
import SettingsModule from './components/SettingsModule';
import { useAppContext } from './context/AppContext';
import OrgUnitTree from './components/OrgUnitTree';
import { SYSTEM_ROLES, AccessLevel } from './types';
import LoginScreen from './components/LoginScreen';

function TopNav({ toggleSidebar, isSidebarOpen, showSidebarToggle }: { toggleSidebar: () => void, isSidebarOpen: boolean, showSidebarToggle: boolean }) {
  const { syncStatus, user, setUser, setIsSettingsOpen, isAppsOpen, setIsAppsOpen } = useAppContext();
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

  const allApps: { name: string, path: string, icon: React.ReactNode, roles: AccessLevel[] }[] = [
    { name: 'Inicio', path: '/', icon: <Home size={22} className="text-slate-600 dark:text-slate-300" />, roles: ['L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'] },
    { name: 'Sala Situacional', path: '/stats', icon: <BarChart3 size={22} className="text-emerald-600" />, roles: ['L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL'] },
    { name: 'Estadística ASIC', path: '/stats', icon: <BarChart3 size={22} className="text-emerald-600" />, roles: ['L2_LOCAL', 'L3_OPERATIONAL'] },
    { name: 'Módulos de Carga', path: '/modules', icon: <Layers size={22} className="text-blue-600" />, roles: ['L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'] },
    { name: 'Configuración', path: '/settings', icon: <Settings size={22} className="text-slate-600 dark:text-slate-300" />, roles: ['L1_CENTRAL', 'L0_STRATEGIC', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'] }
  ];

  const allowedApps = allApps.filter(app => app.roles.includes(user.level));

  return (
    <header className="bg-blue-900 text-white h-12 flex items-center justify-between px-3 shadow-md flex-shrink-0 z-40 relative">
      <div className="flex items-center gap-3">
        {showSidebarToggle && (
          <button onClick={toggleSidebar} className="p-1.5 hover:bg-blue-800 rounded transition-colors text-blue-100">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center font-bold shadow-sm text-white">
            <Activity size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight uppercase hidden sm:block">DHIS2 Barinas</h1>
            <h1 className="text-sm font-bold tracking-tight uppercase sm:hidden">DHIS2</h1>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Sync Status */}
        <div className="hidden sm:flex items-center gap-1.5 bg-blue-950/40 px-2 py-1 rounded border border-blue-800/50 mr-2">
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
        
        {/* User Profile & Role Switcher */}
        <div className="relative" ref={userMenuRef}>
          <div 
            className="flex items-center gap-2 hover:bg-blue-800 px-2 py-1 rounded cursor-pointer transition-colors"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold uppercase leading-tight text-white">{user.name}</p>
              <p className="text-[9px] text-blue-300 uppercase leading-tight">{user.title}</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-blue-700 border border-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              <Users size={14} />
            </div>
          </div>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cambiar Rol </span>
              </div>
              <div className="flex flex-col max-h-96 overflow-y-auto">
                {Object.values(SYSTEM_ROLES).map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setUser(role);
                      setIsUserMenuOpen(false);
                    }}
                    className={`text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex flex-col ${user.id === role.id ? 'bg-blue-50/50 dark:bg-blue-900/30 border-l-2 border-blue-600' : 'border-l-2 border-transparent'}`}
                  >
                    <span className={`text-xs font-bold ${user.id === role.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>{role.name}</span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{role.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Apps Menu */}
        <div className="relative" ref={appsMenuRef}>
          <button 
            onClick={() => setIsAppsOpen(!isAppsOpen)}
            className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${isAppsOpen ? 'bg-blue-950 text-white' : 'text-blue-100 hover:bg-blue-800'}`}
          >
            <LayoutGrid size={18} />
          </button>

          {isAppsOpen && (
            <div className="absolute right-0 top-full mt-2 w-[320px] bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Buscar aplicaciones..." className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded pl-8 pr-3 py-1.5 text-xs outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 p-2 max-h-96 overflow-y-auto">
                {allowedApps.map((app, idx) => (
                  <Link 
                    key={idx} 
                    to={app.path}
                    onClick={() => setIsAppsOpen(false)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-center cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      {app.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 leading-tight group-hover:text-blue-700 dark:group-hover:text-blue-400">{app.name}</span>
                  </Link>
                ))}
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

function MainLayout() {
  const { user, setIsAppsOpen } = useAppContext();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  const showSidebar = currentPath.startsWith('/stats');

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
    <div className="bg-slate-50 dark:bg-slate-950 h-screen w-full flex flex-col font-sans text-slate-900 dark:text-slate-100 overflow-hidden select-none text-sm">
      <TopNav 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
        showSidebarToggle={showSidebar}
      />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && isSidebarOpen && (
          <div 
            className="md:hidden absolute inset-0 bg-slate-900/50 z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Left DHIS2-style Organization Unit Tree - Only in Stats */}
        <AnimatePresence>
          {showSidebar && isSidebarOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="absolute md:relative z-30 h-full shadow-lg md:shadow-sm border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="w-[320px] h-full overflow-hidden">
                <OrgUnitTree />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900 relative">
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<PageWrapper keyProp="home"><div className="flex-1 overflow-y-auto"><WelcomeHub /></div></PageWrapper>} />
              <Route path="/modules" element={<PageWrapper keyProp="modules"><div className="flex-1 overflow-y-auto"><DataEntryHub /></div></PageWrapper>} />
              <Route path="/stats" element={<PageWrapper keyProp="stats"><div className="flex-1 overflow-y-auto"><StatisticsHub /></div></PageWrapper>} />
              <Route path="/module/epi10" element={<PageWrapper keyProp="epi10"><div className="flex-1 flex flex-col h-full p-2 sm:p-4 overflow-hidden"><Epi10Form /></div></PageWrapper>} />
              <Route path="/module/dsp04" element={<PageWrapper keyProp="dsp04"><div className="flex-1 flex flex-col h-full p-2 sm:p-4 overflow-hidden"><Dsp04Form /></div></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper keyProp="settings"><div className="flex-1 overflow-y-auto p-4 md:p-6"><SettingsModule /></div></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer / Mobile nav completely removed in favor of top Apps Menu */}

      <footer className="hidden md:flex bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-8 px-4 md:px-6 items-center justify-between text-[9px] font-bold text-slate-400 dark:text-slate-400 tracking-widest uppercase flex-shrink-0">
        <div>SALUD BARINAS © {new Date().getFullYear()}</div>
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

