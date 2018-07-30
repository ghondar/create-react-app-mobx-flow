// @flow

import React, { Fragment } from 'react'

let DevTools

if(process.env.NODE_ENV === 'development') DevTools = require('mobx-react-devtools').default

export default (props: Object) => (
  <Fragment>
    {props.children}
    {DevTools && <DevTools />}
  </Fragment>
)
