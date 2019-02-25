// @flow

import { types } from 'mobx-state-tree'

const Coin = types.model('CoinsStore', {
  id               : types.string,
  rank             : types.string,
  symbol           : types.string,
  name             : types.string,
  supply           : types.string,
  maxSupply        : types.maybeNull(types.string),
  marketCapUsd     : types.string,
  volumeUsd24Hr    : types.string,
  priceUsd         : types.string,
  changePercent24Hr: types.string,
  vwap24Hr         : types.maybeNull(types.string)
})

export default Coin
