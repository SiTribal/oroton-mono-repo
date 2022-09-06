import { publicKey, privateKey } from './../app';
import express, { Request, Response } from 'express'
import {createUser ,getUserByUsername } from '../service/auth.service'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authHandler = express.Router()

authHandler.post('/login', async(req, res) => {
  const {username, password} = req.body
  const user = await getUserByUsername(username)
    if (user && (await bcrypt.compare(password, user.password))){
      const accessToken = jwt.sign(username, publicKey)
      res.json({ user: user, accessToken: accessToken})
    }else{
      res.send(401)
    }
})

authHandler.post('/register', async(req: Request, res: Response) => {
    try {
        const {username, password} = req.body
        const existingUser = await getUserByUsername(username)
        if (existingUser) {
            return res.sendStatus(409).send('User Already Exist. Please Login')
          }
          const encryptedPassword = await bcrypt.hash(password, 10)
          const newUser = await createUser({
            username,
            password: encryptedPassword,
          })
          const accessToken = jwt.sign(username, privateKey)
          res.json({ user: username, accessToken: accessToken})
    }
    catch(err){
        return res.sendStatus(500).send(err)
    }
})

authHandler.get('/verify', authenticateToken, (req: Request, res: Response) => {
  res.json("token is verify")
})


function authenticateToken(req, res, next){
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

export default authHandler