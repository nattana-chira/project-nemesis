import classNames from "classnames"
import Draggable from "react-draggable"

export default function MapAlien({ rule, isAdmin, onControlled, killAlienClicked, trashAlienClicked }) {
  const backgroundStyle = (alien) => ({ backgroundImage: `url('img/alien-${alien.name}.png')` })

  return rule?.aliens.map(alien => (
    <Draggable
      position={alien.position} 
      onStop={(e, pos) => onControlled(e, pos, alien.id)}
    >
      <div className={classNames(`alien-wrapper hoverable blink_me_sec`)}>
        <div>
          <div className={`alien breathing alien-${alien.name}`} style={backgroundStyle(alien)} data-bs-toggle="dropdown" aria-expanded="false"></div>
          <ul class="dropdown-menu" aria-labelledby={`alien-${alien.id}`}>
            <li><div class="dropdown-item" onClick={() => killAlienClicked(alien)}>ฆ่า [{alien.name}]</div></li>
            <li><div class="dropdown-item red" onClick={() => trashAlienClicked(alien)}>ทิ้ง [{alien.name}]</div></li>
          </ul>
        </div>
      </div>
    </Draggable>
  ))
}