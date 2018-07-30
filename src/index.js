// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import App from './App'

import createTodoStore from './stores'

const root: any = document.getElementById('root')
declare var module: {
  hot: any
}

const initialState: Object = {
  CoinsStore: {
    coins: [],
    state: 'new'
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
    renderApp(App, createTodoStore(store))
  })

  module.hot.accept([ './App' ], () => {
    // Componenent definition changed, re-render app
    renderApp(App, store)
  })
}
