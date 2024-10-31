import Card from "../Card"

export default class WeaknessCard extends Card {
  constructor(name) {
    super(name)
    this.name = name
    this.type = "weakness"
  }
}