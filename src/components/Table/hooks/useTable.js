import { reactive, ref, computed } from "vue";

export default function useTable(props) {
    // 定义表格数据
    const tableData = ref([])

    // 初始化绑定的表格方法
    const getTableEvent = computed(() => {
        if (props.tableEvents && Object.keys(props.tableEvents).length) {
            return props.tableEvents
        } 
        return {}
    })

    return {
        tableData,
        getTableEvent
    }
}