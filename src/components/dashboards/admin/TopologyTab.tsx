import React from 'react';
import { Network, GitBranch, MapPin, SlidersHorizontal, BookOpen, AlertCircle, Search, Edit2 } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';

export default function TopologyTab() {
  const { addToast } = useAppContext();

  const handleUpdateTree = () => {
    addToast('Editor del Árbol Organizativo abierto. Cambios no se aplicarán hasta guardar.', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Topología Espacial y Metadatos</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Modificación de reglas matemáticas, estructura de la red de salud y diccionarios ontológicos (CIE-10).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Árbol Organizativo */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
            <Network size={18} className="text-slate-600 dark:text-slate-400" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Árbol Organizativo (OrgUnit)</h3>
          </div>
          <div className="p-4 flex-1">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Añade, clausura o reasigna establecimientos de salud (ASIC, CPT, Ambulatorios, Hospitales). Esta acción reestructurará la agregación de datos estadísticos.
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 font-mono text-[11px] text-slate-600 dark:text-slate-400 space-y-2 mb-4 h-48 overflow-y-auto">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
                <MapPin size={12} className="text-emerald-500" /> ▾ ESTADO BARINAS
              </div>
              <div className="pl-4 flex items-center gap-2">
                <GitBranch size={12} className="text-indigo-400" /> ▾ MUNICIPIO BARINAS
              </div>
              <div className="pl-8 flex items-center gap-2">
                <Network size={12} className="text-blue-400" /> ▾ ASIC CORAZÓN DE JESÚS
              </div>
              <div className="pl-12 flex items-center gap-2 text-slate-500">
                ├─ CPT3 Los Marqueses
              </div>
              <div className="pl-12 flex items-center gap-2 text-slate-500">
                ├─ CPT2 Brisas del Corozal
              </div>
              <div className="pl-12 flex items-center gap-2 text-slate-500">
                └─ CPT3 Don Samuel
              </div>
              <div className="pl-8 flex items-center gap-2">
                <Network size={12} className="text-blue-400" /> ▸ ASIC GUANAPA
              </div>
              <div className="pl-4 flex items-center gap-2">
                <GitBranch size={12} className="text-indigo-400" /> ▸ MUNICIPIO OBISPOS
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-right">
            <button 
              onClick={handleUpdateTree}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-2"
            >
              <Edit2 size={14} /> Editar Estructura
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* CIE-10 y Diccionarios */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
              <BookOpen size={18} className="text-slate-600 dark:text-slate-400" />
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Ontología y Data Elements</h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Administra los códigos CIE-10 (Enfermedades) y variables (Data Elements) de los formularios (DSP-04, EPI-12) sin requerir re-despliegue de código.
              </p>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Buscar código CIE-10 o Variable..." 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                  + Nuevo CIE-10
                </button>
                <button className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                  + Variable Formularios
                </button>
              </div>
            </div>
          </div>

          {/* Límites Duros (Thresholds) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-slate-600 dark:text-slate-400" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Ajuste de Límites (Thresholds)</h3>
              </div>
              <AlertCircle size={16} className="text-amber-500" />
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Límite Rechazo: Consultas/Día (CPT)</label>
                  <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-1.5 rounded text-slate-600 dark:text-slate-400">50</span>
                </div>
                <input type="range" min="10" max="150" defaultValue="50" className="w-full accent-indigo-600" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Umbral Alerta Brote Endémico (Desv. Std)</label>
                  <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-1.5 rounded text-slate-600 dark:text-slate-400">2.5σ</span>
                </div>
                <input type="range" min="1.0" max="4.0" step="0.1" defaultValue="2.5" className="w-full accent-emerald-600" />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-tight">
                Estas reglas alteran la validación matemática en los clientes web en tiempo real. Úselas con precaución extrema durante epidemias declaradas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
