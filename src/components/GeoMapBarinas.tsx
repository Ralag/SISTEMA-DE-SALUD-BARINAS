import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { HEALTH_HIERARCHY } from '../data/hierarchy';
import { Building2, Activity, MapPin, CheckCircle2, XCircle, Filter } from 'lucide-react';

// Deterministic random number generator based on string
function seedRandom(seed: string) {
  let h = 0xdeadbeef;
  for(let i = 0; i < seed.length; i++)
      h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
  return function() {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
  }
}

function generateCoords(seedStr: string, isAsic: boolean = true) {
  const rng = seedRandom(seedStr);
  // Barinas approx bounds: Lat 7.3 to 8.9, Lng -71.5 to -69.5
  // But let's cluster closer to Barinas city (8.62, -70.20) mostly
  const baseLat = 8.62;
  const baseLng = -70.20;
  const range = isAsic ? 0.8 : 0.05; 
  
  const lat = baseLat + ((rng() % 1000) / 1000 - 0.5) * range;
  const lng = baseLng + ((rng() % 1000) / 1000 - 0.5) * range;
  return [lat, lng] as [number, number];
}

const customIconAsic = new L.DivIcon({
  className: 'bg-transparent',
  html: `<div style="width: 30px; height: 30px; background-color: #1c557a; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

export default function GeoMapBarinas({ selectedAsicName }: { selectedAsicName?: string }) {
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'inactive'>('all');

  const mapData = useMemo(() => {
    let asics = HEALTH_HIERARCHY.asics;
    if (selectedAsicName) {
      asics = asics.filter(a => a.name === selectedAsicName);
    }

    const markers = asics.map(asic => {
      const coords = generateCoords(asic.name, true);
      
      const cpts = asic.units.map(unit => {
        const uCoords = generateCoords(unit.name + asic.name, false);
        // Simulate operativity: 80% active, 20% inactive (deterministcally)
        const rng = seedRandom(unit.name);
        const isActive = (rng() % 10) > 1; // 80% active
        
        return {
          ...unit,
          coords: [coords[0] + (uCoords[0] - 8.62), coords[1] + (uCoords[1] - -70.20)] as [number, number],
          isActive
        };
      });

      return {
        ...asic,
        coords,
        cpts
      };
    });

    return markers;
  }, [selectedAsicName]);

  const filteredData = useMemo(() => {
    return mapData.map(asic => ({
      ...asic,
      cpts: asic.cpts.filter(cpt => {
        if (filterMode === 'active') return cpt.isActive;
        if (filterMode === 'inactive') return !cpt.isActive;
        return true;
      })
    })).filter(asic => filterMode === 'all' || asic.cpts.length > 0);
  }, [mapData, filterMode]);

  const mapCenter: [number, number] = selectedAsicName && mapData.length > 0 ? mapData[0].coords : [8.6226, -70.2075];
  const mapZoom = selectedAsicName ? 11 : 8;

  return (
    <div className="flex flex-col h-full relative border border-slate-200 dark:border-slate-700 rounded overflow-hidden">
      <div className="absolute top-2 right-2 z-[400] bg-white dark:bg-slate-900 p-2 rounded shadow-md border border-slate-200 dark:border-slate-700">
        <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Filter size={12}/> Filtro Operatividad
        </h4>
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
            <input type="radio" name="filterMode" checked={filterMode === 'all'} onChange={() => setFilterMode('all')} className="text-[#1c557a]" />
            Todos los CPTs
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
            <input type="radio" name="filterMode" checked={filterMode === 'active'} onChange={() => setFilterMode('active')} className="text-emerald-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-700"></div> Activos
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
            <input type="radio" name="filterMode" checked={filterMode === 'inactive'} onChange={() => setFilterMode('inactive')} className="text-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-700"></div> Inactivos
          </label>
        </div>
      </div>

      <MapContainer center={mapCenter} zoom={mapZoom} className="w-full h-full min-h-[300px] z-10" scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {filteredData.map(asic => (
          <React.Fragment key={asic.name}>
            {filterMode === 'all' && (
              <Marker position={asic.coords} icon={customIconAsic}>
                <Popup>
                  <div className="text-sm">
                    <strong className="text-[#1c557a] block mb-1">{asic.name}</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-xs uppercase">Sede ASIC</span>
                  </div>
                </Popup>
              </Marker>
            )}

            {asic.cpts.map(cpt => (
              <CircleMarker 
                key={cpt.id} 
                center={cpt.coords} 
                radius={6}
                pathOptions={{ 
                  color: cpt.isActive ? '#047857' : '#be123c', 
                  fillColor: cpt.isActive ? '#10b981' : '#f43f5e', 
                  fillOpacity: 0.8,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="text-sm min-w-[200px]">
                    <strong className="text-slate-800 dark:text-slate-100 block mb-1">{cpt.name}</strong>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-1">
                      <span className="flex items-center gap-1"><Building2 size={12}/> {asic.name}</span>
                      <span className="flex items-center gap-1"><MapPin size={12}/> {cpt.parroquia}, {cpt.municipio}</span>
                    </div>
                    <div className={`mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 font-bold text-xs ${cpt.isActive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {cpt.isActive ? <CheckCircle2 size={14}/> : <XCircle size={14}/>}
                      {cpt.isActive ? 'Operativo (Reportando)' : 'Inactivo (Falla conectividad/equipo)'}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}
