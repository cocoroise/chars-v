import Vue from "vue";
// import ECharts from "vue-echarts";
import ECharts from "vue-echarts/components/ECharts.vue";
import darkTheme from "@/assets/theme/darkTheme.js";

import "echarts/lib/chart/bar"; // 柱状图
import "echarts/lib/chart/line"; // 折线
import "echarts/lib/chart/lines"; // 折线
import "echarts/lib/chart/pie"; // 饼图
import "echarts/lib/chart/scatter"; // 动效
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/funnel";

import "echarts/lib/component/tooltip";
import "echarts/lib/component/geo";

ECharts.registerTheme("darkTheme", darkTheme);
Vue.component("v-chart", ECharts);
