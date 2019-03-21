export default {
    data(){
        return {
            mode: 0,
            departments: [],
            typeSt: ['PREGRADO', 'POSTGRADO', 'OTRO'],
            typeCmp: ['VIRTUAL', 'PRESENCIAL'],
            conditionInt: ['ADMINISTRATIVO', 'OBRERO', 'DOCENTE'],
            categoryInt: ['TV', 'MT', 'TC', 'DD'],
            modalDate: false,
            text: 'En Construcciòn...',
            userData: {
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
                study: [{
                    typeStudy: "", //Este campo debe ser un SELECT
                    startDate: "", //Este campo debe ser DATE y debe ser diferenciado en el key del input
                    endDate: "", //Este campo debe ser DATE y debe ser diferenciado en el key del input
                    study: ""
                }],
                teaching: {
                    typeComponent: "", //Este campo debe ser un SELECT
                    universityOrigin: "",
                    startDate: "", //Este campo debe ser DATE y debe ser diferenciado en el key del input
                    endDate: "", //Este campo debe ser DATE y debe ser diferenciado en el key del input
                    observation: ""
                },
                "user": {
                    "email": "",
                    "username": "",
                    "last_name": "",
                    "first_name": "",
                    "password": "",
                    "is_active": false
                },
                "user_id": null
            }
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
        }
    },
    watch:{
        'userData.identification': {
            handler(val){
                this.UserData.user.username = this.userData.identification
            }
        },  
    },
    mounted(){
        this.getDepartments();
    }
}