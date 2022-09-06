import React from 'react'
import s from './GameSetup.module.css'

interface iProps {
  children?: React.ReactNode
}

const GameSetup: React.FC<iProps> = ({ children }: iProps) => {
  return (
    <div className={s.container}>
      <div className={s.heading}>Game Setup</div>
        <div className={s.childContainer}>
            {children}
        </div>
    </div>
  )
}

export default GameSetup
