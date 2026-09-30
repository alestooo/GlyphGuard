import { invoke } from "@tauri-apps/api/core";

import type {
  Finding,
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