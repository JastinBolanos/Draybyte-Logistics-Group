import React from 'react';
import {
  Truck,
  Package,
  Boxes,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Settings,
  Home
} from 'lucide-react';
import { ActiveTab, NavItemConfig } from '../../domain/navigation';
import { useLanguage } from '../../i18n/LanguageContext';
import { APP_CONFIG } from '../../utils/constants';

interface SidebarRailProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenWelcome: () => void;
}

export const SidebarRail: React.FC<SidebarRailProps> = ({
  activeTab,
  onSelectTab,
  onOpenWelcome
}) => {
  const { t } = useLanguage();

  const sideNavItems: NavItemConfig[] = [
    { id: 'fleet', label: t.sidebar.fleet, icon: Truck },
    { id: 'shipments', label: t.sidebar.shipments, icon: Package },
    { id: 'inventory', label: t.sidebar.inventory, icon: Boxes },
    { id: 'incidents', label: t.sidebar.incidents, icon: AlertTriangle },
    { id: 'optimizer', label: t.sidebar.optimizer, icon: Sparkles },
    { id: 'analytics', label: t.sidebar.analytics, icon: BarChart3 }
  ];

  return (
    <aside className="w-16 bg-slate-900 flex flex-col items-center py-5 gap-6 shrink-0 z-40 border-r border-slate-800">
      {/* Brand Icon */}
      <button
        onClick={onOpenWelcome}
        title="Volver al Portal de Bienvenida"
        className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-xs select-none cursor-pointer hover:bg-indigo-600 transition-colors"
      >
        {APP_CONFIG.BRAND_SHORT}
      </button>

      {/* Navigation Icon List */}
      <nav className="flex flex-col gap-3 text-slate-400">
        <button
          onClick={onOpenWelcome}
          title="Portal de Inicio"
          className="p-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all cursor-pointer"
        >
          <Home className="w-5 h-5" />
        </button>

        {sideNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={item.label}
              className={`p-2.5 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-500/15 text-indigo-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>

      {/* Bottom Utility Tooltip/Toggle */}
      <div className="mt-auto flex flex-col items-center gap-3">
        <div
          title="Conexión Satelital Cifrada"
          className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
        />
        <button
          title="Configuración del Sistema"
          onClick={() => alert('Panel de Configuración de Servidores & Telemetría')}
          className="p-2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
