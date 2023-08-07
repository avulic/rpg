import { RpgClient, RpgModule, Spritesheet, RpgSceneMap, RpgSprite, RpgClientEngineHooks, RpgSceneMapHooks } from '@rpgjs/client'


const sceneMap: RpgSceneMapHooks = {
    onAddSprite(scene: RpgSceneMap){
        console.log("pozdrav iz scene main")
    },
    onAfterLoading(scene: RpgSceneMap) {
        console.log("pozdrav iz scene main")
    }
}


export default sceneMap
