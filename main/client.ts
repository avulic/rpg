import { RpgClientEngineHooks } from '@rpgjs/client';
import { RpgClient, RpgModule, RpgClientEngine, RpgGui } from '@rpgjs/client'



const engine: RpgClientEngineHooks = {
    onStart(engine: RpgClientEngine) {
        console.log("client from main");
    }
}


export default engine