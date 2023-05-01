import React, { Suspense, useState } from 'react';
import { DocumentNode, gql, useQuery } from '@apollo/client';
import GraphQLRoute from '../../components/GraphQLRoute/GraphQLRoute';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
// import GraphQLDocs from '../../components/GraphQLDocs/GraphQLDocs';
import GraphQLVariables from '../../components/GraphQLVariables/GraphQLVariables';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import { useAppSelector } from '../../hooks/redux';

export default function Main() {
  const { url } = useAppSelector((state) => state.graphQLRoute);
  const initialValue =
    url === import.meta.env.VITE_API_DEFAULT_GRAPHQL
      ? gql`
          query {
            countries {
              code
              code
              capital
            }
          }
        `
      : gql`
          {
            __schema {
              types {
                name
              }
            }
          }
        `;
  const [validRequest, setValidRequest] = useState<DocumentNode>(initialValue);
  const { data, error } = useQuery(validRequest);

  return (
    <main className="main">
      <GraphQLRoute />
      <GraphQLEditor setValidRequest={setValidRequest} />
      <Suspense fallback={<p>Loading...</p>}>
        {error && <p>{error.message}</p>}
        <GraphQLResponse response={JSON.stringify(data)} />
      </Suspense>
      {/* <GraphQLDocs /> */}
      <GraphQLVariables />
    </main>
  );
}
