import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // 打包文件放到 electron
    outDir: 'electron/pages'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://jr21lr87973.vicp.fun', // 目标服务器的地址
        changeOrigin: true, // 是否改变请求的源
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，将 '/api' 前缀去掉
      }
    }
  }
})
//C3更改1
