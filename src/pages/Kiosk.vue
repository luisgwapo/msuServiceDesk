<template>
 
  <b-container fluid>


      <b-row class="mt-5">
 <b-col></b-col>


      <b-col>


     <b-form @submit.prevent="sendRequest">

     <b-form-group
        label="Request Type:"   
        >    
          <b-form-select 
           v-model="selectedRequestType" 
            :options="requestTypeOptions"
            required
          ></b-form-select>

        </b-form-group>

        <b-form-group
        label="Location:"   
        >    
          <b-form-select 
           v-model="selectedLocation" 
            :options="locationOptions"
            required
          ></b-form-select>

        </b-form-group>

        <b-form-group
        label="Description:"   
        >    
          <b-form-textarea 
            v-model="description" 
            required
          ></b-form-textarea>

        </b-form-group>
      



      <b-button class="mt-4" type="submit" block>Send Request</b-button>
    
    </b-form>
 


 
   </b-col>
  

    <b-col></b-col>
    </b-row>
  </b-container>
</template>
<script>
 
 
  export default {
    created() {
     this.getColleges()
     this.getRequestTypes()
    
      
    },
    components: {
    
    },
    data(){
      return {
        description: null,
        selectedLocation: null,
        locationOptions: [],
        selectedRequestType: null,
        requestTypeOptions: []
      }
    },
    methods: {
      async sendRequest(){
        try {

         const res = await this.$axios({
          method: "POST",
          url: `/transactions/add`,
          data: {
            requesterId: localStorage.id,
            requestTypeId: this.selectedRequestType,
            locationId: this.selectedLocation,
            requestDescription: this.description
          },
          headers: { Authorization: "Bearer " + localStorage.token }
          })


          if(res.status===201){
            this.selectedRequestType = null
            this.selectedLocation = null
            this.description = null
          }

        }catch (e){

        }
      },
       async getColleges(){
         try{
           const res = await this.$axios({
          method: "GET",
          url: `/transactions/colleges/select`,
          headers: { Authorization: "Bearer " + localStorage.token }
          })


          if(res.status === 200){

            for(let i =0 ; i <res.data.length; i ++){
               this.locationOptions.push({
              value: res.data[i].id,
              text: res.data[i].abbreviation
              })

            }

           

          }

         }catch(e){

         }

       },
       async getRequestTypes(){
         try{
           const res = await this.$axios({
          method: "GET",
          url: `/transactions/request-types/select`,
          headers: { Authorization: "Bearer " + localStorage.token }
          })


          if(res.status === 200){

            for(let i =0 ; i <res.data.length; i ++){
               this.requestTypeOptions.push({
              value: res.data[i].id,
              text: res.data[i].description
              })

            }

           

          }

         }catch(e){

         }

       }
    }
  }

</script>
<style>

</style>
