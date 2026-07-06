import csvData from './establecimientos.csv?raw';

export interface CptUnit {
  id: string;
  name: string;
  parroquia: string;
  municipio: string;
  estado: string;
  tipo: string;
  type: string;
  level: string;
}

export interface AsicGroup {
  name: string;
  municipality: string;
  units: CptUnit[];
}

export interface HealthHierarchy {
  state: string;
  asics: AsicGroup[];
}

function parseCSV(csv: string): HealthHierarchy {
  const lines = csv.split('\n').filter(line => line.trim().length > 0);
  const asicMap = new Map<string, CptUnit[]>();
  let stateName = 'Estado Barinas';

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(';');
    if (parts.length < 7) continue;

    const n = parts[0];
    const estado = parts[1].trim();
    const municipio = parts[2].trim();
    const parroquia = parts[3].trim();
    const asicName = parts[4].trim();
    const tipo = parts[5].trim();
    const nombre = parts[6].trim();

    if (estado && estado !== 'ESTADO') {
      stateName = `Estado ${estado}`;
    }

    if (!asicMap.has(asicName)) {
      asicMap.set(asicName, []);
    }
    
    let type = 'CPT';
    let level = 'Primer Nivel - Consultorio Popular';
    if (tipo.includes('HOSPITAL')) {
      type = 'Hospital';
      level = 'Segundo Nivel - Hospital';
    } else if (tipo.includes('AMBULATORIO')) {
      type = 'Ambulatorio';
      level = 'Primer Nivel - Ambulatorio';
    } else if (tipo.includes('CDI')) {
      type = 'CDI';
      level = 'Segundo Nivel - Diagnóstico Integral';
    }

    asicMap.get(asicName)!.push({
      id: `cpt-${n}`,
      name: `${nombre} (${tipo})`,
      parroquia,
      municipio,
      estado,
      tipo,
      type,
      level
    });
  }

  const asics: AsicGroup[] = Array.from(asicMap.entries()).map(([name, units]) => ({
    name,
    municipality: units[0]?.municipio || '',
    units: units.sort((a, b) => a.name.localeCompare(b.name))
  })).sort((a, b) => a.name.localeCompare(b.name));

  return { state: stateName, asics };
}

export const HEALTH_HIERARCHY = parseCSV(csvData);
