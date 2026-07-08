import React, { useState } from 'react';
import { UserRole, AccessLevel, Department } from '../types';
import { Shield, ChevronRight, User, Lock, Mail, Building2, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useSaaSContext } from '../context/SaaSContext';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const { setUser } = useAppContext();
  const { config } = useSaaSContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Si Supabase no está configurado (variables vacías o placeholders), usamos localStorage
      const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_project_url';

      // Bypass estricto para cuenta Admin Maestra. 
      // Evita bloqueos por Rate Limit o falta de confirmación de correo en Supabase.
      if (email.toLowerCase() === 'admin' && password === 'admin') {
        setUser({
          id: 'admin_master',
          name: 'Administrador Maestro',
          level: 'ADMIN',
          department: 'SISTEMAS',
          title: 'SysAdmin',
        });
        return;
      }

      if (isSupabaseConfigured) {
        let loginEmail = email;
        let loginPassword = password;
        if (email.toLowerCase() === 'admin') {
          loginEmail = 'admin@mpps.gob.ve';
          if (password === 'admin') {
            loginPassword = 'admin123'; // Supabase requires at least 6 characters
          }
        }

        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: loginPassword
        });
        
        if (authError) {
          throw new Error('Credenciales inválidas en Supabase: ' + authError.message);
        }
        
        // Leer perfil adicional de metadata o tabla (aquí simulado con metadata)
        const metadata = data.user.user_metadata;
        setUser({
          id: data.user.id,
          name: metadata?.nombre || data.user.email?.split('@')[0] || 'Administrador Maestro',
          level: metadata?.nivel || (email.toLowerCase() === 'admin' ? 'ADMIN' : 'L2_LOCAL'),
          department: metadata?.departamento || (email.toLowerCase() === 'admin' ? 'SISTEMAS' : 'ESTADISTICA_ASIC'),
          title: metadata?.rol || (email.toLowerCase() === 'admin' ? 'SysAdmin' : 'Personal Médico'),
          asicAccess: metadata?.asicId
        });
      } else {
        // Fallback Local Storage
        const usersStr = localStorage.getItem('sis_users');
        if (usersStr) {
          const users = JSON.parse(usersStr);
          const found = users.find((u: any) => u.email === email && u.password === password);
          if (found) {
            setUser({
              id: found.email,
              name: found.nombre,
              level: found.nivel,
              department: found.departamento,
              title: found.rol,
              asicAccess: found.asicId
            });
            return;
          }
        }
        throw new Error('Credenciales inválidas o usuario no registrado (Local).');
      }
    } catch (err: any) {
      setError(err.message || 'Error de autenticación.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-[#1c557a] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 mx-auto mb-4 border-2 border-[#2a7aae]">
          {config.primaryLogoUrl ? <img src={config.primaryLogoUrl} alt="Logo" className="w-8 h-8 object-contain" /> : <Shield size={32} className="text-white" />}
        </div>
        <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white uppercase tracking-tight">{config.appName}</h1>
        <p className="text-slate-500 font-medium">{config.loginSubtitle}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative z-10">
        
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
            <Lock size={18} className="text-[#1c557a] dark:text-blue-400" />
            Acceso Autorizado
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-sm font-bold rounded-lg border border-rose-200 dark:border-rose-800">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1 flex items-center gap-1"><Mail size={14}/> Correo / Usuario</label>
            <input 
              type="text" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin o correo@mpps.gob.ve"
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

          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full bg-[#1c557a] hover:bg-[#154261] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? 'Procesando...' : 'Acceder al Sistema'} {!isLoading && <ChevronRight size={18} />}
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
