import Vue from 'vue'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize'
import 'material-icons'
import 'jquery'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
}).$mount('#app')
