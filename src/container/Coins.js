import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Coin from '../stores/Coin'

type Props = {
  CoinsStore: { fetchCoins: Function, addCoin: Function, coinsByDolarPrice: Function, coins: Array<Coin>, state: string }
}

type States = {
  coins: Array<Coin>
}

class Coins extends Component<Props, States> {
  price: Object = React.createRef()

  state = {
    coins: []
  }

  componentDidMount() {
    this.props.CoinsStore.fetchCoins().then(() => {
      this.setState({
        coins: this.props.CoinsStore.coins
      })
    })
  }

  render() {
    const { state } = this.props.CoinsStore
    const { coins } = this.state

    return state === 'done' ? (
      <div>
        <form onSubmit={this._handleFindByPrice}>
          <label>Find by price: </label>
          <input ref={this.price} type='text' />
          <button>Find</button>
        </form>
        <ul>
          {coins.map(({ id, name, symbol, price_usd, price_btc }) => (
            <li key={id}>
              <h2>{symbol}</h2>
              <h3>{name}</h3>
              <h3>Price in Dolars: ${price_usd}</h3>
              <h3>Price in Bitcoins: {price_btc}</h3>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <h1>Cargando...</h1>
    )
  }

  _handleFindByPrice = e => {
    e.preventDefault()

    const { coinsByDolarPrice } = this.props.CoinsStore
    const { value } = this.price.current

    const coins: Array<Coin> = coinsByDolarPrice(parseInt(value, 10))

    this.setState({
      coins
    })

    e.currentTarget.reset()
    this.price.current.focus()
  }
}

export default inject('CoinsStore')(observer(Coins))
