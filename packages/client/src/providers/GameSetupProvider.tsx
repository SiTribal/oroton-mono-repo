import {useState} from 'react';
import { GameSetupContext} from '../context'
import {GameSetupType} from '../types'

interface iProps {
    children: React.ReactNode
}

 const GameSetupProvider: React.FC<iProps> = ({children}: iProps) => {

    const [boardSize, setBoardSize] = useState<number | undefined>(1)
    const [gameId, setGameId] = useState<string | undefined>('')
    const setBoardSizeCB = (boardSize?: number) => {
        setBoardSize(boardSize)
    }
    const setGameIdCB = (gameId?: string) => {
        setGameId(gameId)
    }
    const gameSetupVal: GameSetupType = {
        boardSize,
        gameId,
        setGameIdCB,   
        setBoardSizeCB
    }

    return (
        <GameSetupContext.Provider value={gameSetupVal}>
            {children}
        </GameSetupContext.Provider>
    )
 }

 export default GameSetupProvider

