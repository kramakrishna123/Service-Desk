/* config-overrides.js */
const rewireAntd = require('react-app-rewire-antd')
 
module.exports = function override(config, env) {
 
  // ...
 
  config = rewireAntd({
    '@primary-color': '#ff5252',
  })(config, env)
 
  // ...
 
  return config
}