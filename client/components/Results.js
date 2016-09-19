import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

function Results({data, mutate}) {
  if (data.loading) return (<span>Loading..</span>);
  return (
    <ul>
      {data.viewer.search.selectors.map(selector => (
        <li key={selector.id}>{selector.status}. {selector.name}
          <button onClick={() => mutate({variables: {id: selector.id}}).then(() => {
            data.refetch();
          })}>set status</button>
        </li>
      ))}
    </ul>
  );
}

const SearchQuery = gql`
  query SearchQuery($name: String!) {
    viewer {
      search(name: $name) {
        selectors {
          id,
          name,
          status
        }
      }
    }
  }
`;

const StatusMutation = gql`
  mutation changeStatus ($id: String!){
    changeStatus(input: {id: $id, status: "666"}) {
      selector {
        status
      }
    }
  }
`;

const resultsWithData = graphql(SearchQuery, {
  options: ({ name }) => ({ variables: { name } }),
})(Results);

export default graphql(StatusMutation)(resultsWithData);

