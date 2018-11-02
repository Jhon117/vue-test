import Mock from 'mockjs'
// state: 1.等待救治 2.正在救治 3.救治成功 4.需要转移
// transfer: 1.机车 2.直升机 3.轮船
// recievestate: 1.等待运送 2.运送途中 3.已经送达
const HospitalTable = [{
  date: '2018-12-09',
  name: '魏子博',
  cardno: ' 26571',
  address: '232256 部队 中士',
  state: '等待救治',
  injury: '轻度'
}, {
  date: '2018-12-09',
  name: '郭占泽',
  cardno: ' 10891',
  address: '26571 部队 班长',
  state: '等待救治',
  injury: '中度'
}, {
  date: '2018-12-10',
  name: '崔洪铭',
  cardno: ' 22901',
  address: '232256 部队 三等兵',
  state: '正在救治',
  injury: '中度'
}, {
  date: '2018-12-10',
  name: '杨明坤',
  cardno: ' 11452',
  address: '22901 部队 班长',
  state: '等待救治',
  injury: '重度'
}, {
  date: '2018-12-11',
  name: '麦淞玮',
  cardno: ' 91742',
  address: '11452 部队 三等兵',
  state: '救治成功',
  injury: '轻度'
}]

const HospitalTable2 = []

const HospitalTable3 = []

const injurySit = ['轻度', '中度', '重度', '危重']
const stateSit = ['等待救治', '正在救治', '救治成功', '需要转移']
const receiveSit = ['等待运送', '运送途中', '已经送达']
const transferSit = ['机车', '直升机', '轮船']

for (let i = 0; i < 70; i++) {
  HospitalTable.push(Mock.mock({
    date: Mock.Random.date(),
    name: Mock.Random.cname(),
    cardno: Mock.Random.integer(10000, 99999),
    state: stateSit[Mock.Random.integer(0, 3)],
    injury: injurySit[Mock.Random.integer(0, 3)]
  }))
}

for (let i = 0; i < 20; i++) {
  HospitalTable2.push(Mock.mock({
    date: Mock.Random.date(),
    name: Mock.Random.cname(),
    cardno: Mock.Random.integer(10000, 99999),
    receivestate: receiveSit[Mock.Random.integer(0, 2)],
    transferstate: transferSit[Mock.Random.integer(0, 2)],
    injury: injurySit[Mock.Random.integer(0, 3)]
  }))
}

for (let i = 0; i < 20; i++) {
  HospitalTable3.push(Mock.mock({
    date: Mock.Random.date(),
    name: Mock.Random.cname(),
    cardno: Mock.Random.integer(10000, 99999),
    receivestate: receiveSit[Mock.Random.integer(0, 2)],
    transferstate: transferSit[Mock.Random.integer(0, 2)],
    injury: injurySit[Mock.Random.integer(0, 3)]
  }))
}

export {
  HospitalTable,
  HospitalTable2,
  HospitalTable3,
  injurySit,
  stateSit,
  receiveSit,
  transferSit
}
