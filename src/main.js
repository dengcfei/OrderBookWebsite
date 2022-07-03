// import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import book_ticker from './plugin/BookTicker.js'
import store from './store'
import { createApp } from 'vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
Vue.config.devtools = true

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

createApp(App).use(store).use(BootstrapVue).use(arithmetic).use(book_ticker).mount('#app')
