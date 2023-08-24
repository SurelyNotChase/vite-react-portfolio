import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      // ... other dependencies ...
    ]
  },
  rollupOptions: {
    input: 'src/main.jsx', // Replace with the actual path to your entry file
  },
})