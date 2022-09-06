import { GeneratePair } from './../Keys/Generator';
import express, {Express} from 'express'
import dotenv from 'dotenv'
import authHandler from './handlers/auth.handler'
import gameHandler from './handlers/game.handler'
import mongoose from 'mongoose'
import connectDB from './utils/connectDB'
dotenv.config();
connectDB()

import * as fs from "fs";
import * as path from "path";

GeneratePair()
export const privateKey = fs.readFileSync(
  path.join(__dirname, "../Keys/private.pem"), "utf8");
export const publicKey = fs.readFileSync(path.join(__dirname, "../Keys/public.pem"), "utf8")

const app: Express = express()
const port = process.env.PORT 
app.use(express.json())

app.use('/api/auth', authHandler)
app.use('/game', gameHandler)

mongoose.connection.once('connected', () => {
  console.log('⚡️[server]: Connected to MongoDB.')
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  })
})