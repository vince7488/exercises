import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The GoDaddy mode emits URLs beneath the public /kbh-demo/ deployment directory.
export default defineConfig(({ mode }) => {
  const isGoDaddyDemo = mode === 'godaddy'

  return {
    plugins: [react()],
    base: isGoDaddyDemo ? '/kbh-demo/' : '/',
  }
})
