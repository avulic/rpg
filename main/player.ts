import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'


const player: RpgPlayerHooks = {
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },
    onJoinMap(player: RpgPlayer) {
        console.log('player joined in main')
        player.setComponentsTop(Components.text('{name}'))

    },
    onConnected(player: RpgPlayer) {
        console.log('player connected in main')
    }
}

export default player