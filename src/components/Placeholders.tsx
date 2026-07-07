import React from 'react';
import { Package, Users, Kanban, FileText, AlertCircle } from 'lucide-react';

export const LogisticsModule = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center bg-slate-50 dark:bg-slate-900">
    <Package size={64} className="mb-4 text-indigo-300 dark:text-indigo-800" />
    <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">Gestión Hospitalaria y Logística</h2>
    <p className="max-w-md text-sm leading-relaxed mb-6">Módulo en construcción. Integrará control de inventario de medicamentos (SEFAR), distribución y reportes de mantenimiento.</p>
    <div className="flex items-center gap-2 text-xs font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 px-3 py-1.5 rounded">
      <AlertCircle size={14} /> FASE 2
    </div>
  </div>
);

export const HRModule = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center bg-slate-50 dark:bg-slate-900">
    <Users size={64} className="mb-4 text-amber-300 dark:text-amber-800" />
    <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">Recursos Humanos y Nómina</h2>
    <p className="max-w-md text-sm leading-relaxed mb-6">Módulo en construcción. Integrará control de asistencia, guardias, reposos y nómina.</p>
    <div className="flex items-center gap-2 text-xs font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 px-3 py-1.5 rounded">
      <AlertCircle size={14} /> FASE 2
    </div>
  </div>
);

export const ProjectsModule = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center bg-slate-50 dark:bg-slate-900">
    <Kanban size={64} className="mb-4 text-rose-300 dark:text-rose-800" />
    <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">Proyectos y Gestión Social</h2>
    <p className="max-w-md text-sm leading-relaxed mb-6">Módulo en construcción. Asignación de tareas, seguimiento a jornadas y resolución de denuncias.</p>
    <div className="flex items-center gap-2 text-xs font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 px-3 py-1.5 rounded">
      <AlertCircle size={14} /> FASE 2
    </div>
  </div>
);

export const DocsModule = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center bg-slate-50 dark:bg-slate-900">
    <FileText size={64} className="mb-4 text-cyan-300 dark:text-cyan-800" />
    <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">Ejecutivo y Comunicaciones</h2>
    <p className="max-w-md text-sm leading-relaxed mb-6">Módulo en construcción. Calendario unificado, agenda de visitas, circulares y memorándums digitales.</p>
    <div className="flex items-center gap-2 text-xs font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 px-3 py-1.5 rounded">
      <AlertCircle size={14} /> FASE 2
    </div>
  </div>
);
