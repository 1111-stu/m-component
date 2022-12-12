<template>
    <div>
        <m-notification :value="14" type="success"></m-notification>
        <m-notification :value="20">
            <template #default>
              <m-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></m-list>
            </template>
        </m-notification>
    </div>
</template>
<script setup lang='ts'>
    import {list,actions} from './data'
    let clickItem = (val:any) => {
        console.log(val)
    }
    let clickAction = (val:any) =>{
        console.log(val)
    }
</script>

<style lang='scss' scoped>

</style>