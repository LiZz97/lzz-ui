<template>
    <component :is="setSide" class="btns">
        <el-button
            v-for="(item, index) in buttons"
            :key="index"
            :type="item.type || 'primary'" 
            v-bind="item.props"
            @click="item.click"
        >
            {{ item.title }}
        </el-button>
    </component>
</template>

<script setup>
    const props = defineProps({
        /**
         * 按钮配置 Array<Object>
         * 参数： type: String 按钮类型 默认primary
         *       title: String 按钮文本
         *       cilck: Function 按钮点击事件
         *       props: Object 传给 el-button 的参数
         */
        buttons: {
            type: Array,
            default: () => []
        },
        // 是否需要外层嵌套 el-button-group
        buttonGroup: {
            type: Boolean,
            default: false
        }
    })

    const setSide = props.buttonGroup ? 'el-button-group' : 'div'
</script>

<style>
    .btns {
        margin: 10px 0;
    }
</style>