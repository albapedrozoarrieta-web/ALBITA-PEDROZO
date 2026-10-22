export type DocumentType = 'Cédula de Ciudadanía' | 'Tarjeta de Identidad' | 'Cédula de Extranjería' | 'Permiso por Protección Temporal (PPT)';

export interface ApprenticeProfile {
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  studyProgram: string;
  fichaNumber: string;
  regional: string;
  trainingCenter: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  articleRef: string;
}

export interface LessonContent {
  id: string;
  title: string;
  durationMinutes: number;
  articleReference: string;
  summary: string;
  keyPoints: string[];
  practicalCase: {
    situation: string;
    analysis: string;
    keyLearning: string;
  };
}

export interface InductionModule {
  id: string;
  moduleNumber: number;
  title: string;
  shortDescription: string;
  category: 'Institucional' | 'Derechos' | 'Deberes' | 'Prohibiciones' | 'Debido Proceso';
  estimatedMinutes: number;
  xpReward: number;
  lessons: LessonContent[];
  quiz: QuizQuestion[];
}

export interface CaseOption {
  id: string;
  text: string;
  isCorrect: boolean;
  consequenceTitle: string;
  consequenceDescription: string;
  articleRef: string;
  xpEarned: number;
}

export interface CaseSimulation {
  id: string;
  caseNumber: number;
  title: string;
  category: string;
  badgeAwardedId: string;
  scenario: string;
  apprenticeRole: string;
  dilemma: string;
  options: CaseOption[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  xpBonus: number;
}

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  regulationChapter: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  completedLessons: string[];
  completedModules: string[];
  quizScores: Record<string, number>;
  caseDecisions: Record<string, string>;
  unlockedBadges: string[];
  finalExamScore: number | null;
  certificateCode: string;
  certifiedAt: string | null;
}

export type UserRole = 'instructor' | 'aprendiz';

export interface InstructorProfile {
  name: string;
  email: string;
  regional: string;
  trainingCenter: string;
  assignedFichas: string[];
}

