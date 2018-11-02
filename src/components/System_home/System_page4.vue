<template>
  <section>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i>操作日志</span>
        <div class="demo-input-suffix">
          <el-table :data="tableData" highlight-current-row stripe border style="width: 100%">
            <el-table-column label="时间" width="280%" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 5px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户名" width="180%" align="center">
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
            <el-table-column label="登录IP" width="200%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.IP }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作命令内容" width="380%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="系统备份管理">
       <div class="demo-input-suffix">
          <el-table :data="tableData2" highlight-current-row stripe border style="width: 100%">
            <el-table-column label="设备名" width="180%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 5px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="IP地址" width="180%" align="center">
              <template slot-scope="scope">
                    <span >{{ scope.row.IP }}</span>
               </template>
            </el-table-column>
            <el-table-column label="上传备份时间" width="200%" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 1px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备份目录" width="380%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">备份</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">恢复到升级前</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        </el-tab-pane>

     

      <el-tab-pane label="后台设备管理">
      <div class="demo-input-suffix">

          <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加新设备</el-button>
          <p>&nbsp;</p>
          <el-table :data="tableData2" highlight-current-row stripe border style="width: 100%">
            <el-table-column label="设备名" width="180%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 5px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="IP地址" width="180%" align="center">
              <template slot-scope="scope">
                    <span >{{ scope.row.IP }}</span>
               </template>
            </el-table-column>
            <el-table-column label="上传备份时间" width="200%" align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 1px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备份目录" width="380%" align="center">
              <template slot-scope="scope">
                <span style="margin-left: 1px">{{ scope.row.cardno }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">升级</el-button>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">复位</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        </el-tab-pane>


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
        IP: ' 192.168.1.22',
        cardno: 'check oper 29',
        address: '232256 部队 中士'
      }, {
        date: '201801210 10:01:22',
        name: '郭占泽',
        IP: ' 192.168.12.23',
        cardno: 'reset device 109',
        address: '26571 部队 班长'
      }, {
        date: '201801210 09:13:56',
        name: '崔洪铭',
        IP: ' 192.168.11.205',
        cardno: 'log out',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 09:13:30',
        name: '杨明坤',
        IP: ' 192.168.11.101',
        cardno: 'add advice ...',
        address: '22901 部队 班长'
      }, {
        date: '201801210 09:13:11',
        name: '麦淞玮',
        IP: ' 192.168.1.222',
        cardno: 'add equiment dev 290',
        address: '11452 部队 三等兵'
      }, {
        date: '201801210 08:41:30',
        name: '张奎荣',
        IP: ' 192.168.1.202',
        cardno: 'check oper 29',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 08:38:11',
        name: '肖烔锴',
        IP: ' 192.168.112.22',
        cardno: 'add equiment dev 290',
        address: '11892 部队 班长'
      }, {
        date: '201801210 08:33:45',
        name: '冯泽华',
        IP: ' 192.168.11.22',
        cardno: 'add equiment dev 2909',
        address: '13462 部队 中士'
      }, {
        date: '201801210 07:03:10',
        name: '刘培志',
        IP: ' 192.168.11.59',
        cardno: 'check oper 29',
        address: '13462 部队 班长'
      }],

      tableData2: [{
        date: '201801210 10:23:30',
        name: '数据库服务器1',
        IP: ' 192.168.1.22',
        cardno: 'sys/backup_data/20181010/server/',
        address: '232256 部队 中士'
      }, {
        date: '201801210 10:01:22',
        name: '数据库服务器2',
        IP: ' 192.168.12.23',
        cardno: 'sys/backup_data/20181010/server/',
        address: '26571 部队 班长'
      }, {
        date: '201801210 09:13:56',
        name: 'WEB服务器1',
        IP: ' 192.168.11.205',
        cardno: 'sys/backup_data/20181010/server/',
        address: '232256 部队 三等兵'
      }, {
        date: '201801210 09:13:30',
        name: '负载均衡服务器',
        IP: ' 192.168.11.101',
        cardno: 'sys/backup_data/20181010/server/',
        address: '22901 部队 班长'
      }]
    }
  }
}
</script>
<style scoped>
</style>
