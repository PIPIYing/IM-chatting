<template>
  <div id="listAll">  <!--v-for指令实行好友列表的循环-->  <!--好友列表-->
      <el-row  v-for="(item,index) in agreUserinfoList" :key="index">
        <div  class="listFriends">
          <el-tooltip
            class="item"
            effect="dark"
            placement="left-start">
            <div slot="content" v-text="listFriendsStatus(item.status,item.logintime)"></div>
            <div  class="listAvatar"  @click="selectFriendInfo(index)">
              <el-avatar :size="30" :src="item.photo" fit="scale-down"></el-avatar>
            </div>
          </el-tooltip>
          <span class="listName">{{  item.username  }}</span>

          <el-dialog
            title="个人资料"
            :visible.sync="dialogVisibleCheck"
            :modal-append-to-body='false'
            :lock-scroll="false"
            top="13vh">
            <div id="userBoxLeft">
              <div v-model="nickname" class="userBox">昵称：{{ nickname  }}</div>
              <div v-model="username" class="userBox">用户名：{{ username  }}</div>
              <div v-model="sex" class="userBox">性别：{{ sex  }}</div>
              <div v-model="phone" class="userBox">手机号码：{{  phone  }}</div>
              <div v-model="age" class="userBox">年龄：{{  age  }}</div>
              <div v-model="address" class="userBox">地区：{{ address  }}</div>
            </div>
            <div id="userBoxRight">
              <el-avatar :size="100" :src="photo" fit="scale-down"></el-avatar>
              <div v-model="email" class="userBox">邮箱：{{  email  }}</div>
              <div v-model="des" class="userBox">个性签名：{{  des  }}</div>
            </div>

            <div slot="footer" class="dialogCheck-footer">
              <el-button @click="dialogVisibleDel = true">删 除 好 友</el-button>
              <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
            </div>
          </el-dialog>  <!--查看好友个人资料并删除好友-->
          <el-dialog
            class="delBox"
            title="删除好友"
            :visible.sync="dialogVisibleDel"
            width="35%"
            :modal-append-to-body='false'
            :lock-scroll="false"
            top="28vh">
            <span>
              确定要删除{{  item.username  }}吗？
            </span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="cancelDeleteFriend">取 消</el-button>
            <el-button type="primary" @click="deleteFriend">确 定</el-button>
          </span>
          </el-dialog>  <!--确认是否删除好友对话框-->

        </div>
      </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'


    export default {
        name: "listAll",
        props: ['user'],
        data(){
            return {
                agreUserinfoList: [],
                dialogVisibleCheck: false,
                friendname: '',
                nickname: "",
                username: "",
                photo: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                sex: true,
                age: '',
                phone: "",
                email: "",
                des: "",
                status: "",
                address: '',
                dialogVisibleDel: false
            }
        },
        created(){
            this.$emit('show')
            this.getFriendlistAll()
        },
        methods: {
            getFriendlistAll(){
                /*this.msg = this.agreUserinfoList*/
                var type = '1'
                var username = this.user
                axios.post('/friend/getFrilist',
                    qs.stringify({
                        username,
                        type
                    })
                ).then(response => {
                    /*console.log(response)*/
                     this.agreUserinfoList = response.data.agreUserinfoList
                     console.log(this.agreUserinfoList)   /*定义一个变量或者对象数组把姓名和头像留下来*/
                    /* for(var i=0;i<this.agreUserinfoList.length;i++){
                         if(this.agreUserinfoList[i].status === 0)

                     }*/
                }).catch(error => {
                    console.log(error)
                })
            }, //获取好友列表
            selectFriendInfo(index) {
                this.dialogVisibleCheck = true
                var username = this.user
                /*console.log(index)*/
                var friendname = this.agreUserinfoList[index].username  //通过index找到每个人的username
                /* console.log(friendname)*/
                  axios.get('/friend/selectFriendInfo', {
                    params: {
                        username,
                        friendname
                    }
                }).then(response => {
                    console.log(response.data.userInfo)
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
                    this.address =  response.data.userInfo.address
                }).catch(error => {
                    console.log(error)
                })
            },  //获取指定好友的信息（包括在线离线隐身）
            listFriendsStatus(status,logintime){
/*                var status = this.status*/
               /* console.log(logintime)*/
                switch(status){
                    case 0:return '离线'+ '    '+ logintime;  //离线
                    case 1:return '在线'+ '    '+ logintime;  //在线
                    case 2:return '隐身'+ '    '+ logintime;  //隐身
                }
            },  //好友状态和登陆时间
            deleteFriend() {
              var username = this.user  //从父组件传过来的username
               /*  var friendname = this.friendName*/
              var friendname = this.username  //好友列表里的username
             axios.get('/friend/deleteFriend', {
                 params: {
                  username,
                  friendname
                }
              })
              .then(response => {
                  console.log(response)
                  this.dialogVisibleCheck = false
                  this.dialogVisibleDel = false
                  if (response.data.status === 200)
                      this.$message.success('已删除该好友！')
                  else if (response.data.status === 404)
                      this.$message.error('该用户不存在！')
                  else if (response.data.status === 401)
                      this.$message.warning('申请已发送或该用户不是您的好友')
          })
          .catch(error => {
              console.log(error)
              this.$message.error('ERROR!')
          })
  },  //删除好友
            cancelDeleteFriend(){
                this.dialogVisibleCheck = false
                this.dialogVisibleDel = false
                this.$message.info('已取消删除该好友')
            }  //取消删除
        }
    }
</script>

<style scoped>
  .listFriends {
    height: 42px;
    background: rgba(255,255,255,0.4);
    /*border-bottom: #8c939d 2px solid;*/
  }
  .listAvatar{
    float: left;
    padding: 5px 0 5px 15px;
    cursor: pointer;
  }
  .listName{
    float: left;
    padding: 12px 0 8px 15px;
    font-size: 12px;
  }
  #userBoxLeft{
    float: left;
    text-align: left;
  }
  #userBoxRight{
    float: right;
    padding-right: 120px;
    text-align: left;
  }
  #userBoxRight .el-avatar{
    position: relative;
    left: 100px;
    margin-bottom: 10px;
  }
  .dialogCheck-footer{
    margin-top: 250px;
    margin-right: 20px;
  }
  .userBox{
    height: 30px;
    width: 200px;
    margin: 10px;
    padding: 5px;
    /*  background-color: #409EFF;*/
  }
.statusOffline{
/*  background-color: rgba(255,255,255,1);*/
  background-color: red;
}
.statusOnline{
/*    background-color: rgba(255,255,255,0);*/
  background-color: yellow;
  }
.statusInvisible{
/*    background-color: rgba(255,255,255,1);*/
  background-color: #409EFF;
}
</style>
