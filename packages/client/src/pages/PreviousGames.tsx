import React, {useEffect, useState} from 'react'
import { ElementFlags } from 'typescript'
import {GameLogs} from '../components'
import { useLocalStorage } from '../hooks'
import {get} from '../utils/http'

export default function PreviousGames() {

  const [previousGames, setPreviousGames] = useState<any>()

  const returnWinner = (arg: any) => {
    const winner = Object.values(arg).length -1
    return Object.values(arg)[winner]
  }

  useEffect(() => {
    get('/game/all')
    .then((res) => {
      const resMap: [] = res as []
      const gameLogs = resMap.map((el: any) => ({"date": el.createdAt, "id": el._id, "moves": el.moves, "winner": returnWinner(el.moves)}))
      setPreviousGames(gameLogs)
    })
  },[])
  return (

    <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ marginTop: '10rem' }}>
        {
          previousGames ? previousGames.map((el: any, i: number) =>  <GameLogs key={i} index={i + 1} date={el.date}
          winner={el.winner} link={`game-log/${el.id}`}/>) : <></>
        }
      </div>
    </div>

  )
}
