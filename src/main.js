import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false
Vue.prototype.$firebase = firebase;

var firebaseConfig = {
  apiKey: "AIzaSyBZBCKbOvvwQNvyACB3P4G16zi2bZeiCoA",
  authDomain: "tugas-kampus-marketplace.firebaseapp.com",
  databaseURL: "https://tugas-kampus-marketplace.firebaseio.com",
  projectId: "tugas-kampus-marketplace",
  storageBucket: "tugas-kampus-marketplace.appspot.com",
  messagingSenderId: "488183781022",
  appId: "1:488183781022:web:68e792c18d70357d7c8d8f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')



