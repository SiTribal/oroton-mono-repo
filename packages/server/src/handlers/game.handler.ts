import express, { Request, Response } from 'express'
import {createGame, updateMoves, deleteGame} from '../service/game.service'
import { getUserByUsername } from '../service/auth.service'
import { getGameById } from '../service/game.service'
import {Game} from '@si/shared'
import { checkForWin } from '../utils/checkForWin'

const gameHandler = express.Router()

gameHandler.post('/create', async(req: Request, res: Response) => {
    console.log('check')
    const requestObject = req as any
    const userId = await getUserByUsername(requestObject.body.username) as unknown as Game
    const username = userId._id as string
    const boardSize = req.body.boardSize
    const moves = new Map()
    const game: Game = {
        username,
        boardSize,
        moves
    }
    const newGame = await createGame(game)
    try {
        res.json({newGame})
    }catch(err){
        console.log(err)
    }
})

gameHandler.get('/:id', async(req: Request, res: Response) => {
    const currentGame = await getGameById(req.params.id) as Game
    try{
        res.status(200).json(currentGame)
    }
    catch(err){
        res.status(500).json(err)
    }
})

gameHandler.put('/:id', async(req: Request, res: Response) => {
    const currentGame: any = await getGameById(req.params.id)
    if(currentGame){
        try{
            const color = req.body.color
            const move = req.body.move
            currentGame.moves[move] = color
            const updatedGame = await updateMoves(req.params.id, currentGame.moves)
            type Moves = Map<string, string>
            const {boardSize, moves} = updatedGame as Game
            try{
                const lastPlayerTurn = Array.from(moves as Moves)[Array.from(moves as Moves).length-1] 
                const color = lastPlayerTurn[1]
                const target = lastPlayerTurn[0]
                console.log(moves)
                console.log(checkForWin(moves as Moves, color as 'black' | 'white', target))
                if(checkForWin(moves as Moves, color as 'black' | 'white', target)){
                    const responseObject = {
                        ...updatedGame,
                        status: {
                            "status": 'win',
                            "player": color
                        }
                    }
                    res.json({responseObject})    
                }                                 
                else if(moves?.size === (boardSize * boardSize)){
                    const responseObject = {
                        ...updatedGame,
                        status: {
                            "status":'draw',
                            "player": color
                        }
                    }
                    res.json({responseObject})
                }
                else{
                    const responseObject = {
                        ...updatedGame,
                        status: {
                            "status":'play',
                            "player": color
                        }
                    }
                    res.json({responseObject})
                }
            }
            catch(err){
                console.log(err)
            }
            
        }
            catch(err){
            console.log(err)
        }
    }
})

gameHandler.delete('/delete/:id', async(req:Request, res:Response) => {
    const gameId = req.params.id
    const deletedGame = await deleteGame(gameId)
    return res.json(deletedGame)
})
// read the existing game
// check if the moves is greater than 5 if yes check if  it is a win 
// if it is a win then update the response 
export default gameHandler
