// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use local_ip_address::local_ip;
use tauri::Manager; // Event gönderebilmek için Manager'ı ekledik

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Uygulama başlar başlamaz local IP'yi alıyoruz
            let ip_address = match local_ip() {
                Ok(ip) => ip.to_string(),
                Err(_) => "127.0.0.1".to_string(),
            };

            // Ana pencereyi buluyoruz
            let main_window = app.get_webview_window("main").unwrap();
            
            // IP adresini "ip-event" adıyla ön yüze fırlatıyoruz
            main_window.emit("ip-event", ip_address).unwrap();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}