use unicode_script::{Script, UnicodeScript};

use crate::findings::{Finding, Severity};
use crate::inspect::inspect_scalars;

pub const RULE_ID: &str = "GG001";

pub fn detect_mixed_scripts(input: &str) -> Vec<Finding> {
    let scalars = inspect_scalars(input);

    let scripts = collect_meaningful_scripts(&scalars);

    if scripts.len() <= 1 || is_expected_script_mixture(&scripts) {
        return Vec::new();
    }

    let Some(offending_scalar) = find_first_script_transition(&scalars) else {
        return Vec::new();
    };

    let script_names = scripts
        .iter()
        .map(|script| script_name(*script))
        .collect::<Vec<_>>()
        .join(", ");

    vec![Finding {
        rule_id: RULE_ID,
        severity: Severity::Warning,
        scalar_index: offending_scalar.scalar_index,
        byte_index: offending_scalar.byte_index,
        character: offending_scalar.character,
        code_point: offending_scalar.code_point,
        unicode_name: offending_scalar.unicode_name.clone(),
        message: format!("Mixed Unicode scripts detected: {script_names}"),
        explanation: format!(
            "This text contains characters from multiple Unicode scripts ({script_names}). \
             Mixed-script text can be legitimate, but combinations such as Latin with Cyrillic \
             or Greek may create visually deceptive strings and should be reviewed."
        ),
    }]
}

fn collect_meaningful_scripts(scalars: &[crate::inspect::ScalarInfo]) -> Vec<Script> {
    let mut scripts = Vec::new();

    for scalar in scalars {
        let script = scalar.character.script();

        if is_ignored_script(script) {
            continue;
        }

        if !scripts.contains(&script) {
            scripts.push(script);
        }
    }

    scripts
}

fn find_first_script_transition(
    scalars: &[crate::inspect::ScalarInfo],
) -> Option<&crate::inspect::ScalarInfo> {
    let mut first_script = None;

    for scalar in scalars {
        let script = scalar.character.script();

        if is_ignored_script(script) {
            continue;
        }

        match first_script {
            None => first_script = Some(script),
            Some(initial_script) if initial_script != script => {
                return Some(scalar);
            }
            Some(_) => {}
        }
    }

    None
}

fn is_ignored_script(script: Script) -> bool {
    matches!(script, Script::Common | Script::Inherited | Script::Unknown)
}

fn is_expected_script_mixture(scripts: &[Script]) -> bool {
    is_japanese_script_mixture(scripts) || is_korean_script_mixture(scripts)
}

fn is_japanese_script_mixture(scripts: &[Script]) -> bool {
    scripts
        .iter()
        .all(|script| matches!(script, Script::Han | Script::Hiragana | Script::Katakana))
}

fn is_korean_script_mixture(scripts: &[Script]) -> bool {
    scripts
        .iter()
        .all(|script| matches!(script, Script::Han | Script::Hangul))
}

fn script_name(script: Script) -> &'static str {
    match script {
        Script::Latin => "Latin",
        Script::Cyrillic => "Cyrillic",
        Script::Greek => "Greek",
        Script::Arabic => "Arabic",
        Script::Hebrew => "Hebrew",
        Script::Han => "Han",
        Script::Hiragana => "Hiragana",
        Script::Katakana => "Katakana",
        Script::Hangul => "Hangul",
        Script::Devanagari => "Devanagari",
        Script::Armenian => "Armenian",
        Script::Georgian => "Georgian",
        Script::Thai => "Thai",
        _ => "Other",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn latin_only_has_no_finding() {
        let findings = detect_mixed_scripts("paypal");

        assert!(findings.is_empty());
    }

    #[test]
    fn detects_latin_and_cyrillic() {
        let findings = detect_mixed_scripts("раypal");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].rule_id, "GG001");
        assert_eq!(findings[0].severity, Severity::Warning);
    }

    #[test]
    fn detects_latin_and_greek() {
        let findings = detect_mixed_scripts("Αmazon");

        assert_eq!(findings.len(), 1);
        assert_eq!(findings[0].rule_id, "GG001");
    }

    #[test]
    fn japanese_han_and_hiragana_are_allowed() {
        let findings = detect_mixed_scripts("日本語ひらがな");

        assert!(findings.is_empty());
    }

    #[test]
    fn japanese_han_hiragana_and_katakana_are_allowed() {
        let findings = detect_mixed_scripts("日本語ひらがなカタカナ");

        assert!(findings.is_empty());
    }

    #[test]
    fn korean_hangul_and_han_are_allowed() {
        let findings = detect_mixed_scripts("한글漢字");

        assert!(findings.is_empty());
    }

    #[test]
    fn common_characters_do_not_create_mixed_script_finding() {
        let findings = detect_mixed_scripts("hello-123_world!");

        assert!(findings.is_empty());
    }

    #[test]
    fn inherited_combining_mark_does_not_create_mixed_script_finding() {
        let findings = detect_mixed_scripts("e\u{0301}");

        assert!(findings.is_empty());
    }

    #[test]
    fn arabic_only_has_no_finding() {
        let findings = detect_mixed_scripts("مرحبا");

        assert!(findings.is_empty());
    }

    #[test]
    fn hebrew_only_has_no_finding() {
        let findings = detect_mixed_scripts("שלום");

        assert!(findings.is_empty());
    }
}
