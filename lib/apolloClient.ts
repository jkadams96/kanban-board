// lib/apolloClient.ts
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
const ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_SECRET;

if (!GRAPHQL_URL) {
  throw new Error("Missing NEXT_PUBLIC_GRAPHQL_URL in .env.local");
}

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  fetch,
});

// Attach headers (Admin secret for now; replace with nhost auth later if needed)
const authLink = setContext((_, { headers }) => {
  const nextHeaders: Record<string, string> = {
    ...(headers as Record<string, string>),
  };

  if (ADMIN_SECRET) {
    nextHeaders["x-hasura-admin-secret"] = ADMIN_SECRET;
  }

  return { headers: nextHeaders };
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
