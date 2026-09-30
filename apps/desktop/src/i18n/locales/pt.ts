export default {
  common: {
    ready: "Pronto",
    clear: "Limpar",
    scanning: "Analisando...",
    results: "Resultados",
    findings: "Ocorrências",
    character: "Caractere",
    codePoint: "Ponto de código",
    unicodeName: "Nome Unicode",
    scalarIndex: "Índice escalar",
    byteIndex: "Índice de byte",
    escaped: "Escapado",
    whyThisMatters: "Por que isso importa",
    unknown: "Desconhecido",
    yes: "Sim",
    no: "Não",
    left: "Esquerda",
    right: "Direita",
    missing: "<ausente>",
    changed: "Alterado",
    unchanged: "Sem alteração",
    bytes: "Bytes",
  },

  navigation: {
    workspace: "Área de trabalho",
    dashboard: "Painel",
    scan: "Analisar texto",
    files: "Arquivos",
    compare: "Comparar",
    inspector: "Inspetor",
    normalize: "Normalizar",
    settings: "Configurações",
  },

  header: {
    localAnalysis: "Análise Unicode local",
    engineReady: "Motor pronto",
    language: "Idioma",
  },

  dashboard: {
    title: "Painel",
    subtitle: "Visão geral do seu espaço de segurança Unicode.",
    quickAction: "Ação rápida",
    scanTitle: "Analisar texto",
    scanDescription:
      "Cole texto suspeito ou multilíngue e inspecione possíveis problemas de segurança Unicode.",
    openScanner: "Abrir analisador",
    compareTitle: "Comparar textos",
    compareDescription:
      "Compare valores Unicode, formas de normalização e esqueletos de caracteres confundíveis.",
    compareText: "Comparar texto",
    engineStatus: "Status do motor",
    mixedScripts: "Sistemas de escrita mistos",
    invisibleCharacters: "Caracteres invisíveis",
    bidiControls: "Controles bidi",
    unicodeConfusables: "Caracteres Unicode confundíveis",
    suspiciousWhitespace: "Espaços suspeitos",
  },

  scan: {
    title: "Analisar texto",
    subtitle:
      "Analise texto em busca de caracteres, sistemas de escrita e controles Unicode suspeitos.",
    input: "Entrada",
    textToAnalyze: "Texto para analisar",
    placeholder: "Cole ou digite texto aqui...",
    characters: "{count} caracteres",
    scanButton: "Analisar texto",
    complete: "Análise concluída",
    noFindings: "Nenhuma ocorrência",
    noFindingsDescription:
      "O GlyphGuard não detectou padrões Unicode suspeitos neste texto.",
    findingCount: "{count} ocorrência(s)",
    errors: {
      empty: "Digite texto antes de executar a análise.",
      failed: "O GlyphGuard não conseguiu analisar o texto.",
    },
  },

  compare: {
    title: "Comparar",
    subtitle:
      "Compare duas strings usando normalização Unicode e esqueletos confundíveis.",
    comparing: "Comparando...",
    compareButton: "Comparar strings",
    binaryEqual: "Igualdade binária",
    nfcEqual: "Igualdade NFC",
    nfkcEqual: "Igualdade NFKC",
    skeletonEqual: "Esqueletos iguais",
    leftSkeleton: "Esqueleto esquerdo",
    rightSkeleton: "Esqueleto direito",
    differences: "Diferenças",
    position: "Posição {index}",
    noDifferences: "Nenhuma diferença escalar.",
    errors: {
      empty: "Digite pelo menos uma string.",
      failed: "O GlyphGuard não conseguiu comparar as strings.",
    },
  },

  inspector: {
    title: "Inspetor",
    subtitle:
      "Inspecione escalares Unicode, pontos de código, bytes e clusters de grafemas.",
    inspecting: "Inspecionando...",
    inspectButton: "Inspecionar texto",
    scalars: "Escalares",
    graphemes: "Clusters de grafemas",
    scalarPosition: "escalar {scalar} · byte {byte}",
    graphemeIndex: "Grafema {index}",
    scalarCount: "{count} escalar(es)",
    byteCount: "{count} byte(s)",
    errors: {
      failed: "O GlyphGuard não conseguiu inspecionar este texto.",
    },
  },

  normalize: {
    title: "Normalizar",
    subtitle:
      "Inspecione as representações NFC, NFD, NFKC e NFKD.",
    normalizing: "Normalizando...",
    normalizeButton: "Normalizar texto",
    original: "Original",
    errors: {
      failed: "O GlyphGuard não conseguiu normalizar este texto.",
    },
  },

  files: {
    title: "Arquivos",
    subtitle:
      "Analise arquivos UTF-8 individuais ou diretórios completos recursivamente.",
    dropTitle: "Solte um arquivo ou pasta",
    dropDescription:
      "Arraste conteúdo do Explorador do Windows diretamente para o GlyphGuard.",
    selectFile: "Selecionar arquivo",
    selectFolder: "Selecionar pasta",
    dialogFile: "Selecione um arquivo para analisar",
    dialogDirectory: "Selecione um diretório para analisar",
    fileComplete: "Análise do arquivo concluída.",
    directoryComplete: "Análise do diretório concluída.",
    scanFailed: "Falha na análise",
    file: "Arquivo",
    directory: "Diretório",
    encoding: "Codificação",
    noFindings: "Nenhuma ocorrência Unicode suspeita detectada.",
    bytePosition: "byte {index}",
    discovered: "Descobertos",
    scanned: "Analisados",
    skipped: "Ignorados",
    suspiciousFiles: "Arquivos suspeitos",
    filesWithFindings: "Arquivos com ocorrências",
    suspiciousFile: "Arquivo suspeito",
    findingCount: "{count} ocorrência(s)",
    skippedFiles: "Arquivos ignorados",
    directoryClean:
      "Nenhuma ocorrência Unicode suspeita foi detectada nos arquivos analisados.",
  },

  settings: {
    title: "Configurações",
    subtitle: "Configure a experiência do GlyphGuard Desktop.",
    language: "Idioma",
    languageTitle: "Idioma da interface",
    languageDescription:
      "Escolha o idioma usado pela interface do GlyphGuard.",
    detectionRules: "Regras de detecção",
    securityScanning: "Análise de segurança",
    appearance: "Aparência",
    theme: "Tema",
    system: "Sistema",
    dark: "Escuro",
    light: "Claro",
    rulesNote:
      "Os controles das regras são apenas visuais por enquanto. A configuração persistente será adicionada posteriormente.",
    themeNote:
      "O modo escuro é atualmente a interface ativa do GlyphGuard.",
  },
};