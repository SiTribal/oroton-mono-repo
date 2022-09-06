import React, { useEffect, useRef, useState } from 'react'
import s from './BoardDisplay.module.css'
import { DisplayTile, GameTile } from '../Tiles'
import { checkForWin } from '../../utils/checkForWin'
import { useLocalStorage } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import {put} from '../../utils/http'
interface iProp {
  gameId?: string
  boardSize?: number
  gameActive?: boolean
  boardMap?: Map<string, string>
  setWinCB?: (win: boolean) => void
  saveWinCB?: (win: WinObject, playerTurn: any, currentGame: any, id:any) => void
}

const boardMapCB = (
  currentTile: string,
  boardMap: Map<string, string>,
  color: 'black' | 'white'
) => {
  const updatedMap = boardMap
  updatedMap.set(currentTile, color)
  return updatedMap
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
  saveWinCB
}: iProp) => {

  const navigate = useNavigate()
  const returnDraw = () => {
    setEmptyTiles(emptyTiles - 1)
  }


  const [previousGames, savePreviousGames] = useLocalStorage<
    Record<string, WinObject[]>
  >('previous-games', {})

  const tileRef = useRef<Array<HTMLDivElement | null | undefined>>([])
  const [playerTurn, setPlayerTurn] = useState<'black' | 'white'>('black')


  // const [gameId, setGameId] = React.useState('')
  const [boardDisplay, setBoardDisplay] = React.useState(0)
  const [currentGame, setCurrentGame] = useState<MoveObject[]>()
  const [win, setWin] = useState(false)
  const [winObject, setWinObject] = useState<WinObject>({} as WinObject)
  const [draw, setDraw] = useState(false)
  const [emptyTiles, setEmptyTiles] = useState(boardSize * boardSize)
  const [winBanner, setWinBanner] = useState('')
  const dynamicMessageDisplay = gameActive ? (
    <>{playerTurn} player turn</>
  ) : (
    <>
      {JSON.stringify(boardDisplay)} * {JSON.stringify(boardDisplay)}
    </>
  )

  const clickFunction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const gameID = gameId as any
    console.log(gameId)
    put(`game/${gameID.gameId}`, {"color":playerTurn, "move": e.currentTarget.id}).then((res) => console.log(res))
    if(emptyTiles - 1 === 0){
      setDraw(true)
    }
    returnDraw()
    if (!win) {
      const { id } = e.currentTarget
      if(!boardMap.has(id)){
        const currentMap = boardMapCB(
          id,
          boardMap as Map<string, string>,
          playerTurn
        )
        tileRef.current.forEach(el => {
          if (el?.id === id) {
            if (playerTurn === 'white') {
              if (currentGame) {
                setCurrentGame([...currentGame, { color: 'white', coOrd: id }])
              } else {
                setCurrentGame([{ color: 'white', coOrd: id }])
              }
              el.classList.add(`${s.white}`)
              if (checkForWin(currentMap, playerTurn, e)) {
                const currGameArr = [...currentGame as [], {
                  color: playerTurn,
                  coOrd: id
                }]
                const arr = []
                const date = new Date()
                const dateFormat: string =
                date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
                const winObject: WinObject = {
                  boardSize: boardSize,
                  id: JSON.stringify(new Date()),
                  winner: playerTurn,
                  currentGame: currGameArr as MoveObject[],
                  date: dateFormat
                }
                if (previousGames.previousGames) {
                  arr.push(...previousGames.previousGames, winObject)
                } else {
                  arr.push(winObject)
                }
                if(saveWinCB) saveWinCB(
                  winObject,
                  playerTurn,
                  currentGame,
                  id
                )
                savePreviousGames({ previousGames: arr })
                setWin(true)
                setWinBanner(playerTurn + ' has won')
                if (setWinCB) setWinCB(true)
              } else {
                setPlayerTurn('black')
              }
            } else {
              if (currentGame) {
                setCurrentGame([...currentGame, { color: 'black', coOrd: id }])
              } else {
                setCurrentGame([{ color: 'black', coOrd: id }])
              }
              el.classList.add(`${s.black}`)
              const date = new Date()
              const dateFormat: string =
                date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
              if (checkForWin(currentMap, playerTurn, e)) {
                const currGameArr = [...currentGame as [], {
                  color: playerTurn,
                  coOrd: id
                }]
                const arr = []
                const winObject: WinObject = {
                  boardSize: boardSize,
                  id: JSON.stringify(new Date()),
                  winner: playerTurn,
                  currentGame: currGameArr as MoveObject[],
                  date: dateFormat
                }
                setWinObject(winObject)
                if (previousGames.previousGames) {
                  arr.push(...previousGames.previousGames, winObject)
                } else {
                  arr.push(winObject)
                }
                setWin(true)
                setWinBanner(playerTurn + ' has won')
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
    if(win){
      navigate('/games')
      const arr = []
      if (previousGames.previousGames) {
        arr.push(...previousGames.previousGames, winObject)
      } else {
        arr.push(winObject)
      }
      savePreviousGames({ previousGames: arr })
    } else {
      navigate('/')
    }
  }

  const dynamicBoardDisplay = gameActive
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
      <button style={{ border: 'grey 1px solid', padding: '1rem', fontSize: '2rem', color: 'white', background: 'grey', position: 'absolute', left: '20rem', 
      top: '7rem' }} onClick = {clickHandler}>{win ? <div style={{ margin: 'auto' }}>Store Game</div> : <>Return Home</>}</button>
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
