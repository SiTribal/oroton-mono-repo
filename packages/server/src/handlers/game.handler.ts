import express, { Request, Response } from 'express'
import {createGame, updateMoves} from '../service/game.service'
import { getUserByUsername } from '../service/auth.service'
import { getGameById } from '../service/game.service'

const gameHandler = express.Router()

gameHandler.post('/create', async(req: Request, res: Response) => {
    console.log('check')
    const requestObject = req as any
    const userId: any = await getUserByUsername(requestObject.body.username)
    const username = userId._id
    const moves = new Map()
    const newGame = await createGame({
        username,
        moves
    })
    try {
        res.json({newGame})
    }catch(err){
        console.log(err)
    }
})

gameHandler.put('/:id', async(req: Request, res: Response) => {
    const currentGame: any = await getGameById(req.params.id)
    if(currentGame){
        try{
            console.log('check')
            const color = req.body.color
            const move = req.body.move
            console.log(currentGame.moves instanceof Map)
            console.log(currentGame.moves)
            currentGame.moves[move] = color
            const updatedGame = await updateMoves(req.params.id, currentGame.moves)
            console.log(updatedGame)
            res.json({updatedGame})
        }
        catch(err){
            res.json(err)
        }
    }
})
// read the existing game
// check if the moves is greater than 5 if yes check if  it is a win 
// if it is a win then update the response 
export default gameHandler
