// @flow

import { types } from 'mobx-state-tree'

const Coin = types.model('CoinsStore', {
  id                : types.string,
  name              : types.string,
  symbol            : types.string,
  rank              : types.string,
  price_usd         : types.string,
  price_btc         : types.string,
  '24h_volume_usd'  : types.string,
  market_cap_usd    : types.string,
  available_supply  : types.string,
  total_supply      : types.string,
  max_supply        : types.maybeNull(types.string),
  percent_change_1h : types.string,
  percent_change_24h: types.string,
  percent_change_7d : types.string,
  last_updated      : types.string
})

export default Coin
