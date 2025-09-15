import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET || "",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
