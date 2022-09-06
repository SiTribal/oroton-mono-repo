import {createContext} from 'react'
import {GameSetupType} from '../types'

const GameSetupContext = createContext<GameSetupType>({} as GameSetupType)
export default GameSetupContext;

