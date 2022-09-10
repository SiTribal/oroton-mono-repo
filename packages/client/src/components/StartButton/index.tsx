import React, {useState, useEffect, useContext} from 'react'
import { GameSetupContext } from '../../context'
import s from "./StartButton.module.css"
import { useNavigate } from 'react-router-dom'
import {useLocalStorage} from '../../hooks'
import { post } from '../../utils/http'
import {Game } from '@si/shared'


interface props{
  loggedIn?: boolean
  boardSize?: number
}

 const StartButton: React.FC<props> = ({boardSize ,loggedIn}: props) => {
  const gameSetupContext = useContext(GameSetupContext)
  const {setGameIdCB} = gameSetupContext
  const [user] = useLocalStorage<any>('user', [])
  const navigate = useNavigate()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonClass, setButtonClass] = useState<string>(`${s.container} ${s.disabled}`)
  const [_, saveBoardSizeStore] = useLocalStorage<
    Record<string, number | undefined>
  >('boardSize', {})
  

  useEffect(() => {
    if(loggedIn) {
      setButtonClass(`${s.container}`)
      setButtonDisabled(false)};
  },[loggedIn])
  
  const handleClick = () =>{

    const game: Game = {
      "username": user.user.username as string,
      "boardSize": boardSize as number
    }

    post('/game/create', game)
    .then((res: any) => {
      localStorage.removeItem('gameId')
      if(setGameIdCB){
        setGameIdCB(res.newGame._id)
      }
      localStorage.setItem("gameId", res.newGame._id)})
    .catch((err) => console.log(err))
      saveBoardSizeStore({'boardSize': boardSize})
      navigate('/game')
  }

  return (
    <button disabled={buttonDisabled} onClick={handleClick} className={buttonClass}>Start</button>
  )
}

export default StartButton
