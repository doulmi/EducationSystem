import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.web_development'
const PORT = process.env.PORT || 4000;

let app = express();
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  stats: {
    colors: true
  },
  historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}`));
