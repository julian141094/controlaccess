export default {
    data(){
        return {
            dateIn_Formatted: "",
            modalDateIn: false,
            load: false,
            modalWorkExperienceStartDate: false,
            modalWorkExperienceEndDate: false,
            workExperienceStartDate_Formatted: "",
            workExperienceEndDate_Formatted: "",
            modalStudyStartDate: false,
            modalStudyEndDate: false,
            studyStartDate_Formatted: "",
            studyEndDate_Formatted: "",
            modalStudy: false,
            modalWorkExperience: false,
            date_formatted: "",
            modalBD: false,
            mode: 0,
            departments: [],
            typeSt: ['BACHILLERATO','TSU','PREGRADO', 'POSTGRADO', 'COMPONENTEDOCENTE', 'OTRO'],
            typeCmp: ['NOAPLICA','VIRTUAL', 'PRESENCIAL'],
            typeCmp2: ['VIRTUAL', 'PRESENCIAL'],
            conditionInt: ['ADMINISTRATIVO', 'OBRERO', 'DOCENTE'],
            categoryInt: ['NOAPLICA','TIEMPOVARIABLE', 'MEDIOTIEMPO', 'TIEMPOCOMPLETO', 'DEDICACIONEXCLUSIVA'],
            categoryInt2: ['TIEMPOVARIABLE', 'MEDIOTIEMPO', 'TIEMPOCOMPLETO', 'DEDICACIONEXCLUSIVA'],
            modalDate: false,
            text: 'En Construcciòn...',
            userData: {
                pk: "",
                identification: "",
                fName: "",
                sName: "",
                fSurname: "", 
                sSurname: "", 
                birthDate: "", 
                email: "",
                address: "",
                phone: "",
                license: "", 
                extra: {
                    serCPatria: "",
                    codCPatria: "",
                    whatsapp: "",
                    facebook: "",
                    instagram: "",
                    twitter: ""
                },
                institutional: {
                    dateIn: "", 
                    condition: "", 
                    category: "",  
                    appointment: "",
                    positionOPSU: "",
                    department_id: ""
                },
                study: [],
                workExperience: [],
                key: {
                    key: ""
                },
                active: true

            },
            studys: -1,
            study: {
                typeStudy: "", 
                typeComponent: "", 
                universityOrigin: "",
                startDate: "", 
                endDate: "", 
                study: ""
            },
            workExperiences: -1,
            workExperience: {
                institution: "", 
                startDate: "", 
                endDate: "", 
                appointment: "", 
                observation: ""
            },
            getUserData(){
                return this.userData
            },
        }
    },
    methods:{
        //En esta funcion se recibe desde el padre (Tabla), los datos que  se cargaran en el formulario $ref.FormRegisterEmployer
        editItem(val){
            this.userData = JSON.parse(JSON.stringify(val))
            this.date_formatted = this.dateFormat(4, this.userData.birthDate) 
            this.dateIn_Formatted = this.dateFormat(4, this.userData.institutional.dateIn)
            this.dialog = true
        },
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
              if(mode == 5){
                this.dateIn_Formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
              }
              if(mode == 6){
                this.workExperienceStartDate_Formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
              }
              if(mode == 7){
                this.workExperienceEndDate_Formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
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
                this.modalWorkExperienceStartDate = false
            }
            if(option == 5){
                this.modalWorkExperienceEndDate = false
            }
            if(option == 6){
                this.modalStudy = false
                this.$validator.reset()
                this.clearFields(2)
            }
            if(option == 7){
                this.modalDateIn = false
            }
            if(option == 8){
                this.modalWorkExperience = false
                this.$validator.reset()
                this.clearFields(3)
            }
        },
        clearFields(mode){
            if (mode == 1) {
                console.log('Deberia borrar los campos');
                this.userData.pk= "",
                this.userData.identification= "",
                this.userData.fName= "",
                this.userData.sName= "",
                this.userData.fSurname= "", 
                this.userData.sSurname= "", 
                this.userData.birthDate= "", 
                this.userData.email= "",
                this.userData.address= "",
                this.userData.phone= "",
                this.userData.license= "", 
                this.userData.extra= {
                    serCPatria: "",
                    codCPatria: "",
                    whatsapp: "",
                    facebook: "",
                    instagram: "",
                    twitter: ""
                },
                this.userData.institutional= {
                    dateIn: "", 
                    condition: "", 
                    category: "",  
                    appointment: "",
                    positionOPSU: "",
                    department_id: ""
                },
                this.userData.study= [],
                this.userData.workExperience= [],
                this.userData.key= {
                    key: ""
                },
                this.userData.active= true
                this.dateIn_Formatted= "",
                this.date_formatted = "",

                this.$validator.reset()
            }
            if (mode == 2) {
                this.study= {
                    typeStudy: "",
                    startDate: "",
                    endDate: "", 
                    study: ""
                },
                this.studyStartDate_Formatted = ""
                this.studyEndDate_Formatted = ""
                this.studys = -1
            }
            if (mode == 3) {
                this.workExperience= {
                    institution: "", 
                    startDate: "", 
                    endDate: "", 
                    appointment: "", 
                    observation: ""
                },
                this.workExperienceStartDate_Formatted = ""
                this.workExperienceEndDate_Formatted = ""
                this.workExperiences = -1
            }
            
        },
        validateChange(option){
            if (option == 1) {
              this.studyEndDate_Formatted = "" 
              this.study.endDate = ""
            }
        },
        addStudyOrTeaching(mode){
            /* Con cada modo se anexan items a las listas que posteriormente se enviaran a la 
            base de datos. Se validan cada uno de los datos de forma especifica, para que el
            Vvalidator no cause conficto con los campos externos al modal de estudio. La
            validación es hecha en base a un fracmento comun del key de los campos. */
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
                        if(this.studys > -1){
                            this.userData.study[this.studys] = this.study
                          }
                          else{
                            this.userData.study.push(this.study)
                        }
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
        },
        addWorkExperience(mode){
            /* Con cada modo se anexan items a las listas que posteriormente se enviaran a la 
            base de datos. Se validan cada uno de los datos de forma especifica, para que el
            Vvalidator no cause conficto con los campos externos al modal de experiencia laboral. La
            validación es hecha en base a un fracmento comun del key de los campos. */
            if (mode == 1) {
                let fieldsVal = []
                for (var key in this.fields) {
                    if (key.indexOf('workExperience-') != -1) {
                        fieldsVal.push(this.$validator.validate(key))
                    }
                }
                Promise.all(fieldsVal)
                .then(()=>{
                    if(!this.errors.any()){
                        if(this.workExperiences > -1){
                            this.userData.workExperience[this.workExperiences] = this.workExperience
                          }
                          else{
                            this.userData.workExperience.push(this.workExperience)
                        }
                        console.log('Esto es lo que se le va agregando a los empleos del empleado:', this.userData.workExperience);  
                        this.modalWorkExperience = false
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
        editStudyOrTeaching(mode, item, index){
            console.log('Este es el item que llega al editar',item);
            if (mode == 1) {
                this.studys = index
                this.study = JSON.parse(JSON.stringify(item)) 
                this.studyStartDate_Formatted = this.dateFormat(4, this.study.startDate) 
                this.studyEndDate_Formatted = this.dateFormat(4, this.study.endDate) 
                console.log('Este es study que queda luego del parse',this.study);                
                this.modalStudy = true
            }
        },
        editWorkExperience(mode, item, index){
            console.log('Este es el item que llega al editar',item);
            if (mode == 1) {
                this.workExperiences = index
                this.workExperience = JSON.parse(JSON.stringify(item))
                this.workExperienceStartDate_Formatted = this.dateFormat(4, this.workExperience.startDate) 
                this.workExperienceEndDate_Formatted = this.dateFormat(4, this.workExperience.endDate) 
                console.log('Este es workExperience que queda luego del parse',this.workExperience);                
                this.modalWorkExperience = true
            }
        },
        deleteStudyOrTeaching (mode, index, item_pk) {
            if (mode == 1) {
                console.log('Esto es lo que llega para Eliminar', item_pk);
                if (item_pk != '') {
                    // axios.delete(this.$store.getters.getExtracost(cost_pk))
                        if(!('deleteStudy' in this.userData.study)){
                            this.userData['deleteStudy'] = []
                        }
                        this.userData['deleteStudy'].push(item_pk)
                }
                this.userData.study.splice(index,1)
            }
        },
        deleteWorkExperience (mode, index, item_pk) {
            if (mode == 1) {
                console.log('Esto es lo que llega para Eliminar', item_pk);
                if (item_pk != '') {
                    // axios.delete(this.$store.getters.getExtracost(cost_pk))
                        if(!('deleteWorkExperience' in this.userData.workExperience)){
                            this.userData['deleteWorkExperience'] = []
                        }
                        this.userData['deleteWorkExperience'].push(item_pk)
                }
                this.userData.workExperience.splice(index,1)
            }
        },
        validateChangeSelect(option){
            if (option == 1) {
            //   console.log('1', this.study.typeComponent);
                if(this.study.typeStudy != "COMPONENTEDOCENTE"){
                    this.study.typeComponent = "NOAPLICA"
                }
                else{
                    this.study.typeComponent = ""
                }
            }
            if (option == 2) {
            //   console.log('1', this.study.typeComponent);
                if(this.userData.institutional.condition != 'DOCENTE'){
                    this.userData.institutional.category = "NOAPLICA"
                }
                else{
                    this.userData.institutional.category = ""
                }
            }
        },
        validateCalendars(mode){
            //Validacion general para prohibir seleccion de fechas mayores a la actual
            let date = new Date().toISOString().substr(0, 10)
            let new_date = date.split('-')
            if (mode == 1) {
                return (date)
            }
            //Validacion especifica para prohibir seleccion de fechas mayores a 15 a;os de antiguedad
            if (mode == 2) {
                let year = new_date[0] - 15
                let date_finished = `${year}-${new_date[1]}-${new_date[2]}`
                return (date_finished)
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