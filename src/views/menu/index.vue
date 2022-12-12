<template>
  <div style="display: flex;">
    <div style="flex:1;">
      <m-menu :data="data1" defaultActive="1" name="a" index="b" icon="c" children="d"></m-menu>
    </div>
    <div style="flex:1;">
        <m-infinite-menu :menudata="item" v-for="(item,i) in adminMenus" :key="i"></m-infinite-menu>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Menuoption } from '../../components/infiniteMenu/src/type';

let data1 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
      }
    ]
  }
]
let data2 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'Document',
        d: [
          {
            a: '导航3-1-1',
            b: '3-1-1',
            c: 'Document',
            d: [
              {
                a: '导航3-1-1-1',
                b: '3-1-1-1',
                c: 'Document',
                d: [
                  {
                    a: '导航3-1-1-1-1',
                    b: '3-1-1-1-1',
                    c: 'Document',
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
let adminMenus:Menuoption[]= [{
		id: 1,
		path: "/admin",
		name: "AdminIndex",
		label: "首页",
		icon: "el-icon-s-home",
		component: "AdminIndex",
		parentId: 0,
		children: null
	},
	{
		id: 2,
		path: "/admin",
		name: "User",
		label: "用户管理",
		icon: "el-icon-user",
		component: "AdminIndex",
		parentId: 0,
		children: [{
				id: 6,
				path: "/admin/user/profile",
				name: "Profile",
				label: "用户信息",
				icon: null,
				component: "user/UserProfile",
				parentId: 2,
				children: null
			},
			{
				id: 7,
				path: "/admin/user/role",
				name: "Role",
				label: "角色配置",
				icon: null,
				component: "user/Role",
				parentId: 2,
				children: null
			}
		]
	},
	{
		id: 3,
		path: "/admin",
		name: "Content",
		label: "内容管理",
		icon: "el-icon-tickets",
		component: "AdminIndex",
		parentId: 0,
		children: [{
				id: 9,
				path: "/admin/content/department",
				name: "Department",
				label: "就业部类",
				icon: null,
				component: "content/department",
				parentId: 3,
				children: null
			},
			{
				id: 10,
				path: "/admin/content/student",
				name: "Student",
				label: "学生类",
				icon: null,
				component: "content/student",
				parentId: 3,
				children: [{
					id: 20,
					path: "/admin/content/student/graduateInfo",
					name: "graduateInfo",
					label: "毕业生信息",
					icon: null,
					component: "content/student/graduateInfo",
					parentId: 10,
					children: null
				}]
			},
			{
				id: 11,
				path: "/admin/content/enterprise",
				name: "Enterprise",
				label: "企业类",
				icon: null,
				component: "content/enterprise",
				parentId: 3,
				children: null
			}
		]
	},
	{
		id: 4,
		path: "/admin",
		name: "System",
		label: "系统管理",
		icon: "el-icon-s-tools",
		component: "AdminIndex",
		parentId: 0,
		children: [{
			  id: 12,
				path: "/admin/system/run",
				name: "Run",
				label: "运行情况",
				icon: null,
				component: "system/run",
				parentId: 4,
				children: null
			},
			{
				id: 13,
				path: "/admin/system/data",
				name: "Data",
				label: "备份恢复数据库",
				icon: null,
				component: "system/data",
				parentId: 4,
				children: null
			},
			{
				id: 14,
				path: "/admin/system/log",
				name: "Log",
				label: "操作日志",
				icon: null,
				component: "system/log",
				parentId: 4,
				children: null
			}
		]
	},
	{
		id: 5,
		path: "/admin",
		name: "Link",
		label: "链接",
		icon: null,
		component: "AdminIndex",
		parentId: 0,
		children: null
	}
]
</script>

<style lang='scss' scoped>

</style>