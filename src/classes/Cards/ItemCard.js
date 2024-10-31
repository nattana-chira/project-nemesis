import Card from "../Card"
import { masterTrans } from "../Deck"
import { randomId } from "../Utils"

export default class ItemCard extends Card {
  constructor(name, color = null, subtype = null) {
    super(name)
    this.name = name
    this.color = color
    this.type = "item"
    this.subtype = subtype
  }
}
