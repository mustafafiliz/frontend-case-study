import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import DropdownMenu from 'v-dropdown-menu'
import Vue3Toastify from 'vue3-toastify'

import 'v-dropdown-menu/css'
import 'vue3-toastify/dist/index.css'
import 'vue-multiselect/dist/vue-multiselect.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(DropdownMenu)
app.use(Vue3Toastify, {
  autoClose: 2000
})

app.mount('#app')
