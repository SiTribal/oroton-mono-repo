import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {GameTile} from '../components/Tiles'
import { useLocalStorage } from '../hooks'
import s from './Pages.module.css'

 const GameLog: React.FC = () => {

  const [previousGames] = useLocalStorage<any>('previous-games', [])
  const {id} = useParams()
  const navigate = useNavigate()
  const {boardSize, currentGame} = previousGames.previousGames.filter((el: any) => el.id === id)[0]
  const boardDisplay = Array(boardSize * boardSize).fill('_').map((el, i) => `{"x":${i % boardSize}, "y":${Math.floor(i / boardSize)}}`)

  return (
    <div className={s.container}
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${boardSize}, auto)`,
      gridTemplateRows: `repeat(${boardSize}, 1fr)`
    }}
    >
          {
              boardDisplay.map((id, i) => {
                let className;
                let child;
              if(currentGame.find((el:any) => el.coOrd === id)){
                  const {color} = currentGame.find((el:any) => el.coOrd === id)
                className = `${s[color]}  ${s.finishTile}`
                child = currentGame.findIndex((el: any) => el.coOrd === id) + 1
              }
              else {
                className = s.finishTile
              }
    return (
      <GameTile className={className} clickFunction={() => {} } id ={id}>
        <span>{child}</span>  
      </GameTile>
    )
  })

          }
          <button style={{ border: 'grey 1px solid', padding: '1rem', fontSize: '2rem', color: 'white', background: 'grey', position: 'absolute', top: '10rem', left: '50rem'}} onClick={() => navigate('/games')}>back</button>
    </div>
  )
}

export default GameLog