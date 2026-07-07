import React from 'react';
import { Download, TrendingUp, PieChart } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';

export default function Dhis2Visualizer() {
  const { user, location } = useAppContext();

  // Determine what to show based on selected location in OrgUnitTree
  let orgUnitName = 'Barinas (Estado)';
  let childUnits = ['ASIC Guanapa', 'ASIC Obispos', 'ASIC Corazón de Jesús', 'ASIC R.I. Méndez', 'ASIC Barinas I'];

  if (location.cpt) {
    orgUnitName = location.cpt;
    childUnits = ['Consultorio 1', 'Consultorio 2', 'Consultorio 3', 'Triaje'];
  } else if (location.asic) {
    orgUnitName = `ASIC ${location.asic}`;
    childUnits = ['CPT 1 Canta Rana', 'CPT 2 Las Colinas', 'CPT 3 Centro', 'Ambulatorio Urbano'];
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col min-h-[500px] flex-1">
      <div className="bg-slate-100 dark:bg-slate-900 p-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 text-sm items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600 dark:text-slate-400">Datos (dx):</span>
            <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              Diarrea
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600 dark:text-slate-400">Periodos (pe):</span>
            <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              Últimos 3 meses
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600 dark:text-slate-400">Org (ou):</span>
            <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
              {orgUnitName}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded text-xs font-bold transition-colors">Actualizar</button>
            <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1"><Download size={14}/> Exportar</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-white dark:bg-slate-800">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold sticky top-0 shadow-sm z-10">
            <tr>
              <th className="px-6 py-3 border-b border-r border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50">Organización ({orgUnitName})</th>
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-right">Octubre 2023</th>
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-right">Noviembre 2023</th>
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-right">Diciembre 2023</th>
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-right font-black bg-indigo-50/50 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-400">Total</th>
            </tr>
          </thead>
          <tbody>
            {childUnits.map((name, idx) => (
              <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-200 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">{name}</td>
                <td className="px-6 py-3 text-right">{Math.floor(Math.random() * 500) + 100}</td>
                <td className="px-6 py-3 text-right">{Math.floor(Math.random() * 500) + 100}</td>
                <td className="px-6 py-3 text-right">{Math.floor(Math.random() * 500) + 100}</td>
                <td className="px-6 py-3 text-right font-bold text-slate-700 dark:text-slate-300 bg-indigo-50/20 dark:bg-indigo-900/5">{Math.floor(Math.random() * 1500) + 300}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
