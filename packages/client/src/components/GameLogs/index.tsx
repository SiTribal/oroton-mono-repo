import React from 'react'

interface iProps{
    index?: number
    date?: string
    winner?: string
    link?: string

}

 const GameLogs: React.FC<iProps> = ({index, date, winner, link = '/game-log/1'}: iProps) => {
  return (
      <div style= {{ backgroundColor: 'aliceblue', border: 'solid 1px blue', margin: '1rem', padding: '3rem', 
      fontSize: '2rem' }}>Game:{index} @{date} winner:{winner} <a href={link}>View Game Log</a></div>
  )
}

export default GameLogs
