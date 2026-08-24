export type Language = 'es' | 'en';

export const translations = {
  es: {
    // General & Common
    language: 'Español',
    english: 'Inglés',
    spanish: 'Español',
    switchLanguage: 'Cambiar idioma',
    all: 'Todos',
    search: 'Buscar...',
    filter: 'Filtrar',
    export: 'Exportar',
    print: 'Imprimir',
    cancel: 'Cancelar',
    save: 'Guardar',
    confirm: 'Confirmar',
    close: 'Cerrar',
    actions: 'Acciones',
    status: 'Estado',
    priority: 'Prioridad',
    date: 'Fecha',
    time: 'Hora',
    details: 'Detalles',
    viewDetails: 'Ver Detalles',
    edit: 'Editar',
    delete: 'Eliminar',
    refresh: 'Actualizar',
    loading: 'Cargando...',
    active: 'Activo',
    inactive: 'Inactivo',
    resolved: 'Resuelto',
    pending: 'Pendiente',
    compact: 'Compacto',
    standard: 'Estándar',
    total: 'Total',
    units: 'uds.',
    online: 'Online',
    offline: 'Offline',
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    notes: 'Notas',
    back: 'Volver',

    // Welcome Screen
    welcome: {
      brandTag: 'v2.4.0 Ent',
      brandSubtitle: 'Torre de Mando & Telemetría Logística Global',
      gnssClock: 'Hora Oficial Red GNSS',
      syncClock: 'Sincronizando reloj atómico...',
      systemStatus: 'SISTEMA 100% OPERATIVO',
      badgeEyebrow: 'CENTRO DE OPERACIONES & CONTROL DE CADENA DE SUMINISTRO',
      titleItalic: 'Bienvenido al Sistema Central de',
      titleBold: 'Mando Logístico & Tráfico',
      description: 'Plataforma de alta densidad para la supervisión satelital de flotas, control de cadena de frío, despacho aduanal SAT CFDI 4.0 y orquestación multimodal en tiempo real.',
      btnEnterConsole: 'Iniciar Sesión',
      btnViewTelemetry: 'Ver Telemetría Satelital Demostración',
      
      // KPI Badges
      kpiFleetConnected: 'Flota Conectada',
      kpiFleetSub: '100% GNSS Activo',
      kpiOtd: 'Nivel de Servicio (OTD)',
      kpiOtdSub: 'Meta contractual 95.0% SLA',
      kpiValuation: 'Valor en Custodia',
      kpiValuationSub: 'USD con póliza satelital',
      kpiWarehouse: 'Ocupación Almacenes',
      kpiWarehouseSub: '220,000 m² en 4 Hubs',

      // Direct Modules Launch
      quickLaunchTitle: 'Acceso Rápido por Módulo Operativo',
      quickLaunchSubtitle: 'Haga clic en cualquier módulo para abrir directamente',
      startModule: 'Iniciar módulo',

      moduleFleetTitle: 'Monitoreo Satelital de Flota',
      moduleFleetSub: 'unidades en tránsito activo con telemetría IoT 5G',
      moduleFleetTag: 'TELEMETRÍA EN VIVO',

      moduleShipmentsTitle: 'Gestión de Envíos & SAT CFDI 4.0',
      moduleShipmentsSub: 'despachos en ruta con Carta Porte y cadena de custodia',
      moduleShipmentsTag: 'TRAZABILIDAD',

      moduleOptimizerTitle: 'Despacho Predictivo & IA',
      moduleOptimizerSub: 'Optimización algorítmica de corredores y ahorro de combustible',
      moduleOptimizerTag: 'RED NEURONAL',

      moduleInventoryTitle: 'Red de Centros de Distribución',
      moduleInventorySub: 'ocupación promedio en 4 mega hubs nacionales',
      moduleInventoryTag: 'WMS MULTI-HUB',

      moduleAnalyticsTitle: 'Auditoría Ejecutiva & KPIs',
      moduleAnalyticsSub: 'OTD global y evaluación continua de SLA',
      moduleAnalyticsTag: 'BUSINESS INTEL',

      // Roles
      rolesTitle: 'Selección de Perfil de Mando & Turno Operativo',
      rolesEncrypted: 'Sesión Segura con Cifrado TLS 1.3',
      roleDirectorTitle: 'Comando Central & Dirección General',
      roleDirectorClearance: 'Nivel 5 • Acceso Total C-Level',
      roleDirectorDesc: 'Supervisión holística de flota, valuación financiera en tránsito y cumplimiento de SLA.',

      roleDispatchTitle: 'Controlador de Tráfico & Enrutamiento',
      roleDispatchClearance: 'Nivel 4 • Despacho Operativo',
      roleDispatchDesc: 'Asignación dinámica de unidades, gestión de incidentes y optimización predictiva.',

      roleSecurityTitle: 'Auditor de Seguridad Fiscal & Cadena de Frío',
      roleSecurityClearance: 'Nivel 4 • Cumplimiento SAT / OEA',
      roleSecurityDesc: 'Monitoreo de candados fiscales, sensores térmicos criogénicos e inspección aduanal.',

      // Footer
      certifications: 'CERTIFICACIONES:',
      latency: 'LATENCIA: 0.4ms',
      copyright: '© 2026 DRAYBYTE LOGISTICS GROUP'
    },

    // Authentication & Access Request
    auth: {
      loginTitle: 'Iniciar Sesión',
      loginSubtitle: 'Acceso corporativo a la Torre de Mando & Control',
      emailLabel: 'Correo Electrónico Corporativo',
      emailPlaceholder: 'usuario@empresa.com',
      passwordLabel: 'Contraseña de Acceso',
      passwordPlaceholder: '••••••••••••',
      rememberMe: 'Recordar terminal autorizado',
      forgotPassword: '¿Olvidó su contraseña?',
      btnLogin: 'Iniciar Sesión',
      loginErrorUnauthorized: 'Credenciales no autorizadas o cuenta en proceso de validación manual. Si no dispone de acceso institucional emitido por soporte, solicite el registro de su cuenta.',

      // Links in Login
      noAccountPrompt: '¿No tienes cuenta corporativa?',
      requestRegistration: 'Solicitar Registro de Cuenta',
      notClientPrompt: '¿No eres cliente y necesitas conocer la app?',
      viewTelemetryDemo: 'Ver Telemetría Satelital Demostración',
      viewTelemetryNote: 'Acceso libre e inmediato para explorar el mapa en vivo, telemetría IoT, KPIs y despacho satelital sin requerir cuenta.',

      // Registration Form
      registerTitle: 'Solicitud de Registro Corporativo',
      registerSubtitle: 'Por políticas de seguridad de la red satelital y cumplimiento aduanal OEA/SAT, cada solicitud es verificada manualmente por nuestro departamento de soporte técnico antes de emitir credenciales.',
      fullName: 'Nombre Completo y Apellidos',
      fullNamePlaceholder: 'Lic. Roberto Garza Morales',
      workEmail: 'Correo Corporativo Oficial',
      workEmailPlaceholder: 'rgarza@translogistica.com',
      companyName: 'Empresa / Razón Social',
      companyNamePlaceholder: 'Transportes y Logística Continental S.A. de C.V.',
      taxId: 'RFC / Identificación Fiscal (Tax ID)',
      taxIdPlaceholder: 'TLC980415XYZ',
      phone: 'Teléfono Directo de Contacto',
      phonePlaceholder: '+52 55 4192 8800',
      fleetSize: 'Tamaño de Flota / Envíos Mensuales',
      fleetSizeSmall: '1 a 10 tractocamiones (< 100 envíos/mes)',
      fleetSizeMedium: '11 a 50 tractocamiones (100 - 500 envíos/mes)',
      fleetSizeLarge: '51 a 200 tractocamiones (500 - 2,000 envíos/mes)',
      fleetSizeEnterprise: 'Más de 200 tractocamiones (+2,000 envíos/mes)',
      roleDepartment: 'Área Operativa / Cargo',
      roleLogistics: 'Dirección de Logística y Cadena de Suministro',
      roleTraffic: 'Gerencia de Tráfico, Rutas y Despacho',
      roleSecurity: 'Seguridad Patrimonial y Monitoreo Satelital',
      roleColdChain: 'Control de Calidad y Cadena de Frío GxP',
      roleCustoms: 'Comercio Exterior y Aduanas SAT',
      specialRequirements: 'Requerimientos Operativos o Comentarios (Opcional)',
      specialRequirementsPlaceholder: 'Detalla si requieres integración EDI/API, monitoreo de temperatura IoT o timbrado Carta Porte...',
      btnSubmitRegistration: 'Enviar Solicitud a Soporte & Validación',
      submitting: 'Transmitiendo solicitud a soporte técnico...',
      haveAccountPrompt: '¿Ya tienes credenciales autorizadas?',
      backToLogin: 'Iniciar Sesión',

      // Registration Success / Manual Validation Notice
      successTitle: '¡Solicitud Registrada con Éxito!',
      successNotice: 'Su solicitud ha sido enviada al equipo de Soporte y Validación de Seguridad.',
      successMessage: 'Para garantizar la integridad y seguridad de la red de transporte satelital, nuestro equipo de soporte técnico validará manualmente los datos de su empresa y le emitirá sus credenciales de acceso institucional en un plazo de 2 a 4 horas hábiles.',
      successEmailSent: 'Recibirá la confirmación y credenciales en:',
      successExploreNow: 'Ver Telemetría Satelital Demostración',
      successReturnLogin: 'Regresar al Inicio de Sesión',

      // Demo Mode Banner
      demoBannerText: 'Telemetría Satelital • Demostración',
      demoBannerSub: 'Visualización activa en tiempo real',
      demoBannerAction: 'Iniciar Sesión'
    },

    // Header & Navigation
    header: {
      brandTitle: 'Draybyte Logistics Control Tower',
      brandSubtitle: 'Mando Central de Flota & Tráfico',
      telemetryCore: 'Draybyte Telemetry Core',
      corridorTag: 'CORREDOR LOGÍSTICO LATAM',
      activeFleet: 'Flota Activa:',
      otdPunctuality: 'OTD Puntualidad:',
      hubOccupancy: 'Ocupación Hubs:',
      valueInTransit: 'Valor en Tránsito:',
      liveTelemetry: 'Telemetría En Vivo',
      pausedTelemetry: 'Pausado',
      systemsOnline: 'Sistemas Online',
      mainPortal: '🏛️ Portal Principal',
      searchPlaceholder: 'Buscar envío, vehículo, SKU...',
      scanButton: 'Escanear',
      newShipmentButton: 'Nuevo Despacho',

      // Navigation Tabs
      tabFleet: 'Monitoreo de Flota',
      tabShipments: 'Envíos & Guías',
      tabInventory: 'Almacenes & Stock',
      tabIncidents: 'Alertas & Eventos',
      tabOptimizer: 'Optimizador AI',
      tabAnalytics: 'KPIs & Métricas'
    },

    // Side Navigation Rail
    sidebar: {
      fleet: 'Flota',
      shipments: 'Envíos',
      inventory: 'Almacén',
      incidents: 'Alertas',
      optimizer: 'IA',
      analytics: 'Métricas',
      home: 'Inicio',
      help: 'Ayuda',
      settings: 'Ajustes'
    },

    // Fleet Monitor
    fleet: {
      title: 'Supervisión Satelital de Flota & Telemetría IoT',
      subtitle: 'Rastreo en tiempo real con sensores GNSS, diagnóstico OBD-II, cadena de frío y fatiga de conductor.',
      filterStatus: 'Estado:',
      filterCargo: 'Carga:',
      filterAll: 'Todos',
      searchFleet: 'Buscar placa, conductor, ciudad...',
      viewMap: 'Vista Mapa',
      viewTable: 'Vista Tabla',
      viewSplit: 'Vista Dividida',
      layerTraffic: 'Capa Tráfico IoT',
      layerSatellite: 'Satelital Híbrido',
      layerVector: 'Vectorial Simple',

      // Fleet Table Columns
      colUnit: 'Unidad & Placa',
      colModel: 'Tipo / Modelo',
      colStatus: 'Estado Operativo',
      colRoute: 'Ruta & Progreso',
      colSpeed: 'Velocidad / Motor',
      colCargoTemp: 'Temp Carga',
      colFuel: 'Combustible / SoC',
      colDriver: 'Conductor / Score',
      colActions: 'Acciones',

      // Selected Vehicle Panel
      telemetryTitle: 'Telemetría Satelital en Tiempo Real',
      lastPing: 'Último Ping:',
      driverDetails: 'Operador & Cumplimiento',
      callDriver: 'Llamar al Operador',
      rerouteBtn: 'Reasignar / Optimizar Ruta',
      hoursOnDuty: 'Horas Conducción (HOS)',
      safetyScore: 'Score de Manejo Seguro',
      speed: 'Velocidad',
      engineTemp: 'Temp. Motor',
      fuelLevel: 'Combustible / Batería',
      cargoTemp: 'Temp. Carga',
      tirePressure: 'Presión TPMS',
      rpm: 'Revoluciones (RPM)',
      odometer: 'Odómetro',
      co2Emissions: 'Emisiones CO2',
      origin: 'Origen',
      destination: 'Destino',
      eta: 'ETA Estimado',
      capacity: 'Carga Útil',
      currentLoad: 'Carga Actual'
    },

    // Shipment Manager
    shipments: {
      title: 'Gestión Integral de Envíos & SAT CFDI 4.0',
      subtitle: 'Monitoreo de guías maestras, Carta Porte digital SAT, cadena de custodia y confirmación de entrega (POD).',
      searchShipments: 'Buscar por guía, cliente, ciudad...',
      filterStatus: 'Estado:',
      filterPriority: 'Prioridad:',
      filterCargo: 'Tipo de Carga:',
      exportCsv: 'Exportar CSV',
      newDispatch: 'Registrar Despacho',
      scanQr: 'Escanear Guía',
      viewDetailed: 'Vista Detallada',
      viewCompact: 'Vista Compacta',
      viewManifest: 'Modo Manifiesto',

      // KPIs
      kpiInTransit: 'Envíos en Tránsito',
      kpiDelivered: 'Entregados Hoy',
      kpiDelayed: 'Con Retraso / Alerta',
      kpiInsuredValue: 'Valor Asegurado',

      // Table Headers
      colTracking: 'No. Guía / BOL',
      colSender: 'Remitente / Origen',
      colRecipient: 'Destinatario / Destino',
      colStatus: 'Estado',
      colPriority: 'Prioridad',
      colCargo: 'Carga',
      colEta: 'ETA Programado',
      colValue: 'Valor Declarado',
      colWeight: 'Peso Total',
      colSatCfdi: 'SAT CFDI 4.0',

      // Accordion Details
      stepOrderPlaced: 'Orden Recibida',
      stepProcessing: 'En Almacén / Cross-dock',
      stepInTransit: 'En Tránsito Carretero',
      stepSatInspection: 'Inspección Aduana SAT',
      stepOutForDelivery: 'En Reparto Final',
      stepDelivered: 'Entregado (POD Firmado)',

      manifestItems: 'Manifiesto de Mercancías:',
      itemSku: 'SKU',
      itemName: 'Descripción',
      itemQty: 'Cantidad',
      itemWeight: 'Peso Unitario',
      itemCategory: 'Categoría',
      itemValue: 'Valor',
      sensorLogs: 'Lecturas de Sensores IoT:',
      assignedVehicle: 'Vehículo Asignado:',
      carrier: 'Línea Transportista:',
      verifiedSat: 'Timbrado SAT CFDI Carta Porte Válido'
    },

    // Inventory & Warehouses
    inventory: {
      title: 'Red de Centros de Distribución & Almacenes WMS',
      subtitle: 'Control en tiempo real de slots para pallets, zonas de temperatura controlada, muelles de carga y catálogo SKU.',
      selectHub: 'Centro de Distribución:',
      allHubs: 'Todos los Hubs (Red Nacional)',
      filterCategory: 'Categoría SKU:',
      filterStatus: 'Nivel de Stock:',
      searchInventory: 'Buscar SKU, descripción, pasillo...',
      searchPlaceholder: 'Buscar por SKU, nombre, pasillo...',
      stockHealth: 'Estado Stock',
      optimal: 'Óptimo',
      lowStock: 'Stock Bajo',
      critical: 'Reorden Crítico',
      quickRestock: 'Reordenar',
      btnTransfer: 'Transferir Stock entre Hubs',
      transferStock: 'Transferencia Inter-Hub',
      btnRestock: 'Reordenar Lote',

      // KPIs
      kpiTotalItems: 'Total SKUs en Inventario',
      kpiAvgUtilization: 'Ocupación de Muelle & Racks',
      kpiValuation: 'Valuación Total en Bodega',
      kpiActiveDocks: 'Muelles en Operación',

      // Warehouse Details
      zonesTitle: 'Distribución de Zonas & Capacidad:',
      docksTitle: 'Estado de Muelles de Carga / Descarga:',
      dockNumber: 'Muelle',
      dockInbound: 'Entrada (Inbound)',
      dockOutbound: 'Salida (Outbound)',
      dockHybrid: 'Híbrido',
      dockLoading: 'Cargando',
      dockUnloading: 'Descargando',
      dockAvailable: 'Disponible',
      dockReserved: 'Reservado',
      dockMaintenance: 'Mantenimiento',

      // SKU Table
      colSku: 'SKU & Descripción',
      colDescription: 'Descripción Mercancía',
      colCategory: 'Categoría & Almacenamiento',
      colHub: 'Hub Almacén',
      colWarehouse: 'Hub & Ubicación (Aisle / Bay)',
      colLocation: 'Ubicación / Pasillo',
      colQty: 'Stock Actual',
      colStock: 'Existencia / Asignado',
      colMinStock: 'Stock Mínimo',
      colReorder: 'Punto Reorden / Seguridad',
      colCondition: 'Condición Térmica',
      colStatus: 'Estado Stock',
      colHealth: 'Estado Salud Stock',
      colUnitCost: 'Costo Unitario',
      colValuation: 'Valor Unitario / Total',
      colActions: 'Acciones',

      // Stock Transfer Modal
      transferTitle: 'Transferencia de Inventario Inter-Hub',
      transferSubtitle: 'Mover inventario entre almacenes de la red logística',
      transferItem: 'Artículo SKU a Mover:',
      transferOrigin: 'Hub Origen:',
      transferDest: 'Hub Destino:',
      transferQuantity: 'Cantidad de Unidades:',
      transferNote: 'Esta acción generará automáticamente una orden de despacho troncal en el módulo de envíos y ajustará las cantidades asignadas en tiempo real.',
      confirmTransfer: 'Confirmar Transferencia',
      sourceHub: 'Hub Origen:',
      destinationHub: 'Hub Destino:',
      selectSku: 'Seleccionar SKU a Mover:'
    },

    // Shipment Details / Modal
    shipmentDetails: {
      printWaybill: 'Imprimir Carta Porte',
      originShipper: 'PUNTO DE ORIGEN / REMITENTE',
      destinationConsignee: 'DESTINO FINAL / CONSIGNATARIO',
      manifestTitle: 'Contenido Declarado en Manifiesto',
      colDescription: 'Descripción de Mercancía',
      colQty: 'Cantidad',
      colWeight: 'Peso (kg)',
      colValue: 'Valor Unit. USD',
      totalWeight: 'Peso Total',
      totalVolume: 'Volumen',
      declaredValue: 'Valor Total Declarado',
      timelineTitle: 'Línea de Tiempo de Trazabilidad & Custodia',
      markDelivered: 'Marcar Entregado',
      markInTransit: 'Marcar En Tránsito'
    },

    // AI Route Optimizer
    optimizer: {
      title: 'Despacho Predictivo & Copiloto IA de Rutas',
      subtitle: 'Red neuronal profunda para optimización de corredores, mitigación de cuellos de botella y reducción de huella de carbono.',
      kpiAnalyzed: 'Corredores Analizados',
      kpiFuelSavings: 'Ahorro Diésel Estimado',
      kpiCo2Saved: 'Reducción de CO2',
      kpiOptimizedRoutes: 'Rutas Optimizadas',

      chatWelcome: 'Bienvenido al Copiloto Logístico de IA. Monitoreo activamente las unidades en tránsito, condiciones climáticas y niveles de stock en los hubs. ¿En qué optimización deseas enfocarte hoy?',
      chatPlaceholder: 'Escribe una consulta a la IA (ej. "¿Cómo evitar el bloqueo en la autopista 57D?")...',
      btnSend: 'Enviar Consulta',
      btnExecuteAnalysis: 'Ejecutar Reanálisis Neuronal',
      btnRerouteNow: 'Aprobar & Despachar Nueva Ruta',
      applied: 'Ruta Aplicada con Éxito',

      recommendationsTitle: 'Sugerencias de Optimización en Tiempo Real',
      cause: 'Causa Detectada:',
      recommendation: 'Recomendación IA:',
      timeSaved: 'Ahorro Tiempo:',
      fuelSaved: 'Ahorro Combustible:',
      co2Reduced: 'Impacto Ambiental:',
      urgencyHigh: 'Alta Prioridad',
      urgencyMedium: 'Media',
      urgencyCritical: 'Crítica'
    },

    // Incidents & Alerts
    incidents: {
      title: 'Centro de Respuesta & Gestión de Incidentes Críticos',
      subtitle: 'Protocolos de acción inmediata para desviaciones de ruta, fallas mecánicas, alertas térmicas y contingencias viales.',
      filterSeverity: 'Filtrar por Severidad:',
      allSeverities: 'Todas las Severidades',
      kpiTotalActive: 'Incidencias Activas',
      kpiCriticalRequiringAction: 'Críticas Requieren Acción',
      kpiAvgResolution: 'Tiempo Promedio de Resolución',
      kpiProtocolsActive: 'Protocolos de Seguridad',

      incidentListTitle: 'Registro de Incidentes',
      detailsTitle: 'Protocolo de Mitigación & Respuesta Inmediata',
      affectedUnit: 'Unidad Afectada:',
      detectedAt: 'Hora Detección:',
      location: 'Ubicación Satelital:',
      severity: 'Nivel de Severidad:',
      recommendedAction: 'Acción Protocolaria Recomendada:',
      resolutionNotes: 'Notas de Resolución del Operador:',
      resolutionPlaceholder: 'Describa las acciones tomadas para resolver la incidencia...',
      btnResolve: 'Confirmar Resolución de Incidencia',
      btnEmergencyContact: 'Llamar a Emergencias / Patrulla Vial',
      statusOpen: 'Abierto / En Atención',
      statusResolved: 'Incidencia Resuelta'
    },

    // Analytics & Business Intelligence
    analytics: {
      title: 'Auditoría Ejecutiva & Métricas de Cadena de Suministro',
      subtitle: 'Indicadores clave de desempeño (OTD, rotación de patio, cumplimiento SAT CFDI, costos por km y reducción de emisiones).',
      timeRange: 'Rango:',
      range7d: 'Últimos 7 días',
      range30d: 'Últimos 30 días',
      range90d: 'Últimos 90 días',
      timeRange7d: 'Últimos 7 días',
      timeRange30d: 'Últimos 30 días',
      timeRange90d: 'Últimos 90 días',

      otdTitle: 'Nivel de Servicio (OTD)',
      activeFleet: 'Flota en Operación',
      fuelEfficiency: 'Rendimiento Combustible',
      co2Saved: 'CO2 Ahorrado',
      hubOccupancy: 'Ocupación de Red Hubs',
      custodyValuation: 'Valuación en Custodia',

      chartOtdTitle: 'Tendencia de Nivel de Servicio (OTD %) vs. Meta SLA',
      chartOtdSubtitle: 'Monitoreo diario de entregas a tiempo vs. SLA contractual del 95%',
      chartCorridorsTitle: 'Rendimiento por Corredor Troncal (Costo/km & Tonelaje)',
      chartCorridorsSubtitle: 'Evaluación comparativa de fletes, tarifas por km y volumen transportado',
      chartWarehousesTitle: 'Ocupación de Capacidad & Rotación por Almacén',
      chartWarehouseTitle: 'Ocupación de Capacidad & Rotación por Almacén',
      chartWarehouseSubtitle: 'Distribución de pallets, slots activos y tasa de rotación en 4 hubs',
      chartCarriersTitle: 'Distribución de Volumen por Línea Transportista',
      chartRadarTitle: 'Matriz Radar de Excelencia Operativa',
      chartRadarSubtitle: 'Puntuación multidimensional de indicadores clave de cadena de suministro',

      metricCostPerKm: 'Costo Promedio por Km',
      metricDamageRate: 'Tasa de Daño en Tránsito',
      metricSatCompliance: 'Cumplimiento SAT CFDI 4.0',
      metricCo2Intensity: 'Intensidad CO2 por Tonelada'
    },

    // Modals
    newShipmentModal: {
      title: 'Registrar Nuevo Despacho / Carta Porte SAT',
      subtitle: 'Genere un nuevo envío con asignación de vehículo, trazabilidad y folio fiscal.',
      senderCompany: 'Empresa Remitente (Origen):',
      senderCity: 'Ciudad de Origen:',
      recipientCompany: 'Empresa Destinataria (Consignatario):',
      recipientCity: 'Ciudad de Destino:',
      cargoType: 'Tipo de Mercancía:',
      priority: 'Nivel de Prioridad:',
      assignedVehicle: 'Asignar Vehículo / Unidad:',
      skuItemName: 'Descripción de Mercancía:',
      quantity: 'Cantidad de Bultos / Pallets:',
      weightKg: 'Peso Bruto Total (kg):',
      declaredValueUsd: 'Valor Declarado para Seguro (USD):',
      requiresSignature: 'Requiere Confirmación Biométrica / Firma SAT',
      btnCreate: 'Emitir Carta Porte & Registrar Envío',
      alertRequiredCompany: 'Por favor ingrese el nombre de la empresa consignataria.'
    },

    barcodeScannerModal: {
      title: 'Escáner de Guías & Códigos de Barras',
      subtitle: 'Recepción en andén y validación rápida de bultos con lectura óptica',
      alignInstructions: 'Alinee el código de barras o QR de la guía en el encuadre láser',
      quickSimulate: 'Simular Escaneo Rápido de Guías Activas:',
      matchedTitle: '¡Guía Identificada Exitosamente!',
      btnViewShipment: 'Abrir Ficha de Envío'
    },

    shipmentModal: {
      title: 'Ficha Maestra de Despacho & Carta Porte Digital',
      btnPrintBol: 'Imprimir Carta Porte SAT',
      originPoint: 'PUNTO DE ORIGEN / REMITENTE',
      destinationPoint: 'PUNTO DE DESTINO / DESTINATARIO',
      manifestTitle: 'Manifiesto de Carga & Bultos Inspeccionados',
      telemetryTitle: 'Sensores en Tiempo Real Durante Tránsito',
      statusFlowTitle: 'Cadena de Custodia & Registro Temporal',
      updateStatusLabel: 'Actualizar Estado Operativo:',
      satSealTitle: 'Sello Digital SAT CFDI 4.0 Verificado'
    },

    // Dynamic Enums Translation
    fleetStatuses: {
      in_transit: 'En Ruta',
      idle: 'En Espera',
      loading: 'Cargando',
      unloading: 'Descargando',
      maintenance: 'En Taller',
      alert: 'En Alerta'
    },

    shipmentStatuses: {
      order_placed: 'Orden Creada',
      processing: 'En Almacén',
      in_transit: 'En Ruta',
      out_for_delivery: 'En Reparto',
      delivered: 'Entregado',
      exception: 'Incidencia',
      customs_hold: 'Aduana SAT'
    },

    cargoTypes: {
      standard: 'Carga General',
      cold_chain: 'Cadena de Frío',
      hazardous: 'HAZMAT Peligroso',
      high_value: 'Alto Valor / Blindado',
      bulk: 'Granel Industrial',
      pharmaceutical: 'Farmacéutico'
    },

    priorityLevels: {
      urgent: 'Urgente',
      high: 'Alta',
      standard: 'Estándar',
      economy: 'Económica'
    },

    incidentSeverities: {
      critical: 'Crítico',
      warning: 'Advertencia',
      info: 'Informativo'
    }
  },

  en: {
    // General & Common
    language: 'English',
    english: 'English',
    spanish: 'Spanish',
    switchLanguage: 'Switch language',
    all: 'All',
    search: 'Search...',
    filter: 'Filter',
    export: 'Export',
    print: 'Print',
    cancel: 'Cancel',
    save: 'Save',
    confirm: 'Confirm',
    close: 'Close',
    actions: 'Actions',
    status: 'Status',
    priority: 'Priority',
    date: 'Date',
    time: 'Time',
    details: 'Details',
    viewDetails: 'View Details',
    edit: 'Edit',
    delete: 'Delete',
    refresh: 'Refresh',
    loading: 'Loading...',
    active: 'Active',
    inactive: 'Inactive',
    resolved: 'Resolved',
    pending: 'Pending',
    compact: 'Compact',
    standard: 'Standard',
    total: 'Total',
    units: 'units',
    online: 'Online',
    offline: 'Offline',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    notes: 'Notes',
    back: 'Back',

    // Welcome Screen
    welcome: {
      brandTag: 'v2.4.0 Ent',
      brandSubtitle: 'Global Logistics Command Tower & Telemetry',
      gnssClock: 'Official GNSS Network Time',
      syncClock: 'Syncing atomic clock...',
      systemStatus: 'SYSTEM 100% OPERATIONAL',
      badgeEyebrow: 'OPERATIONS COMMAND & SUPPLY CHAIN CONTROL TOWER',
      titleItalic: 'Welcome to the Central Command for',
      titleBold: 'Logistics & Traffic Management',
      description: 'High-density platform for real-time satellite fleet monitoring, cold chain management, SAT CFDI 4.0 customs clearance, and multimodal orchestration.',
      btnEnterConsole: 'Sign In',
      btnViewTelemetry: 'View Satellite Telemetry Demonstration',

      // KPI Badges
      kpiFleetConnected: 'Connected Fleet',
      kpiFleetSub: '100% GNSS Active',
      kpiOtd: 'Service Level (OTD)',
      kpiOtdSub: '95.0% Contractual SLA Target',
      kpiValuation: 'Value in Custody',
      kpiValuationSub: 'USD Satellite Insured',
      kpiWarehouse: 'Warehouse Utilization',
      kpiWarehouseSub: '220,000 m² across 4 Hubs',

      // Direct Modules Launch
      quickLaunchTitle: 'Quick Access by Operational Module',
      quickLaunchSubtitle: 'Click any module card to launch directly into that workspace',
      startModule: 'Launch module',

      moduleFleetTitle: 'Satellite Fleet Telemetry',
      moduleFleetSub: 'active units in transit with 5G IoT telemetry',
      moduleFleetTag: 'LIVE TELEMETRY',

      moduleShipmentsTitle: 'Shipment Tracking & SAT CFDI 4.0',
      moduleShipmentsSub: 'dispatches en route with digital Bill of Lading & chain of custody',
      moduleShipmentsTag: 'TRACEABILITY',

      moduleOptimizerTitle: 'Predictive Dispatch & AI',
      moduleOptimizerSub: 'Algorithmic route corridor optimization & fuel savings',
      moduleOptimizerTag: 'NEURAL NET',

      moduleInventoryTitle: 'Distribution Hub Network',
      moduleInventorySub: 'average utilization across 4 national mega hubs',
      moduleInventoryTag: 'MULTI-HUB WMS',

      moduleAnalyticsTitle: 'Executive Audit & KPIs',
      moduleAnalyticsSub: 'global on-time delivery & continuous SLA benchmarks',
      moduleAnalyticsTag: 'BUSINESS INTEL',

      // Roles
      rolesTitle: 'Select Command Profile & Shift Clearance',
      rolesEncrypted: 'Secure Session with TLS 1.3 Encryption',
      roleDirectorTitle: 'Central Command & General Directorate',
      roleDirectorClearance: 'Level 5 • Full C-Level Access',
      roleDirectorDesc: 'Holistic fleet oversight, in-transit financial valuation, and contractual SLA governance.',

      roleDispatchTitle: 'Traffic Controller & Dynamic Router',
      roleDispatchClearance: 'Level 4 • Operational Dispatch',
      roleDispatchDesc: 'Dynamic unit assignment, incident triage, and predictive neural rerouting.',

      roleSecurityTitle: 'Fiscal Security & Cold Chain Auditor',
      roleSecurityClearance: 'Level 4 • SAT / C-TPAT Compliance',
      roleSecurityDesc: 'Monitoring fiscal digital seals, cryogenic temperature sensors, and customs holds.',

      // Footer
      certifications: 'CERTIFICATIONS:',
      latency: 'LATENCY: 0.4ms',
      copyright: '© 2026 DRAYBYTE LOGISTICS GROUP'
    },

    // Authentication & Access Request
    auth: {
      loginTitle: 'Sign In',
      loginSubtitle: 'Corporate access to Command & Control Tower',
      emailLabel: 'Corporate Work Email',
      emailPlaceholder: 'user@company.com',
      passwordLabel: 'Access Password',
      passwordPlaceholder: '••••••••••••',
      rememberMe: 'Remember authorized terminal',
      forgotPassword: 'Forgot password?',
      btnLogin: 'Sign In',
      loginErrorUnauthorized: 'Unauthorized credentials or account awaiting manual security validation. If you do not have verified credentials issued by support, please submit an account registration request.',

      // Links in Login
      noAccountPrompt: 'Don\'t have a corporate account?',
      requestRegistration: 'Request Account Registration',
      notClientPrompt: 'Not a client and want to explore the platform?',
      viewTelemetryDemo: 'View Satellite Telemetry Demonstration',
      viewTelemetryNote: 'Instant open access to explore real-time live map, IoT telemetry, KPIs, and dispatch without requiring an account.',

      // Registration Form
      registerTitle: 'Corporate Registration Request',
      registerSubtitle: 'For satellite network security and OEA/SAT regulatory compliance, every account request is manually verified by our technical support and security team prior to issuing credentials.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Robert Garza Morales',
      workEmail: 'Official Work Email',
      workEmailPlaceholder: 'rgarza@translogistics.com',
      companyName: 'Company / Legal Entity',
      companyNamePlaceholder: 'Continental Transport & Logistics Corp',
      taxId: 'Tax ID / RFC / EIN',
      taxIdPlaceholder: 'TLC980415XYZ',
      phone: 'Direct Contact Phone',
      phonePlaceholder: '+1 (555) 419-8800',
      fleetSize: 'Fleet Size / Monthly Shipments',
      fleetSizeSmall: '1 to 10 semi-trucks (< 100 shipments/mo)',
      fleetSizeMedium: '11 to 50 semi-trucks (100 - 500 shipments/mo)',
      fleetSizeLarge: '51 to 200 semi-trucks (500 - 2,000 shipments/mo)',
      fleetSizeEnterprise: 'Over 200 semi-trucks (+2,000 shipments/mo)',
      roleDepartment: 'Operational Department / Role',
      roleLogistics: 'Logistics & Supply Chain Directorate',
      roleTraffic: 'Traffic, Route & Dispatch Management',
      roleSecurity: 'Asset Protection & Satellite Security',
      roleColdChain: 'Quality Control & GxP Cold Chain',
      roleCustoms: 'Foreign Trade & Customs Compliance',
      specialRequirements: 'Operational Requirements or Notes (Optional)',
      specialRequirementsPlaceholder: 'Specify if you need EDI/API integration, IoT cold chain temperature logs, or digital waybill stamping...',
      btnSubmitRegistration: 'Submit Request to Support & Validation',
      submitting: 'Transmitting encrypted request to support desk...',
      haveAccountPrompt: 'Already have authorized credentials?',
      backToLogin: 'Sign In',

      // Registration Success / Manual Validation Notice
      successTitle: 'Request Registered Successfully!',
      successNotice: 'Your registration request has been forwarded to Support & Security Validation.',
      successMessage: 'To maintain the highest level of security and supply chain network integrity, our technical support team manually verifies company credentials and will issue your access within 2 to 4 business hours.',
      successEmailSent: 'Confirmation and activation details will be sent to:',
      successExploreNow: 'View Satellite Telemetry Demonstration',
      successReturnLogin: 'Return to Sign In',

      // Demo Mode Banner
      demoBannerText: 'Satellite Telemetry • Demonstration',
      demoBannerSub: 'Active real-time telemetry preview',
      demoBannerAction: 'Official Sign In'
    },

    // Header & Navigation
    header: {
      brandTitle: 'Draybyte Logistics Control Tower',
      brandSubtitle: 'Central Fleet & Traffic Command',
      telemetryCore: 'Draybyte Telemetry Core',
      corridorTag: 'LATAM LOGISTICS CORRIDOR',
      activeFleet: 'Active Fleet:',
      otdPunctuality: 'OTD On-Time:',
      hubOccupancy: 'Hub Utilization:',
      valueInTransit: 'Value in Transit:',
      liveTelemetry: 'Live Telemetry',
      pausedTelemetry: 'Paused',
      systemsOnline: 'Systems Online',
      mainPortal: '🏛️ Main Portal',
      searchPlaceholder: 'Search shipment, vehicle, SKU...',
      scanButton: 'Scan',
      newShipmentButton: 'New Dispatch',

      // Navigation Tabs
      tabFleet: 'Fleet Monitoring',
      tabShipments: 'Shipments & Tracking',
      tabInventory: 'Warehouses & Stock',
      tabIncidents: 'Alerts & Incidents',
      tabOptimizer: 'AI Optimizer',
      tabAnalytics: 'KPIs & Analytics'
    },

    // Side Navigation Rail
    sidebar: {
      fleet: 'Fleet',
      shipments: 'Shipments',
      inventory: 'Inventory',
      incidents: 'Alerts',
      optimizer: 'AI',
      analytics: 'Analytics',
      home: 'Home',
      help: 'Help',
      settings: 'Settings'
    },

    // Fleet Monitor
    fleet: {
      title: 'Satellite Fleet Monitoring & IoT Telemetry',
      subtitle: 'Real-time GPS tracking with OBD-II diagnostics, cold chain thermal probes, and driver fatigue monitoring.',
      filterStatus: 'Status:',
      filterCargo: 'Cargo:',
      filterAll: 'All',
      searchFleet: 'Search plate, driver, city...',
      viewMap: 'Map View',
      viewTable: 'Table View',
      viewSplit: 'Split View',
      layerTraffic: 'IoT Traffic Layer',
      layerSatellite: 'Satellite Hybrid',
      layerVector: 'Simple Vector',

      // Fleet Table Columns
      colUnit: 'Unit & Plate',
      colModel: 'Type / Model',
      colStatus: 'Operating Status',
      colRoute: 'Route & Progress',
      colSpeed: 'Speed / Engine',
      colCargoTemp: 'Cargo Temp',
      colFuel: 'Fuel / SoC',
      colDriver: 'Driver / Score',
      colActions: 'Actions',

      // Selected Vehicle Panel
      telemetryTitle: 'Real-Time Satellite Telemetry',
      lastPing: 'Last Ping:',
      driverDetails: 'Driver & HOS Compliance',
      callDriver: 'Call Onboard Driver',
      rerouteBtn: 'Reassign / Optimize Route',
      hoursOnDuty: 'Hours on Duty (HOS)',
      safetyScore: 'Safe Driving Score',
      speed: 'Speed',
      engineTemp: 'Engine Temp',
      fuelLevel: 'Fuel / Battery',
      cargoTemp: 'Cargo Temp',
      tirePressure: 'TPMS Pressure',
      rpm: 'Revolutions (RPM)',
      odometer: 'Odometer',
      co2Emissions: 'CO2 Emissions',
      origin: 'Origin',
      destination: 'Destination',
      eta: 'Estimated ETA',
      capacity: 'Payload Capacity',
      currentLoad: 'Current Load'
    },

    // Shipment Manager
    shipments: {
      title: 'Comprehensive Shipment Management & SAT CFDI 4.0',
      subtitle: 'Master tracking, digital Bill of Lading, chain of custody verification, and biometric proof of delivery (POD).',
      searchShipments: 'Search tracking #, customer, city...',
      filterStatus: 'Status:',
      filterPriority: 'Priority:',
      filterCargo: 'Cargo Type:',
      exportCsv: 'Export CSV',
      newDispatch: 'New Dispatch',
      scanQr: 'Scan Tracking Code',
      viewDetailed: 'Detailed View',
      viewCompact: 'Compact View',
      viewManifest: 'Manifest Mode',

      // KPIs
      kpiInTransit: 'Shipments in Transit',
      kpiDelivered: 'Delivered Today',
      kpiDelayed: 'Delayed / Exception',
      kpiInsuredValue: 'Insured Cargo Value',

      // Table Headers
      colTracking: 'Tracking # / BOL',
      colSender: 'Sender / Origin',
      colRecipient: 'Recipient / Destination',
      colStatus: 'Status',
      colPriority: 'Priority',
      colCargo: 'Cargo',
      colEta: 'Scheduled ETA',
      colValue: 'Declared Value',
      colWeight: 'Total Weight',
      colSatCfdi: 'SAT CFDI 4.0',

      // Accordion Details
      stepOrderPlaced: 'Order Received',
      stepProcessing: 'In Hub / Cross-dock',
      stepInTransit: 'Highway Transit',
      stepSatInspection: 'Customs Inspection',
      stepOutForDelivery: 'Out for Delivery',
      stepDelivered: 'Delivered (Signed POD)',

      manifestItems: 'Inspected Cargo Manifest:',
      itemSku: 'SKU',
      itemName: 'Description',
      itemQty: 'Quantity',
      itemWeight: 'Unit Weight',
      itemCategory: 'Category',
      itemValue: 'Value',
      sensorLogs: 'IoT Sensor Telemetry Logs:',
      assignedVehicle: 'Assigned Vehicle:',
      carrier: 'Carrier Line:',
      verifiedSat: 'Valid SAT CFDI Bill of Lading Digital Stamp'
    },

    // Inventory & Warehouses
    inventory: {
      title: 'Distribution Hub Network & WMS Warehouse Control',
      subtitle: 'Real-time slot utilization, temperature-zoned storage, loading dock management, and SKU catalog.',
      selectHub: 'Distribution Center:',
      allHubs: 'All National Hubs',
      filterCategory: 'SKU Category:',
      filterStatus: 'Stock Level:',
      searchInventory: 'Search SKU, description, aisle...',
      searchPlaceholder: 'Search by SKU, name, aisle...',
      stockHealth: 'Stock Health',
      optimal: 'Optimal',
      lowStock: 'Low Stock',
      critical: 'Critical Reorder',
      quickRestock: 'Restock',
      btnTransfer: 'Transfer Stock Across Hubs',
      transferStock: 'Inter-Hub Transfer',
      btnRestock: 'Reorder Batch',

      // KPIs
      kpiTotalItems: 'Total Inventory SKUs',
      kpiAvgUtilization: 'Dock & Rack Utilization',
      kpiValuation: 'Warehouse Total Valuation',
      kpiActiveDocks: 'Active Docks Operating',

      // Warehouse Details
      zonesTitle: 'Zoning Distribution & Capacity:',
      docksTitle: 'Loading / Unloading Dock Status:',
      dockNumber: 'Dock',
      dockInbound: 'Inbound',
      dockOutbound: 'Outbound',
      dockHybrid: 'Hybrid',
      dockLoading: 'Loading',
      dockUnloading: 'Unloading',
      dockAvailable: 'Available',
      dockReserved: 'Reserved',
      dockMaintenance: 'Maintenance',

      // SKU Table
      colSku: 'SKU & Description',
      colDescription: 'Item Description',
      colCategory: 'Category & Storage',
      colHub: 'Hub Warehouse',
      colWarehouse: 'Hub & Location (Aisle / Bay)',
      colLocation: 'Location / Aisle',
      colQty: 'Current Stock',
      colStock: 'Stock / Allocated',
      colMinStock: 'Safety Stock',
      colReorder: 'Reorder Point / Safety',
      colCondition: 'Thermal Condition',
      colStatus: 'Stock Status',
      colHealth: 'Stock Health Status',
      colUnitCost: 'Unit Cost',
      colValuation: 'Unit / Total Value',
      colActions: 'Actions',

      // Stock Transfer Modal
      transferTitle: 'Inter-Hub Inventory Transfer Order',
      transferSubtitle: 'Relocate inventory between supply chain network warehouses',
      transferItem: 'SKU Item to Relocate:',
      transferOrigin: 'Origin Hub:',
      transferDest: 'Destination Hub:',
      transferQuantity: 'Transfer Quantity (Units):',
      transferNote: 'This action will automatically generate a line-haul dispatch order in the Shipments module and adjust inventory balances across hubs.',
      confirmTransfer: 'Confirm Transfer',
      sourceHub: 'Source Hub:',
      destinationHub: 'Destination Hub:',
      selectSku: 'Select SKU to Move:'
    },

    // Shipment Details / Modal
    shipmentDetails: {
      printWaybill: 'Print Bill of Lading',
      originShipper: 'ORIGIN POINT / SENDER',
      destinationConsignee: 'FINAL DESTINATION / CONSIGNEE',
      manifestTitle: 'Inspected Cargo Manifest',
      colDescription: 'Item Description',
      colQty: 'Quantity',
      colWeight: 'Weight (kg)',
      colValue: 'Unit Value USD',
      totalWeight: 'Total Weight',
      totalVolume: 'Volume',
      declaredValue: 'Total Declared Value',
      timelineTitle: 'Traceability & Chain of Custody Timeline',
      markDelivered: 'Mark Delivered',
      markInTransit: 'Mark In Transit'
    },

    // AI Route Optimizer
    optimizer: {
      title: 'Predictive Dispatch & AI Route Copilot',
      subtitle: 'Deep neural network for corridor optimization, bottleneck avoidance, and fleet carbon footprint reduction.',
      kpiAnalyzed: 'Analyzed Corridors',
      kpiFuelSavings: 'Est. Diesel Savings',
      kpiCo2Saved: 'CO2 Reduction',
      kpiOptimizedRoutes: 'Optimized Routes',

      chatWelcome: 'Welcome to the AI Logistics Copilot. I actively monitor fleet transit, live satellite weather, and multi-hub stock balances. What optimization would you like to run today?',
      chatPlaceholder: 'Ask the AI Copilot (e.g. "How do we bypass the highway 57D congestion?")...',
      btnSend: 'Send Query',
      btnExecuteAnalysis: 'Run Neural Re-Analysis',
      btnRerouteNow: 'Approve & Dispatch New Route',
      applied: 'Reroute Dispatched Successfully',

      recommendationsTitle: 'Real-Time Dynamic Optimization Suggestions',
      cause: 'Detected Cause:',
      recommendation: 'AI Recommendation:',
      timeSaved: 'Time Saved:',
      fuelSaved: 'Fuel Saved:',
      co2Reduced: 'Eco Impact:',
      urgencyHigh: 'High Priority',
      urgencyMedium: 'Medium',
      urgencyCritical: 'Critical'
    },

    // Incidents & Alerts
    incidents: {
      title: 'Incident Response & Critical Risk Management',
      subtitle: 'Emergency mitigation protocols for route delays, mechanical failures, thermal breaches, and highway hazards.',
      filterSeverity: 'Filter by Severity:',
      allSeverities: 'All Severities',
      kpiTotalActive: 'Active Incidents',
      kpiCriticalRequiringAction: 'Critical Requiring Action',
      kpiAvgResolution: 'Avg Resolution Time',
      kpiProtocolsActive: 'Active Security Protocols',

      incidentListTitle: 'Incident Log',
      detailsTitle: 'Immediate Mitigation & Response Protocol',
      affectedUnit: 'Affected Unit:',
      detectedAt: 'Detected At:',
      location: 'Satellite Location:',
      severity: 'Severity Level:',
      recommendedAction: 'Recommended Mitigation Action:',
      resolutionNotes: 'Operator Resolution Notes:',
      resolutionPlaceholder: 'Describe actions taken to clear and resolve the incident...',
      btnResolve: 'Confirm Incident Resolution',
      btnEmergencyContact: 'Call Emergency Services / Highway Patrol',
      statusOpen: 'Open / In Progress',
      statusResolved: 'Incident Resolved'
    },

    // Analytics & Business Intelligence
    analytics: {
      title: 'Executive Audit & Supply Chain Performance',
      subtitle: 'Key executive indicators: OTD rates, yard dwell times, SAT CFDI audits, cost per km, and emissions tracking.',
      timeRange: 'Range:',
      range7d: 'Last 7 days',
      range30d: 'Last 30 days',
      range90d: 'Last 90 days',
      timeRange7d: 'Last 7 days',
      timeRange30d: 'Last 30 days',
      timeRange90d: 'Last 90 days',

      otdTitle: 'On-Time Delivery (OTD)',
      activeFleet: 'Active Fleet in Transit',
      fuelEfficiency: 'Fleet Fuel Efficiency',
      co2Saved: 'CO2 Saved',
      hubOccupancy: 'Hub Network Occupancy',
      custodyValuation: 'In-Custody Valuation',

      chartOtdTitle: 'On-Time Delivery Trend (OTD %) vs. SLA Target',
      chartOtdSubtitle: 'Daily on-time delivery tracking against contract 95% SLA target',
      chartCorridorsTitle: 'Major Corridor Performance (Cost/km & Tonnage)',
      chartCorridorsSubtitle: 'Comparative assessment of freight rates, cost per km, and transported volume',
      chartWarehousesTitle: 'Warehouse Capacity Utilization & Turnover',
      chartWarehouseTitle: 'Warehouse Capacity Utilization & Turnover',
      chartWarehouseSubtitle: 'Distribution of pallets, active slots, and turnover rate across 4 hubs',
      chartCarriersTitle: 'Volume Distribution by Carrier Partner',
      chartRadarTitle: 'Operational Excellence Radar Matrix',
      chartRadarSubtitle: 'Multi-dimensional score across core logistics KPIs',

      metricCostPerKm: 'Average Cost per Km',
      metricDamageRate: 'In-Transit Damage Rate',
      metricSatCompliance: 'SAT CFDI 4.0 Compliance',
      metricCo2Intensity: 'CO2 Intensity per Ton'
    },

    // Modals
    newShipmentModal: {
      title: 'Register New Dispatch / Digital Bill of Lading',
      subtitle: 'Generate a new tracking manifest with unit assignment, traceability, and digital fiscal folio.',
      senderCompany: 'Sender Enterprise (Origin):',
      senderCity: 'Origin City:',
      recipientCompany: 'Consignee Enterprise (Destination):',
      recipientCity: 'Destination City:',
      cargoType: 'Cargo Classification:',
      priority: 'Priority Level:',
      assignedVehicle: 'Assign Vehicle / Fleet Unit:',
      skuItemName: 'Commodity Description:',
      quantity: 'Package / Pallet Quantity:',
      weightKg: 'Gross Total Weight (kg):',
      declaredValueUsd: 'Declared Value for Insurance (USD):',
      requiresSignature: 'Requires Biometric Proof of Delivery / SAT Signature',
      btnCreate: 'Issue Bill of Lading & Register Dispatch',
      alertRequiredCompany: 'Please enter the consignee company name.'
    },

    barcodeScannerModal: {
      title: 'Barcode & QR Scanner',
      subtitle: 'Dockside receiving and rapid package verification with optical sensor',
      alignInstructions: 'Align the tracking barcode or QR code within the laser viewport',
      quickSimulate: 'Simulate Rapid Scan of Active Shipments:',
      matchedTitle: 'Shipment Successfully Identified!',
      btnViewShipment: 'Open Shipment File'
    },

    shipmentModal: {
      title: 'Master Dispatch Record & Digital Bill of Lading',
      btnPrintBol: 'Print SAT Bill of Lading',
      originPoint: 'ORIGIN POINT / SENDER',
      destinationPoint: 'DESTINATION POINT / CONSIGNEE',
      manifestTitle: 'Inspected Cargo Manifest & Packages',
      telemetryTitle: 'Real-Time Sensors During Transit',
      statusFlowTitle: 'Chain of Custody & Timestamped Log',
      updateStatusLabel: 'Update Operating Status:',
      satSealTitle: 'Verified SAT CFDI 4.0 Digital Stamp'
    },

    // Dynamic Enums Translation
    fleetStatuses: {
      in_transit: 'In Transit',
      idle: 'Idle',
      loading: 'Loading',
      unloading: 'Unloading',
      maintenance: 'Maintenance',
      alert: 'Alert'
    },

    shipmentStatuses: {
      order_placed: 'Order Placed',
      processing: 'In Hub',
      in_transit: 'In Transit',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      exception: 'Exception',
      customs_hold: 'Customs Hold'
    },

    cargoTypes: {
      standard: 'General Cargo',
      cold_chain: 'Cold Chain',
      hazardous: 'HAZMAT Dangerous',
      high_value: 'High Value / Armored',
      bulk: 'Industrial Bulk',
      pharmaceutical: 'Pharmaceutical'
    },

    priorityLevels: {
      urgent: 'Urgent',
      high: 'High',
      standard: 'Standard',
      economy: 'Economy'
    },

    incidentSeverities: {
      critical: 'Critical',
      warning: 'Warning',
      info: 'Info'
    }
  }
};
