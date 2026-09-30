use crate::findings::{Finding, Severity};
use crate::inspect::inspect_scalars;

pub const RULE_ID: &str = "GG002";

pub fn detect_invisible_characters(input: &str) -> Vec<Finding> {
    inspect_scalars(input)
        .into_iter()
        .filter_map(|scalar| {
            let description = invisible_description(scalar.character)?;

            Some(Finding {
                rule_id: RULE_ID,
                severity: Severity::Warning,
                scalar_index: scalar.scalar_index,
                byte_index: scalar.byte_index,
                character: scalar.character,
                code_point: scalar.code_point,
                unicode_name: scalar.unicode_name,
                message: format!("Invisible character detected: {description}"),
                explanation: explanation_for(scalar.character).to_owned(),
            })
        })
        .collect()
}

fn invisible_description(character: char) -> Option<&'static str> {
    match character {
        '\u{200B}' => Some("Zero Width Space"),
        '\u{200C}' => Some("Zero Width Non-Joiner"),
        '\u{200D}' => Some("Zero Width Joiner"),
        '\u{2060}' => Some("Word Joiner"),
        '\u{FEFF}' => Some("Zero Width No-Break Space / BOM"),
        _ => None,
    }
}

fn explanation_for(character: char) -> &'static str {
    match character {
        '\u{200B}' => {
            "Zero Width Space is invisible and can make two strings appear identical while containing different Unicode data."
        }

        '\u{200C}' => {
            "Zero Width Non-Joiner affects text shaping and can be legitimate in some writing systems, but it is invisible and may require review."
        }

        '\u{200D}' => {
            "Zero Width Joiner affects character joining and emoji sequences. Its presence can be legitimate, but it is invisible and may require review."
        }

        '\u{2060}' => {
            "Word Joiner is invisible and prevents line breaks. It can cause strings that look identical to have different underlying representations."
        }

        '\u{FEFF}' => {
            "U+FEFF may represent a byte order mark at the beginning of text or an invisible zero-width no-break space in other positions."
        }

        _ => "Invisible Unicode character detected.",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn detects_zero_width_space() {
        let findings = detect_invisible_characters("pay\u{200B}pal");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].rule_id, "GG002");
        assert_eq!(findings[0].code_point, 0x200B);
        assert_eq!(findings[0].scalar_index, 3);
    }

    #[test]
    fn detects_zero_width_joiner() {
        let findings = detect_invisible_characters("A\u{200D}B");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x200D);
    }

    #[test]
    fn detects_zero_width_non_joiner() {
        let findings = detect_invisible_characters("A\u{200C}B");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x200C);
    }

    #[test]
    fn detects_word_joiner() {
        let findings = detect_invisible_characters("A\u{2060}B");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x2060);
    }

    #[test]
    fn detects_bom_character() {
        let findings = detect_invisible_characters("\u{FEFF}GlyphGuard");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0xFEFF);
    }

    #[test]
    fn normal_ascii_has_no_findings() {
        let findings = detect_invisible_characters("GlyphGuard");

        assert!(findings.is_empty());
    }

    #[test]
    fn reports_multiple_invisible_characters() {
        let findings = detect_invisible_characters("A\u{200B}B\u{2060}C");

        assert_eq!(findings.len(), 2);
        assert_eq!(findings[0].code_point, 0x200B);
        assert_eq!(findings[1].code_point, 0x2060);
    }
}
