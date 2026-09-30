import {
  invoke,
} from "@tauri-apps/api/core";

import type {
  ComparisonResult,
  DirectoryScanResult,
  FileScanResult,
  Finding,
  InspectResult,
  NormalizationResult,
  PathScanResult,
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

export async function scanDirectory(
  path: string,
): Promise<DirectoryScanResult> {
  return invoke<DirectoryScanResult>(
    "scan_directory_command",
    {
      path,
    },
  );
}

export async function scanPath(
  path: string,
): Promise<PathScanResult> {
  return invoke<PathScanResult>(
    "scan_path_command",
    {
      path,
    },
  );
}