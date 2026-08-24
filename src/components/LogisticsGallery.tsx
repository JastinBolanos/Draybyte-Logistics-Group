import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Camera,
  MapPin,
  Tag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { LOGISTICS_PHOTOS, LogisticsPhoto } from '../data/logisticsImages';

interface LogisticsGalleryProps {
  onSelectPhotoCategory?: (cat: string) => void;
}

export const LogisticsGallery: React.FC<LogisticsGalleryProps> = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<LogisticsPhoto | null>(null);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Infraestructura & Operaciones Logísticas de Alto Rendimiento
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">6 Instalaciones Registradas</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {LOGISTICS_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 cursor-pointer shadow-xs hover:shadow-md transition-all h-36"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-2.5 flex flex-col justify-end">
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-300 font-mono">
                {photo.location}
              </span>
              <h4 className="text-[11px] font-bold text-white leading-tight line-clamp-1 mt-0.5">
                {photo.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Inspector Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="relative h-64 sm:h-80 bg-slate-950">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">📍 {selectedPhoto.location}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{selectedPhoto.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedPhoto.description}</p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
