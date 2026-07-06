import React, { useState, useMemo } from 'react';
import { Save, Plus, Trash2, AlertCircle, FileSpreadsheet, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Cie10Autocomplete from './Cie10Autocomplete';
import { HEALTH_HIERARCHY } from '../data/hierarchy';

interface Epi10Row {
  id: string;
  ci: string;
  patientName: string;
  birthDate: string;
  address: string;
  gender: 'M' | 'F' | '';
  age: number | '';
  ageUnit: 'Y' | 'M' | 'D';
  indigenous: string;
  education: string;
  disability: string;
  lactation: string;
  pregnantWeeks: string;
  pregnantGestas: string;
  pregnantRisk: string;
  puerperium: string;
  weight: string;
  height: string;
  headCircumference: string;
  breastExam: string;
  papSmear: string;
  cie10: string;
  consultationType: 'P' | 'S' | 'A' | '';
  diagnosticType: 'SUS' | 'PRO' | 'CON' | 'NA' | '';
  treatment: string;
}

const createEmptyRow = (): Epi10Row => ({
  id: Math.random().toString(36).substr(2, 9),
  ci: '', patientName: '', birthDate: '', address: '', gender: '', age: '', ageUnit: 'Y',
  indigenous: '', education: '', disability: '', lactation: '', pregnantWeeks: '',
  pregnantGestas: '', pregnantRisk: '', puerperium: '', weight: '', height: '',
  headCircumference: '', breastExam: '', papSmear: '', cie10: '', consultationType: '',
  diagnosticType: '', treatment: ''
});

export default function Epi10Form() {
  const { location, setLocation, setSyncStatus, incrementEpi10, setLastSync } = useAppContext();
  
  const [rows, setRows] = useState<Epi10Row[]>([createEmptyRow(), createEmptyRow(), createEmptyRow()]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const availableCpts = useMemo(() => {
    const asic = HEALTH_HIERARCHY.asics.find(a => a.name === location.asic);
    return asic ? asic.units.map(u => u.name) : [];
  }, [location.asic]);

  const addRow = () => setRows([...rows, createEmptyRow()]);

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const updateRow = (id: string, field: keyof Epi10Row, value: any) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSave = () => {
    const validRows = rows.filter(r => r.cie10 && r.age !== '' && r.gender);
    if (validRows.length === 0) {
      alert('Debe completar al menos una fila con Diagnóstico, Edad y Sexo para guardar.');
      return;
    }
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('success');
      setLastSync(new Date());
      validRows.forEach(() => incrementEpi10());
      alert(`Se guardaron exitosamente ${validRows.length} registro(s) EPI-10 para ${location.cpt}.`);
      setRows([createEmptyRow(), createEmptyRow(), createEmptyRow()]);
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="text-emerald-600 dark:text-emerald-400" />
            Registro Diario de Atención Integral - SIS 02 EPI 10
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Hoja de registro detallado extendido. Utilice la barra de desplazamiento horizontal.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
          <div className="flex items-center gap-1.5 px-2">
            <MapPin size={14} className="text-blue-500 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">ASIC {location.asic}</span>
              <select 
                value={location.cpt}
                onChange={(e) => setLocation({ ...location, cpt: e.target.value })}
                className="text-xs text-slate-700 dark:text-slate-200 font-bold leading-tight bg-transparent border-none outline-none cursor-pointer focus:ring-0 p-0"
              >
                {availableCpts.map(cpt => (
                  <option key={cpt} value={cpt}>{cpt}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-xs border-none bg-slate-50 dark:bg-slate-800 rounded px-2 py-2 font-bold text-slate-700 dark:text-slate-200 outline-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-blue-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-800/50 dark:bg-slate-900/50 p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm" style={{ width: 'max-content' }}>
          <table className="text-left border-collapse" style={{ minWidth: '3500px' }}>
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                <th className="p-2 w-10 text-center sticky left-0 bg-slate-100 dark:bg-slate-800 z-10 border-r border-slate-200 dark:border-slate-700">#</th>
                <th className="p-2 w-32 border-l border-slate-200 dark:border-slate-700">C.I. (V,E,P)</th>
                <th className="p-2 w-56 border-l border-slate-200 dark:border-slate-700">Nombres y Apellidos</th>
                <th className="p-2 w-28 border-l border-slate-200 dark:border-slate-700 text-center">F. Nacimiento</th>
                <th className="p-2 w-64 border-l border-slate-200 dark:border-slate-700">Dirección de Residencia</th>
                <th className="p-2 w-16 border-l border-slate-200 dark:border-slate-700 text-center">Sexo</th>
                <th className="p-2 w-16 border-l border-slate-200 dark:border-slate-700 text-center">Edad</th>
                <th className="p-2 w-20 border-l border-slate-200 dark:border-slate-700">Und. Edad</th>
                <th className="p-2 w-36 border-l border-slate-200 dark:border-slate-700">Pueblo Indígena / Etnia</th>
                <th className="p-2 w-40 border-l border-slate-200 dark:border-slate-700">Nivel Educ. Alcanzado</th>
                <th className="p-2 w-32 border-l border-slate-200 dark:border-slate-700">Discapacidad, Tipo</th>
                <th className="p-2 w-28 border-l border-slate-200 dark:border-slate-700">Lactancia &lt; 2 Años</th>
                <th className="p-2 w-28 border-l border-slate-200 dark:border-slate-700 text-center">Emb. (Sem. Gest)</th>
                <th className="p-2 w-28 border-l border-slate-200 dark:border-slate-700 text-center">Emb. (N° Gestas)</th>
                <th className="p-2 w-32 border-l border-slate-200 dark:border-slate-700 text-center">Riesgo Embarazada</th>
                <th className="p-2 w-24 border-l border-slate-200 dark:border-slate-700 text-center">Puerperio</th>
                <th className="p-2 w-20 border-l border-slate-200 dark:border-slate-700 text-center">Peso</th>
                <th className="p-2 w-20 border-l border-slate-200 dark:border-slate-700 text-center">Talla</th>
                <th className="p-2 w-24 border-l border-slate-200 dark:border-slate-700 text-center">Circ. Cefálica</th>
                <th className="p-2 w-36 border-l border-slate-200 dark:border-slate-700">Ex. Mamas (Real./Res.)</th>
                <th className="p-2 w-36 border-l border-slate-200 dark:border-slate-700">Citología (Real./Res.)</th>
                <th className="p-2 w-64 border-l border-slate-200 dark:border-slate-700">Diagnóstico CIE-10</th>
                <th className="p-2 w-24 border-l border-slate-200 dark:border-slate-700 text-center">Tipo Consulta</th>
                <th className="p-2 w-32 border-l border-slate-200 dark:border-slate-700">Tipo Diagnóstico</th>
                <th className="p-2 w-64 border-l border-slate-200 dark:border-slate-700">Conducta/Tratamiento</th>
                <th className="p-2 w-12 border-l border-slate-200 dark:border-slate-700 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                  <td className="p-2 text-center text-xs font-bold text-slate-400 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10 border-r border-slate-200 dark:border-slate-700">{index + 1}</td>
                  
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.ci} onChange={(e) => updateRow(row.id, 'ci', e.target.value)} placeholder="Ej. V-123456" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.patientName} onChange={(e) => updateRow(row.id, 'patientName', e.target.value)} placeholder="Nombres y Apellidos" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="date" value={row.birthDate} onChange={(e) => updateRow(row.id, 'birthDate', e.target.value)} className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 [color-scheme:light] dark:[color-scheme:dark]" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.address} onChange={(e) => updateRow(row.id, 'address', e.target.value)} placeholder="Dirección completa" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <select value={row.gender} onChange={(e) => updateRow(row.id, 'gender', e.target.value)} className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 cursor-pointer">
                      <option value="">-</option><option value="M">M</option><option value="F">F</option>
                    </select>
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="number" min="0" value={row.age} onChange={(e) => updateRow(row.id, 'age', e.target.value)} placeholder="0" className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 font-mono outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <select value={row.ageUnit} onChange={(e) => updateRow(row.id, 'ageUnit', e.target.value)} className="w-full h-full px-1 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 cursor-pointer">
                      <option value="Y">Años</option><option value="M">Meses</option><option value="D">Días</option>
                    </select>
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.indigenous} onChange={(e) => updateRow(row.id, 'indigenous', e.target.value)} placeholder="Etnia" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.education} onChange={(e) => updateRow(row.id, 'education', e.target.value)} placeholder="Nivel Educativo" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.disability} onChange={(e) => updateRow(row.id, 'disability', e.target.value)} placeholder="Discapacidad" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <select value={row.lactation} onChange={(e) => updateRow(row.id, 'lactation', e.target.value)} className="w-full h-full px-1 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 cursor-pointer">
                      <option value="">-</option><option value="EXC">Exclusiva</option><option value="MIX">Mixta</option><option value="NO">No</option>
                    </select>
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="number" min="0" value={row.pregnantWeeks} onChange={(e) => updateRow(row.id, 'pregnantWeeks', e.target.value)} placeholder="Semanas" className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="number" min="0" value={row.pregnantGestas} onChange={(e) => updateRow(row.id, 'pregnantGestas', e.target.value)} placeholder="N° Gestas" className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <select value={row.pregnantRisk} onChange={(e) => updateRow(row.id, 'pregnantRisk', e.target.value)} className="w-full h-full px-1 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 cursor-pointer">
                      <option value="">-</option><option value="BAJO">Bajo Riesgo</option><option value="ALTO">Alto Riesgo</option>
                    </select>
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <select value={row.puerperium} onChange={(e) => updateRow(row.id, 'puerperium', e.target.value)} className="w-full h-full px-1 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 cursor-pointer">
                      <option value="">-</option><option value="SI">Sí</option><option value="NO">No</option>
                    </select>
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.weight} onChange={(e) => updateRow(row.id, 'weight', e.target.value)} placeholder="kg" className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.height} onChange={(e) => updateRow(row.id, 'height', e.target.value)} placeholder="cm" className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.headCircumference} onChange={(e) => updateRow(row.id, 'headCircumference', e.target.value)} placeholder="cm" className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.breastExam} onChange={(e) => updateRow(row.id, 'breastExam', e.target.value)} placeholder="Resultado" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.papSmear} onChange={(e) => updateRow(row.id, 'papSmear', e.target.value)} placeholder="Resultado" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700 relative">
                    <Cie10Autocomplete 
                      value={row.cie10} 
                      onChange={(code) => updateRow(row.id, 'cie10', code)} 
                    />
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <select value={row.consultationType} onChange={(e) => updateRow(row.id, 'consultationType', e.target.value)} className="w-full h-full px-1 py-2 text-[11px] text-center text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 cursor-pointer">
                      <option value="">-</option><option value="P">Primera (P)</option><option value="S">Sucesiva (S)</option><option value="A">Asociado (A)</option>
                    </select>
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <select value={row.diagnosticType} onChange={(e) => updateRow(row.id, 'diagnosticType', e.target.value)} className="w-full h-full px-1 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500 cursor-pointer">
                      <option value="">-</option><option value="SUS">Sospechoso</option><option value="PRO">Probable</option><option value="CON">Confirmado</option><option value="NA">No Aplica</option>
                    </select>
                  </td>
                  <td className="p-0 border-l border-slate-200 dark:border-slate-700">
                    <input type="text" value={row.treatment} onChange={(e) => updateRow(row.id, 'treatment', e.target.value)} placeholder="Tratamiento/Conducta" className="w-full h-full px-2 py-2 text-[11px] text-slate-800 dark:text-slate-200 outline-none bg-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-800 focus:ring-1 focus:ring-inset focus:ring-blue-500" />
                  </td>
                  
                  <td className="p-1 border-l border-slate-200 dark:border-slate-700 text-center">
                    <button onClick={() => removeRow(row.id)} className="p-1 text-slate-400 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded" title="Eliminar fila">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 sticky left-0 z-10 w-fit">
            <button 
              onClick={addRow}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-3 py-2 rounded transition-colors active:scale-95"
            >
              <Plus size={14} /> AGREGAR FILA DE REGISTRO
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg border border-amber-100 dark:border-amber-900/30">
          <AlertCircle size={14} className="shrink-0" />
          Asegúrese de presionar guardar antes de cambiar de establecimiento o fecha.
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-sm font-bold rounded-lg shadow-sm transition-all active:scale-95"
        >
          <Save size={16} />
          GUARDAR LOTE (DHIS2)
        </button>
      </div>
    </div>
  );
}
