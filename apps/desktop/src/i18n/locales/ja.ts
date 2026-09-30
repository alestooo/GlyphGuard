export default {
  common: {
    ready: "準備完了",
    clear: "クリア",
    scanning: "解析中...",
    results: "結果",
    findings: "検出結果",
    character: "文字",
    codePoint: "コードポイント",
    unicodeName: "Unicode 名",
    scalarIndex: "スカラー位置",
    byteIndex: "バイト位置",
    escaped: "エスケープ表現",
    whyThisMatters: "重要な理由",
    unknown: "不明",
    yes: "はい",
    no: "いいえ",
    left: "左",
    right: "右",
    missing: "<なし>",
    changed: "変更あり",
    unchanged: "変更なし",
    bytes: "バイト",
  },

  navigation: {
    workspace: "ワークスペース",
    dashboard: "ダッシュボード",
    scan: "テキスト解析",
    files: "ファイル",
    compare: "比較",
    inspector: "インスペクター",
    normalize: "正規化",
    settings: "設定",
  },

  header: {
    localAnalysis: "ローカル Unicode 解析",
    engineReady: "エンジン準備完了",
    language: "言語",
  },

  dashboard: {
    title: "ダッシュボード",
    subtitle: "Unicode セキュリティワークスペースの概要です。",
    quickAction: "クイック操作",
    scanTitle: "テキストを解析",
    scanDescription:
      "疑わしいテキストや多言語テキストを貼り付けて、Unicode セキュリティ上の問題を確認します。",
    openScanner: "スキャナーを開く",
    compareTitle: "文字列を比較",
    compareDescription:
      "Unicode 値、正規化形式、Confusable Skeleton を比較します。",
    compareText: "テキストを比較",
    engineStatus: "エンジン状態",
    mixedScripts: "混在スクリプト",
    invisibleCharacters: "不可視文字",
    bidiControls: "Bidi 制御文字",
    unicodeConfusables: "Unicode 類似文字",
    suspiciousWhitespace: "疑わしい空白文字",
  },

  scan: {
    title: "テキスト解析",
    subtitle:
      "疑わしい Unicode 文字、スクリプト、制御文字を検出します。",
    input: "入力",
    textToAnalyze: "解析するテキスト",
    placeholder: "ここにテキストを入力または貼り付け...",
    characters: "{count} 文字",
    scanButton: "テキストを解析",
    complete: "解析完了",
    noFindings: "問題は見つかりませんでした",
    noFindingsDescription:
      "GlyphGuard はこのテキストから疑わしい Unicode パターンを検出しませんでした。",
    findingCount: "{count} 件の検出",
    errors: {
      empty: "解析するテキストを入力してください。",
      failed: "GlyphGuard はテキストを解析できませんでした。",
    },
  },

  compare: {
    title: "比較",
    subtitle:
      "Unicode 正規化と Confusable Skeleton を使用して 2 つの文字列を比較します。",
    comparing: "比較中...",
    compareButton: "文字列を比較",
    binaryEqual: "バイナリ一致",
    nfcEqual: "NFC 一致",
    nfkcEqual: "NFKC 一致",
    skeletonEqual: "Skeleton 一致",
    leftSkeleton: "左 Skeleton",
    rightSkeleton: "右 Skeleton",
    differences: "相違点",
    position: "位置 {index}",
    noDifferences: "スカラーの違いはありません。",
    errors: {
      empty: "少なくとも 1 つの文字列を入力してください。",
      failed: "GlyphGuard は文字列を比較できませんでした。",
    },
  },

  inspector: {
    title: "インスペクター",
    subtitle:
      "Unicode スカラー、コードポイント、バイト、書記素クラスタを確認します。",
    inspecting: "解析中...",
    inspectButton: "テキストを調査",
    scalars: "スカラー",
    graphemes: "書記素クラスタ",
    scalarPosition: "スカラー {scalar} · バイト {byte}",
    graphemeIndex: "書記素 {index}",
    scalarCount: "{count} スカラー",
    byteCount: "{count} バイト",
    errors: {
      failed: "GlyphGuard はこのテキストを調査できませんでした。",
    },
  },

  normalize: {
    title: "正規化",
    subtitle: "NFC、NFD、NFKC、NFKD 表現を確認します。",
    normalizing: "正規化中...",
    normalizeButton: "テキストを正規化",
    original: "元の値",
    errors: {
      failed: "GlyphGuard はこのテキストを正規化できませんでした。",
    },
  },

  files: {
    title: "ファイル",
    subtitle:
      "単一の UTF-8 ファイルまたはディレクトリ全体を再帰的に解析します。",
    dropTitle: "ファイルまたはフォルダーをドロップ",
    dropDescription:
      "Windows Explorer から GlyphGuard に直接ドラッグしてください。",
    selectFile: "ファイルを選択",
    selectFolder: "フォルダーを選択",
    dialogFile: "解析するファイルを選択",
    dialogDirectory: "解析するディレクトリを選択",
    fileComplete: "ファイル解析が完了しました。",
    directoryComplete: "ディレクトリ解析が完了しました。",
    scanFailed: "解析に失敗しました",
    file: "ファイル",
    directory: "ディレクトリ",
    encoding: "エンコーディング",
    noFindings: "疑わしい Unicode の問題は検出されませんでした。",
    bytePosition: "バイト {index}",
    discovered: "検出数",
    scanned: "解析済み",
    skipped: "スキップ",
    suspiciousFiles: "疑わしいファイル",
    filesWithFindings: "問題のあるファイル",
    suspiciousFile: "疑わしいファイル",
    findingCount: "{count} 件",
    skippedFiles: "スキップされたファイル",
    directoryClean:
      "解析したファイルから疑わしい Unicode の問題は検出されませんでした。",
  },

  settings: {
    title: "設定",
    subtitle: "GlyphGuard Desktop の動作を設定します。",
    language: "言語",
    languageTitle: "インターフェース言語",
    languageDescription:
      "GlyphGuard インターフェースで使用する言語を選択します。",
    detectionRules: "検出ルール",
    securityScanning: "セキュリティ解析",
    appearance: "外観",
    theme: "テーマ",
    system: "システム",
    dark: "ダーク",
    light: "ライト",
    rulesNote:
      "ルール切り替えは現在表示のみです。永続的な設定は後で追加されます。",
    themeNote:
      "現在 GlyphGuard ではダークモードが使用されています。",
  },
};