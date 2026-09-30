use unicode_security::{is_potential_mixed_script_confusable_char, skeleton};

use crate::findings::{Finding, Severity};
use crate::inspect::inspect_scalars;

use super::mixed_scripts::detect_mixed_scripts;

pub const RULE_ID: &str = "GG004";

pub fn detect_unicode_confusables(input: &str) -> Vec<Finding> {
    // For the generic scan command we currently report confusables only
    // when the input already contains a suspicious mixture of scripts.
    //
    // This avoids treating ordinary text written entirely in another
    // legitimate script as suspicious simply because some of its glyphs
    // have visual equivalents in another script.
    if detect_mixed_scripts(input).is_empty() {
        return Vec::new();
    }

    inspect_scalars(input)
        .into_iter()
        .filter(|scalar| {
            !scalar.character.is_ascii()
                && is_potential_mixed_script_confusable_char(scalar.character)
        })
        .map(|scalar| {
            let character_string = scalar.character.to_string();
            let character_skeleton = confusable_skeleton(&character_string);
            let code_point_label = scalar.code_point_label();

            Finding {
                rule_id: RULE_ID,
                severity: Severity::Suspicious,
                scalar_index: scalar.scalar_index,
                byte_index: scalar.byte_index,
                character: scalar.character,
                code_point: scalar.code_point,
                unicode_name: scalar.unicode_name,
                message: format!("Potential Unicode confusable detected: {code_point_label}"),
                explanation: format!(
                    "This non-ASCII character appears in mixed-script text and is classified \
                     as a potential mixed-script confusable by Unicode security data. \
                     Its UTS #39 skeleton is {:?}. This does not prove malicious intent, \
                     but the character may visually resemble one from another script.",
                    character_skeleton
                ),
            }
        })
        .collect()
}

pub fn confusable_skeleton(input: &str) -> String {
    skeleton(input).collect()
}

pub fn have_same_confusable_skeleton(left: &str, right: &str) -> bool {
    confusable_skeleton(left) == confusable_skeleton(right)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn plain_ascii_has_no_confusable_findings() {
        let findings = detect_unicode_confusables("paypal");

        assert!(findings.is_empty());
    }

    #[test]
    fn detects_cyrillic_confusables_inside_latin_text() {
        let findings = detect_unicode_confusables("раypal");

        assert!(!findings.is_empty());
        assert!(findings.iter().all(|finding| finding.rule_id == "GG004"));
    }

    #[test]
    fn detects_greek_confusable_inside_latin_text() {
        let findings = detect_unicode_confusables("Αmazon");

        assert!(!findings.is_empty());
        assert_eq!(findings[0].rule_id, "GG004");
        assert_eq!(findings[0].severity, Severity::Suspicious);
    }

    #[test]
    fn pure_cyrillic_text_is_not_reported_by_scan_rule() {
        let findings = detect_unicode_confusables("Привет");

        assert!(findings.is_empty());
    }

    #[test]
    fn pure_greek_text_is_not_reported_by_scan_rule() {
        let findings = detect_unicode_confusables("Ελλάδα");

        assert!(findings.is_empty());
    }

    #[test]
    fn legitimate_japanese_text_is_not_reported() {
        let findings = detect_unicode_confusables("日本語とカタカナ");

        assert!(findings.is_empty());
    }

    #[test]
    fn paypal_and_cyrillic_variant_share_skeleton() {
        assert!(have_same_confusable_skeleton("paypal", "раypal"));
    }

    #[test]
    fn unrelated_strings_do_not_share_skeleton() {
        assert!(!have_same_confusable_skeleton("paypal", "github"));
    }

    #[test]
    fn skeleton_is_stable_for_plain_ascii_example() {
        assert_eq!(confusable_skeleton("paypal"), confusable_skeleton("paypal"));
    }
}
