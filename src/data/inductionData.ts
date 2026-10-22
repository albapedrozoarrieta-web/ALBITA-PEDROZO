import { InductionModule, CaseSimulation, Badge, GlossaryTerm, QuizQuestion } from '../types/induction';

export const INDUCTION_MODULES: InductionModule[] = [
  {
    id: 'mod-1-identidad',
    moduleNumber: 1,
    title: 'Identidad SENA y Perfil del Aprendiz',
    shortDescription: 'Misión institucional, valores éticos, símbolos patrios y el perfil de liderazgo del aprendiz en Colombia.',
    category: 'Institucional',
    estimatedMinutes: 15,
    xpReward: 150,
    lessons: [
      {
        id: 'les-1-1',
        title: 'Misión, Visión y Símbolos del SENA',
        durationMinutes: 6,
        articleReference: 'Capítulo I - Principios Generales del Reglamento',
        summary: 'El SENA (Servicio Nacional de Aprendizaje) es un establecimiento público del orden nacional encargado de cumplir la función que corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos.',
        keyPoints: [
          'El Aprendiz SENA es el centro y gestor principal de su propio proceso formativo.',
          'Símbolos institucionales: El Escudo representa los tres sectores de la economía (agropecuario, industria y comercio/servicios).',
          'La Bandera blanca y verde simboliza la paz, la esperanza y el progreso productivo del país.',
          'El Logotipo circular estilizado representa al ser humano en constante avance y formación integral.'
        ],
        practicalCase: {
          situation: 'Juan ingresa por primera vez a un Centro de Formación y se pregunta qué significa portar el carné del SENA.',
          analysis: 'El carné es un documento oficial e intransferible que lo acredita como aprendiz activo y le brinda acceso a talleres, laboratorios, biblioteca y beneficios de bienestar.',
          keyLearning: 'Portar el carné visiblemente es un derecho y también un deber de seguridad institucional.'
        }
      },
      {
        id: 'les-1-2',
        title: 'Las Dos Etapas de la Formación: Lectiva y Productiva',
        durationMinutes: 9,
        articleReference: 'Capítulo I y Normas de Ejecución de la Formación',
        summary: 'La Formación Profesional Integral (FPI) se estructura en dos fases complementarias que garantizan la adquisición de competencias teóricas, procedimentales y axiológicas.',
        keyPoints: [
          'Etapa Lectiva: Periodo en el que el aprendiz adquiere y desarrolla conocimientos, habilidades y destrezas en ambientes de aprendizaje institucionales.',
          'Etapa Productiva: Periodo en el que el aprendiz aplica y complementa sus competencias en un entorno laboral real.',
          'Alternativas de Etapa Productiva: Contrato de Aprendizaje, Vínculo Laboral formal, Proyecto Productivo SENA, Pasantía empresarial o comunitaria, y Monitorías en el Centro.',
          'Para iniciar la Etapa Productiva es requisito indispensable haber aprobado el 100% de los resultados de aprendizaje de la Etapa Lectiva.'
        ],
        practicalCase: {
          situation: 'Camila terminó su etapa lectiva de ADSO y desea validar su práctica mediante el desarrollo de software para la microempresa familiar.',
          analysis: 'Es completamente viable bajo la modalidad de Proyecto Productivo o Pasantía, siempre que cuente con concertación previa y seguimiento del instructor asignado.',
          keyLearning: 'Existen diversas alternativas formales para cumplir con la etapa productiva según la vocación del aprendiz.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-1-1',
        question: '¿Cuáles son las dos etapas estructurales de la Formación Profesional Integral en el SENA?',
        options: [
          'Etapa Teórica y Etapa de Grado',
          'Etapa Lectiva y Etapa Productiva',
          'Etapa Escrita y Etapa Laboral',
          'Etapa Virtual y Etapa Presencial'
        ],
        correctIndex: 1,
        explanation: 'La formación en el SENA se compone de la Etapa Lectiva (apropiación de conocimientos) y la Etapa Productiva (aplicación en el contexto real de trabajo).',
        articleRef: 'Estructura Curricular SENA'
      },
      {
        id: 'q-1-2',
        question: '¿Cuál de las siguientes NO es una modalidad válida para la Etapa Productiva?',
        options: [
          'Contrato de Aprendizaje patrocinado por empresa',
          'Proyecto Productivo institucional o de emprendimiento',
          'Trabajo informal sin supervisión ni plan de actividades acordado',
          'Pasantía o Vínculo Laboral formal'
        ],
        correctIndex: 2,
        explanation: 'Cualquier modalidad de etapa productiva requiere formalización, plan concertado con el SENA y seguimiento de un instructor técnico asignado.',
        articleRef: 'Reglamento del Aprendiz - Alternativas Etapa Productiva'
      }
    ]
  },
  {
    id: 'mod-2-derechos',
    moduleNumber: 2,
    title: 'Derechos del Aprendiz SENA',
    shortDescription: 'Prerrogativas, acceso a recursos tecnológicos, bienestar integral, libre expresión y garantías del debido proceso.',
    category: 'Derechos',
    estimatedMinutes: 20,
    xpReward: 200,
    lessons: [
      {
        id: 'les-2-1',
        title: 'Derechos Académicos y Formativos',
        durationMinutes: 10,
        articleReference: 'Capítulo II - Derechos del Aprendiz (Artículos clave)',
        summary: 'El aprendiz tiene el derecho fundamental a recibir una formación profesional integral de alta calidad, actualizada y orientada al desarrollo humano y técnico.',
        keyPoints: [
          'Recibir inducción completa sobre la estructura del SENA, el reglamento y el programa formativo.',
          'Disponer oportunamente de los recursos didácticos, técnicos, tecnológicos, bibliotecas físicas y virtuales (Biblioteca Digital SENA).',
          'Ser evaluado con criterios pedagógicos objetivos y transparentes, conociendo las valoraciones en un plazo oportuno (máximo 5 días hábiles tras la entrega).',
          'Solicitar revisión de las evaluaciones ante el instructor o una segunda opinión si considera que hubo inconsistencias.',
          'Recibir oportunamente el carné institucional al iniciar su proceso formativo de manera gratuita.'
        ],
        practicalCase: {
          situation: 'David presentó una evidencia de programación hace 12 días y el instructor no ha emitido retroalimentación ni calificación.',
          analysis: 'David tiene derecho a solicitar de manera respetuosa la evaluación formal de su entrega, ya que el reglamento ampara la retroalimentación oportuna para su aprendizaje continuo.',
          keyLearning: 'La evaluación formativa debe ser continua, orientadora y comunicada dentro de los plazos establecidos.'
        }
      },
      {
        id: 'les-2-2',
        title: 'Derechos a Bienestar y Garantías Institucionales',
        durationMinutes: 10,
        articleReference: 'Capítulo II - Bienestar y Participación Democrática',
        summary: 'El SENA promueve el bienestar biopsicosocial mediante programas de salud preventiva, deporte, recreación, arte, cultura y apoyo socioeconómico.',
        keyPoints: [
          'Acceder a los programas de Bienestar al Aprendiz (salud preventiva, orientación psicológica, actividades deportivas y culturales).',
          'Postularse a los apoyos de sostenimiento (FIC, apoyos de alimentación, monitorías de apoyo al aprendizaje) según convocatorias y requisitos socioeconómicos.',
          'Elegir y ser elegido democráticamente como Representante de Aprendices o Vocero de Ficha.',
          'Gozar del derecho al Debido Proceso en cualquier trámite disciplinario o académico, con presunción de inocencia y derecho a la defensa.'
        ],
        practicalCase: {
          situation: 'Laura tiene dificultades económicas para el transporte y desea saber si el SENA la puede respaldar.',
          analysis: 'Laura tiene derecho a postularse a las convocatorias de apoyos de sostenimiento regular, transporte o monitorías que gestiona la Coordinación de Bienestar al Aprendiz.',
          keyLearning: 'Bienestar al Aprendiz busca mitigar la deserción escolar garantizando equidad y permanencia.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-2-1',
        question: '¿Qué derecho tiene el aprendiz si no está conforme con la calificación u observación de una evidencia?',
        options: [
          'Negarse a volver a clases hasta que le cambien la nota',
          'Solicitar respetuosamente revisión y retroalimentación dentro de los plazos reglamentarios',
          'Presentar una demanda penal contra la institución',
          'Pedir que los compañeros de ficha voten su calificación'
        ],
        correctIndex: 1,
        explanation: 'El aprendiz tiene derecho al debido proceso académico y a solicitar la revisión justificada de sus evaluaciones dentro de los términos señalados en el reglamento.',
        articleRef: 'Capítulo II - Derechos Académicos'
      },
      {
        id: 'q-2-2',
        question: '¿A cuál de los siguientes programas tiene derecho a participar un aprendiz SENA matriculado?',
        options: [
          'Exclusivamente a los exámenes teóricos',
          'Programas deportivos, culturales, orientación psicológica y apoyos de bienestar',
          'Solo a las clases presenciales sin uso de bibliotecas',
          'A actividades laborales sin remuneración ni seguridad social'
        ],
        correctIndex: 1,
        explanation: 'El Plan de Bienestar al Aprendiz cubre dimensiones deportivas, culturales, artísticas, de salud ocupacional y socioeconómicas.',
        articleRef: 'Capítulo II - Bienestar al Aprendiz'
      }
    ]
  },
  {
    id: 'mod-3-deberes',
    moduleNumber: 3,
    title: 'Deberes del Aprendiz SENA',
    shortDescription: 'Compromisos de puntualidad, respeto, seguridad y salud en el trabajo, cuidado de bienes y honestidad académica.',
    category: 'Deberes',
    estimatedMinutes: 20,
    xpReward: 200,
    lessons: [
      {
        id: 'les-3-1',
        title: 'Deberes con la Formación y la Asistencia',
        durationMinutes: 10,
        articleReference: 'Capítulo III - Deberes del Aprendiz',
        summary: 'La matrícula en el SENA constituye un pacto mutuo donde el aprendiz asume con rigor su proceso formativo autónomo y colaborativo.',
        keyPoints: [
          'Cumplir puntualmente con el horario de formación en las jornadas presenciales, virtuales o mixtas concertadas.',
          'Justificar formalmente las inasistencias dentro de los 3 días hábiles siguientes con soporte válido (médico, laboral o fuerza mayor).',
          'Presentar oportunamente las evidencias de aprendizaje en la plataforma LMS oficial (ZAJUNA / SofiaPlus) según el cronograma formativo.',
          'Mantener actualizada su información personal (dirección, teléfono, correo) en los sistemas institucionales.',
          'Participar activamente en las sesiones de inducción, evaluaciones de instructores y proyectos asignados.'
        ],
        practicalCase: {
          situation: 'Mateo se enfermó un martes y no pudo asistir al taller. Asume que con avisarle por WhatsApp a un amigo es suficiente.',
          analysis: 'Incorrecto. Mateo tiene el deber reglamentario de presentar el soporte médico EPS o IPS oficial ante su instructor o coordinador dentro de los 3 días hábiles siguientes.',
          keyLearning: 'La justificación formal y oportuna evita que se configure un reporte de inasistencia o deserción.'
        }
      },
      {
        id: 'les-3-2',
        title: 'Deberes de Seguridad, Convivencia y Cuidado de Bienes',
        durationMinutes: 10,
        articleReference: 'Capítulo III - Convivencia y Normas de Seguridad',
        summary: 'Los Centros de Formación son espacios compartidos donde la seguridad física y el respeto a la diversidad son premisas no negociables.',
        keyPoints: [
          'Utilizar los Elementos de Protección Personal (EPP) y la indumentaria reglamentaria exigida en talleres, laboratorios y ambientes productivos.',
          'Cuidar y mantener en óptimas condiciones las instalaciones, herramientas, equipos de cómputo y mobiliario del SENA.',
          'Tratar con dignidad, respeto y sin ningún tipo de discriminación a aprendices, instructores, directivos, personal administrativo y de servicios generales.',
          'Portar visiblemente el carné del SENA durante la permanencia en las instalaciones y eventos institucionales.',
          'Respetar los derechos de autor y propiedad intelectual de terceros y del SENA en todas las evidencias desarrolladas.'
        ],
        practicalCase: {
          situation: 'En el taller de soldadura, un aprendiz decide no usar las gafas de seguridad porque "le incomodan para ver rápido".',
          analysis: 'El uso de EPP es un deber de seguridad ineludible. Omitirlo pone en grave riesgo su integridad y la de sus compañeros, y constituye una falta disciplinaria.',
          keyLearning: 'Las normas de Seguridad y Salud en el Trabajo (SST) protegen la vida y son de cumplimiento obligatorio.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-3-1',
        question: '¿Cuál es el plazo reglamentario para presentar la justificación con soporte válido tras una inasistencia?',
        options: [
          'El mismo día antes de medianoche',
          'Hasta el final del trimestre formativo',
          'Dentro de los tres (3) días hábiles siguientes',
          'No se requiere presentar justificación si el aprendiz es mayor de edad'
        ],
        correctIndex: 2,
        explanation: 'El Reglamento establece un término perentorio de tres (3) días hábiles para radicar formalmente las justificaciones de inasistencia.',
        articleRef: 'Capítulo III - Deberes y Trámite de Inasistencias'
      },
      {
        id: 'q-3-2',
        question: '¿Qué deber tiene el aprendiz respecto al carné institucional?',
        options: [
          'Prestarlo a amigos o familiares para que ingresen al Centro',
          'Portarlo en lugar visible durante toda la permanencia en las sedes del SENA',
          'Guardarlo en la billetera y sacarlo únicamente si la policía lo solicita',
          'Venderlo al graduarse'
        ],
        correctIndex: 1,
        explanation: 'El carné debe portarse de manera visible dentro de las instalaciones para garantizar la seguridad y control institucional.',
        articleRef: 'Capítulo III - Identificación del Aprendiz'
      }
    ]
  },
  {
    id: 'mod-4-prohibiciones',
    moduleNumber: 4,
    title: 'Prohibiciones y Clasificación de Faltas',
    shortDescription: 'Límites claros: prohibiciones académicas y disciplinarias, y calificación de faltas (Leves, Graves y Gravísimas).',
    category: 'Prohibiciones',
    estimatedMinutes: 20,
    xpReward: 200,
    lessons: [
      {
        id: 'les-4-1',
        title: 'Prohibiciones Académicas y Plagio',
        durationMinutes: 10,
        articleReference: 'Capítulo IV - Prohibiciones Académicas',
        summary: 'La honestidad intelectual es pilar del SENA. El fraude y la apropiación indebida socavan la credibilidad de la certificación técnica.',
        keyPoints: [
          'Plagiar materiales, trabajos, códigos de software o evidencias producidas por otros aprendices o de internet sin la debida citación.',
          'Cometer fraude en evaluaciones, exámenes, concursos o pruebas institucionales.',
          'Suplantar o permitir ser suplantado en actividades formativas presenciales o en la plataforma virtual.',
          'Terminar unilateralmente el Contrato de Aprendizaje sin justa causa y sin previo visto bueno de la Coordinación Académica.',
          'Comercializar productos desarrollados como evidencias institucionales con fines lucrativos personales sin autorización.'
        ],
        practicalCase: {
          situation: 'Andrés copia un informe técnico idéntico de un aprendiz del año anterior y lo envía con su nombre para ganar tiempo.',
          analysis: 'Esta conducta tipifica plagio flagrante, catalogado como falta grave o gravísima según la reiteración y afectación al proceso.',
          keyLearning: 'El plagio acarrea medidas disciplinarias severas y anulación inmediata de la evidencia.'
        }
      },
      {
        id: 'les-4-2',
        title: 'Prohibiciones Disciplinarias y Clasificación de Faltas',
        durationMinutes: 10,
        articleReference: 'Capítulo IV y V - Clasificación de Faltas',
        summary: 'El SENA prohíbe conductas que atenten contra la integridad física, la moral, el patrimonio público o la convivencia armónica.',
        keyPoints: [
          'Ingresar, consumir o comercializar bebidas alcohólicas o sustancias psicoactivas dentro de las sedes o en desarrollo de actividades formativas.',
          'Portar armas de fuego, cortopunzantes o sustancias explosivas dentro de las instalaciones.',
          'Incurrir en actos de violencia física, verbal, psicológica o ciberacoso hacia cualquier miembro de la comunidad educativa.',
          'Dañar, hurtar o sustraer bienes del SENA o de terceros.',
          'Faltas Leves: Incumplimientos menores que no generan daño irreparable.',
          'Faltas Graves: Afectaciones considerables al proceso formativo o la convivencia institucional.',
          'Faltas Gravísimas: Delitos, violencia física, consumo/tráfico de drogas, porte de armas, fraude comprobado o falsedad en documentos.'
        ],
        practicalCase: {
          situation: 'Dos aprendices inician una riña física dentro del comedor del Centro de Formación.',
          analysis: 'La agresión física constituye una falta gravísima de carácter disciplinario, que da lugar a apertura inmediata de proceso sancionatorio ante el Comité de Evaluación.',
          keyLearning: 'La violencia vulnera la convivencia pacífica y puede derivar en la cancelación definitiva de matrícula.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-4-1',
        question: '¿Cómo califica el reglamento el ingreso o consumo de sustancias psicoactivas o alcohol en el SENA?',
        options: [
          'Como una falta leve que se soluciona con una disculpa',
          'Como una conducta permitida si es fuera del aula',
          'Como una falta gravísima de carácter disciplinario',
          'Como una falta académica justificable'
        ],
        correctIndex: 2,
        explanation: 'El porte, consumo o distribución de sustancias psicoactivas o alcohol en instalaciones SENA es una falta gravísima que atenta contra la seguridad comunitaria.',
        articleRef: 'Capítulo IV - Prohibiciones Disciplinarias'
      },
      {
        id: 'q-4-2',
        question: '¿Qué constituye el plagio de una evidencia de aprendizaje en el SENA?',
        options: [
          'Citar correctamente a un autor según normas APA',
          'Copiar trabajos de otros o de internet presentándolos como propios sin autoría legítima',
          'Consultar la biblioteca institucional para investigar',
          'Pedir retroalimentación técnica al instructor'
        ],
        correctIndex: 1,
        explanation: 'El plagio es la apropiación no autorizada ni citada de creaciones intelectuales ajenas y es una prohibición expresa de orden académico.',
        articleRef: 'Capítulo IV - Integridad Académica'
      }
    ]
  },
  {
    id: 'mod-5-debido-proceso',
    moduleNumber: 5,
    title: 'Medidas Formativas, Sanciones y Debido Proceso',
    shortDescription: 'Planes de mejoramiento, llamadas de atención, Comité de Evaluación y el derecho fundamental a la defensa.',
    category: 'Debido Proceso',
    estimatedMinutes: 20,
    xpReward: 200,
    lessons: [
      {
        id: 'les-5-1',
        title: 'Medidas Formativas Pedagógicas',
        durationMinutes: 10,
        articleReference: 'Capítulo VI - Medidas Formativas',
        summary: 'El modelo formativo del SENA prioriza la pedagogía antes del castigo. Las medidas formativas buscan encauzar el desempeño del aprendiz.',
        keyPoints: [
          'Llamado de atención verbal: Advertencia pedagógica reflexiva formulada por el instructor. NO constituye sanción y NO se registra en la hoja de vida.',
          'Plan de Mejoramiento Académico: Documento concertado con actividades complementarias y plazos precisos para superar insuficiencias en resultados de aprendizaje.',
          'Plan de Mejoramiento Disciplinario: Acciones de carácter comportamental, actitudinal o social concertadas para corregir conductas inconvenientes.',
          'Si el aprendiz aprueba el plan de mejoramiento a satisfacción, se archiva el seguimiento sin sanción.'
        ],
        practicalCase: {
          situation: 'Santiago tiene dificultades con el resultado de aprendizaje de Bases de Datos Relacionales.',
          analysis: 'El instructor acuerda un Plan de Mejoramiento Académico con ejercicios prácticos y un plazo prudencial para que alcance la competencia sin necesidad de sanción.',
          keyLearning: 'Los planes de mejoramiento son oportunidades pedagógicas para asegurar el éxito del aprendiz.'
        }
      },
      {
        id: 'les-5-2',
        title: 'Sanciones Disciplinarias y Garantías del Debido Proceso',
        durationMinutes: 10,
        articleReference: 'Capítulo VII - Procedimiento y Sanciones',
        summary: 'Cuando las faltas son graves o gravísimas, se activa el procedimiento formal ante el Comité de Evaluación y Seguimiento.',
        keyPoints: [
          'Sanciones oficiales: 1) Llamado de atención escrito (con registro en hoja de vida), 2) Condicionamiento de matrícula, 3) Cancelación de matrícula (con inhabilidad de 6 a 12 meses para matricularse en el SENA).',
          'Fases del Debido Proceso: Informe de la queja -> Citación formal por escrito con indicación de hechos y normas -> Sesión del Comité de Evaluación -> Descargos y presentación de pruebas por parte del aprendiz -> Recomendación del Comité -> Resolución motivada del Subdirector de Centro.',
          'Recurso de Reposición: El aprendiz tiene derecho a interponer recurso de reposición ante el Subdirector de Centro dentro de los 5 días hábiles siguientes a la notificación de la sanción.'
        ],
        practicalCase: {
          situation: 'A Daniela le notifican una apertura de investigación disciplinaria sin explicarle qué hechos se le imputan.',
          analysis: 'Se estaría vulnerando su derecho al debido proceso. La citación debe especificar con exactitud los hechos, las pruebas aportadas y los artículos del reglamento presuntamente infringidos para que pueda preparar sus descargos.',
          keyLearning: 'El debido proceso garantiza la defensa y la imparcialidad en todas las instancias institucionales.'
        }
      }
    ],
    quiz: [
      {
        id: 'q-5-1',
        question: '¿El llamado de atención verbal queda registrado como antecedente en la hoja de vida del aprendiz?',
        options: [
          'Sí, para siempre en el expediente nacional',
          'No, es una medida pedagógica formativa que no constituye sanción disciplinaria',
          'Sí, y suspende inmediatamente el subsidio de transporte',
          'Depende del humor del instructor'
        ],
        correctIndex: 1,
        explanation: 'El llamado de atención verbal es una medida eminentemente formativa y pedagógica, no genera antecedente ni sanción formal.',
        articleRef: 'Capítulo VI - Medidas Formativas'
      },
      {
        id: 'q-5-2',
        question: '¿Qué recurso puede interponer el aprendiz contra una resolución de cancelación de matrícula expedida por el Subdirector de Centro?',
        options: [
          'Recurso de súplica ante los aprendices voceros',
          'Recurso de Reposición dentro de los 5 días hábiles siguientes a la notificación',
          'Ninguno, las decisiones del SENA son inapelables de inmediato',
          'Una carta en el buzón de sugerencias del Centro'
        ],
        correctIndex: 1,
        explanation: 'El Reglamento ampara el Recurso de Reposición interpuesto ante el Subdirector de Centro dentro de los cinco (5) días hábiles siguientes.',
        articleRef: 'Capítulo VII - Garantías y Recursos'
      }
    ]
  }
];

export const CASE_SIMULATIONS: CaseSimulation[] = [
  {
    id: 'caso-1-plagio',
    caseNumber: 1,
    title: 'El Proyecto Colaborativo y la Tentación del Plagio',
    category: 'Integridad Académica',
    badgeAwardedId: 'badge-integridad',
    scenario: 'Tu equipo de formación de Tecnología en Desarrollo de Software debe entregar el prototipo funcional y el documento de arquitectura en 48 horas. Un compañero descargó un proyecto idéntico de GitHub y propone cambiarle el título y los logos para entregarlo como propio.',
    apprenticeRole: 'Líder de equipo de trabajo formativo',
    dilemma: '¿Qué decisión tomas frente a la propuesta de entregar código ajeno sin citación?',
    options: [
      {
        id: 'c1-opt-a',
        text: 'Aceptar la propuesta para asegurar la nota y evitar trasnochar, confiando en que el instructor no lo revisará a fondo.',
        isCorrect: false,
        consequenceTitle: 'Riesgo Crítico de Cancelación por Fraude',
        consequenceDescription: 'El instructor utiliza software de detección de plagio. Se inicia proceso disciplinario a todo el equipo por falta gravísima contra la integridad académica, arriesgando condicionamiento o cancelación de matrícula.',
        articleRef: 'Cap. IV Art. Prohibiciones de Carácter Académico',
        xpEarned: 20
      },
      {
        id: 'c1-opt-b',
        text: 'Rechazar la propuesta, explicar al equipo que constituye plagio según el Reglamento, y acordar con el instructor una entrega parcial o asesoría técnica para presentar trabajo propio y debidamente citado.',
        isCorrect: true,
        consequenceTitle: 'Integridad y Liderazgo Ejemplar',
        consequenceDescription: 'Excelente decisión. Demuestras el perfil del Aprendiz SENA honesto y propositivo. El instructor valora la transparencia y brinda orientación técnica para culminar el proyecto con mérito propio.',
        articleRef: 'Cap. III Deberes y Cap. IV Prohibiciones',
        xpEarned: 150
      },
      {
        id: 'c1-opt-c',
        text: 'Quedarte en silencio y no decir nada, dejando que el compañero lo suba solo a su nombre.',
        isCorrect: false,
        consequenceTitle: 'Complicidad por Omisión',
        consequenceDescription: 'Como líder de equipo conocías la irregularidad. La falta de comunicación afecta el clima formativo y no soluciona el aprendizaje real que necesitas para tu futura etapa productiva.',
        articleRef: 'Principios Éticos SENA',
        xpEarned: 30
      }
    ]
  },
  {
    id: 'caso-2-inasistencia',
    caseNumber: 2,
    title: 'Emergencia de Salud y Gestión de Inasistencias',
    category: 'Deberes y Permanencia',
    badgeAwardedId: 'badge-garante',
    scenario: 'El lunes por la noche sufres una fuerte intoxicación médica que te obliga a estar hospitalizado durante tres días seguidos. Tienes programadas sesiones prácticas cruciales en el taller industrial y entrega de evidencias en SofiaPlus/ZAJUNA.',
    apprenticeRole: 'Aprendiz en formación presencial',
    dilemma: '¿Cómo gestionas correctamente tu ausencia conforme a la normatividad del SENA?',
    options: [
      {
        id: 'c2-opt-a',
        text: 'Esperar a regresar dentro de dos semanas y avisarle verbalmente al instructor cuando te lo encuentres en el pasillo.',
        isCorrect: false,
        consequenceTitle: 'Apertura de Proceso por Deserción',
        consequenceDescription: 'Al pasar más de tres (3) días hábiles continuos sin radicación formal de soporte, el sistema activa la alerta por presunta deserción. Deberás presentar descargos formales ante el Coordinador.',
        articleRef: 'Cap. III Trámite de Inasistencias y Deserción',
        xpEarned: 20
      },
      {
        id: 'c2-opt-b',
        text: 'Solicitar a tu acudiente o radicar tú mismo la incapacidad médica oficial ante la Coordinación Académica e instructores dentro de los 3 días hábiles siguientes.',
        isCorrect: true,
        consequenceTitle: 'Cumplimiento Procedimental Oportuno',
        consequenceDescription: '¡Correcto! Tu incapacidad médica EPS/IPS es validada legalmente. Se reprograma la entrega de evidencias y tus horas formativas quedan debidamente justificadas sin sanción.',
        articleRef: 'Cap. III Art. Justificación de Inasistencias',
        xpEarned: 150
      },
      {
        id: 'c2-opt-c',
        text: 'Pedirle a un compañero que marque asistencia por ti en la planilla firmando con tu nombre.',
        isCorrect: false,
        consequenceTitle: 'Falsedad y Suplantación (Falta Gravísima)',
        consequenceDescription: 'Firmar por otra persona o pedir que te suplanten constituye una falta gravísima de falsedad documental tanto en el reglamento SENA como en la legislación colombiana.',
        articleRef: 'Cap. IV Prohibiciones Disciplinarias',
        xpEarned: 0
      }
    ]
  },
  {
    id: 'caso-3-convivencia',
    caseNumber: 3,
    title: 'Desacuerdo en el Taller y Normas de Convivencia',
    category: 'Convivencia y Seguridad',
    badgeAwardedId: 'badge-convivencia',
    scenario: 'Durante una práctica de laboratorio, dos aprendices discuten acaloradamente por el turno de uso de un torno CNC. Uno de ellos pierde el control, levanta una herramienta metálica de forma intimidante y profiere insultos verbales en presencia del grupo.',
    apprenticeRole: 'Aprendiz vocero de ficha presente en el ambiente',
    dilemma: '¿Cuál es la ruta reglamentaria adecuada para abordar la situación?',
    options: [
      {
        id: 'c3-opt-a',
        text: 'Intervenir físicamente empujando al compañero alterado para quitarle la herramienta por la fuerza.',
        isCorrect: false,
        consequenceTitle: 'Escalamiento del Riesgo Físico',
        consequenceDescription: 'Usar la fuerza física incrementa el peligro en un entorno industrial con maquinaria en movimiento y te involucra directamente en una riña.',
        articleRef: 'Seguridad y Salud en el Trabajo SENA',
        xpEarned: 25
      },
      {
        id: 'c3-opt-b',
        text: 'Activar el protocolo de seguridad apagando la máquina si hay riesgo, llamar de inmediato al instructor a cargo y solicitar mediación del Comité de Convivencia o Bienestar al Aprendiz.',
        isCorrect: true,
        consequenceTitle: 'Manejo Responsable y Restaurativo',
        consequenceDescription: 'Impecable. Se garantiza la seguridad física de todos, se desescala el conflicto y se canaliza el caso por los conductos regulares institucionales respetando el debido proceso.',
        articleRef: 'Cap. III y VI Medidas de Convivencia Ciudadana',
        xpEarned: 150
      },
      {
        id: 'c3-opt-c',
        text: 'Grabar el video de la pelea con el celular y publicarlo en redes sociales para burlarse de ellos.',
        isCorrect: false,
        consequenceTitle: 'Acoso Digital y Afectación a la Imagen Institucional',
        consequenceDescription: 'Publicar imágenes de terceros sin autorización y difamar la convivencia institucional infringe prohibiciones disciplinarias expresas sobre ciberacoso y uso de imagen.',
        articleRef: 'Cap. IV Prohibiciones y Redes Sociales',
        xpEarned: 0
      }
    ]
  },
  {
    id: 'caso-4-etapa-productiva',
    caseNumber: 4,
    title: 'Contrato de Aprendizaje y Cambio de Empresa',
    category: 'Etapa Productiva',
    badgeAwardedId: 'badge-debido-proceso',
    scenario: 'Llevas un mes en tu etapa productiva bajo Contrato de Aprendizaje en una empresa del sector. Otra compañía te ofrece más dinero por un trabajo informal y decides no volver a la empresa patrocinadora sin avisar ni realizar trámites.',
    apprenticeRole: 'Aprendiz en ejecución de Etapa Productiva',
    dilemma: '¿Qué consecuencia jurídica y reglamentaria tiene abandonar el contrato unilateralmente?',
    options: [
      {
        id: 'c4-opt-a',
        text: 'Renunciar verbalmente de un día para otro, asumiendo que el SENA te asignará inmediatamente otro contrato patrocinado.',
        isCorrect: false,
        consequenceTitle: 'Cancelación de Matrícula e Inhabilidad Nacional',
        consequenceDescription: 'La terminación unilateral del contrato de aprendizaje sin justa causa ni autorización del SENA conlleva a cancelación de matrícula e inhabilidad para acceder a nuevos contratos según la Ley 789.',
        articleRef: 'Cap. IV Terminación Unilateral Contrato de Aprendizaje',
        xpEarned: 20
      },
      {
        id: 'c4-opt-b',
        text: 'Consultar previamente con el Coordinador de Relaciones Corporativas y tu Instructor de Seguimiento, exponiendo las causales legales o mediación formal con la empresa antes de cualquier decisión.',
        isCorrect: true,
        consequenceTitle: 'Seguridad Jurídica y Responsabilidad Profesional',
        consequenceDescription: '¡Decisión acertada! El SENA brinda acompañamiento jurídico y formativo para verificar si existe incumplimiento del patrocinador o buscar una cesión concertada sin poner en riesgo tu titulación.',
        articleRef: 'Reglamento de Etapa Productiva y Ley 789 de 2002',
        xpEarned: 150
      },
      {
        id: 'c4-opt-c',
        text: 'Firmar simultáneamente dos contratos de aprendizaje en dos empresas distintas para cobrar doble apoyo.',
        isCorrect: false,
        consequenceTitle: 'Infracción Legal Grave ante el Ministerio del Trabajo',
        consequenceDescription: 'El sistema nacional Caprendizaje solo permite un contrato activo por aprendiz. Intentar duplicarlo es una infracción legal con anulación inmediata de ambos procesos.',
        articleRef: 'Normativa SGVA / Caprendizaje',
        xpEarned: 0
      }
    ]
  }
];

export const FINAL_EXAM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'fe-1',
    question: '¿Cuál es el acuerdo más reciente que reglamenta los derechos, deberes y debido proceso del Aprendiz SENA?',
    options: [
      'Acuerdo 009 de 2024 (que actualiza y deroga el Acuerdo 007 de 2012)',
      'Ley 100 de 1993',
      'Código Sustantivo del Trabajo de 1950',
      'Decreto 2420 de 2015'
    ],
    correctIndex: 0,
    explanation: 'El Consejo Directivo Nacional del SENA expidió el Acuerdo 009 de 2024 como el marco normativo actualizado del Aprendiz SENA.',
    articleRef: 'Encabezado Normativo SENA'
  },
  {
    id: 'fe-2',
    question: '¿Cuántos días hábiles tiene el aprendiz para presentar los soportes oficiales que justifiquen una inasistencia?',
    options: [
      'Hasta 15 días calendario',
      'Tres (3) días hábiles siguientes al hecho',
      'Treinta (30) días hábiles',
      'El día de la ceremonia de certificación'
    ],
    correctIndex: 1,
    explanation: 'El término improrrogable establecido en el Reglamento del Aprendiz es de tres (3) días hábiles con soporte legal válido (médico, judicial, etc.).',
    articleRef: 'Capítulo III - Justificación de Inasistencias'
  },
  {
    id: 'fe-3',
    question: '¿Cuál es la diferencia sustancial entre una Medida Formativa y una Sanción Disciplinaria?',
    options: [
      'Las medidas formativas son pedagógicas y no van a la hoja de vida; las sanciones son medidas oficiales registradas en el expediente',
      'No existe ninguna diferencia, ambas expulsan al aprendiz',
      'Las medidas formativas solo las impone la Policía Nacional',
      'Las sanciones disciplinarias solo aplican para instructores'
    ],
    correctIndex: 0,
    explanation: 'Las medidas formativas (llamado verbal, planes de mejoramiento) buscan reorientar pedagógicamente el desempeño sin constituir antecedente negativo en la hoja de vida.',
    articleRef: 'Capítulo VI y VII - Medidas y Sanciones'
  },
  {
    id: 'fe-4',
    question: '¿En qué plazo máximo debe un instructor evaluar y publicar la retroalimentación de una evidencia de aprendizaje entregada a tiempo?',
    options: [
      'Al finalizar el año escolar',
      'Máximo dentro de los cinco (5) días hábiles siguientes a la entrega',
      'En 48 horas sin excepción los domingos',
      'No existe plazo para los instructores'
    ],
    correctIndex: 1,
    explanation: 'El reglamento salvaguarda el derecho a una retroalimentación formativa oportuna dentro de los cinco (5) días hábiles siguientes.',
    articleRef: 'Capítulo II - Derechos del Aprendiz'
  },
  {
    id: 'fe-5',
    question: '¿Cuál de las siguientes conductas está catalogada expresamente como una Falta Gravísima?',
    options: [
      'Llegar 5 minutos tarde a una sesión por congestión vehicular justificada',
      'Portar armas, comercializar estupefacientes o cometer actos delictivos en el Centro de Formación',
      'Solicitar cambio de horario por motivos laborales',
      'Consultar libros en la biblioteca institucional'
    ],
    correctIndex: 1,
    explanation: 'El porte de armas, consumo o tráfico de sustancias psicoactivas y violencia física atentan severamente contra la comunidad y son faltas gravísimas.',
    articleRef: 'Capítulo IV y V - Clasificación de Faltas'
  },
  {
    id: 'fe-6',
    question: '¿Qué instancia institucional analiza las quejas disciplinarias y emite recomendaciones al Subdirector de Centro garantizando el derecho a la defensa?',
    options: [
      'El Comité de Cafetería y Transporte',
      'El Comité de Evaluación y Seguimiento',
      'El Ministerio del Trabajo directamente',
      'El centro de cómputo institucional'
    ],
    correctIndex: 1,
    explanation: 'El Comité de Evaluación y Seguimiento es el órgano colegiado que sesiona, escucha descargos y analiza pruebas para garantizar el debido proceso.',
    articleRef: 'Capítulo VII - Comité de Evaluación y Seguimiento'
  },
  {
    id: 'fe-7',
    question: '¿Cuál de las siguientes opciones describe el perfil del Aprendiz SENA consignado en los principios institucionales?',
    options: [
      'Trabajador pasivo que solo sigue instrucciones mecánicas',
      'Libre pensador, con capacidad crítica, solidario, líder, emprendedor y creativo',
      'Empleado exclusivo de una única empresa sin aspiraciones académicas',
      'Persona exenta de cumplir las leyes de la República de Colombia'
    ],
    correctIndex: 1,
    explanation: 'El modelo pedagógico del SENA forma seres humanos integrales: libres pensadores, críticos, solidarios, líderes y con vocación emprendedora.',
    articleRef: 'Capítulo I - Principios y Perfil del Aprendiz'
  },
  {
    id: 'fe-8',
    question: '¿Qué es el Plan de Mejoramiento Académico?',
    options: [
      'Una sanción económica donde el aprendiz debe pagar una multa en dinero',
      'Un documento concertado entre aprendiz e instructor para lograr los resultados de aprendizaje no alcanzados',
      'Un examen sorpresa sin previo aviso ni material de estudio',
      'La expulsión definitiva del Centro de Formación'
    ],
    correctIndex: 1,
    explanation: 'El Plan de Mejoramiento es una oportunidad pedagógica concertada con cronograma y evidencias para que el aprendiz alcance sus competencias.',
    articleRef: 'Capítulo VI - Medidas Formativas'
  },
  {
    id: 'fe-9',
    question: 'Si un aprendiz es sancionado con Cancelación de Matrícula por falta disciplinaria gravísima, ¿qué consecuencia adicional reglamentaria conlleva?',
    options: [
      'Inhabilidad para matricularse en el SENA entre 6 meses y 1 año según la gravedad de la falta',
      'Prisión automática en centro carcelario',
      'Ninguna, puede matricularse al día siguiente en otro centro',
      'Pérdida de la ciudadanía colombiana'
    ],
    correctIndex: 0,
    explanation: 'La cancelación de matrícula acarrea una inhabilidad temporal formal para ingresar nuevamente a programas de formación en el SENA.',
    articleRef: 'Capítulo VII - Sanciones y Efectos'
  },
  {
    id: 'fe-10',
    question: '¿Qué debe hacer un aprendiz antes de dar por terminado o retirarse de su Contrato de Aprendizaje en la etapa productiva?',
    options: [
      'Abandonar la empresa y bloquear las llamadas de los instructores',
      'Informar y concertar previamente con la Coordinación de Relaciones Corporativas y su Instructor de Seguimiento',
      'Esperar a que la empresa quiebre para no tener que justificar nada',
      'Cambiar de nombre en la Registraduría'
    ],
    correctIndex: 1,
    explanation: 'La etapa productiva y el contrato de aprendizaje exigen formalidad y visto bueno del SENA para evitar terminaciones unilaterales lesivas.',
    articleRef: 'Capítulo IV - Prohibiciones y Etapa Productiva'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'badge-identidad',
    title: 'Orgullo e Identidad SENA',
    description: 'Completaste el Módulo 1 sobre la misión, los símbolos y el perfil del aprendiz integral.',
    iconName: 'Compass',
    xpBonus: 100
  },
  {
    id: 'badge-derechos',
    title: 'Defensor de Derechos',
    description: 'Dominas los derechos académicos, el acceso a recursos y las garantías de bienestar.',
    iconName: 'ShieldCheck',
    xpBonus: 100
  },
  {
    id: 'badge-garante',
    title: 'Garante de Deberes',
    description: 'Conoces a fondo los compromisos de puntualidad, seguridad SST y respeto mutuo.',
    iconName: 'Award',
    xpBonus: 100
  },
  {
    id: 'badge-integridad',
    title: 'Integridad y Cero Plagio',
    description: 'Resolviste con ética intachable los dilemas de propiedad intelectual y honestidad formativa.',
    iconName: 'CheckCircle2',
    xpBonus: 150
  },
  {
    id: 'badge-debido-proceso',
    title: 'Estratega del Debido Proceso',
    description: 'Comprendes las etapas del Comité de Evaluación, descargos y recursos legales.',
    iconName: 'Scale',
    xpBonus: 150
  },
  {
    id: 'badge-certificado',
    title: 'Maestro del Reglamento SENA 2026',
    description: 'Aprobaste el examen final de inducción y desbloqueaste tu Certificado Oficial Institucional.',
    iconName: 'GraduationCap',
    xpBonus: 300
  }
];

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Acuerdo 009 de 2024',
    category: 'Normativa',
    definition: 'Marco regulatorio expedido por el Consejo Directivo Nacional que establece los derechos, deberes, prohibiciones y procedimientos para todos los aprendices del SENA.',
    regulationChapter: 'Generalidades'
  },
  {
    term: 'Aprendiz SENA',
    category: 'Institucional',
    definition: 'Toda persona matriculada formalmente en los programas de formación profesional integral en cualquiera de sus modalidades (presencial, virtual o combinada).',
    regulationChapter: 'Capítulo I'
  },
  {
    term: 'Etapa Lectiva',
    category: 'Formación',
    definition: 'Periodo de desarrollo curricular donde el aprendiz apropia conocimientos teóricos, conceptuales y procedimentales guiado por el equipo pedagógico.',
    regulationChapter: 'Capítulo I'
  },
  {
    term: 'Etapa Productiva',
    category: 'Formación',
    definition: 'Periodo donde el aprendiz aplica y fortalece sus competencias en entornos reales de producción o servicios mediante contrato de aprendizaje, proyecto productivo, etc.',
    regulationChapter: 'Capítulo I'
  },
  {
    term: 'Plan de Mejoramiento Académico',
    category: 'Medidas Formativas',
    definition: 'Instrumento pedagógico concertado entre instructor y aprendiz con actividades adicionales para alcanzar los resultados de aprendizaje no superados oportunamente.',
    regulationChapter: 'Capítulo VI'
  },
  {
    term: 'Comité de Evaluación y Seguimiento',
    category: 'Debido Proceso',
    definition: 'Instancia colegiada del Centro de Formación que analiza los informes sobre el desempeño académico o faltas disciplinarias y garantiza la defensa del aprendiz.',
    regulationChapter: 'Capítulo VII'
  },
  {
    term: 'Condicionamiento de Matrícula',
    category: 'Sanciones',
    definition: 'Sanción disciplinaria u orden académica que supedita la permanencia del aprendiz a un comportamiento intachable y cumplimiento estricto de compromisos formativos.',
    regulationChapter: 'Capítulo VII'
  },
  {
    term: 'Cancelación de Matrícula',
    category: 'Sanciones',
    definition: 'Sanción máxima que da por terminado el vínculo del aprendiz con el SENA por comisión de faltas graves o gravísimas, con inhabilidad temporal.',
    regulationChapter: 'Capítulo VII'
  },
  {
    term: 'Inasistencia Justificada',
    category: 'Deberes',
    definition: 'Ausencia respaldada por soporte legal (incapacidad médica EPS, calamidad doméstica demostrada, diligencia judicial) radicada dentro de 3 días hábiles.',
    regulationChapter: 'Capítulo III'
  },
  {
    term: 'Deserción',
    category: 'Permanencia',
    definition: 'Causal de cancelación que se configura por inasistencia injustificada durante tres (3) días hábiles consecutivos o cuando no se presentan evidencias durante periodos prolongados.',
    regulationChapter: 'Capítulo III'
  },
  {
    term: 'Bienestar al Aprendiz',
    category: 'Derechos',
    definition: 'Estrategia integral institucional orientada a potenciar la permanencia y graduación exitosa de los aprendices mediante salud, deporte, cultura y apoyos socioeconómicos.',
    regulationChapter: 'Capítulo II'
  },
  {
    term: 'Recurso de Reposición',
    category: 'Debido Proceso',
    definition: 'Mecanismo legal mediante el cual el aprendiz solicita al Subdirector de Centro reconsiderar, modificar o revocar una sanción impuesta dentro de los 5 días hábiles siguientes.',
    regulationChapter: 'Capítulo VII'
  }
];

export const DEFAULT_APPRENTICE: {
  fullName: string;
  documentType: import('../types/induction').DocumentType;
  documentNumber: string;
  studyProgram: string;
  fichaNumber: string;
  regional: string;
  trainingCenter: string;
} = {
  fullName: 'Alba Rocío Pedrozo Arrieta',
  documentType: 'Cédula de Ciudadanía',
  documentNumber: '1.045.789.412',
  studyProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  fichaNumber: '2874910',
  regional: 'Regional Distrito Capital',
  trainingCenter: 'Centro de Tecnologías de la Información y las Comunicaciones'
};
