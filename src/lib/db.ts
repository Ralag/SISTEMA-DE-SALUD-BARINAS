import { supabase } from './supabase';

// Helper to check if Supabase is properly configured
const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_project_url';

export const db = {
  // ==========================================
  // IDENTITY & PROFILES
  // ==========================================
  async getProfiles() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (!error && data) return data;
      } catch (err) {
        console.warn('Error fetching from Supabase, falling back to local.', err);
      }
    }
    // Fallback local (lee los usuarios creados en localStorage por el Auth fallback)
    const localUsers = JSON.parse(localStorage.getItem('sis_users') || '[]');
    return localUsers.map((u: any) => ({
      id: u.email, // using email as ID in fallback
      name: u.nombre,
      email: u.email,
      role: u.rol,
      level: u.nivel,
      department: u.departamento,
      asic_id: u.asicId || 'N/A',
      status: u.status || 'active',
      last_login: u.last_login || 'Reciente'
    }));
  },

  async createUser(newUser: any) {
    if (isSupabaseConfigured) {
      try {
        // Warning: In frontend, signUp might change current session
        const { data, error } = await supabase.auth.signUp({
          email: newUser.email,
          password: newUser.password || 'Mpps.123456*',
          options: {
            data: {
              nombre: newUser.nombre,
              nivel: newUser.nivel,
              departamento: newUser.departamento,
              rol: newUser.rol,
              asicId: newUser.asicId
            }
          }
        });
        if (error) throw error;
        return data;
      } catch (err: any) {
        throw new Error(err.message || 'Error al crear usuario en Supabase.');
      }
    } else {
      // Local fallback
      const usersStr = localStorage.getItem('sis_users') || '[]';
      const users = JSON.parse(usersStr);
      if (users.find((u: any) => u.email === newUser.email)) {
        throw new Error('El correo ya está registrado.');
      }
      users.push({
        email: newUser.email,
        password: newUser.password || 'Mpps.123456*',
        nombre: newUser.nombre,
        nivel: newUser.nivel,
        departamento: newUser.departamento,
        rol: newUser.rol,
        asicId: newUser.asicId
      });
      localStorage.setItem('sis_users', JSON.stringify(users));
      return true;
    }
  },

  async updateProfileStatus(userId: string, status: 'active' | 'suspended') {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('profiles').update({ status }).eq('id', userId);
      } catch (err) {}
    }
    const localUsers = JSON.parse(localStorage.getItem('sis_users') || '[]');
    const idx = localUsers.findIndex((u: any) => u.email === userId || u.id === userId);
    if (idx > -1) {
      localUsers[idx].status = status;
      localStorage.setItem('sis_users', JSON.stringify(localUsers));
    }
  },

  // ==========================================
  // AUDIT LOGS
  // ==========================================
  async getAuditLogs() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {}
    }
    return JSON.parse(localStorage.getItem('sis_audit_logs') || '[]');
  },

  async createAuditLog(log: Omit<any, 'id' | 'created_at'>) {
    const newLog = { ...log, id: Date.now().toString(), created_at: new Date().toISOString() };
    if (isSupabaseConfigured) {
      try {
        await supabase.from('audit_logs').insert(newLog);
      } catch (err) {}
    }
    const logs = JSON.parse(localStorage.getItem('sis_audit_logs') || '[]');
    logs.unshift(newLog);
    localStorage.setItem('sis_audit_logs', JSON.stringify(logs));
  },

  // ==========================================
  // BANNERS (BROADCAST)
  // ==========================================
  async getBanners() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('banners').select('*').eq('active', true).order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {}
    }
    return JSON.parse(localStorage.getItem('sis_banners') || '[]');
  },

  async createBanner(banner: { type: string, message: string }) {
    const newBanner = { ...banner, id: Date.now().toString(), active: true, created_at: new Date().toISOString() };
    if (isSupabaseConfigured) {
      try {
        await supabase.from('banners').insert(newBanner);
      } catch (err) {}
    }
    const banners = JSON.parse(localStorage.getItem('sis_banners') || '[]');
    banners.unshift(newBanner);
    localStorage.setItem('sis_banners', JSON.stringify(banners));
    return newBanner;
  },

  // ==========================================
  // TICKETS
  // ==========================================
  async getTickets() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('tickets').select('*').order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {}
    }
    return JSON.parse(localStorage.getItem('sis_tickets') || '[]');
  },

  // ==========================================
  // SYSTEM CONFIG (SaaS)
  // ==========================================
  async getSystemConfig() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('system_config').select('value').eq('id', 'main').single();
        if (!error && data) return data.value;
      } catch (err) {}
    }
    const local = localStorage.getItem('saasConfig');
    return local ? JSON.parse(local) : null;
  },

  async updateSystemConfig(config: any) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('system_config').upsert({ id: 'main', value: config });
      } catch (err) {}
    }
    localStorage.setItem('saasConfig', JSON.stringify(config));
  },
};
