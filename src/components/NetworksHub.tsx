import { useSaaSContext } from '../context/SaaSContext';
import React from 'react';
import { Activity, Signal, Power, ZapOff, Ambulance, Bed, MapPin } from 'lucide-react';

export default function NetworksHub() {
  const { config } = useSaaSContext();
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full min-h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight">{config.modules.networks?.name || 'Redes de Salud Pública'}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monitoreo Técnico y Operatividad de la Red (ASIC, CPT, Hospitales)</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
             </span>
             SISTEMA ESTABLE (96% UPTIME)
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Server Uptime Style Panel (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold">
                 <Signal className="text-blue-500" size={18} />
                 <h3>Estado de Operatividad - Consultorios Populares (CPT)</h3>
               </div>
               <span className="text-xs text-slate-500 font-medium">Últimas 24h</span>
             </div>
             
             {/* ASIC Uptime Group 1 */}
             <div className="mb-6">
               <div className="flex justify-between items-end mb-2">
                 <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">ASIC Corazón de Jesús</h4>
                 <span className="text-xs font-mono text-slate-500">22 / 24 CPT Activos</span>
               </div>
               <div className="flex gap-1">
                 {Array.from({ length: 24 }).map((_, i) => {
                   const isDown = i === 12 || i === 15;
                   return (
                     <div key={i} className={`flex-1 h-8 rounded-sm ${isDown ? 'bg-rose-500 hover:bg-rose-400' : 'bg-emerald-500 hover:bg-emerald-400'} transition-colors cursor-help`} title={isDown ? 'CPT Inoperativo (Falta Elect.)' : 'CPT Operativo'}></div>
                   );
                 })}
               </div>
             </div>

             {/* ASIC Uptime Group 2 */}
             <div className="mb-6">
               <div className="flex justify-between items-end mb-2">
                 <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">ASIC Ramón Ignacio Méndez</h4>
                 <span className="text-xs font-mono text-slate-500">18 / 18 CPT Activos</span>
               </div>
               <div className="flex gap-1">
                 {Array.from({ length: 18 }).map((_, i) => (
                   <div key={i} className="flex-1 h-8 rounded-sm bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-help" title="CPT Operativo"></div>
                 ))}
               </div>
             </div>

             {/* Outage Alerts */}
             <div className="mt-2 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/30 rounded-lg p-3">
               <h5 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase mb-2 flex items-center gap-1"><ZapOff size={14}/> Fallas Reportadas</h5>
               <ul className="text-sm text-rose-600 dark:text-rose-300 space-y-1">
                 <li className="flex items-center justify-between"><span>CPT 2 Juan Pablo II (ASIC Corazón): Sin servicio eléctrico.</span> <span className="text-[10px] bg-rose-200 dark:bg-rose-800 px-1.5 py-0.5 rounded font-mono">HACE 4H</span></li>
                 <li className="flex items-center justify-between"><span>CPT 3 La Caramuca (ASIC Corazón): Falla de suministro de agua.</span> <span className="text-[10px] bg-rose-200 dark:bg-rose-800 px-1.5 py-0.5 rounded font-mono">HACE 2H</span></li>
               </ul>
             </div>
           </div>
        </div>

        {/* Logistics Tracker (1 column) */}
        <div className="space-y-6">
          
          {/* ICU Beds */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-5 border border-slate-800 shadow-sm text-slate-100">
             <div className="flex items-center gap-2 mb-4 text-slate-100">
               <Bed className="text-cyan-400" size={18} />
               <h3 className="font-bold text-sm">Disponibilidad UCI / Trauma</h3>
             </div>
             
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div>
                    <p className="font-bold text-sm">HOSP. DR. LUIS RAZETTI</p>
                    <p className="text-[10px] text-slate-400">UCI Adultos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-rose-400">0/12</p>
                    <p className="text-[10px] font-bold text-rose-500 uppercase">Sin Camas</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div>
                    <p className="font-bold text-sm">HOSP. MATERNO INFANTIL</p>
                    <p className="text-[10px] text-slate-400">UCI Neonatal (UTIN)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-emerald-400">3/8</p>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase">Disponibles</p>
                  </div>
                </div>
             </div>
          </div>

          {/* Ambulance GPS Simulator */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
               <Ambulance className="text-rose-500" size={18} />
               <h3 className="font-bold text-sm">Rastreo Logístico (Ambulancias)</h3>
             </div>
             
             <div className="relative h-48 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-3">
                <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                
                {/* Simulated Vehicles */}
                <div className="absolute top-1/2 left-1/4 flex flex-col items-center animate-[bounce_2s_infinite]">
                  <div className="bg-white dark:bg-slate-800 p-1 rounded-full shadow-md border-2 border-rose-500">
                    <Ambulance size={14} className="text-rose-500" />
                  </div>
                  <span className="text-[9px] font-bold mt-1 bg-white/80 dark:bg-slate-900/80 px-1 rounded">U-44 (En Traslado)</span>
                </div>
                
                <div className="absolute top-1/4 right-1/3 flex flex-col items-center">
                  <div className="bg-white dark:bg-slate-800 p-1 rounded-full shadow-md border-2 border-emerald-500">
                    <MapPin size={14} className="text-emerald-500" />
                  </div>
                  <span className="text-[9px] font-bold mt-1 bg-white/80 dark:bg-slate-900/80 px-1 rounded">Base Razetti</span>
                </div>
             </div>
             
             <div className="text-xs font-medium text-slate-600 dark:text-slate-400 flex justify-between">
               <span>Operativas: <span className="font-bold text-emerald-600">4</span></span>
               <span>En Taller: <span className="font-bold text-rose-600">2</span></span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
