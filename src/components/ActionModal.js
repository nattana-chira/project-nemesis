import { Fragment } from "react";
import ItemCard from "./ItemCard";

export default function ActionModal(props) {
  const { modalClose, me, players, rule, selectedCard, giveCardClicked, addCardToTrashClicked, confirmActionClicked, pickCardClicked,
    woundClicked } = props
  
  const isCardOwner = (card) => {
    return me.actionCardIds.includes(card.id) || me.equipCardIds.includes(card.id) || me.backpackCardIds.includes(card.id)
  }

  return (
    <div class="modal" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <button ref={modalClose} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="modal-body">
            {selectedCard && <ItemCard card={selectedCard} classes="none-animation item-card-lg" />}
          </div>
          <div class="modal-footer">
            <div>
              <h5 class="footer-text" id="exampleModalLabel">
                <div><strong>{selectedCard?.showName()}</strong> </div>
                <div dangerouslySetInnerHTML={{ __html: selectedCard?.showDesc() }}></div>
              </h5>
              <hr />
              <div class="d-grid gap-2 footer-button">

                {selectedCard && selectedCard.type === "wound" && (
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      ได้รับแผลใหญ่
                    </button>
                    <ul class="dropdown-menu">
                      <li><div class="dropdown-item" onClick={woundClicked}>ยืนยัน</div></li>
                    </ul>
                  </div>
                )}

                {selectedCard && (selectedCard.canBePicked(me)) && rule.displayCards.includes(selectedCard.id) && (
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      หยิบการ์ด
                    </button>
                    <ul class="dropdown-menu">
                      <li><div class="dropdown-item" onClick={pickCardClicked}>ยืนยัน</div></li>
                    </ul>
                  </div>
                )}

                {selectedCard && isCardOwner(selectedCard) && (
                  <Fragment>
                    <button type="button" class="btn btn-primary" onClick={confirmActionClicked}>
                      ใช้งาน
                    </button>
                    
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        มอบให้ผู้เล่นอื่น
                      </button>
                      <ul class="dropdown-menu">
                        {players.filter(_player => _player.sessionId !== me.sessionId).map(player => (
                          <li><div class="dropdown-item" onClick={() => giveCardClicked(selectedCard, player)}>{player.name}</div></li>
                        ))}
                      </ul>
                    </div>
                    
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        ทิ้งการ์ด
                      </button>
                      <ul class="dropdown-menu">
                        <li><div class="dropdown-item" onClick={() => addCardToTrashClicked(selectedCard)}>ยืนยัน</div></li>
                      </ul>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}