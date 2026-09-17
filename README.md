<div align="center">
  <img alt="Draybyte Banner" src="https://github.com/user-attachments/assets/7d9317b7-b8a0-4eef-99a3-6fbf3fb7214e" width="50%" />

  <br>

  <h3>Central Control Tower (v2.4.0-ENT)</h3>

  <p>
    <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status" />
    <img src="https://img.shields.io/badge/deployment-production-blue" alt="Deployment" />
    <img src="https://img.shields.io/badge/version-2.4.0--ENT-orange" alt="Version" />
    <img src="https://img.shields.io/badge/security-TLS_1.3-success" alt="Security" />
  </p>
</div>

<br>

> **Logistics Operations Dashboard & Fleet Tracking Interface.**  
> A client-side logistics management interface and operational dashboard developed for freight tracking scenarios. The application organizes simulated telemetry feeds, shipment milestones, multi-warehouse inventory levels, and route planning assistance within a cohesive, responsive web workspace.

<br>

<div align="center">
  <h3>🌍 <b><a href="https://draybyte.vercel.app/">View Live Platform (Production) 🟢</a></b></h3>
  <br>
  <img alt="Draybyte Preview" src="https://github.com/user-attachments/assets/ea0256cf-1eb0-4aed-9dad-ae3a62f7cea4" width="80%" />
</div>

## 🎥 Real-Time Operations Demo

**🎬 Control Panel & Logistics Telemetry**  
Operations dashboard walkthrough: fleet telemetry monitoring, shipment status tracking, inventory overview, and incident logging within a responsive client interface.

https://github.com/user-attachments/assets/1d45d08c-6670-4b60-a5c8-10875b2854ee

---

## 🏗️ System Architecture & Tech Stack

This repository focuses on the frontend application architecture (Web/Edge), organizing real-time dashboard layouts, interactive maps, and operational metrics into modular components. *(Note: Production backend services, hardware IoT brokers, and private databases are simulated client-side to offer an independent, self-contained demonstration).*

- **Core & Runtime:**
  - `react` (`^19.0.0`) & `react-dom` for responsive, component-driven UI rendering.
  - `typescript` (`~5.7.2`) providing static typing across telemetry events, route coordinates, and shipment records.
  - `vite` (`^6.2.0`) for fast local compilation and optimized bundling.
- **User Interface (UI) & Styling:**
  - `tailwindcss` (`^4.0.9`) with a component-driven styling architecture.
  - `lucide-react` for clean, consistent technical iconography.
  - `clsx` & `tailwind-merge` for conditional class management and style consistency.
- **Telemetry & Data Visualization:**
  - `recharts` (`^2.15.1`) for responsive delivery performance (OTD) and fleet metric charts.
- **Assisted Dispatch & Routing:**
  - Integration with `@google/genai` (`^2.4.0`) for route suggestions and cargo dispatch assistance.

---

## 🚀 Operational Modules (Deployed)

1. **📡 Fleet Monitoring Dashboard (`FleetMonitor`)**
   - Visualization of simulated vehicle telemetry: speed, fuel readings, cargo compartment temperatures, and estimated transit coordinates.
   - Interactive re-routing simulation and ETA updates.

2. **📦 Shipment Tracking & Documentation (`ShipmentManager`)**
   - Structured overview of consignment waybills, container identifiers, and compliance documentation.
   - Chronological event timeline with status checkpoints and barcode lookup support.

3. **🏭 Multi-Hub Inventory Overview (`InventoryManager`)**
   - Stock visibility across regional distribution nodes (CDMX, GDL, MTY).
   - Category-based inventory counters and minimum reorder alert indicators.

4. **⚠️ Operational Alerts & Incidents (`IncidentsManager`)**
   - Status log tracking route disruptions, weather warnings, and temperature deviations.
   - Standardized incident resolution checklist and severity classifications.

5. **🧠 Route Planning Assistant (`RouteOptimizerAI`)**
   - Contextual recommendation module to assist dispatchers with delivery sequencing, load balancing, and route suggestions.

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
Clone the base configuration file. To enable the dispatch assistance module, add the corresponding API key.
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
*Draybyte Logistics Group Intellectual Property © 2026. Technical Demonstration Project.*
