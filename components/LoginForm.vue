<template>
    <div class="vue-tempalte">
        
        <form>

            <h3 class="p-3 text-center bg-primary text-white mb-3">Ticket System</h3>
            <div class="form-group">
                <label>User Name</label>
                <input ref="formusername" v-model="form.username" type="text" :class="[form.mainClass, validate.active]" />                
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="form.password" type="password" :class="[form.mainClass, validate.active2]" />
            </div>
            <button ref="formpassword" type="submit" class="btn btn-dark btn-lg btn-block" @click.prevent="LogIn">Sign In</button>            
           
        </form>
        
    </div>
</template>

<script>

export default {
  name: 'LoginForm',
  data() {
      return {
          isExist: false,
          form:{
              username: '',
              password:'',
              mainClass: 'form-control'
          },
          validate:{
              active: '',
              active2: ''
          }
      }
  },
     
  methods:{
    validateForm() {
        // User name input
        if(this.$data.form.username.length === 0){
            this.$data.validate.active = 'is-invalid';
            this.$refs.formusername.focus();
            return false;
        } else {
            this.$data.validate.active = 'is-valid';
        }
        // Password input
        if(this.$data.form.password.length === 0){
            this.$data.validate.active2 = 'is-invalid';
            this.$refs.formpassword.focus();
            return false;
        } else {
            this.$data.validate.active2 = 'is-valid';
            return true;
        }
    },
    async LogIn(){
        const repsonse = this.validateForm();
        if(!repsonse){
            return false;
        }

        try {
            await this.$auth.loginWith('laravelJWT', {
                data: {
                    email: this.$data.form.username,
                    password: this.$data.form.password
                }
            })
            // alert(JSON.stringify(response.data));
            // console.log(response)
            // console.log(response.access_token);
            this.$nuxt.$router.push({ name: 'account-home' })
        } catch (err) {
            throw new Error(err);
        }
        
        // 
    }
  }
}
</script>