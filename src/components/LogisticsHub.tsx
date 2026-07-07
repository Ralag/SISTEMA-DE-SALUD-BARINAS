import React from 'react';
import { Package, Clock, PackageSearch, ChevronRight, Truck, Box, AlertOctagon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useSaaSContext } from '../context/SaaSContext';

export default function LogisticsHub() {
  const { user } = useAppContext();
  const { config } = useSaaSContext();

  return (
    <div className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 p-4 md:p-6 ">
      
      {/* Header SEFAR */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Truck className="text-blue-600" size={28} strokeWidth={2.5} />
            SEFAR - Logística
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium tracking-wide uppercase">
            Centro de Distribución y Cadena de Suministro
          </p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
             + Nuevo Ingreso
           </button>
           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-blue-700 transition-colors">
             Generar Guía
           </button>
        </div>
      </div>

      {/* Main Board Area */}
      <div className="flex-1 flex flex-col xl:flex-row gap-6 overflow-hidden pb-4">
        
        {/* Kanban Board (Takes up remaining width) */}
        <div className="flex-1 flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          
          {/* Kanban Column: Solicitudes */}
          <div className="w-[300px] flex-shrink-0 bg-slate-100 dark:bg-slate-900/50 rounded-2xl flex flex-col border border-slate-200 dark:border-slate-800">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider flex items-center gap-2">
                <Box size={16} className="text-slate-500" /> Solicitudes
              </span>
              <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded">3</span>
            </div>
            <div className="p-3 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
               <KanbanCard title="Dotación Mensual" asic="ASIC Corazón de Jesús" items="14" urgency="Alta" time="Hace 2h" />
               <KanbanCard title="Urgencia Quirúrgica" asic="ASIC Ramón I. Méndez" items="3" urgency="Crítica" time="Hace 30m" />
               <KanbanCard title="Reposición Regular" asic="ASIC Mi Jardín" items="22" urgency="Media" time="Ayer" />
            </div>
          </div>

          {/* Kanban Column: En Preparación */}
          <div className="w-[300px] flex-shrink-0 bg-amber-50 dark:bg-amber-950/20 rounded-2xl flex flex-col border border-amber-200/50 dark:border-amber-900/30">
            <div className="p-4 border-b border-amber-200/50 dark:border-amber-900/30 flex justify-between items-center">
              <span className="font-black text-amber-800 dark:text-amber-500 text-sm uppercase tracking-wider flex items-center gap-2">
                <PackageSearch size={16} /> En Preparación
              </span>
              <span className="bg-amber-200/50 dark:bg-amber-900/50 text-amber-800 dark:text-amber-400 text-xs font-bold px-2 py-0.5 rounded">2</span>
            </div>
            <div className="p-3 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
               <KanbanCard title="Insumos Odontológicos" asic="ASIC El Carmen" items="8" urgency="Media" time="Hace 4h" />
               <KanbanCard title="Dotación Mensual" asic="ASIC Rómulo Gallegos" items="45" urgency="Alta" time="Ayer" />
            </div>
          </div>

          {/* Kanban Column: Despachado */}
          <div className="w-[300px] flex-shrink-0 bg-blue-50 dark:bg-blue-950/20 rounded-2xl flex flex-col border border-blue-200/50 dark:border-blue-900/30">
            <div className="p-4 border-b border-blue-200/50 dark:border-blue-900/30 flex justify-between items-center">
              <span className="font-black text-blue-800 dark:text-blue-500 text-sm uppercase tracking-wider flex items-center gap-2">
                <Truck size={16} /> Despachado
              </span>
              <span className="bg-blue-200/50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded">1</span>
            </div>
            <div className="p-3 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
               <KanbanCard title="Material Quirúrgico" asic="ASIC Los Pozones" items="112" urgency="Media" time="Mar 14, 08:30 AM" />
            </div>
          </div>

        </div>

        {/* Right Sidebar - Stock & Expiry (Fixed width) */}
        <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">
          
          {/* Stock Indicators */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-5">
               <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest text-xs flex items-center gap-2">
                 <Box size={14} className="text-slate-500" /> Niveles Críticos
               </h3>
             </div>
             
             <div className="space-y-5">
                <StockBar name="Solución Fisiológica 0.9%" current={4500} max={5000} />
                <StockBar name="Acetaminofén 500mg" current={2200} max={5000} />
                <StockBar name="Losartán Potásico 50mg" current={1800} max={4000} />
                <StockBar name="Insulina Cristalina" current={140} max={2000} />
                <StockBar name="Azitromicina 500mg" current={50} max={1000} />
             </div>
          </div>

          {/* Expiry Timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-5">
               <h3 className="font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest text-xs flex items-center gap-2">
                 <Clock size={14} className="text-amber-500" /> Línea de Caducidad
               </h3>
             </div>
             
             <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-2 space-y-6">
                
                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-white dark:border-slate-900 shadow-sm animate-pulse"></div>
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">30 Días (Alerta)</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">Amoxicilina 500mg (Lote X-99)</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">200 cajas restantes</p>
                </div>
                
                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900 shadow-sm"></div>
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">60 Días (Aviso)</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">Hidrocortisona (Lote H-44)</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">1,500 viales restantes</p>
                </div>

                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-slate-900 shadow-sm"></div>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">90 Días</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">Jeringas 5cc (Lote B-22)</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">10,000 unidades</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function KanbanCard({ title, asic, items, urgency, time }: { title: string, asic: string, items: string, urgency: string, time: string }) {
  const isCritical = urgency === 'Crítica';
  const isHigh = urgency === 'Alta';
  
  const urgencyColor = 
    isCritical ? 'text-rose-600 bg-rose-100 dark:bg-rose-900/50 dark:text-rose-400 border-rose-200 dark:border-rose-800' : 
    isHigh ? 'text-amber-600 bg-amber-100 dark:bg-amber-900/50 dark:text-amber-400 border-amber-200 dark:border-amber-800' : 
    'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  return (
    <div className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors group">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest flex items-center gap-1 ${urgencyColor}`}>
          {isCritical && <AlertOctagon size={10} />}
          {urgency}
        </span>
        <span className="text-slate-400 group-hover:text-blue-500 transition-colors"><ChevronRight size={14} /></span>
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1">{title}</h4>
      <p className="text-xs text-slate-500 font-medium mb-4">{asic}</p>
      
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3 text-[10px] text-slate-500 font-bold uppercase tracking-wide">
        <span className="flex items-center gap-1"><Package size={12}/> {items} ítems</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

function StockBar({ name, current, max }: { name: string, current: number, max: number }) {
  const percentage = (current / max) * 100;
  const isLow = percentage < 15;
  const barColor = isLow ? 'bg-rose-500' : (percentage < 40 ? 'bg-amber-400' : 'bg-emerald-500');

  return (
    <div>
      <div className="flex justify-between items-end mb-1.5">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate pr-2">{name}</span>
        <span className={`text-[10px] font-black ${isLow ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`}>{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
