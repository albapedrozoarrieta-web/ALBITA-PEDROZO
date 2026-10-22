import React, { useState } from 'react';
import {
  Globe,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  Volume2,
  FileText,
  Send,
  Languages
} from 'lucide-react';
import { AppLanguage, TRANSLATIONS } from '../i18n/translations';

interface LanguageWritingToolProps {
  currentLanguage: AppLanguage;
  onToggleLanguage: () => void;
}

// Institutional dictionary for instant, offline, deterministic translations
const VOCABULARY_MAP: Record<string, string> = {
  // Key nouns & concepts
  'apprentice': 'aprendiz',
  'apprentices': 'aprendices',
  'instructor': 'instructor',
  'instructors': 'instructores',
  'regulations': 'reglamento',
  'regulation': 'reglamento',
  'rights': 'derechos',
  'right': 'derecho',
  'duties': 'deberes',
  'duty': 'deber',
  'due process': 'debido proceso',
  'induction': 'inducción',
  'training': 'formación',
  'vocational training': 'formación profesional integral',
  'certificate': 'certificado',
  'certification': 'certificación',
  'exam': 'examen',
  'evaluation committee': 'comité de evaluación y seguimiento',
  'improvement plan': 'plan de mejoramiento',
  'verbal warning': 'llamado de atención verbal',
  'written warning': 'llamado de atención escrito',
  'enrollment cancellation': 'cancelación de matrícula',
  'conditional enrollment': 'condicionamiento de matrícula',
  'prohibitions': 'prohibiciones',
  'misconduct': 'falta disciplinaria',
  'academic misconduct': 'falta académica',
  'disciplinary fault': 'falta disciplinaria',
  'agreement 0009 of 2024': 'acuerdo 0009 de 2024',
  'agreement': 'acuerdo',
  'cohort': 'ficha',
  'ficha': 'ficha de caracterización',
  'learning outcomes': 'resultados de aprendizaje',
  'software': 'software',
  'programming': 'programación',
  'development': 'desarrollo',
  'analysis and development of software': 'análisis y desarrollo de software',
  'ethics': 'ética',
  'integrity': 'integridad',
  'respect': 'respeto',
  'responsibility': 'responsabilidad',
  'learner': 'aprendiz',
  'learners': 'aprendices',
  'training center': 'centro de formación',
  'regional office': 'regional',
  'spokesperson': 'vocero de ficha',
  'student representative': 'representante de aprendices',
  'well-being': 'bienestar al aprendiz',
  'virtual platform': 'plataforma virtual',
  'evidence': 'evidencia',
  'homework': 'tarea',
  'project': 'proyecto formativo'
};

// Sentence starter templates for apprentices
const PRACTICE_TEMPLATES = [
  {
    en: 'As a SENA apprentice, I commit to respecting the rules and rights established in Agreement 0009 of 2024.',
    es: 'Como aprendiz del SENA, me comprometo a respetar las normas y derechos establecidos en el Acuerdo 0009 de 2024.'
  },
  {
    en: 'Due process guarantees that every apprentice has the right to legitimate defense before the Evaluation Committee.',
    es: 'El debido proceso garantiza que todo aprendiz tiene derecho a la legítima defensa ante el Comité de Evaluación.'
  },
  {
    en: 'Active participation and punctual attendance are essential duties in my vocational training program.',
    es: 'La participación activa y la asistencia puntual son deberes esenciales en mi programa de formación profesional.'
  },
  {
    en: 'Plagiarism, cheating and identity theft are strictly prohibited and classified as very serious infractions.',
    es: 'El plagio, el fraude y la suplantación están estrictamente prohibidos y catalogados como faltas gravísimas.'
  }
];

export const LanguageWritingTool: React.FC<LanguageWritingToolProps> = ({
  currentLanguage,
  onToggleLanguage
}) => {
  const [direction, setDirection] = useState<'en-es' | 'es-en'>('en-es');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const t = TRANSLATIONS[currentLanguage].translator;

  // Translation algorithm supporting full phrases, sentence templates, and word-by-word institutional matching
  const handleTranslate = (textToTranslate: string = inputText) => {
    if (!textToTranslate.trim()) {
      setOutputText('');
      return;
    }

    setIsTranslating(true);

    setTimeout(() => {
      const cleanInput = textToTranslate.trim();

      // 1. Check exact match in practice templates
      const foundTemplate = PRACTICE_TEMPLATES.find((tpl) =>
        direction === 'en-es'
          ? tpl.en.toLowerCase() === cleanInput.toLowerCase()
          : tpl.es.toLowerCase() === cleanInput.toLowerCase()
      );

      if (foundTemplate) {
        setOutputText(direction === 'en-es' ? foundTemplate.es : foundTemplate.en);
        setIsTranslating(false);
        return;
      }

      // 2. Token-based / vocabulary mapping
      let result = cleanInput;

      if (direction === 'en-es') {
        // Translate English to Spanish
        Object.entries(VOCABULARY_MAP).forEach(([enWord, esWord]) => {
          const regex = new RegExp(`\\b${enWord}\\b`, 'gi');
          result = result.replace(regex, (match) => {
            // Preserve capitalization
            if (match[0] === match[0].toUpperCase()) {
              return esWord.charAt(0).toUpperCase() + esWord.slice(1);
            }
            return esWord;
          });
        });

        // Common auxiliary translations
        result = result
          .replace(/\bi am\b/gi, 'yo soy')
          .replace(/\bi have\b/gi, 'yo tengo')
          .replace(/\bi must\b/gi, 'debo')
          .replace(/\bthe\b/gi, 'el/la')
          .replace(/\bto be\b/gi, 'ser o estar')
          .replace(/\bin\b/gi, 'en')
          .replace(/\bof\b/gi, 'de')
          .replace(/\band\b/gi, 'y')
          .replace(/\bwith\b/gi, 'con')
          .replace(/\bfor\b/gi, 'para');
      } else {
        // Translate Spanish to English
        Object.entries(VOCABULARY_MAP).forEach(([enWord, esWord]) => {
          const regex = new RegExp(`\\b${esWord}\\b`, 'gi');
          result = result.replace(regex, (match) => {
            if (match[0] === match[0].toUpperCase()) {
              return enWord.charAt(0).toUpperCase() + enWord.slice(1);
            }
            return enWord;
          });
        });

        result = result
          .replace(/\byo soy\b/gi, 'I am')
          .replace(/\byo tengo\b/gi, 'I have')
          .replace(/\bdebo\b/gi, 'I must')
          .replace(/\ben\b/gi, 'in')
          .replace(/\bde\b/gi, 'of')
          .replace(/\by\b/gi, 'and')
          .replace(/\bcon\b/gi, 'with')
          .replace(/\bpara\b/gi, 'for');
      }

      setOutputText(result);
      setIsTranslating(false);
    }, 150);
  };

  const handleSwapDirection = () => {
    setDirection((prev) => (prev === 'en-es' ? 'es-en' : 'en-es'));
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertTerm = (termEn: string, termEs: string) => {
    const toInsert = direction === 'en-es' ? termEn : termEs;
    const newText = inputText ? `${inputText} ${toInsert}` : toInsert;
    setInputText(newText);
    handleTranslate(newText);
  };

  const handleSelectTemplate = (template: { en: string; es: string }) => {
    const chosenInput = direction === 'en-es' ? template.en : template.es;
    setInputText(chosenInput);
    handleTranslate(chosenInput);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#39A900]/10 text-[#39A900] flex items-center justify-center shrink-0">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                  SENA Bilingüe · English & Spanish
                </span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  {direction === 'en-es' ? 'Inglés ➔ Español' : 'Español ➔ Inglés'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {t.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Language Interface Switcher button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleLanguage}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#39A900] dark:hover:border-[#39A900] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              title="Cambiar idioma general de la plataforma / Toggle platform language"
            >
              <Globe className="w-4 h-4 text-[#39A900]" />
              <span>Idioma UI: <strong>{currentLanguage === 'es' ? 'Español (ES)' : 'English (EN)'}</strong></span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded font-mono">
                ⇄ {currentLanguage === 'es' ? 'EN' : 'ES'}
              </span>
            </button>
          </div>
        </div>

        {/* Translation Mode Toolbar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {t.switchMode}:
            </span>
            <div className="inline-flex rounded-lg p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => {
                  setDirection('en-es');
                  if (inputText) handleTranslate(inputText);
                }}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  direction === 'en-es'
                    ? 'bg-white dark:bg-slate-900 text-[#00732F] dark:text-[#4ade80] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.enToEs}
              </button>
              <button
                onClick={() => {
                  setDirection('es-en');
                  if (inputText) handleTranslate(inputText);
                }}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  direction === 'es-en'
                    ? 'bg-white dark:bg-slate-900 text-[#00732F] dark:text-[#4ade80] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.esToEn}
              </button>
            </div>

            <button
              onClick={handleSwapDirection}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#39A900] transition-colors cursor-pointer"
              title={t.swapLanguages}
              aria-label={t.swapLanguages}
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            {inputText.length} {t.characterCount}
          </div>
        </div>

        {/* Translation Work Area: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {/* Input Box */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>{direction === 'en-es' ? 'Texto en Inglés (English)' : 'Texto en Español (Spanish)'}</span>
              {inputText && (
                <button
                  onClick={() => {
                    setInputText('');
                    setOutputText('');
                  }}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-[11px]"
                >
                  {t.clearBtn}
                </button>
              )}
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                handleTranslate(e.target.value);
              }}
              placeholder={
                direction === 'en-es'
                  ? 'Escribe o pega texto en inglés aquí (ej. As an apprentice I must respect the regulations)...'
                  : 'Escribe o pega texto en español aquí (ej. Como aprendiz debo respetar el reglamento)...'
              }
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#39A900] resize-y"
            />
          </div>

          {/* Output Box */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>{direction === 'en-es' ? 'Traducción al Español' : 'Translation into English'}</span>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] text-[#00732F] dark:text-[#4ade80] hover:underline cursor-pointer font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.copied : t.copyBtn}</span>
                </button>
              )}
            </div>
            <div className="w-full min-h-[148px] p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs sm:text-sm overflow-auto">
              {outputText ? (
                <p className="whitespace-pre-wrap leading-relaxed">{outputText}</p>
              ) : (
                <p className="text-slate-400 dark:text-slate-500 italic">
                  {t.outputPlaceholder}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Translation action buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTranslate(inputText)}
              disabled={!inputText.trim()}
              className="py-2 px-4 rounded-lg bg-[#39A900] hover:bg-[#2e8500] disabled:opacity-50 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.translateBtn}</span>
            </button>
            <button
              onClick={() => {
                setInputText('');
                setOutputText('');
              }}
              className="py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {t.clearBtn}
            </button>
          </div>

          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            Traductor institucional integrado para aprendices SENA
          </span>
        </div>
      </div>

      {/* Practice Sentences Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3 transition-colors">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#39A900]" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Frases Modelo de Práctica (Reglamento del Aprendiz)
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Haz clic en cualquier enunciado para cargarlo en el traductor y comparar su redacción en inglés y español:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {PRACTICE_TEMPLATES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectTemplate(item)}
              className="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-all text-xs cursor-pointer group"
            >
              <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-[#39A900] transition-colors">
                🇬🇧 {item.en}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">
                🇨🇴 {item.es}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Vocabulary Chips */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3 transition-colors">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#00324D] dark:text-blue-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            {t.quickVocabularyTitle}
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t.quickVocabularySubtitle}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {Object.entries(VOCABULARY_MAP).slice(0, 24).map(([enWord, esWord], idx) => (
            <button
              key={idx}
              onClick={() => handleInsertTerm(enWord, esWord)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-[#39A900] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title={`Insertar: ${enWord} ⇄ ${esWord}`}
            >
              <span className="font-medium text-slate-900 dark:text-white">{enWord}</span>
              <span className="text-[10px] text-slate-400">⇄</span>
              <span className="text-emerald-700 dark:text-emerald-400 text-[11px]">{esWord}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
