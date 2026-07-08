import React, { useState } from 'react';
import { Globe, MonitorSmartphone, Save } from 'lucide-react';
import { useSaaSContext } from '../../../context/SaaSContext';
import { useAppContext } from '../../../context/AppContext';

export default function SettingsTab() {
  const { config, updateConfig, updateModule } = useSaaSContext();
  const { addToast } = useAppContext();
  
  const [localConfig, setLocalConfig] = useState(config);
  const [selectedDashboard, setSelectedDashboard] = useState<string>('global');

  const handleSaveGlobal = () => {
    updateConfig({
      appName: localConfig.appName,
      appTitle: localConfig.appTitle,
      welcomeMessage: localConfig.welcomeMessage,
      loginSubtitle: localConfig.loginSubtitle,
    });
    
    if (selectedDashboard !== 'global') {
      updateModule(selectedDashboard, {
        appTitle: localConfig.modules[selectedDashboard]?.appTitle,
        welcomeMessage: localConfig.modules[selectedDashboard]?.welcomeMessage
      });
    }

    addToast('Configuración global guardada correctamente', 'success');
  };

  const handleToggleModule = (moduleId: string, active: boolean) => {
    const mod = localConfig.modules[moduleId];
    setLocalConfig({
      ...localConfig,
      modules: {
        ...localConfig.modules,
        [moduleId]: { ...mod, active }
      }
    });
  };

  const handleApplyModuleChanges = (moduleId: string) => {
    updateModule(moduleId, {
      name: localConfig.modules[moduleId].name,
      description: localConfig.modules[moduleId].description,
      active: localConfig.modules[moduleId].active,
    });
    addToast(`Módulo "${localConfig.modules[moduleId].name}" actualizado`, 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Configuración del Ecosistema</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Administración de metadatos globales y personalización de la plataforma.</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Identidad y Textos Base */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Globe size={18} className="text-slate-500" />
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Variables Base</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Nombre Corto de la Aplicación (Menú lateral)</label>
              <input 
                type="text" 
                value={localConfig.appName} 
                onChange={(e) => setLocalConfig({...localConfig, appName: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Subtítulo (Pantalla de Login Segura)</label>
              <input 
                type="text" 
                value={localConfig.loginSubtitle} 
                onChange={(e) => setLocalConfig({...localConfig, loginSubtitle: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>
        </div>
        
        {/* Modificación de títulos por módulo */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <MonitorSmartphone size={18} className="text-slate-500" />
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Apariencia de Dashboards Específicos</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Seleccionar Entorno a Configurar</label>
              <select
                value={selectedDashboard}
                onChange={(e) => setSelectedDashboard(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="global">Centro de Comando (WelcomeHub)</option>
                {Object.keys(localConfig.modules).map(key => (
                  <option key={key} value={key}>{localConfig.modules[key].name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Título de la Interfaz</label>
              <input 
                type="text" 
                value={selectedDashboard === 'global' ? localConfig.appTitle : (localConfig.modules[selectedDashboard]?.appTitle || '')} 
                onChange={(e) => {
                  if (selectedDashboard === 'global') {
                    setLocalConfig({...localConfig, appTitle: e.target.value});
                  } else {
                    setLocalConfig({
                      ...localConfig,
                      modules: {
                        ...localConfig.modules,
                        [selectedDashboard]: {
                          ...localConfig.modules[selectedDashboard],
                          appTitle: e.target.value
                        }
                      }
                    });
                  }
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder={selectedDashboard !== 'global' ? localConfig.appTitle : undefined}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Mensaje o Subtítulo de Bienvenida</label>
              <input 
                type="text" 
                value={selectedDashboard === 'global' ? localConfig.welcomeMessage : (localConfig.modules[selectedDashboard]?.welcomeMessage || '')} 
                onChange={(e) => {
                  if (selectedDashboard === 'global') {
                    setLocalConfig({...localConfig, welcomeMessage: e.target.value});
                  } else {
                    setLocalConfig({
                      ...localConfig,
                      modules: {
                        ...localConfig.modules,
                        [selectedDashboard]: {
                          ...localConfig.modules[selectedDashboard],
                          welcomeMessage: e.target.value
                        }
                      }
                    });
                  }
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder={selectedDashboard !== 'global' ? localConfig.welcomeMessage : undefined}
              />
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <button 
              onClick={handleSaveGlobal}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              <Save size={16} />
              Aplicar Cambios Globales
            </button>
          </div>
        </div>

        {/* Habilitación de Módulos */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 mt-8">Habilitación de Módulos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(localConfig.modules).map((key) => {
              const mod = localConfig.modules[key];
              return (
                <div key={key} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border ${mod.active ? 'border-slate-200 dark:border-slate-700' : 'border-rose-200 dark:border-rose-900/50 opacity-70'} overflow-hidden transition-all duration-300`}>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID: {key}</span>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={mod.active}
                          onChange={(e) => handleToggleModule(key, e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                        />
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                          {mod.active ? 'Activado' : 'Desactivado'}
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Nombre en Sidebar</label>
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
                      <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Descripción Breve</label>
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
                      onClick={() => handleApplyModuleChanges(key)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 text-xs font-semibold transition-colors"
                    >
                      <Save size={14} />
                      Guardar Módulo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
