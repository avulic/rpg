
import { RpgClientEngineHooks } from '@rpgjs/client';
import { RpgClient, RpgModule, RpgClientEngine, RpgGui } from '@rpgjs/client'


const engine: RpgClientEngineHooks = {
    onConnected(engine: RpgClientEngine){
        //RpgGui.display('rpg-main-menu')
    },
    
}
@RpgModule<RpgClient>({ 
    engine:engine
})

export default class RpgClientEngineModule {}

