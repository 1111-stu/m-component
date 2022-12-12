<template>
    <div>
        <el-popover placement="right" :width="400" trigger="click">
            <template #default>
                <slot></slot>
            </template>
            <template #reference>
                <el-badge style="cursor: pointer;" :value="value" :max="max" :type="type" :isdot="isdot">
                    <component :is="`el-icon-${toLine(icon)}`"></component>
                </el-badge>
            </template>
        </el-popover>
    </div>
</template>

<script setup lang='ts'>
import { toLine } from "../../../utils/index.js"
let prop = defineProps({
    icon: {
        type: String,
        default: 'Bell'
    },
    value: {
        type: [Number, String],
        requred: true
    },
    max: {
        type: Number,
        requred: true,
        default: 30
    },
    isdot: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'danger'
    }
})
</script>

<style lang='scss' scoped>

</style>