use glyphguard_core::findings::{Finding, Severity};
use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FindingDto {
    pub rule_id: String,
    pub severity: String,

    pub scalar_index: usize,
    pub byte_index: usize,

    pub character: String,
    pub escaped_character: String,

    pub code_point: u32,
    pub code_point_label: String,

    pub unicode_name: Option<String>,

    pub message: String,
    pub explanation: String,
}

impl From<Finding> for FindingDto {
    fn from(finding: Finding) -> Self {
        Self {
            rule_id: finding.rule_id.to_owned(),

            severity: severity_name(finding.severity).to_owned(),

            scalar_index: finding.scalar_index,

            byte_index: finding.byte_index,

            character: finding.character.to_string(),

            escaped_character: finding.escaped_character(),

            code_point: finding.code_point,

            code_point_label: finding.code_point_label(),

            unicode_name: finding.unicode_name,

            message: finding.message,

            explanation: finding.explanation,
        }
    }
}

fn severity_name(severity: Severity) -> &'static str {
    match severity {
        Severity::Info => "Info",
        Severity::Warning => "Warning",
        Severity::Suspicious => "Suspicious",
        Severity::HighRisk => "HighRisk",
    }
}
