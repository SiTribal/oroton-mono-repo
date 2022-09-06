import {useState} from 'react';
import { GameSetupContext} from '../context'
import {GameSetupType} from '../types'

interface iProps {
    children: React.ReactNode
}

 const GameSetupProvider: React.FC<iProps> = ({children}: iProps) => {

    const [boardSize, setBoardSize] = useState<number | undefined>(1)
    const setBoardSizeCB = (boardSize?: number) => {
        setBoardSize(boardSize)
    }
    const gameSetupVal: GameSetupType = {
        boardSize,   
        setBoardSizeCB
    }

    return (
        <GameSetupContext.Provider value={gameSetupVal}>
            {children}
        </GameSetupContext.Provider>
    )
 }

 export default GameSetupProvider

