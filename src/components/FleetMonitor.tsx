import React, { useState } from 'react';
import {
  Truck,
  Gauge,
  Thermometer,
  BatteryCharging,
  Fuel,
  Navigation,
  AlertCircle,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Clock,
  Compass,
  Zap,
  RotateCcw,
  ExternalLink,
  Layers,
  MapPin,
  Flame,
  Radio,
  Table as TableIcon,
  Map as MapIcon,
  Columns,
  Search,
  Activity,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { Vehicle, FleetStatus, CargoType } from '../types/logistics';
import { LOGISTICS_PHOTOS } from '../data/logisticsImages';
import { useLanguage } from '../i18n/LanguageContext';
import { InteractiveGISMap } from './InteractiveGISMap';

interface FleetMonitorProps {

  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  selectedVehicleId: string | null;
  onRerouteVehicle: (vehicleId: string) => void;
  onContactDriver: (driverName: string, phone: string) => void;
  isDense: boolean;
}

type FleetViewMode = 'map' | 'table' | 'split';

export const FleetMonitor: React.FC<FleetMonitorProps> = ({
  vehicles,
  onSelectVehicle,
  selectedVehicleId,
  onRerouteVehicle,
  onContactDriver,
  isDense
}) => {
  const { t, translateFleetStatus, translateCargoType } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cargoFilter, setCargoFilter] = useState<string>('all');
  const [mapLayer, setMapLayer] = useState<'standard' | 'satellite' | 'traffic'>('traffic');
  const [fleetViewMode, setFleetViewMode] = useState<FleetViewMode>('map');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedVehicleRows, setExpandedVehicleRows] = useState<Record<string, boolean>>({});

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const toggleExpandVehicle = (id: string) => {
    setExpandedVehicleRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredVehicles = vehicles.filter((v) => {
    if (statusFilter !== 'all' && v.status !== statusFilter) return false;
    if (cargoFilter !== 'all' && v.cargoType !== cargoFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        v.plate.toLowerCase().includes(q) ||
        v.unitCode.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.driver.name.toLowerCase().includes(q) ||
        v.origin.city?.toLowerCase().includes(q) ||
        v.destination.city?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: FleetStatus) => {
    switch (status) {
      case 'in_transit':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.fleetStatuses.in_transit}
          </span>
        );
      case 'alert':
        return (
          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs">
            <AlertCircle className="w-3 h-3 text-rose-600 animate-bounce" /> {t.fleetStatuses.alert}
          </span>
        );
      case 'loading':
        return (
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {t.fleetStatuses.loading}
          </span>
        );
      case 'unloading':
        return (
          <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {t.fleetStatuses.unloading}
          </span>
        );
      case 'idle':
        return (
          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {t.fleetStatuses.idle}
          </span>
        );
      default:
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {t.fleetStatuses.maintenance}
          </span>
        );
    }
  };

  const getCargoIcon = (cargo: CargoType) => {
    switch (cargo) {
      case 'cold_chain':
        return <span className="text-sky-800 bg-sky-50 border border-sky-200 text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">❄️ {t.cargoTypes.cold_chain}</span>;
      case 'pharmaceutical':
        return <span className="text-cyan-900 bg-cyan-50 border border-cyan-200 text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">🧬 {t.cargoTypes.pharmaceutical}</span>;
      case 'hazardous':
        return <span className="text-amber-900 bg-amber-50 border border-amber-200 text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">⚠️ {t.cargoTypes.hazardous}</span>;
      case 'high_value':
        return <span className="text-purple-900 bg-purple-50 border border-purple-200 text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">🔒 {t.cargoTypes.high_value}</span>;
      default:
        return <span className="text-slate-700 bg-slate-100 border border-slate-200 text-[10px] px-1.5 py-0.5 rounded font-medium">📦 {t.cargoTypes.standard}</span>;
    }
  };

  // Mock mini speed sparkline data for selected vehicle
  const speedHistoryData = [
    { t: '12:00', speed: Math.max(0, selectedVehicle.telemetry.speedKmh - 15) },
    { t: '12:15', speed: Math.max(0, selectedVehicle.telemetry.speedKmh - 6) },
    { t: '12:30', speed: selectedVehicle.telemetry.speedKmh },
    { t: '12:45', speed: Math.max(0, selectedVehicle.telemetry.speedKmh + 4) },
    { t: '13:00', speed: selectedVehicle.telemetry.speedKmh }
  ];

  return (
    <div className="space-y-4">
      {/* Top Filter and View Mode Switcher */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setFleetViewMode('map')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                fleetViewMode === 'map' ? 'bg-white shadow-xs text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{t.fleet.viewMap}</span>
            </button>
            <button
              onClick={() => setFleetViewMode('table')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                fleetViewMode === 'table' ? 'bg-white shadow-xs text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{t.fleet.viewTable}</span>
            </button>
            <button
              onClick={() => setFleetViewMode('split')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                fleetViewMode === 'split' ? 'bg-white shadow-xs text-indigo-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{t.fleet.viewSplit}</span>
            </button>
          </div>

          <span className="text-slate-300 mx-1">|</span>

          {/* Status Filter */}
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            {t.fleet.filterStatus}
          </span>
          {[
            { id: 'all', label: t.all },
            { id: 'in_transit', label: t.fleetStatuses.in_transit },
            { id: 'alert', label: t.fleetStatuses.alert },
            { id: 'loading', label: t.fleetStatuses.loading }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                statusFilter === f.id
                  ? 'bg-slate-900 text-white font-medium shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}

          <span className="text-slate-300 mx-1">|</span>

          {/* Cargo Filter */}
          <span className="text-xs font-semibold text-slate-500 mr-1">{t.fleet.filterCargo}</span>
          {[
            { id: 'all', label: t.all },
            { id: 'cold_chain', label: t.cargoTypes.cold_chain },
            { id: 'hazardous', label: t.cargoTypes.hazardous },
            { id: 'high_value', label: t.cargoTypes.high_value }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCargoFilter(c.id)}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                cargoFilter === c.id
                  ? 'bg-indigo-600 text-white font-medium shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Quick Map Overlay Toggles */}
        {fleetViewMode !== 'table' && (
          <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setMapLayer('traffic')}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${mapLayer === 'traffic' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {t.fleet.layerTraffic}
            </button>
            <button
              onClick={() => setMapLayer('standard')}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${mapLayer === 'standard' ? 'bg-white shadow-xs text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {t.fleet.layerVector}
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area based on View Mode */}
      {fleetViewMode === 'table' ? (
        /* ================= HIGH-DENSITY FLEET TELEMETRY TABLE ================= */
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Tabla Maestra de Flota & Telemetría IoT en Tiempo Real ({filteredVehicles.length} Unidades)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              🛰️ 100% Conectadas Vía Satélite 4G/5G
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider sticky top-0">
                <tr>
                  <th className="p-3.5 w-8"></th>
                  <th className="p-3.5">{t.fleet.colUnit}</th>
                  <th className="p-3.5">{t.fleet.colModel}</th>
                  <th className="p-3.5">{t.fleet.colStatus}</th>
                  <th className="p-3.5">{t.fleet.colRoute}</th>
                  <th className="p-3.5">{t.fleet.colSpeed}</th>
                  <th className="p-3.5">{t.fleet.colCargoTemp}</th>
                  <th className="p-3.5">{t.fleet.colFuel}</th>
                  <th className="p-3.5">{t.fleet.colDriver}</th>
                  <th className="p-3.5 text-right">{t.fleet.colActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredVehicles.map((v) => {
                  const isExpanded = !!expandedVehicleRows[v.id];
                  const isAlert = v.status === 'alert';

                  return (
                    <React.Fragment key={v.id}>
                      <tr
                        onClick={() => toggleExpandVehicle(v.id)}
                        className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                          isExpanded ? 'bg-indigo-50/30' : ''
                        }`}
                      >
                        {/* Expand Icon */}
                        <td className="p-3.5 text-center">
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 text-slate-400 group-hover:text-slate-700"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </td>

                        {/* Plate & Code */}
                        <td className="p-3.5 font-mono">
                          <div className="font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{v.plate}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block">{v.unitCode}</span>
                        </td>

                        {/* Model & Fuel Type */}
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-800">{v.model}</div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {v.fuelType === 'Electric' ? (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold flex items-center">
                                <Zap className="w-2.5 h-2.5 mr-0.5" /> 100% Eléctrico
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-mono">Diesel Ultra Bajo Azufre</span>
                            )}
                            <span className="text-[10px] text-slate-400">• {v.type}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-3.5">
                          <div>{getStatusBadge(v.status)}</div>
                          <div className="mt-1">{getCargoIcon(v.cargoType)}</div>
                        </td>

                        {/* Route & Progress */}
                        <td className="p-3.5 min-w-[140px]">
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 mb-1">
                            <span className="truncate max-w-[90px]">{v.origin.city} → {v.destination.city}</span>
                            <span className="font-bold">{v.routeProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${v.routeProgress}%` }}
                              transition={{ duration: 0.6 }}
                              className={`h-full rounded-full ${
                                isAlert ? 'bg-rose-500' : 'bg-indigo-600'
                              }`}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">ETA: {v.etaMinutes} min</span>
                        </td>

                        {/* Speed & RPM */}
                        <td className="p-3.5 font-mono">
                          <div className="text-slate-900 font-bold flex items-center gap-1">
                            <Gauge className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{v.telemetry.speedKmh} km/h</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block">{v.telemetry.rpm} RPM</span>
                        </td>

                        {/* Temperature */}
                        <td className="p-3.5 font-mono">
                          {v.telemetry.cargoTempC !== undefined ? (
                            <div className="flex items-center gap-1">
                              <Thermometer className="w-3.5 h-3.5 text-sky-600" />
                              <span className={`font-bold ${v.telemetry.cargoTempC > 6 ? 'text-rose-600' : 'text-sky-700'}`}>
                                {v.telemetry.cargoTempC}°C
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px] font-sans">Ambiente (22°C)</span>
                          )}
                          <span className="text-[10px] text-slate-400 block">TPMS: {v.telemetry.tirePressurePsi} PSI</span>
                        </td>

                        {/* Fuel / Battery */}
                        <td className="p-3.5 font-mono">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-slate-700 font-bold">{v.telemetry.fuelLevelPercent}%</span>
                            <span className="text-[10px] text-slate-400">
                              {v.fuelType === 'Electric' ? 'SoC' : 'Tanque'}
                            </span>
                          </div>
                          <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                v.telemetry.fuelLevelPercent < 25 ? 'bg-rose-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${v.telemetry.fuelLevelPercent}%` }}
                            />
                          </div>
                        </td>

                        {/* Driver */}
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-800 truncate max-w-[130px]">{v.driver.name}</div>
                          <span className="text-[10px] text-emerald-600 font-bold block">
                            ★ {v.driver.safetyScore}/100 Score
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onSelectVehicle(v)}
                            className="px-2.5 py-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 border border-indigo-200 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs shadow-2xs"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            <span>Ver Ficha</span>
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Telemetry Accordion Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <tr className="bg-slate-50/70 border-b border-slate-200">
                            <td colSpan={10} className="p-0">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="p-4 space-y-3"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                                      Ubicación GPS Satelital
                                    </span>
                                    <p className="text-xs font-semibold text-slate-800">
                                      📍 {v.currentLocation.address}, {v.currentLocation.city}
                                    </p>
                                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                                      Coords: {v.currentLocation.lat.toFixed(4)}, {v.currentLocation.lng.toFixed(4)}
                                    </span>
                                  </div>

                                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                                      Operador & Cumplimiento HOS
                                    </span>
                                    <p className="text-xs font-semibold text-slate-800">
                                      {v.driver.name} (Lic: {v.driver.licenseNumber})
                                    </p>
                                    <span className="text-[10px] text-indigo-700 font-semibold block mt-1">
                                      Turno activo: {v.driver.hoursOnDuty}h de {v.driver.maxHoursPerShift}h max
                                    </span>
                                  </div>

                                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                                      Carga & Capacidad Útil
                                    </span>
                                    <p className="text-xs font-mono font-bold text-slate-800">
                                      {v.currentLoadKg.toLocaleString()} kg / {v.maxCapacityKg.toLocaleString()} kg
                                    </p>
                                    <span className="text-[10px] text-slate-500 block mt-1">
                                      {Math.round((v.currentLoadKg / v.maxCapacityKg) * 100)}% de carga útil utilizada
                                    </span>
                                  </div>

                                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
                                    <div>
                                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                                        Acción Rápida
                                      </span>
                                      <p className="text-xs font-semibold text-slate-800">Canal Directo</p>
                                    </div>
                                    <button
                                      onClick={() => onContactDriver(v.driver.name, v.driver.phone)}
                                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs flex items-center gap-1 transition-colors"
                                    >
                                      <Phone className="w-3.5 h-3.5" />
                                      <span>Llamar</span>
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ================= MAP OR SPLIT VIEW ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Active Vehicle Roster List (4 Cols in Split, 4 Cols in Map) */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-indigo-600" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Flota Operativa ({filteredVehicles.length})
                </h2>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">GPS 100% Online</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredVehicles.map((vehicle) => {
                const isSelected = vehicle.id === selectedVehicle.id;
                return (
                  <div
                    key={vehicle.id}
                    onClick={() => onSelectVehicle(vehicle)}
                    className={`p-3.5 cursor-pointer transition-all hover:bg-slate-50/80 ${
                      isSelected ? 'bg-indigo-50/60 border-l-4 border-indigo-600 pl-2.5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono font-bold text-xs text-slate-900">
                            {vehicle.plate}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            ({vehicle.unitCode})
                          </span>
                          {vehicle.fuelType === 'Electric' && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold flex items-center">
                              <Zap className="w-2.5 h-2.5 mr-0.5" /> EV
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                          {vehicle.model}
                        </p>
                      </div>
                      <div>{getStatusBadge(vehicle.status)}</div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center space-x-1 truncate max-w-[170px]">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{vehicle.currentLocation.city || vehicle.currentLocation.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 font-mono text-xs">
                        <span className="font-semibold text-slate-700">{vehicle.telemetry.speedKmh} km/h</span>
                        {vehicle.telemetry.cargoTempC !== undefined && (
                          <span className={`font-semibold ${vehicle.telemetry.cargoTempC > 6 ? 'text-rose-600 font-bold' : 'text-sky-600'}`}>
                            {vehicle.telemetry.cargoTempC}°C
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Route Progress Mini Bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                        <span>{vehicle.origin.city} → {vehicle.destination.city}</span>
                        <span className="font-mono font-semibold">{vehicle.routeProgress}% (ETA: {vehicle.etaMinutes}m)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            vehicle.status === 'alert' ? 'bg-rose-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${vehicle.routeProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-100/80">
                      <span className="text-slate-600">{vehicle.driver.name}</span>
                      <div>{getCargoIcon(vehicle.cargoType)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Tech Interactive GIS Map Layer with Real Satellites & Live Animations */}
          <div className="lg:col-span-8">
            <InteractiveGISMap
              vehicles={filteredVehicles}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={onSelectVehicle}
              mapLayerMode={mapLayer}
            />
          </div>
        </div>
      )}

      {/* Selected Unit Deep Telemetry & Live Speed Sparkline Console */}
      {selectedVehicle && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between pb-3.5 mb-4 border-b border-slate-200 gap-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  Telemetría IoT & Control Operativo en Tiempo Real — Unidad {selectedVehicle.unitCode} ({selectedVehicle.plate})
                </h2>
                <p className="text-xs text-slate-500">
                  Ruta asignada: {selectedVehicle.origin.city} → {selectedVehicle.destination.city} | Último reporte: {selectedVehicle.telemetry.lastPing}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onContactDriver(selectedVehicle.driver.name, selectedVehicle.driver.phone)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t.fleet.callDriver}</span>
              </button>

              <button
                onClick={() => onRerouteVehicle(selectedVehicle.id)}
                className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t.fleet.rerouteBtn}</span>
              </button>
            </div>
          </div>

          {/* High-Density Telemetry Gauges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Speed Gauge with Mini Sparkline */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-[11px] font-semibold uppercase">{t.fleet.speed}</span>
                  <Gauge className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-900">
                  {selectedVehicle.telemetry.speedKmh} <span className="text-xs font-normal text-slate-500">km/h</span>
                </div>
              </div>
              <div className="h-10 w-full mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={speedHistoryData}>
                    <defs>
                      <linearGradient id="spdGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="speed" stroke="#6366f1" strokeWidth={1.5} fill="url(#spdGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">MAX: 95 km/h</span>
            </div>

            {/* Cargo Temperature */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-semibold uppercase">{t.fleet.cargoTemp}</span>
                <Thermometer className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900">
                {selectedVehicle.telemetry.cargoTempC !== undefined ? (
                  <>
                    {selectedVehicle.telemetry.cargoTempC} <span className="text-xs font-normal text-slate-500">°C</span>
                  </>
                ) : (
                  <span className="text-sm text-slate-500 font-sans">22°C</span>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] mt-2 text-slate-500">
                <span>{selectedVehicle.telemetry.targetTempC ?? 20}°C Target</span>
                <span className="text-emerald-600 font-semibold flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-0.5" /> OK
                </span>
              </div>
            </div>

            {/* Fuel / Battery Level */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-semibold uppercase">
                  {selectedVehicle.fuelType === 'Electric' ? 'EV Battery' : t.fleet.fuelLevel}
                </span>
                {selectedVehicle.fuelType === 'Electric' ? (
                  <BatteryCharging className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Fuel className="w-4 h-4 text-amber-600" />
                )}
              </div>
              <div className="text-xl font-bold font-mono text-slate-900">
                {selectedVehicle.telemetry.fuelLevelPercent}%
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    selectedVehicle.telemetry.fuelLevelPercent < 25
                      ? 'bg-rose-500'
                      : selectedVehicle.fuelType === 'Electric'
                      ? 'bg-emerald-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${selectedVehicle.telemetry.fuelLevelPercent}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">~380 km</span>
            </div>

            {/* Engine Temp & RPM */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-semibold uppercase">{t.fleet.engineTemp}</span>
                <Flame className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900">
                {selectedVehicle.telemetry.engineTempC}°C
              </div>
              <div className="text-xs text-slate-600 font-mono mt-1">
                {selectedVehicle.telemetry.rpm} RPM
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Optimal</span>
            </div>

            {/* TPMS Tire Pressure */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-[11px] font-semibold uppercase">{t.fleet.tirePressure}</span>
                <Compass className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900">
                {selectedVehicle.telemetry.tirePressurePsi} <span className="text-xs font-normal text-slate-500">PSI</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                ✓ 6 TPMS Calibrated
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">Odom: {selectedVehicle.telemetry.odometerKm.toLocaleString()} km</span>
            </div>

            {/* Driver Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={selectedVehicle.driver.avatar}
                  alt={selectedVehicle.driver.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300"
                  referrerPolicy="no-referrer"
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">{selectedVehicle.driver.name}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">
                    Score: {selectedVehicle.driver.safetyScore}/100
                  </div>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-slate-500 border-t border-slate-200/80 pt-1 flex justify-between">
                <span>HOS: {selectedVehicle.driver.hoursOnDuty}h / 10h</span>
                <span className="text-indigo-600 font-mono">OK</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
