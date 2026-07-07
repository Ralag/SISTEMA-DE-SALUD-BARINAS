import React, { useMemo, useState } from 'react';
import { Search, Activity, Package, Users, Kanban, Calendar, FileText, Megaphone, Bell, CheckCircle2, AlertTriangle, TrendingUp, ChevronRight, MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function WelcomeHub() {
  const { user } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica Dinámica de Nivel (Rol)
  const isExecutive = ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL'].includes(user.level);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      {/* Header Corporativo (Workspace) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-emerald-200 dark:border-emerald-800">
              {user.title}
            </span>
            {user.department && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                {user.department}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight text-slate-800 dark:text-slate-100">
            Sistema Salas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Espacio de trabajo unificado. Bienvenido, {user.name}.
          </p>
        </div>

        {/* Buscador Universal Workspace */}
        <div className="w-full md:w-96 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
            placeholder="Buscar pacientes, documentos, tareas, personal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <kbd className="hidden sm:inline-flex items-center border border-slate-200 dark:border-slate-700 rounded px-2 text-[10px] font-sans font-medium text-slate-400 dark:text-slate-500">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area (Bento Grid) */}
        <div className="lg:col-span-3 space-y-6">
          
          {isExecutive ? (
            <>
              {/* Executive Synthesis Dashboard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* Epidemiología Widget */}
                <Link to="/stats" className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      <Activity size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Salud Pública</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100">12</h4>
                    <p className="text-xs text-slate-500 mt-1">Alertas Epidemiológicas Activas</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-emerald-600 font-bold">
                    <span>Ver Sala Situacional</span>
                    <ChevronRight size={14} />
                  </div>
                </Link>

                {/* Logística Widget */}
                <Link to="/logistics" className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                      <Package size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">SEFAR / Logística</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100">85%</h4>
                    <p className="text-xs text-slate-500 mt-1">Nivel de Abastecimiento (ASICs)</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-indigo-600 font-bold">
                    <span>Ver Inventario</span>
                    <ChevronRight size={14} />
                  </div>
                </Link>

                {/* RRHH Widget */}
                <Link to="/hr" className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500 hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                      <Users size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">RRHH</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100">342</h4>
                    <p className="text-xs text-slate-500 mt-1">Personal de Guardia Hoy</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-amber-600 font-bold">
                    <span>Ver Asistencia</span>
                    <ChevronRight size={14} />
                  </div>
                </Link>

                {/* Proyectos Widget */}
                <Link to="/projects" className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-rose-500 hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                      <Kanban size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Proyectos</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100">5</h4>
                    <p className="text-xs text-slate-500 mt-1">Jornadas Activas / Rehabilitaciones</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-rose-600 font-bold">
                    <span>Ver Tablero Kanban</span>
                    <ChevronRight size={14} />
                  </div>
                </Link>
              </div>

              {/* Tareas y Calendario cruzado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bandeja de Entrada de Tareas */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-80">
                  <div className="border-b border-slate-100 dark:border-slate-800 p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold text-sm">
                      <CheckCircle2 size={16} className="text-blue-500" /> Mis Tareas Pendientes
                    </div>
                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full">3 nuevas</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2">
                    {[
                      { title: 'Aprobar requisa médica de ASIC Corazón de Jesús', mod: 'Logística', time: 'Hace 2h' },
                      { title: 'Revisar informe de morbilidad semana 24', mod: 'Epidemiología', time: 'Hace 5h' },
                      { title: 'Firma electrónica de circulares RH-042', mod: 'Ejecutivo', time: 'Ayer' },
                    ].map((task, i) => (
                      <div key={i} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors border-b border-transparent hover:border-slate-100 dark:hover:border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{task.title}</p>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                          <span>{task.mod}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock size={10}/> {task.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actividad Reciente General */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-80">
                   <div className="border-b border-slate-100 dark:border-slate-800 p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold text-sm">
                      <TrendingUp size={16} className="text-emerald-500" /> Actividad Reciente del Estado
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <div className="flex gap-3">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600">
                          <FileText size={12} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-200"><span className="font-bold">ASIC Ramón Ignacio Méndez</span> cargó EPI-10 Semana 24.</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Hace 15 min</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0 text-rose-600">
                          <AlertTriangle size={12} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-200"><span className="font-bold">SEFAR</span> reportó stock crítico de insulina NPH.</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Hace 45 min</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 text-amber-600">
                          <Users size={12} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-200"><span className="font-bold">RRHH</span> procesó nómina quincenal con éxito.</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Ayer a las 14:30</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
                   <Activity size={32} />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100 mb-2">Bienvenido a su Espacio de Trabajo</h3>
                <p className="text-slate-500 max-w-md text-sm mb-6">Utilice el menú superior de aplicaciones (icono de cuadrícula) o los enlaces rápidos para acceder a los módulos de carga de morbilidad, proyectos y logística.</p>
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                  <Link to="/modules" className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all group flex flex-col items-center gap-2">
                    <Activity size={24} className="text-blue-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Cargar EPI-10 / DSP-04</span>
                  </Link>
                  <Link to="/docs" className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all group flex flex-col items-center gap-2">
                    <FileText size={24} className="text-emerald-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Ver Comunicados</span>
                  </Link>
                </div>
             </div>
          )}

        </div>

        {/* Right Sidebar: Agenda & Communications */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 dark:border-slate-800 p-4 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
                <Calendar size={16} className="text-slate-500" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Agenda Ejecutiva</h3>
              </div>
              <div className="p-4">
                <div className="text-center p-3 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg mb-4 bg-slate-50 dark:bg-slate-800/20">
                   <p className="text-2xl font-black font-display text-blue-600 dark:text-blue-400">7</p>
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Julio 2026</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative pl-4 border-l-2 border-emerald-500">
                    <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></div>
                    <p className="text-[10px] font-bold text-slate-400">09:00 AM</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Reunión con Directores ASIC</p>
                  </div>
                  <div className="relative pl-4 border-l-2 border-amber-500">
                    <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900"></div>
                    <p className="text-[10px] font-bold text-slate-400">02:30 PM</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Auditoría SEFAR Almacén Central</p>
                  </div>
                </div>
                
                <Link to="/docs" className="block w-full text-center mt-6 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider">
                  Ver Calendario Completo
                </Link>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 dark:border-slate-800 p-4 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
                <Megaphone size={16} className="text-slate-500" />
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Comunicaciones Oficiales</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { title: 'Circular RH-045: Normativa de Asistencia', src: 'Dirección RRHH', doc: true },
                  { title: 'Lineamientos Campaña Vacunación Las Américas', src: 'Inmunización (PAI)', doc: false },
                ].map((msg, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-100 leading-snug mb-1">{msg.title}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                      <span className="text-blue-600 dark:text-blue-400">{msg.src}</span>
                      {msg.doc && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-slate-400"><FileText size={10}/> PDF</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
