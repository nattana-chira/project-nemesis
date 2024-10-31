export default class Explore {
  id = null
  itemCounter = 0
  result = null

  constructor(itemCounter, result) {
    this.id = id()
    this.itemCounter = itemCounter
    this.result = result
  }

  showName() {
    return trans[this.name]?.name || this.name
  }

  showDesc() {
    return trans[this.name]?.desc
  }
}

let _id = 0
const id = () => {
  _id++
  return _id
}

const trans = {
  silence: { name: "เงียบกริบ", desc: "ผู้เล่นที่สำรวจไม่ต้องทอยเต๋า Noise ในการเคลื่อนที่ครั้งนี้ แต่ถ้าหากผู้เล่นติดสถานะ “เมือกเขียว” ผู้เล่นจะได้รับผลจากการสำรวจ “อันตราย” แทน" },
  danger: { name: "อันตราย", desc: "- ผู้เล่นที่สำรวจไม่ต้องทอยเต๋า Noise ในการเคลื่อนที่ครั้งนี้ เอเลี่ยนทุกตัวที่อยู่ห้องข้างๆและไม่ได้อยู่ในการต่อสู้ เคลื่อนที่มายังห้องนี้ (หากมีประตูขวางให้พังประตูแทน) <br />- หากไม่มีเอเลี่ยนเคลื่อนที่มาห้องนี้เลย วาง Noise บนทางเดินว่างรอบๆห้องนี้" },
  malfunction: { name: "พัง", desc: "ห้องถูกพัง" },
  fire: { name: "ไฟ", desc: "ห้องถูกไฟไหม้" },
  slime: { name: "เมือกเขียว", desc: "ผู้เล่นที่สำรวจได้รับสถานะ “เมือกเขียว”" },
  door: { name: "ประตู", desc: "ประตูระหว่างห้องที่คุณเคลื่อนที่มาถูกปิดลง" },
}

export const explores = [
  new Explore(1, "silence"),
  new Explore(1, "malfunction"),
  new Explore(1, "malfunction"),
  new Explore(1, "door"),
  new Explore(1, "door"),

  new Explore(2, "silence"),
  new Explore(2, "malfunction"),
  new Explore(2, "malfunction"),
  new Explore(2, "danger"),
  new Explore(2, "door"),
  new Explore(2, "fire"),

  new Explore(3, "fire"),
  new Explore(3, "malfunction"),
  new Explore(3, "malfunction"),
  new Explore(3, "danger"),
  new Explore(3, "slime"),
  new Explore(3, "door"),

  new Explore(4, "danger"),
  new Explore(4, "fire"),
  new Explore(4, "slime"),
]

export const mapExplores = (id) => explores.find(explore => explore.id === id)

export const initExplores = explores.map(explore => explore.id)