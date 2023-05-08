import React, { Suspense } from 'react';
import GraphQLRoute from '../../components/GraphQLRoute/GraphQLRoute';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
import GraphQLDocs from '../../components/GraphQLDocs/GraphQLDocs';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';

export default function Main() {
  return (
    <main className="main">
      <GraphQLRoute />
      <GraphQLEditor />
      <Suspense fallback={<p>Loading...</p>}>
        <GraphQLResponse />
      </Suspense>
      <GraphQLDocs />
    </main>
  );
}
