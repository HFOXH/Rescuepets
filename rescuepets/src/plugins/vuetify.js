import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primaryDark: '#00B272',
          primary: '#30BE8B', 
        },
      },
    },
  });