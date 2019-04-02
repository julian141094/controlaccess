export default {
    data: () => ({
      edit: false,
      editFields: true,
      dialog: false,
      search: '',
      search2: '',
      load: false,
      medicalRest: [],
      modalDate: false,
      startDate: false,
      endDate: false,
      UserData: [],
      isLoading: false,
      searchUser: "",
      MedicalRest:{
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
          text: 'Fecha Reporte', 
          align: 'left',
          sortable: true,
          value: 'reportDate' 
        },
        {
          text: 'Cédula',
          align: 'left',
          sortable: true,
          value: 'identification'
        },
        {
          text: '1er Nombre',
          align: 'left',
          sortable: true,
          value: 'fName'
        },
        {
          text: '2do Nombre',
          align: 'left',
          sortable: true,
          value: 'sName'
        },
        { 
          text: '1er Apellido', 
          align: 'left',
            sortable: true,
            value: 'fSurname' 
        },
        { 
          text: '2do Apellido', 
          align: 'left',
          sortable: true,
          value: 'sSurname' 
        },
        {
          text: 'Condición',
          align: 'left',
          sortable: true,
          value: 'condition'
        },
        
        { 
          text: 'Inicio', 
            align: 'left',
            sortable: true,
            value: 'startDate' 
          },
        // { 
        //   text: 'Finalización', 
        //   align: 'left',
        //   sortable: true,
        //   value: 'endDate' 
        // },
        // { 
        //   text: 'Descripción', 
        //   align: 'left',
        //     sortable: true,
        //     value: 'description' 
        //   },
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
        return this.editedIndex === -1 ? 'Reposo Medico' : 'Editar Reposo Medico'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
        this.$validator.reset()

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
      getIsActive(){
        if(this.MedicalRest.userData_id != '' && this.MedicalRest.userData_id != undefined){
          this.MedicalRest.userData = this.UserData.find(o => o.pk == this.MedicalRest.userData_id)
        }
      },
      validateChange(option){
        if (option == 1) {
          // console.log('1');
          this.startdate_formatted = "" 
          this.MedicalRest.startDate = ""
        }
        if (option == 2) {
          // console.log('2');
          this.endDate_formatted = "" 
          this.PermissionsEmployer.endDate = ""
        }
      },
      closeCalendars(option){
        if (option == 1) {
          this.modalDate = false
        }
        if(option == 2){
          this.startDate = false
        }
        if(option == 3){
          this.endDate = false
        }
      },
      validateCalendars(target){
        let date = new Date().toISOString().substr(0, 10)
        if (target==1) {
          // console.log('Este es la fecha', date);
          return (date)       
        }
      },
      editMode(){
        this.editFields = !this.editFields
      },
      clearFields(){
        this.MedicalRest={
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
        this.editFields = false
        this.edit = false 
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
          if(mode == 4){
            let F = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
            // console.log('Esta es F ', F);
            return (F)
          }
        }
      },
      filterUser (item, queryText, itemText){
        console.log(queryText,item)
        return item
        },
        getMedicalRest(){
          axios.get(this.$store.getters.getMedicalRest()).then(response=>{
            console.log(response.data)
            this.medicalRest = response.data.results
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
            axios.delete(this.$store.getters.getMedicalRest(item.pk))
            .then(response =>{
              console.log('Debio Eliminar');
              this.getMedicalRest();
            })
            console.log('Debio Ejecutar la Actualizacion');
        },
        close () {
            this.dialog = false
            this.editFields = true
            setTimeout(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
            }, 300)
        },
        saveOrUpdate (mode, MedicalRest) {
          if(mode == 2 && MedicalRest.pk != undefined){
            console.log('Esta seria la parte de editar, y e objeto que llega es: ', MedicalRest);
            // this.editedIndex = this.desserts.indexOf(MedicalRest)
            this.MedicalRest = Object.assign({}, MedicalRest)
            //Formatear las fechas
            this.dateFormat(1,this.MedicalRest.reportDate)
            this.dateFormat(2,this.MedicalRest.startDate)
            this.dateFormat(3,this.MedicalRest.endDate)

            // console.log('Los datos del Departamento que se va a editar son: ', this.MedicalRest);
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
                console.log('El pk del MedicalRest es: ', this.MedicalRest);
                console.log('El userData_id del MedicalRest es: ', this.MedicalRest.userData_id);

                
                if(this.MedicalRest.pk == ''){
                  axios.post(this.$store.getters.getMedicalRest(),this.MedicalRest)
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
                    this.getMedicalRest();
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
                  axios.put(this.$store.getters.getMedicalRest(this.MedicalRest.pk),
                        this.MedicalRest)
                        .then(response =>{
                            this.getMedicalRest()
                            this.MedicalRest.pk = ""
                            this.MedicalRest.approvedBoss = ""
                            this.MedicalRest.reportDate = ""
                            this.MedicalRest.startDate = ""
                            this.MedicalRest.endDate = ""
                            this.MedicalRest.description = ""
                            this.MedicalRest.observation = ""
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
        }
    },
    mounted(){
        this.getMedicalRest();
    },
  }