import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers } from './data/user'
import { HospitalTable, HospitalTable2, HospitalTable3, injurySit, stateSit, receiveSit, transferSit } from './data/InjuryAssign'
import { InjuryPeopleTable } from './data/InjuryMedicalTag'
let _TableData = HospitalTable
let _TableData2 = HospitalTable2
let _TableData3 = HospitalTable3
let _InjuryPeopleTable = InjuryPeopleTable

export default {
  bootstrap () {
    let mock = new MockAdapter(axios)

    mock.onPost('/login').reply(config => {
      let {
        username,
        password
      } = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              return true
            }
          })

          if (hasUser) {
            resolve([200, {
              code: 200,
              msg: '请求成功',
              user
            }])
          } else {
            resolve([200, {
              code: 500,
              msg: '账号或密码错误'
            }])
          }
        }, 600)
      })
    })

    mock.onGet('/InjuryAssign/table/listpage').reply(config => {
      let {
        page,
        name
      } = config.params
      let mockTableData = _TableData
      if (name !== '') {
        mockTableData = _TableData.filter(tabledata => {
          if (name && tabledata.name.indexOf(name) === -1) {
            return false
          }
          return true
        })
      }
      let total = mockTableData.length
      mockTableData = mockTableData.filter((u, index) => index < 10 * page && index >= 10 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            tabledata: mockTableData
          }])
        }, 600)
      })
    })

    mock.onGet('/InjuryAssign/table/list2page').reply(config => {
      let { page2 } = config.params
      let mockTableData = _TableData2
      let total2 = mockTableData.length
      mockTableData = mockTableData.filter((u, index) => index < 5 * page2 && index >= 5 * (page2 - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total2: total2,
            tabledata2: mockTableData
          }])
        }, 600)
      })
    })

    mock.onGet('/InjuryAssign/table/list3page').reply(config => {
      let { page3 } = config.params
      let mockTableData = _TableData3
      let total3 = mockTableData.length
      mockTableData = mockTableData.filter((u, index) => index < 5 * page3 && index >= 5 * (page3 - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total3: total3,
            tabledata3: mockTableData
          }])
        }, 600)
      })
    })

    mock.onGet('/InjuryAssign/table/transferuser').reply(config => {
      let {
        address,
        cardno,
        date,
        injury,
        name,
        transferstate,
        destination
      } = config.params
      _TableData = _TableData.filter(u => u.cardno !== cardno)

      if (destination === 1) {
        _TableData2.push({
          address: address,
          cardno: cardno,
          date: date,
          injury: injurySit[injury],
          name: name,
          transferstate: transferSit[transferstate-1],
          receivestate: receiveSit[0]
        })
      } else {
        _TableData3.push({
          address: address,
          cardno: cardno,
          date: date,
          injury: injurySit[injury],
          name: name,
          transferstate: transferSit[transferstate-1],
          receivestate: receiveSit[0]
        })
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '已经成功转移伤员'
          }])
        }, 500)
      })
    })

    mock.onGet('/InjuryAssign/table/adduser').reply(config => {
      let {
        address,
        cardno,
        date,
        injury,
        name,
        state
      } = config.params

      _TableData.push({
        address: address,
        cardno: cardno,
        date: date,
        injury: injurySit[injury],
        name: name,
        state: stateSit[state-1]
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增伤员成功'
          }])
        }, 500)
      })
    })

    mock.onGet('/InjuryAssign/table/edituser').reply(config => {
      let {
        address,
        cardno,
        date,
        injury,
        name,
        state
      } = config.params

      _TableData.some(u => {
        if (u.cardno === cardno) {
          u.address = address
          u.cardno = cardno
          u.date = date
          u.injury = injurySit[injury]
          u.name = name
          u.state = stateSit[state-1]
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑伤员成功'
          }])
        }, 500)
      })
    })

    mock.onGet('/InjuryAssign/table/piechart').reply(config => {
      let injury = [0, 0, 0, 0]
      for (var i = 0; i < _TableData.length; i++) {
        if (_TableData[i].injury === '轻度') {
          injury[0]++
        } else if (_TableData[i].injury === '中度') {
          injury[1]++
        } else if (_TableData[i].injury === '重度') {
          injury[2]++
        } else {
          injury[3]++
        }
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            injury: injury
          }])
        }, 600)
      })
    })

    mock.onGet('/InjuryAssign/table/linechart').reply(config => {
      let dateArray = []
      let mountArray = []
      dateArray.push(_TableData[0].date)
      mountArray.push(1)
      for (var i = 1; i < _TableData.length; i++) {
        var count = 0
        for (var j = 0; j < dateArray.length; j++) {
          if (_TableData[i].date === dateArray[j]) {
            count++
            break
          }
        }
        if (count === 0) {
          dateArray.push(_TableData[i].date)
          mountArray.push(1)
        } else {
          mountArray[j] = mountArray[j] + count
        }
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            dateArray: dateArray,
            mountArray: mountArray
          }])
        }, 600)
      })
    })

    mock.onGet('InjuryMedicalTag/table/listpage').reply(config => {
      let {
        page,
        name
      } = config.params
      let mockTableData = _InjuryPeopleTable
      if (name !== '') {
        mockTableData = _InjuryPeopleTable.filter(tabledata => {
          if (name && tabledata.name.indexOf(name) === -1) {
            return false
          }
          return true
        })
      }
      let total = mockTableData.length
      mockTableData = mockTableData.filter((u, index) => index < 10 * page && index >= 10 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            tabledata: mockTableData
          }])
        }, 600)
      })
    })

    mock.onGet('InjuryMedicalTag/patientinfo').reply(config => {
      let {
        page,
        name
      } = config.params
      let mockTableData = _InjuryPeopleTable
      if (name !== '') {
        mockTableData = _InjuryPeopleTable.filter(tabledata => {
          if (name && tabledata.name.indexOf(name) === -1) {
            return false
          }
          return true
        })
      }     
      console.log(mockTableData)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            tabledata: mockTableData
          }])
        }, 600)
      })
    })

  }
}
