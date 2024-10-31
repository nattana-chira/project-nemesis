class Objective {
  id = null
  name = null
  type = null

  constructor(name, type) {
    this.id = id()
    this.name = name
    this.type = type
  }

  showName() {
    return masterTrans[this.name]?.name || this.name
  }

  showDesc() {
    return masterTrans[this.name]?.desc || this.desc
  }
}

let _id = 0
const id = () => {
  _id++
  return _id
}

const masterTrans = {
  kill_1: { name: "บาดหมาง", desc: "1. ผู้เล่น 1 ต้องไม่รอด <br /> 2. คุณต้องเป็นผู้รอดชีวิตคนเดียว" },
  kill_2: { name: "คิดไม่ซื่อ", desc: "1. ผู้เล่น 2 ต้องไม่รอด <br /> 2. คุณต้องเป็นผู้รอดชีวิตคนเดียว" },
  kill_3: { name: "หลอกใช้", desc: "1. ผู้เล่น 3 ต้องไม่รอด <br /> 2. คุณต้องเป็นผู้รอดชีวิตคนเดียว" },
  kill_4: { name: "แทงข้างหลัง", desc: "1. ผู้เล่น 4 ต้องไม่รอด <br /> 2. คุณต้องเป็นผู้รอดชีวิตคนเดียว" },
  kill_5: { name: "อิจฉา", desc: "1. ผู้เล่น 5 ต้องไม่รอด <br /> 2. คุณต้องเป็นผู้รอดชีวิตคนเดียว" },
  nemesis_what: { name: "ไม่มีโอกาสรอด", desc: "1. Lab Rat และ Survivor ต้องไม่รอด <br /> 2. คุณต้องเป็นผู้รอดชีวิตคนเดียว" },
  better_not_to_know: { name: "รู้มากเกินไป", desc: "ผู้เล่นที่มีความรู้ 3+ (รวมถึงตัวคุณด้วย) ต้องไม่รอด" },
  priceless_knowledge: { name: "ปกป้องโรงงาน", desc: "ส่ง “สัญญาณ” และโรงงานต้องไม่ถูกทำลาย" },
  waiting_for_rescue: { name: "ทำลายหลักฐาน", desc: "ส่ง “สัญญาณ” และระบบทำลายตัวเองถูกเปิดใช้งาน" },

  solid_proof: { name: "หลักฐานสำคัญ", desc: "ใช้งาน “ห้องเอกสาร” และรอดชีวิตโดยมีศพเอเลี่ยนในมือ" },
  treasures: { name: "แผน B", desc: "ใช้งาน “ห้องเอกสาร” และทุกๆห้องในโซน S-01 และ S-03 ต้องถูกสำรวจ" },
  learn_and_run: { name: "รู้แล้วหนี", desc: "“จุดอ่อนเอเลี่ยน” ต้องถูกค้นพบอย่างน้อย 2 อย่าง และคุณต้องมีความรู้ 7+" },
  golden_eggs: { name: "ไข่ทองคำ", desc: "1. หนีออกจากโรงงานด้วย CSS Pod โดยมีไข่เอเลี่ยนในมือ <br /> 2. ใช้งาน “ห้องเอกสาร” และรอดชีวิตโดยมีไข่เอเลี่ยนในมือ" },
  great_hunt: { name: "นักล่าเอเลี่ยน", desc: "1. ส่ง “สัญญาณ” และ Queen ต้องถูกฆ่า <br /> 2. ส่ง “สัญญาณ” และโรงงานต้องถูกทำลาย" },
  last_stand: { name: "ฆ่าล้างโคตร", desc: "1. ส่ง “สัญญาณ” และ ไข่เอเลี่ยนทุกใบในรังต้องถูกทำลาย <br /> 2. ส่ง “สัญญาณ” และโรงงานต้องถูกทำลาย" },
  base_plans: { name: "แผน A", desc: "1. ส่ง “สัญญาณ” และทุกๆห้องในโซน S-01 และ S-02 ต้องถูกสำรวจ" },
  best_friends_forever: { name: "Best Friend Forever", desc: "คุณและผู้เล่นอื่นอึก 1 คน ต้องเป็นผู้รอดชีวิตแค่ 2 คนเท่านั้น" },
  ultimate_knowledge: { name: "อัจฉริยะ", desc: "ส่ง “สัญญาณ” และคุณต้องมีความรู้ 6+" },
}

const objectives = [
  new Objective("kill_1", "coop"),
  new Objective("kill_2", "coop"),
  new Objective("kill_3", "coop"),
  new Objective("kill_4", "coop"),
  new Objective("kill_5", "coop"),
  new Objective("nemesis_what", "coop"),
  new Objective("better_not_to_know", "coop"),
  new Objective("priceless_knowledge", "coop"),
  new Objective("waiting_for_rescue", "coop"),

  new Objective("solid_proof", "personal"),
  new Objective("treasures", "personal"),
  new Objective("learn_and_run", "personal"),
  new Objective("golden_eggs", "personal"),
  new Objective("great_hunt", "personal"),
  new Objective("last_stand", "personal"),
  new Objective("base_plans", "personal"),
  new Objective("best_friends_forever", "personal"),
  new Objective("ultimate_knowledge", "personal"),
]

export const mapObjectives = (objId) => objectives.find(obj => obj.id === objId)

export const initObjectives = objectives.map(obj => obj.id)
