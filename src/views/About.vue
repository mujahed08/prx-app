<template>
<div class="about"><h1>This is an about page</h1>
  <p>Name : {{patient.name}}</p>
</div>
</template>


<script>
import { mapGetters } from 'vuex';
import { FETCH_PATIENT } from '../store/actions-type';

export default {
  name : 'About',
  mounted() {
    this.fetchPatient();
  },
  computed: {
    ...mapGetters(['patient'])
  },
  methods: {
    fetchPatient() {
      this.$store.dispatch(FETCH_PATIENT, {'name' : 'Mohammed Mujahed Khan'});
    }
  }
}
</script>