import { GraphQLClient } from 'graphql-request'

const requestHeaders = {
  authorization: 'Bearer MY_TOKEN',
}

const graphqlRequestClient = new GraphQLClient(
  process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
  {
    headers: requestHeaders,
  }
)

export default graphqlRequestClient
