import createMeta from '../../treenity/meta/meta.model'
import { types } from 'mobx-state-tree';

const processMeta=({processHandler, name})=>{
    const {processModel,processFlow}=processHandler

    const processMeta= createMeta('process',{name,processHandler,
        ...processModel,
        timeline:types.array(types.string),
        timelineCursor:types.int,
        isActive:types.bool,
        isAborted:types.bool
    }).
    actions((self)=>{
            return {
                start:(props)=>processFlow(self)(props),
                abort:()=>{
                    self.isAborted=true
                }
            }
        }
    )

    return processMeta
}
export default processMeta