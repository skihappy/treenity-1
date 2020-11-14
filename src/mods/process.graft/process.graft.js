mport meta from '../../treenity/tree/meta'
import processMeta from './process.meta'
import Node from '../../treenity/tree/node'


const processControllerMeta=({name,processFlow,processModel})=>{
    const processNode=nodeModel.create({
        processModel,name
    }).action((self)=>{
        return {processFlow,
            updateProcessFlow:(processFlow)=>{
                self.action((self)=>({processFlow}))
                self.serializedProcessFlow=processFlow.toString()
            },
            spawnProcess:(name,props)=>{
                self.addMeta(
                    processMeta({name,
                        processNode:self
                    })
                ).start(props).then((result,err)=>{
                    if(err) throw new Error(err)
                    self.removeMeta(name)
                    return result
                })
            }
        }
    }).hooks((self)=>{
        return {
            onCreate:
        }
    })
}

export default processNode