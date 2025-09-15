"use client";

import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
