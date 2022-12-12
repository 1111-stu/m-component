<template>
    <div>
        <!-- 选择省份 -->
        <el-select clearable placeholder="选择省份" v-model="province">
            <el-option v-for="item in areas" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        <!-- 选择城市 -->
        <el-select clearable :disabled="!province" placeholder="选择城市" v-model="city">
            <el-option v-for="item in selectCity" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        <!-- 选择区域 -->
        <el-select clearable :disabled="!province||!city" placeholder="选择区域" v-model="area">
            <el-option v-for="item in selectArea" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
    </div>
</template>

<script setup lang='ts'>
import allAreas from '../lib/pca-code.json'
import { ref, watch } from 'vue'
export interface AreaItem {
    name: string,
    code: string,
    children?: AreaItem[]
}

export interface Data {
    name: string,
    code: string
}

let province = ref<string>('')
let city = ref<string>('')
let area = ref<string>('')
let areas = ref(allAreas)

//城市下拉的所有值
let selectCity = ref<AreaItem[]>([])
//辖区下拉的所有值
let selectArea = ref<AreaItem[]>([])

// 分发事件给父组件
let emits = defineEmits(['change'])

// 监听选择省份
watch(() => province.value, val => {
    if (val) {
        //根据省份的code过滤出省份对应cities的值
        let cities = areas.value.find(item => item.code === province.value)!.children
        selectCity.value = cities
    }
    city.value = ''
    area.value = ''
})
watch(() => city.value, val => {
    if (val) {
        let area = selectCity.value.find(item => item.code === city.value)!.children!
        selectArea.value = area
    }
    area.value = ''
})
watch(() => area.value, val => {
    if (val) {
        let provinceData: Data = {
            code: province.value,
            name: allAreas.find(item => item.code === province.value)!.name
        }
        let cityData: Data = {
            code: city.value,
            name: selectCity.value.find(item => item.code === city.value)!.name
        }
        let areaData: Data = {
            code: area.value,
            name: selectArea.value.find(item => item.code === area.value)!.name
        }
        // 分发数据给父组件
        emits('change', {
            province: provinceData,
            city: cityData,
            area: areaData
        })
    }

})
</script>

<style lang='scss' scoped>

</style>