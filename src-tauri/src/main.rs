#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use local_ip_address::local_ip;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let ip_address = match local_ip() {
                Ok(ip) => ip.to_string(),
                Err(_) => "127.0.0.1".to_string(),
            };

            let main_window = app.get_webview_window("main").unwrap();
            main_window.emit("ip-event", ip_address).unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}