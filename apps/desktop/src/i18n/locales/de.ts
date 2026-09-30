export default {
  common: {
    ready: "Bereit",
    clear: "Leeren",
    scanning: "Wird geprüft...",
    results: "Ergebnisse",
    findings: "Befunde",
    character: "Zeichen",
    codePoint: "Codepunkt",
    unicodeName: "Unicode-Name",
    scalarIndex: "Skalarindex",
    byteIndex: "Byte-Index",
    escaped: "Escape-Darstellung",
    whyThisMatters: "Warum das wichtig ist",
    unknown: "Unbekannt",
    yes: "Ja",
    no: "Nein",
    left: "Links",
    right: "Rechts",
    missing: "<fehlt>",
    changed: "Geändert",
    unchanged: "Unverändert",
    bytes: "Bytes",
  },

  navigation: {
    workspace: "Arbeitsbereich",
    dashboard: "Übersicht",
    scan: "Text prüfen",
    files: "Dateien",
    compare: "Vergleichen",
    inspector: "Inspektor",
    normalize: "Normalisieren",
    settings: "Einstellungen",
  },

  header: {
    localAnalysis: "Lokale Unicode-Analyse",
    engineReady: "Engine bereit",
    language: "Sprache",
  },

  dashboard: {
    title: "Übersicht",
    subtitle: "Übersicht über Ihren Unicode-Sicherheitsarbeitsbereich.",
    quickAction: "Schnellaktion",
    scanTitle: "Text prüfen",
    scanDescription:
      "Fügen Sie verdächtigen oder mehrsprachigen Text ein und prüfen Sie Unicode-Sicherheitsbefunde.",
    openScanner: "Scanner öffnen",
    compareTitle: "Zeichenfolgen vergleichen",
    compareDescription:
      "Vergleichen Sie Unicode-Werte, Normalisierungsformen und Confusable-Skeletons.",
    compareText: "Text vergleichen",
    engineStatus: "Engine-Status",
    mixedScripts: "Gemischte Schriftsysteme",
    invisibleCharacters: "Unsichtbare Zeichen",
    bidiControls: "Bidi-Steuerzeichen",
    unicodeConfusables: "Unicode-Verwechslungszeichen",
    suspiciousWhitespace: "Verdächtige Leerzeichen",
  },

  scan: {
    title: "Text prüfen",
    subtitle:
      "Prüfen Sie Text auf verdächtige Unicode-Zeichen, Schriftsysteme und Steuerzeichen.",
    input: "Eingabe",
    textToAnalyze: "Zu analysierender Text",
    placeholder: "Text hier einfügen oder eingeben...",
    characters: "{count} Zeichen",
    scanButton: "Text prüfen",
    complete: "Analyse abgeschlossen",
    noFindings: "Keine Befunde",
    noFindingsDescription:
      "GlyphGuard hat in diesem Text keine verdächtigen Unicode-Muster erkannt.",
    findingCount: "{count} Befund(e)",
    errors: {
      empty: "Geben Sie vor der Analyse Text ein.",
      failed: "GlyphGuard konnte den Text nicht analysieren.",
    },
  },

  compare: {
    title: "Vergleichen",
    subtitle:
      "Vergleichen Sie zwei Zeichenfolgen mithilfe von Unicode-Normalisierung und Confusable-Skeletons.",
    comparing: "Vergleich läuft...",
    compareButton: "Zeichenfolgen vergleichen",
    binaryEqual: "Binär identisch",
    nfcEqual: "NFC identisch",
    nfkcEqual: "NFKC identisch",
    skeletonEqual: "Skeleton identisch",
    leftSkeleton: "Linkes Skeleton",
    rightSkeleton: "Rechtes Skeleton",
    differences: "Unterschiede",
    position: "Position {index}",
    noDifferences: "Keine Skalarunterschiede.",
    errors: {
      empty: "Geben Sie mindestens eine Zeichenfolge ein.",
      failed: "GlyphGuard konnte die Zeichenfolgen nicht vergleichen.",
    },
  },

  inspector: {
    title: "Inspektor",
    subtitle:
      "Untersuchen Sie Unicode-Skalare, Codepunkte, Bytes und Graphemcluster.",
    inspecting: "Wird untersucht...",
    inspectButton: "Text untersuchen",
    scalars: "Skalare",
    graphemes: "Graphemcluster",
    scalarPosition: "Skalar {scalar} · Byte {byte}",
    graphemeIndex: "Graphem {index}",
    scalarCount: "{count} Skalar(e)",
    byteCount: "{count} Byte(s)",
    errors: {
      failed: "GlyphGuard konnte diesen Text nicht untersuchen.",
    },
  },

  normalize: {
    title: "Normalisieren",
    subtitle:
      "Untersuchen Sie NFC-, NFD-, NFKC- und NFKD-Darstellungen.",
    normalizing: "Normalisierung...",
    normalizeButton: "Text normalisieren",
    original: "Original",
    errors: {
      failed: "GlyphGuard konnte diesen Text nicht normalisieren.",
    },
  },

  files: {
    title: "Dateien",
    subtitle:
      "Prüfen Sie einzelne UTF-8-Dateien oder ganze Verzeichnisse rekursiv.",
    dropTitle: "Datei oder Ordner ablegen",
    dropDescription:
      "Ziehen Sie Inhalte aus dem Windows Explorer direkt in GlyphGuard.",
    selectFile: "Datei auswählen",
    selectFolder: "Ordner auswählen",
    dialogFile: "Datei zum Prüfen auswählen",
    dialogDirectory: "Verzeichnis zum Prüfen auswählen",
    fileComplete: "Dateiprüfung abgeschlossen.",
    directoryComplete: "Verzeichnisprüfung abgeschlossen.",
    scanFailed: "Analyse fehlgeschlagen",
    file: "Datei",
    directory: "Verzeichnis",
    encoding: "Kodierung",
    noFindings: "Keine verdächtigen Unicode-Befunde erkannt.",
    bytePosition: "Byte {index}",
    discovered: "Gefunden",
    scanned: "Geprüft",
    skipped: "Übersprungen",
    suspiciousFiles: "Verdächtige Dateien",
    filesWithFindings: "Dateien mit Befunden",
    suspiciousFile: "Verdächtige Datei",
    findingCount: "{count} Befund(e)",
    skippedFiles: "Übersprungene Dateien",
    directoryClean:
      "In den geprüften Dateien wurden keine verdächtigen Unicode-Befunde erkannt.",
  },

  settings: {
    title: "Einstellungen",
    subtitle: "Konfigurieren Sie GlyphGuard Desktop.",
    language: "Sprache",
    languageTitle: "Sprache der Oberfläche",
    languageDescription:
      "Wählen Sie die Sprache der GlyphGuard-Oberfläche.",
    detectionRules: "Erkennungsregeln",
    securityScanning: "Sicherheitsanalyse",
    appearance: "Darstellung",
    theme: "Design",
    system: "System",
    dark: "Dunkel",
    light: "Hell",
    rulesNote:
      "Die Regelschalter sind derzeit nur visuell. Eine dauerhafte Konfiguration wird später hinzugefügt.",
    themeNote:
      "Der Dunkelmodus ist derzeit die aktive GlyphGuard-Oberfläche.",
  },
};