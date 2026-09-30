use unicode_normalization::UnicodeNormalization;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct NormalizationResult {
    pub original: String,
    pub nfc: String,
    pub nfd: String,
    pub nfkc: String,
    pub nfkd: String,
}

impl NormalizationResult {
    pub fn nfc_changed(&self) -> bool {
        self.original != self.nfc
    }

    pub fn nfd_changed(&self) -> bool {
        self.original != self.nfd
    }

    pub fn nfkc_changed(&self) -> bool {
        self.original != self.nfkc
    }

    pub fn nfkd_changed(&self) -> bool {
        self.original != self.nfkd
    }
}

pub fn normalize(input: &str) -> NormalizationResult {
    NormalizationResult {
        original: input.to_owned(),
        nfc: input.nfc().collect(),
        nfd: input.nfd().collect(),
        nfkc: input.nfkc().collect(),
        nfkd: input.nfkd().collect(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn decomposed_e_changes_under_nfc() {
        let result = normalize("e\u{0301}");

        assert_eq!(result.nfc, "é");
        assert!(result.nfc_changed());
    }

    #[test]
    fn composed_e_changes_under_nfd() {
        let result = normalize("é");

        assert_eq!(result.nfd, "e\u{0301}");
        assert!(result.nfd_changed());
    }

    #[test]
    fn ascii_is_stable_under_all_forms() {
        let result = normalize("GlyphGuard");

        assert!(!result.nfc_changed());
        assert!(!result.nfd_changed());
        assert!(!result.nfkc_changed());
        assert!(!result.nfkd_changed());
    }

    #[test]
    fn compatibility_character_changes_under_nfkc() {
        let result = normalize("Ａ");

        assert_eq!(result.nfkc, "A");
        assert!(result.nfkc_changed());
    }

    #[test]
    fn empty_input_remains_empty() {
        let result = normalize("");

        assert_eq!(result.original, "");
        assert_eq!(result.nfc, "");
        assert_eq!(result.nfd, "");
        assert_eq!(result.nfkc, "");
        assert_eq!(result.nfkd, "");
    }
}
