<template>
    <div>
        <m-progress :percentage="50" status = "success" ></m-progress>
        <br>
        <m-progress :percentage="50"  type="circle"></m-progress>
        <br>
        <m-progress :percentage="50" indeterminate></m-progress>
        <br>
        <m-progress :percentage="80" indeterminate></m-progress>
        <br>
        <m-progress :percentage="100" indeterminate></m-progress>
        <br>
    </div>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>

</style>