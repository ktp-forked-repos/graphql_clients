const fs = require('fs');
const graphql = require('graphql');
const introspectionQuery = require('graphql/utilities').introspectionQuery;
const Schema = require('./schema');

graphql.graphql(Schema, introspectionQuery).then(result => {
  fs.writeFileSync(`${__dirname}/schema.json`, JSON.stringify(result, null, 2));
});