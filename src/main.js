import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/main.css'

const app = createApp(App)

// FontAwesowe
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser, faUserPlus, faPen,
		 faEye, faEyeSlash,
		 faArrowRightToBracket,
		 faArrowRightFromBracket,
		 faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faUserPlus, faPen,
			faEye, faEyeSlash,
			faArrowRightToBracket,
			faArrowRightFromBracket,
			faTrash, faPlus, faCheck)
// FontAwesowe

app.use(router)

app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')