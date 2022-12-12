<template>
    <div>
        <el-popover v-model:visible="visible" placement="bottom-start" :width="500" trigger="click">
            <template #reference>
                <div class="result">
                    <div>{{ result }}</div>
                    <div>
                        <el-icon-arrowdown :class="{ 'rotate': visible }"></el-icon-arrowdown>
                    </div>
                </div>
            </template>
            <div class="container">
                <el-row>
                    <el-col :span="8">
                        <el-radio-group v-model="radioValue" size="small">
                            <el-radio-button label="按城市"></el-radio-button>
                            <el-radio-button label="按省份"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="10">
                        <el-select v-model="selectValue" filterable placeholder="请选择"
                            :filter-method="filterMethod"  @change="changeSelectvalue">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <template v-if="radioValue === '按城市'">
                <div class="city">
                    <div class="city-item" @click="clickChat(item)" v-for="(item, index) in Object.keys(cities)">{{ item
                    }}</div>
                </div>
                <el-scrollbar max-height="300px">
                    <template v-for="(value, key) in cities" :key="key">
                        <el-row style="margin-bottom: 10px;" :id="key">
                            <el-col :span="2">{{ key }}:</el-col>
                            <el-col :span="22" class="city-name">
                                <div @click="clickCity(item)" class="city-name-item" v-for="(item, index) in value"
                                    :key="item.id">
                                    <div>{{ item.name }}</div>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                </el-scrollbar>
            </template>
            <template v-else>
                <div class="province">
                    <div class="province-item" @click="clickChat(item)" v-for="(item, index) in Object.keys(provinces)"
                        :key=index>
                        {{ item }}
                    </div>
                    <el-scrollbar max-height="300px">
                        <template v-for="(item, key) in provinces" :key="key">
                            <el-row style="margin-bottom: 10px;" v-for="(province, index) in item" :key="index"
                                :id="province.id">
                                <el-col :span="4">{{ province.name }}:</el-col>
                                <el-col :span="20" class="city-name">
                                    <div class="city-name-item" v-for="(city, index) in province.data" :key="index">
                                        <div @click="clickProvince(city)">{{ city }}</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </template>
                    </el-scrollbar>
                </div>
            </template>
        </el-popover>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import chooseArea from '../../chooseArea/src/index.vue'
import { nextTick } from 'vue'
//导入城市数据
import citydata from '../lib/city'
//导入City数据格式
import { City } from './type'
// 导入省份数据
import provinceData from '../lib/province.json' 
// 全部省份数据
let provinces = ref(provinceData)
// 分发事件
let emits = defineEmits(['changeCity', "changeProvince"])
// 选择城市结果
let result = ref<string>('请选择')
// 拿到city数据的cites对象
let cities = ref(citydata.cities)
// 单选框的值 按城市还是按省份选择
let radioValue = ref<string>('按城市')
// 控制弹出层的显示
let visible = ref<boolean>(false)
// 下拉框显示城市的数据
let options = ref<City[]>([])
// city所有城市的数据
let allCity = ref<City[]>([])
//搜索城市选中的值
let selectValue = ref<string>('')
// 点击城市或省份的字母区域
let clickChat = (item: string) => {
    nextTick(() => {
        let el = document.getElementById(item)
        if (el) {
            el.scrollIntoView()
        }
    })
}
// 点击城市名
let clickCity = (item: City) => {
    result.value = item.name
    // 关闭弹出层
    visible.value = false
    emits('changeCity', item)
}
// 点击省份名
let clickProvince = (item: string) => {
    result.value = item
    // 关闭弹出层
    visible.value = false
    emits('changeProvince', item)
}
// 搜索城市下拉框选择
let changeSelectvalue = (val: number) => {
    let city = allCity.value.find(item => item.id === val)
    result.value = city!.name
    selectValue.value = ''
    if(radioValue.value==='按城市'){
        emits('changeCity',city?.name)
    }else{
        emits('changeProvince',city?.name)
    }
}
// 自定义过滤
let filterMethod = (val: string) => {
    let values = Object.values(cities.value).flat(2)
    if (val === '') {
        options.value = values
    } else {
        if (radioValue.value === '按城市') { 
            // 中文和拼音一起过滤
            options.value = values.filter(item => {
                // 拼音过滤无法使用
                return item.name.includes(val) || item.spell.includes(val)
            })
        }
        else {
            // 中文过滤
            options.value = values.filter(item => {
                return item.name.includes(val)
            })
        }
    }
}
onMounted(() => {
    let value = Object.values(cities.value)
    allCity.value = value.flat(2)
    options.value = allCity.value
})
</script>

<style lang='scss' scoped>
.result {
    display: flex;
    align-items: center;
    width: fit-content;
    cursor: pointer;
}

.rotate {
    transform: rotate(180deg);
}

svg {
    width: 1em;
    height: 1em;
    position: relative;
    top: 2px;
    margin-left: 4px;
    transition: all 0.25s linear;
}

.container {
    padding: 6px;
}

.city,
.province {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;

    &-item {
        padding: 3px 6px;
        margin-right: 8px;
        border: 1px solid #eee;
        margin-bottom: 8px;
        cursor: pointer;
    }
}

.city-name,
.province-name {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .city-name-item,
    .province-name-item {
        margin-right: 6px;
        margin-bottom: 6px;
        cursor: pointer;
    }
}
</style>