import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, FileText, ChevronRight, Clock, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function StatisticsHome() {
  const { user } = useAppContext();
  const isRegional = user?.level === 'L1_CENTRAL';

  return (
    <div className="space-y-6">
      {/* Resumen de Tareas y Alertas (Home) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Principal - Accesos Directos al Módulo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <BarChart3 className="text-blue-500" />
              Accesos Rápidos CEIS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/stats/data-entry" className="group p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 transition-all shadow-sm">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">Sala Situacional</h3>
                <p className="text-xs text-slate-500 mt-1">Ir al módulo principal de visualización de datos de morbilidad.</p>
              </Link>

              <Link to="/stats/visualizer" className="group p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 transition-all shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">Emisión de EPI-10</h3>
                <p className="text-xs text-slate-500 mt-1">Generar y consolidar los reportes semanales obligatorios.</p>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={18} />
              Alertas de Consolidación {isRegional ? '(Red Estatal)' : '(Red Local)'}
            </h2>
            <div className="space-y-3">
              {[
                { asic: 'Corazón de Jesús', issue: 'Retraso en carga EPI-12 (Mortalidad)', status: 'Crítico' },
                { asic: 'Barinas I', issue: 'Inconsistencia en datos de morbilidad', status: 'Revisión' }
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{alert.asic}</p>
                      <p className="text-xs font-medium text-slate-500">{alert.issue}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold uppercase bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600">
                    Notificar
                  </button>
                </div>
              ))}
              {!isRegional && (
                <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-500" size={16} />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Todos los CPT han reportado esta semana.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Columna Secundaria - Status */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm flex items-center gap-2">
              <Clock size={16} className="text-slate-500" /> Semana Epidemiológica Actual
            </h3>
            <div className="text-center p-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
              <p className="text-4xl font-black text-blue-600 dark:text-blue-400">12</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Cierre en 2 días</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm flex items-center gap-2">
              <Users size={16} className="text-slate-500" /> Tareas Pendientes
            </h3>
            <div className="space-y-2">
              <div className="p-2 text-sm text-slate-600 dark:text-slate-400 border-l-2 border-amber-500 bg-amber-50 dark:bg-amber-900/10 pl-3">
                Revisar validación cruzada EPI-10
              </div>
              <div className="p-2 text-sm text-slate-600 dark:text-slate-400 border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-900/10 pl-3">
                Auditar carga diaria del ASIC
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
