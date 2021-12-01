import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/theme/index.scss'
import { authDirective } from './utils/authDirective'
import mitt from 'mitt'
import VueGridLayout from 'vue-grid-layout'
import screenShort from 'vue-web-screen-shot'

const app = createApp(App)
app.use(router)
app.use(store, key)
app.use(ElementPlus)
app.use(screenShort, { enableWebRtc: false })
app.use(VueGridLayout)
app.mount('#app')

app.config.globalProperties.mittBus = mitt()

authDirective(app)
