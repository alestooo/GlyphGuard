use unicode_segmentation::UnicodeSegmentation;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct GraphemeInfo {
    pub grapheme_index: usize,
    pub byte_index: usize,
    pub value: String,
    pub scalar_count: usize,
    pub byte_length: usize,
}

pub fn inspect_graphemes(input: &str) -> Vec<GraphemeInfo> {
    input
        .grapheme_indices(true)
        .enumerate()
        .map(|(grapheme_index, (byte_index, grapheme))| GraphemeInfo {
            grapheme_index,
            byte_index,
            value: grapheme.to_owned(),
            scalar_count: grapheme.chars().count(),
            byte_length: grapheme.len(),
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn composed_e_is_one_grapheme_and_one_scalar() {
        let result = inspect_graphemes("é");

        assert_eq!(result.len(), 1);
        assert_eq!(result[0].value, "é");
        assert_eq!(result[0].scalar_count, 1);
        assert_eq!(result[0].byte_length, 2);
    }

    #[test]
    fn decomposed_e_is_one_grapheme_and_two_scalars() {
        let result = inspect_graphemes("e\u{0301}");

        assert_eq!(result.len(), 1);
        assert_eq!(result[0].value, "e\u{0301}");
        assert_eq!(result[0].scalar_count, 2);
    }

    #[test]
    fn zwj_emoji_is_one_grapheme_with_multiple_scalars() {
        let result = inspect_graphemes("👨‍💻");

        assert_eq!(result.len(), 1);
        assert_eq!(result[0].value, "👨‍💻");
        assert_eq!(result[0].scalar_count, 3);
    }

    #[test]
    fn flag_is_one_grapheme_with_two_scalars() {
        let result = inspect_graphemes("🇨🇷");

        assert_eq!(result.len(), 1);
        assert_eq!(result[0].value, "🇨🇷");
        assert_eq!(result[0].scalar_count, 2);
    }

    #[test]
    fn tracks_grapheme_byte_offsets() {
        let result = inspect_graphemes("Aé👨‍💻");

        assert_eq!(result.len(), 3);

        assert_eq!(result[0].byte_index, 0);
        assert_eq!(result[1].byte_index, 1);
        assert_eq!(result[2].byte_index, 3);
    }
}
