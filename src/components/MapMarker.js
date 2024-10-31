import classNames from "classnames"
import Draggable from "react-draggable"

export default function MapMarker({ rule, onControlled, traskMakerClicked }) {
  const backgroundStyle = (marker) => ({ backgroundImage: `url('img/marker_${marker.name}.png')` })

  return rule?.markers.map(marker => (
    <Draggable
      position={marker.position} 
      onStop={(e, pos) => onControlled(e, pos, marker.id)}
    >
      <div className={classNames(`marker-wrapper hoverable blink_me_sec`)}>
        <div>
          <div className={`marker breathing marker-${marker.name}`} style={backgroundStyle(marker)} data-bs-toggle="dropdown" aria-expanded="false"></div>
          <ul class="dropdown-menu" aria-labelledby={`marker-${marker.id}`}>
            <li><div class="dropdown-item red" onClick={() => traskMakerClicked(marker)}>ทิ้ง [{marker.name}]</div></li>
          </ul>
        </div>
      </div>
    </Draggable>
  ))
}