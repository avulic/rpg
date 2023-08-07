import mongoose from 'mongoose'
import { RpgServer, RpgModule, RpgServerEngine, RpgPlayer, RpgWorld, RpgPlugin, RpgServerEngineHooks } from '@rpgjs/server'
import Player from './mmorpg/model'


declare module '@rpgjs/server' {
    export interface RpgPlayer {
        mongoId: string
    }
}

function mongoLog(msg, ...more) {
    console.log(`RPGJS MongoDB => ${msg}`, ...more)
}

function Error401() {
    const error = new Error()
    error['status'] = 401
    return error
}

async function login(body) {
    const { nickname, password } = body
    const player = await Player.findOne({
        nickname
    }) as any
    if (!player) {
        throw Error401()
    }
    const valid = await player.verifyPassword(password)
    if (!valid) {
        throw Error401()
    }
    return {
        nickname: player.nickname,
        _id: player._id,
        data: player.data
    }
}

const originalSaveMethod = RpgPlayer.prototype.save

RpgPlayer.prototype.save = function (): string {
    const json = originalSaveMethod.apply(this)
    Player.findByIdAndUpdate(this.mongoId, { data: json }).catch(err => {
        console.log(err)
    })
    return json
}


const engine: RpgServerEngineHooks = {
    onStart(engine: RpgServerEngine) {
        console.log("server from server");
        const app = engine.app
        const { mongodb } = engine.globalConfig.titleScreen || engine.globalConfig
        if (!mongodb) {
            mongoLog('Please note that you have not specified the link to mongodb. The connection, uploading and saving will not work')
        }
        else {
            mongoLog('Waiting for connection to MongoDB...')
            mongoose.connect(mongodb).then(() => {
                mongoLog('Super, your Game is connected with MongoDB')
            }).catch(err => {
                mongoLog('A problem occurred when connecting to MongoDB', err)
            })
        }
        app.post('/login', async (req, res, next) => {
            try {
                const user = await login(req.body)
                res.json(user)
            }
            catch (err: any) {
                res.status((err).status || 500).json(err)
            }
        })
        app.post('/user/exists', async (req, res, next) => {
            try {
                const { nickname } = req.body
                const player = await Player.findOne({
                    nickname
                }) as any
                res.json({
                    exists: !!player
                })
            }
            catch (err) {
                res.status(500).json(err)
            }
        })
        app.post('/user/create', async (req, res, next) => {
            try {
                const { nickname, email, password } = req.body
                const player = new Player({
                    nickname,
                    email,
                    password
                })
                await player.save()
                res.status(204).send()
            }
            catch (err) {
                res.status(500).json(err)
            }
        })
    }
}




export default engine