import { DocumentNode, gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const initialValue = `
query {
  countries {
    code
    name
  }
 }`;

export default function GraphQLEditor() {
  const [valueMonaco, setValueMonaco] = useState(initialValue);
  //
  const [validRequest, setValidRequest] = useState<DocumentNode>(gql`
    ${valueMonaco}
  `);

  const [getResponse, { called, data, error }] = useLazyQuery(validRequest);

  return (
    <section id="graphql-editor">
      <MonacoEditor
        value={valueMonaco}
        width="800"
        height="600"
        theme="vs-dark"
        language="graphql"
        onChange={(value) => setValueMonaco(value)}
      />

      <button
        onClick={() => {
          setValidRequest(gql`
            ${valueMonaco}
          `);
          getResponse();
        }}
      >
        GetResponse
      </button>
      {error && <p>{error.message}</p>}
      {called && <div className="response"> Response:{JSON.stringify(data)} </div>}
    </section>
  );
}
