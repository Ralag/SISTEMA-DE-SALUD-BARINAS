export type AccessLevel = 'ADMIN' | 'MODERATOR' | 'L0_STRATEGIC' | 'L1_CENTRAL' | 'L1_TACTICAL' | 'L2_LOCAL' | 'L3_OPERATIONAL';

export type Department = string;

export interface UserRole {
  id: string;
  name: string;
  level: AccessLevel;
  department: Department;
  title: string;
  asicAccess?: string; // If L2 or L3, which ASIC they belong to
  cptAccess?: string; // If L3, which CPT they belong to
}

export const SYSTEM_ROLES: Record<string, UserRole> = {
  MODERADOR_INFORMATICA: {
    id: 'mod_sistemas',
    name: 'Moderador de Sistemas',
    level: 'MODERATOR',
    department: 'INFORMATICA',
    title: 'Moderador de Plataforma'
  },
  ADMIN: {
    id: 'admin_sys',
    name: 'Administrador del Sistema',
    level: 'ADMIN',
    department: 'SISTEMAS',
    title: 'Acceso Total'
  },
  AUTORIDAD_UNICA: {
    id: 'auth_unica',
    name: 'Autoridad Única de Salud',
    level: 'L0_STRATEGIC',
    department: 'DES',
    title: 'Espectador Maestro'
  },
  CEIS_DIRECTOR: {
    id: 'ceis_dir',
    name: 'Coordinador de Estadística',
    level: 'L1_CENTRAL',
    department: 'ESTADISTICA',
    title: 'Dirección Estadística'
  },
  EPIDEMIOLOGO_REGIONAL: {
    id: 'epi_regional',
    name: 'Coordinador Epidemiología',
    level: 'L1_CENTRAL',
    department: 'EPIDEMIOLOGIA',
    title: 'Dirección Epidemiológica'
  },
  COORD_PROGRAMA_INMUNIZACION: {
    id: 'prog_inmu',
    name: 'Coordinador Prog. Inmunización',
    level: 'L1_TACTICAL',
    department: 'INMUNIZACION',
    title: 'Coordinador de Programa'
  },
  DIRECTOR_ASIC: {
    id: 'dir_asic_guanapa',
    name: 'Director ASIC Guanapa',
    level: 'L2_LOCAL',
    department: 'DIRECTOR_ASIC',
    title: 'Director ASIC',
    asicAccess: 'Guanapa'
  },
  ESTADISTICO_ASIC: {
    id: 'est_asic_guanapa',
    name: 'Estadístico ASIC Guanapa',
    level: 'L2_LOCAL',
    department: 'ESTADISTICA_ASIC',
    title: 'Estadístico Local',
    asicAccess: 'Guanapa'
  }
};
