import Axios from "axios";

export default {
    data: () => ({
      dialog: false,
      search: '',
      load: false,
      departments: [],
      departmentsUNEFANB: {
        pk:'',
        name: "",
        description: "",
      },
      headers: [
        {
          text: 'Nombre Del Departamento',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { 
            text: 'Descripción', 
            align: 'right',
            sortable: false,
            value: 'description' 
        },
        { 
          text: 'Acción', 
          align: 'center',
          sortable: false,
          value: 'action' 
      },
      ],
      editedIndex: -1,
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Departamento' : 'Editar Departamento'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      clearFields(){
        this.departmentsUNEFANB= {
          pk:'',
          name: "",
          description: ""
        }
      },
      getDepartments(){
          Axios.get(this.$store.getters.getDepartment()).then(response=>{
              // console.log(response.data)
              this.departments = response.data.results
              console.log(this.departments)
          })
      },
      deleteItem (item) {
        console.log('Esto es lo que llega para Eliminar', item);
        console.log('lo que quiero eliminar tiene este pk', item.pk);
        axios.delete(this.$store.getters.getDepartment(item.pk))
        .then(response =>{
          // this.alert.type = "success"
          // this.alert.text = `${this.$tc("level",1)} ${this.$tc("removed",1)}`
          // this.alert.active = true
          console.log('Debio Eliminar');
          this.getDepartments();
        })
        console.log('Debio Ejecutar la Actualizacion');
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      saveOrUpdate (mode, departmentsUNEFANB) {
        if(mode == 2 && departmentsUNEFANB.pk != undefined){
          console.log('Esta seria la parte de editar, y e objeto que llega es: ', departmentsUNEFANB);
          // this.editedIndex = this.desserts.indexOf(departmentsUNEFANB)
          this.departmentsUNEFANB = Object.assign({}, departmentsUNEFANB)
          // console.log('Los datos del Departamento que se va a editar son: ', this.departmentsUNEFANB);
          this.dialog = true
        }
        else{
          console.log('guardar Nuevo');
          this.$validator.validateAll()
          .then(()=>{
            this.load = true
            if(!this.errors.any()){
              if(this.departmentsUNEFANB.pk == ''){
                axios.post(this.$store.getters.getDepartment(),this.departmentsUNEFANB)
                .then(response =>{
                  this.load = false
                  this.$validator.reset()
                  this.$emit('show_message',{
                    type : "success",
                    text : "Esta Registrado",
                    active : true
                  })
                  // console.log('Esto es lo que va en el response: ',response);
                  this.close(),
                  this.getDepartments();
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
                axios.put(this.$store.getters.getDepartment(this.departmentsUNEFANB.pk),
                      this.departmentsUNEFANB)
                      .then(response =>{
                          this.getDepartments()
                          this.departmentsUNEFANB.pk = ""
                          this.departmentsUNEFANB.name = ""
                          this.departmentsUNEFANB.description = ""
                          this.load = false
                          this.dialog = false
                          this.$validator.reset()
                      })
              }
            }
            else{
              this.load = false
            }
          })
        }
      }
    },
    mounted(){
        this.getDepartments();
    },
  }