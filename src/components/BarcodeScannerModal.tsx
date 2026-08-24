import React, { useState } from 'react';
import {
  QrCode,
  Scan,
  CheckCircle2,
  Package,
  Search,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Shipment } from '../types/logistics';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipments: Shipment[];
  onSelectShipment: (shipment: Shipment) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  shipments,
  onSelectShipment
}) => {
  const [scannedCode, setScannedCode] = useState<string>('');
  const [matchedShipment, setMatchedShipment] = useState<Shipment | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (tracking: string) => {
    setScannedCode(tracking);
    const found = shipments.find((s) => s.trackingNumber.toLowerCase() === tracking.toLowerCase());
    setMatchedShipment(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <Scan className="w-5 h-5 text-indigo-600 animate-pulse" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Escáner de Guías & Códigos de Barras</h3>
              <p className="text-[11px] text-slate-500">Recepción en andén y validación rápida de bultos</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">
            ✕
          </button>
        </div>

        {/* Optical Scanner Viewport Simulator */}
        <div className="relative bg-slate-950 rounded-xl h-44 overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-indigo-500/50 p-4">
          <div className="w-48 h-28 border-2 border-indigo-400 rounded-lg relative flex items-center justify-center">
            {/* Laser Line */}
            <div className="absolute inset-x-0 h-0.5 bg-rose-500 animate-bounce shadow-[0_0_8px_#f43f5e]"></div>
            <QrCode className="w-16 h-16 text-indigo-400/40" />
          </div>
          <span className="text-[11px] text-slate-400 mt-2 font-mono">
            Alinee el código de barras o QR de la guía
          </span>
        </div>

        {/* Quick Test Barcodes */}
        <div className="mt-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
            Simular Escaneo Rápido de Guías Activas:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {shipments.slice(0, 4).map((s) => (
              <button
                key={s.id}
                onClick={() => handleSimulateScan(s.trackingNumber)}
                className="text-[10px] font-mono font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-800 px-2 py-1 rounded border border-slate-200 transition-colors"
              >
                {s.trackingNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Match Result Card */}
        {matchedShipment && (
          <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
            <div className="flex items-center justify-between font-bold text-emerald-950">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Guía Identificada con Éxito
              </span>
              <span className="font-mono">{matchedShipment.trackingNumber}</span>
            </div>
            <div className="mt-1 text-slate-700 text-[11px]">
              <div><strong>De:</strong> {matchedShipment.sender.company} ({matchedShipment.sender.city})</div>
              <div><strong>A:</strong> {matchedShipment.recipient.company} ({matchedShipment.recipient.city})</div>
              <div><strong>Estado:</strong> {matchedShipment.status} • {matchedShipment.totalWeightKg} kg</div>
            </div>
            <button
              onClick={() => {
                onSelectShipment(matchedShipment);
                onClose();
              }}
              className="mt-2 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1"
            >
              <span>Abrir Manifiesto Completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold"
          >
            Cerrar Escáner
          </button>
        </div>
      </div>
    </div>
  );
};
