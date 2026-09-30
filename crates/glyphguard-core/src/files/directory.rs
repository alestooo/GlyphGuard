use std::{
    error::Error,
    fmt, fs, io,
    path::{Path, PathBuf},
};

use crate::{findings::Finding, rules::scan_text};

use super::read_text_file;

#[derive(Debug)]
pub struct DirectoryFileScan {
    pub path: PathBuf,
    pub byte_length: usize,
    pub has_utf8_bom: bool,
    pub findings: Vec<Finding>,
}

#[derive(Debug)]
pub struct SkippedFile {
    pub path: PathBuf,
    pub reason: String,
}

#[derive(Debug)]
pub struct DirectoryScanResult {
    pub root: PathBuf,

    pub discovered_file_count: usize,
    pub scanned_file_count: usize,
    pub skipped_file_count: usize,

    pub files_with_findings: usize,
    pub finding_count: usize,

    pub files: Vec<DirectoryFileScan>,
    pub skipped: Vec<SkippedFile>,
}

#[derive(Debug)]
pub enum DirectoryScanError {
    EmptyPath,

    NotADirectory(PathBuf),

    Io { path: PathBuf, message: String },
}

impl fmt::Display for DirectoryScanError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::EmptyPath => {
                write!(formatter, "directory path cannot be empty")
            }

            Self::NotADirectory(path) => {
                write!(formatter, "path is not a directory: {}", path.display())
            }

            Self::Io { path, message } => {
                write!(
                    formatter,
                    "could not read directory {}: {}",
                    path.display(),
                    message
                )
            }
        }
    }
}

impl Error for DirectoryScanError {}

pub fn scan_directory(path: impl AsRef<Path>) -> Result<DirectoryScanResult, DirectoryScanError> {
    let path = path.as_ref();

    if path.as_os_str().is_empty() {
        return Err(DirectoryScanError::EmptyPath);
    }

    if !path.is_dir() {
        return Err(DirectoryScanError::NotADirectory(path.to_path_buf()));
    }

    let mut discovered_files = Vec::new();

    collect_files(path, &mut discovered_files)?;

    discovered_files.sort();

    let discovered_file_count = discovered_files.len();

    let mut files = Vec::new();

    let mut skipped = Vec::new();

    let mut files_with_findings = 0;

    let mut finding_count = 0;

    for file_path in discovered_files {
        match read_text_file(&file_path) {
            Ok(text_file) => {
                let findings = scan_text(&text_file.text);

                if !findings.is_empty() {
                    files_with_findings += 1;
                }

                finding_count += findings.len();

                files.push(DirectoryFileScan {
                    path: text_file.path,

                    byte_length: text_file.byte_length,

                    has_utf8_bom: text_file.has_utf8_bom,

                    findings,
                });
            }

            Err(error) => {
                skipped.push(SkippedFile {
                    path: file_path,

                    reason: error.to_string(),
                });
            }
        }
    }

    let scanned_file_count = files.len();

    let skipped_file_count = skipped.len();

    Ok(DirectoryScanResult {
        root: path.to_path_buf(),

        discovered_file_count,

        scanned_file_count,

        skipped_file_count,

        files_with_findings,

        finding_count,

        files,

        skipped,
    })
}

fn collect_files(directory: &Path, files: &mut Vec<PathBuf>) -> Result<(), DirectoryScanError> {
    let entries = fs::read_dir(directory).map_err(|error| directory_io_error(directory, error))?;

    for entry in entries {
        let entry = entry.map_err(|error| directory_io_error(directory, error))?;

        let path = entry.path();

        let file_type = entry
            .file_type()
            .map_err(|error| directory_io_error(&path, error))?;

        if file_type.is_dir() {
            collect_files(&path, files)?;
        } else if file_type.is_file() {
            files.push(path);
        }
    }

    Ok(())
}

fn directory_io_error(path: &Path, error: io::Error) -> DirectoryScanError {
    DirectoryScanError::Io {
        path: path.to_path_buf(),

        message: error.to_string(),
    }
}

#[cfg(test)]
mod tests {
    use std::{
        fs,
        path::PathBuf,
        time::{SystemTime, UNIX_EPOCH},
    };

    use super::*;

    fn temp_directory(name: &str) -> PathBuf {
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("system time should be valid")
            .as_nanos();

        let path = std::env::temp_dir().join(format!(
            "glyphguard-{name}-{}-{timestamp}",
            std::process::id(),
        ));

        fs::create_dir_all(&path).expect("temporary directory should be created");

        path
    }

    #[test]
    fn scans_directory_recursively() {
        let root = temp_directory("recursive-scan");

        let nested = root.join("nested");

        fs::create_dir_all(&nested).unwrap();

        fs::write(root.join("clean.txt"), "hello world").unwrap();

        fs::write(nested.join("nested.txt"), "another file").unwrap();

        let result = scan_directory(&root).unwrap();

        assert_eq!(result.discovered_file_count, 2);

        assert_eq!(result.scanned_file_count, 2);

        assert_eq!(result.skipped_file_count, 0);

        fs::remove_dir_all(root).unwrap();
    }

    #[test]
    fn reports_findings_across_files() {
        let root = temp_directory("findings");

        fs::write(root.join("clean.txt"), "paypal").unwrap();

        fs::write(root.join("suspicious.txt"), "раypal").unwrap();

        let result = scan_directory(&root).unwrap();

        assert_eq!(result.files_with_findings, 1);

        assert!(result.finding_count > 0);

        fs::remove_dir_all(root).unwrap();
    }

    #[test]
    fn rejects_non_directory_path() {
        let root = temp_directory("not-directory");

        let file = root.join("file.txt");

        fs::write(&file, "hello").unwrap();

        let result = scan_directory(&file);

        assert!(matches!(result, Err(DirectoryScanError::NotADirectory(_))));

        fs::remove_dir_all(root).unwrap();
    }

    #[test]
    fn skips_non_utf8_or_binary_files() {
        let root = temp_directory("skip-files");

        fs::write(root.join("clean.txt"), "hello").unwrap();

        fs::write(root.join("binary.bin"), [0_u8, 1, 2, 3]).unwrap();

        let result = scan_directory(&root).unwrap();

        assert_eq!(result.discovered_file_count, 2);

        assert_eq!(result.scanned_file_count, 1);

        assert_eq!(result.skipped_file_count, 1);

        fs::remove_dir_all(root).unwrap();
    }
}
