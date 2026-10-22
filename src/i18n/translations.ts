export type AppLanguage = 'es' | 'en';

export interface Translations {
  // Navigation & Header
  nav: {
    brandTitle: string;
    brandSubtitle: string;
    modules: string;
    simulator: string;
    exam: string;
    certificate: string;
    glossary: string;
    translator: string;
    instructorPanel: string;
    exitRoles: string;
    previewLearner: string;
    activeInstructor: string;
    activeLearner: string;
    accessInstructor: string;
    changeLanguageTooltip: string;
    toggleThemeTooltip: string;
    viewProfileTooltip: string;
  };
  // Landing Page
  landing: {
    badge: string;
    title: string;
    subtitle: string;
    instructorCard: {
      badgeTag: string;
      protectedBadge: string;
      title: string;
      description: string;
      perk1: string;
      perk2: string;
      perk3: string;
      button: string;
    };
    apprenticeCard: {
      badgeTag: string;
      freeBadge: string;
      title: string;
      description: string;
      perk1: string;
      perk2: string;
      perk3: string;
      button: string;
    };
    instructorAuth: {
      title: string;
      subtitle: string;
      back: string;
      noticeTitle: string;
      noticeText: string;
      keyLabel: string;
      keyPlaceholder: string;
      cancel: string;
      submit: string;
      errorRequired: string;
      errorInvalid: string;
      showKey: string;
      hideKey: string;
    };
    characterization: {
      title: string;
      subtitle: string;
      back: string;
      fullNameLabel: string;
      fullNamePlaceholder: string;
      docTypeLabel: string;
      docNumberLabel: string;
      docNumberPlaceholder: string;
      fichaLabel: string;
      fichaPlaceholder: string;
      programLabel: string;
      programPlaceholder: string;
      regionalLabel: string;
      regionalPlaceholder: string;
      centerLabel: string;
      centerPlaceholder: string;
      cancel: string;
      submit: string;
      errorName: string;
      errorDoc: string;
      errorFicha: string;
    };
    footer: string;
  };
  // Hero Section
  hero: {
    kickerSena: string;
    kickerAcuerdo: string;
    kickerFpi: string;
    title: string;
    welcomePrefix: string;
    welcomeBody: string;
    btnModules: string;
    btnSimulator: string;
    level: string;
    overallProgress: string;
    certified: string;
    inProgress: string;
    lessonsRatio: string;
    casesRatio: string;
    examStatus: string;
  };
  // Writing & Translation Tool
  translator: {
    title: string;
    subtitle: string;
    switchMode: string;
    enToEs: string;
    esToEn: string;
    inputPlaceholder: string;
    outputPlaceholder: string;
    translateBtn: string;
    clearBtn: string;
    copyBtn: string;
    copied: string;
    quickVocabularyTitle: string;
    quickVocabularySubtitle: string;
    characterCount: string;
    swapLanguages: string;
  };
  // Modals & General
  common: {
    close: string;
    cancel: string;
    save: string;
    verified: string;
    pending: string;
    retry: string;
    downloadPdf: string;
  };
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  es: {
    nav: {
      brandTitle: 'SENA Inducción',
      brandSubtitle: 'Reglamento del Aprendiz',
      modules: 'Módulos',
      simulator: 'Simulador de Casos',
      exam: 'Examen Final',
      certificate: 'Certificado',
      glossary: 'Glosario & Normas',
      translator: 'Escribir & Traducir',
      instructorPanel: 'Panel Instructor',
      exitRoles: 'Salir / Roles',
      previewLearner: '⇄ Vista Aprendiz',
      activeInstructor: 'Instructor',
      activeLearner: 'Aprendiz',
      accessInstructor: '⇄ Módulo Instructor',
      changeLanguageTooltip: 'Cambiar a idioma Inglés (Switch to English)',
      toggleThemeTooltip: 'Cambiar modo oscuro/claro',
      viewProfileTooltip: 'Ver perfil del aprendiz'
    },
    landing: {
      badge: 'Plataforma Oficial de Inducción',
      title: 'Selecciona tu Rol para Ingresar al Prototipo',
      subtitle: 'Diferenciación estricta de perfiles. El Módulo de Instructor está protegido mediante clave de seguridad institucional; el Aprendiz diligencia sus datos de caracterización sin clave.',
      instructorCard: {
        badgeTag: 'Perfil Docente',
        protectedBadge: 'Requiere Clave',
        title: 'Soy Instructor(a) SENA',
        description: 'Acceso exclusivo para docentes. Administra la cohorte, sincroniza datos con Google Drive, exporta reportes y genera el enlace para aprendices.',
        perk1: 'Privilegio total de sincronización Google Sheets',
        perk2: 'Matriz de seguimiento y calificaciones de ficha',
        perk3: 'Generador de enlace institucional para aprendices',
        button: 'Ingresar con Clave al Módulo'
      },
      apprenticeCard: {
        badgeTag: 'Formación Profesional',
        freeBadge: 'Sin Clave · Caracterización',
        title: 'Soy Aprendiz SENA',
        description: 'Diligencia tus datos de caracterización para iniciar tu inducción al Reglamento del Aprendiz (Acuerdo 0009 de 2024), retos prácticos y examen de certificación.',
        perk1: '5 módulos oficiales interactivos del Acuerdo 009',
        perk2: 'Simulador de casos reales y toma de decisiones',
        perk3: 'Examen final y Certificado Oficial descargable',
        button: 'Llenar Caracterización e Ingresar'
      },
      instructorAuth: {
        title: 'Clave de Acceso — Módulo Instructor',
        subtitle: 'Módulo restringido únicamente a instructores autorizados',
        back: '← Volver',
        noticeTitle: 'Autenticación de Seguridad Requerida',
        noticeText: 'Ingresa la clave de instructor institucional para habilitar los privilegios de administración, sincronización con Google Drive y seguimiento de aprendices.',
        keyLabel: 'Clave de Acceso de Instructor *',
        keyPlaceholder: 'Ingresa tu clave de acceso',
        cancel: 'Cancelar',
        submit: 'Validar y Entrar al Módulo',
        errorRequired: 'Por favor ingresa la clave de acceso de instructor.',
        errorInvalid: 'Clave incorrecta. Por favor verifica e ingresa la clave asignada de instructor.',
        showKey: 'Mostrar clave',
        hideKey: 'Ocultar clave'
      },
      characterization: {
        title: 'Caracterización del Aprendiz SENA',
        subtitle: 'Estos datos figurarán en tu Certificado Oficial de Inducción',
        back: '← Volver a roles',
        fullNameLabel: 'Nombre Completo del Aprendiz *',
        fullNamePlaceholder: 'Ej. Alba Rocío Pedrozo Arrieta',
        docTypeLabel: 'Tipo de Documento *',
        docNumberLabel: 'Número de Documento *',
        docNumberPlaceholder: 'Ej. 1045789412',
        fichaLabel: 'Número de Ficha *',
        fichaPlaceholder: 'Ej. 2874910',
        programLabel: 'Programa de Formación *',
        programPlaceholder: 'Ej. Tecnología en Análisis y Desarrollo de Software (ADSO)',
        regionalLabel: 'Regional SENA *',
        regionalPlaceholder: 'Ej. Regional Distrito Capital',
        centerLabel: 'Centro de Formación *',
        centerPlaceholder: 'Ej. Centro de Tecnologías de la Información',
        cancel: 'Cancelar',
        submit: 'Comenzar Inducción Oficial',
        errorName: 'Por favor ingresa tu nombre completo.',
        errorDoc: 'Por favor ingresa tu número de documento.',
        errorFicha: 'Por favor ingresa el número de ficha.'
      },
      footer: 'Servicio Nacional de Aprendizaje — SENA · Inducción Virtual al Reglamento del Aprendiz (Acuerdo 0009 de 2024)'
    },
    hero: {
      kickerSena: 'SENA Colombia',
      kickerAcuerdo: 'Acuerdo 009 de 2024',
      kickerFpi: 'Formación Profesional Integral',
      title: 'Inducción al Reglamento del Aprendiz SENA',
      welcomePrefix: 'Bienvenido(a),',
      welcomeBody: 'Domina tus derechos fundamentales, compromisos formativos, medidas preventivas y el debido proceso institucional a través de retos prácticos interactivos y obtén tu certificación oficial.',
      btnModules: 'Explorar Módulos de Aprendizaje',
      btnSimulator: 'Resolver Casos Éticos',
      level: 'Nivel',
      overallProgress: 'Progreso General',
      certified: 'Certificado Emitido',
      inProgress: 'En Formación',
      lessonsRatio: 'Lecciones',
      casesRatio: 'Casos Resueltos',
      examStatus: 'Examen Final'
    },
    translator: {
      title: 'Herramienta de Escritura y Traducción Bilingüe',
      subtitle: 'Escribe y traduce textos, deberes y términos técnicos entre Inglés y Español para la formación profesional SENA.',
      switchMode: 'Modo de Traducción',
      enToEs: 'Inglés ➔ Español',
      esToEn: 'Español ➔ Inglés',
      inputPlaceholder: 'Escribe o pega aquí el texto en inglés que deseas traducir a español...',
      outputPlaceholder: 'La traducción al español aparecerá aquí...',
      translateBtn: 'Traducir Texto',
      clearBtn: 'Limpiar',
      copyBtn: 'Copiar',
      copied: '¡Copiado!',
      quickVocabularyTitle: 'Vocabulario Técnico Institucional Clave',
      quickVocabularySubtitle: 'Haz clic en cualquier término para insertarlo y redactar rápidamente:',
      characterCount: 'caracteres',
      swapLanguages: 'Intercambiar Idiomas'
    },
    common: {
      close: 'Cerrar',
      cancel: 'Cancelar',
      save: 'Guardar',
      verified: 'Verificado',
      pending: 'Pendiente',
      retry: 'Reintentar',
      downloadPdf: 'Descargar en PDF'
    }
  },
  en: {
    nav: {
      brandTitle: 'SENA Induction',
      brandSubtitle: 'Apprentice Regulations',
      modules: 'Modules',
      simulator: 'Case Simulator',
      exam: 'Final Exam',
      certificate: 'Certificate',
      glossary: 'Glossary & Rules',
      translator: 'Write & Translate',
      instructorPanel: 'Instructor Panel',
      exitRoles: 'Exit / Roles',
      previewLearner: '⇄ Learner View',
      activeInstructor: 'Instructor',
      activeLearner: 'Learner',
      accessInstructor: '⇄ Instructor Module',
      changeLanguageTooltip: 'Switch to Spanish (Cambiar a Español)',
      toggleThemeTooltip: 'Toggle dark/light mode',
      viewProfileTooltip: 'View apprentice profile'
    },
    landing: {
      badge: 'Official Induction Platform',
      title: 'Select Your Role to Enter the Prototype',
      subtitle: 'Strict profile separation. The Instructor Module is secured by institutional key; Apprentices complete their profile characterization without any password.',
      instructorCard: {
        badgeTag: 'Faculty Profile',
        protectedBadge: 'Key Required',
        title: 'I am a SENA Instructor',
        description: 'Exclusive faculty access. Manage cohorts, sync data with Google Drive, export performance reports and generate shareable links for learners.',
        perk1: 'Full Google Sheets synchronization privileges',
        perk2: 'Cohort tracking matrix and grading overview',
        perk3: 'Official shareable link generator for apprentices',
        button: 'Enter Module with Password'
      },
      apprenticeCard: {
        badgeTag: 'Vocational Training',
        freeBadge: 'No Key · Characterization',
        title: 'I am a SENA Apprentice',
        description: 'Fill in your characterization information to start your induction on the Apprentice Regulations (Agreement 0009 of 2024), case challenges and certification exam.',
        perk1: '5 official interactive modules from Agreement 009',
        perk2: 'Real-world ethical dilemma & case simulator',
        perk3: 'Final exam and downloadable Official Certificate',
        button: 'Fill Profile & Enter Induction'
      },
      instructorAuth: {
        title: 'Access Key — Instructor Module',
        subtitle: 'Restricted area for authorized SENA instructors only',
        back: '← Back',
        noticeTitle: 'Security Authentication Required',
        noticeText: 'Please enter the institutional instructor key to enable administrative privileges, Google Drive synchronization, and cohort monitoring.',
        keyLabel: 'Instructor Access Key *',
        keyPlaceholder: 'Enter your access key',
        cancel: 'Cancel',
        submit: 'Validate and Enter Module',
        errorRequired: 'Please enter the instructor access key.',
        errorInvalid: 'Incorrect key. Please verify and enter the assigned instructor key.',
        showKey: 'Show key',
        hideKey: 'Hide key'
      },
      characterization: {
        title: 'SENA Apprentice Characterization',
        subtitle: 'These details will appear on your Official Induction Certificate',
        back: '← Back to roles',
        fullNameLabel: 'Apprentice Full Name *',
        fullNamePlaceholder: 'e.g., Alba Rocío Pedrozo Arrieta',
        docTypeLabel: 'Document Type *',
        docNumberLabel: 'ID Number *',
        docNumberPlaceholder: 'e.g., 1045789412',
        fichaLabel: 'Cohort / Ficha Number *',
        fichaPlaceholder: 'e.g., 2874910',
        programLabel: 'Training Program *',
        programPlaceholder: 'e.g., Software Analysis and Development Technology (ADSO)',
        regionalLabel: 'SENA Regional Office *',
        regionalPlaceholder: 'e.g., Regional Distrito Capital',
        centerLabel: 'Training Center *',
        centerPlaceholder: 'e.g., Center for Information and Communication Technologies',
        cancel: 'Cancel',
        submit: 'Start Official Induction',
        errorName: 'Please enter your full name.',
        errorDoc: 'Please enter your identification number.',
        errorFicha: 'Please enter your ficha number.'
      },
      footer: 'National Training Service — SENA · Virtual Induction to Apprentice Regulations (Agreement 0009 of 2024)'
    },
    hero: {
      kickerSena: 'SENA Colombia',
      kickerAcuerdo: 'Agreement 009 of 2024',
      kickerFpi: 'Comprehensive Vocational Training',
      title: 'Induction to the SENA Apprentice Regulations',
      welcomePrefix: 'Welcome,',
      welcomeBody: 'Master your fundamental rights, educational commitments, preventive measures, and institutional due process through interactive challenges, and achieve your official certificate.',
      btnModules: 'Explore Learning Modules',
      btnSimulator: 'Solve Ethical Cases',
      level: 'Level',
      overallProgress: 'Overall Progress',
      certified: 'Certificate Issued',
      inProgress: 'In Progress',
      lessonsRatio: 'Lessons',
      casesRatio: 'Cases Solved',
      examStatus: 'Final Exam'
    },
    translator: {
      title: 'Bilingual Writing & Translation Tool',
      subtitle: 'Write and translate technical vocabulary, commitments, and texts between English and Spanish for SENA vocational training.',
      switchMode: 'Translation Mode',
      enToEs: 'English ➔ Spanish',
      esToEn: 'Spanish ➔ English',
      inputPlaceholder: 'Type or paste your text in English here to translate into Spanish...',
      outputPlaceholder: 'The translated Spanish text will appear here...',
      translateBtn: 'Translate Text',
      clearBtn: 'Clear',
      copyBtn: 'Copy',
      copied: 'Copied!',
      quickVocabularyTitle: 'Key Institutional Technical Vocabulary',
      quickVocabularySubtitle: 'Click on any term to insert it and draft your response quickly:',
      characterCount: 'characters',
      swapLanguages: 'Swap Languages'
    },
    common: {
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      verified: 'Verified',
      pending: 'Pending',
      retry: 'Retry',
      downloadPdf: 'Download PDF'
    }
  }
};
