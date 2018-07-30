// @ flow

import { destroy, types } from 'mobx-state-tree'
import { connectReduxDevtools } from 'mst-middlewares'

import CoinsStore from './Coins'

let store

const Store: Object = types.model({
  CoinsStore
})

function createTodoStore(snapshot: Object): Object {
  // kill old store to prevent accidental use and run clean up hooks
  if(store) destroy(store)

  // create new one
  store = Store.create(snapshot)

  // connect devtools
  connectReduxDevtools(require('remotedev'), store)

  return store
}

export default createTodoStore
