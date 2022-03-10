<template>
    <div class="vue-tempalte">

        <b-card class="mt-3" header="Generate Report">

            <form>
            <div class="col-sm-12 text-align-right">

                <div class="row">

                        <div class="col-sm-2">

                            <div class="form-group">
                                <label>From</label>
                                <div class="input-group">
                                    <date-picker
                                        v-model.trim="$v.form.from.$model"
                                        placeholder="MM/DD/YYYY"
                                        format="MM/dd/yyyy"
                                        :input-class="{
                                            'form-control form-control-sm': form.from === '',
                                            'form-control': form.from != 0,
                                            'is-invalid': $v.form.from.required === false,
                                            'is-valid': $v.form.from.required === true
                                        }"
                                        

                                    />
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-2">

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

                        <div class="col-sm-4">

                            <button type="submit" class="btn btn-primary" @click.prevent="GenerateReport">Generate</button> 

                        </div>

                    </div>
                 
            </div>
            </form>
            
            <div class="col-sm-12">

                <div class="row">
                    
                    <div class="col-sm-12 text-align-right">

                        <b-table 
                            ref="tableDetails" 
                            sticky-header 
                            selectable
                            select-mode="single" 
                            :items="items"
                            :fields="fields"
                        ></b-table>
                                    
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
              { key: 'id', label:'Ticket #' },
              { key: 'subject', label:'Description' },
              { key: 'employee_name', label:'Employee' },
              { key: 'description', label:'Note' },
              { key: 'ticket_time_from', label:'Date Start' },
              { key: 'ticket_time_to', label:'Date End' },
              { key: 'hours', label:'Hours' }
            ],
          form:{
              from: '',
              to: ''
          },
          submitStatus: null,
          items: []
      }
  },
  validations: {
      form: {
        from: {
            required
        }, 
        to: {
            required
        }
      }
  },
  methods:{
    async GenerateReport(){
        const api = new FetchApi();  
        const response = await api.getAllTicketsTime(this.$data.form, this.$axios);
        this.$data.items = response.data;
    },
     
  }
}
</script>