<template>
    <div class="list-tabs__item">
        <el-tabs>
            <el-tab-pane v-for="(item,index) in list" :label="item.title" :key="index">
                <!-- 滚动条 -->
                <el-scrollbar max-height="300px">
                    <div class="container" v-for="(item1,index1) in item.content " :key="index1" @click="clickItem(item1,index1)">
                        <!-- 头像 -->
                        <div class="avatar" v-if="item1.avatar">
                            <el-avatar size="small" :src="item1.avatar" />
                        </div>
                        <!-- 通知内容 -->
                        <div class="content">
                            <!-- 标题 -->
                            <div class="title">
                                <div>{{ item1.title }}</div>
                                <el-tag v-if="item1.tag" size="small" :type="item1.tagType">{{item1.tag}}</el-tag>
                            </div>
                            <!-- 描述 -->
                            <div class="time">
                                {{ item1.desc }}
                            </div>
                            <!-- 时间 -->
                            <div class="time">
                                {{ item1.time }}
                            </div>
                        </div>
                    </div>
                    <!-- 操作 -->
                    <div class="actions">
                        <div v-for="(action,i) in actions" :key="i" class="a-item"  @click="clickAction(action,i)"  :class="{ 'border': i !== actions.length }">
                            <div class="a-icon" v-if="action.icon">
                                <component :is="`el-icon-${toLine(action.icon)}`"></component>
                            </div>
                            <div class="a-text">{{action.text}}</div>
                        </div>
                    </div>
                </el-scrollbar>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang='ts'>
// 如何把data.ts的数据使用上:为何要在data.js定义接口呢？无非是为了规范拿到数据的类型。
// 从而拿到正确的数据
// 之前在type.js 定义的数据如何使用上
import { PropType } from 'vue';
import { ListItem, ListOptions, ActionOptions } from "./types"
import { toLine } from '../../../utils'
let prop = defineProps({
    // 列表的内容
    list: {
        type: Array as PropType<ListOptions[]>,
        requred: true
    },
    //操作的内容
    actions: {
        type: Array as PropType<ActionOptions[]>,
        default: () => []
    }
})
let emit = defineEmits([
    'clickItem','clickAction'
])

let clickItem = (item:ListItem,index:number)=>{
    emit('clickItem',{item,index})
}
let clickAction = (item:ActionOptions,index:number)=>{
    emit('clickAction',{item,index})
}
</script>

<style lang='scss' scoped>
.container {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    cursor: pointer;

    &:hover {
        background: #e6f6ff;
    }

    .avatar {
        flex: 1;
    }

    .content {
        flex: 3;

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .time {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
        }
    }
}

.actions {
    height: 50px;
    display: flex;
    align-items: center;
    border-top: 1px solid #eee;

    .a-item {
        height: 50px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .a-icon {
            margin-right: 4px;
            position: relative;
            top: 2px;
        }
    }
}

.border {
    border-right: 1px solid #eee;
}
</style>