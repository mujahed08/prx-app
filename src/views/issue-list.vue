<template>
    <div class="d-flex my-2">
        <router-link to="/catch/create" role="button" class="btn btn-success mx-2">Create</router-link>
        <button @click="edit" type="button" class="btn btn-primary mx-2">Edit</button>
        <button @click="_delete" type="button" class="btn btn-danger mx-2">Delete</button>
    </div>
    <table class="table border">
        <thead>
            <tr>
            <th scope="col"><input v-model="all" @click="select(issueList.data)" type="checkbox" class="form-check-input"></th>
            <th scope="col">ID</th>
            <th scope="col">Catch</th>
            <th scope="col">Summmary</th>
            <th scope="col">Status</th>
            <th scope="col">Description</th>
            <th scope="col">Remarks</th>
            <th scope="col">estimate</th>
            <th scope="col">Last Updated</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in issueList.data" v-bind:key="item._id">
            <th scope="row"><input v-model="selected" v-bind:value="item" type="checkbox" class="form-check-input"></th>
            <td>{{item.id}}</td>
            <td>{{item.type}}</td>
            <td>{{item.summary}}</td>
            <td>{{item.status}}</td>
            <td>{{item.description}}</td>
            <td>{{item.remarks}}</td>
            <td>{{item.estimate}}</td>
            <td>{{item.updated_on}}</td>
            </tr>
        </tbody>
    </table>
    <Pagination :page="issueList.page" :limit="10" :total="issueList.total"></Pagination>
</template>

<script>
import { ref, computed } from 'vue'
import Pagination from '../components/Pagination.vue'
import { mapGetters, useStore } from 'vuex';
import { DELETE_ISSUE, FETCH_ISSUE_LIST, NAVIGATE_PUSH } from '../store/actions-type';
import { lmt } from '../store/ui';

export default {
    name : 'issue-list',
    components : {
        Pagination
    },
    mounted() {
        this.fetchIssueList()
    },
    computed: {
        ...mapGetters(['issueList'])
    },
    methods: {
        fetchIssueList() {
            this.$store.dispatch(FETCH_ISSUE_LIST, {...lmt, 'page_number' : this.$route.params.page});
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
                store.dispatch(NAVIGATE_PUSH, `/catch/edit/${selected.value[0]['id']}`);
            }
        }
        const _delete = () => {
            if(selected.value.length === 1) {
                const payload = {id : ids.value[0], page : store.getters['issueList']['page']}
                store.dispatch(DELETE_ISSUE, payload);
                selected.value = []
            }
        }
        
        return { selected, ids, all, select, edit, _delete }
    }
}
</script>