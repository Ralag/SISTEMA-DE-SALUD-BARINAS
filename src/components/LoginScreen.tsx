import React, { useState } from 'react';
import { Shield, ChevronRight, Activity, Users, FileSpreadsheet, Building2, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { UserRole, AccessLevel, Department, SYSTEM_ROLES } from '../types';
import { HEALTH_HIERARCHY } from '../data/hierarchy';
import { ALL_DEPARTMENTS, MPPS_PROGRAMS } from '../data/departments';

export default function LoginScreen() {
  const { setUser } = useAppContext();
  const [tab, setTab] = useState<'central' | 'asic' | 'custom'>('central');
  
  // Custom login state
  const [name, setName] = useState('');
  const [level, setLevel] = useState<AccessLevel>('L2_LOCAL');
  const [department, setDepartment] = useState<Department>('DIRECTOR_ASIC');
  const [asicAccess, setAsicAccess] = useState<string>('');
  const [cptAccess, setCptAccess] = useState<string>('');

  // ASIC Tab state
  const [selectedAsicForLogin, setSelectedAsicForLogin] = useState<string | null>(null);

  const selectedAsicObj = HEALTH_HIERARCHY.asics.find(a => a.name === asicAccess);
  const activeAsicObj = HEALTH_HIERARCHY.asics.find(a => a.name === selectedAsicForLogin);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: 'custom_user',
      name: name,
      level,
      department,
      title: 'Usuario Personalizado',
      asicAccess: (level === 'L2_LOCAL' || level === 'L3_OPERATIONAL') ? asicAccess : undefined,
      cptAccess: level === 'L3_OPERATIONAL' ? cptAccess : undefined
    });
  };

  const loginAsAsicRole = (roleType: 'DIRECTOR' | 'ESTADISTICA' | 'CPT', asic: string, cptName?: string) => {
    setUser({
      id: `asic_user_${roleType}_${asic}`,
      name: roleType === 'CPT' ? `Médico ${cptName}` : `${roleType === 'DIRECTOR' ? 'Director' : 'Estadístico'} ${asic}`,
      level: roleType === 'CPT' ? 'L3_OPERATIONAL' : 'L2_LOCAL',
      department: roleType === 'DIRECTOR' ? 'DIRECTOR_ASIC' : (roleType === 'ESTADISTICA' ? 'ESTADISTICA_ASIC' : 'CPT'),
      title: roleType === 'CPT' ? 'Médico CPT' : (roleType === 'DIRECTOR' ? 'Director ASIC' : 'Estadístico Local'),
      asicAccess: asic,
      cptAccess: cptName
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 max-w-5xl w-full rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row h-[80vh]">
        
        <div className="bg-blue-900 md:w-1/3 p-8 flex flex-col items-center justify-center text-center text-white flex-shrink-0">
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center font-bold shadow-lg text-white mb-6">
            <Activity size={40} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight uppercase mb-2">DHIS2 Barinas</h1>
          <p className="text-blue-200 text-sm mb-8">Sistema Integrado de Información en Salud Pública y Epidemiología del Estado Barinas</p>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-blue-800/50 p-4 rounded-xl border border-blue-700/50">
              <Users size={24} className="mx-auto mb-2 text-blue-300" />
              <span className="text-xs font-bold uppercase tracking-wider block">17 ASICs</span>
            </div>
            <div className="bg-blue-800/50 p-4 rounded-xl border border-blue-700/50">
              <FileSpreadsheet size={24} className="mx-auto mb-2 text-blue-300" />
              <span className="text-xs font-bold uppercase tracking-wider block">Programas</span>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-8 flex flex-col h-full overflow-hidden">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-6 flex-shrink-0">Acceso al Sistema </h2>
          
          <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6 flex-shrink-0 overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setTab('central')}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${tab === 'central' ? 'border-[#1c557a] text-[#1c557a]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              Niveles Centrales
            </button>
            <button 
              onClick={() => setTab('asic')}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${tab === 'asic' ? 'border-[#1c557a] text-[#1c557a]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              Organización por ASIC
            </button>
            <button 
              onClick={() => setTab('custom')}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${tab === 'custom' ? 'border-[#1c557a] text-[#1c557a]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              Personalizado
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {tab === 'central' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                {Object.values(SYSTEM_ROLES).filter(r => r.level === 'L0_STRATEGIC' || r.level === 'L1_CENTRAL' || r.level === 'L1_TACTICAL' || r.level === 'ADMIN').map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setUser(role)}
                    className="text-left border border-slate-200 dark:border-slate-700 p-4 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-800 flex-shrink-0">
                      <Shield size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-blue-700 dark:group-hover:text-blue-400">{role.name}</h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">{role.title}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1"><Building2 size={10} /> {role.department} ({role.level})</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {tab === 'asic' && (
              <div className="h-full flex flex-col pb-4">
                {!selectedAsicForLogin ? (
                  <>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Seleccione un Área de Salud Integral Comunitaria (ASIC) para ver los roles locales correspondientes:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {HEALTH_HIERARCHY.asics.map(asic => (
                        <button
                          key={asic.name}
                          onClick={() => setSelectedAsicForLogin(asic.name)}
                          className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                            <MapPin size={14} className="text-emerald-600" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{asic.name}</h4>
                            <p className="text-[10px] text-slate-500 uppercase">{asic.municipality} • {asic.units.length} CPTs</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button 
                      onClick={() => setSelectedAsicForLogin(null)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4 uppercase tracking-widest"
                    >
                      ← Volver a lista de ASICs
                    </button>
                    
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                      ASIC: {activeAsicObj?.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dirección Local (L2)</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            onClick={() => loginAsAsicRole('DIRECTOR', activeAsicObj!.name)}
                            className="text-left border border-slate-200 dark:border-slate-700 p-4 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                          >
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-emerald-700">Director ASIC</h3>
                            <p className="text-xs text-slate-500 mt-1">Nivel Local - Gestión Completa</p>
                          </button>
                          <button
                            onClick={() => loginAsAsicRole('ESTADISTICA', activeAsicObj!.name)}
                            className="text-left border border-slate-200 dark:border-slate-700 p-4 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                          >
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-blue-700">Estadístico ASIC</h3>
                            <p className="text-xs text-slate-500 mt-1">Nivel Local - Carga y Consolidación</p>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Consultorios Populares (L3) - Muestra</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {activeAsicObj?.units.slice(0, 3).map((cpt, idx) => (
                            <button
                              key={idx}
                              onClick={() => loginAsAsicRole('CPT', activeAsicObj.name, cpt.name)}
                              className="text-left border border-slate-200 dark:border-slate-700 p-3 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-between"
                            >
                              <div>
                                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm">{cpt.name}</h3>
                                <p className="text-[10px] text-slate-500 uppercase">{cpt.parroquia}</p>
                              </div>
                              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">Médico</span>
                            </button>
                          ))}
                          {activeAsicObj && activeAsicObj.units.length > 3 && (
                            <div className="text-center p-2 text-xs text-slate-400 font-bold uppercase">
                              ... y {activeAsicObj.units.length - 3} consultorios más
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'custom' && (
              <form onSubmit={handleCustomLogin} className="space-y-4 pb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required
                    placeholder="Ej: Dra. María Pérez" 
                    className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">Nivel de Acceso</label>
                    <select 
                      value={level} 
                      onChange={e => setLevel(e.target.value as AccessLevel)} 
                      className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
                    >
                      <option value="L0_STRATEGIC">L0 - Estratégico (Autoridad Única)</option>
                      <option value="L1_CENTRAL">L1 - Central (Directores MPPS)</option>
                      <option value="L1_TACTICAL">L1 - Táctico (Coord. Programas)</option>
                      <option value="L2_LOCAL">L2 - Local (ASIC)</option>
                      <option value="L3_OPERATIONAL">L3 - Operativo (CPT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">Departamento / Programa</label>
                    <select 
                      value={department} 
                      onChange={e => setDepartment(e.target.value as Department)} 
                      className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
                    >
                      {ALL_DEPARTMENTS.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {(level === 'L2_LOCAL' || level === 'L3_OPERATIONAL') && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">ASIC Asignado</label>
                    <select 
                      value={asicAccess} 
                      onChange={e => {
                        setAsicAccess(e.target.value);
                        setCptAccess('');
                      }} 
                      className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
                      required
                    >
                      <option value="">Seleccione ASIC...</option>
                      {HEALTH_HIERARCHY.asics.map(a => (
                        <option key={a.name} value={a.name}>{a.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {level === 'L3_OPERATIONAL' && asicAccess && selectedAsicObj && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">CPT Asignado</label>
                    <select 
                      value={cptAccess} 
                      onChange={e => setCptAccess(e.target.value)} 
                      className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
                      required
                    >
                      <option value="">Seleccione CPT...</option>
                      {selectedAsicObj.units.map(u => (
                        <option key={u.id} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="pt-4">
                  <button type="submit" className="w-full bg-[#1c557a] hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                    Ingresar al Sistema <ChevronRight size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
