<template>
  <div class="empty_box" v-if="isShow">
    <img src="@/assets/img/noData.svg" alt="empty" />
    <span>暂无数据</span>
  </div>
</template>

<script>
export default {
  name: "emptyBox",
  props: ["isShow"],
};
</script>

<style lang="less" scoped>
.empty_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 45px;
    margin-bottom: 8px;
  }
  span {
    display: block;
  }
}
</style>
