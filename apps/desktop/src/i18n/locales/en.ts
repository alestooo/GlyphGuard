export default {
  common: {
    ready: "Ready",
    clear: "Clear",
    scanning: "Scanning...",
    results: "Results",
    findings: "Findings",
    character: "Character",
    codePoint: "Code point",
    unicodeName: "Unicode name",
    scalarIndex: "Scalar index",
    byteIndex: "Byte index",
    escaped: "Escaped",
    whyThisMatters: "Why this matters",
    unknown: "Unknown",
    yes: "Yes",
    no: "No",
    left: "Left",
    right: "Right",
    missing: "<missing>",
    changed: "Changed",
    unchanged: "Unchanged",
    bytes: "Bytes",
  },

  navigation: {
    workspace: "Workspace",
    dashboard: "Dashboard",
    scan: "Scan Text",
    files: "Files",
    compare: "Compare",
    inspector: "Inspector",
    normalize: "Normalize",
    settings: "Settings",
  },

  header: {
    localAnalysis: "Local Unicode analysis",
    engineReady: "Engine ready",
    language: "Language",
  },

  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of your Unicode security workspace.",
    quickAction: "Quick action",
    scanTitle: "Scan text",
    scanDescription:
      "Paste suspicious or multilingual text and inspect Unicode security findings.",
    openScanner: "Open scanner",
    compareTitle: "Compare strings",
    compareDescription:
      "Compare Unicode values, normalization forms and confusable skeletons.",
    compareText: "Compare text",
    engineStatus: "Engine status",
    mixedScripts: "Mixed scripts",
    invisibleCharacters: "Invisible characters",
    bidiControls: "Bidi controls",
    unicodeConfusables: "Unicode confusables",
    suspiciousWhitespace: "Suspicious whitespace",
  },

  scan: {
    title: "Scan Text",
    subtitle:
      "Analyze text for suspicious Unicode characters, scripts and controls.",
    input: "Input",
    textToAnalyze: "Text to analyze",
    placeholder: "Paste or type text here...",
    characters: "{count} characters",
    scanButton: "Scan text",
    complete: "Scan complete",
    noFindings: "No findings",
    noFindingsDescription:
      "GlyphGuard did not detect suspicious Unicode patterns in this text.",
    findingCount: "{count} findings",
    errors: {
      empty: "Enter text before running a scan.",
      failed: "GlyphGuard could not analyze the text.",
    },
  },

  compare: {
    title: "Compare",
    subtitle:
      "Compare two strings using Unicode normalization and confusable skeletons.",
    comparing: "Comparing...",
    compareButton: "Compare strings",
    binaryEqual: "Binary equal",
    nfcEqual: "NFC equal",
    nfkcEqual: "NFKC equal",
    skeletonEqual: "Skeleton equal",
    leftSkeleton: "Left skeleton",
    rightSkeleton: "Right skeleton",
    differences: "Differences",
    position: "Position {index}",
    noDifferences: "No scalar differences.",
    errors: {
      empty: "Enter at least one string.",
      failed: "GlyphGuard could not compare the strings.",
    },
  },

  inspector: {
    title: "Inspector",
    subtitle:
      "Inspect Unicode scalars, code points, bytes and grapheme clusters.",
    inspecting: "Inspecting...",
    inspectButton: "Inspect text",
    scalars: "Scalars",
    graphemes: "Grapheme clusters",
    scalarPosition: "scalar {scalar} · byte {byte}",
    graphemeIndex: "Grapheme {index}",
    scalarCount: "{count} scalar(s)",
    byteCount: "{count} byte(s)",
    errors: {
      failed: "GlyphGuard could not inspect this text.",
    },
  },

  normalize: {
    title: "Normalize",
    subtitle:
      "Inspect NFC, NFD, NFKC and NFKD representations.",
    normalizing: "Normalizing...",
    normalizeButton: "Normalize text",
    original: "Original",
    errors: {
      failed: "GlyphGuard could not normalize this text.",
    },
  },

  files: {
    title: "Files",
    subtitle:
      "Scan individual UTF-8 files or entire directories recursively.",
    dropTitle: "Drop a file or folder",
    dropDescription:
      "Drag content from Windows Explorer directly into GlyphGuard.",
    selectFile: "Select file",
    selectFolder: "Select folder",
    dialogFile: "Select a file to scan",
    dialogDirectory: "Select a directory to scan",
    fileComplete: "File scan complete.",
    directoryComplete: "Directory scan complete.",
    scanFailed: "Scan failed",
    file: "File",
    directory: "Directory",
    encoding: "Encoding",
    noFindings: "No suspicious Unicode findings detected.",
    bytePosition: "byte {index}",
    discovered: "Discovered",
    scanned: "Scanned",
    skipped: "Skipped",
    suspiciousFiles: "Suspicious files",
    filesWithFindings: "Files with findings",
    suspiciousFile: "Suspicious file",
    findingCount: "{count} finding(s)",
    skippedFiles: "Skipped files",
    directoryClean:
      "No suspicious Unicode findings were detected in the scanned files.",
  },

  settings: {
    title: "Settings",
    subtitle: "Configure the GlyphGuard desktop experience.",
    language: "Language",
    languageTitle: "Interface language",
    languageDescription:
      "Choose the language used by the GlyphGuard interface.",
    detectionRules: "Detection rules",
    securityScanning: "Security scanning",
    appearance: "Appearance",
    theme: "Theme",
    system: "System",
    dark: "Dark",
    light: "Light",
    rulesNote:
      "Rule toggles are visual for now. Persistent configuration will be connected later.",
    themeNote:
      "Dark mode is currently the active GlyphGuard interface.",
  },
};