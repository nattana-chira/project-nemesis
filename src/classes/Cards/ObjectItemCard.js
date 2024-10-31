import Card from "../Card"
import { masterTrans } from "../Deck"
import { randomId } from "../Utils"

export default class ObjectItemCard extends Card {
  constructor(name) {
    super(name)
    this.name = name
    this.type = "item"
    this.subtype = "heavy"
  }
}
