import mongoose, { DocumentDefinition } from 'mongoose'
import UserModel, { UserDocument } from '../model/user.model'
import { publicKey, privateKey } from './../app';
import jwt from 'jsonwebtoken'

export async function getUserByUsername(username: string) {
  return UserModel.findOne({ username }).lean()
}

export async function getUserById(id: string) {
  return UserModel.findOne({ _id: new mongoose.Types.ObjectId(id) }).lean()
}

export async function createUser(user: DocumentDefinition<UserDocument>) {
  return UserModel.create(user)
}

export function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] 
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, privateKey, (err, user) => {
      if(err) {
        console.log(err)
        return res.sendStatus(403)};
      req.user = user
      next()
  })
}