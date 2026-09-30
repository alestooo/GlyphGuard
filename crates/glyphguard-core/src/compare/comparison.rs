use crate::inspect::inspect_scalars;
use crate::normalize::normalize;
use crate::rules::{confusable_skeleton, have_same_confusable_skeleton};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ComparisonDifference {
    pub scalar_index: usize,

    pub left_character: Option<char>,
    pub left_code_point: Option<u32>,
    pub left_unicode_name: Option<String>,

    pub right_character: Option<char>,
    pub right_code_point: Option<u32>,
    pub right_unicode_name: Option<String>,
}

impl ComparisonDifference {
    pub fn left_code_point_label(&self) -> Option<String> {
        self.left_code_point.map(|value| format!("U+{value:04X}"))
    }

    pub fn right_code_point_label(&self) -> Option<String> {
        self.right_code_point.map(|value| format!("U+{value:04X}"))
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ComparisonResult {
    pub left: String,
    pub right: String,

    pub binary_equal: bool,
    pub nfc_equal: bool,
    pub nfkc_equal: bool,
    pub confusable_skeleton_equal: bool,

    pub left_skeleton: String,
    pub right_skeleton: String,

    pub differences: Vec<ComparisonDifference>,
}

pub fn compare_strings(left: &str, right: &str) -> ComparisonResult {
    let left_normalized = normalize(left);
    let right_normalized = normalize(right);

    let left_skeleton = confusable_skeleton(left);
    let right_skeleton = confusable_skeleton(right);

    ComparisonResult {
        left: left.to_owned(),
        right: right.to_owned(),

        binary_equal: left == right,
        nfc_equal: left_normalized.nfc == right_normalized.nfc,
        nfkc_equal: left_normalized.nfkc == right_normalized.nfkc,
        confusable_skeleton_equal: have_same_confusable_skeleton(left, right),

        left_skeleton,
        right_skeleton,

        differences: collect_differences(left, right),
    }
}

fn collect_differences(left: &str, right: &str) -> Vec<ComparisonDifference> {
    let left_scalars = inspect_scalars(left);
    let right_scalars = inspect_scalars(right);

    let max_len = left_scalars.len().max(right_scalars.len());

    let mut differences = Vec::new();

    for scalar_index in 0..max_len {
        let left_scalar = left_scalars.get(scalar_index);
        let right_scalar = right_scalars.get(scalar_index);

        let same_character = match (left_scalar, right_scalar) {
            (Some(left), Some(right)) => left.character == right.character,

            (None, None) => true,

            _ => false,
        };

        if same_character {
            continue;
        }

        differences.push(ComparisonDifference {
            scalar_index,

            left_character: left_scalar.map(|scalar| scalar.character),

            left_code_point: left_scalar.map(|scalar| scalar.code_point),

            left_unicode_name: left_scalar.and_then(|scalar| scalar.unicode_name.clone()),

            right_character: right_scalar.map(|scalar| scalar.character),

            right_code_point: right_scalar.map(|scalar| scalar.code_point),

            right_unicode_name: right_scalar.and_then(|scalar| scalar.unicode_name.clone()),
        });
    }

    differences
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn identical_strings_are_equal() {
        let result = compare_strings("paypal", "paypal");

        assert!(result.binary_equal);
        assert!(result.nfc_equal);
        assert!(result.nfkc_equal);
        assert!(result.confusable_skeleton_equal);
        assert!(result.differences.is_empty());
    }

    #[test]
    fn composed_and_decomposed_e_are_not_binary_equal() {
        let result = compare_strings("é", "e\u{0301}");

        assert!(!result.binary_equal);
        assert!(result.nfc_equal);
    }

    #[test]
    fn fullwidth_and_ascii_are_nfkc_equal() {
        let result = compare_strings("ＡＢＣ", "ABC");

        assert!(!result.binary_equal);
        assert!(result.nfkc_equal);
    }

    #[test]
    fn paypal_and_cyrillic_variant_share_skeleton() {
        let result = compare_strings("paypal", "раypal");

        assert!(!result.binary_equal);
        assert!(!result.nfc_equal);
        assert!(result.confusable_skeleton_equal);
    }

    #[test]
    fn paypal_and_cyrillic_variant_have_two_differences() {
        let result = compare_strings("paypal", "раypal");

        assert_eq!(result.differences.len(), 2);

        assert_eq!(result.differences[0].scalar_index, 0);
        assert_eq!(result.differences[0].left_code_point, Some(0x0070));
        assert_eq!(result.differences[0].right_code_point, Some(0x0440));

        assert_eq!(result.differences[1].scalar_index, 1);
        assert_eq!(result.differences[1].left_code_point, Some(0x0061));
        assert_eq!(result.differences[1].right_code_point, Some(0x0430));
    }

    #[test]
    fn detects_extra_character_on_right() {
        let result = compare_strings("abc", "abcd");

        assert_eq!(result.differences.len(), 1);

        let difference = &result.differences[0];

        assert_eq!(difference.scalar_index, 3);
        assert_eq!(difference.left_character, None);
        assert_eq!(difference.right_character, Some('d'));
    }

    #[test]
    fn detects_extra_character_on_left() {
        let result = compare_strings("abcd", "abc");

        assert_eq!(result.differences.len(), 1);

        let difference = &result.differences[0];

        assert_eq!(difference.scalar_index, 3);
        assert_eq!(difference.left_character, Some('d'));
        assert_eq!(difference.right_character, None);
    }

    #[test]
    fn code_point_labels_are_formatted() {
        let result = compare_strings("p", "р");

        let difference = &result.differences[0];

        assert_eq!(
            difference.left_code_point_label().as_deref(),
            Some("U+0070")
        );

        assert_eq!(
            difference.right_code_point_label().as_deref(),
            Some("U+0440")
        );
    }
}
