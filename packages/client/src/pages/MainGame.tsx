import React, {useEffect, useState, useContext} from 'react'
import { GameSetupContext } from '../context'
import * as components from '../components'
import { useLocalStorage } from '../hooks'
import s from './Pages.module.css'
import {del, post} from '../utils/http'
import {Game } from '@si/shared'
import { useNavigate } from 'react-router-dom'
const {BoardDisplay} = components 

 const MainGame: React.FC = () => {
    const gameSetupContext = useContext(GameSetupContext)
    const {gameId, setGameIdCB} = gameSetupContext as any
    const [boardSize] = useLocalStorage<any>('boardSize', []) 
    const [user] = useLocalStorage<any>('user', [])
    const [win, setWin] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
      console.log(gameId)
    },[gameId])
    const setWinCB = (win?: boolean) => {
      if(win){
        setWin(win)
      }
    }

    const resetHandler = () => {
      const gameId: any = localStorage.getItem('gameId')
      console.log(JSON.parse(gameId).gameId)
      const x = JSON.parse(gameId).gameId
      const game: Game = {
      "username": user.user.username as string,
      "boardSize": boardSize.boardSize as number
    }     
    console.log(game)
      del(`/game/delete/${x}`).then(res => console.log(res))
      post('/game/create', game).then((res: any) => {
          setGameIdCB(res.newGame_id)
        })
        window.location.reload()
    }

    const returnHomeHandler = () => {
      console.log(gameId)
      del(`/game/delete/${gameId}`).then((res) => console.log(res))
      localStorage.removeItem('gameId')
      navigate('/')
    }

  return (
    <div className={s.mainGameContainer}>
      <button style={{ border: 'grey 1px solid', padding: '1rem', fontSize: '2rem', color: 'white', background: 'grey' }} onClick={() => resetHandler()}>RESET</button>
      <button style={{ border: 'grey 1px solid', padding: '1rem', fontSize: '2rem', color: 'white', background: 'grey' }} onClick={() => returnHomeHandler()}>Return Home</button>
      <div>
        <BoardDisplay 
        gameId={gameId}
        boardMap={new Map()} 
        boardSize={boardSize.boardSize} 
        gameActive={true}
        setWinCB= {setWinCB}
        />
    </div>
    </div> 
  )
}

export default MainGame
