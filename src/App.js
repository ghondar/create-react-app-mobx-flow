// @flow

import './index.css'
import React from 'react'

import createRoutes from './routes'
import Root from './container/Root'

const routes = createRoutes()

export default () => <Root>{routes}</Root>
