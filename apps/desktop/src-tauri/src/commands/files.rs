use glyphguard_core::files::read_text_file;
use glyphguard_core::rules::scan_text;
use serde::Serialize;

use super::dto::FindingDto;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FileScanDto {
    pub path: String,

    pub encoding: String,
    pub byte_length: usize,
    pub has_utf8_bom: bool,

    pub findings: Vec<FindingDto>,
}

#[tauri::command]
pub fn scan_file_command(path: String) -> Result<FileScanDto, String> {
    let file = read_text_file(&path).map_err(|error| error.to_string())?;

    let findings = scan_text(&file.text)
        .into_iter()
        .map(FindingDto::from)
        .collect();

    Ok(FileScanDto {
        path: file.path.display().to_string(),

        encoding: "UTF-8".to_owned(),

        byte_length: file.byte_length,

        has_utf8_bom: file.has_utf8_bom,

        findings,
    })
}
