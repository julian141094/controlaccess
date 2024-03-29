import Axios from "axios";

export default {
    data: () => ({
      dialog: false,
      search: '',
      load: false,
      incidentsEmployer: [],
      modalDate: false,
      startDate: false,
      endDate: false,
      UserData: [],
      isLoading: false,
      searchUser: "",
      IncidentsEmployer:{
          pk: "",
          userData_id: "",
          approvedBoss: "",
          reportDate: "",
          startDate: "",
          endDate: "",
          description: "",
          observation: ""
      },
      date_formatted:'',
      startdate_formatted:'',
      endDate_formatted:'',
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          sortable: true,
          value: 'fName'
        },
        { 
          text: 'Apellido', 
          align: 'left',
            sortable: true,
            value: 'fSurname' 
          },
        { 
          text: 'Fecha Reporte', 
          align: 'left',
          sortable: true,
          value: 'reportDate' 
        },
        { 
          text: 'Inicio', 
            align: 'left',
            sortable: true,
            value: 'startDate' 
          },
        { 
          text: 'Finalización', 
          align: 'left',
          sortable: true,
          value: 'endDate' 
        },
        { 
          text: 'Descripción', 
          align: 'left',
            sortable: true,
            value: 'description' 
          },
        { 
          text: 'Acción', 
            align: 'center',
            sortable: false,
            value: 'description' 
          },
      ],
      editedIndex: -1,
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Incidencia' : 'Editar Incidencia'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      searchUser(val) {
        if (val != undefined && val.length >= 2) {
          this.isLoading = true;
          this.getSearch(val);
        } else {
          this.getSearch();
        }
      }
    },
    methods: {
      clearFields(){
        this.IncidentsEmployer={
            pk: "",
            userData_id: "",
            approvedBoss: "",
            reportDate: "",
            startDate: "",
            endDate: "",
            description: "",
            observation: ""
        }
        this.date_formatted = ""
        this.startdate_formatted = ""
        this.endDate_formatted = ""
      },
      //Esto es para que formatee las fehas que llegan AÑO-MES-DIA a DIA-MES-AÑO
      dateFormat(mode, date_orig){
        //Formatted date for show in format dd-mm-yy
        if(date_orig != null){
          var new_date = date_orig.split('-')
          if(mode == 1){
          this.date_formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
          }
          if(mode == 2){
          this.startdate_formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
          }
          if(mode == 3){
            this.endDate_formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
          }
        }
      },
      filterUser (item, queryText, itemText){
        console.log(queryText,item)
        return item
        },
        getIncidentsEmployer(){
          axios.get(this.$store.getters.getIncidentsEmployer()).then(response=>{
            console.log(response.data)
            this.incidentsEmployer = response.data.results
          })
        },
        getSearch(search) {
          axios
            .get(this.$store.getters.getEmployers(), {
              params: {
                search: search != undefined ? search : "",
                // size: 8
              }
            })
            .then(response => {
              this.UserData = [];
              response.data.results.forEach(element => {
                if (this.UserData.findIndex(m => m.pk == element.pk) == -1) {
                  this.UserData.push(element);
                }
              });
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => (this.isLoading = false));
        },
        deleteItem (item) {
            console.log('Esto es lo que llega para Eliminar', item);
            console.log('lo que quiero eliminar tiene este pk', item.pk);
            axios.delete(this.$store.getters.getIncidentsEmployer(item.pk))
            .then(response =>{
              console.log('Debio Eliminar');
              this.getIncidentsEmployer();
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
        saveOrUpdate (mode, IncidentsEmployer) {
          if(mode == 2 && IncidentsEmployer.pk != undefined){
            console.log('Esta seria la parte de editar, y e objeto que llega es: ', IncidentsEmployer);
            // this.editedIndex = this.desserts.indexOf(IncidentsEmployer)
            this.IncidentsEmployer = Object.assign({}, IncidentsEmployer)
            //Formatear las fechas
            this.dateFormat(1,this.IncidentsEmployer.reportDate)
            this.dateFormat(2,this.IncidentsEmployer.startDate)
            this.dateFormat(3,this.IncidentsEmployer.endDate)

            // console.log('Los datos del Departamento que se va a editar son: ', this.IncidentsEmployert);
            this.dialog = true
            
          }
          else{
            console.log('guardar Nuevo');
            this.$validator.validateAll()
            .then(()=>{
              this.load = true
              if(!this.errors.any()){
                console.log('Entro en el If de !this.error.any');
                console.log('El pk del IncidentsEmployer es: ', this.IncidentsEmployer);
                console.log('El userData_id del IncidentsEmployer es: ', this.IncidentsEmployer.userData_id);

                
                if(this.IncidentsEmployer.pk == ''){
                  axios.post(this.$store.getters.getIncidentsEmployer(),this.IncidentsEmployer)
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
                    this.getIncidentsEmployer();
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
                  axios.put(this.$store.getters.getIncidentsEmployer(this.IncidentsEmployer.pk),
                        this.IncidentsEmployer)
                        .then(response =>{
                            this.getIncidentsEmployer()
                            this.IncidentsEmployer.pk = ""
                            this.IncidentsEmployer.approvedBoss = ""
                            this.IncidentsEmployer.reportDate = ""
                            this.IncidentsEmployer.startDate = ""
                            this.IncidentsEmployer.endDate = ""
                            this.IncidentsEmployer.description = ""
                            this.IncidentsEmployer.observation = ""
                            // userData_id: "",
                            this.load = false
                            this.dialog = false
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
        }
    },
    mounted(){
        this.getIncidentsEmployer();
    },
  }