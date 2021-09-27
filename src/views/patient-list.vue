<template>
    <h1>Patient List:</h1>
    <div class="d-flex">
        <router-link to="/patient/create" role="button" class="btn btn-success mx-2">Create</router-link>
        <button type="button" class="btn btn-primary mx-2">Edit</button>
        <button type="button" class="btn btn-danger mx-2">Delete</button>
    </div>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">age</th>
            <th scope="col">gender</th>
            <th scope="col">patient_no</th>
            <th scope="col">mobile_no</th>
            <th scope="col">address</th>
            <th scope="col">diagnosis</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in patientList.data" v-bind:key="item._id">
            <th scope="row">{{item.id}}</th>
            <td>{{item.name}}</td>
            <td>{{item.age}} {{item.age_in}}</td>
            <td>{{item.gender}}</td>
            <td>{{item.patient_no}}</td>
            <td>{{item.mobile_no}}</td>
            <td>{{item.address}}</td>
            <td>{{item.diagnosis}}</td>
            </tr>
        </tbody>
    </table>
    <Pagination :page="patientList.page" :limit="10" :total="patientList.total"></Pagination>
</template>

<script>
import Pagination from '../components/Pagination.vue'
import { mapGetters } from 'vuex';
import { FETCH_PATIENT_LIST } from '../store/actions-type';

export default {
    name : 'patient-list',
    components : {
        Pagination
    },
    mounted() {
        this.fetchPatientList()
    },
    computed: {
        ...mapGetters(['patientList'])
    },
    methods: {
        fetchPatientList() {
            this.$store.dispatch(FETCH_PATIENT_LIST, {'page_number' : this.$route.params.page, 'limit' : 10});
        }
    }
}
</script>