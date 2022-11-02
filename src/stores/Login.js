import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useLoginStore = defineStore('login', {
  state: () => ({
    user: null,
    id: null,
  }),
  actions: {
    async login(email, password, state) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
        if (error) throw error
        this.id = data.session.user.id
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', this.id)
          .single()

        if (error) throw error
        this.user = data.username
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      }

      localStorage.setItem('username', this.user)
      localStorage.setItem('userId', this.id)
    },
    async logout() {
      localStorage.removeItem('username')
      localStorage.removeItem('userId')

      this.user = null
      this.id = null
    },
    async getLogin() {
      if (localStorage.getItem('username')) {
        this.user = localStorage.getItem('username')
        this.id = localStorage.getItem('userId')
      }
    }
  }
})