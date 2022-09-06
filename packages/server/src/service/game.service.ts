import mongoose, {DocumentDefinition} from "mongoose";
import GameModel, {GameDocument} from '../model/game.model'

export async function createGame(game:DocumentDefinition<GameDocument>){
    return GameModel.create(game)
}

export async function getGameById(id: string){
    return GameModel.findOne({_id: new mongoose.Types.ObjectId(id)}).lean()
}

export async function updateMoves(id: string, moves: any){
    return GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
        },
        {moves: moves},
        {new: true}
    )
}