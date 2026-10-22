import React, { useState } from 'react';
import { InductionModule, LessonContent, QuizQuestion } from '../types/induction';
import { CheckCircle2, ChevronRight, Clock, BookOpen, AlertCircle, HelpCircle, Award, Sparkles, Shield, UserCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModuleViewerProps {
  modules: InductionModule[];
  completedLessons: string[];
  completedModules: string[];
  quizScores: Record<string, number>;
  onCompleteLesson: (lessonId: string, moduleId: string, xpEarned: number) => void;
  onCompleteQuiz: (moduleId: string, score: number, xpEarned: number) => void;
  onGoToCases: () => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  modules,
  completedLessons,
  completedModules,
  quizScores,
  onCompleteLesson,
  onCompleteQuiz,
  onGoToCases
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0].id);
  const activeModule = modules.find((m) => m.id === selectedModuleId) || modules[0];
  const [selectedLessonId, setSelectedLessonId] = useState<string>(activeModule.lessons[0].id);
  const activeLesson = activeModule.lessons.find((l) => l.id === selectedLessonId) || activeModule.lessons[0];

  // Quiz state for current module
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Switch module handler
  const handleSelectModule = (modId: string) => {
    setSelectedModuleId(modId);
    const targetMod = modules.find((m) => m.id === modId);
    if (targetMod && targetMod.lessons.length > 0) {
      setSelectedLessonId(targetMod.lessons[0].id);
    }
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const isCurrentLessonDone = completedLessons.includes(activeLesson.id);
  const isCurrentModuleDone = completedModules.includes(activeModule.id);

  const handleFinishLesson = () => {
    if (!isCurrentLessonDone) {
      onCompleteLesson(activeLesson.id, activeModule.id, 60);
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore
      }
    }
    // Check if next lesson exists
    const currentIndex = activeModule.lessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex < activeModule.lessons.length - 1) {
      setSelectedLessonId(activeModule.lessons[currentIndex + 1].id);
    } else {
      setShowQuiz(true);
    }
  };

  const handleSelectAnswer = (qId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [qId]: optionIndex });
  };

  const handleGradeQuiz = () => {
    let correctCount = 0;
    activeModule.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / activeModule.quiz.length) * 100);
    setQuizSubmitted(true);
    const xpBonus = scorePercent >= 70 ? 100 : 40;
    onCompleteQuiz(activeModule.id, scorePercent, xpBonus);

    if (scorePercent >= 70) {
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Module Selector Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Módulos del Reglamento del Aprendiz
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explora en profundidad los 5 núcleos temáticos del Acuerdo 009 de 2024
            </p>
          </div>
          <span className="text-xs font-semibold text-[#00732F] dark:text-[#4ade80] tabular-nums">
            {completedModules.length} de {modules.length} módulos superados
          </span>
        </div>

        {/* Horizontal module selection cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {modules.map((mod) => {
            const isCompleted = completedModules.includes(mod.id);
            const isSelected = mod.id === activeModule.id;
            return (
              <button
                key={mod.id}
                onClick={() => handleSelectModule(mod.id)}
                className={`text-left p-3.5 rounded-xl border transition-all relative ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800/90 border-[#39A900] dark:border-[#4ade80] shadow-sm ring-1 ring-[#39A900] dark:ring-[#4ade80]'
                    : isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 hover:border-emerald-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    MÓDULO {mod.moduleNumber}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#4ade80] shrink-0" />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium tabular-nums">
                      {mod.estimatedMinutes} min
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {mod.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {mod.shortDescription}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Learning Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lessons Index for Active Module */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-[#00732F] dark:text-[#4ade80] uppercase tracking-wide">
              {activeModule.category}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {activeModule.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {activeModule.shortDescription}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Contenido de Aprendizaje
            </span>

            {activeModule.lessons.map((lesson, idx) => {
              const isSelected = lesson.id === activeLesson.id && !showQuiz;
              const isLessonDone = completedLessons.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLessonId(lesson.id);
                    setShowQuiz(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#39A900] text-slate-900 dark:text-white font-medium'
                      : 'bg-white dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isLessonDone
                          ? 'bg-[#39A900] text-white'
                          : isSelected
                          ? 'bg-slate-900 dark:bg-slate-700 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {isLessonDone ? '✓' : idx + 1}
                    </div>
                    <div>
                      <span className="text-xs font-semibold block leading-tight">
                        {lesson.title}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block flex items-center gap-1">
                        <Clock className="w-3 h-3 inline" />
                        {lesson.durationMinutes} min de lectura
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                </button>
              );
            })}

            {/* Evaluation Quiz button in sidebar */}
            <button
              onClick={() => setShowQuiz(true)}
              className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between gap-2 mt-3 ${
                showQuiz
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#39A900] text-slate-900 dark:text-white'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#00732F] text-white text-[10px] font-bold flex items-center justify-center">
                  ?
                </div>
                <div>
                  <span className="text-xs font-bold block">
                    Evaluación Rápida del Módulo
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    {activeModule.quiz.length} preguntas · +{activeModule.xpReward} XP
                  </span>
                </div>
              </div>
              {quizScores[activeModule.id] !== undefined && (
                <span className="text-xs font-bold text-[#00732F] dark:text-[#4ade80] tabular-nums">
                  {quizScores[activeModule.id]}%
                </span>
              )}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Recompensa total del módulo: </span>
            <strong className="text-[#00732F] dark:text-[#4ade80] font-bold tabular-nums">
              +{activeModule.xpReward} XP
            </strong>
          </div>
        </div>

        {/* Right Column: Detailed Lesson Content OR Quiz */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {!showQuiz ? (
            <div className="space-y-6">
              {/* Lesson header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#00732F] dark:text-[#4ade80] mb-1">
                  <span>{activeLesson.articleReference}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{activeLesson.durationMinutes} minutos</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {activeLesson.title}
                </h3>
              </div>

              {/* Lesson Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Fundamento del Reglamento
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  {activeLesson.summary}
                </p>
              </div>

              {/* Key points bullet list */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Puntos Clave y Normatividad Aplicada
                </h4>
                <ul className="space-y-2.5">
                  {activeLesson.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#00732F] dark:text-[#4ade80] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✓
                      </div>
                      <span className="leading-normal">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Case Analysis */}
              <div className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl p-5 border border-emerald-200 dark:border-emerald-800/50">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#00732F] dark:text-[#4ade80] uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Caso Real en Ambientes SENA</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {activeLesson.practicalCase.situation}
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                  <strong className="text-slate-900 dark:text-white font-semibold">Análisis Reglamentario: </strong>
                  {activeLesson.practicalCase.analysis}
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-[#00732F] dark:text-[#4ade80] font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#39A900] dark:text-[#4ade80]" />
                  <span>
                    <strong>Aprendizaje para el aprendiz:</strong> {activeLesson.practicalCase.keyLearning}
                  </span>
                </div>
              </div>

              {/* Lesson Bottom Action */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {isCurrentLessonDone ? '✓ Lección completada (+60 XP otorgados)' : 'Lee el contenido y avanza'}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleFinishLesson}
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8500] rounded-lg shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>{isCurrentLessonDone ? 'Continuar Lección Siguiente' : 'Marcar Lección y Continuar'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Mode for the current module */
            <div className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#00732F] dark:text-[#4ade80] uppercase">
                    Comprobación de Competencia
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    Evaluación: {activeModule.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline"
                >
                  Volver a las lecciones
                </button>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {activeModule.quiz.map((q, qIndex) => {
                  const userAnswer = quizAnswers[q.id];
                  const hasAnswered = userAnswer !== undefined;
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {qIndex + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {q.question}
                          </h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                            Ref: {q.articleRef}
                          </span>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = userAnswer === optIdx;
                          let btnStyle = 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-900 dark:text-rose-200';
                            } else {
                              btnStyle = 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-[#39A900] text-slate-900 dark:text-white font-semibold ring-1 ring-[#39A900]';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback after submit */}
                      {quizSubmitted && (
                        <div
                          className={`p-3 rounded-lg text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                              : 'bg-amber-50 text-amber-900 border border-amber-200'
                          }`}
                        >
                          <strong>{isCorrect ? '¡Excelente!' : 'Atención reglamentaria:'}</strong>{' '}
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit or Retry Controls */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  {Object.keys(quizAnswers).length} de {activeModule.quiz.length} preguntas respondidas
                </span>

                <div className="flex items-center gap-3">
                  {quizSubmitted ? (
                    <>
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reintentar</span>
                      </button>
                      <button
                        onClick={onGoToCases}
                        className="px-5 py-2 text-xs font-semibold text-white bg-[#00732F] hover:bg-[#005a24] rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <span>Ir al Simulador de Casos</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleGradeQuiz}
                      disabled={Object.keys(quizAnswers).length < activeModule.quiz.length}
                      className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8500] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all"
                    >
                      Calificar Evaluación
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
