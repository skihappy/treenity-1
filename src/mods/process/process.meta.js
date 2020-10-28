import createMeta from '../../treenity/meta/meta.model'
import { types } from 'mobx-state-tree';

const processMeta=({processNode, name})=>{
    const {processModel,processFlow}=processNode

    const processMeta= createMeta('process',{name,processNode,
        ...processModel,
        timeline:types.array(types.string),
        currentTime:types.int,
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