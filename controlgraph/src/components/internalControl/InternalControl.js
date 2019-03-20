import Axios from "axios";

export default {
    data: () => ({
      dialog: false,
      search: '',
      load: false,
      inAndOutEmployer: [],
      modalDate: false,
      modalTimeIn: false,
      modalTimeOutEat: false,
      modalTimeInEat: false,
      modalTimeOut: false,
      UserData: [],
      isLoading: false,
      searchUser: "",
    InAndOut:{
        pk: "",
        date: "",
        userData_id: "",
        timeIn: "",
        timeOutEat: "",
        timeInEat: "",
        timeOut: "",
        observation: ""
    },
      date_formatted:'',
      time_in_formated:'',
      time_out_eat_formated:'',
      time_in_eat_formated:'',
      time_out_formated:'',
      headers: [
        {
        text: 'Fecha',
        align: 'left',
        sortable: true,
        // isDescending: true,  
        value: 'date'
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
          text: 'Hora de Entrada',
            align: 'center',
            sortable: true,
            value: 'timeIn'
          },
        {
          text: 'Salida al Almuerzo',
          align: 'center',
          sortable: true,
          value: 'timeOutEat'
        },
        {
          text: 'Entrada del Almuerzo',
          align: 'center',
            sortable: true,
            value: 'timeInEat'
          },
        {
          text: 'Hora de Salida',
            align: 'center',
            sortable: false,
            value: 'timeOut'
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
        return this.editedIndex === -1 ? 'Nueva Entrada o Salida' : 'Editar Entrada o Salida'
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
        this.InAndOut={
            pk: "",
            date: "",
            userData_id: "",
            timeIn: "",
            timeOutEat: "",
            timeInEat: "",
            timeOut: "",
            observation: ""
        }
        this.date_formatted = ""
        this.startdate_formatted = ""
        this.endDate_formatted = ""
      },
      dateFormat(mode, date_orig){
        //Esto es para que formatee las fehas que llegan AÑO-MES-DIA a DIA-MES-AÑO
        //Formatted date for show in format dd-mm-yy
        if(date_orig != null){
          var new_date = date_orig.split('-')
          if(mode == 1){
          this.date_formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
          }
        }
      },
      dateFormatTable(date_orig){
        if(date_orig != null){
            let new_date = date_orig.split('-')
            return `${new_date[2]}/${new_date[1]}/${new_date[0]}`
        }
        else{
            return '--REVISAR--'
        }
      },
      timeFormat(mode, date_orig){
        if(date_orig != null){
            let new_time = date_orig.split('.')
            console.log('Este es el tiempo antes del split: ', new_time);
            let time = new_time[0].split(':')
            console.log('Este es el tiempo luego del split: ', time);
            
            // let time_formated = `${time[0]}:${time[1]}`
            if(mode == 1){
                this.time_in_formated = `${time[0]}:${time[1]}`
            }
            if(mode == 2){
                this.time_out_eat_formated = `${time[0]}:${time[1]}`
            }
            if(mode == 3){
                this.time_in_eat_formated = `${time[0]}:${time[1]}`
            }
            if(mode == 4){
                this.time_out_formated = `${time[0]}:${time[1]}`
            }
        }
      },
      timeFormatTable(date_orig){
        if(date_orig != null){
            let time = date_orig.split(':')
            // return time[0] + ':' + time[1]
            if(time[0] > 12){
                let after = time[0] - 12
                return after + ':' + time[1] + ' PM'
            }
            else if (time[0] == 12){
                return time[0] + ':' + time[1] + ' PM'
            }
            else{
                if (time[0] < 10){
                    let time_finish = time[0].replace('0','')
                    return time_finish + ':' + time[1] + ' AM'
                }
                else{
                    return time[0] + ':' + time[1] + ' PM'
                }
            }
        }
        else{
            return '---'
        }
      },
      filterUser (item, queryText, itemText){
        console.log(queryText,item)
        return item
        },
        getInAndOut(){
            axios.get(this.$store.getters.getInAndOut()).then(response=>{
                console.log('Estos son las Entradas y Salidas: ');
            console.log(response.data)
            this.inAndOutEmployer = response.data.results
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
            axios.delete(this.$store.getters.getInAndOut(item.pk))
            .then(response =>{
              console.log('Debio Eliminar');
              this.getInAndOut();
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
        saveOrUpdate (mode, InAndOut) {
          if(mode == 2 && InAndOut.pk != undefined){
            console.log('Esta seria la parte de editar, y e objeto que llega es: ', InAndOut);
            // this.editedIndex = this.desserts.indexOf(InAndOut)
            this.InAndOut = Object.assign({}, InAndOut)
            //Formatear las fechas
            this.dateFormat(1,this.InAndOut.date)
            this.timeFormat(1,this.InAndOut.timeIn)
            this.timeFormat(2,this.InAndOut.timeOutEat)
            this.timeFormat(3,this.InAndOut.timeInEat)
            this.timeFormat(4,this.InAndOut.timeOut)
            // console.log('Los datos del Departamento que se va a editar son: ', this.InAndOutt);
            this.dialog = true
          }
          else{
            console.log('guardar Nuevo');
            this.$validator.validateAll()
            .then(()=>{
              this.load = true
              if(!this.errors.any()){
                console.log('Entro en el If de !this.error.any');
                console.log('El pk del InAndOut es: ', this.InAndOut);
                console.log('El userData_id del InAndOut es: ', this.InAndOut.userData_id);
                if(this.InAndOut.pk == ''){
                  axios.post(this.$store.getters.getInAndOut(),this.InAndOut)
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
                    this.getInAndOut();
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
                  axios.put(this.$store.getters.getInAndOut(this.InAndOut.pk),
                        this.InAndOut)
                        .then(response =>{
                            this.getInAndOut()
                            this.InAndOut.pk = ""
                            this.InAndOut.date = ""
                            this.InAndOut.timeIn = ""
                            this.InAndOut.timeOutEat = ""
                            this.InAndOut.timeInEat = ""
                            this.InAndOut.timeOut = ""
                            this.InAndOut.observation = ""
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
        this.getInAndOut();
    },
  }