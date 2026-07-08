import React, { useState } from 'react';
import { Search, Syringe, ShieldCheck, Activity, Package, Users, Kanban, Calendar, FileText, Megaphone, CheckCircle2, AlertTriangle, TrendingUp, ChevronRight, Clock, Plus, Stethoscope, ClipboardList, BarChart3, MapPin, Layers, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useSaaSContext } from '../context/SaaSContext';



export default function WelcomeHub() {
  const { user } = useAppContext();
  const { config } = useSaaSContext();
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return null;

  // Lógica Dinámica de Nivel (Rol)
  const isExecutive = ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL'].includes(user.level);
  const isCoordinator = ['L1_TACTICAL', 'L2_LOCAL'].includes(user.level);
  const isOperational = ['L3_OPERATIONAL'].includes(user.level);

  const allQuickAccess = [
    { title: 'Panel Global', subtitle: 'Configuración SaaS', value: 'Admin', icon: <Settings size={20} className="text-slate-600" />, colorClass: 'slate', to: '/admin-saas', linkText: 'Ver Configuración', dept: 'ADMIN_PANEL' },
    { title: config.modules.epidemiology?.name || 'Epidemiología', subtitle: config.modules.epidemiology?.description || 'Análisis y Alertas', value: '3 Activas', icon: <Activity size={20} className="text-emerald-600" />, colorClass: 'emerald', to: '/epidemiology', linkText: 'Ver Sala de Guerra', dept: 'EPIDEMIOLOGIA' },
    { title: config.modules.stats?.name || 'Estadística (CEIS)', subtitle: config.modules.stats?.description || 'Indicadores', value: '98%', icon: <BarChart3 size={20} className="text-cyan-600" />, colorClass: 'blue', to: '/stats', linkText: 'Ver CEIS', dept: 'ESTADISTICA' },
    { title: config.modules.networks?.name || 'Red de Atención', subtitle: config.modules.networks?.description || 'Operatividad', value: '94%', icon: <Layers size={20} className="text-blue-600" />, colorClass: 'blue', to: '/networks', linkText: 'Monitorear Red', dept: 'RED_ATENCION' },
    { title: config.modules.immunization?.name || 'Inmunización (PAI)', subtitle: 'Cobertura Mensual', value: '88.4%', icon: <Syringe size={20} className="text-indigo-600" />, colorClass: 'indigo', to: '/immunization', linkText: 'Ver Programa', dept: 'INMUNIZACION' },
    { title: config.modules.sacs?.name || 'Contraloría', subtitle: config.modules.sacs?.description || 'Inspecciones SACS', value: '45', icon: <ShieldCheck size={20} className="text-rose-600" />, colorClass: 'rose', to: '/sacs', linkText: 'Ver Operativos', dept: 'SACS' },
    { title: config.modules.logistics?.name || 'SEFAR', subtitle: config.modules.logistics?.description || 'Disponibilidad Almacén', value: '78%', icon: <Package size={20} className="text-amber-600" />, colorClass: 'amber', to: '/logistics', linkText: 'Ver Inventario', dept: 'SEFAR' },
    { title: config.modules.hr?.name || 'Talento Humano', subtitle: config.modules.hr?.description || 'Personal y Guardias', value: '92%', icon: <Users size={20} className="text-orange-600" />, colorClass: 'amber', to: '/hr', linkText: 'Ver Nómina', dept: 'RRHH' },
    { title: config.modules.programs?.name || 'Programas de Salud', subtitle: config.modules.programs?.description || 'Seguimiento de Cohortes', value: '14', icon: <Kanban size={20} className="text-purple-600" />, colorClass: 'indigo', to: '/programs', linkText: 'Ver Programas', dept: 'PROGRAMAS_SALUD' },
  ];

  const quickAccess = allQuickAccess.filter(app => {
    if (app.dept === 'ADMIN_PANEL' && (user?.level === 'ADMIN' || user?.level === 'MODERATOR')) return true;
    if (app.dept === 'ADMIN_PANEL') return false;
    
    if (user?.level === 'ADMIN' || user?.level === 'MODERATOR' || user?.level === 'L0_STRATEGIC' || user?.department === 'DES') return true;
    if (app.dept === 'PROGRAMAS_SALUD' && ['TUBERCULOSIS', 'ITS_VIH', 'CAREMT', 'SALUD_FAMILIAR', 'SALUD_COMUNITARIA', 'MALARIOLOGIA', 'PROGRAMAS_SALUD'].includes(user?.department || '')) return true;
    return app.dept === user?.department || (app.dept === 'ESTADISTICA' && ['DIRECTOR_ASIC', 'ESTADISTICA_ASIC'].includes(user?.department || ''));
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">
      <HeaderCorporativo user={user} isOperational={isOperational} config={config} />
      
      {/* Quick Access Cards always visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickAccess.map((item, i) => (
          <QuickAccessCard key={i} {...item} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TaskInbox tasks={[]} />
            <RecentActivity activities={[]} />
          </div>
        </div>
        
        <div className="w-full lg:w-80 flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

function HeaderCorporativo({ user, isOperational, config }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-blue-200 dark:border-blue-800">
              {user.title}
            </span>
            {user.department && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                {user.department}
              </span>
            )}
            {user.asicAccess && (
              <span className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-emerald-200 dark:border-emerald-800">
                <MapPin size={10} /> ASIC {user.asicAccess}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight text-slate-800 dark:text-slate-100">
            Sistema Salas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            {config.welcomeMessage} Bienvenido, <span className="font-bold text-slate-700 dark:text-slate-300">{user.name}</span>. 
            {isOperational && user.cptAccess ? ` Has ingresado al terminal del ${user.cptAccess}.` : ''}
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
            <Clock size={16} className="text-slate-500" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 font-mono">
              09:41 AM <span className="text-slate-400 font-normal">|</span> Jue, 24 Jul
            </span>
          </div>
        </div>
      </div>
  );
}

function QuickAccessCard({ title, subtitle, value, icon, colorClass, to, linkText }: any) {
  const colorStyles: Record<string, string> = {
    emerald: "hover:border-emerald-500 hover:shadow-emerald-500/10",
    indigo: "hover:border-indigo-500 hover:shadow-indigo-500/10",
    blue: "hover:border-blue-500 hover:shadow-blue-500/10",
    rose: "hover:border-rose-500 hover:shadow-rose-500/10",
    amber: "hover:border-amber-500 hover:shadow-amber-500/10",
  };
  const textColors: Record<string, string> = {
    emerald: "text-emerald-600",
    indigo: "text-indigo-600",
    blue: "text-blue-600",
    rose: "text-rose-600",
    amber: "text-amber-600",
  };
  return (
    <Link to={to} className={`bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-all group hover:shadow-md ${colorStyles[colorClass]?.split('hover:')[1] || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${colorStyles[colorClass]?.split('hover:')[0] || ''}`}>
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</span>
      </div>
      <div>
        <h4 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100">{value}</h4>
        <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>
      </div>
      <div className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold ${textColors[colorClass]}`}>
        <span>{linkText}</span>
        <ChevronRight size={14} />
      </div>
    </Link>
  );
}

function TaskInbox({ tasks }: { tasks: any[] }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-80">
      <div className="border-b border-slate-100 dark:border-slate-800 p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold text-sm">
          <CheckCircle2 size={16} className="text-blue-500" /> Mis Tareas Pendientes
        </div>
        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{tasks.length} nuevas</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {tasks.length === 0 && (
          <div className="min-h-full flex flex-col items-center justify-center text-slate-400">
            <CheckCircle2 size={32} className="mb-2 opacity-50" />
            <p className="text-sm">No hay tareas pendientes</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RecentActivity({ activities }: { activities: any[] }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-80">
      <div className="border-b border-slate-100 dark:border-slate-800 p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold text-sm">
          <TrendingUp size={16} className="text-emerald-500" /> Actividad Reciente
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activities.length === 0 && (
          <div className="min-h-full flex flex-col items-center justify-center text-slate-400">
            <Activity size={32} className="mb-2 opacity-50" />
            <p className="text-sm">No hay actividad reciente</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 dark:border-slate-800 p-4 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
          <Calendar size={16} className="text-slate-500" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Agenda Ejecutiva</h3>
        </div>
        <div className="p-4">
          <div className="text-center p-3 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg mb-4 bg-slate-50 dark:bg-slate-800/20">
            <p className="text-2xl font-black font-display text-blue-600 dark:text-blue-400">24</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Julio 2026</p>
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
        <div className="p-4 text-center text-sm text-slate-500">
          No hay comunicados nuevos.
        </div>
      </div>
    </div>
  );
}
