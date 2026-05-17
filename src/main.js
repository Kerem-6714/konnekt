import { invoke } from '@tauri-apps/api/core';
import QRCode from 'qrcode';

async function renderLocalIpQr() {
  const ipTextElement = document.getElementById('ip-text');
  const canvasElement = document.getElementById('qr-canvas');

  try {
    // --- TAURI V2 YÜKLENME KORUMASI ---
    // Tarayıcı motorunun (WebKit) Tauri iç fonksiyonlarını tamamen hazır etmesini bekliyoruz
    let attempts = 0;
    while ((typeof window === 'undefined' || !window.__TAURI_INTERNALS__) && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    // ----------------------------------

    // Şimdi güvenle çağırabiliriz, core.js artık çökmeyecek
    const ip = await invoke('get_local_ip');
    console.log("Başarıyla Alınan IP:", ip);

    if (ipTextElement) {
      ipTextElement.innerText = `IP Adresiniz: ${ip}`;
    }

    if (canvasElement) {
      await QRCode.toCanvas(canvasElement, String(ip), {
        width: 256,
        margin: 2
      });
    }
  } catch (err) {
    console.error('IP QR yükleme hatası:', err);
    if (ipTextElement) {
      ipTextElement.innerText = 'Bağlantı hatası!';
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderLocalIpQr();
});