import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // For GitHub Pages: Set base to your repository name
    // Change 'val' to your actual GitHub repository name
    base: '/val/',
})
