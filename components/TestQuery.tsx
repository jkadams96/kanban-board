"use client";

import { ApolloProvider, gql, useQuery } from "@apollo/client";
import client from "../lib/apolloClient";

const TEST_QUERY = gql`
  query {
    __typename
  }
`;

function TestQueryInner() {
  const { data, loading, error } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function TestQuery() {
  return (
    <ApolloProvider client={client}>
      <TestQueryInner />
    </ApolloProvider>
  );
}
