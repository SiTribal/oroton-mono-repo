import mongoose, {Document} from 'mongoose'
import { UserDocument } from './user.model'

export interface GameDocument extends Document {
    username: UserDocument["_id"],
    moves?: Map<string, string>
    boardSize: number
}

const gameSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    moves: {type: Map, of: String},
    boardSize: {type: Number}
}, {timestamps: true})

export default mongoose.model<GameDocument>('Game', gameSchema)