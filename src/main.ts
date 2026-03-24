import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura' 

import 'primeicons/primeicons.css'
import './style.css'

import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark' // Adicione esta configuração aqui!
    }
  }
})

app.use(ConfirmationService)

app.mount('#app')