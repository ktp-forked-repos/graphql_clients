const gql = require('graphql');
const mutationWithClientMutationId = require('graphql-relay').mutationWithClientMutationId;

const selectorsDb = [
  {id: 11, status: 200, name: 'sel11'},
  {id: 12, status: 201, name: 'sel12'},
  {id: 13, status: 202, name: 'sel14'},
  {id: 14, status: 203, name: 'sel15'},
  {id: 15, status: 204, name: 'sel16'},
];

const selector = new gql.GraphQLObjectType({
  name: 'selector',
  fields: {
    id: {type: gql.GraphQLString},
    status: {type: gql.GraphQLString},
    name: {type: gql.GraphQLString},
  },
  args: {
    id: {type: gql.GraphQLString},
  },
  resolve: (_, args) => {
    return selectorsDb.find(sel => sel.id == args.id);
  }
});

const Viewer = new gql.GraphQLObjectType({
  name: 'viewer',
  fields: {
    selectors: {
      type: new gql.GraphQLList(selector),
    },
    search: {
      type: new gql.GraphQLObjectType({
        name: 'search',
        fields: {
          selectors: {
            type: new gql.GraphQLList(selector),
          }
        }
      }),
      args: {
        name: {type: gql.GraphQLString},
      },
      resolve: (_, args) => {
        console.log('RAX', selectorsDb.filter(sel => console.log(sel.name, args.name, sel.name == args.name)));
        return {
          selectors: selectorsDb.filter(sel => !args.name || sel.name == args.name)
        }
      }
    }
  }
});

const Root = new gql.GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: Viewer,
      resolve: () => {
        return selectorsDb;
      }
    }
  }
});

const ChangeStatus = mutationWithClientMutationId({
  name: 'ChangeStatus',
  inputFields: {
    id: { type: gql.GraphQLString },
    status: { type: gql.GraphQLString },
  },
  outputFields: {
    selector: {
      type: selector,
      resolve: ({id}) => {
        return selectorsDb.find(sel => sel.id == id);
      }
    }
  },
  mutateAndGetPayload: ({id, status}) => {
    const sel = selectorsDb.find(sel => sel.id == id);
    sel.status = status;
    return {id};
  },
});

const Mutation = new gql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    changeStatus: ChangeStatus,
  },
});

module.exports = new gql.GraphQLSchema({
  query: Root,
  mutation: Mutation,
});