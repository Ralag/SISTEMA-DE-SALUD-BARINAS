const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

const replacement = `export const SYSTEM_ROLES: Record<string, UserRole> = {
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
};`;

code = code.replace(/export const SYSTEM_ROLES: Record<string, UserRole> = \{[\s\S]*?\};/, replacement);

fs.writeFileSync('src/types.ts', code);
console.log('types.ts updated');
