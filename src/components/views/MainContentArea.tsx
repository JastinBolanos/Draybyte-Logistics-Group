import React from 'react';
import { ActiveTab } from '../../domain/navigation';
import {
  Vehicle,
  Shipment,
  InventoryItem,
  Warehouse,
  OperationalIncident,
  SupplyChainKPIs
} from '../../types/logistics';
import { FleetMonitor } from '../FleetMonitor';
import { ShipmentManager } from '../ShipmentManager';
import { InventoryManager } from '../InventoryManager';
import { IncidentsManager } from '../IncidentsManager';
import { RouteOptimizerAI } from '../RouteOptimizerAI';
import { AnalyticsView } from '../AnalyticsView';
import { LogisticsGallery } from '../LogisticsGallery';

interface MainContentAreaProps {
  activeTab: ActiveTab;
  isDense: boolean;
  // Fleet
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onSelectVehicle: (v: Vehicle) => void;
  onRerouteVehicle: (vehicleId: string) => void;
  onContactDriver: (name: string, phone: string) => void;
  // Shipments
  shipments: Shipment[];
  onSelectShipment: (s: Shipment) => void;
  onNewShipment: () => void;
  onScanBarcode: () => void;
  // Inventory
  warehouses: Warehouse[];
  inventory: InventoryItem[];
  onStockTransfer: (sku: string, fromWhId: string, toWhId: string, qty: number) => void;
  onRestockItem: (itemId: string, qty: number) => void;
  // Incidents
  incidents: OperationalIncident[];
  onResolveIncident: (incidentId: string, resolutionNote: string) => void;
  // KPIs
  kpis: SupplyChainKPIs;
}

export const MainContentArea: React.FC<MainContentAreaProps> = ({
  activeTab,
  isDense,
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  onRerouteVehicle,
  onContactDriver,
  shipments,
  onSelectShipment,
  onNewShipment,
  onScanBarcode,
  warehouses,
  inventory,
  onStockTransfer,
  onRestockItem,
  incidents,
  onResolveIncident,
  kpis
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
      {activeTab === 'fleet' && (
        <FleetMonitor
          vehicles={vehicles}
          onSelectVehicle={onSelectVehicle}
          selectedVehicleId={selectedVehicleId}
          onRerouteVehicle={onRerouteVehicle}
          onContactDriver={onContactDriver}
          isDense={isDense}
        />
      )}

      {activeTab === 'shipments' && (
        <ShipmentManager
          shipments={shipments}
          onSelectShipment={onSelectShipment}
          onNewShipment={onNewShipment}
          onScanBarcode={onScanBarcode}
          isDense={isDense}
        />
      )}

      {activeTab === 'inventory' && (
        <InventoryManager
          warehouses={warehouses}
          inventory={inventory}
          onStockTransfer={onStockTransfer}
          onRestockItem={onRestockItem}
          isDense={isDense}
        />
      )}

      {activeTab === 'incidents' && (
        <IncidentsManager
          incidents={incidents}
          onResolveIncident={onResolveIncident}
          isDense={isDense}
        />
      )}

      {activeTab === 'optimizer' && (
        <RouteOptimizerAI
          vehicles={vehicles}
          shipments={shipments}
          inventory={inventory}
          onApplyReroute={onRerouteVehicle}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView kpis={kpis} isDense={isDense} />
      )}

      {/* Logistics Hubs & Fleet Imagery Showcase */}
      <LogisticsGallery />
    </div>
  );
};
