import React from 'react'
import s from "./Menu.module.css"

interface iProp{
    children?: React.ReactNode
}

const Menu:React.FC<iProp> = ({children}) => {
  return (
    <div className={s.container}>
        {children}
    </div>
  )
}

export default Menu