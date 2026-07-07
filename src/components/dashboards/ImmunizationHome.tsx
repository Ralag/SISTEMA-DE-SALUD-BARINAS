import React from 'react';
import { Syringe, Users, Calendar, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ImmunizationHome() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Syringe className="text-indigo-500" />
              Accesos Rápidos PAI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/immunization" className="group p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 transition-all shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-3">
                  <Activity className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">Monitor de Cobertura</h3>
                <p className="text-xs text-slate-500 mt-1">Esquema de vacunación, dosis aplicadas y metas.</p>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={18} />
              Alertas de Cadena de Frío e Inventario
            </h2>
            <div className="space-y-3">
              <div className="p-3 border-l-2 border-amber-500 bg-amber-50 dark:bg-amber-900/10 text-sm text-slate-700 dark:text-slate-300">
                <span className="font-bold">Stock Bajo:</span> Vacuna Pentavalente en ASIC Guanapa (Menos de 50 dosis).
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm flex items-center gap-2">
              <TrendingUp size={16} className="text-slate-500" /> Meta Trimestral (BCG)
            </h3>
            <div className="text-center p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
              <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400">88.4%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Faltan 11.6%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
