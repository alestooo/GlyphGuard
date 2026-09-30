#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Severity {
    Info,
    Warning,
    Suspicious,
    HighRisk,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Finding {
    pub rule_id: &'static str,
    pub severity: Severity,
    pub scalar_index: usize,
    pub byte_index: usize,
    pub character: char,
    pub code_point: u32,
    pub unicode_name: Option<String>,
    pub message: String,
    pub explanation: String,
}

impl Finding {
    pub fn code_point_label(&self) -> String {
        format!("U+{:04X}", self.code_point)
    }

    pub fn escaped_character(&self) -> String {
        self.character.escape_unicode().to_string()
    }
}
