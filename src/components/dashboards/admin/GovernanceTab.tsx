import React, { useState, useEffect } from 'react';
import { Search, Unlock, History, AlertTriangle, FileInput, ShieldAlert, CheckCircle2, ChevronRight, FileEdit, User } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { db } from '../../../lib/db';

export default function GovernanceTab() {
  const { addToast, user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const data = await db.getAuditLogs();
    setLogs(data);
  };

  const handleSoftUnlock = async () => {
    await db.createAuditLog({
      action: 'Desbloqueo (Soft-Unlock)',
      entity: 'Semana Epidemiológica Actual',
      details: 'Ventana de gracia de 2H abierta para todas las entidades.',
      user_name: user?.name || 'Administrador',
      asic: user?.asicAccess || 'N/A',
      ip_address: '127.0.0.1'
    });
    addToast('Ventana de gracia de 2H aperturada para la carga de datos del ASIC seleccionado.', 'success');
    fetchLogs();
  };

  const handleHardOverride = async () => {
    await db.createAuditLog({
      action: 'Sobrescritura de Emergencia',
      entity: 'Base de Datos Principal',
      details: 'Acceso directo de modificación sin validación estándar concedido.',
      user_name: user?.name || 'Administrador',
      asic: user?.asicAccess || 'N/A',
      ip_address: '127.0.0.1'
    });
    addToast('¡ADVERTENCIA! El registro inmutable ha sido creado para esta modificación directa.', 'error');
    fetchLogs();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Gobernanza, Trazabilidad y Auditoría</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Control maestro sobre alteraciones históricas, ventanas de carga y fusiones de datos críticos.</p>
      </div>

      {/* Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full group hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <Unlock size={18} />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Desbloqueo de Periodos</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Otorgar ventana de gracia de 2H para carga tardía (Soft-Unlock).</p>
          </div>
          <button 
            onClick={handleSoftUnlock}
            className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 dark:text-emerald-400 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
          >
            Abrir Ventana Excepcional
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full group hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg">
                <AlertTriangle size={18} />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Sobrescritura de Emergencia</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Modificación directa de valores corrompidos. (Hard Override).</p>
          </div>
          <button 
            onClick={handleHardOverride}
            className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 dark:text-rose-400 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
          >
            Iniciar Override Auditado
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-full group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <FileInput size={18} />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Limpieza de Duplicados</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Fusión de historias médicas (EPI-10) o registros redundantes.</p>
          </div>
          <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 dark:text-indigo-400 px-3 py-2 rounded-lg text-xs font-bold transition-colors">
            Herramienta de Fusión
          </button>
        </div>
      </div>

      {/* Audit Trail Log */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
            <History size={18} className="text-slate-500" />
            <h3>Auditoría Forense de Registros (Audit Trail)</h3>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Buscar acción, usuario, IP..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3">Acción y Detalles</th>
                <th className="px-6 py-3">Entidad</th>
                <th className="px-6 py-3">Actor (Usuario / IP)</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3 text-center">Trazabilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-xs">
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No hay registros de auditoría
                  </td>
                </tr>
              )}
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      {log.action === 'Sobrescritura de Emergencia' ? <ShieldAlert size={14} className="text-rose-500" /> : <CheckCircle2 size={14} className="text-emerald-500" />}
                      {log.action}
                    </div>
                    <div className="text-slate-500 mt-0.5">{log.details}</div>
                  </td>
                  <td className="px-6 py-3 font-mono text-slate-500 dark:text-slate-400">
                    {log.entity}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                      <User size={14} className="text-indigo-400" />
                      {log.user_name || log.user}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">IP: {log.ip_address || log.ip || 'Local'}</div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {log.timestamp || new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button className="inline-flex items-center justify-center p-1.5 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30 rounded transition-colors" title="Ver Snapshot JSON">
                      <FileEdit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-3 border-t border-slate-200 dark:border-slate-700 flex justify-center">
          <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1">
            Cargar historial anterior <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
