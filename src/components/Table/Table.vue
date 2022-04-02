<template>
    <div v-loading="loading">
        <el-table
            :data="tableData"
            style="width: 100%"
            v-bind="tableProps"
            v-on="getTableEvent"
            border
            max-height="600px"
            ref="elTableRef"
        >
            <!-- 表格第一行 type: index/selection/expand -->
            <el-table-column
                header-align="center"
                align="center"
                v-if="firstColumn"
                v-bind="firstColumn"
            >
            </el-table-column>
            <!-- 遍历columns -->
            <template v-for="(item, index) in columns" :key="item.key">
                <!-- 需要自定义内容的情况 -->
                <el-table-column
                    header-align="center"
                    align="center"
                    :prop="item.key"
                    :label="item.title"
                    v-bind="item.props"
                >
                    <template v-slot="scope" v-if="item.slot">
                        <slot :name="item.key" :value="scope.row[item.key] || scope.row"></slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>

        <div class="pagination" v-if="showPagination">
            <el-pagination 
                v-model:page-size="pageData.size"
                v-model:current-page="pageData.page"
                :total="pageData.total"
                background 
                layout="prev, pager, next, total" 
                :disabled="disabled"
            />
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import useProps from './hooks/useProps.js'
    import useTable from './hooks/useTable.js'
    import usePagination from './hooks/usePagination.js'

    // 获取table El
    const elTableRef = ref(null)

    const props = defineProps(useProps())
    const { getTableEvent, tableData } = useTable(props) 
    const { pageData, initPage } = usePagination(init, props)

    const loading = ref(false)
    init()

    /**
     * 初始化
     */
    async function init() {
        loading.value = true
        props.ajaxFunc({
            page: pageData.page,
            size: pageData.size
        }).then(({ data, total = 0 }) => {
            tableData.value = data
            pageData.total = total
        }).finally(() => {
            loading.value = false
        })
    }    

    defineExpose({
        init,
        initPage,
        elTableRef
    })
</script>

<style scoped>
    .pagination {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>