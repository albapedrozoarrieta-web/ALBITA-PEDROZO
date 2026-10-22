import React, { useState } from 'react';
import { SyncStatus } from '../hooks/useAutoDriveSync';
import {
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Cloud,
  AlertCircle
} from 'lucide-react';

interface DriveSyncStatusPillProps {
  status: SyncStatus;
  lastSyncedAt: string | null;
  sheetLink: string | null;
  onConnectGoogle: () => void;
  onOpenFullModal: () => void;
  onForceSync: () => void;
}

export const DriveSyncStatusPill: React.FC<DriveSyncStatusPillProps> = ({
  status,
  lastSyncedAt,
  sheetLink,
  onConnectGoogle,
  onOpenFullModal,
  onForceSync
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // When not connected
  if (status === 'not_connected') {
    return (
      <button
        onClick={onConnectGoogle}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all text-xs font-medium cursor-pointer shadow-xs group"
        title="Conectar Google Drive para auto-guardado en tiempo real"
      >
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 group-hover:bg-[#39A900] transition-colors" />
        <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900]" />
        <span className="hidden sm:inline">Activar Auto-guardado</span>
        <span className="sm:hidden">Drive</span>
      </button>
    );
  }

  // When actively syncing
  if (status === 'syncing') {
    return (
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-medium"
        title="Guardando cambios automáticamente en Google Sheets..."
      >
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="hidden sm:inline">Guardando en Drive...</span>
        <span className="sm:hidden">Guardando...</span>
      </div>
    );
  }

  // When synced or error
  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            if (sheetLink) {
              window.open(sheetLink, '_blank', 'noopener,noreferrer');
            } else {
              onOpenFullModal();
            }
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all text-xs font-semibold cursor-pointer shadow-xs ${
            status === 'synced'
              ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-[#00732F] dark:text-[#4ade80] hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
              : 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 hover:bg-orange-100'
          }`}
          title={
            sheetLink
              ? 'Guardado automático en Drive activo. Clic para abrir la hoja de cálculo.'
              : 'Guardado en Drive activo.'
          }
        >
          {status === 'synced' ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
          )}

          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span className="hidden md:inline">
            {status === 'synced' ? (lastSyncedAt ? `Guardado (${lastSyncedAt})` : 'Guardado en Drive') : 'Pendiente reconexión'}
          </span>
          <span className="md:hidden">Drive ✓</span>
          {sheetLink && <ExternalLink className="w-3 h-3 opacity-60 hidden sm:inline" />}
        </button>

        {/* Dropdown toggle for quick actions */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xs cursor-pointer"
          title="Opciones de Google Drive"
        >
          <span className="text-[10px] block">▼</span>
        </button>
      </div>

      {/* Quick Action Popover */}
      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50 text-xs animate-fadeIn">
            <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700/80">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Auto-guardado en Google Drive
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {lastSyncedAt ? `Última sincronización: ${lastSyncedAt}` : 'Sincronizado silenciosamente'}
              </span>
            </div>

            {sheetLink && (
              <a
                href={sheetLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors font-medium"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#39A900]" />
                <span className="flex-1">Abrir Hoja en Drive</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            )}

            <button
              onClick={() => {
                setShowDropdown(false);
                onForceSync();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors font-medium cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-emerald-600" />
              <span>Sincronizar ahora</span>
            </button>

            <button
              onClick={() => {
                setShowDropdown(false);
                onOpenFullModal();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors font-medium cursor-pointer"
            >
              <Cloud className="w-4 h-4 text-[#00324D] dark:text-sky-400" />
              <span>Ver todos los registros</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
