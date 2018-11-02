<template>
    <el-container>
        <el-header class="header">
            <el-col :span="10" class="logo">{{sysName}}</el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">
                        <img :src="this.sysUserAvatar">
                        {{sysUserName}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-header>
        <el-container>
            <el-aside width="350px">
                <el-tabs type="border-card">
                    <el-tab-pane>
                        <span slot="label">
                            <i class="el-icon-date"></i>本医院伤员列表
                        </span>
                        <div class="demo-input-suffix">
                            <!--工具条-->
                            <el-col :span="24" class="toolbar">
                                <el-form :inline="true" :model="filters">
                                    <el-form-item>
                                        <el-input v-model="filters.name" placeholder="姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" v-on:click="getTableData">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-table
                                :data="tabledata"
                                highlight-current-row
                                v-loading="listLoading"
                                @row-click="getPatientInfoData"
                                stripe
                                border
                                height="550"
                                style="width: 100%; margin-top: 1%"
                            >
                                <el-table-column type="index" width="40%" align="center" fixed></el-table-column>
                                <el-table-column label="姓名" width="80%" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 1px">{{ scope.row.name }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="卡号" width="80%" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="伤情" align="center">
                                    <template slot-scope="scope">
                                        <span style="margin-left: 1px">{{ scope.row.injury }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!--工具条-->
                            <el-col :span="24" class="toolbar">
                                <el-pagination
                                    background=""
                                    layout="prev, pager, next"
                                    @current-change="handleCurrentChange"
                                    :page-size="10"
                                    :total="total"
                                    style="float:right;"
                                ></el-pagination>
                            </el-col>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-container>
                <el-aside style="width:950px; margin-left:20px">
                    <el-tabs type="border-card">
                        <el-tab-pane>
                            <span slot="label">
                                <i class="el-icon-date"></i>伤员伤票表单
                            </span>
                            <el-row>
                                <el-col :span="6" style="margin-left:15px;height:200px">
                                    <el-card
                                        class="box-card"
                                        shadow="always"
                                        style="width:100%; height:180px"
                                    >
                                        <div
                                            slot="header"
                                            class="basic-info"
                                            style="text-align: center"
                                        >
                                            <span>伤员基本信息</span>
                                        </div>
                                        <div class="textLine" style="float: left">姓名：</div>
                                        <div class="textLine" align="right">{{patientName}}</div>
                                        <div class="textLine" style="float: left">性别：</div>
                                        <div class="textLine" align="right">{{patientSex}}</div>
                                        <div class="textLine" style="float: left">出生日期：</div>
                                        <div class="textLine" align="right">{{patientBirth}}</div>
                                        <div class="textLine" style="float: left">血型：</div>
                                        <div class="textLine" align="right">{{patientBlood}}</div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" style="margin-left:15px;height:200px">
                                    <el-card
                                        class="box-card"
                                        shadow="always"
                                        style="width:100%;height:180px"
                                    >
                                        <div
                                            class="textLine"
                                            style="float: left; margin-top:3px"
                                        >保障卡号：</div>
                                        <div
                                            class="textLine"
                                            style="margin-top:3px"
                                            align="right"
                                        >{{patientCard}}</div>
                                        <div
                                            class="textLine"
                                            style="float: left; margin-top:9px"
                                        >负伤时间：</div>
                                        <div
                                            class="textLine"
                                            style="margin-top:9px"
                                            align="right"
                                        >{{injuryDate}}</div>
                                        <div
                                            class="textLine"
                                            style="float: left; margin-top:9px"
                                        >送达时间：</div>
                                        <div
                                            class="textLine"
                                            style="margin-top:9px"
                                            align="right"
                                        >{{receiveDate}}</div>
                                        <div
                                            class="textLine"
                                            style="float: left; margin-top:9px"
                                        >后送时间：</div>
                                        <div
                                            class="textLine"
                                            style="margin-top:9px"
                                            align="right"
                                        >{{sentDate}}</div>
                                        <div
                                            class="textLine"
                                            style="float: left; margin-top:9px"
                                        >呼吸：</div>
                                        <div
                                            class="textLine"
                                            style="margin-top:9px"
                                            align="right"
                                        >{{breath}}</div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" style="margin-left:15px;height:200px">
                                    <el-card
                                        class="box-card"
                                        shadow="always"
                                        style="width:100%;height:180px"
                                    >
                                        <el-row style="margin-top:2px">
                                            <el-col :span="9">
                                                <div style="font-size:15px">等待救治进度</div>
                                            </el-col>
                                            <el-col :span="14" style="margin-left:4px">
                                                <el-progress
                                                    :text-inside="true"
                                                    :stroke-width="18"
                                                    :percentage="this.waitingpercent"
                                                    color="rgba(22, 183, 30, 0.7)"
                                                ></el-progress>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top:9px">
                                            <el-col :span="9">
                                                <div style="font-size:15px">信息完整度</div>
                                            </el-col>
                                            <el-col :span="14" style="margin-left:4px">
                                                <el-progress
                                                    :text-inside="true"
                                                    :stroke-width="18"
                                                    :percentage="this.completepercent"
                                                ></el-progress>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top:9px">
                                            <el-col :span="9">
                                                <div style="font-size:15px">已做检查进度</div>
                                            </el-col>
                                            <el-col :span="14" style="margin-left:4px">
                                                <el-progress
                                                    :text-inside="true"
                                                    :stroke-width="18"
                                                    :percentage="this.inspectpercent"
                                                    color="rgba(142, 113, 199, 0.7)"
                                                ></el-progress>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top:9px">
                                            <el-col :span="9">
                                                <div style="font-size:15px">身份验证进度</div>
                                            </el-col>
                                            <el-col :span="14" style="margin-left:4px">
                                                <el-progress
                                                    :text-inside="true"
                                                    :stroke-width="18"
                                                    :percentage="this.vertifypercent"
                                                    status="success"
                                                ></el-progress>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top:9px">
                                            <el-col :span="9">
                                                <div style="font-size:15px">身体恢复程度</div>
                                            </el-col>
                                            <el-col :span="14" style="margin-left:4px">
                                                <el-progress
                                                    :text-inside="true"
                                                    :stroke-width="18"
                                                    :percentage="this.recoverpercent"
                                                    status="exception"
                                                ></el-progress>
                                            </el-col>
                                        </el-row>
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
                                                <el-card
                                                    class="box-card"
                                                    shadow="always"
                                                    style="width:100%; margin-top:6px"
                                                >
                                                    <div>
                                                        <el-button class="situ-button">危重死亡</el-button>
                                                        <el-button class="situ-button">重度</el-button>
                                                        <el-button class="situ-button">中度</el-button>
                                                        <el-button class="situ-button">轻度</el-button>
                                                        <el-button class="situ-button">紧急处理</el-button>
                                                        <el-button class="situ-button">放射处理</el-button>
                                                    </div>
                                                    <div>
                                                        <el-radio disabled style="margin-left:7%"></el-radio>
                                                        <el-radio disabled style="margin-left:14%"></el-radio>
                                                        <el-radio style="margin-left:14%"></el-radio>
                                                        <el-radio disabled style="margin-left:14%"></el-radio>
                                                        <el-radio disabled style="margin-left:12%"></el-radio>
                                                        <el-radio disabled style="margin-left:14%"></el-radio>
                                                    </div>
                                                </el-card>
                                                <el-card
                                                    class="box-card"
                                                    shadow="always"
                                                    style="width:100%; margin-top:6px"
                                                >
                                                    <div styule="font-size:15px">伤部：
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:0.8%; width:5%"
                                                            label="头部"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:11.7%; width:5%"
                                                            label="面部 "
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="颈部"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:11.7%; width:5%"
                                                            label="上肢 "
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:9.9%; width:5%"
                                                            label="下肢"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="胸部 "
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:6.7%; width:5%"
                                                            label="背部 "
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="腹部 "
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="其他"
                                                        ></el-radio>
                                                    </div>
                                                </el-card>
                                                <el-card
                                                    class="box-card"
                                                    shadow="always"
                                                    style="width:100%; margin-top:6px"
                                                >
                                                    <div styule="font-size:15px">伤类：
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:0.8%; width:5%"
                                                            label="炸伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:11.7%; width:5%"
                                                            label="枪弹伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="冻伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:11.7%; width:5%"
                                                            label="刃器伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:9.9%; width:5%"
                                                            label="烧伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="挤压伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:6.7%; width:5%"
                                                            label="挤压伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="撞击伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio2"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="复合伤"
                                                        ></el-radio>
                                                    </div>
                                                </el-card>
                                                <el-card
                                                    class="box-card"
                                                    shadow="always"
                                                    style="width:100%; margin-top:6px"
                                                >
                                                    <div styule="font-size:15px">伤型：
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:0.8%; width:5%"
                                                            label="骨折"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:11.7%; width:5%"
                                                            label="贯通伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="断肢"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:11.7%; width:5%"
                                                            label="穿透伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:9.9%; width:5%"
                                                            label="断指"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="盲管伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:6.7%; width:5%"
                                                            label="切残伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="组织伤"
                                                        ></el-radio>
                                                        <el-radio
                                                            v-model="radio3"
                                                            style="margin-left:11.8%; width:5%"
                                                            label="其他"
                                                        ></el-radio>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label">
                                <i class="el-icon-date"></i>伤员X光检测结果
                            </span>
                            <el-col :span="24" style="margin-top:1%">
                                <img
                                    src="/static/picture/xLight.jpg"
                                    width="90%"
                                    height="630"
                                >
                            </el-col>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label">
                                <i class="el-icon-date"></i>伤员医嘱
                            </span>
                            <el-row>
                                <el-col :span="24" style="margin-top:1%">
                                    <div class="grid-content_main">
                                        <div class="classinfo">
                                            <el-row>
                                                <el-button type="success">伤员医嘱</el-button>
                                            </el-row>
                                            <el-row>
                                                <img
                                                    src="/static/picture/advice_temp.png"
                                                    width="100%"
                                                    height="177"
                                                >
                                            </el-row>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-aside>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import { getInjuryPeopleTable, getPatientInfo } from "../../api/api";
import axios from "axios";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      sysName: "伤员伤票显示界面",
      sysUserName: "测试医生",
      sysUserAvatar: "/static/picture/user.jpg",

      patientName: "魏子博",
      patientSex: "男",
      patientBirth: "1991-01-01",
      patientBlood: "A",

      patientCard: "11839027482",
      injuryDate: "2018  年  6  月  17  日",
      receiveDate: "2018  年  6  月  21  日",
      sentDate: "2018  年  6  月  17  日",
      breath: "67 次/分",

      waitingpercent: 0,
      completepercent: 30,
      inspectpercent: 80,
      vertifypercent: 100,
      recoverpercent: 50,

      radio: "1",
      radio2: "1",
      radio3: "1",

      searchkeywords: "",
      total: 0,
      tabledata: [],
      page: 1,
      listLoading: false
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    getTableData() {
      let params = {
        page: this.page,
        name: this.filters.name
      };
      this.listLoading = true;
      getInjuryPeopleTable(params).then(res => {
        this.total = res.data.total;
        this.tabledata = res.data.tabledata;
        this.listLoading = false;
      });
    },
    getPatientInfoData(row,event,column) {
        let params = {
            page: this.page,
            name: row.name
        }
        console.log(row.name)
        getPatientInfo(params).then(res => {
            console.log(res.data)
            this.patientName = res.data.tabledata[0].name;
            this.patientSex = res.data.tabledata[0].sex;
            this.patientBirth = res.data.tabledata[0].date;
            this.patientBlood = res.data.tabledata[0].blood;
            this.patientCard = res.data.tabledata[0].patientCard;
            this.injuryDate = res.data.tabledata[0].injuryDate;
            this.receiveDate = res.data.tabledata[0].receiveDate;
            this.sentDate = res.data.tabledata[0].sentDate;
            this.breath = res.data.tabledata[0].breath;
            this.waitingpercent = res.data.tabledata[0].waitingpercent;
            this.completepercent = res.data.tabledata[0].completepercent;
            this.inspectpercent = res.data.tabledata[0].inspectpercent;
            this.vertifypercent = res.data.tabledata[0].vertifypercent;
            this.recoverpercent = res.data.tabledata[0].recoverpercent;
        });
    },
    // 退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        // type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  line-height: 60px;
  background-color: #54946a;
  color: #fff;

  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;

    .userinfo-inner {
      cursor: pointer;
      color: #fff;

      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }

  .logo {
    height: 60px;
    width: 330px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;

    img {
      width: 40px;
      float: left;
      margin: 10px 10px 10px 18px;
    }

    .txt {
      color: #fff;
    }
  }
}

.textLine {
  font-size: 15px;
  position: relative;
}

.situ-button {
  width: 15%;
  text-align: center;
  margin-left: 10px;
}
</style>