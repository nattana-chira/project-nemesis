import Card from "../Card"

export default class WoundCard extends Card {
  constructor(name) {
    super(name)
    this.type = "wound"
  }
}