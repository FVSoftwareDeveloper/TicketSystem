<template>
    <div class="vue-tempalte">

        <b-card class="mt-3" :header="'Ticket #'+ ticketId">
            
            <div class="col-sm-6">

                <form @submit.prevent="LogIn">

                    <div class="row">

                        <div class="col-sm-2">
                            <label><strong>Ticket #:</strong></label>
                        </div>

                        <div class="col-sm-10">
                            <label>{{ form.idTicket }}</label>
                        </div>                        
                        
                    </div>
                    
                    <div class="row">

                        <div class="col-sm-2">
                            <label><strong>Subject:</strong></label>
                        </div>

                        <div class="col-sm-10">
                            <label>{{ form.subject }}</label>
                        </div> 

                    </div>

                    <div class="row">

                        <div class="col-sm-2">
                            <label><strong>Date:</strong></label>
                        </div>

                        <div class="col-sm-10">
                            <label>{{ form.date_today }}</label>
                        </div>

                    </div>

                    <div class="row">

                        <div class="col-sm-12">
                            <label><strong>Description:</strong></label>
                        </div>

                    </div>

                    <div class="row mb-lg-4">

                        <div class="col-sm-12">

                            <div class="form-group">
                                {{ form.reason }}
                            </div>

                        </div>

                    </div>

                    <div class="row">

                        <div class="col-sm-12">
                            <b-tabs content-class="mt-3">
                                <b-tab title="Time Entry" active>

                                    <div class="row">
                    
                                        <div class="col-sm-12 text-align-right">

                                            <b-table 
                                                ref="tableDetails" 
                                                sticky-header 
                                                striped 
                                                hover 
                                                selectable
                                                select-mode="single" 
                                                :items="itemsTime" 
                                                :fields="fieldsItems"
                                            >

                                                <template #cell(show_details)="row">
                                                    <b-button size="sm" class="mr-2 bg-success" @click="EditTicketTime(row)">
                                                    Edit
                                                    </b-button>
                                                    <b-button size="sm" class="mr-2 bg-danger" @click="DeleteTicketTime(row)">
                                                    Delete
                                                    </b-button>
                                                </template>
                                            
                                            </b-table>
                                                        
                                        </div>

                                    </div>

                                </b-tab>
                                <b-tab title="Employees">

                                    <div class="row">
                    
                                        <div class="col-sm-12 text-align-right">

                                            <b-table 
                                                ref="tableDetails" 
                                                sticky-header 
                                                striped 
                                                hover 
                                                selectable
                                                select-mode="single" 
                                                :items="itemsEmployee" 
                                                :fields="fieldsEmployees"
                                            >
                                            
                                                <template>
                                                    <b-button size="sm" class="mr-2 bg-success">
                                                    View
                                                    </b-button>
                                                    <b-button size="sm" class="mr-2 bg-danger">
                                                    Remove
                                                    </b-button>
                                                </template>

                                            </b-table>
                                                        
                                        </div>

                                    </div>

                                </b-tab>
                            </b-tabs>
                        </div>

                    </div>

                </form>
            </div>           

        </b-card>
        
    </div>
</template>

<script>
import FetchApi from '~/api/fetchApi';

export default {
  name: 'TicketForm',
  props:{
      ticketId: {
      type: Number,
      required: true
    },
  },
  data(){
      return{
          fieldsItems: [
              { key: 'id', label:'#' },
              { key: 'employee_name', label:'Employee(s)' },
              { key: 'ticket_time_from', label:'Date' },
              { key: 'description', label:'Description' },
              { key: 'show_details', label:'Actions' }
            ],
            fieldsEmployees: [
              { key: 'id', label:'#' },
              { key: 'firstname', label:'First Name' },
              { key: 'lastname', label:'Last Name' },
              { key: 'email', label:'Email' },
              { key: 'show_details', label:'Actions' }
            ],
          form:{
              idTicket:'',
              date_today: '',
              subject: '',
              employee:'',
              reason: ''
          },           
          submitStatus: null,
          employeeList: [],
          itemsTime: [],
          itemsEmployee: []
      }
  },  
  async mounted(){
      const api = new FetchApi();
      const response = await api.getTicketById(this.ticketId, this.$axios);

      const response2 = await api.getTicketTimeByTicketId(this.ticketId, this.$axios);
      this.$data.itemsTime = response2.data;

      const response3 = await api.getTicketTimeEmployeesByTicketId(this.ticketId, this.$axios);
      this.$data.itemsEmployee = response3.data;

      this.FillForm(response.data);
  },
  methods:{
    FillForm(form){
        this.$data.form.idTicket = form.id;
        this.$data.form.date_today = form.ticket_date;
        this.$data.form.subject = form.subject;
        this.$data.form.status = form.ticket_status_id;
        this.$data.form.employee = form.employee_id;
        this.$data.form.reason = form.description;
    }, 
    EditTicketTime(row){
        this.$router.push({ path: '/account/addtickettime', query: { id: row.item.id } });
    },
    async DeleteTicketTime(row){
        
        await this.$swal.fire({
                title: 'Are you sure to delete?',
                type: 'info',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:'YES',
                cancelButtonText:'NO',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                
                if (result.value) {
                const api = new FetchApi();  
                const response = await api.deleteTicketTimeById(row.item.id, this.$axios);
                if(response.data === 'OK'){
                    
                    this.$swal.fire({
                        title: 'Sucessfull Deleted!',
                        type: 'success',
                        showCloseButton: true,
                        focusConfirm: false,
                    });

                    this.$refs.tableDetails.refresh();

                }
            }
        });

    }
  }
}
</script>