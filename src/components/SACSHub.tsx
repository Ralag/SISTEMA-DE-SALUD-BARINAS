import React from 'react';
import { ShieldCheck, Map, CheckCircle2, XCircle, AlertTriangle, FileText, CheckSquare, Search } from 'lucide-react';

export default function SACSHub() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full min-h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight">Contraloría Sanitaria (SACS)</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Inspecciones, Permisos Sanitarios y Clausuras</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <div className="relative w-full sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input type="text" placeholder="Buscar comercio o RIF..." className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Workflows - Inspections list (2 columns) */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex items-center gap-2 mb-2">
             <FileText className="text-blue-500" size={20} />
             <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Flujo de Aprobaciones</h2>
           </div>

           {/* Inspection Card 1 */}
           <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Panadería El Trigal C.A.</h3>
                    <p className="text-xs text-slate-500 font-mono">RIF: J-40123992-0 | Sector Alto Barinas</p>
                  </div>
                  <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Inspeccionado</span>
                </div>
                
                {/* Visual Checklist */}
                <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1"><CheckSquare size={14}/> Requisitos Cumplidos</span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">4 de 5</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500 w-1/5 border-r border-white/20"></div>
                    <div className="h-full bg-emerald-500 w-1/5 border-r border-white/20"></div>
                    <div className="h-full bg-emerald-500 w-1/5 border-r border-white/20"></div>
                    <div className="h-full bg-emerald-500 w-1/5 border-r border-white/20"></div>
                    <div className="h-full bg-slate-300 dark:bg-slate-600 w-1/5"></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Falta: Certificado de Fumigación Vigente.</p>
                </div>
              </div>
              
              {/* Big Buttons */}
              <div className="flex sm:flex-col gap-2 justify-center border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-4 sm:pt-0 sm:pl-6 min-w-[140px]">
                 <button className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 transition-colors group">
                   <CheckCircle2 size={24} className="mb-1 group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Aprobar Permiso</span>
                 </button>
                 <button className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 transition-colors group">
                   <XCircle size={24} className="mb-1 group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Multar / Clausurar</span>
                 </button>
              </div>
           </div>

           {/* Inspection Card 2 */}
           <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-6 opacity-75">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Carnicería El Buen Corte</h3>
                    <p className="text-xs text-slate-500 font-mono">RIF: J-33412344-1 | Sector Centro</p>
                  </div>
                  <span className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Riesgo Sanitario</span>
                </div>
                
                {/* Visual Checklist */}
                <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3 border border-rose-100 dark:border-rose-900/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1"><AlertTriangle size={14}/> Requisitos Cumplidos</span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">1 de 5</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500 w-1/5 border-r border-white/20"></div>
                    <div className="h-full bg-rose-500 w-4/5"></div>
                  </div>
                  <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-2">Múltiples violaciones de cadena de frío y manipulación.</p>
                </div>
              </div>
              
              {/* Big Buttons */}
              <div className="flex sm:flex-col gap-2 justify-center border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-4 sm:pt-0 sm:pl-6 min-w-[140px]">
                 <button className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-emerald-50 text-emerald-300 dark:bg-emerald-900/10 dark:text-emerald-900 border border-emerald-100 dark:border-emerald-900/30 cursor-not-allowed">
                   <CheckCircle2 size={24} className="mb-1" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Aprobar Permiso</span>
                 </button>
                 <button className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white border border-rose-700 transition-colors shadow-sm group">
                   <AlertTriangle size={24} className="mb-1 group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Clausura Inmediata</span>
                 </button>
              </div>
           </div>

        </div>

        {/* Status Map Sidebar (1 column) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[400px]">
             <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
               <Map className="text-emerald-500" size={18} />
               <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Mapa de Estatus (Simulado)</h3>
             </div>
             
             {/* Simulated Map Area */}
             <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 relative overflow-hidden">
                {/* Decorative map lines */}
                <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.83v58.34h-58.34v-.83l57.51-58.34zM57.51 60l-.83-.83v-58.34h58.34v.83l-57.51 58.34z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
                
                {/* Green Pins (Solventes) */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></div>
                <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></div>
                
                {/* Red Pins (Clausurados/Multados) */}
                <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-rose-600 rounded-full border-2 border-white dark:border-slate-900 shadow-[0_0_15px_rgba(225,29,72,0.8)] flex items-center justify-center z-10">
                  <span className="absolute w-8 h-8 border border-rose-500 rounded-full animate-ping"></span>
                </div>
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></div>
                
                <div className="absolute bottom-2 left-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded border border-slate-200 dark:border-slate-700 flex justify-around text-[10px] font-bold uppercase">
                  <div className="flex items-center gap-1 text-emerald-600"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Solvente</div>
                  <div className="flex items-center gap-1 text-rose-600"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Clausurado</div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
