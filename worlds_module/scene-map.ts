import { RpgSceneMapHooks, RpgSceneMap } from '@rpgjs/client'

const sceneMap: RpgSceneMapHooks = {
    onAfterLoading(scene: RpgSceneMap) {
        console.log("pozdrav iz scene 2")
    }
}

export default sceneMap