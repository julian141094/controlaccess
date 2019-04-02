import './axiosDeclared.js'
export default{
  state:{
    is_superuser: localStorage.getItem("is_superuser") || '',
    token: localStorage.getItem("token") || '',
    active:false,
    type:"success",
    text:""
  },
  getters:{
    isSuperUser: (state) => state.is_superuser,
    alerttype: (state) => {
      return state.type
    },
    alertactive: (state) => {
      return state.active
    },
    alerttext: (state) => {
      return state.text
    },
    isAuth: (state) => !!state.token    
  },
  mutations:{
    loginIsSU: (state, isSuperUser) => {
        state.is_superuser = isSuperUser
    },
    logoutIsSU: (state) => {
        state.is_superuser = ""
    },
    loginToken: (state, token) => { 
        state.token = token 
    },
    logouToken: (state) => {
        state.token = ""
    },
    alert: (state,value) => {
      state.active = false
      state.type = value.type
      state.text = value.text
      state.active = value.active
    }
  },
  actions:{
    alert:({commit}, alert) => {
      commit('alert',alert)
    },
    verifyToken:({dispatch}) =>{
        if(localStorage.getItem('token')){
            let fragment = JSON.parse(atob(localStorage.getItem('token').split(".")[1]))
            if(new Date().getTime() > (fragment.exp*1000)){
                var timeDiff = Math.abs(new Date().getTime() - (fragment.exp*1000))
                var diffDays = Math.floor(timeDiff / 86400000)
                if(diffDays >= 2){
                    dispatch("logouToken")
                    return false
                }
                else if(diffDays<2){
                    dispatch("updateToken")
                    return true
                }
            }
            dispatch("checkToken",fragment.exp)
            return true
        }
        else{
          dispatch("logouToken")  
        }

    },
    checkToken:({commit,getters,dispatch}, exp_date) =>{
        var timeDiff = Math.abs((exp_date*1000) - new Date().getTime())
        var diffDays = Math.floor(timeDiff / 86400000);
        var diffHrs = Math.floor((timeDiff % 86400000) / 3600000); 
        var diffMin = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
        if(diffDays==0 && diffHrs==0 && diffMin<10){
            dispatch("updateToken")
        }
    },
    updateToken:({commit,getters,dispatch}) =>{
        axios
        .post(getters.getRefreshToken, {'token':localStorage.getItem('token')})
        .then((response) => {
            let fragment = JSON.parse(atob(response.data.token.split(".")[1]))
            localStorage.setItem('token', response.data.token)
            window.axios.defaults.headers['Authorization'] = 'JWT ' + 
                localStorage.getItem('token');    
            commit("loginToken", response.data.token)
        })
        .catch((err) => {
            localStorage.removeItem('token')
            dispatch("logouToken")  
        })
    },
    logouToken: ({commit}) =>{
        return new Promise((resolve) => {
            commit("logouToken")
            commit("logoutIsSU")
            delete window.axios.defaults.headers['Authorization']
            localStorage.removeItem('token')
            localStorage.removeItem('is_superuser')
            location.href = "/";
            resolve()
        })
    },
    loginToken: ({commit,getters},information) =>{
        console.log('Hola', information);
        
        return new Promise((resolve, reject) => {
            axios
            .post(getters.loginUrl, information)
            .then((response) => {
                console.log('Esto es lo que trae el console log del loginToken', response);
                
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('is_superuser', response.data.is_superuser)
                window.axios.defaults.headers['Authorization'] = 'JWT ' + 
                    localStorage.getItem('token');    
                commit("loginToken", response.data.token)
                commit("loginIsSU", response.data.is_superuserS)
                resolve(response)
            })
            .catch((err) => {
                localStorage.removeItem('token')
                reject(err)
            })
        })
    }
  }
}
