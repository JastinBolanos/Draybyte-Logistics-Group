import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import {
  Layers,
  Crosshair,
  Maximize2,
  Minimize2,
  Radio,
  Eye,
  EyeOff,
  CloudRain,
  ShieldAlert,
  Compass,
  Navigation,
  Sparkles,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Vehicle } from '../types/logistics';

interface HubLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  type: 'hub' | 'port' | 'customs';
  capacity: string;
}

interface InteractiveGISMapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
  mapLayerMode?: 'all' | 'in_transit' | 'alert' | 'traffic';
  className?: string;
}

const HUB_LOCATIONS: HubLocation[] = [
  { id: 'cdmx', name: 'Hub CDMX Vallejo', lat: 19.4932, lng: -99.1628, color: '#6366f1', type: 'hub', capacity: '94% Ocupado' },
  { id: 'mty', name: 'Hub Monterrey Norte', lat: 25.7617, lng: -100.2987, color: '#10b981', type: 'hub', capacity: '78% Ocupado' },
  { id: 'gdl', name: 'Hub Guadalajara Bajío', lat: 20.6274, lng: -103.3228, color: '#8b5cf6', type: 'hub', capacity: '82% Ocupado' },
  { id: 'mzn', name: 'Puerto Manzanillo (Pacífico)', lat: 19.0522, lng: -104.3159, color: '#0ea5e9', type: 'port', capacity: '99% Capacidad' },
  { id: 'ver', name: 'Puerto Veracruz (Golfo)', lat: 19.1738, lng: -96.1342, color: '#f97316', type: 'port', capacity: '85% Capacidad' },
  { id: 'lar', name: 'Aduana Nuevo Laredo (NAFTA)', lat: 27.4864, lng: -99.5083, color: '#ef4444', type: 'customs', capacity: 'Cruce FastLane' }
];

// Key logistics highway corridors
const LOGISTICS_CORRIDORS = [
  {
    name: 'Corredor NAFTA Mex-57D / Mex-85D (CDMX - Laredo)',
    color: '#6366f1',
    dashClass: 'corridor-nafta',
    points: [
      [19.4932, -99.1628], // CDMX
      [20.5888, -100.3899], // Querétaro
      [22.1565, -100.9855], // San Luis Potosí
      [23.6528, -100.6453], // Matehuala
      [25.4232, -101.0053], // Saltillo
      [25.7617, -100.2987], // Monterrey
      [27.4864, -99.5083]  // Nuevo Laredo
    ] as [number, number][]
  },
  {
    name: 'Corredor Bajío - Pacífico Mex-15D (CDMX - GDL - Manzanillo)',
    color: '#38bdf8',
    dashClass: 'corridor-pacifico',
    points: [
      [19.4932, -99.1628], // CDMX
      [19.2826, -99.6557], // Toluca
      [19.7060, -101.1950], // Morelia
      [20.6274, -103.3228], // Guadalajara
      [19.2433, -103.7250], // Colima
      [19.0522, -104.3159]  // Manzanillo
    ] as [number, number][]
  },
  {
    name: 'Corredor Golfo Mex-150D (CDMX - Puebla - Veracruz)',
    color: '#f59e0b',
    dashClass: 'corridor-golfo',
    points: [
      [19.4932, -99.1628], // CDMX
      [19.0414, -98.2063], // Puebla
      [18.8842, -96.9256], // Córdoba
      [19.1738, -96.1342]  // Veracruz
    ] as [number, number][]
  }
];

type BaseTileType = 'satellite' | 'dark' | 'streets' | 'topo';

export const InteractiveGISMap: React.FC<InteractiveGISMapProps> = ({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  mapLayerMode = 'all',
  className = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const corridorsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const hubsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const weatherLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const [baseTile, setBaseTile] = useState<BaseTileType>('satellite');
  const [showRadar, setShowRadar] = useState<boolean>(true);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);
  const [showHubs, setShowHubs] = useState<boolean>(true);
  const [showWeather, setShowWeather] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [autoTrackSelected, setAutoTrackSelected] = useState<boolean>(true);
  const [activeCoords, setActiveCoords] = useState<{ lat: number; lng: number }>({
    lat: selectedVehicle?.currentLocation.lat || 22.5,
    lng: selectedVehicle?.currentLocation.lng || -100.5
  });

  // Tile layer configurations
  const TILE_URLS: Record<BaseTileType, { url: string; attribution: string; maxZoom: number }> = {
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri World Imagery, Maxar, Earthstar Geographics',
      maxZoom: 19
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> Dark Matter',
      maxZoom: 19
    },
    streets: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> Voyager',
      maxZoom: 19
    },
    topo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenTopoMap contributors',
      maxZoom: 17
    }
  };

  // 1. Initialize Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on central Mexico logistics corridor
    const initialCenter: [number, number] = [22.8, -100.2];
    const initialZoom = 6;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: true
    });

    // Custom positioned zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial base tile layer
    const activeTileConfig = TILE_URLS[baseTile];
    const initialTile = L.tileLayer(activeTileConfig.url, {
      attribution: activeTileConfig.attribution,
      maxZoom: activeTileConfig.maxZoom
    }).addTo(map);

    tileLayerRef.current = initialTile;

    // Create Layer Groups
    const corridorsGroup = L.layerGroup().addTo(map);
    const hubsGroup = L.layerGroup().addTo(map);
    const weatherGroup = L.layerGroup().addTo(map);
    const markersGroup = L.layerGroup().addTo(map);

    corridorsLayerGroupRef.current = corridorsGroup;
    hubsLayerGroupRef.current = hubsGroup;
    weatherLayerGroupRef.current = weatherGroup;
    markersLayerGroupRef.current = markersGroup;

    mapInstanceRef.current = map;

    map.on('mousemove', (e) => {
      setActiveCoords({
        lat: Number(e.latlng.lat.toFixed(4)),
        lng: Number(e.latlng.lng.toFixed(4))
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Handle Base Tile Switch
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const config = TILE_URLS[baseTile];
    const newTile = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTile;
  }, [baseTile]);

  // 3. Render Corridors and Geodesic Routes
  useEffect(() => {
    if (!corridorsLayerGroupRef.current) return;
    corridorsLayerGroupRef.current.clearLayers();

    if (!showCorridors) return;

    LOGISTICS_CORRIDORS.forEach((corridor) => {
      // Background glow line
      const glowLine = L.polyline(corridor.points, {
        color: corridor.color,
        weight: 6,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      });

      // Core animated dashed line
      const animatedLine = L.polyline(corridor.points, {
        color: '#ffffff',
        weight: 2.5,
        opacity: 0.9,
        dashArray: '8, 8',
        className: 'animate-dash-flow'
      });

      glowLine.bindTooltip(`🛣️ ${corridor.name}`, {
        sticky: true,
        className: 'bg-slate-900 text-white border-slate-700 text-xs px-2 py-1 rounded shadow-lg'
      });

      corridorsLayerGroupRef.current?.addLayer(glowLine);
      corridorsLayerGroupRef.current?.addLayer(animatedLine);
    });
  }, [showCorridors]);

  // 4. Render Logistics Hubs & Ports
  useEffect(() => {
    if (!hubsLayerGroupRef.current) return;
    hubsLayerGroupRef.current.clearLayers();

    if (!showHubs) return;

    HUB_LOCATIONS.forEach((hub) => {
      // Outer Geofence Zone Circle
      const geofence = L.circle([hub.lat, hub.lng], {
        radius: 35000,
        color: hub.color,
        fillColor: hub.color,
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '4, 4'
      });

      // Animated Glowing Hub Marker Icon
      const hubIcon = L.divIcon({
        className: 'custom-hub-icon',
        html: `
          <div class="relative flex items-center justify-center" style="width: 48px; height: 48px;">
            <div class="absolute inset-0 rounded-full animate-beacon-wave" style="background-color: ${hub.color}; opacity: 0.6;"></div>
            <div class="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white" style="background-color: ${hub.color};">
              <span class="text-[10px] text-white font-bold">${hub.type === 'port' ? '⚓' : hub.type === 'customs' ? '🏛️' : '📦'}</span>
            </div>
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 text-slate-100 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700/80 shadow-md pointer-events-none">
              ${hub.name}
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: hubIcon });
      marker.bindPopup(`
        <div class="p-3 text-slate-100 min-w-[200px]">
          <div class="flex items-center gap-2 border-b border-slate-700 pb-1.5 mb-2">
            <span class="text-base">${hub.type === 'port' ? '⚓' : hub.type === 'customs' ? '🏛️' : '📦'}</span>
            <div>
              <h4 class="font-bold text-xs text-white">${hub.name}</h4>
              <span class="text-[10px] text-indigo-400 font-medium uppercase tracking-wider">${hub.type === 'port' ? 'Puerto Marítimo' : hub.type === 'customs' ? 'Recinto Fiscalizado' : 'Hub de Distribución'}</span>
            </div>
          </div>
          <div class="space-y-1 text-[11px] text-slate-300">
            <div class="flex justify-between"><span>Estado:</span> <strong class="text-emerald-400">Operación Continua 24/7</strong></div>
            <div class="flex justify-between"><span>Capacidad:</span> <strong class="text-amber-300">${hub.capacity}</strong></div>
            <div class="flex justify-between"><span>Coordenadas:</span> <span class="font-mono text-[10px] text-slate-400">${hub.lat.toFixed(4)}, ${hub.lng.toFixed(4)}</span></div>
          </div>
        </div>
      `);

      hubsLayerGroupRef.current?.addLayer(geofence);
      hubsLayerGroupRef.current?.addLayer(marker);
    });
  }, [showHubs]);

  // 5. Render Weather / Risk Clouds
  useEffect(() => {
    if (!weatherLayerGroupRef.current) return;
    weatherLayerGroupRef.current.clearLayers();

    if (!showWeather) return;

    // Simulated storm/rain front over Sierra Madre
    const weatherZones = [
      { lat: 21.2, lng: -100.5, radius: 45000, desc: 'Lluvia Moderada / Neblina en Sierra Gorda' },
      { lat: 26.2, lng: -100.1, radius: 55000, desc: 'Vientos Cruzados 45km/h Autopista Saltillo-Mty' }
    ];

    weatherZones.forEach((w) => {
      const zone = L.circle([w.lat, w.lng], {
        radius: w.radius,
        color: '#38bdf8',
        fillColor: '#0284c7',
        fillOpacity: 0.25,
        weight: 1.5,
        dashArray: '3, 6'
      }).bindTooltip(`🌧️ Alerta Meteorológica: ${w.desc}`, {
        className: 'bg-sky-950 text-sky-200 border-sky-700 text-xs px-2 py-1 rounded shadow-lg'
      });

      weatherLayerGroupRef.current?.addLayer(zone);
    });
  }, [showWeather]);

  // 6. Render Dynamic Moving Vehicle Markers
  useEffect(() => {
    if (!markersLayerGroupRef.current) return;
    markersLayerGroupRef.current.clearLayers();

    vehicles.forEach((vehicle) => {
      const isSelected = vehicle.id === selectedVehicle?.id;
      const isAlert = vehicle.status === 'alert';
      const isDelayed = vehicle.status === 'delayed';

      const statusColor = isAlert ? '#ef4444' : isDelayed ? '#f59e0b' : '#10b981';
      const heading = vehicle.headingDeg || 0;

      // Custom high-tech HTML marker with radar pulse, heading rotation and plate badge
      const vehicleIcon = L.divIcon({
        className: 'custom-vehicle-icon',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group" style="width: 56px; height: 56px;">
            <!-- Outer Pulsing Glow -->
            <div class="absolute inset-0 rounded-full animate-ping" style="background-color: ${statusColor}; opacity: ${isSelected ? '0.45' : '0.2'};"></div>
            
            ${isSelected ? `
              <!-- Selected Target Box Reticle -->
              <div class="absolute -inset-1 rounded-xl border-2 border-indigo-400 border-dashed animate-spin" style="animation-duration: 12s;"></div>
            ` : ''}

            <!-- Vehicle Center Marker -->
            <div class="relative z-20 w-8 h-8 rounded-xl flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 ${
              isSelected ? 'bg-indigo-600 ring-4 ring-indigo-400/50' : isAlert ? 'bg-rose-600 ring-2 ring-rose-400' : 'bg-slate-900 border-2 border-white'
            }">
              <!-- Oriented Directional Arrow -->
              <div style="transform: rotate(${heading}deg); transform-origin: center center;" class="flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${isSelected || isAlert ? '#ffffff' : '#38bdf8'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 19 21 12 17 5 21 12 2" fill="${isSelected || isAlert ? '#ffffff' : '#38bdf8'}" fill-opacity="0.9" />
                </svg>
              </div>
            </div>

            <!-- Floating Unit Plate & Speed Tag -->
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/95 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
              isSelected ? 'border-indigo-400 text-indigo-300 ring-2 ring-indigo-500/40' : isAlert ? 'border-rose-500 text-rose-300' : 'border-slate-700 text-slate-200'
            } shadow-xl flex items-center gap-1.5 pointer-events-none">
              <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${statusColor};"></span>
              <span>${vehicle.plate}</span>
              <span class="text-[9px] text-sky-400 font-semibold">${vehicle.telemetry.speedKmh}k</span>
            </div>
          </div>
        `,
        iconSize: [56, 56],
        iconAnchor: [28, 28]
      });

      const marker = L.marker([vehicle.currentLocation.lat, vehicle.currentLocation.lng], {
        icon: vehicleIcon,
        zIndexOffset: isSelected ? 1000 : 100
      });

      marker.on('click', () => {
        onSelectVehicle(vehicle);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([vehicle.currentLocation.lat, vehicle.currentLocation.lng], {
            animate: true,
            duration: 0.8
          });
        }
      });

      marker.bindPopup(`
        <div class="p-3 text-slate-100 min-w-[220px]">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
            <div class="flex items-center space-x-2">
              <span class="font-mono font-bold text-sm text-white">${vehicle.plate}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                isAlert ? 'bg-rose-900/80 text-rose-200 border border-rose-700' : 'bg-emerald-900/80 text-emerald-200 border border-emerald-700'
              }">${vehicle.status}</span>
            </div>
            <span class="text-[10px] font-mono text-slate-400">${vehicle.unitCode}</span>
          </div>

          <p class="text-xs text-slate-300 font-medium mb-2">${vehicle.model}</p>

          <div class="grid grid-cols-2 gap-2 text-[11px] mb-2 bg-slate-900/90 p-2 rounded-lg border border-slate-800 font-mono">
            <div>
              <span class="text-slate-400 text-[10px] block">VELOCIDAD</span>
              <strong class="text-emerald-400 text-xs">${vehicle.telemetry.speedKmh} km/h</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[10px] block">RUMBO GPS</span>
              <strong class="text-sky-400 text-xs">${vehicle.headingDeg}°</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[10px] block">COMBUSTIBLE</span>
              <strong class="text-amber-400 text-xs">${vehicle.telemetry.fuelLevelPercent}%</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[10px] block">TEMP CARGA</span>
              <strong class="text-sky-300 text-xs">${vehicle.telemetry.cargoTempC !== undefined ? `${vehicle.telemetry.cargoTempC}°C` : 'Ambiente'}</strong>
            </div>
          </div>

          <div class="text-[10px] text-slate-400 space-y-1 border-t border-slate-800 pt-2">
            <p>📍 <strong class="text-slate-200">${vehicle.currentLocation.address}</strong></p>
            <p>🛣️ Ruta: <span class="text-indigo-300">${vehicle.origin.city} → ${vehicle.destination.city}</span></p>
            <p>👤 Operador: <span class="text-slate-200">${vehicle.driver.name}</span></p>
          </div>
        </div>
      `);

      markersLayerGroupRef.current?.addLayer(marker);
    });
  }, [vehicles, selectedVehicle, onSelectVehicle]);

  // 7. Auto Pan to Selected Vehicle
  useEffect(() => {
    if (!selectedVehicle || !mapInstanceRef.current || !autoTrackSelected) return;

    mapInstanceRef.current.flyTo(
      [selectedVehicle.currentLocation.lat, selectedVehicle.currentLocation.lng],
      Math.max(mapInstanceRef.current.getZoom(), 8),
      { duration: 1.2 }
    );
  }, [selectedVehicle?.id, autoTrackSelected]);

  // Fit all fleet in view
  const handleFitBounds = () => {
    if (!mapInstanceRef.current || vehicles.length === 0) return;
    const bounds = L.latLngBounds(
      vehicles.map((v) => [v.currentLocation.lat, v.currentLocation.lng] as [number, number])
    );
    // Include major hubs to ensure comfortable bounds
    bounds.extend([19.4326, -99.1332]); // CDMX
    bounds.extend([27.4864, -99.5083]); // Laredo
    bounds.extend([19.0522, -104.3159]); // Manzanillo
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], duration: 1.0 });
  };

  // Center on selected vehicle
  const handleCenterSelected = () => {
    if (!selectedVehicle || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(
      [selectedVehicle.currentLocation.lat, selectedVehicle.currentLocation.lng],
      10,
      { duration: 1.0 }
    );
  };

  return (
    <div
      className={`relative w-full h-[580px] rounded-xl overflow-hidden border border-slate-800/90 shadow-2xl bg-slate-950 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen rounded-none' : ''
      } ${className}`}
    >
      {/* 1. MAP CANVAS CONTAINER */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 2. SATELLITE RADAR SWEEP ANIMATION OVERLAY */}
      {showRadar && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Circular Radar Scan Lines */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-[500px] h-[500px] rounded-full border border-emerald-500/40 animate-ping" style={{ animationDuration: '4s' }}></div>
            <div className="absolute w-[800px] h-[800px] rounded-full border border-indigo-500/30"></div>
            <div className="absolute w-[1100px] h-[1100px] rounded-full border border-cyan-500/20"></div>
          </div>

          {/* Rotating Radar Sweep Cone */}
          <div
            className="absolute inset-0 flex items-center justify-center animate-radar-sweep opacity-20"
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.4) 0deg, rgba(6, 182, 212, 0.15) 60deg, transparent 90deg)'
            }}
          ></div>

          {/* Subtle Cyber Grid Lines */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      )}

      {/* 3. TOP LEFT: HUD HEADER & TELEMETRY CORE */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2 pointer-events-auto">
        <div className="bg-slate-950/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <span className="text-xs font-bold text-white tracking-wide block">
                GIS Satelital Corredor NAFTA
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                {vehicles.length} Unidades Activas • GNSS 14 Sats
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-3 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> En Ruta
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Tráfico
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Alerta
            </span>
          </div>
        </div>

        {/* Dynamic Layer Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Base Layer Switcher Pills */}
          <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 p-1 rounded-lg shadow-lg flex items-center gap-1 text-xs">
            <button
              onClick={() => setBaseTile('satellite')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                baseTile === 'satellite'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🛰️ Satelital HD
            </button>
            <button
              onClick={() => setBaseTile('dark')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                baseTile === 'dark'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🗺️ Cyber Dark
            </button>
            <button
              onClick={() => setBaseTile('streets')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                baseTile === 'streets'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🛣️ Carreteras
            </button>
            <button
              onClick={() => setBaseTile('topo')}
              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                baseTile === 'topo'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              ⛰️ Relieve
            </button>
          </div>
        </div>
      </div>

      {/* 4. TOP RIGHT: MAP CONTROLS & TOGGLES */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-xl shadow-xl">
          {/* Toggle Radar Sweep */}
          <button
            onClick={() => setShowRadar(!showRadar)}
            title="Alternar Radar Satelital"
            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              showRadar ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="hidden md:inline text-[10px]">Radar</span>
          </button>

          {/* Toggle Corridors */}
          <button
            onClick={() => setShowCorridors(!showCorridors)}
            title="Alternar Autopistas y Corredores"
            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              showCorridors ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span className="hidden md:inline text-[10px]">Corredores</span>
          </button>

          {/* Toggle Hubs */}
          <button
            onClick={() => setShowHubs(!showHubs)}
            title="Alternar Hubs y Puertos"
            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              showHubs ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden md:inline text-[10px]">Hubs</span>
          </button>

          {/* Toggle Weather */}
          <button
            onClick={() => setShowWeather(!showWeather)}
            title="Alternar Capa Meteorológica"
            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              showWeather ? 'bg-sky-600/30 text-sky-300 border border-sky-500/50' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span className="hidden md:inline text-[10px]">Clima</span>
          </button>

          {/* Reset / Fit View */}
          <button
            onClick={handleFitBounds}
            title="Ver Toda la Flota"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-slate-700"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Center Selected */}
          {selectedVehicle && (
            <button
              onClick={handleCenterSelected}
              title={`Centrar en ${selectedVehicle.plate}`}
              className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all cursor-pointer shadow-md flex items-center gap-1 text-[11px] font-bold"
            >
              <Crosshair className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">{selectedVehicle.plate}</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Live Coordinate Crosshair Readout */}
        <div className="bg-slate-950/80 backdrop-blur-xs border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-400 flex items-center gap-2">
          <Compass className="w-3 h-3 text-indigo-400" />
          <span>LAT: {activeCoords.lat}°</span>
          <span>LNG: {activeCoords.lng}°</span>
        </div>
      </div>

      {/* 5. BOTTOM OVERLAY: SELECTED VEHICLE LIVE HUD */}
      {selectedVehicle && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xl z-20 bg-slate-950/95 backdrop-blur-md border border-slate-700/90 p-3.5 rounded-xl text-white shadow-2xl pointer-events-auto">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/60 flex items-center justify-center text-indigo-400 shadow-inner">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm font-mono text-white tracking-wider">
                    {selectedVehicle.plate}
                  </span>
                  <span className="text-[11px] text-slate-300 font-medium">
                    ({selectedVehicle.unitCode})
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {selectedVehicle.cargoType}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 truncate max-w-[280px]">
                  📍 {selectedVehicle.currentLocation.address}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-left sm:text-right">
                <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Velocidad</span>
                <span className="text-emerald-400 font-bold text-sm">{selectedVehicle.telemetry.speedKmh} km/h</span>
              </div>
              {selectedVehicle.telemetry.cargoTempC !== undefined && (
                <div className="text-left sm:text-right pl-2">
                  <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Termoking</span>
                  <span className="text-sky-300 font-bold text-sm">{selectedVehicle.telemetry.cargoTempC}°C</span>
                </div>
              )}
              <div className="text-left sm:text-right pl-2">
                <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Progreso</span>
                <span className="text-indigo-300 font-bold text-sm">{selectedVehicle.routeProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InteractiveGISMap;
