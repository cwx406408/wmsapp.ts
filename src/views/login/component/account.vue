<template>
  <el-form class="login-content-form">
    <el-form-item>
      <el-input
        type="text"
        placeholder="用户名"
        prefix-icon="el-icon-user"
        v-model="ruleForm.userName"
        clearable
        autocomplete="off"
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { formatAxis } from '@/utils/formatTime'
import { Session } from '@/utils/storage'
import { initFrontEndControlRoutes } from '@/router/frontEnd'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'login',
  setup () {
    const proxy = getCurrentInstance()?.proxy
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      isShouwPassword: false,
      ruleForm: {
        userName: 'admin',
        password: '123456',
        code: '1234'
      },
      loading: {
        signIn: false
      }
    })

    const currentTime = computed(() => formatAxis(new Date()))

    const onSignIn = async () => {
      state.loading.signIn = true
      let defaultAuthPageList: Array<string> = []
      let defaultAuthBtnList: Array<string> = []
      const adminAuthPageList: Array<string> = ['admin']
      const adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link']
      const testAuthPageList: Array<string> = ['test']
      const testAuthBtnList: Array<string> = ['btn.add', 'btn.link']

      if (state.ruleForm.userName === 'admin') {
        defaultAuthPageList = adminAuthPageList
        defaultAuthBtnList = adminAuthBtnList
      } else {
        defaultAuthPageList = testAuthPageList
        defaultAuthBtnList = testAuthBtnList
      }

      const userInfos = {
        userName: state.ruleForm.userName,
        photo:
          state.ruleForm.userName === 'admin'
            ? 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
            : 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
        time: new Date().getTime(),
        authPageList: defaultAuthPageList,
        authBtnList: defaultAuthBtnList
      }

      Session.set('token', { admin: Math.random().toString(36).substr(0) })
      Session.set('userInfo', userInfos)
      store.dispatch('userInfos/setUserInfos', userInfos)
      if (!store.state.themeConfig.themeConfig.isRequestRoutes) {
        await initFrontEndControlRoutes()
        signSucess()
      }
    }

    const signSucess = () => {
      const currentTimeInfo = currentTime.value
      if (route.query?.redirect) {
        router.push({
          path: JSON.stringify(route.query?.redirect),
          query: route.query
        })
      } else {
        router.push('/')
      }

      setTimeout(() => {
        state.loading.signIn = true
        ElMessage.success(`${currentTimeInfo},登录成功`)
      }, 300)
    }

    return {
      currentTime,
      onSignIn,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.login-content-form {
  margin-top: 20px;
  .login-content-password {
    display: inline-block;
    width: 25px;
    cursor: pointer;
    &:hover {
      color: #909399;
    }
  }
  .login-content-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .login-content-code-img {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #ffffff;
      border: 1px solid rgb(220, 223, 230);
      color: #333;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 5px;
      text-indent: 5px;
      text-align: center;
      cursor: pointer;
      transition: all ease 0.2s;
      border-radius: 4px;
      user-select: none;
      &:hover {
        border-color: #c0c4cc;
        transition: all ease 0.2s;
      }
    }
  }
  .login-content-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 15px;
  }
}
</style>
