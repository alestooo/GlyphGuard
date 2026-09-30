use glyphguard_core::normalize::normalize;
use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct NormalizationDto {
    pub original: String,

    pub nfc: String,
    pub nfd: String,
    pub nfkc: String,
    pub nfkd: String,

    pub nfc_changed: bool,
    pub nfd_changed: bool,
    pub nfkc_changed: bool,
    pub nfkd_changed: bool,
}

#[tauri::command]
pub fn normalize_text_command(text: String) -> NormalizationDto {
    let result = normalize(&text);

    NormalizationDto {
        original: result.original.clone(),

        nfc: result.nfc.clone(),

        nfd: result.nfd.clone(),

        nfkc: result.nfkc.clone(),

        nfkd: result.nfkd.clone(),

        nfc_changed: result.nfc_changed(),

        nfd_changed: result.nfd_changed(),

        nfkc_changed: result.nfkc_changed(),

        nfkd_changed: result.nfkd_changed(),
    }
}
