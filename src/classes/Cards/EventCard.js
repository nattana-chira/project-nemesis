import Card from "../Card"

export default class EventCard extends Card {
  constructor(name) {
    super(name)
    this.name = name
    this.type = "event"
  }
}

export const removeFromGameEvent = [
  "kickstopper",
  "thats_hot",
  "short_circuit",
  "blue_screen",
  "sanitary_network_failure",
  "coolant_leak"
]