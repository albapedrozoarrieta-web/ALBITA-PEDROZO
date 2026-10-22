import React from 'react';
import { ApprenticeProfile, UserRole } from '../types/induction';
import {
  Award,
  BookOpen,
  ShieldAlert,
  FileCheck,
  Search,
  Moon,
  Sun,
  GraduationCap,
  ShieldCheck,
  Eye,
  Lock,
  LogOut,
  Globe,
  Languages
} from 'lucide-react';
import { DriveSyncStatusPill } from './DriveSyncStatusPill';
import { SyncStatus } from '../hooks/useAutoDriveSync';
import { AppLanguage, TRANSLATIONS } from '../i18n/translations';

const SENA_LOGO_SVG = `data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e`;

export type ActiveTab = 'instructor' | 'modulos' | 'casos' | 'examen' | 'certificado' | 'glosario' | 'traductor';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profile: ApprenticeProfile;
  xp: number;
  level: number;
  isCertified: boolean;
  onOpenProfile: () => void;
  onOpenDriveSync: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  syncStatus?: SyncStatus;
  lastSyncedAt?: string | null;
  sheetLink?: string | null;
  onConnectGoogle?: () => void;
  onForceSync?: () => void;
  currentRole: UserRole;
  onToggleRole: () => void;
  onExitToLanding: () => void;
  language: AppLanguage;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  xp,
  level,
  isCertified,
  onOpenProfile,
  onOpenDriveSync,
  isDarkMode,
  onToggleDarkMode,
  syncStatus,
  lastSyncedAt,
  sheetLink,
  onConnectGoogle,
  onForceSync,
  currentRole,
  onToggleRole,
  onExitToLanding,
  language,
  onToggleLanguage
}) => {
  const t = TRANSLATIONS[language].nav;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6 min-h-[5rem] py-2 sm:h-20">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab(currentRole === 'instructor' ? 'instructor' : 'modulos')}
            className="flex items-center gap-3.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-[68px] h-[68px] rounded-xl bg-white dark:bg-slate-800 p-1.5 flex items-center justify-center border border-slate-200/80 dark:border-slate-700 shadow-sm shrink-0 transition-transform group-hover:scale-105">
              <img
                src={SENA_LOGO_SVG}
                alt="Logo Oficial SENA"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors whitespace-nowrap block">
                {t.brandTitle}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                {t.brandSubtitle}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            {/* Instructor Dashboard Tab (Only visible in instructor mode) */}
            {currentRole === 'instructor' && (
              <button
                onClick={() => setActiveTab('instructor')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                  activeTab === 'instructor'
                    ? 'text-[#39A900] dark:text-[#4ade80] font-bold border-b-2 border-[#39A900]'
                    : 'hover:text-slate-900 dark:hover:text-white font-semibold'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#39A900]" />
                <span>{t.instructorPanel}</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('modulos')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'modulos'
                  ? 'text-[#39A900] dark:text-[#4ade80] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.modules}</span>
            </button>

            <button
              onClick={() => setActiveTab('casos')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'casos'
                  ? 'text-[#39A900] dark:text-[#4ade80] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t.simulator}</span>
            </button>

            <button
              onClick={() => setActiveTab('examen')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'examen'
                  ? 'text-[#39A900] dark:text-[#4ade80] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{t.exam}</span>
            </button>

            <button
              onClick={() => setActiveTab('certificado')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'certificado'
                  ? 'text-[#39A900] dark:text-[#4ade80] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{t.certificate} {isCertified ? '✓' : ''}</span>
            </button>

            <button
              onClick={() => setActiveTab('glosario')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'glosario'
                  ? 'text-[#39A900] dark:text-[#4ade80] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t.glossary}</span>
            </button>

            {/* Bilingual Writing & Translation Tab */}
            <button
              onClick={() => setActiveTab('traductor')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'traductor'
                  ? 'text-[#39A900] dark:text-[#4ade80] font-semibold border-b-2 border-[#39A900]'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Languages className="w-4 h-4 text-[#39A900]" />
              <span>{t.translator}</span>
            </button>
          </nav>

          {/* Zone 3: Action Area */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Live Auto-Sync Status Pill for Google Drive - STRICTLY FOR INSTRUCTOR */}
            {currentRole === 'instructor' && (
              <DriveSyncStatusPill
                status={syncStatus || 'not_connected'}
                lastSyncedAt={lastSyncedAt || null}
                sheetLink={sheetLink || null}
                onConnectGoogle={onConnectGoogle || onOpenDriveSync}
                onOpenFullModal={onOpenDriveSync}
                onForceSync={onForceSync || onOpenDriveSync}
              />
            )}

            {/* Role Badge Indicator */}
            {currentRole === 'instructor' ? (
              <button
                onClick={onToggleRole}
                className="px-2.5 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title={t.previewLearner}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
                <span className="hidden sm:inline">{t.activeInstructor}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">{t.previewLearner}</span>
              </button>
            ) : (
              <button
                onClick={onToggleRole}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#00324D] dark:hover:border-blue-500/60 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#00324D] dark:hover:text-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title={t.accessInstructor}
              >
                <Lock className="w-3 h-3 text-amber-500" />
                <span>{t.activeLearner}</span>
                <span className="text-[10px] text-[#00324D] dark:text-blue-400 font-normal hidden sm:inline">{t.accessInstructor}</span>
              </button>
            )}

            {/* LANGUAGE SWITCHER BUTTON (ES ⇄ EN) */}
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#39A900] dark:hover:border-[#39A900] bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50/50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title={t.changeLanguageTooltip}
              aria-label={t.changeLanguageTooltip}
            >
              <Globe className="w-3.5 h-3.5 text-[#39A900]" />
              <span className="font-extrabold text-[#00732F] dark:text-[#4ade80]">{language.toUpperCase()}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">| {language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            {/* Exit / Change Role to Landing Page Button */}
            <button
              onClick={onExitToLanding}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              title={t.exitRoles}
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">{t.exitRoles}</span>
            </button>

            {/* Top Right Dark Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-amber-300 transition-all focus:outline-none focus:ring-2 focus:ring-[#39A900] relative group cursor-pointer"
              aria-label={t.toggleThemeTooltip}
              title={t.toggleThemeTooltip}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-90" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12 text-slate-700" />
              )}
            </button>

            {/* Apprentice Profile Card */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all text-left cursor-pointer"
              title={t.viewProfileTooltip}
            >
              <div className="w-7 h-7 rounded-full bg-[#00324D] dark:bg-[#39A900] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {profile.fullName.charAt(0)}
              </div>
              <div className="hidden sm:block text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate max-w-[120px]">
                  {profile.fullName.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 tabular-nums">
                  Ficha {profile.fichaNumber}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden items-center justify-between overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 gap-4 scrollbar-none">
          {currentRole === 'instructor' && (
            <button
              onClick={() => setActiveTab('instructor')}
              className={`whitespace-nowrap flex items-center gap-1 ${activeTab === 'instructor' ? 'text-[#39A900] font-bold' : ''}`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.instructorPanel}</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('modulos')}
            className={`whitespace-nowrap ${activeTab === 'modulos' ? 'text-[#39A900] font-bold' : ''}`}
          >
            {t.modules}
          </button>
          <button
            onClick={() => setActiveTab('casos')}
            className={`whitespace-nowrap ${activeTab === 'casos' ? 'text-[#39A900] font-bold' : ''}`}
          >
            {t.simulator}
          </button>
          <button
            onClick={() => setActiveTab('examen')}
            className={`whitespace-nowrap ${activeTab === 'examen' ? 'text-[#39A900] font-bold' : ''}`}
          >
            {t.exam}
          </button>
          <button
            onClick={() => setActiveTab('certificado')}
            className={`whitespace-nowrap ${activeTab === 'certificado' ? 'text-[#39A900] font-bold' : ''}`}
          >
            {t.certificate}
          </button>
          <button
            onClick={() => setActiveTab('glosario')}
            className={`whitespace-nowrap ${activeTab === 'glosario' ? 'text-[#39A900] font-bold' : ''}`}
          >
            {t.glossary}
          </button>
          <button
            onClick={() => setActiveTab('traductor')}
            className={`whitespace-nowrap ${activeTab === 'traductor' ? 'text-[#39A900] font-bold' : ''}`}
          >
            {t.translator}
          </button>
        </div>
      </div>
    </header>
  );
};
