export default function useProps() {
    const props = {
        // 数据请求函数,接收一个参数,包含分页器page与size
        // 要求函数return一个对象，包含data(Array)跟total(Number), 如: { data: [], total: 0 }
        ajaxFunc: {
            type: Function,
            required: true
        },
        // 表格第一列配置 type: index/selection/expand 非必需
        firstColumn: {
            type: Object,
            default: () => {}
        },
        // 表格columus配置 必需
        // 如：
        // [
        //     {
        //         key: 'name',
        //         title: '姓名',
        //         props: {} // 传给el-table-column的props
        //         slot: true
        //     }
        // ]
        columns: {
            type: Array,
            default: () => [],
        },
        // 传给el-table的props 非必需
        tableProps: {
            type: Object,
            default: () => {}
        },
        // 绑定el-table的事件 非必需
        tableEvents: {
            type: Object,
            default: () => {}
        },
        // 是否禁用分页器 false不禁用 true禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否需要分页器
        showPagination: {
            type: Boolean,
            default: true
        },
        // 分页器默认页数
        currentPage: {
            type: Number,
            default: 1
        },
        // 分页器默认单页大小
        currentSize: {
            type: Number,
            default: 10
        }
    }

    return {
        ...props
    }
}