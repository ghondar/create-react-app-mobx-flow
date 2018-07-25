// @flow

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

type Props = {
  BirdStore: any | { birdCount: number, birds: Array<string>, addBird: Function, addPrefix: Function }
}

@inject('BirdStore')
@observer
class Birds extends Component<Props> {
  static defaultProps = {
    BirdStore: null
  }

  bird: Object = React.createRef()

  render() {
    const { BirdStore } = this.props

    return (
      <div className='App'>
        <h2>You have {BirdStore.birdCount} birds.</h2>
        <form onSubmit={e => this._handleSubmit(e)}>
          <input placeholder='Enter bird' ref={this.bird} type='text' />
          <button>add bird</button>
        </form>
        <button onClick={this._handleAddPrefix}>add prefix</button>
        <ul>{BirdStore.birds.map((bird, i) => <li key={i}>{bird}</li>)}</ul>
        <DevTools />
      </div>
    )
  }

  _handleAddPrefix = () => {
    const {
      BirdStore: { addPrefix }
    } = this.props

    addPrefix(1)
  }

  _handleSubmit = (e: any) => {
    e.preventDefault()
    const {
      BirdStore: { addBird }
    } = this.props

    const bird: void = this.bird.current.value
    addBird(bird)
    this.bird.current.value = ''
  }
}

export default Birds
