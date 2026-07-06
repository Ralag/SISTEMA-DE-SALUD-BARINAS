import React, { useMemo } from 'react';
import { Activity, ShieldCheck, FileText, Calendar, Megaphone, Info, Layers, BarChart3, Users, Network, Map, ClipboardList, Syringe, HeartPulse, Droplet, Brain, Eye, TestTube, ShieldAlert, Sparkles, Stethoscope, BookOpen, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import DashboardSummary from './DashboardSummary';

export default function WelcomeHub() {
  const { user } = useAppContext();

  // 1. Lógica Dinámica de Nivel (Rol)
  const { roleMessage, quickActions } = useMemo(() => {
    let msg = '';
    let actions = [];

    switch (user.level) {
      case 'ADMIN':
        msg = 'Panel de Administración del Sistema. Visualización absoluta de estadísticas, configuración de usuarios y auditoría de accesos.';
        actions = [
          { name: 'Estadística Total', path: '/stats', icon: <BarChart3 size={24} className="text-blue-600" />, desc: 'Métricas de estado completas' },
          { name: 'Módulos de Carga', path: '/modules', icon: <Layers size={24} className="text-indigo-600" />, desc: 'Auditar Data Entry' },
          { name: 'Mapa Operativo', path: '/stats?tab=map', icon: <Map size={24} className="text-emerald-600" />, desc: 'Estado de la Red de Salud' }
        ];
        break;
      case 'L0_STRATEGIC':
        msg = 'Panel de Autoridad Única de Salud. Visualización gerencial y estadística completa de todo el estado Barinas y su red de atención.';
        actions = [
          { name: 'Dashboard Estratégico', path: '/stats', icon: <BarChart3 size={24} className="text-amber-600" />, desc: 'Reportes y tendencias' },
          { name: 'Operatividad de Red', path: '/stats?tab=map', icon: <Map size={24} className="text-emerald-600" />, desc: 'Consultorios y Hospitales' }
        ];
        break;
      case 'L1_CENTRAL':
        if (user.department === 'ESTADISTICA' || user.department === 'EPIDEMIOLOGIA') {
          msg = `Dirección Regional de ${user.department === 'ESTADISTICA' ? 'Estadística (CEIS)' : 'Epidemiología'}. Acceso irrestricto a la matriz de datos, reportes tabulares y curvas epidemiológicas estatales.`;
          actions = [
            { name: 'Reportes y Matrices', path: '/stats', icon: <BarChart3 size={24} className="text-blue-600" />, desc: 'Analítica de datos masivos' },
            { name: 'Auditoría de Carga', path: '/modules', icon: <ClipboardList size={24} className="text-indigo-600" />, desc: 'Auditar envíos ASIC' }
          ];
        } else {
          msg = `Coordinación Regional (${user.department}). Monitoreo central de estadísticas y consolidación de datos para la red completa de atención especializada.`;
          actions = [
            { name: 'Indicadores Estatales', path: '/stats', icon: <BarChart3 size={24} className="text-emerald-600" />, desc: 'Métricas de su departamento' },
            { name: 'Mapa de Programas', path: '/stats?tab=map', icon: <Map size={24} className="text-indigo-600" />, desc: 'Distribución en ASICs' }
          ];
        }
        break;
      case 'L1_TACTICAL':
        msg = `Coordinación Táctica de Programa: ${user.department}. Análisis de tendencias de recolección de datos y carga de resúmenes estadísticos.`;
        actions = [
          { name: 'Ingresar Datos', path: '/modules', icon: <Layers size={24} className="text-blue-600" />, desc: 'Carga de datos al programa' },
          { name: 'Indicadores del Programa', path: '/stats', icon: <BarChart3 size={24} className="text-emerald-600" />, desc: 'Métricas específicas' }
        ];
        break;
      case 'L2_LOCAL':
        if (user.department === 'DIRECTOR_ASIC') {
          msg = `Dirección del ASIC ${user.asicAccess}. Monitoreo integral de la operatividad, carga de datos y funcionamiento de las redes en su área de salud.`;
          actions = [
            { name: 'Estadística del ASIC', path: '/stats', icon: <BarChart3 size={24} className="text-emerald-600" />, desc: 'Ver reportes de su área' },
            { name: 'Módulos de Carga', path: '/modules', icon: <Layers size={24} className="text-blue-600" />, desc: 'EPI-10, DSP-04 y Programas' }
          ];
        } else if (user.department === 'ESTADISTICA_ASIC') {
          msg = `Gestión estadística local para el ASIC ${user.asicAccess}. Consolidación de datos de consultorios y carga formal al estado.`;
          actions = [
            { name: 'Consolidación de Datos', path: '/modules', icon: <Layers size={24} className="text-blue-600" />, desc: 'Envío formal de morbilidad' },
            { name: 'Revisión de Métricas', path: '/stats', icon: <BarChart3 size={24} className="text-indigo-600" />, desc: 'Validar consistencia' }
          ];
        } else {
          msg = `Coordinación local de ${user.department} para el ASIC ${user.asicAccess}. Asegure la carga oportuna de su programa.`;
          actions = [
            { name: 'Carga de Programa', path: '/modules', icon: <Layers size={24} className="text-blue-600" />, desc: 'Formularios especializados' },
            { name: 'Ver Métricas', path: '/stats', icon: <BarChart3 size={24} className="text-emerald-600" />, desc: 'Estadísticas del ASIC' }
          ];
        }
        break;
      case 'L3_OPERATIONAL':
        msg = `Médico o Personal Operativo en ${user.cptAccess}. Responsable del registro primario de datos y reportes de morbilidad local.`;
        actions = [
          { name: 'Notificar EPI-10', path: '/module/epi10', icon: <Activity size={24} className="text-rose-600" />, desc: 'Registro de morbilidad' },
          { name: 'Registro DSP-04', path: '/module/dsp04', icon: <ClipboardList size={24} className="text-indigo-600" />, desc: 'Productividad mensual' }
        ];
        break;
    }
    return { roleMessage: msg, quickActions: actions };
  }, [user]);

  // 2. Lógica Dinámica de Departamento (Widgets Específicos)
  const deptSpecifics = useMemo(() => {
    const baseNews = [
      { title: 'Cierre de período estadístico EPI-10', date: '30 Junio, 2026', content: 'Le recordamos que el cierre de carga para los formularios correspondientes a la semana epidemiológica en curso es inminente.', isNew: false }
    ];

    switch (user.department) {
      case 'INMUNIZACION':
        return {
          stats: [
            { label: 'Dosis Aplicadas (Mes)', value: '14,205', trend: '+12%', icon: <Syringe className="text-teal-500" /> },
            { label: 'Cobertura BCG', value: '96.4%', trend: '+0.5%', icon: <Activity className="text-teal-500" /> }
          ],
          resources: [
            { title: 'Esquema Nacional PAI', desc: 'Lineamientos 2026', icon: <BookOpen />, color: 'text-teal-600', bg: 'bg-teal-100 dark:bg-teal-900/50' },
            { title: 'Manual Cadena de Frío', desc: 'Conservación biológica', icon: <Thermometer />, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/50' }
          ],
          news: [{ title: 'Jornada de Vacunación de las Américas', date: '2 Julio, 2026', content: 'Carga prioritaria de matriz de datos para la campaña continental.', isNew: true }, ...baseNews]
        };
      case 'CARDIOVASCULAR':
        return {
          stats: [
            { label: 'Pacientes Dispensarizados', value: '8,432', trend: '+3%', icon: <HeartPulse className="text-red-500" /> },
            { label: 'Crisis Hipertensivas', value: '124', trend: '-5%', icon: <Activity className="text-red-500" /> }
          ],
          resources: [
            { title: 'Protocolo CAREMT', desc: 'Manejo HTA y DM2', icon: <Stethoscope />, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/50' }
          ],
          news: [{ title: 'Actualización Fármacos CAREMT', date: '1 Julio, 2026', content: 'Nuevos lineamientos para distribución de antihipertensivos.', isNew: true }, ...baseNews]
        };
      case 'EPIDEMIOLOGIA':
        return {
          stats: [
            { label: 'Casos Febriles Ictéricos', value: '45', trend: '+14%', icon: <ShieldAlert className="text-amber-500" /> },
            { label: 'Tasa Morbilidad General', value: '12.4', trend: '-1.2%', icon: <Activity className="text-blue-500" /> }
          ],
          resources: [
            { title: 'Clasificador CIE-10', desc: 'Códigos epidemiológicos', icon: <BookOpen />, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/50' },
            { title: 'Alerta Temprana', desc: 'Protocolo brotes', icon: <ShieldAlert />, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/50' }
          ],
          news: [{ title: 'Alerta Dengue', date: '5 Julio, 2026', content: 'Incremento de notificación de casos sospechosos en municipio capital.', isNew: true }, ...baseNews]
        };
      case 'ESTADISTICA':
      case 'ESTADISTICA_ASIC':
      case 'DIRECTOR_ASIC':
        return {
          stats: [
            { label: 'Registros Procesados', value: '45,210', trend: '+22%', icon: <ClipboardList className="text-blue-500" /> },
            { label: 'Oportunidad de Carga', value: '88%', trend: '+4%', icon: <Calendar className="text-emerald-500" /> }
          ],
          resources: [
            { title: 'Manual DHIS2', desc: 'Guía de ingreso de datos', icon: <FileText />, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/50' },
            { title: 'Cronograma Semanal', desc: 'Cierres de programas', icon: <Calendar />, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/50' }
          ],
          news: [{ title: 'Restructuración de Roles', date: '5 Julio, 2026', content: 'Nuevas divisiones de acceso departamental. Valide los usuarios de su ASIC.', isNew: true }, ...baseNews]
        };
      default:
        return {
          stats: [],
          resources: [
            { title: 'Manual Sistema Central', desc: 'Guía general', icon: <FileText />, color: 'text-slate-600', bg: 'bg-slate-100 dark:bg-slate-800' }
          ],
          news: baseNews
        };
    }
  }, [user.department]);

  const showGlobalDashboard = ['ADMIN', 'L0_STRATEGIC'].includes(user.level);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto w-full">
      {/* Header Personalizado */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-blue-800 text-blue-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-blue-600">
                {user.title}
              </span>
              {user.department && !['DES', 'SISTEMAS'].includes(user.department) && (
                <span className="bg-indigo-800 text-indigo-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-indigo-600 flex items-center gap-1">
                  <Activity size={10} /> PROGRAMA: {user.department}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">Bienvenido, {user.name}</h1>
            <p className="text-blue-100 max-w-2xl text-sm md:text-base leading-relaxed">
              {roleMessage}
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <Activity size={200} />
        </div>
      </div>

      {/* Widgets Estadísticos Condicionales */}
      {showGlobalDashboard ? (
        <DashboardSummary />
      ) : (
        deptSpecifics.stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {deptSpecifics.stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-3">
                    <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">{stat.value}</h4>
                    <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <Link to={action.path} key={i} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col items-start gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{action.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Noticias Departamentales */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="border-b border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
              <Megaphone className="text-blue-600" size={18} />
              <h2 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight text-sm">Actualizaciones: {user.department || 'Generales'}</h2>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {deptSpecifics.news.map((news, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{news.date}</span>
                    {news.isNew && (
                      <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Nuevo</span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">{news.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{news.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Recursos Específicos del Programa */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="border-b border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
              <Info className="text-blue-600" size={18} />
              <h2 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight text-sm">Biblioteca y Manuales</h2>
            </div>
            <div className="p-2">
              {deptSpecifics.resources.map((res, i) => (
                <a key={i} href="#" onClick={e => e.preventDefault()} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className={`${res.bg} ${res.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(res.icon, { size: 18 })}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{res.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{res.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
