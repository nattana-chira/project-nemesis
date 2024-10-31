import classNames from 'classnames';
import Draggable from 'react-draggable';
import DiceComponent from './Dice';
import { Fragment } from 'react';
import { mapDeck } from '../classes/Deck';
import ItemCard from './ItemCard';
import { createArray } from '../classes/Utils';
import { mapObjectives } from '../classes/Objective';
import { mapContingencies } from '../classes/Contingencies';

export default function PlayerBoard(props) {
  const { rollDiceClicked, players, playerStatChanged, showDice, searchItemClicked, showDiceClicked, cardClicked, 
    endTurnClicked, selectWeapon, me, rule, diceBonus, setDiceBonus, endGame, scoreBoardClicked, drawActionCardClicked,
    reshuffleActionDeckClicked, drawWoundCardClicked, playerStateToggleClicked, dressWoundClicked, cureWoundClicked,
    openCraftMenuClicked, openObjectiveMenuClicked } = props  

  const isMyTurn = me && me.sessionId === rule?.turnSessionId

  const renderPlayerStatChanger = (player, statKey) => {
    return (
      <Fragment>
        <span class="stat-changer-wrapper">
          <i class="fa fa-toggle-up stat-changer hoverable green" onClick={() => playerStatChanged(player, statKey, "+")}></i>
          <i class="fa fa-toggle-down stat-changer hoverable red" onClick={() => playerStatChanged(player, statKey, "-")}></i>
        </span>
      </Fragment>
    )
  }

  const readyWeaponClicked = (card) => {
    showDiceClicked(card.dice + diceBonus)
    selectWeapon(card)
  }

  const renderDiceOption = () => {
    const equipItems = me.equipCardIds.map(mapDeck).filter(card => card.type === "weapon")
    const backpackItems = me.backpackCardIds.map(mapDeck).filter(card => card.type === "weapon")
    const weaponPassive = (card) => {
      return (
        <Fragment>
          {card?.hasSniperSkill() && (
            <span class="green-text">Sniper</span>
          )}
          {card?.hasReloadSkill() && (
            <span class="alert-text">Reload</span>
          )}
        </Fragment>
      )
    }

    return (
      <Fragment>
        {equipItems.map(card => 
          <li><div class="dropdown-item" onClick={() => readyWeaponClicked(card)}>
            [{card.dice}<span class="green">{diceBonus > 0 ? `+${diceBonus}` : ""}</span>] {card.name} {weaponPassive(card)}
          </div></li>
        )}

        {backpackItems.map(card => 
          <li><div class="dropdown-item red" onClick={() => readyWeaponClicked(card)}>
            [{card.dice}<span class="green">{diceBonus > 0 ? `+${diceBonus}` : ""}</span>] {card.name} {weaponPassive(card)}
          </div></li>)}
      </Fragment>
    )
  }

  const renderObjective = () => {
    if (!me.objectiveId)
      return <span>-</span>

    const objective = mapObjectives(me.objectiveId)

    return (
      <span className="hoverable tooltip1">
        <span class="underline">{objective.showName()}</span>
        <span class="tooltiptext">
          <div class="bold">{objective.showName()}</div>
          <div dangerouslySetInnerHTML={{ __html: objective.showDesc() }}></div>
        </span>
      </span>
    )
  }

  const renderContingency = () => {
    if (!me.contingencyId)
      return <span>-</span>

    const con = mapContingencies(me.contingencyId)

    return (
      <span className="hoverable tooltip1">
        <span class="underline">{con.showName()}</span>
        <span class="tooltiptext">
          <div class="bold">{con.showName()}</div>
          <div dangerouslySetInnerHTML={{ __html: con.showDesc() }}></div>
        </span>
      </span>
    )
  }

  const hero = me.hero.name
  const cardInDeck = rule.actionDeck[hero].length
  const cardInHand = me.actionCardIds.length 
  const cardInDisplay = rule.displayCards.map(mapDeck).filter(card => card.subtype === hero).length
  const cardInTrash = me.trashActionCardIds.length
  const maxCard = cardInHand + cardInDeck + cardInDisplay + cardInTrash

  return (
    <Draggable>
      <div className='player-board'>
        <div className='inner-wrapper'>
          <div className='dice-zone'>
            {showDice && <DiceComponent showDice={showDice} rollDiceClicked={rollDiceClicked} />}
          </div>
          <div className='player-action-buttons'>
            {/* PLAYER DETAIL */}
            <div className={classNames("bold player-name", { "red": me.hp1, "purple": me.hp0 })}>
              {me.name} <br /> {me.hero.name} ({me.sessionId})
            </div>
            <div>
              แผลเล็ก: {createArray(me.lightWound).map(() => <i class="fa fa-tint red"></i>)} {renderPlayerStatChanger(me, "lightWound")}
            </div>
            <div>
              ความรู้: {me.knowledge} {renderPlayerStatChanger(me, "knowledge")}
            </div>	
            <div>
              คำสั่งฉุกเฉิน: {renderContingency()}
            </div>
            <div>
              ภารกิจ: {renderObjective()}
            </div>	
            <div>
              การ์ดแอคชั่น: {`${cardInDeck}/${maxCard}`}
            </div>
            <hr />

            {/* PLAYER ACTION BUTTON */}
            {cardInDeck > 0 
              ? <button type="button" class="btn btn-primary btn-sm" onClick={() => drawActionCardClicked(me)}>จั่วแอคชั่นการ์ด</button>
              : (
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">สับกองการ์ด</button>
                <ul class="dropdown-menu">
                  <li><div class="dropdown-item" onClick={() => reshuffleActionDeckClicked("engineer")}>ยืนยัน</div></li>
                </ul>
              </div>
            )}

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">ค้นหาสิ่งของ</button>
              <ul class="dropdown-menu">
                <li><div class="dropdown-item green" onClick={() => searchItemClicked("medic")}>การแพทย์</div></li>
                <li><div class="dropdown-item red" onClick={() => searchItemClicked("weapon")}>อาวุธ</div></li>
                <li><div class="dropdown-item orange" onClick={() => searchItemClicked("engineer")}>เชิงเทคนิค</div></li>
              </ul>
            </div>

            {/* {showDice === 0 
              ? (
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">ใช้อาวุธ</button>
                <ul class="dropdown-menu">
                  {renderDiceOption()}
                </ul>
              </div>
            ) : <button type="button" class="btn btn-primary btn-sm" onClick={() => { showDiceClicked(0); selectWeapon(null) }}>เก็บอาวุธ</button>} */}
            


            {showDice && (
              <button type="button" class="btn btn-primary btn-sm" onClick={() => showDiceClicked(null)}>รีเซตลูกเต๋า</button>
            )}

            {!showDice && (
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">ลูกเต๋า</button>
                <ul class="dropdown-menu">
                  <li><div class="dropdown-item orange" onClick={() => showDiceClicked("noise")}>ลูกเต๋า Noise</div></li>
                  <li><div class="dropdown-item red" onClick={() => showDiceClicked("red")}>ลูกเต๋าแดง</div></li>
                  <li><div class="dropdown-item blue" onClick={() => showDiceClicked("blue")}>ลูกเต๋าฟ้า</div></li>
                </ul>
              </div>
            )}

            {endGame && (
              <button type="button" class="btn btn-primary btn-sm small-btn" onClick={() => scoreBoardClicked()}>ตารางคะแนน</button>
            )}
            {/* <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm">+/- ลูกเต๋า</button>
              <ul class="dropdown-menu">
                {showDice === 0 
                  ? (renderDiceOption()) 
                  : <li><div class="dropdown-item" onClick={() => { showDiceClicked(0); selectWeapon(null) }}>รีเซตลูกเต๋า</div></li>}
              </ul>
            </div> */}
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-secondary btn-sm dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">เมนู</button>
              <ul class="dropdown-menu">
                <li><div class="dropdown-item bold">สถานะ</div></li>
                <li><div class="dropdown-item" onClick={() => playerStateToggleClicked(me, "slime")}>+/- เมือกเขียว</div></li>
                <li><div class="dropdown-item" onClick={() => playerStateToggleClicked(me, "larva")}>+/- ตัวอ่อนเอเลี่ยน</div></li>
                <li><div class="dropdown-item" onClick={() => playerStateToggleClicked(me, "signal")}>+/- สัญญาณ</div></li>
                <li><div class="dropdown-item" onClick={() => playerStateToggleClicked(me, "knowledge")}>+/- ความรู้</div></li>
                
                <li><div class="dropdown-item red" onClick={() => drawWoundCardClicked()}>ได้รับแผลใหญ่</div></li>
                <li><div class="dropdown-item" onClick={openCraftMenuClicked}>คราฟไอเทม</div></li>
                <li><div class="dropdown-item" onClick={openCraftMenuClicked}>คำสั่งกวาดล้าง</div></li>
                <li><div class="dropdown-item" onClick={openObjectiveMenuClicked}>ภารกิจ</div></li>
                <li><div class="dropdown-item" onClick={openCraftMenuClicked}>ความรู้</div></li>
              </ul>
            </div>
           
            {isMyTurn && (
              <button type="button" class="btn btn-secondary btn-sm" onClick={endTurnClicked}>จบเทิร์น</button>
            )}
          </div>
          <div className='player-detail'>
            <div class="d-flex">
              <div class='player-status'>
                {me.state.slime && (
                  <div className="hoverable tooltip1">
                    <img src="img/icon_slime.png" />
                    <span class="tooltiptext">
                      <div class="bold">เมือกเขียว</div>
                    </span>
                  </div>
                )}
                {me.state.larva && (
                  <div className="hoverable tooltip1">
                    <img src="img/icon_larva.png" />
                    <span class="tooltiptext">
                      <div class="bold">ตัวอ่อนเอเลี่ยน</div>
                    </span>
                  </div>
                )}
                {me.state.signal && (
                  <div className="hoverable tooltip1">
                    <img src="img/icon_signal.png" />
                    <span class="tooltiptext">
                      <div class="bold">ส่งสัญญาณ</div>
                    </span>
                  </div>
                )}
                {me.state.knowledge && (
                  <div className="hoverable tooltip1">
                    <img src="img/icon_idea.png" />
                    <span class="tooltiptext">
                      <div class="bold">มีความรู้</div>
                    </span>
                  </div>
                )}
                
                {me.seriousWounds.map(mapDeck).map(card => (
                  <div className="hoverable tooltip1">
                    <img src={`img/icon_wound_${card.name}.png`} />
                    <span class="tooltiptext d-flex">
                      <div class="tooltip-card-preview">
                        <ItemCard card={card} />
                        <button type="button" class="btn btn-success btn-sm btn-block" onClick={() => dressWoundClicked(me, card)}>ทำแผล</button>
                      </div>
                      <div>
                        <div class="bold red">{card.showName()}</div>
                        {card.showDesc()}
                      </div>
                    </span>
                  </div>
                ))}
                
                {me.dressedWounds.map(mapDeck).map(card => (
                  <div className="hoverable tooltip1">
                    <img src={`img/icon_wound_${card.name}_dressed.png`} />
                    <span class="tooltiptext d-flex">
                      <div class="tooltip-card-preview">
                        <ItemCard card={card} />
                        <button type="button" class="btn btn-success btn-sm btn-block" onClick={() => cureWoundClicked(me, card)}>รักษา</button>
                      </div>
                      <div>
                        <div class="bold green">{card.showName()}</div>
                        {card.showDesc()}
                      </div>
                    </span>
                  </div>
                ))}
              </div>
              {me.hero && (
                <div class="hero-card" style={{ background: `url("img/hero_${me.hero.name}.png")` }}>
                </div>
              )}
            </div>
            <div className={classNames("equip-cards")}>
              {me.equipCardIds.map(mapDeck).map(card => (
                <ItemCard card={card} onClick={() => cardClicked(card)} zoomable />
              ))}
            </div>
          </div>
          <div className='inventory'>
            <div className={classNames("action-cards")}>
              {me.actionCardIds.map(mapDeck).map(card => (
                <ItemCard card={card} onClick={() => cardClicked(card)} zoomable />
              ))}
            </div>
 
            <div className={classNames("backpack-cards")}>
              {me.backpackCardIds.map(mapDeck).map(card => (
                <ItemCard card={card} onClick={() => cardClicked(card)} zoomable />
              ))}
            </div>
    
          </div>
        </div>
      </div>
    </Draggable>
  )
}