<template>
    <div style="display:flex">
        <div style="margin-right:20px">
        <el-time-select v-model="startTime" :max-time="endTime" :placeholder="startPlaceholder" :start="startTimeStart"
            :step="startStep" :end="startTimeEnd" v-bind="$attrs.startOptions" />
        </div>
        <div>
        <el-time-select v-model="endTime" :min-time="startTime" :placeholder="endPlaceholder" :start="endTimeStart"
            :step="endStep" :end="endTimeEnd" :disabled="endTimeDisabled" v-bind="$attrs.endOptions" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'

let props = defineProps({
    // 开始时间的占位符
    startPlaceholder: {
        type: String,
        default: '请选择开始时间'
    },
    // 结束时间的占位符
    endPlaceholder: {
        type: String,
        default: '请选择结束时间'
    },
    // 开始时间的开始选择
    startTimeStart: {
        type: String,
        default: "08:00"
    },
    // 开始时间的结束选择
    startTimeEnd: {
        type: String,
        default: "24:00"
    },
    // 开始时间步进
    startStep: {
        type: String,
        default: "00:30"
    },
    // 结束时间的开始选择
    endTimeStart: {
        type: String,
        default: "08:00"
    },
    // 结束时间的结束选择
    endTimeEnd: {
        type: String,
        default: "24:00"
    },
    // 结束时间步进
    endStep: {
        type: String,
        default: "00:30"
    },
})
// 开始时间
const startTime = ref<string>('')
// 结束时间
const endTime = ref<string>('')
// 是否禁用结束时间
let endTimeDisabled = ref<boolean>(true)
// 定义分发事件
let emits = defineEmits(["startChange", "endChange"])
// 监听开始时间选择框，如果还没选择，就禁用结束时间选择框
watch(() => startTime.value, val => {
    if (val === '') {
        endTime.value = ''
        endTimeDisabled.value = true
    } else {
        endTimeDisabled.value = false
        // 给父组件分发事件
        emits('startChange', val)
    }
})
// 监听结束时间选择框,选择后就分发事件
watch(() => endTime.value, val => {
    if (val !== '') {
        emits('startChange', {
            strartime: startTime.value,
            endTime:val
        })
    }
})
</script>

<style lang='scss' scoped>

</style>