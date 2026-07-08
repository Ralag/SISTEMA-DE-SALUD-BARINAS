const fs = require('fs');

let content = fs.readFileSync('src/components/dashboards/AdminConfigDashboard.tsx', 'utf8');

// The problematic block starts near line 160.
// Let's just find the whole global tab and replace it.
const startMarker = "{activeTab === 'global' && (";
const endMarker = "{activeTab === 'modules' && (";
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `{activeTab === 'global' && (
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
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Subtítulo (Pantalla de Login)</label>
                    <input 
                      type="text" 
                      value={localConfig.loginSubtitle} 
                      onChange={(e) => setLocalConfig({...localConfig, loginSubtitle: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MonitorSmartphone size={18} className="text-slate-500" />
                    <h2 className="font-semibold text-slate-700 dark:text-slate-200">Apariencia de Dashboards</h2>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Dashboard a configurar</label>
                    <select
                      value={selectedDashboard}
                      onChange={(e) => setSelectedDashboard(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    >
                      <option value="global">Global / WelcomeHub</option>
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
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Mensaje de Bienvenida</label>
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
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => {
                    handleSaveGlobal();
                    if (selectedDashboard !== 'global') {
                      updateModule(selectedDashboard, {
                        appTitle: localConfig.modules[selectedDashboard]?.appTitle,
                        welcomeMessage: localConfig.modules[selectedDashboard]?.welcomeMessage
                      });
                    }
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                >
                  <Save size={16} />
                  Guardar Configuración
                </button>
              </div>
            </div>
          )}

          `;
          
  content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
  
  // also fix the messed up modules tab which I ruined with my bad replace
  // I replaced all `}` with `)}` everywhere after line 230
  // Actually, wait, it might be easier to just fix the whole file. 
  // Let's write the file out and fix it.
  fs.writeFileSync('src/components/dashboards/AdminConfigDashboard.tsx', content);
}
