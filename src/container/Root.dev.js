// @flow

import React, { Component } from 'react'
import DevTools from 'mobx-react-devtools'

type Props = {
  children: any
}

class Dev extends Component<Props> {
  render() {
    const { children } = this.props

    return (
      <div>
        {children}
        <DevTools />
      </div>
    )
  }
}

export default Dev
