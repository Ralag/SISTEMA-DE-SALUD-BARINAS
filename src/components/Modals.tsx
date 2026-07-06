import { X, MapPin, Building2, HelpCircle, ShieldAlert, CheckCircle2, Search, Filter, SlidersHorizontal, ArrowRight, Hospital, HelpCircle as HelpIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState, useMemo } from 'react';
import { HEALTH_HIERARCHY, CptUnit } from '../data/hierarchy';

export { HEALTH_HIERARCHY };

export function LocationModal({ onClose }: { onClose: () => void }) {
  const { location, setLocation } = useAppContext();

  // Estados de selección del Selector Jerárquico
  const [selectedAsic, setSelectedAsic] = useState<string>(location.asic);
  const [selectedType, setSelectedType] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Estado temporal de selección para validar antes de guardar
  const [tempUnit, setTempUnit] = useState<CptUnit | null>(() => {
    // Buscar la unidad actual por id para inicializar
    const currentAsic = HEALTH_HIERARCHY.asics.find(a => a.name === location.asic);
    if (currentAsic) {
      const found = currentAsic.units.find(u => u.id === location.orgUnitId);
      return found || null;
    }
    return null;
  });

  // Filtrar los establecimientos de salud basados en la selección de ASIC, tipo y búsqueda
  const filteredUnits = useMemo(() => {
    const asicData = HEALTH_HIERARCHY.asics.find(a => a.name === selectedAsic);
    if (!asicData) return [];

    return asicData.units.filter(unit => {
      const matchesType = selectedType === 'TODOS' || unit.type === selectedType;
      const matchesSearch = unit.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            unit.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            unit.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedAsic, selectedType, searchQuery]);

  // Validaciones de estado
  const validation = useMemo(() => {
    if (!selectedAsic) {
      return { isValid: false, message: 'Debe seleccionar un Área de Salud Integral (ASIC).', type: 'error' as const };
    }
    if (!tempUnit) {
      return { isValid: false, message: 'Seleccione un establecimiento específico (CPT, Ambulatorio, Hospital o CDI).', type: 'warning' as const };
    }
    
    // Validar coherencia: la unidad seleccionada temporalmente debe pertenecer al ASIC actualmente elegido
    const asicData = HEALTH_HIERARCHY.asics.find(a => a.name === selectedAsic);
    const unitBelongsToAsic = asicData?.units.some(u => u.id === tempUnit.id);
    
    if (!unitBelongsToAsic) {
      return { isValid: false, message: 'El establecimiento seleccionado no pertenece al ASIC configurado en el panel izquierdo.', type: 'error' as const };
    }

    return { 
      isValid: true, 
      message: `¡Selección Válida! Listo para operar en: ${tempUnit.name} (${selectedAsic})`, 
      type: 'success' as const 
    };
  }, [selectedAsic, tempUnit]);

  // Manejar el guardado definitivo y cambio de contexto
  const handleConfirm = () => {
    if (validation.isValid && tempUnit) {
      setLocation({
        state: HEALTH_HIERARCHY.state,
        asic: selectedAsic,
        cpt: tempUnit.name,
        orgUnitId: tempUnit.id
      });
      onClose();
    }
  };

  // Iconos asignados para cada tipo de centro de salud
  const getUnitIcon = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <Hospital className="w-5 h-5 text-rose-600" />;
      case 'Ambulatorio':
        return <Building2 className="w-5 h-5 text-indigo-600" />;
      case 'CDI':
        return <Building2 className="w-5 h-5 text-purple-600" />;
      default:
        return <MapPin className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8 animate-in fade-in backdrop-blur-sm">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] md:h-[80vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200">
        
        {/* Cabecera del Selector Jerárquico */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div>
            <h3 className="text-base font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
              <MapPin className="text-blue-600 w-5 h-5 animate-pulse" /> Selector Jerárquico de Unidades de Salud
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Configure el nivel operacional para las cargas del sistema. Optimizado para tabletas y dispositivos táctiles.
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800 rounded-full transition-all active:scale-95 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mapa Jerárquico Horizontal de Contexto */}
        <div className="bg-white dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
          <span className="text-slate-400 font-normal">Nivel 0:</span>
          <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            🇻🇪 {HEALTH_HIERARCHY.state}
          </span>
          <ArrowRight size={14} className="text-slate-300" />
          <span className="text-slate-400 font-normal">Nivel 1:</span>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded border border-indigo-100">
            🏢 {selectedAsic || 'Seleccione ASIC'}
          </span>
          <ArrowRight size={14} className="text-slate-300" />
          <span className="text-slate-400 font-normal">Nivel 2:</span>
          <span className={`px-3 py-1.5 rounded border ${tempUnit ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100 border-dashed'}`}>
            🏥 {tempUnit ? `${tempUnit.name} [${tempUnit.type}]` : 'Seleccione Centro'}
          </span>
        </div>

        {/* Panel Principal Dividido (Diseño Bento de Alta Densidad) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Columna Izquierda: Selección de ASIC (Nivel 1) */}
          <div className="w-full md:w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col overflow-y-auto shrink-0 p-4 space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                1. Seleccionar ASIC ({HEALTH_HIERARCHY.asics.length})
              </label>
              <div className="space-y-2">
                {HEALTH_HIERARCHY.asics.map(asic => {
                  const isSelected = selectedAsic === asic.name;
                  return (
                    <button
                      key={asic.name}
                      onClick={() => {
                        setSelectedAsic(asic.name);
                        // Resetear selección temporal si cambia de ASIC y no pertenece
                        if (tempUnit && !asic.units.some(u => u.id === tempUnit.id)) {
                          setTempUnit(null);
                        }
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between min-h-[54px] active:scale-[0.98] ${
                        isSelected 
                          ? 'bg-blue-50/70 border-blue-600 text-blue-900 shadow-sm' 
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-sm leading-tight">{asic.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase mt-0.5">Mcpio. {asic.municipality}</span>
                      </div>
                      <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-full ${isSelected ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                        {asic.units.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector de tipo de centro para filtrar */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Filter size={11} /> Filtrar Tipo de Establecimiento
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {['TODOS', 'CPT', 'Ambulatorio', 'Hospital', 'CDI'].map(type => {
                  const isSelected = selectedType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-2.5 py-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Selección de Centro de Salud (Nivel 2) */}
          <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden">
            
            {/* Barra de Búsqueda de Establecimiento */}
            <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <Search size={16} className="text-slate-400 mr-2" />
                <input 
                  type="text"
                  placeholder="Buscar por nombre, código CIE-10 o nivel asistencial..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-600 dark:text-slate-300"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Grid de Establecimientos */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">
                2. Seleccione Establecimiento de Salud ({filteredUnits.length})
              </label>

              {filteredUnits.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredUnits.map(unit => {
                    const isSelected = tempUnit?.id === unit.id;
                    return (
                      <button
                        key={unit.id}
                        onClick={() => setTempUnit(unit)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 min-h-[96px] active:scale-[0.98] cursor-pointer group ${
                          isSelected 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md ring-2 ring-emerald-500/20' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-emerald-200/50' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700/70'
                            }`}>
                              {getUnitIcon(unit.type)}
                            </div>
                            <span className="font-extrabold text-sm leading-snug">{unit.name}</span>
                          </div>
                          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            unit.type === 'Hospital' ? 'bg-rose-100 text-rose-700' :
                            unit.type === 'Ambulatorio' ? 'bg-indigo-100 text-indigo-700' :
                            unit.type === 'CDI' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {unit.type}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-col gap-0.5 text-xs">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">{unit.level}</span>
                          <span className="text-[10px] font-mono text-slate-400">ID: {unit.id}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed p-6">
                  <SlidersHorizontal size={32} className="opacity-30 mb-2" />
                  <p className="text-sm font-bold">No se encontraron establecimientos</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pruebe cambiando los filtros de búsqueda o tipo.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel de Validación y Confirmación de Estado */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Mensajes de Validación Informativos */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              validation.type === 'success' ? 'bg-emerald-100 text-emerald-700' :
              validation.type === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {validation.type === 'success' && <CheckCircle2 size={20} />}
              {validation.type === 'warning' && <HelpCircle size={20} />}
              {validation.type === 'error' && <ShieldAlert size={20} />}
            </div>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${
                validation.type === 'success' ? 'text-emerald-700' :
                validation.type === 'warning' ? 'text-amber-700' : 'text-rose-600'
              }`}>
                Validación de Estado: {validation.type === 'success' ? 'Aprobada' : 'Pendiente'}
              </span>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-tight">
                {validation.message}
              </p>
            </div>
          </div>

          {/* Botón de Guardar / Confirmar Contexto */}
          <button
            onClick={handleConfirm}
            disabled={!validation.isValid}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
              validation.isValid 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            Confirmar y Guardar Contexto
          </button>
        </div>

      </div>
    </div>
  );
}

export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase flex items-center gap-2">
            <HelpIcon size={16} className="text-emerald-600" /> Ayuda y Soporte
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-700 rounded-md transition-colors">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Bienvenido al Sistema de Automatización de Salud. Aquí podrá registrar morbilidad diaria y consolidados mensuales.
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <h4 className="text-xs font-bold text-blue-800 uppercase mb-1">Módulo EPI-10</h4>
            <p className="text-xs text-blue-700">Utilizado para registrar la consulta paciente por paciente con codificación CIE-10. Los datos se envían a DHIS2 como un Tracker Program.</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
            <h4 className="text-xs font-bold text-emerald-800 uppercase mb-1">Módulo DSP04</h4>
            <p className="text-xs text-emerald-700">Consolidado general de la red ambulatoria. Suma las consultas de los CPT y las reporta como un Aggregate DataValueSet al final del mes.</p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Soporte Técnico: 0800-SALUD-BA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
