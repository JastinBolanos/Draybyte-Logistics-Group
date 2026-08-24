import React from 'react';
import { APP_CONFIG } from '../../utils/constants';

export const FooterStatusStrip: React.FC = () => {
  return (
    <footer className="h-8 bg-slate-900 text-[10px] text-slate-400 flex items-center justify-between px-6 sm:px-8 border-t border-slate-800 shrink-0 select-none">
      <div className="flex items-center gap-2">
        <span>{APP_CONFIG.COPYRIGHT}</span>
        <span className="text-slate-700">•</span>
        <span className="text-slate-400">{APP_CONFIG.CORRIDOR_LABEL}</span>
      </div>
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          API Gateway: {APP_CONFIG.API_GATEWAY_STATUS}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          GPS Sync: {APP_CONFIG.GPS_LATENCY}
        </span>
      </div>
    </footer>
  );
};
