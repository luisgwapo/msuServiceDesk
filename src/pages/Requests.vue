<template>
  <div class="content">
    <div class="container-fluid">
    
        <RequestTable/>
    
    </div>
  </div>
</template>
<script>
   import RequestTable from 'src/components/RequestTable.vue'

  export default {

    created() {
      if(localStorage.role === 'Requester'){
      this.$router.push("/");
    }
    },
    components: {
      RequestTable
    }
  }

</script>
<style>

</style>
