<template #default>
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="按城市" name="city">
            <!-- 字母导航 -->
            <div>
                <div class="spellNav">
                    <div v-for="(item, index) in Object.keys(cities)" :key="index"
                        @click="scollToCity(item)">{{ item }}</div>
                </div>
                <!-- 按首字母展示城市数据 -->
                <div>
                    <el-scrollbar height="300px">
                        <div v-for="(item, key) in cities" :key="key">
                            <el-row style="margin-bottom: 10px;" :id="key">
                                <el-col :span="2">{{ key }}:</el-col>
                                <el-col :span="22" class="city-name">
                                    <div v-for="city in item" :key="city.id">
                                        <span>{{ city.name }}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="按省份" name="province">我是按省份</el-tab-pane>
    </el-tabs>
</template>