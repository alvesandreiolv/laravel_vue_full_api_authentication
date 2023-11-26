//Adds picocss.
import '@picocss/pico/css/pico.min.css';
//Adds font-awesome.
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')