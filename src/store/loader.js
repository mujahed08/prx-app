import { SET_SPINNER, UNSET_SPINNER } from "./mutations-type";


const initialState = {
    loader: false
}

export const state = { ...initialState }


export const mutations = {
    [SET_SPINNER](state) {
        state.loader = true
    },
    [UNSET_SPINNER](state) {
        state.loader = false
    }
}
  
  const getters = {
    loader(state) {
      return state.loader
    }
  };
  
  export default {
    state,
    mutations,
    getters
  };