<template>
  <div class="wrapper">
    <side-bar>
   
     
      <sidebar-link v-if="role === 'Admin'" to="/admin/accounts">
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
    data() {
      return {
        role: null,
      } 
    },
    created() {
      this.role = localStorage.role
     
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
