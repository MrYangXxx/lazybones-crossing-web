<template>
  <div class="login-container">
    <el-form
      ref="registryForm"
      :model="registryForm"
      :rules="registryRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>

      <el-form-item prop="receiver">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="receiver"
          v-model="registryForm.receiver"
          placeholder="手机或邮箱"
          name="receiver"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registryForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegistry"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div>
        <el-form-item style="float: left;margin-right: 10px" prop="verifyCode">
          <el-input
            ref="verifyCode"
            v-model="registryForm.verifyCode"
            type="text"
            placeholder="验证码"
            name="verifyCode"
            tabindex="3"
          />
        </el-form-item>
        <el-button style="height: 47px" @click.native.prevent="getVerifyCode">
          <span v-show="!verifyTimer.canGet">{{ verifyTimer.waitTime+"s后重新获取" }}</span>
          <span v-show="verifyTimer.canGet">获取验证码</span>
        </el-button>
      </div>
      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegistry">注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { captcha } from '@/api/common'
import { registry } from '@/api/user'

export default {
  name: 'Registry',
  data() {
    return {
      registryForm: {
        receiver: '',
        password: '',
        verifyCode: '',
        type: 'registry'
      },
      registryRules: {
        receiver: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
        verifyCode: [{ required: true, trigger: 'blur' }]
      },
      verifyTimer: {
        canGet: true,
        timer: null,
        waitTime: 60
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  methods: {
    timeCountdown(obj) { // obj包括timer、waitTime 、canGet
      const TIME_COUNT = 60 // 默认倒计时秒数

      if (!obj.timer) {
        obj.waitTime = TIME_COUNT
        obj.canGet = false
        obj.timer = setInterval(() => {
          if (obj.waitTime > 0 && obj.waitTime <= TIME_COUNT) {
            obj.waitTime--
          } else {
            obj.canGet = true
            clearInterval(obj.timer) // 清空定时器
            obj.timer = null
          }
        }, 1000)
      }
      return {
        timer: obj.timer,
        canGet: obj.canGet,
        waitTime: obj.waitTime
      }
    },
    async getVerifyCode() {
      if (this.registryForm.receiver === '') {
        this.$message('请检查电话或邮箱是否正确填写')
        return false
      }
      const res = await captcha({ type: 'registry', receiver: this.registryForm.receiver})
      this.timeCountdown(this.verifyTimer)
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegistry() {
      this.$refs['registryForm'].validate((valid) => {
        if (valid) {
          registry(this.registryForm).then(() => {
            this.$notify({
              title: 'Success',
              message: '注册成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ path: this.redirect || '/' })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
