import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'

createApp(App).use(router).use(ElementPlus, { locale:localeZH }).mount('#app')
