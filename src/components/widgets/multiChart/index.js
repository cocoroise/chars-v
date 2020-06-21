import com from "./index.vue";

export default {
  id: 1,
  name: "multiChart",
  component: com,
  props: [
    {
      data: [],
      series: [],
    },
  ],
};
