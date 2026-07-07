import React, { useState } from 'react';
import { Package, Truck, Clock, AlertTriangle, CheckCircle2, ChevronRight, PackageSearch, Activity } from 'lucide-react';

export default function LogisticsHub() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight">SEFAR | Almacén Central</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Control de Insumos, Cadena de Suministro y Despachos (ASICs)</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
             Registrar Ingreso
           </button>
           <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
             <Truck size={16} /> Nuevo Despacho
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kanban Board (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-950 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-x-auto">
           <div className="flex items-center gap-2 mb-4">
             <Truck className="text-indigo-500" size={20} />
             <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Flujo de Despachos</h2>
           </div>
           
           <div className="flex gap-4 min-w-[700px] flex-1">
              {/* Kanban Column 1 */}
              <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col">
                <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                  <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">Solicitudes (ASIC)</span>
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                </div>
                <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                   <KanbanCard title="Dotación Mensual" asic="ASIC Corazón de Jesús" items="14" urgency="Alta" />
                   <KanbanCard title="Urgencia Quirúrgica" asic="ASIC Ramón Ignacio Méndez" items="3" urgency="Crítica" />
                   <KanbanCard title="Reposición Regular" asic="ASIC Mi Jardín" items="22" urgency="Media" />
                </div>
              </div>

              {/* Kanban Column 2 */}
              <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col">
                <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                  <span className="font-bold text-amber-600 dark:text-amber-500 text-sm">En Preparación</span>
                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">2</span>
                </div>
                <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                   <KanbanCard title="Insumos Odontológicos" asic="ASIC El Carmen" items="8" urgency="Media" />
                   <KanbanCard title="Dotación Mensual" asic="ASIC Rómulo Gallegos" items="45" urgency="Alta" />
                </div>
              </div>

              {/* Kanban Column 3 */}
              <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col">
                <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                  <span className="font-bold text-blue-600 dark:text-blue-500 text-sm">Despachado</span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
                </div>
                <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                   <KanbanCard title="Material Medico Quirúrgico" asic="ASIC Los Pozones" items="112" urgency="Media" />
                </div>
              </div>
           </div>
        </div>

        {/* Right Sidebar - Stock & Expiry (Takes up 1 column) */}
        <div className="space-y-6">
          
          {/* Stock Indicators */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
               <PackageSearch className="text-emerald-500" size={18} />
               <h3 className="font-bold text-sm">Niveles de Inventario</h3>
             </div>
             
             <div className="space-y-4">
                <StockBar name="Solución Fisiológica 0.9%" current={4500} max={5000} />
                <StockBar name="Acetaminofén 500mg" current={2200} max={5000} />
                <StockBar name="Losartán Potásico 50mg" current={1800} max={4000} />
                <StockBar name="Insulina Cristalina (NPH)" current={140} max={2000} />
                <StockBar name="Azitromicina 500mg" current={50} max={1000} />
             </div>
          </div>

          {/* Expiry Timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
             <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
               <Clock className="text-amber-500" size={18} />
               <h3 className="font-bold text-sm">Próximos a Vencer</h3>
             </div>

             <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-5">
                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-white dark:border-slate-900"></div>
                  <p className="text-xs font-bold text-rose-500 uppercase">30 Días (Alerta Roja)</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">Lote X-992: Amoxicilina 500mg</p>
                  <p className="text-[10px] text-slate-500">200 cajas</p>
                </div>
                
                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900"></div>
                  <p className="text-xs font-bold text-amber-500 uppercase">60 Días (Alerta Amarilla)</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">Lote H-441: Hidrocortisona</p>
                  <p className="text-[10px] text-slate-500">1,500 viales</p>
                </div>

                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-slate-900"></div>
                  <p className="text-xs font-bold text-blue-500 uppercase">90 Días</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-1">Lote B-223: Jeringas 5cc</p>
                  <p className="text-[10px] text-slate-500">10,000 unidades</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function KanbanCard({ title, asic, items, urgency }: any) {
  const urgencyColor = 
    urgency === 'Crítica' ? 'text-rose-600 bg-rose-100 dark:bg-rose-900/30' : 
    urgency === 'Alta' ? 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' : 
    'text-blue-600 bg-blue-100 dark:bg-blue-900/30';

  return (
    <div className="bg-white dark:bg-slate-950 p-3 rounded shadow-sm border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${urgencyColor}`}>
          {urgency}
        </span>
        <span className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><ChevronRight size={14} /></span>
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1">{title}</h4>
      <p className="text-xs text-slate-500 mb-3">{asic}</p>
      
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-[11px] text-slate-500 font-medium">
        <span className="flex items-center gap-1"><Package size={12}/> {items} ítems</span>
        <span>Hace 2h</span>
      </div>
    </div>
  );
}

function StockBar({ name, current, max }: any) {
  const percentage = (current / max) * 100;
  const isLow = percentage < 15;
  const barColor = isLow ? 'bg-rose-500' : (percentage < 40 ? 'bg-amber-400' : 'bg-emerald-500');

  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{name}</span>
        <span className={`text-[10px] font-bold ${isLow ? 'text-rose-500' : 'text-slate-500'}`}>{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
