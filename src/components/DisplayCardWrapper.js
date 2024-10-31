import { mapDeck } from "../classes/Deck";
import ItemCard from "./ItemCard";

export default function DisplayCardWrapper({ rule, cardClicked }) {

  if (rule.displayCards.length <= 0) 
    return null

  return (
    <div className='card-display'>
      {rule.displayCards.map(mapDeck).map(card => 
        <ItemCard card={card} classes="item-card-md" onClick={cardClicked} />)}
    </div>
  )
}