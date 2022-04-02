<template>
    <div :class="uploadClass[type]">
        <el-upload
        :action="uploadUrl"
        :limit="limit"
        :multiple="multiple"
        :file-list="fileList"
        :list-type="listType"
        :data="data"
        :show-file-list="showFileList"
        :accept="accept" 
        :on-success="onSuccess"
        :before-upload="beforeUpload"
        :disabled="disabled"
        v-bind="uploadProps"
        ref="elUploadRef"
    >
        <template v-if="type === 'button'">
            <el-button type="primary">{{ title }}</el-button>
        </template>
        <div class="image-view" v-if="type === 'image'">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </div>
        <template #tip>
            <slot name="tip"></slot>
        </template>
    </el-upload>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { Plus } from '@element-plus/icons-vue'

    const elUploadRef = ref(null)

    const props = defineProps({
        // 上传地址
        uploadUrl: String,
        // 上传控件类型 button/image
        type: {
            type: String,
            default: 'button'
        },
        // 限制单次上传数量
        limit: {
            type: Number,
            default: 1
        },
        // 是否多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 默认文件
        fileList: {
            type: Array,
            default: () => []
        },
        // 请求携带额外参数
        data: {
            type: Object,
            default: () => {}
        },
        // 是否显示文件列表
        showFileList: {
            type: Boolean,
            default: false
        },
        // 允许上传的文件类型
        accept: {
            type: String,
            default: ''
        },
        // 上传之前的回调，返回false则阻止上传
        beforeUpload: {
            type: Function
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '点击上传'
        },
        uploadProps: Object
    })
    const emit = defineEmits(['onSuccess'])
   
    // const uploadUrl = import.meta.env.VITE_UPLOAD_URL

    const uploadClass = {
        button: 'button-uploader',
        image: 'avatar-uploader'
    }

    const imageUrl = ref('')

    function onSuccess(res, file, fileList) {
        if (props.type === 'image') imageUrl.value = URL.createObjectURL(file.raw)
        emit('onSuccess', { res, file, fileList })
    }

    defineExpose({
        elUploadRef
    })
</script>

<style>
    .el-upload--text {
        width: auto !important;
        height: auto !important;
        border: none !important;
    }
    .image-view {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload--text {
        width: auto !important;
        height: auto !important;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

</style>