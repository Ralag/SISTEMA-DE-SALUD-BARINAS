import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Faltan las variables de entorno de Supabase (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY). ' +
    'El cliente de base de datos no se inicializará correctamente y el sistema operará en modo degradado o fallará.'
  );
}

let cleanUrl = supabaseUrl || 'https://placeholder.supabase.co';
if (cleanUrl.endsWith('/rest/v1/') || cleanUrl.endsWith('/rest/v1')) {
  cleanUrl = cleanUrl.replace(/\/rest\/v1\/?$/, '');
}

// Inicialización perezosa y segura del cliente Supabase
export const supabase = createClient(
  cleanUrl,
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
