import axios from 'axios'
window.axios = axios;

if(localStorage.getItem("token") != "" && localStorage.getItem("token") != null){
    window.axios.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('token');
}
