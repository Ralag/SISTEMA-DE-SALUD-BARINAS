import React, { useState } from 'react';
import { Search, UserPlus, Filter, ShieldAlert, Key, UserX, Clock, MapPin, MoreVertical, Shield } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';

// Mock Data
const MOCK_USERS = [
  { id: 'usr_001', name: 'Dra. María González', email: 'mgonzalez@mpps.gob.ve', role: 'MEDICO_JEFE', asic: 'Corazón de Jesús', lastLogin: 'Hace 2 mins', status: 'active' },
  { id: 'usr_002', name: 'Dr. Carlos Mendoza', email: 'cmendoza@mpps.gob.ve', role: 'ESTADISTICA_ASIC', asic: 'Guanapa', lastLogin: 'Hace 3 horas', status: 'active' },
  { id: 'usr_003', name: 'Lcda. Ana Silva', email: 'asilva@mpps.gob.ve', role: 'ENFERMERA_SUPERVISORA', asic: 'Obispos', lastLogin: 'Hace 2 días', status: 'suspended' },
  { id: 'usr_004', name: 'Ing. Roberto Paz', email: 'rpaz@mpps.gob.ve', role: 'ADMIN', asic: 'Sede Regional', lastLogin: 'Actualmente activo', status: 'active' },
];

export default function IdentityTab() {
  const { addToast } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleKillSwitch = (userId: string, name: string) => {
    addToast(`Credenciales revocadas para ${name}. Sesión terminada.`, 'success');
  };

  const handleResetPassword = (name: string) => {
    addToast(`Contraseña temporal generada para ${name}. Deberá cambiarla al ingresar.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Gestión de Identidad y Acceso (RBAC)</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Control absoluto sobre los permisos, sesiones y credenciales de la red de salud.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <UserPlus size={16} />
          Nuevo Usuario
        </button>
      </div>

      {/* Control Panel Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group cursor-pointer hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Invalidación Global</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Forzar cierre de todas las sesiones</p>
          </div>
          <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg group-hover:scale-110 transition-transform">
            <UserX size={20} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group cursor-pointer hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Rotación de Claves</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Exigir cambio de clave general</p>
          </div>
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
            <Key size={20} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Auditoría de Inicios</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ver IPs y dispositivos anómalos</p>
          </div>
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
            <ShieldAlert size={20} />
          </div>
        </div>
      </div>

      {/* User Directory */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por cédula, nombre o correo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter size={16} />
            Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol / Nivel</th>
                <th className="px-6 py-4">Asignación (OrgUnit)</th>
                <th className="px-6 py-4">Última Sesión</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          {user.name}
                          {user.status === 'suspended' && (
                            <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Suspendido</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      <Shield size={12} className={user.role === 'ADMIN' ? 'text-rose-500' : 'text-slate-400'} />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <MapPin size={14} className="text-emerald-500" />
                      {user.asic}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={14} />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleResetPassword(user.name)}
                        className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors"
                        title="Forzar Cambio de Clave"
                      >
                        <Key size={16} />
                      </button>
                      <button 
                        onClick={() => handleKillSwitch(user.id, user.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-colors"
                        title="Kill Switch (Suspender)"
                      >
                        <UserX size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
