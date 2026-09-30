use glyphguard_core::inspect::{inspect_graphemes, inspect_scalars};
use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ScalarDto {
    pub scalar_index: usize,
    pub byte_index: usize,

    pub character: String,

    pub code_point: u32,
    pub code_point_label: String,

    pub unicode_name: Option<String>,

    pub utf8_bytes: Vec<u8>,
    pub utf8_hex: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GraphemeDto {
    pub grapheme_index: usize,
    pub byte_index: usize,

    pub value: String,

    pub scalar_count: usize,
    pub byte_length: usize,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct InspectDto {
    pub scalars: Vec<ScalarDto>,
    pub graphemes: Vec<GraphemeDto>,
}

#[tauri::command]
pub fn inspect_text_command(text: String) -> InspectDto {
    let scalars = inspect_scalars(&text)
        .into_iter()
        .map(|scalar| {
            let code_point_label = scalar.code_point_label();

            let utf8_hex = scalar.utf8_hex();

            ScalarDto {
                scalar_index: scalar.scalar_index,

                byte_index: scalar.byte_index,

                character: scalar.character.to_string(),

                code_point: scalar.code_point,

                code_point_label,

                unicode_name: scalar.unicode_name,

                utf8_bytes: scalar.utf8_bytes,

                utf8_hex,
            }
        })
        .collect();

    let graphemes = inspect_graphemes(&text)
        .into_iter()
        .map(|grapheme| GraphemeDto {
            grapheme_index: grapheme.grapheme_index,

            byte_index: grapheme.byte_index,

            value: grapheme.value,

            scalar_count: grapheme.scalar_count,

            byte_length: grapheme.byte_length,
        })
        .collect();

    InspectDto { scalars, graphemes }
}
