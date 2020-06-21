import VueStorage from "vue-ls";
import Vue from "vue";

Vue.use(VueStorage, {
  namespace: "crm__", // key prefix
  name: "ls", // name variable Vue.[ls] or this.[$ls],
  storage: "local", // storage name session, local, memory
});
