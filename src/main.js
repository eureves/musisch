import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidate from '@/includes/validation'
import { auth } from './includes/firebase'
import Icon from '@/directives/icon'
import i18n from '@/includes/i18n'
import progressBar from './includes/progressBar'
import 'nprogress/nprogress.css'

progressBar(router)

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    console.log('hello')
    app = createApp(App)

    app.use(createPinia())
    app.use(router)

    app.use(VeeValidate)

    app.directive('icon', Icon)

    app.use(i18n)

    app.mount('#app')
  }
})
