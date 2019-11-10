<template>
  <div id="repair">
    <div id="repairLogo">
      Repair
    </div>
    <div class="repairBox">
        <label for="userName"> </label>
        <input type="text" placeholder="请输入用户名" id="userName" v-model="username" required>
        <br/>
        <label for="oldPwd"></label>
        <input type="password" placeholder="请输入旧密码" id="oldPwd" v-model="oldPassword" required>
        <br/>
        <label for="newPwd"></label>
        <input type="password" placeholder="请输入新密码" id="newPwd" v-model.lazy="newPassword" required @keyup.enter="repair" @change="pwdChange">
        <br/>
        <label for="repairBtn"></label>
        <input type="button" value="立即修改" id="repairBtn" @click="repair">
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import axios from 'axios'

    export default {
        name: "repair",
        data() {
            return {
                username: '',
                oldPassword: '',
                newPassword: ''
            }
        },
        methods: {
            isValid(str) {
                return /^\w+$/.test(str)
            },
            pwdChange() {
                /*   var pwdValue = document.getElementById("pwd").value;  //取pwd的值*/
                var password = this.newPassword
                if (password === '')
                    this.$message({
                        message: '新密码不得为空',
                        type: 'error'
                    })
                else if (password.length < 6 || password.length > 16)
                    this.$message({
                        message: '新密码长度必须在6-16位',
                        type: 'warning'
                    })
                else if (!this.isValid(password)) {  //排除特殊字符和空格
                    this.$message({
                        message: '新密码必须由数字、字母和下划线组成',
                        type: 'warning'
                    })
                }
                else if (!isNaN(password)) {  //判断Pwd是不是一个值
                    this.$message({
                        message: '新密码不能为纯数字',
                        type: 'warning'
                    })
                }
            },
            repair() {
                if (this.username === '' || this.oldPassword === '' || this.newPassword === '') {
                    this.$message({
                        message: '请输入所有信息后再确认修改',
                        type: 'error'
                    })
                }
                else if(this.oldPassword === this.newPassword){
                    this.$message({
                        message: '旧密码与新密码一致，请重新输入',
                        type: 'warning'
                    })
                }
                else {
                   axios.post('/user/repair',
                       qs.stringify({
                        username: this.username,
                        oldPassword: this.oldPassword,
                        newPassword: this.newPassword
                    })
                     ).then(response => {
                        console.log(response)
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        }
    }
</script>

<style>
  #repair{ /*垂直居中*/
    background-color:rgba(0,0,0,0.1);
    width: 380px;
    height: 320px;
    margin: -160px 0 0 -190px;
    position: absolute;
    top: 50%;
    left: 50%;
  }
  #repairLogo{
    font: 600 70px "Comic Sans MS";
    letter-spacing: 8px;
    color: white;
    text-shadow: 0 0 10px #fdec84, /*空心字*/
    10px -10px 30px #ffae35; /*金色阴影*/
    position: relative;
    top: -12px;
  }
  .repairBox{
    position: relative;
    top: 2%;
    /* background-color: #555555;*/
  }
  #userName,
  #oldPwd,
  #newPwd,
  #repairBtn{ /*输入框的样式调整*/
    height: 30px;
    width: 240px;
    border-radius: 25px;
    border: rgba(255,255,255,0.3) 1px solid;
    margin-bottom: 18px;
    background-color: rgba(255,255,255,0);
    color: white;
  }
  #userName::-webkit-input-placeholder,
  #oldPwd::-webkit-input-placeholder,
  #newPwd::-webkit-input-placeholder{ /* WebKit browsers */
    color: rgba(255,255,255,0.5);
  }
  #userName:-moz-placeholder,
  #oldPwd:-moz-placeholder,
  #newPwd:-moz-placeholder{ /* Mozilla Firefox 4 to 18 */
    color: rgba(255,255,255,0.5);
  }
  #userName::-moz-placeholder,
  #oldPwd::-moz-placeholder,
  #newPwd::-moz-placeholder{ /* Mozilla Firefox 19+ */
    color: rgba(255,255,255,0.5);
  }
  #userName:-ms-input-placeholder,
  #oldPwd:-ms-input-placeholder,
  #newPwd:-ms-input-placeholder{ /* Internet Explorer 10+ */
    color: rgba(255,255,255,0.5);
  }
  #userName,
  #oldPwd,
  #newPwd{ /*文本缩进*/
    text-indent: 30px;
  }
  #repairBtn{ /*登录框*/
    background-color: rgba(255,255,255,0.15);
    height: 40px;
    color: white;
    font-size: 15px;
  }

</style>
