<template>
  <div class="tool_container">
    <div class="comList">
      <div
        class="comList_box"
        v-for="item in map"
        :key="item.id"
        draggable="true"
        @dragstart="dragstart($event, item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import components from "@/components/widgets";

function getComList() {
  return Object.keys(components).map(v => {
    return { name: components[v].name, id: components[v].id };
  });
}
function dragstart(ev, com) {
  ev.dataTransfer.effectAllowed = "move";
  ev.dataTransfer.setData("selectInfo", JSON.stringify(com));
  ev.dataTransfer.setData(
    "dragPos",
    JSON.stringify({
      x: ev.offsetX,
      y: ev.offsetY,
    }),
  );
  ev.dataTransfer.setDragImage(ev.target, ev.offsetX, ev.offsetY);
  return true;
}
export default {
  name: "tool",
  setup() {
    const map = getComList();
    return { map, dragstart };
  },
};
</script>

<style lang="less" scoped>
.tool_container {
  height: 100%;
  flex: 3;
  border: 1px solid;
  .comList {
    height: 80%;
    &_box {
      width: 100%;
      height: 100px;
      border: 1px solid;
      line-height: 100px;
    }
  }
}
</style>
