<template>
    <div class="d-flex my-2">
        <router-link to="/patient/create" role="button" class="btn btn-success mx-2">Create</router-link>
        <button @click="edit" type="button" class="btn btn-primary mx-2">Edit</button>
        <button @click="_delete" type="button" class="btn btn-danger mx-2">Delete</button>
    </div>
    <table class="table border">
        <thead>
            <tr>
            <th scope="col"><input v-model="all" @click="select(patientList.data)" type="checkbox" class="form-check-input"></th>
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
            <tr v-for="(item) in patientList.data" v-bind:key="item._id">
            <th scope="row"><input v-model="selected" v-bind:value="item" type="checkbox" class="form-check-input"></th>
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
import { ref, computed } from 'vue'
import Pagination from '../components/Pagination.vue'
import { mapGetters, useStore } from 'vuex';
import { DELETE_PATIENT, FETCH_PATIENT_LIST, NAVIGATE_PUSH } from '../store/actions-type';
import { lmt } from '../store/ui';

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
            this.$store.dispatch(FETCH_PATIENT_LIST, {...lmt, 'page_number' : this.$route.params.page});
        }
    },
    setup() {
        const selected = ref([])
        //const ids = ref([])
        const ids = computed(() => selected.value.map(({ id }) => id))
        const all = ref(false)

        const select = (list) => {
            selected.value = [];
			if (!all.value)
                selected.value = list
        }
        const store = useStore()
        const edit = () => {
            if(selected.value.length === 1) {
                store.dispatch(NAVIGATE_PUSH, `/patient/edit/${selected.value[0]['id']}`);
            }
        }
        const _delete = () => {
            if(selected.value.length === 1) {
                const payload = {id : ids.value[0], page : store.getters['patientList']['page']}
                store.dispatch(DELETE_PATIENT, payload);
                selected.value = []
            }
        }
        
        return { selected, ids, all, select, edit, _delete }
    }
}
</script>