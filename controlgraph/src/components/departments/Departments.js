import Axios from "axios";

export default {
    data: () => ({
      dialog: false,
      search: '',
      departments: [],
      headers: [
        {
          text: 'Nombre Del Departamento',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { 
            text: 'Descripción', 
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
        return this.editedIndex === -1 ? 'Nuevo Departamento' : 'Editar Departamento'
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
        getDepartments(){
            Axios.get(this.$store.getters.getDepartment()).then(response=>{
                console.log(response.data)
                this.departments = response.data.results
                console.log(this.departments)
            })
        },
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
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
        this.getDepartments();
    },
  }