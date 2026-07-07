import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Search, Filter } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';

export default function DataQualityAudit() {
  const { user } = useAppContext();
  const isRegional = user?.level === 'ADMIN' || user?.level === 'L0_STRATEGIC' || user?.level === 'L1_CENTRAL';

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <ShieldAlert className="text-rose-500" />
          Monitor de Calidad y Cierre Epidemiológico
        </h2>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar ASIC, CPT o código de formato..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 transition-colors shadow-sm">
            <Filter size={16} /> Estado
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-bold border-y border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3">Unidad / Organización</th>
                <th className="px-4 py-3">Formato</th>
                <th className="px-4 py-3">Semana/Mes</th>
                <th className="px-4 py-3">Inconsistencia Detectada</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {[
                { org: 'ASIC Corazón de Jesús', formato: 'EPI-10', periodo: 'Semana 42', issue: 'Valores atípicos en Diarrea (>300%)', status: 'CRITICO' },
                { org: 'ASIC Ramón Ignacio Méndez', formato: 'DSP-04', periodo: 'Septiembre 2023', issue: 'Falta validación del Director', status: 'PENDIENTE' },
                { org: 'CPT 2 Las Colinas (Guanapa)', formato: 'FF (SIS-01)', periodo: 'Anual 2023', issue: 'Cobertura excede población estimada', status: 'REVISIÓN' },
                { org: 'ASIC Obispos', formato: 'EPI-12', periodo: 'Semana 41', issue: 'Retraso de carga (Cierre tardío)', status: 'ALERTA' }
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{item.org}</td>
                  <td className="px-4 py-3"><span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-[10px] font-bold">{item.formato}</span></td>
                  <td className="px-4 py-3 text-slate-500">{item.periodo}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.issue}</td>
                  <td className="px-4 py-3 text-center">
                    {item.status === 'CRITICO' && <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 px-2 py-1 rounded-full"><AlertTriangle size={12} /> Crítico</span>}
                    {item.status === 'PENDIENTE' && <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-2 py-1 rounded-full"><AlertTriangle size={12} /> Pendiente</span>}
                    {item.status === 'REVISIÓN' && <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-1 rounded-full"><AlertTriangle size={12} /> Revisión</span>}
                    {item.status === 'ALERTA' && <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-1 rounded-full"><AlertTriangle size={12} /> Alerta</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold transition-colors">Auditar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
