export default {
  common: {
    ready: "已就绪",
    clear: "清除",
    scanning: "扫描中...",
    results: "结果",
    findings: "发现",
    character: "字符",
    codePoint: "代码点",
    unicodeName: "Unicode 名称",
    scalarIndex: "标量索引",
    byteIndex: "字节索引",
    escaped: "转义形式",
    whyThisMatters: "为什么重要",
    unknown: "未知",
    yes: "是",
    no: "否",
    left: "左侧",
    right: "右侧",
    missing: "<缺失>",
    changed: "已更改",
    unchanged: "未更改",
    bytes: "字节",
  },

  navigation: {
    workspace: "工作区",
    dashboard: "仪表板",
    scan: "扫描文本",
    files: "文件",
    compare: "比较",
    inspector: "检查器",
    normalize: "规范化",
    settings: "设置",
  },

  header: {
    localAnalysis: "本地 Unicode 分析",
    engineReady: "引擎已就绪",
    language: "语言",
  },

  dashboard: {
    title: "仪表板",
    subtitle: "Unicode 安全工作区概览。",
    quickAction: "快捷操作",
    scanTitle: "扫描文本",
    scanDescription:
      "粘贴可疑或多语言文本并检查 Unicode 安全问题。",
    openScanner: "打开扫描器",
    compareTitle: "比较字符串",
    compareDescription:
      "比较 Unicode 值、规范化形式和易混淆字符骨架。",
    compareText: "比较文本",
    engineStatus: "引擎状态",
    mixedScripts: "混合文字系统",
    invisibleCharacters: "不可见字符",
    bidiControls: "Bidi 控制字符",
    unicodeConfusables: "Unicode 易混淆字符",
    suspiciousWhitespace: "可疑空白字符",
  },

  scan: {
    title: "扫描文本",
    subtitle:
      "分析文本中的可疑 Unicode 字符、文字系统和控制字符。",
    input: "输入",
    textToAnalyze: "待分析文本",
    placeholder: "在此粘贴或输入文本...",
    characters: "{count} 个字符",
    scanButton: "扫描文本",
    complete: "扫描完成",
    noFindings: "未发现问题",
    noFindingsDescription:
      "GlyphGuard 未在此文本中检测到可疑 Unicode 模式。",
    findingCount: "{count} 个发现",
    errors: {
      empty: "请先输入文本再开始扫描。",
      failed: "GlyphGuard 无法分析该文本。",
    },
  },

  compare: {
    title: "比较",
    subtitle:
      "使用 Unicode 规范化和易混淆字符骨架比较两个字符串。",
    comparing: "比较中...",
    compareButton: "比较字符串",
    binaryEqual: "二进制相同",
    nfcEqual: "NFC 相同",
    nfkcEqual: "NFKC 相同",
    skeletonEqual: "骨架相同",
    leftSkeleton: "左侧骨架",
    rightSkeleton: "右侧骨架",
    differences: "差异",
    position: "位置 {index}",
    noDifferences: "没有标量差异。",
    errors: {
      empty: "请至少输入一个字符串。",
      failed: "GlyphGuard 无法比较这些字符串。",
    },
  },

  inspector: {
    title: "检查器",
    subtitle:
      "检查 Unicode 标量、代码点、字节和字素簇。",
    inspecting: "检查中...",
    inspectButton: "检查文本",
    scalars: "标量",
    graphemes: "字素簇",
    scalarPosition: "标量 {scalar} · 字节 {byte}",
    graphemeIndex: "字素 {index}",
    scalarCount: "{count} 个标量",
    byteCount: "{count} 个字节",
    errors: {
      failed: "GlyphGuard 无法检查该文本。",
    },
  },

  normalize: {
    title: "规范化",
    subtitle:
      "检查 NFC、NFD、NFKC 和 NFKD 表示形式。",
    normalizing: "规范化中...",
    normalizeButton: "规范化文本",
    original: "原始文本",
    errors: {
      failed: "GlyphGuard 无法规范化该文本。",
    },
  },

  files: {
    title: "文件",
    subtitle:
      "递归扫描单个 UTF-8 文件或整个目录。",
    dropTitle: "拖放文件或文件夹",
    dropDescription:
      "从 Windows 文件资源管理器直接拖到 GlyphGuard。",
    selectFile: "选择文件",
    selectFolder: "选择文件夹",
    dialogFile: "选择要扫描的文件",
    dialogDirectory: "选择要扫描的目录",
    fileComplete: "文件扫描完成。",
    directoryComplete: "目录扫描完成。",
    scanFailed: "扫描失败",
    file: "文件",
    directory: "目录",
    encoding: "编码",
    noFindings: "未检测到可疑 Unicode 问题。",
    bytePosition: "字节 {index}",
    discovered: "已发现",
    scanned: "已扫描",
    skipped: "已跳过",
    suspiciousFiles: "可疑文件",
    filesWithFindings: "存在发现的文件",
    suspiciousFile: "可疑文件",
    findingCount: "{count} 个发现",
    skippedFiles: "已跳过文件",
    directoryClean:
      "扫描的文件中未检测到可疑 Unicode 问题。",
  },

  settings: {
    title: "设置",
    subtitle: "配置 GlyphGuard Desktop 使用体验。",
    language: "语言",
    languageTitle: "界面语言",
    languageDescription: "选择 GlyphGuard 界面使用的语言。",
    detectionRules: "检测规则",
    securityScanning: "安全扫描",
    appearance: "外观",
    theme: "主题",
    system: "系统",
    dark: "深色",
    light: "浅色",
    rulesNote:
      "目前规则开关仅用于界面展示。持久化配置将在之后添加。",
    themeNote: "GlyphGuard 当前使用深色模式。",
  },
};