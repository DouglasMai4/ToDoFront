import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import './style.css'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faAt, faLock, faEye, faEyeSlash, faArrowRightToBracket, faClock, faCheck, faTrash, faPlus, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faAt, faLock, faEye, faEyeSlash, faArrowRightToBracket, faClock, faCheck, faTrash, faPlus, faUser, faUserPlus)
/* fontawesome */

const pinia = createPinia()

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(pinia)
.use(router)
.mount('#app')