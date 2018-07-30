// @ flow

import { destroy, onSnapshot, types } from 'mobx-state-tree'
import { connectReduxDevtools } from 'mst-middlewares'

import CoinsStore from './Coins'

let store
let snapshotListener
const localStorageKey = 'mst-todomvc-example'

const Store: Object = types.model({
  CoinsStore
})

function createTodoStore(snapshot: Object): Object {
  // clean up snapshot listener
  if(snapshotListener) snapshotListener()
  // kill old store to prevent accidental use and run clean up hooks
  if(store) destroy(store)

  // create new one
  store = Store.create(snapshot)

  // connect devtools
  connectReduxDevtools(require('remotedev'), store)
  // connect local storage
  snapshotListener = onSnapshot(store, snapshot => localStorage.setItem(localStorageKey, JSON.stringify(snapshot)))

  return store
}

export default createTodoStore
