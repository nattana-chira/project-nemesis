import Card from "../Card"

export default class ActionCard extends Card {
  constructor(subtype, name) {
    super(name)
    this.name = name
    this.type = "action"
    this.subtype = subtype
  }
}