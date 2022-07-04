// import Vue from 'vue'
import App from './App.vue'

// import BookTicker from './plugin/BookTicker'
import BookDepth from './plugins/BookDepth'
import Arithmetic from './plugins/Arithmetic'
import Info from './plugins/Info'
import store from './store'
import { createApp } from 'vue'

import BootstrapVue from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// createApp(App).use(store).use(BootstrapVue).use(Arithmetic).use(BookTicker).mount('#app')
// createApp(App).use(store).use(BookDepth).mount('#app')
createApp(App).use(store).use(Arithmetic).use(Info).use(BookDepth).use(BootstrapVue).mount('#app')
