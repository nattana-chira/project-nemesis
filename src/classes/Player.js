import { DEV_MODE } from "./_InitSetting"

export default class Player {
  name = null
  sessionId = null
  objectives = []
  objectiveId = null
  contingencyId = null
  actionCardIds = []
  trashActionCardIds = []
  equipCardIds = []
  backpackCardIds = []
  position = { x: 0, y: 0 }
  knowledge = 0
  hero = null
  logs = []
  lightWound = 0
  seriousWounds = []
  dressedWounds = []
  state = {
    slime: false,
    larva: false,
    signal: false,
    knowledge: false
  }

  constructor(name, sessionId) {
    this.name = name
    this.sessionId = sessionId
  }

  static showFullname(player) {
    return `${player?.name} (${player?.sessionId})`
  }
}

const _initPlayers = [
  new Player("Drink", "254686"),
  new Player("Somchai", "874957"),
  new Player("C0", "632001")
]

export const initPlayers = DEV_MODE ? _initPlayers : []