// @flow

import { types, flow } from 'mobx-state-tree'

import { Get } from '../lib/Request'

import Coin from './Coin'

const Coins = types
  .model('CoinsStore', {
    coins: types.array(types.frozen(Coin)),
    state: types.enumeration('State', [ 'new', 'pending', 'done', 'error' ])
  })
  .actions(self => ({
    fetchCoins: flow(function*() {
      self.state = 'pending'
      try {
        self.coins = yield Get('ticker/')
        self.state = 'done'
      } catch (error) {
        console.error(error)
        self.state = 'error'
      }
    }),
    addCoin(coin: Coin) {
      self.coins.push(coin)
    }
  }))
  .views(self => ({
    coinsByDolarPrice(price: number): Array<Coin> {
      return self.coins.filter(({ price_usd }) => parseInt(price_usd, 10) > price).sort((a, b) => {
        const firstPrice = parseInt(a.price_usd, 10)
        const secondPrice = parseInt(b.price_usd, 10)
        if(firstPrice > secondPrice) return -1
        else if(firstPrice < secondPrice) return 1

        return 0
      })
    }
  }))

export default Coins
