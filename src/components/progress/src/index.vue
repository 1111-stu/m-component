<template>
    <div>
        <el-progress :percentage="p" :type="type" v-bind="$attrs" />
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
let p = ref(0)
// 定义配置数据
let props = defineProps({
    percentage: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        requred: true,
    },
    // 是否为动态进度条
    indeterminate: {
        type: Boolean,
        default: false
    },
    // 动画时长(毫秒)
    time: {
        type: Number,
        default: 3000
    },
})
onMounted(() => {
    if (props.indeterminate) {
        // 规定时间内加载完成，这么做是为了保证不同长度的进度条，都在同一时间内加载完成。
        let t = Math.ceil(props.time / props.percentage)
        let timer = setInterval(() => {
            p.value += 1
            if (p.value >= props.percentage) {
                p.value = props.percentage
                clearInterval(timer)
            }
        }, t)
    } else {
        p.value = props.percentage
    }
})
</script>

<style lang='scss' scoped>

</style>