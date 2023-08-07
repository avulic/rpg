import { RpgSprite, RpgSpriteHooks, RpgGui } from '@rpgjs/client'

const sprite: RpgSpriteHooks = {
    onInit(sprite: RpgSprite) {
        sprite.on('click', () => {
            console.log("sprite from title");
        })
    }
}

export default sprite;