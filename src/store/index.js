import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      username: null,
      user_id: null
    }
  },
  mutations: {
    login (state, user, userId) {
      state.username = user
      localStorage.setItem('username', user)
      
      state.user_id = userId
      localStorage.setItem('user_id', userId)
    },
    logout(state){
      state.username = null
      localStorage.removeItem('username')

      state.user_id = null
      localStorage.removeItem('user_id')
    },
    initialiseStore(state) {
      if (localStorage.getItem('username')) {
        state.username = localStorage.getItem('username')
        state.user_id = localStorage.getItem('user_id')
       }
    }
  }
})

export default store