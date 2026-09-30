export default {
  common: {
    ready: "Pronto",
    clear: "Cancella",
    scanning: "Analisi...",
    results: "Risultati",
    findings: "Rilevamenti",
    character: "Carattere",
    codePoint: "Punto di codice",
    unicodeName: "Nome Unicode",
    scalarIndex: "Indice scalare",
    byteIndex: "Indice byte",
    escaped: "Escape",
    whyThisMatters: "Perché è importante",
    unknown: "Sconosciuto",
    yes: "Sì",
    no: "No",
    left: "Sinistra",
    right: "Destra",
    missing: "<mancante>",
    changed: "Modificato",
    unchanged: "Invariato",
    bytes: "Byte",
  },

  navigation: {
    workspace: "Area di lavoro",
    dashboard: "Dashboard",
    scan: "Analizza testo",
    files: "File",
    compare: "Confronta",
    inspector: "Ispettore",
    normalize: "Normalizza",
    settings: "Impostazioni",
  },

  header: {
    localAnalysis: "Analisi Unicode locale",
    engineReady: "Motore pronto",
    language: "Lingua",
  },

  dashboard: {
    title: "Dashboard",
    subtitle: "Panoramica del tuo ambiente di sicurezza Unicode.",
    quickAction: "Azione rapida",
    scanTitle: "Analizza testo",
    scanDescription:
      "Incolla testo sospetto o multilingue e controlla eventuali problemi di sicurezza Unicode.",
    openScanner: "Apri analizzatore",
    compareTitle: "Confronta stringhe",
    compareDescription:
      "Confronta valori Unicode, forme di normalizzazione e scheletri di caratteri confondibili.",
    compareText: "Confronta testo",
    engineStatus: "Stato del motore",
    mixedScripts: "Script misti",
    invisibleCharacters: "Caratteri invisibili",
    bidiControls: "Controlli bidi",
    unicodeConfusables: "Caratteri Unicode confondibili",
    suspiciousWhitespace: "Spazi sospetti",
  },

  scan: {
    title: "Analizza testo",
    subtitle:
      "Analizza il testo alla ricerca di caratteri, script e controlli Unicode sospetti.",
    input: "Input",
    textToAnalyze: "Testo da analizzare",
    placeholder: "Incolla o digita il testo qui...",
    characters: "{count} caratteri",
    scanButton: "Analizza testo",
    complete: "Analisi completata",
    noFindings: "Nessun rilevamento",
    noFindingsDescription:
      "GlyphGuard non ha rilevato pattern Unicode sospetti in questo testo.",
    findingCount: "{count} rilevamento/i",
    errors: {
      empty: "Inserisci del testo prima di avviare l’analisi.",
      failed: "GlyphGuard non è riuscito ad analizzare il testo.",
    },
  },

  compare: {
    title: "Confronta",
    subtitle:
      "Confronta due stringhe usando la normalizzazione Unicode e gli scheletri confondibili.",
    comparing: "Confronto...",
    compareButton: "Confronta stringhe",
    binaryEqual: "Uguaglianza binaria",
    nfcEqual: "Uguaglianza NFC",
    nfkcEqual: "Uguaglianza NFKC",
    skeletonEqual: "Scheletri uguali",
    leftSkeleton: "Scheletro sinistro",
    rightSkeleton: "Scheletro destro",
    differences: "Differenze",
    position: "Posizione {index}",
    noDifferences: "Nessuna differenza scalare.",
    errors: {
      empty: "Inserisci almeno una stringa.",
      failed: "GlyphGuard non è riuscito a confrontare le stringhe.",
    },
  },

  inspector: {
    title: "Ispettore",
    subtitle:
      "Ispeziona scalari Unicode, punti di codice, byte e cluster di grafemi.",
    inspecting: "Ispezione...",
    inspectButton: "Ispeziona testo",
    scalars: "Scalari",
    graphemes: "Cluster di grafemi",
    scalarPosition: "scalare {scalar} · byte {byte}",
    graphemeIndex: "Grafema {index}",
    scalarCount: "{count} scalare/i",
    byteCount: "{count} byte",
    errors: {
      failed: "GlyphGuard non è riuscito a ispezionare questo testo.",
    },
  },

  normalize: {
    title: "Normalizza",
    subtitle:
      "Ispeziona le rappresentazioni NFC, NFD, NFKC e NFKD.",
    normalizing: "Normalizzazione...",
    normalizeButton: "Normalizza testo",
    original: "Originale",
    errors: {
      failed: "GlyphGuard non è riuscito a normalizzare questo testo.",
    },
  },

  files: {
    title: "File",
    subtitle:
      "Analizza singoli file UTF-8 o intere directory in modo ricorsivo.",
    dropTitle: "Trascina un file o una cartella",
    dropDescription:
      "Trascina contenuti da Esplora file di Windows direttamente in GlyphGuard.",
    selectFile: "Seleziona file",
    selectFolder: "Seleziona cartella",
    dialogFile: "Seleziona un file da analizzare",
    dialogDirectory: "Seleziona una directory da analizzare",
    fileComplete: "Analisi del file completata.",
    directoryComplete: "Analisi della directory completata.",
    scanFailed: "Analisi non riuscita",
    file: "File",
    directory: "Directory",
    encoding: "Codifica",
    noFindings: "Nessun rilevamento Unicode sospetto.",
    bytePosition: "byte {index}",
    discovered: "Trovati",
    scanned: "Analizzati",
    skipped: "Ignorati",
    suspiciousFiles: "File sospetti",
    filesWithFindings: "File con rilevamenti",
    suspiciousFile: "File sospetto",
    findingCount: "{count} rilevamento/i",
    skippedFiles: "File ignorati",
    directoryClean:
      "Non sono stati rilevati problemi Unicode sospetti nei file analizzati.",
  },

  settings: {
    title: "Impostazioni",
    subtitle: "Configura l’esperienza di GlyphGuard Desktop.",
    language: "Lingua",
    languageTitle: "Lingua dell’interfaccia",
    languageDescription:
      "Scegli la lingua utilizzata dall’interfaccia di GlyphGuard.",
    detectionRules: "Regole di rilevamento",
    securityScanning: "Analisi di sicurezza",
    appearance: "Aspetto",
    theme: "Tema",
    system: "Sistema",
    dark: "Scuro",
    light: "Chiaro",
    rulesNote:
      "Gli interruttori delle regole sono per ora solo visivi. La configurazione persistente verrà aggiunta successivamente.",
    themeNote:
      "La modalità scura è attualmente l’interfaccia attiva di GlyphGuard.",
  },
};