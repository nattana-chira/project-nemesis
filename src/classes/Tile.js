export default class Tile {
  name = null
  itemCounter = 0
  color = null
  type = null
  actions = []
  isDiscovered = false
  exploreId = null

  constructor(name, type, color, ...actions) {
    this.name = name
    this.type = type
    this.color = color
    this.actions = actions
  }
  
  static showName(tile) {
    return trans[tile.name]?.name || this.name
  }

  static showDesc(tile) {
    return trans[tile.name]?.desc
  }

  static showActionName(action) {
    return trans[action]?.name || action
  }

  static showActionDesc(action) {
    return trans[action]?.desc
  }
}

const trans = {
  // actions
  archive: { name: "ห้องเอกสาร", desc: "" },
  cave_entrance: { name: "ทางเข้าถ้ำ", desc: "" },
  cooling_system: { name: "ห้องหล่อเย็น", desc: "" },
  decon_room: { name: "ห้องฆ่าเชื้อ", desc: "" },
  emergency_room: { name: "ห้องฉุกเฉิน", desc: "" },
  laboratory: { name: "ห้องแล็บ", desc: "" },
  cargo_sending_system_a: { name: "ห้อง CSS A", desc: "" },
  cargo_sending_system_b: { name: "ห้อง CSS B", desc: "" },
  cargo_sending_system_c: { name: "ห้อง CSS C", desc: "" },
  nest: { name: "รัง", desc: "- ผู้เล่นที่สำรวจห้องนี้เป็นคนแรก ได้รับความรู้ 1 หน่วย <br />- รังไม่สามารถถูกพังได้ <br />- หากในรังไม่เหลือไข่เอเลี่ยนเลย จะถือว่ารังถูกทำลาย <br />- หากมีไฟไหม้ในรัง ในทุกๆรอบ Event ไข่เอเลี่ยนในรัง 1 ใบจะถูกทำลาย <br />- ทำลายไข่เอเลี่ยน ผู้เล่นสามารถโจมตีไข่เอเลี่ยนที่อยู่บนพื้นห้องได้ ผู้เล่นจะไม่ได้รับการ์ด “ปนเปื้อน” แม้จะโจมตีพลาด และทุกๆครั้งที่หลังจากผู้เล่นพยายามโจมตีไข่เอเลี่ยน ผู้เล่นต้องทอยเต๋า Noise" },
  power_generator: { name: "ห้องปั่นไฟ", desc: "" },
  transmitter_control_room: { name: "ห้องส่งสัญญาณ", desc: "" },
  
  css_control_room: { name: "ห้องควบคุม CSS", desc: "" },
  defense_control_room: { name: "ห้องรักษาความปลอดภัย", desc: "" },
  guard_room: { name: "ห้องพักเจ้าหน้าที่", desc: "" },
  contaminated_room: { name: "ห้องปนเปื้อน", desc: "- หากผู้เล่นค้นหาไอเทมในห้องนี้ ผู้เล่นได้รับสถานะ “เมือกเขียว” <br />- ห้องนี้ไม่สามารถถูกพังได้" },
  surgery_room: { name: "ห้องผ่าตัด", desc: "" },
  testing_lab: { name: "ห้องยา", desc: "" },
  vent_control_room: { name: "ห้องระบบแอร์", desc: "" },

  backup_power_supply: { name: "ห้องสำรองไฟ", desc: "" },
  repository: { name: "ห้องเก็บของ", desc: "ผู้เล่นเริ่มเกมส์ที่ห้องนี้ (ยกเว้น Lab Rat และ Survivor)" },
  isolation_room: { name: "ห้องนิรภัย", desc: "Lab Rat และ Survivor เริ่มเกมส์ที่ห้องนี้ <br />- เมื่อเริ่มรอบการเล่น ผู้เล่นสามารถจั่วการ์ดเพิ่มและถือการ์ดบนมือได้สูงสุดเป็น 6 ใบจาก 5 ใบ (ไม่ทำงานหากห้องพังอยู่)" },
  alert_room: { name: "ห้องสัญญาณเตือนภัย", desc: "" },
  elevetor_room: { name: "ห้องรอลิฟต์", desc: "ผู้เล่นสามารถใช้งานห้องนี้ได้ก็ต่อเมื่อห้องนี้มีไฟฟ้า" },
  empty_room: { name: "ห้องว่าง", desc: "" },


  examine_the_archives: { name: "ค้นเอกสาร", desc: "ได้รับความรู้ 2 หน่วยและได้รับสถานะ “มีความรู้” หลังจากนั้น คุณสามารถแอบดู “คำสั่งฉุกเฉิน” ของใครก็ได้ (ใช้ได้ครั้งเดียวในเกมส์)" },
  move_to_vents: { name: "มุดช่องแอร์", desc: "สามารถเลือกไปโผล่พื้นที่อื่นที่อยู่ติดกับช่องแอร์ได้ (ต้องถูกสำรวจแล้ว) <br /> หากเลือกทำเช่นนั้น จะถือว่าคุณถูกโจมตีจาก Adult “ในที่มืด”" },
  initiate_autodes_seq: { name: "เปิดระบบทำลายตัวเอง", desc: "- เปิดระบบทำลายตัวเอง โดยจะนับถอยหลังเพื่อทำลายโรงงานในอีก 7 รอบการเล่น ผู้เล่นสามารถหยุดระบบทำลายตัวเองได้ภายใน 4 รอบการเล่นใน “ห้องปั่นไฟ” <br />- หลังจากผ่านไป 4 รอบการเล่นหากระบบทำลายตัวเองไม่ถูกหยุดลง ประตูหน้าจะเปิดออกโดยอัตโนมัติ <br />- หลังจากผ่านไป 7 รอบการเล่นโรงงานจะระเบิดและถูกทำลาย ผู้เล่นและเอเลี่ยนทั้งหมดที่ยังอยู่ในโรงงานตาย" },
  decontaminate: { name: "ฆ่าเชื้อ", desc: "- แสกนการ์ด “ปนเปื้อน” ทั้งหมดบนมือ นำการ์ดที่ติดเชื้อออกไปและกำจัดตัวอ่อนเอเลี่ยนในตัวคุณ <br />- ลบสถานะ “เมือกเขียว”" },
  treat_wounds: { name: "รักษาแผล", desc: "1. ทำแผล “แผลใหญ่” ทั้งหมด <br /> 2. รักษา “แผลใหญ่” ที่ถูกทำแผลแล้ว 1 แผล <br /> 3. รักษา “แผลเล็ก” ทั้งหมด" },
  analyze_object: { name: "วิเคราะห์", desc: "- เลือกใช้ ศพผู้เล่น, ศพเอเลี่ยน หรือไข่เอเลี่ยน ในมือเพื่อทำการวิเคราะห์ ได้รับความรู้ 3 หน่วย <br />- หากวัตถุนั้นไม่เคยถูกวิเคราะห์มาก่อน คุณจะค้นพบ “จุดอ่อนเอเลี่ยน” 1 อย่าง" },
  enter_css_pod: { name: "แอบในกล่องสินค้า", desc: "หากในรอบการเล่นนี้ “CSS POD” จะทำงาน คุณสามารถเข้าไปแอบในกล่องสินค้าเพื่อหนีออกจากโรงงานได้ (ต้องไม่มีผู้เล่นอื่นแอบอยู่) หลังจากนั้น ทิ้งการ์ดบนมือทั้งหมดและจบรอบการเล่น คุณจะไม่ตกเป็นเป้าหมายของการโจมตีหรือผลจากการ์ดใดๆ <br />- ในรอบการเล่นถัดมา หากคุณล้มเหลวในการหนี คุณจะได้รับความเสียหาย “แผลใหญ่”" },
  take_egg: { name: "ขโมยไข่", desc: "ขโมยไข่จากรัง หลังจากนั้นทอยเต๋า Noise" },
  stop_autodes_seq: { name: "หยุดระบบทำลายตัวเอง", desc: "หยุดระบบทำลายตัวเอง" },
  power_a_section: { name: "เปิดระบบไฟฟ้า", desc: "เปิดระบบไฟฟ้าให้กลับมาทำงานในโซนนี้" },
  send_a_signal: { name: "ส่งสัญญาณ", desc: "ส่ง “สัญญาณ” ขอความช่วยเหลือ" },
  check_an_objective: { name: "แอบดูภารกิจ", desc: "เลือกผู้เล่นอื่น 1 คนที่ส่ง “สัญญาณ” คุณสามารถแอบดูภารกิจของผู้เล่นนั้นได้" },

  schedule_css: { name: "เปลี่ยนกำหนดการ CSS", desc: "- แอบดู CSS Token ได้ 1 ครั้ง และคุณสามารถเลื่อนกำหนดการ CSS Token อันนั้นให้ช้าลงหรือว่าเร็วขึ้นได้ 1 รอบการเล่น <br />- ไม่สามารถเลื่อนกำหนดการไปซ้ำรอบกับ CSS Token อันอื่นได้ <br />- - ไม่สามารถเลื่อนกำหนดการมาตำแหน่งเดียวกันกับรอบการเล่นได้" },
  exterminate: { name: "กำจัดภัยคุกคาม", desc: "ลดจำนวนไอเทมในห้องลง 1 หน่วยหรือพังห้องนี้ เลือกห้องอื่น 1 ห้องที่ยังไม่พังและมีเอเลี่ยนอยู่ พังห้องนั้นลง เอเลี่ยนทุกตัวในห้องได้รับความเสียหาย 1 หน่วย ผู้เล่นทุกคนในห้องได้รับความเสียหาย “แผลใหญ่”" },
  take_equipment: { name: "ค้นล็อคเกอร์", desc: "ลดจำนวนไอเทมในห้องลง 1 หน่วย เลือกได้รับ 1 อย่าง <br />- ปืนช็อตไฟฟ้า <br />- ชุดกันรังสี" },
  perform_surgery: { name: "ผ่าตัด", desc: "สแกนการ์ด “ปนเปื้อน” ทั้งหมดบนมือและในเด็คของคุณ นำการ์ดที่ติดเชื้อออกไปและกำจัดตัวอ่อนเอเลี่ยนในตัวคุณ คุณต้องทิ้งการ์ดบนมือและการ์ดที่เหลืออยู่ในกองไพ่ทั้งหมดแล้วสับกองไพ่ คุณได้รับความเสียหาย “แผลเล็ก” หลังจากนั้นจบรอบการเล่นทันที" },
  take_neutralizer: { name: "ค้นหาวัคซีน", desc: "“ความรู้ 4+”: ได้รับวัคซีน" },
  vent_out: { name: "ดูดออกซิเจน", desc: "เลือก 1 ห้องที่ติดกับช่องแอร์ ห้องที่คุณเลือกต้องไม่มีประตูที่ถูกทำลาย ปิดประตูทุกบานในห้องนั้น ดับไฟในห้อง <br />- หากจบรอบการเล่นประตูไม่ถูกเปิดหรือทำลาย ออกซิเจนในห้องจะถูกดูดออกไปทิ้งหมด ผู้เล่นและเอเลี่ยนทั้งหมดในห้องนั้นตาย" },

  restore_power: { name: "สำรองไฟ", desc: "- ไฟฟ้าหมายเลขต่ำที่สุด 2 หมายเลขถูกเปิดใช้งาน ไฟฟ้าหมายเลขอื่นถูกปิดใช้งาน (ผู้เล่นเลือกที่จะไม่ทำข้อนี้ได้) <br />- เลือกสลับตำแหน่งหมายเลขไฟฟ้าทั้งหมด <br />- เปิดระบบสำรองไฟ (ไฟฟ้าจะไม่ดับหากเกิด “ไฟรั่ว”)" },
  craft_item: { name: "สร้างไอเทม", desc: "คราฟไอเทมด้วยเครื่องมือ โดยจะเสียไอเทมที่ใช้เป็นวัตถุดิบแค่ 1 อย่างเท่านั้น" },
  lock_self: { name: "ขังตัวเอง", desc: "ในรอบการเล่นที่ 8 เป็นต้นไป หรือเมื่อระบบสัญญาณเตือนภัยถูกเปิด ห้องนี้จะถูกเปิดให้ใช้งาน ผู้เล่นสามารถเลือก “ขังตัวเอง” ในห้องนี้ได้ หากเลือกทำเช่นนั้น ทอยเต๋า Noise <br />- หากมีเอเลี่ยนปรากฏตัวขึ้น จะถือว่าการ “ขังตัวเอง” ล้มเหลว <br />- หากไม่มีเอเลี่ยนปรากฏตัว หลังจากนี้ตลอดทั้งเกมส์ คุณจะไม่สามารถทำอะไรได้อีก และคุณจะไม่ตกเป็นเป้าหมายของการโจมตีหรือการ์ดใดๆ" },
  start_alert: { name: "เปิดระบบสัญญาณเตือนภัย", desc: "นำรอบการเล่นมาหารด้วย 2 โดยปัดเศษลง เกมส์จะสิ้นสุดลงทันทีเมื่อจบรอบการเล่นนั้น (เช่น รอบการเล่นที่ 11 เกมส์จะจบลงเมื่อจบรอบการเล่นที่ 5) <br />- “ห้องนิรภัย” จะถูกเปิดออก ผู้เล่นสามารถ “ขังตัวเอง” ในห้องนั้นได้ " },
  peek_contingency: { name: "ดูคำสั่งฉุกเฉิน", desc: "แอบดู “คำสั่งฉุกเฉิน” จากกองกลาง" },
  call_elevator: { name: "เรียกลิฟต์", desc: "[1] เรียกลิฟต์มายังห้องนี้" },
  use_elevator: { name: "ใช้ลิฟต์", desc: "[1] เคลื่อนที่ลิฟต์และตัวผู้เล่นไปยัง “ห้องรอลิฟต์” ในโซนอื่น โดยคุณสามารถพาผู้เล่นอื่นไปพร้อมกันกับคุณได้ (หากผู้เล่นอื่นยินยอม) <br />- การเคลื่อนที่ด้วยลิฟต์นั้น ผู้เล่นไม่ต้องทอยเต๋า Noise" },
}

const tiles = [
  new Tile("archive", "basic_1", "white", "examine_the_archives"),
  new Tile("cave_entrance", "basic_1", "yellow", "move_to_vents"),
  new Tile("cooling_system", "basic_1", "yellow", "initiate_autodes_seq"),
  new Tile("decon_room", "basic_1", "white", "decontaminate"),
  new Tile("emergency_room", "basic_1", "green", "treat_wounds"),
  new Tile("laboratory", "basic_1", "green", "analyze_object"),
  new Tile("cargo_sending_system_a", "basic_1", "white", "enter_css_pod"),
  new Tile("nest", "basic_1", null, "take_egg"),
  new Tile("power_generator", "basic_1", "yellow", "stop_autodes_seq", "power_a_section"),
  new Tile("transmitter_control_room", "basic_1", "red", "send_a_signal", "check_an_objective"),

  new Tile("cargo_sending_system_b", "basic_2", "white", "enter_css_pod"),
  new Tile("cargo_sending_system_c", "basic_2", "white", "enter_css_pod"),
  new Tile("css_control_room", "basic_2", "yellow", "schedule_css"),
  new Tile("defense_control_room", "basic_2", "red", "exterminate"),
  new Tile("guard_room", "basic_2", "red", "take_equipment"),
  new Tile("contaminated_room", "basic_2", "white"),
  new Tile("surgery_room", "basic_2", "green", "perform_surgery"),
  new Tile("testing_lab", "basic_2", "green", "take_neutralizer"),
  new Tile("vent_control_room", "basic_2", "yellow", "vent_out"),

  new Tile("backup_power_supply", "special", "yellow", "restore_power"),
  new Tile("repository", "special", null, "craft_item"),
  new Tile("isolation_room", "special", null, "lock_self"),
  new Tile("alert_room", "special", null, "start_alert", "peek_contingency"),
  new Tile("empty_room", "special", null),
  new Tile("elevetor_room", "special", null, "call_elevator", "use_elevator"),
]

export const initTiles = [ ...tiles ]