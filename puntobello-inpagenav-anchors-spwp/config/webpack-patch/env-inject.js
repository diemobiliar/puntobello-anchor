const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

module.exports = function(webpackConfig) {
  const NODE_ENV = process.env.NODE_ENV || 'dev';
  const envPath = path.resolve(__dirname, '../../env', `${NODE_ENV}.env`);

  if (!fs.existsSync(envPath)) {
    console.warn(`Warning: ${envPath} not found, skipping env injection`);
    return webpackConfig;
  }

  const envConfig = dotenv.parse(fs.readFileSync(envPath));

  const definitions = {};
  // Include ALL variables from .env file (generic support)
  Object.entries(envConfig).forEach(([key, value]) => {
    definitions[`process.env.${key}`] = JSON.stringify(value);
  });

  if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
  }

  webpackConfig.plugins.push(new webpack.DefinePlugin(definitions));
  console.log(`Injected ${Object.keys(definitions).length} env variables from ${NODE_ENV}.env`);

  return webpackConfig;
};
