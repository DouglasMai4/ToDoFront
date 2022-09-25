import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faEye, faEyeSlash, faArrowRightToBracket, faArrowRightFromBracket, faCheck, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faEye)
library.add(faPlus)
library.add(faUser)
library.add(faTrash)
library.add(faCheck)
library.add(faEyeSlash)
library.add(faArrowRightToBracket)
library.add(faArrowRightFromBracket)

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})