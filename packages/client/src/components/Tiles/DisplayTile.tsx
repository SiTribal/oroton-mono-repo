import React from 'react'

interface iProp{
    className: string
}


 const DisplayTile:React.FC<iProp> = ({className}: iProp) => {
    return <div className={className}></div>
}


export default DisplayTile
