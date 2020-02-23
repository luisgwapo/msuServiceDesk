<template>
  <div class="row">

        <div class="col-12">
       

    <b-table striped hover :items="items" :fields="fields" head-variant="dark" fixed borderless>
       <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2 ">
           {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

         <b-button v-if="row.item.status.toLowerCase() === 'pending' || row.item.status.toLowerCase() === 'for approval'" size="sm" @click="showModal(row)" class="mr-2">
           {{ row.item.status.toLowerCase() === 'pending' ? 'Assign Engineer' : 'Approve' }}
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Request Type:</b></b-col>
            <b-col>Repair</b-col>
          </b-row>
          
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Location:</b></b-col>
            <b-col>College of Natural Sciences and Mathematics</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
            <b-col>Please pakiayos ng cr malapit sa M4 mabaho na az in.</b-col>
          </b-row>

          <hr>
          
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Assigned Engineer:</b></b-col>
            <b-col></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Remarks:</b></b-col>
            <b-col></b-col>
          </b-row>

          <hr>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Assigned Worker:</b></b-col>
            <b-col></b-col>
          </b-row>
          <hr>
           <b-row class="mb-2">
             <b-col></b-col>
            <b-col class="text-sm-right"><b>Date completed:</b></b-col>
            <b-col></b-col>
          </b-row>

        </b-card>
      </template>
  

    </b-table>

     <b-modal ref="assignEngineerModal" title="Please Assign Engineer" hide-footer @hide="resetAssignEngineerModal">
       <form ref="form" @submit.stop.prevent="">
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

    <b-modal ref="assignWorkerModal" title="Please Assign Worker" hide-footer @hide="resetAssignWorkerModal">
       <form ref="form" @submit.stop.prevent="">
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
    
  </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedEngineer: null,
        engineerOptions: [

        ],
        selectedWorker: null,
        workerOptions: [

        ],
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
      showModal(row) {
        if(row.item.status.toLowerCase() === 'pending') {
          this.$refs['assignEngineerModal'].show()

        }else if(row.item.status.toLowerCase() === 'for approval'){
          this.$refs['assignWorkerModal'].show()
        }
    
        
      },
      resetAssignEngineerModal() {
        console.log('closed')
      },
       resetAssignWorkerModal() {
        console.log('closed')
      }
    }

  }
</script>
<style>
</style>
