export default {
    data(){
        return {
            mode: 0,
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
                    department: ""
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
                }
            }
        }
    },
    methods:{
        
    }
}