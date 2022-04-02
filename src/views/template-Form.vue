<template>
    <div>
        <Form 
            :formData="formData" 
            :formItems="formItems" 
            :formProps="formProps"
            :rules="formRules"
            ref="formRef"
        >   
            <template #formSlot>
                <el-input v-model="formData.formSlot"></el-input>
                普通表单自定义插槽
            </template>
            <template #dynamic_slot="scope">
                第{{ scope.index }}个
            </template>
        </Form>
        <el-button type="primary" @click="look">look</el-button>
    </div>
</template>

<script setup>
    import Form from '../components/Form/Form.vue'
    import { reactive, ref } from 'vue'

    const formRef = ref(null)

    const formData = reactive({
        name: '',
        sex: '',
        contact: []
    })

    const formProps = {
        labelWidth: 'auto'
    }

    const formRules = {
        name: [
            { required: true, message: '请输入姓名' },
        ],
        sex: [
            { required: true, message: '请选择性别' }
        ]
    }

    const formItems = [
        {
            el: 'el-input',
            key: 'name',
            title: '姓名',
            elProps: {
                placeholder: '请输入姓名'
            }
        },
        {
            el: 'el-select',
            key: 'sex',
            title: '性别',
            options: [
                { label: '男', value: 1 },
                { label: '女', value: 2 }
            ],
            elProps: {
                placeholder: '请选择性别',
                clearable: true
            }
        },
        {
            slot: true,
            key: 'formSlot',
            title: '普通表单自定义插槽'
        },
        {
            el: 'dynamic-group',
            key: 'contact',
            add: () => {
                formData.contact.push({
                    tel: '',
                    address: '',
                    type: ''
                })
            },
            del: (index) => {
                formData.contact.splice(index, 1)
            },
            groups: [
                {
                    el: 'el-input',
                    key: 'tel',
                    title: '联系电话',
                    rules: { required: true, message: '请输入联系电话' },
                    elProps: {
                        placeholder: '请输入联系电话'
                    }
                },
                {
                    el: 'el-input',
                    key: 'address',
                    title: '地址',
                    rules: { required: true, message: '请输入地址' },
                    elProps: {
                        placeholder: '请输入地址'
                    }
                },
                {
                    el: 'el-select',
                    key: 'type',
                    title: '类型',
                    rules: { required: true, message: '请选择类型' },
                    options: [
                        { label: '选项1', value: 1 },
                        { label: '选项2', value: 2 }
                    ],
                    elProps: {
                        placeholder: '请选择类型'
                    }
                },
                {
                    slot: true,
                    key: 'slot',
                    title: '动态表单自定义插槽'
                }
            ]
        }
    ]
    
    function look() {
        formRef.value.validate()
        console.log(formData)
    }
</script>

<style>

</style>