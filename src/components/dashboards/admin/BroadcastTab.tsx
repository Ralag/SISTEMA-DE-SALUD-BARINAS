import React, { useState, useEffect } from 'react';
import { Megaphone, FileText, Ticket, MessageSquareWarning, Send, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { db } from '../../../lib/db';

export default function BroadcastTab() {
  const { addToast } = useAppContext();
  const [bannerType, setBannerType] = useState('URGENT');
  const [bannerText, setBannerText] = useState('');
  
  const [banners, setBanners] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [fetchedBanners, fetchedTickets] = await Promise.all([
      db.getBanners(),
      db.getTickets()
    ]);
    setBanners(fetchedBanners);
    setTickets(fetchedTickets);
  };

  const handleBroadcast = async () => {
    if (!bannerText) {
      addToast('El mensaje no puede estar vacío.', 'error');
      return;
    }
    
    await db.createBanner({
      type: bannerType,
      message: bannerText
    });
    
    addToast('Notificación global inyectada en todos los clientes conectados.', 'success');
    setBannerText('');
    fetchData();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Broadcasting y Mesa de Ayuda (Ticketing)</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Interacción unidireccional y soporte técnico a toda la red del estado.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="space-y-6">
          {/* Banners Globals */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
              <Megaphone size={18} className="text-slate-600 dark:text-slate-400" />
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Inyección de Banners Globales</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Nivel de Prioridad (Color)</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setBannerType('URGENT')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors ${bannerType === 'URGENT' ? 'bg-rose-100 border-rose-500 text-rose-700 dark:bg-rose-900/40 dark:border-rose-500 dark:text-rose-300' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800'}`}
                  >
                    URGENTE (Rojo)
                  </button>
                  <button 
                    onClick={() => setBannerType('WARNING')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors ${bannerType === 'WARNING' ? 'bg-amber-100 border-amber-500 text-amber-700 dark:bg-amber-900/40 dark:border-amber-500 dark:text-amber-300' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800'}`}
                  >
                    AVISO (Amarillo)
                  </button>
                  <button 
                    onClick={() => setBannerType('INFO')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors ${bannerType === 'INFO' ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-300' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800'}`}
                  >
                    INFO (Azul)
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Mensaje</label>
                <textarea 
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  placeholder="Ej. Cierre de mes adelantado para el día 28. Subir registros inmediatamente."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
                />
              </div>
              <button 
                onClick={handleBroadcast}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
              >
                <Send size={16} /> Emitir Broadcast Global
              </button>
            </div>
          </div>

          {/* Circulares */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex items-center justify-between p-4 group cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Enviar Circular Oficial (PDF)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Distribución de documentos obligatorios.</p>
              </div>
            </div>
            <PlusCircle size={20} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
          </div>
        </div>

        {/* Ticketing */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket size={18} className="text-slate-600 dark:text-slate-400" />
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Soporte Técnico (Help Desk)</h3>
            </div>
            <span className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 text-xs font-bold px-2 py-0.5 rounded-full">2 Nuevos</span>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
              {tickets.length === 0 && (
                <li className="p-4 text-center text-slate-500 text-sm">No hay tickets activos</li>
              )}
              {tickets.map(ticket => (
                <li key={ticket.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">{ticket.id}</span>
                      {ticket.status === 'open' ? (
                        <span className={`w-2 h-2 rounded-full ${ticket.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
                      ) : (
                        <CheckCircle2 size={12} className="text-emerald-500" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{ticket.time || new Date(ticket.created_at).toLocaleDateString()}</span>
                  </div>
                  <h4 className={`text-sm font-bold ${ticket.status === 'closed' ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-800 dark:text-slate-200'}`}>
                    {ticket.subject}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                    <MessageSquareWarning size={12} />
                    <span>{ticket.user_name || ticket.user}</span>
                    <span>•</span>
                    <span>{ticket.asic}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-center">
            <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">
              Ver todos los tickets
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
