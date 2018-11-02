<template>
  <section>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 救护所配置</span>
        <div class="demo-input-suffix">
          <el-table :data="tableData2" highlight-current-row stripe border style="width: 100%">
            <el-table-column label="项目" width="280%" align="center">
              <template slot-scope="scope">
                <i class="el-icon-document"></i>
                <span style="margin-left: 5px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            
            <el-table-column label="内容" width="480%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色配置">
      <div class="demo-input-suffix">
          <el-table :data="tableData" highlight-current-row stripe border style="width: 100%">
    
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
            <el-table-column label="角色" width="180%" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>单位: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <span >{{ scope.row.role }}</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column label="生效时间" width="280%" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 5px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        
        </div>
      </el-tab-pane>


      <el-tab-pane label="权限管理">权限管理</el-tab-pane>
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
        role:'医生',
        address: '232256 部队 中士'
      }, {
        date: '201801210 10:01:22',
        name: '郭占泽',
        cardno: ' 10891',
        role:'护士',
        address: '26571 部队 班长'
      }, {
        date: '201801210 09:13:56',
        name: '崔洪铭',
        cardno: ' 22901',
        role:'指挥',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 09:13:30',
        name: '杨明坤',
        cardno: ' 11452',
        role:'IT维护',
        address: '22901 部队 班长'
      }, {
        date: '201801210 09:13:11',
        name: '麦淞玮',
        cardno: ' 91742',
        role:'护士',
        address: '11452 部队 三等兵'
      }, {
        date: '201801210 08:41:30',
        name: '张奎荣',
        cardno: ' 11892',
        role:'医生',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 08:38:11',
        name: '肖烔锴',
        cardno: ' 18692',
        role:'医生',
        address: '11892 部队 班长'
      }, {
        date: '201801210 08:33:45',
        name: '冯泽华',
        cardno: ' 13462',
        role:'护士',
        address: '13462 部队 中士'
      }, {
        date: '201801210 07:03:10',
        name: '刘培志',
        cardno: ' 13462',
        role:'医生',
        address: '13462 部队 班长'
      }],

      tableData2: [{
        date: '201801210 10:23:30',
        name: '救护所名称',
        cardno: '第30121救护所',
        role:'医生',
        address: '232256 部队 中士'
      }, {
        date: '201801210 10:01:22',
        name: '位置信息',
        cardno: ' 东经： 112.0009  北纬: 34.4442 ',
        role:'护士',
        address: '26571 部队 班长'
      }, {
        date: '201801210 09:13:56',
        name: '指挥责任人',
        cardno: ' 宋子松',
        role:'指挥',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 09:13:30',
        name: '伤员容量',
        cardno: ' 11452',
        role:'20人',
        address: '22901 部队 班长'
      }, {
        date: '201801210 09:13:11',
        name: '资源容量',
        cardno: ' 91742',
        role:'23',
        address: '11452 部队 三等兵'
      }, ]
    }
  }
}
</script>
<style scoped>
</style>
