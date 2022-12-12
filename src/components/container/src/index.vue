<template>
  <el-container>
    <el-aside width="auto">
        <NavAside :collapse="isCollapse"></NavAside>
    </el-aside>
    <el-container>
      <el-header>
        <NavHeader v-model:collapse="isCollapse"></NavHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang='ts'>
import NavHeader from './navHeader/index.vue' 
import NavAside from './navAside/index.vue'
import {ref} from 'vue'

let isCollapse = ref(false)
</script>
<style lang='scss' scoped>
</style>