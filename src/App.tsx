/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, UserProgress, UserRole } from './types/induction';
import {
  INDUCTION_MODULES,
  CASE_SIMULATIONS,
  FINAL_EXAM_QUESTIONS,
  BADGES,
  GLOSSARY,
  DEFAULT_APPRENTICE
} from './data/inductionData';
import { Navbar, ActiveTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModuleViewer } from './components/ModuleViewer';
import { CaseSimulator } from './components/CaseSimulator';
import { FinalExam } from './components/FinalExam';
import { CertificateView } from './components/CertificateView';
import { RegulationSearch } from './components/RegulationSearch';
import { BadgesGrid } from './components/BadgesGrid';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { GoogleDriveSyncModal } from './components/GoogleDriveSyncModal';
import { InstructorDashboard } from './components/InstructorDashboard';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { LanguageWritingTool } from './components/LanguageWritingTool';
import { useAutoDriveSync } from './hooks/useAutoDriveSync';
import { AppLanguage, TRANSLATIONS } from './i18n/translations';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle, X } from 'lucide-react';

const INITIAL_PROGRESS: UserProgress = {
  xp: 320,
  level: 2,
  completedLessons: ['les-1-1', 'les-1-2', 'les-2-1'],
  completedModules: ['mod-1-identidad'],
  quizScores: { 'mod-1-identidad': 100 },
  caseDecisions: { 'caso-1-plagio': 'c1-opt-b' },
  unlockedBadges: ['badge-identidad', 'badge-integridad'],
  finalExamScore: null,
  certificateCode: 'SENA-IND-2026-F2874910-8914',
  certifiedAt: null
};

export default function App() {
  // Session state: when false, the user is presented with the Role Selection Landing Page
  const [isSessionActive, setIsSessionActive] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        // If explicitly requested to select role via query
        if (params.get('portal') === 'true') {
          return false;
        }
      }
      return sessionStorage.getItem('sena_session_active') === 'true';
    } catch {
      return false;
    }
  });

  // Determine role: prioritize URL parameter ?role=aprendiz or ?role=instructor, then localStorage
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const roleParam = params.get('role');
        if (roleParam === 'aprendiz') return 'aprendiz';
        if (roleParam === 'instructor') return 'instructor';
      }
      const saved = localStorage.getItem('sena_user_role');
      if (saved === 'aprendiz' || saved === 'instructor') return saved;
      return 'instructor';
    } catch {
      return 'instructor';
    }
  });

  // Load saved state or default
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentice_profile');
      const baseProfile = saved ? JSON.parse(saved) : DEFAULT_APPRENTICE;
      return baseProfile;
    } catch {
      return DEFAULT_APPRENTICE;
    }
  });

  // Check URL parameters for pre-filling ficha number for apprentices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const fichaParam = params.get('ficha');
      if (fichaParam && fichaParam.trim() !== '') {
        setProfile((prev) => ({
          ...prev,
          fichaNumber: fichaParam.trim()
        }));
      }
    }
  }, []);

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentice_progress');
      return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  // Active tab management: starts in 'instructor' if instructor, or 'modulos' if aprendiz
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('role') === 'aprendiz') return 'modulos';
      if (params.get('role') === 'instructor') return 'instructor';
    }
    try {
      const savedRole = localStorage.getItem('sena_user_role');
      return savedRole === 'aprendiz' ? 'modulos' : 'instructor';
    } catch {
      return 'instructor';
    }
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDriveSyncModalOpen, setIsDriveSyncModalOpen] = useState(false);
  const [isInstructorAuthModalOpen, setIsInstructorAuthModalOpen] = useState(false);
  const [instructorKeyInput, setInstructorKeyInput] = useState('');
  const [instructorKeyError, setInstructorKeyError] = useState<string | null>(null);
  const [showInstructorKeyModalPassword, setShowInstructorKeyModalPassword] = useState(false);

  // Automated background Google Drive & Sheets Sync
  const {
    status: syncStatus,
    lastSyncedAt,
    sheetLink,
    triggerSync,
    connectGoogle
  } = useAutoDriveSync(profile, progress);

  // Dark mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sena_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Language state with persistence (Spanish default, switchable to English)
  const [language, setLanguage] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('sena_language');
      return saved === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sena_language', language);
    } catch {
      // ignore
    }
  }, [language]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  // Screen blur transition state
  const [isScreenBlurring, setIsScreenBlurring] = useState<boolean>(false);

  // Sync dark class on <html> document element and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('sena_dark_mode', String(isDarkMode));
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  // Sync role to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_user_role', userRole);
    } catch {
      // ignore
    }
  }, [userRole]);

  const handleToggleDarkMode = () => {
    setIsScreenBlurring(true);
    setIsDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsScreenBlurring(false);
    }, 650);
  };

  const handleToggleRole = () => {
    if (userRole === 'instructor') {
      // Instructor previewing apprentice view directly
      setUserRole('aprendiz');
      if (activeTab === 'instructor') {
        setActiveTab('modulos');
      }
    } else {
      // Entering instructor mode requires password Sena1234
      setInstructorKeyInput('');
      setInstructorKeyError(null);
      setShowInstructorKeyModalPassword(false);
      setIsInstructorAuthModalOpen(true);
    }
  };

  // Submit handler for in-app instructor authentication modal
  const handleVerifyInstructorModalKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructorKeyInput.trim()) {
      setInstructorKeyError('Por favor ingresa la clave de instructor.');
      return;
    }
    if (instructorKeyInput.trim() !== 'Sena1234') {
      setInstructorKeyError('Clave incorrecta. Por favor verifica e ingresa la clave de instructor.');
      return;
    }
    setInstructorKeyError(null);
    setInstructorKeyInput('');
    setIsInstructorAuthModalOpen(false);
    setUserRole('instructor');
    setActiveTab('instructor');
  };

  // Exit back to Role Selection Landing Page
  const handleExitToLanding = () => {
    setIsSessionActive(false);
    try {
      sessionStorage.removeItem('sena_session_active');
    } catch {
      // ignore
    }
  };

  // Login handler from RoleSelectionLanding for INSTRUCTOR (direct access without key)
  const handleSelectInstructor = () => {
    setUserRole('instructor');
    setActiveTab('instructor');
    setIsSessionActive(true);
    try {
      sessionStorage.setItem('sena_session_active', 'true');
      localStorage.setItem('sena_user_role', 'instructor');
    } catch {
      // ignore
    }
  };

  // Login handler from RoleSelectionLanding for APRENDIZ (after filling characterization form without key)
  const handleSelectAprendiz = (newProfile: ApprenticeProfile) => {
    setProfile(newProfile);
    setUserRole('aprendiz');
    setActiveTab('modulos');
    setIsSessionActive(true);
    try {
      sessionStorage.setItem('sena_session_active', 'true');
      localStorage.setItem('sena_user_role', 'aprendiz');
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(newProfile));
    } catch {
      // ignore
    }
  };

  // Sync profile & progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentice_progress', JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Calculate overall percentage of induction
  const totalLessons = INDUCTION_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const lessonsCompletedCount = progress.completedLessons.length;
  const casesCompletedCount = Object.keys(progress.caseDecisions).length;
  const examPassed = (progress.finalExamScore ?? 0) >= 80;

  // Weighted progress calculation: 50% lessons + 25% cases + 25% exam
  const calculatedPercent = Math.min(
    100,
    Math.round(
      (lessonsCompletedCount / totalLessons) * 50 +
        (casesCompletedCount / CASE_SIMULATIONS.length) * 25 +
        (examPassed ? 25 : 0)
    )
  );

  // Helper to recalculate level based on XP
  const calculateLevel = (currentXp: number): number => {
    if (currentXp >= 1000) return 5;
    if (currentXp >= 700) return 4;
    if (currentXp >= 400) return 3;
    if (currentXp >= 200) return 2;
    return 1;
  };

  // Handler: Lesson completion
  const handleCompleteLesson = (lessonId: string, moduleId: string, xpEarned: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const newLessons = [...prev.completedLessons, lessonId];
      const newXp = prev.xp + xpEarned;
      const newLevel = calculateLevel(newXp);

      const currentMod = INDUCTION_MODULES.find((m) => m.id === moduleId);
      let newCompletedMods = prev.completedModules;
      if (currentMod && currentMod.lessons.every((l) => newLessons.includes(l.id))) {
        if (!newCompletedMods.includes(moduleId)) {
          newCompletedMods = [...newCompletedMods, moduleId];
        }
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedLessons: newLessons,
        completedModules: newCompletedMods
      };
    });
  };

  // Handler: Module quiz completion
  const handleCompleteQuiz = (moduleId: string, score: number, xpEarned: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + xpEarned;
      const newScores = { ...prev.quizScores, [moduleId]: score };

      const newBadges = [...prev.unlockedBadges];
      if (moduleId === 'mod-2-derechos' && !newBadges.includes('badge-derechos')) {
        newBadges.push('badge-derechos');
      }
      if (moduleId === 'mod-3-deberes' && !newBadges.includes('badge-garante')) {
        newBadges.push('badge-garante');
      }
      if (moduleId === 'mod-5-debido-proceso' && !newBadges.includes('badge-debido-proceso')) {
        newBadges.push('badge-debido-proceso');
      }

      let newCompletedMods = prev.completedModules;
      if (!newCompletedMods.includes(moduleId)) {
        newCompletedMods = [...newCompletedMods, moduleId];
      }

      return {
        ...prev,
        xp: newXp,
        level: calculateLevel(newXp),
        quizScores: newScores,
        completedModules: newCompletedMods,
        unlockedBadges: newBadges
      };
    });
  };

  // Handler: Case decision
  const handleSolveCase = (
    caseId: string,
    optionId: string,
    isCorrect: boolean,
    xpEarned: number,
    badgeAwardedId: string
  ) => {
    setProgress((prev) => {
      const newXp = prev.xp + xpEarned;
      const newDecisions = { ...prev.caseDecisions, [caseId]: optionId };
      const newBadges = [...prev.unlockedBadges];

      if (isCorrect && badgeAwardedId && !newBadges.includes(badgeAwardedId)) {
        newBadges.push(badgeAwardedId);
      }

      return {
        ...prev,
        xp: newXp,
        level: calculateLevel(newXp),
        caseDecisions: newDecisions,
        unlockedBadges: newBadges
      };
    });
  };

  // Handler: Pass Final Exam
  const handlePassExam = (score: number) => {
    const timestamp = new Date().toISOString();
    const cleanFicha = profile.fichaNumber.replace(/\D/g, '') || '2874910';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCode = `SENA-IND-2026-F${cleanFicha}-${randomSuffix}`;

    setProgress((prev) => {
      const newXp = prev.xp + 300;
      const newBadges = [...prev.unlockedBadges];
      if (!newBadges.includes('badge-certificado')) {
        newBadges.push('badge-certificado');
      }

      return {
        ...prev,
        xp: newXp,
        level: 5,
        finalExamScore: score,
        certificateCode: prev.certificateCode || newCode,
        certifiedAt: prev.certifiedAt || timestamp,
        unlockedBadges: newBadges
      };
    });
  };

  const isCertified = (progress.finalExamScore ?? 0) >= 80;

  // Determine initial role preference from URL parameter if present
  const urlRoleParam = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('role') as 'instructor' | 'aprendiz') || undefined
    : undefined;

  // IF NO ACTIVE SESSION: RENDER ROLE SELECTION LANDING PAGE
  if (!isSessionActive) {
    return (
      <div className={`min-h-screen relative ${isDarkMode ? 'dark' : ''}`}>
        {isScreenBlurring && (
          <div
            className="fixed inset-0 z-50 pointer-events-none backdrop-blur-xl bg-slate-950/25 animate-blur-flash"
            aria-hidden="true"
          />
        )}
        <RoleSelectionLanding
          onSelectInstructor={handleSelectInstructor}
          onSelectAprendiz={handleSelectAprendiz}
          initialProfile={profile}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          initialRolePreference={urlRoleParam}
          language={language}
          onToggleLanguage={handleToggleLanguage}
        />
      </div>
    );
  }

  // IF ACTIVE SESSION: RENDER THE PROTOTYPE WITH ROLE RESTRICTIONS
  return (
    <div className={`min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative ${isDarkMode ? 'dark' : ''}`}>
      {/* Full-screen Blur Effect when switching theme or applying dark mode */}
      {isScreenBlurring && (
        <div
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-xl bg-slate-950/25 animate-blur-flash"
          aria-hidden="true"
        />
      )}

      {/* Ambient subtle blur glow orbs in dark mode */}
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#39A900]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#00324D]/25 rounded-full blur-3xl" />
        </div>
      )}

      {/* Top Navigation Bar with Role Differentiation and Exit to Landing button */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        xp={progress.xp}
        level={progress.level}
        isCertified={isCertified}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenDriveSync={() => {
          if (userRole === 'instructor') {
            setIsDriveSyncModalOpen(true);
          }
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        syncStatus={syncStatus}
        lastSyncedAt={lastSyncedAt}
        sheetLink={sheetLink}
        onConnectGoogle={connectGoogle}
        onForceSync={() => triggerSync(true)}
        currentRole={userRole}
        onToggleRole={handleToggleRole}
        onExitToLanding={handleExitToLanding}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* VIEW 1: Dedicated Instructor Dashboard (Only rendered when in instructor role & activeTab is instructor) */}
        {userRole === 'instructor' && activeTab === 'instructor' && (
          <InstructorDashboard
            onSwitchToLearner={() => {
              setUserRole('aprendiz');
              setActiveTab('modulos');
            }}
            onOpenDriveModal={() => setIsDriveSyncModalOpen(true)}
            syncStatus={syncStatus}
            sheetLink={sheetLink}
            lastSyncedAt={lastSyncedAt}
            onForceSync={() => triggerSync(true)}
            currentProfile={profile}
          />
        )}

        {/* Hero Section shown on main modules tab */}
        {activeTab === 'modulos' && (
          <HeroSection
            profile={profile}
            progressPercent={calculatedPercent}
            xp={progress.xp}
            level={progress.level}
            isCertified={isCertified}
            onStartLearning={() => {
              const el = document.getElementById('modulos-container');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenSimulator={() => setActiveTab('casos')}
            onViewCertificate={() => setActiveTab('certificado')}
            onOpenDriveSync={() => {
              if (userRole === 'instructor') {
                setIsDriveSyncModalOpen(true);
              }
            }}
            sheetLink={sheetLink}
            syncStatus={syncStatus}
            currentRole={userRole}
            language={language}
          />
        )}

        {/* Tab 1: Módulos de Aprendizaje */}
        {activeTab === 'modulos' && (
          <div id="modulos-container">
            <ModuleViewer
              modules={INDUCTION_MODULES}
              completedLessons={progress.completedLessons}
              completedModules={progress.completedModules}
              quizScores={progress.quizScores}
              onCompleteLesson={handleCompleteLesson}
              onCompleteQuiz={handleCompleteQuiz}
              onGoToCases={() => setActiveTab('casos')}
            />

            {/* Badges showcase below modules */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <BadgesGrid
                badges={BADGES}
                unlockedBadgeIds={progress.unlockedBadges}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Simulador de Casos */}
        {activeTab === 'casos' && (
          <CaseSimulator
            cases={CASE_SIMULATIONS}
            caseDecisions={progress.caseDecisions}
            onSolveCase={handleSolveCase}
            onGoToExam={() => setActiveTab('examen')}
          />
        )}

        {/* Tab 3: Examen Final de Certificación */}
        {activeTab === 'examen' && (
          <FinalExam
            questions={FINAL_EXAM_QUESTIONS}
            previousScore={progress.finalExamScore}
            onPassExam={handlePassExam}
            onViewCertificate={() => setActiveTab('certificado')}
            onReviewModules={() => setActiveTab('modulos')}
          />
        )}

        {/* Tab 4: Certificado Oficial */}
        {activeTab === 'certificado' && (
          <CertificateView
            profile={profile}
            isCertified={isCertified}
            certificateCode={progress.certificateCode}
            certifiedAt={progress.certifiedAt}
            score={progress.finalExamScore}
            onGoToExam={() => setActiveTab('examen')}
            onEditProfile={() => setIsProfileModalOpen(true)}
            onOpenDriveSync={() => {
              if (userRole === 'instructor') {
                setIsDriveSyncModalOpen(true);
              }
            }}
            sheetLink={sheetLink}
            syncStatus={syncStatus}
            currentRole={userRole}
          />
        )}

        {/* Tab 5: Glosario y Consultorio */}
        {activeTab === 'glosario' && (
          <RegulationSearch glossary={GLOSSARY} />
        )}

        {/* Tab 6: Herramienta de Escritura y Traductor (Inglés a Español) */}
        {activeTab === 'traductor' && (
          <LanguageWritingTool
            currentLanguage={language}
            onToggleLanguage={handleToggleLanguage}
          />
        )}
      </main>

      {/* Profile Modal for Apprentice */}
      <ApprenticeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={(updated) => setProfile(updated)}
        xp={progress.xp}
        level={progress.level}
        unlockedBadgesCount={progress.unlockedBadges.length}
        totalBadgesCount={BADGES.length}
        isCertified={isCertified}
      />

      {/* Google Drive / Google Sheets Synchronization Modal (Instructor only) */}
      {userRole === 'instructor' && (
        <GoogleDriveSyncModal
          isOpen={isDriveSyncModalOpen}
          onClose={() => setIsDriveSyncModalOpen(false)}
          profile={profile}
          progress={progress}
        />
      )}

      {/* In-App Instructor Authentication Modal (requires Sena1234) */}
      {isInstructorAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl max-w-md w-full relative">
            <button
              onClick={() => {
                setIsInstructorAuthModalOpen(false);
                setInstructorKeyError(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00324D]/10 text-[#00324D] dark:text-blue-400 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#00324D] dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Acceso al Módulo de Instructor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ingresa la clave para desbloquear privilegios docentes
                </p>
              </div>
            </div>

            {instructorKeyError && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{instructorKeyError}</span>
              </div>
            )}

            <form onSubmit={handleVerifyInstructorModalKey} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <KeyRound className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Seguridad del Sistema SENA</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ingresa la clave institucional asignada para desbloquear las funciones de administración.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Clave del Instructor *
                </label>
                <div className="relative">
                  <input
                    type={showInstructorKeyModalPassword ? 'text' : 'password'}
                    autoFocus
                    required
                    value={instructorKeyInput}
                    onChange={(e) => setInstructorKeyInput(e.target.value)}
                    placeholder="Ingresa tu clave de acceso"
                    className="w-full px-3 py-2.5 pr-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D] dark:focus:ring-blue-500 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowInstructorKeyModalPassword(!showInstructorKeyModalPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    title={showInstructorKeyModalPassword ? 'Ocultar' : 'Mostrar'}
                  >
                    {showInstructorKeyModalPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsInstructorAuthModalOpen(false);
                    setInstructorKeyError(null);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-lg bg-[#00324D] hover:bg-[#00486e] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Validar Clave</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Institutional Footer (hidden on print) */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-8 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-[#39A900] text-white font-bold flex items-center justify-center text-xs">
                S
              </div>
              <span>
                {language === 'es'
                  ? 'Servicio Nacional de Aprendizaje — SENA · Inducción Virtual al Reglamento del Aprendiz'
                  : 'National Training Service — SENA · Virtual Induction to Apprentice Regulations'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <span className="px-2 py-0.5 rounded font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {userRole === 'instructor'
                  ? (language === 'es' ? 'Perfil Activo: Instructor SENA (Privilegiado)' : 'Active Profile: SENA Instructor (Privileged)')
                  : (language === 'es' ? 'Perfil Activo: Aprendiz (Inducción)' : 'Active Profile: Apprentice (Induction)')}
              </span>
              <button
                onClick={handleExitToLanding}
                className="text-[#39A900] dark:text-[#4ade80] hover:underline cursor-pointer font-semibold"
              >
                {language === 'es' ? 'Cambiar de Rol / Salir al Portal' : 'Change Role / Exit to Portal'}
              </button>
              <span aria-hidden="true">·</span>
              <span>{language === 'es' ? 'Acuerdo 009 de 2024' : 'Agreement 009 of 2024'}</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'es' ? 'Línea Gratuita Nacional 01 8000 910270' : 'National Toll-Free Line 01 8000 910270'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
