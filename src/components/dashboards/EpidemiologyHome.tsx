import React from 'react';
import { Activity, Map, FileText, ChevronRight, AlertTriangle, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EpidemiologyHome() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Activity className="text-emerald-500" />
              Accesos Rápidos Epidemiología
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/epidemiology" className="group p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 transition-all shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-3">
                  <Map className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">Sala de Guerra (Vigilancia)</h3>
                <p className="text-xs text-slate-500 mt-1">Monitoreo de brotes, E.N.O y canal endémico.</p>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={18} />
              Eventos de Notificación Obligatoria (E.N.O)
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Dengue con signos de alarma</p>
                    <p className="text-xs font-medium text-slate-500">ASIC Corazón de Jesús - 3 Casos Nuevos</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold uppercase text-emerald-600 border border-emerald-200 bg-emerald-50 px-2 py-1 rounded">
                  Analizar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm flex items-center gap-2">
              <Crosshair size={16} className="text-slate-500" /> Focos Activos
            </h3>
            <div className="text-center p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
              <p className="text-4xl font-black text-rose-600 dark:text-rose-400">02</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Zonas de Riesgo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
