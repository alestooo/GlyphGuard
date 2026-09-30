import {
  invoke,
} from "@tauri-apps/api/core";

import type {
  ComparisonResult,
  FileScanResult,
  Finding,
  InspectResult,
  NormalizationResult,
} from "../types/glyphguard";

export async function scanText(
  text: string,
): Promise<Finding[]> {
  return invoke<Finding[]>(
    "scan_text_command",
    {
      text,
    },
  );
}

export async function compareText(
  left: string,
  right: string,
): Promise<ComparisonResult> {
  return invoke<ComparisonResult>(
    "compare_text_command",
    {
      left,
      right,
    },
  );
}

export async function inspectText(
  text: string,
): Promise<InspectResult> {
  return invoke<InspectResult>(
    "inspect_text_command",
    {
      text,
    },
  );
}

export async function normalizeText(
  text: string,
): Promise<NormalizationResult> {
  return invoke<NormalizationResult>(
    "normalize_text_command",
    {
      text,
    },
  );
}

export async function scanFile(
  path: string,
): Promise<FileScanResult> {
  return invoke<FileScanResult>(
    "scan_file_command",
    {
      path,
    },
  );
}