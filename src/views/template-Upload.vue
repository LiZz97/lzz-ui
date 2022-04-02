<template>
    <Upload
        :uploadUrl="uploadUrl"
        :beforeUpload="onBeforeUpload"
        @onSuccess="onSuccess"
    ></Upload>
</template>

<script setup>
    import Upload from '../components/Upload/Upload.vue'

    // 上传钩子
    const uploadUrl = 'http://localhost:3000/api/upload'

    // 上传之前的钩子
    function onBeforeUpload(rawFile) {
        console.log(rawFile);
        // return false  // 阻止上传
        return true
    }

    function onSuccess(response, file, fileList) {
        // 上传成功
    }
</script>

<style>

</style>