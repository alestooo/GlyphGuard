export default {
  common: {
    ready: "Listo",
    clear: "Limpiar",
    scanning: "Analizando...",
    results: "Resultados",
    findings: "Hallazgos",
    character: "Carácter",
    codePoint: "Punto de código",
    unicodeName: "Nombre Unicode",
    scalarIndex: "Índice escalar",
    byteIndex: "Índice de byte",
    escaped: "Escapado",
    whyThisMatters: "Por qué importa",
    unknown: "Desconocido",
    yes: "Sí",
    no: "No",
    left: "Izquierda",
    right: "Derecha",
    missing: "<ausente>",
    changed: "Modificado",
    unchanged: "Sin cambios",
    bytes: "Bytes",
  },

  navigation: {
    workspace: "Espacio de trabajo",
    dashboard: "Panel",
    scan: "Analizar texto",
    files: "Archivos",
    compare: "Comparar",
    inspector: "Inspector",
    normalize: "Normalizar",
    settings: "Configuración",
  },

  header: {
    localAnalysis: "Análisis Unicode local",
    engineReady: "Motor listo",
    language: "Idioma",
  },

  dashboard: {
    title: "Panel",
    subtitle: "Resumen de tu espacio de seguridad Unicode.",
    quickAction: "Acción rápida",
    scanTitle: "Analizar texto",
    scanDescription:
      "Pega texto sospechoso o multilingüe e inspecciona posibles hallazgos de seguridad Unicode.",
    openScanner: "Abrir analizador",
    compareTitle: "Comparar textos",
    compareDescription:
      "Compara valores Unicode, formas de normalización y esqueletos de caracteres confundibles.",
    compareText: "Comparar texto",
    engineStatus: "Estado del motor",
    mixedScripts: "Mezcla de escrituras",
    invisibleCharacters: "Caracteres invisibles",
    bidiControls: "Controles bidi",
    unicodeConfusables: "Caracteres Unicode confundibles",
    suspiciousWhitespace: "Espacios sospechosos",
  },

  scan: {
    title: "Analizar texto",
    subtitle:
      "Analiza texto en busca de caracteres, escrituras y controles Unicode sospechosos.",
    input: "Entrada",
    textToAnalyze: "Texto para analizar",
    placeholder: "Pega o escribe texto aquí...",
    characters: "{count} caracteres",
    scanButton: "Analizar texto",
    complete: "Análisis completado",
    noFindings: "Sin hallazgos",
    noFindingsDescription:
      "GlyphGuard no detectó patrones Unicode sospechosos en este texto.",
    findingCount: "{count} hallazgos",
    errors: {
      empty: "Introduce texto antes de ejecutar el análisis.",
      failed: "GlyphGuard no pudo analizar el texto.",
    },
  },

  compare: {
    title: "Comparar",
    subtitle:
      "Compara dos textos utilizando normalización Unicode y esqueletos confundibles.",
    comparing: "Comparando...",
    compareButton: "Comparar textos",
    binaryEqual: "Igualdad binaria",
    nfcEqual: "Igualdad NFC",
    nfkcEqual: "Igualdad NFKC",
    skeletonEqual: "Igualdad de esqueletos",
    leftSkeleton: "Esqueleto izquierdo",
    rightSkeleton: "Esqueleto derecho",
    differences: "Diferencias",
    position: "Posición {index}",
    noDifferences: "No hay diferencias escalares.",
    errors: {
      empty: "Introduce al menos un texto.",
      failed: "GlyphGuard no pudo comparar los textos.",
    },
  },

  inspector: {
    title: "Inspector",
    subtitle:
      "Inspecciona escalares Unicode, puntos de código, bytes y clústeres de grafemas.",
    inspecting: "Inspeccionando...",
    inspectButton: "Inspeccionar texto",
    scalars: "Escalares",
    graphemes: "Clústeres de grafemas",
    scalarPosition: "escalar {scalar} · byte {byte}",
    graphemeIndex: "Grafema {index}",
    scalarCount: "{count} escalar(es)",
    byteCount: "{count} byte(s)",
    errors: {
      failed: "GlyphGuard no pudo inspeccionar este texto.",
    },
  },

  normalize: {
    title: "Normalizar",
    subtitle:
      "Inspecciona las representaciones NFC, NFD, NFKC y NFKD.",
    normalizing: "Normalizando...",
    normalizeButton: "Normalizar texto",
    original: "Original",
    errors: {
      failed: "GlyphGuard no pudo normalizar este texto.",
    },
  },

  files: {
    title: "Archivos",
    subtitle:
      "Analiza archivos UTF-8 individuales o directorios completos de forma recursiva.",
    dropTitle: "Arrastra un archivo o carpeta",
    dropDescription:
      "Arrastra contenido desde el Explorador de Windows directamente a GlyphGuard.",
    selectFile: "Seleccionar archivo",
    selectFolder: "Seleccionar carpeta",
    dialogFile: "Selecciona un archivo para analizar",
    dialogDirectory: "Selecciona un directorio para analizar",
    fileComplete: "Análisis del archivo completado.",
    directoryComplete: "Análisis del directorio completado.",
    scanFailed: "El análisis falló",
    file: "Archivo",
    directory: "Directorio",
    encoding: "Codificación",
    noFindings: "No se detectaron hallazgos Unicode sospechosos.",
    bytePosition: "byte {index}",
    discovered: "Descubiertos",
    scanned: "Analizados",
    skipped: "Omitidos",
    suspiciousFiles: "Archivos sospechosos",
    filesWithFindings: "Archivos con hallazgos",
    suspiciousFile: "Archivo sospechoso",
    findingCount: "{count} hallazgo(s)",
    skippedFiles: "Archivos omitidos",
    directoryClean:
      "No se detectaron hallazgos Unicode sospechosos en los archivos analizados.",
  },

  settings: {
    title: "Configuración",
    subtitle: "Configura la experiencia de GlyphGuard Desktop.",
    language: "Idioma",
    languageTitle: "Idioma de la interfaz",
    languageDescription:
      "Selecciona el idioma utilizado por la interfaz de GlyphGuard.",
    detectionRules: "Reglas de detección",
    securityScanning: "Análisis de seguridad",
    appearance: "Apariencia",
    theme: "Tema",
    system: "Sistema",
    dark: "Oscuro",
    light: "Claro",
    rulesNote:
      "Los interruptores de reglas son visuales por ahora. La configuración persistente se conectará posteriormente.",
    themeNote:
      "El modo oscuro es actualmente la interfaz activa de GlyphGuard.",
  },
};