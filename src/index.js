// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { Provider } from 'mobx-react'
import BirdStore from './stores/BirdStore'

const root: any = document.getElementById('root')

if(root !== null) {
  const Root = (
    <Provider BirdStore={BirdStore}>
      <App />
    </Provider>
  )
  ReactDOM.render(Root, root)
}
