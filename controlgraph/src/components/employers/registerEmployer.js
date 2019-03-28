export default {
    data(){
        return {
            dateIn_Formatted: "",
            modalDateIn: false,
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
                // pk: "",
                // identification: "",
                // fName: "",
                // sName: "",
                // fSurname: "", 
                // sSurname: "", 
                // birthDate: "", //Este campo debe ser DATE
                // email: "",
                // address: "",
                // phone: "",
                // license: "", //Este campo debe ser un CHECKBOX
                // extra: {
                //     serCPatria: "",
                //     codCPatria: "",
                //     whatsapp: "",
                //     facebook: "",
                //     instagram: "",
                //     twitter: ""
                // },
                // institutional: {
                //     dateIn: "", //Este campo debe ser DATE
                //     condition: "", //Este campo debe ser un SELECT
                //     category: "",  //Este campo debe ser un SELECT
                //     appointment: "",
                //     positionOPSU: "",
                //     department_id: ""
                // },
                // study: [],
                // teaching: [],
                // active: true

                "pk": "",
                "identification": "V-2222122",
                    "fName": "Julian",
                "sName": "Arkangel",
                    "fSurname": "Avendaño",
                "sSurname": "Rojas",
                "birthDate": "1994-10-14",
                "email": "alsgo@prueewewba.com",
                "address": "El Mirador",
                "phone": "04124275881",
                "license": true,
                "extra": {
                        "codCPatria": "000200200",
                        "serCPatria": "012302222",
                        "whatsapp": "041223232",
                        "facebook": "asdasdasdasd",
                        "instagram": "asdasdasdasd",
                        "twitter": "adsasdasdads"
                    },
                "institutional": {
                    "dateIn": "2016-11-01",
                    "condition": "ADMINISTRATIVO",
                    "category": "TIEMPOVARIABLE",
                    "appointment": "asdasdasd",
                    "positionOPSU": "asdasdas",
                    "department_id": 1
                },
                "study": [{
                "typeStudy": "PREGRADO",
                    "startDate": "1234-12-11",
                    "endDate": "1234-12-12",
                    "study": "Disenadora Grafica"
                }],
                "teaching": [
                    {
                    "typeComponent": "VIRTUAL",
                            "universityOrigin": "ULA",
                            "startDate": "2016-12-01",
                            "endDate": "2018-12-01",
                            "observation": "HECHO"
                    }
                ],
                "active": true
            },
            studys: -1,
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
            getUserData(){
                return this.userData
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
              if(mode == 5){
                this.dateIn_Formatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
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
            if(option == 7){
                this.modalDateIn = false
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
                this.studyStartDate_Formatted = ""
                this.studyEndDate_Formatted = ""
                this.studys = -1
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
        editStudyOrTeaching(mode, item, index){
            console.log('Este es el item que llega al editar',item);
            if (mode == 1) {
                this.studys = index
                this.study = JSON.parse(JSON.stringify(item))
                this.studyStartDate_Formatted = this.dateFormat(4, this.study.startDate) 
                this.studyEndDate_Formatted = this.dateFormat(4, this.study.endDate) 
                console.log('Este es study que queda luego del parse',this.study);                
                this.modalStudy = true
                // this.getFormula2()
                // this.calculatedVars()
            }
        },
        deleteStudyOrTeaching (mode, index, item_pk) {
            if (mode == 1) {
                console.log('Esto es lo que llega para Eliminar', item_pk);
                if (item_pk != '') {
                    // axios.delete(this.$store.getters.getExtracost(cost_pk))
                        if(!('deleteStudy' in this.userData.study)){
                            this.userData.study['deleteStudy'] = []
                        }
                        this.userData.study['deleteStudy'].push(item_pk)
                }
                this.userData.study.splice(index,1)
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