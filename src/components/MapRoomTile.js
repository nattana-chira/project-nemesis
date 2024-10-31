import classNames from "classnames"
import { Fragment } from "react"
import Tile from "../classes/Tile"

export default function MapRoomTile({ tiles }) {
  const liftTileNo = [5, 14, 24]
  const basic1TileNo = [7, 8, 9, 11, 13, 15, 18, 21, 22, 23]
  const basic2TileNo = [1, 3, 6, 12, 17, 20]
  const alertRoomTileNo = 10
  const repositoryTileNo = 4
  const backupPowerSupplyTileNo = 16
  const isolationRoomTileNo = 19
  const emptyRoomTileNo = 2

  
  const renderTile = (tileNo, i) => {
    let tile = null

    if (liftTileNo.includes(tileNo))
      tile = tiles.find(tile => tile.name === "elevetor_room")

    if (basic1TileNo.includes(tileNo))
      tile = tiles.filter(tile => tile.type === "basic_1")[i]

    if (basic2TileNo.includes(tileNo))
      tile = tiles.filter(tile => tile.type === "basic_2")[i]

    if (tileNo === alertRoomTileNo)
      tile = tiles.find(tile => tile.name === "alert_room")

    if (tileNo === repositoryTileNo)
      tile = tiles.find(tile => tile.name === "repository")

    if (tileNo === backupPowerSupplyTileNo)
      tile = tiles.find(tile => tile.name === "backup_power_supply")

    if (tileNo === isolationRoomTileNo)
      tile = tiles.find(tile => tile.name === "isolation_room")

    if (tileNo === emptyRoomTileNo)
      tile = tiles.find(tile => tile.name === "empty_room")

    const style = { backgroundImage: `url('img/tile_${tile?.name}.png')` }

    return (
      <div>
        <div className={classNames(`zone zone-${tileNo}`)} style={style} data-bs-toggle="dropdown" aria-expanded="false"></div>
        <ul class="dropdown-menu skin-dropdown-menu" aria-labelledby={`tile-${tileNo}`}>
          <li><div class="dropdown-item"><h5 className="bold">{Tile.showName(tile)}</h5> <div dangerouslySetInnerHTML={{ __html: Tile.showDesc(tile) }}></div></div></li>
          {tile && tile.actions.map(action => 
            <li>
              <div class="dropdown-item">
                <strong>{Tile.showActionName(action)}</strong> <div dangerouslySetInnerHTML={{ __html: Tile.showActionDesc(action) }}></div>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }


  return (
    <Fragment>
      {basic1TileNo.map((tileNo, i) => renderTile(tileNo, i))}
      {basic2TileNo.map((tileNo, i) => renderTile(tileNo, i))}
      {liftTileNo.map((tileNo) => renderTile(tileNo))}
      {renderTile(alertRoomTileNo)}
      {renderTile(repositoryTileNo)}
      {renderTile(backupPowerSupplyTileNo)}
      {renderTile(isolationRoomTileNo)}
      {renderTile(emptyRoomTileNo)}
    </Fragment>
  )
}