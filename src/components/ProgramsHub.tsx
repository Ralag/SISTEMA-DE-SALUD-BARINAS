import { useSaaSContext } from '../context/SaaSContext';
import React from 'react';
import { Target, Users, HeartPulse, Stethoscope, Droplet, Brain } from 'lucide-react';

export default function ProgramsHub() {
  const { config } = useSaaSContext();
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full min-h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight">{config?.modules?.programs?.appTitle || config?.modules?.programs?.name || 'Programas de Salud'}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Seguimiento de Cohortes y Cumplimiento de Metas Trimestrales</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg text-sm font-bold shadow-sm focus:outline-none focus:border-blue-500">
             <option>T3 2026 (Jul-Sep)</option>
             <option>T2 2026 (Abr-Jun)</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Goals / Doughnuts (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <div className="flex items-center gap-2 mb-6">
               <Target className="text-blue-500" size={20} />
               <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Cumplimiento de Metas de Control</h2>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <GoalCircle icon={<HeartPulse size={24}/>} color="rose" label="Salud Cardiovascular" percentage={82} patients="12,450" />
                <GoalCircle icon={<Droplet size={24}/>} color="emerald" label="Endocrinometabólico" percentage={65} patients="8,920" />
                <GoalCircle icon={<Users size={24}/>} color="purple" label="Ruta Materna" percentage={94} patients="4,105" />
                <GoalCircle icon={<Brain size={24}/>} color="indigo" label="Salud Mental" percentage={42} patients="2,150" />
             </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <div className="flex items-center gap-2 mb-4">
               <Stethoscope className="text-amber-500" size={20} />
               <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Déficit de Captación (Alertas)</h2>
             </div>
             <p className="text-sm text-slate-500 mb-4">Programas con bajo índice de pacientes controlados respecto a la meta estadal.</p>
             
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="font-bold text-slate-700 dark:text-slate-200">Programa Salud Renal (Diálisis)</span>
                   <span className="text-rose-500 font-bold">Meta: 40%</span>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                   <div className="bg-rose-500 h-full w-[40%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="font-bold text-slate-700 dark:text-slate-200">Tuberculosis (DOTS)</span>
                   <span className="text-amber-500 font-bold">Meta: 68%</span>
                 </div>
                 <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                   <div className="bg-amber-500 h-full w-[68%]"></div>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Population Pyramid (1 column) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
               <Users className="text-cyan-500" size={18} />
               <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Distribución de Cohortes (Diabéticos)</h3>
             </div>
             
             <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2 px-4">
                <span>Hombres (42%)</span>
                <span>Edades</span>
                <span>Mujeres (58%)</span>
             </div>

             <div className="space-y-2">
                <PyramidRow age="65+" m={40} f={55} />
                <PyramidRow age="55-64" m={60} f={80} />
                <PyramidRow age="45-54" m={45} f={65} />
                <PyramidRow age="35-44" m={25} f={35} />
                <PyramidRow age="20-34" m={10} f={15} />
                <PyramidRow age="0-19" m={5} f={5} />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function GoalCircle({ icon, color, label, percentage, patients }: any) {
  const colorMap: Record<string, string> = {
    rose: 'text-rose-500 border-rose-500',
    emerald: 'text-emerald-500 border-emerald-500',
    purple: 'text-purple-500 border-purple-500',
    indigo: 'text-indigo-500 border-indigo-500',
  };
  const bgMap: Record<string, string> = {
    rose: 'bg-rose-50 dark:bg-rose-900/20',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    purple: 'bg-purple-50 dark:bg-purple-900/20',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20',
  };

  return (
    <div className="flex flex-col items-center text-center group">
      <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mb-3 relative shadow-inner ${colorMap[color]} ${bgMap[color]}`}>
         <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
           {icon}
         </div>
         <span className="text-xl font-black relative z-10">{percentage}%</span>
      </div>
      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight mb-1">{label}</h4>
      <p className="text-[10px] text-slate-500 font-mono">{patients} pacs.</p>
    </div>
  );
}

function PyramidRow({ age, m, f }: { age: string, m: number, f: number }) {
  return (
    <div className="flex items-center gap-2">
      {/* Male bar (right to left) */}
      <div className="flex-1 flex justify-end">
        <div className="h-4 bg-blue-400 dark:bg-blue-600 rounded-l" style={{ width: `${m}%` }}></div>
      </div>
      {/* Age label */}
      <div className="w-10 text-center text-[10px] font-bold text-slate-700 dark:text-slate-300">
        {age}
      </div>
      {/* Female bar (left to right) */}
      <div className="flex-1 flex justify-start">
        <div className="h-4 bg-pink-400 dark:bg-pink-600 rounded-r" style={{ width: `${f}%` }}></div>
      </div>
    </div>
  );
}
