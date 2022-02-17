import { createStore } from 'vuex'
import patient from './patient'
import issue from './issue'
import loader from './loader'
import ui from './ui'

// Create a new store instance.
const store = createStore({
  modules: {
    patient,
    issue,
    loader,
    ui
  }
})

export default store