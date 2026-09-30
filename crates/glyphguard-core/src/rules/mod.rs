mod bidi;
mod invisible;

use crate::findings::Finding;

pub use bidi::detect_bidi_controls;
pub use invisible::detect_invisible_characters;

pub fn scan_text(input: &str) -> Vec<Finding> {
    let mut findings = detect_invisible_characters(input);

    findings.extend(detect_bidi_controls(input));

    findings.sort_by_key(|finding| (finding.byte_index, finding.rule_id));

    findings
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn scan_text_combines_multiple_rules() {
        let input = "A\u{200B}B\u{202E}C";

        let findings = scan_text(input);

        assert_eq!(findings.len(), 2);
        assert_eq!(findings[0].rule_id, "GG002");
        assert_eq!(findings[1].rule_id, "GG003");
    }

    #[test]
    fn clean_text_has_no_findings() {
        assert!(scan_text("GlyphGuard").is_empty());
    }
}
