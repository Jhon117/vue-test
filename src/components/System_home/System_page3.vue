<template>
  <section>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i>士兵数据</span>
        <div class="demo-input-suffix">
         <el-row  :gutter="20">
          <el-col :span="12">
            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">批量导入</el-button>
          </el-col>
          <el-col :span="4">
              <el-input placeholder="请选择日期" suffix-icon="el-icon-date">
              </el-input>
          </el-col>
          <el-col :span="4">
        
                <el-input placeholder="请输入姓名" prefix-icon="el-icon-search">
                </el-input>
          </el-col>
           <el-col :span="4">
        
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
          </el-row>
          <p>&nbsp;</p>
          <el-table :data="tableData" highlight-current-row stripe border style="width: 100%">
            <el-table-column label="日期" width="280%" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 5px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="180%" align="center">
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
            <el-table-column label="卡号" width="180%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
              </template>
            </el-table-column>

            <el-table-column label="相片" width="180%" align="center">
              <template slot-scope="scope">
                <img style="margin-left: 1px" src='/static/picture/user.jpg' width=35 height= 35 >
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
         
        </div>
      </el-tab-pane>
      <el-tab-pane label="医疗资源管理">
       <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加资源</el-button>
          <p>&nbsp;</p>
          </el-tab-pane>
      <el-tab-pane label="算法模型管理">
       <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">导入模型数据</el-button>
          <p>&nbsp;</p>
          </el-tab-pane>
      <el-tab-pane label="后送数据配置">
       <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">增加后送目的</el-button>
          <p>&nbsp;</p></el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
export default {
  data: function () {
    return {
      searchkeywords: '',
      tableData: [{
        date: '201801210 10:23:30',
        name: '魏子博',
        cardno: ' 26571',
        url: '/static/picture/user2.jpg',
        address: '232256 部队 中士'
      }, {
        date: '201801210 10:01:22',
        name: '郭占泽',
        cardno: ' 10891',
        address: '26571 部队 班长'
      }, {
        date: '201801210 09:13:56',
        name: '崔洪铭',
        cardno: ' 22901',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 09:13:30',
        name: '杨明坤',
        cardno: ' 11452',
        address: '22901 部队 班长'
      }, {
        date: '201801210 09:13:11',
        name: '麦淞玮',
        cardno: ' 91742',
        address: '11452 部队 三等兵'
      }, {
        date: '201801210 08:41:30',
        name: '张奎荣',
        cardno: ' 11892',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 08:38:11',
        name: '肖烔锴',
        cardno: ' 18692',
        address: '11892 部队 班长'
      }, {
        date: '201801210 08:33:45',
        name: '冯泽华',
        cardno: ' 13462',
        address: '13462 部队 中士'
      }, {
        date: '201801210 07:03:10',
        name: '刘培志',
        cardno: ' 13462',
        address: '13462 部队 班长'
      }]
    }
  }
}
</script>
<style scoped>
</style>
