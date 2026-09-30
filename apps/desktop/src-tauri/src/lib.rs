mod commands;

use commands::{
    compare_text_command, inspect_text_command, normalize_text_command, scan_directory_command,
    scan_file_command, scan_path_command, scan_text_command,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            scan_text_command,
            compare_text_command,
            inspect_text_command,
            normalize_text_command,
            scan_file_command,
            scan_directory_command,
            scan_path_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running GlyphGuard");
}
