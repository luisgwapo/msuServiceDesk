<template>
  <div class="row">

        <div class="col-12">
       

    <b-table striped hover :items="items" :fields="fields" head-variant="dark" fixed borderless>
       <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2 ">
           {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

         <b-button v-if="row.item.status === 'Pending' || row.item.status === 'For Approval'" size="sm" @click="showModal(row)" class="mr-2">
           {{ row.item.status === 'Pending' ? 'Assign Engineer' : 'Approve' }}
        </b-button>

         <b-button v-if="role === 'Engineer'" size="sm" @click="showRemarksModal(row)" class="mr-2">
           Remarks
        </b-button>

          <b-button v-if="role === 'Worker'" size="sm" @click="showDoneModal(row)" class="mr-2">
           Done
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Request Type:</b></b-col>
            <b-col>{{ row.item.request_type }}</b-col>
          </b-row>
          
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Location:</b></b-col>
            <b-col>{{ row.item.college }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
            <b-col>{{row.item.request_description}}</b-col>
          </b-row>

          <hr>
          
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Assigned Engineer:</b></b-col>
            <b-col>{{row.item.engineer}}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Remarks:</b></b-col>
            <b-col>{{row.item.engineer_remarks}}</b-col>
          </b-row>

          <hr>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Assigned Worker:</b></b-col>
            <b-col>{{ row.item.worker }}</b-col>
          </b-row>
          <hr>
           <b-row class="mb-2">
             <b-col></b-col>
            <b-col class="text-sm-right"><b>Date completed:</b></b-col>
            <b-col>{{ row.item.date_completed }}</b-col>
          </b-row>

        </b-card>
      </template>
  

    </b-table>

     <b-modal ref="assignEngineerModal" title="Please Assign Engineer" hide-footer @hide="closeModal">
       <form ref="form" @submit.stop.prevent="assignEngineer">
        <b-form-group>
          <b-form-select 
            v-model="selectedEngineer" 
            :options="engineerOptions"
            required
          ></b-form-select>


        </b-form-group>

    
    <b-button size="sm" type="submit" class="float-right">Assign</b-button>
  
      </form>
    </b-modal>

    <b-modal ref="assignWorkerModal" title="Please Assign Worker" hide-footer @hide="closeModal">
       <form ref="form" @submit.stop.prevent="assignWorker">
        <b-form-group>
          <b-form-select 
            v-model="selectedWorker" 
            :options="workerOptions"
            required
          ></b-form-select>


        </b-form-group>

    
    <b-button size="sm" type="submit" class="float-right">Approve</b-button>
  
      </form>
    </b-modal>

     <b-modal ref="remarksModal" title="Remarks" hide-footer @hide="closeModal">
       <form ref="form" @submit.stop.prevent="updateRemarks">
         <b-form-group  
        >    
          <b-form-textarea 
            v-model="remarks" 
            required
          ></b-form-textarea>

        </b-form-group>
    
    <b-button size="sm" type="submit" class="float-right">Save</b-button>
  
      </form>
    </b-modal>
     <b-modal ref="doneModal" title="Please confirm you have completed the task" hide-footer @hide="closeModal">
     
    
    <b-button size="sm" type="submit" class="float-right" @click="doneTransaction">Confirm</b-button>
  
     
    </b-modal>
    
  </div>
  </div>
</template>
<script>
import moment from "moment";
  export default {
     created() {
    this.role = localStorage.role
     this.getTransactions()
     this.getAccounts()
      
    },
    data() {
      return {
        remarks: null,
        role: null,
        selectedEngineer: null,
        engineerOptions: [

        ],
        selectedWorker: null,
        workerOptions: [

        ],
        selectedTransaction: null,
         fields: [
          {
            key: 'date',
            sortable: true,
            label: 'Date'
          },
          {
            key: 'requester',
            sortable: true,
            label: 'Requester'
          },
          {
            key: 'status',
            sortable: true,
            label: 'Status'
          },
          {
            key: 'actions'
          }
        ],
        items: [
          { date: '2017-12-01', requester: 'Luis Angelo Belmonte', status: 'Pending' },
         
        ]
      }
    },
    methods: {

      async doneTransaction(){
        
        try{
          const res = await this.$axios({
          method: "PUT",
          url: `/transactions/done/${this.selectedTransaction}`,
          headers: { Authorization: "Bearer " + localStorage.token }
          });
          
          if(res.status === 200){
             this.getTransactions()
             this.$refs['doneModal'].hide()

          }

        }catch(e){
          console.log(e)

        }

      },

      async assignWorker(){
        
        try{
          const res = await this.$axios({
          method: "PUT",
          url: `/transactions/assign-worker/${this.selectedTransaction}`,
          data: {
            worker_id: this.selectedWorker
          },
          headers: { Authorization: "Bearer " + localStorage.token }
          });
          
          if(res.status === 200){
             this.getTransactions()
             this.$refs['assignWorkerModal'].hide()

          }

        }catch(e){
          console.log(e)

        }

      },

async updateRemarks(){
  try{
          const res = await this.$axios({
          method: "PUT",
          url: `/transactions/update-remarks/${this.selectedTransaction}`,
          data: {
            remarks: this.remarks
          },
          headers: { Authorization: "Bearer " + localStorage.token }
          });
          
          if(res.status === 200){
             this.getTransactions()
             this.$refs['remarksModal'].hide()

          }

        }catch(e){
          console.log(e)

        }
},
      async assignEngineer(){
       
        try{
          const res = await this.$axios({
          method: "PUT",
          url: `/transactions/assign-engineer/${this.selectedTransaction}`,
          data: {
            engineer_id: this.selectedEngineer
          },
          headers: { Authorization: "Bearer " + localStorage.token }
          });
          
          if(res.status === 200){
             this.getTransactions()
             this.$refs['assignEngineerModal'].hide()

          }

        }catch(e){
          console.log(e)

        }


      },

      async getAccounts(){
        try{

           const res = await this.$axios({
          method: "GET",
          url: `/users/accounts/select`,
          headers: { Authorization: "Bearer " + localStorage.token }
          });

      


        for(let i = 0; i<res.data.length; i++){
          if(res.data[i].description === 'Engineer'){
          this.engineerOptions.push({
            value: res.data[i].id,
            text: `${res.data[i].last_name}, ${res.data[i].first_name}`
          })
          } else if (res.data[i].description === 'Worker'){
            this.workerOptions.push({
            value: res.data[i].id,
            text: `${res.data[i].last_name}, ${res.data[i].first_name}`
          })
          }
      }

        }catch(e){

        }

      },

      async getTransactions(){

        try{

          this.items = []

         const res = await this.$axios({
          method: "GET",
          url: `/transactions/select`,
          headers: { Authorization: "Bearer " + localStorage.token }
        });

        if(res.status === 200){
          if(this.role === 'Admin'){
          for(let i = 0 ;i<res.data.length ; i++){
            
            this.items.push({
              id: res.data[i].id,
              date: moment(res.data[i].date_requested).format("MMM DD, YYYY"), 
              requester: res.data[i].requester_name, 
              status: res.data[i].status,
              request_description: res.data[i].request_description,
              college: res.data[i].college,
              request_type: res.data[i].request_type,
              engineer_remarks: res.data[i].engineer_remarks,
              date_completed: moment(res.data[i].date_completed).format("MMM DD, YYYY"),
              engineer:  res.data[i].engineer,
              worker: res.data[i].worker,
            })

          }
          } else if (this.role === 'Engineer'){
             for(let i = 0 ;i<res.data.length ; i++){

               if(res.data[i].status === 'Inspecting'){
            
            this.items.push({
              id: res.data[i].id,
               date: moment(res.data[i].date_requested).format("MMM DD, YYYY"), 
              requester: res.data[i].requester_name, 
              status: res.data[i].status,
              request_description: res.data[i].request_description,
              college: res.data[i].college,
              request_type: res.data[i].request_type,
              engineer_remarks: res.data[i].engineer_remarks,
              date_completed: moment(res.data[i].date_completed).format("MMM DD, YYYY"),
              engineer:  res.data[i].engineer,
              worker: res.data[i].worker,
            })
               }

          }
          } else if (this.role === 'Worker'){
             for(let i = 0 ;i<res.data.length ; i++){

               if(res.data[i].status === 'Approved'){
            
            this.items.push({
              id: res.data[i].id,
               date: moment(res.data[i].date_requested).format("MMM DD, YYYY"), 
              requester: res.data[i].requester_name, 
              status: res.data[i].status,
              request_description: res.data[i].request_description,
              college: res.data[i].college,
              request_type: res.data[i].request_type,
              engineer_remarks: res.data[i].engineer_remarks,
               date_completed: moment(res.data[i].date_completed).format("MMM DD, YYYY"),
              engineer:  res.data[i].engineer,
              worker: res.data[i].worker,
            })
               }

          }
          }

        }

        }catch(e){
          console.log(e)
        }
      },
      showModal(row) {
        this.selectedTransaction = row.item.id
        if(row.item.status.toLowerCase() === 'pending') {
  
          this.$refs['assignEngineerModal'].show()

        }else if(row.item.status.toLowerCase() === 'for approval'){
          this.$refs['assignWorkerModal'].show()
        }
    
        
      },
      
      showDoneModal(row){
        this.selectedTransaction = row.item.id
        this.$refs['doneModal'].show()
      },

      showRemarksModal(row){
         this.selectedTransaction = row.item.id
         this.$refs['remarksModal'].show()
      },
      closeModal() {
        this.remarks = null
          this.selectedTransaction = null
        console.log('closed')
      },
    }

  }
</script>
<style>
</style>
