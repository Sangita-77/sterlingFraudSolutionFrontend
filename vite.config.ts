import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/dev/sterlingFraudSolutionFrontend/",
  plugins: [react()],
  server: {
    host: true,      // important (exposes to network)
    port: 5173       // optional but recommended
  }
})