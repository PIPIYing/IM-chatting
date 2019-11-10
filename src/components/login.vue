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
          <input type="button" value="立即登录" id="login" @click="login">

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
  import Cookie from 'js-cookie'

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
                var username = this.username
                if(this.username === '' || this.password === '')
                { this.$message({
                        message: '请输入用户名和密码后再登录',
                        type: 'error'
                    })
                }else{
                this.$axios.post('/user/login',
                    qs.stringify({
                        username: this.username,
                        password: this.password
                    })
                )
                    .then(response => {
                        console.log(response.data)
                        if(response.data.status === 200) {
                            /*if (Cookie.get('token') === undefined || Cookie.get('token') === null) {
                                Cookie.set('token',"")
                            }*/
                            /*var token = response.data.username + '/' + response.data.sign + '/' + response.data.expire*/  //token构建
                            var token = response.data.token
                            Cookie.set('token',token)
                            localStorage.setItem("token",token)   //将用户信息存到localStorage里
                            localStorage.setItem("username",username)  //将username存入localStorage
                            this.$message.success('登录成功')
                            this.$router.push('/content')
                        }else if(response.data.status === 404) {
                            this.$message.warning('用户名未注册或用户名与密码不匹配，请重新输入')
                        }else{
                            this.$message.error('登录失败！请重试')
                        }
                    })
                    .catch(error =>{
                        console.log(error)
                        this.$message.error('登录失败!')
                        this.$router.push('/')
                    })
                }
            }
        }
    }
</script>

<style scoped>
  @import "../style/login.css";
</style>
