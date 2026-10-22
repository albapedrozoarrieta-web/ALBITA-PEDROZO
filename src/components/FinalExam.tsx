import React, { useState } from 'react';
import { QuizQuestion } from '../types/induction';
import { FileCheck, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalExamProps {
  questions: QuizQuestion[];
  previousScore: number | null;
  onPassExam: (score: number) => void;
  onViewCertificate: () => void;
  onReviewModules: () => void;
}

export const FinalExam: React.FC<FinalExamProps> = ({
  questions,
  previousScore,
  onPassExam,
  onViewCertificate,
  onReviewModules
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number | null>(previousScore);

  const handleSelect = (questionId: string, optionIdx: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: optionIdx });
  };

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === questions.length;

  const handleSubmitExam = () => {
    if (!isAllAnswered) return;

    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const scorePercent = Math.round((correct / questions.length) * 100);
    setCurrentScore(scorePercent);
    setSubmitted(true);

    if (scorePercent >= 80) {
      onPassExam(scorePercent);
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setAnswers({});
    setCurrentScore(null);
  };

  const isPassed = (currentScore ?? 0) >= 80;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Exam Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00732F] dark:text-[#4ade80] uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Evaluación Integradora de Inducción</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Examen Oficial del Reglamento del Aprendiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Completa las 10 preguntas evaluativas. Se requiere una calificación mínima del{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">80%</strong> para habilitar la
              expedición de tu Certificado Oficial de Inducción SENA.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Progreso del Examen</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
              {answeredCount} / {questions.length}
            </span>
          </div>
        </div>

        {/* Status Callout if already submitted */}
        {submitted && currentScore !== null && (
          <div
            className={`mt-6 p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isPassed
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  isPassed ? 'bg-[#39A900] text-white' : 'bg-amber-500 text-white'
                }`}
              >
                {isPassed ? <Award className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {isPassed ? '¡Felicitaciones! Has Aprobado la Inducción' : 'Puntaje Insuficiente'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Calificación obtenida:{' '}
                  <strong className="font-bold tabular-nums text-slate-900 dark:text-white">{currentScore}%</strong> (Mínimo
                  requerido: 80%).{' '}
                  {isPassed
                    ? 'Tu certificado oficial ha sido emitido con firma y código verificable.'
                    : 'Puedes revisar las explicaciones detalladas abajo y volver a intentarlo.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {isPassed ? (
                <button
                  onClick={onViewCertificate}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#00732F] hover:bg-[#005a24] rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Ver Mi Certificado</span>
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reintentar Examen</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const selectedIdx = answers[q.id];
          const isSelected = selectedIdx !== undefined;
          const isCorrect = selectedIdx === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {q.question}
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                    Fundamento normativo: {q.articleRef}
                  </span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pl-0 sm:pl-10">
                {q.options.map((opt, oIdx) => {
                  const optIsSelected = selectedIdx === oIdx;
                  let style = 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200';

                  if (submitted) {
                    if (oIdx === q.correctIndex) {
                      style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500';
                    } else if (optIsSelected) {
                      style = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                    } else {
                      style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 opacity-60';
                    }
                  } else if (optIsSelected) {
                    style = 'border-[#39A900] bg-emerald-50/60 dark:bg-emerald-950/30 text-slate-900 dark:text-white font-semibold ring-1 ring-[#39A900]';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-xs opacity-75">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{opt}</span>
                      </div>
                      {submitted && oIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation after submit */}
              {submitted && (
                <div
                  className={`mt-2 p-3.5 rounded-lg text-xs leading-relaxed ml-0 sm:ml-10 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800'
                  }`}
                >
                  <p className="font-semibold mb-0.5">
                    {isCorrect ? '✓ Respuesta correcta' : '✗ Respuesta incorrecta'}
                  </p>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm rounded-xl flex flex-wrap items-center justify-between gap-4 sticky bottom-4 z-20">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 block">
            {submitted
              ? `Examen completado con resultado: ${currentScore}%`
              : `${answeredCount} de ${questions.length} preguntas contestadas`}
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {isAllAnswered || submitted ? 'Listo para certificar' : 'Responde todas las preguntas para enviar'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {submitted ? (
            <>
              <button
                onClick={handleRetry}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Volver a Presentar
              </button>
              {isPassed ? (
                <button
                  onClick={onViewCertificate}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8500] rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Ver y Descargar Certificado</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onReviewModules}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 rounded-lg transition-all"
                >
                  Repasar Módulos de Aprendizaje
                </button>
              )}
            </>
          ) : (
            <button
              disabled={!isAllAnswered}
              onClick={handleSubmitExam}
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#39A900] hover:bg-[#2e8500] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <span>Finalizar y Calificar Examen</span>
              <FileCheck className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
