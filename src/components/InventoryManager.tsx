import React, { useState } from 'react';
import {
  Boxes,
  Warehouse as WarehouseIcon,
  Search,
  ArrowUpDown,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Plus,
  ArrowRightLeft,
  SlidersHorizontal,
  MapPin,
  Flame,
  Thermometer,
  Shield,
  Layers
} from 'lucide-react';
import { InventoryItem, Warehouse, WarehouseZone, WarehouseDock } from '../types/logistics';
import { LOGISTICS_PHOTOS } from '../data/logisticsImages';
import { useLanguage } from '../i18n/LanguageContext';

interface InventoryManagerProps {
  warehouses: Warehouse[];
  inventory: InventoryItem[];
  onStockTransfer: (sku: string, fromWh: string, toWh: string, qty: number) => void;
  onRestockItem: (itemId: string, qty: number) => void;
  isDense: boolean;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  warehouses,
  inventory,
  onStockTransfer,
  onRestockItem,
  isDense
}) => {
  const { t, language } = useLanguage();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [transferModalOpen, setTransferModalOpen] = useState<boolean>(false);
  const [transferSku, setTransferSku] = useState<string>(inventory[0]?.sku || '');
  const [transferFrom, setTransferFrom] = useState<string>('wh-cdmx');
  const [transferTo, setTransferTo] = useState<string>('wh-mty');
  const [transferQty, setTransferQty] = useState<number>(50);

  const filteredInventory = inventory.filter((item) => {
    if (selectedWarehouseId !== 'all' && item.warehouseId !== selectedWarehouseId) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.sku.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.warehouseName.toLowerCase().includes(q) ||
        item.aisle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedWarehouse = warehouses.find((w) => w.id === selectedWarehouseId) || warehouses[0];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {t.inventory.optimal}
          </span>
        );
      case 'low_stock':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-600" /> {t.inventory.lowStock}
          </span>
        );
      case 'critical_reorder':
        return (
          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 animate-pulse">
            <AlertCircle className="w-3 h-3 text-rose-600" /> {t.inventory.critical}
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-semibold">
            {language === 'es' ? 'Sobrestock' : 'Overstock'}
          </span>
        );
    }
  };

  const getStorageBadge = (condition: string) => {
    switch (condition) {
      case 'chilled_2_8c':
        return <span className="bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.5 rounded text-[10px] font-mono">❄️ 2°C - 8°C</span>;
      case 'frozen_minus_18c':
        return <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 px-1.5 py-0.5 rounded text-[10px] font-mono">🧬 -20°C Cryo</span>;
      case 'hazmat_safe':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded text-[10px] font-mono">☣️ HAZMAT Bunker</span>;
      default:
        return <span className="bg-slate-50 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded text-[10px]">📦 {language === 'es' ? 'Temp Ambiente' : 'Ambient Temp'}</span>;
    }
  };

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (transferFrom === transferTo) {
      alert(language === 'es' ? 'Seleccione almacenes diferentes para la transferencia.' : 'Please select different warehouses for the transfer.');
      return;
    }
    onStockTransfer(transferSku, transferFrom, transferTo, transferQty);
    setTransferModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Warehouse Hub Selector Cards with Images & Occupancy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {warehouses.map((wh) => {
          const isSelected = selectedWarehouseId === wh.id;
          return (
            <div
              key={wh.id}
              onClick={() => setSelectedWarehouseId(selectedWarehouseId === wh.id ? 'all' : wh.id)}
              className={`bg-white rounded-xl border p-3.5 cursor-pointer transition-all shadow-xs overflow-hidden ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono font-bold text-xs bg-slate-900 text-white px-1.5 py-0.5 rounded">
                      {wh.code}
                    </span>
                    <span className="font-bold text-xs text-slate-800">{wh.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {wh.city}
                  </p>
                </div>
              </div>

              {/* Warehouse Capacity Gauge */}
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>{language === 'es' ? 'Ocupación Capacidad' : 'Capacity Occupancy'}</span>
                  <span className="font-mono font-bold text-slate-900">{wh.utilizedPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      wh.utilizedPercent > 88
                        ? 'bg-rose-500'
                        : wh.utilizedPercent > 75
                        ? 'bg-amber-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${wh.utilizedPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Inbound & Outbound summary */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>📥 {language === 'es' ? 'Entradas:' : 'Inbound:'} <strong className="text-slate-800">{wh.inboundToday}</strong></span>
                <span>📤 {language === 'es' ? 'Salidas:' : 'Outbound:'} <strong className="text-slate-800">{wh.outboundToday}</strong></span>
                <span>{language === 'es' ? 'Andenes:' : 'Docks:'} <strong className="text-indigo-600 font-semibold">{wh.activeDocks.length}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Warehouse Live Layout & Dock Bay HUD */}
      {selectedWarehouse && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-slate-200 gap-2 mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                <WarehouseIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {language === 'es' ? 'Infraestructura & Andenes de Carga' : 'Infrastructure & Loading Docks'} — {selectedWarehouse.name} ({selectedWarehouse.code})
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'es' ? 'Superficie Total:' : 'Total Surface:'} {selectedWarehouse.totalCapacityM2.toLocaleString()} m² • {language === 'es' ? 'Gerente:' : 'Manager:'} {selectedWarehouse.managerName} ({selectedWarehouse.phone})
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTransferModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>{t.inventory.transferStock}</span>
              </button>
            </div>
          </div>

          {/* Zones & Docks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Zones Pallet Capacity (5 Cols) */}
            <div className="lg:col-span-5 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                {language === 'es' ? 'Zonas de Almacenamiento & Temperatura' : 'Storage Zones & Temperature'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedWarehouse.zones.map((zone) => {
                  const pct = Math.round((zone.currentPallets / zone.capacityPallets) * 100);
                  return (
                    <div key={zone.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span className="truncate">{zone.name}</span>
                        {zone.temperatureC !== undefined && (
                          <span className="text-[10px] text-sky-600 font-mono flex items-center">
                            <Thermometer className="w-3 h-3 mr-0.5" />
                            {zone.temperatureC}°C
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
                        <span>{zone.currentPallets} / {zone.capacityPallets} {language === 'es' ? 'tarimas' : 'pallets'}</span>
                        <span className="font-mono font-bold text-slate-700">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Dock Door Status HUD (7 Cols) */}
            <div className="lg:col-span-7 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <WarehouseIcon className="w-3.5 h-3.5 text-indigo-600" />
                {language === 'es' ? 'Andenes de Carga / Descarga en Tiempo Real' : 'Real-time Loading / Unloading Docks'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedWarehouse.activeDocks.map((dock) => {
                  const isBusy = dock.status === 'loading' || dock.status === 'unloading';
                  const isMaintenance = dock.status === 'maintenance';
                  return (
                    <div
                      key={dock.id}
                      className={`p-2 rounded-lg border text-xs ${
                        dock.status === 'unloading'
                          ? 'bg-indigo-50/80 border-indigo-200 text-indigo-900'
                          : dock.status === 'loading'
                          ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                          : isMaintenance
                          ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                          : 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-mono">{language === 'es' ? 'Andén' : 'Dock'} #{dock.dockNumber}</span>
                        <span className="text-[9px] uppercase font-semibold px-1 py-0.2 rounded bg-white/70">
                          {dock.type}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] font-semibold capitalize">
                        {dock.status === 'unloading' ? (language === 'es' ? '📥 Descargando' : '📥 Unloading') : dock.status === 'loading' ? (language === 'es' ? '📤 Cargando' : '📤 Loading') : dock.status === 'maintenance' ? (language === 'es' ? '🔧 Mantto.' : '🔧 Maint.') : (language === 'es' ? '✅ Disponible' : '✅ Available')}
                      </div>
                      {dock.assignedVehiclePlate && (
                        <div className="mt-1 text-[10px] font-mono text-slate-700 font-bold">
                          🚛 {dock.assignedVehiclePlate}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar for SKU Inventory */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.inventory.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
            <span className="text-xs text-slate-500 font-medium mr-1">{t.inventory.stockHealth}:</span>
            {[
              { id: 'all', label: t.all },
              { id: 'optimal', label: t.inventory.optimal },
              { id: 'low_stock', label: t.inventory.lowStock },
              { id: 'critical_reorder', label: t.inventory.critical }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`text-xs px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  statusFilter === st.id ? 'bg-slate-900 text-white font-medium' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          {language === 'es' ? 'Mostrando' : 'Showing'} <strong>{filteredInventory.length}</strong> {language === 'es' ? 'artículos SKU' : 'SKU items'}
        </div>
      </div>

      {/* High-Density SKU Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">{t.inventory.colSku}</th>
                <th className="p-3">{t.inventory.colCategory}</th>
                <th className="p-3">{t.inventory.colWarehouse}</th>
                <th className="p-3 text-right">{t.inventory.colStock}</th>
                <th className="p-3 text-center">{t.inventory.colReorder}</th>
                <th className="p-3 text-center">{t.inventory.colHealth}</th>
                <th className="p-3 text-right">{t.inventory.colValuation}</th>
                <th className="p-3 text-right">{t.inventory.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.map((item) => {
                const totalVal = item.quantityInStock * item.unitPriceUsd;
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    {/* SKU & Name */}
                    <td className="p-3">
                      <div className="flex items-center space-x-2.5">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-9 h-9 rounded object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div>
                          <span className="font-mono font-bold text-slate-900 block text-xs">
                            {item.sku}
                          </span>
                          <span className="text-slate-600 text-[11px] font-medium truncate max-w-[220px] block">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category & Condition */}
                    <td className="p-3">
                      <div className="font-medium text-slate-800">{item.category}</div>
                      <div className="mt-1">{getStorageBadge(item.storageCondition)}</div>
                    </td>

                    {/* Warehouse & Location */}
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{item.warehouseName}</div>
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 inline-block mt-0.5">
                        {item.aisle} • {item.bay} ({language === 'es' ? 'Nivel' : 'Level'} {item.tier})
                      </span>
                    </td>

                    {/* Stock Numbers */}
                    <td className="p-3 text-right font-mono">
                      <div className="font-bold text-slate-900 text-xs">
                        {item.quantityInStock.toLocaleString()} {language === 'es' ? 'uds.' : 'units'}
                      </div>
                      <span className="text-[10px] text-amber-600">
                        {item.quantityAllocated.toLocaleString()} {language === 'es' ? 'asignadas' : 'allocated'}
                      </span>
                    </td>

                    {/* Safety Stock / Reorder Point */}
                    <td className="p-3 text-center font-mono">
                      <span className="text-slate-700 text-xs">
                        Min: {item.reorderPoint.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {language === 'es' ? 'Seguridad:' : 'Safety:'} {item.safetyStock.toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-3 text-center">
                      <div className="flex justify-center">{getStatusBadge(item.status)}</div>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        {language === 'es' ? 'Rotación:' : 'Turnover:'} {item.turnoverDays} {language === 'es' ? 'días' : 'days'}
                      </span>
                    </td>

                    {/* Valuation */}
                    <td className="p-3 text-right font-mono">
                      <div className="font-bold text-slate-900 text-xs">
                        ${totalVal.toLocaleString()} USD
                      </div>
                      <span className="text-[10px] text-slate-500">
                        ${item.unitPriceUsd} / ud
                      </span>
                    </td>

                    {/* Quick Restock Action */}
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onRestockItem(item.id, 500)}
                        title={language === 'es' ? 'Reabastecer 500 unidades' : 'Restock 500 units'}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                      >
                        + {t.inventory.quickRestock}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer Stock Modal Dialog */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center space-x-2">
                <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">{t.inventory.transferTitle}</h3>
              </div>
              <button
                onClick={() => setTransferModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t.inventory.transferItem}</label>
                <select
                  value={transferSku}
                  onChange={(e) => setTransferSku(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                >
                  {inventory.map((inv) => (
                    <option key={inv.id} value={inv.sku}>
                      {inv.sku} - {inv.name} (Stock: {inv.quantityInStock})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t.inventory.transferOrigin}</label>
                  <select
                    value={transferFrom}
                    onChange={(e) => setTransferFrom(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                  >
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t.inventory.transferDest}</label>
                  <select
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                  >
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t.inventory.transferQuantity}</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={transferQty}
                  onChange={(e) => setTransferQty(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
                />
              </div>

              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-indigo-900 text-[11px]">
                ℹ️ {t.inventory.transferNote}
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-semibold cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs cursor-pointer"
                >
                  {t.inventory.confirmTransfer}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
