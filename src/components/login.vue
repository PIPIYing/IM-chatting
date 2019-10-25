<template>
  <div id="index">
    <div class="login-box1">
      <div id="logo">
        Chat
      </div>

      <div class="login-box2">

        <form id="loginForm">
          <label for="logName"> </label>
          <input type="text" placeholder="请输入用户名" id="logName" required>

          <br/>

          <label for="logPwd"></label>
          <input type="password" placeholder="请输入密码" id="logPwd" required>

          <br/>

          <label for="login"></label>
          <!--<router-link to="/content">-->
          <input type="button" value="立即登录" id="login" formtarget="_blank" @click="toContent">
            <!--<div id="login">
              立即登录
            </div>-->
          <!--</router-link>-->

        </form>

        <p>
         <!-- <a href="#" target="_blank" class="remark">忘记密码？|</a>-->
          <router-link to="/repair">
            <a target="_blank" class="remark">忘记密码？|</a>
          </router-link>
          <router-link to="/register">
            <a target="_blank" class="remark">注册账号</a>
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
        methods: {
            toContent(){
                this.$router.push({path: '/content'})
            }
        }
    }
</script>

<style scoped>
  @import "../style/login.css";
</style>
