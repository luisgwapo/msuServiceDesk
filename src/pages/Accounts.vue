<template>
  <div class="content">
    <div class="container-fluid">

        <AccountsTable/>
  
    </div>
  </div>
</template>
<script>
 
  import AccountsTable from 'src/components/AccountsTable.vue'
  export default {
    created() {
      if(localStorage.role !== 'Admin'){
      this.$router.push("/");
    }
    },

    components: {
      AccountsTable
    }
  }

</script>
<style>

</style>
