import React, { useState } from 'react';
import { useSaaSContext } from '../../context/SaaSContext';
import { Settings, Save, AlertCircle, Type, Globe, MonitorSmartphone, Activity, Package, Users, ShieldCheck, Layers, Target, ExternalLink } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

type Tab = 'global' | 'modules' | 'epidemiology' | 'logistics' | 'hr' | 'sacs' | 'networks' | 'programs';

export default function AdminConfigDashboard() {
  const { config, updateConfig, updateModule, resetConfig } = useSaaSContext();
  const { addToast, user } = useAppContext();
  const [localConfig, setLocalConfig] = useState(config);
  const [activeTab, setActiveTab] = useState<Tab>('global');

  if (!user || (user.level !== 'ADMIN' && user.level !== 'MODERATOR')) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <AlertCircle size={48} className="mb-4 text-rose-500" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Acceso Denegado</h2>
        <p>Solo los administradores y moderadores pueden acceder a esta área.</p>
      </div>
    );
  }
  
  const handleSaveGlobal = () => {
    updateConfig({
      appName: localConfig.appName,
      appTitle: localConfig.appTitle,
      welcomeMessage: localConfig.welcomeMessage,
      loginSubtitle: localConfig.loginSubtitle,
      parameters: localConfig.parameters,
    });
    addToast('Configuración global y parámetros guardados correctamente', 'success');
  };

  const handleSaveModule = (moduleId: string) => {
    updateModule(moduleId, {
      name: localConfig.modules[moduleId].name,
      description: localConfig.modules[moduleId].description,
      active: localConfig.modules[moduleId].active,
    });
    addToast(`Módulo "${localConfig.modules[moduleId].name}" actualizado`, 'success');
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode; path?: string }[] = [
    { id: 'global', label: 'Global', icon: <Globe size={18} />, path: '/' },
    { id: 'modules', label: 'Módulos', icon: <Type size={18} /> },
    { id: 'epidemiology', label: 'Epidemiología', icon: <Activity size={18} />, path: '/epidemiology' },
    { id: 'logistics', label: 'SEFAR', icon: <Package size={18} />, path: '/logistics' },
    { id: 'hr', label: 'RRHH', icon: <Users size={18} />, path: '/hr' },
    { id: 'sacs', label: 'SACS', icon: <ShieldCheck size={18} />, path: '/sacs' },
    { id: 'networks', label: 'Redes', icon: <Layers size={18} />, path: '/networks' },
    { id: 'programs', label: 'Programas', icon: <Target size={18} />, path: '/programs' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
            <MonitorSmartphone size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Panel de Control SaaS</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl">
          Área exclusiva para el departamento de Informática (Moderadores) y Administradores del Sistema.
          Desde aquí puede modificar todos los textos, descripciones y parámetros operativos específicos de cada departamento.
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Mobile Tabs */}
        <div className="md:hidden overflow-x-auto flex border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id ? 'border-indigo-500 text-indigo-700 dark:text-indigo-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Desktop Sidebar Tabs */}
        <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto hidden md:block flex-shrink-0">
          <div className="p-4 space-y-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'global' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-slate-500" />
                    <h2 className="font-semibold text-slate-700 dark:text-slate-200">Configuración Global</h2>
                  </div>
                  <Link to="/" className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                    <ExternalLink size={14} /> Panel Central
                  </Link>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Nombre de la Aplicación</label>
                    <input 
                      type="text" 
                      value={localConfig.appName} 
                      onChange={(e) => setLocalConfig({...localConfig, appName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Título de la Interfaz</label>
                    <input 
                      type="text" 
                      value={localConfig.appTitle} 
                      onChange={(e) => setLocalConfig({...localConfig, appTitle: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Mensaje de Bienvenida (TopNav)</label>
                    <input 
                      type="text" 
                      value={localConfig.welcomeMessage} 
                      onChange={(e) => setLocalConfig({...localConfig, welcomeMessage: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Subtítulo (Pantalla de Login)</label>
                    <input 
                      type="text" 
                      value={localConfig.loginSubtitle} 
                      onChange={(e) => setLocalConfig({...localConfig, loginSubtitle: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <label className="flex items-center justify-between cursor-pointer mb-2">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Modo Mantenimiento</span>
                      <input 
                        type="checkbox" 
                        checked={localConfig.parameters.maintenanceMode}
                        onChange={(e) => setLocalConfig({...localConfig, parameters: {...localConfig.parameters, maintenanceMode: e.target.checked}})}
                        className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                      />
                    </label>
                    <p className="text-[10px] text-slate-500">Muestra una alerta en todo el sistema.</p>
                  </div>
                  
                  <button 
                    onClick={handleSaveGlobal}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors mt-4"
                  >
                    <Save size={16} />
                    Guardar Global
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(localConfig.modules).map((key) => {
                const mod = localConfig.modules[key];
                return (
                  <div key={key} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border ${mod.active ? 'border-slate-200 dark:border-slate-700' : 'border-rose-200 dark:border-rose-900/50 opacity-70'} overflow-hidden transition-opacity`}>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID: {key}</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={mod.active}
                            onChange={(e) => {
                              setLocalConfig({
                                ...localConfig,
                                modules: {
                                  ...localConfig.modules,
                                  [key]: { ...mod, active: e.target.checked }
                                }
                              });
                            }}
                            className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                          />
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Habilitado</span>
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Nombre Público del Módulo</label>
                        <input 
                          type="text" 
                          value={mod.name}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            modules: { ...localConfig.modules, [key]: { ...mod, name: e.target.value } }
                          })}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Descripción del Módulo (Dashboard y Sidebar)</label>
                        <textarea 
                          value={mod.description}
                          onChange={(e) => setLocalConfig({
                            ...localConfig,
                            modules: { ...localConfig.modules, [key]: { ...mod, description: e.target.value } }
                          })}
                          rows={2}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                        />
                      </div>
                      
                      <button 
                        onClick={() => handleSaveModule(key)}
                        className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                      >
                        <Save size={14} />
                        Aplicar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'epidemiology' && (
            <div className="max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Parámetros - Epidemiología</h2>
                  <Link to="/epidemiology" className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                    <ExternalLink size={14} /> Vista Previa
                  </Link>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Umbral de Alerta Epidemiológica (%)
                  </label>
                  <input 
                    type="number" 
                    value={localConfig.parameters.epiAlertThreshold}
                    onChange={(e) => setLocalConfig({...localConfig, parameters: {...localConfig.parameters, epiAlertThreshold: Number(e.target.value)}})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                  <p className="text-xs text-slate-500 mt-1">Porcentaje de saturación para disparar el evento de brote (Canal Endémico).</p>
                </div>
                <div>
                  <label className="flex items-center justify-between cursor-pointer mb-2 mt-4">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Requerir Ubicación GPS para Carga de EPI-10/12</span>
                    <input 
                      type="checkbox" 
                      checked={localConfig.parameters.requireLocationForDataEntry}
                      onChange={(e) => setLocalConfig({...localConfig, parameters: {...localConfig.parameters, requireLocationForDataEntry: e.target.checked}})}
                      className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                    />
                  </label>
                </div>
                <button 
                  onClick={handleSaveGlobal}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'logistics' && (
            <div className="max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Parámetros - SEFAR</h2>
                  <Link to="/logistics" className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                    <ExternalLink size={14} /> Vista Previa
                  </Link>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Umbral de Stock Crítico (%)
                  </label>
                  <input 
                    type="number" 
                    value={localConfig.parameters.sefarLowStockThreshold}
                    onChange={(e) => setLocalConfig({...localConfig, parameters: {...localConfig.parameters, sefarLowStockThreshold: Number(e.target.value)}})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                  <p className="text-xs text-slate-500 mt-1">Nivel al que se considera que un insumo o medicina está escaso.</p>
                </div>
                <button 
                  onClick={handleSaveGlobal}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'hr' && (
            <div className="max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Parámetros - Recursos Humanos</h2>
                  <Link to="/hr" className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                    <ExternalLink size={14} /> Vista Previa
                  </Link>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Umbral de Ausentismo Permitido (%)
                  </label>
                  <input 
                    type="number" 
                    value={localConfig.parameters.hrAbsenceThreshold}
                    onChange={(e) => setLocalConfig({...localConfig, parameters: {...localConfig.parameters, hrAbsenceThreshold: Number(e.target.value)}})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <button 
                  onClick={handleSaveGlobal}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'sacs' && (
            <div className="max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Parámetros - Contraloría (SACS)</h2>
                  <Link to="/sacs" className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                    <ExternalLink size={14} /> Vista Previa
                  </Link>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Multa Base por Infracción (USD equivalentes)
                  </label>
                  <input 
                    type="number" 
                    value={localConfig.parameters.sacsPenaltyAmount}
                    onChange={(e) => setLocalConfig({...localConfig, parameters: {...localConfig.parameters, sacsPenaltyAmount: Number(e.target.value)}})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <button 
                  onClick={handleSaveGlobal}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'networks' && (
            <div className="max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Parámetros - Redes de Atención</h2>
                  <Link to="/networks" className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                    <ExternalLink size={14} /> Vista Previa
                  </Link>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Meta de Uptime de CPTs (%)
                  </label>
                  <input 
                    type="number" 
                    value={localConfig.parameters.networkUptimeGoal}
                    onChange={(e) => setLocalConfig({...localConfig, parameters: {...localConfig.parameters, networkUptimeGoal: Number(e.target.value)}})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <button 
                  onClick={handleSaveGlobal}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Parámetros - Programas de Salud</h2>
                  <Link to="/programs" className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                    <ExternalLink size={14} /> Vista Previa
                  </Link>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Umbral de Cumplimiento Trimestral (%)
                  </label>
                  <input 
                    type="number" 
                    value={localConfig.parameters.programsGoalThreshold}
                    onChange={(e) => setLocalConfig({...localConfig, parameters: {...localConfig.parameters, programsGoalThreshold: Number(e.target.value)}})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <button 
                  onClick={handleSaveGlobal}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Guardar Cambios
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
