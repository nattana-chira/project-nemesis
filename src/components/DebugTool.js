import { createArray, delay, randomIdOnlyNumber, randomNumber, sortRandom } from "../classes/Utils"
import { updateData, resetInit, addInit, EMOJI_DOC } from "../classes/ApiService"
import Player from '../classes/Player'
import PlayAudio from "../classes/PlayAudio"
import { Fragment } from "react"
import Draggable from 'react-draggable';
import { mapDeck } from "../classes/Deck"
import { removeFromGameEvent } from "../classes/Cards/EventCard"

const DebugTool = (props) => {
  const { setRule, setPlayers, setDeck, mainState, startClicked, drawAlienAttackCardClicked,
    showSpawner, setShowSpawner, addLog, spawnerPosition, drawEventCardClicked } = props
  const players = mainState.players

  const queryParams = new URLSearchParams(window.location.search)
  const sessionId = queryParams.get("sessionId")
  const roomId = queryParams.get("roomId")

  const setTurn = (player) => {
    const state = { rule: mainState.rule }
    state.rule.turnSessionId = player.sessionId

    setRule({ ...state.rule })
    delay(() => updateData({ rule: state.rule }, { docId: roomId }))
  }

  const drawWeaknessClicked = () => {
    const state = { rule: mainState.rule, log: mainState.log }

    const drawnCardIds = state.rule.weaknessDeck.slice(0, 1)
    state.rule.weaknessDeck = state.rule.weaknessDeck.slice(1)

    if (drawnCardIds.length === 0) return false

    state.rule.displayCards = [ ...state.rule.displayCards, ...drawnCardIds ]
    setRule(state.rule)
    PlayAudio.drawCard()

    addLog(state, `เผยการ์ดจุดอ่อนเอเลี่ยน`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const controlPlayer = (player) => {
    if (!player)
      queryParams.delete("sessionId")
    else 
      queryParams.set("sessionId", player.sessionId)
    
    const newUrl = "?" + queryParams.toString()
    window.history.replaceState({ path: newUrl }, '', newUrl)
    setRule({ ...mainState.rule })
  }
  
  const kickPlayer = (player) => {
    const state = { log: mainState.log, players: mainState.players }
    state.players = state.players.filter(_player => _player.sessionId !== player.sessionId)
    setPlayers(state.players)

    addLog(state, "เตะผู้เล่น " + Player.showFullname(player))
    delay(() => updateData(state, { docId: roomId }))
  }

  const endGameClicked = (endGameTxt) => {
    const state = { rule: mainState.rule, log: mainState.log } 
    state.rule.endGame = endGameTxt

    if (endGameTxt === "win") {
      addLog(state, "<span class'green'>Mission Completed</span> !!!")
    }
    else {
      addLog(state, "<span class'green'>Mission Failed</span> !!!")
    }

    delay(() => updateData(state, { docId: roomId }))
    
  }

  const spawnThingClicked = (name, deg = 0) => {
    const state = { mission: mainState.mission, log: mainState.log }

    const x = spawnerPosition.x + 200
    const y = spawnerPosition.y + 200
    
    let newThing =  { 
      id: randomIdOnlyNumber(),
      name,
      visible: true,
      isOpen: false,
      rotate: deg + "deg",
      position: { left: x, top: y }
    }

    state.mission.things = [...state.mission.things, newThing]
    // setMission(state.mission)
    // PlayAudio.click()

    addLog(state, "สร้าง " + name)
    delay(() => updateData(state, { docId: roomId }))
  }

  const doRestartMatch = () => {
    // const state = { rule: mainState.rule }
    // state.rule = { ...state.rule, restartMatch: true }
    // updateData(state, { docId: roomId })
    delay(() => resetInit({ docId: roomId, sessionId }))
  }

  const getItemClicked = (card) => {
    const state = { log: mainState.log, rule: mainState.rule }

    state.rule.displayCards = [ ...state.rule.displayCards, card.id ]

    const removeCard = cardId => cardId !== card.id
    state.rule.itemMedicDeck = sortRandom(state.rule.itemMedicDeck.filter(removeCard))
    state.rule.itemWeaponDeck = sortRandom(state.rule.itemWeaponDeck.filter(removeCard))
    state.rule.itemEngineerDeck = sortRandom(state.rule.itemEngineerDeck.filter(removeCard))
    state.rule.itemCraftDeck = sortRandom(state.rule.itemCraftDeck.filter(removeCard))
    state.rule.itemObjectDeck = sortRandom(state.rule.itemObjectDeck.filter(removeCard))

    setRule(state.rule)

    addLog(state, "spawn card " + card.showName())
    delay(() => updateData(state, { docId: roomId }))
  }

  const clearCardClicked = () => {
    const state = { players: mainState.players, log: mainState.log, rule: mainState.rule }

    state.rule.displayCards.map(mapDeck).map(card => {
      if (card.name === "contaminated") {
        state.rule.contaminationDeck = sortRandom([ ...state.rule.contaminationDeck, card.id ])
      } 
      if (card.type === "event") {
        if (removeFromGameEvent.includes(card.name)) {
          state.rule.eventDeck = sortRandom([ ...state.rule.eventDeck, ...state.rule.trashEventDeck ])
          state.rule.trashEventDeck = []
        } 
        else {
          state.rule.trashEventDeck = [ ...state.rule.trashEventDeck,  card.id ]
        }
      } 
      else if (card.type === "wound") {
        state.rule.woundDeck = sortRandom([ ...state.rule.woundDeck, card.id ])
      } 
      else if (card.type === "alien") {
        state.rule.alienAttackDeck = sortRandom([ ...state.rule.alienAttackDeck, card.id ])
      }
      else if (card.type === "action") {
        state.players.map(player => {
          if (player.hero.name === card.subtype) {
            player.trashActionCardIds = [ ...player.trashActionCardIds, card.id ]
          }
        })
      }
    })
    state.rule = { ...state.rule, displayCards: []}
    
    setPlayers(state.players)
    setRule(state.rule)
    PlayAudio.click()
    addLog(state, "clear card")

    delay(() => updateData(state, { docId: roomId }))
  }

  return (
    <Draggable>
    <div className="admin-board dev-tool-wrapper d-grid gap-1">
      <button type="button" class="btn btn-primary btn-sm" onClick={() => setShowSpawner(!showSpawner)}>[Q] SPAWNER</button>

        <Fragment>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              DECK
            </button>
            <ul class="dropdown-menu">
              <li><div class="dropdown-item green" onClick={drawAlienAttackCardClicked}>DRAW - ALIEN ATTACK</div></li>
              <li><div class="dropdown-item green" onClick={drawEventCardClicked}>DRAW - EVENT</div></li>
              <li><div class="dropdown-item green" onClick={drawWeaknessClicked}>DRAW - WEAKNESS</div></li>
              <li><div class="dropdown-item red" onClick={clearCardClicked}>CLEAR DISPLAY</div></li>
            </ul>
          </div>
          <hr />
        </Fragment>
 

      {!showSpawner && (
        <Fragment>
          <div class="btn-group" role="group">
            <button id="btnDev4" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              ADMIN
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnDev4">
              <li><div class="dropdown-item green" onClick={() => endGameClicked("win")}>END GAME - WIN</div></li>
              <li><div class="dropdown-item green" onClick={() => endGameClicked("lose")}>END GAME - LOSE</div></li>
              <li><div class="dropdown-item green" onClick={() => startClicked()}>START MATCH</div></li>
              <li><div class="dropdown-item" onClick={doRestartMatch}>RESET DATA {roomId}</div></li>
              <li><div class="dropdown-item" onClick={addInit}>ADD NEW DATA</div></li>
            </ul>
          </div>

          <div class="btn-group" role="group">
            <button id="btnDev2" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              PLAYERS
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnDev2">
              {players.map(player => (
                <li><div class="dropdown-item" onClick={() => setTurn(player)}><span class="green">TURN</span> - {Player.showFullname(player)}</div></li>
              ))}
              {players.map(player => (
                <li><div class="dropdown-item" onClick={() => controlPlayer(player)}><span class="blue">CONTROL</span> - {Player.showFullname(player)}</div></li>
              ))}
              {players.map(player => (
                <li><div class="dropdown-item" onClick={() => kickPlayer(player)}><span class="red">KICK</span> - {Player.showFullname(player)}</div></li>
              ))}

              <li><div class="dropdown-item" onClick={() => controlPlayer(null)}>FREE CONTROL</div></li>
            </ul>
          </div>

          <div class="btn-group" role="group">
            <button id="btnDev2" type="button" class="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              ITEM
            </button>
            <ul class="dropdown-menu long-dropdown-menu" aria-labelledby="btnDev2">
              <li><div class="dropdown-item bold">*** OBJECT ***</div></li>
              {mainState.rule.itemObjectDeck.map(mapDeck).map(card =>
                <li><div class="dropdown-item" onClick={() => getItemClicked(card)}>{card.name}</div></li>
              )}
              <li><div class="dropdown-item bold">*** MEDIC ***</div></li>
              {mainState.rule.itemMedicDeck.map(mapDeck).map(card =>
                <li><div class="dropdown-item" onClick={() => getItemClicked(card)}>{card.name}</div></li>
              )}
              <li><div class="dropdown-item bold">*** ENGINEER ***</div></li>
              {mainState.rule.itemEngineerDeck.map(mapDeck).map(card =>
                <li><div class="dropdown-item" onClick={() => getItemClicked(card)}>{card.name}</div></li>
              )}
              <li><div class="dropdown-item bold">*** WEAPON ***</div></li>
              {mainState.rule.itemWeaponDeck.map(mapDeck).map(card =>
                <li><div class="dropdown-item" onClick={() => getItemClicked(card)}>{card.name}</div></li>
              )}
              <li><div class="dropdown-item bold">*** CRAFT ***</div></li>
              {mainState.rule.itemCraftDeck.map(mapDeck).map(card =>
                <li><div class="dropdown-item" onClick={() => getItemClicked(card)}>{card.name}</div></li>
              )}
            </ul>
          </div>

        </Fragment>
      )}

      {!showSpawner && (
        <Fragment>
          <hr />
          item medic deck: {mainState.rule.itemMedicDeck.length} <br />
          item engineer deck: {mainState.rule.itemEngineerDeck.length} <br />
          item weapon deck: {mainState.rule.itemWeaponDeck.length} <br />
          event deck: {mainState.rule.eventDeck.length} <br />
          alien deck: {mainState.rule.alienAttackDeck.length} <br />
          contamination deck: {mainState.rule.contaminationDeck.length} <br />
          turn: {mainState.rule.turnSessionId}
        </Fragment>
      )}
    </div>
    </Draggable>
  )
}

export default DebugTool