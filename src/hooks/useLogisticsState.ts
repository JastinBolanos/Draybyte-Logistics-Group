import { useState, useCallback } from 'react';
import {
  INITIAL_VEHICLES,
  INITIAL_SHIPMENTS,
  INITIAL_INVENTORY,
  INITIAL_WAREHOUSES,
  INITIAL_INCIDENTS,
  INITIAL_KPIS
} from '../data/mockLogisticsData';
import {
  Vehicle,
  Shipment,
  InventoryItem,
  Warehouse,
  OperationalIncident,
  SupplyChainKPIs,
  ShipmentStatus
} from '../types/logistics';
import { TelemetryService } from '../services/telemetryService';

export function useLogisticsState() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [warehouses] = useState<Warehouse[]>(INITIAL_WAREHOUSES);
  const [incidents, setIncidents] = useState<OperationalIncident[]>(INITIAL_INCIDENTS);
  const [kpis, setKpis] = useState<SupplyChainKPIs>(INITIAL_KPIS);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(INITIAL_VEHICLES[0]?.id || null);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  const handleSelectVehicle = useCallback((vehicle: Vehicle) => {
    setSelectedVehicleId(vehicle.id);
  }, []);

  const handleRerouteVehicle = useCallback((vehicleId: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? TelemetryService.calculateReroute(v) : v))
    );
    alert('Ruta optimizada con éxito para la unidad. ETA recalculado: -35 minutos.');
  }, []);

  const handleContactDriver = useCallback((driverName: string, phone: string) => {
    alert(`Iniciando canal de voz satelital seguro con operador: ${driverName} (${phone})`);
  }, []);

  const handleCreateShipment = useCallback((newShipment: Shipment) => {
    setShipments((prev) => [newShipment, ...prev]);
    setKpis((prev) => ({
      ...prev,
      activeShipmentsCount: prev.activeShipmentsCount + 1,
      totalInventoryValuationUsd: prev.totalInventoryValuationUsd + newShipment.declaredValueUsd
    }));
  }, []);

  const handleUpdateShipmentStatus = useCallback((shipmentId: string, newStatus: ShipmentStatus) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          return {
            ...s,
            status: newStatus,
            events: [
              ...s.events,
              {
                id: `ev-${Date.now()}`,
                timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
                location: 'Punto de Control Satelital',
                status: newStatus,
                description: `Estado actualizado a "${newStatus}" por Control Tower.`,
                updatedBy: 'Operador Central'
              }
            ]
          };
        }
        return s;
      })
    );
    setSelectedShipment((prev) => (prev && prev.id === shipmentId ? { ...prev, status: newStatus } : prev));
  }, []);

  const handleResolveIncident = useCallback((incidentId: string, resolutionNote: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: 'resolved',
            recommendedAction: `Resuelto: ${resolutionNote}`
          };
        }
        return inc;
      })
    );
    setKpis((prev) => ({
      ...prev,
      activeIncidentsCount: Math.max(0, prev.activeIncidentsCount - 1)
    }));
  }, []);

  const handleStockTransfer = useCallback((sku: string, fromWhId: string, _toWhId: string, qty: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.sku === sku && item.warehouseId === fromWhId) {
          return {
            ...item,
            quantityInStock: Math.max(0, item.quantityInStock - qty),
            quantityAllocated: item.quantityAllocated + qty
          };
        }
        return item;
      })
    );
    alert(`Transferencia inter-hub programada para ${qty} unidades de ${sku}.`);
  }, []);

  const handleRestockItem = useCallback((itemId: string, qty: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantityInStock: item.quantityInStock + qty,
            status: 'optimal'
          };
        }
        return item;
      })
    );
  }, []);

  return {
    vehicles,
    setVehicles,
    shipments,
    setShipments,
    inventory,
    warehouses,
    incidents,
    kpis,
    selectedVehicleId,
    setSelectedVehicleId,
    selectedShipment,
    setSelectedShipment,
    handleSelectVehicle,
    handleRerouteVehicle,
    handleContactDriver,
    handleCreateShipment,
    handleUpdateShipmentStatus,
    handleResolveIncident,
    handleStockTransfer,
    handleRestockItem
  };
}
