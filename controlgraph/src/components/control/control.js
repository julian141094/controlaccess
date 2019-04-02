import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'
import Axios from 'axios';
import keyControl from './keyControl.vue'
import login from '../login/Login.vue'

export default {
    components:{
        login,
        // keyControl,
        QrcodeStream,
        QrcodeCapture
    },
    data(){
        return {
            dialog: false,
			dialog2: false,            
            code:"",
            errorMessage:"",
            paused:true,
            message:"",
            identification:'',
            password:'',
            username: '',
            mode: 1,
            showPass: false, 
        }
    },
    methods: {
        register(){
            axios.post(this.$store.getters.access,{
                'mode':'login',
                'identification':this.username,
                'password':this.password
            })
            .then(response => {
              this.dialog2 = false
              this.$store.dispatch('alert',{
                active:true,
                type:"success",
                text: response.data.detail
              })
            })
            .catch(err => {
              this.$store.dispatch('alert',{
                active:true,
                type:"error",
                text: err.response.data.detail
              })
            })
        },
        onCode(decodedString){
            this.paused = true
            this.code = decodedString.split(' ')[0]
            axios.post(this.$store.getters.access,{
                'mode':'cam',
                'identification':this.code
            })
            .then(response => {
              this.$store.dispatch('alert',{
                active:true,
                type:"success",
                text: response.data.detail
              })
            })
            .catch(err => {
              this.$store.dispatch('alert',{
                active:true,
                type:"error",
                text: err.response.data.detail
              })
            })
        },
        activeCamera(){
            if(this.paused){
                this.paused = false
                setTimeout(()=>{this.paused = true},30000)
            }
            else[
                this.paused = true
            ]
        },
        onInit (promise) {
            promise.then(() => {
            // console.log('Successfully initilized! Ready for scanning now!')
            })
            .catch(error => {
            if (error.name === 'NotAllowedError') {
                this.errorMessage = 'Hey! I need access to your camera'
            } else if (error.name === 'NotFoundError') {
                this.errorMessage = 'Do you even have a camera on your device?'
            } else if (error.name === 'NotSupportedError') {
                this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
            } else if (error.name === 'NotReadableError') {
                this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
            } else if (error.name === 'OverconstrainedError') {
                this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
            } else {
                this.errorMessage = 'UNKNOWN ERROR: ' + error.message
            }
            })
        }
    },
    mounted() {
        // console.log('hola')
    },
}
