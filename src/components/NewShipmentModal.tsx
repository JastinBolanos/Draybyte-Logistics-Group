import React, { useState } from 'react';
import {
  Plus,
  Truck,
  Package,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  FilePlus,
  ShieldCheck
} from 'lucide-react';
import { Shipment, CargoType, PriorityLevel, Vehicle, Warehouse } from '../types/logistics';

interface NewShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateShipment: (shipment: Shipment) => void;
  vehicles: Vehicle[];
  warehouses: Warehouse[];
}

export const NewShipmentModal: React.FC<NewShipmentModalProps> = ({
  isOpen,
  onClose,
  onCreateShipment,
  vehicles,
  warehouses
}) => {
  const [senderCompany, setSenderCompany] = useState('Logix Logistics Hub');
  const [senderCity, setSenderCity] = useState('Ciudad de México');
  const [recipientCompany, setRecipientCompany] = useState('');
  const [recipientCity, setRecipientCity] = useState('Monterrey, NL');
  const [cargoType, setCargoType] = useState<CargoType>('standard');
  const [priority, setPriority] = useState<PriorityLevel>('high');
  const [assignedVehicleId, setAssignedVehicleId] = useState(vehicles[0]?.id || '');
  const [skuItemName, setSkuItemName] = useState('Lote de Mercancía General');
  const [quantity, setQuantity] = useState(500);
  const [weightKg, setWeightKg] = useState(3500);
  const [declaredValueUsd, setDeclaredValueUsd] = useState(45000);
  const [requiresSignature, setRequiresSignature] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientCompany) {
      alert('Por favor ingrese el nombre de la empresa consignataria.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `TRK-2026-${randomSuffix}`;
    const bolNumber = `BOL-${senderCity.slice(0, 3).toUpperCase()}-${recipientCity.slice(0, 3).toUpperCase()}-${randomSuffix}`;

    const newShipment: Shipment = {
      id: `shp-${Date.now()}`,
      trackingNumber,
      referenceBol: bolNumber,
      sender: {
        name: 'Coordinador de Despacho',
        company: senderCompany,
        originHub: 'Hub Central CDMX',
        city: senderCity,
        coords: { lat: 19.4326, lng: -99.1332 }
      },
      recipient: {
        name: 'Receptor Autorizado',
        company: recipientCompany,
        destinationHub: 'Hub Regional',
        city: recipientCity,
        coords: { lat: 25.6866, lng: -100.3161 }
      },
      status: 'in_transit',
      priority,
      cargoType,
      carrier: 'LogixExpress Fleet',
      vehicleId: assignedVehicleId,
      departureTime: new Date().toISOString().replace('T', ' ').slice(0, 16),
      estimatedArrival: '2026-08-22 18:00',
      totalWeightKg: weightKg,
      totalVolumeM3: Math.round(weightKg / 250),
      declaredValueUsd: declaredValueUsd,
      currentMilestone: 'Despachado de patio con telemetría satelital activa',
      requiresSignature,
      items: [
        {
          id: `it-${Date.now()}`,
          sku: `SKU-DSP-${randomSuffix}`,
          name: skuItemName,
          quantity: quantity,
          weightKg: weightKg,
          category: 'Carga General',
          unitValue: Math.round(declaredValueUsd / quantity)
        }
      ],
      events: [
        {
          id: `ev-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          location: senderCity,
          status: 'order_placed',
          description: 'Orden de despacho y Carta de Porte timbrada exitosamente.',
          updatedBy: 'Control Tower'
        }
      ]
    };

    onCreateShipment(newShipment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-5 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <FilePlus className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Crear Nuevo Despacho & Carta Porte</h3>
              <p className="text-[11px] text-slate-500">Asignación de unidad vehicular, manifiesto y cálculo de ruta</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Sender & Recipient */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Origen (Remitente)</span>
              <input
                type="text"
                value={senderCompany}
                onChange={(e) => setSenderCompany(e.target.value)}
                placeholder="Empresa Remitente"
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800 mb-2"
                required
              />
              <input
                type="text"
                value={senderCity}
                onChange={(e) => setSenderCity(e.target.value)}
                placeholder="Ciudad de Origen"
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800"
                required
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Destino (Consignatario)</span>
              <input
                type="text"
                value={recipientCompany}
                onChange={(e) => setRecipientCompany(e.target.value)}
                placeholder="Empresa Destinataria"
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800 mb-2"
                required
              />
              <input
                type="text"
                value={recipientCity}
                onChange={(e) => setRecipientCity(e.target.value)}
                placeholder="Ciudad Destino"
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800"
                required
              />
            </div>
          </div>

          {/* Vehicle Assignment & Cargo Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Unidad Vehicular Asignada:</label>
              <select
                value={assignedVehicleId}
                onChange={(e) => setAssignedVehicleId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.plate} ({v.type}) - Operador: {v.driver.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tipo de Carga / Protocolo:</label>
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value as CargoType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-800"
              >
                <option value="standard">📦 Carga General Estándar</option>
                <option value="cold_chain">❄️ Cadena de Frío (2°C - 8°C)</option>
                <option value="pharmaceutical">🧬 Criogénico / Pharma (-20°C)</option>
                <option value="hazardous">⚠️ Peligrosa / HAZMAT Clase 3</option>
                <option value="high_value">🔒 Alto Valor / Custodia</option>
              </select>
            </div>
          </div>

          {/* Item Description, Quantity & Declared Value */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-3">
              <label className="block font-semibold text-slate-700 mb-1">Descripción de la Carga:</label>
              <input
                type="text"
                value={skuItemName}
                onChange={(e) => setSkuItemName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cantidad Unidades:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Peso Total (kg):</label>
              <input
                type="number"
                min="10"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Valor Declarado (USD):</label>
              <input
                type="number"
                min="100"
                value={declaredValueUsd}
                onChange={(e) => setDeclaredValueUsd(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="sig-check"
              checked={requiresSignature}
              onChange={(e) => setRequiresSignature(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="sig-check" className="text-slate-700 text-xs font-medium cursor-pointer">
              Exigir firma digital de entrega (Proof of Delivery / POD)
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs transition-colors"
            >
              Emitir Despacho & Trazar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
