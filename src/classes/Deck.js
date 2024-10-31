import ActionCard from "./Cards/ActionCard"
import AlienCard from "./Cards/AlienCard"
import Card from "./Card"
import ItemCard from "./Cards/ItemCard"
import { randomId, sortRandom } from "./Utils"
import EventCard from "./Cards/EventCard"
import WoundCard from "./Cards/WoundCard"
import WeaknessCard from "./Cards/WeaknessCard"
import ObjectItemCard from "./Cards/ObjectItemCard"

export const replaceTrans = (msg, reverse = false) => {
  Object.keys(masterTrans).forEach(function(key) {
    if (reverse)
      msg = msg.replace(key, masterTrans[key].name)
    else 
      msg = msg.replace(masterTrans[key].name, key)
  })

  return msg
}

const duplicatedTrans = {
  infecting_the_host: { name: "แพร่เชื้อ", desc: "- คุณได้รับสถานะ “เมือกเขียว” <br /> - “ในที่มืด”: คุณได้รับการ์ด “ปนเปื้อน” 1 ใบ และถูกตัวอ่อนเอเลี่ยนฟักตัว หากมีตัวอ่อนเอเลี่ยนอยู่แล้ว คุณตายและกลายเป็น Larva" },
  evolve: { name: "วิวัฒนาการ", desc: "- Creeper กลายร่างเป็น Breeder <br /> - “ในที่มืด”: Breeder โจมตีด้วย Surprise Attack" },
  piercing_the_heart: { name: "ทะลุหัวใจ", desc: "- คุณได้รับความเสียหาย “แผลใหญ่” และได้รับการ์ด “ปนเปื้อน” 1 ใบ <br /> - “ในที่มืด”: หากคุณมี “แผลใหญ่” อย่างน้อย 2 แผล คุณตาย" },
  perched_in_dark: { name: "จู่โจมจากความมืด", desc: "- คุณได้รับความเสียหาย “แผลใหญ่” <br /> - “ในที่มืด”: หากคุณมี “แผลใหญ่” อย่างน้อย 3 แผล คุณตาย" },
  blood_chase: { name: "ตามกลิ่นเลือด", desc: "- คุณได้รับความเสียหาย “แผลเล็ก” และได้รับสถานะ “เมือกเขียว” <br /> - หากคุณถูกโจมตีจากการที่คุณวิ่งหนีและคุณมี “แผลใหญ่” อย่างน้อย 1 แผล เอเลี่ยนจะตามคุณไปด้วย" },
  blood_rage: { name: "นองเลือด", desc: "- หากคุณมี “แผลใหญ่” 2 แผล คุณตาย <br /> - หากคุณมี “แผลใหญ่” แต่ไม่ได้ทำแผล คุณได้รับความเสียหาย “แผลใหญ่” 2 แผล หากไม่ใช่ คุณได้รับความเสียหาย “แผลใหญ่” 1 แผล" },
  cut: { name: "เฉือน", desc: "- คุณได้รับความเสียหาย “แผลเล็ก” และได้รับการ์ด “ปนเปื้อน” 1 ใบ <br /> - “ในที่มืด”:  คุณได้รับความเสียหาย “แผลเล็ก” เพิ่มอีก 1 แผล" },
}

export const masterTrans = {
  // actions
  search: { name: "ค้นหาไอเทม", desc: "จั่วการ์ดไอเทม 2 ใบ ที่มีสีเดียวกับห้องที่ผู้เล่นอยู่ <br /> เลือกเก็บไว้ 1 ใบและทิ้งอีก 1 ใบ" },
  rest: { name: "พักผ่อน", desc: "สแกนการ์ด “ปนเปื้อน” บนมือทั้งหมด นำการ์ดที่ไม่ได้ติดเชื้อออกไป ถ้าพบการ์ดที่ติดเชื้อทำตามนี้:<br /> - หากคุณมีตัวอ่อนเอเลี่ยนภายในตัวอยู่แล้ว คุณตายและกลายเป็น Larva ทันที <br /> - หากไม่มี ตัวอ่อนเอเลี่ยนจะฟักภายในตัวคุณ" },
  interruption: { name: "ขัดขวาง", desc: "1. ใช้การ์ดใบนี้ในรอบผู้เล่นอื่นเพื่อยกเลิก Action ของผู้เล่นอื่น 1 คนที่อยู่ในห้องเดียวกับคุณ (ผู้เล่นคนนั้นยังคงต้องเสียการ์ดเป็นค่าใช้จ่ายของ Action นั้นอยู่) <br /> 2. ยกเลิกผลของการ์ด “ขัดขวาง” ของผู้เล่นอื่น" },
  demolition: { name: "ทำลาย", desc: "1. ทำลายประตูที่ปิดอยู่ ระหว่างทางเดินที่เชื่อมกับห้องของคุณ <br /> 2. พังห้องที่คุณอยู่" },
  basic_repairs: { name: "ซ่อมแซมแบบเดาสุ่ม", desc: "ซ่อมแซมห้องที่คุณอยู่" },
  repairs: { name: "ซ่อมแซม", desc: "ซ่อมแซมห้องที่คุณอยู่" },

  // lab rat
  feel_of_the_dark: { name: "สัมผัสแห่งความมืด", desc: "1. ใช้การ์ดใบนี้ในช่วง Event Phase เพื่อยกเลิกผลของ “ในที่มืด” จากการ์ด Event ที่เกิดกับตัวคุณ <br /> 2. “ในที่มืด”: ใช้การ์ดใบนี้เพื่อยกเลิกผลของ Surprise Attack ที่เกิดกับตัวคุณ" },
  sensitive_hearing: { name: "ได้ยินเสียงแปลกๆ", desc: "1. ทิ้ง Noise จากทางเดินที่ติดกับห้องของคุณ <br /> 2. สร้าง Noise จากทางเดินที่ติดกับห้องของคุณ" },
  weird_metabolism: { name: "เลือดปนเปื้อน", desc: "1. ลบสถานะ “เมือกเขียว” จากตัวคุณ <br /> 2. ทิ้งการ์ด “ปนเปื้อน” 1 ใบบนมือ และจั่วการ์ด 2 ใบ" },
  inconspicuous: { name: "เอาตัวรอด", desc: "1. ใช้การ์ดใบนี้เมื่อคุณถูกโจมตีและมีผู้เล่นอื่นอยู่ในห้องเดียวกัน ผู่เล่นคนนั้นจะตกเป็นเป้าหมายโจมตีแทน <br /> 2. “ในที่มืด”: ใช้การ์ดใบนี้เมื่อต้องทอยเต๋า Noise ใน Development Phase คุณไม่ต้องทอยเต๋า" },

  // survivor
  distraction: { name: "ดึงความสนใจ", desc: "หากคุณอยู่ในห้องเดียวกับเอเลี่ยน ทิ้งไอเทม 1 อย่าง เพื่อเคลื่อนที่ตัวคุณ และ/หรือ ผู้เล่นอื่น 1 คนในห้องให้ไปห้องอื่นได้โดยไม่ถูกโจมตี <br />(ผู้เล่นอีกฝ่ายต้องสมัครใจ)" },
  vents: { name: "มุดช่องแอร์", desc: "หากคุณอยู่ในห้องที่อยู่ติดกับช่องแอร์ สามารถเลือกไปโผล่พื้นที่อื่นที่อยู่ติดกับช่องแอร์ได้ (ต้องถูกสำรวจแล้ว)<br /> หากเลือกทำเช่นนั้น จะถือว่าคุณถูกโจมตีจาก Adult" },
  obstinate: { name: "ดันทุรัง", desc: "1. จั่วการ์ด 1 ใบต่อทุกๆ “แผลใหญ่” ที่คุณมี <br />2. ทิ้งไอเทม 1 อย่างและทำแผล “แผลใหญ่”" },
  desperate_attack: { name: "หมาจนตรอก", desc: "ได้รับการ์ด “ปนเปื้อน” 1 ใบ และคุณสร้างความเสียหาย 2 หน่วยให้กับเอเลี่ยน 1 ตัวในห้อง หากเอเลี่ยนยังไม่ตายคุณจะถูกโจมตีทันที" },
  
  // sentry
  defense_plan: { name: "แผนป้องกัน", desc: "1. หากคุณอยู่ในห้องสีขาวหรือสีแดง คุณสามารถใช้ห้องนั้นได้โดยไม่เสียค่าใช้จ่าย <br /> 2. เลือกส่องห้องที่ยังไม่ได้สำรวจ 2 ห้อง" },
  facility_tour: { name: "เดินชมโรงงาน", desc: "1. เคลื่อนที่คุณและผู้เล่นอื่นอีก 1 คนไปยังห้องอื่น <br /> คุณสามารถเลือกยกเลิกผลของการสำรวจห้องครั้งแรกได้ <br />" },
  quarantine: { name: "กักบริเวณ", desc: "หากอยู่ในห้องที่มีคอมพิวเตอร์ คุณสามารถเลือก 1 ห้อง ปิดประตูทุกบานที่เชื่อมกับห้องนั้น" },
  stun: { name: "สตั้น", desc: "1. เลือกผู้เล่นอื่น 1 คนในห้องเดียวกัน หากผู้เล่นคนนั้นมีการ์ด 3 ใบหรือน้อยกว่า เขาต้องทิ้งการ์ดบนมือทั้งหมด <br /> 2. ทิ้งอาวุธเพื่อโยนใส่เอเลี่ยน บังคับให้วิ่งหนีไปห้องอื่น" },

  // janitor
  clean_up: { name: "ทำความสะอาด", desc: "1. ซ่อมแซมห้องที่คุณอยู่ <br /> 2. ดับไฟห้องที่คุณอยู่" },
  maintenance_plan: { name: "ซ่อมบำรุง", desc: "1. หากคุณอยู่ในห้องสีขาวหรือสีเหลือง คุณสามารถใช้ห้องนั้นได้โดยไม่เสียค่าใช้จ่าย <br /> 2. เลือกส่องห้องที่ยังไม่ได้สำรวจ 2 ห้อง" },
  jury_rigging: { name: "ยอดนักประดิษฐ์", desc: "หากคุณอยู่ในห้องสีเหลือง ลดจำนวนไอเทมในห้องลง 1 หน่วยและเลือกสร้างได้ 1 อย่าง <br /> - เครื่องพ่นไฟ - ชุดกันรังสี - ปืนช็อตไฟฟ้า " },
  emergency_key: { name: "กุญแจสำรอง", desc: "1. หากคุณอยู่ใน “ห้องรอลิฟต์” คุณสามารถเรียกและใช้ลิฟต์ได้ (ต่อให้ไม่มีไฟฟ้าก็ใช้ได้) <br /> 2. เปิด/ปิด ประตู 1 บานในห้องที่คุณอยู่" },
  it_should_work: { name: "มันน่าจะเวิร์ค", desc: "1. คุณสามารถใช้ห้องได้ถึงแม้ว่าห้องจะพังอยู่ก็ตาม <br /> 2. คุณสามารถใช้คอมพิวเตอร์ได้แม้ว่าจะไม่มีไฟฟ้าก็ตาม" },

  // xeno
  rushed_analysis: { name: "วินิจฉัยอาการ", desc: "สแกนการ์ด “ปนเปื้อน” บนมือทั้งหมด นำการ์ดที่ไม่ได้ติดเชื้อออกไป หากคุณนำการ์ด “ปนเปื้อน” ออกไปสำเร็จคุณจะได้รับความรู้ 1 หน่วย <br /> หลังจากนั้นถ้าพบการ์ดที่ติดเชื้อทำตามนี้:<br /> - หากคุณมีตัวอ่อนเอเลี่ยนภายในตัวอยู่แล้ว คุณตายและกลายเป็น Larva ทันที <br /> - หากไม่มี ตัวอ่อนเอลี่ยนจะฟักภายในตัวคุณ" },
  workspace_plan: { name: "แผนการทำงาน", desc: "1. หากคุณอยู่ในห้องสีขาวหรือสีเขียว คุณสามารถใช้ห้องนั้นได้โดยไม่เสียค่าใช้จ่าย <br /> 2. เลือกส่องห้องที่ยังไม่ได้สำรวจ 2 ห้อง" },
  pheromones: { name: "ฟีโรโมน", desc: "เมื่อถูกโจมตี คุณสามารถเลือกทิ้งไข่เอเลี่ยนหรือศพเอเลี่ยน เพื่อยกเลิกผลของการโจมตีนั้น <br /> - คุณและผู้เล่นอื่นทุกคนในห้องนั้นจะได้รับสถานะ “เมือกเขียว” <br /> - “ความรู้ 6+”: คุณสามารถเลือกให้ผู้เล่นอื่นตกเป็นเป้าโจมตีแทนได้" },
  field_experience: { name: "ประสบการณ์ภาคสนาม", desc: "1. ลดจำนวนไอเทมในห้องลง 1 หน่วยและคุณได้รับความรู้เพิ่ม 1 หน่วย <br /> 2. “ความรู้ 4+”: จั่วการ์ด Event 2 ใบ หลังจากนั้นเลือก 1 ใบไว้บนสุดและอีกใบไว้ล่างสุดของกองไพ่ <br /> 3. “ความรู้ 6+”: จั่วการ์ด Alien Attack 2 ใบ หลังจากนั้นเลือก 1 ใบไว้บนสุดและอีกใบไว้ล่างสุดของกองไพ่" },
  vivisection: { name: "ฟาดด้วยแขนกล", desc: "ใช้ “แขนกล” เพื่อสร้างความเสียหาย 1 หน่วย เป้าหมายจะได้รับความเสียหายเพิ่มขึ้นอีก 1 หน่วยต่อทุกๆ 2 ความรู้ที่คุณมี หลังจากนั้น “แขนกล” จะสูญเสียความคงทน 1 หน่วย" },

  // hacker
  master_plan: { name: "แผนชั้นยอด", desc: "1. หากคุณอยู่ในห้องที่มีคอมพิวเตอร์ คุณสามารถใช้ห้องนั้นได้โดยไม่เสียค่าใช้จ่าย <br /> 2. เลือกส่องห้องที่ยังไม่ได้สำรวจ 2 ห้อง" },
  it_works_for_me: { name: "มันเวิร์คอยู่แล้ว", desc: "1. ซ่อมแซมห้องที่คุณอยู่ หากในห้องมีคอมพิวเตอร์และมีไฟฟ้า คุณสามารถใช้คอมพิวเตอร์ได้" },
  bypass: { name: "บายพาส", desc: "1. ใช้คอมพิวเตอร์ คุณสามารถทำเงื่อนไขของการ์ดคอมพิวเตอร์กี่อันก็ได้ <br /> 2. เปิด/ปิด ไฟฟ้าในโซนพื้นที่ของคุณ" },
  neuralink: { name: "เชื่อมต่อสมอง", desc: "หากคุณอยู่ในห้องที่ไม่มีคอมพิวเตอร์แต่มีไฟฟ้า (หรือมีคอมพิวเตอร์แต่ไม่มีไฟฟ้า) คุณสามารถใช้คอมพิวเตอร์ได้" },
  recharge: { name: "ชาร์จไฟฟ้า", desc: "หากคุณอยู่ในห้องที่มีมีไฟฟ้า คุณสามารถบรรจุกระสุน 2 ลูกให้กับอาวุธพลังงานได้" },

  // serious wound
  leg: { name: "ขา", desc: "ค่าใช้จ่ายของ Action ในการหนีจากเอเลี่ยนคือ 2 หน่วย" },
  hand: { name: "มือ", desc: "ค่าใช้จ่ายของ Action ในการใช้ไอเทมเพิ่มขึ้น 1 หน่วย" },
  body: { name: "ลำตัว", desc: "คุณถือการ์ดบนมือสูงสุดแค่ 4 ใบ" },
  eyes: { name: "ตา", desc: "คุณถือว่าอยู่ในสถานะ “ในที่มืด” ตลอดเวลา" },
  knee: { name: "เข่า", desc: "ค่าใช้จ่ายของ Action ในการเคลื่อนที่ครั้งแรกคือ 2 หน่วย (รวมทั้งการหนีด้วย)" },
  arm: { name: "แขน", desc: "คุณสามารถถือสิ่งของในช่องอาวุธได้แค่ 1 อย่าง หากคุณถือสิ่งของไว้ทั้ง 2 ข้าง คุณต้องเลือกทิ้ง 1 อย่าง" },
  guts: { name: "อวัยวะภายใน", desc: "หากคุณข้ามเทิร์น คุณจะได้รับการ์ด “ปนเปื้อน” 1 ใบ" },
  bleeding: { name: "เสียเลือด", desc: "หากคุณข้ามเทิร์น คุณจะได้รับความเสียหาย “แผลเล็ก” 1 แผล" },

  // item
  pistol: { name: "ปืนพก", desc: "อาวุธพลังงาน <br /> กระสุน 3/3 <br /> สร้างความเสียหายได้สูงสุดแค่ 1 หน่วยเสมอ" },
  flame_thrower: { name: "เครื่องพ่นไฟ", desc: "อาวุธคลาสสิค <br /> กระสุน 4/4 <br /> สร้างความเสียหายได้อย่างน้อย 1 หน่วยเสมอ (ยกเว้นโจมตีพลาด) <br /> หากสร้างความเสียหายได้ 2 หน่วย ห้องที่คุณอยู่จะถูกไฟเผา" },
  taser: { name: "ปืนช็อตไฟฟ้า", desc: "1. เลือกเอเลี่ยน 1 ตัวในห้องเพื่อสร้างความเสียหาย 1 หน่วยและบังคับให้หนีไปห้องอื่น <br /> 2. เลือกผู้เล่นอื่น 1 คนในห้อง ผู้เล่นคนนั้นต้องทิ้งการ์ดบนมือทั้งหมด" },
  enviro_suit: { name: "ชุดกันรังสี", desc: "ผลของสถานะ “เมือกเขียว” และความเสียหายจากไฟไม่มีผลกับคุณ <br /> คุณสามารถหนีออกจากโรงงานได้โดยไม่ต้องใช้รถ" },
  neutralizer: { name: "วัคซีน", desc: "สแกนการ์ด “ปนเปื้อน” ทั้งหมดบนมือและในเด็คของคุณ นำการ์ดที่ติดเชื้อออกไปและกำจัดตัวอ่อนเอเลี่ยนในตัวคุณ คุณต้องทิ้งการ์ดบนมือและการ์ดที่เหลืออยู่ในกองไพ่ทั้งหมดแล้วสับกองไพ่ หลังจากนั้นจบรอบการเล่นทันที" },
  emergency_access: { name: "กุญแจฉุกเฉิน", desc: "หากคุณอยู่ใน “ห้องรอลิฟต์” คุณสามารถเรียกและใช้ลิฟต์ได้ (ต่อให้ไม่มีไฟฟ้าก็ใช้ได้) " },
  thermite_charge: { name: "ระเบิดไฟประดิษฐ์", desc: "เลือกระเบิดห้อง 1 ห้อง (ห้องที่คุณอยู่หรือห้องข้างๆ) <br /> ห้องที่ถูกระเบิดจะถูกพังและถูกไฟไหม้ ส่วนผู้เล่นและเอเลี่ยนที่อยู่ในห้องเป้าหมายจะได้รับความเสียหาย 1 หน่วย (ผู้เล่นได้รับ “แผลเล็ก”)" },
  cave_plans: { name: "แปลนช่องแอร์", desc: "หากคุณอยู่ในห้องที่อยู่ติดกับช่องแอร์ สามารถเลือกไปโผล่พื้นที่อื่นที่อยู่ติดกับช่องแอร์ได้ (ต้องถูกสำรวจแล้ว)<br /> หากเลือกทำเช่นนั้น จะถือว่าคุณถูกโจมตีจาก Adult" },
  flashlight: { name: "ไฟฉาย", desc: "อาวุธพลังงาน <br /> พลังงาน 3 <br /> 1. คุณสามารถยกเลิกผลของ “ในที่มืด” ต่อตัวคุณได้เมื่อคุณตกเป็นเป้าหมายหรือคุณใช้การโจมตีระยะไกล หลังจากนั้นไฟฉายสูญเสียพลังงาน 1 หน่วย <br /> 2. “ความรู้ 5+”: หากคุณถูกเอเลี่ยนโจมตี คุณสามารถเปลี่ยนการ์ด Alien Attack ได้ใหม่ 1 ครั้ง หลังจากนั้นไฟฉายสูญเสียพลังงาน 1 หน่วย" },
  wrench: { name: "ประแจ", desc: "อาวุธประชิด <br /> 1. ทิ้งไอเทมนี้ โยนประแจเพื่อสร้างความเสียหายแบบการโจมตีระยะไกล <br /> 2. เปิด/ปิด ประตู 1 บาน" },
  crowbar: { name: "ชะแลง", desc: "อาวุธประชิด <br /> 1. ทิ้งไอเทมนี้ โยนชะแลงเพื่อสร้างความเสียหายแบบการโจมตีระยะไกล <br /> 2. ทำลายประตูที่ปิดอยู่ 1 บาน <br /> 3. พังห้องที่คุณอยู่" },
  clothes: { name: "เศษผ้า", desc: "1. ลบสถานะ “เมือกเขียว” <br /> 2. ทำแผล “แผลใหญ่”" },
  fire_blanket: { name: "ผ้าดับไฟ", desc: "1. ดับไฟห้องที่คุณอยู่ <br /> 2. ลบสถานะ “เมือกเขียว”" },
  reagent: { name: "ถังแก๊ส", desc: "1. เติมกระสุนเต็มถังให้กับเครื่องพ่นไฟ <br /> 2. “ความรู้ 5+”: โยนใส่เอลี่ยน 1 ตัวในห้อง บังคับให้หนีไปห้องอื่น" },
  duct_tape: { name: "เทปกาว", desc: "1. ซ่อมแซมห้องที่คุณอยู่ <br /> 2. รักษา “แผลเล็ก” 1 แผล" },
  grenade: { name: "ระเบิดมือ", desc: "เลือกห้องเป้าหมาย 1 ห้องที่มีเอเลี่ยนอยู่ (ห้องที่คุณอยู่หรือห้องข้างๆ) <br /> เอเลี่ยนเป้าหมายได้รับความเสียหาย 2 หน่วย ส่วนผู้เล่นและเอเลี่ยนที่อยู่ในห้องเป้าหมายจะได้รับความเสียหาย 1 หน่วย (ผู้เล่นได้รับ “แผลใหญ่”)" },
  door_pilot: { name: "แผงวงจรประตู", desc: "คุณเคลื่อนที่ไปห้องอื่นและปิดประตูบานที่คุณเคลื่อนที่ผ่าน" },
  scattergun: { name: "ปืนลูกซองเล็ก", desc: "อาวุธพลังงาน <br /> กระสุน 1/1 <br /> ใช้กระสุน 1 นัดเพื่อยิงล่อเอเลี่ยน คุณสามารถเคลื่อนที่ไปห้องอื่นได้โดยไม่ถูกโจมตี" },
  charged_rifle: { name: "ปืนไรเฟิล", desc: "อาวุธพลังงาน <br /> กระสุน 4/4 <br /> อาวุธชนิดนี้มาพร้อมกระสุนบรรจุเต็มแมกกาซีน" },
  prototype_shotgun: { name: "ปืนลูกซอง (ตัวต้นแบบ)", desc: "อาวุธพลังงาน <br /> กระสุน 1/2 <br /> สร้างความเสียหายได้อย่างน้อย 1 หน่วยเสมอ (ยกเว้นโจมตีพลาด) <br /> หากคุณโจมตีติด Critical คุณสร้างความเพิ่ม 1 หน่วย" },
  prototype_rifle: { name: "ปืนไรเฟิล (ตัวต้นแบบ)", desc: "อาวุธพลังงาน <br /> กระสุน 1/6 <br /> หากคุณโจมตีติด Critical x2 คุณสามารถจ่ายกระสุนเพิ่ม 1 นัดเพื่อสร้างความเพิ่ม 1 หน่วย" },
  prototype_pistol: { name: "ปืนพก (ตัวต้นแบบ)", desc: "อาวุธพลังงาน <br /> กระสุน 1/3 <br /> หากคุณโจมตีด้วยอาวุธนี้ คุณสามารถทอยเต๋าใหม่ได้ 1 ครั้งเพื่อเปลี่ยนผลลัพธ์การโจมตี" },
  main_gate_key: { name: "กุญแจประตูหน้า", desc: "หากคุณอยู่ในห้องที่มีคอมพิวเตอร์ คุณสามารถเปิดประตูหน้าได้" },
  caffeine_pills: { name: "ยาคาเฟอีน", desc: "จั่วการ์ด 3 ใบและแสดงให้ผู้เล่นคนอื่นเห็น หากมีการ์ด “ปนเปื้อน” ให้สแกนการ์ด “ปนเปื้อน” ทั้งหมดที่จั่วขึ้นมา <br /> - หากมีการ์ดติดเชื้อ ตัวอ่อนเอเลี่ยนจะฟักภายในตัวคุณ <br /> - หากคุณติดเชื้อและคุณมีตัวอ่อนเอเลี่ยนอยู่แล้ว คุณตายและกลายเป็น Larva ทันที" },
  evac_procedure: { name: "ไดรฟ์ข้อมูล", desc: "แอบดู “คำสั่งฉุกเฉิน” ของใครก็ได้" },
  glowstick: { name: "แท่งเรืองแสง", desc: "1. ยกเลิกผลของ “ในที่มืด” ต่อตัวคุณ <br /> 2. “ความรู้ 3+”: ใช้แท่งเรืองแสงโจมตีแทนอาวุธ เป้าหมายได้รับความเสียหาย 1 หน่วยและคุณจะไม่ได้รับการ์ด “ปนเปื้อน”" },
  cables: { name: "สายเคเบิ้ล", desc: "1. หากคุณอยู่ในห้องที่มีไฟฟ้า บรรจุกระสุนให้กับอาวุธพลังงานของคุณ <br /> 2. เปิด/ปิด ประตู 1 บาน" },
  toolbelt: { name: "ชุดเครื่องมือ", desc: "1. ซ่อมแซมห้องที่คุณอยู่ <br /> 2. เปิด/ปิด ประตู 1 บาน" },
  medical_stapler: { name: "เครื่องมือแพทย์", desc: "1. ทำแผล “แผลใหญ่” <br /> 2. รักษา “แผลเล็ก” ทั้งหมด" },
  weapon_battery: { name: "แบตเตอรี่", desc: "1. บรรจุกระสุน 3 ลูกให้กับอาวุธพลังงาน <br /> 2. ชาร์จไฟฟ้าเพื่อใช้คอมพิวเตอร์ในห้องที่ไม่มีไฟฟ้า" },
  scalpel: { name: "มีดผ่าตัด", desc: "1. คุณและผู้เล่นอื่น 1 คนในห้องเดียวกัน กำจัดตัวอ่อนเอเลี่ยนที่อยู่ภายในตัวออก หลังจากนั้นผู้เล่นจะได้รับ “แผลใหญ่” <br /> 2. เลือกเอเลี่ยน 1 ตัว สร้างความเสียหาย 1 หน่วย และคุณได้รับการ์ด “ปนเปื้อน” 1 ใบ" },
  research_documents: { name: "งานวิจัย", desc: "ได้รับความรู้ 1 หน่วยต่อทุกๆ 1 การค้นพบ “จุดอ่อนเอเลี่ยน”" },
  medkit: { name: "ชุดปฐมพยาบาล", desc: "1. ทำแผล “แผลใหญ่” <br /> 2. รักษา “แผลใหญ่” ที่ถูกทำแผลแล้ว" },
  analyze_toolset: { name: "ชุดเครื่องมือวิเคราะห์", desc: "1. ทิ้งซากศพเอเลี่ยนหรือไข่เอเลี่ยน เพื่อค้นพบ “จุดอ่อนเอเลี่ยน” 1 อย่าง และคุณได้รับความรู้ 3 หน่วย <br /> 2. สแกนการ์ด “ปนเปื้อน” บนมือทั้งหมด นำการ์ดที่ไม่ได้ติดเชื้อออกไป" },
  antiseptic: { name: "ยาฆ่าเชื้อ", desc: "นำการ์ด “ปนเปื้อน” 1 ใบออกไปจากมือคุณ" },

  // event
  panic: { name: "แตกตื่น", desc: "- ผู้เล่นที่ไม่มีการ์ดบนมือต้องเสียกระสุน 2 นัด หากไม่มีกระสุนพอต้องเสียไอเทม 1 อย่าง <br /> - “ในที่มืด”: ผลของการ์ดใบนี้ทำงานกับผู้เล่นที่มีการ์ดบนมือด้วย" },
  noise_in_corridors: { name: "เสียงในช่องแอร์", desc: "- วาง Noise ในช่องแอร์ หากมี Noise ในช่องแอร์อยู่แล้ว เลือกห้อง 2 ห้องให้ห้องนึงพัง ส่วนอีกห้องไฟไหม้ <br /> - “ในที่มืด”: ผู้เล่นที่อยู่ในห้องที่ติดกับช่องแอร์ได้รับความเสียหาย “แผลเล็ก”" },
  hatching: { name: "ฟักไข่", desc: "- หากมีผู้เล่นอยู่ในรัง และผู้เล่นไม่มีการ์ดบนมือ ตัวอ่อนเอเลี่ยนจะฟักไข่ในตัวผู้เล่นเหล่านั้น ถ้าไม่มีผู้เล่นคนไหนโดน Larva จะปรากฏในรัง หรือ “ห้องนิรภัย” <br /> - “ในที่มืด”: ผู้เล่นทุกคนที่ไม่ได้อยู่ในรัง หากไม่มีการ์ดบนมือจะถูกตัวอ่อนเอเลี่ยนจะฟักไข่ในตัว" },
  scent_of_prey: { name: "ได้กลิ่นความกลัว", desc: "- วาง Noise บนทางเดินว่างรอบๆห้องที่มีผู้เล่นที่มี “แผลใหญ่” แต่ไม่ได้ทำแผล <br /> - “ในที่มืด”: Adult จะปรากฏตัวแทนการวาง Noise (ผู้เล่นต้องไม่อยู่ในการต่อสู้)" },
  damage: { name: "ย่อยยับ", desc: "- พังห้องที่มีเอเลี่ยน Adult, Breeder, Queen ปรากฏตัวอยู่ <br /> - “ในที่มืด”: พังห้องที่มีผู้เล่นอยู่" },
  nest: { name: "รังเอเลี่ยน", desc: "- ถ้ารังถูกสำรวจแล้ว วาง Noise บนทางเดินว่างรอบๆห้องที่มีรังอยู่ <br /> - “ในที่มืด”: วาง Noise บนทางเดินว่างรอบๆห้องที่มีผู้เล่นอยู่" },
  egg_protection: { name: "หวงไข่", desc: "- เอเลียนปรากฏตัวในห้องเดียวกับผู้เล่นที่อยู่ในรังหรือกำลังถือไข่เอเลี่ยนอยู่ <br /> - “ในที่มืด”: ผู้เล่นทุกคนได้รับการ์ด “ปนเปื้อน” 1 ใบ" },
  lurking: { name: "ล่าถอย", desc: "- เอเลี่ยนทุกตัวที่ไม่ได้อยู่ห้องเดียวกันกับผู้เล่นจะกลับไปซ่อนตัว <br /> - “ในที่มืด”: ผู้เล่นที่อยู่ในการต่อสู้จะถูกโจมตี" },
  blood_trace: { name: "รอยเลือด", desc: "- ผู้เล่นที่มี “แผลใหญ่” แต่ไม่ได้ทำแผลและไม่มีการ์ดบนมือ จะได้รับความเสียหาย “แผลเล็ก” 1 แผล <br /> - “ในที่มืด”: ในแต่ละโซน เอเลี่ยนทุกตัวที่ไม่ได้อยู่ในการต่อสู้จะเคลื่อนที่ไปหาเล่นที่มี “แผลใหญ่” แต่ไม่ได้ทำแผลมากที่สุด <br /> หากผลลัพธ์ถูกยกเลิกเอเลี่ยนจะเลือกเป้าหมายใหม่" },
  leaving_the_shell: { name: "ลอกคราบ", desc: "- ผู้เล่นทุกคนที่มีตัวอ่อนเอเลี่ยนฟักอยู่ในตัว จะได้จั่วการ์ด “ปนเปื้อน” 1 ใบและต้องสแกนทันที ถ้าผู้เล่นติดเชื้อ ผู้เล่นตายและกลายเป็น Creeper ทันที <br /> - ส่วนผู้เล่นคนอื่นจั่วการ์ด 4 ใบและแสดงให้ทุกคนดู หากมีการ์ด “ปนเปื้อน” ต้องสแกนทันที ถ้าติดเชื้อตัวอ่อนเอเลี่ยนจะฟักภายในตัวผู้เล่น หลังจากนั้นทิ้งการ์ดทั้งหมดที่จั่วใน Event นี้" },
  bulkheads_open: { name: "ชนประตู", desc: "- เปิดประตูทุกบานที่ยังไม่ได้ถูกทำลาย <br /> - “ในที่มืด”: วาง Noise บนทางเดินรอบห้องที่มีผู้เล่นอยู่" },
  power_surge: { name: "ไฟดับ", desc: "ทุกโซนไฟดับ" },
  consuming_fire: { name: "ไฟลาม", desc: "ไอเทมทั้งหมดที่อยู่ในห้องที่ถูกไฟไหม้จะถูกทำลาย ไฟจะกระจายไปทุกๆห้องที่อยู่ติดห้องที่ถูกไฟไหม้ (ยกเว้นห้องที่ปิดประตูขวางไว้)" },
  fire_in_the_hole: { name: "เครื่องยนต์ระเบิด", desc: "“ห้อง CSS” ทุกห้องจะถูกไฟไหม้ หากผู้เล่นอยู่ในห้องเหล่านั้นและไม่มีการ์ดบนมือ จะได้รับความเสียหาย “แผลใหญ่”" },
  kickstopper: { name: "ลิฟต์ตก", desc: "- ไฟฟ้าในลิฟต์ดับ ห้องรอลิฟต์ทุกห้องถูกพังลง <br /> - นำการ์ดใบนี้ออกจากเกมส์ และสับกองการ์ด Event" },
  thats_hot: { name: "ไฟรั่ว", desc: "- “ห้องปั่นไฟ” และ “ห้องสำรองไฟ” ถูกไฟไหม้ <br /> - นำการ์ดใบนี้ออกจากเกมส์ และสับกองการ์ด Event" },
  short_circuit: { name: "ลัดวงจร", desc: "- ห้องทุกห้องที่มีคอมพิวเตอร์และมีไฟฟ้า ถูกไฟไหม้ <br /> - นำการ์ดใบนี้ออกจากเกมส์ และสับกองการ์ด Event" },
  blue_screen: { name: "จอฟ้า", desc: "- ห้องทุกห้องที่มีคอมพิวเตอร์และมีไฟฟ้า ถูกพังลง <br /> - นำการ์ดใบนี้ออกจากเกมส์ และสับกองการ์ด Event" },
  sanitary_network_failure: { name: "ท่อน้ำแตก", desc: "- ห้องสีเขียวทุกห้อง ถูกพังลง <br /> - นำการ์ดใบนี้ออกจากเกมส์ และสับกองการ์ด Event" },
  coolant_leak: { name: "ห้องหล่อเย็นระเบิด", desc: "- หาก “ห้องหล่อเย็น” พังอยู่ ระบบทำลายตัวเองจะนับเวลาถอยหลัง <br /> - ถ้าหากห้องยังไม่พังให้พังลงทันที <br /> - นำการ์ดใบนี้ออกจากเกมส์ และสับกองการ์ด Event" },

  // alien attack
  cut_0: duplicatedTrans.cut,
  cut_2: duplicatedTrans.cut,
  cut_3: duplicatedTrans.cut,
  cut_4: duplicatedTrans.cut,
  cut_5: duplicatedTrans.cut,
  perched_in_dark_0: duplicatedTrans.perched_in_dark,
  perched_in_dark_2: duplicatedTrans.perched_in_dark,
  perched_in_dark_4: duplicatedTrans.perched_in_dark,
  perched_in_dark_5: duplicatedTrans.perched_in_dark,
  perched_in_dark_5: duplicatedTrans.perched_in_dark,
  blood_rage_3: duplicatedTrans.blood_rage,
  blood_rage_5: duplicatedTrans.blood_rage,
  blood_chase_2: duplicatedTrans.blood_chase,
  blood_chase_4: duplicatedTrans.blood_chase,
  blood_chase_5: duplicatedTrans.blood_chase,
  piercing_the_heart_3: duplicatedTrans.piercing_the_heart,
  piercing_the_heart_5: duplicatedTrans.piercing_the_heart,
  infecting_the_host_4: duplicatedTrans.infecting_the_host,
  evolve_0: duplicatedTrans.evolve,
  evolve_4: duplicatedTrans.evolve,

  // weakness
  herding: { name: "ไล่ต้อน", desc: "เมื่อผู้เล่นทำให้เอเลี่ยนหนีไปห้องอื่น ผู้เล่นสามารถเลือกทางเดินที่เอเลี่ยนหนีได้" },
  not_afraid_of_the_dark: { name: "ไม่กลัวที่มืด", desc: "เมื่อผู้เล่นถูก Surprise Attack จะนับว่าอยู่ในที่สว่างเสมอ" },
  photosensitivity: { name: "ตาบอดสี", desc: "เมื่อใช้แท่งเรืองแสงโจมตี สร้างความเสียหายจาก 1 หน่วยเป็น 2 หน่วย" },
  vulnerability_to_fire: { name: "แพ้ไฟ", desc: "เมื่อเอเลี่ยนได้รับความเสียหายจากไฟ ระเบิดไฟประดิษฐ์ หรือเครื่องพ่นไฟ มันจะได้รับความเสียหายเพิ่มขึ้น 1 หน่วย" },
  fragile_endoskeleton: { name: "กระดูกเปราะบาง", desc: "หากผู้เล่นสร้างความเสียหายด้วยอาวุธคลาสสิคหรืออาวุธประชิด เอเลี่ยนจะได้รับความเสียหายเพิ่มขึ้น 1 หน่วย" },
  wary_of_shadows: { name: "ซ่อนในเงา", desc: "เมื่อ Adult โจมตีผู้เล่นด้วยการ์ด “จู่โจมจากความมืด” ผู้เล่นจะไม่ได้รับผล “ในที่มืด” ของการ์ดใบนั้น" },
}

export const itemObjectDeck = [
  new ObjectItemCard("egg"),
  new ObjectItemCard("egg"),
  new ObjectItemCard("egg"),
  new ObjectItemCard("egg"),
  new ObjectItemCard("egg"),
  new ObjectItemCard("egg"),
  new ObjectItemCard("egg"),
  new ObjectItemCard("egg"),

  new ObjectItemCard("corpse"),
  new ObjectItemCard("corpse"),
  new ObjectItemCard("corpse"),
  new ObjectItemCard("corpse"),
  new ObjectItemCard("corpse"),
  new ObjectItemCard("corpse"),

  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
  new ObjectItemCard("carcass"),
]

export const itemMedicDeck = [
  new ItemCard("reagent", "green"),
  new ItemCard("reagent", "green"),
  new ItemCard("reagent", "green"),
  new ItemCard("reagent", "green"),
  new ItemCard("reagent", "green"),
  new ItemCard("reagent", "green"),
  new ItemCard("antiseptic", "green"),
  new ItemCard("antiseptic", "green"),
  new ItemCard("analyze_toolset", "green"),
  new ItemCard("analyze_toolset", "green"),
  new ItemCard("medkit", "green"),
  new ItemCard("medkit", "green"),
  new ItemCard("medkit", "green"),
  new ItemCard("medkit", "green"),
  new ItemCard("medkit", "green"),
  new ItemCard("medkit", "green"),
  new ItemCard("medical_stapler", "green"),
  new ItemCard("medical_stapler", "green"),
  new ItemCard("medical_stapler", "green"),
  new ItemCard("medical_stapler", "green"),
  new ItemCard("clothes", "green"),
  new ItemCard("clothes", "green"),
  new ItemCard("clothes", "green"),
  new ItemCard("research_documents", "green"),
  new ItemCard("research_documents", "green"),
  new ItemCard("research_documents", "green"),
  new ItemCard("caffeine_pills", "green"),
  new ItemCard("caffeine_pills", "green"),
  new ItemCard("caffeine_pills", "green"),
  new ItemCard("scalpel", "green"),
]
export const itemWeaponDeck = [
  new ItemCard("weapon_battery", "red"),
  new ItemCard("weapon_battery", "red"),
  new ItemCard("weapon_battery", "red"),
  new ItemCard("weapon_battery", "red"),
  new ItemCard("weapon_battery", "red"),
  new ItemCard("weapon_battery", "red"),
  new ItemCard("weapon_battery", "red"),
  new ItemCard("weapon_battery", "red"),
  new ItemCard("medical_stapler", "red"),
  new ItemCard("crowbar", "red", "heavy"),
  new ItemCard("glowstick", "red"),
  new ItemCard("glowstick", "red"),
  new ItemCard("glowstick", "red"),
  new ItemCard("glowstick", "red"),
  new ItemCard("glowstick", "red"),
  new ItemCard("flashlight", "red", "heavy"),
  new ItemCard("evac_procedure", "red"),
  new ItemCard("caffeine_pills", "red"),
  new ItemCard("main_gate_key", "red"),
  new ItemCard("thermite_charge", "red"),
  new ItemCard("thermite_charge", "red"),
  new ItemCard("prototype_pistol", "red", "heavy"),
  new ItemCard("prototype_rifle", "red", "heavy"),
  new ItemCard("prototype_shotgun", "red", "heavy"),
  new ItemCard("charged_rifle", "red", "heavy"),
  new ItemCard("scattergun", "red", "heavy"),
  new ItemCard("door_pilot", "red"),
  new ItemCard("door_pilot", "red"),
  new ItemCard("grenade", "red"),
  new ItemCard("grenade", "red"),
]
export const itemEngineerDeck = [
  new ItemCard("cables", "orange"),
  new ItemCard("cables", "orange"),
  new ItemCard("cables", "orange"),
  new ItemCard("toolbelt", "orange"),
  new ItemCard("toolbelt", "orange"),
  new ItemCard("toolbelt", "orange"),
  new ItemCard("toolbelt", "orange"),
  new ItemCard("toolbelt", "orange"),
  new ItemCard("toolbelt", "orange"),
  new ItemCard("toolbelt", "orange"),
  new ItemCard("toolbelt", "orange"),
  new ItemCard("duct_tape", "orange"),
  new ItemCard("duct_tape", "orange"),
  new ItemCard("duct_tape", "orange"),
  new ItemCard("duct_tape", "orange"),
  new ItemCard("reagent", "orange"),
  new ItemCard("reagent", "orange"),
  new ItemCard("fire_blanket", "orange"),
  new ItemCard("fire_blanket", "orange"),
  new ItemCard("fire_blanket", "orange"),
  new ItemCard("clothes", "orange"),
  new ItemCard("crowbar", "orange", "heavy"),
  new ItemCard("wrench", "orange", "heavy"),
  new ItemCard("flashlight", "orange", "heavy"),
  new ItemCard("flashlight", "orange", "heavy"),
  new ItemCard("emergency_access", "orange"),
  new ItemCard("cave_plans", "orange"),
  new ItemCard("cave_plans", "orange"),
  new ItemCard("thermite_charge", "orange"),
  new ItemCard("thermite_charge", "orange"),
]
export const computerDeck = []

export const weaknessDeck = [
  new WeaknessCard("herding"),
  new WeaknessCard("not_afraid_of_the_dark"),
  new WeaknessCard("photosensitivity"),
  new WeaknessCard("vulnerability_to_fire"),
  new WeaknessCard("fragile_endoskeleton"),
  new WeaknessCard("wary_of_shadows"),
]

export const eventDeck = [
  new EventCard("coolant_leak"),
  new EventCard("sanitary_network_failure"),
  new EventCard("blue_screen"),
  new EventCard("short_circuit"),
  new EventCard("thats_hot"),
  new EventCard("kickstopper"),
  new EventCard("fire_in_the_hole"),
  new EventCard("consuming_fire"),
  new EventCard("power_surge"),
  new EventCard("bulkheads_open"),
  new EventCard("leaving_the_shell"),
  new EventCard("leaving_the_shell"),
  new EventCard("blood_trace"),
  new EventCard("blood_trace"),
  new EventCard("lurking"),
  new EventCard("egg_protection"),
  new EventCard("nest"),
  new EventCard("damage"),
  new EventCard("scent_of_prey"),
  new EventCard("hatching"),
  new EventCard("noise_in_corridors"),
  new EventCard("panic"),
]

export const alienAttackDeck = [
  new AlienCard("cut_0"),
  new AlienCard("cut_2"),
  new AlienCard("cut_3"),
  new AlienCard("cut_4"),
  new AlienCard("cut_5"),
  new AlienCard("perched_in_dark_0"),
  new AlienCard("perched_in_dark_2"),
  new AlienCard("perched_in_dark_4"),
  new AlienCard("perched_in_dark_5"),
  new AlienCard("perched_in_dark_5"),
  new AlienCard("blood_rage_3"),
  new AlienCard("blood_rage_5"),
  new AlienCard("blood_chase_2"),
  new AlienCard("blood_chase_4"),
  new AlienCard("blood_chase_5"),
  new AlienCard("piercing_the_heart_3"),
  new AlienCard("piercing_the_heart_5"),
  new AlienCard("infecting_the_host_4"),
  new AlienCard("evolve_0"),
  new AlienCard("evolve_4")
]

export const actionDeck = [
  new ActionCard("lab_rat", "inconspicuous"),
  new ActionCard("lab_rat", "weird_metabolism"),
  new ActionCard("lab_rat", "sensitive_hearing"),
  new ActionCard("lab_rat", "feel_of_the_dark"),
  new ActionCard("lab_rat", "interruption"),
  new ActionCard("lab_rat", "basic_repairs"),
  new ActionCard("lab_rat", "demolition"),
  new ActionCard("lab_rat", "rest"),
  new ActionCard("lab_rat", "search"),
  new ActionCard("lab_rat", "search"),

  new ActionCard("survivor", "desperate_attack"),
  new ActionCard("survivor", "obstinate"),
  new ActionCard("survivor", "vents"),
  new ActionCard("survivor", "distraction"),
  new ActionCard("survivor", "interruption"),
  new ActionCard("survivor", "repairs"),
  new ActionCard("survivor", "demolition"),
  new ActionCard("survivor", "rest"),
  new ActionCard("survivor", "search"),
  new ActionCard("survivor", "search"),

  new ActionCard("sentry", "stun"),
  new ActionCard("sentry", "quarantine"),
  new ActionCard("sentry", "facility_tour"),
  new ActionCard("sentry", "defense_plan"),
  new ActionCard("sentry", "interruption"),
  new ActionCard("sentry", "repairs"),
  new ActionCard("sentry", "demolition"),
  new ActionCard("sentry", "rest"),
  new ActionCard("sentry", "search"),
  new ActionCard("sentry", "search"),

  new ActionCard("janitor", "it_should_work"),
  new ActionCard("janitor", "emergency_key"),
  new ActionCard("janitor", "jury_rigging"),
  new ActionCard("janitor", "maintenance_plan"),
  new ActionCard("janitor", "interruption"),
  new ActionCard("janitor", "clean_up"),
  new ActionCard("janitor", "demolition"),
  new ActionCard("janitor", "rest"),
  new ActionCard("janitor", "search"),
  new ActionCard("janitor", "search"),

  new ActionCard("xenobiologist", "vivisection"),
  new ActionCard("xenobiologist", "field_experience"),
  new ActionCard("xenobiologist", "pheromones"),
  new ActionCard("xenobiologist", "workspace_plan"),
  new ActionCard("xenobiologist", "search"),
  new ActionCard("xenobiologist", "search"),
  new ActionCard("xenobiologist", "demolition"),
  new ActionCard("xenobiologist", "repairs"),
  new ActionCard("xenobiologist", "interruption"),
  new ActionCard("xenobiologist", "rushed_analysis"),

  new ActionCard("hacker", "recharge"),
  new ActionCard("hacker", "neuralink"),
  new ActionCard("hacker", "bypass"),
  new ActionCard("hacker", "it_works_for_me"),
  new ActionCard("hacker", "search"),
  new ActionCard("hacker", "search"),
  new ActionCard("hacker", "master_plan"),
  new ActionCard("hacker", "rest"),
  new ActionCard("hacker", "demolition"),
  new ActionCard("hacker", "interruption"),
]

export const contaminationDeck = [
  new ActionCard("infected", "contaminated"),
  new ActionCard("infected", "contaminated"),
  new ActionCard("infected", "contaminated"),
  new ActionCard("infected", "contaminated"),
  new ActionCard("infected", "contaminated"),
  new ActionCard("infected", "contaminated"),
  new ActionCard("infected", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
  new ActionCard("clean", "contaminated"),
]

export const woundDeck = [
  new WoundCard("leg"),
  new WoundCard("leg"),
  new WoundCard("leg"),
  new WoundCard("leg"),

  new WoundCard("hand"),
  new WoundCard("hand"),
  new WoundCard("hand"),
  new WoundCard("hand"),

  new WoundCard("body"),
  new WoundCard("body"),
  new WoundCard("body"),
  new WoundCard("body"),

  new WoundCard("eyes"),
  new WoundCard("eyes"),
  new WoundCard("eyes"),
  new WoundCard("eyes"),

  new WoundCard("knee"),
  new WoundCard("knee"),
  new WoundCard("knee"),
  new WoundCard("knee"),

  new WoundCard("arm"),
  new WoundCard("arm"),
  new WoundCard("arm"),
  new WoundCard("arm"),

  new WoundCard("guts"),
  new WoundCard("guts"),
  new WoundCard("guts"),
  new WoundCard("guts"),

  new WoundCard("bleeding"),
  new WoundCard("bleeding"),
  new WoundCard("bleeding"),
  new WoundCard("bleeding"),
]

export const itemCraftDeck = [
  new ItemCard("neutralizer", "blue"),
  new ItemCard("neutralizer", "blue"),
  new ItemCard("neutralizer", "blue"),
  new ItemCard("neutralizer", "blue"),
  new ItemCard("neutralizer", "blue"),

  new ItemCard("enviro_suit", "blue", "heavy"),
  new ItemCard("enviro_suit", "blue", "heavy"),
  new ItemCard("enviro_suit", "blue", "heavy"),
  new ItemCard("enviro_suit", "blue", "heavy"),
  new ItemCard("enviro_suit", "blue", "heavy"),

  new ItemCard("taser", "blue"),
  new ItemCard("taser", "blue"),
  new ItemCard("taser", "blue"),
  new ItemCard("taser", "blue"),
  new ItemCard("taser", "blue"),

  new ItemCard("flame_thrower", "blue", "heavy"),
  new ItemCard("flame_thrower", "blue", "heavy"),
  new ItemCard("flame_thrower", "blue", "heavy"),
  new ItemCard("flame_thrower", "blue", "heavy"),
  new ItemCard("flame_thrower", "blue", "heavy"),

  new ItemCard("pistol", "blue", "heavy"),
  new ItemCard("pistol", "blue", "heavy"),
  new ItemCard("pistol", "blue", "heavy"),
  new ItemCard("pistol", "blue", "heavy"),
  new ItemCard("pistol", "blue", "heavy"),
]

export const mapDeck = (cardId) => 
  itemMedicDeck.find(card => card.id === cardId) 
    || itemEngineerDeck.find(card => card.id === cardId) 
    || itemWeaponDeck.find(card => card.id === cardId)
    || itemCraftDeck.find(card => card.id === cardId)
    || computerDeck.find(card => card.id === cardId)
    || eventDeck.find(card => card.id === cardId)
    || actionDeck.find(card => card.id === cardId)
    || alienAttackDeck.find(card => card.id === cardId)
    || contaminationDeck.find(card => card.id === cardId)
    || woundDeck.find(card => card.id === cardId) 
    || weaknessDeck.find(card => card.id === cardId) 
    || itemObjectDeck.find(card => card.id === cardId) 
    
export const initItemMedicDeck = itemMedicDeck.map(card => card.id)
export const initItemEngineerDeck = itemEngineerDeck.map(card => card.id)
export const initItemWeaponDeck = itemWeaponDeck.map(card => card.id)
export const initItemCraftDeck = itemCraftDeck.map(card => card.id)
export const initComputerDeck = computerDeck.map(card => card.id)
export const initEventDeck = eventDeck.map(card => card.id)
export const initAlienAttackDeck = alienAttackDeck.map(card => card.id)
export const initContaminationDeck = contaminationDeck.map(card => card.id)
export const initWoundDeck = woundDeck.map(card => card.id)
export const initWeaknessDeck = weaknessDeck.map(card => card.id)
export const initItemObjectDeck = itemObjectDeck.map(card => card.id)

export const initActionDeck = {
  lab_rat: actionDeck.filter(card => card.subtype === "lab_rat").map(card => card.id),
  survivor: actionDeck.filter(card => card.subtype === "survivor").map(card => card.id),
  sentry: actionDeck.filter(card => card.subtype === "sentry").map(card => card.id),
  hacker: actionDeck.filter(card => card.subtype === "hacker").map(card => card.id),
  janitor: actionDeck.filter(card => card.subtype === "janitor").map(card => card.id),
  xenobiologist: actionDeck.filter(card => card.subtype === "xenobiologist").map(card => card.id)
}
