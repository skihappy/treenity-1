import {addMiddleware} from 'mobx-state-tree'
export {default as meta} from './process.meta'
import {default as node} from './process.node'
import middleware from './process.middleware'

export const addMidlleware=tree=>addMiddleware(tree,middleware)


