import React, { useState, useEffect } from 'react';
import {
  Truck,
  Package,
  Boxes,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Radio,
  ArrowRight,
  ChevronRight,
  Globe2,
  Lock,
  Zap,
  Activity,
  Compass,
  CheckCircle2,
  Cpu,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { SupplyChainKPIs } from '../types/logistics';
import { ActiveTab } from './Header';
import { useLanguage, LanguageToggle } from '../i18n/LanguageContext';

interface WelcomeScreenProps {
  kpis: SupplyChainKPIs;
  onEnterConsole: (targetTab?: ActiveTab) => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ kpis, onEnterConsole, onOpenAuth }) => {
  const { t, language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<string>('director');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const locale = language === 'es' ? 'es-MX' : 'en-US';
      setCurrentTime(
        now.toLocaleDateString(locale, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) + ' — ' + now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC-6'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const quickEntryModules = [
    {
      id: 'fleet' as ActiveTab,
      title: t.welcome.moduleFleetTitle,
      subtitle: `${kpis.fleetInTransit} ${t.welcome.moduleFleetSub}`,
      icon: Truck,
      tag: t.welcome.moduleFleetTag
    },
    {
      id: 'shipments' as ActiveTab,
      title: t.welcome.moduleShipmentsTitle,
      subtitle: `${kpis.activeShipmentsCount} ${t.welcome.moduleShipmentsSub}`,
      icon: Package,
      tag: t.welcome.moduleShipmentsTag
    },
    {
      id: 'optimizer' as ActiveTab,
      title: t.welcome.moduleOptimizerTitle,
      subtitle: t.welcome.moduleOptimizerSub,
      icon: Sparkles,
      tag: t.welcome.moduleOptimizerTag
    },
    {
      id: 'inventory' as ActiveTab,
      title: t.welcome.moduleInventoryTitle,
      subtitle: `${kpis.warehouseUtilizationAvg}% ${t.welcome.moduleInventorySub}`,
      icon: Boxes,
      tag: t.welcome.moduleInventoryTag
    },
    {
      id: 'analytics' as ActiveTab,
      title: t.welcome.moduleAnalyticsTitle,
      subtitle: `${kpis.onTimeDeliveryRate}% ${t.welcome.moduleAnalyticsSub}`,
      icon: BarChart3,
      tag: t.welcome.moduleAnalyticsTag
    }
  ];

  const roles = [
    {
      id: 'director',
      title: t.welcome.roleDirectorTitle,
      clearance: t.welcome.roleDirectorClearance,
      description: t.welcome.roleDirectorDesc
    },
    {
      id: 'dispatch',
      title: t.welcome.roleDispatchTitle,
      clearance: t.welcome.roleDispatchClearance,
      description: t.welcome.roleDispatchDesc
    },
    {
      id: 'security',
      title: t.welcome.roleSecurityTitle,
      clearance: t.welcome.roleSecurityClearance,
      description: t.welcome.roleSecurityDesc
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-slate-900 selection:text-white relative overflow-hidden bg-grid-minimal">
      {/* Top Institutional Header */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Sovereign Brand Emblem */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 bg-slate-950 text-white rounded-lg flex items-center justify-center font-seal text-base font-bold shadow-xs border border-slate-800">
              DB
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-seal tracking-widest text-xs font-bold text-slate-900 uppercase">
                  Draybyte Logistics Group
                </span>
                <span className="text-[10px] font-mono-tech uppercase bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                  {t.welcome.brandTag}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans tracking-tight">
                {t.welcome.brandSubtitle}
              </p>
            </div>
          </div>

          {/* System Telemetry Badges & Language Switcher */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider">
                {t.welcome.gnssClock}
              </span>
              <span className="text-xs font-mono-tech text-slate-700 font-medium capitalize">
                {currentTime || t.welcome.syncClock}
              </span>
            </div>

            <div className="h-7 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-full text-xs font-mono-tech font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.welcome.systemStatus}</span>
            </div>

            {/* Prominent Language Switcher */}
            <LanguageToggle variant="welcome" />
          </div>
        </div>
      </header>

      {/* Main Authoritative Welcome Canvas */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 py-10 lg:py-14 flex flex-col justify-center">
        {/* Editorial Eyebrow & Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-600 text-xs font-mono-tech tracking-wider uppercase mb-5"
          >
            <Radio className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>{t.welcome.badgeEyebrow}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-light text-slate-900 tracking-tight leading-[1.15]"
          >
            <span className="font-display italic font-normal text-slate-600 block text-2xl sm:text-4xl lg:text-5xl mb-1">
              {t.welcome.titleItalic}
            </span>
            <span className="font-sans font-extrabold uppercase tracking-tight text-slate-950 block">
              {t.welcome.titleBold}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            {t.welcome.description}
          </motion.p>

          {/* Primary Action Button Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => (onOpenAuth ? onOpenAuth('login') : onEnterConsole())}
              id="btn-enter-control-tower"
              className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white rounded-xl font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-3 group border border-slate-800 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>{t.welcome.btnEnterConsole}</span>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onEnterConsole('fleet')}
              id="btn-welcome-view-telemetry"
              className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-semibold text-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>{t.welcome.btnViewTelemetry}</span>
            </button>
          </motion.div>
        </div>

        {/* Real-time Sovereign Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto w-full mb-12"
        >
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono-tech uppercase font-semibold">{t.welcome.kpiFleetConnected}</span>
              <Truck className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-tech text-slate-900">
              {kpis.fleetInTransit} <span className="text-xs font-normal text-slate-400 font-sans">/ {kpis.totalActiveFleet} {t.units}</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1 font-sans">
              <CheckCircle2 className="w-3 h-3" /> {t.welcome.kpiFleetSub}
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono-tech uppercase font-semibold">{t.welcome.kpiOtd}</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-tech text-slate-900">
              {kpis.onTimeDeliveryRate}%
            </div>
            <span className="text-[11px] text-slate-500 font-medium block mt-1 font-sans">
              {t.welcome.kpiOtdSub}
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono-tech uppercase font-semibold">{t.welcome.kpiValuation}</span>
              <ShieldCheck className="w-4 h-4 text-slate-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-tech text-slate-900">
              ${(kpis.totalInventoryValuationUsd / 1000000).toFixed(1)}M
            </div>
            <span className="text-[11px] text-slate-500 font-medium block mt-1 font-sans">
              {t.welcome.kpiValuationSub}
            </span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono-tech uppercase font-semibold">{t.welcome.kpiWarehouse}</span>
              <Boxes className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-tech text-slate-900">
              {kpis.warehouseUtilizationAvg}%
            </div>
            <span className="text-[11px] text-slate-500 font-medium block mt-1 font-sans">
              {t.welcome.kpiWarehouseSub}
            </span>
          </div>
        </motion.div>

        {/* Section: Direct Module Launch Hub */}
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-4 bg-slate-900 rounded-full" />
              <h2 className="text-xs font-mono-tech font-bold uppercase tracking-widest text-slate-800">
                {t.welcome.quickLaunchTitle}
              </h2>
            </div>
            <span className="text-[11px] text-slate-500 font-sans">
              {t.welcome.quickLaunchSubtitle}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {quickEntryModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => onEnterConsole(mod.id)}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-slate-50 text-slate-800 group-hover:bg-slate-950 group-hover:text-white transition-colors border border-slate-200/80">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono-tech font-bold tracking-wider text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                        {mod.tag}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-sans mt-1 leading-normal line-clamp-2">
                      {mod.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <span>{t.welcome.startModule}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Operator Clearance / Role Selector */}
        <div className="max-w-5xl mx-auto w-full mt-10 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
          <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-slate-700" />
              <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-800">
                {t.welcome.rolesTitle}
              </span>
            </div>
            <span className="text-[11px] font-mono-tech text-slate-500">
              {t.welcome.rolesEncrypted}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-slate-950 shadow-xs ring-1 ring-slate-950'
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans font-bold text-xs text-slate-900">
                      {role.title}
                    </span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-slate-950 bg-slate-950' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-tech text-indigo-700 font-semibold block mb-1">
                    {role.clearance}
                  </span>
                  <p className="text-[11px] text-slate-500 font-sans leading-tight">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Institutional Compliance & Standards Footer */}
      <footer className="border-t border-slate-200/80 bg-white px-6 sm:px-12 py-5 text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono-tech">
            <span className="text-slate-800 font-bold">{t.welcome.certifications}</span>
            <span className="text-slate-600">ISO 9001:2015</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">ISO/IEC 27001</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">C-TPAT TIER III</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">OEA SAT CFDI 4.0</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-mono-tech">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-500" />
              TLS 1.3 256-BIT
            </span>
            <span>|</span>
            <span>{t.welcome.latency}</span>
            <span>|</span>
            <span>{t.welcome.copyright}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
