<template>
    <div v-bind:class="{ unset: !loader }" class="loader">
        <div class="spinner-grow text-light position-absolute bottom-50 end-50" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name : 'Loader',
  computed: {
    ...mapGetters(['loader'])
  }
}
</script>


<style>
.loader {
    position:fixed;
    width:100%;
    left:0;right:0;top:0;bottom:0;
    background-color: rgba(0, 0, 0, 0.178);
    z-index:9999;
}
.unset {
    display: none;
}
</style>