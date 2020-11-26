#h1 Basic concept

The logic blocks get built on the server,  on client request, from a serializable blockSpec. 
Basically, you drop a logic meta or node and feathers runs a type specific webhook/endpoint on server creating the 
actual executer func for the block, sticks it into db, client gets synched and evals the executer in a sandbox.  
Then, the executer runs on the client. Its just the building for custom blocks that happens on the server dynamically. 
Itll save a lot of footprint over the wire.

Blocks will rerender themselves reactively on state or instance rop changes, same as react. What happens on change of 
input pin values depends on block execution mode.  Each block has a ticker pin. If nothing hooked up toit,  its reactive.
Otherwise it gets ticked by the pin. We can build any digital control system  in this way.

Its kinda reacty. Theres a Block func to create functional blocks. Blocks can be elementary or composite, containing
both elementary and other composite blocks. An elementary block is blockMeta. A composite block is a node stuffed with
other blocks, and perhaps  other assets.Each composite block has an APIMeta, kinda like an index. Its an extension of a
blockMeta

The Block func abstracts the dissimilar syntax for creating elementary and composite blocks. Base blocks are just metas.
Composite blocks are defined when invoking Block with block spec. 

Block is a curried func Block(domainPath: string,blockSpec:object, instanceProps:object)



About domains.
Each domain is a dict of block components. It can have child domains.  Those are created by 
Object.create(parentDomain,childExtension) Its a scope kinda think organized into a tree structure. Very similar to js 
function scoping. 
A cross domain translation utility can be hung as a static func on each component to be able to MyBlock.inDomain('far/away')

use case:
```javascript 1.8
import {Block} from 'treenity.logicEngine'
import {Node} from  '...'
import {clone} from 'mobx-state-tree'

//Set the domain
//The alternative syntax can be Block('GetRichQuickSCemes/noble'). Both syntaxes can live together. 
const NobleBlock=Block.setDomain('GetRichQuickSCemes/noble')

//Somewhere in deep space, a tree of a noble org is being build, and it goes like this ....
const nobleOrgNode=(props)=>{
    const self=Node.props({name:'nobleOrg'})
    
    const profitCalculatorSpec=props=>({
       name:'profitCalculator', /*if named,gets registered and can be accessed by Block('profitCalculator')*/
       inputs:{
           moneyMade:types.number,
           moneySpent:types.number
       },
       outputs:{
           out:types.number
       },
       state:{
           
       },
       blocks:(api)=>({
           profits:Block('sum')({inputNum:2}), //two inputs is default , so can be omitted
           fudgeFactor:Block('multiply')() //two inputs is default 
       }),
    
        /*
        this is kinda render func. It runs for each instance of a component. First func gets called with 
        dicts of pins for each
        */
       connect:(instanceProps)=>{
            const {fudgeFactor}=instanceProps
            
            /*
            This notation can be developed into lngo of its own with some simple convinience constructs.
            But, the whole func is serialized,  so  js scripting is available as well. However, it might 
            be better for dev experience to have a few shorthands in ascii. Then, combine it with template 
            literals and we can compose these connect specs with funcs.  Connect components are not block components.
            They dont have any functionality and an executor func. They simply help with writing out common connection 
            patterns in specs. They can be parametrized by block names and would spit out rendered specs right into a 
            template literal. Just an idea. Might not be a good one.
            */
            return [
                'self.moneySpent > Neg > profits.in1 > fudgeFactor -> self.out', /* its a path, nothing functional*/
                'self.moneyMade > profits.in2',
                'prop:fudgeFactor > fudgeFactor' /*If names are different, prop: can be skipped */
            ]       
        }   
   }))
    const profitCalculator=Block(profitCalculatorSpec,{fudgeFactor:2})
    /*or
    const ProfitCalculator=Block(profitCalculatorSpec)
    const profitCalculator=ProfitCalculator({fudgeFactor:2})
    
    The fudgeFactor can be a linked to some field in a tree. Its all reactive.
    */
 


    self.addMeta(profitCalculator)
    return self
}
```
domain.$.setDomain(path)


 
