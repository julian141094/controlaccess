export default {
	// 2da Forma de importar un componente dentro de otro (HIJO)
	name: "login",
	data(){
    return{
      username: '',
      password: '',
      mode: 1,
      showPass: false, 
    }
	},
	methods: {
    login(){
      this.$validator.validateAll()
      .then(()=>{
        this.load = true
        if(!this.errors.any()){
          this.$store.dispatch('loginToken',{
            username:this.username,
            password: this.password
          })
          .then(response =>{
            this.load = false
            this.$validator.reset()
            this.show_msg({
              type : "success",
              text : `${this.$tc("welcome",1)}`,
              active : true
            })
            this.$router.push('/') 
          })
          .catch(err => {
            this.show_msg({
              type : "error",
              text : err.response.data.non_field_errors[0],
              active : true
            })
            this.load = false
          })
        }
        else{
          this.load = false
        }
      })
    }
	}
}