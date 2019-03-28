import FormEmployers from "./registerEmployer.vue"
export default {
    components: {
      formemployers: FormEmployers
    },
    data () {
      return {
        dialog: false,
        search: '',
        employers: [],
        headers: [
        //   {
        //     text: 'Cedula de Identidad',
        //     align: 'left',
        //     sortable: false,
        //     value: 'name'
        //   },
          {
            text: 'Cédula',
            align: 'left',
            sortable: true,
            value: 'identification'
          },
          { text: '1er Nombre', value: 'fName' },
          { text: '1er Apellido', value: 'fSurname' },
          { text: 'Tipo', value: 'institutional.condition' },
          { text: 'Cartegoria', value: 'institutional.category' },
          { text: 'Departamento', value: 'department.name' },
          { text: 'Acción', value: 'iron' }
        ],
      }
    },
    methods:{
      getEmployers(){
        axios.get(this.$store.getters.getEmployers()).then(response=>{
          console.log(response.data);
          this.employers = response.data.results
        })
      },
      openDialogs(){
        this.dialog = true
        console.log('Esta es la referencia', this.$refs.FormRegisterEmployer.getUserData());
        
      },
      saveOrUpdate (mode, userData) {
        console.log('Este es userData: ',userData);
        
        if(mode == 2 && userData.pk != undefined){
          console.log('Esta seria la parte de editar, y e objeto que llega es: ', userData);
          // this.editedIndex = this.desserts.indexOf(userData)
          this.userData = Object.assign({}, userData)
          // if(this.userData.commentBoss == ''){
          //   this.userData.commentBoss = 'No Aplica'
          // }
          // if(this.userData.commentBossTH == ''){
          //   this.userData.commentBossTH = 'No Aplica'
          // }
          // if(this.userData.commentFinished == ''){
          //   this.userData.commentFinished = 'No Aplica'
          // }
          this.dialog = true
          this.edit = true
          
        }
        else{
          console.log('guardar Nuevo');
          this.$validator.validateAll()
          .then(()=>{
            this.load = true
            if(!this.errors.any()){
              console.log('Entro en el If de !this.error.any');
              console.log('El pk del userData es: ', userData.pk);
              if(userData.pk == undefined || userData.pk == ''){
                // if(this.userData.commentBoss == ''){
                //   this.userData.commentBoss = 'No Aplica'
                // }
                // if(this.userData.commentBossTH == ''){
                //   this.userData.commentBossTH = 'No Aplica'
                // }
                // if(this.userData.commentFinished == ''){
                //   this.userData.commentFinished = 'No Aplica'
                // }
                axios.post(this.$store.getters.getEmployers(),userData)
                .then(response =>{
                  this.load = false
                  this.$validator.reset()
                  this.$emit('show_message',{
                    type : "success",
                    text : "Esta Registrado",
                    active : true
                  })
                  console.log('Esto es lo que va en el response: ',response);
                  this.close(),
                  this.getEmployers();
                  this.$emit('registered')
                })
                .catch(err=>{
                  this.load = false
                  this.$emit('show_message',{
                    type : "error",
                    text : err.response.data.non_field_errors[0],
                    active : true
                  })
                })
              }
              else{
              console.log('En caso de que falle el registro entra a editar')
                axios.put(this.$store.getters.getEmployers(userData.pk),
                      this.userData)
                      .then(response =>{
                          this.getEmployers()
                          this.userData.pk = ""
                          this.userData.approvedBoss = ""
                          this.userData.approvedFinished = ""
                          this.userData.inDate = ""
                          this.userData.startDate = ""
                          this.userData.endDate = ""
                          this.userData.commentBoss = ""
                          this.userData.commentFinished = ""
                          // userData_id: "",
                          this.load = false
                          this.dialog = false
                          this.editFields = false
                          this.$validator.reset()
                      })
              }
            }
            else{
              this.load = false
              console.log('En caso de que falle');
              
            }
          })
        }
      },
    },
    mounted(){
      this.getEmployers();
      
      
    }
  }