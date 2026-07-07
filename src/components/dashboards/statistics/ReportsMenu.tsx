import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';

export default function ReportsMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { id: 'rep1', name: 'Morbilidad Semanal Consolidada (EPI-15)', desc: 'Reporte consolidado por ASIC/CPT de las enfermedades registradas.' },
        { id: 'rep2', name: 'Alerta E.N.O (EPI-12)', desc: 'Reporte de Enfermedades de Notificación Obligatoria de la semana en curso.' },
        { id: 'rep3', name: 'Productividad de Consultas (DSP-04)', desc: 'Atenciones integrales desglosadas por programa de salud.' },
        { id: 'rep4', name: 'Morbilidad por Grupos Etarios', desc: 'Desglose de morbilidad general separada por edad y sexo.' },
        { id: 'rep5', name: 'Mortalidad Semanal (EPI-14)', desc: 'Reporte oficial de defunciones vinculadas a eventos epidemiológicos.' }
      ].map((rep) => (
        <button key={rep.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all text-left group">
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
            <FileText className="text-slate-500 group-hover:text-indigo-600" size={20} />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-slate-200">{rep.name}</h3>
          <p className="text-xs text-slate-500 mt-1">{rep.desc}</p>
          <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Generar Reporte <ChevronRight size={14} />
          </div>
        </button>
      ))}
    </div>
  );
}
