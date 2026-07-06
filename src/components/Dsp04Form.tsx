import { useState, useEffect, useMemo } from 'react';
import { ClipboardList, Building2, Activity, HeartPulse, Save, CheckCircle, ChevronRight, FileSpreadsheet, Stethoscope, ShieldAlert } from 'lucide-react';
import { dhis2Service } from '../services/dhis2';
import { useAppContext } from '../context/AppContext';
import { HEALTH_HIERARCHY } from '../data/hierarchy';

const ALL_PRODUCTIVITY_ROWS = [
  { id: 'medicina_familiar', label: 'Medicina Familiar', category: 'Atención Médica', dhis2Id: 'DE_MED_FAM', department: 'TODOS' },
  { id: 'medicina_general', label: 'Medicina General', category: 'Atención Médica', dhis2Id: 'DE_MED_GEN', department: 'TODOS' },
  { id: 'ginecologia', label: 'Ginecología', category: 'Programa SSR', dhis2Id: 'DE_GIN', department: 'FAMILIA' },
  { id: 'pediatria', label: 'Pediatría', category: 'Programa NNA', dhis2Id: 'DE_PED', department: 'FAMILIA' },
  { id: 'nutricion', label: 'Nutrición', category: 'Programa CAREMT', dhis2Id: 'DE_NUT', department: 'CAREMT' },
  { id: 'enfermeria', label: 'Cardiovascular', category: 'Programa CAREMT', dhis2Id: 'DE_ENF', department: 'CAREMT' },
  { id: 'odontologia', label: 'Odontología Curativa', category: 'Programa Comunidad', dhis2Id: 'DE_ODO', department: 'COMUNIDAD' },
  { id: 'emergencias', label: 'Salud Mental', category: 'Programa Comunidad', dhis2Id: 'DE_EMG', department: 'COMUNIDAD' },
];

export default function Dsp04Form() {
  const { location, setSyncStatus, setLastSync, incrementDsp04, user } = useAppContext();

  const [activeSection, setActiveSection] = useState<'notificacion' | 'productividad' | 'programas'>('productividad'); // Default to productividad for demo
  
  const allowedRows = useMemo(() => {
    if (user.level === 'L1_TACTICAL' && user.department !== 'DSP') {
      return ALL_PRODUCTIVITY_ROWS.filter(row => row.department === user.department || row.department === 'TODOS');
    }
    return ALL_PRODUCTIVITY_ROWS;
  }, [user]);

  // Estado para la Pestaña 1: Control de Notificación
  const currentAsicUnits = useMemo(() => {
    const asic = HEALTH_HIERARCHY.asics.find(a => a.name === location.asic);
    return asic ? asic.units : [];
  }, [location.asic]);

  const [establishments, setEstablishments] = useState(
    currentAsicUnits.map(unit => ({ ...unit, reported: false }))
  );

  useEffect(() => {
    setEstablishments(currentAsicUnits.map(unit => ({ ...unit, reported: false })));
  }, [currentAsicUnits]);
  
  // Estado para la Pestaña 2: Productividad (Matriz Semanal)
  const [productivityMatrix, setProductivityMatrix] = useState<Record<string, Record<string, string>>>(
    ALL_PRODUCTIVITY_ROWS.reduce((acc, row) => ({
      ...acc,
      [row.id]: { s1: '', s2: '', s3: '', s4: '', s5: '' }
    }), {})
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const toggleReported = (id: string) => {
    setEstablishments(prev => prev.map(est => 
      est.id === id ? { ...est, reported: !est.reported } : est
    ));
  };

  const handleMatrixChange = (rowId: string, colId: string, value: string) => {
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
      setProductivityMatrix(prev => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          [colId]: value
        }
      }));
    }
  };

  const getRowTotal = (rowId: string) => {
    const row = productivityMatrix[rowId];
    return ['s1', 's2', 's3', 's4', 's5'].reduce((sum, col) => {
      return sum + (parseInt(row[col]) || 0);
    }, 0);
  };

  const getColTotal = (colId: string) => {
    return allowedRows.reduce((sum, row) => {
      return sum + (parseInt(productivityMatrix[row.id][colId]) || 0);
    }, 0);
  };

  const getTotalAccumulated = () => {
    return allowedRows.reduce((sum, row) => sum + getRowTotal(row.id), 0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSyncStatus('syncing');
    setSuccessMessage('');
    
    try {
      // Map matrix to DHIS2 DataValues format
      const dataValues = allowedRows.map(row => ({
        dataElement: row.dhis2Id,
        value: getRowTotal(row.id) // Sending the accumulated total for the month
      })).filter(dv => dv.value > 0);

      // Simulate DHIS2 DataValueSet Payload via API layer
      const response = await dhis2Service.sendDataValueSet({
        dataSet: 'DS_DSP04_MONTHLY',
        completeDate: new Date().toISOString().split('T')[0],
        period: '202503', // YYYYMM format
        orgUnit: location.orgUnitId,
        dataValues
      });
      
      console.log('DHIS2 DataValueSet Response:', response);
      
      if (response.status === 'OK') {
        setSyncStatus('success');
        setLastSync(new Date());
        incrementDsp04();
        setSuccessMessage(`Consolidado DSP04 sincronizado. Datos procesados: ${dataValues.length}`);
        setTimeout(() => setSuccessMessage(''), 3000);
        setTimeout(() => setSyncStatus('idle'), 3000);
      } else {
        setSyncStatus('error');
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error(error);
      setSyncStatus('error');
      alert('Error de conexión con el servidor DHIS2.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cálculo de progreso para validaciones
  const totalEstablishments = establishments.length;
  const reportedCount = establishments.filter(e => e.reported).length;
  const reportingPercentage = Math.round((reportedCount / totalEstablishments) * 100);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden text-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 dark:bg-emerald-500 text-white p-1.5 rounded-md shadow-sm">
            <ClipboardList size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight leading-none">Gestión Operativa <span className="font-normal opacity-70">DSP04</span></h2>
            <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mt-1">{location.asic} • Consolidado Mensual 2025</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* Left: Section Navigation (Pestañas del DSP04) */}
        <div className="w-full md:w-56 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 flex flex-col shrink-0">
          <div className="p-3">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1 hidden md:block">Secciones del Formato</p>
            <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto whitespace-nowrap pb-1 md:pb-0 scrollbar-none">
              <button 
                onClick={() => setActiveSection('notificacion')}
                className={`flex-1 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeSection === 'notificacion' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 size={16} /> Notificación
                </div>
                <ChevronRight size={14} className="hidden md:block" />
              </button>
              
              <button 
                onClick={() => setActiveSection('productividad')}
                className={`flex-1 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeSection === 'productividad' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity size={16} /> Productividad
                </div>
                <ChevronRight size={14} className="hidden md:block" />
              </button>

              <button 
                onClick={() => setActiveSection('programas')}
                className={`flex-1 md:w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeSection === 'programas' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <HeartPulse size={16} /> Prog. de Salud
                </div>
                <ChevronRight size={14} className="hidden md:block" />
              </button>
            </div>
          </div>
          
          <div className="hidden md:block mt-auto p-3 border-t border-slate-200 dark:border-slate-700">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Estado de Red (ASIC)</p>
              <div className="flex items-end gap-1.5">
                <span className="text-xl font-black text-slate-800 dark:text-slate-100 leading-none">{reportingPercentage}%</span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Notificados</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${reportingPercentage > 80 ? 'bg-emerald-500' : 'bg-amber-400'}`} 
                  style={{ width: `${reportingPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Workspace */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-5">
            
            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400 animate-in fade-in slide-in-from-top-4 text-xs">
                <CheckCircle size={18} className="text-emerald-500 dark:text-emerald-400" />
                <span className="font-bold">{successMessage}</span>
              </div>
            )}

            {/* SECCIÓN 1: NOTIFICACIÓN (Basado en el CSV) */}
            {activeSection === 'notificacion' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Establecimientos que Reportaron</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Total: {totalEstablishments} Centros en {location.asic}</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <FileSpreadsheet size={12} /> Vista de Red
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {establishments.map((est) => (
                    <button
                      key={est.id}
                      onClick={() => toggleReported(est.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                        est.reported 
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-500/50' 
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <p className={`text-xs font-bold ${est.reported ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-700 dark:text-slate-300'}`}>{est.name}</p>
                        <p className={`text-[9px] font-bold mt-0.5 uppercase ${est.reported ? 'text-emerald-600 dark:text-emerald-500' : 'text-slate-400 dark:text-slate-400'}`}>{est.type}</p>
                      </div>
                      <div className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${est.reported ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        <div className={`bg-white dark:bg-slate-900 w-3 h-3 rounded-full shadow-sm transform transition-transform ${est.reported ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN 2: PRODUCTIVIDAD MATRIZ */}
            {activeSection === 'productividad' && (
              <div className="animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Consultas de Atención Integral</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Por Equipo de Salud - Acumulado Semanal</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <th className="px-3 py-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest min-w-[150px]">Servicio / Actividad</th>
                        {['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4', 'SEM 5'].map((sem, i) => (
                          <th key={i} className="px-2 py-2 text-center text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-16">{sem}</th>
                        ))}
                        <th className="px-3 py-2 text-center text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50/50 dark:bg-emerald-900/10 w-20">ACUM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {allowedRows.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-3 py-1.5 font-bold text-slate-700 dark:text-slate-200">
                            <span className="block leading-tight">{row.label}</span>
                            <span className="text-[9px] text-slate-400 uppercase tracking-wider">{row.category}</span>
                          </td>
                          {['s1', 's2', 's3', 's4', 's5'].map((sem) => (
                            <td key={sem} className="px-1 py-1.5">
                              <input
                                type="text"
                                inputMode="numeric"
                                value={productivityMatrix[row.id][sem]}
                                onChange={(e) => handleMatrixChange(row.id, sem, e.target.value)}
                                className="w-full text-center font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1 py-1 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 dark:focus:ring-emerald-400 outline-none transition-all text-xs"
                                placeholder="0"
                              />
                            </td>
                          ))}
                          <td className="px-3 py-1.5 text-center font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-900/10 text-sm">
                            {getRowTotal(row.id)}
                          </td>
                        </tr>
                      ))}
                      {/* Totales Row */}
                      <tr className="bg-slate-100 dark:bg-slate-800/50/50 border-t border-slate-200 dark:border-slate-700">
                        <td className="px-3 py-2 font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide text-right text-[10px]">
                          Totales
                        </td>
                        {['s1', 's2', 's3', 's4', 's5'].map((sem) => (
                          <td key={sem} className="px-2 py-2 text-center font-black text-slate-700 dark:text-slate-200">
                            {getColTotal(sem)}
                          </td>
                        ))}
                        <td className="px-3 py-2 text-center font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100/50 dark:bg-emerald-900/30 text-base">
                          {getTotalAccumulated()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECCIÓN 3: PROGRAMAS */}
            {activeSection === 'programas' && (
              <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center h-full text-center min-h-[200px]">
                <HeartPulse size={32} className="text-slate-300 dark:text-slate-200 mb-3" />
                <h3 className="text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Programas de Salud</h3>
                <p className="text-xs font-bold text-slate-400 mt-1 max-w-sm">
                  Pestaña en construcción. Aquí se cargarán los totales de Salud Cardiovascular, Nutrición, etc.
                </p>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg font-bold text-sm shadow-sm disabled:shadow-none uppercase tracking-wide active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Procesando...' : <><Save size={16} /> Guardar DSP04</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
