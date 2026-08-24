import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './translations';
import { FleetStatus, ShipmentStatus, CargoType, PriorityLevel, IncidentSeverity } from '../types/logistics';
import { Globe } from 'lucide-react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations['es'];
  translateFleetStatus: (status: FleetStatus) => string;
  translateShipmentStatus: (status: ShipmentStatus) => string;
  translateCargoType: (cargo: CargoType) => string;
  translatePriority: (priority: PriorityLevel) => string;
  translateSeverity: (severity: IncidentSeverity) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_language');
      if (saved === 'es' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'es'; // default Spanish
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const t = translations[language];

  const translateFleetStatus = (status: FleetStatus): string => {
    return t.fleetStatuses[status] || status;
  };

  const translateShipmentStatus = (status: ShipmentStatus): string => {
    return t.shipmentStatuses[status] || status;
  };

  const translateCargoType = (cargo: CargoType): string => {
    return t.cargoTypes[cargo] || cargo;
  };

  const translatePriority = (priority: PriorityLevel): string => {
    return t.priorityLevels[priority] || priority;
  };

  const translateSeverity = (severity: IncidentSeverity): string => {
    return t.incidentSeverities[severity] || severity;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        translateFleetStatus,
        translateShipmentStatus,
        translateCargoType,
        translatePriority,
        translateSeverity
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageToggleProps {
  variant?: 'header' | 'welcome' | 'compact';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'header', className = '' }) => {
  const { language, toggleLanguage, setLanguage } = useLanguage();

  if (variant === 'welcome') {
    return (
      <div className={`inline-flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-300/80 shadow-2xs ${className}`}>
        <button
          onClick={() => setLanguage('es')}
          title="Cambiar a Español"
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            language === 'es'
              ? 'bg-white text-slate-950 shadow-xs border border-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">🇲🇽</span>
          <span>ES</span>
        </button>
        <button
          onClick={() => setLanguage('en')}
          title="Switch to English"
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-white text-slate-950 shadow-xs border border-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">🇺🇸</span>
          <span>EN</span>
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs ${className}`}
      >
        <Globe className="w-3.5 h-3.5 text-indigo-600" />
        <span className="font-mono text-[11px] font-bold uppercase">
          {language === 'es' ? '🇲🇽 ES' : '🇺🇸 EN'}
        </span>
      </button>
    );
  }

  // Default header toggle
  return (
    <button
      onClick={toggleLanguage}
      id="btn-language-toggle"
      title={language === 'es' ? 'Switch interface to English' : 'Cambiar interfaz a Español'}
      className={`group flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50 text-slate-800 transition-all shadow-2xs cursor-pointer ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-indigo-600 group-hover:rotate-12 transition-transform" />
      <div className="flex items-center space-x-1 font-mono text-xs font-bold">
        <span className={language === 'es' ? 'text-indigo-600' : 'text-slate-400'}>ES</span>
        <span className="text-slate-300">/</span>
        <span className={language === 'en' ? 'text-indigo-600' : 'text-slate-400'}>EN</span>
      </div>
      <span className="text-xs">
        {language === 'es' ? '🇲🇽' : '🇺🇸'}
      </span>
    </button>
  );
};
