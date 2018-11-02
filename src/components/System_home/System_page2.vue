<template>
  <section>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 设备列表</span>
        <div class="demo-input-suffix">
         <el-row  :gutter="20">
          <el-col :span="12">
            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加设备</el-button>
          </el-col>
          
          </el-row>
          <p>&nbsp;</p>


          <el-table :data="tableData" highlight-current-row stripe border style="width: 100%">

            <el-table-column label="设备名称" width="180%" align="center">
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

            <el-table-column label="IP地址" width="180%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.IP }}</span>
              </template>
            </el-table-column>

            <el-table-column label="状态" width="180%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.status }}</span>
              </template>
            </el-table-column>

            <el-table-column label="投入使用日期" width="280%" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 5px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            
           
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">调拨</el-button>
              </template>
            </el-table-column>
          </el-table>
         
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备使用率">
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
          <p>&nbsp;</p></el-tab-pane>
      <el-tab-pane label="上级接口">上级接口</el-tab-pane>
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
        name: 'X 检测仪',
        IP: '202.182.28.10',
        status: ' 使用 ',
        cardno: ' ',
        address: '232256 部队 中士'
      }, {
        date: '201801210 10:01:22',
        name: '终端设备11',
        IP: '202.182.28.02',
        status: ' - ',
        cardno: ' 10891',
        address: '26571 部队 班长'
      }, {
        date: '201801210 09:13:56',
        name: '移动终端22',
        IP: '202.182.28.04',
        status: ' 修理 ',
        cardno: ' 22901',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 09:13:30',
        name: '手术台1',
        IP: '202.182.28.11',
        status: ' - ',
        cardno: ' 11452',
        address: '22901 部队 班长'
      }, {
        date: '201801210 09:13:11',
        name: 'X设备',
        IP: '202.182.28.19',
        status: ' 使用 ',
        cardno: ' 91742',
        address: '11452 部队 三等兵'
      }, {
        date: '201801210 08:41:30',
        name: 'X设备1',
        IP: '202.182.28.20',
        status: ' - ',
        cardno: ' 11892',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 08:38:11',
        name: 'X设备34',
        IP: '202.182.28.23',
        status: ' 使用 ',
        cardno: ' 18692',
        address: '11892 部队 班长'
      }, {
        date: '201801210 08:33:45',
        name: 'B超设备1',
        IP: '202.182.28.90',
        status: ' - ',
        cardno: ' 13462',
        address: '13462 部队 中士'
      }, {
        date: '201801210 07:03:10',
        name: '采集设备102',
        IP: '202.182.28.91',
        status: ' 使用 ',
        cardno: ' 13462',
        address: '13462 部队 班长'
      }]
    }
  }
}
</script>
<style scoped>
</style>
