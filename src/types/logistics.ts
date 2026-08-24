export type FleetStatus = 'in_transit' | 'idle' | 'loading' | 'unloading' | 'maintenance' | 'alert';
export type CargoType = 'standard' | 'cold_chain' | 'hazardous' | 'high_value' | 'bulk' | 'pharmaceutical';
export type ShipmentStatus = 'order_placed' | 'processing' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception' | 'customs_hold';
export type PriorityLevel = 'urgent' | 'high' | 'standard' | 'economy';
export type IncidentSeverity = 'critical' | 'warning' | 'info';

export interface Coordinates {
  lat: number;
  lng: number;
  address?: string;
  city?: string;
}

export interface VehicleTelemetry {
  speedKmh: number;
  engineTempC: number;
  fuelLevelPercent: number; // or battery
  cargoTempC?: number; // for cold chain
  targetTempC?: number;
  tirePressurePsi: number;
  odometerKm: number;
  rpm: number;
  co2EmissionsKg: number;
  lastPing: string;
}

export interface DriverInfo {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  licenseNumber: string;
  safetyScore: number;
  hoursOnDuty: number; // HOS compliance
  maxHoursPerShift: number;
}

export interface Vehicle {
  id: string;
  plate: string;
  unitCode: string;
  type: 'Semi-Trailer' | 'Box Truck' | 'Electric Van' | 'Refrigerated 40T' | 'Intermodal Rail' | 'Cargo Drone';
  model: string;
  status: FleetStatus;
  cargoType: CargoType;
  currentLocation: Coordinates;
  headingDeg: number;
  telemetry: VehicleTelemetry;
  driver: DriverInfo;
  assignedShipmentIds: string[];
  destination: Coordinates;
  origin: Coordinates;
  routeProgress: number; // 0 to 100%
  etaMinutes: number;
  fuelType: 'Diesel' | 'Electric' | 'Hybrid' | 'LNG';
  maxCapacityKg: number;
  currentLoadKg: number;
  maintenanceDueKm: number;
}

export interface PackageItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  weightKg: number;
  category: string;
  unitValue: number;
}

export interface ShipmentEvent {
  id: string;
  timestamp: string;
  location: string;
  status: ShipmentStatus;
  description: string;
  updatedBy: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  referenceBol: string; // Bill of Lading
  sender: {
    name: string;
    company: string;
    originHub: string;
    city: string;
    coords: Coordinates;
  };
  recipient: {
    name: string;
    company: string;
    destinationHub: string;
    city: string;
    coords: Coordinates;
  };
  status: ShipmentStatus;
  priority: PriorityLevel;
  cargoType: CargoType;
  carrier: string;
  vehicleId?: string;
  departureTime: string;
  estimatedArrival: string;
  actualArrival?: string;
  items: PackageItem[];
  totalWeightKg: number;
  totalVolumeM3: number;
  declaredValueUsd: number;
  currentMilestone: string;
  events: ShipmentEvent[];
  temperatureLogged?: number[];
  requiresSignature: boolean;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouseId: string;
  warehouseName: string;
  aisle: string;
  bay: string;
  tier: number;
  quantityInStock: number;
  quantityAllocated: number;
  safetyStock: number;
  reorderPoint: number;
  maxCapacity: number;
  unitPriceUsd: number;
  unitWeightKg: number;
  turnoverDays: number;
  status: 'optimal' | 'low_stock' | 'critical_reorder' | 'overstock';
  lastRestocked: string;
  storageCondition: 'ambient' | 'chilled_2_8c' | 'frozen_minus_18c' | 'hazmat_safe';
  imageUrl?: string;
}

export interface WarehouseDock {
  id: string;
  dockNumber: number;
  type: 'inbound' | 'outbound' | 'hybrid';
  status: 'available' | 'loading' | 'unloading' | 'reserved' | 'maintenance';
  assignedVehiclePlate?: string;
  assignedShipmentId?: string;
  scheduledTime?: string;
}

export interface WarehouseZone {
  id: string;
  name: string;
  code: string;
  capacityPallets: number;
  currentPallets: number;
  temperatureC?: number;
  type: 'ambient' | 'cold' | 'frozen' | 'high_security' | 'fast_pick';
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  coords: Coordinates;
  totalCapacityM2: number;
  utilizedPercent: number;
  activeDocks: WarehouseDock[];
  zones: WarehouseZone[];
  inboundToday: number;
  outboundToday: number;
  managerName: string;
  phone: string;
  imageUrl: string;
}

export interface OperationalIncident {
  id: string;
  code: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  category: 'Cold Chain' | 'Traffic & Delay' | 'Mechanical' | 'Security / Geofence' | 'Documentation / Customs' | 'Weather';
  timestamp: string;
  relatedVehicleId?: string;
  relatedShipmentId?: string;
  relatedWarehouseId?: string;
  status: 'open' | 'investigating' | 'resolved';
  recommendedAction: string;
  locationName: string;
}

export interface SupplyChainKPIs {
  totalActiveFleet: number;
  fleetInTransit: number;
  onTimeDeliveryRate: number; // percentage (e.g. 96.8%)
  activeShipmentsCount: number;
  totalInventoryValuationUsd: number;
  warehouseUtilizationAvg: number; // percentage
  fuelEfficiencyKmPerL: number;
  co2SavedPercent: number;
  activeIncidentsCount: number;
  slaBreachRiskCount: number;
}
