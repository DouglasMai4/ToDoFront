import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

// FontAwesowe
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser, faPen, faEye, faEyeSlash, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faPen, faEye, faEyeSlash, faArrowRightToBracket)
// FontAwesowe

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')