<template>
    <div>
        <!-- <mChooseIcon v-model:visible="visable">添加图标</mChooseIcon> -->
        <m-choose-icon title="选择图标" v-model:visible="visible">选择图标</m-choose-icon>
    </div>
</template>
<script setup lang='ts'>
// import mChooseIcon from "../../components/chooseIcon/src/index.vue"
import {ref} from 'vue'
let visible = ref<boolean>(false)
</script>
<style lang='scss' scoped>

</style>