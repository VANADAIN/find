import Vue from 'vue'
import 'jquery'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify({
    theme: { dark: true }
  }
  ),
  router,
  render: h => h(App)
}).$mount('#app')
