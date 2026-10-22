import React, { useState } from 'react';
import { CaseSimulation, CaseOption } from '../types/induction';
import { ShieldAlert, AlertTriangle, CheckCircle2, Award, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CaseSimulatorProps {
  cases: CaseSimulation[];
  caseDecisions: Record<string, string>;
  onSolveCase: (caseId: string, optionId: string, isCorrect: boolean, xpEarned: number, badgeAwardedId: string) => void;
  onGoToExam: () => void;
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  cases,
  caseDecisions,
  onSolveCase,
  onGoToExam
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const currentCase = cases[activeCaseIndex];
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    caseDecisions[currentCase.id] || null
  );
  const [confirmed, setConfirmed] = useState<boolean>(Boolean(caseDecisions[currentCase.id]));

  const currentOption = currentCase.options.find((o) => o.id === (selectedOptionId || caseDecisions[currentCase.id]));

  const handleSelect = (optionId: string) => {
    if (confirmed) return;
    setSelectedOptionId(optionId);
  };

  const handleConfirmDecision = () => {
    if (!selectedOptionId || !currentCase) return;
    const option = currentCase.options.find((o) => o.id === selectedOptionId);
    if (!option) return;

    setConfirmed(true);
    onSolveCase(
      currentCase.id,
      selectedOptionId,
      option.isCorrect,
      option.xpEarned,
      currentCase.badgeAwardedId
    );

    if (option.isCorrect) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleNextCase = () => {
    if (activeCaseIndex < cases.length - 1) {
      const nextIdx = activeCaseIndex + 1;
      setActiveCaseIndex(nextIdx);
      const nextCase = cases[nextIdx];
      setSelectedOptionId(caseDecisions[nextCase.id] || null);
      setConfirmed(Boolean(caseDecisions[nextCase.id]));
    } else {
      onGoToExam();
    }
  };

  const handleResetCurrentCase = () => {
    setConfirmed(false);
    setSelectedOptionId(null);
  };

  const solvedCount = Object.keys(caseDecisions).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00732F] dark:text-[#4ade80] uppercase tracking-wide">
            <span>Simulador de Toma de Decisiones</span>
            <span aria-hidden="true">·</span>
            <span>Casos Éticos y Disciplinarios</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Dilemas Reales del Aprendiz SENA
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pon a prueba tu criterio frente a situaciones auténticas en talleres, aulas y empresas patrocinadoras.
          </p>
        </div>

        {/* Progress counter */}
        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400 block">Casos Resueltos</span>
          <span className="text-lg font-bold text-[#39A900] dark:text-[#4ade80] tabular-nums">
            {solvedCount} / {cases.length}
          </span>
        </div>
      </div>

      {/* Case Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {cases.map((c, i) => {
          const isDecided = Boolean(caseDecisions[c.id]);
          const isActive = i === activeCaseIndex;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(i);
                setSelectedOptionId(caseDecisions[c.id] || null);
                setConfirmed(Boolean(caseDecisions[c.id]));
              }}
              className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-slate-900 dark:bg-slate-700 text-white border-slate-900 dark:border-slate-600 shadow-sm'
                  : isDecided
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] opacity-75">CASO 0{c.caseNumber}</span>
                {isDecided && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              </div>
              <p className="truncate">{c.title}</p>
            </button>
          );
        })}
      </div>

      {/* Main Dilemma Stage Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Banner with scenario context */}
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00732F] dark:text-[#4ade80] uppercase mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Escenario #{currentCase.caseNumber}: {currentCase.category}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {currentCase.title}
          </h3>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            {currentCase.scenario}
          </p>

          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <span className="text-slate-500 dark:text-slate-400">Tu Rol:</span>
            <strong className="text-slate-900 dark:text-white font-semibold">{currentCase.apprenticeRole}</strong>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-slate-500 dark:text-slate-400">Dilema:</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">{currentCase.dilemma}</span>
          </div>
        </div>

        {/* Options Selection */}
        <div className="p-6 sm:p-8 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            ¿Qué acción decides tomar según el Reglamento del Aprendiz?
          </h4>

          <div className="space-y-3">
            {currentCase.options.map((opt, optIndex) => {
              const isSelected = selectedOptionId === opt.id;
              let optionStyle = 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/50 dark:hover:bg-slate-800';

              if (confirmed) {
                if (opt.isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-1 ring-emerald-500 text-emerald-950 dark:text-emerald-200';
                } else if (isSelected) {
                  optionStyle = 'border-rose-400 bg-rose-50/60 dark:bg-rose-950/40 ring-1 ring-rose-400 text-rose-950 dark:text-rose-200';
                } else {
                  optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 opacity-50 text-slate-400';
                }
              } else if (isSelected) {
                optionStyle = 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/40 ring-2 ring-[#39A900] shadow-sm';
              }

              return (
                <button
                  key={opt.id}
                  disabled={confirmed}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${optionStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#39A900] text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                      {opt.text}
                    </p>
                  </div>
                  {confirmed && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result / Consequence Box */}
          {confirmed && currentOption && (
            <div
              className={`p-5 rounded-xl border mt-5 animate-in fade-in duration-300 ${
                currentOption.isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {currentOption.isCorrect ? (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>{currentOption.consequenceTitle} (+{currentOption.xpEarned} XP)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span>{currentOption.consequenceTitle} (+{currentOption.xpEarned} XP)</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-3 text-slate-700 dark:text-slate-300">
                {currentOption.consequenceDescription}
              </p>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span>Fundamento legal:</span>
                <span className="underline">{currentOption.articleRef}</span>
              </div>
            </div>
          )}

          {/* Bottom Action bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {confirmed
                ? 'Decisión asentada en tu historial'
                : selectedOptionId
                ? 'Opción seleccionada. Pulsa Confirmar Decisión'
                : 'Selecciona una alternativa para continuar'}
            </span>

            <div className="flex items-center gap-3">
              {confirmed ? (
                <>
                  <button
                    onClick={handleResetCurrentCase}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Modificar Decisión</span>
                  </button>
                  <button
                    onClick={handleNextCase}
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 rounded-lg shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>
                      {activeCaseIndex < cases.length - 1
                        ? 'Siguiente Caso'
                        : 'Completar Simulador e ir al Examen'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  disabled={!selectedOptionId}
                  onClick={handleConfirmDecision}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8500] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Confirmar Decisión</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
