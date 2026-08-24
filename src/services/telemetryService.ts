import { Vehicle } from '../types/logistics';

export class TelemetryService {
  /**
   * Simulates dynamic satellite updates on in-transit fleet vehicles.
   */
  public static simulateFleetStep(vehicles: Vehicle[]): Vehicle[] {
    return vehicles.map((v) => {
      if (v.status !== 'in_transit') {
        return v;
      }

      // Slight jitter to speed and route progress
      const speedFluctuation = Math.floor(Math.random() * 5) - 2;
      const newSpeed = Math.max(30, Math.min(105, v.telemetry.speedKmh + speedFluctuation));
      const newProgress = v.routeProgress >= 100 ? 100 : v.routeProgress + 0.1;
      const newFuel = Math.max(10, v.telemetry.fuelLevelPercent - 0.02);

      // Cold chain cargo temp slight fluctuation
      let newCargoTemp = v.telemetry.cargoTempC;
      if (newCargoTemp !== undefined) {
        const tempJitter = Math.random() * 0.2 - 0.1;
        newCargoTemp = Number((newCargoTemp + tempJitter).toFixed(1));
      }

      return {
        ...v,
        routeProgress: Number(newProgress.toFixed(1)),
        telemetry: {
          ...v.telemetry,
          speedKmh: newSpeed,
          fuelLevelPercent: Number(newFuel.toFixed(1)),
          cargoTempC: newCargoTemp,
          lastPing: 'Hace 1 seg'
        }
      };
    });
  }

  /**
   * Calculates optimized alternative routing for a vehicle.
   */
  public static calculateReroute(vehicle: Vehicle): Vehicle {
    return {
      ...vehicle,
      status: 'in_transit',
      etaMinutes: Math.max(15, vehicle.etaMinutes - 35),
      currentLocation: {
        ...vehicle.currentLocation,
        address: 'Vía Alterna Rápida (Libramiento 54)'
      }
    };
  }
}
