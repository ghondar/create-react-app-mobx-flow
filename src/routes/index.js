import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Birds from '../container/Birds'

export default () => (
  <BrowserRouter>
    <Route
      component={Birds} exact path='/'
      strict />
  </BrowserRouter>
)
