<template>
  <div id="index">
    <div class="loginBox1">
      <div id="logo">
        Chat
      </div>

      <div class="loginBox2">

        <form id="loginForm">
          <label for="logName"> </label>
          <input type="text" placeholder="请输入用户名" id="logName" v-model="username" required>

          <br/>

          <label for="logPwd"></label>
          <input type="password" placeholder="请输入密码" id="logPwd" v-model="password" required @keyup.enter="login">

          <br/>

          <label for="login"></label>
          <!--<router-link to="/content">-->
          <input type="button" value="立即登录" id="login" @click="login">
            <!--<div id="login">
              立即登录
            </div>-->
          <!--</router-link>-->

        </form>

        <p>
         <!-- <a href="#" target="_blank" class="remark">忘记密码？|</a>-->
          <router-link to="/repair">
            <a target="_blank" class="remark">修改密码 |</a>
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
  import qs from 'qs'
  import vuex from 'vuex'
  import Login from '../api/httpLogin'

    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login(){
                if(this.username === '' || this.password === '')
                { this.$message({
                        message: '请输入用户名和密码后再登录',
                        type: 'error'
                    })
                }else{
                Login.post('/user/login',
                    qs.stringify({
                        username: this.username,
                        password: this.password
                    })
                )
                    .then(response => {
                        console.log(response)
                        if(response.data.status === 200){
                             /*  var user = {id: Date.now(),username: this.username,password: this.password}
                            user = JSON.stringify(user)  //将JSON转为字符串存到变量里*/  //存入对象user中的username和password
                            /*console.log(user)*/

                            //分别存储username 和 password
                            localStorage.setItem("username",this.username)  //将用户信息存到localStorage里，把数据username传入变量username中
                          /*  localStorage.setItem("password",this.password)//将用户信息存到localStorage里，把数据password传入变量password中*/
                        }
                    })
                    .catch(error =>{
                        console.log(error)
                        this.$message({
                            message: 'ERROR!',
                            type: 'error'
                          })
                    })
                }
            }
        }
    }
</script>

<style scoped>
  @import "../style/login.css";
</style>
