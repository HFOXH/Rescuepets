import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDog, faShieldDog, faHandHoldingDollar, faHeart, faCat, faChildReaching, faUserPlus, faLocationDot, faSearch, faPencil, faTrashCan  } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/styles.css';

//Recuerda!!! Toca importar icono por icono para poder utilizarlo
library.add(faShieldDog,faDog,faHandHoldingDollar, faHeart, faCat, faChildReaching, faFacebookF, faUserPlus, faLocationDot, faWhatsapp, faSearch, faPencil, faTrashCan)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueAxios,axios)
axios.defaults.baseURL = 'http://localhost:3000/api/';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
