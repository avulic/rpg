import { RpgPlayer, RpgPlayerHooks, RpgServer, RpgModule, RpgServerEngine, RpgWorld, RpgPlugin, RpgServerEngineHooks } from '@rpgjs/server'
import Player from './mmorpg/model'


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

const player: RpgPlayerHooks = {
    props: {
        mongoId: {
            $syncWithClient: false
        }
    },
    onConnected(player: RpgPlayer) {
        console.log("tonskon");
        const { start } = player.server.globalConfig
        const gui = player.gui('rpg-title-screen')
        gui.on('login', async (body) => {
            try {
                const user = await login(body)
                const mongoId = user._id.toString()
                const playerIsAlreadyInGame = !!RpgWorld.getPlayers().find(p => {
                    const inMap = p.getCurrentMap()
                    return p.mongoId == mongoId && inMap
                })
                if (playerIsAlreadyInGame) {
                    throw new Error('PLAYER_IN_GAME')
                }

                player.mongoId = mongoId

                const ret: (undefined | boolean)[] = await player.server.module.emit('server.player.onAuth', [player, user.data, gui], true)

                if (ret.some(r => r === false)) {
                    return
                }

                if (!user.data) {
                    player.name = user.nickname
                    if (start) {
                        if (start.map) player.changeMap(start.map)
                        if (start.hitbox) player.setHitbox(...(start.hitbox as [number, number]))
                        if (start.graphic) player.setGraphic(start.graphic)
                    }
                }
                else {
                    player.load(user.data)
                    player.canMove = true
                }

                gui.close()
            }
            catch (err: any) {
                let error = {}
                if (err.status == 401) {
                    error = {
                        message: 'LOGIN_FAIL'
                    }
                }
                else {
                    error = {
                        message: err.message
                    }
                }
                player.server.module.emit('server.player.onAuthFailed', [player, error], true)
                player.emit('login-fail', error)
            }
        })
        gui.open()
        
    }
}

export default player