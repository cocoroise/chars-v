<template>
  <div class="pieChart_container">
    <template v-if="!data || data.length === 0 || isEmpty">
      <emptyBox :isShow="true" />
    </template>
    <template v-else>
      <v-chart ref="chartRef" theme="darkTheme" :autoresize="true" :options="pieChartData" />
    </template>
  </div>
</template>

<script>
import emptyBox from "@/components/common/emptyBox";
import { colors } from "@/assets/theme/colors";

let echartData = [];
echartData.forEach((v, index) => {
  if (index >= 12) {
    index = index % 12;
  }
  v.itemStyle = {
    color: colors[index],
  };
});
export default {
  name: "pieChart",
  props: ["data", "title", "loading", "isEmpty"],
  components: { emptyBox },
  data() {
    return {
      pieChartData: {
        color: colors,
        left: "center",
        top: "middle",
        title: {
          text: "",
          left: "left",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          containLabel: true,
        },
        calculable: true,
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            roseType: "area",
            radius: ["40%", "80%"],
            avoidLabelOverlap: false,
            selectedMode: "single",
            label: {
              show: true,
              formatter: "{b}:\n {d}%",
            },
            labelLine: {
              normal: {
                show: true,
                smooth: true,
                length: 12,
                length2: 10,
              },
              emphasis: {
                show: true,
              },
            },
            data: echartData,
          },
        ],
      },
    };
  },
  methods: {
    formatData() {
      const copyProps = this.data.slice();
      if (copyProps && (copyProps[0]?.name || copyProps[0]?.value)) {
        copyProps.sort((a, b) => a.value - b.value);
      }
      this.$set(this.pieChartData.series[0], "data", copyProps);
      this.$set(this.pieChartData.title, "text", this.title);
    },
  },
  mounted() {
    this.loading &&
      this.$refs.chartRef &&
      this.$refs.chartRef.showLoading({
        text: "正在加载...",
        color: "#5EF2CB",
        textColor: "white",
        maskColor: "rgba(0, 0, 0, 0.6)",
      });
  },
  watch: {
    data: function(newVal) {
      if (newVal) this.formatData();
    },
    loading: function(newVal) {
      if (this.$refs.chartRef) {
        if (newVal) {
          this.$refs.chartRef.showLoading({
            text: "正在加载...",
            color: "#5EF2CB",
            textColor: "white",
            maskColor: "rgba(0, 0, 0, 0.6)",
          });
        } else {
          this.$refs.chartRef.hideLoading();
        }
      }
    },
    deep: true,
  },
};
</script>

<style lang="less" scoped>
.pieChart_container {
  height: 100%;
  width: 100%;
}
</style>
