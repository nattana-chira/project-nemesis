import classNames from 'classnames';
import Draggable from 'react-draggable';

export default function MapPlayer({ players, onControlled }) {  
  const backgroundStyle = (player) => {
    return { backgroundImage: `url('img/player.png')` }

    // if (!player?.hero)
    //   return {} 
    // return { backgroundImage: `url('img/model_${player.hero.name}.png')` }
  }

  return (
    players.map(player => (
      <Draggable
        position={player.position} 
        onStop={(e, pos) => onControlled(e, pos, player.sessionId)}
      >
        <div className='player-wrapper'>
          <div class={classNames("player-name")}>{player.name}</div>
          <div className={`player breathing ${player?.hero?.name}`} style={backgroundStyle(player)}></div>
        </div>
      </Draggable>
    ))
  )
}