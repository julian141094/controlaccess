import FormEmployers from "./registerEmployer.vue" 
import {base} from "@/plugins/backroutes.js";

export default {
    components: {
      formemployers: FormEmployers
    },
    data () {
      return {
        url: base,
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
          { text: '2do Nombre', value: 'sName' },
          { text: '1er Apellido', value: 'fSurname' },
          { text: '2do Apellido', value: 'sSurname' },
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
        // this.$refs.FormRegisterEmployer.clearFields(1)
        // console.log('Esta es la referencia', this.$refs.FormRegisterEmployer.getUserData());
      },
      saveOrUpdate (mode, userData) {
        console.log('Este es userData: ',userData);
        
        if(mode == 2 && userData.pk != undefined){
          console.log('Esta seria la parte de editar, y e objeto que llega es: ', userData);
          // this.editedIndex = this.desserts.indexOf(userData)
          this.userData = Object.assign({}, userData)
          // if(this.userData.institutional.category == ''){
          //   this.userData.institutional.category = 'NOAPLICA'
          // }
          // if(this.userData.workExperience == ''){
          //   this.userData.workExperience = 'NOAPLICA'
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
              // if(this.userData.institutional.category == ''){
              //   this.userData.institutional.category = 'NOAPLICA'
              // }
              // if(this.userData.workExperience == ''){
              //   this.userData.workExperience = 'NOAPLICA'
              // }
              if(userData.pk == undefined || userData.pk == ''){
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
                  this.$refs.FormRegisterEmployer.clearFields(1)
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
              console.log('Esto es el user Data que se va a enviar en el edit ',userData);
                axios.put(this.$store.getters.getEmployers(userData.pk),
                      userData)
                      .then(response =>{
                          this.getEmployers()
                          this.$refs.FormRegisterEmployer.clearFields(1)
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
      deleteItem (item) {
        console.log('Esto es lo que llega para Eliminar', item);
        console.log('lo que quiero eliminar tiene este pk', item.pk);
        axios.delete(this.$store.getters.getEmployers(item.pk))
        .then(response =>{
          console.log('Debio Eliminar');
          this.getEmployers();
        })
        console.log('Debio Ejecutar la Actualizacion');
      },
    },
    mounted(){
      this.getEmployers();
      
      
    }
  }