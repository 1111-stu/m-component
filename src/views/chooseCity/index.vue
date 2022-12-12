<template>
  <br>
  <br>
  <m-choose-city @changeCity="getChangeData"></m-choose-city>
  <!-- <m-choose-city2></m-choose-city2> -->
</template>

<script lang='ts' setup>
 let getChangeData = (val:any)=>{
  console.log(val)
 }
</script>
<style lang='scss' scoped>
</style>