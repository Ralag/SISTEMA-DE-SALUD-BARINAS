const fs = require('fs');
let code = fs.readFileSync('src/components/LoginScreen.tsx', 'utf8');

const replacement1 = `const NIVEL1_DEPARTMENTS = [
  { id: 'DES', name: 'Autoridad Única de Salud / Despacho', group: 'B' },
  { id: 'ESTADISTICA', name: 'CEIS - Estadística e Información en Salud', group: 'A' },
  { id: 'EPIDEMIOLOGIA', name: 'Epidemiología Regional', group: 'A' },
  { id: 'INMUNIZACION', name: 'Coordinación Regional de Inmunización (PAI)', group: 'A' },
];`;

const replacement2 = `const NIVEL2_ROLES = [
  { id: 'COORD_ASIC', name: 'Director (Coordinador) del ASIC', depto: 'DIRECTOR_ASIC' },
  { id: 'ESTADISTICO_ASIC', name: 'Estadístico del ASIC', depto: 'ESTADISTICA_ASIC' },
];`;

code = code.replace(/const NIVEL1_DEPARTMENTS = \[\s*([\s\S]*?)\];/, replacement1);
code = code.replace(/const NIVEL2_ROLES = \[\s*([\s\S]*?)\];/, replacement2);

fs.writeFileSync('src/components/LoginScreen.tsx', code);
console.log('LoginScreen updated');
