import React, { useState, useMemo, useEffect } from 'react';
import { BarChart3, Filter, Download, Search, FileSpreadsheet, MapPin, ShieldAlert, Folder, Building2, Hospital, Activity, ChevronRight, Layers, LayoutDashboard, MoreHorizontal, Maximize2, Share2, Presentation, ChevronDown, ListFilter, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { HEALTH_HIERARCHY } from '../data/hierarchy';
import { useAppContext } from '../context/AppContext';
import { MPPS_PROGRAMS } from '../data/departments';
import GeoMapBarinas from './GeoMapBarinas';

const COLORS = ['#0ea5e9', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#64748b'];

interface DashboardType {
  id: string;
  name: string;
  group?: string;
}
const ALL_DASHBOARDS: DashboardType[] = [
  { id: 'general', name: 'Resumen Epidemiológico General' },
  ...MPPS_PROGRAMS.filter(p => p.hasStats).map(p => ({
    id: p.id,
    name: `Estadística: ${p.name}`,
    group: p.group
  }))
];

const SkeletonFolder = () => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col animate-pulse h-[200px]">
    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 mb-4"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-2"></div>
    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2 mb-6"></div>
    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
      <div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      </div>
      <div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      </div>
    </div>
  </div>
);

const SkeletonWidget = ({ className }: { className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col p-4 animate-pulse ${className}`}>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
  </div>
);

export default function StatisticsHub() {
  const { user, location, setLocation } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'dashboard' | 'folders'>('dashboard');
  
  // Dynamic Dashboards based on Role
  const availableDashboards = useMemo(() => {
    const isStrategicOrAdmin = user.level === 'L0_STRATEGIC' || user.level === 'ADMIN' || user.department === 'SISTEMAS' || user.department === 'EPIDEMIOLOGIA' || user.department === 'ESTADISTICA' || user.department === 'DIRECTOR_ASIC' || user.department === 'ESTADISTICA_ASIC';
    
    if (isStrategicOrAdmin) return ALL_DASHBOARDS;
    
    // Si es Táctico (Coord de Programa) o Operativo (CPT / Médico especializado)
    const dept = user.department?.toUpperCase();
    
    // Si su departamento coincide con un ID de programa o un GROUP
    const allowed = ALL_DASHBOARDS.filter(d => {
      if (d.id === 'general') return true; // Todos ven el general
      if (d.id === dept) return true; // Match directo con el programa
      
      // Chequear si el departamento del usuario es el GRUPO del programa (ej: Coord CAREMT ve todos los de CAREMT)
      if (d.group && d.group.toUpperCase() === dept) return true;
      
      return false;
    });
    
    // Sort so general is first, or maybe their specific is first
    return allowed.reverse(); 
  }, [user.level, user.department]);

  // DHIS2 Specific UI States
  const [activeDashboard, setActiveDashboard] = useState(availableDashboards[0]);
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!availableDashboards.find(d => d.id === activeDashboard.id)) {
      setActiveDashboard(availableDashboards[0]);
    }
  }, [availableDashboards, activeDashboard]);

  // Trigger loading simulation on context change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate network request for DHIS2
    return () => clearTimeout(timer);
  }, [location, activeDashboard, viewMode]);

  // Determine current view level
  const isStateLevel = !location.asic && !location.cpt;
  const isAsicLevel = !!location.asic && !location.cpt;
  const isCptLevel = !!location.asic && !!location.cpt;

  // Generate data based on level for folders view
  const viewData = useMemo(() => {
    let items: any[] = [];
    
    if (isStateLevel) {
      const asics = (user.level === 'L2_LOCAL' || user.level === 'L3_OPERATIONAL') && user.asicAccess 
        ? HEALTH_HIERARCHY.asics.filter(a => a.name === user.asicAccess)
        : HEALTH_HIERARCHY.asics;
        
      items = asics.map(asic => ({
        id: asic.name,
        type: 'asic',
        name: asic.name,
        icon: <Building2 className="text-blue-500" size={40} />,
        color: 'blue',
        stats: {
          cpts: asic.units.length,
          consultas: Math.floor(Math.random() * 5000) + 1000,
          morbilidad: Math.floor(Math.random() * 2000) + 500
        }
      }));
    } else if (isAsicLevel) {
      const asic = HEALTH_HIERARCHY.asics.find(a => a.name === location.asic);
      if (asic) {
        let units = asic.units;
        if (user.level === 'L3_OPERATIONAL' && user.cptAccess) {
          units = units.filter(u => u.name === user.cptAccess);
        }
        items = units.map(unit => ({
          id: unit.id,
          type: 'cpt',
          name: unit.name,
          icon: unit.type === 'Hospital' ? <Hospital className="text-emerald-500" size={40} /> : <MapPin className="text-emerald-500" size={40} />,
          color: 'emerald',
          stats: {
            consultas: Math.floor(Math.random() * 500) + 100,
            morbilidad: Math.floor(Math.random() * 200) + 50
          }
        }));
      }
    }
    
    return items;
  }, [location, user]);

  // Mock data for Recharts Dashboard
  const dashboardData = useMemo(() => {
    const multiplier = isStateLevel ? 100 : (isAsicLevel ? 10 : 1);
    const varFactor = activeDashboard.group === 'CAREMT' ? 1.5 : 1;
    
    return {
      morbilidadData: [
        { name: 'IRA', casos: Math.floor(Math.random() * 50 * multiplier) + 10 * multiplier },
        { name: 'Diarrea', casos: Math.floor(Math.random() * 40 * multiplier) + 10 * multiplier },
        { name: 'HTA', casos: Math.floor(Math.random() * 60 * multiplier * varFactor) + 20 * multiplier },
        { name: 'Diabetes', casos: Math.floor(Math.random() * 30 * multiplier * varFactor) + 5 * multiplier },
        { name: 'Asma', casos: Math.floor(Math.random() * 25 * multiplier) + 5 * multiplier },
      ].sort((a, b) => b.casos - a.casos),
      tendenciaData: Array.from({ length: 12 }).map((_, i) => ({
        name: `Sem ${20 + i}`,
        'Consultas Totales': Math.floor(Math.random() * 100 * multiplier) + 50 * multiplier,
        'Casos Notificados': Math.floor(Math.random() * 40 * multiplier) + 10 * multiplier,
      })),
      coberturaData: [
        { name: 'Ambulatorios', 'Cobertura %': Math.floor(Math.random() * 30) + 60 },
        { name: 'Hospitales', 'Cobertura %': Math.floor(Math.random() * 20) + 80 },
        { name: 'Consultorios', 'Cobertura %': Math.floor(Math.random() * 40) + 40 },
        { name: 'CDI', 'Cobertura %': Math.floor(Math.random() * 25) + 70 },
      ]
    };
  }, [isStateLevel, isAsicLevel, activeDashboard.id]);

  const handleNavigateDown = (item: any) => {
    if (item.type === 'asic') {
      setLocation({ state: HEALTH_HIERARCHY.state, asic: item.name, cpt: '', orgUnitId: `ASIC_${item.name}` });
    } else if (item.type === 'cpt') {
      setLocation({ state: HEALTH_HIERARCHY.state, asic: location.asic, cpt: item.name, orgUnitId: item.id });
    }
  };

  const handleNavigateUp = () => {
    if (isCptLevel) {
      setLocation({ state: HEALTH_HIERARCHY.state, asic: location.asic, cpt: '', orgUnitId: `ASIC_${location.asic}` });
    } else if (isAsicLevel) {
      setLocation({ state: HEALTH_HIERARCHY.state, asic: '', cpt: '', orgUnitId: 'STATE_BARINAS' });
    }
  };

  // Group dashboards by category for the dropdown
  const groupedDashboards = useMemo(() => {
    const groups: Record<string, DashboardType[]> = {
      'Generales': [],
    };
    availableDashboards.forEach(d => {
      const g = (d as any).group || 'Generales';
      if (!groups[g]) groups[g] = [];
      groups[g].push(d);
    });
    return groups;
  }, [availableDashboards]);

  return (
    <div className="h-full flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden relative">
      {/* Top Action Bar (DHIS2 Style) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 py-2 z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsDashboardMenuOpen(!isDashboardMenuOpen)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-md font-medium text-sm transition-colors border border-slate-200 dark:border-slate-700"
            >
              <LayoutDashboard size={16} className="text-[#1c557a] dark:text-blue-400"/>
              {activeDashboard.name}
              <ChevronDown size={14} className="text-slate-500" />
            </button>
            
            {/* Dropdown Menu for Dashboards */}
            <AnimatePresence>
              {isDashboardMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDashboardMenuOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-xl z-50 overflow-hidden max-h-[60vh] overflow-y-auto custom-scrollbar"
                  >
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <input 
                        type="text" 
                        placeholder="Buscar tablero..." 
                        className="w-full text-sm p-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="py-1">
                      {(Object.entries(groupedDashboards) as [string, DashboardType[]][]).map(([groupName, items]) => (
                        <div key={groupName} className="mb-2 last:mb-0">
                          {groupName !== 'Generales' && (
                            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50">
                              {groupName}
                            </div>
                          )}
                          {items.map(d => (
                            <button
                              key={d.id}
                              onClick={() => {
                                setActiveDashboard(d);
                                setIsDashboardMenuOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                                ${activeDashboard.id === d.id ? 'text-[#1c557a] dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-300'}`}
                            >
                              <BarChart3 size={14} className={activeDashboard.id === d.id ? 'opacity-100' : 'opacity-40'}/>
                              {d.name}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setViewMode('dashboard')}
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'dashboard' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Vista de Tablero (Visualizaciones)"
            >
              <Presentation size={16} />
            </button>
            <button 
              onClick={() => setViewMode('folders')}
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'folders' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Vista de Carpetas (Navegación Organizativa)"
            >
              <Folder size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Filtrar datos">
            <Filter size={16} />
          </button>
          <button className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors" title="Compartir">
            <Share2 size={16} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c557a] hover:bg-blue-800 text-white rounded-md text-sm font-medium transition-colors shadow-sm ml-2">
            <Download size={14} />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${location.orgUnitId}-${activeDashboard.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-[1400px] mx-auto h-full"
          >
            
        {viewMode === 'folders' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Visor de Unidades Organizativas</h1>
                <p className="text-sm text-slate-500">Navegación espacial de datos de salud</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                <MapPin size={16} className="text-emerald-600" />
                {HEALTH_HIERARCHY.state} 
                {location.asic && <><ChevronRight size={14}/> {location.asic}</>}
                {location.cpt && <><ChevronRight size={14}/> {location.cpt}</>}
              </div>
            </div>

            {!isStateLevel && (
              <button 
                onClick={handleNavigateUp}
                className="flex items-center gap-2 text-[#1c557a] dark:text-blue-400 font-bold text-sm bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-200 dark:border-blue-800/50"
              >
                Nivel Superior
              </button>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {isLoading ? (
                Array.from({length: 8}).map((_, i) => <SkeletonFolder key={i}/>)
              ) : (
                viewData.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => handleNavigateDown(item)}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all group flex flex-col text-left h-[200px]"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-500 mb-4">{item.type === 'asic' ? 'Área de Salud Integral' : 'Consultorio Popular'}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 w-full">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Consultas</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.stats.consultas.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Casos</p>
                        <p className="text-sm font-bold text-[#f43f5e]">{item.stats.morbilidad.toLocaleString()}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
            {isCptLevel && viewData.length === 0 && (
              <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <MapPin className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={48} />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Nivel Operativo Final</h3>
                <p className="text-slate-500">Este es el nivel más bajo de la jerarquía. No hay más subdivisiones.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{activeDashboard.name}</h1>
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin size={14} /> 
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {location.cpt || location.asic || HEALTH_HIERARCHY.state}
                  </span>
                  <span className="mx-1 text-slate-300">•</span>
                  Período: Semana 26, 2026
                </p>
              </div>
            </div>

            {/* Widgets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              
              {isLoading ? (
                <>
                  <SkeletonWidget className="md:col-span-2 xl:col-span-3 h-[300px]" />
                  <SkeletonWidget className="md:col-span-2 xl:col-span-2 h-[350px]" />
                  <SkeletonWidget className="md:col-span-1 xl:col-span-1 h-[350px]" />
                </>
              ) : (
                <>
                {/* Trend Line Chart */}
                <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:col-span-2 xl:col-span-3 min-h-[300px]">
                  <div className="p-2.5 flex items-center justify-between border-b border-transparent group hover:bg-slate-50 dark:bg-slate-800/50 transition-colors">
                    <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 px-1">Tendencia Temporal ({activeDashboard.id})</h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-300 rounded bg-transparent"><Download size={14}/></button>
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-300 rounded bg-transparent"><Maximize2 size={14}/></button>
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-300 rounded bg-transparent"><MoreHorizontal size={16}/></button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dashboardData.tendenciaData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{fontSize: 11, fill: '#64748b'}} axisLine={{stroke: '#cbd5e1'}} tickLine={false} />
                        <YAxis tick={{fontSize: 11, fill: '#64748b'}} axisLine={{stroke: '#cbd5e1'}} tickLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '4px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        <Line type="monotone" dataKey="Consultas Totales" stroke="#0ea5e9" strokeWidth={2} dot={{r: 3, fill: '#0ea5e9'}} activeDot={{r: 5}} />
                        <Line type="monotone" dataKey="Casos Notificados" stroke="#f43f5e" strokeWidth={2} dot={{r: 3, fill: '#f43f5e'}} activeDot={{r: 5}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart Widget */}
                <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:col-span-2 xl:col-span-2 min-h-[350px]">
                  <div className="p-2.5 flex items-center justify-between border-b border-transparent group hover:bg-slate-50 dark:bg-slate-800/50 transition-colors">
                    <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 px-1">Top 5 Diagnósticos por Causas ({activeDashboard.id})</h3>
                    <button className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-300 rounded bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={16}/></button>
                  </div>
                  <div className="p-4 flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboardData.morbilidadData} margin={{ top: 10, right: 30, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{fontSize: 11, fill: '#475569', fontWeight: 'bold'}} axisLine={{stroke: '#cbd5e1'}} tickLine={false} angle={-45} textAnchor="end" />
                        <YAxis tick={{fontSize: 11, fill: '#64748b'}} axisLine={{stroke: '#cbd5e1'}} tickLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '4px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          cursor={{fill: '#f8fafc'}}
                        />
                        <Bar dataKey="casos" fill="#10b981" barSize={32}>
                          {
                            dashboardData.morbilidadData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                          }
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Coverage / District Chart */}
                <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:col-span-1 xl:col-span-1 min-h-[350px]">
                  <div className="p-2.5 flex items-center justify-between border-b border-transparent group hover:bg-slate-50 dark:bg-slate-800/50 transition-colors">
                    <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 px-1">Cobertura por Red (Muestra)</h3>
                    <button className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-300 rounded bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={16}/></button>
                  </div>
                  <div className="p-4 flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboardData.coberturaData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                        <XAxis type="number" domain={[0, 100]} tick={{fontSize: 11, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis dataKey="name" type="category" tick={{fontSize: 11, fill: '#475569', fontWeight: 'bold'}} axisLine={false} tickLine={false} width={60} />
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '4px', border: '1px solid #cbd5e1' }}
                          cursor={{fill: '#f8fafc'}}
                        />
                        <Bar dataKey="Cobertura %" fill="#8b5cf6" barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Data Table Pivot Simulation */}
                <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:col-span-2 xl:col-span-3 min-h-[250px] overflow-hidden">
                  <div className="p-2.5 flex items-center justify-between border-b border-transparent group hover:bg-slate-50 dark:bg-slate-800/50 transition-colors">
                    <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 px-1">Reporte Tabular de Eventos Recientes</h3>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-300 rounded bg-transparent"><Download size={14}/></button>
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-300 rounded bg-transparent"><MoreHorizontal size={16}/></button>
                    </div>
                  </div>
                  <div className="overflow-auto border-t border-slate-100 dark:border-slate-800">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead className="bg-[#f8fafc]">
                        <tr>
                          <th className="p-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 border-b border-r border-slate-200 dark:border-slate-800">Período (Mes/Sem)</th>
                          <th className="p-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 border-b border-r border-slate-200 dark:border-slate-800">Unidad Organizativa</th>
                          <th className="p-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 border-b border-r border-slate-200 dark:border-slate-800">Elemento de Dato</th>
                          <th className="p-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 text-right">Valor Reportado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {dashboardData.morbilidadData.slice(0, 4).map((item, i) => (
                          <tr key={i} className="hover:bg-[#f1f5f9] transition-colors">
                            <td className="p-2.5 text-slate-700 dark:text-slate-200 border-r border-slate-100 dark:border-slate-800">Semana 26 (2026)</td>
                            <td className="p-2.5 text-slate-700 dark:text-slate-200 border-r border-slate-100 dark:border-slate-800 truncate">{location.cpt || location.asic || HEALTH_HIERARCHY.state}</td>
                            <td className="p-2.5 text-[#1c557a] font-medium border-r border-slate-100 dark:border-slate-800 cursor-pointer hover:underline">{item.name}</td>
                            <td className="p-2.5 text-slate-700 dark:text-slate-200 text-right font-mono bg-[#f8fafc]">{item.casos}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                </>
              )}
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
