export interface Cie10Entry {
  code: string;
  description: string;
}

export const CIE_10_DATABASE: Cie10Entry[] = [
  { code: 'A00', description: 'Cólera' },
  { code: 'A01', description: 'Fiebres tifoidea y paratifoidea' },
  { code: 'A03', description: 'Shigelosis' },
  { code: 'A06', description: 'Amebiasis' },
  { code: 'A09', description: 'Diarrea y gastroenteritis de presunto origen infeccioso' },
  { code: 'A15', description: 'Tuberculosis respiratoria, confirmada bacteriológica e histológicamente' },
  { code: 'A30', description: 'Lepra [enfermedad de Hansen]' },
  { code: 'A90', description: 'Dengue [dengue clásico]' },
  { code: 'A91', description: 'Fiebre del dengue hemorrágico' },
  { code: 'B50', description: 'Paludismo [malaria] por Plasmodium falciparum' },
  { code: 'B51', description: 'Paludismo [malaria] por Plasmodium vivax' },
  { code: 'B54', description: 'Paludismo [malaria] no especificado' },
  { code: 'B57', description: 'Enfermedad de Chagas' },
  { code: 'E10', description: 'Diabetes mellitus insulinodependiente' },
  { code: 'E11', description: 'Diabetes mellitus no insulinodependiente' },
  { code: 'I10', description: 'Hipertensión esencial (primaria)' },
  { code: 'J00', description: 'Rinofaringitis aguda (resfriado común)' },
  { code: 'J01', description: 'Sinusitis aguda' },
  { code: 'J03', description: 'Amigdalitis aguda' },
  { code: 'J09', description: 'Influenza debida a virus de la influenza aviar identificado' },
  { code: 'J11', description: 'Influenza, virus no identificado' },
  { code: 'J12', description: 'Neumonía viral, no clasificada en otra parte' },
  { code: 'J15', description: 'Neumonía bacteriana, no clasificada en otra parte' },
  { code: 'J20', description: 'Bronquitis aguda' },
  { code: 'J45', description: 'Asma' },
  { code: 'N39.0', description: 'Infección de vías urinarias, sitio no especificado' },
  { code: 'O20', description: 'Hemorragia precoz del embarazo' },
  { code: 'O80', description: 'Parto único espontáneo' },
  { code: 'R50', description: 'Fiebre de otro origen y de origen desconocido' },
  { code: 'T07', description: 'Traumatismos múltiples, no especificados' },
  { code: 'Z00', description: 'Examen general e investigación de personas sin quejas o sin diagnóstico informado' },
  { code: 'Z01', description: 'Otros exámenes e investigaciones especiales de personas sin quejas o sin diagnóstico informado' },
  { code: 'Z30', description: 'Atención anticonceptiva' },
  { code: 'Z32', description: 'Examen y prueba del embarazo' },
  { code: 'Z34', description: 'Supervisión de embarazo normal' }
];
