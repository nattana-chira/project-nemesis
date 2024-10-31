import { randomId } from "./Utils"

class Contingency {
  id = null
  name = null

  constructor(name) {
    this.id = cardId()
    this.name = name
  }

  showName() {
    return masterTrans[this.name]?.name || this.name
  }

  showDesc() {
    return masterTrans[this.name]?.desc || this.desc
  }
}

let _cardId = 0
const cardId = () => {
  _cardId++
  return _cardId
}

const masterTrans = {
  green: { name: "รหัสเขียว", desc: "ช่วยทุกคน" },
  yellow: { name: "รหัสเหลือง", desc: "ฆ่าทุกคนที่มีความรู้ 4- (ยกเว้นคนที่หนีด้วย CSS Pod)" },
  blue: { name: "รหัสฟ้า", desc: "ฆ่าทุกคนที่ไม่ได้ส่ง “สัญญาน” (ยกเว้นคนที่หนีด้วย CSS Pod)" },
  red: { name: "รหัสแดง", desc: "ฆ่าทุกคนที่อยู่ใน “ห้องกักตัว”" },
  black: { name: "รหัสดำ", desc: "ฆ่าทุกคนที่หนีด้วย CSS Pod" },
}

export const contingencies = [
  new Contingency("red"),
  new Contingency("blue"),
  new Contingency("blue"),
  new Contingency("yellow"),
  new Contingency("yellow"),
  new Contingency("green"),
  new Contingency("black"),
]

export const mapContingencies = (conId) => contingencies.find(con => con.id === conId)

export const initContingencies = contingencies.map(con => con.id)