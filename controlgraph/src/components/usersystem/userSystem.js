import Axios from "axios";

export default {
    data(){
        return {
            headers: [
                { text: 'Correo electronico', value: 'email' },
                { text: '1er Nombre', value: 'first_name' },
                { text: '1er Apellido', value: 'last_name' },
                { text: 'Puede acceder al sistema', value: 'is_active' },
                { text: 'Acción', value: 'iron' }
            ],
            users:[],
            search:'',
            dialog:false,
            passconfirm:'',
            showPass:false,
            showPass2:false,
            "user": {
                "password": "",
                "username": "",
                "first_name": "",
                "last_name": "",
                "email": "",
                "is_active": false
            },
        }
    },
    methods:{
        create(){
            this.user = {
                "password": "",
                "username": "",
                "first_name": "",
                "last_name": "",
                "email": "",
                "is_active": false
            }
            this.passconfirm = ''
            this.showPass = false
            this.showPass2 = false
            this.dialog = true
            this.$validator.reset()
        },
        edit(val){
            this.user = val
            this.showPass = false
            this.showPass2 = false
            this.dialog = true
        },
        deleteItem(val){
            axios.delete(this.$store.getters.getUserProfile(val.id))
            .then(response =>{
                this.dialog = false
                this.getUsers()
            })
        },
        getUsers(){
            axios.get(this.$store.getters.getUserProfile())
            .then(response =>{
                this.users = response.data.results
            })
        },
        saveOrUpdate(){
            this.$validator.validateAll()
            .then(()=>{
                if (!this.errors.any()) {
                    if(this.user.id == undefined){
                        axios.post(this.$store.getters.getUserProfile(),this.user)
                        .then(response =>{
                            this.dialog = false
                            this.getUsers()
                        })   
                    }
                    else{
                        axios.put(this.$store.getters.getUserProfile(this.user.id),this.user)
                        .then(response =>{
                            this.dialog = false
                            this.getUsers()
                        })
                    }
                }
            })
        }
    },
    mounted(){
        this.getUsers()
    }
}