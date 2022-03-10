<template>
    <div class="vue-tempalte">

        <b-card class="mt-3" header="List of Tickets">

            <div class="col-sm-12 text-align-right">
                <div class="row">
                                
                    <div class="col-sm-12 text-align-right">

                        <button type="submit" class="btn btn-success" @click.prevent="CreateTicket">Create Ticket</button> 
                                    
                    </div>

                </div>
            </div>
            
            <div class="col-sm-12">

                <div class="row">
                    
                    <div class="col-sm-12 text-align-right">

                        <b-table 
                            ref="tableDetails" 
                            sticky-header 
                            :striped="striped"
                            :bordered="bordered"
                            :borderless="borderless"
                            :outlined="outlined"
                            :small="small"
                            :hover="hover"
                            :dark="dark"
                            selectable
                            select-mode="single" 
                            :items="items"
                            :fields="fields"
                            @row-selected="onSelect"
                        >

                            <template #cell(show_details)="row">
                                <b-button size="sm" class="mr-2 bg-success" @click="EditTicket(row)">
                                Edit
                                </b-button>
                                <b-button size="sm" class="mr-2 bg-danger" @click="DeleteTicket(row)">
                                Delete
                                </b-button>
                                <b-button size="sm" class="mr-2 bg-info" @click="ViewTicket(row)">
                                View
                                </b-button>
                                <b-button size="sm" class="mr-2 bg-dark" @click="AddTime(row)">
                                Add Time Entry
                                </b-button>
                            </template>                                 

                        </b-table>
                                    
                    </div>

                </div>

            </div>            

        </b-card>
        
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators';

import FetchApi from '~/api/fetchApi';

export default {
  name: 'TicketForm',
  mixins:[validationMixin],
  data(){
      return{
          fields: [
              { key: 'id', label:'#' },
              { key: 'subject', label:'Description' },
              { key: 'employee_name', label:'Employee(s)' },
              { key: 'ticket_date', label:'Date' },
              { key: 'status', label:'status' },
              { key: 'show_details', label:'Actions' }
            ],
          form:{
              idTicket:'',
              date_today: '',
              subject: '',
              status: '',
              employee:'',
              reason: ''
          },
          validation:{
              active:'',
              active1:'',
              active2:'',
              active3:'',
              active4:'',
              active5:''
          },
          submitStatus: null,
          statusList: [],
          employeeList: [],
          items: []
      }
  },
  validations: {
      form: {
        date_today: {
            required
        },
        subject: {
            required
        },
        status: {
            required
        },
        employee: {
            required
        },
        reason: {
            required
        }
      }
  },
  async mounted(){
      const api = new FetchApi();  
      const response = await api.getAllTickets(this.$axios);
      this.$data.items = response.data;
  },
  methods:{
    onSelect(e){
        this.$router.push({ path: '/account/addticket', query: { id: e[0].id } });
    },
    CreateTicket(){
        this.$router.push('/account/addticket');
    },
    EditTicket(row){
        this.$refs.tableDetails.selectRow(row.index);
    },
    async DeleteTicket(row){
        
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
                const response = await api.deleteTicketById(row.item.id, this.$axios);
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
    },
    ViewTicket(row){
        this.$router.push({ path: '/account/viewticket', query: { id: row.item.id } });
    },
    AddTime(row){
        this.$router.push({ path: '/account/addtickettime', query: { id: row.item.id } });
    }
  }
}
</script>