export interface LogisticsPhoto {
  id: string;
  title: string;
  category: 'fleet' | 'warehouse' | 'port' | 'air_freight' | 'cold_chain' | 'tech';
  url: string;
  description: string;
  location: string;
}

export const LOGISTICS_PHOTOS: LogisticsPhoto[] = [
  {
    id: 'photo-1',
    title: 'Centro de Distribución Automatizado y Cross-Docking',
    category: 'warehouse',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    description: 'Instalación de almacenamiento inteligente con sistemas de estanterías de alta densidad y pasillos guiados.',
    location: 'Hub Central - CDMX'
  },
  {
    id: 'photo-2',
    title: 'Flota de Transporte Pesado en Corredor Logístico',
    category: 'fleet',
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    description: 'Tractocamiones de última generación con telemetría satelital IoT y monitoreo de combustible en tiempo real.',
    location: 'Autopista NAFTA Corredor Norte'
  },
  {
    id: 'photo-3',
    title: 'Terminal de Contenedores Intermodal y Puerto Seco',
    category: 'port',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    description: 'Operación de carga y descarga de contenedores marítimos con control de aduanas y trazabilidad RFID.',
    location: 'Puerto de Manzanillo / Veracruz'
  },
  {
    id: 'photo-4',
    title: 'Vehículos Eléctricos de Última Milla (Urban Delivery)',
    category: 'fleet',
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    description: 'Unidades de reparto 100% eléctricas para distribución capilar urbana con cero emisiones directas.',
    location: 'Zona Metropolitana'
  },
  {
    id: 'photo-5',
    title: 'Almacén Frigorífico de Cadena de Frío Farmacéutica',
    category: 'cold_chain',
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80',
    description: 'Cámaras de refrigeración controladas entre 2°C y 8°C con registro continuo y sensores de temperatura redundantes.',
    location: 'Hub Pharma Bajío'
  },
  {
    id: 'photo-6',
    title: 'Gestión de Inventario y Robots Móviles Autónomos (AMR)',
    category: 'tech',
    url: 'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1200&q=80',
    description: 'Picking y packing asistido por tecnología robótica para optimización de tiempos de ciclo y cero errores.',
    location: 'Mega-Hub Monterrey'
  }
];
