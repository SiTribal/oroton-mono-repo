import React from 'react'
import {GameLogs} from '../components'
import { useLocalStorage } from '../hooks'

export default function PreviousGames() {
const [previousGames] = useLocalStorage<any>('previous-games', [])
  return (

    <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ marginTop: '10rem' }}>
        {previousGames.previousGames.map((el: any, i: number) =>  <GameLogs key={i} index={i + 1} date={el.date}
          winner={el.winner} link={`game-log/${el.id}`}/>)}
      </div>
    </div>

  )
}
