<template>
  <div class="scene_container">
    <div
      class="scene_main"
      @dragenter="dragenter($event)"
      @dragover="dragover($event)"
      @drop="drop($event)"
      @dragleave="dragleave($event)"
    ></div>
  </div>
</template>

<script>
import Event from "@/plugins/event";
function drop(ev) {
  const selectData = ev.dataTransfer.getData("selectInfo");
  const dragPos = ev.dataTransfer.getData("dragPos");
  Event.$emit("component.selectOne", selectData);
  ev.stopPropagation();
  ev.preventDefault();
}
function dragenter(ev) {
  ev.stopPropagation();
  //   console.log("dragenter", ev);
  //   this.ema.fire("dragenter.one", this.nodeInfo.id);
}
function dragleave(ev) {
  ev.stopPropagation();
  //   console.log("dragleave", ev);
}
function dragover(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  //   console.log("dragover", ev);
}
export default {
  name: "scene",
  setup() {
    return { drop, dragenter, dragleave, dragover };
  },
};
</script>

<style lang="less" scoped>
.scene_container {
  height: 100%;
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  .scene_main {
    height: 80%;
    width: 90%;
    border: 1px solid;
    margin: 0 auto;
  }
}
</style>
