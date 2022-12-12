<template>
    <div>
        <el-divider>正常趋势</el-divider>
        <div class="flex">
            <div>
                <m-trend text="营业额"></m-trend>
            </div>
            <div>
                <m-trend text="销售额" type="down"></m-trend>
            </div>
        </div>
        <br />

        <el-divider>颜色翻转</el-divider>
        <div class="flex">
            <div>
                <m-trend text="销售额" reverseColor></m-trend>
            </div>
            <div>
                <m-trend text="营业额" type="down" reverseColor></m-trend>
            </div>
        </div>
        <br />
        <el-divider>自定义图标颜色</el-divider>
        <div class="flex">
            <div>
                <m-trend text="销售额" upIconColor="#000"></m-trend>
            </div>
            <div>
                <m-trend text="营业额" type="down" downIconColor="red"></m-trend>
            </div>
        </div>
        <br />

        <el-divider>自定义文字颜色</el-divider>
        <div class="flex">
            <div>
                <m-trend text="销售额" upTextColor="red"></m-trend>
            </div>
            <div>
                <m-trend text="营业额" type="down" downTextColor="green"></m-trend>
            </div>
        </div>
        <br />

        <el-divider>自定义图标</el-divider>
        <div class="flex">
            <div>
                <m-trend text="销售额"  upIcon="ArrowUpBold"></m-trend>
            </div>
            <div>
                <m-trend text="营业额" type="down" downIcon="ArrowDownBold"></m-trend>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
.flex {
    display: flex;

    div {
        margin-right: 10px;
    }
}
</style>