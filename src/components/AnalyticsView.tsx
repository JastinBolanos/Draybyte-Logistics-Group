import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Truck,
  PackageCheck,
  Fuel,
  Leaf,
  Boxes,
  DollarSign,
  Activity,
  ShieldCheck,
  Clock,
  Zap,
  Layers,
  ArrowUpRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { SupplyChainKPIs } from '../types/logistics';
import { useLanguage } from '../i18n/LanguageContext';

interface AnalyticsViewProps {
  kpis: SupplyChainKPIs;
  isDense: boolean;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ kpis }) => {
  const { t, language } = useLanguage();
  const [selectedCorridor, setSelectedCorridor] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const otdTrendData = [
    { day: language === 'es' ? 'Lun' : 'Mon', otd: 96.2, target: 95.0, deliveries: 120, incidentes: 1, co2Kg: 420 },
    { day: language === 'es' ? 'Mar' : 'Tue', otd: 97.4, target: 95.0, deliveries: 135, incidentes: 2, co2Kg: 480 },
    { day: language === 'es' ? 'Mie' : 'Wed', otd: 95.8, target: 95.0, deliveries: 142, incidentes: 3, co2Kg: 510 },
    { day: language === 'es' ? 'Jue' : 'Thu', otd: 98.1, target: 95.0, deliveries: 150, incidentes: 1, co2Kg: 530 },
    { day: language === 'es' ? 'Vie' : 'Fri', otd: 97.9, target: 95.0, deliveries: 168, incidentes: 2, co2Kg: 590 },
    { day: language === 'es' ? 'Sab' : 'Sat', otd: 98.9, target: 95.0, deliveries: 110, incidentes: 0, co2Kg: 380 },
    { day: language === 'es' ? 'Hoy' : 'Today', otd: kpis.onTimeDeliveryRate, target: 95.0, deliveries: 142, incidentes: 1, co2Kg: 495 }
  ];

  const corridorPerformanceData = [
    { corridor: language === 'es' ? 'CDMX - MTY (Troncal Norte)' : 'CDMX - MTY (North Trunk)', costPerKmUsd: 1.42, onTimePct: 98.2, volumeTon: 1850, avgHours: 11.2 },
    { corridor: language === 'es' ? 'CDMX - GDL (Corredor Bajío)' : 'CDMX - GDL (Bajio Corridor)', costPerKmUsd: 1.28, onTimePct: 97.5, volumeTon: 1420, avgHours: 6.8 },
    { corridor: language === 'es' ? 'MZN - Bajío (Intermodal Puerto)' : 'MZN - Bajio (Port Intermodal)', costPerKmUsd: 1.65, onTimePct: 94.1, volumeTon: 2900, avgHours: 5.4 },
    { corridor: language === 'es' ? 'MTY - N. Laredo (Cross-Border)' : 'MTY - N. Laredo (Cross-Border)', costPerKmUsd: 1.15, onTimePct: 99.1, volumeTon: 2100, avgHours: 3.2 },
    { corridor: language === 'es' ? 'CDMX - Veracruz (Puerto Golfo)' : 'CDMX - Veracruz (Gulf Port)', costPerKmUsd: 1.34, onTimePct: 96.8, volumeTon: 1650, avgHours: 5.9 }
  ];

  const warehouseUtilizationData = [
    { hub: 'CDMX Vallejo', capacityM2: 45000, utilizedPct: 82.5, turnoverDays: 14, stockValueM: 4.8 },
    { hub: 'MTY Norte', capacityM2: 62000, utilizedPct: 74.0, turnoverDays: 18, stockValueM: 5.9 },
    { hub: 'GDL Bajío', capacityM2: 38000, utilizedPct: 89.2, turnoverDays: 12, stockValueM: 3.6 },
    { hub: 'MZN Puerto', capacityM2: 75000, utilizedPct: 91.8, turnoverDays: 9, stockValueM: 8.2 }
  ];

  const radarComplianceData = [
    { subject: language === 'es' ? 'Cumplimiento OTD' : 'OTD Compliance', A: 98, fullMark: 100 },
    { subject: language === 'es' ? 'Seguridad SAT / CFDI' : 'SAT / CFDI Security', A: 100, fullMark: 100 },
    { subject: language === 'es' ? 'Cadena de Frío' : 'Cold Chain', A: 99, fullMark: 100 },
    { subject: language === 'es' ? 'Eficiencia Combustible' : 'Fuel Efficiency', A: 94, fullMark: 100 },
    { subject: language === 'es' ? 'Tasa Cero Daños' : 'Zero Damage Rate', A: 99.2, fullMark: 100 },
    { subject: language === 'es' ? 'Rotación de Patio' : 'Yard Turnover', A: 92, fullMark: 100 }
  ];

  return (
    <div className="space-y-4">
      {/* Header Banner with Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
              <Activity className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              {t.analytics.title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.analytics.subtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  timeRange === r ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === '7d' ? t.analytics.timeRange7d : r === '30d' ? t.analytics.timeRange30d : t.analytics.timeRange90d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Ribbon Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{t.analytics.otdTitle}</span>
            <PackageCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {kpis.onTimeDeliveryRate}%
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-0.5" /> +1.4% vs {language === 'es' ? 'meta SLA' : 'SLA target'}
          </span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{t.analytics.activeFleet}</span>
            <Truck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {kpis.fleetInTransit} / {kpis.totalActiveFleet}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            {Math.round((kpis.fleetInTransit / kpis.totalActiveFleet) * 100)}% {language === 'es' ? 'utilización en ruta' : 'en-route utilization'}
          </span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{t.analytics.fuelEfficiency}</span>
            <Fuel className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {kpis.fuelEfficiencyKmPerL} <span className="text-xs text-slate-500">km/L</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            +0.3 km/L {language === 'es' ? 'optimizado IA' : 'AI optimized'}
          </span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{t.analytics.co2Saved}</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-600 mt-1">
            {kpis.co2SavedPercent}%
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">{language === 'es' ? 'Rutas EV & bajas emisiones' : 'EV & low-emission routes'}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{t.analytics.hubOccupancy}</span>
            <Boxes className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            {kpis.warehouseUtilizationAvg}%
          </div>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">
            4 {language === 'es' ? 'Hubs Activos' : 'Active Hubs'}
          </span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{t.analytics.custodyValuation}</span>
            <DollarSign className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">
            ${(kpis.totalInventoryValuationUsd / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">USD {language === 'es' ? 'en custodia' : 'under custody'}</span>
        </div>
      </div>

      {/* Main 4 Exhaustive Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Composed Multi-Axis Delivery Volume & OTD Trend */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                {t.analytics.chartOtdTitle}
              </h3>
              <p className="text-[11px] text-slate-500">{t.analytics.chartOtdSubtitle}</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {language === 'es' ? 'Promedio: 97.4%' : 'Average: 97.4%'}
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={otdTrendData}>
                <defs>
                  <linearGradient id="otdAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="left" domain={[90, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#ffffff', fontSize: '11px', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar yAxisId="right" dataKey="deliveries" name={language === 'es' ? "Envíos Despachados" : "Dispatched Shipments"} fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Area yAxisId="left" type="monotone" dataKey="otd" name={language === 'es' ? "OTD Real (%)" : "Actual OTD (%)"} stroke="#6366f1" strokeWidth={2.5} fill="url(#otdAreaGrad)" />
                <Line yAxisId="left" type="monotone" dataKey="target" name={language === 'es' ? "Meta SLA (95%)" : "SLA Target (95%)"} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Corredores Logísticos - Costo por Ton-Km vs Puntualidad */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sky-600" />
                {t.analytics.chartCorridorsTitle}
              </h3>
              <p className="text-[11px] text-slate-500">{t.analytics.chartCorridorsSubtitle}</p>
            </div>
            <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              5 {language === 'es' ? 'Rutas Clave' : 'Key Routes'}
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={corridorPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis dataKey="corridor" type="category" tick={{ fontSize: 9, fill: '#64748b' }} width={140} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#ffffff', fontSize: '11px', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="avgHours" name={language === 'es' ? "Horas de Tránsito" : "Transit Hours"} fill="#6366f1" radius={[0, 4, 4, 0]} />
                <Bar dataKey="costPerKmUsd" name={language === 'es' ? "Costo USD / km" : "USD Cost / km"} fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Capacidad de Almacenes & Días de Rotación */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-indigo-600" />
                {t.analytics.chartWarehouseTitle}
              </h3>
              <p className="text-[11px] text-slate-500">{t.analytics.chartWarehouseSubtitle}</p>
            </div>
            <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              220,000 m² {language === 'es' ? 'Totales' : 'Total'}
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={warehouseUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hub" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#ffffff', fontSize: '11px', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="utilizedPct" name={language === 'es' ? "% Ocupación Actual" : "% Current Occupancy"} fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="turnoverDays" name={language === 'es' ? "Rotación (Días)" : "Turnover (Days)"} fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Radar de Madurez Operativa & Cumplimiento Normativo */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.analytics.chartRadarTitle}
              </h3>
              <p className="text-[11px] text-slate-500">{t.analytics.chartRadarSubtitle}</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Score: 97.4 / 100
            </span>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarComplianceData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#475569' }} />
                <PolarRadiusAxis domain={[80, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <Radar name={language === 'es' ? "Índice Logix" : "Logix Index"} dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#ffffff', fontSize: '11px', border: 'none' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

