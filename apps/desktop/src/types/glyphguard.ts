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