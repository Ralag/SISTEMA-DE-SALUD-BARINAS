import React from 'react';
import { X, Monitor, Moon, Sun, Type, Palette, MonitorSmartphone, Settings, ArrowLeft } from 'lucide-react';
import { useAppContext, UIScale, ThemeMode, ThemeColor } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function SettingsModule() {
  const { 
    uiScale, setUiScale,
    themeMode, setThemeMode,
    themeColor, setThemeColor
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-3 text-slate-800 dark:text-slate-100">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
            <Settings size={20} className="text-slate-600 dark:text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight">Configuración del Sistema</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mt-0.5">Preferencias Globales y Personalización</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors font-bold text-xs"
        >
          <ArrowLeft size={16} /> Volver
        </button>
      </div>

      <div className="p-6 overflow-y-auto flex-1 space-y-8 bg-slate-50 dark:bg-slate-800/30 dark:bg-slate-900/50">
              
              {/* Tema / Appearance */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight flex items-center gap-2 mb-4">
                  <MonitorSmartphone size={16} className="text-blue-500"/>
                  Apariencia
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => setThemeMode('light')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${themeMode === 'light' ? 'border-blue-500 bg-blue-50/50 text-blue-700' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    <Sun size={24} />
                    <span className="font-bold text-sm">Modo Claro</span>
                  </button>
                  <button 
                    onClick={() => setThemeMode('dark')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${themeMode === 'dark' ? 'border-blue-500 bg-blue-50/50 text-blue-700' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    <Moon size={24} />
                    <span className="font-bold text-sm">Modo Oscuro</span>
                  </button>
                  <button 
                    onClick={() => setThemeMode('system')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${themeMode === 'system' ? 'border-blue-500 bg-blue-50/50 text-blue-700' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    <Monitor size={24} />
                    <span className="font-bold text-sm">Sistema</span>
                  </button>
                </div>
              </div>

              {/* Tamaño / Scale */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight flex items-center gap-2 mb-4">
                  <Type size={16} className="text-indigo-500"/>
                  Tamaño de Interfaz
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => setUiScale('compact')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${uiScale === 'compact' ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    <span className="text-xs font-bold">Compacto</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Todo más pequeño</span>
                  </button>
                  <button 
                    onClick={() => setUiScale('normal')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${uiScale === 'normal' ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    <span className="text-sm font-bold">Normal</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Por defecto</span>
                  </button>
                  <button 
                    onClick={() => setUiScale('large')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${uiScale === 'large' ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    <span className="text-base font-bold">Grande</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Mayor legibilidad</span>
                  </button>
                </div>
              </div>

              {/* Color Principal */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight flex items-center gap-2 mb-4">
                  <Palette size={16} className="text-emerald-500"/>
                  Acento Principal
                </h3>
                <div className="flex flex-wrap gap-4">
                  {(['blue', 'emerald', 'indigo', 'rose'] as ThemeColor[]).map(color => (
                    <button 
                      key={color}
                      onClick={() => setThemeColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center
                        ${themeColor === color ? 'border-slate-800 dark:border-white' : 'border-transparent'}
                        ${color === 'blue' ? 'bg-[#1c557a]' : ''}
                        ${color === 'emerald' ? 'bg-emerald-600' : ''}
                        ${color === 'indigo' ? 'bg-indigo-600' : ''}
                        ${color === 'rose' ? 'bg-rose-600' : ''}
                      `}
                    >
                      {themeColor === color && <div className="w-2 h-2 rounded-full bg-white dark:bg-slate-800" />}
                    </button>
                  ))}
                </div>
              </div>
              
            </div>
            
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors text-sm"
              >
                Guardar y Cerrar
              </button>
            </div>
    </div>
  );
}
