import { fetchPatient, createPatient, getPatientList, editPatient, _deletePatient } from '../api/patient'
import { CREATE_PATIENT, DELETE_PATIENT, EDIT_PATIENT, FETCH_PATIENT, FETCH_PATIENT_LIST, NAVIGATE_PUSH } from "./actions-type";
import { SET_PATIENT, UNSET_SPINNER, SET_SPINNER, SET_PATIENT_LIST } from "./mutations-type";
import { lmt } from './ui';


const initialState = {
    patient: {
        "name" : 'ABC',
        "gender" : '',
        "age" : null,
        "age_in" : '',
        "country_code" : "+91",
        "mobile_no" : '',
        "address" : '',
        "app_id" : null
    },
    patientList: {
      'data' : [],
      'page' : 0,
      'total' : 0
    }
}

export const state = { ...initialState }

export const actions = {
    async [FETCH_PATIENT](context, id) {
      console.log('fetching patient details of id:')
      console.log(id)
      context.commit(SET_SPINNER);
      const data = await fetchPatient(id)
      context.commit(SET_PATIENT, data);
      context.commit(UNSET_SPINNER);
      return data;
    },
    async [FETCH_PATIENT_LIST](context, page) {
      context.commit(SET_SPINNER);
      try {
        const data = await getPatientList(page.page_number, page.limit)
        context.commit(SET_PATIENT_LIST, data);
        return data;
      } catch(e) {
        console.log(e)
      }finally {
        context.commit(UNSET_SPINNER);
      }
    },
    async [CREATE_PATIENT](context, payload) {
      context.commit(SET_SPINNER);
      try {
        const data = await createPatient(payload)
        context.commit(SET_PATIENT, data);
        context.dispatch(NAVIGATE_PUSH, `/patient/edit/${data.id}`);
        return data;
      } catch(e) {
        console.log(e)
      }finally {
        context.commit(UNSET_SPINNER);
      }
    },
    async [EDIT_PATIENT](context, payload) {
      const { id } = payload
      delete payload._id
      context.commit(SET_SPINNER);
      try {
        const data = await editPatient(id, payload)
        context.commit(SET_PATIENT, data);
        context.dispatch(NAVIGATE_PUSH, `/patient/list/2`);
        return data;
      } catch(e) {
        console.log(e)
      }finally {
        context.commit(UNSET_SPINNER);
      }
    },
    async [DELETE_PATIENT](context, payload) {
      const { id, page } = payload
      context.commit(SET_SPINNER);
      try {
        const data = await _deletePatient(id)
        console.log(data)
        context.dispatch(FETCH_PATIENT_LIST, {...lmt, 'page_number' : page} );
        return data;
      } catch(e) {
        console.log(e)
      }finally {
        context.commit(UNSET_SPINNER);
      }
    }
  }
  
  /* eslint no-param-reassign: ["error", { "props": false }] */
  export const mutations = {
    [SET_PATIENT](state, data) {
      state.patient = data
    },
    [SET_PATIENT_LIST](state, data) {
      state.patientList = data
    }
  }
  
  const getters = {
    patient(state) {
      return state.patient
    },
    patientList(state) {
      return state.patientList
    }
  };
  
  export default {
    state,
    actions,
    mutations,
    getters
  };