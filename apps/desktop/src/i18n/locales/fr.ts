export default {
  common: {
    ready: "Prêt",
    clear: "Effacer",
    scanning: "Analyse...",
    results: "Résultats",
    findings: "Détections",
    character: "Caractère",
    codePoint: "Point de code",
    unicodeName: "Nom Unicode",
    scalarIndex: "Index scalaire",
    byteIndex: "Index d’octet",
    escaped: "Échappé",
    whyThisMatters: "Pourquoi c’est important",
    unknown: "Inconnu",
    yes: "Oui",
    no: "Non",
    left: "Gauche",
    right: "Droite",
    missing: "<absent>",
    changed: "Modifié",
    unchanged: "Inchangé",
    bytes: "Octets",
  },

  navigation: {
    workspace: "Espace de travail",
    dashboard: "Tableau de bord",
    scan: "Analyser le texte",
    files: "Fichiers",
    compare: "Comparer",
    inspector: "Inspecteur",
    normalize: "Normaliser",
    settings: "Paramètres",
  },

  header: {
    localAnalysis: "Analyse Unicode locale",
    engineReady: "Moteur prêt",
    language: "Langue",
  },

  dashboard: {
    title: "Tableau de bord",
    subtitle: "Vue d’ensemble de votre espace de sécurité Unicode.",
    quickAction: "Action rapide",
    scanTitle: "Analyser le texte",
    scanDescription:
      "Collez un texte suspect ou multilingue et inspectez les problèmes de sécurité Unicode.",
    openScanner: "Ouvrir l’analyseur",
    compareTitle: "Comparer des chaînes",
    compareDescription:
      "Comparez les valeurs Unicode, les formes de normalisation et les squelettes de caractères similaires.",
    compareText: "Comparer le texte",
    engineStatus: "État du moteur",
    mixedScripts: "Écritures mélangées",
    invisibleCharacters: "Caractères invisibles",
    bidiControls: "Contrôles bidi",
    unicodeConfusables: "Caractères Unicode similaires",
    suspiciousWhitespace: "Espaces suspects",
  },

  scan: {
    title: "Analyser le texte",
    subtitle:
      "Analysez le texte à la recherche de caractères, écritures et contrôles Unicode suspects.",
    input: "Entrée",
    textToAnalyze: "Texte à analyser",
    placeholder: "Collez ou saisissez du texte ici...",
    characters: "{count} caractères",
    scanButton: "Analyser le texte",
    complete: "Analyse terminée",
    noFindings: "Aucune détection",
    noFindingsDescription:
      "GlyphGuard n’a détecté aucun motif Unicode suspect dans ce texte.",
    findingCount: "{count} détection(s)",
    errors: {
      empty: "Saisissez du texte avant de lancer l’analyse.",
      failed: "GlyphGuard n’a pas pu analyser le texte.",
    },
  },

  compare: {
    title: "Comparer",
    subtitle:
      "Comparez deux chaînes avec la normalisation Unicode et les squelettes de caractères similaires.",
    comparing: "Comparaison...",
    compareButton: "Comparer les chaînes",
    binaryEqual: "Égalité binaire",
    nfcEqual: "Égalité NFC",
    nfkcEqual: "Égalité NFKC",
    skeletonEqual: "Squelettes identiques",
    leftSkeleton: "Squelette gauche",
    rightSkeleton: "Squelette droit",
    differences: "Différences",
    position: "Position {index}",
    noDifferences: "Aucune différence scalaire.",
    errors: {
      empty: "Saisissez au moins une chaîne.",
      failed: "GlyphGuard n’a pas pu comparer les chaînes.",
    },
  },

  inspector: {
    title: "Inspecteur",
    subtitle:
      "Inspectez les scalaires Unicode, points de code, octets et groupes de graphèmes.",
    inspecting: "Inspection...",
    inspectButton: "Inspecter le texte",
    scalars: "Scalaires",
    graphemes: "Groupes de graphèmes",
    scalarPosition: "scalaire {scalar} · octet {byte}",
    graphemeIndex: "Graphème {index}",
    scalarCount: "{count} scalaire(s)",
    byteCount: "{count} octet(s)",
    errors: {
      failed: "GlyphGuard n’a pas pu inspecter ce texte.",
    },
  },

  normalize: {
    title: "Normaliser",
    subtitle:
      "Inspectez les représentations NFC, NFD, NFKC et NFKD.",
    normalizing: "Normalisation...",
    normalizeButton: "Normaliser le texte",
    original: "Original",
    errors: {
      failed: "GlyphGuard n’a pas pu normaliser ce texte.",
    },
  },

  files: {
    title: "Fichiers",
    subtitle:
      "Analysez des fichiers UTF-8 individuels ou des répertoires entiers récursivement.",
    dropTitle: "Déposez un fichier ou un dossier",
    dropDescription:
      "Faites glisser du contenu depuis l’Explorateur Windows directement dans GlyphGuard.",
    selectFile: "Sélectionner un fichier",
    selectFolder: "Sélectionner un dossier",
    dialogFile: "Sélectionnez un fichier à analyser",
    dialogDirectory: "Sélectionnez un répertoire à analyser",
    fileComplete: "Analyse du fichier terminée.",
    directoryComplete: "Analyse du répertoire terminée.",
    scanFailed: "Échec de l’analyse",
    file: "Fichier",
    directory: "Répertoire",
    encoding: "Encodage",
    noFindings: "Aucune détection Unicode suspecte.",
    bytePosition: "octet {index}",
    discovered: "Découverts",
    scanned: "Analysés",
    skipped: "Ignorés",
    suspiciousFiles: "Fichiers suspects",
    filesWithFindings: "Fichiers avec détections",
    suspiciousFile: "Fichier suspect",
    findingCount: "{count} détection(s)",
    skippedFiles: "Fichiers ignorés",
    directoryClean:
      "Aucune détection Unicode suspecte n’a été trouvée dans les fichiers analysés.",
  },

  settings: {
    title: "Paramètres",
    subtitle: "Configurez l’expérience GlyphGuard Desktop.",
    language: "Langue",
    languageTitle: "Langue de l’interface",
    languageDescription:
      "Choisissez la langue utilisée par l’interface GlyphGuard.",
    detectionRules: "Règles de détection",
    securityScanning: "Analyse de sécurité",
    appearance: "Apparence",
    theme: "Thème",
    system: "Système",
    dark: "Sombre",
    light: "Clair",
    rulesNote:
      "Les options des règles sont uniquement visuelles pour le moment. La configuration persistante sera ajoutée ultérieurement.",
    themeNote:
      "Le mode sombre est actuellement l’interface active de GlyphGuard.",
  },
};