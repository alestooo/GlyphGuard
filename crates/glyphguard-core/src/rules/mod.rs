mod bidi;
mod invisible;
mod mixed_scripts;
mod whitespace;

use crate::findings::Finding;

pub use bidi::detect_bidi_controls;
pub use invisible::detect_invisible_characters;
pub use mixed_scripts::detect_mixed_scripts;
pub use whitespace::detect_suspicious_whitespace;

pub fn scan_text(input: &str) -> Vec<Finding> {
    let mut findings = detect_mixed_scripts(input);

    findings.extend(detect_invisible_characters(input));
    findings.extend(detect_bidi_controls(input));
    findings.extend(detect_suspicious_whitespace(input));

    findings.sort_by_key(|finding| (finding.byte_index, finding.rule_id));

    findings
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn scan_text_combines_multiple_rules() {
        let input = "A\u{200B}B\u{202E}C\u{00A0}D";

        let findings = scan_text(input);

        assert_eq!(findings.len(), 3);
        assert_eq!(findings[0].rule_id, "GG002");
        assert_eq!(findings[1].rule_id, "GG003");
        assert_eq!(findings[2].rule_id, "GG005");
    }

    #[test]
    fn scan_text_detects_mixed_scripts() {
        let findings = scan_text("раypal");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].rule_id, "GG001");
    }

    #[test]
    fn clean_text_has_no_findings() {
        assert!(scan_text("GlyphGuard").is_empty());
    }

    #[test]
    fn ordinary_ascii_spaces_are_allowed() {
        assert!(scan_text("GlyphGuard Security Toolkit").is_empty());
    }

    #[test]
    fn legitimate_japanese_mixture_is_allowed() {
        assert!(scan_text("日本語とカタカナ").is_empty());
    }
}
