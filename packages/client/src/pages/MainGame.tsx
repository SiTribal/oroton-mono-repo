import React, {useEffect, useState, useContext} from 'react'
import { GameSetupContext } from '../context'
import * as components from '../components'
import { useLocalStorage } from '../hooks'
import s from './Pages.module.css'
import {del, post} from '../utils/http'
import {Game } from '@si/shared'
const {BoardDisplay} = components 

 const MainGame: React.FC = () => {
    const gameSetupContext = useContext(GameSetupContext)
    const {gameId, setGameIdCB} = gameSetupContext
    const [boardSize] = useLocalStorage<any>('boardSize', []) 
    // const [gameId] = useLocalStorage<any>('gameId', []) 
    const [user] = useLocalStorage<any>('user', [])
    const [__, saveGameId] = useLocalStorage<Record<string, string | undefined>>('gameId', {})
    const [win, setWin] = useState(false)

    const gameResponseCB = () => {

    }

    useEffect(() => {
      console.log(gameId)
    },[gameId])
    const setWinCB = (win?: boolean) => {
      if(win){
        setWin(win)
      }
    }

    const resetHandler = () => {
      const game: Game = {
      "username": user.user.username as string,
      "boardSize": boardSize.boardSize as number
    }     
      del(`/game/delete/${gameId}`).then(res => console.log(res))
      post('/game/create', game).then((res: any) => {
        if(setGameIdCB) setGameIdCB(res.newGame_id)})
      window.location.reload()
    }

  return (
    <div className={s.mainGameContainer}>
      <button style={{ border: 'grey 1px solid', padding: '1rem', fontSize: '2rem', color: 'white', background: 'grey' }} onClick={() => resetHandler()}>RESET</button>
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
