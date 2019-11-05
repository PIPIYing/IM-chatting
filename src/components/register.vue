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
          <el-upload
          class="avatar-uploader"
          action="http://47.97.214.92:8080/CloudServer/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :multiple="true"
          name="file"
          ref="file"> <!--name="123"-->
          <img v-if="showPhoto" :src="showPhoto" class="avatar" alt="用户头像">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
          <div class="el-upload__text">点击上传头像文件</div>
          </div>
        <div id="registerBox5">
          <label for="address">请输入地区</label>   <!--bug-->
          <br/>
          <input type="text" id="address" @change="addressChange" v-model.lazy="address">
          <label for="email">请输入邮箱</label>
          <br/>
          <input type="email" id="email" @change="emailChange" v-model.lazy="email">
          <br/>

          <label for="des">请输入您的个性签名</label>
          <br/>
          <!--<input type="text" id="Signature" required>-->
          <textarea id="des" v-model.lazy="des" @keyup.enter="postInfo">
          </textarea>
          <br/>
          <span style="color: red"> *为必填字段</span>
          <el-button type="primary" plain id="registerBtn"  @click="postInfo">立即注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
          name: "register",
          data() {
              return {
                  nickname: '',
                  username: '',
                  sex: '',
                  password: '',
                  rePassword: '',
                  phone: '',
                  photoFile: '',
                  age: '',
                  showPhoto: '',
                  photo: '',
                  email: '',
                  des: '',
                  address: ''
              }
          },
          methods: {
              isValid(str) {
                  return /^\w+$/.test(str)
              },
              nicknameChange(){
                  var nickname = this.nickname
                  if(nickname.length < 6 || nickname.length > 18) {
                      this.$message({
                          message: '昵称长度必须在6-18位',
                          type: 'warning'
                      })
                  }
              },
              usernameChange() {
                  var username = this.username
                  /*                console.log('调用change')*/
                  if (username === '')
                      this.$message({
                          message: '用户名不得为空',
                          type: 'error'
                      })
                  else if (username.length < 6 || username.length > 18) {
                      this.$message({
                          message: '用户名长度必须在6-18位',
                          type: 'warning'
                      })
                  } else if (!this.isValid(username)) {  //排除特殊字符和空格
                      this.$message({
                          message: '用户名必须由数字、字母和下划线组成',
                          type: 'warning'
                      })
                  } else if (!isNaN(username)) {  //判断username是不是一个值
                      this.$message({
                          message: '用户名不能为纯数字',
                          type: 'warning'
                      })
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
                  if (password === '')
                      this.$message({
                          message: '密码不得为空',
                          type: 'error'
                      })
                  else if (password.length < 6 || password.length > 16)
                      this.$message({
                      message: '密码长度必须在6-16位',
                      type: 'warning'
                  })
                  else if (!this.isValid(password)) {  //排除特殊字符和空格
                      this.$message({
                          message: '密码必须由数字、字母和下划线组成',
                          type: 'warning'
                      })
                  }
                  else if (!isNaN(password)) {  //判断Pwd是不是一个值
                          this.$message({
                              message: '密码不能为纯数字',
                              type: 'warning'
                          })
                      }
              },
              rePwdChange() {
                  /*var rePwd = this.rePwd*/
                 /* var rePwdValue = document.getElementById("rePwd");
                  if (document.getElementById("pwd").value !== rePwdValue.value)
                      alert("两次输入的密码不一致，请重新输入"); */ //document.getElementById("").value
                  var rePassword = this.rePassword
                  if (rePassword !== this.password)
                      this.$message({
                          message: '两次输入的密码不一致，请重新输入',
                          type: 'error'
                      })
              },
              telChange(){
                  var phone = this.phone
                  if(!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(phone))
                      this.$message({
                          message: '输入的手机号不是完整的11位手机号或者正确的手机号',
                          type: 'error'
                      })
              },
              ageChange(){
                  var age = this.age
                  if(!/^\+?[1-9][0-9]*$/.test(age))
                      this.$message({
                          message: '输入的年龄有误',
                          type: 'warning'
                      })
              },
              beforeAvatarUpload(file){
                  //对上传的图片文件进行判断
                  const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isJPG) {
                      this.$message.error('上传头像图片只能是 JPG 或 PNG 或 GIF 格式!');
                  }
                  if (!isLt2M) {
                      this.$message.error('上传头像图片大小不能超过 2MB!');
                  }
                  /*//上传前把参数丢给后台
                  this.photo = file.name*/
                  //创建表单对象
                  var form = new FormData();
                  //后端接受参数
                  form.append("photoFile",file)
                  form.append("photo",file.name)

              },  //上传前的判断
              handleAvatarSuccess(res,file) {
                this.showPhoto = URL.createObjectURL(file.raw);
                  //创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
                  // 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
              },  //创建前端展示照片的url
              addressChange(){
                  if(!/^[\u4e00-\u9fa5]$/.test(this.address))
                      this.$message({
                          message: '请输入中文字符！',
                          type: 'warning'
                      })
              }, //bug!!!!!
              emailChange(){
                  var email = this.email
                  if(!/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/.test(email)){
                      this.$message({
                          message: '邮箱格式有误，请重新输入',
                          type: 'error'
                      })
                  }
              },
              postInfo() {
                  var userInfo = {
                      nickname: this.nickname,
                      username: this.username,
                      sex: this.sex,
                      password: this.password,
                      phone: this.phone,
                      age: this.age,
                      photo: this.photo,
                      photoFile: this.form,
                      email: this.email,
                      des: this.des,
                      address: this.address
                  } //上传图片只能是用form表单的形式代替data进行上传
                  if (this.username === '' || this.password === '' || this.rePassword === '') {
                      this.$message.error('请先填写好必填信息再注册')
                  } else {
                      this.axios.post('/user/submit', userInfo)
                          .then(response => {
                              console.log(response)
                              if(response.data.status === 200){
                                  this.$message.success('注册成功!')
                              }
                          })
                          .catch(error => {
                                  console.log(error)
                                  this.$message.error('注册失败!')
                              })
                  }
              }
          }
      }
</script>

<style scoped>
  @import "../style/register.css";
</style>
