// @flow

import { types, flow } from 'mobx-state-tree'

import { Get } from '../lib/Request'

import Coin from './Coin'

const Coins: Array<Coin> = types
  .model('CoinsStore', {
    coins: types.array(types.frozen(Coin)),
    state: types.enumeration('State', [ 'new', 'pending', 'done', 'error' ])
  })
  .actions(self => ({
    fetchCoins: flow(function*() {
      self.state = 'pending'
      try {
        const { data } = yield Get('assets/')
        self.coins = data
        self.state = 'done'
      } catch (error) {
        console.error('error', error)
        self.state = 'error'
      }
    }),
    addCoin(coin: Coin) {
      self.coins.push(coin)
    }
  }))
  .views(self => ({
    coinsByDolarPrice(price: number): Array<Coin> {
      return self.coins
        .filter(({ priceUsd }) => parseInt(priceUsd, 10) > price)
        .sort((a, b) => {
          const firstPrice = parseInt(a.priceUsd, 10)
          const secondPrice = parseInt(b.priceUsd, 10)
          if(firstPrice > secondPrice) return -1
          else if(firstPrice < secondPrice) return 1

          return 0
        })
    }
  }))

export default Coins
