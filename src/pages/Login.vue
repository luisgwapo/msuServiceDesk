<template>
  <b-container>


      <b-row class="mt-5">
 <b-col></b-col>


      <b-col>

     <b-form @submit.prevent="login">
      <b-form-group
       
      
       
      
      >
        <b-form-input
       
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
        
         v-model="password"
          required
          placeholder="Password"
          type="password"
        ></b-form-input>
      </b-form-group>

     


      <b-button type="submit" block>Login</b-button>
    
    </b-form>
 



   </b-col>

    <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      async login(){

        try{

       const res = await this.$axios({
          method: "POST",
          url: `/users/login`,
          data: {
            email: this.email,
            password: this.password
          }
        });

        if(res.status === 200){
          localStorage.clear()
          localStorage.token = res.data.token
          localStorage.id = res.data.id      
          localStorage.role = res.data.role    
       

          if(res.data.role === 'Admin'){
          this.$router.push("/admin")
          } else if(res.data.role === 'Requester'){
          this.$router.push("/requester")
          } else if(res.data.role === 'Engineer'){
            this.$router.push("/engineer")
          }
          else if(res.data.role === 'Worker'){
            this.$router.push("/worker")
          }
        }


        }catch (e){
          this.$bvToast.toast(`${e.response.data}`, {
            title: 'Error',
            autoHideDelay: 1500,
            variant: 'danger',
            appendToast: false,
            solid: true
        })
        }
   
      }
    }
  }
</script>

<style>

</style>