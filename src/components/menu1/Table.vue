<template>
  <section>
    <el-tabs type="border-card" style="margin-top:0.5%">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 收治伤员</span>
        <div class="demo-input-suffix">
          快速查找：
          <!--工具条-->
          <el-col :span="24" class="toolbar" style="padding-top: 1%;">
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
          <el-table :data="tabledata" highlight-current-row v-loading="listLoading" stripe border style="width: 100%; margin-top: 1%">
            <el-table-column type="index" width="50%" align="center">
            </el-table-column>
            <el-table-column label="日期" width="280%" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 5px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="140%" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>单位: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <span >{{ scope.row.name }}</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="卡号" width="140%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
              </template>
            </el-table-column>
            <el-table-column label="伤情" width="140%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.injury }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" @click="handleTransfer(scope.$index, scope.row)" type="danger">转医护</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--编辑界面-->
          <el-dialog title="编辑" :visible.sync="editFormVisible">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
              <el-form-item label="日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"  
                @change="dateChange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="editForm.name" auto-complete="off" style="width:80%"></el-input>
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
                <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"  
                @change="dateChange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="addForm.name" auto-complete="off" style="width:80%"></el-input>
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
              <el-form-item label="职务">
                <el-input type="textarea" v-model="addForm.address" style="width:80%"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="addFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
          </el-dialog>

          <!--工具条--> 
          <el-col :span="24" class="toolbar">
            <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </el-pagination>
          </el-col> 

          <!--图标-->
          <el-row style="margin-top:3%">
            <el-col :span="12">
              <div id="piechart" style="width:400px; height:300px;"></div>
            </el-col>
            <el-col :span="12">
              <div id="linechart" style="width:400px; height:300px;"></div>
            </el-col>
          </el-row> 

        </div>
      </el-tab-pane>
      <el-tab-pane label="远程伤员">远程伤员</el-tab-pane>
      <el-tab-pane label="医疗资源">医疗资源</el-tab-pane>
      <el-tab-pane label="分类统计">分类统计</el-tab-pane>
    </el-tabs>

  </section>
</template>
<script>
import { getTableListPage,  getPieChart, addUser, editUser, getLineChart } from '../../api/api';
import echarts from 'echarts';
import axios from 'axios';

export default {
  data: function() {
    return {
      filters: {
        name: ''
      },
      searchkeywords: '',
      datavalue: '',
      tabledata: [],
      total: 0,
      page: 1,
      listLoading: false,
      piechart: null,
      linechart: null,

      editFormVisible: false,//新增界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        cardno: [
          { required:true, message: '请输入卡号', trigger: 'blur' }
        ]
      },
      //新增界面数据
      editForm: {
        date: '',
        name: '',
        cardno: '',
        injury: -1,
        address: ''
      },

      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        cardno: [
          { required:true, message: '请输入卡号', trigger: 'blur' }
        ]
      },
      //新增界面数据
      addForm: {
        date: '',
        name: '',
        cardno: '',
        injury: -1,
        address: ''
      }
    }
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
      getTableListPage(params).then((res) => {
        this.total = res.data.total;
        this.tabledata = res.data.tabledata;
        this.listLoading = false;

        this.drawPieChart();
        this.drawLineChart();
      });
    },
    handleTransfer: function(index, row) {
      this.$confirm('确认转出该伤员吗？', '提示', {}).then(() => {
        this.listLoading = true;
        let params = { cardno: row.cardno };
      }).catch(error => {
        console.log(error);
      });
    },
    //显示编辑界面
    handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        date: '',
        name: '',
        cardno: '',
        injury: -1,
        address: ''
      };
    },
    dateChange(val) {
      this.addForm.date = val;
    },
    //新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            let params = this.addForm;
            addUser(params).then((res) => {
              this.addLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getTableData();
            });
          });
        }
      });
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            let params = this.editForm;
            editUser(params).then((res) => {
              this.editLoading = false;
              this.$message({
                message: '编辑成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getTableData();
            });
          });
        }
      });
    },
    drawPieChart() {
      let injurySitu = [0, 0, 0, 0];
      getPieChart().then((res) => {
        injurySitu = res.data.injury;
        this.piechart = echarts.init(document.getElementById('piechart'));
        this.piechart.setOption({
          title: {
            text: '伤员伤情分类显示表',   
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['轻度', '中度', '重度', '危重']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: injurySitu[3], name: '危重' },
              { value: injurySitu[2], name: '重度' },
              { value: injurySitu[1], name: '中度' },
              { value: injurySitu[0], name: '轻度' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        });
      });     
    },
    drawLineChart() {
      getLineChart().then((res) =>{
        let dateArray = res.data.dateArray;
        let mountArray = res.data.mountArray;
        this.chartLine = echarts.init(document.getElementById('linechart'));
        this.chartLine.setOption({
            title: {
                text: '伤员收治情况'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['2018年']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dateArray
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '2018年',
                    type: 'line',
                    stack: '总量',
                    data: mountArray
                }
            ]
        });
      });
      
    }
  },
  mounted() {
    this.getTableData();

  }
}

</script>
<style>
</style>
