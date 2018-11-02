import Mock from 'mockjs'

const InjuryPeopleTable = []

const injurySit = ['轻度', '中度', '重度', '危重']
const sexInfo = ['男', '女']
const bloodInfo = ['A', 'B', 'AB', 'O']

for (let i = 0; i < 40; i++) {
  InjuryPeopleTable.push(Mock.mock({
    date: Mock.Random.date(),
    name: Mock.Random.cname(),
    cardno: Mock.Random.integer(10000, 19999),
    injury: injurySit[Mock.Random.integer(0, 3)],
    sex: sexInfo[Mock.Random.integer(0, 1)],
    blood: bloodInfo[Mock.Random.integer(0, 3)],
    patientCard: Mock.Random.integer(10000000, 19999999),
    injuryDate: Mock.Random.date(),
    receiveDate: Mock.Random.date(),
    sentDate: Mock.Random.date(),
    breath: Mock.Random.integer(40, 90),
    waitingpercent: Mock.Random.integer(0, 100),
    completepercent: Mock.Random.integer(0, 100),
    inspectpercent: Mock.Random.integer(0, 100),
    vertifypercent: Mock.Random.integer(0, 100),
    recoverpercent: Mock.Random.integer(0, 100),
  }))
}

export {
  InjuryPeopleTable
}
