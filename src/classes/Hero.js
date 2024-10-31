import { randomId, sortRandom } from "./Utils"

export default class Hero {
  name = null

  constructor(name) {
    this.id = randomId()
    this.name = name
  }

  static showName(hero) {
    return hero?.name || ""
  }
}

export const randomHero = (heroes) => {
  heroes = sortRandom([...heroes])
  
  return heroes
}

export const initHeroes = [
  new Hero("janitor"),
  new Hero("hacker"),
  new Hero("sentry"),
  new Hero("survivor"),
  new Hero("lab_rat"),
  new Hero("xenobiologist"),
]