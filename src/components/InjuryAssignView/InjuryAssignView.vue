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
      <el-aside width="650px">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-date"></i>本医院伤员救治列表
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
                  <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-table
                :data="tabledata"
                highlight-current-row
                v-loading="listLoading"
                stripe
                border=""
                height="550"
                style="width: 100%; margin-top: 1%"
              >
                <el-table-column type="index" width="25%" align="center" fixed></el-table-column>
                <el-table-column label="住院日期" width="110%" align="center">
                  <template slot-scope="scope">
                    <span style="margin-left: 5px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" width="70%" align="center">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>姓名: {{ scope.row.name }}</p>
                      <p>单位: {{ scope.row.address }}</p>
                      <div slot="reference" class="name-wrapper">
                        <span>{{ scope.row.name }}</span>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="卡号" width="70%" align="center">
                  <template slot-scope="scope">
                    <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="伤情" width="60%" align="center">
                  <template slot-scope="scope">
                    <span style="margin-left: 1px">{{ scope.row.injury }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="状态" width="60%" align="center">
                  <template slot-scope="scope">
                    <span style="margin-left: 1px">{{ scope.row.state }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      @click="handleTransfer(scope.$index, scope.row)"
                      type="danger"
                    >伤员转移</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--编辑界面-->
              <el-dialog title="编辑" :visible.sync="editFormVisible">
                <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                  <el-form-item label="住院日期">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="editForm.date"
                      @change="dateChange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" autocomplete="off" style="width:80%"></el-input>
                  </el-form-item>
                  <el-form-item label="卡号" prop="cardno">
                    <el-input v-model="editForm.cardno" style="width:80%"></el-input>
                  </el-form-item>
                  <el-form-item label="伤情">
                    <el-radio-group v-model="editForm.injury">
                      <el-radio class="radio" :label="0">轻度</el-radio>
                      <el-radio class="radio" :label="1">中度</el-radio>
                      <el-radio class="radio" :label="2">重度</el-radio>
                      <el-radio class="radio" :label="3">危重</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-radio-group v-model="editForm.state">
                      <el-radio class="radio" :label="1">等待救治</el-radio>
                      <el-radio class="radio" :label="2">正在救治</el-radio>
                      <el-radio class="radio" :label="3">救治成功</el-radio>
                      <el-radio class="radio" :label="4">需要转移</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="职务">
                    <el-input type="textarea" v-model="editForm.address" style="width:80%"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click.native="editFormVisible = false">取消</el-button>
                  <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                </div>
              </el-dialog>
              <!--新增界面-->
              <el-dialog title="新增" :visible.sync="addFormVisible">
                <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                  <el-form-item label="日期">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="addForm.date"
                      @change="dateChange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off" style="width:80%"></el-input>
                  </el-form-item>
                  <el-form-item label="卡号" prop="cardno">
                    <el-input v-model="addForm.cardno" style="width:80%"></el-input>
                  </el-form-item>
                  <el-form-item label="伤情">
                    <el-radio-group v-model="addForm.injury">
                      <el-radio class="radio" :label="0">轻度</el-radio>
                      <el-radio class="radio" :label="1">中度</el-radio>
                      <el-radio class="radio" :label="2">重度</el-radio>
                      <el-radio class="radio" :label="3">危重</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-radio-group v-model="addForm.state">
                      <el-radio class="radio" :label="1">等待救治</el-radio>
                      <el-radio class="radio" :label="2">正在救治</el-radio>
                      <el-radio class="radio" :label="3">救治成功</el-radio>
                      <el-radio class="radio" :label="4">需要转移</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="职务">
                    <el-input type="textarea" v-model="addForm.address" style="width:80%"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click.native="addFormVisible = false">取消</el-button>
                  <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
                </div>
              </el-dialog>
              <!--伤员转移界面-->
              <el-dialog title="编辑" :visible.sync="transferFormVisible">
                <el-form
                  :model="transferForm"
                  label-width="80px"
                  :rules="transferFormRules"
                  ref="transferForm"
                >
                  <el-form-item label="转移日期">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="transferForm.date"
                      @change="dateChange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="transferForm.name" autocomplete="off" style="width:80%"></el-input>
                  </el-form-item>
                  <el-form-item label="卡号" prop="cardno">
                    <el-input v-model="transferForm.cardno" style="width:80%"></el-input>
                  </el-form-item>
                  <el-form-item label="伤情">
                    <el-radio-group v-model="transferForm.injury">
                      <el-radio class="radio" :label="0">轻度</el-radio>
                      <el-radio class="radio" :label="1">中度</el-radio>
                      <el-radio class="radio" :label="2">重度</el-radio>
                      <el-radio class="radio" :label="3">危重</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="运送方式">
                    <el-radio-group v-model="transferForm.transferstate">
                      <el-radio class="radio" :label="1">机车</el-radio>
                      <el-radio class="radio" :label="2">直升机</el-radio>
                      <el-radio class="radio" :label="3">轮船</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="送达医院">
                    <el-radio-group v-model="transferForm.destination">
                      <el-radio class="radio" :label="1">甲医院</el-radio>
                      <el-radio class="radio" :label="2">乙医院</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="职务">
                    <el-input type="textarea" v-model="transferForm.address" style="width:80%"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click.native="transferFormVisible = false">取消</el-button>
                  <el-button
                    type="primary"
                    @click.native="transferSubmit"
                    :loading="transferLoading"
                  >提交</el-button>
                </div>
              </el-dialog>
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
        <el-aside style="width:650px;margin-left:25px">
          <el-row>
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label">
                  <i class="el-icon-date"></i>甲医院收治伤员
                </span>
                <div class="demo-input-suffix">
                  <el-table
                    :data="tabledata2"
                    highlight-current-row
                    v-loading="list2Loading"
                    stripe
                    border=""
                    height="290"
                  >
                    <el-table-column type="index" width="40%" align="center"></el-table-column>
                    <el-table-column label="转院日期" width="110%" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 5px">{{ scope.row.date }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" width="90%" align="center">
                      <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                          <p>姓名: {{ scope.row.name }}</p>
                          <p>单位: {{ scope.row.address }}</p>
                          <div slot="reference" class="name-wrapper">
                            <span>{{ scope.row.name }}</span>
                          </div>
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="卡号" width="90%" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="伤情" width="90%" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 1px">{{ scope.row.injury }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="运送方式" width="90%" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 1px">{{ scope.row.transferstate }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="收治状态" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 1px">{{ scope.row.receivestate }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!--工具条-->
                  <el-col :span="24" class="toolbar">
                    <el-pagination
                      background=""
                      layout="prev, pager, next"
                      @current-change="handleHospitalAChange"
                      :page-size="5"
                      :total="total2"
                      style="float:right;"
                    ></el-pagination>
                  </el-col>
                </div>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label">
                  <i class="el-icon-date"></i>乙医院收治伤员
                </span>
                <div class="demo-input-suffix">
                  <el-table
                    :data="tabledata3"
                    highlight-current-row
                    v-loading="list3Loading"
                    stripe
                    border=""
                    height="290"
                  >
                    <el-table-column type="index" width="40%" align="center"></el-table-column>
                    <el-table-column label="转院日期" width="110%" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 5px">{{ scope.row.date }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" width="90%" align="center">
                      <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                          <p>姓名: {{ scope.row.name }}</p>
                          <p>单位: {{ scope.row.address }}</p>
                          <div slot="reference" class="name-wrapper">
                            <span>{{ scope.row.name }}</span>
                          </div>
                        </el-popover>
                      </template>
                    </el-table-column>
                    <el-table-column label="卡号" width="90%" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="伤情" width="90%" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 1px">{{ scope.row.injury }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="运送方式" width="90%" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 1px">{{ scope.row.transferstate }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="收治状态" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 1px">{{ scope.row.receivestate }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!--工具条-->
                  <el-col :span="24" class="toolbar">
                    <el-pagination
                      background=""
                      layout="prev, pager, next"
                      @current-change="handleHospitalBChange"
                      :page-size="5"
                      :total="total3"
                      style="float:right;"
                    ></el-pagination>
                  </el-col>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-row>
          <el-row>
            <!--图标-->
            <el-row style="margin-top:3%">
              <el-col :span="12">
                <div id="piechart" style="width:400px; height:300px;"></div>
              </el-col>
              <el-col :span="12">
                <div id="linechart" style="width:400px; height:300px;"></div>
              </el-col>
            </el-row>
          </el-row>
        </el-aside>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import {
  getTableListPage,
  getPieChart,
  addUser,
  editUser,
  transferUser,
  getLineChart,
  getTableList2Page,
  getTableList3Page
} from "../../api/api";
import echarts from "echarts";
import axios from "axios";

export default {
  data() {
    return {
      sysName: "分类后送指挥界面",
      sysUserName: "测试医生",
      sysUserAvatar: "/static/picture/user.jpg",

      filters: {
        name: ""
      },
      searchkeywords: "",
      tabledata: [],
      tabledata2: [],
      tabledata3: [],
      total: 0,
      total2: 0,
      total3: 0,
      page: 1,
      page2: 1,
      page3: 1,
      listLoading: false,
      list2Loading: false,
      list3Loading: false,
      piechart: null,
      linechart: null,

      editFormVisible: false, //新增界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cardno: [{ required: true, message: "请输入卡号", trigger: "blur" }]
      },
      //新增界面数据
      editForm: {
        date: "",
        name: "",
        cardno: "",
        injury: -1,
        address: ""
      },

      transferFormVisible: false, //新增界面是否显示
      transferLoading: false,
      transferFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cardno: [{ required: true, message: "请输入卡号", trigger: "blur" }]
      },
      //新增界面数据
      transferForm: {
        date: "",
        name: "",
        cardno: "",
        injury: -1,
        address: ""
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        cardno: [{ required: true, message: "请输入卡号", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        date: "",
        name: "",
        cardno: "",
        injury: -1,
        address: ""
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getTableData();
    },
    handleHospitalAChange(val) {
      this.page2 = val;
      this.getTableData2();
    },
    handleHospitalBChange(val) {
      this.page3 = val;
      this.getTableData3();
    },
    getTableData() {
      let params = {
        page: this.page,
        name: this.filters.name
      };
      this.listLoading = true;
      getTableListPage(params).then(res => {
        this.total = res.data.total;
        this.tabledata = res.data.tabledata;
        this.listLoading = false;

        this.drawPieChart();
        this.drawLineChart();
      });
    },
    getTableData2() {
      let params = {
        page2: this.page2
      };
      this.list2Loading = true;
      getTableList2Page(params).then(res => {
        this.total2 = res.data.total2;
        this.tabledata2 = res.data.tabledata2;
        this.list2Loading = false;
      });
    },
    getTableData3() {
      let params = {
        page3: this.page3
      };
      this.list3Loading = true;
      getTableList3Page(params).then(res => {
        this.total3 = res.data.total3;
        this.tabledata3 = res.data.tabledata3;
        this.list3Loading = false;
      });
    },
    handleTransfer: function(index, row) {
      this.transferFormVisible = true;
      this.transferForm = Object.assign({}, row);
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        date: "",
        name: "",
        cardno: "",
        injury: -1,
        address: ""
      };
    },
    dateChange(val) {
      this.addForm.date = val;
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let params = this.addForm;
            addUser(params).then(res => {
              this.addLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getTableData();
            });
          });
        }
      });
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = this.editForm;
            editUser(params).then(res => {
              this.editLoading = false;
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getTableData();
            });
          });
        }
      });
    },
    transferSubmit: function() {
      this.$refs.transferForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.transferLoading = true;
            let params = this.transferForm;
            transferUser(params).then(res => {
              this.transferLoading = false;
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.$refs["transferForm"].resetFields();
              this.transferFormVisible = false;
              this.getTableData();
              if (params.destination == 1) this.getTableData2();
              else this.getTableData3();
            });
          });
        }
      });
    },
    drawPieChart() {
      let injurySitu = [0, 0, 0, 0];
      getPieChart().then(res => {
        injurySitu = res.data.injury;
        this.piechart = echarts.init(document.getElementById("piechart"));
        this.piechart.setOption({
          title: {
            text: "伤员伤情分类显示表",
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["轻度", "中度", "重度", "危重"]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: injurySitu[3], name: "危重" },
                { value: injurySitu[2], name: "重度" },
                { value: injurySitu[1], name: "中度" },
                { value: injurySitu[0], name: "轻度" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
      });
    },
    drawLineChart() {
      getLineChart().then(res => {
        let dateArray = res.data.dateArray;
        let mountArray = res.data.mountArray;
        this.chartLine = echarts.init(document.getElementById("linechart"));
        this.chartLine.setOption({
          title: {
            text: "伤员收治情况"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["2018年"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: dateArray
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "2018年",
              type: "line",
              stack: "总量",
              data: mountArray
            }
          ]
        });
      });
    },
    // 退出登录
    logout: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user')
        _this.$router.push('/login')
      }).catch(() => {

      })
    }
  },
  mounted() {
    this.getTableData();
    this.getTableData2();
    this.getTableData3();
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
    width: 20%;
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
</style>
