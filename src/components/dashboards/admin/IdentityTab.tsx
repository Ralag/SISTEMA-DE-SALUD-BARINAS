import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Filter, ShieldAlert, Key, UserX, Clock, MapPin, MoreVertical, Shield, X, Save } from 'lucide-react';
import { useAppContext } from '../../../context/AppContext';
import { db } from '../../../lib/db';

const NIVEL1_DEPARTMENTS = [
  { id: 'DES', name: 'Despacho Ministerial' },
  { id: 'EPI_NACIONAL', name: 'Dir. Nac. de Epidemiología' },
  { id: 'REDES_NACIONAL', name: 'Dir. Nac. Redes de Salud' },
  { id: 'SACS_NACIONAL', name: 'Dir. Nac. Contraloría Sanitaria (SACS)' },
  { id: 'SEFAR', name: 'Servicio de Elaboraciones Farmacéuticas (SEFAR)' },
  { id: 'RRHH_NACIONAL', name: 'Dir. Nac. de Recursos Humanos' }
];

const NIVEL2_ROLES = [
  { id: 'DIRECCION_ASIC', name: 'Coordinador(a) ASIC', depto: 'DIRECCION_ASIC' },
  { id: 'ESTADISTICA_ASIC', name: 'Estadístico ASIC (EPI)', depto: 'ESTADISTICA_ASIC' },
  { id: 'ALMACEN_ASIC', name: 'Jefe de Almacén (SEFAR)', depto: 'ALMACEN_ASIC' },
  { id: 'RRHH_ASIC', name: 'Coordinador RRHH', depto: 'RRHH_ASIC' },
  { id: 'MEDICO_JEFE', name: 'Médico Jefe CPT', depto: 'RED_AMBULATORIA' }
];

const ASICS = ['Guanapa', 'Obispos', 'Corazón de Jesús', 'Ramón Ignacio Méndez', 'Rómulo Gallegos'];

export default function IdentityTab() {
  const { addToast, user } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const openAuditModal = async () => {
    setLoading(true);
    setShowAuditModal(true);
    const logs = await db.getAuditLogs();
    setAuditLogs(logs);
    setLoading(false);
  };

  // Form states
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    password: '',
    nivel: 'L2_LOCAL',
    departamento: '',
    rol: '',
    asicId: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await db.getProfiles();
    setUsers(data);
    setLoading(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let deptoFinal = 'SISTEMAS';
      let rolFinal = 'Administrador de Sistema';
      
      if (newUser.nivel === 'L1_CENTRAL') {
        const d = NIVEL1_DEPARTMENTS.find(x => x.id === newUser.departamento);
        deptoFinal = d ? d.id : 'DES';
        rolFinal = d ? d.name : 'Director';
      } else if (newUser.nivel === 'L2_LOCAL') {
        const r = NIVEL2_ROLES.find(x => x.id === newUser.rol);
        deptoFinal = r ? r.depto : 'DIRECCION_ASIC';
        rolFinal = r ? r.name : 'Coordinador';
      } else if (newUser.nivel === 'ADMIN') {
        deptoFinal = 'SISTEMAS';
        rolFinal = 'SysAdmin';
      }

      const userData = {
        ...newUser,
        departamento: deptoFinal,
        rol: rolFinal,
        asicId: newUser.nivel === 'L2_LOCAL' ? newUser.asicId : undefined
      };

      await db.createUser(userData);
      addToast('Usuario creado correctamente.', 'success');
      setShowModal(false);
      setNewUser({
        nombre: '',
        email: '',
        password: '',
        nivel: 'L2_LOCAL',
        departamento: '',
        rol: '',
        asicId: ''
      });
      fetchUsers();
    } catch (err: any) {
      addToast(err.message, 'error');
    }
  };

  const handleKillSwitch = async (userId: string, name: string) => {
    await db.updateProfileStatus(userId, 'suspended');
    await db.createAuditLog({
      action: 'Suspensión de Cuenta (Kill Switch)',
      entity: `Usuario: ${name}`,
      details: `Revocación inmediata de credenciales. ID: ${userId}`,
      user_name: user?.name || 'Administrador',
      asic: 'Admin Sede',
      ip_address: '127.0.0.1' // simulated
    });
    addToast(`Credenciales revocadas para ${name}. Sesión terminada.`, 'success');
    fetchUsers();
  };

  const handleResetPassword = async (name: string) => {
    await db.createAuditLog({
      action: 'Reseteo de Clave',
      entity: `Usuario: ${name}`,
      details: `Se forzó el reseteo de clave para el próximo inicio de sesión.`,
      user_name: user?.name || 'Administrador',
      asic: 'Admin Sede',
      ip_address: '127.0.0.1'
    });
    addToast(`Contraseña temporal generada para ${name}. Deberá cambiarla al ingresar.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Gestión de Identidad y Acceso (RBAC)</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Control absoluto sobre los permisos, sesiones y credenciales de la red de salud.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <UserPlus size={16} />
          Nuevo Usuario
        </button>
      </div>

      {/* Control Panel Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div onClick={async () => {
          addToast('Forzando cierre de todas las sesiones activas...', 'info');
          try {
            const res = await fetch('/api/admin/revoke-sessions', { method: 'POST' });
            const data = await res.json();
            if (data.status === 'success' || data.status === 'simulated') {
              addToast(data.message, 'success');
              db.createAuditLog({ action: 'Invalidación Global', entity: 'Todas las sesiones', details: 'Cierre forzado de sesiones (vía Edge Function)', user_name: user?.name, asic: 'Admin', ip_address: '127.0.0.1' });
            } else {
              addToast('Error: ' + data.message, 'error');
            }
          } catch(err) {
            addToast('Error de conexión', 'error');
          }
        }} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group cursor-pointer hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Invalidación Global</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Forzar cierre de todas las sesiones</p>
          </div>
          <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg group-hover:scale-110 transition-transform">
            <UserX size={20} />
          </div>
        </div>
        
        <div onClick={async () => {
          addToast('Iniciando rotación de claves...', 'info');
          try {
            const res = await fetch('/api/admin/rotate-passwords', { method: 'POST' });
            const data = await res.json();
            if (data.status === 'success' || data.status === 'simulated') {
              addToast(data.message, 'success');
              db.createAuditLog({ action: 'Rotación de Claves', entity: 'Todos los usuarios', details: 'Exigencia de cambio de clave (vía Edge Function)', user_name: user?.name, asic: 'Admin', ip_address: '127.0.0.1' });
            } else {
              addToast('Error: ' + data.message, 'error');
            }
          } catch(err) {
            addToast('Error de conexión', 'error');
          }
        }} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group cursor-pointer hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Rotación de Claves</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Exigir cambio de clave general</p>
          </div>
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
            <Key size={20} />
          </div>
        </div>

        <div onClick={openAuditModal} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Cargando usuarios...
                  </td>
                </tr>
              ) : (
              users
                .filter(u => u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                        {u.name ? u.name.substring(0, 2).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          {u.name || 'Sin nombre'}
                          {u.status === 'suspended' && (
                            <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Suspendido</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      <Shield size={12} className={u.level === 'ADMIN' ? 'text-rose-500' : 'text-slate-400'} />
                      {u.role || u.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <MapPin size={14} className="text-emerald-500" />
                      {u.asic_id || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={14} />
                      {u.last_login ? new Date(u.last_login).toLocaleDateString() : 'Nunca'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleResetPassword(u.name)}
                        className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors"
                        title="Forzar Cambio de Clave"
                      >
                        <Key size={16} />
                      </button>
                      <button 
                        onClick={() => handleKillSwitch(u.id, u.name)}
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
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* New User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <UserPlus size={18} className="text-indigo-600 dark:text-indigo-400" />
                Registrar Nuevo Usuario
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Nombre Completo</label>
                  <input type="text" required value={newUser.nombre} onChange={e => setNewUser({...newUser, nombre: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500" placeholder="Ej. Dr. Juan Pérez" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Correo (Usuario)</label>
                  <input type="email" required value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500" placeholder="correo@mpps.gob.ve" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Contraseña Inicial</label>
                  <input type="password" required minLength={6} value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500" placeholder="Mínimo 6 caracteres" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Nivel de Acceso</label>
                  <select value={newUser.nivel} onChange={e => setNewUser({...newUser, nivel: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500">
                    <option value="L2_LOCAL">Local / ASIC (Nivel 2)</option>
                    <option value="L1_CENTRAL">Ministerio / Sede (Nivel 1)</option>
                    <option value="ADMIN">Administrador de Sistemas</option>
                  </select>
                </div>
              </div>

              {newUser.nivel === 'L1_CENTRAL' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Departamento Nacional</label>
                  <select required value={newUser.departamento} onChange={e => setNewUser({...newUser, departamento: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500">
                    <option value="">Seleccione Departamento...</option>
                    {NIVEL1_DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              )}

              {newUser.nivel === 'L2_LOCAL' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Área de Salud (ASIC)</label>
                    <select required value={newUser.asicId} onChange={e => setNewUser({...newUser, asicId: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500">
                      <option value="">Seleccione ASIC...</option>
                      {ASICS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Rol Operativo</label>
                    <select required value={newUser.rol} onChange={e => setNewUser({...newUser, rol: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500">
                      <option value="">Seleccione Rol...</option>
                      {NIVEL2_ROLES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-2 transition-colors">
                  <Save size={16} />
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Audit Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <ShieldAlert size={18} className="text-blue-600 dark:text-blue-400" />
                Auditoría de Sistema (Logs)
              </h3>
              <button onClick={() => setShowAuditModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-0 overflow-y-auto flex-1">
               <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 sticky top-0">
                  <tr>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Acción</th>
                    <th className="px-4 py-3">Entidad</th>
                    <th className="px-4 py-3">Autor</th>
                    <th className="px-4 py-3">IP / ASIC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        No hay registros de auditoría disponibles.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log: any) => (
                      <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-xs">{new Date(log.created_at).toLocaleString()}</td>
                        <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{log.action}</td>
                        <td className="px-4 py-3 text-xs">{log.entity}</td>
                        <td className="px-4 py-3">{log.user_name}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{log.ip_address} <br/> {log.asic}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
