// components/Providers.tsx
"use client";

import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
