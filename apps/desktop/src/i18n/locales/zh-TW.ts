export default {
  common: {
    ready: "已就緒",
    clear: "清除",
    scanning: "掃描中...",
    results: "結果",
    findings: "發現",
    character: "字元",
    codePoint: "碼位",
    unicodeName: "Unicode 名稱",
    scalarIndex: "純量索引",
    byteIndex: "位元組索引",
    escaped: "跳脫形式",
    whyThisMatters: "為何重要",
    unknown: "未知",
    yes: "是",
    no: "否",
    left: "左側",
    right: "右側",
    missing: "<缺少>",
    changed: "已變更",
    unchanged: "未變更",
    bytes: "位元組",
  },

  navigation: {
    workspace: "工作區",
    dashboard: "儀表板",
    scan: "掃描文字",
    files: "檔案",
    compare: "比較",
    inspector: "檢查器",
    normalize: "正規化",
    settings: "設定",
  },

  header: {
    localAnalysis: "本機 Unicode 分析",
    engineReady: "引擎已就緒",
    language: "語言",
  },

  dashboard: {
    title: "儀表板",
    subtitle: "Unicode 安全工作區概覽。",
    quickAction: "快速操作",
    scanTitle: "掃描文字",
    scanDescription:
      "貼上可疑或多語言文字並檢查 Unicode 安全問題。",
    openScanner: "開啟掃描器",
    compareTitle: "比較字串",
    compareDescription:
      "比較 Unicode 值、正規化形式與易混淆字元骨架。",
    compareText: "比較文字",
    engineStatus: "引擎狀態",
    mixedScripts: "混合文字系統",
    invisibleCharacters: "不可見字元",
    bidiControls: "Bidi 控制字元",
    unicodeConfusables: "Unicode 易混淆字元",
    suspiciousWhitespace: "可疑空白字元",
  },

  scan: {
    title: "掃描文字",
    subtitle:
      "分析文字中的可疑 Unicode 字元、文字系統與控制字元。",
    input: "輸入",
    textToAnalyze: "要分析的文字",
    placeholder: "在此貼上或輸入文字...",
    characters: "{count} 個字元",
    scanButton: "掃描文字",
    complete: "掃描完成",
    noFindings: "未發現問題",
    noFindingsDescription:
      "GlyphGuard 未在此文字中偵測到可疑 Unicode 模式。",
    findingCount: "{count} 個發現",
    errors: {
      empty: "請先輸入文字再執行掃描。",
      failed: "GlyphGuard 無法分析此文字。",
    },
  },

  compare: {
    title: "比較",
    subtitle:
      "使用 Unicode 正規化與易混淆字元骨架比較兩個字串。",
    comparing: "比較中...",
    compareButton: "比較字串",
    binaryEqual: "二進位相同",
    nfcEqual: "NFC 相同",
    nfkcEqual: "NFKC 相同",
    skeletonEqual: "骨架相同",
    leftSkeleton: "左側骨架",
    rightSkeleton: "右側骨架",
    differences: "差異",
    position: "位置 {index}",
    noDifferences: "沒有純量差異。",
    errors: {
      empty: "請至少輸入一個字串。",
      failed: "GlyphGuard 無法比較這些字串。",
    },
  },

  inspector: {
    title: "檢查器",
    subtitle:
      "檢查 Unicode 純量、碼位、位元組與字素叢集。",
    inspecting: "檢查中...",
    inspectButton: "檢查文字",
    scalars: "純量",
    graphemes: "字素叢集",
    scalarPosition: "純量 {scalar} · 位元組 {byte}",
    graphemeIndex: "字素 {index}",
    scalarCount: "{count} 個純量",
    byteCount: "{count} 個位元組",
    errors: {
      failed: "GlyphGuard 無法檢查此文字。",
    },
  },

  normalize: {
    title: "正規化",
    subtitle:
      "檢查 NFC、NFD、NFKC 與 NFKD 表示形式。",
    normalizing: "正規化中...",
    normalizeButton: "正規化文字",
    original: "原始文字",
    errors: {
      failed: "GlyphGuard 無法正規化此文字。",
    },
  },

  files: {
    title: "檔案",
    subtitle:
      "遞迴掃描單一 UTF-8 檔案或整個目錄。",
    dropTitle: "拖放檔案或資料夾",
    dropDescription:
      "從 Windows 檔案總管直接拖曳至 GlyphGuard。",
    selectFile: "選擇檔案",
    selectFolder: "選擇資料夾",
    dialogFile: "選擇要掃描的檔案",
    dialogDirectory: "選擇要掃描的目錄",
    fileComplete: "檔案掃描完成。",
    directoryComplete: "目錄掃描完成。",
    scanFailed: "掃描失敗",
    file: "檔案",
    directory: "目錄",
    encoding: "編碼",
    noFindings: "未偵測到可疑 Unicode 問題。",
    bytePosition: "位元組 {index}",
    discovered: "已發現",
    scanned: "已掃描",
    skipped: "已略過",
    suspiciousFiles: "可疑檔案",
    filesWithFindings: "有發現的檔案",
    suspiciousFile: "可疑檔案",
    findingCount: "{count} 個發現",
    skippedFiles: "已略過檔案",
    directoryClean:
      "掃描的檔案中未偵測到可疑 Unicode 問題。",
  },

  settings: {
    title: "設定",
    subtitle: "設定 GlyphGuard Desktop 使用體驗。",
    language: "語言",
    languageTitle: "介面語言",
    languageDescription: "選擇 GlyphGuard 介面所使用的語言。",
    detectionRules: "偵測規則",
    securityScanning: "安全掃描",
    appearance: "外觀",
    theme: "主題",
    system: "系統",
    dark: "深色",
    light: "淺色",
    rulesNote:
      "目前規則開關僅供介面顯示。永久設定將於之後加入。",
    themeNote: "GlyphGuard 目前使用深色模式。",
  },
};