import { createApp } from 'vue'
import '../shared/global.css'
import App from './App.vue'
import router from './router/router.ts'


createApp(App).use(router).mount('#app')
