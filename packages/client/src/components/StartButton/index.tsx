import React, {useState, useEffect, useContext} from 'react'
import s from "./StartButton.module.css"
import { useNavigate } from 'react-router-dom'
import {useLocalStorage} from '../../hooks'
import { post } from '../../utils/http'


interface props{
  loggedIn?: boolean
  boardSize?: number
}

 const StartButton: React.FC<props> = ({boardSize ,loggedIn}: props) => {
  const [user] = useLocalStorage<any>('user', [])
  const navigate = useNavigate()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonClass, setButtonClass] = useState<string>(`${s.container} ${s.disabled}`)
  const [__, saveGameId] = useLocalStorage<
    Record<string, string | undefined>
  >('gameId', {})
  const [_, saveBoardSizeStore] = useLocalStorage<
    Record<string, number | undefined>
  >('boardSize', {})
  

  useEffect(() => {
    if(loggedIn) {
      setButtonClass(`${s.container}`)
      setButtonDisabled(false)};
  },[loggedIn])
  
  const handleClick = () =>{
    post('/game/create', {"username": user.user.username}).then((res: any) => saveGameId({'gameId':res.newGame._id}))
    saveBoardSizeStore({'boardSize': boardSize})
    navigate('/game')
  }

  return (
    <button disabled={buttonDisabled} onClick={handleClick} className={buttonClass}>Start</button>
  )
}

export default StartButton
