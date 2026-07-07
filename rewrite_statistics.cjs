const fs = require('fs');

const code = `import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Settings, Filter, Layers, ChevronRight, Users, Activity, MapPin, CheckCircle2, FileText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function StatisticsHub() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pivot' | 'reports'>('dashboard');
  const { user } = useAppContext();

  // Determine user scope
  const isRegional = user?.level === 'ADMIN' || user?.level === 'L0_STRATEGIC' || user?.level === 'L1_CENTRAL';
  const userAsic = user?.asicAccess || 'N/A';

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-4 md:p-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <BarChart3 className="text-indigo-600" />
            CEIS - Estadística e Información en Salud
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            {isRegional ? 'Sistema Integrado de Análisis de Datos (Nivel Regional)' : \`Panel de Control ASIC: \${userAsic}\`}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 transition-colors shadow-sm">
            <Download size={16} /> Exportar
          </button>
          {isRegional && (
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">
              <Filter size={16} /> Filtros
            </button>
          )}
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={\`py-3 px-6 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap \${activeTab === 'dashboard' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}\`}
        >
          Visualizador
        </button>
        <button
          onClick={() => setActiveTab('pivot')}
          className={\`py-3 px-6 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap \${activeTab === 'pivot' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}\`}
        >
          {isRegional ? 'Tablas Dinámicas' : 'Consolidados CPT'}
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={\`py-3 px-6 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap \${activeTab === 'reports' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}\`}
        >
          Reportes EPI
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Consultas Semanales</p>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{isRegional ? '12,450' : '840'}</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Users className="text-indigo-600" size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-emerald-600 font-bold">
                <TrendingUp size={16} /> +5.2% {isRegional ? 'Global' : 'Local'}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">EPI-10 (Morbilidad)</p>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">94%</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Activity className="text-emerald-600" size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-slate-500 font-medium">
                Porcentaje de transmisión
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">{isRegional ? 'ASIC Reportando' : 'CPT Reportando'}</p>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{isRegional ? '17/17' : '12/14'}</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                  <MapPin className="text-amber-600" size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-slate-500">
                {isRegional ? '100% Cobertura de red' : '2 CPT con retraso'}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Calidad del Dato</p>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{isRegional ? '98.5%' : '96.2%'}</h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <Settings className="text-blue-600" size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-emerald-600 font-bold">
                <CheckCircle2 size={16} /> Óptimo
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-4">
                {isRegional ? 'Morbilidad por ASIC (Top 5)' : 'Morbilidad por CPT (Top 5)'}
              </h3>
              <div className="h-64 flex items-end gap-2">
                {[75, 50, 90, 45, 60].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-indigo-500 rounded-t-md hover:bg-indigo-400 transition-colors cursor-pointer"
                      style={{ height: \`\${h}%\` }}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase text-center leading-tight">
                      {isRegional ? \`ASIC \${i+1}\` : \`CPT \${i+1}\`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-4">Tendencia de Notificación (Semanas 10-15)</h3>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <span className="text-slate-400 font-medium flex items-center gap-2"><TrendingUp /> Gráfico de Líneas</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pivot' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="bg-slate-100 dark:bg-slate-900 p-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 dark:text-slate-400">Filas:</span>
              <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                {isRegional ? 'Organización (ASIC)' : 'Organización (CPT)'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 dark:text-slate-400">Columnas:</span>
              <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">Periodos (Mes)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 dark:text-slate-400">Filtros:</span>
              <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium px-2 py-1 rounded shadow-sm border border-indigo-200 dark:border-indigo-800">Dx: Diarrea</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold sticky top-0">
                <tr>
                  <th className="px-6 py-3 border-b border-r border-slate-200 dark:border-slate-700">{isRegional ? 'ASIC' : 'CPT'}</th>
                  <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-right">Enero</th>
                  <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-right">Febrero</th>
                  <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-right">Marzo</th>
                  <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-700 text-right font-black bg-indigo-50/50 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-400">Total</th>
                </tr>
              </thead>
              <tbody>
                {(isRegional 
                  ? ['Guanapa', 'Obispos', 'Corazón de Jesús', 'R.I. Méndez', 'Barinas I']
                  : ['CPT 1 Canta Rana', 'CPT 2 Las Colinas', 'CPT 3 Centro', 'Ambulatorio Urbano']
                ).map((name, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 border-r border-slate-100 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300">{name}</td>
                    <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">{Math.floor(Math.random() * 50) + 10}</td>
                    <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">{Math.floor(Math.random() * 50) + 10}</td>
                    <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">{Math.floor(Math.random() * 50) + 10}</td>
                    <td className="px-6 py-4 text-right font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-900/10">150</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['DSP-04 Morbilidad', 'EPI-10 Vigilancia', 'EPI-12 Mortalidad', 'EPI-15 Semanal'].map((rep) => (
            <button key={rep} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all text-left group">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                <FileText className="text-slate-500 group-hover:text-indigo-600" size={20} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200">{rep}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {isRegional ? 'Reporte consolidado por ASIC y Parroquia.' : 'Reporte consolidado por CPT.'}
              </p>
              <div className="mt-4 text-xs font-bold text-indigo-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Generar <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/components/StatisticsHub.tsx', code);
console.log('StatisticsHub updated successfully');
