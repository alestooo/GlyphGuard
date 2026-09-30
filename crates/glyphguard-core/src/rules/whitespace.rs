use crate::findings::{Finding, Severity};
use crate::inspect::inspect_scalars;

pub const RULE_ID: &str = "GG005";

pub fn detect_suspicious_whitespace(input: &str) -> Vec<Finding> {
    inspect_scalars(input)
        .into_iter()
        .filter_map(|scalar| {
            let description = whitespace_description(scalar.character)?;

            Some(Finding {
                rule_id: RULE_ID,
                severity: Severity::Warning,
                scalar_index: scalar.scalar_index,
                byte_index: scalar.byte_index,
                character: scalar.character,
                code_point: scalar.code_point,
                unicode_name: scalar.unicode_name,
                message: format!("Suspicious whitespace detected: {description}"),
                explanation: explanation_for(scalar.character).to_owned(),
            })
        })
        .collect()
}

fn whitespace_description(character: char) -> Option<&'static str> {
    match character {
        '\u{00A0}' => Some("No-Break Space"),
        '\u{1680}' => Some("Ogham Space Mark"),
        '\u{2000}' => Some("En Quad"),
        '\u{2001}' => Some("Em Quad"),
        '\u{2002}' => Some("En Space"),
        '\u{2003}' => Some("Em Space"),
        '\u{2004}' => Some("Three-Per-Em Space"),
        '\u{2005}' => Some("Four-Per-Em Space"),
        '\u{2006}' => Some("Six-Per-Em Space"),
        '\u{2007}' => Some("Figure Space"),
        '\u{2008}' => Some("Punctuation Space"),
        '\u{2009}' => Some("Thin Space"),
        '\u{200A}' => Some("Hair Space"),
        '\u{202F}' => Some("Narrow No-Break Space"),
        '\u{205F}' => Some("Medium Mathematical Space"),
        '\u{3000}' => Some("Ideographic Space"),
        _ => None,
    }
}

fn explanation_for(character: char) -> &'static str {
    match character {
        '\u{00A0}' => {
            "No-Break Space can look identical to an ordinary ASCII space while preventing a line break. \
             It may be legitimate, but can also make strings that appear identical differ internally."
        }

        '\u{202F}' => {
            "Narrow No-Break Space is used legitimately in some languages and typographic conventions, \
             but is visually similar to ordinary spacing while having different Unicode semantics."
        }

        '\u{3000}' => {
            "Ideographic Space is commonly used in East Asian typography. It is legitimate in many contexts, \
             but differs from ASCII space and may be relevant during security-sensitive comparison."
        }

        '\u{2007}' => {
            "Figure Space is designed to align with numeric glyph widths. It may be legitimate in formatted \
             numeric content, but can visually resemble ordinary whitespace."
        }

        '\u{205F}' => {
            "Medium Mathematical Space is intended for mathematical typography. It may be legitimate, \
             but differs from an ordinary ASCII space."
        }

        '\u{1680}' => {
            "Ogham Space Mark is a Unicode whitespace character associated with Ogham text. \
             Its presence outside expected contexts may warrant review."
        }

        _ => {
            "This Unicode whitespace character may be legitimate in typography or multilingual text, \
             but can visually resemble ordinary spacing while having different underlying Unicode data."
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn detects_no_break_space() {
        let findings = detect_suspicious_whitespace("hello\u{00A0}world");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].rule_id, "GG005");
        assert_eq!(findings[0].code_point, 0x00A0);
        assert_eq!(findings[0].severity, Severity::Warning);
    }

    #[test]
    fn detects_narrow_no_break_space() {
        let findings = detect_suspicious_whitespace("10\u{202F}000");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x202F);
    }

    #[test]
    fn detects_thin_space() {
        let findings = detect_suspicious_whitespace("A\u{2009}B");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x2009);
    }

    #[test]
    fn detects_ideographic_space() {
        let findings = detect_suspicious_whitespace("A\u{3000}B");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x3000);
    }

    #[test]
    fn ascii_space_is_not_reported() {
        let findings = detect_suspicious_whitespace("hello world");

        assert!(findings.is_empty());
    }

    #[test]
    fn tabs_are_not_reported_by_this_rule() {
        let findings = detect_suspicious_whitespace("hello\tworld");

        assert!(findings.is_empty());
    }

    #[test]
    fn newlines_are_not_reported_by_this_rule() {
        let findings = detect_suspicious_whitespace("hello\nworld");

        assert!(findings.is_empty());
    }

    #[test]
    fn reports_multiple_suspicious_spaces() {
        let findings = detect_suspicious_whitespace("A\u{00A0}B\u{2009}C\u{3000}D");

        assert_eq!(findings.len(), 3);
        assert_eq!(findings[0].code_point, 0x00A0);
        assert_eq!(findings[1].code_point, 0x2009);
        assert_eq!(findings[2].code_point, 0x3000);
    }
}
