import Vue from 'vue'
import 'jquery'
import App from './App.vue'
import router from './router'
import store from './store'
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
  store,
  render: h => h(App)
}).$mount('#app')
