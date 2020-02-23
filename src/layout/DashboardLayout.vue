<template>
  <div class="wrapper">
    <side-bar>
   
     
      <sidebar-link to="/admin/accounts">
        <i class="nc-icon nc-circle-09"></i>
        <p>Accounts</p>
      </sidebar-link>
      <sidebar-link to="/admin/requests">
        <i class="nc-icon nc-notes"></i>
        <p>Requests</p>
      </sidebar-link>
      
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import DashboardContent from './Content.vue'
  export default {
    created() {
    if(!localStorage.token || localStorage.role !== 'Admin'){
      this.$router.push("/");
    }
    },

    components: {
      TopNavbar,
      DashboardContent
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
