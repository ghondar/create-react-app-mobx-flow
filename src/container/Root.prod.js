// @flow

import React, { Component } from 'react'

type Props = {
  children: any
}

class Prod extends Component<Props> {
  render() {
    const { children } = this.props

    return <div>{children}</div>
  }
}

export default Prod
