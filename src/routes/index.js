// @flow

import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Coins from '../container/Coins'

export default () => (
  <BrowserRouter>
    <Route
      component={Coins} exact path='/'
      strict />
  </BrowserRouter>
)
