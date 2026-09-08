# 🌐 Draybyte Logistics Group - Central Control Tower (v2.4.0-ENT)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-production-blue)
![Version](https://img.shields.io/badge/version-2.4.0--ENT-orange)
![Security](https://img.shields.io/badge/security-TLS_1.3-success)

> **Centro de Operaciones y Control de Cadena de Suministro.** 
> Plataforma empresarial desplegada para la orquestación logística de *Draybyte Logistics Group*. Este sistema centraliza la telemetría satelital de flotas en tiempo real, trazabilidad de envíos, gestión de inventarios multi-hub y optimización de despachos para corredores de carga pesada y cross-border (LATAM / US-MX).

🌍 **[Ver Plataforma en Vivo (Producción) 🟢]** *(Enlace a tu despliegue)*

![Vista Previa de Draybyte Control Tower](https://github.com/user-attachments/assets/f8400eb7-b3a5-455f-b29c-2d01105769a2)

---

## 🎥 Demostración de Operaciones en Tiempo Real

**🎬 Panel de Control y Telemetría Logística**  
Exploración de la interfaz de la torre de control: monitoreo de flotas satelitales, orquestación de envíos y orquestación de respuesta a incidentes en una cadena de suministro de alto rendimiento.

https://github.com/user-attachments/assets/7fd97020-1ca1-492f-b236-0ef814e0f6c0

---

## 🏗️ Arquitectura de Sistema y Stack Tecnológico

Este repositorio contiene la arquitectura de la aplicación cliente (Web/Edge), optimizada para alta disponibilidad y renderizado de datos en tiempo real. *(Nota: Por políticas de seguridad corporativa, los repositorios de los microservicios backend, integraciones IoT y bases de datos permanecen privados).*

- **Core & Runtime (Edge-Optimized):**
  - `react` (`^19.0.0`) & `react-dom`
  - `typescript` (`~5.7.2`) para tipado estricto de grado empresarial.
  - `vite` (`^6.2.0`) para compilación ultrarrápida.
- **Interfaz de Usuario (UI) & Estilizado:**
  - `tailwindcss` (`^4.0.9`) con arquitectura atómica.
  - `lucide-react` para iconografía técnica estandarizada.
  - `clsx` & `tailwind-merge` para renderizado condicional de componentes.
- **Visualización de Telemetría & Analítica:**
  - `recharts` (`^2.15.1`) para dashboards de OTD (On-Time Delivery).
- **Motor de IA & Optimización:**
  - Integración nativa con `@google/genai` (`^2.4.0`) para el *Neural Dispatch Core*.

---

## 🚀 Módulos Operativos (Desplegados)

1. **📡 Torre de Control de Flota Satelital (`FleetMonitor`)**
   - Ingesta de datos telemétricos IoT en tiempo real: velocidad instantánea, nivel de combustible, temperatura de cadena de frío y latencia GPS (0.4ms).
   - Recálculo dinámico de rutas alternas y ETAs.

2. **📦 Orquestación de Envíos y Aduanas (`ShipmentManager`)**
   - Control estricto de Carta Porte, códigos de contenedor y manifiestos aduanales SAT CFDI 4.0.
   - Bitácora de eventos inmutable con sellos de tiempo, coordenadas GPS y escáner de código de barras.

3. **🏭 Gestión de Inventarios Multi-Hub (`InventoryManager`)**
   - Visibilidad global de stock en múltiples centros de distribución (CDMX, GDL, MTY).
   - Sistema de asignación automatizada y alertas de ruptura de stock.

4. **⚠️ Centro de Mando de Incidentes (`IncidentsManager`)**
   - Monitoreo de bloqueos viales, alertas de seguridad (botón de pánico) y anomalías térmicas en cajas refrigeradas.
   - Protocolos de resolución asistida y ajuste de KPIs operativos en vivo.

5. **🧠 Neural Dispatch Core (`RouteOptimizerAI`)**
   - Optimizador de rutas potenciado por Inteligencia Artificial para el balanceo de carga, mitigación de cuellos de botella y maximización del ahorro de combustible.

---

## 💻 Guía de Despliegue y Ejecución (Entorno Local)

Para desarrolladores autorizados o ingenieros de DevOps que requieran auditar o correr el entorno de la interfaz cliente en local:

### 1. Clonar el repositorio y preparar entorno
```bash
git clone [https://github.com/tu-usuario/draybyte-logistics-platform.git](https://github.com/tu-usuario/draybyte-logistics-platform.git)
cd draybyte-logistics-platform
```
### 2. Instalación de dependencias (Node.js v18+)
```Bash
npm install
```

### 3. Configuración de Entorno (Environment)
Clona el archivo de configuración base. Para habilitar el módulo Neural Dispatch Core, se requiere inyectar la API Key correspondiente.
```Bash
cp .env.example .env
```

### 4. Iniciar el servidor local de desarrollo
```Bash
npm run dev
La terminal indicará el puerto local habilitado (por defecto http://localhost:3000).
```

### 5. Compilación para Producción (CI/CD Pipeline)
Para generar los artefactos de construcción optimizados listos para despliegue en CDN/Edge:
```Bash
npm run build
Propiedad Intelectual de Draybyte Logistics Group © 2026. Sistema Operativo.
```
