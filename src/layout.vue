<template>
    <el-container class="container">
        <el-aside width="300px" class="aside">
            <el-menu 
                :default-active="onRoutes"
                active-text-color="#ffd04b"
                background-color="#545c64"
                text-color="#fff"
                router
            >
                <el-menu-item v-for="item in menu" :key="item.url" :index="item.path">{{ item.title }}</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script setup>
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()

    const menu = [
        { title: 'Buttons组件', path: '/Buttons' },
        { title: 'Dialog组件', path: '/Dialog' },
        { title: 'Table组件', path: '/Table' },
        { title: 'Form组件', path: '/Form' },
        { title: 'Upload组件', path: '/Upload' }
    ]

    const onRoutes = computed(() => {
        return route.path;
    });
</script>

<style>
    .container {
        height: 100%;
    }
    .aside {
        height: 100%;
        background-color: #545c64;
    }
</style>