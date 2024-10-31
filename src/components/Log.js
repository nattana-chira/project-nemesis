import Draggable from "react-draggable"

export default function Log({ players, log }) {
  const renderLog = (_log) => {
    if (!_log) return null

    let actor = players.find(_player => _player.sessionId === _log.sessionId)
    actor = actor ? `<span class="bold">${actor?.name}</span>:` : ""
    const message = `${actor} ${_log.msg}`

    return <div dangerouslySetInnerHTML={{ __html: `<div>- ${message}</div>` }}></div>
  }

  return (
    <Draggable>
      <div className="log-wrapper">
        {log.slice(Math.max(log.length - 16, 0)).map(renderLog)}
      </div>
    </Draggable>
  )
}