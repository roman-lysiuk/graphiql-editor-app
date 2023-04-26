import React from 'react';
import GraphQLRoute from '../../components/GraphQLRoute/GraphQLRoute';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';

export default function Main() {
  return (
    <main className="main">
      <GraphQLRoute />
      <GraphQLEditor />
    </main>
  );
}
