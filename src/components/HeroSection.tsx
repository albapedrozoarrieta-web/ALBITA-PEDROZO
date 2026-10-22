import React from 'react';
import { ApprenticeProfile, UserRole } from '../types/induction';
import { ArrowRight, BookOpen, ShieldCheck, Award, Sparkles, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { AppLanguage, TRANSLATIONS } from '../i18n/translations';

interface HeroSectionProps {
  profile: ApprenticeProfile;
  progressPercent: number;
  xp: number;
  level: number;
  isCertified: boolean;
  onStartLearning: () => void;
  onOpenSimulator: () => void;
  onViewCertificate: () => void;
  onOpenDriveSync?: () => void;
  sheetLink?: string | null;
  syncStatus?: string;
  currentRole?: UserRole;
  language?: AppLanguage;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  progressPercent,
  xp,
  level,
  isCertified,
  onStartLearning,
  onOpenSimulator,
  onViewCertificate,
  onOpenDriveSync,
  sheetLink,
  syncStatus,
  currentRole = 'aprendiz',
  language = 'es'
}) => {
  const t = TRANSLATIONS[language].hero;
  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-5">
            {/* Unboxed natural kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00732F] dark:text-[#4ade80] tracking-wide uppercase">
              <span>{t.kickerSena}</span>
              <span aria-hidden="true">·</span>
              <span>{t.kickerAcuerdo}</span>
              <span aria-hidden="true">·</span>
              <span>{t.kickerFpi}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight text-balance">
              {t.title}
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.welcomePrefix} <strong className="text-slate-900 dark:text-white">{profile.fullName}</strong>. {t.welcomeBody}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartLearning}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8500] rounded-lg shadow-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>{t.btnModules}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSimulator}
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>{t.btnSimulator}</span>
              </button>

              {/* Only visible for instructors */}
              {currentRole === 'instructor' && (
                <>
                  {sheetLink ? (
                    <a
                      href={sheetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                      title="Abrir la hoja de cálculo en Google Drive"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-[#39A900] dark:text-[#4ade80]" />
                      <span>
                        {syncStatus === 'synced' ? 'Ver en Google Drive ✓' : 'Abrir Hoja en Drive'}
                      </span>
                    </a>
                  ) : onOpenDriveSync ? (
                    <button
                      onClick={onOpenDriveSync}
                      className="px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-[#39A900] dark:text-[#4ade80]" />
                      <span>Activar Auto-guardado en Drive</span>
                    </button>
                  ) : null}
                </>
              )}

              {isCertified && (
                <button
                  onClick={onViewCertificate}
                  className="px-4 py-2.5 text-sm font-semibold text-[#00324D] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Award className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
                  <span>Ver Certificado Oficial</span>
                </button>
              )}
            </div>

            {/* Inline metadata note */}
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#4ade80] shrink-0" />
              <span>
                Programa: <span className="font-medium text-slate-700 dark:text-slate-200">{profile.studyProgram}</span> (Ficha {profile.fichaNumber})
              </span>
            </div>
          </div>

          {/* Right Column: Institutional Campus Media Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md group">
              <img
                src="/src/assets/images/hero_sena_induction_1792526740476.jpg"
                alt="Ambiente de formación tecnológica SENA con aprendices en talleres y laboratorios"
                className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  Centro de Formación Integral
                </span>
                <h3 className="text-lg font-bold leading-snug">
                  Ética, Innovación y Disciplina Técnica
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  {profile.trainingCenter} — {profile.regional}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Progress & KPI Row below hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Avance de Inducción</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">completado</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#39A900] dark:bg-[#4ade80] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Rango y Récord</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                Nivel {level}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">de 5</span>
            </div>
            <p className="text-[11px] text-[#39A900] dark:text-[#4ade80] font-medium mt-1 truncate">
              {level >= 5
                ? 'Maestro del Reglamento'
                : level >= 4
                ? 'Aprendiz Líder'
                : level >= 3
                ? 'Promotor de Convivencia'
                : level >= 2
                ? 'En Formación Activa'
                : 'Aspirante Inicial'}
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Experiencia Ganada</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#00732F] dark:text-[#4ade80] tabular-nums">
                {xp}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">XP acumulados</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Gana XP completando módulos y casos</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Estado de Certificación</span>
            <div className="flex items-baseline gap-2">
              <span className={`text-base font-bold ${isCertified ? 'text-[#39A900] dark:text-[#4ade80]' : 'text-amber-700 dark:text-amber-400'}`}>
                {isCertified ? 'Aprobado y Certificado' : 'Pendiente Examen'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isCertified ? 'Certificado con código seguro listo' : 'Completa los 5 módulos para desbloquear'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
