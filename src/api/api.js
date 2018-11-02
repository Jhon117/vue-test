import axios from 'axios'

let base = ''

export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data)
}

export const getTableListPage = params => {
  return axios.get(`${base}/InjuryAssign/table/listpage`, {
    params: params
  })
}

export const getTableList2Page = params => {
  return axios.get(`${base}/InjuryAssign/table/list2page`, {
    params: params
  })
}

export const getTableList3Page = params => {
  return axios.get(`${base}/InjuryAssign/table/list3page`, {
    params: params
  })
}

export const transferUser = params => {
  return axios.get(`${base}/InjuryAssign/table/transferuser`, {
    params: params
  })
}

export const addUser = params => {
  return axios.get(`${base}/InjuryAssign/table/adduser`, {
    params: params
  })
}

export const editUser = params => {
  return axios.get(`${base}/InjuryAssign/table/edituser`, {
    params: params
  })
}

export const getPieChart = params => {
  return axios.get(`${base}/InjuryAssign/table/piechart`)
}

export const getLineChart = params => {
  return axios.get(`${base}/InjuryAssign/table/linechart`)
}

export const getInjuryPeopleTable = params => {
  return axios.get(`${base}/InjuryMedicalTag/table/listpage`, {
    params: params
  })
}

export const getPatientInfo = params => {
  return axios.get(`${base}/InjuryMedicalTag/patientinfo`, {
    params: params
  })
}
