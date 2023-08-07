import { RpgSprite, RpgSpriteHooks, RpgGui } from '@rpgjs/client'

export default {
    onInit(sprite: RpgSprite) {
        sprite.interactive = true
        RpgGui.display('task-details')
        RpgGui.display('hp')
        
        sprite.on('click', () => {
            sprite.guiDisplay  = ! sprite.guiDisplay;
        })
    }
}