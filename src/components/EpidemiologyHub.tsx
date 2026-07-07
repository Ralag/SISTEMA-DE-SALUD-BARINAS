import React, { useState } from 'react';
import { Activity, MapPin, AlertTriangle, Download, Filter, ChevronRight, ActivitySquare, Crosshair, Calendar, Map, Thermometer, ShieldAlert, BarChart3, Edit3, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useSaaSContext } from '../context/SaaSContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for Endemic Channel (Canal Endémico)
const endemicData = Array.from({ length: 52 }, (_, i) => {
  const base = 100 + Math.sin(i * 0.2) * 50;
  return {
    week: `Sem ${i + 1}`,
    alarma: base * 1.5 + 40,
    seguridad: base * 1.2 + 20,
    exito: base * 0.9,
    casosActuales: i < 35 ? (base * 1.1) + (Math.random() * 30 - 15) : null
  };
});

export default function EpidemiologyHub() {
  const { user } = useAppContext();
  const { config } = useSaaSContext();
  const [activeTab, setActiveTab] = useState<'war_room' | 'stats' | 'data_entry'>('war_room');

  return (
    <div className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 p-4 md:p-6 ">
      {/* Header Sala de Guerra */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Crosshair className="text-rose-600" size={28} strokeWidth={2.5} />
            {config.modules.epidemiology?.name || 'Sala de Guerra - Epidemiología'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium tracking-wide uppercase">
            Vigilancia Activa Regional • MPPS Barinas
          </p>
        </div>
        
        {/* Top Filters (Hyper-detailed) */}
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 border-r border-slate-200 dark:border-slate-800">
            <Calendar size={14} className="text-slate-400" />
            <select className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none uppercase cursor-pointer">
              <option>Año 2026</option>
              <option>Año 2025</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border-r border-slate-200 dark:border-slate-800">
            <ActivitySquare size={14} className="text-slate-400" />
            <select className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none uppercase cursor-pointer">
              <option>Semana 34</option>
              <option>Semana 33</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5">
            <Map size={14} className="text-slate-400" />
            <select className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none uppercase cursor-pointer">
              <option>Todos los ASIC</option>
              <option>ASIC Corazón de Jesús</option>
              <option>ASIC Ramón I. Méndez</option>
            </select>
          </div>
          <button className="bg-slate-800 dark:bg-white text-white dark:text-slate-900 p-1.5 rounded hover:opacity-90 transition-opacity ml-1">
            <Filter size={14} />
          </button>
        </div>
      </div>

      {/* Navigation sub-tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 flex-shrink-0">
        <button
          onClick={() => setActiveTab('war_room')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'war_room' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
        >
          Radar & Canal Endémico
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'stats' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
        >
          Análisis Histórico
        </button>
        <button
          onClick={() => setActiveTab('data_entry')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'data_entry' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
        >
          Ingreso de Datos
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {activeTab === 'war_room' && <EpidemiologyWarRoom />}
        {activeTab === 'stats' && <EpidemiologyStats />}
        {activeTab === 'data_entry' && <EpidemiologyDataEntry user={user} />}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 1: WAR ROOM (DISEÑO ASIMÉTRICO PURO)
// ---------------------------------------------------------------------------
function EpidemiologyWarRoom() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-6">
      {/* Endemic Channel Chart (2 columns) */}
      <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col min-h-[500px]">
         <div className="flex flex-col lg:flex-row justify-between items-start mb-6 gap-4">
           <div>
             <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
               <Thermometer className="text-rose-500" size={18} /> Canal Endémico Regional
             </h3>
             <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Sindrome Febril Agudo - Año 2026</p>
           </div>
           
           {/* Legend Indicators */}
           <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase"><div className="w-2 h-2 bg-rose-500 rounded-full"></div> Alarma</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase"><div className="w-2 h-2 bg-amber-500 rounded-full"></div> Seguridad</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Éxito</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-900 dark:text-white uppercase"><div className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full"></div> Casos (2026)</span>
           </div>
         </div>
         
         <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={endemicData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.4} />
                <XAxis dataKey="week" tick={{fontSize: 10}} tickMargin={10} stroke="#94a3b8" />
                <YAxis tick={{fontSize: 10}} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
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
      <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-800 shadow-xl p-5 flex flex-col min-h-[500px]">
         <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-4">
           <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
           </span>
           <div>
             <h3 className="font-black text-white text-sm uppercase tracking-widest leading-none">Radar E.N.O</h3>
             <p className="text-[10px] text-slate-400 mt-1 uppercase">Eventos de Notificación Obligatoria</p>
           </div>
         </div>
         
         <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            
            {/* Alert Card 1 */}
            <div className="bg-rose-950/40 border border-rose-900/50 rounded-xl p-4 hover:bg-rose-900/30 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider flex items-center gap-1.5"><ShieldAlert size={12} /> ALERTA</span>
                <span className="text-[9px] bg-rose-900/50 border border-rose-800 text-rose-300 font-bold px-1.5 py-0.5 rounded animate-pulse">EN VIVO</span>
              </div>
              <p className="text-white text-base font-bold mb-1">Dengue con Signos Alarma</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs font-bold text-rose-200">2 Casos Confirmados</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={10}/> ASIC Ramón I. Méndez</p>
              </div>
            </div>

            {/* Alert Card 2 */}
            <div className="bg-amber-950/40 border border-amber-900/50 rounded-xl p-4 hover:bg-amber-900/30 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5"><AlertTriangle size={12} /> PRECAUCIÓN</span>
                <span className="text-[9px] bg-amber-900/50 border border-amber-800 text-amber-300 font-bold px-1.5 py-0.5 rounded">HACE 1 HORA</span>
              </div>
              <p className="text-white text-base font-bold mb-1">Mordedura Sospechosa Rabia</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs font-bold text-amber-200">1 Caso (Canino)</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={10}/> ASIC Corazón de Jesús</p>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/60 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><Activity size={12} /> SEGUIMIENTO</span>
                <span className="text-[9px] bg-slate-700/50 border border-slate-600 text-slate-300 font-bold px-1.5 py-0.5 rounded">AYER</span>
              </div>
              <p className="text-white text-base font-bold mb-1">Brote Varicela</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs font-bold text-slate-200">14 Casos (Escolar)</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={10}/> CPT 2 La Caramuca</p>
              </div>
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
    <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500 p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <BarChart3 size={48} className="mb-4 text-slate-300 dark:text-slate-700" />
      <h2 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">Panel de Análisis Detallado</h2>
      <p className="max-w-md text-sm leading-relaxed mb-6">
        Aquí se agrupan los gráficos de barras, tortas, tablas dinámicas y reportes históricos de morbilidad. 
      </p>
      <button className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
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
      icon: <Layers size={24} className="text-emerald-600" />,
      bg: 'bg-emerald-50 dark:bg-emerald-900/30'
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2 uppercase tracking-wide">
          <Edit3 size={18} className="text-emerald-500" /> Formularios Oficiales (EPI / DSP)
        </h2>
        <p className="text-sm text-slate-500 mb-6 font-medium">
          Seleccione el formulario de carga. Acceso autorizado para: <span className="font-bold text-slate-700 dark:text-slate-300">{user?.title}</span>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allModules.map(mod => (
            <Link
              key={mod.id}
              to={mod.path}
              className={`block bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:border-emerald-500 transition-all group`}
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
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{mod.desc}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
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
