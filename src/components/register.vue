<template>
  <div id="register">
    <div class="registerBox1">
      <div id="logo">
        Register Now!
      </div>
      <div class="registerBox2">
        <div id="registerBox3">
          <label for="NickName">请输入您的昵称</label>
          <br/>
          <input type="text" id="NickName" @change="nicknameChange" v-model.lazy="nickname">
          <br/>

          <label for="UserName"><span style="color: red">*</span>请输入用户名</label>
          <br/>
          <input type="text" id="UserName" @change="usernameChange" v-model.lazy="username" required >
          <br/>

          <span>请选择您的性别</span>
          <input type="radio" name="sex" id="male" value="true" @change="sexChange" v-model.lazy="sex">
          <label for="male">男</label>
          <input type="radio" name="sex" id="female" value="false" @change="sexChange" v-model.lazy="sex">
          <label for="female">女</label>
          <br/><br/>

          <label for="Pwd"><span style="color: red">*</span>请输入密码</label>
          <br/>
          <input type="password" id="Pwd" @change="pwdChange" v-model.lazy="password" required>
          <br/>

          <label for="rePwd"><span style="color: red">*</span>请再次输入密码</label>
          <br/>
          <input type="password" id="rePwd" @change="rePwdChange" v-model.lazy="rePassword" required>
          <br/>

          <label for="Phone">请输入手机号码</label>
          <br/>
          <input type="tel" id="Phone"  @change="telChange" v-model.lazy="phone">
          <br/>

          <label for="age">请输入您的年龄</label>
          <br/>
          <input type="number" id="age" @change="ageChange" v-model.lazy="age">
          <br/>
        </div>
        <div id="registerBox4">
          <div id="photo">
          </div>

          <div id="fileBtn">
            <input type="file" id="file" name="image" accept="image/*">  <!--@change="fileImgChange"  v-model.lazy="fileImg"-->
            <button>提交</button>
          </div>
        </div>
        <div id="registerBox5">
          <label for="email">请输入邮箱</label>
          <br/>
          <input type="email" id="email" @change="emailChange" v-model.lazy="email">
          <br/>

          <label for="des">请输入您的个性签名</label>
          <br/>
          <!--<input type="text" id="Signature" required>-->
          <textarea id="des" v-model.lazy="des">
          </textarea>
          <br/>
          <span style="color: red"> *为必填字段</span>
          <input type="button" id="registerBtn" value="立即注册" formtarget="_blank" @click="postInfo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

      export default {
          name: "register",
          data() {
              return {
                  User : {},
                  nickname: '',
                  username: '',
                  sex: '',
                  password: '',
                  rePassword: '',
                  phone: '',
                  age: '',
                  /*fileImg: "../../static/images/photo.png",
                  errorStr: ''*/
                  email: '',
                  des: ''}
          },
          created() {
              /*            this.postInfo()*/
          },
          methods: {
              isValid(str) {
                  return /^\w+$/.test(str)
              },
              /*            isNum(str){
                return /^\d+$/.test(str)   //测试字符串中是否全为数字
            },*/

              nicknameChange(){
                  var nickname = this.nickname
                  if(nickname.length < 6 || nickname.length > 18){
                      alert("昵称长度必须在6-18位");
                  }
              },
              usernameChange() {
                  var username = this.username
                  /*                console.log('调用change')*/
                  if (username === '')
                      alert("用户名不得为空");
                  else if (username.length < 6 || username.length > 18) {
                      alert("用户名长度必须在6-18位");
                  } else if (!this.isValid(username)) {  //排除特殊字符和空格
                      alert("用户名必须由数字、字母和下划线组成");
                  } else if (!isNaN(username)) {  //判断username是不是一个值
                      alert("用户名不能为纯数字");
                  }
                  /*else if(username.indexOf(" ") !== -1){
                    alert("用户名中不能含有空格");}*/
/*                  return username*/
              },
              sexChange(){
                  var sex = document.getElementsByName('sex');
                  if (sex[0].checked === true) return sex[0].value;
                      else return sex[1].value
              },
              pwdChange() {
               /*   var pwdValue = document.getElementById("pwd").value;  //取pwd的值*/
                  var password = this.password
                  if (password.length < 6 || password.length > 16)
                      alert("密码长度必须在6-16位");
                  if (password === '')
                    alert("密码不得为空");
                  else if (!this.isValid(password)) {  //排除特殊字符和空格
                      alert("密码必须由数字、字母和下划线组成");}
                  else if (!isNaN(password)) {  //判断Pwd是不是一个值
                       alert("密码不能为纯数字");}
              },
              rePwdChange() {
                  /*var rePwd = this.rePwd*/
                 /* var rePwdValue = document.getElementById("rePwd");
                  if (document.getElementById("pwd").value !== rePwdValue.value)
                      alert("两次输入的密码不一致，请重新输入"); */ //document.getElementById("").value
                  var rePassword = this.rePassword
                  if (rePassword!== this.rePassword)
                      alert("两次输入的密码不一致，请重新输入");
              },
              telChange(){
                  var phone = this.phone
                  if(!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(phone))
                      alert("输入的手机号不是完整的11位手机号或者正确的手机号");
              },
              ageChange(){
                  var age = this.age
                  if(!/^\+?[1-9][0-9]*$/.test(age))
                      alert("输入的年龄有误")
              },

         /*     fileImgChange(p){
                var file = p.target.files[0]
                  console.log(file)
                  //获取图片大小，做大小限制有用
                  let imgSize = file.size
                  console.log(imgSize)
                  var _this = this  //this指向问题，所以在外面先定义
                  //比如上传头像限制1M大小，这里获取的大小单位是b
                  if(imgSize <= 10*1024){
                      //合格
                      _this.errorStr=''
                      console.log("大小合适")
                      //开始渲染选择的图片
                      //本地路径方法
                      this.fileImg = window.URL.createObjectURL(p.target.files[0])
                      console.log(window.URL.createObjectURL(p.target.files[0]))
                  }
              }*/

              emailChange(){
                  var email = this.email
                  if(!/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/.test(email)){
                      alert("邮箱格式有误，请重新输入")
                  }
              },
              postInfo(){
                 /* axios.get(
                      '/selectUserInfo',
                      {
                          params:{
                          "nickname": "this.nickname",
                          "username": "this.username",
                          "sex": "this.sexChange()",
                          "pwd": "this.pwd",
                          "rePwd": "this.rePwd",
                          "tel": "this.tel",
                          "age": "this.age",
                          /!*fileImg: "../../static/images/photo.png",
                          errorStr: ''*!/
                          "email":" this.email",
                          "des": "this.des"
                          }
                      }).then(response => {
                          console.log(response)
                      })
                      .catch(error =>{
                          console.log(error)
                      }
                  )*/
                 if(this.username === '' || this.password === '' || this.rePassword === '')
                     alert("请先填写好必填信息再注册")
                 axios.post(
                      '/submit',
                     JSON.stringify
                     ({
                         User : {
                             /*nickname: this.nickname,*/
                             username: this.username,
                            /* sex: this.sex,*/
                             password: this.password
                            /* phone: this.phone,
                             age: this.age,*/
                             /*fileImg: "../../static/images/photo.png",
                             errorStr: ''*/
                             /*email: this.email,
                             des: this.des*/}
                     })
                    /* {
                         headers: {
                             'Content-Type': 'application/json;charset=UTF-8'}}*/
                    )
                      .then(response => {
                          /*console.log(response)*/
                          if(response.data.status === 200){
                              alert(response.data)
                          }else{
                              alert(response.data.status)}
                      })
                      .catch(error =>{
                          /*console.log(error)*/
                          let res = error.response
                          if(error){
                              alert('Error, HTTP CODE：' + res.status)
                          }
                      }
                  )
              }
          }
      }
</script>

<style scoped>
  @import "../style/register.css";
</style>
