<template>
    <div>
        <el-button type="primary" @click="showDialog">
            <slot></slot>
        </el-button>
        <el-dialog class="m-choose-icon-dialog-body-height" v-model="visible" title="Warning" width="50%" align-center>
            <div class="container">
                <div class="item" @click= "copyIcon(item)" v-for="(item,index) in Object.keys(Icons)" :key="index">
                    <div><component :is="`el-icon-${toLine(item)}`"></component></div>
                    <div class="text">{{item}}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup lang='ts'>
import { ref, watch } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from '../../../utils/index.js'
import {useCopy} from '../../../hooks/useCopy/index.js'

let props = defineProps<{ visible: boolean }>()
let emits = defineEmits(['update:visible'])

let dialogVisible = ref<boolean>(props.visible)
function showDialog() {
    emits("update:visible", !props.visible)
    console.log(props.visible)
}

//点击图标复制图标名称
function copyIcon(text:string){
    let copyText = `<el-icon-${toLine(text)}/>`
    useCopy(copyText)
}
// 监听visible的变化 只能监听第一次的变化
watch(() => props.visible, val => {
    dialogVisible.value = val
})
// 监听组件内部的dialogVisible变化,提交给父组件
watch(() => dialogVisible.value, val => {
    emits('update:visible', val)
})
</script>

<style lang='scss' scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .item{
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom:15px;
        cursor:pointer;
        height: 70px;
    }
}
svg{
    width: 2em;
    height: 2em;
}
</style>