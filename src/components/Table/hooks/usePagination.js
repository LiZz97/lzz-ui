import { reactive, watch } from 'vue'

export default function usePagination(init, props) {
    const pageData = reactive({
        page: JSON.parse(JSON.stringify(props.currentPage)),
        size: JSON.parse(JSON.stringify(props.currentSize)),
        total: 100
    })

    watch(
        () => [pageData.page, pageData.size],
        val => {
            // console.log(pageData);
            init()
        }
    )

    function initPage() {
        pageData.page = 1
    }

    return {
        pageData,
        initPage
    }
}