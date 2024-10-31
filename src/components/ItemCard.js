import classNames from "classnames";
import { Fragment, useState } from "react";

export default function ItemCard({ card, zoomable = false, classes = "", onClick = () => {}}) {
  const [isHover, setHover] = useState(false)

  console.log("card: ", card)

  let imgName = ""
  if (card.type === "action")
    imgName = `card_${card.subtype}_${card.name}`
  if (card.type === "item")
    imgName = `item_${card.name}_${card.color}`
  if (card.type === "item" && card.color === null)
    imgName = `card_object_${card.name}`
  if (card.type === "alien")
    imgName = `card_alien_${card.name}`
  if (card.type === "event")
    imgName = `card_event_${card.name}`
  if (card.type === "wound")
    imgName = `wound_${card.name}`
  if (card.type === "weakness" )
    imgName = `card_weakness_${card.name}`

  return (
    <Fragment>
      <img 
        onMouseEnter={() => setHover(!isHover)}
        onMouseLeave={() => setHover(!isHover)}
        className={classNames("item-card blink_me_sec " + classes)}
        src={`img/${imgName}.png`} alt={imgName} 
        onClick={(e) => onClick(card)} 
      /> 
      {isHover && zoomable && (
        <div class="item-card-hover">
          <img 
            onMouseEnter={() => setHover(!isHover)}
            onMouseLeave={() => setHover(!isHover)}
            className={classNames("item-card " + classes)}
            src={`img/${imgName}.png`} alt={imgName} 
            onClick={(e) => onClick(card)} 
          /> 
          <div className="card-detail">
            <h5 className="card-name"><strong>{card?.showName()}</strong> </h5>
            <div className="card-desc" dangerouslySetInnerHTML={{ __html: card?.showDesc() }}></div>
          </div>
        </div>
      )}
    </Fragment>
  )
}