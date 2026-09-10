# 🌐 Draybyte Logistics Group - Central Control Tower (v2.4.0-ENT)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-production-blue)
![Version](https://img.shields.io/badge/version-2.4.0--ENT-orange)
![Security](https://img.shields.io/badge/security-TLS_1.3-success)

> **Supply Chain Control and Operations Center.** 
> Enterprise platform deployed for the logistics orchestration of *Draybyte Logistics Group*. This system centralizes real-time satellite fleet telemetry, shipment traceability, multi-hub inventory management, and dispatch optimization for heavy freight and cross-border corridors (LATAM / US-MX).

🌍 **[View Live Platform (Production) 🟢]** *https://draybyte.vercel.app/*

![Draybyte Control Tower Preview](https://github.com/user-attachments/assets/ea0256cf-1eb0-4aed-9dad-ae3a62f7cea4)

---

## 🎥 Real-Time Operations Demo

**🎬 Control Panel & Logistics Telemetry**  
Control tower interface walkthrough: satellite fleet monitoring, shipment orchestration, and incident response handling in a high-performance supply chain.

https://github.com/user-attachments/assets/1d45d08c-6670-4b60-a5c8-10875b2854ee

---

## 🏗️ System Architecture & Tech Stack

This repository contains the client application architecture (Web/Edge), optimized for high availability and real-time data rendering. *(Note: Due to corporate security policies, repositories for backend microservices, IoT integrations, and databases remain private).*

- **Core & Runtime (Edge-Optimized):**
  - `react` (`^19.0.0`) & `react-dom`
  - `typescript` (`~5.7.2`) for enterprise-grade strict typing.
  - `vite` (`^6.2.0`) for ultra-fast compilation.
- **User Interface (UI) & Styling:**
  - `tailwindcss` (`^4.0.9`) with atomic architecture.
  - `lucide-react` for standardized technical iconography.
  - `clsx` & `tailwind-merge` for conditional component rendering.
- **Telemetry & Analytics Visualization:**
  - `recharts` (`^2.15.1`) for OTD (On-Time Delivery) dashboards.
- **AI Engine & Optimization:**
  - Native integration with `@google/genai` (`^2.4.0`) for the *Neural Dispatch Core*.

---

## 🚀 Operational Modules (Deployed)

1. **📡 Satellite Fleet Control Tower (`FleetMonitor`)**
   - Real-time IoT telemetric data ingestion: instant speed, fuel level, cold chain temperature, and GPS latency (0.4ms).
   - Dynamic re-routing and ETA recalculation.

2. **📦 Shipment Orchestration & Customs (`ShipmentManager`)**
   - Strict tracking of Waybill / Carta Porte, container codes, and SAT CFDI 4.0 customs manifests.
   - Immutable event logs with timestamps, GPS coordinates, and barcode scanner integration.

3. **🏭 Multi-Hub Inventory Management (`InventoryManager`)**
   - Global stock visibility across multiple distribution centers (CDMX, GDL, MTY).
   - Automated allocation system and stockout alerts.

4. **⚠️ Incident Command Center (`IncidentsManager`)**
   - Monitoring of road closures, security alerts (panic button), and thermal anomalies in refrigerated cargo.
   - Assisted resolution protocols and live operational KPI adjustments.

5. **🧠 Neural Dispatch Core (`RouteOptimizerAI`)**
   - AI-powered route optimizer for load balancing, bottleneck mitigation, and fuel savings maximization.

---

## 💻 Deployment & Execution Guide (Local Environment)

For authorized developers or DevOps engineers who need to audit or run the client interface environment locally:

### 1. Clone the repository and set up environment
```bash
git clone https://github.com/your-username/draybyte-logistics-platform.git
cd draybyte-logistics-platform
```

### 2. Install dependencies (Node.js v18+)
```bash
npm install
```

### 3. Environment Configuration
Clone the base configuration file. To enable the Neural Dispatch Core module, inject the corresponding API key.
```bash
cp .env.example .env
```

### 4. Start the local development server
```bash
npm run dev
```
The terminal will display the enabled local port (default: http://localhost:3000).

### 5. Production Build (CI/CD Pipeline)
To generate the optimized production build artifacts ready for CDN/Edge deployment:
```bash
npm run build
```

---
*Draybyte Logistics Group Intellectual Property © 2026. Operating System.*
