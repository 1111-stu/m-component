<template>
    <div>
        <el-date-picker v-model="startValue" :disabled-date=" startDisabledDate" type="date" :default-value="new Date()" :placeholder="startPlaceholder" v-bind="$attrs.startOptions"/>
        <el-date-picker v-model="endValue" :disabled-date="endDisabledDate" type="date" :default-value="new Date()" :placeholder="endPlaceholder" v-bind="$attrs.endOptions"
            :disabled="endDisable" />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

let startValue = ref<Date | null>(null)
let endValue = ref<Date | null>(null)

let endDisable = ref<boolean>(true)

// 派发事件
let emits = defineEmits(["startChange","endChange"])

let props = defineProps({
    startPlaceholder: {
        type: String,
        default: "请选择开始日期"
    },
    endPlaceholder: {
        type: String,
        default: "请选择结束日期"
    },
    // 是否禁用选择今天之前的日期
    disableToday: {
        type: Boolean,
        default: true
    }
})

// 禁用开始日期的函数
let startDisabledDate = (time: Date) => {
  if (props.disableToday) return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
}
// 禁用结束日期的函数
let endDisabledDate = (time: Date) => {
  if (startValue.value) {
    return time.getTime() < startValue.value.getTime()+1000*60*60*24
  }
}
watch(() => startValue.value, val => {
    if (!val) {
        endValue.value = null
        endDisable.value = true
    } else {
        endDisable.value = false
        emits('startChange',val)
        
    }
})
watch(() => endValue.value, val => {
    if (val) {
      emits('endChange',{
        startDate:startValue.value,
        endDate:val
      })
    }
})
</script>

<style lang='scss' scoped>
.is-selected {
    color: #1989fa;
}
</style>