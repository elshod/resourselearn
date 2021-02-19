import Vue from 'vue'
import App from './App.vue'
import VueResourse from 'vue-resource'

Vue.use(VueResourse)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
