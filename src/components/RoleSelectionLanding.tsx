import React, { useState } from 'react';
import { ApprenticeProfile, DocumentType } from '../types/induction';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Sun,
  Moon,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { AppLanguage, TRANSLATIONS } from '../i18n/translations';

const SENA_LOGO_SVG = `data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e`;

const DOCUMENT_TYPES: DocumentType[] = [
  'Cédula de Ciudadanía',
  'Tarjeta de Identidad',
  'Cédula de Extranjería',
  'Permiso por Protección Temporal (PPT)'
];

interface RoleSelectionLandingProps {
  onSelectInstructor: () => void;
  onSelectAprendiz: (profile: ApprenticeProfile) => void;
  initialProfile: ApprenticeProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  initialRolePreference?: 'instructor' | 'aprendiz';
  language?: AppLanguage;
  onToggleLanguage?: () => void;
}

export const RoleSelectionLanding: React.FC<RoleSelectionLandingProps> = ({
  onSelectInstructor,
  onSelectAprendiz,
  initialProfile,
  isDarkMode,
  onToggleDarkMode,
  initialRolePreference,
  language = 'es',
  onToggleLanguage
}) => {
  const t = TRANSLATIONS[language].landing;
  const [activeRoleView, setActiveRoleView] = useState<'selection' | 'instructor' | 'aprendiz'>(
    initialRolePreference === 'aprendiz'
      ? 'aprendiz'
      : initialRolePreference === 'instructor'
      ? 'instructor'
      : 'selection'
  );

  // Instructor Authentication State
  const [instructorKey, setInstructorKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [instructorError, setInstructorError] = useState<string | null>(null);

  // Apprentice Characterization Form State
  const [apprenticeForm, setApprenticeForm] = useState<ApprenticeProfile>({
    fullName: initialProfile.fullName || '',
    documentType: initialProfile.documentType || 'Cédula de Ciudadanía',
    documentNumber: initialProfile.documentNumber || '',
    studyProgram: initialProfile.studyProgram || 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    fichaNumber: initialProfile.fichaNumber || '2874910',
    regional: initialProfile.regional || 'Regional Distrito Capital',
    trainingCenter: initialProfile.trainingCenter || 'Centro de Tecnologías de la Información y las Comunicaciones'
  });

  const [formError, setFormError] = useState<string | null>(null);

  // Handler for Instructor authentication
  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructorKey.trim()) {
      setInstructorError('Por favor ingresa la clave de acceso de instructor.');
      return;
    }
    // Validation for instructed key: Sena1234
    if (instructorKey.trim() !== 'Sena1234') {
      setInstructorError('Clave incorrecta. Por favor verifica e ingresa la clave asignada de instructor.');
      return;
    }

    setInstructorError(null);
    onSelectInstructor();
  };

  // Handler for Apprentice registration & entrance
  const handleApprenticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apprenticeForm.fullName.trim()) {
      setFormError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!apprenticeForm.documentNumber.trim()) {
      setFormError('Por favor ingresa tu número de documento.');
      return;
    }
    if (!apprenticeForm.fichaNumber.trim()) {
      setFormError('Por favor ingresa el número de ficha.');
      return;
    }

    setFormError(null);
    onSelectAprendiz(apprenticeForm);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Brand Bar */}
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
              <img src={SENA_LOGO_SVG} alt="SENA" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white block">
                SENA · Portal de Inducción Virtual
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Reglamento del Aprendiz — Acuerdo 0009 de 2024
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Language Switcher button */}
            {onToggleLanguage && (
              <button
                onClick={onToggleLanguage}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#39A900] dark:hover:border-[#39A900] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <Globe className="w-3.5 h-3.5 text-[#39A900]" />
                <span className="font-extrabold text-[#00732F] dark:text-[#4ade80]">{language.toUpperCase()}</span>
                <span className="text-[10px] text-slate-400 font-normal">| {language === 'es' ? 'EN' : 'ES'}</span>
              </button>
            )}

            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Area */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39A900]/10 border border-[#39A900]/30 text-[#00732F] dark:text-[#4ade80] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* TWO MAIN ROLES CARDS */}
          {activeRoleView === 'selection' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Card 1: INSTRUCTOR (PROTECTED WITH PASSWORD) */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-[#00324D] dark:hover:border-blue-500/50 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00324D]/10 dark:bg-blue-950/50 text-[#00324D] dark:text-blue-400 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#00324D] dark:text-blue-400 uppercase tracking-wider">
                        {t.instructorCard.badgeTag}
                      </span>
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>{t.instructorCard.protectedBadge}</span>
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {t.instructorCard.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {t.instructorCard.description}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>{t.instructorCard.perk1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>{t.instructorCard.perk2}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>{t.instructorCard.perk3}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => {
                      setInstructorError(null);
                      setInstructorKey('');
                      setActiveRoleView('instructor');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#00324D] hover:bg-[#00486e] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:scale-[1.01]"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>{t.instructorCard.button}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              {/* Card 2: APRENDIZ */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#39A900]/10 text-[#39A900] flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#39A900] uppercase tracking-wider">
                        {t.apprenticeCard.badgeTag}
                      </span>
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                        {t.apprenticeCard.freeBadge}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {t.apprenticeCard.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {t.apprenticeCard.description}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>{t.apprenticeCard.perk1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>{t.apprenticeCard.perk2}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                      <span>{t.apprenticeCard.perk3}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setActiveRoleView('aprendiz')}
                    className="w-full py-3 px-4 rounded-xl bg-[#39A900] hover:bg-[#2e8500] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:scale-[1.01]"
                  >
                    <User className="w-4 h-4" />
                    <span>{t.apprenticeCard.button}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: INSTRUCTOR AUTHENTICATION FORM */}
          {activeRoleView === 'instructor' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00324D]/10 text-[#00324D] dark:text-blue-400 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#00324D] dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {t.instructorAuth.title}
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {t.instructorAuth.subtitle}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveRoleView('selection');
                    setInstructorError(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium cursor-pointer"
                >
                  {t.instructorAuth.back}
                </button>
              </div>

              {instructorError && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{instructorError}</span>
                </div>
              )}

              <form onSubmit={handleInstructorSubmit} className="space-y-4 pt-5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                    <KeyRound className="w-4 h-4 text-[#39A900]" />
                    <span>{t.instructorAuth.noticeTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t.instructorAuth.noticeText}
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.instructorAuth.keyLabel}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoFocus
                      required
                      value={instructorKey}
                      onChange={(e) => setInstructorKey(e.target.value)}
                      placeholder={t.instructorAuth.keyPlaceholder}
                      className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D] dark:focus:ring-blue-500 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none cursor-pointer"
                      title={showPassword ? t.instructorAuth.hideKey : t.instructorAuth.showKey}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRoleView('selection');
                      setInstructorError(null);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {t.instructorAuth.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-2.5 px-5 rounded-lg bg-[#00324D] hover:bg-[#00486e] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t.instructorAuth.submit}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW: APPRENTICE CHARACTERIZATION FORM */}
          {activeRoleView === 'aprendiz' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md max-w-2xl mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#39A900]/10 text-[#39A900] flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {t.characterization.title}
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {t.characterization.subtitle}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveRoleView('selection');
                    setFormError(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium cursor-pointer"
                >
                  {t.characterization.back}
                </button>
              </div>

              {formError && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleApprenticeSubmit} className="space-y-4 pt-4 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.characterization.fullNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={apprenticeForm.fullName}
                    onChange={(e) => setApprenticeForm({ ...apprenticeForm, fullName: e.target.value })}
                    placeholder={t.characterization.fullNamePlaceholder}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>

                {/* Document Type & Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.characterization.docTypeLabel}
                    </label>
                    <select
                      value={apprenticeForm.documentType}
                      onChange={(e) => setApprenticeForm({ ...apprenticeForm, documentType: e.target.value as DocumentType })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                      {DOCUMENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.characterization.docNumberLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={apprenticeForm.documentNumber}
                      onChange={(e) => setApprenticeForm({ ...apprenticeForm, documentNumber: e.target.value })}
                      placeholder={t.characterization.docNumberPlaceholder}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>
                </div>

                {/* Ficha & Study Program */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.characterization.fichaLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={apprenticeForm.fichaNumber}
                      onChange={(e) => setApprenticeForm({ ...apprenticeForm, fichaNumber: e.target.value })}
                      placeholder={t.characterization.fichaPlaceholder}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.characterization.programLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={apprenticeForm.studyProgram}
                      onChange={(e) => setApprenticeForm({ ...apprenticeForm, studyProgram: e.target.value })}
                      placeholder={t.characterization.programPlaceholder}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>
                </div>

                {/* Regional & Training Center */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.characterization.regionalLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={apprenticeForm.regional}
                      onChange={(e) => setApprenticeForm({ ...apprenticeForm, regional: e.target.value })}
                      placeholder={t.characterization.regionalPlaceholder}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.characterization.centerLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={apprenticeForm.trainingCenter}
                      onChange={(e) => setApprenticeForm({ ...apprenticeForm, trainingCenter: e.target.value })}
                      placeholder={t.characterization.centerPlaceholder}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRoleView('selection');
                      setFormError(null);
                    }}
                    className="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {t.characterization.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-2.5 px-5 rounded-lg bg-[#39A900] hover:bg-[#2e8500] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>{t.characterization.submit}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};
