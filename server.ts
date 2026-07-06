import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// --- MOCK DATABASE (DHIS2 Simulation) ---
const mockDB = {
  // Organization Units (Geographic Tree)
  orgUnits: [
    { id: 'ou_barinas', name: 'Estado Barinas', level: 1, parentId: null },
    { id: 'ou_asic_obispos', name: 'ASIC Obispos', level: 2, parentId: 'ou_barinas' },
    { id: 'ou_cpt_cantarana', name: 'CPT 2 Canta Rana', level: 3, parentId: 'ou_asic_obispos' },
    { id: 'ou_cpt_borburata', name: 'CPT 2 Borburata', level: 3, parentId: 'ou_asic_obispos' }
  ],
  // Tracked Entity Instances (EPI-10 Atomic Data)
  epi10_records: [] as any[],
  // Data Value Sets (DSP04 Aggregate Data)
  dsp04_records: [] as any[]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // --- API ROUTES (Temporales / DHIS2-like) ---

  // 1. Get Organization Units (Jerarquía Geográfica)
  app.get('/api/dhis2/orgUnits', (req, res) => {
    res.json({
      status: 'success',
      data: mockDB.orgUnits
    });
  });

  // 2. Post EPI-10 Record (Morbilidad Diaria - Nivel 3)
  app.post('/api/dhis2/tracker/epi10', (req, res) => {
    const record = req.body;
    
    // Basic backend validation (Coherencia biológica simple de ejemplo)
    if (record.sex === 'M' && record.diagnosisCode === 'C53') { // C53: Tumor maligno del cuello del útero
      return res.status(400).json({
        status: 'error',
        message: 'Regla biológica violada: Diagnóstico exclusivo femenino.'
      });
    }

    const newRecord = {
      ...record,
      id: `epi10_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    mockDB.epi10_records.push(newRecord);
    
    res.status(201).json({
      status: 'success',
      message: 'Registro EPI-10 almacenado correctamente.',
      data: newRecord
    });
  });

  // 3. Post DSP04 Record (Gestión Operativa - Nivel 2 o 3)
  app.post('/api/dhis2/dataValues/dsp04', (req, res) => {
    const aggregateData = req.body;
    
    const newRecord = {
      ...aggregateData,
      id: `dsp04_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    mockDB.dsp04_records.push(newRecord);

    res.status(201).json({
      status: 'success',
      message: 'Consolidado DSP04 almacenado correctamente.',
      data: newRecord
    });
  });

  // 4. Get EPI-15 Summary (Simulación de sumatoria para el reporte EPI-15)
  app.get('/api/dhis2/reports/epi15/:orgUnitId', (req, res) => {
    const { orgUnitId } = req.params;
    
    // Filtramos los registros de la unidad seleccionada (y de sus hijos en un sistema real, aquí lo simplificamos a nivel directo)
    const localRecords = mockDB.epi10_records.filter(r => r.orgUnitId === orgUnitId);
    
    // Sumatoria simulada
    const totalPatients = localRecords.length;
    
    res.json({
      status: 'success',
      reportId: 'EPI-15',
      orgUnitId,
      summary: {
        totalPatients,
        records: localRecords
      }
    });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for all other routes (SPA fallback)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
