export default {
    data(){
        return {
            load: false,
            modalTeahingStartDate: false,
            modalTeahingEndDate: false,
            modalStudyStartDate: false,
            modalStudyEndDate: false,
            studyStartDate_Formatted: "",
            studyEndDate_Formatted: "",
            modalStudy: false,
            date_formatted: "",
            modalBD: false,
            mode: 0,
            departments: [],
            typeSt: ['PREGRADO', 'POSTGRADO', 'OTRO'],
            typeCmp: ['VIRTUAL', 'PRESENCIAL'],
            conditionInt: ['ADMINISTRATIVO', 'OBRERO', 'DOCENTE'],
            categoryInt: ['TV', 'MT', 'TC', 'DD'],
            modalDate: false,
            text: 'En Construcciòn...',
            userData: {
                pk: "",
                identification: "",
                fName: "",
                sName: "",
                fSurname: "", 
                sSurname: "", 
                birthDate: "", //Este campo debe ser DATE
                email: "",
                address: "",
                phone: "",
                license: "", //Este campo debe ser un CHECKBOX
                extra: {
                    serCPatria: "",
                    codCPatria: "",
                    whatsapp: "",
                    facebook: "",
                    instagram: "",
                    twitter: ""
                },
                institutional: {
                    dateIn: "", //Este campo debe ser DATE
                    condition: "", //Este campo debe ser un SELECT
                    category: "",  //Este campo debe ser un SELECT
                    appointment: "",
                    positionOPSU: "",
                    department_id: ""
                },
                study: [],
                teaching: [],
                active: true
            },
            study: {
                typeStudy: "", //Este campo debe ser un SELECT
                startDate: "", //Este campo debe ser DATE y debe ser diferenciado en el key del input
                endDate: "", //Este campo debe ser DATE y debe ser diferenciado en el key del input
                study: ""
            },
            teaching: {
                typeComponent: "", //Este campo debe ser un SELECT
                universityOrigin: "",
                startDate: "", //Este campo debe ser DATE y debe ser diferenciado en el key del input
                endDate: "", //Este campo debe ser DATE y debe ser diferenciado en el key del input
                observation: ""
            },
        }
    },
    methods:{
        getDepartments(){
            axios.get(this.$store.getters.getDepartment())
            .then(response=>{
                this.departments = response.data.results
            })
        },
        add(){
            this.$validator.validateAll()
            .then(()=>{
                if(!this.errors.any()){
                    //
                }
            })
        },
        dateFormat(mode, date_orig){
            //Formatted date for show in format dd-mm-yy
            if(date_orig != null){
              var new_date = date_orig.split('-')
              if(mode == 1){
                this.date_formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
              }
              if(mode == 2){
                this.studyStartDate_Formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
              }
              if(mode == 3){
                this.studyEndDate_Formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
              }
              // La general es esta (4)
              if(mode == 4){
                return `${new_date[2]}/${new_date[1]}/${new_date[0]}`
              }
            }
        },
        closeCalendars(option){
            if (option == 1) {
              this.modalBD = false
            }
            if(option == 2){
              this.modalStudyStartDate = false
            }
            if(option == 3){
              this.modalStudyEndDate = false
            }
            if(option == 4){
                this.modalTeahingStartDate = false
            }
            if(option == 5){
                this.modalTeahingEndDate = false
            }
            if(option == 6){
                this.modalStudy = false
                this.$validator.reset()
                this.clearFields(2)
            }
        },
        clearFields(mode){
            // if (mode == 1) {
                
            // }
            if (mode == 2) {
                this.study= {
                    typeStudy: "",
                    startDate: "",
                    endDate: "", 
                    study: ""
                },
                this.studyStartDate_Formatted = "",
                this.studyEndDate_Formatted = ""
            }
            // if (mode == 3) {
            //     teaching= {
            //         typeComponent: "", 
            //         universityOrigin: "",
            //         startDate: "",
            //         endDate: "", 
            //         observation: ""
            //     }
            // }
        },
        validateChange(option){
            if (option == 1) {
              console.log('1');
              this.studyEndDate_Formatted = "" 
              this.study.endDate = ""
            }
        },
        addStudyOrTeaching(mode){
            /* Con cada modo se anexan items a las listas que posteriormente se enviaran a la 
            base de datos. Se validan cada uno de los datos de forma especifica, para que el
            Vvalidator no cause conficto con los campos externos al modal de estudio. La
            validación es hecha en base a un fracmento comun del nombre de los campos. */
            if (mode == 1) {
                let fieldsVal = []
                for (var key in this.fields) {
                    if (key.indexOf('study-') != -1) {
                        fieldsVal.push(this.$validator.validate(key))
                    }
                }
                Promise.all(fieldsVal)
                .then(()=>{
                    if(!this.errors.any()){
                        this.userData.study.push(this.study)
                        console.log('Esto es lo que se le va agregando a los estudios del empleado:', this.userData.study);  
                        this.modalStudy = false
                        this.clearFields(2)
                        this.$validator.reset()
                    }
                })
            }
            else{
                this.load = false
                console.log('En caso de que falle');
                
            }
            if (mode == 2) {
                this.$validator.validateAll()
                .then(()=>{
                    this.load = true
                    if(!this.errors.any()){
                        this.userData.teaching.push(this.teaching)
                        console.log('Esto es lo que se le va agregando a teaching del empleado:', this.userData.teaching);  
                        this.modalTeaching = false
                        this.clearFields(3)
                        this.$validator.reset()
                    }
                })
            }
            else{
                this.load = false
                console.log('En caso de que falle');
                
            }
        },
        deleteStudyOrTeaching (mode, item) {
            if (mode == 1) {
                console.log('Esto es lo que llega para Eliminar', item);
                console.log('lo que quiero eliminar tiene este pk', item.index);
                axios.delete(this.$store.getters.getPermisions(item.index))
                .then(response =>{
                  console.log('Debio Eliminar');
                //   this.getPermisions();
                })
                console.log('Debio Ejecutar la Actualizacion');
            }
        },
    },
    watch:{
        // 'userData.identification': {
        //     handler(val){
        //         this.UserData.user.username = this.userData.identification
        //     }
        // },  
    },
    mounted(){
        this.getDepartments();
    }
}