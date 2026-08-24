import React from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  MapPin,
  Truck,
  Printer,
  QrCode,
  ShieldCheck,
  Thermometer,
  Layers,
  UserCheck
} from 'lucide-react';
import { Shipment } from '../types/logistics';
import { useLanguage } from '../i18n/LanguageContext';

interface ShipmentModalProps {
  shipment: Shipment | null;
  onClose: () => void;
  onUpdateStatus: (shipmentId: string, newStatus: any) => void;
}

export const ShipmentModal: React.FC<ShipmentModalProps> = ({
  shipment,
  onClose,
  onUpdateStatus
}) => {
  const { t, language } = useLanguage();
  if (!shipment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header with Tracking & Bill of Lading */}
        <div className="flex flex-wrap items-start justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                <Package className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-mono">
                  {shipment.trackingNumber}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {language === 'es' ? 'Carta de Porte / BOL:' : 'Bill of Lading / BOL:'} {shipment.referenceBol}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.shipmentDetails.printWaybill}</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 font-bold text-base px-2 py-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Origin to Destination Route Banner */}
        <div className="my-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-2 border-indigo-600 pl-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t.shipmentDetails.originShipper}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">{shipment.sender.company}</h4>
              <p className="text-xs text-slate-600">{shipment.sender.name}</p>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {shipment.sender.originHub} • {shipment.sender.city}
              </p>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                {language === 'es' ? 'Salida:' : 'Departure:'} {shipment.departureTime}
              </span>
            </div>

            <div className="border-l-2 border-emerald-500 pl-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {t.shipmentDetails.destinationConsignee}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">{shipment.recipient.company}</h4>
              <p className="text-xs text-slate-600">{shipment.recipient.name}</p>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" />
                {shipment.recipient.destinationHub} • {shipment.recipient.city}
              </p>
              <span className="text-[10px] text-emerald-700 font-mono font-bold mt-1 block">
                {language === 'es' ? 'ETA Programado:' : 'Scheduled ETA:'} {shipment.estimatedArrival}
              </span>
            </div>
          </div>
        </div>

        {/* Cargo Telemetry Details & Temperature Log (If Cold Chain) */}
        {shipment.temperatureLogged && shipment.temperatureLogged.length > 0 && (
          <div className="mb-4 p-3 bg-sky-50 rounded-xl border border-sky-200">
            <div className="flex items-center justify-between text-xs font-semibold text-sky-950 mb-2">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-sky-600" />
                {language === 'es' ? 'Registro Continuo de Cadena de Frío IoT (2°C a 8°C)' : 'IoT Cold Chain Continuous Log (2°C to 8°C)'}
              </span>
              <span className="text-emerald-700 font-bold font-mono">
                {language === 'es' ? 'Actual:' : 'Current:'} {shipment.temperatureLogged[shipment.temperatureLogged.length - 1]}°C ✅ {language === 'es' ? 'Cumple GxP' : 'GxP Compliant'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] font-mono">
              {shipment.temperatureLogged.map((temp, idx) => (
                <div key={idx} className="flex-1 bg-white p-1.5 rounded border border-sky-100 text-center">
                  <span className="text-[9px] text-slate-400 block">T-{idx * 15}m</span>
                  <span className="font-bold text-sky-900">{temp}°C</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Item Manifest Table */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            {t.shipmentDetails.manifestTitle} ({shipment.items.length} {language === 'es' ? 'partidas' : 'items'})
          </h4>
          <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">SKU</th>
                  <th className="p-2.5">{t.shipmentDetails.colDescription}</th>
                  <th className="p-2.5 text-center">{t.shipmentDetails.colQty}</th>
                  <th className="p-2.5 text-right">{t.shipmentDetails.colWeight}</th>
                  <th className="p-2.5 text-right">{t.shipmentDetails.colValue}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shipment.items.map((it) => (
                  <tr key={it.id}>
                    <td className="p-2.5 font-mono font-bold text-slate-800">{it.sku}</td>
                    <td className="p-2.5 text-slate-700">{it.name}</td>
                    <td className="p-2.5 text-center font-mono font-bold">{it.quantity.toLocaleString()}</td>
                    <td className="p-2.5 text-right font-mono">{it.weightKg.toLocaleString()} kg</td>
                    <td className="p-2.5 text-right font-mono">${it.unitValue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 flex justify-between text-xs font-mono text-slate-700 px-1">
            <span>{t.shipmentDetails.totalWeight}: <strong>{shipment.totalWeightKg.toLocaleString()} kg</strong></span>
            <span>{t.shipmentDetails.totalVolume}: <strong>{shipment.totalVolumeM3} m³</strong></span>
            <span>{t.shipmentDetails.declaredValue}: <strong>${shipment.declaredValueUsd.toLocaleString()} USD</strong></span>
          </div>
        </div>

        {/* Event Timeline */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            {t.shipmentDetails.timelineTitle}
          </h4>
          <div className="space-y-2 border-l-2 border-slate-200 ml-2 pl-3 text-xs">
            {shipment.events.map((ev) => (
              <div key={ev.id} className="relative">
                <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white"></span>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="font-mono font-bold text-slate-900">{ev.timestamp}</span>
                  <span className="text-slate-500">•</span>
                  <span className="font-semibold text-indigo-700">{ev.location}</span>
                  <span className="text-slate-400">({ev.updatedBy})</span>
                </div>
                <p className="text-slate-700 mt-0.5 text-xs">{ev.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500">{language === 'es' ? 'Cambiar estado rápido:' : 'Quick status change:'}</span>
            {shipment.status !== 'delivered' && (
              <button
                onClick={() => onUpdateStatus(shipment.id, 'delivered')}
                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                {t.shipmentDetails.markDelivered}
              </button>
            )}
            {shipment.status !== 'in_transit' && (
              <button
                onClick={() => onUpdateStatus(shipment.id, 'in_transit')}
                className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                {t.shipmentDetails.markInTransit}
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
