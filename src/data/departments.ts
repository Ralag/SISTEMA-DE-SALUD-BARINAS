export interface HealthProgram {
  id: string;
  name: string;
  group?: string; // e.g. "CAREMT", "PROYECTO FAMILIA", etc.
  hasStats: boolean;
}

export const MPPS_PROGRAMS: HealthProgram[] = [
  // CAREMT
  { id: 'CARDIOVASCULAR', name: 'Salud Cardiovascular', group: 'CAREMT', hasStats: true },
  { id: 'ONCOLOGIA', name: 'Oncología', group: 'CAREMT', hasStats: true },
  { id: 'RENAL', name: 'Salud Renal', group: 'CAREMT', hasStats: true },
  { id: 'ENDOCRINOMETABOLICO', name: 'Endocrino-Metabólico', group: 'CAREMT', hasStats: true },
  { id: 'TABACO', name: 'Control de Tabaco', group: 'CAREMT', hasStats: true },
  
  // FAMILIA (PROYECTO MADRE)
  { id: 'NNA', name: 'Niños, Niñas y Adolescentes', group: 'FAMILIA', hasStats: true },
  { id: 'MATERNIDAD_SEGURA', name: 'Maternidad Segura / Salud Sexual', group: 'FAMILIA', hasStats: true },
  { id: 'LACTANCIA', name: 'Lactancia Materna', group: 'FAMILIA', hasStats: true },
  
  // ENFERMEDADES TRANSMISIBLES
  { id: 'INMUNIZACION', name: 'Inmunización (PAI)', group: 'TRANSMISIBLES', hasStats: true },
  { id: 'TUBERCULOSIS', name: 'Tuberculosis (Salud Respiratoria)', group: 'TRANSMISIBLES', hasStats: true },
  { id: 'VIH_ITS', name: 'ITS / VIH - SIDA', group: 'TRANSMISIBLES', hasStats: true },
  { id: 'MALARIA', name: 'Malaria / Salud Ambiental', group: 'TRANSMISIBLES', hasStats: true },
  { id: 'DENGUE', name: 'Dengue', group: 'TRANSMISIBLES', hasStats: true },
  
  // COMUNIDAD SEGURA Y VIDA PLENA
  { id: 'SALUD_MENTAL', name: 'Salud Mental', group: 'COMUNIDAD', hasStats: true },
  { id: 'PASDIS', name: 'Atención a Personas con Discapacidad (PASDIS)', group: 'COMUNIDAD', hasStats: true },
  { id: 'SALUD_VISUAL', name: 'Salud Visual', group: 'COMUNIDAD', hasStats: true },
  { id: 'DROGAS_ALCOHOL', name: 'Atención en Drogas y Alcohol', group: 'COMUNIDAD', hasStats: true },
  { id: 'HECHOS_VIOLENTOS', name: 'Accidentes y Hechos Violentos', group: 'COMUNIDAD', hasStats: true },
  
  // OTHERS
  { id: 'BANCO_SANGRE', name: 'Bancos de Sangre', group: 'OTROS', hasStats: true },
];

export const OTHER_DEPARTMENTS = [
  { id: 'DES', name: 'Dirección Estadal de Salud' },
  { id: 'EPI', name: 'Epidemiología Regional' },
  { id: 'CEIS', name: 'Coordinación de Estadísticas' },
  { id: 'DSP', name: 'Dirección de Programas de Salud' }
];

export const ALL_DEPARTMENTS = [
  ...OTHER_DEPARTMENTS,
  ...MPPS_PROGRAMS.map(p => ({ id: p.id, name: p.name }))
];
