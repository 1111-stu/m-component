import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

//引入入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入element plus图标库
import * as Icons from '@element-plus/icons-vue'

//引入处理驼峰命名的toline函数
import {toLine} from "./utils/index.js"

// 导入全局注册的封装组件
import mUI from './components'

// 引入mock的数据
import './mock'

const app = createApp(App)
// 全局注册图标 牺牲一点性能
// el-icon-xxx
for(let i in Icons){
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app.use(router).use(ElementPlus).use(mUI)
app.mount('#app')