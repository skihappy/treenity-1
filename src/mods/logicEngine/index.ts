import R from 'ramda'
import {IAnyModelType} from 'mobx-state-tree'
import {meta}  from '../../treenity/meta/meta.model'
import {Node} from '../../treenity/tree/node'

export BlockMeta=meta('block',{
    input:
})
export type PortModel={
    [port:string]:IAnyModelType
}


export interface BlockElement {
    name:string,
``
}

export interface CompositeBlockSpec {
    name?: string
    inputModel?:PortModel,
    outputModel?:PortModel,
    state?:IAnyModelType,
    blocks:
}
export interface BlockFunc {
    (blockSpec:BlockSpec,):
}

