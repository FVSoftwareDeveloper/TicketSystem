<template>
    <div class="vue-tempalte">

        <b-card class="mt-3" header="Time Entry Form">
            
            <div class="col-sm-6">

                <form>

                    <div class="col-sm-12">

                        <div class="row">

                            <span><strong> Ticket Information </strong></span>

                        </div>

                        <div class="row">

                            <div class="col-sm-6">

                                <label>Ticket #: {{ labels.idTicket }}</label>
                                                                
                            </div>

                            <div class="col-sm-6">

                                <label>Date: {{ labels.date_today }}</label>
                                                                
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-sm-6">

                                <label>Subject: {{ labels.subject }}</label>
                                                                
                            </div>

                            <div class="col-sm-6">

                                <label>Status: {{ labels.status }}</label>
                                                                
                            </div>

                        </div>

                    </div>

                    <div class="row">

                        <span><strong> Time Entry Information </strong></span>

                    </div>


                    <div class="row">

                        <div class="col-sm-12">

                            <div class="form-group">
                                <label>Employee</label>
                                <input 
                                    id="idTicketTime" 
                                    v-model.trim="form.idTicketTime" 
                                    type="text" 
                                    hidden
                                    class="form-control"
                                />
                                <select 
                                    id="employee" 
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

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>From</label>
                                <div class="input-group">
                                    <date-picker
                                        v-model.trim="$v.form.from.$model"
                                        placeholder="MM/DD/YYYY"
                                        format="MM/dd/yyyy"
                                        :input-class="{
                                            'form-control form-control-sm': form.from === '',
                                            'form-control': form.date_todfromay != 0,
                                            'is-invalid': $v.form.from.required === false,
                                            'is-valid': $v.form.from.required === true
                                        }"
                                        

                                    />
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>To</label>
                                <div class="input-group">
                                    <date-picker
                                        v-model.trim="$v.form.to.$model"
                                        placeholder="MM/DD/YYYY"
                                        format="MM/dd/yyyy"
                                        :input-class="{
                                            'form-control form-control-sm': form.to === '',
                                            'form-control': form.to != 0,
                                            'is-invalid': $v.form.to.required === false,
                                            'is-valid': $v.form.to.required === true
                                        }"
                                        

                                    />
                                </div>
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

                            <button type="submit" class="btn btn-success" @click.prevent="SaveTime">Save</button>            

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
      type: String,
      required: true
    },
  },
  data(){
      return{
          labels:{
              idTicket:'',
              date_today: '',
              subject: '',
              status: ''
          },
          form:{
              idTicketTime: '',
              idTicket: '',
              employee:'',
              from: '',
              to: '',
              reason: ''
          },
          submitStatus: null,
          statusList: [],
          employeeList: []
      }
  },
  validations: {
      form: {
        from: {
            required
        },
        to: {
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
     
      const response = await api.getAllEmployees(this.$axios);
      this.$data.employeeList = response.data;

      const response2 = await api.getTicketById(this.ticketId, this.$axios);
      this.FillLabels(response2.data);

      const response3 = await api.getTicketTimeByTicketId(this.ticketId, this.$axios);
      this.FillForm(response3.data);
  },
  methods:{
    FillLabels(form){
        this.$data.labels.idTicket = form.id;
        this.$data.labels.date_today = form.ticket_date;
        this.$data.labels.subject = form.subject;
        this.$data.labels.status = form.status

        this.$data.form.idTicket = form.id;
    },
    FillForm(form){
         
        this.$data.form.idTicketTime = form[0].id;
        this.$data.form.idTicket = form[0].ticket_id;
        this.$data.form.employee = form[0].employee_id;
        this.$data.form.from = form[0].ticket_time_from;
        this.$data.form.to = form[0].ticket_time_to;
        this.$data.form.reason = form[0].description;
    },
    async SaveTime(){
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

                        
                        if(this.$data.form.idTicketTime.length === 0){
                            
                            
                            const response = await api.saveTikectTime(this.$data.form, this.$axios);

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

                            const response = await api.updateTikectTime(this.$data.form, this.$axios);

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
        this.$data.form.employee = '';
        this.$data.form.from = '';
        this.$data.form.to = '';
        this.$data.form.employee = '';
        this.$data.form.reason = '';
    },
    cancel(){
        this.resetForm();
        this.$router.push('/account/employee');
    } 
  }
}
</script>