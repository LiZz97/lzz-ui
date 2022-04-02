<template>
    <div>
        <el-button type="primary" @click="show = true">打开弹窗</el-button>

        <Dialog v-model="show" title="测试弹窗" :confirm-func="onConfirm" :before-close="onBeforeClose">
            <div>弹窗内容</div>
        </Dialog>
    </div>
</template>

<script setup>
    import Dialog from '../components/Dialog/Dialog.vue'
    import { ref } from 'vue'

    const show = ref(false)
    
    function onConfirm() {
        return new Promise((resolve, reject) => {
            console.log('点击确定按钮');
            resolve()
        })
    }

    function onBeforeClose() {
        return new Promise((resolve, reject) => {
            console.log('弹窗关闭');
            resolve()
        })
    }
</script>

<style>

</style>