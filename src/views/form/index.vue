<template>
    <div>
        <m-form ref="form" :option="option" @on-change="handleChange" @before-upload="handleBeforeUpload"
            @on-preview="handlePreview" @on-remove="handleRemove" @before-remove="beforeRemove"
            @on-success="handleSuccess" @on-exceed="handleExceed">
            <template #uploadArea>
                <el-button type="primary">Click to upload</el-button>
            </template>
            <template #uploadTip>
                <div class="el-upload__tip">
                    jpg/png files with a size less than 500KB.
                </div>
            </template>
            <template #action="scope">
                <el-button type="primary" @click="submitForm(scope)">提交</el-button>
                <el-button type="danger" @click="resetForm">重置</el-button>
            </template>
        </m-form>
    </div>
</template>

<script setup lang='ts'>
import { FormOptions, FormInstance } from '../../components/form/src/types/type';
import { ElMessage, ElMessageBox } from 'element-plus'
import{ref} from 'vue'
interface Scope {
    form: FormInstance,
    model: any
}
// form表单的实例
let form = ref()
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
//上传组件的方法
let handleRemove = (file: any, fileList: any) => {
    console.log('handleRemove', file, fileList)
}
let handlePreview = (file: any) => {
    console.log('handlePreview', file)
}
let beforeRemove = (val: any) => {
    console.log('beforeRemove')
    return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}
let handleExceed = (val: any) => {
    console.log('handleExceed', val)
    ElMessage.warning(
        `The limit is 3, you selected ${val.files.length} files this time, add up to ${val.files.length + val.fileList.length} totally`
    )
}
let handleSuccess = (val: any) => {
    console.log('success', val)
}
let handleChange = (val: any) => {
    console.log('change', val)
}
let handleBeforeUpload = (val: any) => {
    console.log('handleBeforeUpload', val)
}

// 提交表单信息
let submitForm = (scope: Scope) => {
    scope.form.validate((valid) => {
        if (valid) {
            console.log(scope.model)
            ElMessage.success('提交成功')
        }else{
            ElMessage.error('表单填写有误,请检查')
        }
    })
}
// 重置表单信息
let resetForm = () => {
    form.value.resetFields()
}
</script>

<style lang='scss' scoped>

</style>