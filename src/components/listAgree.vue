<template>
  <div id="listAgree">  <!--v-for指令实行好友列表的循环-->  <!--待同意好友列表-->

    <el-tree
      class="tree"
      :data="FriendsAgreeListOne"
      empty-text="待同意好友列表为空">
      <el-row  v-for="(item,index) in FriendNonUserinfoList" :key="index">
        <div  class="listFriends">
          <div  class="listAvatar">
            <el-avatar :size="20" :src="item.photo" fit="scale-down"></el-avatar>
          </div>
          <span class="listName">{{  item.username  }}</span>
          <el-button type="text" class="acceptFri" @click="agreeFriend(index)">接受</el-button>
          <el-button type="text" class="rejectFri" @click="rejectFriend(index)">拒绝</el-button>
        </div>
      </el-row>
    </el-tree>
    <!-- <el-row  v-for="(item,index) in FriendNonUserinfoList" :key="index">
   <div  class="listFriends">
     <div  class="listAvatar" @click="selectFriendInfo(index)">
       <el-avatar :size="30" :src="item.photo" fit="scale-down"></el-avatar>
     </div>

     <span class="listName">{{  item.username  }}</span>
   </div>
 </el-row>
 <el-row  v-for="(item,index) in UserNonFriendinfoList" :key="index">
   <div  class="listFriends">
     <div  class="listAvatar" @click="selectFriendInfo(index)">
       <el-avatar :size="30" :src="item.photo" fit="scale-down"></el-avatar>
     </div>

     <span class="listName">{{  item.username  }}</span>
   </div>
 </el-row>-->
    <el-tree
      class="tree"
      :data="FriendsAgreeListTwo">
      <el-row  v-for="(item,index) in UserNonFriendinfoList" :key="index">
        <div  class="listFriends">
          <div  class="listAvatar">
            <el-avatar :size="20" :src="item.photo" fit="scale-down"></el-avatar>
          </div>
          <span class="listName">{{  item.username  }}</span>
          <!--<span> <el-button plain class="acceptFri">重发</el-button> </span>-->
        </div>
      </el-row>
    </el-tree>
<!--    {{ user }}-->
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

    export default {
        name: "listAgree",
        props: ['user'],
        data(){
            return {
                FriendsAgreeListOne:[{
                    id: 1,
                    label: '接收到的好友请求',
                    children: [{
                        id: 2,
                        label: '目前没有收到好友请求'
                    }]
                }],
                FriendsAgreeListTwo:[{
                        id: 1,
                        label: '已发送的好友请求',
                        children: [{
                            id: 2,
                            label: '目前没有发送的好友请求'
                        }]
                    }],
             /*   list: [],*/
                FriendNonUserinfoList: [],
                UserNonFriendinfoList:[],
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
                address: ''
            }
        },
        created(){
            this.$emit('show')
            this.getFriendlistAgree()
        },
        methods: {
            getFriendlistAgree(){
                /*this.msg = this.agreUserinfoList*/
                var type = null
                var username = this.user
                    axios.post('/friend/getFrilist',
                        qs.stringify({
                            username,
                            type
                        })
                    ).then(response => {
                       /* console.log(response.data.FriendNonUserinfoList)  //对方给user发好友请求，user尚未回复
                        console.log(response.data.UserNonFriendinfoList)  //user给对方发好友请求，对方还没回复*/
                        this.FriendNonUserinfoList = response.data.FriendNonUserinfoList
                        this.UserNonFriendinfoList = response.data.UserNonFriendinfoList
                       /* this.agreUserinfoList = response.data.agreUserinfoList
                        console.log(this.agreUserinfoList)  */
                       /* for(var i=0;i<this.agreUserinfoList.length;i++){
                            if(this.agreUserinfoList[i].status === 0)

                        }*/
                    }).catch(error => {
                        console.log(error)
                    })
            }, //获取待同意的好友列表
            agreeFriend(index) {
                /*this.dialogVisibleNotice = false*/
                var username = this.user
                /*  var friendname = this.friendName*/
                var friendname = this.FriendNonUserinfoList[index].username  //从获取好友列表中可以获取到待同意的friendname
                axios.post('/friend/agreeFriend',
                    qs.stringify({
                        username,
                        friendname
                    })).then(response => {
                    console.log(response)
                    if (response.data.status === 200)
                        this.$message.success('请求发送成功！你们已成为好友！')
                    else if (response.data.status === 404)
                        this.$message.error('该用户不存在！')
                    else if (response.data.status === 401)
                        this.$message.warning('该用户已是您的好友')
                }).catch(error => {
                    console.log(error)
                    this.$message.error('请求失败!')
                })
            },  //接受好友
            rejectFriend(index) {
                /*this.dialogVisibleNotice = false*/
                var username = this.user
                var friendname = this.FriendNonUserinfoList[index].username
                axios.post('/friend/agreeFriend',
                    qs.stringify({
                        username,
                        friendname
                    })
                ).then(response => {
                    console.log(response)
                    if (response.data.status === 200)
                        this.$message.success('请求发送成功！您已拒绝本次好友申请！')
                    else if (response.data.status === 404)
                        this.$message.error('您已经拒绝过该用户或该用户并没有添加您为好友！')
                }).catch(error => {
                    console.log(error)
                    this.$message.error('请求失败!')
                })
            },  //拒绝好友





           /* selectFriendInfo(index){
                this.dialogVisibleCheck = true
                var username = this.user
                /!*console.log(index)*!/
                var friendname = this.agreUserinfoList[index].username  //通过index找到每个人的username
               /!* console.log(friendname)*!/
                axios.get('/friend/selectFriendInfo',{
                    params: {
                    username,
                    friendname
                  }
                }).then(response =>{
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
                }).catch(error =>{
                    console.log(error)
                })

            }*/   //查询指定好友的信息
        }
    }
</script>

<style scoped>
/*.listFriends {
  height: 42px;
  background: rgba(255,255,255,0.4);
  border-bottom: #8c939d 2px solid;
}*/
.listAvatar{
  float: left;
  padding-top: 6px;
  cursor: pointer;
}
.listName{
  float: left;
  padding: 8px 0 0 20px;
  font-size: 12px;
  cursor: default;
}
.tree{
  background-color: #D3DCE6;
}
/*#userBoxLeft{
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
!*  background-color: #409EFF;*!
}*/
.acceptFri,
.rejectFri{
  font-size: 13px;
}
.acceptFri{
  margin-left: 40px;
}
</style>
