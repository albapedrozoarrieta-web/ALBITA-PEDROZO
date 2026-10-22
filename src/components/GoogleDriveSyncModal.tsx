import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, UserProgress } from '../types/induction';
import {
  googleSignIn,
  logoutGoogle,
  getAccessToken,
  initAuth
} from '../services/googleAuth';
import {
  getOrCreateInductionSpreadsheet,
  syncApprenticeRecord,
  getRegisteredApprentices,
  SheetApprenticeRow,
  SPREADSHEET_TITLE
} from '../services/googleSheetsService';
import {
  X,
  FileSpreadsheet,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  LogOut,
  Sparkles,
  CloudCheck,
  ShieldCheck,
  Users,
  Search,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import { User } from 'firebase/auth';

interface GoogleDriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  progress: UserProgress;
}

export const GoogleDriveSyncModal: React.FC<GoogleDriveSyncModalProps> = ({
  isOpen,
  onClose,
  profile,
  progress
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const [spreadsheetInfo, setSpreadsheetInfo] = useState<{
    id: string;
    name: string;
    webViewLink: string;
  } | null>(null);

  const [records, setRecords] = useState<SheetApprenticeRow[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [syncStatusMessage, setSyncStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Confirmation modal state for mutating Google Drive data
  const [showConfirmSync, setShowConfirmSync] = useState(false);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setSpreadsheetInfo(null);
        setRecords([]);
      }
    );
    return () => unsubscribe();
  }, []);

  // When token is available and modal is open, load or find the spreadsheet
  useEffect(() => {
    if (isOpen && token) {
      loadSpreadsheetData(token);
    }
  }, [isOpen, token]);

  const loadSpreadsheetData = async (accessToken: string) => {
    setIsLoadingSheet(true);
    setSyncStatusMessage(null);
    try {
      const sheet = await getOrCreateInductionSpreadsheet(accessToken);
      setSpreadsheetInfo(sheet);
      const rows = await getRegisteredApprentices(accessToken, sheet.id);
      setRecords(rows);
    } catch (err: any) {
      console.error('Error cargando hoja de cálculo:', err);
      setSyncStatusMessage({
        type: 'error',
        text: err.message || 'Error al conectar con Google Sheets y Drive'
      });
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setSyncStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        await loadSpreadsheetData(result.accessToken);
      }
    } catch (err: any) {
      console.error('Error en autenticación:', err);
      setSyncStatusMessage({
        type: 'error',
        text: 'No se pudo iniciar sesión con Google. Por favor intenta nuevamente.'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setToken(null);
    setSpreadsheetInfo(null);
    setRecords([]);
  };

  const handleConfirmSync = async () => {
    setShowConfirmSync(false);
    if (!token || !spreadsheetInfo) return;

    setIsSyncing(true);
    setSyncStatusMessage(null);
    try {
      const res = await syncApprenticeRecord(
        token,
        spreadsheetInfo.id,
        profile,
        progress,
        user?.email || undefined
      );

      setSyncStatusMessage({
        type: 'success',
        text:
          res.action === 'updated'
            ? `¡Ficha actualizada exitosamente en Google Drive! (Fila ${res.rowNumber})`
            : `¡Aprendiz registrado exitosamente en Google Drive! (Fila ${res.rowNumber})`
      });

      // Reload rows to reflect updated values
      const updatedRows = await getRegisteredApprentices(token, spreadsheetInfo.id);
      setRecords(updatedRows);
    } catch (err: any) {
      console.error('Error sincronizando registro:', err);
      setSyncStatusMessage({
        type: 'error',
        text: err.message || 'Error al registrar en Google Sheets.'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isOpen) return null;

  const filteredRecords = records.filter(
    r =>
      r.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.documentNumber.includes(searchFilter) ||
      r.fichaNumber.includes(searchFilter) ||
      r.studyProgram.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 transition-all">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Almacenamiento en Google Drive</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#39A900]/10 text-[#39A900] font-semibold">
                  Google Sheets API
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sincronización oficial del registro de inducción y aprendices (Acuerdo 0009 de 2024)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status notification */}
          {syncStatusMessage && (
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium animate-fadeIn ${
                syncStatusMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
              }`}
            >
              {syncStatusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
              )}
              <span>{syncStatusMessage.text}</span>
            </div>
          )}

          {/* User Auth State / Google Connection */}
          {!user ? (
            <div className="text-center py-8 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-[#39A900] flex items-center justify-center mx-auto mb-3">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Conectar con Google Drive & Google Sheets
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-5">
                Inicia sesión con tu cuenta de Google para crear automáticamente la hoja de cálculo institucional y registrar los datos del aprendiz de forma persistente.
              </p>

              {/* Official Google Sign-in Button */}
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isLoggingIn ? 'Iniciando sesión...' : 'Iniciar sesión con Google'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Account & Sheet Status Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Connected Account */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Usuario'}
                        className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-600"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#00324D] text-white font-bold flex items-center justify-center text-sm">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'G'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {user.displayName || 'Usuario Google'}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Cerrar sesión de Google"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Target Google Drive Sheet */}
                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#00732F] dark:text-[#4ade80] uppercase tracking-wider block">
                        Hoja de cálculo en Google Drive
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate block mt-0.5">
                        {spreadsheetInfo ? spreadsheetInfo.name : 'Cargando libro de cálculo...'}
                      </span>
                    </div>
                    {spreadsheetInfo?.webViewLink && (
                      <a
                        href={spreadsheetInfo.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-slate-700 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors shrink-0"
                      >
                        <span>Abrir en Drive</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between mt-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60">
                    <span>{records.length} registro(s) sincronizado(s)</span>
                    <button
                      onClick={() => token && loadSpreadsheetData(token)}
                      disabled={isLoadingSheet}
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingSheet ? 'animate-spin' : ''}`} />
                      <span>Actualizar</span>
                    </button>
                  </div>
                </div>

                {/* Direct Link Banner */}
                {spreadsheetInfo?.webViewLink && (
                  <div className="md:col-span-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <FileSpreadsheet className="w-4 h-4 text-[#39A900]" />
                        <span>Enlace directo a tu Hoja de Cálculo en Google Drive:</span>
                      </span>
                      <a
                        href={spreadsheetInfo.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 text-xs"
                      >
                        <span>Abrir en nueva pestaña</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={spreadsheetInfo.webViewLink}
                        className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-mono select-all focus:outline-none"
                      />
                      <button
                        onClick={() => handleCopyUrl(spreadsheetInfo.webViewLink)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Enlace</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sync current apprentice profile action */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {profile.fullName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                      Doc: {profile.documentNumber}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                      Ficha {profile.fichaNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Progreso: {Math.round((progress.completedModules.length / 5) * 100)}% ({progress.completedModules.length}/5 módulos) · Examen:{' '}
                    {progress.finalExamScore !== null ? `${progress.finalExamScore}%` : 'Pendiente'} · XP: {progress.xp}
                  </p>
                </div>

                <button
                  onClick={() => setShowConfirmSync(true)}
                  disabled={isSyncing || isLoadingSheet || !spreadsheetInfo}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <CloudCheck className={`w-4 h-4 ${isSyncing ? 'animate-bounce' : ''}`} />
                  <span>{isSyncing ? 'Sincronizando...' : 'Guardar en Google Sheets'}</span>
                </button>
              </div>

              {/* Registered Apprentices Table */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Users className="w-4 h-4 text-[#39A900]" />
                    <span>Registros de Aprendices en la Hoja de Drive</span>
                    <span className="text-[11px] px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-normal">
                      {records.length} total
                    </span>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, documento o ficha..."
                      value={searchFilter}
                      onChange={e => setSearchFilter(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900] w-64"
                    />
                  </div>
                </div>

                {/* Table Container */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden overflow-x-auto bg-white dark:bg-slate-900">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                        <th className="py-2.5 px-3">Fecha</th>
                        <th className="py-2.5 px-3">Aprendiz</th>
                        <th className="py-2.5 px-3">Documento</th>
                        <th className="py-2.5 px-3">Ficha / Programa</th>
                        <th className="py-2.5 px-3">Progreso</th>
                        <th className="py-2.5 px-3">Examen</th>
                        <th className="py-2.5 px-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {isLoadingSheet ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#39A900]" />
                            <span>Cargando registros desde Google Drive...</span>
                          </td>
                        </tr>
                      ) : filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            {records.length === 0
                              ? 'Aún no hay registros en la hoja de cálculo. ¡Sincroniza el primero!'
                              : 'No se encontraron aprendices que coincidan con la búsqueda.'}
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((row, idx) => (
                          <tr
                            key={idx}
                            className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors ${
                              row.documentNumber.trim() === profile.documentNumber.trim()
                                ? 'bg-emerald-50/40 dark:bg-emerald-950/20'
                                : ''
                            }`}
                          >
                            <td className="py-2 px-3 text-[11px] text-slate-500 whitespace-nowrap">
                              {row.timestamp}
                            </td>
                            <td className="py-2 px-3 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                              {row.fullName}
                              {row.documentNumber.trim() === profile.documentNumber.trim() && (
                                <span className="ml-1.5 text-[9px] px-1.5 py-0.2 rounded bg-[#39A900] text-white font-bold">
                                  Tú
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-slate-500 whitespace-nowrap">
                              {row.documentNumber}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap max-w-[200px] truncate">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {row.fichaNumber}
                              </span>{' '}
                              · <span className="text-[11px] text-slate-500">{row.studyProgram}</span>
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {row.progressPercent}
                              </span>{' '}
                              <span className="text-[11px] text-slate-400">({row.completedModules})</span>
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap font-semibold">
                              {row.examScore}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  row.certifiedStatus === 'CERTIFICADO'
                                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                                    : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                                }`}
                              >
                                {row.certifiedStatus === 'CERTIFICADO' && '✓ '}
                                {row.certifiedStatus}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#39A900]" />
            <span>Los datos se almacenan exclusivamente en tu Google Drive bajo tu autorización.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog before mutating Workspace data */}
      {showConfirmSync && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                ¿Confirmas la sincronización con Google Drive?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Se guardará o actualizará la información del aprendiz en el archivo{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  "{SPREADSHEET_TITLE}"
                </strong>{' '}
                en tu Google Drive:
              </p>
              <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div>
                  <span className="text-slate-400">Aprendiz:</span>{' '}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{profile.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400">Documento:</span>{' '}
                  <span className="text-slate-800 dark:text-slate-200">{profile.documentType} {profile.documentNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400">Ficha:</span>{' '}
                  <span className="text-slate-800 dark:text-slate-200">{profile.fichaNumber} - {profile.studyProgram}</span>
                </div>
                <div>
                  <span className="text-slate-400">Estado:</span>{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {progress.finalExamScore !== null && progress.finalExamScore >= 80
                      ? 'Certificado Aprobado'
                      : `${Math.round((progress.completedModules.length / 5) * 100)}% Completado`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmSync(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSync}
                className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar y Guardar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
