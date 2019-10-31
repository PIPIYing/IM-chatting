<template>
<div id="container">
  <el-container>
    <el-aside width="10%" id="sidebar">
      <div id="block" @click="dialogVisibleChange = true">
        <el-avatar :size="50" :src="photo" fit="scale-down"></el-avatar>
      </div>
      <el-dialog
        title="个人资料"
        :visible.sync="dialogVisibleChange"
        width="49%"
        :modal-append-to-body='false'
        :lock-scroll="false"
        :before-close="handleClose"
        top="8vh">
        <div id="userBoxLeft">
          <span>昵称：</span>
          <el-input v-model="nickname">{{ nickname  }}</el-input>
          <span>用户名：</span>
          <el-input v-model="username">{{ username  }}</el-input>
          <div id="sexChoose">
            <span>性别：</span>
            <el-radio v-model="sex" :label="true">男</el-radio>
            <el-radio v-model="sex" :label="false">女</el-radio>
          </div>
          <br/>
          <span>手机号码：</span>
          <el-input v-model="phone">{{  phone  }}</el-input>
          <span>年龄：</span>
          <el-input v-model="age">{{  age  }}</el-input>
          <span>地区：</span>
          <el-input v-model="address">{{ address  }}</el-input>
        </div>
        <div id="userBoxRight">
          <el-upload
          action="http://47.97.214.92:8080/CloudServer/photo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
            <el-avatar v-if="photo" :size="100" :src="photo" fit="fill" ></el-avatar>
            <img v-else src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="修改个人资料">  <!--待验证-->

          </el-upload>
<!--          <el-button type="primary" plain>修改头像<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
          <p>邮箱：</p>
          <el-input v-model="email">{{  email  }}</el-input>
          <p>个性签名：</p>
          <el-input
          type="textarea"
          v-model="des"
          :rows="5">  {{  des  }}
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleChange = false" class="footerBtn">取 消</el-button>
          <el-button type="primary" class="footerBtn" @click="changeUserInfo">确 定</el-button>
        </span>
      </el-dialog>

      <el-menu
        background-color="#999"
        active-text-color="yellow"
        default-active="1">
        <el-menu-item index="1">
          <i class="el-icon-chat-dot-round"></i>
        </el-menu-item>
        <el-menu-item index="2" @click="listAll=true">  <!--通过v-show来实现组件的切换-->
            <i class="el-icon-user"></i>
        </el-menu-item>

        <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-connection"></i>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
        </el-menu-item>
        <el-menu-item index="6" @click="exit">
          <i class="el-icon-switch-button"></i>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-aside width="30%" id="list">
      <div id="otherIcon">
        <i class="el-icon-bell"></i>


        <i class="el-icon-circle-plus-outline"  @click="dialogVisibleAdd = true"></i>  <!--刷新与添加好友是反的！！-->
        <el-dialog
          class="addFriendBox"
          title="添加好友"
          :visible.sync="dialogVisibleAdd"
          width="40%"
          :modal-append-to-body='false'
          :lock-scroll="false"
          top="33vh">
          <div>
            <el-input v-model="friendName" placeholder="请输入好友用户名" clearable @keyup.enter="addFriend"></el-input>
          </div>


          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addFriend">搜 索</el-button>
          </span>
        </el-dialog>

      </div>
<!--      <component :is="comName"
                 class="listFriends"
                 :key="list"
                 v-for="item in list"></component>-->
      <listAll v-show="listAll"></listAll>

      <!--<el-col>
        <el-row>
          <div class="listFriends" v-for="item in list" :key="item.id">
          {{  item.id  }} -&#45;&#45; {{  item.name  }}
          </div>
        </el-row>
      </el-col>-->
    </el-aside>
    <el-main width="60%">Main</el-main>
  </el-container>

  <div id="quote">
    Chatting with friends
  </div>
</div>
</template>


<script>
  import axios from 'axios'
  import qs from 'qs'
  import listAll from "./listAll";

    export default {
        name: "container",
        components: {
          listAll
        },
        data() {
            return {
                username: "",
                nickname: "",
                photo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                sex: true,
                age: '',
                phone: "",
                email: "",
                des: "",
                status: "",
                address: '',
                friendName: '',
                dialogVisibleChange: false,
                dialogVisibleAdd: false,
                listAll: false
                /*chatUsername: '',
                chatPhoto: ''*/
/*                comName: '',
                msg:'这是父组件中的内容'*/
            }
        },
        created() {
            this.selectUserInfo()
           /* this.agreeFriend()*/
        },
        beforeUpdate() {
           /* this.changeUserInfo()*/
            this.addClear()
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.photo = URL.createObjectURL(file.raw);
            },  //创建头像文件
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }, // 上传头像前的检查图片大小和图片格式
            selectUserInfo(){
                /*var user = JSON.parse(localStorage.getItem("users"))  //读取保存在localStorage里的users对象
                var username = user.username  //取出username的值*/
                var username = localStorage.getItem("username")  //取出username的值
                axios.get('/user/selectUserInfo', {
                    params:{
                        username
                    }
                })
                    .then(response => {
                        console.log(response)
                        this.username = response.data.userInfo.username
                        this.nickname = response.data.userInfo.nickname
                        this.photo = response.data.userInfo.photo
                        this.sex = response.data.userInfo.sex
                        this.age = response.data.userInfo.age
                        this.phone = response.data.userInfo.phone
                        this.email = response.data.userInfo.email
                        this.des = response.data.userInfo.des
                        this.status = response.data.userInfo.status
                        this.logintime = response.data.userInfo.logintime

                    })
                    .catch( error=> {
                        console.log(error)
                    })
            },  //获取用户自身信息
            handleClose(done) {
                this.$confirm('确认关闭？')  //有个小bug
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },  //关闭前的弹出警告框
            changeUserInfo(){
                var User ={
                    username: this.username,
                    nickname: this.nickname,
                    photo: this.photo,
                    sex: this.sex,
                    age: this.age,
                    phone: this.phone,
                    email: this.email,
                    des: this.des,
                    address: this.address
                }
                axios.post('/user/changeUserInfo',User)
                    .then(response => {
                        console.log(response)
                        this.$message({
                            message: '修改成功!',
                            type: 'success'
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message({
                            message: 'ERROR!',
                            type: 'error'
                        })
                    })
                this.dialogVisibleChange = false
            },  //修改用户信息
            addFriend(){
                var username = this.username
                var friendname = this.friendName
              axios.post('/friend/addFriend',
                  qs.stringify({
                          username,
                          friendname
                      }))
                  .then(response =>{
                      console.log(response)
                      if(response.data.status === 200)
                          this.$message.success('请求发送成功！等候对方回应')
                      else if(response.data.status === 404)
                          this.$message.error('该用户不存在！')
                      else if(response.data.status === 401)
                          this.$message.warning('申请已发送或该用户已是您的好友')
                  })
                  .catch(error => {
                      console.log(error)
                      this.$message({
                          message: 'ERROR!',
                          type: 'error'
                      })
                  })
            },  //添加好友
            addClear(){
              if(this.dialogVisibleAdd === false)
                  var friendname = this.friendName = ''
            },  //添加好友搜索框的清空
            /*agreeFriend(){
                var username = this.username
                var friendname
                axios.post('/friend/agreeFriend',
                  qs.stringify({

                  })
                ).then( response =>{
                      console.log(response)
                }).catch(error => {
                      console.log(error)
                })
            },  */ //接受好友   POST的参数应该是如何获取的   拒绝好友同理
            /*rejectFriend(){
                var username = this.username
                var friendname
                axios.post('/friend/agreeFriend',
                    qs.stringify({

                    })
                ).then( response =>{
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            },*/  //拒绝好友
            //查询指定好友信息
            //获取好友列表（组件实现）
            //删除好友
            /*        getFriendlistAgree(){
                        this.comName= 'listAgree'
                        /!* var type = 'null'
                         var username = this.username
                         axios.post('/getFriendlist',
                             qs.stringify({
                                 username,
                                 type
                             })
                         ).then(response =>{
                             console.log(response)
                             /!*定义一个变量或者对象数组把姓名和头像留下来*!/
                         }).catch(error =>{
                             console.log(error)
                         })*!/
                    },*/
            exit(){
                this.$confirm('是否退出IM Chatting？', 'EXIT', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( _ => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    })
                    location.href = "http://localhost:8080"
                }).catch( _ => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    })
                })
            }
        }
    }
</script>

<style scoped>
  @import "../style/container.css";
</style>
