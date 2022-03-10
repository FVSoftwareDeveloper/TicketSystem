<template>
    <div class="vue-tempalte">

        <b-card class="mt-3" header="List of Employees">

            <div class="col-sm-12 text-align-right">
                <div class="row">
                                
                    <div class="col-sm-12 text-align-right">

                        <button type="submit" class="btn btn-success" @click.prevent="CreateEmployee">Create Employee</button> 
                                    
                    </div>

                </div>
            </div>
            
            <div class="col-sm-12">

                <div class="row">
                    
                    <div class="col-sm-12 text-align-right">

                        <b-table 
                            ref="tableDetails" 
                            sticky-header 
                            striped 
                            hover 
                            selectable
                            select-mode="single" 
                            :items="items" 
                            :fields="fields"
                            @row-selected="onSelect"
                        >

                            <template #cell(show_details)="row">
                                <b-button size="sm" class="mr-2 bg-info" @click="ViewEmployee(row)">
                                View
                                </b-button>
                                <b-button size="sm" class="mr-2 bg-success" @click="EditEmployee(row)">
                                Edit
                                </b-button>
                                <b-button size="sm" class="mr-2 bg-danger" @click="DeleteEmployee(row)">
                                Delete
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
import { required, minLength, email } from 'vuelidate/lib/validators';

import FetchApi from '~/api/fetchApi';

export default {
  name: 'EmployeeForm',
  mixins:[validationMixin],
  data(){
      return{
          fields: [
              { key: 'id', label:'ID' },
              { key: 'firstname', label:'First Name' },
              { key: 'lastname', label:'Last Name' },
              { key: 'email', label:'Email' },
              { key: 'created_at', label:'Date Created' },
              { key: 'status', label:'Status' },
              { key: 'show_details', label:'Actions' }
          ],
          form:{
              idCustomer: '',
              firstName:'',
              lastName: '',
              email: '',
              status: '',
              password: '',
              confirmPassword: ''
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
          items: []
      }
  },
  validations: {
      form: {
        firstName: {
            required,
            minLength: minLength(4)
        },
        lastName: {
            required
        },
        email: {
            required,
            email
        },
        status: {
            required
        }
        ,
        password: {
            required
        }
        ,
        confirmPassword: {
            required
        }
      }
    // return:{
    //     'form.email' : { required, this.$data.form.email }
    // }
    
  },
  async mounted(){
      const api = new FetchApi();

      const response = await api.getEmployeeStatus(this.$axios);
      this.$data.statusList = response.data;

      const response2 = await api.getAllEmployees(this.$axios);
      this.$data.items = response2.data;
  },
  methods:{
    onSelect(e){
        this.$router.push({ path: '/account/addemployee', query: { id: e[0].id } });
    },
    CreateEmployee(){
        this.$router.push('/account/addemployee');
    },
    EditEmployee(row){
        this.$refs.tableDetails.selectRow(row.index);
    },
    async DeleteEmployee(row){

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
                    const response = await api.deleteEmployeeById(row.item.id, this.$axios);
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
    ViewEmployee(){
        // this.$router.push({ path: '/account/viewemployee', query: { id: row.item.id } });
    }
  }
}
</script>