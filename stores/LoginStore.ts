import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
	state: () => ({
		usr: null,
		usr_id: null
	}),
	actions: {
		login(usr, id) {
			this.usr = usr
			this.usr_id = id

			if (process.client) {
				localStorage.setItem('user', usr)
				localStorage.setItem('id', id)
			}
		},
		logout() {
			this.usr = null
			this.usr_id = null

			localStorage.removeItem('user')
			localStorage.removeItem('id')
		},
		startLogin() {
			if (localStorage.getItem('user')) {
				this.usr = localStorage.getItem('user')
				this.usr_id = localStorage.getItem('id')
			}
		}
	}
})