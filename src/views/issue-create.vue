<template>
<div class="my-3 font-monospace card">
  <h3 class="text-start card-header">Catch </h3>
<div class="card-body">
<h5 class="text-start card-title">Create Catch </h5>
<div class="container">
    <form @submit.prevent="submit" class="needs-validation row g-5" novalidate>
      <div class="col-lg-9 d-flex flex-column align-items-start">
        <label for="name" class="form-label fw-bold">Summmary</label>
        <textarea  v-model="state.summary" :class="{ 'is-invalid' : v$.summary.$error}" type="text" placeholder="Summary" class="form-control" id="summary"></textarea>
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback text-start" v-if="v$.summary.$error">Summary is required</div>
      </div>

      <div class="col-lg-3 col-md-6 col-sm-6 d-flex flex-column align-items-start">
        <label for="type" class="form-label fw-bold">Catch</label>
        <select v-model="state.type" :class="{ 'is-invalid' : v$.type.$error}" class="form-select" id="type">
          <option selected disabled value="">Choose...</option>
          <option>Story</option>
          <option>Defect</option>
          <option>Task</option>
          <option>Epic</option>
        </select>
        <div class="invalid-feedback text-start" v-if="v$.type.$error">
          Please select a catch type
        </div>
      </div>

      <div class="col-lg-3 col-md-6 col-sm-6 d-flex flex-column align-items-start">
        <label for="type" class="form-label fw-bold">Status</label>
        <select v-model="state.status" :class="{ 'is-invalid' : v$.status.$error}" class="form-select" id="status">
          <option selected disabled value="">Choose...</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Blocked</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
        <div class="invalid-feedback text-start" v-if="v$.status.$error">
          Please select status
        </div>
      </div>
    
    
    <div class="col-lg-6 col-md-8 d-flex flex-column align-items-start">
      <label for="description" class="form-label fw-bold">Description</label>
      <textarea v-model="state.description" placeholder="Description" class="form-control" id="description"></textarea>
    </div>

    <div class="col-lg-3 col-md-4 col-sm-6 d-flex flex-column align-items-start">
        <label for="estimate" class="form-label fw-bold">Estimate</label>
        <input v-model="state.estimate" type="text" placeholder="Estimate" class="form-control" id="estimate">
      </div>

      <div class="col-lg-9 col-md-12 d-flex flex-column align-items-start">
      <label for="remarks" class="form-label fw-bold">Remarks</label>
      <textarea v-model="state.remarks" placeholder="Remarks" class="form-control" id="remarks"></textarea>
    </div>
    
    <div class="col-12">
      <div class="row">
        <div class="col-6 d-flex flex-column align-items-end"><button class="btn btn-primary" type="submit">Submit</button></div>
        <div class="col-6 d-flex flex-column align-items-start"><button @click="cancel" class="btn btn-danger" type="button">Cancel</button></div>
      </div>
    </div>
</form>
</div>
</div>
</div>
</template>


<script>
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useStore } from 'vuex';
import { CREATE_ISSUE, NAVIGATE_PUSH } from '../store/actions-type';

export default {
  name : 'issue-create',
  setup () {
    const state = reactive({
      summary: '',
      type: '',
      status: '',
      description: '',
      remarks : '',
      expectations : '',
      estimate : '',
      remaining : ''
    })
    const rules = {
      summary: { required },
      type: { required },
      status: {required}
    }

    const store = useStore()
    const cancel = () => {
        store.dispatch(NAVIGATE_PUSH, `/catch/list/1`);
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$, cancel }
  },
  methods: {
    async submit () {
      const result = await this.v$.$validate()
      console.log(result)
      if (!result) {
        return
      }
      // console.log(this.$v)
      this.$store.dispatch(CREATE_ISSUE, {...this.state, app_id:100});
    }
  }
}
</script>