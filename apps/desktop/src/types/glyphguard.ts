export type Severity =
  | "Info"
  | "Warning"
  | "Suspicious"
  | "HighRisk";

export interface Finding {
  ruleId: string;
  severity: Severity;

  scalarIndex: number;
  byteIndex: number;

  character: string;
  escapedCharacter: string;

  codePoint: number;
  codePointLabel: string;

  unicodeName: string | null;

  message: string;
  explanation: string;
}

export interface ComparisonDifference {
  scalarIndex: number;

  leftCharacter: string | null;
  leftCodePointLabel: string | null;
  leftUnicodeName: string | null;

  rightCharacter: string | null;
  rightCodePointLabel: string | null;
  rightUnicodeName: string | null;
}

export interface ComparisonResult {
  left: string;
  right: string;

  binaryEqual: boolean;
  nfcEqual: boolean;
  nfkcEqual: boolean;
  confusableSkeletonEqual: boolean;

  leftSkeleton: string;
  rightSkeleton: string;

  differences: ComparisonDifference[];
}

export interface ScalarInfo {
  scalarIndex: number;
  byteIndex: number;

  character: string;

  codePoint: number;
  codePointLabel: string;

  unicodeName: string | null;

  utf8Bytes: number[];
  utf8Hex: string;
}

export interface GraphemeInfo {
  graphemeIndex: number;
  byteIndex: number;

  value: string;

  scalarCount: number;
  byteLength: number;
}

export interface InspectResult {
  scalars: ScalarInfo[];
  graphemes: GraphemeInfo[];
}

export interface NormalizationResult {
  original: string;

  nfc: string;
  nfd: string;
  nfkc: string;
  nfkd: string;

  nfcChanged: boolean;
  nfdChanged: boolean;
  nfkcChanged: boolean;
  nfkdChanged: boolean;
}

export interface FileScanResult {
  path: string;

  encoding: string;
  byteLength: number;
  hasUtf8Bom: boolean;

  findings: Finding[];
}

export interface DirectoryFileScan {
  path: string;

  byteLength: number;
  hasUtf8Bom: boolean;

  findings: Finding[];
}

export interface SkippedFile {
  path: string;
  reason: string;
}

export interface DirectoryScanResult {
  root: string;

  discoveredFileCount: number;
  scannedFileCount: number;
  skippedFileCount: number;

  filesWithFindings: number;
  findingCount: number;

  files: DirectoryFileScan[];
  skipped: SkippedFile[];
}

export interface PathScanResult {
  kind:
    | "file"
    | "directory";

  file:
    FileScanResult | null;

  directory:
    DirectoryScanResult | null;
}