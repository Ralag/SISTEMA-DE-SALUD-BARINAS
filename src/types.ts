export type AccessLevel = 'ADMIN' | 'L0_STRATEGIC' | 'L1_CENTRAL' | 'L1_TACTICAL' | 'L2_LOCAL' | 'L3_OPERATIONAL';

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
  COORD_REDES: {
    id: 'coord_redes',
    name: 'Coordinador Redes de Atención',
    level: 'L1_CENTRAL',
    department: 'RED_ATENCION',
    title: 'Dirección de Redes'
  },
  COORD_DRS_CARDIOVASCULAR: {
    id: 'drs_cardio',
    name: 'Coordinador DRS Cardiovascular',
    level: 'L1_CENTRAL',
    department: 'CARDIOVASCULAR',
    title: 'Coordinación DRS'
  },
  COORD_PROGRAMA_CARDIO: {
    id: 'prog_cardio',
    name: 'Coordinador Prog. Cardiovascular',
    level: 'L1_TACTICAL',
    department: 'CARDIOVASCULAR',
    title: 'Coordinador de Programa'
  },
  COORD_PROGRAMA_RENAL: {
    id: 'prog_renal',
    name: 'Coordinador Prog. Renal',
    level: 'L1_TACTICAL',
    department: 'RENAL',
    title: 'Coordinador de Programa'
  },
  COORD_PROGRAMA_ENDOCRINO: {
    id: 'prog_endo',
    name: 'Coordinador Prog. Endocrino-Metabólico',
    level: 'L1_TACTICAL',
    department: 'ENDOCRINOMETABOLICO',
    title: 'Coordinador de Programa'
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
  },
  COORD_ASIC_CARDIO: {
    id: 'coord_asic_cardio',
    name: 'Coordinador ASIC Cardiovascular',
    level: 'L2_LOCAL',
    department: 'CARDIOVASCULAR',
    title: 'Coordinador ASIC',
    asicAccess: 'Guanapa'
  },
  MEDICO_CPT: {
    id: 'medico_cpt_cantarana',
    name: 'Médico Canta Rana',
    level: 'L3_OPERATIONAL',
    department: 'CPT',
    title: 'Ingresador de Datos',
    asicAccess: 'Guanapa',
    cptAccess: 'CPT 2 Canta Rana (AMBULATORIO RURAL I)'
  }
};
