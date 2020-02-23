<template>


      <div class="row">

       


        <div class="col-12">
       
             <b-button class="float-right mb-2" @click="openAddNewAccountModal()">New Account</b-button>

    <b-table striped hover :items="items" :fields="fields" head-variant="dark" fixed borderless @row-clicked="openEditModal">
    
  

    </b-table>


        <b-modal ref="addAccountModal" title="Add Account" hide-footer @hide="resetModal">
       <form ref="form" @submit.prevent="addAccount">

        <b-form-group
        label="Select User:"
        
        >
            
          <b-form-select 
            v-model="selectedUser" 
            :options="userOptions"
            required
          ></b-form-select>


        </b-form-group>
         <b-form-group
        label="Select Role:"   
        >    
          <b-form-select 
            v-model="selectedRole" 
            :options="roleOptions"
            required
          ></b-form-select>

        </b-form-group>
    <b-button size="sm" type="submit" class="float-right">Add</b-button>
      </form>
    </b-modal>



    <b-modal ref="editAccountModal" title="Edit Account" hide-footer @hide="resetModal">
       <form ref="form" @submit.prevent="editAccount">

        <!-- <b-form-group
        label="Select User:"
        
        >
            
          <b-form-select 
            v-model="selectedUser" 
            :options="userOptions"
            required
            disabled
          ></b-form-select>


        </b-form-group> -->
     
  <p>Name:  {{nameDisplay}} </p>
  <p>College: {{collegeDisplay}} </p>
  <p>Department: {{departmentDisplay}} </p>

         <b-form-group
        label="Role:"   
        >    
          <b-form-select 
            v-model="selectedRole" 
            :options="roleOptions"
            required
          ></b-form-select>

        </b-form-group>
    <b-button size="sm" type="submit" class="float-right">Save</b-button>
      </form>
    </b-modal>
    </div>
  
  </div>
  
  

</template>
<script>
  export default {
   created() {
     this.getAccounts()
      this.getUsersWithNoAccounts()
      this.getRoles()
      
    },
    data() {
      return {
          nameDisplay: null,
          collegeDisplay: null,
          departmentDisplay: null,
          selectedUser: null,
          indexForUpdate: null,
          userOptions: [],
          selectedRole: null,
          roleOptions: [],
         fields: [
          {
            key: 'idNumber',
            label: 'ID Number'
          },
          {
            key: 'name',
            sortable: true,
            label: 'Name'
          },
          {
            key: 'college',
            sortable: true,
            label: 'College'
          },
          {
            key: 'department',
            sortable: true,
            label: 'Department'
          },
            {
            key: 'role',
            sortable: true,
            label: 'Role'
          },
        ],
        items: [
         
        ]
      }
    },
    methods: {


      async editAccount(){
         try{
  
          const res = await this.$axios({
          method: "PUT",
          url: `/users/accounts/update/${this.indexForUpdate}`,
           data: {
            role_id: this.selectedRole
          },
          headers: { Authorization: "Bearer " + localStorage.token }
          })

          if(res.status === 200){
             this.getAccounts()
            this.$refs['editAccountModal'].hide()
           
          }


        }catch (e){
          console.log(e)

        }

      },

      async addAccount(){

        try{
      

          const res = await this.$axios({
          method: "POST",
          url: `/users/accounts/add`,
           data: {
            user_id: this.selectedUser,
            role_id: this.selectedRole
          },
          headers: { Authorization: "Bearer " + localStorage.token }
          })

          if(res.status === 201){
            this.getAccounts()
            this.getUsersWithNoAccounts()
            this.$refs['addAccountModal'].hide()
          }


        }catch (e){


        }
      },

       async getRoles(){
        try{


          this.roleOptions = []
           const res = await this.$axios({
          method: "GET",
          url: `/users/roles/select`,
          headers: { Authorization: "Bearer " + localStorage.token }
        });

  
        for(let i = 0; i<res.data.length; i++){
          this.roleOptions.push({
            value: res.data[i].id,
            text: res.data[i].description
          })
        }

      
        }catch(e){
          console.log(e)
        }


      },

      async getAccounts(){
        
        try{

          this.items = []

           const res = await this.$axios({
          method: "GET",
          url: `/users/accounts/select`,
          headers: { Authorization: "Bearer " + localStorage.token }
        });

        for(let i = 0; i<res.data.length; i++){
          this.items.push({
              id: res.data[i].id,
              role_id: res.data[i].role_id,
              idNumber: res.data[i].id_number,
              name: `${res.data[i].last_name}, ${res.data[i].first_name}`,
              college: res.data[i].college,
              department: res.data[i].department,
              role: res.data[i].description
          })
        }

      
        }catch(e){
          console.log(e)
        }


      },

      
      async getUsersWithNoAccounts(){
        try{
          this.userOptions = []
           const res = await this.$axios({
          method: "GET",
          url: `/users/select-no-account`,
          headers: { Authorization: "Bearer " + localStorage.token }
         
        }); 
        

        for(let i = 0 ; res.data.length; i++){

          this.userOptions.push({
            value: res.data[i].id,
            text: `${res.data[i].last_name}, ${res.data[i].first_name}`
          })
        }
        }catch(e){
          console.log(e)
        }


      },

         openEditModal(record, index) {

          
           
            this.nameDisplay = record.name
           this.collegeDisplay = record.college
            this.departmentDisplay = record.department
             this.selectedRole = record.role_id
             this.indexForUpdate = record.id
             this.$refs['editAccountModal'].show()
          },

        openAddNewAccountModal(){
            this.$refs['addAccountModal'].show()
        },

         resetModal() {
           this.indexForUpdate = null
       this.selectedRole = null
        
      }
    }
  }
</script>
<style>
</style>
