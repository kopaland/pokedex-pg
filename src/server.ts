import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import TeamsController from './controllers/TeamsController'
import TrainersController from './controllers/TrainersController'
import pool from './configs/postgresConnector'

export default class Server {
  private app

  constructor() {
    this.app = express()
    this.config()
    this.routerConfig()
    this.dbConnect()
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ limit: '1mb' })) // 100kb default
    this.app.use(
      cors({
        origin: '*',
        methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    )
  }

  private dbConnect() {
    pool.connect((err, client, done) => {
      if (err) throw new Error(err)
      console.log('Connected')
    })
  }

  private routerConfig() {
    this.app.use('/v1/teams', TeamsController)
    this.app.use('/v1/trainers', TrainersController)
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port)
        })
        .on('error', (err: Object) => reject(err))
    })
  }
}
