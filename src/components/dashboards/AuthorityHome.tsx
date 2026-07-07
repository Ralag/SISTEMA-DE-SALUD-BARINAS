import React from 'react';
import { Activity, Users, ShieldCheck, HeartPulse, ChevronRight, BarChart3, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function AuthorityHome() {
  const { user } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Epidemiología', value: '02', label: 'Alertas Activas', icon: <Activity className="text-emerald-600" />, to: '/epidemiology' },
          { title: 'Estadística', value: '98%', label: 'Reporte General', icon: <BarChart3 className="text-blue-600" />, to: '/stats' },
          { title: 'Inmunización', value: '88%', label: 'Cobertura Mensual', icon: <HeartPulse className="text-indigo-600" />, to: '/immunization' },
          { title: 'RRHH', value: '94%', label: 'Asistencia Médica', icon: <Users className="text-amber-600" />, to: '/hr' }
        ].map((stat, i) => (
          <Link key={i} to={stat.to} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">{stat.title}</span>
              <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">{stat.icon}</div>
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">{stat.value}</h3>
            <p className="text-xs font-medium text-slate-500 mt-1 flex items-center justify-between">
              {stat.label}
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-500" size={18} />
            Atención Inmediata
          </h2>
          <div className="space-y-3">
            <div className="p-3 border-l-2 border-rose-500 bg-rose-50 dark:bg-rose-900/10 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold">Brote de Dengue - ASIC Corazón de Jesús:</span> 15 casos confirmados.
            </div>
            <div className="p-3 border-l-2 border-amber-500 bg-amber-50 dark:bg-amber-900/10 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold">SEFAR Alerta:</span> Inventario de insulina al 12% en Almacén Central.
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase mb-4 flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={18} />
            Últimas Resoluciones SACS
          </h2>
          <div className="space-y-2">
            <div className="p-2 text-sm text-slate-600 dark:text-slate-400 flex justify-between">
              <span>Inspección Frigorífico "El Centro"</span>
              <span className="font-bold text-emerald-600">Aprobado</span>
            </div>
            <div className="p-2 text-sm text-slate-600 dark:text-slate-400 flex justify-between">
              <span>Clínica "San Rafael" (Quirófano)</span>
              <span className="font-bold text-rose-600">Clausura Temporal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
