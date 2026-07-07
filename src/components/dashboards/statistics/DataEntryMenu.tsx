import React from 'react';
import { Edit3, Activity, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DataEntryMenu() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Edit3 className="text-indigo-500" />
          Formatos Estadísticos (Familia SIS)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/module/epi10" className="group p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600">
                <Activity size={20} />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Diario</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">SIS-02 / EPI-10</h3>
            <p className="text-xs text-slate-500 mt-1">Registro diario de morbilidad en consulta general y emergencia.</p>
          </Link>
          
          <Link to="/module/dsp04" className="group p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600">
                <FileText size={20} />
              </div>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Mensual</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">DSP-04</h3>
            <p className="text-xs text-slate-500 mt-1">Registro de Atención Integral en Salud (Programas).</p>
          </Link>

          <div className="group p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl opacity-70 cursor-not-allowed">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                <CheckCircle2 size={20} />
              </div>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Diario</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">SIS-02 / EPI-13</h3>
            <p className="text-xs text-slate-500 mt-1">Registro diario de Enfermedades de Notificación Obligatoria (E.N.O.).</p>
          </div>

          <div className="group p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl opacity-70 cursor-not-allowed">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                <CheckCircle2 size={20} />
              </div>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Diario</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">SIS-03 / EPI-11</h3>
            <p className="text-xs text-slate-500 mt-1">Tabulador diario de morbilidad por aparatos y sistemas.</p>
          </div>

          <div className="group p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl opacity-70 cursor-not-allowed">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                <CheckCircle2 size={20} />
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Semanal</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">SIS-04 / EPI-12</h3>
            <p className="text-xs text-slate-500 mt-1">Registro consolidado semanal de E.N.O. (Dispara alertas).</p>
          </div>

          <div className="group p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl opacity-70 cursor-not-allowed">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                <CheckCircle2 size={20} />
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Semanal</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">SIS-04 / EPI-14</h3>
            <p className="text-xs text-slate-500 mt-1">Registro semanal de mortalidad por E.N.O.</p>
          </div>

          <div className="group p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl opacity-70 cursor-not-allowed">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                <CheckCircle2 size={20} />
              </div>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Mensual</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">SIS-04 / EPI-15</h3>
            <p className="text-xs text-slate-500 mt-1">Consolidado mensual de morbilidad por aparatos y sistemas.</p>
          </div>

          <div className="group p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl opacity-70 cursor-not-allowed">
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-500">
                <CheckCircle2 size={20} />
              </div>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Anual</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">SIS-01 / FF</h3>
            <p className="text-xs text-slate-500 mt-1">Ficha Familiar. Cobertura poblacional y metas operativas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
