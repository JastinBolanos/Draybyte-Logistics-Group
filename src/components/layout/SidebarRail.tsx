import React from 'react';
import {
  Truck,
  Package,
  Boxes,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Settings,
  PanelLeftClose,
  ChevronLeft,
  ChevronRight,
  Plus,
  QrCode,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, NavItemConfig } from '../../domain/navigation';
import { useLanguage } from '../../i18n/LanguageContext';
import { APP_CONFIG } from '../../utils/constants';
import { SupplyChainKPIs } from '../../types/logistics';

interface SidebarRailProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenWelcome: () => void;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
  onNewShipment?: () => void;
  onScanBarcode?: () => void;
  kpis?: SupplyChainKPIs;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const SidebarRail: React.FC<SidebarRailProps> = ({
  activeTab,
  onSelectTab,
  onOpenWelcome,
  isExpanded = false,
  onToggleExpanded,
  onNewShipment,
  onScanBarcode,
  kpis,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const { t } = useLanguage();

  const sideNavItems: (NavItemConfig & { description: string; count?: string | number; alert?: boolean; badge?: string })[] = [
    {
      id: 'fleet',
      label: t.sidebar.fleet,
      description: t.sidebar.fleetDesc,
      icon: Truck,
      count: kpis ? `${kpis.fleetInTransit}/${kpis.totalActiveFleet}` : undefined
    },
    {
      id: 'shipments',
      label: t.sidebar.shipments,
      description: t.sidebar.shipmentsDesc,
      icon: Package,
      count: kpis?.activeShipmentsCount
    },
    {
      id: 'inventory',
      label: t.sidebar.inventory,
      description: t.sidebar.inventoryDesc,
      icon: Boxes,
      count: '4 Hubs'
    },
    {
      id: 'incidents',
      label: t.sidebar.incidents,
      description: t.sidebar.incidentsDesc,
      icon: AlertTriangle,
      count: kpis?.activeIncidentsCount,
      alert: (kpis?.activeIncidentsCount || 0) > 0
    },
    {
      id: 'optimizer',
      label: t.sidebar.optimizer,
      description: t.sidebar.optimizerDesc,
      icon: Sparkles,
      badge: 'AI'
    },
    {
      id: 'analytics',
      label: t.sidebar.analytics,
      description: t.sidebar.analyticsDesc,
      icon: BarChart3
    }
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP PERMANENT SIDEBAR RAIL (VISIBLE ONLY ON md: AND ABOVE)        */}
      {/* ========================================================================= */}
      <aside
        id="main-sidebar-rail"
        aria-label="Panel lateral de navegación"
        className={`hidden md:flex bg-slate-50 flex-col shrink-0 z-40 border-r border-slate-200 transition-all duration-300 ease-in-out select-none ${
          isExpanded ? 'w-64 sm:w-72 py-4 px-3.5' : 'w-16 py-4 items-center gap-4'
        }`}
      >
        {/* Top Header Section when Expanded */}
        {isExpanded ? (
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 px-1">
            <button
              onClick={onOpenWelcome}
              id="btn-sidebar-brand"
              title="Volver al Portal de Bienvenida"
              className="flex items-center gap-3 group text-left cursor-pointer transition-transform active:scale-95"
            >
              <div className="relative flex items-center justify-center shrink-0">
                {/* Expansive soft backlighting glow */}
                <div className="absolute -inset-2.5 rounded-2xl bg-slate-400/20 blur-md animate-logo-aura pointer-events-none" />
                <div className="absolute -inset-1 rounded-xl bg-slate-950/10 blur-xs pointer-events-none" />
                
                {/* Silver-metallic orbital ribbon loops */}
                <div className="absolute -inset-[2px] rounded-xl overflow-hidden pointer-events-none">
                  <div className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 animate-logo-spin bg-[conic-gradient(from_0deg,transparent_0_220deg,#64748b_280deg,#e2e8f0_320deg,#94a3b8_340deg,#0f172a_360deg)] opacity-80" />
                </div>

                {/* Core DB Box - Negro Plateado */}
                <div className="relative w-10 h-10 bg-slate-950 group-hover:bg-slate-900 rounded-xl flex items-center justify-center text-white font-seal font-bold text-sm tracking-wider shadow-md shadow-slate-950/30 border border-slate-800/90 shrink-0 transition-colors z-10">
                  <span className="relative z-10">{APP_CONFIG.BRAND_SHORT}</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
                </div>
              </div>
              <div className="overflow-hidden">
                <h2 className="text-slate-900 font-bold text-sm tracking-tight leading-tight group-hover:text-slate-700 transition-colors truncate">
                  {APP_CONFIG.APP_NAME}
                </h2>
                <p className="text-[10px] text-slate-500 font-mono tracking-wider truncate">
                  CONTROL TOWER
                </p>
              </div>
            </button>

            {/* Close Button when Expanded */}
            {onToggleExpanded && (
              <button
                onClick={onToggleExpanded}
                id="btn-toggle-sidebar-tray"
                title={t.sidebar.closeTray}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-all cursor-pointer flex items-center justify-center bg-white border border-slate-200 shadow-xs"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          /* When Collapsed: Clean Menú button */
          onToggleExpanded && (
            <div className="w-full px-2">
              <button
                onClick={onToggleExpanded}
                id="btn-open-tray-collapsed"
                title={t.sidebar.openTray}
                className="w-full py-2 px-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-indigo-700 hover:text-indigo-800 text-[10px] font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4 text-indigo-600" />
                <span className="text-[9px] font-bold leading-none tracking-wide">MENÚ</span>
              </button>
            </div>
          )
        )}

        {/* Main Navigation Section */}
        <div className={`flex-1 flex flex-col overflow-y-auto overflow-x-hidden ${isExpanded ? 'gap-4 mt-2 pr-1' : 'gap-2'}`}>
          {/* Navigation Items List */}
          <nav className={`flex flex-col ${isExpanded ? 'gap-1.5' : 'gap-2 text-slate-500'}`}>
            {sideNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              if (isExpanded) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    id={`nav-item-expanded-${item.id}`}
                    className={`group w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-slate-600 group-hover:text-indigo-600 group-hover:bg-indigo-50 border border-slate-200/80 shadow-xs'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                          {item.label}
                        </span>
                        {item.count !== undefined && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold shrink-0 ${
                              item.alert
                                ? 'bg-rose-500 text-white animate-pulse'
                                : isActive
                                ? 'bg-white/25 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0 ${
                              isActive ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-[10px] truncate ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              }

              // Collapsed rail mode
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  id={`nav-item-collapsed-${item.id}`}
                  title={`${item.label} — ${item.description}`}
                  className={`relative p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-xs'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.alert && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse border border-white" />
                  )}
                  {item.badge && !isActive && (
                    <span className="absolute -bottom-1 text-[8px] bg-indigo-600 text-white px-1 rounded-full font-bold">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions in Expanded Mode */}
          {isExpanded && (
            <div className="mt-2 pt-3 border-t border-slate-200 space-y-2">
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                {t.sidebar.quickActions}
              </span>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {onNewShipment && (
                  <button
                    onClick={onNewShipment}
                    id="btn-sidebar-new-shipment"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="truncate">Despacho</span>
                  </button>
                )}
                {onScanBarcode && (
                  <button
                    onClick={onScanBarcode}
                    id="btn-sidebar-scan"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200 transition-colors cursor-pointer shadow-xs"
                  >
                    <QrCode className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate">Escanear</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Utility & Status Strip */}
        <div className={`mt-auto pt-3 border-t border-slate-200 ${isExpanded ? 'space-y-2 px-1' : 'flex flex-col items-center gap-3'}`}>
          {isExpanded ? (
            <>
              {/* Bottom Controls */}
              <div className="flex items-center justify-between gap-1">
                <button
                  onClick={() => alert('Panel de Configuración de Servidores & Telemetría')}
                  id="btn-sidebar-settings-expanded"
                  className="flex-1 flex items-center gap-2 px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  <span>{t.sidebar.settings}</span>
                </button>

                {onToggleExpanded && (
                  <button
                    onClick={onToggleExpanded}
                    id="btn-collapse-sidebar-bottom"
                    title={t.sidebar.closeTray}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline text-[10px]">Contraer</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div
                title="Conexión Satelital Cifrada (0.4ms)"
                className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-500/20"
              />
              <button
                title="Configuración del Sistema"
                onClick={() => alert('Panel de Configuración de Servidores & Telemetría')}
                id="btn-sidebar-settings-collapsed"
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE DRAWER OVERLAY / BANDEJA MÓVIL (VISIBLE EN CELULAR AL ABRIR)   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden flex"
            role="dialog"
            aria-modal="true"
            aria-label="Bandeja de navegación móvil"
          >
            {/* Fondo Oscuro / Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs cursor-pointer"
              aria-hidden="true"
            />

            {/* Bandeja Deslizante Lateral / Slide-Over Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-80 max-w-[85vw] bg-slate-50 h-full shadow-2xl flex flex-col z-10 border-r border-slate-200 py-4 px-4 overflow-y-auto select-none"
            >
              {/* Encabezado de la Bandeja Móvil */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <button
                  onClick={() => {
                    onOpenWelcome();
                    onCloseMobile?.();
                  }}
                  id="btn-sidebar-brand-mobile"
                  title="Volver al Portal de Bienvenida"
                  className="flex items-center gap-3 group text-left cursor-pointer transition-transform active:scale-95"
                >
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute -inset-2.5 rounded-2xl bg-slate-400/20 blur-md animate-logo-aura pointer-events-none" />
                    <div className="absolute -inset-1 rounded-xl bg-slate-950/10 blur-xs pointer-events-none" />
                    <div className="absolute -inset-[2px] rounded-xl overflow-hidden pointer-events-none">
                      <div className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 animate-logo-spin bg-[conic-gradient(from_0deg,transparent_0_220deg,#64748b_280deg,#e2e8f0_320deg,#94a3b8_340deg,#0f172a_360deg)] opacity-80" />
                    </div>
                    <div className="relative w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-white font-seal font-bold text-sm tracking-wider shadow-md shadow-slate-950/30 border border-slate-800/90 shrink-0 z-10">
                      <span className="relative z-10">{APP_CONFIG.BRAND_SHORT}</span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="text-slate-900 font-bold text-sm tracking-tight leading-tight">
                      {APP_CONFIG.APP_NAME}
                    </h2>
                    <p className="text-[10px] text-slate-500 font-mono tracking-wider">
                      CONTROL TOWER
                    </p>
                  </div>
                </button>

                {/* Botón Cerrar Bandeja */}
                <button
                  onClick={onCloseMobile}
                  id="btn-close-sidebar-mobile"
                  title="Cerrar bandeja"
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-all cursor-pointer flex items-center justify-center bg-white border border-slate-200 shadow-xs active:scale-95"
                  aria-label="Cerrar bandeja"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              {/* Lista de Navegación en Bandeja Móvil */}
              <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden gap-4 mt-3 pr-1">
                <nav className="flex flex-col gap-1.5">
                  {sideNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectTab(item.id);
                          onCloseMobile?.();
                        }}
                        id={`nav-item-mobile-${item.id}`}
                        className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 border border-transparent hover:border-slate-200'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-slate-600 group-hover:text-indigo-600 group-hover:bg-indigo-50 border border-slate-200/80 shadow-xs'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                              {item.label}
                            </span>
                            {item.count !== undefined && (
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold shrink-0 ${
                                  item.alert
                                    ? 'bg-rose-500 text-white animate-pulse'
                                    : isActive
                                    ? 'bg-white/25 text-white'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {item.count}
                              </span>
                            )}
                            {item.badge && (
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0 ${
                                  isActive ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-[10px] truncate ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Acciones Rápidas Móvil */}
                <div className="mt-2 pt-3 border-t border-slate-200 space-y-2">
                  <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    {t.sidebar.quickActions}
                  </span>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {onNewShipment && (
                      <button
                        onClick={() => {
                          onCloseMobile?.();
                          onNewShipment();
                        }}
                        id="btn-sidebar-new-shipment-mobile"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="truncate">Despacho</span>
                      </button>
                    )}
                    {onScanBarcode && (
                      <button
                        onClick={() => {
                          onCloseMobile?.();
                          onScanBarcode();
                        }}
                        id="btn-sidebar-scan-mobile"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition-colors cursor-pointer shadow-xs active:scale-95"
                      >
                        <QrCode className="w-4 h-4 text-slate-500" />
                        <span className="truncate">Escanear</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Pie de Bandeja Móvil */}
              <div className="mt-auto pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between gap-1">
                  <button
                    onClick={() => alert('Panel de Configuración de Servidores & Telemetría')}
                    id="btn-sidebar-settings-mobile"
                    className="flex-1 flex items-center gap-2 px-2.5 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    <span>{t.sidebar.settings}</span>
                  </button>
                  <div
                    title="Conexión Satelital Cifrada (0.4ms)"
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-emerald-700">ONLINE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

