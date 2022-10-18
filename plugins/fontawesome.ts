import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faPlus, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faEye, faEyeSlash)
library.add(faPlus, faTrash, faCheck, faX)

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})