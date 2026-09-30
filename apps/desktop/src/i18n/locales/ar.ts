export default {
  common: {
    ready: "جاهز",
    clear: "مسح",
    scanning: "جارٍ الفحص...",
    results: "النتائج",
    findings: "النتائج المكتشفة",
    character: "الحرف",
    codePoint: "نقطة الرمز",
    unicodeName: "اسم Unicode",
    scalarIndex: "فهرس القيمة",
    byteIndex: "فهرس البايت",
    escaped: "التمثيل المهرب",
    whyThisMatters: "لماذا هذا مهم",
    unknown: "غير معروف",
    yes: "نعم",
    no: "لا",
    left: "اليسار",
    right: "اليمين",
    missing: "<مفقود>",
    changed: "تم التغيير",
    unchanged: "بدون تغيير",
    bytes: "بايت",
  },

  navigation: {
    workspace: "مساحة العمل",
    dashboard: "لوحة التحكم",
    scan: "فحص النص",
    files: "الملفات",
    compare: "المقارنة",
    inspector: "المفتش",
    normalize: "التطبيع",
    settings: "الإعدادات",
  },

  header: {
    localAnalysis: "تحليل Unicode محلي",
    engineReady: "المحرك جاهز",
    language: "اللغة",
  },

  dashboard: {
    title: "لوحة التحكم",
    subtitle: "نظرة عامة على مساحة عمل أمان Unicode.",
    quickAction: "إجراء سريع",
    scanTitle: "فحص النص",
    scanDescription:
      "ألصق نصًا مشبوهًا أو متعدد اللغات وافحص مشكلات أمان Unicode.",
    openScanner: "فتح الماسح",
    compareTitle: "مقارنة النصوص",
    compareDescription:
      "قارن قيم Unicode وأشكال التطبيع وهياكل الأحرف المتشابهة.",
    compareText: "مقارنة النص",
    engineStatus: "حالة المحرك",
    mixedScripts: "أنظمة كتابة مختلطة",
    invisibleCharacters: "أحرف غير مرئية",
    bidiControls: "عناصر تحكم Bidi",
    unicodeConfusables: "أحرف Unicode المتشابهة",
    suspiciousWhitespace: "مسافات مشبوهة",
  },

  scan: {
    title: "فحص النص",
    subtitle:
      "تحليل النص بحثًا عن أحرف وأنظمة كتابة وعناصر تحكم Unicode مشبوهة.",
    input: "الإدخال",
    textToAnalyze: "النص المراد تحليله",
    placeholder: "ألصق أو اكتب النص هنا...",
    characters: "{count} حرف",
    scanButton: "فحص النص",
    complete: "اكتمل الفحص",
    noFindings: "لا توجد نتائج",
    noFindingsDescription:
      "لم يكتشف GlyphGuard أنماط Unicode مشبوهة في هذا النص.",
    findingCount: "{count} نتيجة",
    errors: {
      empty: "أدخل نصًا قبل تشغيل الفحص.",
      failed: "تعذر على GlyphGuard تحليل النص.",
    },
  },

  compare: {
    title: "المقارنة",
    subtitle:
      "قارن نصين باستخدام تطبيع Unicode وهياكل الأحرف المتشابهة.",
    comparing: "جارٍ المقارنة...",
    compareButton: "مقارنة النصوص",
    binaryEqual: "تطابق ثنائي",
    nfcEqual: "تطابق NFC",
    nfkcEqual: "تطابق NFKC",
    skeletonEqual: "تطابق الهيكل",
    leftSkeleton: "الهيكل الأيسر",
    rightSkeleton: "الهيكل الأيمن",
    differences: "الاختلافات",
    position: "الموضع {index}",
    noDifferences: "لا توجد اختلافات في القيم.",
    errors: {
      empty: "أدخل نصًا واحدًا على الأقل.",
      failed: "تعذر على GlyphGuard مقارنة النصوص.",
    },
  },

  inspector: {
    title: "المفتش",
    subtitle:
      "افحص قيم Unicode ونقاط الرمز والبايتات ومجموعات الحروف.",
    inspecting: "جارٍ الفحص...",
    inspectButton: "فحص النص",
    scalars: "القيم",
    graphemes: "مجموعات الحروف",
    scalarPosition: "القيمة {scalar} · البايت {byte}",
    graphemeIndex: "المجموعة {index}",
    scalarCount: "{count} قيمة",
    byteCount: "{count} بايت",
    errors: {
      failed: "تعذر على GlyphGuard فحص هذا النص.",
    },
  },

  normalize: {
    title: "التطبيع",
    subtitle:
      "افحص تمثيلات NFC وNFD وNFKC وNFKD.",
    normalizing: "جارٍ التطبيع...",
    normalizeButton: "تطبيع النص",
    original: "الأصلي",
    errors: {
      failed: "تعذر على GlyphGuard تطبيع هذا النص.",
    },
  },

  files: {
    title: "الملفات",
    subtitle:
      "افحص ملفات UTF-8 الفردية أو المجلدات كاملة بشكل متكرر.",
    dropTitle: "أسقط ملفًا أو مجلدًا",
    dropDescription:
      "اسحب المحتوى من مستكشف Windows مباشرة إلى GlyphGuard.",
    selectFile: "اختيار ملف",
    selectFolder: "اختيار مجلد",
    dialogFile: "اختر ملفًا للفحص",
    dialogDirectory: "اختر مجلدًا للفحص",
    fileComplete: "اكتمل فحص الملف.",
    directoryComplete: "اكتمل فحص المجلد.",
    scanFailed: "فشل الفحص",
    file: "الملف",
    directory: "المجلد",
    encoding: "الترميز",
    noFindings: "لم يتم اكتشاف مشكلات Unicode مشبوهة.",
    bytePosition: "البايت {index}",
    discovered: "تم العثور",
    scanned: "تم الفحص",
    skipped: "تم التجاوز",
    suspiciousFiles: "ملفات مشبوهة",
    filesWithFindings: "ملفات تحتوي على نتائج",
    suspiciousFile: "ملف مشبوه",
    findingCount: "{count} نتيجة",
    skippedFiles: "الملفات المتجاوزة",
    directoryClean:
      "لم يتم اكتشاف مشكلات Unicode مشبوهة في الملفات المفحوصة.",
  },

  settings: {
    title: "الإعدادات",
    subtitle: "قم بإعداد تجربة GlyphGuard Desktop.",
    language: "اللغة",
    languageTitle: "لغة الواجهة",
    languageDescription:
      "اختر اللغة المستخدمة في واجهة GlyphGuard.",
    detectionRules: "قواعد الكشف",
    securityScanning: "فحص الأمان",
    appearance: "المظهر",
    theme: "السمة",
    system: "النظام",
    dark: "داكن",
    light: "فاتح",
    rulesNote:
      "مفاتيح القواعد مرئية فقط حاليًا. سيتم إضافة الإعدادات الدائمة لاحقًا.",
    themeNote:
      "الوضع الداكن هو الواجهة النشطة حاليًا في GlyphGuard.",
  },
};