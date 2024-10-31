import { initContingencies } from './Contingencies';
import { initActionDeck, initAlienAttackDeck, initContaminationDeck, initEventDeck, initItemCraftDeck, initItemEngineerDeck, 
  initItemMedicDeck, initItemObjectDeck, initItemWeaponDeck, initWeaknessDeck, initWoundDeck } from './Deck';
import { initExplores } from './Explore';
import { initHeroes, randomHero } from './Hero';
import { initObjectives } from './Objective';
import { initPlayers } from './Player';
import { initTiles } from './Tile';
import { randomIdOnlyNumber, sortRandom } from './Utils';
import { AUTO_RANDOM_HERO } from './_InitSetting';

const objectivePool = 2

let randomPlayers = sortRandom(initPlayers)
let randomObjectives = sortRandom(initObjectives)
const randomHeroes = randomHero(initHeroes)
const randomItemMedicDeck = sortRandom(initItemMedicDeck)
const randomItemEngineerDeck = sortRandom(initItemEngineerDeck)
const randomItemWeaponDeck = sortRandom(initItemWeaponDeck)
const randomItemCraftDeck = sortRandom(initItemCraftDeck)
const randomAlienAttackDeck = sortRandom(initAlienAttackDeck)
const randomEventDeck = sortRandom(initEventDeck)
const randomWeaknessDeck = sortRandom(initWeaknessDeck)
const randomActionDeck = {
  lab_rat: sortRandom(initActionDeck.lab_rat),
  survivor: sortRandom(initActionDeck.survivor),
  sentry: sortRandom(initActionDeck.sentry),
  hacker: sortRandom(initActionDeck.hacker),
  janitor: sortRandom(initActionDeck.janitor),
  xenobiologist: sortRandom(initActionDeck.xenobiologist),
}
const randomContaminationDeck = sortRandom(initContaminationDeck)
const randomWoundDeck = sortRandom(initWoundDeck)
const randomItemObjectDeck = sortRandom(initItemObjectDeck)

let randomContingencies = sortRandom(initContingencies)

let randomTiles = sortRandom(initTiles)
const randomExplores = sortRandom(initExplores)
randomTiles = randomTiles.map((tile, i) => {
  tile.exploreId = randomExplores[i]
  return tile
})

// auto pick
if (AUTO_RANDOM_HERO) {
  randomPlayers = randomPlayers.map((player, i) => {
    player.hero = randomHeroes[i]
    
    player.contingencyId = randomContingencies.slice(0, 1)[0]
    randomContingencies = randomContingencies.slice(1)

    player.objectives = randomObjectives.slice(0, objectivePool)
    randomObjectives = randomObjectives.slice(objectivePool)

    // player.hero = initHeroes[78]

    return player
  })
}

export const initState = {
  players: randomPlayers,
  log: [],
  rule: {
    aliens: [
      {
        id: randomIdOnlyNumber(),
        name: "adult",
        position: { x: 0, y: 0 }
      }
    ],
    markers: [
      {
        id: randomIdOnlyNumber(),
        name: "noise",
        position: { x: 0, y: 0 }
      }
    ],
    turnSessionId: "",
    endGame: "",
    objectives: randomObjectives,
    tiles: randomTiles,
    pickContingency: randomContingencies.slice(0, 1),
    contingencies: randomContingencies.slice(1),
    itemMedicDeck: randomItemMedicDeck,
    itemEngineerDeck: randomItemEngineerDeck,
    itemWeaponDeck: randomItemWeaponDeck,
    itemCraftDeck: randomItemCraftDeck,
    alienAttackDeck: randomAlienAttackDeck,
    contaminationDeck: randomContaminationDeck,
    woundDeck: randomWoundDeck, 
    computerDeck: [],
    eventDeck: randomEventDeck,
    itemObjectDeck: randomItemObjectDeck,
    weaknessDeck: randomWeaknessDeck,
    actionDeck: {
      lab_rat: randomActionDeck.lab_rat,
      survivor: randomActionDeck.survivor,
      sentry: randomActionDeck.sentry,
      hacker: randomActionDeck.hacker,
      janitor: randomActionDeck.janitor,
      xenobiologist: randomActionDeck.xenobiologist
    },
    trashEventDeck: [],
    displayCards: [],
  },
}