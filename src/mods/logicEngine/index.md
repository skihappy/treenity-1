#h1 Basic concept

Its kinda reacty. Theres a Block func to create functional blocks. Blocks can be elementary or composite, containing
both elementary and other composite blocks. An elementary block is blockMeta. A composite block is a node stuffed with
other blocks, and perhaps  other assets.Each composite block has an APIMeta, kinda like an index. Its an extension of an
blockMeta

The Block func abstracts the dissimilar syntax for creating elementary and composite blocks. Base blocks are just metas.
Composite blocks are defined when invoking Block with block spec


Its React syntax.
There are Blocks which are React components. They are classes. Maybe we can do funcs later.
So, theres a base Block and all are inherited from it, by calling a static define func.
Define returns another custom Block element, an object, a controller for block instance. The actual logic node or meta
is returned by renderTheres a static create method that
Block is func to generate a logic block.
It takes a callback which is passed tools to create the machinery of logic block.
Same syntax for  a single logicBlock meta or a composite block, logic node.

Either a meta or a logic node is produced, when models defined at Block invokation

use case:
```javascript 1.8
import logicEngine from 'treenity.logicEngine'
import {Node} from  '...'
import {clone} from 'mobx-state-tree'

//this sets the domain so we can do Block('profitCalculator')  and profitCalculator=components.profitCalculator
const {Block,components}=logicEngine({domain:'business'})

//Somewhere in deep space, a tree of a noble org is being build, and it goes like this ....
const nobleOrgNode=(props)=>{
    const self=Node.props({name:'nobleOrg'})
    
    const profitCalculatorSpec=props=>({
       name:'profitCalculator', //if named,get registered and can be accessed by Block('profitCalculator')
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
           profits:Block('sum')({inputNum:2})
       }),
       render:({self,profits})=>([
           [self.moneyMade,profits.in1],
           [self.moneySpent,Neg,profits.in2],
           [profits.out,self.out]
       ])
   }))
    const profitCalculator=Block

    self.addMeta(profitCalculator)
    return self
}
```
i


 
