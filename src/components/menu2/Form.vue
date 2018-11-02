<template>
  <el-main>
    <el-row style="weight:100%;height:200px">
      <el-col style="width:38%; min-width:350px">
        <el-card class="box-card" shadow="always" style="width:100%">
          <div slot="header" class="basic-info" style="text-align: center">
            <span>基本信息</span>
          </div>
          <div class="textLine" style="float: left">姓名：</div>
          <div class="textLine" align="right" >{{sysUserName}}</div>
          <div class="textLine" style="float: left">性别：</div>
          <div class="textLine" align="right" >{{sysUserSex}}</div>
          <div class="textLine" style="float: left">出生日期：</div>
          <div class="textLine" align="right">{{sysUserBirth}}</div>
          <div class="textLine" style="float: left">血型：</div>
          <div class="textLine" align="right">{{sysUserBlood}}</div>
        </el-card>
      </el-col>
      <el-col style="margin-left:2%; width:60%; min-width:500px" >
         <el-card class="box-card" shadow="always" style="width:100%">
          <div slot="header" class="basic-info" style="text-align: center">
            <span>基本数据</span>
          </div>
          <div class="textLine" style="float: left"><img src="../../assets/heart_icon.png" class="iconImage" />心跳：</div>
          <div class="textLine" align="right" ><img src="../../assets/heart_info.png" class="infoImage" /></div>
          <div class="textLine" style="float: left"><img src="../../assets/breath_icon.png" class="iconImage" />呼吸：</div>
          <div class="textLine" align="right" ><img src="../../assets/breath_info.png" class="infoImage" /></div>
          <div class="textLine" style="float: left"><img src="../../assets/pulse_icon.png" class="iconImage" />血压：</div>
          <div class="textLine" align="right"><img src="../../assets/pulse_info.png" class="infoImage" /></div>
          <div class="textLine" style="float: left"><img src="../../assets/temp_icon.png" class="iconImage" />体温：</div>
          <div class="textLine" align="right"><img src="../../assets/temp_info.png" class="infoImage" /></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <div class="detailinfo">
            <el-row>
              <el-button type="success">伤票处理</el-button>
            </el-row>
            <el-col :span="24">
              <el-card class="box-card" shadow="always" style="width:100%; margin-top:1%">
                <div>
                    <el-button class="situ-button">危重死亡</el-button>
                    <el-button class="situ-button">重度</el-button>
                    <el-button class="situ-button">中度</el-button>
                    <el-button class="situ-button">轻度</el-button>
                    <el-button class="situ-button">紧急处理</el-button>
                    <el-button class="situ-button">放射处理</el-button>
                </div>
                <div>
                    <el-radio  disabled style="margin-left:7%"></el-radio>
                    <el-radio  disabled style="margin-left:14%"></el-radio>
                    <el-radio  style="margin-left:14%"></el-radio>
                    <el-radio  disabled style="margin-left:14%"></el-radio>
                    <el-radio  disabled style="margin-left:14%"></el-radio>
                    <el-radio  disabled style="margin-left:14%"></el-radio>
                </div>     
              </el-card>
              <el-card class="box-card" shadow="always" style="width:100%; margin-top:1%">
                <div>
                    <el-radio v-model="radio" style="margin-left:7%; width:5%" label="战伤"></el-radio>
                    <el-radio v-model="radio" style="margin-left:11%; width:5%" label="非战伤"></el-radio>
                    <el-radio v-model="radio" style="margin-left:11%; width:5%" label="自救"></el-radio>
                    <el-radio v-model="radio" style="margin-left:11%; width:5%" label="非自救"></el-radio>
                    <el-radio v-model="radio" style="margin-left:11%; width:5%" label="卫救"></el-radio>
                    <el-radio v-model="radio" style="margin-left:11%; width:5%" label="未处置"></el-radio>
                </div>     
              </el-card>
              <el-card class="box-card" shadow="always" style="width:100%; margin-top:1%">
                <div>
                    <el-radio v-model="radio2" style="margin-left:7%; width:5%" label="战伤"></el-radio>
                    <el-radio v-model="radio2" style="margin-left:11%; width:5%" label="非战伤"></el-radio>
                    <el-radio v-model="radio2" style="margin-left:11%; width:5%" label="自救"></el-radio>
                    <el-radio v-model="radio2" style="margin-left:11%; width:5%" label="非自救"></el-radio>
                    <el-radio v-model="radio2" style="margin-left:11%; width:5%" label="卫救"></el-radio>
                    <el-radio v-model="radio2" style="margin-left:11%; width:5%" label="未处置"></el-radio>
                </div>     
              </el-card>
            </el-col>

          </div> 
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="margin-top:1%">
        <div class="grid-content_main ">
          <div class="classinfo">
            <el-row>
              <el-button type="success">分类处理</el-button>
            </el-row>
            <el-row>
              <img src="../../assets/advice_temp.png" width="100%" height="177"/>
                </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
 export default{
  data () {
    return {
      radio: '1',
      radio2: '1',
      sysUserName: '无',
      sysUserSex: '无',
      sysUserBirth: '无',
      sysUserBlood: '无'
    }
  },
  mounted () {
    var user = sessionStorage.getItem('user')
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserSex = user.sex || '';
        this.sysUserBirth = user.birth || '';
        this.sysUserBlood = user.blood || '';
      }
  }
 }
</script>

<style>
  .textLine {
    font-size: 15px;
    position:relative;
  }

  .iconImage {
    width: 40%;
    height: 15px;
  }

  .infoImage {
    width: 80%;
    height: 15px;
  }
  
  .situ-button {
    width:15%; 
    text-align: center; 
    margin-left:1%
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .basic-info:before,
  .basic-info:after {
    display: table;
    content: "";
  }
  .basic-info:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
