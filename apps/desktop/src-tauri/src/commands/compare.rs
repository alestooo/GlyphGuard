use glyphguard_core::compare::{compare_strings, ComparisonDifference};
use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ComparisonDifferenceDto {
    pub scalar_index: usize,

    pub left_character: Option<String>,
    pub left_code_point_label: Option<String>,
    pub left_unicode_name: Option<String>,

    pub right_character: Option<String>,
    pub right_code_point_label: Option<String>,
    pub right_unicode_name: Option<String>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ComparisonDto {
    pub left: String,
    pub right: String,

    pub binary_equal: bool,
    pub nfc_equal: bool,
    pub nfkc_equal: bool,
    pub confusable_skeleton_equal: bool,

    pub left_skeleton: String,
    pub right_skeleton: String,

    pub differences: Vec<ComparisonDifferenceDto>,
}

#[tauri::command]
pub fn compare_text_command(left: String, right: String) -> ComparisonDto {
    let result = compare_strings(&left, &right);

    ComparisonDto {
        left: result.left,
        right: result.right,

        binary_equal: result.binary_equal,

        nfc_equal: result.nfc_equal,

        nfkc_equal: result.nfkc_equal,

        confusable_skeleton_equal: result.confusable_skeleton_equal,

        left_skeleton: result.left_skeleton,

        right_skeleton: result.right_skeleton,

        differences: result
            .differences
            .into_iter()
            .map(convert_difference)
            .collect(),
    }
}

fn convert_difference(difference: ComparisonDifference) -> ComparisonDifferenceDto {
    let left_code_point_label = difference.left_code_point_label();

    let right_code_point_label = difference.right_code_point_label();

    let left_character = difference
        .left_character
        .map(|character| character.to_string());

    let right_character = difference
        .right_character
        .map(|character| character.to_string());

    ComparisonDifferenceDto {
        scalar_index: difference.scalar_index,

        left_character,
        left_code_point_label,

        left_unicode_name: difference.left_unicode_name,

        right_character,
        right_code_point_label,

        right_unicode_name: difference.right_unicode_name,
    }
}
