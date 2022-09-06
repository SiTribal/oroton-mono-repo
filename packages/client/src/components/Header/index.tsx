import React from 'react'
import s from './Header.module.css'

interface iProp {
  children?: React.ReactNode
}

const Header:React.FC<iProp> = ({children}: iProp) => {
  return (
    <div className={s.header}>
      <div className={s.container}>
          <h1><a href ='/'>Gomoku</a></h1>
      </div>
      {children}
    </div>
  )
}


export default Header;