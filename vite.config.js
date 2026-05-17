import { defineConfig } from 'vite';

export default defineConfig({
  // Sunucunun Tauri ile pürüzsüz konuşması için gerekli temel ayarlar
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
  },
  // Derleme çıktılarının Tauri'nin beklediği yere gitmesini sağlıyoruz
  build: {
    outDir: 'src-tauri/target/dist',
    emptyOutDir: true,
  }
});