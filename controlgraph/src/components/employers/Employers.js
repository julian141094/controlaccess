import FormEmployers from "./registerEmployer.vue"


export default {
    components: {
      formemployers: FormEmployers
    },
    data () {
      return {
        dialog: false,
        search: '',
        employers: [],
        headers: [
        //   {
        //     text: 'Cedula de Identidad',
        //     align: 'left',
        //     sortable: false,
        //     value: 'name'
        //   },
          {
            text: 'Cédula',
            align: 'left',
            sortable: true,
            value: 'identification'
          },
          { text: '1er Nombre', value: 'fName' },
          { text: '1er Apellido', value: 'fSurname' },
          { text: 'Tipo', value: 'institutional.condition' },
          { text: 'Cartegoria', value: 'institutional.category' },
          { text: 'Departamento', value: 'department.name' },
          { text: 'Acción', value: 'iron' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
        ]
      }
    },
    methods:{
      getEmployers(){
        axios.get(this.$store.getters.getEmployers()).then(response=>{
          console.log(response.data);
          this.employers = response.data.results
        })
      },
    },
    mounted(){
      this.getEmployers();
    }
  }