import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import AutoImport from 'unplugin-auto-import/dist/vite'
// import Components from 'unplugin-vue-components/dist/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/dist/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/export.js'),
      name: 'lzz-ui',
      fileName: format => `lzz-ui.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        vue: 'Vue'
      }
    }
  }
})
