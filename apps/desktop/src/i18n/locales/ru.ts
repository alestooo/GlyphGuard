export default {
  common: {
    ready: "Готов",
    clear: "Очистить",
    scanning: "Сканирование...",
    results: "Результаты",
    findings: "Находки",
    character: "Символ",
    codePoint: "Кодовая точка",
    unicodeName: "Имя Unicode",
    scalarIndex: "Индекс скаляра",
    byteIndex: "Индекс байта",
    escaped: "Экранированное представление",
    whyThisMatters: "Почему это важно",
    unknown: "Неизвестно",
    yes: "Да",
    no: "Нет",
    left: "Слева",
    right: "Справа",
    missing: "<отсутствует>",
    changed: "Изменено",
    unchanged: "Без изменений",
    bytes: "Байты",
  },

  navigation: {
    workspace: "Рабочая область",
    dashboard: "Панель",
    scan: "Проверка текста",
    files: "Файлы",
    compare: "Сравнение",
    inspector: "Инспектор",
    normalize: "Нормализация",
    settings: "Настройки",
  },

  header: {
    localAnalysis: "Локальный анализ Unicode",
    engineReady: "Движок готов",
    language: "Язык",
  },

  dashboard: {
    title: "Панель",
    subtitle: "Обзор рабочего пространства безопасности Unicode.",
    quickAction: "Быстрое действие",
    scanTitle: "Проверить текст",
    scanDescription:
      "Вставьте подозрительный или многоязычный текст и проверьте его на проблемы безопасности Unicode.",
    openScanner: "Открыть сканер",
    compareTitle: "Сравнить строки",
    compareDescription:
      "Сравните значения Unicode, формы нормализации и скелеты похожих символов.",
    compareText: "Сравнить текст",
    engineStatus: "Состояние движка",
    mixedScripts: "Смешанные письменности",
    invisibleCharacters: "Невидимые символы",
    bidiControls: "Bidi-управление",
    unicodeConfusables: "Похожие символы Unicode",
    suspiciousWhitespace: "Подозрительные пробелы",
  },

  scan: {
    title: "Проверка текста",
    subtitle:
      "Анализ текста на подозрительные символы Unicode, письменности и управляющие символы.",
    input: "Ввод",
    textToAnalyze: "Текст для анализа",
    placeholder: "Вставьте или введите текст здесь...",
    characters: "{count} символов",
    scanButton: "Проверить текст",
    complete: "Проверка завершена",
    noFindings: "Ничего не найдено",
    noFindingsDescription:
      "GlyphGuard не обнаружил подозрительных шаблонов Unicode в этом тексте.",
    findingCount: "{count} находок",
    errors: {
      empty: "Введите текст перед запуском проверки.",
      failed: "GlyphGuard не смог проанализировать текст.",
    },
  },

  compare: {
    title: "Сравнение",
    subtitle:
      "Сравнение двух строк с помощью нормализации Unicode и скелетов похожих символов.",
    comparing: "Сравнение...",
    compareButton: "Сравнить строки",
    binaryEqual: "Двоичное совпадение",
    nfcEqual: "Совпадение NFC",
    nfkcEqual: "Совпадение NFKC",
    skeletonEqual: "Совпадение скелетов",
    leftSkeleton: "Левый скелет",
    rightSkeleton: "Правый скелет",
    differences: "Различия",
    position: "Позиция {index}",
    noDifferences: "Скалярных различий нет.",
    errors: {
      empty: "Введите хотя бы одну строку.",
      failed: "GlyphGuard не смог сравнить строки.",
    },
  },

  inspector: {
    title: "Инспектор",
    subtitle:
      "Просмотр скаляров Unicode, кодовых точек, байтов и кластеров графем.",
    inspecting: "Анализ...",
    inspectButton: "Исследовать текст",
    scalars: "Скаляры",
    graphemes: "Кластеры графем",
    scalarPosition: "скаляр {scalar} · байт {byte}",
    graphemeIndex: "Графема {index}",
    scalarCount: "{count} скаляр(ов)",
    byteCount: "{count} байт(ов)",
    errors: {
      failed: "GlyphGuard не смог исследовать этот текст.",
    },
  },

  normalize: {
    title: "Нормализация",
    subtitle:
      "Просмотр представлений NFC, NFD, NFKC и NFKD.",
    normalizing: "Нормализация...",
    normalizeButton: "Нормализовать текст",
    original: "Исходный",
    errors: {
      failed: "GlyphGuard не смог нормализовать этот текст.",
    },
  },

  files: {
    title: "Файлы",
    subtitle:
      "Рекурсивная проверка отдельных UTF-8 файлов или целых каталогов.",
    dropTitle: "Перетащите файл или папку",
    dropDescription:
      "Перетащите содержимое из Проводника Windows прямо в GlyphGuard.",
    selectFile: "Выбрать файл",
    selectFolder: "Выбрать папку",
    dialogFile: "Выберите файл для проверки",
    dialogDirectory: "Выберите каталог для проверки",
    fileComplete: "Проверка файла завершена.",
    directoryComplete: "Проверка каталога завершена.",
    scanFailed: "Ошибка проверки",
    file: "Файл",
    directory: "Каталог",
    encoding: "Кодировка",
    noFindings: "Подозрительные проблемы Unicode не обнаружены.",
    bytePosition: "байт {index}",
    discovered: "Найдено",
    scanned: "Проверено",
    skipped: "Пропущено",
    suspiciousFiles: "Подозрительные файлы",
    filesWithFindings: "Файлы с находками",
    suspiciousFile: "Подозрительный файл",
    findingCount: "{count} находок",
    skippedFiles: "Пропущенные файлы",
    directoryClean:
      "В проверенных файлах не обнаружено подозрительных проблем Unicode.",
  },

  settings: {
    title: "Настройки",
    subtitle: "Настройте GlyphGuard Desktop.",
    language: "Язык",
    languageTitle: "Язык интерфейса",
    languageDescription: "Выберите язык интерфейса GlyphGuard.",
    detectionRules: "Правила обнаружения",
    securityScanning: "Проверка безопасности",
    appearance: "Внешний вид",
    theme: "Тема",
    system: "Системная",
    dark: "Тёмная",
    light: "Светлая",
    rulesNote:
      "Переключатели правил пока являются только элементами интерфейса. Постоянные настройки будут добавлены позже.",
    themeNote:
      "В GlyphGuard сейчас используется тёмный режим.",
  },
};