<template>
    <Table 
        :firstColumn="firstColumn" 
        :columns="columns" 
        :tableEvents="tableEvents"
        :ajaxFunc="getData"
        ref="tableRef"
    >
        <template #tel="scope">
            自定义插槽  电话：{{ scope.value }}
        </template>
    </Table>
    
    <el-button type="primary" @click="useElTableMethods">清楚所选项</el-button>
</template>

<script setup>
    import axios from 'axios'
    import Table from '../components/Table/Table.vue'
    import { onMounted, ref } from 'vue'

    const tableRef = ref(null)

    const firstColumn = {
        type: 'selection'
    }

    const columns = [
        { key: 'id', title: '用户id', props: { width: '100px' } },
        { key: 'name', title: '用户名' },
        { key: 'tel', title: '电话', slot: true }
    ]

    const tableEvents = {
        select: (selection, row) => {
            console.log('选中了：' , selection);
        }
    }

    function getData(pagination) {
        return new Promise(resolve => {
            axios({
                url: 'http://localhost:3000/public/json/table-data.json',
                method: 'get',
                params: {
                    page: pagination.page,
                    size: pagination.size
                }
            }).then(res => {
                console.log(res.data);
                const { data } = res
                resolve({
                    data: data.list,
                    total: data.total
                })
            })
        })
    }

    function initTableData() {
        tableRef.value.initPage()
        tableRef.value.init()
    }

    function useElTableMethods() {
        tableRef.value.elTableRef.clearSelection()
    }
    onMounted(() => {
        initTableData()
    }) 
</script>

<style>

</style>