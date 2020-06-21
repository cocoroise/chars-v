import "@/plugins";
import Vue from "vue";
import App from "./App.vue";

import "moment/locale/zh-cn";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
