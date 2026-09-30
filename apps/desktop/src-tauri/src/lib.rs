mod commands;

use commands::scan_text_command;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .invoke_handler(tauri::generate_handler![scan_text_command])
        .run(tauri::generate_context!())
        .expect("error while running GlyphGuard");
}
