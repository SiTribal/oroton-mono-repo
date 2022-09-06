import React from 'react'

interface iProp{
    className: string
    clickFunction : (e: any) => void
    ref?: React.ForwardedRef<HTMLInputElement>
    id: string
    children?: React.ReactNode
}

 const GameTile: React.FC<iProp> = React.forwardRef(
  ({className, clickFunction, id, children}: iProp,
    ref?: React.ForwardedRef<HTMLInputElement>
    ) => {
  return <div id={id} ref={ref} onClick ={(e) => clickFunction(e)}  className={className}>
    {children}
  </div>
})

export default GameTile