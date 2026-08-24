import { useState, useEffect, useCallback, type Dispatch, type SetStateAction } from 'react';
import { Vehicle } from '../types/logistics';
import { TelemetryService } from '../services/telemetryService';

export function useTelemetrySimulation(
  vehicles: Vehicle[],
  setVehicles: Dispatch<SetStateAction<Vehicle[]>>
) {
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setVehicles((prev) => TelemetryService.simulateFleetStep(prev));
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating, setVehicles]);

  const handleManualRefresh = useCallback(() => {
    const now = new Date();
    setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  return {
    isSimulating,
    setIsSimulating,
    lastSyncTime,
    handleManualRefresh
  };
}
