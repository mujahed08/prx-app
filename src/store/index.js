import { createStore } from 'vuex'
import patient from './patient'
import loader from './loader'

// Create a new store instance.
const store = createStore({
  modules: {
    patient,
    loader
  }
})

export default store