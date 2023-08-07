import { RpgClient, RpgModule, Control,RpgClientEngineHooks } from '@rpgjs/client'
import titleGui from './gui/title.vue'
import loginGui from './gui/connect.vue'


@RpgModule<RpgClient>({ 
    gui: [titleGui, loginGui]
})

export default class RpgClientEngineModule {}