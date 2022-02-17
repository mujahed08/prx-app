import { fetchIssue, createIssue, getIssueList, editIssue, _deleteIssue } from '../api/issue'
import { CREATE_ISSUE, DELETE_ISSUE, EDIT_ISSUE, FETCH_ISSUE, FETCH_ISSUE_LIST, NAVIGATE_PUSH } from "./actions-type";
import { SET_ISSUE, UNSET_SPINNER, SET_SPINNER, SET_ISSUE_LIST } from "./mutations-type";
import { lmt } from './ui';


const initialState = {
    issue: {
        "id" : '',
        "type" : '',
        "summary" : '',
        "status" : '',
        "description" : "",
        "expectations" : '',
        "remarks" : '',
        "estimate" : '',
        "remaining" : '',
        "weightage" : 1,   
        "updated_on" : null
    },
    issueList: {
      'data' : [],
      'page' : 0,
      'total' : 0
    }
}

export const state = { ...initialState }

export const actions = {
    async [FETCH_ISSUE](context, id) {
      console.log('fetching issue details of id:')
      console.log(id)
      context.commit(SET_SPINNER);
      const data = await fetchIssue(id)
      context.commit(SET_ISSUE, data);
      context.commit(UNSET_SPINNER);
      return data;
    },
    async [FETCH_ISSUE_LIST](context, page) {
      context.commit(SET_SPINNER);
      try {
        const data = await getIssueList(page.page_number, page.limit)
        context.commit(SET_ISSUE_LIST, data);
        return data;
      } catch(e) {
        console.log(e)
      }finally {
        context.commit(UNSET_SPINNER);
      }
    },
    async [CREATE_ISSUE](context, payload) {
      context.commit(SET_SPINNER);
      try {
        const data = await createIssue(payload)
        context.commit(SET_ISSUE, data);
        context.dispatch(NAVIGATE_PUSH, `/catch/list/1`);
        return data;
      } catch(e) {
        console.log(e)
      }finally {
        context.commit(UNSET_SPINNER);
      }
    },
    async [EDIT_ISSUE](context, payload) {
      const { id } = payload
      delete payload._id
      context.commit(SET_SPINNER);
      try {
        const data = await editIssue(id, payload)
        context.commit(SET_ISSUE, data);
        context.dispatch(NAVIGATE_PUSH, `/catch/list/2`);
        return data;
      } catch(e) {
        console.log(e)
      }finally {
        context.commit(UNSET_SPINNER);
      }
    },
    async [DELETE_ISSUE](context, payload) {
      const { id, page } = payload
      context.commit(SET_SPINNER);
      try {
        const data = await _deleteIssue(id)
        console.log(data)
        context.dispatch(FETCH_ISSUE_LIST, {...lmt, 'page_number' : page} );
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
    [SET_ISSUE](state, data) {
      state.issue = data
    },
    [SET_ISSUE_LIST](state, data) {
      state.issueList = data
    }
  }
  
  const getters = {
    issue(state) {
      return state.issue
    },
    issueList(state) {
      return state.issueList
    }
  };
  
  export default {
    state,
    actions,
    mutations,
    getters
  };