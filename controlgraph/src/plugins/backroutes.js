import './axiosDeclared.js'
//Aqui se modifica el puerto del servidor de development o quality
let base = location.hostname === 'localhost' ? 'http://localhost:8000/api/' : 'http://$(location.hostname):8000/api'

export default {
    //este estado es porque lo exige
    state: {},
    getters: {
        // para estar pendiente de la ruta del backend, para la consulta, si le paso un pk edita, sino solo sirve los datos
        getDepartment:(state) =>(pk) => {
            return pk != undefined ?
                base + "Departments/" + pk + "/" :
                base + "Departments/"
        },
        getEmployers:(state) =>(pk) => {
            return pk != undefined ?
                base + "UserData/" + pk + "/" :
                base + "UserData/"
        },
        getMedicalRest:(state) =>(pk) => {
            return pk != undefined ?
                base + "MedicalRest/" + pk + "/" :
                base + "MedicalRest/"
        },
        getPermisions:(state) =>(pk) => {
            return pk != undefined ?
                base + "Permisions/" + pk + "/" :
                base + "Permisions/"
        },
        getServicesCommission:(state) =>(pk) => {
            return pk != undefined ?
                base + "ServicesCommission/" + pk + "/" :
                base + "ServicesCommission/"
        },
        getUserProfile:(state) =>(pk) => {
            return pk != undefined ?
                base + "UserProfile/" + pk + "/" :
                base + "UserProfile/"
        },
        access:(state)=>{
            return base + "inandout/"
        },
        loginUrl:(state)=>{
            return base + "login/"
        },
        logoutUrl:(state)=>{
            return base + 'auth/token/logout'
        },
        getInAndOut:(state) => (pk) => {
            return pk != undefined ?
                base + "Access/" + pk + "/" :
                base + "Access/"
        }
    }
}
