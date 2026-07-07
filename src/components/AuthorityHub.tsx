import React from 'react';
import { Shield, Activity, Users, Package, Map, AlertTriangle, TrendingUp, Clock, ActivityIcon } from 'lucide-react';

export default function AuthorityHub() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <Shield className="text-amber-500" /> Despacho - Autoridad Única de Salud
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Panel de Control Estratégico - Visión Global del Estado</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-slate-200 dark:border-slate-700">
             <Clock size={14} /> Actualizado al Minuto
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-blue-100 uppercase">Consultas (Semana)</p>
              <h3 className="text-3xl font-black mt-1">24,592</h3>
            </div>
            <Users className="text-blue-200 opacity-80" size={24} />
          </div>
          <div className="mt-4 text-xs font-bold flex items-center gap-1 text-blue-100">
            <TrendingUp size={14} /> +12% vs. Anterior
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-emerald-100 uppercase">Abastecimiento (SEFAR)</p>
              <h3 className="text-3xl font-black mt-1">78.4%</h3>
            </div>
            <Package className="text-emerald-200 opacity-80" size={24} />
          </div>
          <div className="mt-4 text-xs font-bold flex items-center gap-1 text-emerald-100">
            Stock Estratégico Estable
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-xl p-5 text-white shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-rose-100 uppercase">Alertas Epidemiológicas</p>
              <h3 className="text-3xl font-black mt-1">3</h3>
            </div>
            <ActivityIcon className="text-rose-200 opacity-80" size={24} />
          </div>
          <div className="mt-4 text-xs font-bold flex items-center gap-1 text-rose-100">
            <AlertTriangle size={14} /> Brotes en Observación
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-5 text-white shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-300 uppercase">Operatividad Redes</p>
              <h3 className="text-3xl font-black mt-1">94%</h3>
            </div>
            <Map className="text-slate-400 opacity-80" size={24} />
          </div>
          <div className="mt-4 text-xs font-bold flex items-center gap-1 text-emerald-400">
            3 CPT con fallas eléctricas
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-4">Métricas Clave por ASIC</h3>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold sticky top-0">
                <tr>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">ASIC</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 text-right">Morbilidad</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 text-right">Medicamentos</th>
                  <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: 'Guanapa', m: 3450, d: '82%', s: 'bg-emerald-500' },
                  { n: 'Obispos', m: 2120, d: '75%', s: 'bg-emerald-500' },
                  { n: 'Corazón de Jesús', m: 4105, d: '60%', s: 'bg-amber-500' },
                  { n: 'R.I. Méndez', m: 3900, d: '45%', s: 'bg-rose-500' },
                ].map((a, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50">
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-300">{a.n}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{a.m}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{a.d}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <span className={`w-3 h-3 rounded-full ${a.s}`}></span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-4">Últimas Alertas Regionales</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50">
              <AlertTriangle className="text-rose-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-rose-800 dark:text-rose-300">Brote de Dengue - ASIC Guanapa</p>
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">Se superó el límite superior del canal endémico (45 casos esta semana).</p>
                <p className="text-[10px] text-rose-500 font-bold uppercase mt-2">Hace 2 horas</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50">
              <Package className="text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Inventario Crítico - Insulina</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">SEFAR reporta stock menor a 15 días en el almacén central.</p>
                <p className="text-[10px] text-amber-500 font-bold uppercase mt-2">Hace 5 horas</p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
              <Shield className="text-emerald-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Plan de Vacunación Completado</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Se alcanzó la meta del 95% de cobertura en Las Américas.</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase mt-2">Hace 1 día</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
