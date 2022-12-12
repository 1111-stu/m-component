<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script setup lang='ts'>
let props = defineProps<{collapse:boolean}>() 
//改变collape的值，传递回给父组件
let emits = defineEmits(['update:collapse'])
let toggle = ()=>{
  emits("update:collapse",!props.collapse)
}
</script>

<style lang='scss' scoped>
svg {
    width: 1em;
    height: 1em;
}
</style>