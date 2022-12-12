<template>
    <div :class="{ 'm-choose-icon-dialog-body-height': isScroll }">
        <el-dialog v-model="dialogVisible" v-bind="$attrs">
            <template #default>
                <m-form ref="form" isScroll :option="option" label-width="80px" @on-change="onChange"
                    @before-upload="beforeUpload" @on-preview="onPreview" @on-remove="onRemove"
                    @before-remove="beforeRemove" @on-success="onSuccess" @on-exceed="onExceed"></m-form>
            </template>
            <template #footer>
                <slot name="footer" :form="form"></slot>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref, PropType, watch } from 'vue'
import { FormInstance, FormOptions } from '../../form/src/types/type';
let form = ref<FormInstance | null>()
let props = defineProps({
    // 是否只在可视区域内滚动
    isScroll: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        required: true,
        default: false
    },
    // 上传事件
    option: {
        type: Array as PropType<FormOptions[]>,
        requred: true
    },
    onChange: {
        type: Function
    },
    beforeUpload: {
        type: Function
    },
    onPreview: {
        type: Function
    },
    onRemove: {
        type: Function
    },
    beforeRemove: {
        type: Function
    },
    onSuccess: {
        type: Function
    },
    onExceed: {
        type: Function
    },
})
let emits = defineEmits(['update:visible'])
let dialogVisible = ref(props.visible)

watch(() => props.visible, val => {
    dialogVisible.value = props.visible
})
watch(() => dialogVisible.value, val => {
    //向父组件分发改变后的值
    emits('update:visible', val)
})
</script>

<style lang='scss' scoped>

</style>