import React, { useState, useMemo } from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Filter,
  Download,
  Eye,
  ArrowRight,
  ShieldAlert,
  Search,
  Truck,
  Building2,
  QrCode,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Activity,
  Thermometer,
  ShieldCheck,
  Phone,
  Layers,
  MapPin,
  Sparkles,
  BarChart3,
  SlidersHorizontal,
  ArrowUpDown,
  CheckSquare,
  Square,
  FileSpreadsheet,
  Printer,
  Compass,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Shipment, ShipmentStatus, PriorityLevel, CargoType } from '../types/logistics';

interface ShipmentManagerProps {
  shipments: Shipment[];
  onSelectShipment: (shipment: Shipment) => void;
  onNewShipment: () => void;
  onScanBarcode: () => void;
  isDense: boolean;
}

type SortField = 'trackingNumber' | 'sender' | 'recipient' | 'status' | 'priority' | 'estimatedArrival' | 'declaredValueUsd' | 'totalWeightKg' | 'progress';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'detailed' | 'compact' | 'manifest';

export const ShipmentManager: React.FC<ShipmentManagerProps> = ({
  shipments,
  onSelectShipment,
  onNewShipment,
  onScanBarcode,
  isDense
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [cargoFilter, setCargoFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [showCharts, setShowCharts] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<ViewMode>('detailed');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    [shipments[0]?.id || '']: true // Default first row expanded for high visual impact
  });
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('estimatedArrival');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Toggle single row expand
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand / Collapse all
  const toggleExpandAll = () => {
    const allExpanded = Object.keys(expandedRows).length === shipments.length && Object.values(expandedRows).every(Boolean);
    if (allExpanded) {
      setExpandedRows({});
    } else {
      const all: Record<string, boolean> = {};
      shipments.forEach((s) => (all[s.id] = true));
      setExpandedRows(all);
    }
  };

  // Selection toggle
  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRowIds.length === filteredShipments.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(filteredShipments.map((s) => s.id));
    }
  };

  // Handle header sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtered & Sorted shipments
  const filteredShipments = useMemo(() => {
    const filtered = shipments.filter((s) => {
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      if (priorityFilter !== 'all' && s.priority !== priorityFilter) return false;
      if (cargoFilter !== 'all' && s.cargoType !== cargoFilter) return false;
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        return (
          s.trackingNumber.toLowerCase().includes(q) ||
          s.referenceBol.toLowerCase().includes(q) ||
          s.sender.company.toLowerCase().includes(q) ||
          s.recipient.company.toLowerCase().includes(q) ||
          s.sender.city.toLowerCase().includes(q) ||
          s.recipient.city.toLowerCase().includes(q) ||
          s.carrier.toLowerCase().includes(q) ||
          s.items.some((i) => i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q))
        );
      }
      return true;
    });

    return filtered.sort((a, b) => {
      let valA: any = a[sortField as keyof Shipment];
      let valB: any = b[sortField as keyof Shipment];

      if (sortField === 'sender') {
        valA = a.sender.company;
        valB = b.sender.company;
      } else if (sortField === 'recipient') {
        valA = a.recipient.company;
        valB = b.recipient.company;
      } else if (sortField === 'progress') {
        valA = getEstimatedProgress(a.status);
        valB = getEstimatedProgress(b.status);
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [shipments, statusFilter, priorityFilter, cargoFilter, searchFilter, sortField, sortDirection]);

  function getEstimatedProgress(status: ShipmentStatus): number {
    switch (status) {
      case 'order_placed': return 10;
      case 'processing': return 25;
      case 'in_transit': return 65;
      case 'out_for_delivery': return 90;
      case 'delivered': return 100;
      case 'exception': return 45;
      case 'customs_hold': return 40;
      default: return 50;
    }
  }

  // Analytics Chart Data
  const volumeTrendData = [
    { day: 'Lun', programados: 120, entregados: 118, otd: 98.3, retrasos: 2 },
    { day: 'Mar', programados: 145, entregados: 140, otd: 96.5, retrasos: 5 },
    { day: 'Mie', programados: 138, entregados: 135, otd: 97.8, retrasos: 3 },
    { day: 'Jue', programados: 162, entregados: 159, otd: 98.1, retrasos: 3 },
    { day: 'Vie', programados: 180, entregados: 174, otd: 96.6, retrasos: 6 },
    { day: 'Sab', programados: 110, entregados: 109, otd: 99.0, retrasos: 1 },
    { day: 'Hoy', programados: shipments.length, entregados: shipments.filter(s => s.status === 'delivered').length, otd: 97.8, retrasos: shipments.filter(s => s.status === 'exception').length }
  ];

  const cargoDistributionData = [
    { name: 'Cadena de Frío', value: 42, color: '#0284c7', count: 32 },
    { name: 'Criogénico Pharma', value: 18, color: '#06b6d4', count: 14 },
    { name: 'Alto Valor / Custodia', value: 24, color: '#8b5cf6', count: 18 },
    { name: 'HAZMAT Químicos', value: 16, color: '#f59e0b', count: 12 },
    { name: 'Carga General', value: 42, color: '#64748b', count: 35 }
  ];

  const corridorTransitData = [
    { corredor: 'CDMX - MTY', realHrs: 11.2, targetHrs: 12.0, status: 'Óptimo' },
    { corredor: 'CDMX - GDL', realHrs: 6.8, targetHrs: 7.0, status: 'Óptimo' },
    { corredor: 'MZN - Bajío', realHrs: 5.4, targetHrs: 5.0, status: 'Atraso +24m' },
    { corredor: 'MTY - N. Laredo', realHrs: 3.2, targetHrs: 3.5, status: 'Óptimo' },
    { corredor: 'CDMX - Veracruz', realHrs: 5.9, targetHrs: 6.0, status: 'Óptimo' }
  ];

  const riskRadarData = [
    { metric: 'Seguridad Fiscal / SAT', score: 99, meta: 100 },
    { metric: 'Estabilidad Térmica Frío', score: 98.4, meta: 98.0 },
    { metric: 'Puntualidad en Peaje', score: 94.2, meta: 95.0 },
    { metric: 'Integridad de Carga (Shock)', score: 99.8, meta: 99.5 },
    { metric: 'Disponibilidad de Andenes', score: 91.5, meta: 90.0 }
  ];

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'in_transit':
        return (
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            En Ruta Troncal
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping"></span>
            Última Milla
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Entregado / POD
          </span>
        );
      case 'processing':
        return (
          <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" /> En Andén
          </span>
        );
      case 'exception':
        return (
          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-rose-600" /> Excepción / Alerta
          </span>
        );
      case 'customs_hold':
        return (
          <span className="bg-orange-50 text-orange-800 border border-orange-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-orange-600" /> Retención Aduana
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
            Registrado
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'urgent':
        return <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Urgente</span>;
      case 'high':
        return <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Alta</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wider">Estándar</span>;
    }
  };

  const getCargoBadge = (cargo: CargoType) => {
    switch (cargo) {
      case 'cold_chain':
        return <span className="text-sky-800 bg-sky-50 border border-sky-200 text-[10px] px-2 py-0.5 rounded font-mono font-semibold">❄️ Frío 2-8°C</span>;
      case 'pharmaceutical':
        return <span className="text-cyan-900 bg-cyan-50 border border-cyan-200 text-[10px] px-2 py-0.5 rounded font-mono font-semibold">🧬 Cryo -20°C</span>;
      case 'hazardous':
        return <span className="text-amber-900 bg-amber-50 border border-amber-200 text-[10px] px-2 py-0.5 rounded font-mono font-semibold">☣️ HAZMAT Cl.3</span>;
      case 'high_value':
        return <span className="text-purple-900 bg-purple-50 border border-purple-200 text-[10px] px-2 py-0.5 rounded font-mono font-semibold">🔒 Alto Valor</span>;
      default:
        return <span className="text-slate-700 bg-slate-100 border border-slate-200 text-[10px] px-2 py-0.5 rounded font-mono font-medium">📦 General</span>;
    }
  };

  // Pipeline summary counts
  const countByStatus = {
    all: shipments.length,
    processing: shipments.filter((s) => s.status === 'processing').length,
    in_transit: shipments.filter((s) => s.status === 'in_transit').length,
    out_for_delivery: shipments.filter((s) => s.status === 'out_for_delivery').length,
    exception: shipments.filter((s) => s.status === 'exception').length,
    delivered: shipments.filter((s) => s.status === 'delivered').length
  };

  return (
    <div className="space-y-4">
      {/* Top Interactive Exhaustive Analytics Ribbon */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
              <BarChart3 className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Telemetría Analítica & Control de Tráfico de Carga en Tiempo Real
              </h3>
              <p className="text-[11px] text-slate-500">
                Visualización exhaustiva de flujo de carga, cumplimiento de SLA, matriz de riesgo e índices de frío.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCharts(!showCharts)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-xs"
            >
              <Activity className="w-3.5 h-3.5 text-indigo-600" />
              <span>{showCharts ? 'Ocultar Gráficas' : 'Desplegar Gráficas Exhaustivas'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showCharts ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showCharts && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 bg-white">
                {/* Chart 1: Volume & On-Time Rate */}
                <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                      Cumplimiento OTD vs Volumen
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      97.8% OTD
                    </span>
                  </div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={volumeTrendData}>
                        <defs>
                          <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                        />
                        <Area type="monotone" dataKey="programados" stroke="#6366f1" strokeWidth={2} fill="url(#volGrad)" name="Envíos Totales" />
                        <Line type="monotone" dataKey="entregados" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} name="Entregados a Tiempo" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Meta SLA corporativa: 95.0% • 1,014 guías semanales procesadas
                  </span>
                </div>

                {/* Chart 2: Cargo Category Breakdown */}
                <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-sky-600" />
                      Mix de Carga & Cadena de Frío
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">142 Activas</span>
                  </div>
                  <div className="h-44 w-full flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cargoDistributionData}
                          innerRadius={36}
                          outerRadius={58}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {cargoDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}% de la carga`, 'Proporción']}
                          contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="w-36 space-y-1 text-[10px] font-sans">
                      {cargoDistributionData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-slate-600 truncate max-w-[85px]">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                            {item.name}
                          </span>
                          <span className="font-mono font-bold text-slate-800">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    60% de envíos bajo monitoreo térmico estricto en tiempo real
                  </span>
                </div>

                {/* Chart 3: Corridor Transit Times */}
                <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Tiempos en Corredores (Horas)
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Real vs SLA</span>
                  </div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={corridorTransitData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 14]} />
                        <YAxis dataKey="corredor" type="category" tick={{ fontSize: 9, fill: '#64748b' }} width={75} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px', border: 'none' }}
                        />
                        <Bar dataKey="realHrs" fill="#6366f1" radius={[0, 4, 4, 0]} name="Tiempo Real (hrs)" />
                        <Bar dataKey="targetHrs" fill="#cbd5e1" radius={[0, 4, 4, 0]} name="Meta SLA (hrs)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Corredor Manzanillo presenta congestión leve en casetas (+24 min)
                  </span>
                </div>

                {/* Chart 4: Operational Risk Radar */}
                <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Índice de Salud Logística SAT & GPS
                    </span>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                      Score: 98.2 / 100
                    </span>
                  </div>
                  <div className="space-y-2.5 py-1">
                    {riskRadarData.map((r) => (
                      <div key={r.metric} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-600 truncate max-w-[170px]">{r.metric}</span>
                          <span className="font-mono font-bold text-slate-800">{r.score}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${r.score}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              r.score >= 98 ? 'bg-emerald-500' : r.score >= 93 ? 'bg-indigo-600' : 'bg-amber-500'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Validación satelital y timbrado CFDI 4.0 Carta de Porte 100% compliant
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pipeline Status Counters Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { id: 'all', label: 'Total Envíos', count: countByStatus.all, color: 'border-slate-200 bg-white text-slate-800' },
          { id: 'processing', label: 'En Andén / Carga', count: countByStatus.processing, color: 'border-amber-200 bg-amber-50/40 text-amber-900' },
          { id: 'in_transit', label: 'En Ruta Troncal', count: countByStatus.in_transit, color: 'border-indigo-200 bg-indigo-50/40 text-indigo-900' },
          { id: 'out_for_delivery', label: 'Última Milla', count: countByStatus.out_for_delivery, color: 'border-purple-200 bg-purple-50/40 text-purple-900' },
          { id: 'exception', label: 'Con Excepción', count: countByStatus.exception, color: 'border-rose-200 bg-rose-50/40 text-rose-900' },
          { id: 'delivered', label: 'Entregados Hoy', count: countByStatus.delivered, color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900' }
        ].map((stage) => (
          <div
            key={stage.id}
            onClick={() => setStatusFilter(stage.id)}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${stage.color} ${
              statusFilter === stage.id ? 'ring-2 ring-indigo-500 shadow-xs' : 'hover:opacity-90'
            }`}
          >
            <span className="text-[11px] font-medium block opacity-75">{stage.label}</span>
            <span className="text-xl font-bold font-mono mt-1 block">{stage.count}</span>
          </div>
        ))}
      </div>

      {/* Advanced Filter, Search, and Mode Control Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por Guía, BOL, Remitente, SKU..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          {/* Priority Pill Selector */}
          <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
            <span className="text-xs text-slate-500 font-medium mr-1">Prioridad:</span>
            {['all', 'urgent', 'high', 'standard'].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  priorityFilter === p ? 'bg-slate-900 text-white font-medium' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p === 'all' ? 'Todas' : p.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Cargo Type Selector */}
          <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
            <span className="text-xs text-slate-500 font-medium mr-1">Carga:</span>
            <select
              value={cargoFilter}
              onChange={(e) => setCargoFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">Todas las categorías</option>
              <option value="cold_chain">❄️ Cadena de Frío (2-8°C)</option>
              <option value="pharmaceutical">🧬 Criogénico (-20°C)</option>
              <option value="hazardous">☣️ HAZMAT Químicos</option>
              <option value="high_value">🔒 Alto Valor Custodiado</option>
              <option value="standard">📦 Carga General</option>
            </select>
          </div>
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center space-x-2">
          {/* Expand/Collapse All Button */}
          <button
            onClick={toggleExpandAll}
            title="Expandir o Colapsar todos los detalles de telemetría"
            className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
            <span>Expandir Todo</span>
          </button>

          <button
            onClick={onScanBarcode}
            className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-600" />
            <span>Escanear Guía</span>
          </button>

          <button
            onClick={() => {
              const exportList = selectedRowIds.length > 0
                ? shipments.filter((s) => selectedRowIds.includes(s.id))
                : shipments;
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                ['Guia,BOL,Remitente,Origen,Destinatario,Destino,Estado,Prioridad,TipoCarga,ValorUSD,PesoKG,Items'].join(',') +
                '\n' +
                exportList
                  .map(
                    (s) =>
                      `"${s.trackingNumber}","${s.referenceBol}","${s.sender.company}","${s.sender.city}","${s.recipient.company}","${s.recipient.city}","${s.status}","${s.priority}","${s.cargoType}",${s.declaredValueUsd},${s.totalWeightKg},${s.items.length}`
                  )
                  .join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', `manifiesto_logix_${new Date().toISOString().slice(0, 10)}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center space-x-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Exportar CSV {selectedRowIds.length > 0 ? `(${selectedRowIds.length})` : ''}</span>
          </button>
        </div>
      </div>

      {/* Floating Bulk Action Indicator if rows are selected */}
      {selectedRowIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-900 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs"
        >
          <div className="flex items-center space-x-2 font-medium">
            <span className="bg-indigo-500 text-white font-mono font-bold px-2 py-0.5 rounded text-[11px]">
              {selectedRowIds.length}
            </span>
            <span>Envíos seleccionados para procesamiento masivo</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert(`Generando timbrado fiscal consolidado CFDI 4.0 para ${selectedRowIds.length} guías.`)}
              className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg font-semibold transition-colors"
            >
              Timbrar Carta de Porte Masiva
            </button>
            <button
              onClick={() => setSelectedRowIds([])}
              className="text-indigo-300 hover:text-white px-2 py-1"
            >
              Desmarcar
            </button>
          </div>
        </motion.div>
      )}

      {/* Ultra-Detailed Animated Shipments Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider select-none sticky top-0 z-10 backdrop-blur-xs">
              <tr>
                <th className="p-3.5 w-10 text-center">
                  <button onClick={toggleSelectAll} className="cursor-pointer text-slate-400 hover:text-slate-700">
                    {selectedRowIds.length > 0 && selectedRowIds.length === filteredShipments.length ? (
                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                </th>
                <th className="p-3.5 w-8"></th>
                <th
                  onClick={() => handleSort('trackingNumber')}
                  className="p-3.5 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>No. Guía / BOL</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('sender')}
                  className="p-3.5 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Remitente & Origen</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('recipient')}
                  className="p-3.5 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Destinatario & Destino</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-3.5">Categoría & Riesgo</th>
                <th
                  onClick={() => handleSort('status')}
                  className="p-3.5 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Estado & Hito</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('progress')}
                  className="p-3.5 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Progreso de Ruta</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('estimatedArrival')}
                  className="p-3.5 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>ETA / Ventana</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('declaredValueUsd')}
                  className="p-3.5 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Carga & Valor</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredShipments.map((shipment) => {
                const isExpanded = !!expandedRows[shipment.id];
                const isSelected = selectedRowIds.includes(shipment.id);
                const progressPct = getEstimatedProgress(shipment.status);

                return (
                  <React.Fragment key={shipment.id}>
                    <tr
                      onClick={() => toggleRow(shipment.id)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                        isSelected ? 'bg-indigo-50/30' : isExpanded ? 'bg-slate-50/50' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-3.5 text-center" onClick={(e) => toggleSelectRow(shipment.id, e)}>
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600 inline" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 group-hover:text-slate-500 inline" />
                        )}
                      </td>

                      {/* Expand Chevron with Rotation Animation */}
                      <td className="p-3.5 text-center">
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 text-slate-400 group-hover:text-slate-700"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </td>

                      {/* Tracking ID & BOL */}
                      <td className="p-3.5 font-mono">
                        <div className="font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{shipment.trackingNumber}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">
                          BOL: {shipment.referenceBol}
                        </span>
                      </td>

                      {/* Sender */}
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800 truncate max-w-[150px]">
                          {shipment.sender.company}
                        </div>
                        <span className="text-[11px] text-slate-500 flex items-center gap-0.5 truncate max-w-[150px]">
                          📍 {shipment.sender.city}
                        </span>
                      </td>

                      {/* Recipient */}
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800 truncate max-w-[150px]">
                          {shipment.recipient.company}
                        </div>
                        <span className="text-[11px] text-slate-500 flex items-center gap-0.5 truncate max-w-[150px]">
                          🏁 {shipment.recipient.city}
                        </span>
                      </td>

                      {/* Category & Priority */}
                      <td className="p-3.5">
                        <div className="flex flex-col gap-1 items-start">
                          {getCargoBadge(shipment.cargoType)}
                          {getPriorityBadge(shipment.priority)}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <div>{getStatusBadge(shipment.status)}</div>
                        <span className="text-[10px] text-slate-500 mt-1 block truncate max-w-[180px]" title={shipment.currentMilestone}>
                          {shipment.currentMilestone}
                        </span>
                      </td>

                      {/* Route Progress Bar */}
                      <td className="p-3.5 min-w-[130px]">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 mb-1">
                          <span>{progressPct}%</span>
                          <span className="text-slate-400">{shipment.carrier}</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.6 }}
                            className={`h-full rounded-full ${
                              shipment.status === 'exception'
                                ? 'bg-rose-500'
                                : shipment.status === 'delivered'
                                ? 'bg-emerald-500'
                                : 'bg-indigo-600'
                            }`}
                          />
                        </div>
                      </td>

                      {/* ETA */}
                      <td className="p-3.5 font-mono">
                        <div className="text-slate-900 font-bold">{shipment.estimatedArrival}</div>
                        <span className="text-[10px] text-slate-500 block">Salida: {shipment.departureTime}</span>
                      </td>

                      {/* Weight & Value */}
                      <td className="p-3.5 font-mono">
                        <div className="text-slate-900 font-bold">
                          ${shipment.declaredValueUsd.toLocaleString()} USD
                        </div>
                        <span className="text-[10px] text-slate-500 block">
                          {shipment.totalWeightKg.toLocaleString()} kg • {shipment.items.length} items
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onSelectShipment(shipment)}
                          className="px-2.5 py-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 border border-indigo-200 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Ficha</span>
                        </button>
                      </td>
                    </tr>

                    {/* Highly Detailed Expanded Accordion View */}
                    <AnimatePresence>
                      {isExpanded && (
                        <tr className="bg-slate-50/70 border-b border-slate-200">
                          <td colSpan={11} className="p-0">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              className="overflow-hidden p-4 sm:p-5 space-y-4"
                            >
                              {/* 1. Step-by-Step Multi-Milestone Animated Journey Visualizer */}
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                                  <div className="flex items-center space-x-2">
                                    <Compass className="w-4 h-4 text-indigo-600" />
                                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                                      Trazabilidad de Custodia & Hitos del Corredor
                                    </h4>
                                  </div>
                                  <span className="text-[11px] font-mono text-slate-500">
                                    Transportista: <strong className="text-slate-800">{shipment.carrier}</strong>
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                                  {[
                                    {
                                      step: 1,
                                      title: 'Carga & Despacho',
                                      location: shipment.sender.city,
                                      time: shipment.departureTime,
                                      completed: progressPct >= 20,
                                      active: progressPct >= 10 && progressPct < 30
                                    },
                                    {
                                      step: 2,
                                      title: 'Tránsito Troncal',
                                      location: 'Autopista Federal',
                                      time: 'En ruta',
                                      completed: progressPct >= 50,
                                      active: progressPct >= 30 && progressPct < 70
                                    },
                                    {
                                      step: 3,
                                      title: 'Punto de Control SAT',
                                      location: 'Revisión Fiscal',
                                      time: 'Validado',
                                      completed: progressPct >= 70,
                                      active: progressPct >= 70 && progressPct < 85
                                    },
                                    {
                                      step: 4,
                                      title: 'Cross-Dock Hub',
                                      location: shipment.recipient.destinationHub,
                                      time: 'Clasificado',
                                      completed: progressPct >= 90,
                                      active: progressPct >= 85 && progressPct < 100
                                    },
                                    {
                                      step: 5,
                                      title: 'Entrega Final POD',
                                      location: shipment.recipient.city,
                                      time: shipment.estimatedArrival,
                                      completed: progressPct === 100,
                                      active: false
                                    }
                                  ].map((m, idx) => (
                                    <div
                                      key={m.step}
                                      className={`p-3 rounded-lg border text-xs flex flex-col justify-between relative ${
                                        m.completed
                                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                                          : m.active
                                          ? 'bg-indigo-50/70 border-indigo-300 text-indigo-950 ring-2 ring-indigo-500/20'
                                          : 'bg-slate-50 border-slate-200 text-slate-400'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono font-bold text-[10px] opacity-75">PASO 0{m.step}</span>
                                        {m.completed ? (
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                        ) : m.active ? (
                                          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                                        ) : (
                                          <Clock className="w-3.5 h-3.5 text-slate-300" />
                                        )}
                                      </div>
                                      <div className="font-bold text-[11px] leading-tight">{m.title}</div>
                                      <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                                        <span>{m.location}</span>
                                        <span className="font-mono">{m.time}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* 2. Three Columns Breakdown: Item Manifest (6 cols) + Real-time Telemetry/Sensors (3 cols) + Fiscal/SAT CFDI (3 cols) */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                {/* Item Manifest Grid */}
                                <div className="lg:col-span-6 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                                      Partidas del Manifiesto ({shipment.items.length} SKUs Declarados)
                                    </h4>
                                    <span className="text-[11px] font-mono text-slate-500">
                                      Total: <strong className="text-slate-800">{shipment.totalWeightKg.toLocaleString()} kg</strong>
                                    </span>
                                  </div>

                                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-[11px]">
                                      <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                        <tr>
                                          <th className="p-2">SKU</th>
                                          <th className="p-2">Descripción</th>
                                          <th className="p-2 text-right">Cant.</th>
                                          <th className="p-2 text-right">Peso Unit.</th>
                                          <th className="p-2 text-right">Valor USD</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-100">
                                        {shipment.items.map((item) => (
                                          <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="p-2 font-mono font-bold text-indigo-700">{item.sku}</td>
                                            <td className="p-2 text-slate-800 font-medium">{item.name}</td>
                                            <td className="p-2 text-right font-mono font-bold">{item.quantity}</td>
                                            <td className="p-2 text-right font-mono text-slate-600">{item.weightKg} kg</td>
                                            <td className="p-2 text-right font-mono text-slate-900 font-bold">${item.unitValue * item.quantity}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* Real-time Telemetry & Cold Chain Sensor Log */}
                                <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                                  <div>
                                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100 mb-3">
                                      <Activity className="w-3.5 h-3.5 text-sky-600" />
                                      Sensores & Telemetría IoT
                                    </h4>

                                    <div className="space-y-2.5 text-xs">
                                      <div className="flex items-center justify-between p-2 rounded-lg bg-sky-50/60 border border-sky-200">
                                        <div className="flex items-center gap-1.5 text-sky-900">
                                          <Thermometer className="w-4 h-4 text-sky-600" />
                                          <span className="font-semibold">Temp. Carga:</span>
                                        </div>
                                        <span className="font-mono font-bold text-sky-700 text-sm">
                                          {shipment.cargoType === 'pharmaceutical' ? '-20.2°C' : shipment.cargoType === 'cold_chain' ? '3.4°C' : '22.0°C'}
                                        </span>
                                      </div>

                                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-600">Candado Digital SAT:</span>
                                        <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                                          🔒 SELLADO / ACTIVO
                                        </span>
                                      </div>

                                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-600">Sensor de Impacto (G):</span>
                                        <span className="font-mono font-semibold text-slate-800 text-[11px]">0.08G (Normal)</span>
                                      </div>

                                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                                        <span className="text-slate-600">Firma Biométrica POD:</span>
                                        <span className="font-semibold text-slate-800 text-[11px]">
                                          {shipment.requiresSignature ? 'Exigida en Entrega' : 'Estándar'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                                    <span>GPS Ping: <strong className="text-slate-700">En vivo (4G LTE)</strong></span>
                                  </div>
                                </div>

                                {/* Fiscal CFDI 4.0 & Quick Action Console */}
                                <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                                  <div>
                                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100 mb-3">
                                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                                      CFDI 4.0 Carta de Porte
                                    </h4>

                                    <div className="space-y-2 text-xs">
                                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[10px]">
                                        <span className="text-slate-500 block">UUID FISCAL SAT:</span>
                                        <span className="font-bold text-slate-800 break-all">4A91F-8820B-991A-CP40-MX</span>
                                      </div>
                                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[10px]">
                                        <span className="text-slate-500 block">PÓLIZA DE SEGURO AXA:</span>
                                        <span className="font-bold text-slate-800">POL-AXA-99214-GLOBAL</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                                    <button
                                      onClick={() => onSelectShipment(shipment)}
                                      className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Inspeccionar Ficha Completa</span>
                                    </button>
                                    <button
                                      onClick={() => alert(`Descargando manifiesto fiscal y Carta de Porte oficial SAT para guía ${shipment.trackingNumber}...`)}
                                      className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs border border-slate-300 transition-colors flex items-center justify-center gap-1"
                                    >
                                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                                      <span>Imprimir Carta de Porte</span>
                                    </button>
                                  </div>
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
    </div>
  );
};
