import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Search, Folder, FolderOpen, MapPin, Building2, Hospital } from 'lucide-react';
import { HEALTH_HIERARCHY } from '../data/hierarchy';
import { useAppContext } from '../context/AppContext';

export default function OrgUnitTree() {
  const { location, setLocation, user } = useAppContext();
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    [HEALTH_HIERARCHY.state]: true
  });
  const [searchTerm, setSearchTerm] = useState('');

  const toggleNode = (node: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [node]: !prev[node] }));
  };

  const handleSelectState = () => {
    setLocation({
      state: HEALTH_HIERARCHY.state,
      asic: '',
      cpt: '',
      orgUnitId: 'STATE_BARINAS'
    });
  };

  const handleSelectAsic = (asicName: string) => {
    const asic = HEALTH_HIERARCHY.asics.find(a => a.name === asicName);
    if (asic) {
      setLocation({ 
        state: HEALTH_HIERARCHY.state, 
        asic: asicName, 
        cpt: '', 
        orgUnitId: `ASIC_${asicName}` 
      });
    }
  };

  const handleSelectCpt = (asicName: string, cptName: string, cptId: string) => {
    setLocation({ 
      state: HEALTH_HIERARCHY.state, 
      asic: asicName, 
      cpt: cptName, 
      orgUnitId: cptId 
    });
  };

  // RBAC Filtering for OrgUnitTree
  const asicsToDisplay = user.level === 'L2_LOCAL' && user.asicAccess
    ? HEALTH_HIERARCHY.asics.filter(a => a.name === user.asicAccess)
    : HEALTH_HIERARCHY.asics;

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-64 lg:w-72 flex-shrink-0">
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <h3 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Organización (DHIS2)</h3>
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar unidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-900 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
          {/* State Level */}
          <div className="mb-1">
            <div 
              className={`flex items-center gap-1.5 py-1 px-1 rounded cursor-pointer ${
                !location.asic && !location.cpt ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300' : 'hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
              onClick={(e) => {
                toggleNode(HEALTH_HIERARCHY.state, e);
                handleSelectState();
              }}
            >
              {expandedNodes[HEALTH_HIERARCHY.state] ? (
                <ChevronDown size={14} className="text-slate-400 shrink-0" />
              ) : (
                <ChevronRight size={14} className="text-slate-400 shrink-0" />
              )}
              {expandedNodes[HEALTH_HIERARCHY.state] ? (
                <FolderOpen size={14} className={!location.asic && !location.cpt ? "text-indigo-600 dark:text-indigo-400" : "text-blue-500 dark:text-blue-400"} />
              ) : (
                <Folder size={14} className={!location.asic && !location.cpt ? "text-indigo-600 dark:text-indigo-400" : "text-blue-500 dark:text-blue-400"} />
              )}
              <span className={`truncate ${!location.asic && !location.cpt ? 'font-bold' : ''}`}>{HEALTH_HIERARCHY.state}</span>
            </div>

            {/* ASIC Level */}
            {expandedNodes[HEALTH_HIERARCHY.state] && (
              <div className="ml-3 pl-2 border-l border-slate-200 dark:border-slate-700">
                {asicsToDisplay.map(asic => (
                  <div key={asic.name} className="mb-1">
                    <div 
                      className={`flex items-center gap-1.5 py-1 px-1 rounded cursor-pointer ${
                        location.asic === asic.name && !expandedNodes[asic.name] ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300' : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                      onClick={(e) => {
                        toggleNode(asic.name, e);
                        handleSelectAsic(asic.name);
                      }}
                    >
                      {expandedNodes[asic.name] ? (
                        <ChevronDown size={14} className="text-slate-400 shrink-0" />
                      ) : (
                        <ChevronRight size={14} className="text-slate-400 shrink-0" />
                      )}
                      <Building2 size={14} className={location.asic === asic.name ? "text-blue-600 dark:text-blue-400 shrink-0" : "text-slate-500 dark:text-slate-400 shrink-0"} />
                      <span className={`truncate ${location.asic === asic.name ? 'font-bold' : ''}`}>{asic.name}</span>
                    </div>

                    {/* CPT Level */}
                    {expandedNodes[asic.name] && (
                      <div className="ml-3 pl-2 border-l border-slate-200 dark:border-slate-700">
                        {asic.units
                          .filter(u => !searchTerm || u.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(unit => {
                          const isSelected = location.cpt === unit.name;
                          return (
                            <div 
                              key={unit.id}
                              className={`flex items-center gap-1.5 py-1 px-1 rounded cursor-pointer ${
                                isSelected ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 font-bold' : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                              onClick={() => handleSelectCpt(asic.name, unit.name, unit.id)}
                            >
                              <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                                {unit.type === 'Hospital' ? (
                                  <Hospital size={12} className={isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"} />
                                ) : (
                                  <MapPin size={12} className={isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"} />
                                )}
                              </div>
                              <span className="truncate leading-tight">{unit.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
