import { invoke } from '@tauri-apps/api/core';
import QRCode from 'qrcode';

async function renderLocalIpQr() {
  const ipTextElement = document.getElementById('ip-text');
  const canvasElement = document.getElementById('qr-canvas');

  try {
    // Rust backend'inden IP adresini en güvenli modern yöntemle istiyoruz
    const ip = await invoke('get_local_ip');
    console.log("Başarıyla Alınan IP:", ip);

    // Ekranda IP adresini göster
    if (ipTextElement) {
      ipTextElement.innerText = `IP Adresiniz: ${ip}`;
    }

    // Paket kütüphanesini kullanarak QR kodu canvas üzerine çiz
    if (canvasElement) {
      await QRCode.toCanvas(canvasElement, String(ip), {
        width: 256,
        margin: 2
      });
    }
  } catch (err) {
    console.error('IP QR yükleme hatası:', err);
    if (ipTextElement) {
      ipTextElement.innerText = 'IP adresi veya Tauri bağlantısı alınamadı!';
    }
  }
}

// Sayfa yüklendiğinde fonksiyonu çalıştır
window.addEventListener('DOMContentLoaded', () => {
  renderLocalIpQr();
});