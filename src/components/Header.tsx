import React from 'react';
import {
  Truck,
  Package,
  Boxes,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Search,
  Plus,
  QrCode,
  Activity,
  Play,
  Pause,
  Clock,
  RefreshCw
} from 'lucide-react';
import { SupplyChainKPIs } from '../types/logistics';
import { UserSession } from './AuthModal';
import { useLanguage, LanguageToggle } from '../i18n/LanguageContext';

export type ActiveTab = 'fleet' | 'shipments' | 'inventory' | 'incidents' | 'optimizer' | 'analytics';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  kpis: SupplyChainKPIs;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSimulating: boolean;
  setIsSimulating: (val: boolean) => void;
  isDense: boolean;
  setIsDense: (val: boolean) => void;
  onNewShipment: () => void;
  onScanBarcode: () => void;
  lastSyncTime: string;
  onManualRefresh: () => void;
  onOpenWelcome?: () => void;
  userSession?: UserSession | null;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  kpis,
  searchQuery,
  setSearchQuery,
  isSimulating,
  setIsSimulating,
  isDense,
  setIsDense,
  onNewShipment,
  onScanBarcode,
  lastSyncTime,
  onManualRefresh,
  onOpenWelcome,
  userSession,
  onOpenAuth,
  onSignOut
}) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'fleet', label: t.header.tabFleet, icon: Truck, count: `${kpis.fleetInTransit}/${kpis.totalActiveFleet}` },
    { id: 'shipments', label: t.header.tabShipments, icon: Package, count: kpis.activeShipmentsCount },
    { id: 'inventory', label: t.header.tabInventory, icon: Boxes, count: '4 Hubs' },
    { id: 'incidents', label: t.header.tabIncidents, icon: AlertTriangle, count: kpis.activeIncidentsCount, alert: kpis.activeIncidentsCount > 0 },
    { id: 'optimizer', label: t.header.tabOptimizer, icon: Sparkles, badge: 'AI' },
    { id: 'analytics', label: t.header.tabAnalytics, icon: BarChart3 }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shrink-0">
      {/* Top Telemetry Ticker Bar */}
      <div className="bg-slate-900 text-slate-400 text-xs px-6 sm:px-8 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSimulating ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSimulating ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[10px]">
              {t.header.telemetryCore}
            </span>
            <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-700">
              {t.header.corridorTag}
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-3 text-slate-400 text-[11px] border-l border-slate-800 pl-3">
            <span>{t.header.activeFleet} <strong className="text-white font-mono">{kpis.fleetInTransit} {t.units}</strong></span>
            <span className="text-slate-700">•</span>
            <span>{t.header.otdPunctuality} <strong className="text-emerald-400 font-mono">{kpis.onTimeDeliveryRate}%</strong></span>
            <span className="text-slate-700">•</span>
            <span>{t.header.hubOccupancy} <strong className="text-indigo-300 font-mono">{kpis.warehouseUtilizationAvg}%</strong></span>
            <span className="text-slate-700">•</span>
            <span>{t.header.valueInTransit} <strong className="text-white font-mono">${(kpis.totalInventoryValuationUsd / 1000000).toFixed(2)}M USD</strong></span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <div className="flex items-center space-x-1 text-slate-400">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="font-mono">{lastSyncTime}</span>
          </div>

          <button
            onClick={() => setIsSimulating(!isSimulating)}
            title={isSimulating ? "Pausar telemetría" : "Iniciar telemetría"}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
              isSimulating ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900' : 'bg-amber-950/80 text-amber-300 border border-amber-700/60 hover:bg-amber-900'
            }`}
          >
            {isSimulating ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-amber-400" />}
            <span>{isSimulating ? t.header.liveTelemetry : t.header.pausedTelemetry}</span>
          </button>

          <button
            onClick={onManualRefresh}
            title={t.refresh}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
          </button>

          {/* Compact language switcher in ticker */}
          <div className="border-l border-slate-700 pl-2">
            <LanguageToggle variant="compact" />
          </div>
        </div>
      </div>

      {/* Main Command Header Bar */}
      <div className="h-16 px-6 sm:px-8 flex items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenWelcome}
              title={t.header.mainPortal}
              className="text-left group cursor-pointer flex items-center gap-2.5"
            >
              <span className="font-seal text-xs bg-slate-950 text-white w-7 h-7 rounded-md flex items-center justify-center font-bold group-hover:bg-indigo-600 transition-colors">
                DB
              </span>
              <div>
                <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {t.header.brandTitle}
                </h1>
                <p className="text-[10px] text-slate-500 font-mono-tech">
                  {t.header.brandSubtitle}
                </p>
              </div>
            </button>

            <span className="hidden sm:flex px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200/80 items-center gap-1.5 font-mono-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.header.systemsOnline}
            </span>
          </div>
        </div>

        {/* Global Search, Language Toggle, Actions & User Profile */}
        <div className="flex items-center gap-2.5">
          {onOpenWelcome && (
            <button
              onClick={onOpenWelcome}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
            >
              <span>{t.header.mainPortal}</span>
            </button>
          )}

          {/* Prominent Language Switcher in Header */}
          <LanguageToggle variant="header" />

          <div className="relative w-44 sm:w-56 md:w-64">
            <input
              type="text"
              placeholder={t.header.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border border-transparent rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            />
            <Search className="absolute left-3 top-2 text-slate-400 w-3.5 h-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => setIsDense(!isDense)}
            className={`hidden sm:inline-flex px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              isDense ? 'bg-slate-800 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title={isDense ? t.standard : t.compact}
          >
            {isDense ? t.compact : t.standard}
          </button>

          <button
            onClick={onScanBarcode}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden md:inline">{t.header.scanButton}</span>
          </button>

          <button
            onClick={onNewShipment}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.header.newShipmentButton}</span>
          </button>

          {/* User Profile / Demo Mode Status */}
          {userSession?.isDemo ? (
            <div className="flex items-center space-x-2 pl-1">
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-mono-tech">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>{t.auth.demoBannerText}</span>
              </div>
              <button
                onClick={() => onOpenAuth?.('login')}
                id="btn-header-login"
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.auth.btnLogin}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 pl-1">
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-[11px] font-bold text-slate-800 leading-none">
                  {userSession?.name || 'Director General'}
                </span>
                <span className="text-[9px] font-mono-tech text-indigo-700 font-semibold uppercase">
                  {userSession?.role === 'director' ? 'Nivel 5 • C-Level' : 'Nivel 4 • Operativo'}
                </span>
              </div>
              <div
                onClick={() => onOpenAuth?.('login')}
                title={`${userSession?.email || 'director@draybyte.com'} • Cambiar Cuenta`}
                className="w-8 h-8 rounded-full bg-slate-950 text-white overflow-hidden border border-slate-700 shrink-0 flex items-center justify-center font-bold text-xs uppercase cursor-pointer hover:ring-2 hover:ring-indigo-400 transition-all"
              >
                {userSession?.name ? userSession.name.slice(0, 2).toUpperCase() : 'DB'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sleek Tabs Navigation Bar */}
      <nav className="px-6 sm:px-8 flex items-center space-x-1 overflow-x-auto border-t border-slate-200 bg-slate-50/70 text-xs py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                    tab.alert
                      ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse'
                      : isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.2 rounded-full font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
