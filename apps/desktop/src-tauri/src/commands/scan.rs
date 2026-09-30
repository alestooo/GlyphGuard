use glyphguard_core::rules::scan_text;

use super::dto::FindingDto;

#[tauri::command]
pub fn scan_text_command(text: String) -> Vec<FindingDto> {
    scan_text(&text).into_iter().map(FindingDto::from).collect()
}
