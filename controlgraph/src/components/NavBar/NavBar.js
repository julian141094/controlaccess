import itemsMenu from "./ItemsMenu.vue"

export default {
    components: {
        itemsmenu : itemsMenu
    },
    data () {
        return {
            drawer: null,
            fab:false,
            tooltip:true,
            items: [
                { 
                    title: 'Home', 
                    icon: 'dashboard',
                    url: '/home'
                },
                { 
                    title: 'Trabajadores', 
                    icon: 'question_answer',
                    url: ''
                }
              ],
              right: null
        }
    },
    methods: {
        
    },
}