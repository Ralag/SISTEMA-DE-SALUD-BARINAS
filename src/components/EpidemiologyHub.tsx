import React, { useState } from 'react';
import { Activity, AlertTriangle, TrendingUp, Filter, BarChart3, Layers, Edit3, MapPin, Download, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Data mock for Endemic Channel
const endemicData = Array.from({ length: 52 }, (_, i) => {
  const base = 20 + Math.sin(i / 4) * 10;
  return {
    week: `S${i + 1}`,
    exito: base * 0.8,
    seguridad: base * 1.2,
    alarma: base * 1.6,
    casosActuales: i < 24 ? base * (0.9 + Math.random() * 0.5) : null // Data up to week 24
  };
});

export default function EpidemiologyHub() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stats' | 'entry'>('dashboard');
  const { user } = useAppContext();

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full h-full flex flex-col space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm z-10">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <Activity className="text-emerald-500" /> Epidemiología Regional
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Sala de Guerra (Situacional) y Análisis Morbilidad</p>
        </div>
        
        {/* Global Filter Bar (Hyper-detailed) */}
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
           <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg px-2 py-2">
             <option>Año: 2026</option>
           </select>
           <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg px-2 py-2">
             <option>Semana: 24</option>
           </select>
           <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg px-2 py-2">
             <option>Todos los ASIC</option>
             <option>ASIC Corazón de Jesús</option>
           </select>
           <button className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1">
             <Filter size={14} /> Filtrar
           </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
         <button 
           onClick={() => setActiveTab('dashboard')}
           className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
         >
           Sala de Guerra
         </button>
         <button 
           onClick={() => setActiveTab('stats')}
           className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'stats' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
         >
           Análisis (Estadísticas)
         </button>
         <button 
           onClick={() => setActiveTab('entry')}
           className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'entry' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
         >
           Carga de Datos
         </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-[500px]">
         {activeTab === 'dashboard' && <EpidemiologyDashboard />}
         {activeTab === 'stats' && <EpidemiologyStats />}
         {activeTab === 'entry' && <EpidemiologyDataEntry user={user} />}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 1: SALA DE GUERRA
// ---------------------------------------------------------------------------
function EpidemiologyDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Endemic Channel (3 columns) */}
      <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
         <div className="flex items-center justify-between mb-4">
           <div>
             <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
               <TrendingUp className="text-emerald-500" /> Canal Endémico (Dengue)
             </h2>
             <p className="text-xs text-slate-500">Corredor Endémico - Año 2026</p>
           </div>
           <div className="flex gap-3 text-[10px] font-bold uppercase">
             <span className="flex items-center gap-1 text-emerald-500"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Éxito</span>
             <span className="flex items-center gap-1 text-amber-500"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Seguridad</span>
             <span className="flex items-center gap-1 text-rose-500"><div className="w-2 h-2 bg-rose-500 rounded-full"></div> Alarma</span>
             <span className="flex items-center gap-1 text-slate-800 dark:text-white"><div className="w-2 h-2 bg-slate-800 dark:bg-white rounded-full"></div> Casos (2026)</span>
           </div>
         </div>
         
         <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={endemicData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="week" tick={{fontSize: 10}} tickMargin={10} stroke="#64748b" />
                <YAxis tick={{fontSize: 10}} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="alarma" stroke="#f43f5e" strokeWidth={1} dot={false} fillOpacity={0.1} />
                <Line type="monotone" dataKey="seguridad" stroke="#f59e0b" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="exito" stroke="#10b981" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="casosActuales" name="Casos Reportados" stroke="#0f172a" strokeWidth={3} dot={{r: 2, fill: '#0f172a'}} activeDot={{ r: 6 }} className="dark:stroke-white dark:fill-white" />
              </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Radar E.N.O (1 column) */}
      <div className="bg-slate-900 dark:bg-slate-950 rounded-xl border border-slate-800 shadow-lg p-5 flex flex-col h-[450px]">
         <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
           <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
           </span>
           <h3 className="font-bold text-white text-sm uppercase tracking-widest">Radar E.N.O</h3>
         </div>
         <p className="text-[10px] text-slate-400 mb-4 uppercase">Eventos de Notificación Obligatoria - En Vivo</p>
         
         <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {/* Alert Card */}
            <div className="bg-rose-950/50 border border-rose-900/50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-rose-400">Dengue con Signos Alarma</span>
                <span className="text-[9px] bg-rose-900 text-rose-300 px-1 rounded">HACE 10 MIN</span>
              </div>
              <p className="text-white text-sm font-medium mb-1">2 casos confirmados</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={10}/> ASIC Ramón Ignacio Méndez</p>
            </div>
            {/* Alert Card */}
            <div className="bg-amber-950/50 border border-amber-900/50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-amber-400">Mordedura Sospechosa Rabia</span>
                <span className="text-[9px] bg-amber-900 text-amber-300 px-1 rounded">HACE 1 HORA</span>
              </div>
              <p className="text-white text-sm font-medium mb-1">1 caso (Canino)</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={10}/> ASIC Corazón de Jesús</p>
            </div>
            {/* Info Card */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-slate-300">Varicela</span>
                <span className="text-[9px] bg-slate-700 text-slate-300 px-1 rounded">AYER</span>
              </div>
              <p className="text-white text-sm font-medium mb-1">14 casos (Brote Escolar)</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={10}/> CPT 2 La Caramuca</p>
            </div>
         </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 2: ESTADÍSTICAS
// ---------------------------------------------------------------------------
function EpidemiologyStats() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
      <BarChart3 size={48} className="mb-4 text-slate-300 dark:text-slate-700" />
      <h2 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">Panel de Análisis Detallado</h2>
      <p className="max-w-md text-sm leading-relaxed mb-6">
        Aquí se agrupan los gráficos de barras, tortas, tablas dinámicas y reportes históricos de morbilidad. 
        (Modulo consolidado para no saturar la vista principal).
      </p>
      <button className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
        <Download size={16} /> Exportar Reporte Semanal
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 3: CARGA DE DATOS (DATA ENTRY)
// ---------------------------------------------------------------------------
function EpidemiologyDataEntry({ user }: { user: any }) {
  const allModules = [
    {
      id: 'epi10',
      title: 'EPI-10 / Morbilidad',
      desc: 'Registro semanal de morbilidad por causas',
      path: '/module/epi10',
      icon: <Layers size={24} className="text-blue-600" />,
      bg: 'bg-blue-50 dark:bg-blue-900/30'
    },
    {
      id: 'dsp04',
      title: 'DSP-04 / Vigilancia',
      desc: 'Formulario de Enfermedades Notificación Obligatoria',
      path: '/module/dsp04',
      icon: <AlertTriangle size={24} className="text-rose-600" />,
      bg: 'bg-rose-50 dark:bg-rose-900/30'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Edit3 size={18} className="text-blue-500" /> Formularios Oficiales (EPI / DSP)
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Seleccione el formulario de carga. Acceso autorizado para: <span className="font-bold">{user?.title}</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allModules.map(mod => (
            <Link
              key={mod.id}
              to={mod.path}
              className={`block bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:border-blue-500 transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${mod.bg} group-hover:scale-110 transition-transform shadow-sm`}>
                  {mod.icon}
                </div>
                <span className="text-[10px] font-bold bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 uppercase tracking-widest text-slate-500">
                  Formulario
                </span>
              </div>
              <h3 className="text-lg font-black font-display text-slate-800 dark:text-slate-100 mb-1">{mod.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{mod.desc}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Comenzar Carga <ChevronRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
