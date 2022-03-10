<template>
    <div class="vue-tempalte">

        <b-card class="mt-3" header="Employee Form">
            
            <div class="col-sm-6">

                <form @submit.prevent="LogIn">

                    <div class="row">

                        <div class="col-sm-6">

                            <div class="form-group" :class="{ 'form-group--error': $v.form.firstName.$error }">
                                <label>First Name</label>
                                <input 
                                    id="idCustomer" 
                                    v-model.trim="form.idCustomer" 
                                    type="text" 
                                    hidden
                                    class="form-control"
                                />
                                <input 
                                    id="firstName" 
                                    v-model.trim="$v.form.firstName.$model" 
                                    type="text" class="form-control" 
                                    :class="{
                                        'is-invalid': $v.form.firstName.required === false,
                                        'is-valid': $v.form.firstName.required === true
                                    }" 
                                />                                
                            </div>
                        
                        </div>

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Last Name</label>
                                <input 
                                    id="lastName" 
                                    v-model="form.lastName" 
                                    type="text" 
                                    class="form-control"
                                    :class="{
                                        'is-invalid': $v.form.lastName.required === false,
                                        'is-valid': $v.form.lastName.required === true
                                    }" 
                                />
                            </div>

                        </div>

                    </div>
                    
                    <div class="row">

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Email</label>
                                <input 
                                    id="email" 
                                    v-model="form.email" 
                                    type="email" 
                                    class="form-control" 
                                    :class="{
                                        'is-invalid': $v.form.email.required === false,
                                        'is-valid': $v.form.email.required === true
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

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Password</label>
                                <input 
                                    id="password" 
                                    v-model="form.password" 
                                    type="password" 
                                    class="form-control" 
                                    :class="{
                                        'is-invalid': $v.form.password.required === false,
                                        'is-valid': $v.form.password.required === true
                                    }"
                                />
                            </div>

                        </div>

                        <div class="col-sm-6">

                            <div class="form-group">
                                <label>Confirm Password</label>
                                <input 
                                    id="confirmPassword" 
                                    v-model="form.confirmPassword" 
                                    type="password" 
                                    class="form-control"
                                    :class="{
                                        'is-invalid': $v.form.confirmPassword.required === false,
                                        'is-valid': $v.form.confirmPassword.required === true
                                    }" 
                                />
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
import { required, minLength, email } from 'vuelidate/lib/validators';

import FetchApi from '~/api/fetchApi';

export default {
  name: 'EmployeeForm',
  mixins:[validationMixin],
  props:{
      employeeId: {
      type: Number,
      required: true
    },
  },
  data(){
      return{
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

      const response2 = await api.getEmployeeById(this.employeeId, this.$axios);

      this.FillForm(response2.data);
  },
  methods:{
      FillForm(form){
        this.$data.form.idCustomer = form.id;
        this.$data.form.firstName = form.firstname;
        this.$data.form.lastName = form.lastname;
        this.$data.form.email = form.email;
        this.$data.form.status = form.employee_status_id;
        this.$data.form.password = form.password;
        this.$data.form.confirmPassword = form.confirm_password;
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

                        
                        if(this.$data.form.idCustomer.length === 0){
                            
                            
                            const response = await api.saveEmployees(this.$data.form, this.$axios);

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

                            const response = await api.updateEmployees(this.$data.form, this.$axios);

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

            this.$router.push('/account/employee');
        }
    },
    resetForm(){
        this.$data.form.idCustomer = '';
        this.$data.form.firstName = '';
        this.$data.form.lastName = '';
        this.$data.form.email = '';
        this.$data.form.status = '';
        this.$data.form.password = '';
        this.$data.form.confirmPassword = '';
    },
    cancel(){
        this.resetForm();
        this.$router.push('/account/employee');
    }
  }
}
</script>