import React, { useState, useMemo } from 'react';
import { GlossaryTerm } from '../types/induction';
import { Search, BookOpen, HelpCircle, ChevronDown, ChevronUp, Tag } from 'lucide-react';

interface RegulationSearchProps {
  glossary: GlossaryTerm[];
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  articleRef: string;
}

const FAQS: FAQItem[] = [
  {
    question: '¿Qué ocurre si tengo una urgencia médica o calamidad y no puedo asistir a formación?',
    answer: 'Debes presentar la justificación con soporte válido (incapacidad expedida por EPS, IPS o certificación de calamidad) ante tu instructor o Coordinador Académico dentro de los tres (3) días hábiles siguientes al hecho. De lo contrario, se computará como inasistencia injustificada.',
    category: 'Deberes y Asistencia',
    articleRef: 'Capítulo III - Trámite de Inasistencias'
  },
  {
    question: '¿Cuántos días continuos de inasistencia injustificada causan deserción del programa?',
    answer: 'El Reglamento establece que tres (3) días hábiles consecutivos de inasistencia injustificada o el incumplimiento reiterado no justificado en tres sesiones del trimestre constituyen causal de deserción, activando la notificación y trámite de cancelación de matrícula.',
    category: 'Permanencia y Deserción',
    articleRef: 'Capítulo III y VII - Deserción'
  },
  {
    question: '¿Qué es el Comité de Evaluación y Seguimiento y qué derechos tengo si me citan?',
    answer: 'Es el órgano consultivo colegiado del Centro que analiza casos académicos y disciplinarios. Si eres citado, tienes derecho a ser notificado por escrito con al menos 3 días hábiles de anticipación indicando los hechos, a presentar descargos y pruebas, y a estar acompañado por un vocero o acudiente.',
    category: 'Debido Proceso',
    articleRef: 'Capítulo VII - Comité de Evaluación'
  },
  {
    question: '¿Qué alternativas tengo para realizar mi Etapa Productiva?',
    answer: 'Puedes realizarla mediante: 1) Contrato de Aprendizaje patrocinado por empresa, 2) Vínculo Laboral formal afín al programa, 3) Proyecto Productivo en el Centro o de emprendimiento (Fondo Emprender), 4) Pasantía en ONG o entidad pública, o 5) Monitoría institucional avalada por la Subdirección.',
    category: 'Etapa Productiva',
    articleRef: 'Alternativas de Etapa Productiva SENA'
  },
  {
    question: '¿En qué se diferencia el llamado de atención verbal del llamado de atención escrito?',
    answer: 'El llamado de atención verbal es una MEDIDA FORMATIVA PEDAGÓGICA formulada por el instructor que busca la reflexión; NO constituye sanción y NO se registra en la hoja de vida. El llamado de atención escrito es una SANCIÓN DISCIPLINARIA formal expedida por el Subdirector con copia al expediente nacional.',
    category: 'Medidas vs Sanciones',
    articleRef: 'Capítulos VI y VII'
  },
  {
    question: '¿Qué puedo hacer si considero que una calificación o sanción fue injusta?',
    answer: 'Frente a evaluaciones, tienes derecho a solicitar revisión pedagógica respetuosa dentro de los plazos. Frente a una resolución sancionatoria del Subdirector, puedes interponer el Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a la notificación.',
    category: 'Derechos y Recursos',
    articleRef: 'Capítulo II y VII - Recurso de Reposición'
  }
];

export const RegulationSearch: React.FC<RegulationSearchProps> = ({ glossary }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    glossary.forEach((g) => set.add(g.category));
    return ['todos', ...Array.from(set)];
  }, [glossary]);

  const filteredGlossary = useMemo(() => {
    return glossary.filter((item) => {
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesQuery =
        item.term.toLowerCase().includes(query.toLowerCase()) ||
        item.definition.toLowerCase().includes(query.toLowerCase()) ||
        item.regulationChapter.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [glossary, query, selectedCategory]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00732F] dark:text-[#4ade80] uppercase mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Consultorio Rápido del Aprendiz</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Glosario Normativo & Preguntas Frecuentes
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Busca artículos, conceptos jurídicos, causales de sanción y derechos estipulados en el Acuerdo 009 de 2024.
        </p>

        {/* Search bar */}
        <div className="mt-5 relative">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por término: plagio, deserción, debido proceso, contrato, matrícula..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Términos y Artículos ({filteredGlossary.length})
          </h3>
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('todos');
              }}
              className="text-xs text-[#00732F] dark:text-[#4ade80] hover:underline"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>

        {filteredGlossary.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 dark:text-slate-400 text-xs">
            No se encontraron términos para "{query}". Prueba con otra palabra clave.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.term}
                  </h4>
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    {item.regulationChapter}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </p>
                <div className="pt-2 text-[10px] font-semibold text-[#00732F] dark:text-[#4ade80] uppercase tracking-wider">
                  Categoría: {item.category}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preguntas Frecuentes (FAQ) Accordion */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00732F] dark:text-[#4ade80] uppercase">
          <HelpCircle className="w-4 h-4" />
          <span>Respuestas Inmediatas</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Preguntas Frecuentes de Aprendices Nuevos
        </h3>

        <div className="space-y-3 pt-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 bg-slate-50/70 dark:bg-slate-800/60 hover:bg-slate-100/70 dark:hover:bg-slate-800 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-850 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="text-[11px] text-[#00732F] dark:text-[#4ade80] font-semibold flex items-center gap-2 pt-1">
                      <span>Fundamento:</span>
                      <span className="underline">{faq.articleRef}</span>
                      <span aria-hidden="true" className="text-slate-400">·</span>
                      <span className="text-slate-500 dark:text-slate-400">{faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
