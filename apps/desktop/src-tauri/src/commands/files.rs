use std::path::Path;

use glyphguard_core::{
    files::{read_text_file, scan_directory, DirectoryScanResult},
    rules::scan_text,
};
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

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DirectoryFileScanDto {
    pub path: String,

    pub byte_length: usize,
    pub has_utf8_bom: bool,

    pub findings: Vec<FindingDto>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SkippedFileDto {
    pub path: String,
    pub reason: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DirectoryScanDto {
    pub root: String,

    pub discovered_file_count: usize,
    pub scanned_file_count: usize,
    pub skipped_file_count: usize,

    pub files_with_findings: usize,
    pub finding_count: usize,

    pub files: Vec<DirectoryFileScanDto>,
    pub skipped: Vec<SkippedFileDto>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct PathScanDto {
    pub kind: String,

    pub file: Option<FileScanDto>,

    pub directory: Option<DirectoryScanDto>,
}

#[tauri::command]
pub fn scan_file_command(path: String) -> Result<FileScanDto, String> {
    scan_file_path(&path)
}

#[tauri::command]
pub fn scan_directory_command(path: String) -> Result<DirectoryScanDto, String> {
    let result = scan_directory(&path).map_err(|error| error.to_string())?;

    Ok(convert_directory_result(result))
}

#[tauri::command]
pub fn scan_path_command(path: String) -> Result<PathScanDto, String> {
    let filesystem_path = Path::new(&path);

    if filesystem_path.is_file() {
        let file = scan_file_path(&path)?;

        return Ok(PathScanDto {
            kind: "file".to_owned(),

            file: Some(file),

            directory: None,
        });
    }

    if filesystem_path.is_dir() {
        let directory = scan_directory(&path).map_err(|error| error.to_string())?;

        return Ok(PathScanDto {
            kind: "directory".to_owned(),

            file: None,

            directory: Some(convert_directory_result(directory)),
        });
    }

    Err(format!("path does not exist or is not supported: {path}"))
}

fn scan_file_path(path: &str) -> Result<FileScanDto, String> {
    let file = read_text_file(path).map_err(|error| error.to_string())?;

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

fn convert_directory_result(result: DirectoryScanResult) -> DirectoryScanDto {
    let files = result
        .files
        .into_iter()
        .map(|file| DirectoryFileScanDto {
            path: file.path.display().to_string(),

            byte_length: file.byte_length,

            has_utf8_bom: file.has_utf8_bom,

            findings: file.findings.into_iter().map(FindingDto::from).collect(),
        })
        .collect();

    let skipped = result
        .skipped
        .into_iter()
        .map(|file| SkippedFileDto {
            path: file.path.display().to_string(),

            reason: file.reason,
        })
        .collect();

    DirectoryScanDto {
        root: result.root.display().to_string(),

        discovered_file_count: result.discovered_file_count,

        scanned_file_count: result.scanned_file_count,

        skipped_file_count: result.skipped_file_count,

        files_with_findings: result.files_with_findings,

        finding_count: result.finding_count,

        files,

        skipped,
    }
}
