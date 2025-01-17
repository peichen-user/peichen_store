import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
import { Uploader, Field } from "vant";
Vue.use(Uploader);
Vue.use(Field);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
