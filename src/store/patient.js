import { getPatient } from "../api";
import { FETCH_PATIENT } from "./actions-type";
import { SET_PATIENT, UNSET_SPINNER, SET_SPINNER } from "./mutations-type";


const initialState = {
    patient: {
        "name" : '',
        "gender" : '',
        "age" : null,
        "age_in" : '',
        "country_code" : "+91",
        "mobile_no" : '',
        "address" : '',
        "app_id" : null
    },
    comments: []
}

export const state = { ...initialState }

export const actions = {
    async [FETCH_PATIENT](context, patientSlug, prevPatient) {
      // avoid extronuous network call if article exists
      console.log(patientSlug)
      console.log(prevPatient)
      //if (prevPatient !== undefined) {
        //return context.commit(SET_PATIENT, prevArticle);
      //}
      context.commit(SET_SPINNER);
      const data = await getPatient()
      context.commit(SET_PATIENT, data.patient);
      context.commit(UNSET_SPINNER);
      return data;
    }
  }
  
  /* eslint no-param-reassign: ["error", { "props": false }] */
  export const mutations = {
    [SET_PATIENT](state, patient) {
      state.patient = patient
    }
  }
  
  const getters = {
    patient(state) {
      return state.patient
    },
    comments(state) {
      return state.comments
    }
  };
  
  export default {
    state,
    actions,
    mutations,
    getters
  };