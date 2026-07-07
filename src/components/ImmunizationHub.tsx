import React from 'react';
import { Syringe, Shield, Users, MapPin, Activity, Calendar, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const coverageData = Array.from({ length: 12 }, (_, i) => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return {
    month: months[i],
    polio: 70 + Math.random() * 25,
    pentavalente: 65 + Math.random() * 30,
    srp: 80 + Math.random() * 15,
  };
});

export default function ImmunizationHub() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full min-h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <Syringe className="text-indigo-500" /> Inmunización (PAI)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Programa Ampliado de Inmunizaciones y Cadena de Frío</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
             <Download size={16} /> Exportar Reporte PAI
           </button>
           <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
             <Calendar size={16} /> Jornada Especial
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
            <Shield size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Cobertura Global (Menores 1 Año)</h2>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl font-black text-slate-800 dark:text-slate-100">88.4%</span>
              <p className="text-xs text-slate-500 uppercase mt-2 font-bold">+2.1% vs mes anterior</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
            <Activity size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Dosis Aplicadas (Mes)</h2>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl font-black text-slate-800 dark:text-slate-100">14,250</span>
              <p className="text-xs text-slate-500 uppercase mt-2 font-bold">120% meta mensual</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
            <MapPin size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Cadena de Frío (Operativa)</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-bold text-slate-600 dark:text-slate-300">ASIC Guanapa</span>
               <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">2°C a 8°C</span>
             </div>
             <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-bold text-slate-600 dark:text-slate-300">ASIC Obispos</span>
               <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">2°C a 8°C</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-sm font-bold text-slate-600 dark:text-slate-300">ASIC Corazón de Jesús</span>
               <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">ALERTA {">8°C"}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-6">Tendencia de Cobertura por Biológico</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={coverageData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPenta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="polio" stroke="#6366f1" fillOpacity={1} fill="url(#colorPolio)" name="Polio (OPV/IPV)" />
              <Area type="monotone" dataKey="pentavalente" stroke="#10b981" fillOpacity={1} fill="url(#colorPenta)" name="Pentavalente" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
