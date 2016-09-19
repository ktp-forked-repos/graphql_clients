import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import 'isomorphic-fetch';
import Root from './components/Root';

const client = new ApolloClient({
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
      return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
    }
    return null;
  },
  shouldBatch: true,
  initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
  ssrForceFetchDelay: 100,
});


render((
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>
), document.getElementById('container'));