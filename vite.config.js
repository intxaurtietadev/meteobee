import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
})

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         pathRewrite: { '^/api': '' }
//       }
//     }
//   }
// }
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
