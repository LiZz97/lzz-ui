# 介绍

基于 vue3 + Element Plus UI 进行二次封装，通过传入配置项快速实现组件。一些参数参考[Element Plus UI](https://element-plus.gitee.io/zh-CN/)


# Github
[lzz-ui github](https://github.com/LiZz97/lzz-ui)



# 使用说明

1. npm install lzz-ui

2. 在页面中按需引入
>   ```javascript
>    import { Buttons } from 'lzz-ui'
>   ```



# 组件文档



##  Table组件

表格

参数：

* ajaxFunc 类型：Promise函数  请求数据函数，接收一个参数pagination，包含分页器的page跟size，要求抛出一个对象，包含data和total两个字段，如：{data: [], total: 0}

* firstColumn  类型：Object  表格第一列配置，不传则不显示，type可传index/selection/expand
* columns   类型：Array  表格columns配置项
  - key  类型：String  渲染字段名
  - title  类型：String  表头标题
  - slot  类型：Boolean  是否使用插槽，插槽名为key的值，可选值
  - props  类型：Object  传给el-table-column的参数
* tableProps  类型：Object  传给el-table的参数
* tableEvents  类型： Object  绑定el-table的事件
* disabled  类型：Boolean  是否禁用分页器
* showPagination  类型：Boolean  是否显示分页器
* currentPage  类型：Number  分页器默认页数
* currentSize 类型：Number  分页器默认单页大小

***

插槽

* 单元格插槽  插槽名为column设置的key值，接收参数为单元格的值

***

方法

* InitPage  重置分页器页数
* init  请求数据

***

例：

```html
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
```

```js
import axios from 'axios'
import { Table } from 'lzz-ui'
import { ref } from 'vue'

// 表格ref
const tableRef = ref(null)

// 配置表格多选
const firstColumn = {
  type: 'selection'
}

// 表格columns配置项
const columns = [
  { key: 'id', title: '用户id', props: { width: '100px' } },
  { key: 'name', title: '用户名' },
  // 设置电话一列为自定义插槽，插槽名为key的值，也就是tel
  { key: 'tel', title: '电话', slot: true }
]

// 表格绑定事件
// 更多事件见：https://element-plus.gitee.io/zh-CN/component/table.html#table-events
const tableEvents = {
  select: (selection, row) => {
    console.log('选中了：' , selection);
  }
}

// 数据请求函数
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
      const { data } = res
      // 抛出data和total，给表格跟分页器渲染
      resolve({
        data: data.list,
        total: data.total
      })
    })
  })
}

// 重置分页器页数后重新请求数据
function initTableData() {
  tableRef.value.initPage()
  tableRef.value.init()
}
onMounted(() => {
  initTableData()
}) 

// 使用el-table自带方法，
// 更多方法见：https://element-plus.gitee.io/zh-CN/component/table.html#table-methods
function useElTableMethods() {
  tableRef.value.elTableRef.clearSelection()
}
```



## Form组件

表单

参数：

* formData  类型：Object  表单数据
* rules  类型：Object  表单校验规则，用法与el-form的rules一样
* formProps  类型：Object  传给el-form的参数
* formItems  类型：Array  表单项配置
  - el  类型：String  需要渲染的组件，动态表单为dynamic-group，slot为true时不用传
  - slot  类型：Boolean  是否需要自定义插槽，插槽名为key的值
  - key  类型：String  表单项绑定的字段名，同el-form-item的prop值
  - title  类型：String  表单项的名称，同el-form-item的label值
  - props  类型：Object  传给el-form-item的参数
  - elProps  类型：Object  传给绑定组件的参数
  - elEvents  类型：Object  给绑定的组件绑定事件
  - options  类型：Array  el为el-select时，下拉框选项，要求包含label和value
  - groups  类型：Array  使用动态表单时配置每一组的表单项
    - el  类型：String  动态表单项绑定的组件
    - slot  类型：Boolean  动态表单项是否需要自定义插槽，插槽名为 dynamic_动态表单项绑定的key
    - key  类型：String  动态表单项绑定的字段名
    - title  类型：String  动态表单项的名称
    - rules  类型：Object/Array  动态表单项绑定的校验规则
    - elProps  类型：Object  传给动态表单项绑定组件的参数
  - add  类型：Function  使用动态表单时，添加一组表单的函数
  - del  类型：Function  使用动态表单时，删除一组表单的函数，接收一个参数，为需要删除的组的索引
* inline  类型：Boolean  是否使用行内表单模式
* showButtons  类型：Boolean  是否显示搜索按钮，需要inline为true
* width  类型：String  表单的宽度，默认100%
* beforeReset  类型：Promise函数  重置表单前的钩子，reject阻止表单重置

***

方法

* validate  表单校验

***

事件

* search  点击搜索/重置按钮时触发

***

插槽

* header  表单头部插槽
* footer  表单尾部插槽
* 普通表单自定义插槽  插槽名为表单项绑定的key值
* 动态表单自定义插槽  插槽名  dynamic_动态表单项绑定的key值

***

__普通表单例子：__

```html
<Form 
	:formData="formData" 
	:formItems="formItems" 
	:formProps="formProps"
	:rules="formRules"
	 ref="formRef"
>   
  <template #formSlot>
    普通表单自定义插槽
    <el-input v-model="formData.formSlot"></el-input>
  </template>
</Form>
```

```js
import { Form } from 'lzz-ui'	
import { ref, reactive } from 'vue'

const formRef = ref(null) // 获取Form的ref
// 表单数据
const formData = reactive({
  name: '',
  sex: '',
  formSlot: ''
})
// 传给el-form的参数
const formProps = {
  labelWidth: 'auto'
}
// 表单校验规则
const formRules = {
  name: [
    { required: true, message: '请输入姓名' },
  ],
  sex: [
    { required: true, message: '请选择性别' }
  ]
}
// 表单配置项
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
  }
]
// 使用表单校验方法
function formValidate() {
  formRef.value.validate().then(() => {
    // 表单校验通过
  }).catch(() => {
    // 表单校验失败
  })
}
// 使用el-form的方法
// 更多方法见：https://element-plus.gitee.io/zh-CN/component/form.html#form-%E6%96%B9%E6%B3%95
function useElFormMethods() {
  formRef.value.elFormRef.resetFields()
}
```

***

__行内表单例子：__

```html
<Form 
	:formData="formData" 
	:formItems="formItems" 
  inline
  :beforeReset="onBeforeReset"
  @search="onSearch"
> 
</Form>
```

```js
import { Form } from 'lzz-ui'
import { reactive } from 'vue'

const formData = reactive({
  name: ''
})
const formItems = [
  {
    el: 'el-input',
    key: 'name',
    title: '姓名'
  }
]
// 重置之前的钩子
function onBeforeReset() {
  return new Promise((resolve, reject) => {
    // reject() // 阻止重置表单
    resolve() // 重置表单
  })
}
function onSearch() {
  // 点击搜索/重置按钮触发 
}
```

***

__动态表单例子:__

```html
<Form 
	:formData="formData" 
	:formItems="formItems"
  ref="dynamicFormRef"
> 
  <template #dynamic_address="scope">
  	动态表单自定义插槽
    <el-input v-model="formData.info[scope.index].address"></el-input>
  </template>
</Form>
```

```js
import { Form } from 'lzz-ui'
import { reactive, ref } from 'vue'

const dynamicFormRef = ref(null)

const formData = reactive({
  name: '',
  info: []
})
const formItems = [
  {
    el: 'el-input',
    key: 'name',
    title: '姓名'
  },
  // 动态表单项
  {
    el: 'dynamic-group',
    key: 'info',
    add: () => { // 动态表单添加一组表单
      formData.info.push({
        tel: ''
        address: ''
      })
    },
    del: (index) => { // 动态表单删除一组表单
      formdata.info.splice(index, 1)
    },
    groups: [
      {
        el: 'el-input',
        key: 'tel',
        title: '电话',
        rules: [
          { required: true, message: '请输入电话' },
          { min: 11, max: 11, message: '请输入11位电话号码' }
        ]
      },
      {
        slot: true, // 使用自定义动态表单插槽
        key: 'address',
        title: '地址'
      }
    ]
  }
]
// 表单校验
function formValidate() {
  dynamicFormRef.value.validate().then(() => {
    // 表单校验通过
  }).catch(() => {
    // 表单校验通过
  })
}
```





## DIalog组件

弹窗

参数:

* v-model 类型：Boolean  控制弹窗开关
* width 类型：String  弹窗宽度，如：100px，50%，默认45%
* title 类型：String  弹窗标题
* confirmText  类型：String  弹窗确定按钮文本
* dialogProps 类型：Object  传给el-dialog的参数
* confirmFunc 类型：Promise函数  弹窗确定按钮点击事件，resolve关闭弹窗，reject阻止关闭弹窗
* beforeClose 类型：Promise函数  弹窗点击取消按钮/关闭按钮时，关闭之前的钩子，resolve关闭弹窗，reject阻止关闭弹窗

插槽:

* default  弹窗内容插槽

例：

```html
    <Dialog 
      v-model="show" 
      title="测试弹窗" 
      :confirm-func="onConfirm" 
      :before-close="onBeforeClose"
    >
      <div>弹窗内容</div>
    </Dialog>
```

```js
    import { Dialog } from 'lzz-ui'
    import { ref } from 'vue'

    const show = ref(false)
    
    // 弹窗确定按钮点击事件
    function onConfirm() {
        return new Promise((resolve, reject) => {
            console.log('点击确定按钮');
          	// reject() 阻止弹窗关闭
            resolve()
        })
    }

		// 弹窗点击取消按钮/关闭按钮，关闭之前的钩子
    function onBeforeClose() {
        return new Promise((resolve, reject) => {
            console.log('弹窗关闭');
          	// reject() 阻止弹窗关闭
            resolve()
        })
    }
```



## Buttons组件

按钮组

参数： 

* buttons 类型: Array  按钮组配置项

    - type 类型: String  指定el-button的type，默认primary

    - title 类型: String  按钮的文本

    - click 类型: Function  按钮点击事件

    - props 类型: Object  传给el-button的参数

* buttonGroup 类型: Boolean  按钮组是否使用el-button-group嵌套

例：
```html
    <Buttons :buttons="buttons" />
```
```javascript
    import { Buttons } from 'lzz-ui'
		
    const buttons = [
        { 
            title: '按钮1',
            click: () => {
                console.log('点击按钮1');
            },
            props: {
                disabled: true 
            }
        },
        {
            title: '按钮2',
            type: 'danger',
            click: () => {
                console.log('点击按钮2');
            }
        }
    ]
```



## Upload组件

上传文件

参数：

* uploadUrl  类型：String  上传地址 必需参数
* type  类型：String  上传组件类型，可选值button/image，默认button
* data  类型：Object  上传时携带的额外参数
* limit  类型：Number  限制单次上传文件数量，默认为1
* multiple  类型：Boolean  是否多选文件，默认false
* fileList  类型：Array  默认文件
* showFileList  类型：Boolean  是否显示上传文件列表，默认false
* accept  类型：String  允许上传的文件类型
* beforeUpload  类型：Function  文件上传之前钩子，return false则阻止上传
* title  类型：Stirng  type为button时，按钮的文本
* uploadProps  类型：Object  其他传给el-upload的参数，见[el-upload参数](https://element-plus.gitee.io/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7)

插槽：

* tip  提示说明插槽

Expose：

* elUploadRef  el-upload的实例内容

事件：

* onSuccess  上传成功时触发

例：

```html
<Upload
:uploadUrl="uploadUrl"
:beforeUpload="onBeforeUpload"
@onSuccess="onSuccess"
ref="uploadRef"
></Upload>
```

```js
import { Upload } from 'lzz-ui'
import { ref } from 'vue'

const uploadRef = ref(null)
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

// 使用el-upload自带方法,见:https://element-plus.gitee.io/zh-CN/component/upload.html#exposes
function useElUploadMethods() {
  uploadRef.value.elUploadRef.abort(file => {
   	// 取消上传
  })
}
```





# lzz-ui
