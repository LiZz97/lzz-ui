<template>
    <div :style="{ width: width }">
        <el-form 
            ref="elFormRef" 
            :model="formData" 
            :rules="rules"
            v-bind="formProps"
            :inline="inline"
        >   
            <slot name="header"></slot>
            <template v-for="item in formItems" :key="item.key">
                <!-- 普通表单项 -->
                <el-form-item v-if="item.el !== 'dynamic-group'" :prop="item.key" :label="item.title" v-bind="item.props">
                    <slot v-if="item.slot" :name="item.key"></slot>
                    <component 
                        v-else 
                        :is="item.el" 
                        v-model="formData[item.key]" 
                        v-bind="item.elProps" 
                        v-on="initEvents(item)"
                    >
                        <!-- 下拉框配置option -->
                        <template v-if="item.el === 'el-select'">
                            <el-option 
                                v-for="option in item.options" 
                                :key="option.value"
                                :label="option.label"
                                :value="option.value"
                            ></el-option>
                        </template>
                    </component>
                </el-form-item>
                <!-- 动态表单 -->
                <template v-else>
                    <div v-for="(domain, index) in formData[item.key]" :key="`domain${index}`" class="dynamicGroup">
                        <el-form-item
                            v-for="(group, groupIndex) in item.groups" 
                            :key="groupIndex"
                            :label="`${group.title}`"
                            :prop="`${item.key}.${index}.${group.key}`"
                            :rules="group.rules"
                            class="dynamicGroupItems"
                        >   
                            <slot v-if="group.slot" :name="`dynamic_${group.key}`" :index="index"></slot>
                            <component 
                                v-else
                                :is="group.el" 
                                v-model="formData[item.key][index][group.key]" 
                                v-bind="group.elProps" 
                                v-on="initEvents(group)"
                            >
                                <template v-if="group.el === 'el-select'">
                                    <el-option 
                                        v-for="option in group.options" 
                                        :key="option.value"
                                        :label="option.label"
                                        :value="option.value"
                                    ></el-option>
                                </template>
                            </component>
                        </el-form-item>
                        <el-button type="danger" :icon="Delete" class="delBtn" @click="item.del(index)"></el-button>
                    </div>
                    <el-form-item label=" ">
                        <el-button type="primary" :icon="Plus" @click="item.add()"></el-button>
                    </el-form-item>
                </template>
            </template>
            <el-form-item v-if="inline && showButtons">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
            <slot name="footer"></slot>
        </el-form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { Plus, Delete } from '@element-plus/icons-vue'

    const props = defineProps({
        // 表单数据
        formData: {
            type: Object,
            default: () => {},
            required: true
        },
        // el-form 校验规则
        rules: {
            type: Object,
            default: () => {}
        },
        // el-form 接收参数
        formProps: {
            type: Object,
            default: () => {}
        },
        // 是否使用行内模式
        inline: {
            type: Boolean,
            default: false
        },
        /**
         * form-item 配置, 如:
         * [
         *  {
         *     el: 'el-input', 需要渲染的组件 有slot时不用传
         *     slot: fasle, 是否需要slot
         *     key: 'name',
         *     title: '姓名‘,
         *     props: {}, // el-form-item的props
         *     elProps: {}, // 渲染组件的props 有slot时不用传
         *     elEvents: {} // 渲染组件的events 有slot时不用传
         *  }
         * ]
         */
        formItems: {
            type: Array,
            default: () => []
        },
        showButtons: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '100%'
        },
        beforeReset: Function
    })
    const emit = defineEmits(['search'])

    const elFormRef = ref(null)

    /**
     * 表单校验
     */
    function validate() {
        return new Promise((resolve, reject) => {
            elFormRef.value.validate(valid => {
                if (valid) {
                    resolve()
                } else {
                    reject()
                }
            });
        })
    }

    /**
     * 搜索
     */
    function search() {
        emit('search')
    }
    /**
     * 重置表单
     */
    async function reset() {
        try {
            if (props.beforeReset) await props.beforeReset()
            elFormRef.value.resetFields()
            emit('search')
        } catch (err) {
            console.log(err);
        }
    }

    function initEvents(item) {
        if (item.elEvents && Object.keys(item.elEvents).length) return item.Events
        return {}
    }

    defineExpose({
        validate,
        elFormRef
    })

</script>

<style>
    .dynamicGroup {
        border-top: 1px solid #eee;
        padding: 20px 0;
        display: flex;
    }
    .delBtn {
        margin-left: 20px;
    }
    .dynamicGroupItems {
        flex-shrink: 0;
    }
</style>