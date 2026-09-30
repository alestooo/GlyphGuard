use crate::findings::{Finding, Severity};
use crate::inspect::inspect_scalars;

pub const RULE_ID: &str = "GG003";

pub fn detect_bidi_controls(input: &str) -> Vec<Finding> {
    inspect_scalars(input)
        .into_iter()
        .filter_map(|scalar| {
            let description = bidi_description(scalar.character)?;

            Some(Finding {
                rule_id: RULE_ID,
                severity: severity_for(scalar.character),
                scalar_index: scalar.scalar_index,
                byte_index: scalar.byte_index,
                character: scalar.character,
                code_point: scalar.code_point,
                unicode_name: scalar.unicode_name,
                message: format!("Bidirectional control detected: {description}"),
                explanation: explanation_for(scalar.character).to_owned(),
            })
        })
        .collect()
}

fn bidi_description(character: char) -> Option<&'static str> {
    match character {
        '\u{061C}' => Some("Arabic Letter Mark"),
        '\u{200E}' => Some("Left-to-Right Mark"),
        '\u{200F}' => Some("Right-to-Left Mark"),
        '\u{202A}' => Some("Left-to-Right Embedding"),
        '\u{202B}' => Some("Right-to-Left Embedding"),
        '\u{202C}' => Some("Pop Directional Formatting"),
        '\u{202D}' => Some("Left-to-Right Override"),
        '\u{202E}' => Some("Right-to-Left Override"),
        '\u{2066}' => Some("Left-to-Right Isolate"),
        '\u{2067}' => Some("Right-to-Left Isolate"),
        '\u{2068}' => Some("First Strong Isolate"),
        '\u{2069}' => Some("Pop Directional Isolate"),
        _ => None,
    }
}

fn severity_for(character: char) -> Severity {
    match character {
        '\u{202D}' | '\u{202E}' => Severity::Suspicious,
        _ => Severity::Warning,
    }
}

fn explanation_for(character: char) -> &'static str {
    match character {
        '\u{202D}' | '\u{202E}' => {
            "Directional override controls can change the visual ordering of following text. \
             They may have legitimate uses, but can also make displayed text differ from its \
             logical Unicode order."
        }

        '\u{202A}' | '\u{202B}' | '\u{202C}' => {
            "Directional embedding controls influence bidirectional text layout. \
             They can be legitimate in multilingual text, but their presence should be visible \
             during security-sensitive inspection."
        }

        '\u{2066}' | '\u{2067}' | '\u{2068}' | '\u{2069}' => {
            "Bidirectional isolate controls affect how surrounding text participates in the \
             Unicode bidirectional algorithm. They are legitimate in many RTL/LTR contexts, \
             but are invisible formatting characters."
        }

        '\u{061C}' | '\u{200E}' | '\u{200F}' => {
            "Bidirectional marks influence text direction without displaying a visible glyph. \
             They are commonly legitimate in multilingual text, but can change how text is rendered."
        }

        _ => "Unicode bidirectional control detected.",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn detects_right_to_left_override() {
        let findings = detect_bidi_controls("abc\u{202E}def");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].rule_id, "GG003");
        assert_eq!(findings[0].code_point, 0x202E);
        assert_eq!(findings[0].severity, Severity::Suspicious);
    }

    #[test]
    fn detects_left_to_right_override() {
        let findings = detect_bidi_controls("abc\u{202D}def");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x202D);
        assert_eq!(findings[0].severity, Severity::Suspicious);
    }

    #[test]
    fn detects_right_to_left_isolate() {
        let findings = detect_bidi_controls("abc\u{2067}def");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x2067);
        assert_eq!(findings[0].severity, Severity::Warning);
    }

    #[test]
    fn detects_isolate_pair() {
        let findings = detect_bidi_controls("\u{2067}مرحبا\u{2069}");

        assert_eq!(findings.len(), 2);
        assert_eq!(findings[0].code_point, 0x2067);
        assert_eq!(findings[1].code_point, 0x2069);
    }

    #[test]
    fn detects_right_to_left_mark() {
        let findings = detect_bidi_controls("A\u{200F}B");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].code_point, 0x200F);
    }

    #[test]
    fn plain_ascii_has_no_bidi_findings() {
        let findings = detect_bidi_controls("GlyphGuard");

        assert!(findings.is_empty());
    }

    #[test]
    fn reports_multiple_bidi_controls() {
        let findings = detect_bidi_controls("A\u{202E}B\u{202C}C");

        assert_eq!(findings.len(), 2);
        assert_eq!(findings[0].code_point, 0x202E);
        assert_eq!(findings[1].code_point, 0x202C);
    }
}
