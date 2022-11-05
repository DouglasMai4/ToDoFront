import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { supabase } from './supabase'

import router from './router'
import App from './App.vue'

import './style.css'

/* fontawesome */
import { faAt, faLock, faEye, faEyeSlash,
		 faArrowRightToBracket, faClock,
		 faCheck, faTrash, faPlus, faUser,
		 faUserPlus, faArrowRightFromBracket,
		 faRepeat, faArrowLeft, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

library.add(faAt, faLock, faEye, faEyeSlash,
			faArrowRightToBracket, faClock,
			faCheck, faTrash, faPlus, faUser,
			faUserPlus, faArrowRightFromBracket,
			faRepeat, faArrowLeft, faCircleNotch)
/* fontawesome */

const app = createApp(App)

try {
	const { data, error } = await supabase.auth.getUser()

	if (!error) {
		app.config.globalProperties.username = data.user.user_metadata.username
		app.config.globalProperties.userId = data.user.id
	}
} catch (error) {
	console.log('Error: ', error)
}

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')