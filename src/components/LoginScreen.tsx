import React, { useState } from 'react';
import { UserRole, AccessLevel, Department } from '../types';
import { Shield, ChevronRight, User, Lock, Mail, Building2, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ASICS = ['Guanapa', 'Obispos', 'Corazón de Jesús', 'Ramón Ignacio Méndez'];

const NIVEL1_DEPARTMENTS = [
  { id: 'DES', name: 'Autoridad Única de Salud / Despacho', group: 'B' },
  { id: 'ESTADISTICA', name: 'CEIS - Estadística e Información en Salud', group: 'A' },
  { id: 'EPIDEMIOLOGIA', name: 'Epidemiología Regional', group: 'A' },
  { id: 'INMUNIZACION', name: 'Coordinación Regional de Inmunización (PAI)', group: 'A' },
];

const NIVEL2_ROLES = [
  { id: 'COORD_ASIC', name: 'Director (Coordinador) del ASIC', depto: 'DIRECTOR_ASIC' },
  { id: 'ESTADISTICO_ASIC', name: 'Estadístico del ASIC', depto: 'ESTADISTICA_ASIC' },
];

export default function LoginScreen() {
  const { setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nivel, setNivel] = useState<string>('');
  const [departamento, setDepartamento] = useState('');
  const [asicId, setAsicId] = useState('');
  const [rolAsic, setRolAsic] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Logic for Login
      const usersStr = localStorage.getItem('sis_users');
      if (usersStr) {
        const users = JSON.parse(usersStr);
        const found = users.find((u: any) => u.email === email && u.password === password);
        if (found) {
          const userRole: UserRole = {
            id: found.email,
            name: found.nombre,
            level: found.nivel,
            department: found.departamento,
            title: found.rol,
            asicAccess: found.asicId
          };
          setUser(userRole);
          return;
        }
      }
      setError('Credenciales inválidas o usuario no registrado.');
    } else {
      // Logic for Registration
      if (!nivel) { setError('Debe seleccionar un nivel.'); return; }
      if (nivel === 'L1_CENTRAL' && !departamento) { setError('Debe seleccionar un departamento.'); return; }
      if (nivel === 'L2_LOCAL' && (!asicId || !rolAsic)) { setError('Debe seleccionar ASIC y Rol.'); return; }

      let deptoFinal = 'SISTEMAS';
      let rolFinal = 'Administrador de Sistema';
      
      if (nivel === 'L1_CENTRAL') {
        const d = NIVEL1_DEPARTMENTS.find(x => x.id === departamento);
        deptoFinal = d ? d.id : 'DES';
        rolFinal = d ? d.name : 'Director';
      } else if (nivel === 'L2_LOCAL') {
        const r = NIVEL2_ROLES.find(x => x.id === rolAsic);
        deptoFinal = r ? r.depto : 'DIRECCION_ASIC';
        rolFinal = r ? r.name : 'Coordinador';
      }

      const newUser = {
        email,
        password,
        nombre: name,
        nivel: nivel,
        departamento: deptoFinal,
        rol: rolFinal,
        asicId: nivel === 'L2_LOCAL' ? asicId : undefined
      };

      const usersStr = localStorage.getItem('sis_users') || '[]';
      const users = JSON.parse(usersStr);
      
      if (users.find((u: any) => u.email === email)) {
        setError('El correo ya está registrado.');
        return;
      }

      users.push(newUser);
      localStorage.setItem('sis_users', JSON.stringify(users));

      // Auto-login
      const userRole: UserRole = {
        id: newUser.email,
        name: newUser.nombre,
        level: newUser.nivel as AccessLevel,
        department: newUser.departamento,
        title: newUser.rol,
        asicAccess: newUser.asicId
      };
      setUser(userRole);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-[#1c557a] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 mx-auto mb-4 border-2 border-[#2a7aae]">
          <Shield size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white uppercase tracking-tight">SIS Barinas</h1>
        <p className="text-slate-500 font-medium">Plataforma Gerencial de Salud Pública</p>
      </div>

      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative z-10">
        
        {/* Toggle Login/Register */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button 
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${isLogin ? 'text-[#1c557a] dark:text-blue-400 border-b-2 border-[#1c557a] dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            Iniciar Sesión
          </button>
          <button 
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${!isLogin ? 'text-[#1c557a] dark:text-blue-400 border-b-2 border-[#1c557a] dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/10' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            Crear Cuenta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-sm font-bold rounded-lg border border-rose-200 dark:border-rose-800">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1 flex items-center gap-1"><User size={14}/> Nombre Completo</label>
              <input 
                type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Ej. Dr. Carlos Mendoza"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1 flex items-center gap-1"><Mail size={14}/> Correo Institucional</label>
            <input 
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="correo@mpps.gob.ve"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1 flex items-center gap-1"><Lock size={14}/> Contraseña</label>
            <input 
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {!isLogin && (
            <>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-4">
                <label className="block text-xs font-bold text-[#1c557a] dark:text-blue-400 uppercase mb-2 flex items-center gap-1"><Building2 size={14}/> Nivel Burocrático</label>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setNivel('ADMIN')} className={`p-2 text-xs font-bold rounded-lg border transition-all ${nivel === 'ADMIN' ? 'bg-[#1c557a] text-white border-[#1c557a]' : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 hover:border-blue-500'}`}>Admin</button>
                  <button type="button" onClick={() => setNivel('L1_CENTRAL')} className={`p-2 text-xs font-bold rounded-lg border transition-all ${nivel === 'L1_CENTRAL' ? 'bg-[#1c557a] text-white border-[#1c557a]' : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 hover:border-blue-500'}`}>Nivel 1 (Estadal)</button>
                  <button type="button" onClick={() => setNivel('L2_LOCAL')} className={`p-2 text-xs font-bold rounded-lg border transition-all ${nivel === 'L2_LOCAL' ? 'bg-[#1c557a] text-white border-[#1c557a]' : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 hover:border-blue-500'}`}>Nivel 2 (ASIC)</button>
                </div>
              </div>

              {nivel === 'L1_CENTRAL' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1 mt-3">Departamento Regional</label>
                  <select 
                    value={departamento} onChange={e => setDepartamento(e.target.value)} required
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">-- Seleccione Departamento --</option>
                    <optgroup label="Grupo A - Estratégico/Salud">
                      {NIVEL1_DEPARTMENTS.filter(d => d.group === 'A').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </optgroup>
                    <optgroup label="Grupo B - Operativo/Administrativo">
                      {NIVEL1_DEPARTMENTS.filter(d => d.group === 'B').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </optgroup>
                  </select>
                </div>
              )}

              {nivel === 'L2_LOCAL' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-3 mt-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1 flex items-center gap-1"><MapPin size={14} /> ASIC Asignado</label>
                    <select 
                      value={asicId} onChange={e => setAsicId(e.target.value)} required
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="">-- Seleccione ASIC --</option>
                      {ASICS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">Rol Operativo en ASIC</label>
                    <select 
                      value={rolAsic} onChange={e => setRolAsic(e.target.value)} required
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="">-- Seleccione Rol --</option>
                      {NIVEL2_ROLES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="pt-4">
            <button type="submit" className="w-full bg-[#1c557a] hover:bg-[#154261] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
              {isLogin ? 'Acceder al Sistema' : 'Registrar y Acceder'} <ChevronRight size={18} />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center text-xs text-slate-500 max-w-md px-4">
        <p>Este sistema está clasificado para uso oficial del Ministerio del Poder Popular para la Salud (MPPS). 
        El acceso no autorizado está estrictamente penalizado por la ley.</p>
      </div>
    </div>
  );
}
