const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema.js');
const app = express();
const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compiler = webpack(config);
process.env.NODE_ENV = 'development';

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  watchOptions: {
    poll: false,
  },
  publicPath: config.output.publicPath,
  stats: {
    warnings: false,
  }
}));
app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, 'localhost', () => {
  console.info('http://localhost:3000/');
});
