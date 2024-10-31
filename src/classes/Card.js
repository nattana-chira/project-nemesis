import { masterTrans } from "./Deck"

export default class Card {
  id = null
  name = null
  color = null
  type = null
  subtype = null

  constructor(name, color = null, type = null, subtype = null) {
    this.id = cardId()
    this.name = name
    this.color = color
    this.type = type
    this.subtype = subtype
  }

  canBePicked(player) {
    if (this.type === "action" && player.hero.name === this.subtype)
      return true

    return this.type === "item" || this.name === "contaminated"
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