<template>
  <div class="panel_container">
    id:{{ selectInfo.info.id }} <br />name:{{ selectInfo.info.name }}<br />
    {{ selectInfo.info.a }}
  </div>
</template>

<script>
import SelectInfo from "@/store/selectInfo.js";
import { onMounted, watchEffect } from "@vue/composition-api";

let { selectInfo, updateInfo } = SelectInfo();

export default {
  name: "panel",
  setup() {
    updateInfo();

    return { selectInfo };
  },
};
</script>

<style lang="less" scoped>
.panel_container {
  flex: 3;
  height: 100%;
  line-height: 200px;
  font-size: 22px;
}
</style>
