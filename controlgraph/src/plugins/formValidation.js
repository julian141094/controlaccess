import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import messages from 'vee-validate/dist/locale/es'

Validator.localize('es', messages)

Vue.use(VeeValidate,{ locale:'es' })
