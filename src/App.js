import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import { JSONreset, createArray, delay, filterUniqByKey, sortBy, sortRandom } from './classes/Utils';
import { updateData } from './classes/ApiService';
import MapAlien from './components/MapAlien';
import { DEV_MODE } from './classes/_InitSetting';
import { initState } from './classes/DataInit';
import MapPlayer from './components/MapPlayer';
import DebugTool from './components/DebugTool';
import PlayerBoard from './components/PlayerBoard';
import PlayAudio from './classes/PlayAudio';
import { mapDeck } from './classes/Deck';
import Log from './components/Log';
import ActionModal from './components/ActionModal';
import DisplayCardWrapper from './components/DisplayCardWrapper';
import ItemCard from './components/ItemCard';
import { mapObjectives } from './classes/Objective';
import MapRoomTile from './components/MapRoomTile';
import { transDiceName } from './components/Dice';
import MapMarker from './components/MapMarker';

function App() {
  const [rule, setRule] = useState(null)
  const [players, setPlayers] = useState([])
  const [log, setLog] = useState([])

  const queryParams = new URLSearchParams(window.location.search)
  const sessionId = queryParams.get("sessionId")
  const roomId = queryParams.get("roomId")
  const isAdmin = queryParams.get("user") === "admin"

  const me = players.find(player => player.sessionId === sessionId)
  const mainState = { rule, players, log }
  const isMyTurn = me && me.sessionId === rule?.turnSessionId
  const notLoggedIn = !sessionId || !me

  const [selectedCard, selectCard] = useState(null)
  const [showDice, toggleShowDice] = useState(null)
  const [yourName, setYourname] = useState("")
  const [lastAudioLog, setLastAudioLog] = useState(null)

  const modalConfirm = useRef()
  const modalEndgame = useRef()
  const modalCraft = useRef()
  const modalObjective = useRef()
  const modalClose = useRef()

  useEffect(() => {
    if (DEV_MODE) {
      setPlayers(JSONreset(initState.players))
      setLog(JSONreset(initState.log))
      setRule(JSONreset(initState.rule))
    } else {
      // BASE DATA
      // subscribeData((data) => {
      //   setPlayers(data.players)
      //   setLog(data.log)
      //   setRule(data.rule)
      // }, { docId: roomId })

      // fetchInitData({ docId: roomId }).then((data) => {
      //   setPlayers(data.players)
      //   setLog(data.log)
      //   setRule(data.rule)
      // })
    }
  }, [])


  const setDeck = (deck) => {}
  const startClicked = () => {}

  const addPlayerLog = (state, type, id) => {
    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        _player.logs = [..._player.logs, { type, id }]
      }
      return _player
    })
    setPlayers(state.players)
    return state.players
  }

  const addLog = (state, msg) => {
    const myName = me?.name || ""
    const mySessionId = me?.sessionId || ""

    state.log = [...state.log, { name: myName, sessionId: mySessionId, msg }]
    setLog(state.log)
    return state.log
  }

  const addCardsToPlayer = (state, cards, player) => {
    state.players = state.players.map(_player => {
      if (_player.sessionId === player.sessionId) {
        cards.map(card => {
          if (card.type === "action" || card.name === "contaminated") 
            player.actionCardIds = [...player.actionCardIds, card.id]
          else if (card.subtype === "heavy")
            player.equipCardIds = [...player.equipCardIds, card.id]
          else 
            player.backpackCardIds = [...player.backpackCardIds, card.id]
        })
      }
      return _player
    })
    setPlayers(state.players)
  }

  const removeCardFromPlayers = (state, card) => {
    const filterCardOut = (cardId) => cardId !== card.id
    state.players = state.players.map(_player => {
      _player.actionCardIds = _player.actionCardIds.filter(filterCardOut)
      _player.equipCardIds = _player.equipCardIds.filter(filterCardOut)
      _player.backpackCardIds = _player.backpackCardIds.filter(filterCardOut)

      return _player
    })
    state.rule.displayCards = state.rule.displayCards.filter(filterCardOut)
    setPlayers(state.players)
    setRule(state.rule)
  }

  const resetSelector = () => {
    selectCard(null)
    toggleShowDice(null)
    modalClose.current.click()
    return false
  }

  // =============================================================

  const onAlienControlled = (e, pos, id) => {
    // if (!isMyTurn && !isAdmin)
    //   return null

    const state = { rule, log }
    const { x, y } = pos;
    let posChanged = false

    let alienName;
    state.rule.aliens = state.rule.aliens.map(alien => {
      if (alien.id === id) {
        if (alien.position.x !== x || alien.position.y !== y) 
          posChanged = true
        
          alien.position = { x, y }
          alienName = alien.name
      }
      return alien
    })
    setRule({ ...state.rule })

    if (posChanged) {
      // PlayAudio.move()
      addLog(state, `${alienName} เคลื่อนที่`)
      delay(() => updateData(state, { docId: roomId }))
    }
  }

  const onMarkerControlled = (e, pos, id) => {
    const state = { rule, log }
    const { x, y } = pos;
    let posChanged = false

    let markerName;
    state.rule.markers = state.rule.markers.map(marker => {
      if (marker.id === id) {
        if (marker.position.x !== x || marker.position.y !== y) {
          posChanged = true
          marker.position = { x, y }
          markerName = marker.name
        }
      }
      return marker
    })

    setRule({ ...state.rule })

    if (posChanged) {
      // PlayAudio.move()
      addLog(state, `ขยับ ${markerName} marker`)
      delay(() => updateData(state, { docId: roomId }))
    }
  }

  const traskMakerClicked = (marker) => {
    const state = { rule, log }
    state.rule.markers = state.rule.markers.filter(_marker => _marker.id !== marker.id)
    setRule({ ...state.rule })

    addLog(state, `ทิ้ง ${marker.name} marker`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const onPlayerControlled = (e, pos, _sessionId) => {
    const state = { players, log }
    const { x, y } = pos;
    let posChanged = false

    let playerName;
    state.players = state.players.map(_player => {
      if (_player.sessionId === _sessionId) {
        if (_sessionId === me.sessionId) 
          _player.action--

        if (_player.position.x !== x || _player.position.y !== y) 
          posChanged = true
      
        _player.position = { x, y }
        playerName = _player.name
      }
      return _player
    })
    setPlayers([ ...state.players ])

    if (posChanged) {
      // PlayAudio.move()
      addLog(state, `${playerName} เคลื่อนที่`)
      delay(() => updateData(state, { docId: roomId }))
    }
  }

  const cardClicked = (card) => {
    modalConfirm.current.click()
    selectCard(card)
  }

  
  const endTurnClicked = () => {
    // const state = { rule, players, log }
    // let nextPlayer;
    // let endSurvivorTurn = false

    // delay(() => {
    //   state.players = state.players.map((player, i) => {
    //     player.action = player.maxAction
  
    //     if (player.sessionId === me.sessionId) {
    //       if (state.players.length === i+1) {
    //         endSurvivorTurn = true;
    //         state.rule = { ...state.rule, turnSessionId: "", zombieTurn: true }
    //         setRule(state.rule)
    //       } 
    //       else {
    //         nextPlayer = state.players[i + 1] || state.players[0]
    //         const nextSessionId = nextPlayer?.sessionId
    //         state.rule = { ...state.rule, turnSessionId: nextSessionId }
    //         setRule(state.rule)
    //       }
    //     }
    //     return player
    //   })
  
    //   setPlayers(state.players)
    //   PlayAudio.click()
    //   resetSelector()
  
    //   addLog(state, `จบเทิร์น`)

    //   if (endSurvivorTurn) 
    //     addLog(state, `<span class="red">เทิร์นซอมบี้...</span>`)

    //   delay(() => updateData(state, { docId: roomId }))
    // })
  }

  const playerStateToggleClicked = (player, stateName) => {
    const state = { log, players }
    let stateChange;

    state.players = state.players.map((_player, i) => {
      if (_player.sessionId === player.sessionId) {
        _player.state[stateName] = !_player.state[stateName]
        stateChange = _player.state[stateName]
      }
      return _player
    })

    stateChange = stateChange ? "+" : "-"
    PlayAudio.click()

    addLog(state, stateChange + " สถานะ " + stateName)
    delay(() => updateData(state, mainState, { roomId }))
  }

  const dressWoundClicked = (player, card) => {
    const state = { log, players }
   
    state.players = state.players.map((_player, i) => {
      if (_player.sessionId === player.sessionId) {
        _player.seriousWounds = _player.seriousWounds.filter(cardId => cardId !== card.id)
        _player.dressedWounds = [ ..._player.dressedWounds, card.id]
      }
      return _player
    })

    setPlayers(state.players)
    PlayAudio.click()

    addLog(state, `ทำแผล ${card.showName()}`)
    delay(() => updateData(state, mainState, { roomId }))
  }

  const cureWoundClicked = (player, card) => {
    const state = { log, players }
   
    state.players = state.players.map((_player, i) => {
      if (_player.sessionId === player.sessionId) {
        _player.dressedWounds = _player.dressedWounds.filter(cardId => cardId !== card.id)
      }
      return _player
    })

    setPlayers(state.players)
    PlayAudio.click()

    addLog(state, `รักษาแผล ${card.showName()}`)
    delay(() => updateData(state, mainState, { roomId }))
  }

  const confirmActionClicked = () => {
    const state = { log, rule, players}

    removeCardFromPlayers(state, selectedCard)
    state.rule.displayCards = [ ...state.rule.displayCards, selectedCard.id ]
    setRule(state.rule)
    resetSelector()
    PlayAudio.drawCard()

    addLog(state, `ใช้งาน ${selectedCard.name}`)
    delay(() => updateData(state, mainState, { roomId }))
  }

  const drawActionCardClicked = (player, number = 1) => {
    const state = { rule, players, log }

    const drawnCardIds = state.rule.actionDeck[player.hero.name].slice(0, number)
    state.rule.actionDeck[player.hero.name] = state.rule.actionDeck[player.hero.name].slice(number)

    if (drawnCardIds.length === 0) return false

    setRule(state.rule)
    drawnCardIds.map(mapDeck).map(card => {
      addPlayerLog(state, "item", card.id)
      addCardsToPlayer(state, [card], me)
    })
    PlayAudio.drawCard()

    addLog(state, `จั่วการ์ดแอคชั่น ${number}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const drawWoundCardClicked = () => {
    const state = { rule, log }

    const drawnCardIds = state.rule.woundDeck.slice(0, 1)
    state.rule.woundDeck = state.rule.woundDeck.slice(1)

    if (drawnCardIds.length === 0) return false

    state.rule.displayCards = [ ...state.rule.displayCards, ...drawnCardIds ]
    setRule(state.rule)
    PlayAudio.drawCard()
    const card = drawnCardIds.map(mapDeck)[0]

    addLog(state, `จั่วการ์ดแผลใหญ่ ${card.showName()}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const drawAlienAttackCardClicked = () => {
    const state = { rule, players, log }

    const drawnCardIds = state.rule.alienAttackDeck.slice(0, 1)
    state.rule.alienAttackDeck = state.rule.alienAttackDeck.slice(1)

    if (drawnCardIds.length === 0) return false

    state.rule.displayCards = [ ...state.rule.displayCards, ...drawnCardIds ]
    setRule(state.rule)
    PlayAudio.drawCard()

    addLog(state, `เอเลี่ยนจู่โจม`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const drawEventCardClicked = () => {
    const state = { rule, players, log }

    const drawnCardIds = state.rule.eventDeck.slice(0, 1)
    state.rule.eventDeck = state.rule.eventDeck.slice(1)

    if (drawnCardIds.length === 0) return false

    state.rule.displayCards = [ ...state.rule.displayCards, ...drawnCardIds ]
    setRule(state.rule)
    PlayAudio.drawCard()

    addLog(state, `เอเลี่ยนจู่โจม`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const searchItemClicked = (deckName, number = 1) => {
    const state = { rule, players, log }
    let drawnCardIds = []

    if (deckName === "medic") {
      drawnCardIds = state.rule.itemMedicDeck.slice(0, number)
      state.rule.itemMedicDeck = state.rule.itemMedicDeck.slice(number)
    }

    if (deckName === "weapon") {
      drawnCardIds = state.rule.itemWeaponDeck.slice(0, number)
      state.rule.itemWeaponDeck = state.rule.itemWeaponDeck.slice(number)
    }

    if (deckName === "engineer") {
      drawnCardIds = state.rule.itemEngineerDeck.slice(0, number)
      state.rule.itemEngineerDeck = state.rule.itemEngineerDeck.slice(number)
    }
    
    if (drawnCardIds.length === 0) return false

    setRule(state.rule)
    const cards = drawnCardIds.map(mapDeck)
    addPlayerLog(state, "item", cards[0].id)
    addCardsToPlayer(state, cards, me)
    PlayAudio.drawCard()

    addLog(state, `ค้นหาสิ่งของ ${deckName} ${cards[0].showName()}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const pickCardClicked = () => {
    const state = { rule, players, log }

    removeCardFromPlayers(state, selectedCard)
    addCardsToPlayer(state, [selectedCard], me)
    PlayAudio.drawCard()
    resetSelector()

    addLog(state, `หยิบการ์ด ${selectedCard.showName()}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const pickObjectiveClicked = (objId) => {
    const state = { rule, players, log }

    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        _player.objectiveId = objId
      }
      return _player
    })
    setPlayers(state.players)

    PlayAudio.click()
    resetSelector()
    modalObjective.current.click()

    addLog(state, `เลือกภารกิจ`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const craftItemClicked = (card) => {
    const state = { rule, players, log }

    state.rule.itemCraftDeck = state.rule.itemCraftDeck.filter(cardId => 
      cardId !== card.id
    )
    addCardsToPlayer(state, [card], me)
    PlayAudio.drawCard()
    modalCraft.current.click()

    addLog(state, `คราฟไอเทม ${card.showName()}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const reshuffleActionDeckClicked = () => {
    const state = { rule, players, log }

    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        state.rule.actionDeck[me.hero.name] = [ ..._player.trashActionCardIds ]
        _player.trashActionCardIds = []
      }
      return _player
    })

    setPlayers(state.players)
    setRule(state.rule)
    PlayAudio.drawCard()

    addLog(state, `สับกองการ์ด`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const addCardToTrashClicked = () => {
    const state = { rule, players, log }

    removeCardFromPlayers(state, selectedCard)
    if (selectedCard.type === "action") {
      state.players = state.players.map(_player => {
        if (_player.sessionId === me.sessionId) {
          _player.trashActionCardIds = [ ..._player.trashActionCardIds, selectedCard.id ]
        }
        return _player
      })
      setPlayers(state.players)
    }
    else if (selectedCard.type === "item") {
      if (selectedCard.color === "blue")
        state.rule.itemCraftDeck = [ ...state.rule.itemCraftDeck, selectedCard.id ]

      if (selectedCard.color === "green")
        state.rule.itemMedicDeck = sortRandom([ ...state.rule.itemMedicDeck, selectedCard.id ])

      if (selectedCard.color === "red")
        state.rule.itemWeaponDeck = sortRandom([ ...state.rule.itemWeaponDeck, selectedCard.id ])

      if (selectedCard.color === "orange")
        state.rule.itemEngineerDeck = sortRandom([ ...state.rule.itemEngineerDeck, selectedCard.id ])
    }

    PlayAudio.drawCard()
    resetSelector()

    addLog(state, `ทิ้งการ์ด ${selectedCard.showName()}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const woundClicked = () => {
    const state = { rule, players, log }

    removeCardFromPlayers(state, selectedCard)
    state.players = state.players.map(_player => {
      if (_player.sessionId === me.sessionId) {
        _player.seriousWounds = [ ..._player.seriousWounds, selectedCard.id ]
      }
      return _player
    })
    setPlayers(state.players)
    PlayAudio.drawCard()
    resetSelector()

    addLog(state, `ได้รับแผลใหญ่ ${selectedCard.showName()}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const playerStatChanged = (player, key, operation) => {
    const state = { log, players }

    state.players = state.players.map(_player => {
      if (_player.sessionId === player.sessionId) {
        if (operation === "+")
          _player[key]++
        else if (operation === "-")
          _player[key] > 0 && _player[key]--
      }
      return _player
    })
    setPlayers(state.players)
    PlayAudio.click()

    addLog(state, `${operation} ${key}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  const showDiceClicked = (diceName) => {
    if (showDice) {
      toggleShowDice(null)
    } else {
      toggleShowDice(diceName)
    }
  }

  const rollDiceClicked = (result) => {
    const state = { log, players }

    if (!result.length || !showDice) return false
    
    let resultLog = result.join(", ")
    const diceName = transDiceName(showDice)

    if (showDice === "red") {
      switch(result[0]) {
        case 1: resultLog = "Miss !!"; break;
        case 2: resultLog = "Hit Creeper"; break;
        case 3: resultLog = "Hit Adult"; break;
        case 4: resultLog = "Creeper"; break;
        case 5: resultLog = "Critical"; break;
        case 6: resultLog = "Critical x2"; break;
      }
    }

    if (showDice === "blue") {
      switch(result[0]) {
        case 1: resultLog = "Miss !!"; break;
        case 2: resultLog = "Hit Creeper"; break;
        case 3: resultLog = "Hit Adult"; break;
        case 4: resultLog = "[1]+Critical"; break;
        case 5: resultLog = "Critical ([1]+Critical)"; break;
        case 6: resultLog = "Critical x2"; break;
      }
    }

    if (showDice === "noise") {
      if (result[0] <= 4) {
        resultLog = result[0]
      } 
      else if (result[0] === 5 && result[1] <= 3) {
        resultLog = "Danger !!"
      }
      else if (result[0] === 6 && result[1] >= 4) {
        resultLog = "Silence..."
      }
      else {
        resultLog = "Failed ??"
      }
    }

    addLog(state, `ทอย${diceName} ${resultLog}`)
    delay(() => updateData(state, { docId: roomId }))
  }

  console.log("mainState", mainState)

  if (!rule) return "loading"

  return (
    <div className="app">
      <button ref={modalConfirm} type="button" class="btn btn-sm btn-primary modalTrigger" data-bs-toggle="modal" data-bs-target="#confirmModal" ></button>
      <button ref={modalEndgame} type="button" class="btn btn-sm btn-primary modalTrigger" data-bs-toggle="modal" data-bs-target="#endgameModal" ></button>
      <button ref={modalCraft} type="button" class="btn btn-sm btn-primary modalTrigger" data-bs-toggle="modal" data-bs-target="#craftModal" ></button>
      <button ref={modalObjective} type="button" class="btn btn-sm btn-primary modalTrigger" data-bs-toggle="modal" data-bs-target="#objectiveModal" ></button>

      <ActionModal modalClose={modalClose} me={me} players={players} rule={rule} selectedCard={selectedCard} 
        confirmActionClicked={confirmActionClicked} pickCardClicked={pickCardClicked}
        addCardToTrashClicked={addCardToTrashClicked} woundClicked={woundClicked}
      />

      <div class="modal" id="objectiveModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <h3 className='bold'> เลือกภารกิจ </h3> <hr />
              <div className="objective-pick-wrapper">
                {me.objectives.map(mapObjectives).map((obj) => (
                  <div>
                    <div className={classNames("objective-pick-inner-wrapper", { "disabled-objective": me.objectiveId && me.objectiveId !== obj.id })}>
                      <div>
                        <div class="objective-title">{obj.showName()}</div>
                        <div dangerouslySetInnerHTML={{ __html: obj.showDesc() }}></div>
                      </div>
                      {!me.objectiveId && (
                        <button onClick={() => pickObjectiveClicked(obj.id)} type="button" class="btn btn-primary btn-md btn-block pick-objective-btn">เลือกภารกิจ</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" id="craftModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-body">
              <h3 className='bold'> คราฟไอเทม </h3> <hr />
              <div className="craft-pick-wrapper">
                {[ ...rule.itemCraftDeck ].map(mapDeck).filter(filterUniqByKey("name")).sort(sortBy("id")).map(card => (
                  <div>
                    <div className="craft-pick-inner-wrapper">
                      <div>
                        <ItemCard card={card} classes="item-card-md" />
                        <div class="craft-title">{card.showName()}</div>
                        <div dangerouslySetInnerHTML={{ __html: card.showDesc() }}></div>
                      </div>
                      <button onClick={() => craftItemClicked(card)} type="button" class="btn btn-primary btn-md craft-btn">เลือก</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisplayCardWrapper rule={rule} cardClicked={cardClicked} />

      {me && (
        <PlayerBoard players={players}  me={me} rule={rule} showDice={showDice} endGame={rule.endGame}
          rollDiceClicked={rollDiceClicked} playerStatChanged={playerStatChanged} searchItemClicked={searchItemClicked} 
          showDiceClicked={showDiceClicked} cardClicked={cardClicked} endTurnClicked={endTurnClicked}
          scoreBoardClicked={() => modalEndgame.current.click()} drawActionCardClicked={drawActionCardClicked}
          reshuffleActionDeckClicked={reshuffleActionDeckClicked} drawWoundCardClicked={drawWoundCardClicked}
          playerStateToggleClicked={playerStateToggleClicked} dressWoundClicked={dressWoundClicked} cureWoundClicked={cureWoundClicked}
          openCraftMenuClicked={() => modalCraft.current.click()} openObjectiveMenuClicked={() => modalObjective.current.click()}
        />
      )}

      {isAdmin && (
        <DebugTool mainState={mainState} setRule={setRule} setPlayers={setPlayers} setDeck={setDeck} startClicked={startClicked} 
          drawAlienAttackCardClicked={drawAlienAttackCardClicked}
          addLog={addLog} drawEventCardClicked={drawEventCardClicked} />
      )}

      <Log log={log} players={players} />

      <MapPlayer players={players} onControlled={onPlayerControlled} />
      <MapAlien rule={rule} isAdmin={isAdmin} onControlled={onAlienControlled} />
      <MapMarker rule={rule} onControlled={onMarkerControlled} traskMakerClicked={traskMakerClicked} />
      
      <div id="main" style={{ backgroundImage: `url('img/map-tile.jpg')` }}>
        <div className="flex-container map-1">

          <MapRoomTile tiles={rule.tiles} />

          <Draggable
            onStop={(e, { x, y }) => console.log("POS ", { x, y })}
          >
            <div className="pass"></div>
          </Draggable>

          {createArray(23, 1).map(i => <div className={`pass pass-${i}`}></div>)}
   
      
          <div></div>

        </div>
        {/* <img id="map-tile" src={"assets/img/map-tile.png"} className="map-tile" alt="map-tile" /> */}
        </div>
    </div>
  );
}

export default App;
