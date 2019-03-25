export default {
    data: () => ({
      activateC: false,
      edit: false,
      editFields: true,
      dialog: false,
      search: '',
      load: false,
      permissions: [],
      modalDate: false,
      startDate: false,
      endDate: false,
      UserData: [],
      isLoading: false,
      searchUser: "",
      PermissionsEmployer:{
        pk: "",
        userData_id: "",
        inDate: "",
        startDate: "",
        endDate: "",
        description: "",
        approvedBoss: "",
        commentBoss: "",
        approvedBossTH: "",
        commentBossTH: "",
        approvedFinished: "",
        commentFinished: ""
      },
      date_formatted:'',
      startdate_formatted:'',
      endDate_formatted:'',
      headers: [
        { 
          text: 'Solicitud', 
          align: 'left',
          sortable: true,
          value: 'inDate' 
        },
        {
          text: 'Cédula',
          align: 'left',
          sortable: true,
          value: 'identification'
        },
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
        // { 
        //   text: 'Descripción', 
        //   align: 'left',
        //     sortable: true,
        //     value: 'description' 
        //   },
        { 
          text: 'Jefe Directo', 
            align: 'center',
            sortable: false,
            value: 'approvedBoss' 
        },
        { 
          text: 'Jefe TH', 
            align: 'center',
            sortable: false,
            value: 'approvedBossTH' 
        },
        { 
          text: 'Jefe decano', 
            align: 'center',
            sortable: false,
            value: 'approvedFinished' 
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
        return this.PermissionsEmployer.pk != undefined  ? 'Permisos Laborales' : 'Editar Permisos Laborales'
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
      },
      // date_formatted(val){
      //   console.log('holis',val)
      //     this.startdate_formatted = ""  
      // },
      // startdate_formatted(val) {
      //     this.endDate_formatted = ""
      // }
      'PermissionsEmployer.userData.active':{
        handler(val){
          console.log('Debio cambiar de Valor del active a: ', val);
          if (val == false) {
            this.activateC = true
          }
          else {
            this.activateC = false
          }
        }
      }
    },
    methods: {
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
      validateChange(option){
        if (option == 1) {
          console.log('1');
          this.startdate_formatted = "" 
          this.PermissionsEmployer.startDate = ""
        }
      },
      validateChange2(option){
        
        if (option == 2) {
          console.log('2');
          this.endDate_formatted = "" 
          this.PermissionsEmployer.endDate = ""
        }
      },
      editMode(){
        this.editFields = !this.editFields
      },
      clearFields(){
        this.PermissionsEmployer={
            pk: "",
            userData_id: "",
            inDate: "",
            startDate: "",
            endDate: "",
            description: "",
            approvedBoss: "",
            commentBoss: "",
            approvedBossTH: "",
            commentBossTH: "",
            approvedFinished: "",
            commentFinished: ""
        }
        this.date_formatted = ""
        this.startdate_formatted = ""
        this.endDate_formatted = ""
        this.editFields = false
        this.edit = false 
        this.$validator.reset()
      },
      //Esto es para que formatee las fehas que llegan AÑO-MES-DIA a DIA-MES-AÑO
      dateFormat(mode, date_orig){
        //Formatted date for show in format dd-mm-yy
        if(date_orig != null){
          var new_date = date_orig.split('-')
          if(mode == 1){
          this.date_formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
          console.log(this.date_formatted);
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
      getPermisions(){
        axios.get(this.$store.getters.getPermisions()).then(response=>{
          console.log(response.data)
          this.permissions = response.data.results
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
            console.log(response, 'Este es el console de la respuesta del getSearch');
            response.data.results.forEach(element => {
              if (this.UserData.findIndex(m => m.pk == element.pk) == -1) {
                this.UserData.push(element);
                // console.log('esto es lo que esta en e UserData ', this.UserData);
                
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
          axios.delete(this.$store.getters.getPermisions(item.pk))
          .then(response =>{
            console.log('Debio Eliminar');
            this.getPermisions();
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
      saveOrUpdate (mode, PermissionsEmployer) {
        if(mode == 2 && PermissionsEmployer.pk != undefined){
          console.log('Esta seria la parte de editar, y e objeto que llega es: ', PermissionsEmployer);
          // this.editedIndex = this.desserts.indexOf(PermissionsEmployer)
          this.PermissionsEmployer = Object.assign({}, PermissionsEmployer)
          if(this.PermissionsEmployer.commentBoss == ''){
            this.PermissionsEmployer.commentBoss = 'No Aplica'
          }
          if(this.PermissionsEmployer.commentBossTH == ''){
            this.PermissionsEmployer.commentBossTH = 'No Aplica'
          }
          if(this.PermissionsEmployer.commentFinished == ''){
            this.PermissionsEmployer.commentFinished = 'No Aplica'
          }
          //Formatear las fechas
          this.dateFormat(1,this.PermissionsEmployer.inDate)
          this.dateFormat(2,this.PermissionsEmployer.startDate)
          this.dateFormat(3,this.PermissionsEmployer.endDate)

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
              console.log('El pk del PermissionsEmployer es: ', this.PermissionsEmployer);
              console.log('El userData_id del PermissionsEmployer es: ', this.PermissionsEmployer.userData_id);
              if(this.PermissionsEmployer.pk == ''){
                if(this.PermissionsEmployer.commentBoss == ''){
                  this.PermissionsEmployer.commentBoss = 'No Aplica'
                }
                if(this.PermissionsEmployer.commentBossTH == ''){
                  this.PermissionsEmployer.commentBossTH = 'No Aplica'
                }
                if(this.PermissionsEmployer.commentFinished == ''){
                  this.PermissionsEmployer.commentFinished = 'No Aplica'
                }
                axios.post(this.$store.getters.getPermisions(),this.PermissionsEmployer)
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
                  this.getPermisions();
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
                axios.put(this.$store.getters.getPermisions(this.PermissionsEmployer.pk),
                      this.PermissionsEmployer)
                      .then(response =>{
                          this.getPermisions()
                          this.PermissionsEmployer.pk = ""
                          this.PermissionsEmployer.approvedBoss = ""
                          this.PermissionsEmployer.approvedFinished = ""
                          this.PermissionsEmployer.inDate = ""
                          this.PermissionsEmployer.startDate = ""
                          this.PermissionsEmployer.endDate = ""
                          this.PermissionsEmployer.commentBoss = ""
                          this.PermissionsEmployer.commentFinished = ""
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
        this.getPermisions();
    },
  }