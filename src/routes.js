import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login',
      hidden: true
    },
    {
      path: '/Login',
      component: (resolve) => require(['./components/Login.vue'], resolve),
      name: '',
      hidden: true
    },
    {
      path: '/System_Home',
      name: '救护所管理',
      iconCls: 'el-icon-more',
      component: (resolve) => require(['./components/System_home.vue'], resolve),
      children: [{ 
        name: '管理界面',
        path: '/System_Home/System_page1', 
        component: (resolve) => require(['./components/System_home/System_page1.vue'], resolve),
      }]
    },
    {
      path: '/System_Home',
      name: '设备管理',
      iconCls: 'el-icon-menu',
      component: (resolve) => require(['./components/System_home.vue'], resolve),
      children: [{
        name: '管理界面', 
        path: '/System_Home/System_page2', 
        component: (resolve) => require(['./components/System_home/System_page2.vue'], resolve),
      }]
    },
    {
      path: '/System_Home',
      name: '数据管理',
      iconCls: 'el-icon-location',
      component: (resolve) => require(['./components/System_home.vue'], resolve),
      children: [{ 
        name: '管理界面',
        path: '/System_Home/System_page3', 
        component: (resolve) => require(['./components/System_home/System_page3.vue'], resolve),
      }]
    },
    {
      path: '/System_Home',
      name: '系统维护',
      iconCls: 'el-icon-setting',
      component: (resolve) => require(['./components/System_home.vue'], resolve),
      children: [{
        name: '维护界面', 
        path: '/System_Home/System_page4', 
        component: (resolve) => require(['./components/System_home/System_page4.vue'], resolve),
      }]
    },
    {
      path: '/InjuryAssignView',
      component: (resolve) => require(['./components/InjuryAssignView/InjuryAssignView.vue'], resolve),
      name: '伤员分类后送',
      hidden: true
    },
    {
      path: '/InjuryMedicalTag',
      component: (resolve) => require(['./components/InjuryMedicalTag/InjuryMedicalTagView.vue'], resolve),
      name: '伤员伤情表单',
      hidden: true
    }
  ]
})
