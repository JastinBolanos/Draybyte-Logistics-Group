import {
  Vehicle,
  Shipment,
  InventoryItem,
  Warehouse,
  OperationalIncident,
  SupplyChainKPIs
} from '../types/logistics';

export const INITIAL_WAREHOUSES: Warehouse[] = [
  {
    id: 'wh-cdmx',
    name: 'Hub Metropolitano Central',
    code: 'CDMX-H01',
    city: 'Ciudad de México',
    country: 'México',
    coords: { lat: 19.4326, lng: -99.1332, address: 'Parque Industrial Vallejo, Nave 4' },
    totalCapacityM2: 45000,
    utilizedPercent: 82.5,
    inboundToday: 42,
    outboundToday: 68,
    managerName: 'Ing. Carlos Mendoza',
    phone: '+52 55 4920 1840',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    zones: [
      { id: 'z1', name: 'Zona A - Racks Pallet Pesado', code: 'Z-PAL', capacityPallets: 4200, currentPallets: 3650, type: 'ambient' },
      { id: 'z2', name: 'Zona B - Cadena de Frío (2°C a 8°C)', code: 'Z-COLD', capacityPallets: 1200, currentPallets: 980, temperatureC: 3.8, type: 'cold' },
      { id: 'z3', name: 'Zona C - Alta Seguridad / Electrónica', code: 'Z-SEC', capacityPallets: 800, currentPallets: 610, type: 'high_security' },
      { id: 'z4', name: 'Zona D - Fast-Pick & E-commerce', code: 'Z-PICK', capacityPallets: 2000, currentPallets: 1820, type: 'fast_pick' }
    ],
    activeDocks: [
      { id: 'd1', dockNumber: 1, type: 'inbound', status: 'unloading', assignedVehiclePlate: 'TRK-4921', assignedShipmentId: 'SHP-8091', scheduledTime: '12:30' },
      { id: 'd2', dockNumber: 2, type: 'inbound', status: 'available', scheduledTime: '13:45' },
      { id: 'd3', dockNumber: 3, type: 'inbound', status: 'unloading', assignedVehiclePlate: 'TRK-8812', assignedShipmentId: 'SHP-8094', scheduledTime: '12:15' },
      { id: 'd4', dockNumber: 4, type: 'outbound', status: 'loading', assignedVehiclePlate: 'VAN-2041', assignedShipmentId: 'SHP-8092', scheduledTime: '13:00' },
      { id: 'd5', dockNumber: 5, type: 'outbound', status: 'loading', assignedVehiclePlate: 'TRK-1109', assignedShipmentId: 'SHP-8095', scheduledTime: '13:10' },
      { id: 'd6', dockNumber: 6, type: 'outbound', status: 'available' },
      { id: 'd7', dockNumber: 7, type: 'hybrid', status: 'reserved', scheduledTime: '14:00' },
      { id: 'd8', dockNumber: 8, type: 'hybrid', status: 'maintenance' }
    ]
  },
  {
    id: 'wh-mty',
    name: 'Mega-Hub Industrial Norte',
    code: 'MTY-H02',
    city: 'Monterrey, NL',
    country: 'México',
    coords: { lat: 25.6866, lng: -100.3161, address: 'Parque Logístico Apodaca II' },
    totalCapacityM2: 62000,
    utilizedPercent: 74.0,
    inboundToday: 58,
    outboundToday: 51,
    managerName: 'Lic. Mariana Garza',
    phone: '+52 81 8329 9901',
    imageUrl: 'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=800&q=80',
    zones: [
      { id: 'z1', name: 'Zona Automotriz & Partes', code: 'Z-AUTO', capacityPallets: 6500, currentPallets: 4900, type: 'ambient' },
      { id: 'z2', name: 'Zona Cross-Docking Transfronterizo', code: 'Z-CROSS', capacityPallets: 3000, currentPallets: 2150, type: 'fast_pick' },
      { id: 'z3', name: 'Zona Frío Farmacéutico', code: 'Z-COLD', capacityPallets: 900, currentPallets: 680, temperatureC: 4.2, type: 'cold' }
    ],
    activeDocks: [
      { id: 'd1', dockNumber: 1, type: 'inbound', status: 'unloading', assignedVehiclePlate: 'TRK-9901', scheduledTime: '12:00' },
      { id: 'd2', dockNumber: 2, type: 'outbound', status: 'loading', assignedVehiclePlate: 'TRK-7721', scheduledTime: '13:00' },
      { id: 'd3', dockNumber: 3, type: 'outbound', status: 'available' },
      { id: 'd4', dockNumber: 4, type: 'inbound', status: 'available' }
    ]
  },
  {
    id: 'wh-gdl',
    name: 'Centro de Distribución Bajío Occidente',
    code: 'GDL-H03',
    city: 'Guadalajara, JAL',
    country: 'México',
    coords: { lat: 20.6597, lng: -103.3496, address: 'Periférico Sur Km 14, Tlaquepaque' },
    totalCapacityM2: 38000,
    utilizedPercent: 89.2,
    inboundToday: 34,
    outboundToday: 46,
    managerName: 'Ing. Rodrigo Cárdenas',
    phone: '+52 33 3812 4490',
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
    zones: [
      { id: 'z1', name: 'Zona Agroindustrial & Perecederos', code: 'Z-AGRO', capacityPallets: 2800, currentPallets: 2600, temperatureC: 5.1, type: 'cold' },
      { id: 'z2', name: 'Zona Electrónica de Precisión', code: 'Z-ELEC', capacityPallets: 2200, currentPallets: 1850, type: 'high_security' }
    ],
    activeDocks: [
      { id: 'd1', dockNumber: 1, type: 'inbound', status: 'loading', assignedVehiclePlate: 'TRK-3341', scheduledTime: '12:40' },
      { id: 'd2', dockNumber: 2, type: 'outbound', status: 'available' }
    ]
  },
  {
    id: 'wh-mzn',
    name: 'Terminal Logística Puerto Manzanillo',
    code: 'MZN-P01',
    city: 'Manzanillo, COL',
    country: 'México',
    coords: { lat: 19.0522, lng: -104.3159, address: 'Zona Aduanal Fiscalizada Muelle 3' },
    totalCapacityM2: 75000,
    utilizedPercent: 91.8,
    inboundToday: 85,
    outboundToday: 79,
    managerName: 'Cap. Fernando Arrieta',
    phone: '+52 314 331 0922',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    zones: [
      { id: 'z1', name: 'Patio de Contenedores TEU', code: 'Z-TEU', capacityPallets: 12000, currentPallets: 11100, type: 'ambient' },
      { id: 'z2', name: 'Reefer Station Frigorífica', code: 'Z-REEFER', capacityPallets: 3500, currentPallets: 3100, temperatureC: -18.5, type: 'frozen' }
    ],
    activeDocks: [
      { id: 'd1', dockNumber: 1, type: 'hybrid', status: 'unloading', assignedVehiclePlate: 'TRK-5520', scheduledTime: '11:30' },
      { id: 'd2', dockNumber: 2, type: 'hybrid', status: 'loading', assignedVehiclePlate: 'TRK-6644', scheduledTime: '12:50' }
    ]
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-01',
    plate: 'TRK-4921',
    unitCode: 'UNIT-TX801',
    type: 'Refrigerated 40T',
    model: 'Freightliner Cascadia ThermoKing',
    status: 'in_transit',
    cargoType: 'cold_chain',
    currentLocation: { lat: 20.8900, lng: -99.8200, address: 'Autopista México-Querétaro Km 142', city: 'San Juan del Río' },
    headingDeg: 325,
    origin: { lat: 19.4326, lng: -99.1332, city: 'CDMX Hub' },
    destination: { lat: 20.6597, lng: -103.3496, city: 'Guadalajara Hub' },
    routeProgress: 58,
    etaMinutes: 110,
    fuelType: 'Diesel',
    maxCapacityKg: 28000,
    currentLoadKg: 22400,
    maintenanceDueKm: 14200,
    assignedShipmentIds: ['SHP-8091', 'SHP-8097'],
    telemetry: {
      speedKmh: 84,
      engineTempC: 89,
      fuelLevelPercent: 73,
      cargoTempC: 3.4,
      targetTempC: 4.0,
      tirePressurePsi: 108,
      odometerKm: 218450,
      rpm: 1450,
      co2EmissionsKg: 124.5,
      lastPing: 'Hace 12 seg'
    },
    driver: {
      id: 'drv-01',
      name: 'Manuel Alejandro Trejo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+52 55 9182 3341',
      licenseNumber: 'MX-FED-99214',
      safetyScore: 98,
      hoursOnDuty: 4.5,
      maxHoursPerShift: 10
    }
  },
  {
    id: 'veh-02',
    plate: 'VAN-2041',
    unitCode: 'EV-LAST50',
    type: 'Electric Van',
    model: 'Mercedes-Benz eSprinter Cargo',
    status: 'in_transit',
    cargoType: 'high_value',
    currentLocation: { lat: 19.4180, lng: -99.1720, address: 'Av. Paseo de la Reforma, Polanco', city: 'CDMX' },
    headingDeg: 190,
    origin: { lat: 19.4326, lng: -99.1332, city: 'CDMX Hub' },
    destination: { lat: 19.3620, lng: -99.2700, city: 'Santa Fe Corporativo' },
    routeProgress: 76,
    etaMinutes: 22,
    fuelType: 'Electric',
    maxCapacityKg: 3500,
    currentLoadKg: 1890,
    maintenanceDueKm: 8500,
    assignedShipmentIds: ['SHP-8092'],
    telemetry: {
      speedKmh: 42,
      engineTempC: 45,
      fuelLevelPercent: 68, // Battery %
      tirePressurePsi: 48,
      odometerKm: 34100,
      rpm: 2100,
      co2EmissionsKg: 0,
      lastPing: 'Hace 4 seg'
    },
    driver: {
      id: 'drv-02',
      name: 'Valeria Solís Ramírez',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      phone: '+52 55 7712 9043',
      licenseNumber: 'MX-FED-88410',
      safetyScore: 99,
      hoursOnDuty: 3.2,
      maxHoursPerShift: 8
    }
  },
  {
    id: 'veh-03',
    plate: 'TRK-8812',
    unitCode: 'SEMI-NAFTA04',
    type: 'Semi-Trailer',
    model: 'Kenworth T680 Heavy Haul',
    status: 'alert',
    cargoType: 'hazardous',
    currentLocation: { lat: 23.6345, lng: -100.8200, address: 'Carretera Federal 57 Matehuala', city: 'San Luis Potosí' },
    headingDeg: 15,
    origin: { lat: 19.4326, lng: -99.1332, city: 'CDMX Hub' },
    destination: { lat: 25.6866, lng: -100.3161, city: 'Monterrey Hub' },
    routeProgress: 42,
    etaMinutes: 245,
    fuelType: 'Diesel',
    maxCapacityKg: 34000,
    currentLoadKg: 31200,
    maintenanceDueKm: 3200,
    assignedShipmentIds: ['SHP-8094'],
    telemetry: {
      speedKmh: 12, // Slowed down / alert
      engineTempC: 98, // High temp
      fuelLevelPercent: 41,
      tirePressurePsi: 92, // Low tire pressure warning
      odometerKm: 489200,
      rpm: 950,
      co2EmissionsKg: 380.0,
      lastPing: 'Hace 8 seg'
    },
    driver: {
      id: 'drv-03',
      name: 'Héctor Daniel Morales',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      phone: '+52 81 1239 8844',
      licenseNumber: 'MX-FED-10492',
      safetyScore: 91,
      hoursOnDuty: 6.8,
      maxHoursPerShift: 10
    }
  },
  {
    id: 'veh-04',
    plate: 'TRK-5520',
    unitCode: 'PORT-MZN08',
    type: 'Semi-Trailer',
    model: 'Volvo VNL 860 Intermodal',
    status: 'in_transit',
    cargoType: 'bulk',
    currentLocation: { lat: 19.7800, lng: -103.4500, address: 'Autopista Colima-Guadalajara Km 89', city: 'Sayula' },
    headingDeg: 45,
    origin: { lat: 19.0522, lng: -104.3159, city: 'Puerto Manzanillo' },
    destination: { lat: 20.6597, lng: -103.3496, city: 'Guadalajara Hub' },
    routeProgress: 65,
    etaMinutes: 75,
    fuelType: 'LNG',
    maxCapacityKg: 32000,
    currentLoadKg: 28500,
    maintenanceDueKm: 18900,
    assignedShipmentIds: ['SHP-8096'],
    telemetry: {
      speedKmh: 78,
      engineTempC: 86,
      fuelLevelPercent: 82,
      tirePressurePsi: 105,
      odometerKm: 145200,
      rpm: 1380,
      co2EmissionsKg: 98.2,
      lastPing: 'Hace 15 seg'
    },
    driver: {
      id: 'drv-04',
      name: 'Gustavo Adolfo Peña',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      phone: '+52 314 901 2231',
      licenseNumber: 'MX-FED-77192',
      safetyScore: 96,
      hoursOnDuty: 3.8,
      maxHoursPerShift: 10
    }
  },
  {
    id: 'veh-05',
    plate: 'TRK-1109',
    unitCode: 'BOX-EXP12',
    type: 'Box Truck',
    model: 'Isuzu Forward FTR 12T',
    status: 'loading',
    cargoType: 'standard',
    currentLocation: { lat: 19.4326, lng: -99.1332, address: 'Andén 5, Hub Central Vallejo', city: 'CDMX' },
    headingDeg: 0,
    origin: { lat: 19.4326, lng: -99.1332, city: 'CDMX Hub' },
    destination: { lat: 19.1738, lng: -96.1342, city: 'Puerto Veracruz' },
    routeProgress: 0,
    etaMinutes: 310,
    fuelType: 'Diesel',
    maxCapacityKg: 12000,
    currentLoadKg: 9400,
    maintenanceDueKm: 11200,
    assignedShipmentIds: ['SHP-8095'],
    telemetry: {
      speedKmh: 0,
      engineTempC: 62,
      fuelLevelPercent: 95,
      tirePressurePsi: 95,
      odometerKm: 98400,
      rpm: 700,
      co2EmissionsKg: 12.0,
      lastPing: 'Hace 2 seg'
    },
    driver: {
      id: 'drv-05',
      name: 'Jorge Luis Salgado',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      phone: '+52 55 3301 8812',
      licenseNumber: 'MX-FED-33918',
      safetyScore: 94,
      hoursOnDuty: 1.0,
      maxHoursPerShift: 10
    }
  },
  {
    id: 'veh-06',
    plate: 'TRK-7721',
    unitCode: 'TX-CROSS09',
    type: 'Refrigerated 40T',
    model: 'Kenworth W990 Cold Master',
    status: 'in_transit',
    cargoType: 'pharmaceutical',
    currentLocation: { lat: 26.5000, lng: -100.1000, address: 'Autopista Monterrey-Nuevo Laredo Km 118', city: 'Sabinas Hidalgo' },
    headingDeg: 355,
    origin: { lat: 25.6866, lng: -100.3161, city: 'Monterrey Hub' },
    destination: { lat: 27.4864, lng: -99.5083, city: 'Aduana Nuevo Laredo' },
    routeProgress: 81,
    etaMinutes: 38,
    fuelType: 'Diesel',
    maxCapacityKg: 26000,
    currentLoadKg: 19800,
    maintenanceDueKm: 21000,
    assignedShipmentIds: ['SHP-8098'],
    telemetry: {
      speedKmh: 88,
      engineTempC: 88,
      fuelLevelPercent: 61,
      cargoTempC: -20.2, // Ultra deep freeze vaccines
      targetTempC: -20.0,
      tirePressurePsi: 110,
      odometerKm: 165800,
      rpm: 1510,
      co2EmissionsKg: 145.0,
      lastPing: 'Hace 5 seg'
    },
    driver: {
      id: 'drv-06',
      name: 'Beatriz Adriana Fuentes',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      phone: '+52 81 9912 3041',
      licenseNumber: 'MX-FED-66392',
      safetyScore: 99,
      hoursOnDuty: 4.1,
      maxHoursPerShift: 10
    }
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'shp-01',
    trackingNumber: 'TRK-2026-8091',
    referenceBol: 'BOL-CDMX-GDL-991',
    sender: {
      name: 'Novartis Pharma México',
      company: 'Novartis S.A.',
      originHub: 'CDMX Hub Central',
      city: 'Ciudad de México',
      coords: { lat: 19.4326, lng: -99.1332 }
    },
    recipient: {
      name: 'Hospital Real San José',
      company: 'Grupo Hospitalario de Occidente',
      destinationHub: 'GDL Hub Bajío',
      city: 'Zapopan, Jalisco',
      coords: { lat: 20.6597, lng: -103.3496 }
    },
    status: 'in_transit',
    priority: 'urgent',
    cargoType: 'cold_chain',
    carrier: 'LogixExpress Fleet',
    vehicleId: 'veh-01',
    departureTime: '2026-08-22 08:30',
    estimatedArrival: '2026-08-22 14:45',
    totalWeightKg: 4200,
    totalVolumeM3: 18.5,
    declaredValueUsd: 285000,
    currentMilestone: 'En ruta sobre Autopista 57D - Km 142',
    requiresSignature: true,
    temperatureLogged: [3.8, 3.7, 3.5, 3.4, 3.4, 3.3, 3.4],
    items: [
      { id: 'it-1', sku: 'MED-VAC-001', name: 'Vacunas Biológicas Cadena de Frío (2-8°C)', quantity: 2500, weightKg: 1800, category: 'Pharma', unitValue: 95 },
      { id: 'it-2', sku: 'MED-INS-042', name: 'Insulina Glargina Solución Inyectable', quantity: 4000, weightKg: 2400, category: 'Pharma', unitValue: 12 }
    ],
    events: [
      { id: 'ev-1', timestamp: '2026-08-22 07:15', location: 'CDMX Hub Central', status: 'order_placed', description: 'Manifiesto generado e inspección sanitaria aprobada.', updatedBy: 'Sistema ERP' },
      { id: 'ev-2', timestamp: '2026-08-22 08:00', location: 'CDMX Andén 1', status: 'processing', description: 'Carga completada en unidad refrigerada TRK-4921 con pre-enfriamiento a 3.5°C.', updatedBy: 'Supervisor Andén' },
      { id: 'ev-3', timestamp: '2026-08-22 08:30', location: 'Salida CDMX', status: 'in_transit', description: 'Salida de patio confirmada con GPS activo.', updatedBy: 'Control Tower' },
      { id: 'ev-4', timestamp: '2026-08-22 11:20', location: 'San Juan del Río', status: 'in_transit', description: 'Punto de control 2 superado. Temperatura estable a 3.4°C.', updatedBy: 'Telemetría IoT' }
    ],
    notes: 'Prioridad médica crítica. Alarma configurada si la temperatura excede 6°C.'
  },
  {
    id: 'shp-02',
    trackingNumber: 'TRK-2026-8092',
    referenceBol: 'BOL-CDMX-URB-412',
    sender: {
      name: 'Apple Distribution Center',
      company: 'Logix Fulfillment',
      originHub: 'CDMX Hub Central',
      city: 'Ciudad de México',
      coords: { lat: 19.4326, lng: -99.1332 }
    },
    recipient: {
      name: 'Apple Store Vía Santa Fe',
      company: 'Apple Retail México',
      destinationHub: 'Santa Fe Hub',
      city: 'CDMX',
      coords: { lat: 19.3620, lng: -99.2700 }
    },
    status: 'out_for_delivery',
    priority: 'high',
    cargoType: 'high_value',
    carrier: 'Logix Urban EV Fleet',
    vehicleId: 'veh-02',
    departureTime: '2026-08-22 11:00',
    estimatedArrival: '2026-08-22 13:30',
    totalWeightKg: 640,
    totalVolumeM3: 4.2,
    declaredValueUsd: 410000,
    currentMilestone: 'Última Milla - Polanco a Santa Fe',
    requiresSignature: true,
    items: [
      { id: 'it-3', sku: 'TECH-IPH-16P', name: 'iPhone 16 Pro Max 512GB Titanium', quantity: 180, weightKg: 280, category: 'Electrónica', unitValue: 1399 },
      { id: 'it-4', sku: 'TECH-MBP-M3M', name: 'MacBook Pro 16" M3 Max 64GB', quantity: 45, weightKg: 360, category: 'Electrónica', unitValue: 3499 }
    ],
    events: [
      { id: 'ev-1', timestamp: '2026-08-22 09:30', location: 'CDMX Hub Central', status: 'order_placed', description: 'Custodia armada asignada y precinto digital colocado.', updatedBy: 'Seguridad' },
      { id: 'ev-2', timestamp: '2026-08-22 11:00', location: 'CDMX Vallejo', status: 'in_transit', description: 'Despacho en unidad eléctrica VAN-2041.', updatedBy: 'Despacho' },
      { id: 'ev-3', timestamp: '2026-08-22 12:15', location: 'Reforma - Polanco', status: 'out_for_delivery', description: 'En aproximación a destino final. ETA 22 min.', updatedBy: 'Conductor' }
    ]
  },
  {
    id: 'shp-03',
    trackingNumber: 'TRK-2026-8094',
    referenceBol: 'BOL-CDMX-MTY-702',
    sender: {
      name: 'BASF Química Industrial',
      company: 'BASF Coatings',
      originHub: 'CDMX Hub Central',
      city: 'CDMX',
      coords: { lat: 19.4326, lng: -99.1332 }
    },
    recipient: {
      name: 'Kia Motors Manufacturing Plant',
      company: 'Kia México',
      destinationHub: 'MTY Hub Norte',
      city: 'Pesquería, NL',
      coords: { lat: 25.6866, lng: -100.3161 }
    },
    status: 'exception',
    priority: 'urgent',
    cargoType: 'hazardous',
    carrier: 'Logix Heavy Freight',
    vehicleId: 'veh-03',
    departureTime: '2026-08-22 05:00',
    estimatedArrival: '2026-08-22 17:00 (Demora +90m)',
    totalWeightKg: 28500,
    totalVolumeM3: 42.0,
    declaredValueUsd: 195000,
    currentMilestone: 'ALERTA: Sensor de presión neumáticos + congestión Matehuala',
    requiresSignature: true,
    items: [
      { id: 'it-5', sku: 'HAZ-COAT-90', name: 'Recubrimiento Polimérico Grado Automotriz (Clase 3)', quantity: 60, weightKg: 18000, category: 'Químicos', unitValue: 1800 },
      { id: 'it-6', sku: 'HAZ-SOLV-22', name: 'Solvente Industrial Retardante Alta Pureza', quantity: 35, weightKg: 10500, category: 'Químicos', unitValue: 1250 }
    ],
    events: [
      { id: 'ev-1', timestamp: '2026-08-22 04:30', location: 'CDMX Hub Central', status: 'order_placed', description: 'Hoja de seguridad HAZMAT Clase 3 verificada.', updatedBy: 'Auditor Seguridad' },
      { id: 'ev-2', timestamp: '2026-08-22 05:00', location: 'CDMX', status: 'in_transit', description: 'Unidad TRK-8812 en ruta NAFTA.', updatedBy: 'Despacho' },
      { id: 'ev-3', timestamp: '2026-08-22 11:45', location: 'Matehuala, SLP', status: 'exception', description: 'ALERTA DE TELEMETRÍA: Presión de neumático eje trasero izquierdo cayó a 92 PSI. Conductor redujo velocidad.', updatedBy: 'Sensor IoT Automático' }
    ],
    notes: 'Unidad de auxilio mecánico móvil enviada desde San Luis Potosí para inspección rápida en gasolinera segura.'
  },
  {
    id: 'shp-04',
    trackingNumber: 'TRK-2026-8095',
    referenceBol: 'BOL-CDMX-VER-330',
    sender: {
      name: 'Nestlé México Alimentos',
      company: 'Grupo Nestlé',
      originHub: 'CDMX Hub Central',
      city: 'CDMX',
      coords: { lat: 19.4326, lng: -99.1332 }
    },
    recipient: {
      name: 'Centro Mayorista del Golfo',
      company: 'Chedraui Logística',
      destinationHub: 'Veracruz Port Hub',
      city: 'Veracruz, VER',
      coords: { lat: 19.1738, lng: -96.1342 }
    },
    status: 'processing',
    priority: 'standard',
    cargoType: 'standard',
    carrier: 'LogixExpress Fleet',
    vehicleId: 'veh-05',
    departureTime: '2026-08-22 13:15',
    estimatedArrival: '2026-08-22 19:30',
    totalWeightKg: 8900,
    totalVolumeM3: 32.0,
    declaredValueUsd: 68000,
    currentMilestone: 'Carga en Andén 5 - Validación de Código de Barras',
    requiresSignature: false,
    items: [
      { id: 'it-7', sku: 'GROC-NES-001', name: 'Nescafé Clásico 225g Caja Master (24 pzas)', quantity: 800, weightKg: 4800, category: 'Abarrotes', unitValue: 45 },
      { id: 'it-8', sku: 'GROC-MIL-102', name: 'Leche Condensada La Lechera 397g Tarimas', quantity: 500, weightKg: 4100, category: 'Abarrotes', unitValue: 38 }
    ],
    events: [
      { id: 'ev-1', timestamp: '2026-08-22 11:30', location: 'CDMX Hub Central', status: 'order_placed', description: 'Orden de recolección generada.', updatedBy: 'ERP' },
      { id: 'ev-2', timestamp: '2026-08-22 12:40', location: 'CDMX Andén 5', status: 'processing', description: 'Estiba en camión TRK-1109 al 78% de avance.', updatedBy: 'Operador Andén' }
    ]
  },
  {
    id: 'shp-05',
    trackingNumber: 'TRK-2026-8096',
    referenceBol: 'BOL-MZN-GDL-118',
    sender: {
      name: 'Samsung Electronics Asia',
      company: 'Maersk Line Maritime',
      originHub: 'Puerto Manzanillo',
      city: 'Manzanillo, COL',
      coords: { lat: 19.0522, lng: -104.3159 }
    },
    recipient: {
      name: 'Sanmina Electronics Plant Guadalajara',
      company: 'Sanmina SCI',
      destinationHub: 'GDL Hub Bajío',
      city: 'Guadalajara, JAL',
      coords: { lat: 20.6597, lng: -103.3496 }
    },
    status: 'in_transit',
    priority: 'high',
    cargoType: 'bulk',
    carrier: 'Logix Intermodal Direct',
    vehicleId: 'veh-04',
    departureTime: '2026-08-22 09:15',
    estimatedArrival: '2026-08-22 14:00',
    totalWeightKg: 28500,
    totalVolumeM3: 65.0,
    declaredValueUsd: 840000,
    currentMilestone: 'En tránsito vía Autopista Colima-GDL',
    requiresSignature: true,
    items: [
      { id: 'it-9', sku: 'SEMI-CHIP-99', name: 'Microcontroladores ARM Cortex-M4 Wafer Pack', quantity: 15000, weightKg: 1200, category: 'Semiconductores', unitValue: 48 },
      { id: 'it-10', sku: 'DISP-OLED-65', name: 'Paneles OLED 4K para Ensamblaje Smart TV', quantity: 600, weightKg: 27300, category: 'Electrónica', unitValue: 220 }
    ],
    events: [
      { id: 'ev-1', timestamp: '2026-08-22 06:30', location: 'Puerto Manzanillo Muelle 3', status: 'order_placed', description: 'Despacho aduanal completado (Semáforo Fiscal Verde).', updatedBy: 'Agente Aduanal' },
      { id: 'ev-2', timestamp: '2026-08-22 09:15', location: 'Puerto Manzanillo', status: 'in_transit', description: 'Contenedor TEU MAEU-99214 cargado en plataforma TRK-5520.', updatedBy: 'Despacho Puerto' }
    ]
  },
  {
    id: 'shp-06',
    trackingNumber: 'TRK-2026-8098',
    referenceBol: 'BOL-MTY-LAR-550',
    sender: {
      name: 'Pfizer Biotecnología',
      company: 'Pfizer México',
      originHub: 'MTY Hub Norte',
      city: 'Monterrey, NL',
      coords: { lat: 25.6866, lng: -100.3161 }
    },
    recipient: {
      name: 'Texas Medical Logistics Gateway',
      company: 'US Health Transport',
      destinationHub: 'Laredo Border Hub',
      city: 'Nuevo Laredo, TAM',
      coords: { lat: 27.4864, lng: -99.5083 }
    },
    status: 'in_transit',
    priority: 'urgent',
    cargoType: 'pharmaceutical',
    carrier: 'Logix Cold Ultra',
    vehicleId: 'veh-06',
    departureTime: '2026-08-22 10:30',
    estimatedArrival: '2026-08-22 13:45',
    totalWeightKg: 19800,
    totalVolumeM3: 38.0,
    declaredValueUsd: 1250000,
    currentMilestone: 'Aproximación a Puente Internacional III Laredo',
    requiresSignature: true,
    temperatureLogged: [-20.1, -20.2, -20.2, -20.3, -20.2],
    items: [
      { id: 'it-11', sku: 'BIO-ULTRA-FRZ', name: 'Terapias Celulares Criogénicas en Nieve Carbónica', quantity: 120, weightKg: 19800, category: 'Biotecnología', unitValue: 10400 }
    ],
    events: [
      { id: 'ev-1', timestamp: '2026-08-22 09:00', location: 'MTY Hub Norte Frigorífico', status: 'order_placed', description: 'Inspección de temperatura criogénica: -20.2°C nominal.', updatedBy: 'Control Calidad' },
      { id: 'ev-2', timestamp: '2026-08-22 10:30', location: 'Salida Monterrey', status: 'in_transit', description: 'Tránsito directo con escolta satelital.', updatedBy: 'Despacho Norte' }
    ]
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-01',
    sku: 'MED-VAC-001',
    name: 'Vacunas Biológicas Antivirales (2-8°C)',
    category: 'Farmacéutica',
    warehouseId: 'wh-cdmx',
    warehouseName: 'Hub Metropolitano Central',
    aisle: 'Aisle C-04',
    bay: 'Bay 12',
    tier: 2,
    quantityInStock: 8400,
    quantityAllocated: 2500,
    safetyStock: 3000,
    reorderPoint: 4500,
    maxCapacity: 15000,
    unitPriceUsd: 95.0,
    unitWeightKg: 0.72,
    turnoverDays: 14,
    status: 'optimal',
    lastRestocked: '2026-08-18',
    storageCondition: 'chilled_2_8c',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'inv-02',
    sku: 'TECH-IPH-16P',
    name: 'Smartphones Titanium Pro Max 512GB',
    category: 'Electrónica de Consumo',
    warehouseId: 'wh-cdmx',
    warehouseName: 'Hub Metropolitano Central',
    aisle: 'Aisle S-01 (Bóveda)',
    bay: 'Bay 04',
    tier: 3,
    quantityInStock: 480,
    quantityAllocated: 180,
    safetyStock: 350,
    reorderPoint: 500,
    maxCapacity: 2000,
    unitPriceUsd: 1399.0,
    unitWeightKg: 0.45,
    turnoverDays: 6,
    status: 'low_stock',
    lastRestocked: '2026-08-15',
    storageCondition: 'ambient',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'inv-03',
    sku: 'SEMI-CHIP-99',
    name: 'Microcontroladores 32-bit Cortex Wafer Pack',
    category: 'Semiconductores',
    warehouseId: 'wh-gdl',
    warehouseName: 'Centro Bajío Occidente',
    aisle: 'Aisle E-08',
    bay: 'Bay 02',
    tier: 1,
    quantityInStock: 45000,
    quantityAllocated: 15000,
    safetyStock: 20000,
    reorderPoint: 25000,
    maxCapacity: 100000,
    unitPriceUsd: 48.0,
    unitWeightKg: 0.08,
    turnoverDays: 18,
    status: 'optimal',
    lastRestocked: '2026-08-10',
    storageCondition: 'ambient',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'inv-04',
    sku: 'AUTO-BRK-HD',
    name: 'Discos y Pastillas de Freno Cerámico para Camión 40T',
    category: 'Repuestos Automotrices',
    warehouseId: 'wh-mty',
    warehouseName: 'Mega-Hub Industrial Norte',
    aisle: 'Aisle H-14',
    bay: 'Bay 09',
    tier: 1,
    quantityInStock: 120,
    quantityAllocated: 95,
    safetyStock: 180,
    reorderPoint: 220,
    maxCapacity: 800,
    unitPriceUsd: 340.0,
    unitWeightKg: 28.5,
    turnoverDays: 9,
    status: 'critical_reorder',
    lastRestocked: '2026-07-28',
    storageCondition: 'ambient',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'inv-05',
    sku: 'BIO-ULTRA-FRZ',
    name: 'Reactivos Criogénicos Biomédicos (-20°C)',
    category: 'Biotecnología',
    warehouseId: 'wh-mty',
    warehouseName: 'Mega-Hub Industrial Norte',
    aisle: 'Aisle F-01 (Cámara Frío)',
    bay: 'Bay 01',
    tier: 2,
    quantityInStock: 650,
    quantityAllocated: 120,
    safetyStock: 300,
    reorderPoint: 400,
    maxCapacity: 1500,
    unitPriceUsd: 10400.0,
    unitWeightKg: 3.2,
    turnoverDays: 21,
    status: 'optimal',
    lastRestocked: '2026-08-19',
    storageCondition: 'frozen_minus_18c',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'inv-06',
    sku: 'HAZ-COAT-90',
    name: 'Recubrimiento Anticorrosivo Polimérico Industrial',
    category: 'Materiales Peligrosos / HAZMAT',
    warehouseId: 'wh-cdmx',
    warehouseName: 'Hub Metropolitano Central',
    aisle: 'Aisle HZ-03 (Contención)',
    bay: 'Bay 06',
    tier: 1,
    quantityInStock: 240,
    quantityAllocated: 60,
    safetyStock: 150,
    reorderPoint: 200,
    maxCapacity: 500,
    unitPriceUsd: 1800.0,
    unitWeightKg: 300.0,
    turnoverDays: 28,
    status: 'optimal',
    lastRestocked: '2026-08-05',
    storageCondition: 'hazmat_safe',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'inv-07',
    sku: 'GROC-NES-001',
    name: 'Café Liofilizado Premium 225g (Cajas Master)',
    category: 'Consumo Masivo / Alimentos',
    warehouseId: 'wh-mzn',
    warehouseName: 'Terminal Puerto Manzanillo',
    aisle: 'Aisle A-22',
    bay: 'Bay 18',
    tier: 4,
    quantityInStock: 18200,
    quantityAllocated: 800,
    safetyStock: 5000,
    reorderPoint: 8000,
    maxCapacity: 25000,
    unitPriceUsd: 45.0,
    unitWeightKg: 6.0,
    turnoverDays: 11,
    status: 'optimal',
    lastRestocked: '2026-08-20',
    storageCondition: 'ambient',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'inv-08',
    sku: 'SOLAR-INV-50K',
    name: 'Inversores Solares Industriales Trifásicos 50kW',
    category: 'Energía Renovable',
    warehouseId: 'wh-mzn',
    warehouseName: 'Terminal Puerto Manzanillo',
    aisle: 'Aisle E-02',
    bay: 'Bay 08',
    tier: 1,
    quantityInStock: 310,
    quantityAllocated: 40,
    safetyStock: 100,
    reorderPoint: 150,
    maxCapacity: 600,
    unitPriceUsd: 3850.0,
    unitWeightKg: 42.0,
    turnoverDays: 32,
    status: 'optimal',
    lastRestocked: '2026-08-12',
    storageCondition: 'ambient',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_INCIDENTS: OperationalIncident[] = [
  {
    id: 'inc-01',
    code: 'INC-2026-041',
    title: 'Anomalía de Presión Neumáticos y Retraso en Carretera 57',
    description: 'Unidad TRK-8812 con carga HAZMAT reportó caída a 92 PSI en neumático trasero izquierdo y congestión vial en Matehuala. Retraso estimado: 90 minutos.',
    severity: 'critical',
    category: 'Mechanical',
    timestamp: 'Hace 18 min',
    relatedVehicleId: 'veh-03',
    relatedShipmentId: 'shp-03',
    status: 'investigating',
    recommendedAction: 'Despachar unidad de soporte móvil desde taller autorizado en Matehuala y notificar a planta Kia del retraso en ventana de descarga.',
    locationName: 'Matehuala, SLP (Km 182)'
  },
  {
    id: 'inc-02',
    code: 'INC-2026-039',
    title: 'Alerta Preventiva de Cadena de Frío en Andén 2 Hub Central',
    description: 'Sensor de puerta en cámara frigorífica reportó apertura prolongada (>8 min). Temperatura subió transitoriamente a 4.9°C.',
    severity: 'warning',
    category: 'Cold Chain',
    timestamp: 'Hace 45 min',
    relatedWarehouseId: 'wh-cdmx',
    status: 'resolved',
    recommendedAction: 'Cierre automático forzado de cortina térmica activado. Temperatura estabilizada nuevamente en 3.6°C. Lote farmacéutico verificado intacto.',
    locationName: 'Hub Metropolitano Central - Cámara Fría 2'
  },
  {
    id: 'inc-03',
    code: 'INC-2026-036',
    title: 'Fila de Espera en Aduana Manzanillo por Actualización de Sistema SAT',
    description: 'Tiempos de modulación aduanal aumentados en 40 minutos en Muelle Fiscalizado 3. Impacto en 14 contenedores de importación.',
    severity: 'warning',
    category: 'Documentation / Customs',
    timestamp: 'Hace 2 horas',
    relatedWarehouseId: 'wh-mzn',
    status: 'open',
    recommendedAction: 'Reasignar citas de recolección de las 14:00 hrs a las 16:30 hrs para evitar cargos por estadía vehicular.',
    locationName: 'Puerto de Manzanillo - Muelle 3'
  }
];

export const INITIAL_KPIS: SupplyChainKPIs = {
  totalActiveFleet: 28,
  fleetInTransit: 19,
  onTimeDeliveryRate: 98.4,
  activeShipmentsCount: 142,
  totalInventoryValuationUsd: 14850000,
  warehouseUtilizationAvg: 83.2,
  fuelEfficiencyKmPerL: 4.8,
  co2SavedPercent: 18.5,
  activeIncidentsCount: 2,
  slaBreachRiskCount: 1
};
