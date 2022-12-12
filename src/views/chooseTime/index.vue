<template>
  <div>
    <m-choose-time  @startChange="startChange" @endChange="endChange"></m-choose-time>
    <br />
    <m-choose-time :startOptions="startOptions"  @startChange="startChange" @endChange="endChange"></m-choose-time>
    <br/>
    <m-choose-date :disableToday="false"  @startChange="dateStartChange" @endChange=" dateEndChange"></m-choose-date>
  </div>
</template>

<script lang='ts' setup>
interface endValue {
  startTime: string,
  endTime: string
}
interface dateEndValue {
  startDate: Date,
  endDate: Date
}
let startChange = (val: string) => {
  console.log('startChange', val)
}
let endChange = (val: endValue) => {
  console.log('endChange', val)
}
let dateStartChange = (val: Date) => {
  console.log(val)
}
let dateEndChange = (val: dateEndValue) => {
  console.log(val)
}
// 一些不是props的参数
let startOptions = {
  size: 'small',
  effect:'dark'
}
let endOptions = {
  size: 'small',
  effect:'dark'
}
</script>

<style lang='scss' scoped>
</style>