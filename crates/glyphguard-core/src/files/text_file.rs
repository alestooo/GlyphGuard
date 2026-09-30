use std::fmt;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};

const UTF8_BOM: &[u8; 3] = b"\xEF\xBB\xBF";

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TextFile {
    pub path: PathBuf,
    pub text: String,
    pub byte_length: usize,
    pub has_utf8_bom: bool,
}

#[derive(Debug)]
pub enum FileScanError {
    Io(io::Error),
    EmptyPath,
    NotAFile(PathBuf),
    BinaryLike(PathBuf),
    InvalidUtf8(PathBuf),
}

impl fmt::Display for FileScanError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Io(error) => {
                write!(formatter, "I/O error: {error}")
            }

            Self::EmptyPath => {
                write!(formatter, "the provided file path is empty")
            }

            Self::NotAFile(path) => {
                write!(formatter, "path is not a regular file: {}", path.display())
            }

            Self::BinaryLike(path) => {
                write!(
                    formatter,
                    "file appears to contain binary data: {}",
                    path.display()
                )
            }

            Self::InvalidUtf8(path) => {
                write!(formatter, "file is not valid UTF-8: {}", path.display())
            }
        }
    }
}

impl std::error::Error for FileScanError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Self::Io(error) => Some(error),
            _ => None,
        }
    }
}

impl From<io::Error> for FileScanError {
    fn from(error: io::Error) -> Self {
        Self::Io(error)
    }
}

pub fn read_text_file<P>(path: P) -> Result<TextFile, FileScanError>
where
    P: AsRef<Path>,
{
    let path = path.as_ref();

    if path.as_os_str().is_empty() {
        return Err(FileScanError::EmptyPath);
    }

    if !path.is_file() {
        return Err(FileScanError::NotAFile(path.to_path_buf()));
    }

    let bytes = fs::read(path)?;

    if looks_binary(&bytes) {
        return Err(FileScanError::BinaryLike(path.to_path_buf()));
    }

    let has_utf8_bom = bytes.starts_with(UTF8_BOM);

    let text_bytes = if has_utf8_bom {
        &bytes[UTF8_BOM.len()..]
    } else {
        &bytes
    };

    let text = std::str::from_utf8(text_bytes)
        .map_err(|_| FileScanError::InvalidUtf8(path.to_path_buf()))?
        .to_owned();

    Ok(TextFile {
        path: path.to_path_buf(),
        text,
        byte_length: bytes.len(),
        has_utf8_bom,
    })
}

fn looks_binary(bytes: &[u8]) -> bool {
    bytes.contains(&0)
}

#[cfg(test)]
mod tests {
    use super::*;

    use std::time::{SystemTime, UNIX_EPOCH};

    fn temporary_path(name: &str) -> PathBuf {
        let nonce = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("system clock should be after Unix epoch")
            .as_nanos();

        std::env::temp_dir().join(format!("glyphguard-{nonce}-{name}"))
    }

    #[test]
    fn reads_valid_utf8_file() {
        let path = temporary_path("utf8.txt");

        fs::write(&path, "José 👨‍💻").expect("test file should be created");

        let result = read_text_file(&path).expect("file should be valid");

        assert_eq!(result.text, "José 👨‍💻");
        assert!(!result.has_utf8_bom);

        fs::remove_file(path).expect("test file should be removed");
    }

    #[test]
    fn detects_and_removes_utf8_bom() {
        let path = temporary_path("bom.txt");

        let mut data = UTF8_BOM.to_vec();
        data.extend_from_slice("GlyphGuard".as_bytes());

        fs::write(&path, data).expect("test file should be created");

        let result = read_text_file(&path).expect("file should be valid");

        assert!(result.has_utf8_bom);
        assert_eq!(result.text, "GlyphGuard");

        fs::remove_file(path).expect("test file should be removed");
    }

    #[test]
    fn rejects_invalid_utf8() {
        let path = temporary_path("invalid.txt");

        fs::write(&path, [0xFF, 0xFE, 0xFD]).expect("test file should be created");

        let error = read_text_file(&path).expect_err("file should fail");

        assert!(matches!(error, FileScanError::InvalidUtf8(_)));

        fs::remove_file(path).expect("test file should be removed");
    }

    #[test]
    fn rejects_binary_like_file() {
        let path = temporary_path("binary.bin");

        fs::write(&path, [0x41, 0x00, 0x42]).expect("test file should be created");

        let error = read_text_file(&path).expect_err("file should fail");

        assert!(matches!(error, FileScanError::BinaryLike(_)));

        fs::remove_file(path).expect("test file should be removed");
    }

    #[test]
    fn rejects_missing_file() {
        let path = temporary_path("missing.txt");

        let error = read_text_file(&path).expect_err("file should fail");

        assert!(matches!(error, FileScanError::NotAFile(_)));
    }
}
