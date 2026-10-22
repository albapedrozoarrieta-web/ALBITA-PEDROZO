import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, UserProgress } from '../types/induction';
import {
  Users,
  Award,
  BookOpen,
  FileSpreadsheet,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Search,
  Filter,
  RefreshCw,
  Download,
  Printer,
  ShieldCheck,
  AlertCircle,
  GraduationCap,
  Sparkles,
  Link as LinkIcon,
  Eye,
  CheckCircle2,
  Clock,
  Send
} from 'lucide-react';
import {
  getSavedSpreadsheetInfo,
  getRegisteredApprentices,
  SheetApprenticeRow,
  SPREADSHEET_TITLE
} from '../services/googleSheetsService';
import { getAccessToken, googleSignIn } from '../services/googleAuth';
import { SyncStatus } from '../hooks/useAutoDriveSync';

interface InstructorDashboardProps {
  onSwitchToLearner: () => void;
  onOpenDriveModal: () => void;
  syncStatus: SyncStatus;
  sheetLink: string | null;
  lastSyncedAt: string | null;
  onForceSync: () => void;
  currentProfile: ApprenticeProfile;
}

// Sample initial cohort records to showcase the tracking capabilities immediately
const SAMPLE_COHORT: SheetApprenticeRow[] = [
  {
    rowNumber: 2,
    timestamp: '21/10/2026, 08:30:15',
    fullName: 'Alba Rocío Pedrozo Arrieta',
    documentType: 'Cédula de Ciudadanía',
    documentNumber: '1.045.789.412',
    email: 'alba.pedrozo@misena.edu.co',
    studyProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    fichaNumber: '2874910',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Tecnologías de la Información y las Comunicaciones',
    levelXp: 'Nivel 5 (1,250 XP)',
    completedModules: '5 de 5',
    progressPercent: '100%',
    examScore: '92%',
    certifiedStatus: 'Certificado Aprobado',
    certificateCode: 'SENA-IND-2026-F2874910-8914',
    reglamentoVigente: 'Acuerdo 0009 de 2024'
  },
  {
    rowNumber: 3,
    timestamp: '21/10/2026, 09:12:44',
    fullName: 'Carlos Eduardo Mendoza Ortiz',
    documentType: 'Cédula de Ciudadanía',
    documentNumber: '1.098.452.311',
    email: 'cmendoza@misena.edu.co',
    studyProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    fichaNumber: '2874910',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Tecnologías de la Información y las Comunicaciones',
    levelXp: 'Nivel 4 (820 XP)',
    completedModules: '4 de 5',
    progressPercent: '80%',
    examScore: 'Pendiente',
    certifiedStatus: 'En Inducción',
    certificateCode: 'Pendiente',
    reglamentoVigente: 'Acuerdo 0009 de 2024'
  },
  {
    rowNumber: 4,
    timestamp: '21/10/2026, 09:45:02',
    fullName: 'Valentina Restrepo Hincapié',
    documentType: 'Tarjeta de Identidad',
    documentNumber: '1.036.782.990',
    email: 'vrestrepo@misena.edu.co',
    studyProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    fichaNumber: '2874910',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Tecnologías de la Información y las Comunicaciones',
    levelXp: 'Nivel 5 (1,100 XP)',
    completedModules: '5 de 5',
    progressPercent: '100%',
    examScore: '88%',
    certifiedStatus: 'Certificado Aprobado',
    certificateCode: 'SENA-IND-2026-F2874910-4421',
    reglamentoVigente: 'Acuerdo 0009 de 2024'
  },
  {
    rowNumber: 5,
    timestamp: '21/10/2026, 10:20:19',
    fullName: 'Julián David Morales Beltrán',
    documentType: 'Cédula de Ciudadanía',
    documentNumber: '1.014.223.890',
    email: 'jmorales@misena.edu.co',
    studyProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    fichaNumber: '2874910',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Tecnologías de la Información y las Comunicaciones',
    levelXp: 'Nivel 2 (340 XP)',
    completedModules: '2 de 5',
    progressPercent: '40%',
    examScore: 'Pendiente',
    certifiedStatus: 'En Inducción',
    certificateCode: 'Pendiente',
    reglamentoVigente: 'Acuerdo 0009 de 2024'
  },
  {
    rowNumber: 6,
    timestamp: '21/10/2026, 11:05:30',
    fullName: 'Diana Marcela Torres Vargas',
    documentType: 'Cédula de Ciudadanía',
    documentNumber: '1.020.334.551',
    email: 'dtorres@misena.edu.co',
    studyProgram: 'Gestión de Redes de Datos',
    fichaNumber: '2901452',
    regional: 'Regional Distrito Capital',
    trainingCenter: 'Centro de Tecnologías de la Información y las Comunicaciones',
    levelXp: 'Nivel 5 (1,320 XP)',
    completedModules: '5 de 5',
    progressPercent: '100%',
    examScore: '96%',
    certifiedStatus: 'Certificado Aprobado',
    certificateCode: 'SENA-IND-2026-F2901452-9011',
    reglamentoVigente: 'Acuerdo 0009 de 2024'
  }
];

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  onSwitchToLearner,
  onOpenDriveModal,
  syncStatus,
  sheetLink,
  lastSyncedAt,
  onForceSync,
  currentProfile
}) => {
  const [records, setRecords] = useState<SheetApprenticeRow[]>(SAMPLE_COHORT);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'certificados' | 'en_proceso'>('todos');
  const [selectedFicha, setSelectedFicha] = useState(currentProfile.fichaNumber || '2874910');
  const [selectedProgram, setSelectedProgram] = useState(currentProfile.studyProgram || 'Tecnología en Análisis y Desarrollo de Software (ADSO)');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedCertCode, setCopiedCertCode] = useState<string | null>(null);

  // Load records from Google Sheets if connected
  const refreshRecordsFromSheet = async () => {
    try {
      setIsLoadingRecords(true);
      const token = await getAccessToken();
      const saved = getSavedSpreadsheetInfo();
      if (token && saved?.id) {
        const liveRows = await getRegisteredApprentices(token, saved.id);
        if (liveRows && liveRows.length > 0) {
          setRecords(liveRows);
        }
      }
    } catch (err) {
      console.warn('Could not fetch live rows, maintaining current records view:', err);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  useEffect(() => {
    refreshRecordsFromSheet();
  }, [sheetLink]);

  // Generate public apprentice induction URL
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const apprenticeShareUrl = `${baseUrl}?role=aprendiz&ficha=${encodeURIComponent(selectedFicha)}`;

  const handleCopyDirectLink = () => {
    navigator.clipboard?.writeText(apprenticeShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyInvitationMessage = () => {
    const message = `👋 Estimados Aprendices SENA:
Les doy la bienvenida a su proceso de Formación Profesional Integral.

Para realizar la Inducción Oficial al Reglamento del Aprendiz (Acuerdo 0009 de 2024) correspondiente a la Ficha: ${selectedFicha} - ${selectedProgram}, ingresen al siguiente enlace interactivo:

🔗 ${apprenticeShareUrl}

📌 Paso a paso para completar la inducción:
1. Revisa los 5 Módulos interactivos (Derechos, Deberes, Prohibiciones, Medidas Preventivas y Debido Proceso).
2. Resuelve los casos prácticos en el Simulador de Toma de Decisiones.
3. Aprueba el Examen Final con 80% o más para generar tu Certificado Oficial de Inducción con código de verificación institucional.

Éxitos en su proceso formativo.
— Instructor Líder de Ficha SENA`;

    navigator.clipboard?.writeText(message);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCertCode(code);
    setTimeout(() => setCopiedCertCode(null), 2000);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Fecha',
      'Aprendiz',
      'Documento',
      'Programa',
      'Ficha',
      'Regional',
      'Progreso',
      'Módulos',
      'Nota Examen',
      'Estado',
      'Código Certificado'
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.timestamp}"`,
      `"${r.fullName}"`,
      `"${r.documentType} ${r.documentNumber}"`,
      `"${r.studyProgram}"`,
      `"${r.fichaNumber}"`,
      `"${r.regional}"`,
      `"${r.progressPercent}"`,
      `"${r.completedModules}"`,
      `"${r.examScore}"`,
      `"${r.certifiedStatus}"`,
      `"${r.certificateCode}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Seguimiento_Induccion_Ficha_${selectedFicha}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.documentNumber.includes(searchQuery) ||
      r.fichaNumber.includes(searchQuery) ||
      r.studyProgram.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'certificados') {
      return r.certifiedStatus.toLowerCase().includes('certificado');
    }
    if (statusFilter === 'en_proceso') {
      return !r.certifiedStatus.toLowerCase().includes('certificado');
    }
    return true;
  });

  // KPI Calculations
  const totalStudents = records.length;
  const certifiedCount = records.filter((r) => r.certifiedStatus.toLowerCase().includes('certificado')).length;
  const inProgressCount = totalStudents - certifiedCount;
  const certificationRate = totalStudents > 0 ? Math.round((certifiedCount / totalStudents) * 100) : 0;

  // Average exam score for completed exams
  const validScores = records
    .map((r) => parseInt(r.examScore.replace(/\D/g, ''), 10))
    .filter((n) => !isNaN(n));
  const avgScore = validScores.length > 0 ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Instructor Header Banner */}
      <div className="bg-gradient-to-r from-[#00324D] via-[#00486e] to-[#00324D] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#39A900]/20 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39A900]/20 border border-[#39A900]/40 text-[#4ade80] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Panel Exclusivo del Instructor · Módulo Protegido</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Gestión y Seguimiento de Inducción SENA
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Monitorea en tiempo real el avance de tus aprendices en el <strong>Reglamento del Aprendiz (Acuerdo 0009 de 2024)</strong>, administra la sincronización con Google Drive y comparte el enlace de acceso directo a la cohorte.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onSwitchToLearner}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="Previsualizar la plataforma tal como la ven los aprendices"
            >
              <Eye className="w-4 h-4 text-[#4ade80]" />
              <span>Ver como Aprendiz</span>
            </button>

            <button
              onClick={onOpenDriveModal}
              className="px-4 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2e8500] text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Configuración Google Drive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Aprendices</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {totalStudents}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">registrados</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Cohorte activa en la plataforma
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Certificados</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {certifiedCount}
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              ({certificationRate}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Aprobaron examen con ≥80%
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">En Inducción</span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
              {inProgressCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">pendientes</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Completando módulos y casos
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Promedio Examen</span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
              {avgScore}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">general</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Rendimiento del Acuerdo 009
          </p>
        </div>
      </div>

      {/* Row with 2 Essential Tool Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Link Generator & Share Tools (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#39A900]/10 text-[#39A900] flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Compartir Plataforma con Aprendices
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Genera el enlace directo para que los aprendices ingresen sin ver opciones de administración
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
              Modo Aprendiz Activo en Enlace
            </span>
          </div>

          {/* Form to tweak Ficha and Program */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Número de Ficha
              </label>
              <input
                type="text"
                value={selectedFicha}
                onChange={(e) => setSelectedFicha(e.target.value)}
                placeholder="Ej. 2874910"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Programa de Formación
              </label>
              <input
                type="text"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                placeholder="Ej. Tecnología en ADSO"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          {/* URL Box */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Enlace Directo para Aprendices:</span>
            </span>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 break-all">
              <span className="flex-1 truncate">{apprenticeShareUrl}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleCopyDirectLink}
              className="px-4 py-2.5 rounded-lg bg-[#39A900] hover:bg-[#2e8500] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace Directo'}</span>
            </button>

            <button
              onClick={handleCopyInvitationMessage}
              className="px-4 py-2.5 rounded-lg bg-[#00324D] hover:bg-[#00486e] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              title="Copiar texto listo para WhatsApp, Territorium o correo"
            >
              {copiedMessage ? <Check className="w-4 h-4 text-[#4ade80]" /> : <Send className="w-4 h-4" />}
              <span>{copiedMessage ? '¡Mensaje Copiado!' : 'Copiar Mensaje WhatsApp / Correo'}</span>
            </button>

            <button
              onClick={onSwitchToLearner}
              className="px-3.5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Comprobar la vista que verán los aprendices"
            >
              <Eye className="w-4 h-4" />
              <span>Probar Vista</span>
            </button>
          </div>
        </div>

        {/* Right: Google Drive & Sheets Integration Card (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <FileSpreadsheet className="w-4 h-4 text-[#39A900]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Sincronización Google Drive
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Almacenamiento oficial de calificaciones y certificados
                  </p>
                </div>
              </div>

              {/* Status Pill */}
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                  syncStatus === 'synced'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : syncStatus === 'syncing'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                {syncStatus === 'synced' ? '● Sincronizado' : syncStatus === 'syncing' ? '↻ Sincronizando...' : 'Conectado'}
              </span>
            </div>

            {/* Info details */}
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Hoja Maestra:</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]" title={SPREADSHEET_TITLE}>
                  {SPREADSHEET_TITLE}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Cuenta Autorizada:</span>
                <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  albapedrozoarrieta@gmail.com
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Última Sincronización:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {lastSyncedAt || 'Hoy, sincronizado'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {sheetLink ? (
              <a
                href={sheetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Abrir Hoja de Cálculo en Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={onOpenDriveModal}
                className="w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Crear / Vincular Hoja en Google Drive</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={onForceSync}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sincronizar Ahora</span>
              </button>

              <button
                onClick={onOpenDriveModal}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Gestionar Registros</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Tracking Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#39A900]" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Matriz de Seguimiento y Calificaciones de la Ficha
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Datos consolidados en Google Sheets con registro de notas, avance y certificados emitidos
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, documento o ficha..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 text-xs bg-slate-50 dark:bg-slate-800">
              <button
                onClick={() => setStatusFilter('todos')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  statusFilter === 'todos'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todos ({records.length})
              </button>
              <button
                onClick={() => setStatusFilter('certificados')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  statusFilter === 'certificados'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Certificados ({certifiedCount})
              </button>
              <button
                onClick={() => setStatusFilter('en_proceso')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  statusFilter === 'en_proceso'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                En Inducción ({inProgressCount})
              </button>
            </div>

            {/* CSV & Print Buttons */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Descargar listado en formato Excel / CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Imprimir informe oficial de la ficha"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={refreshRecordsFromSheet}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-colors cursor-pointer"
              title="Actualizar datos desde Google Sheets"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRecords ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Aprendiz</th>
                <th className="px-4 py-3">Ficha y Programa</th>
                <th className="px-4 py-3">Avance</th>
                <th className="px-4 py-3">Módulos</th>
                <th className="px-4 py-3">Examen Final</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Código Certificado</th>
                <th className="px-4 py-3">Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r, index) => {
                  const isPassed = r.certifiedStatus.toLowerCase().includes('certificado');
                  const numericProgress = parseInt(r.progressPercent.replace(/\D/g, ''), 10) || 0;

                  return (
                    <tr key={index} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#00324D] dark:bg-[#39A900] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {r.fullName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block">
                              {r.fullName}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                              {r.documentType}: {r.documentNumber}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                          Ficha {r.fichaNumber}
                        </span>
                        <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px] mt-0.5" title={r.studyProgram}>
                          {r.studyProgram}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-28 space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                            <span>{r.progressPercent}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                numericProgress >= 100
                                  ? 'bg-[#39A900]'
                                  : numericProgress >= 50
                                  ? 'bg-blue-500'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${Math.min(100, numericProgress)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                        {r.completedModules}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                            isPassed
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {r.examScore}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            isPassed
                              ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                              : 'bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />}
                          <span>{isPassed ? 'Certificado' : 'En Inducción'}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px]">
                        {r.certificateCode && r.certificateCode !== 'Pendiente' ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] truncate max-w-[130px]" title={r.certificateCode}>
                              {r.certificateCode}
                            </span>
                            <button
                              onClick={() => handleCopyCode(r.certificateCode)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                              title="Copiar código de verificación"
                            >
                              {copiedCertCode === r.certificateCode ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-[10px]">Sin emisión</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[10px]">
                        {r.timestamp.split(',')[0]}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-medium">No se encontraron aprendices con el filtro actual.</p>
                    <p className="text-[11px] mt-1">Prueba cambiando la búsqueda o el filtro de estado.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <span>
            Mostrando <strong>{filteredRecords.length}</strong> de <strong>{records.length}</strong> aprendices registrados en la hoja oficial.
          </span>
          <span className="text-[11px]">
            Normativa aplicable: <strong>SENA Acuerdo 0009 de 2024</strong> (Vigente)
          </span>
        </div>
      </div>
    </div>
  );
};
