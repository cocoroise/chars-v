<template>
    <div class="mainComponents_container">
        <tool/>
        <scene/>
        <panel/>
    </div>
</template>

<script>
import tool from './tool';
import scene from './scene';
import panel from './panel';
    export default {
        name:'mainComponents',
        components:{tool,scene,panel}
    }
</script>

<style lang="less" scoped>
.mainComponents_container{
    width:100vw;
    height: 100vh;
    display: flex;
    border:1px solid;
}
</style>
