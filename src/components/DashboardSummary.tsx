import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, TrendingUp, Activity, FileSpreadsheet } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function DashboardSummary() {
  const { user } = useAppContext();

  // Generamos datos simulados para las tendencias de la última semana
  const trendData = useMemo(() => {
    // Si el usuario es de un nivel superior, mostramos números más grandes
    const multiplier = user.level === 'L0_STRATEGIC' || user.level === 'L1_CENTRAL' ? 10 : 1;
    
    return Array.from({ length: 7 }).map((_, i) => ({
      name: `Día ${i + 1}`,
      'Pacientes Atendidos': (Math.floor(Math.random() * 400) + 200) * multiplier,
      'Casos Reportados': (Math.floor(Math.random() * 100) + 50) * multiplier,
    }));
  }, [user.level]);

  // KPIs simulados basados en el rol
  const kpis = useMemo(() => {
    const isStrategic = user.level === 'L0_STRATEGIC' || user.level === 'L1_CENTRAL';
    const isTactical = user.level === 'L1_TACTICAL';
    const isLocal = user.level === 'L2_LOCAL';
    const isOperational = user.level === 'L3_OPERATIONAL';

    const multiplier = isStrategic ? 10 : 1;

    let kpi1 = {
      title: 'Total Atendidos',
      value: ((Math.floor(Math.random() * 5000) + 10000) * multiplier).toLocaleString(),
      icon: Users,
      color: 'blue'
    };
    let kpi2 = {
      title: 'Morbilidad Semanal',
      value: ((Math.floor(Math.random() * 1000) + 2000) * multiplier).toLocaleString(),
      icon: Activity,
      color: 'rose'
    };
    let kpi3 = {
      title: 'Programas Activos',
      value: (isTactical ? 1 : 12).toString(),
      icon: FileSpreadsheet,
      color: 'emerald'
    };
    let kpi4 = {
      title: 'Tasa de Reporte',
      value: (Math.floor(Math.random() * 15) + 80) + '%',
      icon: TrendingUp,
      color: 'indigo'
    };

    if (isOperational) {
      kpi1 = { title: 'Avance de mi CPT', value: (Math.floor(Math.random() * 20) + 80) + '%', icon: TrendingUp, color: 'blue' };
      kpi2 = { title: 'Reportes Pendientes', value: Math.floor(Math.random() * 5).toString(), icon: Activity, color: 'rose' };
      kpi3 = { title: 'Pacientes Hoy', value: (Math.floor(Math.random() * 50) + 15).toString(), icon: Users, color: 'emerald' };
      kpi4 = { title: 'Días Consecutivos', value: Math.floor(Math.random() * 30).toString(), icon: FileSpreadsheet, color: 'indigo' };
    } else if (isLocal) {
      kpi1 = { title: `Avance ASIC ${user.asicAccess?.split(' ')[0] || ''}`, value: (Math.floor(Math.random() * 30) + 70) + '%', icon: TrendingUp, color: 'blue' };
      kpi2 = { title: 'CPTs con Retraso', value: (Math.floor(Math.random() * 10) + 1).toString(), icon: Activity, color: 'rose' };
      kpi3 = { title: 'Total Atendidos', value: (Math.floor(Math.random() * 500) + 200).toLocaleString(), icon: Users, color: 'emerald' };
      kpi4 = { title: 'Tasa de Cobertura', value: (Math.floor(Math.random() * 15) + 85) + '%', icon: FileSpreadsheet, color: 'indigo' };
    } else if (isTactical) {
      kpi1 = { title: `Cobertura ${user.department}`, value: (Math.floor(Math.random() * 40) + 60) + '%', icon: TrendingUp, color: 'blue' };
      kpi2 = { title: 'ASICs con Alertas', value: Math.floor(Math.random() * 5).toString(), icon: Activity, color: 'rose' };
      kpi3 = { title: 'Casos Reportados', value: (Math.floor(Math.random() * 1000) + 500).toLocaleString(), icon: Users, color: 'emerald' };
      kpi4 = { title: 'Calidad de Datos', value: (Math.floor(Math.random() * 10) + 90) + '%', icon: FileSpreadsheet, color: 'indigo' };
    }

    return [kpi1, kpi2, kpi3, kpi4];
  }, [user]);

  return (
    <div className="space-y-6 mb-6">
      {/* Tarjetas KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          
          const colorClasses: Record<string, { bg: string, text: string }> = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
            rose: { bg: 'bg-rose-50', text: 'text-rose-600' },
            emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
            indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
          };
          
          const colors = colorClasses[kpi.color] || colorClasses.blue;

          return (
            <div key={index} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 truncate max-w-[150px]">{kpi.title}</p>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">{kpi.value}</h2>
              </div>
              <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center ${colors.text}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfico de Tendencias */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-80">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-tight flex items-center gap-2">
          <Activity size={16} className="text-blue-600" />
          Tendencia de Morbilidad y Atención (Últimos 7 días)
        </h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{fontSize: 11, fill: '#64748b'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize: 11, fill: '#64748b'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="Pacientes Atendidos" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorPatients)" />
              <Area type="monotone" dataKey="Casos Reportados" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorCases)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
