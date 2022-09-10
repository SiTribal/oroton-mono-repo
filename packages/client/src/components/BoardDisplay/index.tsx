import React, { useEffect, useRef, useState, useContext } from 'react'
import { GameSetupContext } from '../../context'
import s from './BoardDisplay.module.css'
import { DisplayTile, GameTile } from '../Tiles'
import { useLocalStorage } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import {put, del, get} from '../../utils/http'
interface iProp {
  gameId?: string
  boardSize?: number
  gameActive?: boolean
  boardMap?: Map<string, string>
  setWinCB?: (win: boolean) => void
  saveWinCB?: (win: WinObject, playerTurn: any, currentGame: any, id:any) => void
}


export type MoveObject = {
  color: 'black' | 'white'
  coOrd: string
}
export interface WinObject {
  id: string
  boardSize: number
  date: string
  winner: 'black' | 'white'
  currentGame: MoveObject[] | undefined
}



const BoardDisplay: React.FC<iProp> = ({
  gameId,
  boardSize = 6,
  gameActive = false,
  boardMap = new Map(),
  setWinCB,
}: iProp) => {

  const navigate = useNavigate()
  const tileRef = useRef<Array<HTMLDivElement | null | undefined>>([])
  const [playerTurn, setPlayerTurn] = useState<'black' | 'white'>('black')
  const [boardDisplay, setBoardDisplay] = React.useState(0)
  const [currentGame, setCurrentGame] = useState<MoveObject[]>()
  const [win, setWin] = useState(false)
  const [draw, setDraw] = useState(false)
  const [winBanner, setWinBanner] = useState('')
  const dynamicMessageDisplay = gameActive ? (
    <>{playerTurn} player turn</>
  ) : (
    <>
      {JSON.stringify(boardDisplay)} * {JSON.stringify(boardDisplay)}
    </>
  )

  const postMoveCheckWin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    put(`game/${gameId}`, {"color":playerTurn, "move": e.currentTarget.id})
    .then((res: any) => {
      const {status} = res.responseObject.status
      if(status==='win'){
        setWin(true)
        setWinBanner(playerTurn + ' has won')
      }
      if(status==='draw'){
        setDraw(true)
      }
    })
    .catch(err => console.log(err))
  }

  const clickFunction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!win) {
      const { id } = e.currentTarget
      if(!boardMap.has(id)){
        boardMap.set(id, playerTurn)
       postMoveCheckWin(e)
        tileRef.current.forEach(el => {
          if (el?.id === id) {
            if (playerTurn === 'white') {
              if (currentGame) {
                setCurrentGame([...currentGame, { color: 'white', coOrd: id }])
              } else {
                setCurrentGame([{ color: 'white', coOrd: id }])
              }
              el.classList.add(`${s.white}`)
              setPlayerTurn('black')
            } else {
              if (currentGame) {
                setCurrentGame([...currentGame, { color: 'black', coOrd: id }])
              } else {
                setCurrentGame([{ color: 'black', coOrd: id }])
              }
              el.classList.add(`${s.black}`)
              if (win) {
                setWin(true)
                if (setWinCB) setWinCB(true)
              }
              setPlayerTurn('white')
            }
          }
        })
      }
    }
  }

  const clickHandler = () => {
    navigate('/games')
  }


  let dynamicBoardDisplay = gameActive
    ? <>  {
      Array(boardDisplay * boardDisplay)
        .fill('_')
        .map((_, i) => (
          <GameTile
            id={`{"x":${i % boardSize}, "y":${Math.floor(i / boardSize)}}`}
            ref={(el: HTMLDivElement | null | undefined) =>
              (tileRef.current[i] = el)
            }
            clickFunction={clickFunction}
            key={`${i}`}
            className={s.gameTile}
          />
        ))}
        {win ?<button style={{ border: 'grey 1px solid', padding: '1rem', fontSize: '2rem', color: 'white', background: 'grey', position: 'absolute', left: '20rem', 
      top: '7rem' }} onClick = {clickHandler}>Store Game</button> : <></>}
      
    </> 
    : Array(boardDisplay * boardDisplay)
        .fill('_')
        .map((_, i) => <DisplayTile key={`${i}`} className={s.tile} />)


  useEffect(() => {
    setBoardDisplay(boardSize)
  }, [boardSize])



  return (
    <div className={s.container}>
      <div className={s.boardSize}>
        {draw ? <>Draw</> : win ? <>{winBanner}</> : dynamicMessageDisplay}
      </div>
      <div
        style={{
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: `repeat(${boardDisplay}, 1fr)`,
          gridTemplateRows: `repeat(${boardDisplay}, 1fr)`
        }}
      >
        {dynamicBoardDisplay}
      </div>
    </div>
  )
}

export default BoardDisplay
