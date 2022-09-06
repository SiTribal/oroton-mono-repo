import React, {useContext, useState, useEffect} from 'react'
import * as components from '../components'
import s from "./Pages.module.css"
import { GameSetupContext, UserContext } from '../context'
import { GameSetupType, UserType } from '../types'

const {  
  BoardSizePicker, 
  Menu, 
  StartButton, 
  GameSetup, 
  BoardDisplay 
 } = components

const Home: React.FC =  () => {
  const {setBoardSizeCB}: GameSetupType = useContext(GameSetupContext)
  const [menuDisplay, setMenuDisplay] = useState(`${s.hidden}`)
  const [bannerDisplay, setBannerDisplay] = useState(`${s.display}`)
  const {loggedIn}: UserType = useContext(UserContext)
  const [boardSizeSt, setBoardSize] = React.useState<number>(1)

  useEffect(() => {
    if(loggedIn){
      setBannerDisplay(`${s.hidden}`)
      setMenuDisplay(`${s.display}`)
    }
  },[loggedIn])

  const boardSizeCB = (boardSize: number) => {
    setBoardSize(boardSize)
    setBoardSizeCB(boardSize)
  }

  return (
    <>
      <StartButton boardSize={boardSizeSt} loggedIn={loggedIn}/>
      <div className={bannerDisplay}>
        <h2 style={
          {
            "textAlign": "center",
            "margin": "0 auto"}
        }>
          Log in to get started
        </h2>
      </div>
      <div className={menuDisplay}>
      <Menu>
        <BoardSizePicker boardSizeCallback={boardSizeCB} boardSize={boardSizeSt}/>
      </Menu>
      <GameSetup>
        <BoardDisplay boardSize={boardSizeSt}/>
      </GameSetup>
      </div>
    </>
  )
}

export default Home
