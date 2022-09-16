import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      username: null,
      id: null
    }
  },
  mutations: {
    login (state, obj) {
      const user = obj

      state.username = user.username
      localStorage.setItem('username', user.username)

      state.id = user.id
      localStorage.setItem('id', user.id)
    },
    logout(state){
      state.username = null
      localStorage.removeItem('username')

      state.id = null
      localStorage.removeItem('id')
    },
    initialiseStore(state) {
      if (localStorage.getItem('username') && localStorage.getItem('id')) {
        state.username = localStorage.getItem('username')
        state.id = localStorage.getItem('id')
       }
    }
  }
})

export default store