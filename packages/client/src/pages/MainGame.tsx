import React, {useState} from 'react'
import * as components from '../components'
import { useLocalStorage } from '../hooks'
import s from './Pages.module.css'
const {BoardDisplay} = components 

 const MainGame: React.FC = () => {

    const [boardSize] = useLocalStorage<any>('boardSize', []) 
    const [gameId] = useLocalStorage<any>('gameId', []) 
    const [win, setWin] = useState(false)

    const setWinCB = (win?: boolean) => {
      if(win){
        setWin(win)
      }
    }


  return (
    <div className={s.mainGameContainer}>
      <button style={{ border: 'grey 1px solid', padding: '1rem', fontSize: '2rem', color: 'white', background: 'grey' }} onClick={() => window.location.reload()}>RESET</button>
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
