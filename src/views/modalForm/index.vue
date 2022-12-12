<template>
    <el-button type="primary" @click="open">open</el-button>
    <m-modalForm v-model:visible="visible" title="编辑用户" :option="option" width="50%" :on-change="handleChange"
        :on-success="handleSuccess">
        <template #footer="{ form }">
            <el-button type="primary" @click="confirm(form)">确认</el-button>
            <el-button type="danger" @click="cancel">取消</el-button>
        </template>
        <template #uploadArea>
            <el-button size="small" type="primary">Click to upload</el-button>
        </template>
        <template #uploadTip>
            <div style="color: #ccc;font-size: 12px;">jpg/png files with a size less than 500kb</div>
        </template>
    </m-modalForm>
</template>

<script setup lang='ts'>
import { ElMessage, } from 'element-plus';
import { ref } from 'vue'
import { FormInstance, FormOptions } from '../../components/form/src/types/type'
let visible = ref<boolean>(false)
let option: FormOptions[] = [
    {
        type: 'input',
        label: '用户名',
        prop: 'usename',
        value: '',
        placeholder: '请输入用户名',
        rule: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 3, max: 6, message: '用户名在3-6位之间', trigger: 'blur' },
        ]
    },
    {
        type: 'input',
        label: '密码',
        prop: 'password',
        value: '',
        placeholder: '请输入密码',
        rule: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 15, message: '请输入3-15位的密码', trigger: 'blur' },
        ]
    },
    {
        type: 'select',
        label: '职位',
        prop: 'select',
        value: '1',
        placeholder: "请选择职位",
        attrs: {
            style: {
                width: '100%',
            }
        },
        children: [
            {
                type: 'option',
                label: '经理',
                value: '1',
            },
            {
                type: 'option',
                label: '主管',
                value: '2',
            },
            {
                type: 'option',
                label: '员工',
                value: '3',
            }
        ]
    },
    {
        type: 'checkbox-group',
        label: '爱好',
        prop: 'hobby',
        value: [],
        rule: [
            {
                required: true,
                message: '爱好不能为空',
                trigger: 'change'
            }
        ],
        children: [
            {
                type: 'checkbox',
                label: '唱',
            },
            {
                type: 'checkbox',
                label: '跳',
            },
            {
                type: 'checkbox',
                label: 'rap',
            },
        ]
    },
    {
        type: 'radio-group',
        label: '性别',
        prop: 'gender',
        value: '',
        rule: [
            {
                required: true,
                message: '性别不能为空',
                trigger: 'change'
            }
        ],
        children: [
            {
                type: 'radio',
                label: 'mal',
            },
            {
                type: 'radio',
                label: 'female',
            },
            {
                type: 'radio',
                label: '保密',
            },
        ]
    },
    {
        type: 'upload',
        label: '上传',
        prop: 'psc',
        uploadAttrs: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            multiple: true,
            limit: 3
        },
        // rule: [
        //     {
        //         required: true,
        //         message: '性别不能为空',
        //         trigger: 'blur'
        //     }
        // ],
    },
    {
        type: 'editor',
        label: '描述',
        placeholder: '请输入描述',
        prop: 'esc',
        value: '',
        // rule: [
        //     {
        //         required: true,
        //         message: '上传不能为空',
        //         trigger: 'blur'
        //     }
        // ],
    }
]

let open = () => {
    visible.value = true
}

let confirm = (form: any) => {
    let validate = form.validate()
    let modelValue = form.getFormData()
    validate((valid: any) => {
        if (valid) {
            ElMessage.success('验证成功')
            console.log(modelValue)
        } else {
            ElMessage.error('验证失败')
        }
    })
    visible.value = false
}
let handleSuccess = (val: any) => {
    console.log('success')
    console.log(val)
}
let handleChange = (val: any) => {
    console.log('change')
    console.log(val)
}
let cancel = () => {
    visible.value = false
}
</script>

<style lang='scss' scoped>

</style>