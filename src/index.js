// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { getSnapshot } from 'mobx-state-tree'
import { Provider } from 'mobx-react'

import App from './App'

import createTodoStore from './stores'

const localStorageKey: string = 'mst-todomvc-example'
const root: any = document.getElementById('root')
declare var module: {
  hot: any
}

const data: ?string = localStorage.getItem(localStorageKey)

const initialState: Object = localStorage.getItem(localStorageKey) ?
  JSON.parse(data || '{}') :
  {
    BirdStore: {
      birds: []
    }
  }

function renderApp(App, store) {
  if(root !== null) {
    const Root = (
      <Provider {...store}>
        <App />
      </Provider>
    )
    ReactDOM.render(Root, root)
  }
}

const store: Object = createTodoStore(initialState)

renderApp(App, store)

// Connect HMR
if(module.hot) {
  module.hot.accept([ './stores' ], () => {
    // Store definition changed, recreate a new one from old state
    renderApp(App, createTodoStore(getSnapshot(store)))
  })

  module.hot.accept([ './App' ], () => {
    // Componenent definition changed, re-render app
    renderApp(App, store)
  })
}
