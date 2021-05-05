import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/bootstrap4-dark-purple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import registerComponents from './registerComponents'
let app = createApp(App)
app.use(PrimeVue)
registerComponents(app)

app.mount('#app')
