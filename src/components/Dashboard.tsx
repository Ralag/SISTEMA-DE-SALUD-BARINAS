import { LayoutDashboard, Users, Activity, Clock, Server } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const { location, stats, lastSync, syncStatus } = useAppContext();

  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-4">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Establecimiento Actual</span>
            <BuildingIcon />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 leading-tight">{location.cpt}</h3>
            <p className="text-xs font-bold text-emerald-600 uppercase mt-1">{location.asic}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registros EPI-10 (Hoy)</span>
            <Users size={16} className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-blue-700 leading-none">{stats.epi10Count}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Pacientes atendidos</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consolidados DSP04</span>
            <Activity size={16} className="text-emerald-500" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-700 leading-none">{stats.dsp04Count}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Semanas reportadas</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado Servidor</span>
            <Server size={16} className={syncStatus === 'syncing' ? 'text-amber-500 animate-pulse' : syncStatus === 'error' ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase">
              {syncStatus === 'syncing' ? 'Sincronizando...' : syncStatus === 'error' ? 'Error' : 'Conectado'}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 flex items-center gap-1">
              <Clock size={10} /> 
              {lastSync ? `Última sync: ${lastSync.toLocaleTimeString()}` : 'Sin sincronización previa'}
            </p>
          </div>
        </div>
      </div>

      {/* Main content dashboard visual */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <LayoutDashboard size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-2">Resumen Operativo</h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Seleccione un módulo en el menú de navegación para iniciar la carga de datos. El sistema está configurado para almacenar los registros de manera local y sincronizarlos con DHIS2 de forma asíncrona.
        </p>
      </div>
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M12 6h.01"/>
      <path d="M12 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 10h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 10h.01"/>
      <path d="M8 14h.01"/>
    </svg>
  );
}
