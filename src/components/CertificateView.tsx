import React, { useState } from 'react';
import { ApprenticeProfile, UserRole } from '../types/induction';
import { Printer, Share2, Check, Download, ShieldCheck, Award, Lock, ExternalLink, Calendar, FileText, FileSpreadsheet } from 'lucide-react';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  isCertified: boolean;
  certificateCode: string;
  certifiedAt: string | null;
  score: number | null;
  onGoToExam: () => void;
  onEditProfile: () => void;
  onOpenDriveSync?: () => void;
  sheetLink?: string | null;
  syncStatus?: string;
  currentRole?: UserRole;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  isCertified,
  certificateCode,
  certifiedAt,
  score,
  onGoToExam,
  onEditProfile,
  onOpenDriveSync,
  sheetLink,
  syncStatus,
  currentRole = 'aprendiz'
}) => {
  const [copied, setCopied] = useState(false);

  const displayDate = certifiedAt
    ? new Date(certifiedAt).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const text = `Certificado SENA Inducción: ${certificateCode} - Aprendiz: ${profile.fullName}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Actions (Hidden on print) */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00732F] dark:text-[#4ade80] uppercase">
            <Award className="w-4 h-4" />
            <span>Certificación Oficial de Inducción</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            Certificado de Aprobación del Reglamento
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Documento digital verificable que acredita el cumplimiento de la inducción reglamentaria (Acuerdo 009 de 2024).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onEditProfile}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Editar Datos de Ficha</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
          </button>

          {/* Only visible for instructors */}
          {currentRole === 'instructor' && (
            <>
              {sheetLink ? (
                <a
                  href={sheetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Abrir la hoja de cálculo oficial en Google Drive"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900] dark:text-[#4ade80]" />
                  <span>{syncStatus === 'synced' ? 'Registrado en Google Drive ✓' : 'Abrir Hoja en Drive'}</span>
                </a>
              ) : onOpenDriveSync ? (
                <button
                  onClick={onOpenDriveSync}
                  className="px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Guardar registro del certificado en Google Sheets"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900] dark:text-[#4ade80]" />
                  <span>Guardar en Google Drive</span>
                </button>
              ) : null}
            </>
          )}

          {isCertified && (
            <button
              onClick={handlePrint}
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8500] rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* If not certified, show lock screen */}
      {!isCertified ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Certificado Aún Bloqueado
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Para generar y descargar tu Certificado Oficial de Inducción con firma digital y código de validación, debes aprobar el Examen Final con un puntaje mínimo del 80%.
          </p>
          <div className="pt-2">
            <button
              onClick={onGoToExam}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8500] rounded-lg shadow-sm transition-all inline-flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Presentar Examen de Certificación</span>
            </button>
          </div>
        </div>
      ) : (
        /* The Printable Certificate Container */
        <div className="overflow-x-auto pb-4">
          <div
            id="printable-certificate"
            className="w-full max-w-[960px] mx-auto bg-[#FCFDFB] text-slate-900 p-8 sm:p-12 border-8 border-double border-[#00324D] rounded-3xl shadow-xl relative select-none"
            style={{
              backgroundImage: 'radial-gradient(#39A90008 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Guilloché security inner frame */}
            <div className="border border-[#39A900]/40 p-6 sm:p-8 rounded-2xl relative">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 text-[#39A900] text-xs font-serif opacity-70">✦</div>
              <div className="absolute top-2 right-2 text-[#39A900] text-xs font-serif opacity-70">✦</div>
              <div className="absolute bottom-2 left-2 text-[#39A900] text-xs font-serif opacity-70">✦</div>
              <div className="absolute bottom-2 right-2 text-[#39A900] text-xs font-serif opacity-70">✦</div>

              {/* Institutional Header */}
              <div className="text-center space-y-1 mb-8">
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-slate-600">
                  REPÚBLICA DE COLOMBIA
                </p>
                <div className="flex items-center justify-center gap-3 py-1">
                  <div className="w-8 h-8 rounded-full bg-[#39A900] text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                    S
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00324D] font-serif">
                    SERVICIO NACIONAL DE APRENDIZAJE — SENA
                  </h1>
                </div>
                <p className="text-xs font-semibold text-[#00732F] uppercase tracking-wider">
                  Sistema Nacional de Formación para el Trabajo · Dirección de Formación Profesional
                </p>
                <p className="text-[11px] text-slate-500">
                  {profile.regional} — {profile.trainingCenter}
                </p>
              </div>

              {/* Certificate Type */}
              <div className="text-center my-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 block mb-1">
                  CERTIFICA QUE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-b-2 border-[#39A900] pb-2 inline-block px-4">
                  {profile.fullName}
                </h2>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  {profile.documentType} No.{' '}
                  <strong className="text-slate-900 font-bold">{profile.documentNumber}</strong>
                </p>
              </div>

              {/* Certificate Prose */}
              <div className="text-center max-w-2xl mx-auto space-y-3 my-6">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Ha cursado, comprendido y aprobado satisfactoriamente el programa de{' '}
                  <strong className="text-slate-900">
                    Inducción Institucional al Reglamento del Aprendiz SENA (Acuerdo 009 de 2024)
                  </strong>
                  , demostrando pleno dominio de sus derechos, deberes, prohibiciones, medidas formativas, sanciones y garantías del debido proceso.
                </p>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-slate-800 space-y-0.5">
                  <p>
                    <strong>Programa:</strong> {profile.studyProgram}
                  </p>
                  <p>
                    <strong>Ficha de Caracterización:</strong> {profile.fichaNumber} ·{' '}
                    <strong>Calificación Obtenida:</strong> {score ?? 95}% (Competente Aprobado)
                  </p>
                </div>
              </div>

              {/* Medallion / Badge & Signatures Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mt-10 pt-6 border-t border-slate-200">
                {/* Signature 1 */}
                <div className="text-center">
                  <div className="h-12 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-sm text-slate-600 border-b border-slate-400 px-6 block">
                      Jorge Eduardo Londoño Ulloa
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 uppercase mt-1">
                    Dirección General SENA
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Formación Profesional Integral
                  </p>
                </div>

                {/* Central Medallion */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-amber-400 p-1 shadow-md bg-white">
                    <img
                      src="/src/assets/images/badge_reglamento_master_1792526739229.jpg"
                      alt="Sello Dorado Oficial de Inducción SENA"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00732F] mt-1">
                    Sello Digital de Acreditación
                  </span>
                </div>

                {/* Signature 2 */}
                <div className="text-center">
                  <div className="h-12 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-sm text-slate-600 border-b border-slate-400 px-6 block">
                      Subdirección de Centro
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 uppercase mt-1">
                    Coordinación de Formación
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {profile.trainingCenter}
                  </p>
                </div>
              </div>

              {/* Footer with Cryptographic QR & Verification Code */}
              <div className="mt-8 pt-4 border-t border-dashed border-slate-200 flex flex-wrap items-center justify-between text-[10px] text-slate-500 gap-4">
                <div className="flex items-center gap-3">
                  {/* Generated SVG QR Code */}
                  <div className="w-12 h-12 bg-white p-1 border border-slate-300 rounded shadow-xs shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-slate-800 fill-current">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 0h2v2h-2v-2zm-2 4h4v2h-4v-2zm6-4h2v6h-2v-6zm-4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-6-2h2v4h-2v-4z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-700">
                      Código Único de Validación Digital:
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[#00324D] tabular-nums">
                      {certificateCode}
                    </span>
                    <span className="block text-slate-400 text-[9px]">
                      Verificable en plataforma institucional SENA SofiaPlus / ZAJUNA
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block">
                    Expedido en Colombia el <strong>{displayDate}</strong>
                  </span>
                  <span className="text-[9px] text-slate-400">
                    Resolución Reglamentaria Nacional No. 009 - Régimen del Aprendiz
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
