<template>
  <div>
    <van-nav-bar title="登录 / 注册" left-arrow @click-left="$router.back()" />
    <!-- 表单区域 -->
    <!--
        vant 表单验证
        1. 必须使用 van-from 对需要验证的表单项进行验证
        2.需要给 van-from 绑定 submit 事件
          因为只有当表单通过验证了才会触发 submit 事件，从而发送登录请求
        3. 可以使用 van-field 组件的 rules 属性定义验证规则
     -->
    <van-form
    :show-error-message='false'
    :show-error='false'
    validate-first
    ref="login-form"
    @submit="Login"
    @failed='failed'
    >
      <van-field
        v-model="userInfo.mobile"
        clearable
        class="iconfont icon-shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="fromRules.mobile"
      />
      <van-field
        v-model="userInfo.code"
        clearable
        class="iconfont icon-yanzhengma"
        placeholder="请输入验证码"
        :rules="fromRules.code"
      >
        <template #button>
          <van-count-down :time="1000 * 60" format="ss s" v-if="isSendSms" @finish='isSendSms = false' />
          <van-button class="code" size="mini" round @click.prevent="onSend" v-else :loading='isSendLoading' loading-text="请稍后...">发送验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn">
        <van-button block color='#66b1ff'>登录</van-button>
      </div>
    </van-form>
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
      测试账号 : 13611111111 验证码 : 246810
    </van-notice-bar>
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
      如果收不到验证码，请使用 246810 万能验证码
    </van-notice-bar>
  </div>
</template>

<script>
import { login, send } from '@/api/user'
// 引入 Toast
// import { Toast } from 'vant'
export default {
  name: 'Login',
  data () {
    return {
      // 输入的表单内容
      userInfo: {
        mobile: '',
        code: ''
      },
      // 表单验证规则
      fromRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 控制倒计时和发送验证码按钮显示隐藏
      isSendSms: false,
      // 控制按钮loading状态显示隐藏
      isSendLoading: false
    }
  },
  methods: {
    // 点击登录按钮
    async Login () {
      // 注意该方法如果需要使用，则需要单独引入
      // Toast.loading({
      // 当引入toast时，内部就已经将其挂载到vue原型上了，可以直接通过 this.$toast 直接访问
      this.$toast.loading({
        message: '登录中...', // 提示文字
        forbidClick: true, // 是否禁止背景点击
        overlay: true, // 是否显示遮罩层
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      // 使用 try catch 捕获错误
      try {
        const { data } = await login(this.userInfo)
        console.log(data)
        // 登录成功将用户信息保存至vuex当中
        this.$store.commit('setUserInfo', data)
        // 由于toast有覆盖性，后面的会覆盖掉前面的，所有loading提示会自动关闭
        this.$toast.success('登录成功！')
      } catch (error) {
        this.$toast.fail('登录失败，手机号或验证码错误！')
      }
    },
    // 当表单验证不通过时触发
    failed (err) {
      console.log(err)
      this.$toast({
        message: err.errors[0].message,
        position: 'top'
      })
    },
    // 发送短信
    async onSend () {
      try {
        // 通过 validate 验证单个表单项，
        await this.$refs['login-form'].validate('mobile')
        // 通过表单验证，发送短信验证码
        await send(this.userInfo.mobile)
        // 显示按钮loading状态
        this.isSendLoading = true
        // 显示倒计时效果
        this.isSendSms = true
      } catch (error) {
        // 在try catch 当中，所有的错误信息都会被catch捕获到
        console.dir(error)
        let message = ''
        if (error && error.response && error.response.status === 429) {
          message = '发送验证码频繁，请稍后再试！！！'
        } else if (error && error.name === 'mobile') {
          message = error.message
        } else {
          message = '验证码发送失败，请稍后再试！！！'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 关闭按钮loading状态
      this.isSendLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
  .iconfont {
    align-items: center;
  }
  .code,
  .van-count-down {
    width: 65px;
    padding: 2px 0;
    text-align: center;
    border-radius: 20px;
    font-size: 12px;
    background-color: #efefef;
    color: #666;
  }
  .login-btn {
    padding: 26px 16px;
    .van-button {
      border-radius: 6px;
    }
  }
</style>
