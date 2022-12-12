<template>
	<div>
		<el-menu v-bind="$attrs">
			<!-- 叶子级菜单 -->
			<template v-if="props.menudata!.children && props.menudata!.children.length === 0">
				<el-menu-item :key="props.menudata!.id" :index="props.menudata!.path">
					{{ props.menudata!.label }}
				</el-menu-item>
			</template>
			<!--父级菜单-->
			<el-sub-menu v-else :index="props.menudata!.path" style="text-align: left">
				<template #title style="font-size: 17px;">
					<span>{{props.menudata!.label }}</span>
				</template>
				<template v-for="child in props.menudata!.children">
					<m-infinite-menu v-if="child.children && child.children.length>0" :key="child.id"
						:menudata="child"/>
					<el-menu-item v-else :key="child.name" :index="child.path">
						{{child.label}}
					</el-menu-item>
				</template>
			</el-sub-menu>
		</el-menu>
	</div>
</template>

<script setup lang='ts'>
import {PropType} from 'vue'
import {Menuoption} from './type'
let props = defineProps({
	menudata: {
		type: Array as PropType<Menuoption[]>,
		requred: true
	}
})
</script>

<style lang='scss' scoped>

</style>