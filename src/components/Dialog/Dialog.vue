<template>
    <el-dialog
        :title="title"
        v-model="modelValue"
        :width="width"
        :before-close="handleClose"
        destroy-on-close
        lock-scroll
        ref="dialogRef"
        v-bind="dialogProps"
    >   
        <div v-loading="loading">
            <slot></slot>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <slot name="footer"></slot>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">{{ confirmText }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        // 弹窗开关
        modelValue: {
            type: Boolean,
            default: false
        },
        // 确定按钮事件 接收Promise函数
        confirmFunc: {
            type: Function,
            default: () => {
                return new Promise(resolve => resolve())
            }
        },
        // 弹窗宽度
        width: {
            type: String,
            default: '45%'
        },
        // 弹窗标题
        title: {
            type: String,
            default: '提示'
        },
        // 弹窗确定按钮文本
        confirmText: {
            type: String,
            default: '确定'
        },
        // 传给 el-dialog 的参数
        dialogProps: {
            type: Object,
            default: () => {}
        },
        // 弹窗关闭之前钩子
        beforeClose: {
            type: Function
        }
    })

    const emit = defineEmits(['confirm', 'update:modelValue'])

    const dialogRef = ref(null)

    // 取消按钮点击事件
    async function cancel() {
        try {
            if (props.beforeClose) await props.beforeClose(() => {
                return emit('update:modelValue', false)
            })
            emit('update:modelValue', false)
        } catch (err) {
            console.log(err);
        }
    }

    const loading = ref(false)

    // 确定按钮点击事件
    async function confirm() {
        if (loading.value === true) return
        loading.value = true
        props.confirmFunc().then(() => {
            emit('update:modelValue', false)
        }).finally(() => {
            loading.value = false
        })
        setTimeout(() => {
            loading.value = false
        }, 6000)
    }

    // 弹窗关闭事件
    async function handleClose(done) {
        if (props.beforeClose) await props.beforeClose(done)
        emit('update:modelValue', false)
    }

    defineExpose({
        dialogRef
    })
</script>

<style>
    .el-dialog {
        border-radius: 10px !important;
    }
</style>