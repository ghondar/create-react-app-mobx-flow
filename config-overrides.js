const rewireMobX = require('react-app-rewire-mobx')
// $FlowFixMe
module.exports = function override(config, env) {
  config = rewireMobX(config, env)

  return config
}
