import React from 'react'
import s from './Timer.module.css'

interface iProps {
  children?: React.ReactNode
}

const Timer: React.FC<iProps> = ({ children }: iProps) => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h3>Timer</h3>
        {children}
      </div>
    </div>
  )
}

export default Timer
