import React from 'react';
import { Badge } from '../types/induction';
import { Award, Compass, ShieldCheck, CheckCircle2, Scale, GraduationCap, Lock, Sparkles } from 'lucide-react';

interface BadgesGridProps {
  badges: Badge[];
  unlockedBadgeIds: string[];
}

export const BadgesGrid: React.FC<BadgesGridProps> = ({ badges, unlockedBadgeIds }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6" />;
      case 'Scale':
        return <Scale className="w-6 h-6" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00732F] dark:text-[#4ade80] uppercase">
            <Sparkles className="w-4 h-4 text-[#39A900] dark:text-[#4ade80]" />
            <span>Sistema de Reconocimiento y Gamificación</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Insignias de Logro del Aprendiz
          </h3>
        </div>
        <span className="text-xs font-bold text-[#00732F] dark:text-[#4ade80] tabular-nums">
          {unlockedBadgeIds.length} de {badges.length} desbloqueadas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                isUnlocked
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60 text-slate-900 dark:text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-65'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  isUnlocked
                    ? 'bg-[#39A900] text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {isUnlocked ? getIcon(badge.iconName) : <Lock className="w-5 h-5" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {badge.title}
                  </h4>
                  <span className="text-[10px] font-bold text-[#00732F] dark:text-[#4ade80] tabular-nums">
                    +{badge.xpBonus} XP
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                  {badge.description}
                </p>
                <div className="text-[10px] font-semibold mt-2">
                  {isUnlocked ? (
                    <span className="text-[#00732F] dark:text-[#4ade80] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 inline" /> Desbloqueada
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500">Bloqueada</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
