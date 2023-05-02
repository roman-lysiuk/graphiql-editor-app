import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import cl from './graphQLResponse.module.scss';
import { useAppSelector } from '../../hooks/redux';

export default function GraphQLResponse() {
  const { data } = useAppSelector((state) => state.graphQL);
  return (
    <section className={cl.response}>
      <MonacoEditor
        value={JSON.stringify(data, null, '\t').replace('null', '')}
        width="100%"
        theme="vs-dark"
        height="80vh"
        language="json"
        options={{
          readOnly: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          lineNumbers: 'off',
        }}
      />
    </section>
  );
}
