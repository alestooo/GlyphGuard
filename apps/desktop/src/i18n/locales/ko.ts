export default {
  common: {
    ready: "준비 완료",
    clear: "지우기",
    scanning: "검사 중...",
    results: "결과",
    findings: "탐지 결과",
    character: "문자",
    codePoint: "코드 포인트",
    unicodeName: "Unicode 이름",
    scalarIndex: "스칼라 인덱스",
    byteIndex: "바이트 인덱스",
    escaped: "이스케이프",
    whyThisMatters: "중요한 이유",
    unknown: "알 수 없음",
    yes: "예",
    no: "아니요",
    left: "왼쪽",
    right: "오른쪽",
    missing: "<없음>",
    changed: "변경됨",
    unchanged: "변경 없음",
    bytes: "바이트",
  },

  navigation: {
    workspace: "작업 공간",
    dashboard: "대시보드",
    scan: "텍스트 검사",
    files: "파일",
    compare: "비교",
    inspector: "검사기",
    normalize: "정규화",
    settings: "설정",
  },

  header: {
    localAnalysis: "로컬 Unicode 분석",
    engineReady: "엔진 준비 완료",
    language: "언어",
  },

  dashboard: {
    title: "대시보드",
    subtitle: "Unicode 보안 작업 공간 개요입니다.",
    quickAction: "빠른 작업",
    scanTitle: "텍스트 검사",
    scanDescription:
      "의심스럽거나 다국어로 구성된 텍스트를 붙여넣어 Unicode 보안 문제를 검사합니다.",
    openScanner: "검사기 열기",
    compareTitle: "문자열 비교",
    compareDescription:
      "Unicode 값, 정규화 형식 및 혼동 가능한 문자 스켈레톤을 비교합니다.",
    compareText: "텍스트 비교",
    engineStatus: "엔진 상태",
    mixedScripts: "혼합 문자 체계",
    invisibleCharacters: "보이지 않는 문자",
    bidiControls: "Bidi 제어 문자",
    unicodeConfusables: "Unicode 혼동 문자",
    suspiciousWhitespace: "의심스러운 공백",
  },

  scan: {
    title: "텍스트 검사",
    subtitle:
      "의심스러운 Unicode 문자, 문자 체계 및 제어 문자를 분석합니다.",
    input: "입력",
    textToAnalyze: "분석할 텍스트",
    placeholder: "여기에 텍스트를 입력하거나 붙여넣으세요...",
    characters: "{count}자",
    scanButton: "텍스트 검사",
    complete: "검사 완료",
    noFindings: "탐지 결과 없음",
    noFindingsDescription:
      "GlyphGuard가 이 텍스트에서 의심스러운 Unicode 패턴을 찾지 못했습니다.",
    findingCount: "{count}개 탐지",
    errors: {
      empty: "검사할 텍스트를 입력하세요.",
      failed: "GlyphGuard가 텍스트를 분석하지 못했습니다.",
    },
  },

  compare: {
    title: "비교",
    subtitle:
      "Unicode 정규화 및 혼동 가능한 스켈레톤을 사용하여 두 문자열을 비교합니다.",
    comparing: "비교 중...",
    compareButton: "문자열 비교",
    binaryEqual: "바이너리 동일",
    nfcEqual: "NFC 동일",
    nfkcEqual: "NFKC 동일",
    skeletonEqual: "스켈레톤 동일",
    leftSkeleton: "왼쪽 스켈레톤",
    rightSkeleton: "오른쪽 스켈레톤",
    differences: "차이점",
    position: "위치 {index}",
    noDifferences: "스칼라 차이가 없습니다.",
    errors: {
      empty: "문자열을 하나 이상 입력하세요.",
      failed: "GlyphGuard가 문자열을 비교하지 못했습니다.",
    },
  },

  inspector: {
    title: "검사기",
    subtitle:
      "Unicode 스칼라, 코드 포인트, 바이트 및 그래핌 클러스터를 검사합니다.",
    inspecting: "검사 중...",
    inspectButton: "텍스트 검사",
    scalars: "스칼라",
    graphemes: "그래핌 클러스터",
    scalarPosition: "스칼라 {scalar} · 바이트 {byte}",
    graphemeIndex: "그래핌 {index}",
    scalarCount: "{count} 스칼라",
    byteCount: "{count} 바이트",
    errors: {
      failed: "GlyphGuard가 이 텍스트를 검사하지 못했습니다.",
    },
  },

  normalize: {
    title: "정규화",
    subtitle:
      "NFC, NFD, NFKC 및 NFKD 표현을 검사합니다.",
    normalizing: "정규화 중...",
    normalizeButton: "텍스트 정규화",
    original: "원본",
    errors: {
      failed: "GlyphGuard가 이 텍스트를 정규화하지 못했습니다.",
    },
  },

  files: {
    title: "파일",
    subtitle:
      "개별 UTF-8 파일 또는 전체 디렉터리를 재귀적으로 검사합니다.",
    dropTitle: "파일 또는 폴더를 놓으세요",
    dropDescription:
      "Windows 탐색기에서 GlyphGuard로 직접 끌어놓으세요.",
    selectFile: "파일 선택",
    selectFolder: "폴더 선택",
    dialogFile: "검사할 파일 선택",
    dialogDirectory: "검사할 디렉터리 선택",
    fileComplete: "파일 검사가 완료되었습니다.",
    directoryComplete: "디렉터리 검사가 완료되었습니다.",
    scanFailed: "검사 실패",
    file: "파일",
    directory: "디렉터리",
    encoding: "인코딩",
    noFindings: "의심스러운 Unicode 문제를 찾지 못했습니다.",
    bytePosition: "바이트 {index}",
    discovered: "발견됨",
    scanned: "검사됨",
    skipped: "건너뜀",
    suspiciousFiles: "의심스러운 파일",
    filesWithFindings: "탐지 결과가 있는 파일",
    suspiciousFile: "의심스러운 파일",
    findingCount: "{count}개 탐지",
    skippedFiles: "건너뛴 파일",
    directoryClean:
      "검사된 파일에서 의심스러운 Unicode 문제를 찾지 못했습니다.",
  },

  settings: {
    title: "설정",
    subtitle: "GlyphGuard Desktop 환경을 설정합니다.",
    language: "언어",
    languageTitle: "인터페이스 언어",
    languageDescription:
      "GlyphGuard 인터페이스에서 사용할 언어를 선택합니다.",
    detectionRules: "탐지 규칙",
    securityScanning: "보안 검사",
    appearance: "모양",
    theme: "테마",
    system: "시스템",
    dark: "어두운 테마",
    light: "밝은 테마",
    rulesNote:
      "현재 규칙 스위치는 시각적 요소만 제공합니다. 영구 설정은 이후 추가됩니다.",
    themeNote:
      "현재 GlyphGuard에서는 다크 모드가 활성화되어 있습니다.",
  },
};