import mongoose, {Document} from 'mongoose'
import { UserDocument } from './user.model'

export interface GameDocument extends Document {
    username: UserDocument["_id"],
    start?: Date,
    finish?: Date,
    winner?: string,
    moves?: any
}

const gameSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    finish: {type: Date, require: false},
    winner: {type: String, require: false},
    moves: {type: Map, of: String}
}, {timestamps: true})

export default mongoose.model<GameDocument>('Game', gameSchema)