import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Phone,
  Wrench,
  Navigation,
  MapPin,
  Flame,
  FileCheck,
  Send
} from 'lucide-react';
import { OperationalIncident, IncidentSeverity } from '../types/logistics';

interface IncidentsManagerProps {
  incidents: OperationalIncident[];
  onResolveIncident: (incidentId: string, resolutionNote: string) => void;
  isDense: boolean;
}

export const IncidentsManager: React.FC<IncidentsManagerProps> = ({
  incidents,
  onResolveIncident,
  isDense
}) => {
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(incidents[0]?.id || null);
  const [resolutionText, setResolutionText] = useState<string>('');

  const filteredIncidents = incidents.filter((inc) => {
    if (severityFilter !== 'all' && inc.severity !== severityFilter) return false;
    return true;
  });

  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  const getSeverityBadge = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-600 animate-bounce" /> Crítico
          </span>
        );
      case 'warning':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
            Advertencia
          </span>
        );
      default:
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-medium uppercase">
            Informativo
          </span>
        );
    }
  };

  const handleResolve = () => {
    if (!selectedIncident) return;
    const note = resolutionText || selectedIncident.recommendedAction;
    onResolveIncident(selectedIncident.id, note);
    setResolutionText('');
  };

  return (
    <div className="space-y-4">
      {/* Top Incident Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Incidencias Activas</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {incidents.filter((i) => i.status !== 'resolved').length}
          </div>
          <span className="text-[10px] text-rose-600 font-semibold mt-0.5 block">1 Crítica requiere acción</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Tiempo Promedio Resolución (MTTR)</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            24 min
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">-8 min vs semana anterior</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Incidentes Mecánicos / Carretera</span>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1">
            1
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Unidad de auxilio asignada</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Alertas Cadena de Frío</span>
          <div className="text-2xl font-bold font-mono text-sky-600 mt-1">
            0 Activas
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">100% Cargas seguras</span>
        </div>
      </div>

      {/* Main Grid: Incident List (5 Cols) + Detail Resolution Console (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Incident List */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Registro de Eventos y Alarmas
            </h3>
            <div className="flex items-center space-x-1">
              {['all', 'critical', 'warning'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSeverityFilter(s)}
                  className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                    severityFilter === s ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {s === 'all' ? 'Todos' : s === 'critical' ? 'Críticos' : 'Avisos'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredIncidents.map((incident) => {
              const isSelected = incident.id === selectedIncident?.id;
              const isResolved = incident.status === 'resolved';
              return (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncidentId(incident.id)}
                  className={`p-3.5 cursor-pointer transition-all hover:bg-slate-50/80 ${
                    isSelected ? 'bg-indigo-50/60 border-l-4 border-indigo-600 pl-2.5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-xs text-slate-900">
                          {incident.code}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                          {incident.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 mt-1 line-clamp-1">
                        {incident.title}
                      </h4>
                    </div>
                    <div>{getSeverityBadge(incident.severity)}</div>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                    {incident.description}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {incident.locationName}
                    </span>
                    <span className="font-mono">
                      {isResolved ? (
                        <strong className="text-emerald-600">✅ Resuelto</strong>
                      ) : (
                        <strong className="text-rose-600">⏳ En Investigación</strong>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Incident Detail & Emergency Response Panel */}
        {selectedIncident && (
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-sm bg-slate-900 text-white px-2 py-0.5 rounded">
                    {selectedIncident.code}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900">{selectedIncident.title}</h3>
                </div>
                {getSeverityBadge(selectedIncident.severity)}
              </div>

              <div className="mt-3.5 space-y-3 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                    Descripción del Suceso:
                  </span>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                    {selectedIncident.description}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">UBICACIÓN GEOGRÁFICA</span>
                    <span className="font-bold text-slate-800">{selectedIncident.locationName}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">HORA DE DETECCIÓN</span>
                    <span className="font-bold text-slate-800">{selectedIncident.timestamp}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-indigo-900 uppercase block mb-1">
                    Protocolo de Acción Recomendado (IA Control Tower):
                  </span>
                  <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-200 text-indigo-950 font-medium">
                    ⚡ {selectedIncident.recommendedAction}
                  </div>
                </div>
              </div>
            </div>

            {/* Resolution Form / Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              {selectedIncident.status === 'resolved' ? (
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Incidencia marcada como resuelta y archivada en auditoría.
                  </span>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <label className="font-semibold text-slate-700 block">
                    Acción de Mitigación / Nota de Cierre:
                  </label>
                  <input
                    type="text"
                    placeholder="Escriba la acción realizada o confirme la recomendada..."
                    value={resolutionText}
                    onChange={(e) => setResolutionText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={handleResolve}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ejecutar Solución & Cerrar Alerta</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
