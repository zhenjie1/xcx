import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import 'uno.css'
import { startAuth } from '@/assets/auth.ts'
import piniaPersist from 'pinia-plugin-persist-uni'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = Pinia.createPinia()
  pinia.use(piniaPersist)

  app.use(pinia)
  return {
    app,
    Pinia,
  }
}

startAuth()
