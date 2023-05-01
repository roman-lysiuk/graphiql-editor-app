import { ApolloClient, InMemoryCache } from '@apollo/client';

const defaultURL = import.meta.env.VITE_API_DEFAULT_GRAPHQL;

export const createApolloClient = (url: string = defaultURL) => {
  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });
  return client;
};

export default createApolloClient();
