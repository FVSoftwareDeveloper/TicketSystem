<template>
    <div class="vue-tempalte">

        <b-card class="mt-3" header="Ticket Form">
            
            <div class="col-sm-6">

                <form @submit.prevent="LogIn">

                    <div class="row">

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Ticket #</label>
                                <input 
                                    id="idTicket" 
                                    v-model.trim="form.idTicket" 
                                    type="text" class="form-control"
                                    readonly
                                />                                
                            </div>
                        
                        </div>

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Date</label>
                                <div class="input-group">
                                    <date-picker
                                        v-model.trim="$v.form.date_today.$model"
                                        placeholder="MM/DD/YYYY"
                                        format="MM/dd/yyyy"
                                        :input-class="{
                                            'form-control form-control-sm': form.date_today === '',
                                            'form-control': form.date_today != 0,
                                            'is-invalid': $v.form.date_today.required === false,
                                            'is-valid': $v.form.date_today.required === true
                                        }"
                                        

                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    
                    <div class="row">

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Subject</label>
                                <input 
                                    id="subject" 
                                    v-model="form.subject" 
                                    type="text" 
                                    class="form-control" 
                                    :class="{
                                        'is-invalid': $v.form.subject.required === false,
                                        'is-valid': $v.form.subject.required === true
                                    }" 
                                />
                            </div>

                        </div>

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Status</label>
                                <select 
                                    id="status" 
                                    v-model="form.status" 
                                    class="form-control"
                                    :class="{
                                        'is-invalid': $v.form.status.required === false,
                                        'is-valid': $v.form.status.required === true
                                    }"
                                >
                                    <option value="">Please select an option</option>
                                    <option 
                                        v-for="item in statusList" 
                                        :key="item.id" 
                                        :value="item.id"
                                    >
                                    {{ item.description }}
                                    </option>
                                    
                                </select>
                            </div>

                        </div>

                    </div>
                    
                    <div class="row">

                        <div class="col-sm-12">

                            <div class="form-group">
                                <label>Employee</label>
                                <select 
                                    id="status" 
                                    v-model="form.employee" 
                                    class="form-control"
                                    :class="{
                                        'is-invalid': $v.form.employee.required === false,
                                        'is-valid': $v.form.employee.required === true
                                    }"
                                >
                                    <option value="">Please select an option</option>
                                    <option 
                                        v-for="item in employeeList" 
                                        :key="item.id" 
                                        :value="item.id"
                                    >
                                    {{ item.firstname }} {{ item.lastname }}
                                    </option>
                                    
                                </select>
                            </div>

                        </div>
                        
                    </div>

                    <div class="row">

                        <div class="col-sm-12">

                            <div class="form-group">
                                <label>Description</label>
                                <textarea 
                                    v-model="form.reason" 
                                    class="form-control"
                                    :class="{
                                        'is-invalid': $v.form.reason.required === false,
                                        'is-valid': $v.form.reason.required === true
                                    }"
                                ></textarea>
                            </div>

                        </div>
                        
                    </div>
                    
                    <div class="row">
                        
                        <div class="col-sm-12 text-align-right">

                            <button type="submit" class="btn btn-success" @click.prevent="LogIn">Save</button>            

                            <button type="button" class="btn btn-danger" @click.prevent="cancel">Cancel</button> 
                                       
                        </div>

                    </div>

                </form>

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
  props:{
      ticketId: {
      type: Number,
      required: true
    },
  },
  data(){
      return{
          fields: [
              { key: 'id', label:'#' },
              { key: 'description', label:'Description' },
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
      const response = await api.getTiketStatus(this.$axios);
      this.$data.statusList = response.data;

      const response2 = await api.getAllEmployees(this.$axios);
      this.$data.employeeList = response2.data;

      const response3 = await api.getTicketById(this.ticketId, this.$axios);

      this.FillForm(response3.data);
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
    async LogIn(){
        // this.$nuxt.$router.push({ name: 'account-home' })
        // console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
        } else {
            // do your submit logic here
        await this.$swal.fire({
                title: 'Are you sure to save?',
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
                    
                    try{

                        if(this.$data.form.idTicket.length === 0){
                            
                            
                            const response = await api.saveTikect(this.$data.form, this.$axios);

                            if(response.data === 'OK'){
                                
                                this.$swal.fire({
                                    title: 'Sucessfull Saved!',
                                    type: 'success',
                                    showCloseButton: true,
                                    focusConfirm: false,
                                });

                                this.resetForm();

                            } else {

                                this.$swal.fire({
                                    title: 'Sorry, something was wrong!!',
                                    type: 'error',
                                    showCloseButton: true
                                });

                            }

                        } else {

                            const response = await api.updateTikect(this.$data.form, this.$axios);

                            if(response.data === 'OK'){
                                
                                this.$swal.fire({
                                    title: 'Sucessfull Updated!',
                                    type: 'success',
                                    showCloseButton: true,
                                    focusConfirm: false,
                                });

                                this.resetForm();

                            } else {

                                this.$swal.fire({
                                    title: 'Sorry, something was wrong!!',
                                    type: 'error',
                                    showCloseButton: true
                                });

                            }

                        }

                    } catch(e){
                        throw new Error(e);
                    }

                }
            });

            this.$router.push('/account/ticket');
        }
    },
    resetForm(){
        this.$data.form.date_today = '';
        this.$data.form.subject = '';
        this.$data.form.status = '';
        this.$data.form.employee = '';
        this.$data.form.reason = '';
    },
    cancel(){
        this.resetForm();
        this.$router.push('/account/ticket');
    } 
  }
}
</script>