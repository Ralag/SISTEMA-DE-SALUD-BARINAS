import React from 'react';
import { Layers, ClipboardList, Activity, HeartPulse, ShieldAlert, FileText, Droplet, UserCheck, Syringe, Sparkles, Brain, Eye, TestTube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function DataEntryHub() {
  const { user } = useAppContext();

  // Definition of all possible modules
  const allModules = [
    {
      id: 'epi10',
      title: 'EPI-10 / Morbilidad',
      desc: 'Registro semanal de morbilidad por causas',
      path: '/module/epi10',
      icon: <Layers size={24} className="text-blue-600" />,
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'EPIDEMIOLOGIA'
    },
    {
      id: 'dsp04',
      title: 'DSP-04 / Productividad',
      desc: 'Consolidado mensual de consultas y servicios',
      path: '/module/dsp04',
      icon: <ClipboardList size={24} className="text-indigo-600" />,
      bg: 'bg-indigo-50 dark:bg-indigo-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL']
    },
    {
      id: 'cardiovascular',
      title: 'Salud Cardiovascular',
      desc: 'Seguimiento de hipertensión e infartos',
      path: '/module/dsp04?tab=cardio',
      icon: <HeartPulse size={24} className="text-red-600" />,
      bg: 'bg-red-50 dark:bg-red-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'CARDIOVASCULAR'
    },
    {
      id: 'renal',
      title: 'Salud Renal',
      desc: 'Pacientes renales y diálisis',
      path: '/module/dsp04?tab=renal',
      icon: <Droplet size={24} className="text-cyan-600" />,
      bg: 'bg-cyan-50 dark:bg-cyan-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'RENAL'
    },
    {
      id: 'endocrino',
      title: 'Endocrino-Metabólico',
      desc: 'Seguimiento de diabetes y metabolismo',
      path: '/module/dsp04?tab=endocrino',
      icon: <Activity size={24} className="text-emerald-600" />,
      bg: 'bg-emerald-50 dark:bg-emerald-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'ENDOCRINOMETABOLICO'
    },
    {
      id: 'oncologia',
      title: 'Oncología',
      desc: 'Pacientes oncológicos y tratamientos',
      path: '/module/dsp04?tab=oncologia',
      icon: <Sparkles size={24} className="text-purple-600" />,
      bg: 'bg-purple-50 dark:bg-purple-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'ONCOLOGIA'
    },
    {
      id: 'inmunizacion',
      title: 'Inmunización (EPI)',
      desc: 'Esquema nacional de vacunación',
      path: '/module/dsp04?tab=inmunizacion',
      icon: <Syringe size={24} className="text-teal-600" />,
      bg: 'bg-teal-50 dark:bg-teal-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'INMUNIZACION'
    },
    {
      id: 'tuberculosis',
      title: 'Tuberculosis',
      desc: 'Programa respiratorio y DOTS',
      path: '/module/dsp04?tab=tuberculosis',
      icon: <FileText size={24} className="text-amber-600" />,
      bg: 'bg-amber-50 dark:bg-amber-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'TUBERCULOSIS'
    },
    {
      id: 'vih',
      title: 'ITS/VIH',
      desc: 'Atención ITS y retrovirales',
      path: '/module/dsp04?tab=vih',
      icon: <ShieldAlert size={24} className="text-rose-600" />,
      bg: 'bg-rose-50 dark:bg-rose-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'VIH'
    },
    {
      id: 'salud_mental',
      title: 'Salud Mental',
      desc: 'Consultas psiquiátricas y psicológicas',
      path: '/module/dsp04?tab=mental',
      icon: <Brain size={24} className="text-fuchsia-600" />,
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'SALUD_MENTAL'
    },
    {
      id: 'salud_visual',
      title: 'Salud Visual',
      desc: 'Consultas oftalmológicas',
      path: '/module/dsp04?tab=visual',
      icon: <Eye size={24} className="text-blue-500" />,
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'SALUD_VISUAL'
    },
    {
      id: 'banco_sangre',
      title: 'Banco de Sangre',
      desc: 'Donaciones y transfusiones',
      path: '/module/dsp04?tab=sangre',
      icon: <TestTube size={24} className="text-red-700" />,
      bg: 'bg-red-100 dark:bg-red-900/40',
      allowedRoles: ['ADMIN', 'L0_STRATEGIC', 'L1_CENTRAL', 'L1_TACTICAL', 'L2_LOCAL', 'L3_OPERATIONAL'],
      department: 'BANCO_SANGre'
    }
  ];

  // RBAC Filtering for Data Entry Modules
  const availableModules = allModules.filter(mod => {
    if (user.level === 'ADMIN' || user.level === 'L0_STRATEGIC') return true;
    if (user.level === 'L1_CENTRAL' && (user.department === 'ESTADISTICA' || user.department === 'EPIDEMIOLOGIA')) return true;

    if (!mod.allowedRoles.includes(user.level)) return false;
    
    // Tactical users (Coordinators) only see their specific program plus generic forms if applicable
    if (user.level === 'L1_TACTICAL') {
      if (mod.id === 'dsp04') return true; 
      if (mod.department && mod.department === user.department) return true;
      return false;
    }
    
    // Local / Operational usually see what's allowed via allowedRoles
    // But they only see the specific program form if it's assigned to them, otherwise they just use DSP04/EPI10
    if (user.level === 'L2_LOCAL' || user.level === 'L3_OPERATIONAL') {
      if (mod.id === 'dsp04' || mod.id === 'epi10') return true;
      if (mod.department && mod.department === user.department) return true;
      if (user.department === 'ESTADISTICA_ASIC' || user.department === 'DIRECTOR_ASIC') return true;
      return false;
    }
    
    return true; 
  });

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto w-full h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-black font-display text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-2">Hub de Módulos (Data Entry)</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Seleccione el programa de salud o formulario epidemiológico al que desea ingresar. 
          Los módulos mostrados están filtrados de acuerdo a sus credenciales de acceso institucional ({user.title}).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableModules.map(mod => (
          <Link
            key={mod.id}
            to={mod.path}
            className={`block bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-500 hover:shadow-md transition-all group`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${mod.bg} transition-transform group-hover:scale-110`}>
              {mod.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{mod.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[2rem]">{mod.desc}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                INGRESAR
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            </div>
          </Link>
        ))}
      </div>
      
      {availableModules.length === 0 && (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <ShieldAlert className="mx-auto text-slate-400 mb-3" size={32} />
          <h3 className="text-slate-700 dark:text-slate-200 font-bold">Sin módulos asignados</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Su cuenta actual no tiene acceso a módulos de recolección de datos.</p>
        </div>
      )}
    </div>
  );
}
