<template>
<div id="container">
  <el-container>
    <el-aside width="10%" id="sidebar">
      <div id="block" @click="dialogVisibleChange = true">
        <el-tooltip
          class="item"
          effect="dark"
          placement="left"
          content="个人资料">
          <el-avatar :size="50" :src="photo" fit="scale-down"></el-avatar>
        </el-tooltip>
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
          action="http://47.97.214.92:8080/CloudServer/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="file"
          ref="file">
            <el-avatar :size="100" :src="showPhoto" fit="fill" ></el-avatar>  <!--待验证-->
         <!--   <el-avatar v-else :size="100" :src="showPhoto" fit="fill" ></el-avatar>-->
           <!-- <img v-if="showPhoto" :src="showPhoto" class="avatar" alt="用户头像">-->

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
        active-text-color="yellow">

        <el-menu-item index="1">
          <el-tooltip
            class="item"
            effect="dark"
            placement="left"
            content="会话聊天">
          <i class="el-icon-chat-dot-round" @click="getChatting"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="2" @click="getFriendlistAll">
          <el-tooltip
            class="item"
            effect="dark"
            placement="left"
            content="好友列表">
            <i class="el-icon-user"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="3" @click="getFriendlistAgree">
          <el-tooltip
            class="item"
            effect="dark"
            placement="left"
            content="分组列表">
            <i class="el-icon-user-solid"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="4" @click="getGroups">
          <el-tooltip
            class="item"
            effect="dark"
            placement="left"
            content="群聊列表">
          <i class="el-icon-connection"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="5" @click="getSetting">
          <el-tooltip
            class="item"
            effect="dark"
            placement="left"
            content="设置操作">
          <i class="el-icon-setting"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="6" @click="dialogVisibleExit = true">
          <el-tooltip
            class="item"
            effect="dark"
            placement="left"
            content="退出系统">
          <i class="el-icon-switch-button"></i>
          </el-tooltip>
        </el-menu-item>
        <el-dialog
          class="exitBox"
          title="EXIT"
          :visible.sync="dialogVisibleExit"
          width="35%"
          :modal-append-to-body='false'
          :lock-scroll="false"
          top="28vh">
            <span>
              确定要退出IM Chatting吗？
            </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelExit">取 消</el-button>
            <el-button type="primary" @click="exit">确 定</el-button>
          </span>
        </el-dialog>
      </el-menu>
    </el-aside>
    <el-aside width="30%" id="list">
      <div id="otherIcon">

        <i class="el-icon-refresh-right" @click="refresh"><!--<el-badge is-dot class="item" v-show="seeDot"></el-badge>--></i>
        <!--<el-dialog
          class="noticeBox"
          title="好友请求"
          :visible.sync="dialogVisibleNotice"
          width="40%"
          :modal-append-to-body='false'
          :lock-scroll="false"
          top="33vh">
          <div>
           {{  }} 请求添加你为好友。
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="rejectFriend">拒 绝</el-button>
            <el-button type="primary" @click="agreeFriend">接 受</el-button>
          </span>
        </el-dialog>-->

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
      <component :is="comNameList" @show="selectUserInfo" :user="username"></component>
    </el-aside>
    <el-main width="60%">
      <component :is="comNameMain" :user="username" :com="comNameMain"></component>

    </el-main>
  </el-container>

  <div id="quote">
    Chatting with friends
  </div>
</div>
</template>


<script>
  import axios from 'axios'
  import qs from 'qs'
  import Cookie from 'js-cookie'
  import listAgree from "./listAgree"
  import listAll from "./listAll";
  import chatting from './chatting'
  import chattingRoom from "./chattingRoom"

    export default {
        name: "container",
        inject: ['reload'],
        components: {
            listAgree,
            listAll,
            chatting,
            chattingRoom,
            tips: {
                template: '<div id="tips">点击左侧图标查看相关信息</div>',
            },
            chattingIcon: {
                template: '<div id="icon"><i class="el-icon-chat-dot-round"></i></div>'
            }
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
                /*dialogVisibleNotice: false,*/
                dialogVisibleExit: false,
                /*seeDot: false,  //通知的小红点*/
                comNameList: 'tips',
                comNameMain: 'chattingIcon',
                com: '',
                showPhoto: ''
                /*comNameMain: 'chattingRoom'*/
                /*chatUsername: '',
                chatPhoto: ''*/
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
        methods: {
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

                //上传前把参数丢给后台
               /* this.showPhoto = file.name*/
                this.photoFile = file
                this.photo = file.name
                /*   var formData = JSON.parse(this.formData)*/
                /*  console.log(formData.nickname)*/
            },  //上传前的判断
            handleAvatarSuccess(res,file) {
                this.showPhoto = URL.createObjectURL(file.raw);
                //创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
                // 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
            },  //创建前端展示照片的url
            selectUserInfo() {
                /*var user = JSON.parse(localStorage.getItem("users"))  //读取保存在localStorage里的users对象
                var username = user.username  //取出username的值*/
                var username = localStorage.getItem("username")  //取出username的值
                axios.get('/user/selectUserInfo', {
                    params: {
                           username
                    }
                    }).then(response => {
                        console.log(response)
                        this.username = response.data.userInfo.username
                        this.nickname = response.data.userInfo.nickname
                        this.photo = response.data.userInfo.photo
                        this.showPhoto = response.data.userInfo.photo
                        this.sex = response.data.userInfo.sex
                        this.age = response.data.userInfo.age
                        this.phone = response.data.userInfo.phone
                        this.email = response.data.userInfo.email
                        this.des = response.data.userInfo.des
                        this.status = response.data.userInfo.status
                        this.logintime = response.data.userInfo.logintime
                        this.address = response.data.userInfo.address
                    }).catch(error => {
                        console.log(error)
                    })
            },  //获取用户自身信息
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },  //关闭前的弹出警告框
            changeUserInfo() {
                //创建表单对象
                var formData = new FormData();
                //后端接受参数
                formData.append("photoFile",this.photoFile)
                formData.append("photo",this.photo)
                formData.append("nickname",this.nickname)
                formData.append("username",this.username)
                formData.append("sex",this.sex)
                formData.append("phone",this.phone)
                formData.append("age",this.age)
                formData.append("email",this.email)
                formData.append("des",this.des)
                formData.append("address",this.address)
                    axios.post('/user/changeUserInfo', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                         })
                        .then(response => {
                            console.log(response)
                            this.$message.success('修改成功!')
                            //让后台返回photo路径才可正常显示修改后的头像
                            this.reload() //刷新页面
                        })
                        .catch(error => {
                            console.log(error)
                            this.$message.error('修改失败!')
                        })
                this.dialogVisibleChange = false
            },  //修改用户信息
            addFriend() {
                var username = this.username
                var friendname = this.friendName
                axios.post('/friend/addFriend',
                    qs.stringify({
                        username,
                        friendname
                    })).then(response => {
                    console.log(response)
                    if (response.data.status === 200)
                        this.$message.success('请求发送成功！等候对方回应')
                    else if (response.data.status === 404)
                        this.$message.error('该用户不存在！')
                    else if (response.data.status === 401)
                        this.$message.warning('申请已发送或该用户已是您的好友')
                }).catch(error => {
                    console.log(error)
                    this.$message.error('ERROR!')
                })
            },  //添加好友
            addClear() {
                if (this.dialogVisibleAdd === false)
                    var friendname = this.friendName = ''
            },  //添加好友搜索框的清空  可优化
            getFriendlistAgree() {
                this.comNameList = 'listAgree'
                this.comNameMain='chattingIcon'
            },  //已同意好友的列表
            getFriendlistAll() {
                this.comNameList = 'listAll'
                this.comNameMain='chattingIcon'
            },  //所有好友的列表
            getChatting(){
                this.comNameList='chatting'
                this.comNameMain='chattingRoom'
            },  //切换到会话组件
            getGroups(){
                /*this.comNameList='groupChatting'*/
                this.comNameMain='chattingIcon'
            },  //切换到群组组件  【未完成】
            getSetting(){
                /*this.comNameList='setting'*/
                this.comNameMain='chattingIcon'
            },  //切换到设置组件  【未完成】
            refresh(){
              this.reload()
            },  //刷新
            exit() {
                this.dialogVisibleExit = false
                var username = this.username
                axios.get('/user/exit', {
                        params: {
                            username
                        }
                    }).then(response => {
                        Cookie.remove('token')
                        this.$message.success('退出成功!')
                        this.$router.push('/login')
                        console.log(response)
                    }).catch(error => {
                        console.log(error)
                    })
            },  //退出chatting
            cancelExit() {
                this.dialogVisibleExit = false
                this.$message.info('已取消退出')
            }  //取消退出
        }
    }
</script>

<style scoped>
  @import "../style/container.css";
</style>
