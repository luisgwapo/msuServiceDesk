<template>
 <div>

<nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
     
      
      <div class="collapse navbar-collapse justify-content-end">
       
        <ul class="navbar-nav ml-auto">
         
       
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

<router-view></router-view>

     </div>
</template>
<style lang="scss">

</style>
<script>
  
  export default {
    created() {
      if(!localStorage.token || localStorage.role !== 'Requester'){
      this.$router.push("/");
    }
    },

    components: {
    
    },
    methods: {
          async logout(){
        localStorage.clear()
        this.$router.push("/");
      }
    }
  }

</script>
