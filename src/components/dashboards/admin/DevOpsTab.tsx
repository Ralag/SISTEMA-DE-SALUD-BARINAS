import React from 'react';
import { Activity, Server, Database, HardDrive, RefreshCw, Terminal, Download, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { useSaaSContext } from '../../../context/SaaSContext';

export default function DevOpsTab() {
  const { addToast } = useAppContext();
  const { config, updateConfig } = useSaaSContext();
  const isMaintenanceMode = config.parameters.maintenanceMode;

  const handleMaintenance = () => {
    updateConfig({
      parameters: {
        ...config.parameters,
        maintenanceMode: !isMaintenanceMode
      }
    });
    addToast(
      !isMaintenanceMode 
        ? 'El sistema entrará en Mantenimiento Global. Sesiones no administrativas serán bloqueadas.' 
        : 'Modo Mantenimiento desactivado. El sistema opera normalmente.', 
      !isMaintenanceMode ? 'error' : 'success'
    );
  };

  const handleClearCache = () => {
    addToast('Señal de limpieza de caché enviada a todos los clientes.', 'success');
  };

  const handleBackup = () => {
    addToast('Iniciando volcado (dump) de la base de datos a almacenamiento frío...', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">DevOps y Mantenimiento de Infraestructura</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Control del servidor, bases de datos y despliegues del ecosistema.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase">CPU Usage</h3>
            <Cpu size={16} className="text-indigo-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">34%</span>
            <span className="text-xs font-medium text-emerald-500 mb-1">Estable</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-500 h-full w-[34%]"></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase">RAM (Hetzner VPS)</h3>
            <Server size={16} className="text-blue-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">12.4</span>
            <span className="text-xs font-medium text-slate-500 mb-1">/ 32 GB</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-500 h-full w-[38%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase">PostgreSQL DB</h3>
            <Database size={16} className="text-emerald-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">1.2</span>
            <span className="text-xs font-medium text-slate-500 mb-1">GB Espacio</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[15%]"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase">Peticiones HTTP</h3>
            <Activity size={16} className="text-rose-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">854</span>
            <span className="text-xs font-medium text-slate-500 mb-1">req/min</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-rose-500 h-full w-[45%]"></div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
            <Terminal size={18} className="text-slate-600 dark:text-slate-400" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Controles de Ejecución Global</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-900/10">
              <div>
                <h4 className="font-bold text-rose-700 dark:text-rose-400 text-sm flex items-center gap-2">
                  <ShieldAlert size={16} /> Modo Mantenimiento
                </h4>
                <p className="text-xs text-rose-600/80 dark:text-rose-300/70 mt-1">
                  Bloquea el acceso a todos los usuarios no administradores. Cierra sesiones activas inmediatamente.
                </p>
              </div>
              <button 
                onClick={handleMaintenance}
                className={`shrink-0 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors ${isMaintenanceMode ? 'bg-slate-600 hover:bg-slate-700' : 'bg-rose-600 hover:bg-rose-700'}`}
              >
                {isMaintenanceMode ? 'Desactivar Mantenimiento' : 'Activar Bloqueo'}
              </button>
            </div>

            <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10">
              <div>
                <h4 className="font-bold text-amber-700 dark:text-amber-400 text-sm flex items-center gap-2">
                  <RefreshCw size={16} /> Forzar Sincronización (Cache Flush)
                </h4>
                <p className="text-xs text-amber-600/80 dark:text-amber-300/70 mt-1">
                  Obliga a los navegadores de los clientes a descargar la última versión de la app y diccionarios.
                </p>
              </div>
              <button 
                onClick={handleClearCache}
                className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
              >
                Purgar Caché
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
            <HardDrive size={18} className="text-slate-600 dark:text-slate-400" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Respaldos y Bases de Datos</h3>
          </div>
          <div className="p-4 space-y-4">
            
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Último Respaldo Automático</span>
                <span className="text-xs font-mono text-slate-500">Hoy, 02:00 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Volumen: 1.2GB (Comprimido gz)</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Éxito en S3</span>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={handleBackup}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white px-4 py-3 rounded-lg text-sm font-bold transition-colors"
              >
                <Download size={16} />
                Ejecutar Respaldo Manual (pg_dump)
              </button>
              <p className="text-center text-[10px] text-slate-500 mt-2">
                Esta acción puede causar una degradación menor del rendimiento durante unos segundos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
