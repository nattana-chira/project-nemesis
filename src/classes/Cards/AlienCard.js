import Card from "../Card"

export default class AlienCard extends Card {
  constructor(name) {
    super(name)
    this.name = name
    this.type = "alien"
  }
}