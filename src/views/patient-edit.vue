<template>
<div class="my-3 font-monospace card">
  <h3 class="text-start card-header">Patient {{patient.name}}</h3>
  <div class="card-body">
    <h5 class="text-start card-title">Edit Patient </h5>
    <div class="container">
  <form @submit.prevent="submit" class="needs-validation row g-5" novalidate>
    <div class="col-lg-6 d-flex flex-column align-items-start">
      <label for="name" class="form-label">Patient Name</label>
      <input  v-model="state.name" :class="{ 'is-invalid' : v$.name.$error}" type="text" class="form-control" id="name">
      <div class="valid-feedback">
        Looks good!
      </div>
      <div class="invalid-feedback" v-if="v$.name.$error">
          Name is required
      </div>
    </div>
    

    <div class="col-lg-3 col-md-4 col-sm-6 d-flex flex-column align-items-start">
      <label for="age" class="form-label">Age</label>
      <input v-model="state.age" :class="{ 'is-invalid' : v$.age.$error}" type="text" class="form-control" id="age">
      <div class="invalid-feedback" v-if="v$.age.$error">
          Age is required
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-sm-6 d-flex flex-column align-items-start">
      <label for="age_in" class="form-label">Age In</label>
      <select v-model="state.age_in" :class="{ 'is-invalid' : v$.age_in.$error}" class="form-select" id="age_in">
        <option selected disabled value="">Choose...</option>
        <option>Days</option>
        <option>Months</option>
        <option>Years</option>
      </select>
      <div class="invalid-feedback" v-if="v$.age_in.$error">
        Please select a valid Age In
      </div>
    </div>

    <div class="col-lg-2 col-md-4 col-sm-4 d-flex flex-column align-items-start">
      <label for="gender" class="form-label">Gender</label>
      <select v-model="state.gender" class="form-select" id="gender" >
        <option selected disabled value="">Choose...</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <div class="invalid-feedback">
        Please select Gender
      </div>
    </div>

    <div class="col-lg-2 col-md-2 col-sm-3 d-flex flex-column align-items-start">
      <label for="country_code" class="form-label">India</label>
      <input v-model="state.country_code" type="text" class="form-control" id="country_code">
    </div>
    <div class="col-lg-3 col-md-4 col-sm-5 d-flex flex-column align-items-start">
      <label for="mobile_no" class="form-label">Mobile No</label>
      <div class="input-group has-validation">
        <span class="input-group-text" id="inputGroupPrepend">@</span>
        <input v-model="state.mobile_no" type="text" class="form-control" id="mobile_no" aria-describedby="inputGroupPrepend">
        
      </div>
    </div>
    
    
    <div class="col-lg-5 col-md-6 d-flex flex-column align-items-start">
      <label for="address" class="form-label">Address</label>
      <textarea v-model="state.address" class="form-control" id="address"></textarea>
    </div>
    
    <div class="col-12">
      <div class="row">
        <div class="col-6 d-flex flex-column align-items-end"><button class="btn btn-primary" type="submit">Submit form</button></div>
        <div class="col-6 d-flex flex-column align-items-start"><button class="btn btn-danger" type="button">Cancel</button></div>
      </div>
    </div>
</form>
</div>
</div>
</div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapGetters } from 'vuex';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { EDIT_PATIENT, FETCH_PATIENT } from '../store/actions-type';

export default {
  name : 'patient-edit',
  computed: {
    ...mapGetters(['patient'])
  },
  setup () {
    const state = ref({})
    const rules = {
      name: { required }, // Matches state.firstName
      age: { required }, // Matches state.lastName
      age_in: {required},
      gender : {required}
    }

    const v$ = useVuelidate(rules, state)

    const setState = newstate => {
      state.value = newstate
    }

    const store = useStore()
    const route = useRoute()
    onMounted(() => {
      console.log('mounted!')
      store.dispatch(FETCH_PATIENT, route.params.id)
    })

    watch(() => store.getters['patient'], function() {
      console.log('value changes detected');
      setState(store.getters['patient'])
    });

    return { state, v$ }
  },
  methods: {
    async submit () {
      const result = await this.v$.$validate()
      console.log(result)
      if (!result) {
        return
      }
      // console.log(this.$v)
      this.$store.dispatch(EDIT_PATIENT, {...this.state, app_id:100});
    }
  }
}
</script>