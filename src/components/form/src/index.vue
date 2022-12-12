<template>
    <el-form ref="form" v-if="model" :model="model" :rules="rules" :validate-on-rule-change="false">
        <template v-for="(item, index) in props.option" :key="index">
            <el-form-item :label="item.label" :prop="item.prop" v-if="!item.children || !item.children.length">
                <component v-if="(item.type != 'upload' && item.type != 'editor')" :is="`el-${item.type}`"
                    v-model="model[item.prop!]"></component>
                <el-upload v-if="item.type == 'upload'" v-bind="item.uploadAttrs" :on-preview="onPreview"
                    :on-remove="onRemove" :on-success="onSuccess" :on-error="onError" :on-progress="onProgress"
                    :on-change="onChange" :before-upload="beforeUpload" :before-remove="beforeRemove"
                    :http-request="httpRequest" :on-exceed="onExceed">
                    <slot name="uploadArea"></slot>
                    <slot name="uploadTip"></slot>
                </el-upload>
                <div v-if="item.type === 'editor'" id="editor"></div>
            </el-form-item>
            <el-form-item :label="item.label" :prop="item.prop" v-if="item.children">
                <component :is="`el-${item.type}`" v-model="model[item.prop!]" :style="item.attrs?.style">
                    <component v-for="(child, i) in item.children" :key="i" :is="`el-${child.type}`"
                        :label="child.label" :value="child.value"></component>
                </component>
            </el-form-item>
        </template>
        <el-form-item>
            <slot name="action" :form="form" :model="model"></slot>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
import { ref, PropType, onMounted, watch, nextTick } from 'vue'
import { FormOptions, FormInstance } from './types/type'
import clonedeep from 'lodash/cloneDeep'

import E from "wangeditor"

let emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'on-exceed'])


let props = defineProps({
    option: {
        type: Array as PropType<FormOptions[]>,
        requred: true
    },
    // 用户自定义上传方法
    httpRequest: {
        type: Function
    }
})
let model = ref<any>(null)
let rules = ref<any>(null)
let form = ref<FormInstance | null>()
let edit = ref()
let initForm = () => {
    if (props.option) {
        let m: any = {}
        let r: any = {}
        props.option?.map((item: FormOptions) => {
            m[item.prop!] = item.value,
                r[item.prop!] = item.rule as any
            if (item.type === 'editor') {
                //初始化在线编辑器
                nextTick(() => {
                    if (document.getElementById("editor")) {
                        const editor = new E('#editor')
                        //配置默认描述
                        editor.config.placeholder = item.placeholder!
                        editor.create()
                        // 设置编辑器初始内容
                        editor.txt.html(item.value)
                        // 获取更新后的编辑器的内容
                        // 配置 onchange 回调函数
                        editor.config.onchange = function (newHtml: any) {
                            // 把更新后的值赋值给表单的model
                            model.value[item.prop!] = newHtml
                        };
                        edit.value = editor
                    }
                })
            }
        })
        model.value = clonedeep(m)
        rules.value = clonedeep(r)
    }


}
// 监听父组件传递进来的options
watch(() => props.option, () => {
    initForm()
}, { deep: true })
onMounted(() => {
    initForm()
})
// 上传组件的所有方法
let onPreview = (file: File) => {
    emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
    emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
    // 上传图片成功 给表单上传项赋值
    let uploadItem = props.option?.find((item) => {
        item.type === 'upload'
    })
    model.value[uploadItem?.prop!] = { response, file, fileList }
    emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
    emits('on-error', { err, file, fileList, })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
    emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
    emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
    emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
    emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
    emits('on-exceed', { files, fileList })
}

// 重置表单方法
let resetFields = () => {
    form.value!.resetFields()

    //重置富文本的内容
    //获取富文本的配置项,将富文本的赋为初始值就好了
    if (props.option && props.option.length) {

        // let editItem = props.option.find((item) => {item.type === 'editor'})
        let editItem = props.option.find(item => item.type==='editor')
        console.log(editItem)
        // edit.value.txt.html(.value)// 重新设置编辑器内容
        console.log("重置完成")
    }

}
// 表单验证方法
let validate = ()=>{
    return form.value?.validate
}
//获取表单数据
let getFormData = ()=>{
    return model.value
}
// 分发方法
defineExpose({
    resetFields,
    validate,
    getFormData
})
</script>

<style lang='scss' scoped>

</style>