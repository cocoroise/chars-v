<template>
  <div class="multiChart_container">
    <template v-if="!data || data.length === 0 || isEmpty">
      <emptyBox :isShow="true" />
    </template>
    <v-chart
      v-else
      ref="chartRef"
      theme="darkTheme"
      :autoresize="true"
      :options="multiChartOptions"
    />
  </div>
</template>

<script>
import emptyBox from "@/components/common/emptyBox";
// const shuffle = require("lodash.shuffle");
const barColors = ["#2FBCD5", "#3093DA", "#3077D5", "#3F2FD0"];
const lineColors = ["#672FD5", "#862FD1", "#BC2FD4", "#E030A5"];
const multiData = [];
const defaultSeries = [];

/**
 * series:
 * [
        {
          type: "bar", // 图表类型
          name: "出勤人数", // 类型名称
          yAxisIndex: "0", // 如果需要双y轴要传入这个字段
        },
        {
          type: "line",
          name: "出勤率(%)",
          yAxisIndex: "1",
        },
      ]
 */
export default {
  name: "multiChart",
  props: ["data", "series", "title", "yAxisName", "loading", "isEmpty"],
  components: { emptyBox },
  data() {
    return {
      multiChartOptions: {
        zLevel: 10,
        tooltip: {
          show: true,
          trigger: "axis",
          transitionDuration: 0,
          confine: true,
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(103, 47, 209, 0)",
                  },
                  {
                    offset: 0.5,
                    color: "rgba(103, 47, 209, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(103, 47, 209, 0)",
                  },
                ],
                global: false,
              },
            },
          },
        },
        label: {
          show: true,
        },
        grid: {
          bottom: "10%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
            },
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
            boundaryGap: ["2%", "2%"],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 6,
          },
        ],
        legend: {
          show: true,
        },
        dataset: {
          source: multiData,
        },
        series: defaultSeries,
      },
    };
  },
  methods: {
    formatData() {
      this.formatColor(this.series);
      this.formatYaxis(this.series);
      this.$set(this.multiChartOptions.dataset, "source", this.data);
      this.$set(this.multiChartOptions, "series", this.series);
    },
    formatColor(data) {
      return data.map((v, index) => {
        if (v.type === "bar") {
          v.itemStyle = {
            color: barColors[index % 4],
          };
        } else {
          v.itemStyle = {
            color: lineColors[index % 4],
          };
          v.lineStyle = {
            color: lineColors[index % 4],
            shadowColor: "rgba(0, 0, 0, .3)",
            shadowBlur: 0,
            shadowOffsetY: 3,
            shadowOffsetX: 3,
          };
        }
      });
    },
    formatYaxis(data) {
      this.$set(this.multiChartOptions.yAxis[0], "name", data[0].name);
      if (data[0].yAxisIndex) {
        const yOptions = {
          type: "value",
          splitNumber: 6,
          name: data[1].name,
        };

        // 设置第二根y轴
        this.multiChartOptions.yAxis.push(yOptions);
      }
    },
  },
  mounted() {
    this.data && this.formatData();
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
    series: function(newVal) {
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
    immediate: true,
  },
};
</script>

<style style="less" scoped>
.multiChart_container {
  height: 100%;
  width: 100%;
}
</style>
