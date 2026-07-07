import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface SaaSModuleConfig {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface SaaSConfig {
  appName: string;
  appTitle: string;
  welcomeMessage: string;
  loginSubtitle: string;
  primaryLogoUrl: string;
  parameters: {
    maintenanceMode: boolean;
    epiAlertThreshold: number;
    sefarLowStockThreshold: number;
    requireLocationForDataEntry: boolean;
    hrAbsenceThreshold: number;
    sacsPenaltyAmount: number;
    networkUptimeGoal: number;
    programsGoalThreshold: number;
  };
  modules: Record<string, SaaSModuleConfig>;
}

const DEFAULT_CONFIG: SaaSConfig = {
  appName: 'Sistema Salas',
  appTitle: 'Sistema Integrado de Análisis de Datos',
  welcomeMessage: 'Panel de Control Central',
  loginSubtitle: 'Acceso Restringido - Nivel de Seguridad',
  primaryLogoUrl: '', // empty means use default icon
  parameters: {
    maintenanceMode: false,
    epiAlertThreshold: 80,
    sefarLowStockThreshold: 15,
    requireLocationForDataEntry: true,
    hrAbsenceThreshold: 5,
    sacsPenaltyAmount: 150,
    networkUptimeGoal: 95,
    programsGoalThreshold: 85,
  },
  modules: {
    home: { id: 'home', name: 'Workspace (Inicio)', description: 'Dashboard principal', active: true },
    epidemiology: { id: 'epidemiology', name: 'Epidemiología', description: 'Análisis estadístico puro y respuesta a brotes. Canal Endémico y mapas de calor.', active: true },
    stats: { id: 'stats', name: 'Estadística (CEIS)', description: 'Sistema Integrado de Análisis de Datos y carga de reportes DHIS2.', active: true },
    logistics: { id: 'logistics', name: 'SEFAR (Logística)', description: 'Cadena de suministro, control de inventario y fechas de caducidad.', active: true },
    hr: { id: 'hr', name: 'Talento Humano', description: 'Gestión de turnos, guardias, ausencias y nómina de médicos y enfermeras.', active: true },
    sacs: { id: 'sacs', name: 'Contraloría (SACS)', description: 'Inspecciones a comercios, flujos de aprobación y permisos sanitarios.', active: true },
    networks: { id: 'networks', name: 'Redes de Salud', description: 'Monitoreo técnico de que los hospitales y ambulatorios estén abiertos y funcionando.', active: true },
    programs: { id: 'programs', name: 'Programas de Salud', description: 'Seguimiento de cohortes de pacientes crónicos y cumplimiento de metas.', active: true }
  }
};

interface SaaSState {
  config: SaaSConfig;
  updateConfig: (newConfig: Partial<SaaSConfig>) => void;
  updateModule: (moduleId: string, data: Partial<SaaSModuleConfig>) => void;
  resetConfig: () => void;
}

const SaaSContext = createContext<SaaSState | undefined>(undefined);

export const SaaSProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<SaaSConfig>(() => {
    const saved = localStorage.getItem('saasConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          parameters: {
            ...DEFAULT_CONFIG.parameters,
            ...(parsed.parameters || {})
          },
          modules: {
            ...DEFAULT_CONFIG.modules,
            ...(parsed.modules || {})
          }
        };
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('saasConfig', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<SaaSConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const updateModule = (moduleId: string, data: Partial<SaaSModuleConfig>) => {
    setConfig(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          ...data
        }
      }
    }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <SaaSContext.Provider value={{ config, updateConfig, updateModule, resetConfig }}>
      {children}
    </SaaSContext.Provider>
  );
};

export const useSaaSContext = () => {
  const context = useContext(SaaSContext);
  if (!context) throw new Error('useSaaSContext must be used within SaaSProvider');
  return context;
};
