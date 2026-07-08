import React, { useState } from 'react';
import { BarChart3, Download, Settings, Filter, Layers, ChevronRight, Users, Activity, MapPin, CheckCircle2, FileText, LayoutDashboard, Edit3, PieChart, Table, ShieldAlert, Menu, X } from 'lucide-react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useSaaSContext } from '../context/SaaSContext';
import StatisticsHome from './dashboards/StatisticsHome';
import DataQualityAudit from './dashboards/statistics/DataQualityAudit';
import Dhis2Visualizer from './dashboards/statistics/Dhis2Visualizer';
import DataEntryMenu from './dashboards/statistics/DataEntryMenu';
import ReportsMenu from './dashboards/statistics/ReportsMenu';
import OrgUnitTree from './OrgUnitTree';

export default function StatisticsHub() {
  const { user } = useAppContext();
  const { config } = useSaaSContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Determine user scope
  const isRegional = user?.level === 'ADMIN' || user?.level === 'L0_STRATEGIC' || user?.level === 'L1_CENTRAL';
  const userAsic = user?.asicAccess || 'N/A';
  const isRoot = location.pathname === '/stats' || location.pathname === '/stats/';

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 relative">
      {/* Mobile Sidebar Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden absolute top-4 right-4 z-20 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar: DHIS2 Org Unit Tree */}
      <div className={`absolute md:relative z-20 md:z-0 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} w-72 lg:w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl md:shadow-sm h-full overflow-hidden`}>
        <div className="h-full pt-14 md:pt-0">
          <OrgUnitTree />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 md:p-6 pt-16 md:pt-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-bold">
               <Link to="/" className="hover:text-indigo-600">Inicio</Link>
                {!isRoot && (
                 <>
                   <ChevronRight size={14} />
                   <Link to="/stats" className="hover:text-indigo-600">CEIS</Link>
                   <ChevronRight size={14} />
                   <span className="text-slate-700 dark:text-slate-300">Módulo</span>
                 </>
               )}
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2 pr-12 md:pr-0">
              <BarChart3 className="text-indigo-600" />
              {config.modules.stats?.appTitle || config.modules.stats?.name || 'CEIS - Estadística e Información'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              {config.modules.stats?.welcomeMessage || (isRegional ? 'Sistema Integrado de Análisis de Datos (Nivel Regional)' : `Panel de Control ASIC: ${userAsic}`)}
            </p>
          </div>
          <div className="flex gap-2">
            {isRegional && (
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">
                <Filter size={16} /> Filtros Globales
              </button>
            )}
          </div>
        </div>

        <Routes>
          <Route path="/" element={
            <div className="space-y-6">
              <StatisticsHome />
              <div className="mt-8">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Layers className="text-indigo-500" />
                  Módulos del Sistema (CEIS)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/stats/data-entry" className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 transition-all group">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                      <Edit3 size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Carga de Datos (SIS)</h3>
                    <p className="text-sm text-slate-500 mt-2">Formatos estadísticos EPI-10, DSP-04, etc.</p>
                  </Link>
                  
                  <Link to="/stats/visualizer" className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500 transition-all group">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                      <PieChart size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Visualizador DHIS2</h3>
                    <p className="text-sm text-slate-500 mt-2">Tablas dinámicas y análisis de morbilidad.</p>
                  </Link>

                  <Link to="/stats/reports" className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-500 transition-all group">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                      <Table size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Reportes Estándar</h3>
                    <p className="text-sm text-slate-500 mt-2">Generación de boletines y consolidados.</p>
                  </Link>

                  <Link to="/stats/audit" className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-rose-500 transition-all group">
                    <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
                      <ShieldAlert size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Auditoría</h3>
                    <p className="text-sm text-slate-500 mt-2">Calidad de datos y cierre epidemiológico.</p>
                  </Link>
                </div>
              </div>
            </div>
          } />
          <Route path="data-entry" element={<DataEntryMenu />} />
          <Route path="visualizer" element={<Dhis2Visualizer />} />
          <Route path="reports" element={<ReportsMenu />} />
          <Route path="audit" element={<DataQualityAudit />} />
        </Routes>
      </div>
    </div>
  );
}
