export default {
  data(){
    return {
      modalBD:false,
      modalBD2:false,
      start:'',
      startFormatted: '',
      end:'',
      endFormatted: '',
      category:"",
      conditionInt: ['ADMINISTRATIVO', 'OBRERO', 'DOCENTE'],
    }
  },
  methods:{
    close(number){
      if(number == 1){
        this.start = ''
        this.startFormatted = ""
      }
      if(number == 2){
        this.end = ""
        this.endFormatted = ""
      }
    },
    dateFormat(mode, date_orig){
        //Formatted date for show in format dd-mm-yy
        if(date_orig != null){
          var new_date = date_orig.split('-')
          if(mode == 1){
            this.startFormatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
            this.endFormatted = ""
            this.end = ""
          }
          if(mode == 2){
            this.endFormatted = `${new_date[2]}/${new_date[1]}/${new_date[0]}`
          }
        }
    },
  }
}