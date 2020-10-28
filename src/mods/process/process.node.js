import nodeModel from '../../treenity/tree/node'
import processMeta from './process.meta'

const processNode=({name,processFlow,processModel, ...fields})=>{
    const processNode=nodeModel.create({
        processModel,name,...fields
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
    }).updateProcessFlow(processFlow)
}

export default processNode