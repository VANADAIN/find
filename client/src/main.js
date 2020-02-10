import Vue from 'vue'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize'
import 'material-icons'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
