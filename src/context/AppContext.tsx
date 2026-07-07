import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, SYSTEM_ROLES } from '../types';

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';
export type UIScale = 'compact' | 'normal' | 'large';
export type ThemeMode = 'light' | 'dark' | 'system';
export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

export type ThemeColor = 'blue' | 'emerald' | 'indigo' | 'rose';

interface Location {
  state: string;
  asic: string;
  cpt: string;
  orgUnitId: string;
}

interface AppState {
  location: Location;
  setLocation: (loc: Location) => void;
  
  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
  
  lastSync: Date | null;
  setLastSync: (date: Date | null) => void;

  user: UserRole | null;
  setUser: (user: UserRole | null) => void;

  uiScale: UIScale;
  setUiScale: (scale: UIScale) => void;

  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;







  isAppsOpen: boolean;
  setIsAppsOpen: (isOpen: boolean) => void;

  // Basic stats for dashboard
  stats: {
    epi10Count: number;
    dsp04Count: number;
  };
  incrementEpi10: () => void;
  incrementDsp04: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserRole | null>(null); // Default to null for login screen
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 11);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const [location, setLocation] = useState<Location>({
    state: 'Estado Barinas',
    asic: '',
    cpt: '',
    orgUnitId: 'state_barinas'
  });

  React.useEffect(() => {
    if (user) {
      setLocation({
        state: 'Estado Barinas',
        asic: user.asicAccess || '',
        cpt: user.cptAccess || '',
        orgUnitId: user.cptAccess ? `ou_cpt_${user.cptAccess.toLowerCase().replace(/ /g, '')}` : user.asicAccess ? `ASIC_${user.asicAccess}` : 'state_barinas'
      });
    }
  }, [user]);

  
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const [uiScale, setUiScale] = useState<UIScale>(() => {
    return (localStorage.getItem('uiScale') as UIScale) || 'compact';
  });
  
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('themeMode') as ThemeMode) || 'light';
  });
  
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem('themeColor') as ThemeColor) || 'blue';
  });
  
  const [isAppsOpen, setIsAppsOpen] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('uiScale', uiScale);
    localStorage.setItem('themeMode', themeMode);
    localStorage.setItem('themeColor', themeColor);

    const root = document.documentElement;
    if (uiScale === 'compact') root.style.fontSize = '12px'; // Smaller for compactness
    else if (uiScale === 'large') root.style.fontSize = '16px';
    else root.style.fontSize = '14px';

    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else if (themeMode === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    
    // Set theme color var
    root.setAttribute('data-theme', themeColor);
  }, [uiScale, themeMode, themeColor]);

  const [stats, setStats] = useState({ epi10Count: 0, dsp04Count: 0 });

  const incrementEpi10 = () => setStats(prev => ({ ...prev, epi10Count: prev.epi10Count + 1 }));
  const incrementDsp04 = () => setStats(prev => ({ ...prev, dsp04Count: prev.dsp04Count + 1 }));

  return (
    <AppContext.Provider value={{ 
      location, setLocation, 
      syncStatus, setSyncStatus, 
      lastSync, setLastSync, 
      user, setUser,
      uiScale, setUiScale,
      themeMode, setThemeMode,
      themeColor, setThemeColor,
      isAppsOpen, setIsAppsOpen,
      stats, incrementEpi10, incrementDsp04, toasts, addToast, removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
