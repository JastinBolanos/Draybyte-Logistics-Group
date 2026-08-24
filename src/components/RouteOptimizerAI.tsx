import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Navigation,
  Fuel,
  CloudRain,
  TrendingDown,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Layers,
  Cpu
} from 'lucide-react';
import { Vehicle, Shipment, InventoryItem } from '../types/logistics';

interface RouteOptimizerAIProps {
  vehicles: Vehicle[];
  shipments: Shipment[];
  inventory: InventoryItem[];
  onApplyReroute: (vehicleId: string, newEta: number, savingsKm: number) => void;
}

export const RouteOptimizerAI: React.FC<RouteOptimizerAIProps> = ({
  vehicles,
  shipments,
  inventory,
  onApplyReroute
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [appliedRecommendations, setAppliedRecommendations] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; timestamp: string }>>([
    {
      sender: 'ai',
      text: 'Bienvenido al Copiloto Logístico de IA. Monitoreo activamente 28 unidades en tránsito, condiciones climáticas satelitales y niveles de stock en 4 hubs. ¿En qué optimización deseas enfocarte hoy?',
      timestamp: '12:50'
    }
  ]);

  const smartRecommendations = [
    {
      id: 'rec-01',
      title: 'Desvío Inteligente: Autopista 57D (Carretera Matehuala - Saltillo)',
      targetVehicleId: 'veh-03',
      vehiclePlate: 'TRK-8812 (HAZMAT)',
      cause: 'Congestión vial y obras en Km 182 + alerta leve de neumático.',
      recommendation: 'Tomar desvío por Libramiento San Luis - Zacatecas / Carretera 54 hacia Saltillo.',
      impactTime: '-45 min',
      fuelSaving: '18 Litros Diesel',
      co2Reduction: '48 kg CO2',
      urgency: 'high'
    },
    {
      id: 'rec-02',
      title: 'Consolidación de Carga Urbana: Polanco - Santa Fe (EV)',
      targetVehicleId: 'veh-02',
      vehiclePlate: 'VAN-2041 (Electric Van)',
      cause: 'Ventana de tráfico pico en Periférico Poniente a las 14:00 hrs.',
      recommendation: 'Adelantar entrega en Vía Santa Fe usando carril reversible Autopista Urbana Poniente.',
      impactTime: '-18 min',
      fuelSaving: '12% Batería EV',
      co2Reduction: 'Cero Directo',
      urgency: 'medium'
    },
    {
      id: 'rec-03',
      title: 'Sugerencia de Reabastecimiento: Frenos Cerámicos 40T (MTY Hub)',
      targetVehicleId: 'sku-04',
      vehiclePlate: 'SKU: AUTO-BRK-HD',
      cause: 'Stock disponible en 120 uds. Tasa de consumo actual agotará stock de seguridad en 72 hrs.',
      recommendation: 'Emitir orden de compra automática por 400 unidades al proveedor matriz con entrega prioritaria.',
      impactTime: 'Previene paro de flota',
      fuelSaving: 'N/A',
      co2Reduction: 'N/A',
      urgency: 'critical'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userText = prompt;
    setPrompt('');
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setIsAnalyzing(true);
    setTimeout(() => {
      let aiReply = `Análisis de telemetría completado para: "${userText}". He verificado la flota activa y recomiendo mantener el corredor actual con monitoreo de telemetría reforzado cada 10 segundos.`;
      
      if (userText.toLowerCase().includes('matehuala') || userText.toLowerCase().includes('trk-8812')) {
        aiReply = `Para la unidad TRK-8812 (Matehuala), el algoritmo de ruteo dinámico calcula que el desvío por la ruta 54 ahorrará 45 minutos y evitará el tramo en reparación. El estado de la carga HAZMAT se mantiene seguro.`;
      } else if (userText.toLowerCase().includes('stock') || userText.toLowerCase().includes('inventario')) {
        aiReply = `El inventario del Mega-Hub Monterrey tiene 2 SKUs bajo el punto de reorden (AUTO-BRK-HD y TECH-IPH-16P). He preparado una orden de transferencia desde el Hub CDMX para equilibrar existencias sin costo extra de flete.`;
      } else if (userText.toLowerCase().includes('frío') || userText.toLowerCase().includes('pharma')) {
        aiReply = `La cadena de frío para TRK-4921 (Vacunas) se encuentra nominal a 3.4°C (Rango 2-8°C). La ruta actual por Querétaro es la más rápida con menor variación térmica ambiental.`;
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiReply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsAnalyzing(false);
    }, 900);
  };

  const handleApply = (rec: typeof smartRecommendations[0]) => {
    onApplyReroute(rec.targetVehicleId, 190, 24);
    setAppliedRecommendations((prev) => [...prev, rec.id]);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner AI Core */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-400/30">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </span>
              <h2 className="text-sm font-bold tracking-wide">
                Motor de Optimización Logística & Telemetría Predictiva con IA
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl">
              Algoritmos de ruteo dinámico continuo: análisis de tráfico en tiempo real, predicción de temperatura de cadena de frío, mitigación de riesgos y equilibrio de stock inter-almacenes.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">TIEMPO AHORRADO HOY</span>
              <span className="text-emerald-400 font-bold text-sm">4 hrs 20 min</span>
            </div>
            <div className="border-l border-white/20 pl-3">
              <span className="text-slate-400 block text-[10px]">COMBUSTIBLE REDUCIDO</span>
              <span className="text-amber-300 font-bold text-sm">185 Litros</span>
            </div>
            <div className="border-l border-white/20 pl-3">
              <span className="text-slate-400 block text-[10px]">CO2 EVITADO</span>
              <span className="text-indigo-300 font-bold text-sm">490 kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recommended Actions (7 Cols) + AI Dispatch Chat Copilot (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Proactive Action Cards */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-indigo-600" />
              Recomendaciones Automáticas de Alta Prioridad
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">3 Sugerencias Pendientes</span>
          </div>

          {smartRecommendations.map((rec) => {
            const isApplied = appliedRecommendations.includes(rec.id);
            return (
              <div
                key={rec.id}
                className={`bg-white rounded-xl border p-4 shadow-xs transition-all ${
                  isApplied ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold font-mono bg-slate-900 text-white px-2 py-0.5 rounded">
                        {rec.vehiclePlate}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900">{rec.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong className="text-slate-700">Causa:</strong> {rec.cause}
                    </p>
                  </div>
                  {rec.urgency === 'critical' ? (
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0">
                      Crítico
                    </span>
                  ) : rec.urgency === 'high' ? (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0">
                      Alta Prioridad
                    </span>
                  ) : (
                    <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0">
                      Sugerencia
                    </span>
                  )}
                </div>

                <div className="mt-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <div className="font-semibold text-indigo-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Propuesta de IA:
                  </div>
                  <p className="mt-0.5 text-slate-700">{rec.recommendation}</p>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-3 font-mono text-[11px] text-slate-600">
                    <span>⏱️ Ahorro Tiempo: <strong className="text-emerald-700">{rec.impactTime}</strong></span>
                    {rec.fuelSaving !== 'N/A' && (
                      <span>⛽ Combustible: <strong className="text-amber-700">{rec.fuelSaving}</strong></span>
                    )}
                  </div>

                  {isApplied ? (
                    <span className="flex items-center space-x-1 text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Optimización Aplicada</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(rec)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Aplicar Ruteo / Acción</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive Supply Chain Copilot */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Copiloto de Control Tower
              </h3>
            </div>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded font-mono font-semibold">
              Gemini 2.5 Logic Core
            </span>
          </div>

          {/* Messages Log */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">{msg.timestamp}</span>
              </div>
            ))}

            {isAnalyzing && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs bg-white p-2.5 rounded-lg border border-slate-200 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                <span>Analizando telemetría de satélite y rutas alternas...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-slate-200 bg-white flex flex-wrap gap-1">
            {[
              '¿Cuál es el estado de la unidad TRK-8812?',
              'Alertas de frío en Hub CDMX',
              'Sugerir rebalanceo de stock'
            ].map((qp, i) => (
              <button
                key={i}
                onClick={() => setPrompt(qp)}
                className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Pregunta sobre rutas, combustible, conductores o SKUs..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isAnalyzing}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
