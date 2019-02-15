import Axios from "axios";

export default {
    data: () => ({
      dialog: false,
      search: '',
      medicalRest: {},
      modalDate: false,
      MedicalRest:{
          UserData: "",
          approvedBoss: "",
          reportDate: "",
          startDate: "",
          endDate: "",
          description: "",
          observation: ""
      },
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          sortable: true,
          value: 'fName'
        },
        { 
            text: 'Apellido', 
            align: 'right',
            sortable: true,
            value: 'fSurname' 
        },
        { 
            text: 'Fecha Reporte', 
            align: 'right',
            sortable: true,
            value: 'reportDate' 
        },
        { 
            text: 'Inicio', 
            align: 'right',
            sortable: true,
            value: 'startDate' 
        },
        { 
            text: 'Finalización', 
            align: 'right',
            sortable: true,
            value: 'endDate' 
        },
        { 
            text: 'Descripción', 
            align: 'right',
            sortable: true,
            value: 'description' 
        },
        { 
            text: 'Acción', 
            align: 'right',
            sortable: false,
            value: 'description' 
        },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Reposo Medico' : 'Editar Departamento'
      }
    },
    
    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
        getMedicalRest(){
            Axios.get(this.$store.getters.getMedicalRest()).then(response=>{
                console.log(response.data)
                this.medicalRest = response.data.results
            })
        },
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt    ',
            description: 159,
          },
          {
            name: 'Ice cream sandwich',
            description: 237,
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    },
    mounted(){
        this.getMedicalRest();
    },
  }